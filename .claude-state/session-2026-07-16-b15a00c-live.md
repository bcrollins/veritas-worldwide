# Ocean session — tip b15a00c live (2026-07-16)

## Interval ships this session
| Tip | Summary |
|-----|---------|
| b1aec2d | CORP same-site, DNS-prefetch off, RateLimit headers, probe-clean client errors |
| dd7ce02 | Residual a11y floors raised |
| **1626660** | **Deploy restore: engines >=22.6.0 + run-with-strip-types** |
| 89b7053 | Scorecard 110 docs |
| 9a8ee39 | HSTS preload + live RateLimit assert |
| 90c172b | Institute/conversion a11y floors (69/521) |
| a2646b2 | Pure-lock .node-version + GH Actions residual note |
| **b15a00c** | **/api/health nodeRuntime + packageEnginesNode** |

## Critical fix
Railway was stuck on SUCCESS tip `b8d840e` while all later deploys FAILED:
`node: bad option: --experimental-strip-types` because `engines.node: >=20`
selected Node **20.20.2**. Fixed to **>=22.6.0**; live now reports **v22.14.0**.

## Live proof b15a00c
- verify:live **15/15 PASS**
- health: `nodeRuntime=v22.14.0` `packageEnginesNode=>=22.6.0`
- HSTS preload · CORP same-site · DNS-prefetch off · RateLimit on field-manual
- security-headers: 11 baseline + dual security.txt
- a11y: 69 surfaces / 521 markers
- auth smoke green · search green · archive pins 46
- scorecard **112**

## External residual
- GitHub Actions: jobs fail ~2s empty steps (runner_id 0) — minutes/runner allocation, not product
- Lancet CDX still 403/timeout (lookup-only)
- Sentry DSN optional
