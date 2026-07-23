#!/usr/bin/env node
/**
 * Pure floors for offline research pack (zip of public machine corpora).
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { inflateRawSync } from 'node:zlib'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function assert(cond, msg) {
  if (!cond) {
    console.error(`[verify:research-pack] FAIL: ${msg}`)
    process.exit(1)
  }
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

const gen = read('scripts/generate-research-pack.mjs')
assert(gen.includes('research-pack.zip'), 'generator must write research-pack.zip')
assert(gen.includes('MAX_ZIP_BYTES'), 'size budget required')
assert(gen.includes('visual-investigations.json'), 'research pack must include Israel visual-investigations index')
// Must dual-write public + dist so Railway express.static(dist) serves the pack after postbuild.
assert(
  gen.includes("path.join(root, 'dist')") || gen.includes('distDir') || gen.includes("writePair(distDir)"),
  'generator must dual-write dist/ (postbuild runs after Vite public→dist copy)',
)
assert(gen.includes('writePair') || gen.includes('dist/research-pack'), 'dist dual-write helper missing')
assert(!/brollins|brandon|@gmail\.com/i.test(gen), 'identity leak in generator')

const pkg = read('package.json')
assert(pkg.includes('generate-research-pack.mjs'), 'postbuild/generate script wiring missing')
assert(
  /export-evidence-taxonomy\.mjs && node scripts\/generate-research-pack\.mjs/.test(pkg) ||
    pkg.includes('generate-research-pack.mjs && node scripts/prerender'),
  'postbuild must run generate-research-pack after corpus exports and before/with prerender',
)

const hub = read('src/pages/ResearcherHubPage.tsx')
assert(hub.includes('/research-pack.zip') || hub.includes('research-pack'), 'researcher hub must link pack')

const sources = read('src/pages/SourcesPage.tsx')
assert(
  sources.includes('/research-pack.zip') && sources.includes('sources-research-pack-zip'),
  'Sources machine-readable panel must link research pack zip',
)
const methodology = read('src/pages/MethodologyPage.tsx')
assert(
  methodology.includes('/research-pack.zip') && methodology.includes('methodology-research-pack-zip'),
  'Methodology downloads must link research pack zip',
)
const home = read('src/pages/HomePage.tsx')
assert(
  home.includes('/research-pack.zip') && home.includes('home-research-pack-zip'),
  'Home Power Profiles section must surface research pack zip',
)

const llms = read('public/llms.txt')
assert(llms.includes('research-pack'), 'llms.txt must index research pack')

const server = read('server.js')
assert(
  server.includes('research-pack') || server.includes("name: 'research-pack'"),
  'server should rate-limit research-pack download',
)
// Prefer serving zip with short cache (not immutable year) — optional soft check on setHeaders corpus block
assert(
  server.includes("name: 'research-pack'") && server.includes('/research-pack.zip'),
  'research-pack.zip rateLimit middleware must be registered',
)

// If pack already generated, validate shape
const zipPath = path.join(root, 'public', 'research-pack.zip')
const manPath = path.join(root, 'public', 'research-pack-manifest.json')
if (fs.existsSync(zipPath) && fs.existsSync(manPath)) {
  const zip = fs.readFileSync(zipPath)
  const man = JSON.parse(fs.readFileSync(manPath, 'utf8'))
  assert(zip.length > 10_000, 'zip too small')
  assert(zip.length <= 8 * 1024 * 1024, 'zip exceeds 8MiB budget')
  assert(man.publisher === 'Veritas Worldwide', 'manifest publisher entity-only')
  assert(man.path === '/research-pack.zip', 'manifest path')
  assert(man.sha256 === crypto.createHash('sha256').update(zip).digest('hex'), 'sha256 mismatch')
  assert(zip.readUInt32LE(0) === 0x04034b50, 'zip local file header magic')
  assert(Array.isArray(man.files) && man.files.length >= 5, 'manifest file list thin')
  // Spot-check at least one deflated entry is inflate-able (first file)
  // Minimal parse: skip local header name/extra and try inflate if method=8
  const method = zip.readUInt16LE(8)
  const compSize = zip.readUInt32LE(18)
  const nameLen = zip.readUInt16LE(26)
  const extraLen = zip.readUInt16LE(28)
  const payload = zip.subarray(30 + nameLen + extraLen, 30 + nameLen + extraLen + compSize)
  if (method === 8) {
    const out = inflateRawSync(payload)
    assert(out.length > 0, 'first zip entry inflate failed')
  }
}

console.log('[verify:research-pack] PASS')
