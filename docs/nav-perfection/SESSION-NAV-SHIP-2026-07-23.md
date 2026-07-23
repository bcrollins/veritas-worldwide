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

## Sprint 7 — Remaining surface recovery (SHIPPED)
- Media Kit / Bookmarks / Profiles / Read / OSINT success / Bernie → RelatedHubs
- RelatedHubs `tone="dark"` for quarantine show pages
- Pure recovery **100 surface needles**
- Peer densify lane unthrashed

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

## Dossier family primary recovery (Sprint 6c)
- Deep State, Forum, Briefing, Israel dossier: `RelatedHubs` beside `DossierHubSpokes`
- Live: `deep-state-related-hubs`, `forum-related-hubs`, `briefing-related-hubs` observed in production chunks
- Pure recovery suite **95 surface needles**; RelatedHubs mount breadth ≥20
- Forum beta remains device-local (pure-locked)

## Live matrix 100% proof (session continuation)
Observed green on production bundles (misses=0):
- CORE: RelatedHubs · mobile-tab-bar · DossierHubSpokes · ResearchHubChips
- Home: home-hub-cta-row · home-news-chip
- Search: search-idle-hubs · search-empty-hubs
- Sticky: sticky-membership-bar
- Soft-404 SPA: not-found-hub-chips
- Dossier family: deep-state / forum / briefing / israel-dossier related hubs
- Detail: chapter / news / profile related hubs
- Server soft-404: server-soft-404 + Primary hubs + 5 hrefs
- Health: all checks true · failed=[]
- pure: 46 suites · recovery 95 surface needles

## Recovery suite 95 needles continuous pure densification
Post-platformization pure-only intervals lock chrome contracts (membership, cookie,
safe-area, aria-current, GA, dismiss, copy, Join CTA), destination sets (Home/Search/
NotFound/detail/dossier family/AIPAC), and package entrypoints. Live matrix repeatedly
verified **misses=0** with soft-404 5 hubs and health all-true under densify tip advance.

## Session end live matrix misses=0
Verified production bundles (CORE + 13 page needles) repeatedly green while densify tip advances past 2400 incidents. Soft-404 server hubs green. pure 46. Recovery suite 95 needles + dense destination/chrome contracts. Entity-only. Peer densify unthrashed for intentional nav ownership.


## Sprint 7b/7c ship
- Search idle/empty → RelatedHubs SEARCH_RECOVERY_HUBS
- Bookmarks empty → RelatedHubs BOOKMARKS_HUBS
- a11y floors credit RelatedHubs mounts
- Pure recovery 100 needles · RelatedHubs breadth ≥28


## Soft-404 secondary platformization
- `not-found-secondary-hubs` via RelatedHubs
- Pure recovery **102 surface needles**
- Live CORE+soft-404 green under densify tip


## Live proof (session end densify)
- CORE: mobile-tab-bar · DossierHubSpokes · ResearchHubChips · RelatedHubs
- SOFT: server-soft-404 + Primary hubs + 5 hrefs
- Product LIVE: Sprint 7 + Search platform + Home underfold + soft-404 secondary + a11y credit
- Pure: 102 surface needles · RelatedHubs breadth ≥30 · pure 46 green
- Peer densify unthrashed (single-file pure commits)


## Sprint 8 — RelatedHubs emphasizeTo + soft-404 primary platformization
- RelatedHubs `emphasizeTo` crimson CTA (Record on soft-404)
- NotFound primary+secondary dual RelatedHubs mounts
- Import thrash blank-line hygiene + multi-line HUBS constants
- Pure: HUBS ≤5, emphasizeTo, dual NotFound mounts


## Sprint 8b — Account hub densify + legal five
- Accessibility/OSINT/Privacy/Terms recovery hubs at 5 destinations
- RelatedHubs emphasizeTo pure floors densified
- Import thrash hygiene + multi-line HUBS
- pure 46 green · recovery 102 needles


## ALL PRODUCT LIVE CONFIRMED
- CORE: mobile-tab-bar · DossierHubSpokes · ResearchHubChips · RelatedHubs
- SOFT: server-soft-404 + Primary hubs + 5 hrefs
- Sprint 7 remaining surfaces + Search/Bookmarks/Home + soft-404 secondary
- Sprint 8 emphasizeTo soft-404 primary platformization
- Account five-hub densify (A11Y/OSINT/Privacy/Terms)
- Import thrash hygiene + multi-line HUBS
- pure 46 green · recovery 102 needles · densify lane unthrashed

## Sprint 9 — RelatedHubs on research & institute (2026-07-23 continuation)

| Commit | Unit |
|--------|------|
| `dcd84eb6` | feat(nav): RelatedHubs primary recovery on Institute (+book/methodology/course/guide), Methodology, Sources, Volume II, Researcher, Content Pack, Bible History, ROC, Personal Timeline |
| `3732f86f` | test(nav): pure recovery floors 115 surface needles (was 102) |
| `4c1e5ea1` / `c2ec98b5` | perpetual densify locks recovery v17 + IA v16 including Sprint 9 |

### Pattern
Dual recovery: existing `ResearchHubChips` (research drawer family) + `RelatedHubs` PRIMARY ≤5 (shell hubs) on parchment tone, 44px min touch, no-print. Does not expand global shell hub budget (Hick).

### Pure floors
- `verify:nav-recovery` — 115 needles PASS
- `verify:nav-ia` — 5 primary hubs PASS  
- `verify:a11y-public-targets` — RelatedHubs mount credit PASS
- `verify:pure` — 46 suites PASS

### Multi-agent
Peer Israel densify (`public/israel-dossier/*`, history pack, VI) never staged. Entity author only. Ship intervals: product → pure → densify locks.


## Sprint 9b — keyboard focus + coverage pure (continuation)

| Commit | Unit |
|--------|------|
| `426da3c5` | pure: related-hubs-coverage (43 public pages) |
| `ba087ca3` | pure suite wire → 47 suites |
| `ffb75216` | RelatedHubs focus-visible rings |
| `beb562f1` | ResearchHubChips focus-visible |
| `7e55368e` | DossierHubSpokes focus-visible (all variants) |
| `de8c944d` / `72fef924` | pure densify locks v18–v19 |


## Sprint 9c — full shell keyboard focus platform

| Commit | Unit |
|--------|------|
| `d0a81d2b` | mobile tab bar focus-visible |
| `c77d60da` | cookie consent focus-visible |
| `e82e17df` | desktop primary/utility/drawer focus-visible |
| `40d13fa3` | footer columns + membership/support CTAs focus-visible |
| `b496822c`–`5aef6d70` | pure densify locks v21–v23 |

Shell keyboard a11y now covers: skip-link (existing), desktop nav, mobile tabs, drawer, footer, cookie banner, RelatedHubs, ResearchHubChips, DossierHubSpokes.


## Sprint 9d — engagement modal + sticky bar keyboard focus

| Commit | Unit |
|--------|------|
| `b8c6474e` | sticky membership bar focus-visible |
| `4402b7ae` | exit-intent modal focus-visible |
| `2bed2fb7` | AuthModal focus-visible |
| `f23938bd`–`…` | pure densify locks v25–v27 / IA v19 |


## Sprint 9e — content engagement keyboard focus

| Commit | Unit |
|--------|------|
| `9e577ebe` | NewsletterSignup focus-visible |
| `1fd73775` | SharePanel focus-visible |
| `9909ce5f` | CorrectionsCTA focus-visible |
| `a7d194fd` / `e5ba8fbb` | pure densify locks v28–v29 |


## Sprint 9f — reader chrome keyboard focus

| Commit | Unit |
|--------|------|
| `277d91a3` | Bookmark, FontSize, Breadcrumb, BackToTop, DonationBanner, Language, PrimarySource, FloatingShare, ContentGate, DownloadModal, ContinueReading, ErrorBoundary, RecordTabs, CorpusSearch, TextSelectionShare focus-visible |
| `f94a2a58` | pure densify lock v31 |


## Sprint 9g — remaining reader surfaces keyboard focus

| Commit | Unit |
|--------|------|
| `6249fdaf` | Citation, Dispute, Forum, PDF suite, DossierCarousel, MarketingConsent, ReadingStreak, AipacDiagram, InstituteLayout, InstituteBookPDF focus-visible |
| `acbf3e4c` | pure densify lock v32 |

**Coverage:** All `src/components/**` interactive controls with `min-h-[44px]` now include `focus-visible:ring-2` (37+ component files). Global CSS `:focus-visible` outline remains as baseline.


## Sprint 9h — RelatedHubs active hub aria-current

| Commit | Unit |
|--------|------|
| `231bcc81` | RelatedHubs useLocation + aria-current=page on active primary hub |
| `3cca1418` | pure densify lock v34 + coverage suite aria-current assert |

