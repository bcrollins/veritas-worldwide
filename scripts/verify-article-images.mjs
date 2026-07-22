#!/usr/bin/env node
/**
 * Ensure every article hero/inline image is a first-party /news/* asset on disk.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  'src/data/articles.ts',
  'src/data/articlesExpanded.ts',
  'src/data/articlesExpandedB.ts',
]

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:article-images] FAIL — ${message}`)
    process.exit(1)
  }
}

const text = files.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n')
assert(!text.includes('upload.wikimedia.org'), 'article data still contains upload.wikimedia.org hotlinks')

const srcs = new Set()
for (const match of text.matchAll(/"src"\s*:\s*"(\/news\/[^"]+)"/g)) srcs.add(match[1])
for (const match of text.matchAll(/src:\s*['"](\/news\/[^'"]+)['"]/g)) srcs.add(match[1])

assert(srcs.size >= 13, `expected at least 13 local /news image refs, got ${srcs.size}`)

for (const src of srcs) {
  const filePath = path.join(root, 'public', src.replace(/^\//, ''))
  assert(fs.existsSync(filePath), `missing public asset for ${src}`)
  assert(fs.statSync(filePath).size > 5_000, `asset too small: ${src}`)
}

console.log(`[verify:article-images] PASS — ${srcs.size} first-party news assets on disk`)
