# Platform Gaps — 2026-04-07

## Critical

- **Production monitoring is absent.**
  Impact: auth, search, analytics, and prerender regressions can ship without structured alerting or stack traces.
  Recommendation: add Sentry or an equivalent production error monitoring service and wire both server and client exceptions into it.

- **Source-link health automation now exists locally, but it is not yet operationalized or fully remediated.**
  Impact: `npm run verify:sources` now detects citation decay, but the remaining dossier/profile failures can still erode trust and there is no scheduled or CI-backed enforcement yet.
  Recommendation: remediate the remaining broken links, then wire `npm run verify:sources` into CI or a scheduled Railway/GitHub workflow.
