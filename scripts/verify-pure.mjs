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
  'verify-article-images.mjs',
  'verify-chapter-images.mjs',
  'verify-profile-images.mjs',
  'verify-image-sources.mjs',
  'verify-structured-data.mjs',
  'verify-archive-manifest.mjs',
  'verify-a11y-public-targets.mjs',
  'verify-nav-ia.mjs',
  'verify-server-security-invariants.mjs',
  'verify-home-toc-structure.mjs',
  'verify-csp-meta.mjs',
  'verify-checkout-attribution.mjs',
  'verify-trust-corpora-links.mjs',
  'verify-profile-counters.mjs',
  'verify-dropcap-pdf.mjs',
  'verify-byron-donalds-profile.mjs',
  'verify-seo-meta.mjs',
  'verify-soft-404-gates.mjs',
  'verify-comprehensive-profile.mjs',
  'verify-docs-anonymity.mjs',
  'verify-osint-attestation-gate.mjs',
  'verify-search-osint-boost.mjs',
  'verify-osint-analytics-privacy.mjs',
  'verify-brand-kit.mjs',
  'verify-integrity-score.mjs',
  'verify-identity-scrub.mjs',
  'verify-visual-investigations-floor.mjs',
  'verify-robots-disallow.mjs',
  'verify-share-utms.mjs',
  'verify-source-url-shapes.mjs',
  'verify-error-scrub.mjs',
  'verify-security-txt.mjs',
  'verify-israel-schema-triples.mjs',
  'verify-research-pack.mjs',
  'verify-hubspot-fields.mjs',
  'verify-oauth-no-github.mjs',
  'verify-analytics-privacy.mjs',
  'verify-package-entity.mjs',
  'verify-sitemap-exclusions.mjs',
  'verify-top100-floors.mjs',
  'verify-git-author-forward.mjs',
]

let failed = 0
for (const script of pure) {
  const r = spawnSync(process.execPath, [join(root, 'scripts', script)], { stdio: 'inherit' })
  if (r.status !== 0) failed += 1
}
if (pure.length < 22) {
  console.error(`[verify:pure] FAIL — suite list shrunk to ${pure.length}`)
  process.exit(1)
}
if (failed) {
  console.error(`[verify:pure] FAIL — ${failed} suite(s) failed`)
  process.exit(1)
}
console.log(`[verify:pure] PASS — ${pure.length} pure suites`)
