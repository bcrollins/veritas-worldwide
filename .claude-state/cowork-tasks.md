# Veritas Audit Queue — 2026-04-07

- [x] P0 — Re-ran the live logout revocation check after deploy: the same bearer token now gets `401` from `/api/auth/me` and `/api/downloads/the-record.pdf` after logout.
- [x] P1 — Added repo-native auth regression coverage via `npm run verify:auth` for anonymous preview, register, login, full chapter unlock, source-only search, protected PDF download, logout, revoked-token denial, and post-logout chapter downgrade.
- [P2] Verify the `/chapter/:id` and `/read` auth upgrade/downgrade flows in a real browser session at 390px and 430px widths.
- [P3] Build a source-link integrity checker with archive fallbacks so citation durability is actively monitored.
- [P4] Add production error monitoring (Sentry or equivalent) for auth, search, analytics, and prerender failures.
