# Integrity densify floor — 96/96

**Status:** Permanent dual-cite densify floor. Every power profile in `PROFILES` has **≥3 verified** documented falsehoods with distinct `statementUrl` / `debunkUrl`.

## Rules (enforced by `scripts/verify-integrity-score.mjs`)

- Score: `100 − severity` where minor=8, material=15, egregious=25
- Only `tier: 'verified'` rows score
- Dual-cite: `statementUrl !== debunkUrl` for every verified row
- Permanent per-profile densify gates + docket id checks
- Compiled docket floor: **≥96**

## Corpus export

- `npm run export:profiles-corpus` → `public/profiles/corpus.json`
- Live index: https://veritasworldwide.com/profiles/corpus.json
- Profile pages: https://veritasworldwide.com/profile/{id}

## Local verification

```bash
node scripts/verify-integrity-score.mjs
node scripts/export-profiles-corpus.mjs
```

## Completion commit

`feat(integrity): complete 96/96 dual-cite densify floor — every power profile n≥3`

Shipped as incremental densify waves on `main` (Railway git-push deploy). Multi-agent coordination: integrity-only commits; israel-dossier / ROC WIP left unstaged by densify agents.

## Shareable integrity filter presets

| Preset | URL |
|--------|-----|
| Lowest integrity first | `/profiles?sort=integrity-asc` |
| Politicians · integrity | `/profiles?sort=integrity-asc&category=politician` |
| Media · integrity | `/profiles?sort=integrity-asc&category=media` |
| Open docket on a profile | `/profile/{id}?docket=1` or `/profile/{id}#integrity` |

Live: https://veritasworldwide.com/profiles?sort=integrity-asc

## Dual-cite hygiene

`verify-integrity-score.mjs` rejects **single-source** verified dockets corpus-wide (`statementUrl === debunkUrl`) and requires ≥288 verified dual-cite rows (96 × 3). One-tap primary sources open statement + debunk URLs from each docket card.

