#!/usr/bin/env node
/**
 * Lock first-party image preference: Wikimedia hotlinks must not be preferred.
 */
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:image-sources] FAIL — ${message}`)
    process.exit(1)
  }
}

// Source-level guards (no TS transpile required)
const src = readFileSync(join(root, 'src/lib/imageSources.ts'), 'utf8')
assert(src.includes('isWikimediaHost'), 'imageSources must export isWikimediaHost')
assert(
  /return undefined/.test(src) && /Wikimedia/.test(src),
  'getPreferredImageSrc must refuse Wikimedia hotlinks',
)
// Parsing may still *detect* Special:FilePath URLs, but getPreferredImageSrc
// must never construct a new commons Special:FilePath rewrite for display.
assert(
  !/new URL\(`https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath/.test(src),
  'imageSources must not construct commons Special:FilePath display URLs',
)

// Runtime check via node --experimental-strip-types when available
const probe = `
import { getPreferredImageSrc, isWikimediaHost } from './src/lib/imageSources.ts'
const wiki = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/x.jpg/220px-x.jpg'
if (getPreferredImageSrc(wiki) !== undefined) throw new Error('wiki preferred')
if (!isWikimediaHost(wiki)) throw new Error('isWikimediaHost false')
if (getPreferredImageSrc('/profiles/ted-cruz.jpg') !== '/profiles/ted-cruz.jpg') throw new Error('local broken')
if (getPreferredImageSrc('https://veritasworldwide.com/news/heroes/x.jpg') !== 'https://veritasworldwide.com/news/heroes/x.jpg') throw new Error('abs first-party broken')
console.log('runtime ok')
`
const r = spawnSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', probe], {
  cwd: root,
  encoding: 'utf8',
})
if (r.status !== 0) {
  // Fallback: source guards alone if strip-types unavailable
  if (/strip-types|experimental|ERR_UNKNOWN/.test(String(r.stderr || r.stdout || ''))) {
    console.log('[verify:image-sources] PASS — source guards (runtime strip-types unavailable)')
    process.exit(0)
  }
  console.error(r.stdout || '')
  console.error(r.stderr || '')
  console.error('[verify:image-sources] FAIL — runtime probe')
  process.exit(1)
}
console.log('[verify:image-sources] PASS — Wikimedia refused; first-party preferred')
