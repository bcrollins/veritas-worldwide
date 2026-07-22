# Israel Dossier Densify Waves — 2026-07-22

## Shipped & live (or queued)

### `1f4dfe9` — densify 1966–2021 + lobby + actors
- **Live proven** on deployment `2fd2eb0c-38e0-4c0f-928a-df2a91408788`
- Corpus: **45 incidents · 38 timeline · 23 actors · 11 money nodes**
- Incidents: Al-Samu 1966, USS Liberty, Land Day, Litani 1978, Beirut siege 1982, Guardian of the Walls 2021
- Timeline: ICJ provisional measures + ICC warrants 2024
- Actors: Howard Kohr, Haim Saban, Kamala Harris, Marco Rubio, Mike Pompeo
- Money: `pro-israel-lobby-2024` ($180M+ OpenSecrets cycle)
- Behavior: search?q=gaza promo + densify surface text locked

### `d16963d` / `773e0d2` — discovery CTAs
- Chapter 15 → money trail + full dossier
- Chapter 16 → Liberty in dossier (`?q=USS+Liberty`)
- Profile enablement cards deep-link `?actor=:id`
- **Live behavior PASS** (chapter CTAs + profile deep-link)

### `df552c2` — densify wave 2 (Summer Rains / Jenin / legal)
- Corpus target: **49 incidents · 40 timeline · 23 actors · 11 money**
- Incidents: Summer Rains 2006, Cast Lead infrastructure pattern, Great March medics/press, Jenin July 2023
- Legal cases: Kahan Commission, UN COI March of Return, NGO apartheid characterizations
- Behavior floors raised to 45/20/38/11
- **Live behavior PASS** (full suite) with corpus 49 on production

### `249639e` — enablement graph + corpus legal/lobby export
- Actors **27**: +Gottheimer, Cotton, Ocasio-Cortez (counter), Bolton
- `corpus.json` now exports `legalCases` (7) and `lobbying` (4)
- Behavior floors: actors ≥24, legalCases ≥5, lobbying ≥3

## Editorial boundaries (preserved)
- Evidence tiers labeled; non-exhaustive disclaimer retained
- No ethnicity/religion as enablement; funds/votes/warrants only
- October 7 included for non-selective war-crimes record
- Court vs NGO findings distinguished in legal section

## Coordination notes
- Multi-agent: news RSS/OG (`c7327cb`, `61dfd1b`) and dossier CTAs interleaved cleanly on `main`
- Did not touch parallel agent files (e.g. `public/news/`, home-toc verifier noise)
- Railway queue: ship interval commits; later deploys supersede earlier SUCCESS

## Live proof commands
```bash
curl -sS https://veritasworldwide.com/api/build-info
curl -sS https://veritasworldwide.com/israel-dossier/corpus.json | jq .counts
npm run verify:israel-dossier:behavior -- https://veritasworldwide.com
```
