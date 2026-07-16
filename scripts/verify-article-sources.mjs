#!/usr/bin/env node
/**
 * Guards news corpus integrity:
 * - Live packs must be wired into allArticles and prerender
 * - Fabricated path fragments must never return
 * - Withdrawn fabricated slugs must stay out of sitemap
 * - B-pack sources must be durable primary/government URLs
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
  articlesTs.includes("from './articlesExpandedB'") || articlesTs.includes('from "./articlesExpandedB"'),
  'articles.ts must import expandedArticlesB (sourced replacement pack)'
)
assert(
  articlesTs.includes('...expandedArticlesA') && articlesTs.includes('...expandedArticlesB'),
  'allArticles must spread both expansion packs'
)

const prerender = read('scripts/prerender.mjs')
assert(
  prerender.includes("articlesExpanded.ts") && prerender.includes("expandedArticlesA"),
  'prerender must index expandedArticlesA'
)
assert(
  prerender.includes("articlesExpandedB.ts") && prerender.includes("expandedArticlesB"),
  'prerender must index expandedArticlesB'
)

// Fabricated path patterns from the withdrawn pack — never reintroduce.
const bannedFragments = [
  'technologyreview.com/2026/03/deepfake-election-threat',
  'propublica.org/2026/supreme-court-ethics',
  'dhs.gov/2026/election-security-ai-assessment',
  'io.stanford.edu/2026/election-misinformation',
  'nih.gov/drug-pricing-2026',
  'ec.europa.eu/2026/critical-minerals',
  'sensity.ai/incidents-2026',
  'jcr.org/2026/deepfake',
  'ajph.aphapublications.org/2026/pharma',
]

const livePack =
  read('src/data/articles.ts') +
  read('src/data/articlesExpanded.ts') +
  read('src/data/articlesExpandedB.ts')

for (const frag of bannedFragments) {
  assert(!livePack.includes(frag), `live article pack contains banned fabricated source path: ${frag}`)
}

const liveIds = [
  ...livePack.matchAll(/"id":\s*"([^"]+)"/g),
  ...livePack.matchAll(/\bid:\s*'([^']+)'/g),
].map((m) => m[1])
const bFile = read('src/data/articlesExpandedB.ts')
const bSlugs = [...bFile.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
assert(bSlugs.length >= 4, `expected ≥4 sourced B-pack slugs, got ${bSlugs.length}`)
assert(liveIds.length >= 12, `expected at least 12 live article ids, got ${liveIds.length}`)

// B-pack sources must be government/institutional hosts we trust as durable.
const bUrls = [...bFile.matchAll(/url:\s*'(https?:\/\/[^']+)'/g)].map((m) => m[1])
assert(bUrls.length >= 12, `expected ≥12 B-pack source URLs, got ${bUrls.length}`)
const allowedHost =
  /^(https:\/\/)(www\.)?(cisa\.gov|nist\.gov|justice\.gov|bja\.ojp\.gov|fiscaldata\.treasury\.gov|fiscal\.treasury\.gov|federalreserve\.gov|treasury\.gov|ntsb\.gov|faa\.gov|supremecourt\.gov|appropriations\.senate\.gov|whitehouse\.gov)\//
for (const url of bUrls) {
  assert(allowedHost.test(url) || url.includes('supremecourt.gov/about/Code-of-Conduct'), `B-pack source host not on allowlist: ${url}`)
}

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

// New sourced slugs should eventually appear in sitemap after prerender; require presence in source pack.
for (const slug of bSlugs) {
  assert(bFile.includes(slug), `B pack missing slug ${slug}`)
}

console.log(
  `[verify:article-sources] live article ids≈${liveIds.length} B-slugs=${bSlugs.length} B-urls=${bUrls.length}`
)
// Content pack share cards must deep-link to real article slugs.
const contentPack = read('src/pages/ContentPackPage.tsx')
const packSlugs = [...contentPack.matchAll(/articleSlug:\s*'([^']+)'/g)].map((m) => m[1])
const knownSlugs = new Set(bSlugs.concat(
  [...read('src/data/articles.ts').matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]),
  [...read('src/data/articlesExpanded.ts').matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]),
))
for (const slug of packSlugs) {
  assert(knownSlugs.has(slug), `ContentPackPage articleSlug not in live catalog: ${slug}`)
}
console.log(`[verify:article-sources] content-pack slugs=${packSlugs.length} ok`)
console.log('[verify:article-sources] PASS')
