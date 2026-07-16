# Veritas boil-the-ocean ship log — 2026-07-16

## Live production tip (product)
- Proven live: `74dec67`+ with full PDF/attribution/ops stack
- Tip advanced through `f402d51` / `63ebf53` with continuous green platform/release/search

## Major product increments (interval ships)
1. **Durable Institute Field Manual PDF** — build-time 60-page PDF at `/veritas-institute-field-manual.pdf` (512KB), postbuild generator, static-first download + client fallback
2. **Membership + donate UTM attribution** — first/last-touch UTM+ref, Stripe `client_reference_id`, SPA recapture, external referrer first-touch
3. **All public donate CTAs attributed** — footer, chapters, dossier, sources, methodology, about, profile, timeline, bookmarks, download modal, donation banner
4. **PDF cache bugfix** — stopped year-long immutable caching of stable-name PDFs
5. **Client-error counters** — replica intake count/last message on `/api/health` + analytics Release Health
6. **Discovery surface** — sitemap, RSS enclosure, robots.txt Allow, llms.txt, veritas-institute.md, prerender HTML CTAs, Book schema encoding
7. **PDF headers** — Content-Disposition filenames + must-revalidate for field manual and The Record PDFs
8. **GA4** — trackDownload on static field-manual PDF CTAs
9. **Build-info** — recordPdf + instituteFieldManualPdf flags + URL

## Verifiers green on production
- verify:platform PASS
- verify:search PASS
- verify:release PASS
- verify:checkout-attribution PASS
- verify:israel-dossier PASS
- verify:institute-pdf PASS (local generator)

## External blockers (not code)
- GitHub Actions billing lock (known)
- Lancet Wayback pin still unavailable (CDX 404 partials only)
- Optional Sentry DSN for external paging
