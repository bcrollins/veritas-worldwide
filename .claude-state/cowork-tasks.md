# Veritas Audit Queue — 2026-04-07

- [P0] After deploy, re-run the live logout revocation check: register/login, call `/api/auth/logout`, then confirm the same bearer token gets `401` from `/api/auth/me`, `/api/chapters/:id?scope=full`, and `/api/downloads/the-record.pdf`.
- [P1] Add automated auth regression coverage for register, login, logout, protected PDF download, and preview-to-full chapter transitions.
- [P2] Verify the `/chapter/:id` and `/read` auth upgrade/downgrade flows in a real browser session at 390px and 430px widths.
- [P3] Build a source-link integrity checker with archive fallbacks so citation durability is actively monitored.
- [P4] Add production error monitoring (Sentry or equivalent) for auth, search, analytics, and prerender failures.
