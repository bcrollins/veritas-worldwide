/**
 * Privacy-preserving analytics audit — no operator PII in client analytics payloads.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  'src/lib/analytics.ts',
  'src/lib/ga4.ts',
  'src/lib/leadScoring.ts',
  'src/lib/adminAuth.ts',
]

const forbidden = [
  /brollins565/i,
  /brandoncrollins@/i,
  /bcrollins\//i,
  /\*Rosie2010/,
  /displayName.*operator/i,
  /user\.email.*admin/i,
]

const failures = []
for (const rel of files) {
  const p = path.join(root, rel)
  if (!fs.existsSync(p)) {
    failures.push(`missing ${rel}`)
    continue
  }
  const text = fs.readFileSync(p, 'utf8')
  for (const re of forbidden) {
    if (re.test(text)) failures.push(`${rel} matches ${re}`)
  }
}

// Analytics should not send raw email in GA4 event helpers by default patterns
const ga4 = fs.readFileSync(path.join(root, 'src/lib/ga4.ts'), 'utf8')
if (/gtag\?\.\([^)]*email/i.test(ga4) && !/hash|redact/i.test(ga4)) {
  // soft: only flag if email is passed as event param literally
  if (/email:\s*[^,\n]+@/.test(ga4)) failures.push('ga4.ts appears to hardcode an email into events')
}

// Runtime PII strip must exist on first-party event recorder
const analytics = fs.readFileSync(path.join(root, 'src/lib/analytics.ts'), 'utf8')
if (!analytics.includes('sanitizeAnalyticsProperties')) {
  failures.push('analytics.ts missing sanitizeAnalyticsProperties export')
}
if (!analytics.includes('FORBIDDEN_ANALYTICS_PROP_KEYS')) {
  failures.push('analytics.ts missing FORBIDDEN_ANALYTICS_PROP_KEYS denylist')
}
if (!/sanitizeAnalyticsProperties\(properties\)/.test(analytics)) {
  failures.push('recordAnalyticsEvent must call sanitizeAnalyticsProperties(properties)')
}

if (failures.length) {
  console.error('[verify:analytics-privacy] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log(
  '[verify:analytics-privacy] PASS — no operator identity strings; PII property strip present on recordAnalyticsEvent',
)
