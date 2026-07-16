# Boil-the-ocean continuation — live proof

## Product tip (verified)
- **commit**: `838269f6a2dc` (and later test/docs tips on main)
- **status**: ok
- **healthHistoryStorage**: shared-database
- **sharedAcrossReplicas**: true
- **healthHistorySampleCount**: 96 (at maxSamples floor)
- **prerenderedRouteCount**: 285 (after B-pack withdrawal)
- **instituteFieldManualPdf**: true
- **archive pins**: 30 pinned / 1 lookup-only (Lancet)

## Interval product ships this session
1. **8236023** — Sitewide search popularityBoost (+8) from analytics; health history maxSamples 96
2. **bad7df1** — Withdraw unsupported news B-pack (orphan crawler routes)
3. **289ccb3+** — B'Tselem/UNRWA/HRW/ReliefWeb/Airwars/+972/CBO/OHCHR archive pins → **30 pins**
4. **9da154e** — Auth rate limits for multi-agent smoke
5. **verify:live** suite: platform, release, auth, search-scoring, search, crawler, health-transitions, article-sources, archive-manifest

## Verifiers
`npm run verify:live` → all PASS against https://veritasworldwide.com

## Optional remaining
- Set Railway `SENTRY_DSN` for external paging
- Pin Lancet when Wayback accepts a capture
