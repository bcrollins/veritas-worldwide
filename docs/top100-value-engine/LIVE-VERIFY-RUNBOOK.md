# Live Verify Runbook — Veritas Worldwide

Entity-only operations. Publisher: Veritas Worldwide · rights@veritasworldwide.com

## After each deploy to `main` (Railway)

```bash
# Identity + corpora floors (soft floor WARN on lag is OK)
npm run verify:live-anonymity

# Deploy lag (tip vs live health commit)
npm run verify:deploy-lag

# Bot noindex quarantine surfaces
npm run verify:live-bot-noindex

# Offline research pack (ZIP magic, rate-limit, non-immutable cache)
npm run verify:live-research-pack

# Israel visual-investigations machine index (soft WARN on lag)
npm run verify:live-visual-investigations

# Optional full live pack
npm run verify:live
```

## Manual smoke (entity surfaces)

| URL | Expect |
|-----|--------|
| `/api/health` | status ok, commitShort present |
| `/evidence-taxonomy.json` | publisher Veritas Worldwide |
| `/researcher` | 200 + noindex first-paint |
| `/researcher/timeline` | 200 + noindex |
| `/volume-ii` | 200 + noindex scaffold |
| `/research-pack.zip` | 200, attachment disposition, max-age≤3600 must-revalidate, RateLimit |
| `/research-pack-manifest.json` | publisher Veritas Worldwide, sha256 |
| `/record-of-jesus-christ/corpus.json` | claimCount > hard floor |
| `/israel-dossier/corpus.json` | incidents count > hard floor |
| `/israel-dossier/visual-investigations.json` | 200, short cache, dual-cite VI index |
| `/comprehensive-profile` | 200, product title, free pack link |
| `/bernie` | X-Robots-Tag noindex + meta noindex |

## Anonymity audit (binary)

- [ ] No personal names/emails/GH namespace in public HTML/JSON/txt  
- [ ] sameAs entity-only (X + Reddit)  
- [ ] Commit author: Veritas Worldwide / rights@  
- [ ] No new personal social profile URLs  

## Coordinate with multi-agent

- Do not clobber `israelDossierHistoryPack.ts` densify or ROC wave files mid-export  
- Prefer densify-only or feature-only commits  
- If `index.lock` or push race: wait and retry; never force-push `main`
