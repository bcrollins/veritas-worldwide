# Truth Model — Wave 4 · 2026-07-23

**Entity:** Veritas Worldwide only  
**Operator ref (internal):** BR — never in public artifacts  

## Live ground truth

| Probe | Value |
|-------|-------|
| Live commit | 6d1f6acd025b (lag vs tip multi-agent densify) |
| Status | ok |
| publicChapterCount | 32 |
| prerenderedRouteCount | 685 |
| Health checks | distIndex, chapterData, chapterManifest, prerender, analyticsStore, recordPdf, instituteFieldManualPdf, **researchPackZip**, **researchPackManifest**, databaseConfigured — all true |
| Profiles | 96 · densify n≥3 **96/96** · weakHomepage **0** |
| Israel incidents (live) | ~855 (soft floor lag WARN vs tip densify) |
| ROC claims (live) | 696 |
| Research pack | HTTP 200 · dual-write dist · RateLimit 20 · short cache · VI included |
| OSINT $499 | checkoutReady true · stripeConfigured true · retentionDays 90 · rate 8/min |
| Pure suites | 44 PASS |
| Live anonymity | PASS (entity-only) |
| Live bot-noindex | PASS 15 surfaces |
| Git author forward | PASS entity-only last 20 |

## Anonymity baseline

- Public product identity-scrub PASS  
- No personal needles in pure product surfaces  
- Residual external: GH personal namespace (repo transfer), historical git authors, Stripe portal branding, optional Sentry  

## P0s

1. No active public identity leak (PASS continuous)  
2. Operator GH org transfer — **Pending human**  
3. Git history scrub — **Pending human approval**  

## Path to 10.0

Complete operator OPSEC (org transfer + history scrub + Stripe entity portal); keep densify dual-sided without thrash; optional Sentry if paging required.
