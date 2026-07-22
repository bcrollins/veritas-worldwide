#!/usr/bin/env node
/**
 * Ensure chapter heroes and gallery images are first-party /chapters/* assets.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:chapter-images] FAIL — ${message}`)
    process.exit(1)
  }
}

const meta = fs.readFileSync(path.join(root, 'src/data/chapterMeta.ts'), 'utf8')
const gallery = fs.readFileSync(path.join(root, 'src/data/chapterImages.ts'), 'utf8')

assert(!meta.includes('upload.wikimedia.org'), 'chapterMeta still has Wikimedia hotlinks')
assert(!gallery.includes('upload.wikimedia.org'), 'chapterImages still has Wikimedia hotlinks')

const heroRefs = [...meta.matchAll(/heroImage:\s*['"](\/chapters\/heroes\/[^'"]+)['"]/g)].map((m) => m[1])
assert(heroRefs.length >= 30, `expected ≥30 local chapter heroes in meta, got ${heroRefs.length}`)

const galleryRefs = [
  ...gallery.matchAll(/src:\s*['"](\/chapters\/heroes\/[^'"]+)['"]/g),
].map((m) => m[1])
assert(galleryRefs.length >= 28, `expected ≥28 local gallery srcs, got ${galleryRefs.length}`)

const all = new Set([...heroRefs, ...galleryRefs])
for (const src of all) {
  const filePath = path.join(root, 'public', src.replace(/^\//, ''))
  assert(fs.existsSync(filePath), `missing public asset ${src}`)
  assert(fs.statSync(filePath).size > 5_000, `asset too small ${src}`)
}

console.log(
  `[verify:chapter-images] PASS — metaHeroes=${heroRefs.length} gallery=${galleryRefs.length} uniqueAssets=${all.size}`,
)
