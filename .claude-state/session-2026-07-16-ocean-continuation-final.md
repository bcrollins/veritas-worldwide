# Ocean continuation final — product tip 9ab05c5 (2026-07-16)

## Live proof
- **Commit:** `9ab05c5b8dfc`
- **verify:live:** 15/15 PASS
- **Health:** ok · pr 289 · pop 8 · shared-database
- **security.txt:** 200 dual paths · llms GEO disclosure
- **Headers:** 9 baselines + COOP + OAC + tightened Permissions-Policy (clipboard-write=self)
- **JSON:** 64kb global cap · 413 on oversized
- **Rate limits:** 22 named isolated scopes (name:ip)
- **Trust proxy:** 1 hop for Railway
- **a11y pure:** 52 surfaces · 460 markers · expanded bans
- **Deps:** serve removed · tailwind 4.3.3 · playwright 1.61 · pg 8.22 · 0 vulns
- **Scorecard:** 105

## Interval product tips (merge → push → deploy → prove)
| Tip | Value |
|-----|--------|
| 7b139e4 | rate-limit isolation (critical bugfix) |
| 82e4c1e | 64kb JSON body |
| 9ab05c5 | trust proxy |
| c39fe04 | Permissions-Policy |
| ff01233 | remove serve |
| c51b7bf | carousel + operator rate limits |
| 9d79e50 | forum flair + field-manual rate limit |

## Residual external
- Lancet lookup-only (Wayback 403)
- Optional Sentry DSN
