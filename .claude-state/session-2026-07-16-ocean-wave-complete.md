# Ocean wave complete — scorecard 133 (2026-07-16)

## Product tip family (live, 15-step green)
**53a2297** req.ip under trust proxy — contains full session product stack:

### Deploy (critical)
- 1626660: engines ≥22.6.0 + strip-types runner (restored Railway after Node 20 outage)

### Security matrix
- CORP same-site · DNS-prefetch off · HSTS preload · X-Download-Options noopen
- 12 baseline headers · RateLimit×23 · structured 429 · /api/health 120/min
- JWT HS256 · bcrypt ≥12 · jti · single-use refresh · password multi-session revoke
- CORS allowlist · dual security.txt full field parity · probe-clean client errors

### A11y
- Skip-to-content: public + institute + admin (44px)
- 69 surfaces / 524 markers

### Ops
- nodeRuntime / packageEnginesNode on health, build-info, analytics
- verify:live 15-step pure-locked

## External residual
GH Actions empty runners · Lancet lookup-only · optional Sentry DSN
