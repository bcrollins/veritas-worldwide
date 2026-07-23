#!/usr/bin/env node
/**
 * OSINT free-text must never enter GA4 / client analytics event properties.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
function assert(c, m) {
  if (!c) {
    console.error(`[verify:osint-analytics-privacy] FAIL — ${m}`)
    process.exit(1)
  }
}
const page = readFileSync(join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8')

// GA4 helpers must only receive product identifiers, not free-text intake
assert(
  /trackSupportClick\(\s*'comprehensive-profile-checkout'\s*\)/.test(page) ||
    /trackSupportClick\(\s*"comprehensive-profile-checkout"\s*\)/.test(page),
  'trackSupportClick should use fixed product location string',
)
assert(
  /trackCheckoutIntent\(\s*'comprehensive-profile'/.test(page) ||
    /trackCheckoutIntent\(\s*"comprehensive-profile"/.test(page),
  'trackCheckoutIntent should use fixed product tier string',
)
assert(
  !/trackSupportClick\([^)]*purposeDetail/.test(page),
  'trackSupportClick must not include purposeDetail',
)
assert(
  !/trackCheckoutIntent\([^)]*purposeDetail/.test(page),
  'trackCheckoutIntent must not include purposeDetail',
)
assert(
  !/recordAnalyticsEvent\(\s*'[^']+',\s*\{[^}]*purposeDetail/.test(page),
  'recordAnalyticsEvent must not include purposeDetail',
)

const idIdx = page.indexOf('identifyContact({')
assert(idIdx >= 0, 'identifyContact call expected for OSINT lead mirror')
const slice = page.slice(idIdx, idIdx + 500)
const end = slice.indexOf('})')
assert(end > 0, 'identifyContact call body not closed')
const body = slice.slice(0, end)
assert(!/\bpurposeDetail\b/.test(body), 'identifyContact must not include purposeDetail')
assert(!/\bsubjectFullName\b/.test(body), 'identifyContact must not include subjectFullName')
assert(!/\bnotes\b/.test(body), 'identifyContact must not include notes')
assert(!/\bknownLinks\b/.test(body), 'identifyContact must not include knownLinks')
assert(/\bemail\b/.test(body), 'identifyContact should include email')
assert(/comprehensive_profile/.test(body), 'identifyContact source comprehensive_profile')

console.log('[verify:osint-analytics-privacy] PASS')
