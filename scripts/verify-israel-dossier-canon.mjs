import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

const files = {
  app: 'src/App.tsx',
  canon: 'src/data/israelDossierCanon.ts',
  page: 'src/pages/IsraelDossierPage.tsx',
  briefingPage: 'src/pages/IsraelDossierBriefingPage.tsx',
  expanded: 'src/data/israelDossierExpanded.ts',
  pdf: 'src/components/DossierPDF.tsx',
  chapter15: 'src/data/chapters/chapter-15.ts',
  chapterMeta: 'src/data/chapterMeta.ts',
  chapterImages: 'src/data/chapterImages.ts',
  contentPack: 'src/data/contentPackCarousels.ts',
  articles: 'src/data/articles.ts',
  packageJson: 'package.json',
  prerender: 'scripts/prerender.mjs',
  serverSocialMeta: 'server-social-meta.js',
  behaviorVerifier: 'scripts/verify-israel-dossier-behavior.mjs',
  sourceVerifier: 'scripts/verify-source-links.mjs',
  sitemap: 'public/sitemap.xml',
  instituteCatalog: 'src/data/instituteCatalog.ts',
  templateManifest: 'public/israel-dossier/templates/manifest.json',
  workbookManifest: 'public/israel-dossier/workbooks/manifest.json',
  humanitarianTemplate: 'public/israel-dossier/templates/humanitarian-attribution-table.csv',
  sourceLedgerTemplate: 'public/israel-dossier/templates/source-ledger.csv',
  humanitarianWorkbook: 'public/israel-dossier/workbooks/humanitarian-attribution-populated.csv',
  sourceLedgerWorkbook: 'public/israel-dossier/workbooks/source-ledger-populated.csv',
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
  'ISRAEL_DOSSIER_COURSE_PATH',
  'Build the source file',
  'OCHA / UNICEF attribution table',
  'Source ledger template',
  'Humanitarian attribution table',
  'ISRAEL_DOSSIER_WORKBOOK_PACK',
  'Publishable briefing draft',
  'ISRAEL_DOSSIER_PUBLIC_BRIEFING',
  'ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT',
  'source-boundary briefing',
  'DossierBriefingSourceRow',
  'sourceRows',
  'referenceLocator',
  'archiveLookupUrl',
  'sourceCopyStatus',
  'makeArchiveLookupUrl',
  'REMOTE_SOURCE_COPY_PENDING',
  'chapterSequence',
  'Paragraph source IDs',
  'SRC-P-001',
  'AID-P-004',
  'HUM-P-001',
  'INC-P-001',
  'INC-P-004',
  'LAW-P-001',
  'LAW-P-002',
  'https://www.congress.gov/crs-product/RL33222',
  'Gaza_Reported_Impact_Snapshot_01_April_2026.pdf',
  'https://www.unicef.org/media/178696/file/State-of-Palestine-Humanitarian-Situation-Update-and-Humanitarian-Response-5-February-2026.pdf.pdf',
  'State-of-Palestine-Humanitarian-Situation-Update-and-Humanitarian-Response-5-February-2026.pdf.pdf',
  'https://cpj.org/2023/10/journalist-casualties-in-the-israel-gaza-war/',
  'https://www.aljazeera.com/news/2025/10/21/new-al-jazeera-documentary-reveals-evidence-in-hind-rajab-familys-killing',
  'https://www.aljazeera.com/news/2024/4/2/al-jazeera-sanad-probe-finds-israeli-forces-deliberately-hit-wck-convoy',
  'https://www.aljazeera.com/video/al-jazeera-world/2025/10/22/nuseirat-274',
]

for (const needle of currentNeedles) {
  assert(canon.includes(needle), `canon missing ${needle}`)
}

for (const file of [files.canon, files.humanitarianTemplate, files.sourceLedgerTemplate, files.humanitarianWorkbook, files.sourceLedgerWorkbook]) {
  assert(!read(file).includes('/media/170956/'), `${file} contains stale UNICEF media id 170956`)
}

const requiredImports = [
  files.page,
  files.briefingPage,
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
assert(has(files.page, /ISRAEL_DOSSIER_COURSE_PATH/), 'page does not consume canonical evidence course path')
assert(has(files.page, /DossierCoursePath/), 'page does not render the evidence course path component')
assert(has(files.page, /Template manifest/), 'page does not expose the evidence template manifest')
assert(has(files.page, /Workbook manifest/), 'page does not expose the populated workbook manifest')
assert(has(files.page, /Download template/), 'page does not expose active course template downloads')
assert(has(files.page, /ISRAEL_DOSSIER_WORKBOOK_PACK/), 'page does not render the populated workbook pack')
assert(has(files.page, /to="\/israel-dossier\/briefing"/), 'dossier page does not link to the public briefing surface')
assert(has(files.briefingPage, /ISRAEL_DOSSIER_PUBLIC_BRIEFING/), 'briefing page does not consume canonical briefing data')
assert(has(files.briefingPage, /ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT/), 'briefing page does not expose the chapter draft artifact')
assert(has(files.briefingPage, /Unsafe wording to avoid/), 'briefing page does not expose unsafe wording boundaries')
assert(has(files.briefingPage, /Download row file/), 'briefing page does not expose workbook row downloads')
assert(has(files.briefingPage, /Source row table/), 'briefing page does not render source-row footnote tables')
assert(has(files.briefingPage, /section\.sourceRows\.map/), 'briefing page does not render canonical source rows')
assert(has(files.briefingPage, /Reference locator/), 'briefing page does not expose reference-locator table labels')
assert(has(files.briefingPage, /Proof boundary/), 'briefing page does not expose proof-boundary table labels')
assert(has(files.briefingPage, /Open workbook/), 'briefing page does not link source rows back to workbook artifacts')
assert(has(files.briefingPage, /Archive lookup/), 'briefing page does not expose archive lookup affordances')
assert(has(files.briefingPage, /Source-copy status/), 'briefing page does not expose source-copy status')
assert(has(files.briefingPage, /row\.referenceLocator/), 'briefing page does not render canonical reference locators')
assert(has(files.briefingPage, /row\.archiveLookupUrl/), 'briefing page does not render canonical archive lookup URLs')
assert(has(files.briefingPage, /row\.sourceCopyStatus/), 'briefing page does not render canonical source-copy status')
assert(has(files.briefingPage, /Paragraph source IDs/), 'briefing page does not expose paragraph-level source row IDs')
assert(has(files.briefingPage, /Reader-facing chapter sequence/), 'briefing page does not expose the reader-facing chapter sequence')
assert(has(files.briefingPage, /briefing\.chapterSequence\.map/), 'briefing page does not render canonical chapter sequence steps')
assert(has(files.app, /IsraelDossierBriefingPage/), 'App route does not register the Israel dossier briefing page')
assert(has(files.expanded, /ISRAEL_DOSSIER_HISTORICAL_TIMELINE as HISTORICAL_TIMELINE/), 'expanded data does not re-export canonical timeline')
assert(has(files.expanded, /ISRAEL_DOSSIER_EXPANDED_INCIDENTS as EXPANDED_INCIDENTS/), 'expanded data does not re-export canonical expanded incidents')
assert(has(files.expanded, /ISRAEL_DOSSIER_LOBBYING_DATA as LOBBYING_DATA/), 'expanded data does not re-export canonical lobbying data')
assert(has(files.expanded, /ISRAEL_DOSSIER_LEGAL_CASES as LEGAL_CASES/), 'expanded data does not re-export canonical legal cases')
assert(has(files.expanded, /ISRAEL_DOSSIER_EXPANDED_STATS as EXPANDED_STATS/), 'expanded data does not re-export canonical expanded stats')
assert(has(files.packageJson, /verify:israel-dossier:behavior/), 'package.json does not expose the Israel dossier behavior verifier')
assert(has(files.behaviorVerifier, /Source Workbench/), 'behavior verifier does not exercise the source workbench')
assert(has(files.behaviorVerifier, /evidence course path/i), 'behavior verifier does not exercise the evidence course path')
assert(has(files.behaviorVerifier, /OCHA \/ UNICEF attribution table/), 'behavior verifier does not exercise the course module interaction')
assert(has(files.behaviorVerifier, /Download Complete Dossier/), 'behavior verifier does not exercise dossier PDF export')
assert(has(files.behaviorVerifier, /H\\.R\\.815/), 'behavior verifier does not exercise money-trail expansion')
assert(has(files.behaviorVerifier, /chapter-15/), 'behavior verifier does not exercise Chapter 15 public preview')
assert(has(files.behaviorVerifier, /extractPdfText/), 'behavior verifier does not assert generated PDF text')
assert(has(files.behaviorVerifier, /og:type/), 'behavior verifier does not assert crawler Open Graph metadata')
assert(has(files.behaviorVerifier, /naturalWidth/), 'behavior verifier does not assert social preview image renderability')
assert(has(files.behaviorVerifier, /public briefing surface/), 'behavior verifier does not exercise the public briefing surface')
assert(has(files.chapter15, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter 15 does not consume canonical companion copy')
assert(has(files.chapterMeta, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter metadata does not consume canonical chapter 15 copy')
assert(has(files.chapterImages, /ISRAEL_DOSSIER_CHAPTER_15/), 'chapter images do not consume canonical chapter 15 imagery')
assert(has(files.articles, /CRS's \$298 billion constant-dollar aid-obligation total for 1946-2024/), 'article callouts are not aligned to the canonical CRS figure')
assert(has(files.prerender, /normalizeCanonicalChapterMetaReferences/), 'prerender route discovery does not normalize canonical chapter metadata references')
assert(has(files.prerender, /\/israel-dossier\/briefing/), 'prerender does not include the Israel dossier briefing route')
assert(has(files.serverSocialMeta, /\/israel-dossier\/briefing/), 'server social metadata does not include the briefing route')
assert(has(files.sourceVerifier, /israelDossierCanon\.ts/), 'source-link verifier does not scan the Israel dossier canon')
assert(has(files.sourceVerifier, /source-link-trends/), 'source-link verifier does not emit trend reports')
assert(has(files.sourceVerifier, /retryHeavy/), 'source-link verifier does not identify retry-heavy URLs')
assert(has(files.sitemap, /https:\/\/veritasworldwide\.com\/chapter\/chapter-15/), 'sitemap is missing chapter 15 after canonical metadata normalization')
assert(has(files.sitemap, /https:\/\/veritasworldwide\.com\/israel-dossier\/briefing/), 'sitemap is missing the Israel dossier briefing route')
assert(has(files.pdf, /ISRAEL_DOSSIER_COURSE_PATH/), 'PDF export does not include the evidence course path')
assert(has(files.pdf, /module\.artifact\.label/), 'PDF export does not include evidence course artifact labels')
assert(has(files.instituteCatalog, /Expected 106 topics/), 'Institute catalog topic-count guard was not updated for Israel dossier courses')
const courseSlugs = [
  'build-israel-dossier-source-file',
  'audit-israel-aid-records',
  'verify-gaza-humanitarian-figures',
  'test-israel-dossier-incident-evidence',
  'read-israel-dossier-legal-records',
  'write-israel-dossier-briefings',
]
for (const slug of courseSlugs) {
  assert(read(files.instituteCatalog).includes(`slug: '${slug}'`), `Institute catalog missing Israel dossier course slug ${slug}`)
  assert(read(files.sitemap).includes(`https://veritasworldwide.com/institute/courses/${slug}`), `sitemap missing Israel dossier course ${slug}`)
  assert(read(files.sitemap).includes(`https://veritasworldwide.com/institute/guides/${slug}`), `sitemap missing Israel dossier guide ${slug}`)
}
for (const artifact of [
  ['source-ledger.csv', 'confidence_label'],
  ['aid-ledger.csv', 'record_type'],
  ['humanitarian-attribution-table.csv', 'verification_boundary'],
  ['incident-evidence-matrix.csv', 'unsafe_wording_to_avoid'],
  ['legal-status-brief.csv', 'procedural_posture'],
  ['publishable-briefing-outline.md', 'Editor QA'],
  ['manifest.json', 'Israel Dossier Evidence Course Templates'],
]) {
  const [fileName, needle] = artifact
  const templatePath = `public/israel-dossier/templates/${fileName}`
  assert(fs.existsSync(path.join(root, templatePath)), `missing evidence course template ${templatePath}`)
  assert(read(templatePath).includes(needle), `template ${templatePath} missing ${needle}`)
  if (fileName !== 'manifest.json') {
    assert(read(files.templateManifest).includes(fileName), `template manifest missing ${fileName}`)
  }
}
for (const workbook of [
  ['source-ledger-populated.csv', 'SRC-P-001'],
  ['aid-ledger-populated.csv', 'AID-P-001'],
  ['humanitarian-attribution-populated.csv', 'HUM-P-001'],
  ['incident-evidence-populated.csv', 'INC-P-001'],
  ['legal-status-populated.csv', 'LAW-P-001'],
  ['publishable-briefing-draft.md', 'Claim Boundary'],
  ['public-briefing-chapter-draft.md', 'Paragraph source IDs'],
  ['manifest.json', 'Israel Dossier Populated Evidence Workbooks'],
]) {
  const [fileName, needle] = workbook
  const workbookPath = `public/israel-dossier/workbooks/${fileName}`
  assert(fs.existsSync(path.join(root, workbookPath)), `missing populated dossier workbook ${workbookPath}`)
  assert(read(workbookPath).includes(needle), `workbook ${workbookPath} missing ${needle}`)
  if (fileName !== 'manifest.json') {
    assert(read(files.workbookManifest).includes(fileName), `workbook manifest missing ${fileName}`)
  }
}

if (errors.length) {
  console.error('[verify:israel-dossier] FAIL')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('[verify:israel-dossier] PASS - canonical Israel dossier data is shared across page, PDF, carousel, and chapter companions')
