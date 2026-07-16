# Platform Gaps — 2026-04-08

## Recently Closed

- **Israel dossier briefing source-row expansion is live.**
  Impact: `/israel-dossier/briefing` now carries the workbook-grade footnote layer directly in the reader experience instead of hiding the evidence chain behind downloads. The page shows paragraph source IDs, section-level source-row tables, corrected row coverage for the financial/humanitarian/incident/legal panels, and a reader-facing chapter sequence before the downloadable draft.
  Resolution: added canonical briefing source-row objects, corrected drifted row coverage for `AID-P-004`, `HUM-P-003`, `INC-P-004`, and `LAW-P-002`, rendered the source-row table and chapter sequence on the briefing route, expanded the Markdown chapter draft with paragraph-level source IDs, and extended canon/behavior verification. Production commit `6e3ab5f` / deployment `e4bb7bbc-d009-431a-b76b-e28381178915` passed all five GitHub Actions workflows, live behavior verification, crawler metadata, direct Markdown artifact probes, and the full primary live viewport matrix.

- **Israel dossier downloadable chapter-style draft is source-boundary checked and live.**
  Impact: the briefing route now has a chapter-like Markdown artifact instead of only a shorter briefing draft, giving editors a direct expansion path from workbook rows to publishable chapter prose.
  Resolution: added `/israel-dossier/workbooks/public-briefing-chapter-draft.md`, registered it in the workbook manifest and canon, exposed it on `/israel-dossier/briefing`, indexed it in `llms.txt`, and extended verification to download and assert the draft text. Production commit `88c37c6` / deployment `deae3aa8-5a3b-4b81-9906-d26b67584574` passed all GitHub Actions workflows, live Markdown/manifest/LLM probes, behavior verification, and the focused primary live viewport matrix.

- **Israel dossier public briefing surface is source-boundary checked, prerendered, and live.**
  Impact: the populated workbook rows now have a reader-facing briefing route instead of remaining only downloadable files. The new surface keeps source-row IDs, status labels, procedural posture, unsafe-wording warnings, and open questions visible while moving the strongest rows into publishable prose.
  Resolution: added canonical briefing sections, routed `/israel-dossier/briefing`, linked it from `/israel-dossier`, added prerender/sitemap/LLM index coverage, wired bot metadata, and extended canon plus behavior verification. Production commit `c7ec930` / deployment `d2f7235f-89e6-472b-9385-d35e95c8b27d` passed all GitHub Actions workflows, live dossier behavior with briefing interaction, crawler route probes, sitemap/LLM/workbook probes, and the primary live viewport matrix.

- **Israel dossier populated workbook pack is source-checked, UI-wired, and live.**
  Impact: the dossier now has source-labeled working records rather than blank templates only: source ledger rows, aid-ledger entries, humanitarian attribution rows, incident evidence rows, legal-status rows, and a publishable briefing draft are bundled as public workbooks for editor/course reuse.
  Resolution: added populated artifacts under `/israel-dossier/workbooks/`, exposed them in the `/israel-dossier` Evidence Workbooks section, linked the workbook manifest from `llms.txt`, and extended canon, behavior, source-link, and visual verification to cover the pack. Production commit `ea4c1a0` / deployment `5d1991c6-2a23-4cff-af28-8dd85335484e` passed all GitHub Actions workflows, live dossier behavior with populated-workbook download assertion, direct static workbook/template probes, and the primary live viewport matrix.

- **Israel dossier editor templates are source-checked, UI-wired, and live.**
  Impact: the course path now has usable artifacts instead of instruction-only modules: source ledger, aid ledger, humanitarian attribution table, incident evidence matrix, legal-status brief, and publishable briefing outline.
  Resolution: added static templates under `/israel-dossier/templates/`, attached each artifact to canonical course modules, exposed downloads on `/israel-dossier`, added the template manifest to `llms.txt`, updated the generated dossier PDF with artifact labels, and extended source-link verification to scan public template files. Production commit `b205bd8f9214` / deployment `21a42519-8209-4356-a8a4-abaf6c34879e` passed all GitHub Actions workflows, live dossier behavior with template-download assertion, direct static template probes, and the primary viewport matrix.

- **Israel dossier course path is source-backed, verification-guarded, and live.**
  Impact: the dossier now has a reusable training layer instead of only a reading surface: source-file building, aid-ledger auditing, humanitarian figure attribution, incident evidence testing, legal-record reading, and publishable briefing work are all linked to canonical source anchors and corresponding Institute course/guide routes.
  Resolution: added `ISRAEL_DOSSIER_COURSE_PATH`, rendered it on `/israel-dossier`, exported it into the dossier PDF, added six Institute topics with source-safe course/guide copy, regenerated sitemap and `veritas-institute.md`, and extended canon plus behavior verification to cover the course path, module interaction, Institute links, and generated PDF text. Production commit `49a19b627432` / deployment `93e4009b-800a-4735-b015-03d740de41ee` passed live behavior verification, the primary viewport matrix, all twelve new Institute route probes, sitemap checks, and all GitHub Actions workflows.

- **Israel dossier verification is now CI-backed and live-behavior verified.**
  Impact: the dossier canon, source-link graph, production build, reader bundle, local rendered behavior, crawler metadata, preview images, carousel export, PDF export/text content, source workbench, money trail, and Chapter 15 public preview now have automated verification instead of relying on manual operator runs.
  Resolution: added `.github/workflows/verify-israel-dossier.yml`, pinned Playwright in `package.json`, added crawler/PDF assertions to `scripts/verify-israel-dossier-behavior.mjs`, stabilized CI source-link checking with archive-backed, restricted-host, and transient/retry-limited classification, split runtime and source-link jobs so external source checks cannot hide rendered dossier regressions, and added `.claude-state/source-link-trends.*` artifacts for run-over-run source drift. GitHub Actions run `24771280086` passed on commit `98f320f` with runtime verification plus source-link trend artifacts; the source graph had 448 unique URLs, 0 missing, 0 failed, 0 invalid, and 0 transient blockers.

- **Route-canon drift around `/about` and `/content-packs` is closed locally.**
  Impact: trust links and verification memory no longer point at dead routes in the local product map; `/about` is now a real trust surface again, and `/content-packs` resolves to the canonical content-pack surface instead of 404 drift.
  Resolution: rewrote `src/pages/AboutPage.tsx` with truthful publication copy, wired `/about` into `src/App.tsx`, added `/about` to `scripts/prerender.mjs`, and added a compatibility alias from `/content-packs` to `/content-pack`.


## Recently Closed (2026-07-16 — PDF cache + client errors)

- **Stable-name PDF immutable cache bug fixed and live.**
  Impact: `/veritas-institute-field-manual.pdf` no longer returns `max-age=31536000, immutable`, which would pin readers to a year-old PDF after content updates.
  Resolution: `server.js` setHeaders marks `*.pdf` as `public, max-age=3600, must-revalidate`; platform health asserts non-immutable. Live on `d734137`.

- **Replica client-error counters are live on release health.**
  Impact: operators see intake count + last message from `/api/health` and the analytics Release Health panel without Sentry.
  Resolution: in-memory counters on `/api/client-error` intake, surfaced in health payload and AnalyticsPage.


## Recently Closed (2026-07-16 — auth TTL + health transitions)

- **Access-token lifetime shortened 30d → 7d and live.**
  Impact: new sessions expire in one week instead of a month, reducing the window for stolen tokens while preserving weekly return reading.
  Resolution: JWT_EXPIRY/SESSION_TTL_MS in server-auth; status fields on /api/auth/status. Live-verified accessTokenTtl=7d.

- **Health history deploy transitions are operator-visible and live.**
  Impact: /api/health/history exposes commitTransitions and uniqueCommits; samples force-write on commit/status/failure changes and process boot; analytics Release Health renders the timeline.
  Resolution: server.js history + AnalyticsPage UI + verify:health-transitions.

## Critical

- **Third-party paging (Sentry cloud) is still optional.**
  Impact: client errors now reach structured Railway logs via `/api/client-error` and optional volume NDJSON, but there is still no external pager/email until a Sentry DSN or similar is configured.
  Recommendation: if out-of-band paging is required, set a Sentry DSN (or equivalent) on top of the native client-error intake.


## Recently Closed (2026-07-16 — field manual PDF)

- **Build-time Veritas Institute Field Manual PDF is live.**
  Impact: `/veritas-institute-field-manual.pdf` is a durable 60-page static asset (application/pdf) generated at postbuild, indexed in `llms.txt`, preferred by the book download control, and reported on `/api/health` as `instituteFieldManualPdf`.
  Resolution: `scripts/generate-institute-field-manual-pdf.mjs`, postbuild wiring, InstituteBookPDF static-first download, platform health HEAD check. Production commit `3cfe939` verified with platform PASS.

- **Membership checkout UTM attribution is live.**
  Impact: first/last-touch UTM+ref capture, Stripe `client_reference_id` stamps, and checkout analytics attribution properties on membership CTAs.
  Resolution: `src/lib/conversionTracking.ts` + MembershipPage wiring + `verify:checkout-attribution`.

## Recently Closed (2026-07-16 continued)

- **Native client error intake is live.**
  Impact: ErrorBoundary and global window error/rejection handlers report to `/api/client-error` with rate limiting and structured `[monitor]` logs (and optional volume persistence).
  Resolution: `src/lib/clientErrorReporting.ts`, ErrorBoundary/main wiring, and Express intake route.

- **Additional briefing archive pins landed.**
  Impact: Forensic Architecture Hind Rajab and OCHA Mar 2025 response update now carry exact Wayback snapshots (14/16 briefing source URLs pinned).

## Recently Closed (2026-07-16)

- **Operator-visible release health probe is live in code.**
  Impact: `/api/health` returns commit, chapter count, prerender coverage, analytics lifetime, and per-check status (200 ok / 503 degraded). `/analytics` now surfaces a Release Health panel. Platform health verification asserts the probe.
  Resolution: added `/api/health` in `server.js`, Release Health panel on `AnalyticsPage`, and `/api/health` checks in `scripts/verify-platform-health.mjs`.

- **GitHub Actions Node 20 action-runtime deprecation posture upgraded.**
  Impact: all nine verification workflows now pin `node-version: '24'` and set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` so the June/September 2026 Node 20 action-runtime deprecation does not silently age out the verification fleet.
  Resolution: updated every workflow under `.github/workflows/`.

- **Dead ContentPacksPage dual-route drift is closed.**
  Impact: brand kit and content packs now live on one canon (`/content-pack`); `/content-packs` remains a redirect alias.
  Resolution: merged Brand Assets + Usage Guidelines into `ContentPackPage.tsx` and deleted `ContentPacksPage.tsx`.

- **Public briefing source archive pins are published.**
  Impact: 11 briefing source URLs now carry exact Wayback snapshot URLs instead of wildcard lookups; a machine-readable manifest is public for editors and verifiers.
  Resolution: `PINNED_BRIEFING_ARCHIVES` in `israelDossierCanon.ts` plus `public/israel-dossier/workbooks/briefing-source-archive-manifest.json`.

## Emerging

- **The Veritas Institute manual export now has a durable build-time PDF** at `/veritas-institute-field-manual.pdf`, with client-side generation retained only as a fallback when the static asset is absent (local dev).

- **The Veritas Institute catalog is code-authored, not editor-authored.**
  Impact: the new learning vertical can scale fast in the repo, but long-term editorial expansion will bottleneck on code changes instead of structured publishing workflows.
  Recommendation: once the information architecture is validated, introduce a structured authoring system or content model for courses, guides, and manual sections.
