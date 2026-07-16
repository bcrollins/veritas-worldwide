# Ocean — tip d83ff5f live (2026-07-16)

Product tip **d83ff5f** live with full diagnostics loop:
- `/api/health` + `/api/build-info` expose `nodeRuntime` / `packageEnginesNode`
- `/analytics` Release Health renders runtime
- platform health asserts both endpoints
- verify:live **15/15 PASS**
- Railway Node **v22.14.0** · engines **>=22.6.0**
- Security: HSTS preload, CORP same-site, DNS-prefetch off, RateLimit headers, 11 baseline
- a11y: 69 / 521 · scorecard **114**
