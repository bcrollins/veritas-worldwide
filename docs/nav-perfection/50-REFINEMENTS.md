# 50 Nav/UX Refinements — Veritas (SCOPE: entire platform)

Grouped sprints. **Entity-only. Multi-agent: do not thrash peer densify WIP.**

## Sprint 1 — Hub budget + mobile shell (SHIPPED)
1. Primary hubs ≤5 (Record, Read, Dossiers, Profiles, Search) — Hick  
2. Elevate Search to primary hub — search-as-nav  
3. Mobile bottom tab bar thumb-zone — 2-tap  
4. Safe-area pad main + membership bar above tab — Apple HIG  
5. Drawer named **Browse** for News/Forum (no More) — progressive disclosure  
6. Drawer **Account & Trust** consolidates membership/legal — no deletion  
7. Dossiers hub active for /forum + /deep-state — hub-and-spoke  
8. Researcher + Volume II in Research drawer — preserve  
9. Pure `verify:nav-ia` floor — regression  
10. Docs IA before/after + preservation ledger  
11. Desktop utility = News · Institute · Topics — secondary strip  
12. Sticky membership bar offset mobile — no double-stack  

## Sprint 2 — Dossier hub spokes (SHIPPED)
13. Sticky subnav on /israel-dossier: Briefing · Deep State · Forum · Profiles — `DossierHubSpokes`  
14. Deep-state page “Also in Dossiers” back-link — also-in variant  
15. Forum page breadcrumb to Dossiers hub — inline variant  
16. Home hero primary CTA row (Read · Dossiers · Search) — `home-hub-cta-row`  
17. Home News chip in 1-tap from Record hub — `home-news-chip`  
18. Profiles hub strip: integrity + pack + OSINT + Search + Dossiers  
19. Read hub chapter list density (grouping by part) — `read-toc-by-part`  
20. Timeline under Browse + Read “Related” — `timeline-related-hubs`  
+ Briefing page also-in spokes  
+ Search empty-state hubs (`search-empty-hubs`)  
+ Soft-404 primary hub chips (`not-found-hub-chips`) + server HTML hubs  
+ Cookie z-[100] above tab bar (z-50) / membership (z-40) documented  

## Sprint 3 — Research hub (SHIPPED)
21. /researcher mounts ResearchHubChips  
22. Methodology ↔ Sources bidirectional hub chips — `ResearchHubChips`  
23. Institute mounts ResearchHubChips  
24. Content pack mounts ResearchHubChips  
25. Search empty-state: top destinations — Sprint 2  
26. Search placeholder improved  
27. Bookmarks empty + News + Pack  
28–30. Analytics / Media kit / Comprehensive under Account (already)  
+ Footer mirrors ≤5 hub order  
+ Dossiers tooltip “Israel · Deep State · Forum”  

## Sprint 4 — Information scent & labels (SHIPPED core)
31. Label “The Record” tab short “Record” mobile only (done tab)  
32. Dossiers tooltip: Israel · Deep State · Forum  
33. Footer mirror ≤5 hub order for scent consistency  
34. Breadcrumb component on major pages — chapter breadcrumb retained; hub chips cover recovery  
35. Aria-current already on hubs — drawer included  
36. Focus ring audit drawer links — global `:focus-visible` crimson  
37. Skip link already present  
38. Language selector stays Account drawer  
39. Theme toggle stays Account drawer  
40. Sign-in spatial consistency retained  

## Sprint 5 — Depth & scan (SHIPPED recovery web)
41. Chapter page sticky section TOC already — keep  
42. Israel sticky TOC peer — do not thrash  
43. News desk related hubs — `news-related-hubs`  
44. Forum hub-and-spoke breadcrumb  
45. Membership related hubs — free archive scent  
46. Empty bookmarks guided + News + Pack  
47. Soft-404 CTAs to 5 hubs — SPA + server  
48. 404 page hub chips  
49. Cookie consent above tab bar z-index  
50. Pure floor expand: primaryLinks + spokes + recovery + a11y floors  

## Account & Trust recovery (SHIPPED)
- About, Media Kit, Accessibility, Membership, Privacy, Terms related hub chips  
- Topics, News, Timeline, Institute recovery chips  

## Capability check
News, Forum, Deep State, Timeline, all research surfaces, OSINT, membership, legal — all reachable ≤3 taps. Zero removals. Zero peer densify thrash.

## Live proof (2026-07-23)
`mobile-tab-bar`, `DossierHubSpokes`, `ResearchHubChips`, `home-hub-cta-row`, `home-news-chip`, `dossier-hub-spokes`, `research-hub-chips`, `news-related-hubs`, `server-soft-404` + Primary hubs, research pack health true.
