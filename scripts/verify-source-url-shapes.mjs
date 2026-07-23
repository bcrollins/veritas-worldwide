#!/usr/bin/env node
/**
 * Soft offline check: chapter source URLs that exist must look like absolute http(s).
 * Does not network-fetch (avoids flake). Malformed fail pure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const chaptersDir = path.join(root, 'src/data/chapters')
function walk(dir, acc=[]) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, acc)
    else if (/\.(ts|tsx|js|mjs)$/.test(ent.name)) acc.push(p)
  }
  return acc
}
const files = walk(chaptersDir)
let checked = 0
const urlRe = /url:\s*['"`]([^'"`]+)['"`]/g
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8')
  let m
  while ((m = urlRe.exec(text))) {
    const u = m[1]
    if (!u || u.startsWith('/') || u.startsWith('#')) continue
    checked++
    if (!/^https?:\/\//i.test(u)) failures.push(`${path.relative(root,f)}: non-http url ${u}`)
  }
}
// israel corpus sample
try {
  const corpus = JSON.parse(fs.readFileSync(path.join(root,'public/israel-dossier/corpus.json'),'utf8'))
  for (const inc of (corpus.incidents||[]).slice(0,50)) {
    for (const s of inc.sources||[]) {
      if (s.url && !/^https?:\/\//i.test(s.url) && !s.url.startsWith('/')) {
        failures.push(`israel incident ${inc.id}: bad url ${s.url}`)
      }
      checked++
    }
  }
} catch { /* optional */ }

if (failures.length) {
  console.error('[verify:source-url-shapes] FAIL')
  for (const f of failures.slice(0,30)) console.error(' -', f)
  process.exit(1)
}
console.log(`[verify:source-url-shapes] PASS — ${checked} URLs shape-checked offline`)
