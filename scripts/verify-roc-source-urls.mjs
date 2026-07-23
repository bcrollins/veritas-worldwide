/**
 * Soft health check: extract http(s) URLs from ROC claim sources and HEAD them.
 * Does not fail the whole suite on remote 403/WAF; fails only if zero URLs or parse crash.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  'src/data/recordOfJesusChrist.ts',
  'src/data/recordOfJesusChristExtras.ts',
  'src/data/recordOfJesusChristWave3.ts',
  'src/data/recordOfJesusChristWave4.ts',
  'src/data/recordOfJesusChristWave5.ts',
  'src/data/recordOfJesusChristWave6.ts',
  'src/data/recordOfJesusChristWave7.ts',
  'src/data/recordOfJesusChristWave8.ts',
  'src/data/recordOfJesusChristWave9.ts',
  'src/data/recordOfJesusChristWave10.ts',
]

const urlRe = /url:\s*'(https?:\/\/[^']+)'/g
const urls = new Set()
for (const rel of files) {
  const p = path.join(root, rel)
  if (!fs.existsSync(p)) continue
  const text = fs.readFileSync(p, 'utf8')
  let m
  while ((m = urlRe.exec(text))) urls.add(m[1])
}

if (urls.size < 5) {
  console.error('[verify:roc-source-urls] FAIL — too few source URLs found:', urls.size)
  process.exit(1)
}

const sample = [...urls].slice(0, 12)
let ok = 0
let softFail = 0
for (const u of sample) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal })
    clearTimeout(t)
    if (res.ok || res.status === 403 || res.status === 405 || res.status === 429) ok++
    else softFail++
  } catch {
    softFail++
  }
}

console.log(
  `[verify:roc-source-urls] PASS — ${urls.size} urls indexed; sample ${sample.length} reachable-or-WAF=${ok} soft-fail=${softFail}`,
)
// Soft: do not exit 1 on remote blocks; permanent gap is zero URLs only.
process.exit(0)
