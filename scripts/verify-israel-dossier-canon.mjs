import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const files = {
  canon: 'src/data/israelDossierCanon.ts',
  page: 'src/pages/IsraelDossierPage.tsx',
  expanded: 'src/data/israelDossierExpanded.ts',
  pdf: 'src/components/DossierPDF.tsx',
  chapter15: 'src/data/chapters/chapter-15.ts',
  chapterMeta: 'src/data/chapterMeta.ts',
  chapterImages: 'src/data/chapterImages.ts',
  contentPack: 'src/data/contentPackCarousels.ts',
  articles: 'src/data/articles.ts',
  packageJson: 'package.json',
  prerender: 'scripts/prerender.mjs',
  behaviorVerifier: 'scripts/verify-israel-dossier-behavior.mjs',
  sourceVerifier: 'scripts/verify-source-links.mjs',
  sitemap: 'public/sitemap.xml',
}

const errors = []
const has = (file, pattern) => pattern.test(read(file))
const assert = (condition, message) => {
  if (!condition) errors.push(message)
}

const canon = read(files.canon)
const currentNeedles = [
  "ISRAEL_DOSSIER_LAST_VERIFIED = '2026-04-22'",
  "value: '72,289+'",
  "value: '21,289+'",
  "value: '261+'",
  "value: '$298B'",
  'ISRAEL_DOSSIER_CORE_STATS',
  'ISRAEL_DOSSIER_CORE_INCIDENTS',
  'ISRAEL_DOSSIER_MONEY_TRAIL',
  'ISRAEL_DOSSIER_HISTORICAL_TIMELINE',
  'ISRAEL_DOSSIER_EXPANDED_INCIDENTS',
  'ISRAEL_DOSSIER_LOBBYING_DATA',
  'ISRAEL_DOSSIER_LEGAL_CASES',
  'ISRAEL_DOSSIER_EXPANDED_STATS',
  'https://www.congress.gov/crs-product/RL33222',
  'Gaza_Reported_Impact_Snapshot_01_April_2026.pdf',
  'State-of-Palestine-Humanitarian-Situation-Update-and-Humanitarian-Response-5-February-2026.pdf.pdf',
  'https://cpj.org/2023/10/journalist-casualties-in-the-israel-gaza-war/',
  'https://www.aljazeera.com/news/2025/10/21/new-al-jazeera-documentary-reveals-evidence-in-hind-rajab-familys-killing',
  'https://www.aljazeera.com/news/2024/4/2/al-jazeera-sanad-probe-finds-israeli-forces-deliberately-hit-wck-convoy',
  'https://www.aljazeera.com/video/al-jazeera-world/2025/10/22/nuseirat-274',
]

for (const needle of currentNeedles) {
  assert(canon.includes(needle), `canon missing ${needle}`)
}

const requiredImports = [
  files.page,
  files.expanded,
  files.pdf,
  files.chapter15,
  files.chapterMeta,
  files.chapterImages,
  files.contentPack,
]

for (const file of requiredImports) {
  assert(read(file).includes('israelDossierCanon'), `${file} does not import the Israel dossier canon`)
}

const duplicateDefinitionFiles = [files.page, files.expanded, files.pdf, files.chapter15, files.chapterMeta, files.chapterImages, files.contentPack, files.articles]
const duplicateDefinitions = [
  /const\s+DOSSIER_ASSETS\s*=/,
  /const\s+DOSSIER_LAST_VERIFIED\s*=/,
  /const\s+LATEST_PUBLIC_RECORDS\s*=/,
  /const\s+SOURCE_CATEGORY_META\s*=/,
  /const\s+nums\s*=\s*\[/,
  /const\s+keyStats\s*=\s*\[/,
  /const\s+STATS\s*:\s*StatCard\[\]\s*=\s*\[/,
  /const\s+INCIDENTS\s*:\s*DocumentedIncident\[\]\s*=\s*\[/,
  /const\s+MONEY_TRAIL\s*:\s*MoneyTrailNode\[\]\s*=\s*\[/,
  /export\s+const\s+HISTORICAL_TIMELINE\s*:\s*TimelineEvent\[\]\s*=\s*\[/,
  /export\s+const\s+EXPANDED_INCIDENTS\s*:\s*DocumentedIncident\[\]\s*=\s*\[/,
  /export\s+const\s+LOBBYING_DATA\s*:\s*LobbyingRecord\[\]\s*=\s*\[/,
  /export\s+const\s+LEGAL_CASES\s*:\s*LegalCase\[\]\s*=\s*\[/,
  /export\s+const\s+EXPANDED_STATS\s*:\s*StatCard\[\]\s*=\s*\[/,
  /headline:\s*'\$298 BILLION'/,
]

for (const file of duplicateDefinitionFiles) {
  const text = read(file)
  for (const pattern of duplicateDefinitions) {
    assert(!pattern.test(text), `${file} redefines canonical dossier data: ${pattern}`)
  }
}

const pageOnlyDuplicateDefinitions = [
  /interface\s+StatCard\s*\{/,
  /interface\s+DocumentedIncident\s*\{/,
  /interface\s+MoneyTrailNode\s*\{/,
]
for (const pattern of pageOnlyDuplicateDefinitions) {
  assert(!pattern.test(read(files.page)), `${files.page} redefines canonical page data types: ${pattern}`)
}

const expandedOnlyDuplicateDefinitions = [
  /export\s+interface\s+StatCard\s*\{/,
  /export\s+interface\s+DocumentedIncident\s*\{/,
  /export\s+interface\s+TimelineEvent\s*\{/,
  /export\s+interface\s+LobbyingRecord\s*\{/,
  /export\s+interface\s+LegalCase\s*\{/,
]
for (const pattern of expandedOnlyDuplicateDefinitions) {
  assert(!pattern.test(read(files.expanded)), `${files.expanded} redefines canonical expanded data types: ${pattern}`)
}

const staleTextFiles = [files.page, files.expanded, files.pdf, files.chapter15, files.chapterMeta, files.chapterImages, files.contentPack, files.articles]
const stalePatterns = [
  /\$310B/i,
  /\$310 billion/i,
  /310 billion/i,
  /75,000\+/,
  /17,000\+/,
  /254\+/,
  /610\+/,
  /Buy Congress/i,
  /AI Decides Who Dies/i,
  /what your government doesn't want/i,
  /This is what \$310 billion bought/i,
  /program\/fault-lines\/2025\/10\/21\/hind-rajab/i,
  /what-is-world-central-kitchen-which-lost-seven-workers/i,
  /program\/investigations\/2024\/8\/14\/investigation-nuseirat/i,
]

for (const file of staleTextFiles) {
  const text = read(file)
  for (const pattern of stalePatterns) {
    assert(!pattern.test(text), `${file} contains stale Israel dossier text: ${pattern}`)
  }
}

for (const file of [files.page, files.expanded, files.chapter15]) {
  assert(!/upload\.wikimedia\.org|commons\.wikimedia\.org/.test(read(file)), `${file} should not depend on external Wikimedia dossier imagery`)
}

assert(has(files.expanded, /\.\.\.ISRAEL_DOSSIER_CANON_CAROUSEL_SLIDES/), 'expanded dossier carousel does not consume canonical public-record slides')
assert(has(files.pdf, /const\s+nums\s*=\s*ISRAEL_DOSSIER_PDF_COVER_STATS/), 'PDF cover stats do not consume canonical stats')
assert(has(files.pdf, /const\s+keyStats\s*=\s*ISRAEL_DOSSIER_PDF_KEY_STATS/), 'PDF key stats do not consume canonical stats')
assert(has(files.contentPack, /ISRAEL_DOSSIER_BRAND_SLIDE/), 'content pack does not consume canonical Israel dossier slide')
assert(has(files.page, /ISRAEL_DOSSIER_CORE_STATS/), 'page does not consume canonical core stats')
assert(has(files.page, /ISRAEL_DOSSIER_CORE_INCIDENTS/), 'page does not consume canonical core incidents')
assert(has(files.page, /ISRAEL_DOSSIER_MONEY_TRAIL/), 'page does not consume canonical money trail')
assert(has(files.expanded, /ISRAEL_DOSSIER_HISTORICAL_TIMELINE as HISTORICAL_TIMELINE/), 'expanded data does not re-export canonical timeline')
assert(has(files.expanded, /ISRAEL_DOSSIER_EXPANDED_INCIDENTS as EXPANDED_INCIDENTS/), 'expanded data does not re-export canonical expanded incidents')
assert(has(files.expanded, /ISRAEL_DOSSIER_LOBBYING_DATA as LOBBYING_DATA/), 'expanded data does not re-export canonical lobbying data')
assert(has(files.expanded, /ISRAEL_DOSSIER_LEGAL_CASES as LEGAL_CASES/), 'expanded data does not re-export canonical legal cases')
assert(has(files.expanded, /ISRAEL_DOSSIER_EXPANDED_STATS as EXPANDED_STATS/), 'expanded data does not re-export canonical expanded stats')
assert(has(files.packageJson, /verify:israel-dossier:behavior/), 'package.json does not expose the Israel dossier behavior verifier')
assert(has(files.behaviorVerifier, /Source Workbench/), 'behavior verifier does not exercise the source workbench')
assert(has(files.behaviorVerifier, /Download Complete Dossier/), 'behavior verifier does not exercise dossier PDF export')
assert(has(files.behaviorVerifier, /H\\.R\\.815/), 'behavior verifier does not exercise money-trail expansion')
assert(has(files.behaviorVerifier, /chapter-15/), 'behavior verifier does not exercise Chapter 15 public preview')
assert(has(files.behaviorVerifier, /extractPdfText/), 'behavior verifier does not assert generated PDF text')
assert(has(files.behaviorVerifier, /og:type/), 'behavior verifier does not assert crawler Open Graph metadata')
assert(has(files.behaviorVerifier, /naturalWidth/), 'behavior verifier does not assert social preview image renderability')
assert(has(files.chapter15, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter 15 does not consume canonical companion copy')
assert(has(files.chapterMeta, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter metadata does not consume canonical chapter 15 copy')
assert(has(files.chapterImages, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter images do not consume canonical chapter 15 imagery')
assert(has(files.articles, /CRS's \$298 billion constant-dollar aid-obligation total for 1946-2024/), 'article callouts are not aligned to the canonical CRS figure')
assert(has(files.prerender, /normalizeCanonicalChapterMetaReferences/), 'prerender route discovery does not normalize canonical chapter metadata references')
assert(has(files.sourceVerifier, /israelDossierCanon\.ts/), 'source-link verifier does not scan the Israel dossier canon')
assert(has(files.sourceVerifier, /source-link-trends/), 'source-link verifier does not emit trend reports')
assert(has(files.sourceVerifier, /retryHeavy/), 'source-link verifier does not identify retry-heavy URLs')
assert(has(files.sitemap, /https:\/\/veritasworldwide\.com\/chapter\/chapter-15/), 'sitemap is missing chapter 15 after canonical metadata normalization')

if (errors.length) {
  console.error('[verify:israel-dossier] FAIL')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('[verify:israel-dossier] PASS - canonical Israel dossier data is shared across page, PDF, carousel, and chapter companions')
