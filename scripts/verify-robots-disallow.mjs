#!/usr/bin/env node
/**
 * robots.txt must permanently Disallow operator/success/quarantine surfaces,
 * and permanently Allow public research artifacts (pack, taxonomy, corpora).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const robots = fs.readFileSync(path.join(root, 'public', 'robots.txt'), 'utf8')

const mustDisallow = [
  'Disallow: /admin',
  'Disallow: /bernie',
  'Disallow: /bookmarks',
  'Disallow: /subscribe/success',
  'Disallow: /membership/success',
  'Disallow: /donation/success',
  'Disallow: /comprehensive-profile/success',
  'Disallow: /volume-ii',
]

const mustAllow = [
  'Allow: /research-pack.zip',
  'Allow: /research-pack-manifest.json',
  'Allow: /evidence-taxonomy.json',
  'Allow: /veritas-institute-field-manual.pdf',
  'Allow: /the-record.pdf',
]

const failures = []
for (const line of mustDisallow) {
  if (!robots.includes(line)) failures.push(`missing ${line}`)
}
for (const line of mustAllow) {
  if (!robots.includes(line)) failures.push(`missing ${line}`)
}

if (failures.length) {
  console.error('[verify:robots-disallow] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log('[verify:robots-disallow] PASS — critical Disallow + research Allow set present')
