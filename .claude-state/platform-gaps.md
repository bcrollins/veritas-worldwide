# Platform Gaps — 2026-04-08

## Recently Closed

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
