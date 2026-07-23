#!/usr/bin/env node
/**
 * Share panel must use entity UTMs (veritas / share / veritas_worldwide).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const share = fs.readFileSync(path.join(root, 'src/components/SharePanel.tsx'), 'utf8')
const failures = []
if (!share.includes('withEntityShareUtms') && !share.includes("utm_source', 'veritas")) {
  // allow either helper or inline
  if (!share.includes('utm_source') || !share.includes('veritas')) {
    failures.push('SharePanel missing entity utm_source=veritas')
  }
}
if (/utm_campaign['"]?\s*[:=]\s*['"][^'"]*brandon/i.test(share)) {
  failures.push('SharePanel utm_campaign must not include personal identity')
}
if (failures.length) {
  console.error('[verify:share-utms] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:share-utms] PASS — entity share UTMs present')
