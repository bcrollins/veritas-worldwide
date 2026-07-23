#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
function assert(c, m) { if (!c) failures.push(m) }
const expanded = readFileSync(join(root, 'src/data/israelDossierExpanded.ts'), 'utf8')
const vi = readFileSync(join(root, 'src/data/israelDossierVisualInvestigations.ts'), 'utf8')
const corpus = JSON.parse(readFileSync(join(root, 'public/israel-dossier/corpus.json'), 'utf8'))
const hub = readFileSync(join(root, 'src/pages/ResearcherHubPage.tsx'), 'utf8')
const prerender = readFileSync(join(root, 'scripts/prerender.mjs'), 'utf8')
assert(expanded.includes('ISRAEL_DOSSIER_VISUAL_INVESTIGATIONS'), 'visual pack not wired into EXPANDED_INCIDENTS')
assert(vi.includes('vi-hind-rajab-2024'), 'visual pack missing seed row')
assert((corpus.incidents || []).length >= 806, `corpus incidents ${corpus.incidents?.length} < 753`)
assert(hub.includes('researcher-live-corpus-counts'), 'researcher hub missing live counts')
assert(prerender.includes("route: '/researcher'"), 'prerender missing /researcher hub')
if (failures.length) {
  console.error('[verify:visual-investigations-floor] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:visual-investigations-floor] PASS — VI pack wired, corpus≥797, researcher hub+prerender')
