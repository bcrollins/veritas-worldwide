# Nav Perfection Ship Log — 2026-07-23

**Scope:** Veritas Worldwide (not AeroLink)  
**Author:** Veritas Worldwide entity commits only  
**Multi-agent:** Peer Israel densify left unstaged / unthrashed

## Shipped intervals (main → Railway)

| Commit | Unit |
|--------|------|
| `c2e4a44` / `9df85fd` | Sprint 1: ≤5 hubs + mobile tab bar + Browse drawer + docs |
| `09a09a5` | Sprint 2: DossierHubSpokes + home/search/404 recovery |
| `0fce0d7` | Sprint 3: ResearchHubChips + footer hub order + tooltips |
| `256438a` | Research chips on Researcher + Content Pack |
| `7e6f8a3` | Profiles strip Search + Dossiers |
| `eadf78b` | Server soft-404 ≤5 hub HTML |
| `f1535b4` | Read TOC by archive part |
| `fb35ab5` | Timeline related hubs |
| `27633bf` | News desk related hubs |
| `54be9f8` | Topics related hubs |
| `a00e50f` | Institute research chips + a11y floors |
| `cdf9182` | About + Media Kit related hubs |
| `97f9cae` | Privacy + Terms related hubs |
| `bb5eddd` | Accessibility + Membership related hubs |
| `6b51bd1` | Search idle-state hub destinations |

## Floors
- `npm run verify:nav-ia` — expanded pure suite
- `npm run verify:pure` — 45 suites green at ship time

| `d5f6966` | OSINT free-archive related hubs |

| `7b73545` | Analytics related hubs |

| `c92ab29` | Volume II ResearchHubChips |

| `97ced10` | Bible + ROC ResearchHubChips |


| `622f69d` | Institute methodology + field manual chips |
| `9937d0d` | Personal Timeline ResearchHubChips |
| `6de51a4` / `16526df` | a11y floors + skip-shell fix |

## Live proof matrix (observed green)
- main: mobile-tab-bar, DossierHubSpokes, ResearchHubChips, Israel · Deep State
- soft-404: server-soft-404, Primary hubs, /read /israel-dossier /profiles /search
- home chunk: home-hub-cta-row, home-news-chip
- search chunk: search-empty-hubs, search-idle-hubs
- spokes chunk: dossier-hub-spokes, Also in Dossiers
- health: researchPackZip + researchPackManifest true

## Live proof (observed 2026-07-23)
- Soft-404 HTML: `server-soft-404` + hubs Record/Read/Dossiers/Profiles/Search (**eadf78b+ live**)
- SPA shell: `mobile-tab-bar` + Dossiers tooltip “Israel · Deep State · Forum”
- Health tip advances through densify + nav series; lag expected under multi-agent push volume

## Operator residuals (not agent-shippable)
- GitHub org transfer, history scrub
- Stripe portal branding
- Optional Sentry DSN

## Coordinate
Never stage peer `public/israel-dossier/*` densify WIP. Entity-authored nav intervals only.


## Pure suite
- `verify:pure` **46** suites including `verify-nav-recovery-surfaces`
- Live proof matrix 100% green for shell/home/search/soft-404/spokes
