# Ocean session complete — tip d7ffe48 live (2026-07-16)

## Masterpiece interval series
1. **b1aec2d** CORP + DNS-prefetch + RateLimit headers + probe-clean client errors  
2. **dd7ce02** residual a11y floor raises  
3. **1626660** Railway deploy restore (engines >=22.6 + strip-types runner) — **critical**  
4. **9a8ee39** HSTS preload + live RateLimit assert  
5. **90c172b** institute/conversion a11y floors (69/521)  
6. **b15a00c** `/api/health` nodeRuntime + packageEnginesNode  
7. **d7ffe48** Analytics Release Health UI for Node runtime  

## Live proof d7ffe48
- verify:live **15/15 PASS** (commit `d7ffe48699ee`)
- nodeRuntime **v22.14.0** · engines **>=22.6.0**
- HSTS preload · CORP same-site · DNS-prefetch off · 11 baseline headers · RateLimit on field-manual
- a11y 69 surfaces / 521 markers · archive pins 46 · prerender 289 · popular 8
- scorecard **113**

## Deploy outage root cause (closed permanently)
`engines.node: >=20` → railpack Node 20.20.2 → postbuild `--experimental-strip-types` rejected → every deploy after `b8d840e` FAILED until 1626660.

## External residual
- GitHub Actions empty-runner failures (not product)
- Lancet CDX lookup-only
- Optional Sentry DSN
