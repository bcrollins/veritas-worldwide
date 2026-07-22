# Session 2026-07-22 — All 94 profiles first-party + JSON-LD + corpus

## Shipped
- `c4d0ad1` — First-party assets for all 94 profiles (40 Bioguide JPGs + monogram SVGs); Person/ProfilePage JSON-LD; floors raised
- `05e8eb4` — Bioguide IDs on 34 profiles; `/profiles/corpus.json`; sitemap + llms index
- structured-data verifier covers flagship profiles

## Live proof targets
- `/profiles/aoc.jpg` 200
- `/profiles/corpus.json` 200 with 94 rows
- Twitterbot `/profile/aoc` og:image first-party + JSON-LD ProfilePage
- prerenderedRouteCount ≥ 360 (386)
- verify:platform PASS · verify:pure PASS
