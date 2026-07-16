# BOIL THE OCEAN — Veritas Worldwide session ledger (2026-07-16)

## Critical: Railway deploy outage closed
**Root cause:** `engines.node: >=20` made railpack select Node **20.20.2**, which rejects `--experimental-strip-types`, failing every postbuild after tip `b8d840e`.

**Fix (1626660):** `engines.node: >=22.6.0`, `.node-version` 22.14.0, `scripts/run-with-strip-types.mjs` resilient runner.

**Live now:** Node **v22.14.0**, engines **>=22.6.0**, Railway SUCCESS.

## Product intervals proven live (15/15 verify:live)
| Tip | Change |
|-----|--------|
| b1aec2d | CORP same-site, DNS-prefetch off, RateLimit headers, probe-clean client errors |
| 1626660 | Deploy restore |
| 9a8ee39 | HSTS preload + RateLimit live assert |
| b15a00c→45fb992 | nodeRuntime on health/build-info/analytics |
| 7316998 | Structured 429 JSON (limit/remaining/reset/scope) |
| 2f803e1 | react/react-dom ^19.2.7 |
| **a025b1b** | **/api/health named rate limit 120/min** |

## Current live matrix
- 15/15 PASS (re-proven repeatedly)
- security-headers: 11 baseline + dual security.txt + RateLimit on field-manual
- a11y: **69 surfaces / 521 markers** (floors 69 / 520)
- rateLimit fleet: **23** named scopes
- archive pins 46 · prerender 289 · popular 8
- scorecard **120**

## External residual
- GitHub Actions: empty runners (~2s fail, runner_id 0) — minutes/allocation, not product
- Lancet CDX: lookup-only
- Optional Sentry DSN

## Working tree
main clean, interval-shipped, multi-agent safe rebase/push throughout.
