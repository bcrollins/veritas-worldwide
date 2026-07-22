#!/usr/bin/env node
/**
 * Ensure profile portraits are first-party /profiles/* assets (no Wikimedia hotlinks).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:profile-images] FAIL — ${message}`)
    process.exit(1)
  }
}

const profileData = fs.readFileSync(path.join(root, 'src/data/profileData.ts'), 'utf8')
assert(!profileData.includes('upload.wikimedia.org'), 'profileData still has Wikimedia hotlinks')
assert(!profileData.includes('commons.wikimedia.org'), 'profileData still has Wikimedia commons URLs')

const photoRefs = [...profileData.matchAll(/['"](\/profiles\/[^'"]+)['"]/g)].map((m) => m[1])
assert(photoRefs.length >= 90, `expected ≥90 local profile photo refs, got ${photoRefs.length}`)

const missing = []
const small = []
for (const src of new Set(photoRefs)) {
  const filePath = path.join(root, 'public', src.replace(/^\//, ''))
  if (!fs.existsSync(filePath)) {
    missing.push(src)
    continue
  }
  const size = fs.statSync(filePath).size
  // JPEG portraits should be multi-KB; monogram SVGs are intentionally small.
  const min = src.endsWith('.svg') ? 200 : 5_000
  if (size < min) small.push(`${src} (${size}b)`)
}

assert(missing.length === 0, `missing public assets: ${missing.join(', ')}`)
assert(small.length === 0, `assets too small: ${small.join(', ')}`)

console.log(
  `[verify:profile-images] PASS — refs=${photoRefs.length} unique=${new Set(photoRefs).size}`,
)
