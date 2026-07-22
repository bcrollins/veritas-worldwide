# Israel Dossier Densify Ocean — Live Floor

## Live corpus (proven)
- **57 incidents** (target after a78a4e9)
- **48 timeline events**
- **37 actors**
- **14 money nodes**
- **41 historical war-crimes pack**
- **7 legal cases · 4 lobbying records**
- **incidentsByEra + actorsByCategory** in corpus.json

## Key commits this continuation
| Commit | What |
|---|---|
| `2c0b95a` | Cave of Patriarchs, Huwara, Second Lebanon War + Stefanik/Torres/Rosen/Sherman + Hellfire |
| `ef73c0d` | Search discovery Hebron/Huwara/Hellfire |
| `0887a89` | Shareable incident era filter `?era=` |
| `c138d83` | Operation Rainbow Rafah 2004 |
| `c6aca99` | Home CTA copy for densified engine |
| `b09d9af` | Corpus era/category breakdowns + Tim Scott |
| `a78a4e9` | Settler violence surge pattern 2021–2023 |

## Behavior suite locks
- search gaza / liberty / hebron promos
- densify surface text (including Rainbow, settler violence)
- era filter deep-link
- chapter 15/16 CTAs, profile actor deep-links
- corpus floors + incidentsByEra / actorsByCategory

## Verify
```bash
curl -sS https://veritasworldwide.com/israel-dossier/corpus.json | jq .counts
npm run verify:israel-dossier:behavior -- https://veritasworldwide.com
```
