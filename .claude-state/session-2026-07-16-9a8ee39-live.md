# Ocean session — tip 9a8ee39 live (2026-07-16)

## Shipped intervals
1. **b1aec2d** feat(security): CORP same-site, DNS-prefetch off, RateLimit headers, probe-clean client errors
2. **dd7ce02** test(a11y): residual public floors raised
3. **1626660** fix(deploy): Node >=22.6.0 + run-with-strip-types (restored Railway after engines>=20 regression)
4. **89b7053** docs(state): scorecard 110
5. **9a8ee39** feat(security): HSTS preload + live RateLimit assert on field-manual

## Live proof 9a8ee39
- verify:live **15/15 PASS**
- HSTS: `max-age=31536000; includeSubDomains; preload`
- CORP: same-site · DNS-prefetch: off · security-headers: 11 baseline + RateLimit on field-manual
- Field manual PDF 200 · auth X-RateLimit · probe-clean intake
- a11y working tree: 69 surfaces / 521 markers (floors expanding)

## Deploy restoration root cause
`engines.node: >=20` → railpack Node 20.20.2 → `bad option: --experimental-strip-types` → all deploys failed after b8d840e until 1626660.
