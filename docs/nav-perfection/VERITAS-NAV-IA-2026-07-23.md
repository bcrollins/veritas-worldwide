# Veritas Navigation & UX Consolidation — SCOPE: entire platform (current window)

**Entity-only.** Not AeroLink — this session’s live work is **Veritas Worldwide** (`veritasworldwide.com`).  
Aviation IA laws are adapted to an evidence-publisher reader, not pilot tools.

## Core Laws applied
1. Hick’s Law ≤5 primary hubs  
2. Search as first-class hub (≤1 tap to search)  
3. Hub-and-spoke (Dossiers covers Israel + Deep State + Forum active state)  
4. Progressive disclosure: named **Browse** / **Research** / **Account & Trust** sections (no More/Misc junk drawer)  
5. Thumb-zone: mobile bottom tab bar  
6. Capability preservation: zero route removals  

## Navigation Tree — BEFORE
| Surface | Links |
|---------|--------|
| Desktop primary | Record, Read, **News**, Dossiers, Profiles, **Forum** (6 > Hick) |
| Desktop utility | Institute, Topics, Search |
| Mobile | 6 pills + Search (7) + hamburger drawer |
| Drawer | Primary (dup) + Research + Account (sparse) |

## Navigation Tree — AFTER
| Surface | Links |
|---------|--------|
| **Primary hubs (≤5)** | Record `/` · Read `/read` · Dossiers `/israel-dossier` · Profiles `/profiles` · Search `/search` |
| Desktop utility | News, Institute, Topics |
| Mobile tab bar | Record · Read · Dossiers · Profiles · Search |
| Drawer Browse | News, Forum, Timeline, Deep State |
| Drawer Research | Methodology, Sources, Researcher, Institute, Topics, Content Packs, Bible, ROC, Volume II |
| Drawer Account & Trust | Bookmarks, Analytics, Membership, About, Media Kit, OSINT $499, Accessibility, Privacy, Terms |
| Footer | Unchanged full map (Browse / Research / Utility) — all prior destinations preserved |

## Tap-depth (daily reader actions)
| Action | Before | After |
|--------|-------:|------:|
| Open Search | 2 (pill or utility) | **1** (tab/hub) |
| Read chapters | 1 | 1 |
| Israel dossier | 1 | 1 |
| Profiles | 1 | 1 |
| News | 1 | **2** (utility or Browse drawer) — still ≤3; secondary frequency |
| Forum | 1 | **2** (Browse drawer / Dossiers active) |
| Methodology | 2 | 2 |
| Research pack | 2–3 | 2–3 (unchanged surfaces) |

## Capability Preservation (selected)
| Capability | Before | After |
|------------|--------|-------|
| News | Primary | Desktop utility + drawer Browse + footer |
| Forum | Primary | Drawer Browse + footer; Dossiers hub active when on /forum |
| Search | Utility + 7th mobile pill | Primary hub + tab bar |
| Deep State | Drawer only | Drawer Browse (named) |
| Researcher | Footer only | Drawer Research + footer |
| Volume II | Footer research | Drawer Research + footer |
| All routes | Live | **Unchanged paths** — no redirects required |

## Routing & Redirect Map
**No routes moved.** Zero redirects needed. Existing `/content-packs` → `/content-pack` and `/share` → `/content-pack` retained.

## Label Register
| Old | New | Why |
|-----|-----|-----|
| Mobile pill “The Record” | Tab “Record” | Shorter thumb label; same destination |
| Drawer “Primary” | “Hubs” | Matches ≤5 hub model |
| Drawer “Account” | “Account & Trust” | Holds trust/legal/membership without junk “More” |
| (none) “Browse” | New section | Re-homes News/Forum without deletion |

## File-by-file
- `src/App.tsx` — primaryLinks ≤5, drawer Browse, MobileTabBar, main safe-area pad  
- `src/components/StickyMembershipBar.tsx` — sits above mobile tab bar  
- `scripts/verify-nav-ia.mjs` + pure suite wire  

## Banned patterns avoided
- No More/Misc/… junk drawer  
- No capability removed  
- No hamburger as sole primary nav (drawer is secondary library; hubs live in tab bar)
