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

| `bda6919` | pure: server soft-404 exactly 5 hub hrefs |
| `0c05345` | pure: NotFound noindex |
| live | tip carries shell+home+search+soft-404 100% green |


## Pure recovery suite maturity
- 30+ surface needles + family mounts + Hick/server soft-404 exact hubs
- Latest: `f21bf93` ResearchHubChips=5, `e204b92` DOSSIER_SPOKES=5
- Live matrix continuously green under densify tip advances


## Recovery suite scale
- `verify-nav-recovery-surfaces`: **55 surface needles** + family mounts + Hick/soft-404 exactness
- Live continuously green under densify tip ≥1500 incidents

| `75ff335` | recovery suite 40 needles (not-found-page) |

| `c18116b` | membership↔cookie consent event contract |
| `12536b3` | cookie same-tab event |

| `fa72029` | cookiePending hide-while-banner-pending |

| `c2afcd0` | membership z-40 stacking |
| `9b7762a` | cookie z-100 > tab z-50 |
| `f837f09` | MobileTabBar z-50 |

| `843f128` | membership exclude /membership |

| `4de6574` | sticky dismiss key |

| `b7a2376` | trackSupportClick on membership bar |
| recovery | **55 surface needles** milestone |

| `7567a6b` | Join CTA label |

| `3e75719` | Dismiss aria-label |
| recovery | **55 surface needles** |

| `7600a35` | mobile support copy |

| `8a22f6d` | animate-slide-up entrance |

| `7a549c3` | no-print membership bar |
