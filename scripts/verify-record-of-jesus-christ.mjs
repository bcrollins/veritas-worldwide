/**
 * Verify Record of Jesus Christ corpus integrity + anonymity hygiene.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

const dataPath = path.join(root, 'src/data/recordOfJesusChrist.ts')
const extrasPath = path.join(root, 'src/data/recordOfJesusChristExtras.ts')
const wave3Path = path.join(root, 'src/data/recordOfJesusChristWave3.ts')
const pagePath = path.join(root, 'src/pages/RecordOfJesusChristPage.tsx')
const tiersPath = path.join(root, 'src/data/evidenceTiers.ts')
const appPath = path.join(root, 'src/App.tsx')
const adminPath = path.join(root, 'src/lib/adminAuth.ts')
const citePath = path.join(root, 'src/components/CitationGenerator.tsx')
const homePath = path.join(root, 'src/pages/HomePage.tsx')
const biblePath = path.join(root, 'src/pages/BibleHistoryPage.tsx')
const llmsPath = path.join(root, 'public/llms.txt')

for (const p of [dataPath, extrasPath, wave3Path, pagePath, tiersPath, appPath, adminPath, citePath, homePath, biblePath, llmsPath]) {
  assert(fs.existsSync(p), `missing required file ${path.relative(root, p)}`)
}

const data = fs.readFileSync(dataPath, 'utf8')
const extras = fs.readFileSync(extrasPath, 'utf8')
const wave3 = fs.readFileSync(wave3Path, 'utf8')
const page = fs.readFileSync(pagePath, 'utf8')
const tiers = fs.readFileSync(tiersPath, 'utf8')
const app = fs.readFileSync(appPath, 'utf8')
const admin = fs.readFileSync(adminPath, 'utf8')
const cite = fs.readFileSync(citePath, 'utf8')
const home = fs.readFileSync(homePath, 'utf8')
const bible = fs.readFileSync(biblePath, 'utf8')
const llms = fs.readFileSync(llmsPath, 'utf8')

const requiredTiers = [
  'verified',
  'well_attested',
  'circumstantial',
  'contested',
  'interpretive',
  'speculative',
  'literary_theological',
]
for (const t of requiredTiers) {
  assert(tiers.includes(`'${t}'`) || tiers.includes(`"${t}"`), `tier taxonomy missing ${t}`)
}

assert(data.includes('ROC_SECTIONS'), 'ROC_SECTIONS export missing')
assert(data.includes("id: 'cosmology'"), 'cosmology section missing')
assert(data.includes("id: 'historical-jesus'"), 'historical-jesus section missing')
assert(data.includes("id: 'nt-textual-criticism'"), 'nt-textual-criticism section missing')
assert(data.includes("id: 'non-christian-attestation'"), 'non-christian section missing')
assert(data.includes('rocExportJson'), 'JSON export helper missing')
assert(data.includes('rocExportCsv'), 'CSV export helper missing')
assert(data.includes('ROC_EXTRA_CLAIMS'), 'extras merge missing')
assert(extras.includes('ROC_TIMELINE'), 'timeline export missing')
assert(extras.includes('ROC_EXTRA_CLAIMS'), 'extra claims map missing')

const wave4 = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave4.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave4.ts'), 'utf8')
  : ''
const wave5 = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave5.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave5.ts'), 'utf8')
  : ''
const wave6src = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave6.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave6.ts'), 'utf8')
  : ''
const wave7forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave7.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave7.ts'), 'utf8')
  : ''
const wave8forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave8.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave8.ts'), 'utf8')
  : ''
const wave9forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave9.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave9.ts'), 'utf8')
  : ''
const wave10forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave10.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave10.ts'), 'utf8')
  : ''
const wave11forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave11.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave11.ts'), 'utf8')
  : ''
const wave12forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave12.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave12.ts'), 'utf8')
  : ''
const wave13forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave13.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave13.ts'), 'utf8')
  : ''
const wave14forCount = fs.existsSync(path.join(root, 'src/data/recordOfJesusChristWave14.ts'))
  ? fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave14.ts'), 'utf8')
  : ''
const tierHits =
  (data.match(/tier: '/g) || []).length +
  (extras.match(/tier: '/g) || []).length +
  (wave3.match(/tier: '/g) || []).length +
  (wave4.match(/tier: '/g) || []).length +
  (wave5.match(/tier: '/g) || []).length +
  (wave6src.match(/tier: '/g) || []).length +
  (wave7forCount.match(/tier: '/g) || []).length +
  (wave8forCount.match(/tier: '/g) || []).length +
  (wave9forCount.match(/tier: '/g) || []).length +
  (wave10forCount.match(/tier: '/g) || []).length +
  (wave11forCount.match(/tier: '/g) || []).length +
  (wave12forCount.match(/tier: '/g) || []).length +
  (wave13forCount.match(/tier: '/g) || []).length +
  (wave14forCount.match(/tier: '/g) || []).length
assert(tierHits >= 190, `expected ≥190 tiered claims across base+waves, got ${tierHits}`)
// Durable wave wiring: generated barrel (not hand-maintained merge list)
const barrelPath = path.join(root, 'src/data/recordOfJesusChristWaves.generated.ts')
assert(fs.existsSync(barrelPath), 'wave barrel missing — run node scripts/generate-roc-waves-barrel.mjs')
assert(data.includes('ROC_WAVE_CLAIM_MAPS'), 'main corpus must import ROC_WAVE_CLAIM_MAPS barrel')
assert(data.includes("from './recordOfJesusChristWaves.generated'"), 'main corpus must import generated wave barrel')
const barrel = fs.readFileSync(barrelPath, 'utf8')
assert(barrel.includes('ROC_WAVE_CLAIM_MAPS'), 'generated barrel missing ROC_WAVE_CLAIM_MAPS')
const dataDir = path.join(root, 'src/data')
const waveFiles = fs
  .readdirSync(dataDir)
  .filter((n) => /^recordOfJesusChristWave\d+\.ts$/.test(n))
  .sort((a, b) => Number(a.match(/Wave(\d+)/)?.[1] || 0) - Number(b.match(/Wave(\d+)/)?.[1] || 0))
assert(waveFiles.length >= 30, `expected ≥30 wave files, got ${waveFiles.length}`)
for (const wf of waveFiles) {
  const n = Number(wf.match(/Wave(\d+)/)?.[1] || 0)
  assert(barrel.includes(`ROC_WAVE${n}_CLAIMS`), `barrel missing ROC_WAVE${n}_CLAIMS for ${wf}`)
  assert(fs.existsSync(path.join(dataDir, wf)), `wave file missing ${wf}`)
}
// Soft floor auto-written by export
const softFloorPath = path.join(root, 'public/record-of-jesus-christ/soft-floor.json')
assert(fs.existsSync(softFloorPath), 'soft-floor.json missing — run export:roc-corpus')
const softFloor = JSON.parse(fs.readFileSync(softFloorPath, 'utf8'))
assert(typeof softFloor.claimCount === 'number' && softFloor.claimCount >= 417, 'soft-floor claimCount invalid')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave6src), 'wave6 must not contain operator identity')
assert((wave6src.match(/tier: '/g) || []).length >= 18, 'wave6 should add a substantial claim batch')
const wave7src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave7.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave7src), 'wave7 must not contain operator identity')
assert((wave7src.match(/tier: '/g) || []).length >= 10, 'wave7 should add a solid claim batch')
const wave8src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave8.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave8src), 'wave8 must not contain operator identity')
assert((wave8src.match(/tier: '/g) || []).length >= 10, 'wave8 should add a solid claim batch')
const wave9src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave9.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave9src), 'wave9 must not contain operator identity')
assert((wave9src.match(/tier: '/g) || []).length >= 8, 'wave9 should add a solid claim batch')
const wave10src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave10.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave10src), 'wave10 must not contain operator identity')
assert((wave10src.match(/tier: '/g) || []).length >= 8, 'wave10 should add a solid claim batch')
const wave11src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave11.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave11src), 'wave11 must not contain operator identity')
assert((wave11src.match(/tier: '/g) || []).length >= 8, 'wave11 should add a solid claim batch')
const wave12src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave12.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave12src), 'wave12 must not contain operator identity')
assert((wave12src.match(/tier: '/g) || []).length >= 8, 'wave12 should add a solid claim batch')
const wave13src = fs.readFileSync(path.join(root, 'src/data/recordOfJesusChristWave13.ts'), 'utf8')
assert(!/brollins|bcrollins|brandoncrollins/i.test(wave13src), 'wave13 must not contain operator identity')
assert((wave13src.match(/tier: '/g) || []).length >= 8, 'wave13 should add a solid claim batch')
assert(page.includes('Copy citation'), 'per-claim cite control missing')
assert(page.includes('Skip to evidence content'), 'skip link missing for a11y')
assert(page.includes('faqJsonLd'), 'ROC FAQ schema missing')
assert(page.includes('roc-claim-search') || page.includes('roc-claim-search'), 'ROC claim search missing')
assert(bible.includes('SCHOLARLY_TIERS') || bible.includes('well_attested') || bible.includes('contested'), 'Bible page not upgraded toward 7-tier taxonomy')
assert(!bible.includes("type EvidenceTier = 'verified' | 'circumstantial' | 'disputed'"), 'Bible page still on legacy 3-tier type')

assert(data.includes("publisher: 'Veritas Worldwide'") || data.includes('Veritas Worldwide'), 'entity publisher required')
assert(page.includes('Record of Jesus Christ'), 'page title missing')
assert(page.includes('Veritas Worldwide'), 'entity attribution on page required')
assert(page.includes('Export full JSON') || page.includes('Export JSON'), 'researcher JSON export UI missing')
assert(page.includes('Export full CSV') || page.includes('Export CSV'), 'researcher CSV export UI missing')
assert(page.includes('Export filtered JSON') || page.includes('filtered.json'), 'filtered export UI missing')
assert(page.includes('Open primary source') || page.includes('primary source'), 'one-tap primary source control missing')
assert(page.includes('Interactive evidence timeline'), 'timeline UI missing')
assert(page.includes('veritas_roc_active_tiers'), 'tier preference persistence missing')
assert(page.includes('veritas_roc_domain_filter') || page.includes('DOMAIN_PREF_KEY'), 'domain filter persistence missing')
assert(page.includes("searchParams.get('q')") || page.includes("get('q')"), 'ROC ?q= deep-link missing')
assert(page.includes("searchParams.get('tier')") || page.includes("get('tier')"), 'ROC ?tier= deep-link missing')
assert(app.includes('/record-of-jesus-christ'), 'route not wired in App')
assert(app.includes('RecordOfJesusChristPage'), 'lazy page import missing')
assert(home.includes('/record-of-jesus-christ'), 'home discoverability card missing')
assert(llms.includes('/record-of-jesus-christ'), 'llms.txt missing ROC path')
assert(llms.includes('record-of-jesus-christ/corpus.json'), 'llms.txt missing corpus.json')
assert(llms.includes('record-of-jesus-christ.pdf'), 'llms.txt missing ROC PDF')
assert(llms.includes('historical-jesus-evidence'), 'llms.txt missing historical-jesus topic hub')
// Permanent depth advertise: any 3-digit "N+" (e.g. 410+) — do not use \b after '+' (non-word).
assert(
  /(?<!\d)\d{3}\+(?!\d)/.test(llms) && llms.includes('record-of-jesus-christ'),
  'llms.txt should advertise corpus depth (e.g. 400+ / 410+ tier-labeled claims)',
)
const corpusPath = path.join(root, 'public/record-of-jesus-christ/corpus.json')
assert(fs.existsSync(corpusPath), 'public ROC corpus.json missing — run npm run export:roc-corpus')
const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'))
assert(corpus.claimCount >= 651, `corpus claimCount should include wave61 (≥651), got ${corpus.claimCount}`)
assert(
  softFloor.claimCount === corpus.claimCount,
  `soft-floor claimCount ${softFloor.claimCount} must equal corpus ${corpus.claimCount}`,
)
assert(corpus.meta?.publisher === 'Veritas Worldwide', 'corpus publisher must be entity-only')
assert(fs.existsSync(path.join(root, 'public/og/record-of-jesus-christ.png')), 'ROC OG PNG missing')
assert(fs.existsSync(path.join(root, 'public/record-of-jesus-christ/figures/cmb-power-spectrum-schematic.svg')), 'CMB figure missing')
assert(fs.existsSync(path.join(root, 'public/record-of-jesus-christ/figures/ane-inscription-sites.svg')), 'ANE map figure missing')
assert(
  fs.existsSync(path.join(root, 'public/record-of-jesus-christ/figures/nt-textual-tradition-schematic.svg')),
  'NT textual tradition figure missing',
)
assert(page.includes('nt-textual-tradition-schematic'), 'ROC page must surface NT textual tradition figure')
assert(fs.existsSync(path.join(root, 'public/record-of-jesus-christ/record-of-jesus-christ.pdf')), 'ROC PDF missing — run npm run generate:roc-pdf')
assert(page.includes('Schematic figures') || page.includes('figures-heading'), 'figures section missing on page')
assert(page.includes('/record-of-jesus-christ/record-of-jesus-christ.pdf'), 'PDF link missing on page')
assert(fs.existsSync(path.join(root, 'docs/record-of-jesus-christ/07-PATH-TO-10.md')), 'path-to-10 doc missing')
assert(fs.existsSync(path.join(root, 'docs/record-of-jesus-christ/06-OPSEC-AND-PRIVACY.md')), 'OPSEC doc missing')
const tiersMod = fs.readFileSync(path.join(root, 'src/data/evidenceTiers.ts'), 'utf8')
assert(tiersMod.includes('VOLUME_I_TO_SCHOLARLY'), 'Volume I tier mapping missing')

// Anonymity hygiene on touched surfaces
const identityRe = /brollins565|brandoncrollins@|bcrollins\/veritas|@incollection\{rollins|\*Rosie2010/i
assert(!identityRe.test(admin), 'adminAuth still contains identity or plaintext credential residue')
assert(!identityRe.test(cite), 'CitationGenerator still contains personal BibTeX key')
assert(!identityRe.test(data), 'ROC data contains identity residue')
assert(!identityRe.test(extras), 'ROC extras contain identity residue')
assert(!identityRe.test(page), 'ROC page contains identity residue')
assert(!app.includes('github.com/bcrollins/veritas-worldwide'), 'App footer still links personal GitHub namespace')

// Docs package
const docsDir = path.join(root, 'docs/record-of-jesus-christ')
assert(fs.existsSync(path.join(docsDir, '00-METHODOLOGY.md')), 'methodology doc missing')
assert(fs.existsSync(path.join(docsDir, 'ANONYMITY-AUDIT.md')), 'anonymity audit doc missing')

if (failures.length) {
  console.error('[verify:record-of-jesus-christ] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(`[verify:record-of-jesus-christ] PASS — ${tierHits} tier labels, exports, timeline, llms, anonymity scrub`)
