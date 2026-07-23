#!/usr/bin/env node
/**
 * Sitemap must not list noindex / OPSEC-sensitive paths.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8')
const forbidden = [
  '/admin',
  '/bernie',
  '/bookmarks',
  '/researcher/timeline',
  '/subscribe/success',
  '/membership/success',
  '/donation/success',
  '/comprehensive-profile/success',
]
const failures = []
for (const p of forbidden) {
  if (sitemap.includes(`<loc>https://veritasworldwide.com${p}`) || sitemap.includes(`>${p}<`)) {
    failures.push(`sitemap must not include ${p}`)
  }
}
if (failures.length) {
  console.error('[verify:sitemap-exclusions] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:sitemap-exclusions] PASS — noindex/OPSEC paths absent from sitemap.xml')
