# Platform Gaps — 2026-04-07

## Critical

- **Production monitoring is absent.**
  Impact: auth, search, analytics, and prerender regressions can ship without structured alerting or stack traces.
  Recommendation: add Sentry or an equivalent production error monitoring service and wire both server and client exceptions into it.

- **Source-link health automation is better calibrated now, but it is not yet operationalized or fully remediated.**
  Impact: `npm run verify:sources` now retries GET after misleading HEAD failures and the actionable citation count is down to 28, but the remaining dossier/profile failures can still erode trust and there is no scheduled or CI-backed enforcement yet.
  Recommendation: finish remediating the remaining broken links, then wire `npm run verify:sources` into CI or a scheduled Railway/GitHub workflow so citation decay becomes a controlled operational signal instead of a periodic manual audit.

## Emerging

- **The Veritas Institute manual export is browser-side only.**
  Impact: very large Book of Knowledge generations depend on client memory and device stability, which is fragile for a long-form field manual.
  Recommendation: if live browser testing shows instability, move the institute PDF build to a server-side or build-time artifact so the manual becomes a durable downloadable asset rather than a best-effort client render.

- **The Veritas Institute catalog is code-authored, not editor-authored.**
  Impact: the new learning vertical can scale fast in the repo, but long-term editorial expansion will bottleneck on code changes instead of structured publishing workflows.
  Recommendation: once the information architecture is validated, introduce a structured authoring system or content model for courses, guides, and manual sections.
