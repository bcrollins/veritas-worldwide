/**
 * Verify Record of Jesus Christ corpus integrity + anonymity hygiene.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

// Dynamic import of compiled-less TS is not available; parse source heuristically + require built data via strip.
// Load the TypeScript file content for structural checks.
const dataPath = path.join(root, 'src/data/recordOfJesusChrist.ts')
const pagePath = path.join(root, 'src/pages/RecordOfJesusChristPage.tsx')
const tiersPath = path.join(root, 'src/data/evidenceTiers.ts')
const appPath = path.join(root, 'src/App.tsx')
const adminPath = path.join(root, 'src/lib/adminAuth.ts')
const citePath = path.join(root, 'src/components/CitationGenerator.tsx')

for (const p of [dataPath, pagePath, tiersPath, appPath, adminPath, citePath]) {
  assert(fs.existsSync(p), `missing required file ${path.relative(root, p)}`)
}

const data = fs.readFileSync(dataPath, 'utf8')
const page = fs.readFileSync(pagePath, 'utf8')
const tiers = fs.readFileSync(tiersPath, 'utf8')
const app = fs.readFileSync(appPath, 'utf8')
const admin = fs.readFileSync(adminPath, 'utf8')
const cite = fs.readFileSync(citePath, 'utf8')

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
assert((data.match(/tier: '/g) || []).length >= 30, 'expected ≥30 tiered claims')
assert(data.includes("publisher: 'Veritas Worldwide'") || data.includes('Veritas Worldwide'), 'entity publisher required')
assert(page.includes('Record of Jesus Christ'), 'page title missing')
assert(page.includes('Veritas Worldwide'), 'entity attribution on page required')
assert(app.includes('/record-of-jesus-christ'), 'route not wired in App')
assert(app.includes('RecordOfJesusChristPage'), 'lazy page import missing')

// Anonymity hygiene on touched surfaces
const identityRe = /brollins565|brandoncrollins@|bcrollins\/veritas|@incollection\{rollins|\*Rosie2010/i
assert(!identityRe.test(admin), 'adminAuth still contains identity or plaintext credential residue')
assert(!identityRe.test(cite), 'CitationGenerator still contains personal BibTeX key')
assert(!identityRe.test(data), 'ROC data contains identity residue')
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

console.log('[verify:record-of-jesus-christ] PASS — corpus, route, entity attribution, anonymity scrub')
