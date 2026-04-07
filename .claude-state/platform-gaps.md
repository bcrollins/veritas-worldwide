# Platform Gaps — 2026-04-07

## Critical

- **Production deployment state is still stale and Railway remains inaccessible from the active workspace.**
  Impact: a release-observability patch is now shipped on `main`, but as of April 7, 2026, 6:48 PM ET production still serves older shell assets and older public chapter/search payloads; without Railway access from this workspace, the deployment cannot be inspected or forced forward directly.
  Recommendation: restore workspace access to the Railway project and use the new `/api/build-info` plus `X-Veritas-*` headers once they are live to compare production against `main` immediately.

- **Production monitoring is absent.**
  Impact: auth, search, analytics, and prerender regressions can ship without structured alerting or stack traces.
  Recommendation: add Sentry or an equivalent production error monitoring service and wire both server and client exceptions into it.

- **Source-link health is remediated locally, but it is not yet operationalized.**
  Impact: `npm run verify:sources` now passes cleanly with 379 unique URLs checked, but there is still no scheduled or CI-backed enforcement to catch future citation decay before it reaches production.
  Recommendation: wire `npm run verify:sources` into CI or a scheduled Railway/GitHub workflow so bibliography regressions become a controlled operational signal instead of a periodic manual audit.

## Emerging

- **The Veritas Institute manual export is browser-side only.**
  Impact: very large Book of Knowledge generations depend on client memory and device stability, which is fragile for a long-form field manual.
  Recommendation: if live browser testing shows instability, move the institute PDF build to a server-side or build-time artifact so the manual becomes a durable downloadable asset rather than a best-effort client render.

- **The Veritas Institute catalog is code-authored, not editor-authored.**
  Impact: the new learning vertical can scale fast in the repo, but long-term editorial expansion will bottleneck on code changes instead of structured publishing workflows.
  Recommendation: once the information architecture is validated, introduce a structured authoring system or content model for courses, guides, and manual sections.
