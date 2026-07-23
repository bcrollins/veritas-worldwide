#!/usr/bin/env node
/**
 * robots.txt must permanently Disallow operator/success/quarantine surfaces.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const robots = fs.readFileSync(path.join(root, 'public', 'robots.txt'), 'utf8')
const required = [
  'Disallow: /admin',
  'Disallow: /bernie',
  'Disallow: /bookmarks',
  'Disallow: /subscribe/success',
  'Disallow: /membership/success',
  'Disallow: /donation/success',
  'Disallow: /comprehensive-profile/success',
  'Disallow: /volume-ii',
]
const failures = []
for (const line of required) {
  if (!robots.includes(line)) failures.push(`missing ${line}`)
}
if (failures.length) {
  console.error('[verify:robots-disallow] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:robots-disallow] PASS — critical Disallow set present')
