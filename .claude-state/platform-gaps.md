# Platform Gaps — 2026-04-08

## Recently Closed

- **Israel dossier verification is now CI-backed and live-behavior verified.**
  Impact: the dossier canon, source-link graph, production build, reader bundle, local rendered behavior, crawler metadata, preview images, carousel export, PDF export/text content, source workbench, money trail, and Chapter 15 public preview now have automated verification instead of relying on manual operator runs.
  Resolution: added `.github/workflows/verify-israel-dossier.yml`, pinned Playwright in `package.json`, added crawler/PDF assertions to `scripts/verify-israel-dossier-behavior.mjs`, stabilized CI source-link checking with archive-backed and restricted-host classification, split runtime and source-link jobs so external source checks cannot hide rendered dossier regressions, and verified GitHub Actions run `24770703183` passed on commit `603aab0`. Production served `603aab0` and passed `npm run verify:israel-dossier:behavior -- https://veritasworldwide.com` on April 22, 2026.

- **Route-canon drift around `/about` and `/content-packs` is closed locally.**
  Impact: trust links and verification memory no longer point at dead routes in the local product map; `/about` is now a real trust surface again, and `/content-packs` resolves to the canonical content-pack surface instead of 404 drift.
  Resolution: rewrote `src/pages/AboutPage.tsx` with truthful publication copy, wired `/about` into `src/App.tsx`, added `/about` to `scripts/prerender.mjs`, and added a compatibility alias from `/content-packs` to `/content-pack`.

## Critical

- **Production monitoring is absent.**
  Impact: auth, search, analytics, and prerender regressions can ship without structured alerting or stack traces.
  Recommendation: add Sentry or an equivalent production error monitoring service and wire both server and client exceptions into it.

## Emerging

- **GitHub Actions emitted the JavaScript action runtime deprecation warning.**
  Impact: the new Israel dossier workflow passes today, but `actions/cache@v4`, `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/upload-artifact@v4` are still flagged by GitHub's Node 20 action-runtime deprecation notice.
  Recommendation: revisit action versions or opt-in runtime settings after confirming the latest official action releases support Node 24 cleanly.

- **The legacy `ContentPacksPage.tsx` generator module is still present off-route.**
  Impact: the canonical public surface is `/content-pack`, with `/content-packs` now only acting as a compatibility alias, but repo searches can still surface the older `ContentPacksPage.tsx` module and confuse future audits about which implementation is live.
  Recommendation: either intentionally restore that larger generator as a real surface or archive/delete the unused module so future route audits have one obvious content-pack canon.

- **The Veritas Institute manual export is browser-side only.**
  Impact: very large Book of Knowledge generations depend on client memory and device stability, which is fragile for a long-form field manual.
  Recommendation: if live browser testing shows instability, move the institute PDF build to a server-side or build-time artifact so the manual becomes a durable downloadable asset rather than a best-effort client render.

- **The Veritas Institute catalog is code-authored, not editor-authored.**
  Impact: the new learning vertical can scale fast in the repo, but long-term editorial expansion will bottleneck on code changes instead of structured publishing workflows.
  Recommendation: once the information architecture is validated, introduce a structured authoring system or content model for courses, guides, and manual sections.
