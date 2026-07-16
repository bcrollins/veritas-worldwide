#!/usr/bin/env node
/**
 * Run all pure (no-network) verification suites used in verify:live.
 */
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pure = [
  'verify-auth-validation.mjs',
  'verify-search-scoring.mjs',
  'verify-crawler-surfaces.mjs',
  'verify-article-sources.mjs',
  'verify-archive-manifest.mjs',
  'verify-a11y-public-targets.mjs',
  'verify-server-security-invariants.mjs',
  'verify-home-toc-structure.mjs',
  'verify-csp-meta.mjs',
]

let failed = 0
for (const script of pure) {
  const r = spawnSync(process.execPath, [join(root, 'scripts', script)], { stdio: 'inherit' })
  if (r.status !== 0) failed += 1
}
if (pure.length < 9) {
  console.error(`[verify:pure] FAIL — suite list shrunk to ${pure.length}`)
  process.exit(1)
}
if (failed) {
  console.error(`[verify:pure] FAIL — ${failed} suite(s) failed`)
  process.exit(1)
}
console.log(`[verify:pure] PASS — ${pure.length} pure suites`)
