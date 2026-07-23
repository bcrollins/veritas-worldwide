# Device matrix smoke — top hubs

**Entity-only.** Run after deploy. No personal operator accounts.

## Viewports
| Label | Width | Notes |
|-------|------:|-------|
| Mobile SE | 375 | iPhone SE-class |
| Mobile | 390 | Default phone |
| Tablet | 768 | iPad portrait |
| Laptop | 1280 | MacBook-class |
| Desktop | 1440 | Wide evidence surfaces |

## Hubs to smoke (each viewport)
1. `/` — Volume I + ROC track labels
2. `/chapter/chapter-1` — evidence tier chips, `?tier=verified`, hierarchy filter, keyboard `?`
3. `/record-of-jesus-christ` — sticky TOC, claim search
4. `/israel-dossier` + `/israel-dossier/briefing` — confidence sticky mobile
5. `/profile/ted-cruz` — integrity docket, claims CSV
6. `/methodology` + `/sources` — FAQ, research-pack ZIP CTA (44px)
7. `/researcher` + `/researcher/timeline` — hub noindex; timeline local-only
8. `/volume-ii` — noindex scaffold
9. `/comprehensive-profile` — sticky mobile checkout, form a11y, free pack link
10. Soft-404: `/chapter/not-a-real-slug` → 404 + noindex
11. OPSEC: `/bernie` → noindex meta + X-Robots
12. `/research-pack.zip` — 200, attachment disposition, non-immutable cache

## CLI (no browser)
```bash
curl -sI https://veritasworldwide.com/ | head -1
curl -s https://veritasworldwide.com/bernie | rg -i 'name="robots"'
curl -sSI https://veritasworldwide.com/research-pack.zip | rg -i 'cache-control|content-disposition|ratelimit'
PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:live-anonymity
PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:live-bot-noindex
PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:live-research-pack
```

## Pass criteria
- Touch targets ≥44px on filter chips
- No horizontal overflow on chapter evidence chrome at 375
- Skip link (`#main-content`) focuses main
- No personal operator strings on any public surface
