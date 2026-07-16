# Session live ledger — CSP + password floor + a11y residual

Date: 2026-07-16

## Interval ships (this agent)

1. `0db6fb3` feat(security): HTTP CSP frame-ancestors + meta hardening
   - Live: content-security-policy: frame-ancestors 'self'; upgrade-insecure-requests
   - Permissions-Policy browsing-topics=()
   - Meta: worker-src/manifest-src/media-src + upgrade-insecure-requests
   - verify:security-headers 13 baseline PASS

2. `6461238` feat(auth): raise password floor from 6 to 8 characters
   - Live curl: 7-char register → `{"error":"Password must be at least 8 characters."}`
   - verify:auth 7-char password register rejected
   - Full verify:live 15/15 PASS on tip 6461238

3. `3e1f119` fix(a11y): 44px floors for DeepState filters and Forum compose
   - Pure floors: Forum 57, DeepState 17, 531 markers / 69 surfaces

## External residual (unchanged)

- Lancet archive pin: CDX timeout / lookup-only
- Sentry DSN optional
- GitHub Actions runner allocation external

## Production gate

Railway SUCCESS; npm audit 0 vulns; nodeRuntime v22.14.0; engines >=22.6.0
