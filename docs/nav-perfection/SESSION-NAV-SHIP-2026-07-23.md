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
- `verify-nav-recovery-surfaces`: **64 surface needles** + family mounts + Hick/soft-404 exactness
- Live continuously green under densify tip ≥1500 incidents

## Detail-surface recovery wave (Sprint 6)
- Chapter / Article / Profile / Topic / AIPAC related-hub chips
- Institute course + guide ResearchHubChips
- Subscribe / Support / OSINT success related hubs
- Pure floors lock all new testids; peer densify unthrashed

## RelatedHubs component (Sprint 6b)
- `src/components/RelatedHubs.tsx` — `PRIMARY_RELATED_HUBS` (≤5) shared recovery chips
- Migrated: Aipac, Article, Chapter, Topic, Profile, Support/Subscribe success
- `ResearchHubChips` excludePath now filters (was dead-true)
- Pure recovery suite **90 surface needles**
- Commits: `f04fca1` detail surfaces → `76fbd3e` membership locks → `c42331b` RelatedHubs

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
| recovery | **64 surface needles** milestone |

| `7567a6b` | Join CTA label |

| `3e75719` | Dismiss aria-label |
| recovery | **64 surface needles** |

| `7600a35` | mobile support copy |

| `8a22f6d` | animate-slide-up entrance |

| `7a549c3` | no-print membership bar |

| `5f3024f` | min-w-[44px] touch targets |
| recovery | **64 surface needles** |

| `a49e4c9` | bg-obsidian membership chrome |

| `ecb883f` | backdrop-blur membership chrome |

| `f5a5533` | border-t membership chrome |

| `faad03d` | max-w-5xl membership width |
| recovery | **64 surface needles** milestone |

| `85d702e` | text-white contrast |
| recovery | **64 surface needles** |

| `746590e` | bg-crimson Join CTA |

| `ba7ce1b` | Join hover:bg-crimson-dark |

| `6e7c8d8` | shrink-0 CTA cluster |
| recovery | **64 surface needles** |

## Pure floor densification wave (post RelatedHubs)
Locked after platformization so multi-agent densify cannot drift IA:
- PRIMARY hub labels + exact 5 primaryLinks
- MobileTabBar ≥5 destinations
- Server soft-404 hub labels
- Search idle/empty destinations
- Home hub CTA destinations
- NotFound secondary News/Methodology/Pack
- Bookmarks empty Read+Search
- Profiles strip Search+Dossiers+pack
- Read TOC-by-part
- Media Kit pack/about
- Institute course/guide chips + excludePath
- OSINT success recovery
- AIPAC map recovery
- ResearchHubChips + DossierHubSpokes labels

**Live matrix (observed green while densify tip advances):**  
`mobile-tab-bar` · `RelatedHubs` · `DossierHubSpokes` · `ResearchHubChips` · `home-hub-cta-row` · `search-idle/empty` · `not-found-hub-chips` · `sticky-membership-bar` · `server-soft-404` + 5 hub hrefs · health checks all true

## Pure densification continuous wave (shipped intervals)
Incremental pure-only commits after RelatedHubs platformization — each independently reviewable:
touch targets, no-print, aria names, mount breadth, drawer retention, soft-404 labels,
Home/Search/NotFound/Bookmarks/Profiles/Read/MediaKit/Institute/OSINT/AIPAC/Membership/Legal/
About/A11y/Timeline/Topics destinations, z-order stacking, safe-area chrome.

**verify:pure** 46 suites green throughout. Peer densify unthrashed.
**Live:** RelatedHubs + mobile-tab-bar + DossierHubSpokes + ResearchHubChips + soft-404 5 hubs continuously green under densify tip advance.
