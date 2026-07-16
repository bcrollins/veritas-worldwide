#!/usr/bin/env node
/**
 * Guards news corpus integrity: only packs wired into allArticles may be
 * prerendered, and live packs must not include known-fabricated host paths.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:article-sources] FAIL — ${message}`)
    process.exit(1)
  }
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

const articlesTs = read('src/data/articles.ts')
assert(
  articlesTs.includes("from './articlesExpanded'") || articlesTs.includes('from "./articlesExpanded"'),
  'articles.ts must import expandedArticlesA'
)
assert(
  !articlesTs.includes('expandedArticlesB') && !articlesTs.includes('articlesExpandedB'),
  'articles.ts must not merge expandedArticlesB (unsupported pack)'
)
assert(articlesTs.includes('...articles') && articlesTs.includes('...expandedArticlesA'), 'allArticles composition')

const prerender = read('scripts/prerender.mjs')
assert(
  !prerender.includes("articlesExpandedB.ts") && !prerender.includes("expandedArticlesB"),
  'prerender must not index expandedArticlesB (orphan crawler routes)'
)
assert(prerender.includes('expandedArticlesA'), 'prerender must index expandedArticlesA')

// Fabricated path patterns that previously shipped in B-pack
const bannedFragments = [
  'technologyreview.com/2026/03/deepfake-election-threat',
  'propublica.org/2026/supreme-court-ethics',
  'dhs.gov/2026/election-security-ai-assessment',
  'io.stanford.edu/2026/election-misinformation',
  'nih.gov/drug-pricing-2026',
  'ec.europa.eu/2026/critical-minerals',
]

const livePack = read('src/data/articles.ts') + read('src/data/articlesExpanded.ts')
for (const frag of bannedFragments) {
  assert(!livePack.includes(frag), `live article pack contains banned fabricated source path: ${frag}`)
}

const liveIds = [...livePack.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1])
assert(liveIds.length >= 8, `expected at least 8 live articles, got ${liveIds.length}`)
console.log(`[verify:article-sources] live articles=${liveIds.length} packs=core+A`)
const sitemap = read('public/sitemap.xml')
const withdrawnSlugs = [
  'ai-deepfakes-election-disinformation-regulation-2026',
  'pharmaceutical-lobbying-record-spending-drug-prices-2026',
  'ukraine-russia-peace-negotiations-minerals-deal-2026',
  'supreme-court-ethics-undisclosed-gifts-recusal-2026',
]
for (const slug of withdrawnSlugs) {
  assert(!sitemap.includes(`/news/${slug}`), `public sitemap still lists withdrawn article ${slug}`)
}
const bFile = read('src/data/articlesExpandedB.ts')
assert(bFile.includes('export const expandedArticlesB'), 'B pack export must remain (empty)')
assert(!bFile.match(/"slug":\s*"/), 'B pack must not export live article slugs')
console.log('[verify:article-sources] PASS')
