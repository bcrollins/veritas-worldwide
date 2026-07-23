#!/usr/bin/env node
/**
 * HubSpot client modules must not embed operator personal identity or hidden
 * personal metadata fields.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = ['src/lib/hubspot.ts', 'src/components/NewsletterSignup.tsx', 'src/components/MarketingConsentField.tsx']
const forbid = [
  /brollins565/i,
  /brandoncrollins@/i,
  /bcrollins\//i,
  /github\.com\/bcrollins/i,
  /operator_email/i,
  /hidden.*author/i,
]
const failures = []
for (const rel of files) {
  const p = path.join(root, rel)
  if (!fs.existsSync(p)) continue
  const text = fs.readFileSync(p, 'utf8')
  for (const re of forbid) {
    if (re.test(text)) failures.push(`${rel} matches ${re}`)
  }
}
if (failures.length) {
  console.error('[verify:hubspot-fields] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:hubspot-fields] PASS — HubSpot client surfaces entity-safe')
