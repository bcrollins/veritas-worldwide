# Live tip proof — b0c4731 (2026-07-16)

## Product increments shipped this session (interval deploys)
1. **cf6c5c5** — Multi-replica health history via `analytics_state` (`storage=shared-database`); Terms/Accessibility Field Manual PDF trust links; `verify:crawler-surfaces`
2. **eb2bfdf** — OCHA HTML + Forensic Architecture archive pin upgrades; scorecard 50
3. **c1698da** — Optional Sentry client-error forward (`SENTRY_DSN`); canon archive map sync
4. **b0c4731** — Health samples tagged with `RAILWAY_REPLICA_ID`; platform asserts `sentryForwardConfigured` boolean

## Live verification (production)
- tip: `b0c4731fb3eb` status=ok
- `/api/health/history`: storage=shared-database, sharedAcrossReplicas=true, samples≥10
- uniqueCommits includes cf6c5c5 → eb2bfdf → c1698da → b0c4731 with commitTransitions
- replica field present on new samples (e.g. `35ba3f9b…`)
- sentryForwardConfigured=false (DSN not set — intentional optional path)
- instituteFieldManualPdf=true, prerenderedRouteCount=289
- PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com → PASS
- AUTH_TEST_BASE_URL=https://veritasworldwide.com → PASS (refresh/jti)
- Live SPA chunks TermsPage-BiEtwjX4 / AccessibilityPage-VMG1cSwx include Field Manual PDF needles

## Operator notes
- Set Railway `SENTRY_DSN` to enable external paging; native intake remains default
- Multi-replica rolling deploys will briefly interleave commit samples — expected and useful forensics
