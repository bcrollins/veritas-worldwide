#!/usr/bin/env node
/**
 * Pure floors for Israel Dossier Visual Investigations densify.
 * Attribution: Veritas Worldwide only.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
function assert(c, m) {
  if (!c) failures.push(m)
}

const expanded = readFileSync(join(root, 'src/data/israelDossierExpanded.ts'), 'utf8')
const vi = readFileSync(join(root, 'src/data/israelDossierVisualInvestigations.ts'), 'utf8')
const page = readFileSync(join(root, 'src/pages/IsraelDossierPage.tsx'), 'utf8')
const corpus = JSON.parse(readFileSync(join(root, 'public/israel-dossier/corpus.json'), 'utf8'))
const soft = JSON.parse(readFileSync(join(root, 'public/israel-dossier/soft-floor.json'), 'utf8'))
const viIndex = JSON.parse(readFileSync(join(root, 'public/israel-dossier/visual-investigations.json'), 'utf8'))
const hub = readFileSync(join(root, 'src/pages/ResearcherHubPage.tsx'), 'utf8')
const prerender = readFileSync(join(root, 'scripts/prerender.mjs'), 'utf8')

assert(expanded.includes('ISRAEL_DOSSIER_VISUAL_INVESTIGATIONS'), 'visual pack not wired into EXPANDED_INCIDENTS')
assert(vi.includes('vi-hind-rajab-2024'), 'visual pack missing seed row')
assert(vi.includes('vi-forensic-architecture'), 'visual pack missing FA densify')
assert(vi.includes('vi-al-ahli-hospital-blast-visual-2023'), 'visual pack missing Al-Ahli contested forensics card')
assert(!/brollins|brandoncrollins|aerolink/i.test(vi), 'VI pack identity leak')

const cards = (vi.match(/id: 'vi-/g) || []).length
assert(cards >= 50, `VI pack should have ≥50 cards, got ${cards}`)
const urls = (vi.match(/url: 'https?:\/\//g) || []).length
assert(urls >= cards * 2, `VI dual-cite floor: cards=${cards} urls=${urls}`)

const n = (corpus.incidents || []).length
assert(n >= 867, `corpus incidents ${n} < 855`)
const withVideo = (corpus.incidents || []).filter((i) =>
  (i.multimedia || []).some((m) => m.type === 'video'),
).length
assert(withVideo >= 54, `corpus video-linked incidents ${withVideo} < 50`)
assert(soft.incidentCount >= 867, `soft-floor ${soft.incidentCount} < 855`)
assert(
  soft.visualInvestigations && soft.visualInvestigations.withVideo >= 54,
  `soft-floor withVideo ${soft.visualInvestigations?.withVideo} < 50`,
)
assert(viIndex.meta?.publisher === 'Veritas Worldwide', 'VI index publisher must be entity-only')
assert(
  (viIndex.counts?.incidentsWithVideoAndCivilians || 0) >= 54,
  `VI index video+civilian ${viIndex.counts?.incidentsWithVideoAndCivilians} < 50`,
)

assert(page.includes('visual-investigations'), 'dossier page missing VI section')
assert(page.includes('Open primary video') || page.includes('Video evidence'), 'dossier missing video UX')
assert(page.includes('web.archive.org'), 'dossier missing Wayback pins')
assert(hub.includes('researcher-live-corpus-counts'), 'researcher hub missing live counts')
assert(prerender.includes("route: '/researcher'"), 'prerender missing /researcher hub')
assert(
  prerender.includes('visual-investigations.json'),
  'prerender missing VI JSON sitemap entry',
)

if (failures.length) {
  console.error('[verify:visual-investigations-floor] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log(
  `[verify:visual-investigations-floor] PASS — VI cards=${cards} corpus=${n} video=${withVideo} dual-cite ok`,
)
