# Veritas Worldwide Top-100 Value Engine — Truth Model

**Captured:** 2026-07-23  
**Operator:** BR (entity-only public surface: Veritas Worldwide)  
**Property:** https://veritasworldwide.com  

## Live baseline (Phase A)

| Signal | Live value | Source |
|--------|------------|--------|
| Health | `status: ok` | `/api/health` |
| Deploy tip (sample) | lagging main during densify waves | health `commitShort` |
| Public chapters | **32** | health `publicChapterCount` |
| Prerender routes | **~683** | health `prerenderedRouteCount` |
| Sitemap URLs | **~682** | `sitemap.xml` `</url>` count |
| ROC claims | **633–642** (deploy lag vs soft floor) | `/record-of-jesus-christ/corpus.json` |
| Soft claim floor | tracks latest ROC wave (WARN-only lag) | `verify-live-anonymity` |
| Soft-404 / 301 matrix | **PASS** | `verify:live-bot-noindex` |
| Live anonymity | **PASS** (identity clean) | `verify:live-anonymity` |
| FAQ bot surfaces | **22/22** core hubs FAQPage | Googlebot sample matrix |
| Entity contacts | rights@ / privacy@ / corrections@ only | humans.txt, about |

## Anonymity baseline

- **Public HTML sample scan** (`/`, about, methodology, sources, membership, media-kit, llms, humans, robots, security): **clean** of brandon/brollins/gmail/personal GH/LinkedIn.
- **humans.txt**: entity-only, live 200.
- **/ai.txt → /llms.txt**: live 301.
- **/bernie**: robots Disallow + noindex (residual OPSEC product surface).
- **Personal timeline**: localStorage, noindex, not public index.
- **OSINT orders**: gitignored NDJSON, retention purge, refuse-list, PII fail-closed under `/data`.

**P0 identity:** none open on sampled public surfaces at capture. Continuous audit remains mandatory per ship.

## Stack / product map

- SPA: React + Vite + TypeScript + Tailwind  
- Server: Express, bot meta injection, soft-404, PATH_ALIASES, analytics, auth, OSINT checkout  
- Content: The Record Volume I (32 chapters), ROC corpus, Israel dossier, Institute, news, profiles, media kit  
- Verifies: pure SEO/soft-404 + live anonymity/bot-noindex  

## Score snapshot (0–10, inferred from live + codebase)

| Surface | Score | Gap driver |
|---------|-------|------------|
| Soft-404 / crawl canon | 9.4 | minor residual path aliases |
| Entity anonymity public | 9.3 | bernie residual; continuous scan |
| Methodology / sources | 9.0 | deeper export + citation UX |
| Chapter reader | 8.6 | denser customizability, print, TTS polish |
| ROC | 8.7 | volume scaffolding, claim UX |
| Profiles integrity | 8.4 | n≥3 densify incomplete vs 96 floor ambition |
| Israel dossier | 8.5 | densify ongoing; briefing UX |
| Analytics privacy | 8.2 | transparency copy + retention UI |
| Rights / media kit | 8.8 | press pack completeness |
| Researcher tools | 7.8 | timeline/export/tagging still early |
| Multi-volume scaffolding | 7.5 | Volume II / ROC navigation polish |
| Accessibility | 8.3 | long-form AA edge cases |
| Distribution / GEO | 8.6 | floors lag claim waves |
| OPSEC / admin | 8.0 | admin surface defense-in-depth |

## Assumptions (documented)

1. Railway deploys from `main`; multi-agent densify causes health tip lag (WARN soft floor).  
2. Entity-only attribution is permanent product law.  
3. Soft floor WARN is not identity failure.  
4. Peer WIP (dossier densify, integrity) must not be clobbered; SEO/value ships stay scoped files only.  

## P0 queue at Phase A exit

- None identity-open on public sample.  
- Soft floor lag: absorb via deploy wait / non-blocking.  
- Pure suite identity collision on `timelinePage` fixed in working tree → ship if not on main.  
