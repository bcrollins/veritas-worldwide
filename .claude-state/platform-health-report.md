# Platform Health Report

- Checked at: 2026-07-16T05:33:07.576Z
- Base URL: https://veritasworldwide.com
- Status: pass
- Build commit: c809452a9e1d
- Deployment: 28a30bf8-5c47-4108-b6ad-ee1688b872bc
- Auth mode: database
- Search results: 19
- Analytics lifetime views: 6820

## Checks
- PASS — Build info route responds: GET /api/build-info returned 200
- PASS — Build info reports prerender coverage: prerenderedRouteCount=289
- PASS — Health probe reports ok: GET /api/health returned 200 status=ok
- PASS — Health probe confirms chapter data: chapterData=true
- PASS — Health probe confirms prerender coverage: prerender=true
- PASS — Health probe exposes analytics lifetime: analyticsLifetime=6820
- PASS — Auth status route responds: GET /api/auth/status returned 200
- PASS — Auth status exposes availability: available=true
- PASS — Auth status exposes a known mode: mode=database
- PASS — Anonymous auth probe returns a guarded status: GET /api/auth/me returned 401 while mode=database
- PASS — Public PDF download is readable for signed-out probes: GET /api/downloads/the-record.pdf returned 200
- PASS — Public chapter route responds: GET /api/chapters/chapter-1 returned 200
- PASS — Public chapter payload returns the full reader body: accessLevel=full
- PASS — Public chapter payload is not block-limited: content=25 preview=0 total=25
- PASS — Public chapter payload exposes source rows: sources=8
- PASS — Public chapter payload exposes chapter type metadata: chapterType=investigation
- PASS — Public chapter payload exposes evidence tier metadata: availableEvidenceTiers=verified, circumstantial
- PASS — Public chapter payload exposes evidence counts metadata: evidenceCounts={"verified":1,"circumstantial":2,"disputed":0}
- PASS — Anonymous search route responds: GET /api/search returned 200
- PASS — Anonymous search uses full public reader scope: scope=full
- PASS — Anonymous search returns results for a stable investigative query: results=19
- PASS — Anonymous search results expose chapter type metadata: chapterType=investigation
- PASS — Anonymous search results expose full public access: accessLevel=full
- PASS — Anonymous search results expose evidence tier metadata: availableEvidenceTiers=verified, circumstantial, disputed
- PASS — Analytics snapshot route responds: GET /api/analytics/snapshot returned 200
- PASS — Analytics lifetime stays non-negative: lifetime=6820
- PASS — Analytics today count stays non-negative: today=5
- PASS — Analytics funnel exposes signup totals: signups=8
- PASS — Read route prerender responds: GET /read returned 200
- PASS — Read route prerender returns HTML: content-type=text/html; charset=utf-8
- PASS — Read route prerender contains its route-specific marker: marker=Read The Record | Veritas Worldwide
- PASS — Chapter route prerender responds: GET /chapter/chapter-1 returned 200
- PASS — Chapter route prerender returns HTML: content-type=text/html; charset=utf-8
- PASS — Chapter route prerender contains its route-specific marker: marker=The Birth of Central Banking
- PASS — Institute landing prerender responds: GET /institute returned 200
- PASS — Institute landing prerender returns HTML: content-type=text/html; charset=utf-8
- PASS — Institute landing prerender contains its route-specific marker: marker=Veritas Institute | Practical Skills Catalog, Guides, and Field Manual
- PASS — Institute field manual prerender responds: GET /institute/book returned 200
- PASS — Institute field manual prerender returns HTML: content-type=text/html; charset=utf-8
- PASS — Institute field manual prerender contains its route-specific marker: marker=Field Manual | Veritas Institute

## Prerender Routes
- /read — status 200, content-type text/html; charset=utf-8, marker present
- /chapter/chapter-1 — status 200, content-type text/html; charset=utf-8, marker present
- /institute — status 200, content-type text/html; charset=utf-8, marker present
- /institute/book — status 200, content-type text/html; charset=utf-8, marker present
