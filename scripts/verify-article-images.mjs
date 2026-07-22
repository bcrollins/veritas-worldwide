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

const metaPath = path.join(root, 'public', 'news', 'meta.json')
assert(fs.existsSync(metaPath), 'missing public/news/meta.json bot meta export')
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
const metaKeys = Object.keys(meta)
assert(metaKeys.length >= 13, `news meta.json expected ≥13 articles, got ${metaKeys.length}`)
for (const slug of metaKeys) {
  assert(meta[slug].title, `meta missing title for ${slug}`)
  assert(meta[slug].image?.includes('/news/heroes/') || meta[slug].image?.includes('og-image'), `meta image not first-party for ${slug}`)
}

const socialMeta = fs.readFileSync(path.join(root, 'server-social-meta.js'), 'utf8')
assert(socialMeta.includes("req.path.match(/^\\/news\\/([^/]+)$/)"), 'server-social-meta must inject /news/:slug bot meta')
assert(socialMeta.includes('meta.json'), 'server-social-meta must load news meta.json')

console.log(`[verify:article-images] PASS — ${srcs.size} first-party news assets + ${metaKeys.length} bot meta rows`)
