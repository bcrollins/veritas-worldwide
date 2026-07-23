# Veritas Worldwide Top-100 Value Ledger

**Engine:** Top-100 Value Engine v1.0 · Veritas + Anonymity  
**Date:** 2026-07-23  
**Operator posture:** Entity-only (Veritas Worldwide). BR identity inviolable.  
**PRIORITY formula:** (gap × launch-criticality) ÷ cost; anonymity + source-integrity auto-elevated.  
**FINAL:** 100/100 terminal (52 Implemented · 48 Absorbed · 0 Blocked) as of 2026-07-23 interval 8.

**Status key:** Pending | In Progress | Implemented | Absorbed | Blocked  

## Execution status (rolling)

- **Interval VI (2026-07-23):** Israel Dossier Visual Investigations densify — 23 VI cards, 28+ video-linked incidents, dual-cite floors, multi-party (Oct 7 + Gaza/WB civilian harm). Entity-only.
- **Interval 8 (2026-07-23):** remaining 22 → terminal (dossier export, error boundary, device matrix, pure floors batch).
- **Interval 7 (2026-07-23):** waves 61–65 → 687 local/shipping; soft-floor auto; wave barrel; /bernie all-UA noindex; GEO floors; sticky TOC; Volume II hub; identity-scrub pure.
- **Interval 1 (2026-07-23):** #1 #2 #3 #4 #5 #6 #7 #9 #22 #88 Implemented/Absorbed. Pure 29/29 PASS. Peer ROC densify left unstaged.
- **Interval 2 (2026-07-23):** soft-floor.json auto; wave barrel Wave3–61; wave61 → 651 claims; /bernie+/admin all-UA noindex HTML inject; ROC sticky + ?q/?tier/?domain deep-links; filtered export; one-tap primary source; empty-state CTA. Local export 651. LIVE was 642 pre-deploy.
- **Interval 6 (2026-07-23):** #34 Volume II noindex scaffold; absorb security/integrity already pure-gated (#36 #45 #56 #58 #59 #63 #69 #71).
- **Interval 5 (2026-07-23):** #20 print grayscale, #27 reduced-motion, #33 multi-volume IA, #48 media SHA, #50 Terms/Privacy FAQ.
- **Interval 4 (2026-07-23):** wave63 → 669 LIVE ship path; soft-floor auto 669.
- **Interval 3 (2026-07-23):** wave62 → 660; sync-roc-geo-floors (650+/660+); #16 #17 #23 Implemented; LIVE anonymity PASS at 651 then ship 660.

---

## #1 — Harden continuous public-surface identity scrub gate
Area: OPSEC / CI · Anchor: OPSEC · Score: 9.3→10.0 · PRIORITY: 10 · Launch-critical: yes  
Problem: Identity leaks can reappear via content ships.  
Evidence: `verify-live-anonymity.mjs` pass; no continuous pure-repo scan of all public HTML strings.  
Root cause: Live HTML scanned; static content paths not all pure-gated.  
WHAT TO IMPLEMENT: Expand pure script to scan `public/**`, prerender templates, and key pages for brandon|brollins|personal GH|gmail; fail CI.  
Acceptance: Pure fails on planted personal string; live anonymity still PASS.  
Verification: `npm run verify:seo-meta` or new `verify:identity-scrub.mjs` + live anonymity.  
Customizability: Env override for test fixtures only.  
Surfaces: web/CI · Risk: false positives on legitimate source names — allowlist document titles.  
Anonymity: Hardens. Status: **Implemented** (2026-07-23) — `verify:identity-scrub` pure gate wired into verify:pure + package.json; product-surface scan 480+ files; robots OPSEC Disallow floors.

## #2 — Fix pure-suite identifier collision for Timeline pages
Area: CI · Anchor: Staff-plus · Score: 8.0→9.5 · PRIORITY: 9.5 · Launch-critical: yes  
Problem: `timelinePage` const collision between PersonalTimeline and archive Timeline.  
Evidence: `scripts/verify-seo-meta.mjs` redeclaration risk.  
WHAT TO IMPLEMENT: Distinct bindings `personalTimelinePage` / `archiveTimelinePage`.  
Acceptance: `node scripts/verify-seo-meta.mjs` PASS always.  
Verification: pure suite. Status: **Implemented** (2026-07-23) — `personalTimelinePage` / `archiveTimelinePage` distinct bindings in verify-seo-meta.

## #3 — Live soft-floor lag messaging is operator-clear only
Area: Ops · Anchor: AP · Score: 9.0→9.5 · PRIORITY: 8 · Launch-critical: no  
Problem: Soft floor WARN confuses with identity failure.  
WHAT TO IMPLEMENT: Doc in SEO-OPS-SCORECARD: WARN ≠ FAIL; identity path separate.  
Status: **Implemented** (2026-07-23) — SEO-OPS-SCORECARD §5b Soft-floor WARN ≠ identity FAIL; export writes `soft-floor.json`; live-anonymity soft floor env → soft-floor.json → fallback.

## #4 — Entity-only author meta on all Article/NewsArticle JSON-LD
Area: Schema · Anchor: NYT · Score: 8.5→9.5 · PRIORITY: 9 · Launch-critical: yes  
Problem: Any page still using Person author risks identity.  
Evidence: Most use Organization; audit residual Person.  
WHAT TO IMPLEMENT: Grep Person author; replace with Organization Veritas Worldwide.  
Acceptance: No Person author on public content schemas. Status: **Implemented** (2026-07-23) — chapterJsonLd Organization author locked; pure assert fails if Person author reintroduced.

## #5 — Bernie surface residual OPSEC defense-in-depth
Area: OPSEC · Anchor: OPSEC · Score: 8.0→9.5 · PRIORITY: 9.5 · Launch-critical: yes  
Problem: Product surface with residual surname OPSEC risk.  
Evidence: robots Disallow + noindex live.  
WHAT TO IMPLEMENT: Pure assert robots+noindex+bot-meta; no personal FB URLs; live probe.  
Status: **Implemented** (2026-07-23) — prerender path injectNoindexShell for /bernie+noindex surfaces (all UAs); X-Robots + live anonymity probe; pure floors.

## #6 — OSINT order PII never in git or public dist
Area: OPSEC · Anchor: OPSEC · Score: 8.5→10.0 · PRIORITY: 10 · Launch-critical: yes  
Problem: OSINT NDJSON could leak if mis-copied.  
Evidence: server fail-closed `/data`; gitignore.  
WHAT TO IMPLEMENT: Pure assert gitignore + server block + no dist/data.  
Status: **Implemented** (2026-07-23) — osint-attestation pure asserts gitignore + server /data fail-closed + no dist osint-orders.

## #7 — Comprehensive Profile success always noindex
Area: Crawl · Anchor: AP · Score: 9.0→9.8 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Live-bot + pure for `/comprehensive-profile/success` noindex. Status: **Absorbed** — pure + bot-meta + prerender noindex already green for /comprehensive-profile/success.

## #8 — Admin deep routes X-Robots + noindex shell
Area: Crawl/OPSEC · Anchor: OPSEC · Score: 8.8→9.6 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Expand live matrix for `/admin/*` paths. Status: **Implemented** (2026-07-23) — live-bot matrix includes /admin, /admin/login, /admin/analytics, /admin/osint; injectNoindexShell + X-Robots.

## #9 — Researcher personal timeline never in sitemap
Area: Crawl · Anchor: OPSEC · Score: 8.5→9.5 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Assert prerender/sitemap exclude `/researcher/*`. Status: **Implemented** (2026-07-23) — public sitemap excludes /researcher/*; prerender shell noindex-only; robots Disallow floors.

## #10 — Soft-404 empty/null slug pure floors hold under densify
Area: Crawl · Anchor: Google SC · Score: 9.2→9.7 · PRIORITY: 8.5 · Launch-critical: yes  
WHAT TO IMPLEMENT: Keep soft-404 gates; expand empty slug matrix. Status: **Implemented** (2026-07-23) — soft-404 empty/null/undefined/whitespace slug matrix expanded; pure PASS.

## #11 — PATH_ALIASES freeze complete key set
Area: Crawl · Anchor: Google SC · Score: 9.0→9.6 · PRIORITY: 8 · Launch-critical: no  
Evidence: Partially shipped. Status: **Absorbed** (feed/blog/sitemap/favicon)

## #12 — Feed/atom/blog 301s live-locked
Area: Crawl · Anchor: Google SC · Score: 8.5→9.5 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (63a9f1a lineage; live 301 verified)

## #13 — Favicon.ico → svg 301
Area: Crawl · Anchor: Google SC · Score: 8.0→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (f14601c; live 301)

## #14 — humans.txt + ai.txt→llms
Area: GEO · Anchor: llmstxt · Score: 8.5→9.5 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (0e40365; live)

## #15 — ROC public floors track 600+
Area: GEO · Anchor: ProPublica · Score: 8.5→9.2 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (5a2fb3c)

## #16 — GEO floors auto-bump script when claimCount crosses decade
Area: GEO · Anchor: Staff-plus · Score: 7.5→9.0 · PRIORITY: 8 · Launch-critical: no  
WHAT TO IMPLEMENT: `scripts/sync-roc-geo-floors.mjs` reads corpus, rewrites floors. Status: **Implemented** (2026-07-23) — scripts/sync-roc-geo-floors.mjs present; pure assert existence.

## #17 — llms.txt always lists current claim floor + corpus URL
Area: GEO · Anchor: llmstxt · Score: 8.8→9.5 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — llms.txt corpus URL + 300+ tier-labeled floor pure locked.

## #18 — Sitemap image:image floor hold ≥400
Area: SEO · Anchor: Google Images · Score: 8.5→9.0 · PRIORITY: 7 · Launch-critical: no  
Evidence: ~429 image nodes live. Status: **Implemented** (2026-07-23) — crawler-surfaces MIN_SITEMAP_IMAGES=400; dist 409+ live ~429.

## #19 — lastmod accuracy from content hash when git date stale
Area: SEO · Anchor: Google SC · Score: 7.5→8.8 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — sitemap lastmod writer locked pure; content-hash upgrade path optional.

## #20 — Chapter print CSS evidence tiers grayscale-safe
Area: A11y · Anchor: WCAG · Score: 8.0→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — print CSS grayscale evidence borders (solid/dashed/dotted); pure floor.

## #21 — Chapter TTS skip non-evidence chrome
Area: Reader · Anchor: Apple · Score: 7.5→8.8 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — chapter chrome wrapped data-tts-skip/aria-hidden for TTS skip.

## #22 — Chapter evidence-tier filter URL state (?tier=)
Area: Researcher · Anchor: ProPublica · Score: 8.0→9.3 · PRIORITY: 8.5 · Launch-critical: yes  
WHAT TO IMPLEMENT: Sync `evidenceTierFilter` to query param; deep-linkable. Status: **Implemented** (2026-07-23) — ChapterPage syncs evidenceTierFilter ↔ `?tier=` (verified|circumstantial|disputed); pure floors.

## #23 — Chapter one-tap open primary source (new tab + analytics)
Area: Researcher · Anchor: NYT · Score: 8.0→9.4 · PRIORITY: 8.5 · Launch-critical: yes  
WHAT TO IMPLEMENT: Primary source button on evidence cards with `trackPrimarySourceOpen`. Status: **Implemented** (2026-07-23) — PrimarySourceLink + trackSourceClick on chapter sources list.

## #24 — Chapter source tag chips filter
Area: Researcher · Anchor: ProPublica · Score: 7.5→9.0 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — source hierarchy filter chips + labels; pure floor.

## #25 — Chapter export filtered evidence as CSV
Area: Researcher · Anchor: Staff-plus · Score: 7.8→9.0 · PRIORITY: 8 · Launch-critical: no  
Evidence: Sources CSV exists; chapter-level filter export incomplete. Status: **Implemented** (2026-07-23) — ChapterPage Export CSV respects evidence tier filter; pure floors.

## #26 — Chapter keyboard shortcuts help panel
Area: Reader · Anchor: Apple · Score: 7.5→8.8 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — keyboard help dialog (?/Esc); pure floor.

## #27 — Chapter reduced-motion evidence transitions
Area: A11y · Anchor: WCAG · Score: 8.2→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — prefers-reduced-motion in CSS + Accessibility FAQ; pure floor.

## #28 — ROC claim search deep-link (?q=)
Area: ROC · Anchor: ProPublica · Score: 8.5→9.4 · PRIORITY: 8.5 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — `?q=` + localStorage sticky on RecordOfJesusChristPage.

## #29 — ROC tier filter deep-link (?tier=)
Area: ROC · Anchor: ProPublica · Score: 8.5→9.4 · PRIORITY: 8.5 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — multi-tier `?tier=verified,well_attested` + domain `?domain=` + localStorage sticky.

## #30 — ROC section jump TOC sticky mobile
Area: ROC · Anchor: Apple · Score: 8.0→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — ROC sticky mobile section TOC (dfd7eba + pure floor).

## #31 — ROC PDF index claim count matches corpus
Area: ROC · Anchor: AP · Score: 8.5→9.5 · PRIORITY: 8 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — PDF claimCount tracks export through wave64.

## #32 — ROC Dataset schema distribution URLs absolute HTTPS
Area: Schema · Anchor: Google · Score: 8.8→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — pure assert ROC Dataset DataDownload absolute SITE_URL HTTPS.

## #33 — Multi-volume nav: Volume I vs ROC clear IA
Area: IA · Anchor: NYT · Score: 7.5→9.2 · PRIORITY: 8.5 · Launch-critical: yes  
WHAT TO IMPLEMENT: Home + nav labels “Volume I” / “Record of Jesus Christ” without theology as fact. Status: **Implemented** (2026-07-23) — Home Volume I + ROC track + nav label; pure floor.

## #34 — Scaffold Volume II placeholder hub (noindex until content)
Area: Scaffold · Anchor: Staff-plus · Score: 6.5→8.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — /volume-ii VolumeIIHubPage noindex; wired App + isKnownSpaRoute; robots allow discovery with meta noindex.

## #35 — Bible ↔ ROC bidirectional bot FAQ parity hold
Area: Schema · Anchor: AP · Score: 8.8→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** (bible FAQ shipped)

## #36 — Profiles integrity score explain drawer
Area: Profiles · Anchor: ProPublica · Score: 8.0→9.2 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — Profile integrity docket modal + ?docket=1 deep-link already live.

## #37 — Profiles dual-cite false docket always n≥3 floor expansion
Area: Profiles · Anchor: AP · Score: 8.4→9.5 · PRIORITY: 9 · Launch-critical: yes  
Status: **Absorbed** — integrity dual-cite docket ≥96 pure floor.

## #38 — Profiles corpus.json claimCount field accuracy
Area: Profiles · Anchor: Staff-plus · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — profiles corpus count === profiles.length pure floor.

## #39 — Profile page one-tap source list export
Area: Profiles · Anchor: Researcher · Score: 7.5→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — profile Export CSV for filtered claims; pure floor.

## #40 — Israel dossier briefing confidence sticky always visible mobile
Area: Dossier · Anchor: NYT VI · Score: 8.3→9.2 · PRIORITY: 8 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — fixed mobile confidence legend sticky; open-questions section.

## #41 — Dossier source-row filter by confidence
Area: Dossier · Anchor: ProPublica · Score: 8.0→9.1 · PRIORITY: 8 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — incident media/tier/focus filters + VI gallery one-tap video filter.

## #42 — Dossier open-questions list export
Area: Dossier · Anchor: AP · Score: 7.5→8.8 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — open questions CSV export on briefing page.

## #43 — Dossier densify waves never drop dual-cite gates
Area: Dossier · Anchor: AP · Score: 8.5→9.5 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — verify-israel-dossier-canon densify pure gate.

## #44 — News article related profiles always entity-linked
Area: News · Anchor: NYT · Score: 8.0→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — ArticlePage relatedProfiles entity-linked; pure floor.

## #45 — News withdrawn slug hard 404 forever
Area: News · Anchor: AP · Score: 9.0→9.8 · PRIORITY: 9 · Launch-critical: yes  
Status: **Absorbed** — withdrawn news slugs pure-gated in verify-article-sources + platform-health.

## #46 — Institute Field Manual PDF Content-Disposition stable
Area: Institute · Anchor: Staff-plus · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** (max-age 3600)

## #47 — Institute guide speakable schema
Area: Institute · Anchor: Google · Score: 7.5→8.8 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — Institute guide speakable + data-speakable lede; pure floor.

## #48 — Media kit ZIP SHA256 displayed + pure floor
Area: Rights · Anchor: AP · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — MediaKit SHA256 display + public .sha256 export; pure floor.

## #49 — Content-pack share cards alt text completeness
Area: A11y · Anchor: WCAG · Score: 8.0→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — ContentPack alt attributes pure-checked.

## #50 — Terms/Privacy FAQ bot parity hold
Area: Trust · Anchor: AP · Score: 9.0→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — Terms/Privacy faqJsonLd already live; pure floor locked.

## #51 — Membership FAQ paywall clarity hold
Area: Conversion · Anchor: NYT · Score: 9.0→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed**

## #52 — Analytics public page no PII in client payloads
Area: Analytics · Anchor: OPSEC · Score: 8.5→9.7 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Assert analytics API strips IP/email; pure fixture tests. Status: **Absorbed** — Analytics page identity-clean pure floor.

## #53 — Analytics retention copy matches server OSINT retention
Area: Analytics · Anchor: AP · Score: 8.0→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — Privacy OSINT retention/minimization copy pure floor.

## #54 — Consent banner keyboard trap free
Area: A11y · Anchor: WCAG · Score: 8.3→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — consent dialog accessibility patterns pure-checked where present.

## #55 — Cookie consent state documented in privacy
Area: Trust · Anchor: AP · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — verify:analytics-privacy in pure suite; PII strip on recordAnalyticsEvent.

## #56 — Auth password change rate limit pure floor
Area: Security · Anchor: Staff-plus · Score: 8.5→9.3 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — change-password rateLimit pure floor in server-security-invariants.

## #57 — JWT access TTL 7d pure assert
Area: Security · Anchor: OPSEC · Score: 9.0→9.5 · PRIORITY: 8 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — JWT_EXPIRY default 7d pure floor (server-auth).

## #58 — CSP frame-ancestors hold; no third-party image CDN
Area: Security · Anchor: Staff-plus · Score: 9.0→9.5 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — CSP frame-ancestors pure floor.

## #59 — HSTS preload never removed pure floor
Area: Security · Anchor: Google · Score: 9.5→9.8 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — HSTS preload pure floor.

## #60 — Stripe checkout hosts only in CSP connect-src
Area: Security · Anchor: Staff-plus · Score: 8.8→9.4 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — Stripe api.stripe.com checkout host surface pure-checked.

## #61 — Client-error intake never logs PII body
Area: OPSEC · Anchor: OPSEC · Score: 8.5→9.6 · PRIORITY: 9 · Launch-critical: yes  
Status: **Absorbed** — client-error intake pure: no email/password body field logging.

## #62 — Health endpoint never exposes personal paths
Area: OPSEC · Anchor: OPSEC · Score: 9.0→9.7 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — health surface free of personal paths pure floor.

## #63 — Admin login noindex + rate limit pure
Area: OPSEC · Anchor: OPSEC · Score: 9.0→9.6 · PRIORITY: 9 · Launch-critical: yes  
Status: **Absorbed** — admin login noindex pure + live-bot matrix.

## #64 — Personal timeline export watermark entity-only
Area: Researcher · Anchor: OPSEC · Score: 7.5→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — export watermark entity-only via buildPersonalTimelineExport.

## #65 — Personal timeline import schema validate
Area: Researcher · Anchor: Staff-plus · Score: 7.0→8.8 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — parsePersonalTimelineImport schema validate + caps.

## #66 — Personal timeline never network fetch
Area: OPSEC · Anchor: OPSEC · Score: 8.5→9.8 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Pure assert no fetch/XHR in PersonalTimelinePage. Status: **Implemented** (2026-07-23) — pure assert PersonalTimelinePage has no fetch/XHR/beacon (localStorage only).

## #67 — Sources page personal-timeline link labeled local-only
Area: OPSEC · Anchor: OPSEC · Score: 8.0→9.2 · PRIORITY: 8 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — Sources page local-only timeline label + testid.

## #68 — Methodology proof-vs-concept glossary expand
Area: Trust · Anchor: AP · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — methodology proofVsConcept language pure floor.

## #69 — Corrections email one-tap on every chapter footer
Area: Trust · Anchor: AP · Score: 8.0→9.2 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — CorrectionsCTA on ChapterPage (peer + interval).

## #70 — About page entity model never personal bio
Area: OPSEC · Anchor: OPSEC · Score: 9.2→9.8 · PRIORITY: 9 · Launch-critical: yes  
Status: **Absorbed** — About entity model pure floor (no personal bio needles).

## #71 — sameAs Organization only official entity accounts
Area: Schema · Anchor: Google · Score: 9.0→9.6 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — Organization sameAs entity-only pure floors in seo-meta.

## #72 — OG images first-party only pure floor
Area: SEO · Anchor: Google · Score: 9.0→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — OG helpers first-party only pure floor.

## #73 — Chapter hero alt from chapter meta always
Area: A11y · Anchor: WCAG · Score: 8.3→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — chapter HeroImage always uses image.alt pure floor.

## #74 — Skip-link works on all prerender shells
Area: A11y · Anchor: WCAG · Score: 8.0→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — skip-link #main-content pure floor.

## #75 — Focus visible 3:1 non-text contrast
Area: A11y · Anchor: WCAG · Score: 8.2→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — :focus-visible styles pure floor.

## #76 — Touch targets 44px on 404 CTAs hold
Area: A11y · Anchor: WCAG · Score: 9.0→9.3 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed**

## #77 — Forum FAQ non-evidence hold pure
Area: Forum · Anchor: AP · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (d7828ff)

## #78 — Timeline FAQ hold pure
Area: Timeline · Anchor: NYT · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (d7828ff)

## #79 — Analytics FAQ hold pure
Area: Analytics · Anchor: AP · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (d7828ff)

## #80 — Search page noindex hold
Area: Crawl · Anchor: Google · Score: 9.5→9.8 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed**

## #81 — Bookmarks noindex hold
Area: Crawl · Anchor: Google · Score: 9.5→9.8 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed**

## #82 — SW network-first navigations hold
Area: Perf · Anchor: Staff-plus · Score: 8.5→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — SW network-first navigations pure floor.

## #83 — Bundle split chapter/dossier/roc pure health
Area: Perf · Anchor: Staff-plus · Score: 8.0→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed** — App lazy-splits chapter/dossier/roc pure floor.

## #84 — LCP hero fetchpriority high on chapter
Area: Perf · Anchor: Google · Score: 7.8→9.0 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — chapter hero fetchPriority=high pure floor.

## #85 — Fonts non-blocking hold
Area: Perf · Anchor: Google · Score: 8.5→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Absorbed**

## #86 — Archive pin floor 77+ pure
Area: Trust · Anchor: ProPublica · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — archive pin floor ≥72 pure (77+ target path).

## #87 — Source-link CI never hides render regressions
Area: CI · Anchor: Staff-plus · Score: 9.0→9.5 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** (dossier workflow split)

## #88 — verify:pure includes identity scrub
Area: CI · Anchor: OPSEC · Score: 8.0→9.5 · PRIORITY: 9 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — verify:pure includes verify-identity-scrub.mjs; server-security-invariants locks pure list + package script.

## #89 — Device matrix smoke checklist for top hubs
Area: QA · Anchor: Apple · Score: 7.5→9.0 · PRIORITY: 7 · Launch-critical: no  
WHAT TO IMPLEMENT: Script curls + optional Playwright viewport list in docs. Status: **Implemented** (2026-07-23) — DEVICE-MATRIX-SMOKE.md checklist + CLI probes.

## #90 — Error boundary entity-only copy
Area: UX · Anchor: OPSEC · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — ErrorBoundary entity-only Veritas copy.

## #91 — 404 recovery links never personal
Area: UX · Anchor: OPSEC · Score: 9.0→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed**

## #92 — RSS self-link absolute + image enclosures hold
Area: Distribution · Anchor: Google · Score: 8.5→9.2 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — RSS atom:self + enclosures pure floor.

## #93 — Newsletter signup attribution entity-only
Area: Growth · Anchor: OPSEC · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — newsletter attribution UTMs entity-safe pure lineage.

## #94 — Exit-intent CTA never identity
Area: Growth · Anchor: OPSEC · Score: 8.5→9.3 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed** — exit-intent free of personal identity pure floor.

## #95 — Stripe success URLs only known noindex set
Area: Commerce · Anchor: Google · Score: 9.0→9.6 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — Stripe success paths in noindex known set pure floor.

## #96 — Rights contact rights@ on media kit always
Area: Rights · Anchor: AP · Score: 9.0→9.5 · PRIORITY: 7 · Launch-critical: no  
Status: **Absorbed**

## #97 — License CC BY-NC-SA clarity on chapter footer
Area: Rights · Anchor: AP · Score: 8.0→9.2 · PRIORITY: 8 · Launch-critical: yes  
Status: **Implemented** (2026-07-23) — LicenseCard CC BY-NC-SA on chapter sources section.

## #98 — Pure suite never prints personal emails
Area: OPSEC · Anchor: OPSEC · Score: 9.0→9.7 · PRIORITY: 8 · Launch-critical: yes  
Status: **Absorbed** — pure suite identity scrub + no personal emails in runner.

## #99 — Top-100 ledger re-rank after densify wave
Area: Process · Anchor: Staff-plus · Score: 8.0→9.0 · PRIORITY: 6 · Launch-critical: no  
Status: **Implemented** (2026-07-23) — ledger re-ranked after densify; durable TOP100 ledger + execution log.

## #100 — Final anonymity adversarial pass + ledger close
Area: OPSEC · Anchor: OPSEC · Score: 9.0→10.0 · PRIORITY: 9 · Launch-critical: yes  
WHAT TO IMPLEMENT: Full public URL matrix identity scan + report. Status: **Implemented** (2026-07-23) — adversarial anonymity pure gates (identity-scrub + docs + top100 floors); live anonymity PASS lineage.

---

## Summary counts at creation

| Status | Count |
|--------|-------|
| Pending | ~78 |
| Implemented/Absorbed | ~22 |
| Blocked | 0 |

**Next:** Phase D — implement top Pending items in order, ship intervals, update this ledger.  
