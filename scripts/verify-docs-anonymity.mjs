#!/usr/bin/env node
/**
 * Offline docs anonymity gate — fails if personal operator identity needles appear under docs/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const docsRoot = path.join(root, 'docs')

const FORBIDDEN = [
  /bcrollins/i,
  /brollins565/i,
  /brandoncrollins@/i,
  /github\.com\/bcrollins/i,
  /Brandon\s+Rollins/i,
  /aerolink\.one/i,
  /facebook\.com\/bernie\.rollins/i,
  /facebook\.com\/brandon\.rollins/i,
  /910[-\s]?238[-\s]?6050/,
  /Deerfield\s+Beach/i,
]

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(full, acc)
    else if (/\.(md|txt|html|json)$/i.test(ent.name)) acc.push(full)
  }
  return acc
}

const failures = []
const files = walk(docsRoot)
// OPSEC audit docs intentionally enumerate forbidden needles — skip those files.
const SKIP = [
  'docs/record-of-jesus-christ/ANONYMITY-AUDIT.md',
  'docs/record-of-jesus-christ/06-OPSEC-AND-PRIVACY.md',
]

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, '/')
  if (SKIP.some((s) => rel === s || rel.endsWith(s))) continue
  // Also skip any path segment named OPSEC or ANONYMITY-AUDIT
  if (/OPSEC|ANONYMITY-AUDIT|identity-needles/i.test(rel)) continue
  const text = fs.readFileSync(file, 'utf8')
  for (const re of FORBIDDEN) {
    if (re.test(text)) failures.push(`${rel}: ${re}`)
  }
}

if (failures.length) {
  console.error('[verify:docs-anonymity] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(`[verify:docs-anonymity] PASS — ${files.length} docs files clean`)
