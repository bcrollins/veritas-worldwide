# Veritas Audit Queue — 2026-04-07

- [x] P0 — Re-ran the live logout revocation check after deploy: the same bearer token now gets `401` from `/api/auth/me` and `/api/downloads/the-record.pdf` after logout.
- [x] P1 — Added repo-native auth regression coverage via `npm run verify:auth` for anonymous preview, register, login, full chapter unlock, source-only search, protected PDF download, logout, revoked-token denial, and post-logout chapter downgrade.
- [x] P2 — Restored canonical evidence taxonomy on public trust surfaces: `/deep-state` now uses `Verified`, chapter 20 preview/generated copy no longer says `Alleged`, and `/methodology` now has working in-page anchor navigation plus canonical disputed-language copy.
- [P2] Verify the `/chapter/:id` and `/read` auth upgrade/downgrade flows in a real browser session at 390px and 430px widths.
- [x] P3 — Consolidated the publication shell in `src/App.tsx`: primary destinations now stand apart from methodology/source utilities, mobile navigation is grouped instead of flat, header/footer buttons are quieter, and the shell keeps the Bible route and current route surface intact.
- [P2] Verify the deployed publication shell on `/`, `/read`, `/news`, and `/membership` at 390px and 430px widths, focusing on drawer grouping, sticky primary navigation, and CTA clarity.
- [x] P3 — Launched `Veritas Institute` as a separate learning-product surface with a distinct shell, 100-topic search-intent catalog, course pages, guide pages, methodology route, Book of Knowledge page, PDF export, and sitemap/prerender coverage for the new route family.
- [P2] Verify `/institute`, `/institute/book`, and representative `/institute/courses/:slug` plus `/institute/guides/:slug` routes at 390px and 430px widths in a real browser session.
- [P3] Pressure-test the Book of Knowledge PDF export on desktop and mobile browsers; if generation is unstable at scale, move the manual export to a build-time or server-side artifact.
- [P3] Decide whether to promote the institute with a stronger homepage/front-page entry point now that the route family exists and is indexed.
- [x] P3 — Added `npm run verify:sources`, wrote the source-link health report into `.claude-state/`, removed the unsupported `expandedArticlesB` news pack from the live corpus, and repaired deterministic chapter citation truncations. Actionable source issues dropped from 64 to 39.
- [P3] Remediate the remaining broken source links concentrated in `src/data/israelDossierExpanded.ts` and `src/data/profileData.ts`, replacing dead newsroom links with working official sources or stable archive-backed citations.
- [x] P3 — Removed the remaining evidence-taxonomy drift risk from duplicated chapter source modules by turning `src/data/chapters.ts` into a module-backed bootstrap/search entrypoint and correcting the last legacy Chinese `Verified` label.
- [P4] Add production error monitoring (Sentry or equivalent) for auth, search, analytics, and prerender failures.
