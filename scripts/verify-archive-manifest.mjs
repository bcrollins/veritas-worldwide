#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
function assert(c, m) { if (!c) { console.error(`[verify:archive-manifest] FAIL — ${m}`); process.exit(1) } }
const m = JSON.parse(fs.readFileSync(path.join(root, 'public/israel-dossier/workbooks/briefing-source-archive-manifest.json'), 'utf8'))
assert(Array.isArray(m.entries), 'entries array')
const pinned = m.entries.filter((e) => e.status === 'pinned')
const lookup = m.entries.filter((e) => e.status === 'lookup-only')
// Floor raised 2026-07-22 after CPJ, Avalon Balfour, FRUS, ICJ 186 pins.
assert(pinned.length >= 50, `pinned ${pinned.length} < 50`)
assert(lookup.length <= 3, `lookup-only ${lookup.length} too many`)
for (const e of pinned) {
  assert(e.archiveUrl && e.archiveUrl.includes('web.archive.org/web/'), `pinned missing archiveUrl: ${e.sourceUrl}`)
  assert(e.timestamp, `pinned missing timestamp: ${e.sourceUrl}`)
}
// Lancet must remain explicit lookup-only until captured
const lancet = m.entries.find((e) => (e.sourceUrl || '').includes('thelancet.com'))
if (lancet) {
  assert(lancet.status === 'lookup-only' || lancet.status === 'pinned', 'lancet status known')
}
console.log(`[verify:archive-manifest] pinned=${pinned.length} lookup=${lookup.length}`)
console.log('[verify:archive-manifest] PASS')
