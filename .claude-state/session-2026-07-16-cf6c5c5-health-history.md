# Live tip proof — cf6c5c5 (2026-07-16)

## Shipped
- Multi-replica `/api/health` history via `analytics_state` key `health-history`
  - Live: `storage=shared-database`, `sharedAcrossReplicas=true`
  - Platform health PASS against https://veritasworldwide.com
- Terms + Accessibility Related Pages → Field Manual + durable PDF
  - Live SPA chunks: `TermsPage-BiEtwjX4.js`, `AccessibilityPage-VMG1cSwx.js` contain needles
- `verify:crawler-surfaces` floors + trust-page PDF link guard
- Archive pin upgrades: OCHA HTML page + fresher Forensic Architecture; Lancet still lookup-only

## Verifiers (production)
- `PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:platform` → PASS
- `PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:release` → PASS
- `AUTH_TEST_BASE_URL=https://veritasworldwide.com npm run verify:auth` → PASS (refresh/jti)
- `SEARCH_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:search` → PASS
- `npm run verify:health-transitions` → PASS
- `npm run verify:crawler-surfaces` → PASS

## Live tip
- commitShort: cf6c5c5c0b4d
- health status: ok
- instituteFieldManualPdf: true
- prerenderedRouteCount: 289
