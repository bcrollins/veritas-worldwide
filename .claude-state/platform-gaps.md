# Platform Gaps — 2026-04-07

## Critical

- **Production monitoring is absent.**
  Impact: auth, search, analytics, and prerender regressions can ship without structured alerting or stack traces.
  Recommendation: add Sentry or an equivalent production error monitoring service and wire both server and client exceptions into it.

- **Source-link health and archive coverage are absent.**
  Impact: a key trust surface can silently decay as external citations rot or move.
  Recommendation: add an automated link-health checker with archive fallback tracking for source URLs and record failures in state.
