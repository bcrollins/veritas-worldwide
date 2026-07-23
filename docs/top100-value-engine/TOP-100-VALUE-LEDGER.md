# Veritas Worldwide — Top-100 Value Ledger

**PROMPT VERSION:** v1.0 Veritas + Anonymity
**Generated:** 2026-07-23T11:26:35Z
**Local tip at generation:** b9e4f11
**Live health at generation:** 5a2fb3c (deploy lag)
**Scoring:** PRIORITY = (Expected Value × P(success)) ÷ Cost; anonymity + source-integrity auto-elevated
**Status values:** Pending | In Progress | Implemented | Absorbed | Blocked

## Summary counts (at generation)

| Status | Count |
|--------|------:|
| Pending | 100 |
| Implemented | 0 |
| Blocked | 0 |

## Ranked ledger (by PRIORITY)

### #1 — Harden live anonymity gate for Israel corpus + multi-path identity floor
- **Stable-ID:** T100-001
- **Area:** OPSEC / verify:live-anonymity
- **Anchor:** OPSEC + AP methodology
- **Score:** 7.5→10.0
- **PRIORITY:** 98
- **Launch-critical:** yes
- **Problem:** Live anonymity checks ROC corpus but not Israel dossier corpus identity/publisher; soft floors lag tip; no Israel incident identity scan.
- **Evidence:** scripts/verify-live-anonymity.mjs; live corpora 732/642
- **Root cause:** Gate grew with ROC first; Israel densify outpaced verifier coverage.
- **WHAT TO IMPLEMENT:** 1. scripts/verify-live-anonymity.mjs: fetch /israel-dossier/corpus.json; assert no FORBIDDEN patterns; assert disclaimer/publisher entity-only if present; soft floor LIVE_ISRAEL_INCIDENT_SOFT_FLOOR default 732 (WARN on lag).
2. Expand paths: /israel-dossier, /israel-dossier/briefing, /humans.txt text check via separate fetch for identity needles.
3. package.json: document env floors. 4. Run verify:live-anonymity green.
- **Acceptance criteria:** Script fails on identity needles in either corpus or listed HTML paths; soft floor WARN-only on lag; hard floor still catastrophic only.
- **Verification:** npm run verify:live-anonymity against production; device N/A; anonymity audit PASS.
- **Customizability added:** Env-tunable floors for operator deploy lag.
- **Surfaces:** web+CI
- **Risk & rollback:** False FAIL on deploy lag if hard floors too high — keep hard floors low.
- **Anonymity impact:** Hardens continuous detection of identity leak.
- **Status:** Pending

### #2 — Scrub residual personal product-link vectors from Bernie quarantine checklist
- **Stable-ID:** T100-002
- **Area:** OPSEC / Bernie surface
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 96
- **Launch-critical:** yes
- **Problem:** Bernie page intentional surname product still in body; must never reintroduce personal FB/social URLs; verify coverage partial.
- **Evidence:** docs/record-of-jesus-christ/ANONYMITY-AUDIT.md; verify-live-anonymity FORBIDDEN list
- **Root cause:** Family-brand product retained; quarantine is robots/meta only.
- **WHAT TO IMPLEMENT:** 1. Confirm BernieShowPage has zero personal facebook.com/*rollins* links. 2. Add static assert in verify-seo-meta or verify-live-anonymity for /bernie path already listed. 3. Server X-Robots-Tag regression test already in verify:live-bot-noindex — ensure pure includes it. 4. Document residual surname as intentional product + noindex in ANONYMITY-AUDIT.
- **Acceptance criteria:** No personal social profile URLs on /bernie; noindex headers present live.
- **Verification:** curl -I Googlebot /bernie; verify:live-anonymity; verify:live-bot-noindex.
- **Customizability added:** N/A (quarantine).
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Prevents social graph deanonymization.
- **Status:** Pending

### #3 — Entity-only git author enforcement in pure suite
- **Stable-ID:** T100-003
- **Area:** OPSEC / release identity
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 95
- **Launch-critical:** yes
- **Problem:** Future commits must stay entity-authored; pure suite may not assert last N commits.
- **Evidence:** git config user.name=Veritas Worldwide; ANONYMITY-AUDIT residual history
- **Root cause:** History rewrite is offline project; forward-only enforcement missing.
- **WHAT TO IMPLEMENT:** 1. scripts/verify-release-identity.mjs or new verify-git-author-forward.mjs: for last 20 commits on main, author.email must be rights@veritasworldwide.com OR warn-only if env ALLOW_LEGACY. 2. Wire into verify:pure optionally as soft. 3. Document filter-repo as Blocked external.
- **Acceptance criteria:** Forward commits fail pure if personal author used (when gate hard).
- **Verification:** git log -5 --format='%an <%ae>'; pure green.
- **Customizability added:** Env soft/hard mode.
- **Surfaces:** CI
- **Risk & rollback:** Blocks legitimate multi-agent if peer misconfigured — use soft first.
- **Anonymity impact:** Stops new identity artifacts in git metadata.
- **Status:** Pending

### #4 — Admin auth: password hash env-only fail-closed
- **Stable-ID:** T100-074
- **Area:** Admin security
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 95
- **Launch-critical:** yes
- **Problem:** Plaintext password history risk.
- **Evidence:** adminAuth; ANONYMITY-AUDIT
- **Root cause:** Past incident.
- **WHAT TO IMPLEMENT:** Prod fail-closed without VITE_ADMIN_PASSWORD_HASH; verify-auth.
- **Acceptance criteria:** Prod cannot login with default.
- **Verification:** verify:auth.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Ops must set env.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #5 — Personal timeline: evidence-tier tags + tags + import + corpus pin
- **Stable-ID:** T100-004
- **Area:** Researcher tools / PersonalTimeline
- **Anchor:** ProPublica + NYT VI + researcher customizability
- **Score:** 5.5→9.5
- **PRIORITY:** 94
- **Launch-critical:** yes
- **Problem:** Personal timeline only has date/title/notes/url; no evidence tier, free tags, import, or pin-from-corpus.
- **Evidence:** src/pages/PersonalTimelinePage.tsx
- **Root cause:** MVP shipped for soft-404; depth not built.
- **WHAT TO IMPLEMENT:** 1. Extend TimelineEvent: evidenceTier (legacy+scholarly union), tags:string[], corpusRef?:{kind:'roc'|'israel'|'chapter', id:string}. 2. UI: tier select (SCHOLARLY_TIER_ORDER + none), tag chips input, import JSON file, filter by tier/tag. 3. Export includes new fields schemaVersion. 4. Privacy copy: still local-only never uploaded. 5. Min 44px controls, keyboard operable. 6. Noindex retained.
- **Acceptance criteria:** User can tag tier+tags, import prior export, filter, export round-trip; no network write of events.
- **Verification:** Manual browser; pure if unit extractable; anonymity: no identity in UI copy.
- **Customizability added:** Full researcher controls: tier filter, tag filter, import/export.
- **Surfaces:** web
- **Risk & rollback:** localStorage size; version migration.
- **Anonymity impact:** Local-only hardens privacy; no server link to operator.
- **Status:** Pending

### #6 — About page: no founder bio personal details
- **Stable-ID:** T100-057
- **Area:** About OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 94
- **Launch-critical:** yes
- **Problem:** About must stay entity mission only.
- **Evidence:** AboutPage
- **Root cause:** Temptation to personalize.
- **WHAT TO IMPLEMENT:** Audit About for personal bio; pure forbid personal names; mission/methodology/funding model only.
- **Acceptance criteria:** Audit pass.
- **Verification:** grep+pure.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #7 — Block any sameAs expansion without entity review
- **Stable-ID:** T100-094
- **Area:** Schema OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 94
- **Launch-critical:** yes
- **Problem:** sameAs is high-risk identity surface.
- **Evidence:** seo.ts sameAs
- **Root cause:** Future dev might add GH.
- **WHAT TO IMPLEMENT:** verify-seo-meta allowlist only X+Reddit (or future entity properties); fail on github.com.
- **Acceptance criteria:** pure fail on GH sameAs.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #8 — One-tap primary-source open with archive-first preference
- **Stable-ID:** T100-005
- **Area:** Sources + chapter citations
- **Anchor:** ProPublica + NYT VI
- **Score:** 6.5→9.5
- **PRIORITY:** 93
- **Launch-critical:** yes
- **Problem:** Sources open inconsistently; archive pins not preferred when host blocks; researcher friction.
- **Evidence:** SourcesPage.tsx; israel archive manifest
- **Root cause:** Multiple link render paths; no shared PrimarySourceLink component.
- **WHAT TO IMPLEMENT:** 1. Create src/components/PrimarySourceLink.tsx: prefers archiveUrl if present, else sourceUrl; rel=noopener noreferrer; target=_blank; optional Wayback fallback badge; aria-label includes title. 2. Adopt on SourcesPage source rows and Israel incident source lists where fields exist. 3. Track click analytics only as source_open without URL PII if needed (event name only).
- **Acceptance criteria:** PrimarySourceLink used on Sources library rows; opens archive when available.
- **Verification:** Visual + pure import check; live sources page.
- **Customizability added:** User cannot customize URLs but sees archive vs live.
- **Surfaces:** web
- **Risk & rollback:** Broken archive URLs — show both links.
- **Anonymity impact:** No identity impact.
- **Status:** Pending

### #9 — OG images: no personal likeness ever
- **Stable-ID:** T100-048
- **Area:** Social meta
- **Anchor:** OPSEC
- **Score:** 8.5→10.0
- **PRIORITY:** 93
- **Launch-critical:** yes
- **Problem:** OG must stay documentary marks only.
- **Evidence:** public/og; generate-og
- **Root cause:** Policy implicit.
- **WHAT TO IMPLEMENT:** verify-public-visuals or brand-kit: forbid face photos of operator; entity marks only.
- **Acceptance criteria:** Assert no operator photos in og/.
- **Verification:** script.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical visual OPSEC.
- **Status:** Pending

### #10 — Analytics privacy: forbid PII properties in client track() calls
- **Stable-ID:** T100-009
- **Area:** Analytics privacy
- **Anchor:** OPSEC + privacy
- **Score:** 7.0→10.0
- **PRIORITY:** 92
- **Launch-critical:** yes
- **Problem:** Risk of email/name in event props if future features sloppy.
- **Evidence:** src/lib/analytics.ts; verify-analytics-privacy.mjs
- **Root cause:** Convention-based; needs static deny-list scan.
- **WHAT TO IMPLEMENT:** 1. Expand verify-analytics-privacy to scan src/** for track( patterns with email/name/userId raw. 2. analytics.ts stripKeys for email, phone, fullName, authorEmail. 3. Document allowed props list in PrivacyPage brief note if missing.
- **Acceptance criteria:** verify:analytics-privacy fails on PII keys; runtime strip present.
- **Verification:** npm run verify:analytics-privacy.
- **Customizability added:** Consent toggle already.
- **Surfaces:** web+CI
- **Risk & rollback:** Over-strip — whitelist intentional props.
- **Anonymity impact:** Directly hardens operator+reader privacy.
- **Status:** Pending

### #11 — Citation BibTeX export entity key only
- **Stable-ID:** T100-064
- **Area:** Citations OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 92
- **Launch-critical:** yes
- **Problem:** BibTeX keys must never use personal surname.
- **Evidence:** ANONYMITY-AUDIT rollins→veritas rename
- **Root cause:** Past P0.
- **WHAT TO IMPLEMENT:** verify forbids @incollection{rollins and personal keys sitewide.
- **Acceptance criteria:** pure green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #12 — Admin surface: zero personal email display regression
- **Stable-ID:** T100-027
- **Area:** Admin OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 91
- **Launch-critical:** yes
- **Problem:** Admin brand kit previously showed personal email.
- **Evidence:** ANONYMITY-AUDIT; AdminBrandKit
- **Root cause:** Past P0 scrubbed; need permanent forbid.
- **WHAT TO IMPLEMENT:** verify-docs + grep admin pages for gmail/personal; fail pure.
- **Acceptance criteria:** No personal email in admin UI source.
- **Verification:** pure grep.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical anonymity.
- **Status:** Pending

### #13 — humans.txt entity-only pure floor
- **Stable-ID:** T100-053
- **Area:** Public identity card
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 91
- **Launch-critical:** yes
- **Problem:** humans must never gain personal team names.
- **Evidence:** public/humans.txt; verify-seo-meta
- **Root cause:** Already gated; keep.
- **WHAT TO IMPLEMENT:** Maintain forbid brandon|brollins|gmail in verify-seo-meta.
- **Acceptance criteria:** pure green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #14 — Cross-corpus researcher search (Vol I + Israel + ROC) scaffold
- **Stable-ID:** T100-006
- **Area:** Search / researcher
- **Anchor:** NYT VI + knowledge bases
- **Score:** 4.5→9.0
- **PRIORITY:** 90
- **Launch-critical:** yes
- **Problem:** Search is chapter-centric; no unified claim/incident search across corpora.
- **Evidence:** SearchPage.tsx; corpora JSON
- **Root cause:** Corpora added faster than search index.
- **WHAT TO IMPLEMENT:** 1. Client-side index builder: fetch corpus.json (ROC+Israel) + chapter public index; fuse results with type badges. 2. SearchPage tab or section 'Evidence corpora'. 3. Result opens ROC claim id hash or Israel incident or chapter. 4. Debounced; min 2 chars; no server log of queries beyond existing search analytics sanitize. 5. Respect public-only data.
- **Acceptance criteria:** Query returns ROC+Israel+chapter hits with type labels.
- **Verification:** Manual search; anonymity: queries not stored with identity.
- **Customizability added:** Filter by corpus type + tier.
- **Surfaces:** web
- **Risk & rollback:** Bundle size — lazy load corpora.
- **Anonymity impact:** Keep search noindex if thin; use existing /search policy.
- **Status:** Pending

### #15 — Comprehensive profile product: methodology teaser entity-only gate
- **Stable-ID:** T100-046
- **Area:** Paid OSINT product
- **Anchor:** OPSEC
- **Score:** 7.5→9.5
- **PRIORITY:** 90
- **Launch-critical:** yes
- **Problem:** Paid product must never expose operator identity in success/report.
- **Evidence:** comprehensive-profile; ANONYMITY-AUDIT
- **Root cause:** Past scrub; continuous gate.
- **WHAT TO IMPLEMENT:** verify-comprehensive-profile + live-anonymity path already; extend pure forbid list on product markdown.
- **Acceptance criteria:** Gates green.
- **Verification:** pure+live.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical.
- **Status:** Pending

### #16 — robots.txt: keep /admin and success and bernie Disallow forever
- **Stable-ID:** T100-052
- **Area:** Crawler OPSEC
- **Anchor:** OPSEC
- **Score:** 8.5→10.0
- **PRIORITY:** 90
- **Launch-critical:** yes
- **Problem:** Must not regress Disallow list.
- **Evidence:** public/robots.txt
- **Root cause:** Manual edits risk.
- **WHAT TO IMPLEMENT:** verify-crawler-surfaces asserts Disallow set.
- **Acceptance criteria:** Assert green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #17 — Railway/env example files: no personal tokens
- **Stable-ID:** T100-097
- **Area:** Secrets OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 90
- **Launch-critical:** yes
- **Problem:** .env.example must be placeholders only.
- **Evidence:** .env.example if any
- **Root cause:** Copy-paste risk.
- **WHAT TO IMPLEMENT:** Scan for sk_live, personal emails; pure.
- **Acceptance criteria:** Clean examples.
- **Verification:** grep.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical secrets.
- **Status:** Pending

### #18 — Volume I chapter UI: scholarly tier legend + legacy map always visible
- **Stable-ID:** T100-007
- **Area:** Chapter reading UX / evidence integrity
- **Anchor:** AP + methodology
- **Score:** 6.0→9.5
- **PRIORITY:** 89
- **Launch-critical:** yes
- **Problem:** Readers see Verified/Circumstantial/Disputed without always seeing map to 7-tier scholarly scale.
- **Evidence:** evidenceTiers.ts; MethodologyPage; ChapterPage
- **Root cause:** Dual taxonomy shipped; chapter chrome incomplete.
- **WHAT TO IMPLEMENT:** 1. Compact EvidenceTierLegend component: 3 legacy badges + link 'Scholarly scale (7)' → methodology#seven or ROC. 2. Mount on ChapterPage near first citation block and Sources. 3. Prefer SCHOLARLY_TIERS labels in tooltips for disputed→contested note.
- **Acceptance criteria:** Legend visible on chapter without leaving page for basic education.
- **Verification:** Chapter page screenshot matrix mobile/desktop.
- **Customizability added:** Font size toggle already exists.
- **Surfaces:** web
- **Risk & rollback:** Clutter — keep compact.
- **Anonymity impact:** Entity-only copy.
- **Status:** Pending

### #19 — Health endpoint: no internal usernames/emails
- **Stable-ID:** T100-050
- **Area:** API OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 89
- **Launch-critical:** yes
- **Problem:** Health JSON must stay infra-only.
- **Evidence:** live /api/health
- **Root cause:** Currently clean; lock it.
- **WHAT TO IMPLEMENT:** verify-platform-health assert keys allowlist; forbid email patterns in JSON.
- **Acceptance criteria:** Allowlist pass.
- **Verification:** verify:platform/live.
- **Customizability added:** N/A.
- **Surfaces:** API
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #20 — Source-link health report for Vol I + dossiers (offline CI)
- **Stable-ID:** T100-008
- **Area:** Source integrity
- **Anchor:** AP + ProPublica
- **Score:** 5.5→9.0
- **PRIORITY:** 88
- **Launch-critical:** yes
- **Problem:** Broken links erode trust; verify-source-links may be partial.
- **Evidence:** scripts/verify-source-links.mjs; verify-roc-source-urls.mjs
- **Root cause:** External hosts 403/timeout; archive pins mitigate but not all linked.
- **WHAT TO IMPLEMENT:** 1. Extend verify-source-links to sample Israel incident sources + ROC sources with concurrency limit. 2. Soft-fail external 403 with WARN; hard-fail malformed URLs. 3. Emit docs/top100-value-engine/SOURCE-LINK-REPORT.md optional. 4. Prefer archive URL presence % metric.
- **Acceptance criteria:** CI reports link health; malformed fail pure.
- **Verification:** npm run verify:source-links (or pure).
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Flaky network — soft WARN.
- **Anonymity impact:** No identity.
- **Status:** Pending

### #21 — Prerender soft-404 gate regression pack for researcher routes
- **Stable-ID:** T100-020
- **Area:** SEO integrity
- **Anchor:** SEO + soft-404
- **Score:** 7.0→9.5
- **PRIORITY:** 88
- **Launch-critical:** yes
- **Problem:** Soft-404 on thin routes damaged trust/SEO; /researcher/timeline fixed — need pack.
- **Evidence:** verify-soft-404-gates; tip b9e4f11
- **Root cause:** Routes added faster than gates.
- **WHAT TO IMPLEMENT:** Extend verify-soft-404-gates for /researcher, /researcher/timeline, success pages noindex. Fail if soft-404 pattern returns.
- **Acceptance criteria:** verify:soft-404-gates green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #22 — Strip EXIF on all public images continuous
- **Stable-ID:** T100-049
- **Area:** OPSEC media
- **Anchor:** OPSEC
- **Score:** 7.5→9.5
- **PRIORITY:** 88
- **Launch-critical:** yes
- **Problem:** EXIF GPS can leak.
- **Evidence:** strip-public-exif.mjs
- **Root cause:** Must run on pipeline.
- **WHAT TO IMPLEMENT:** Ensure build/export runs strip; verify no GPS EXIF sample.
- **Acceptance criteria:** Script green on public/**.
- **Verification:** npm script.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens geo OPSEC.
- **Status:** Pending

### #23 — Auth: no third-party login that links personal GH
- **Stable-ID:** T100-072
- **Area:** Auth OPSEC
- **Anchor:** OPSEC
- **Score:** 8.0→10.0
- **PRIORITY:** 88
- **Launch-critical:** yes
- **Problem:** OAuth via personal GH would link identity.
- **Evidence:** auth flows
- **Root cause:** Email/password or magic likely.
- **WHAT TO IMPLEMENT:** Forbid GitHub OAuth provider; document entity-only auth.
- **Acceptance criteria:** No GH OAuth in code.
- **Verification:** grep.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Critical path block.
- **Status:** Pending

### #24 — Israel incident: multi-source badge when ≥2 independent sources
- **Stable-ID:** T100-015
- **Area:** Israel integrity
- **Anchor:** ProPublica
- **Score:** 6.5→9.5
- **PRIORITY:** 87
- **Launch-critical:** yes
- **Problem:** Multi-source not always badge-visible.
- **Evidence:** incident.sources[]
- **Root cause:** Data present; UI badge incomplete.
- **WHAT TO IMPLEMENT:** Badge 'n sources' when sources.length≥2; tooltip lists outlets; tier still primary.
- **Acceptance criteria:** Badge on list+detail.
- **Verification:** UI check.
- **Customizability added:** Filter multi-source only.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #25 — ROC: every claim has ≥1 source or explicit note
- **Stable-ID:** T100-086
- **Area:** ROC integrity
- **Anchor:** AP
- **Score:** 7.5→9.5
- **PRIORITY:** 87
- **Launch-critical:** yes
- **Problem:** Claims without sources fail methodology.
- **Evidence:** ROC claims waves
- **Root cause:** Wave velocity vs source discipline.
- **WHAT TO IMPLEMENT:** verify-record-of-jesus-christ asserts sources length or sourcesNote; floor.
- **Acceptance criteria:** verify green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** May need data fill.
- **Anonymity impact:** None.
- **Status:** Pending

### #26 — Israel dual-sided balance scorecard public widget
- **Stable-ID:** T100-014
- **Area:** Israel evidence integrity
- **Anchor:** AP dual-source
- **Score:** 7.0→9.5
- **PRIORITY:** 86
- **Launch-critical:** yes
- **Problem:** Readers may not see multi-party pattern balance at a glance.
- **Evidence:** IsraelDossierPage filters; densify dual-sided
- **Root cause:** Filters exist; summary scorecard weak.
- **WHAT TO IMPLEMENT:** Add read-only balance strip: counts for Gaza civilian patterns vs Oct7/hostage/Hezbollah/Iran/West Bank pattern families from tags/ids — methodology note 'counts≠moral weight'.
- **Acceptance criteria:** Strip visible + disclaimer.
- **Verification:** Visual + pure count asserts if stable.
- **Customizability added:** Filter still customizable.
- **Surfaces:** web
- **Risk & rollback:** Political sensitivity — copy carefully.
- **Anonymity impact:** Entity-only.
- **Status:** Pending

### #27 — Client error intake: scrub stack paths with home directories
- **Stable-ID:** T100-051
- **Area:** Error reporting
- **Anchor:** OPSEC
- **Score:** 6.5→9.5
- **PRIORITY:** 86
- **Launch-critical:** yes
- **Problem:** Stack traces may include /Users/personal paths if ever client-bundled wrong.
- **Evidence:** clientErrorReporting; data/client-errors
- **Root cause:** Path leakage risk.
- **WHAT TO IMPLEMENT:** Server scrub /Users/ and personal path segments before store; never log operator email.
- **Acceptance criteria:** Scrub unit test.
- **Verification:** verify if exists.
- **Customizability added:** N/A.
- **Surfaces:** server
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #28 — Public packages: no package.json author personal field
- **Stable-ID:** T100-095
- **Area:** Repo OPSEC
- **Anchor:** OPSEC
- **Score:** 7.5→10.0
- **PRIORITY:** 86
- **Launch-critical:** yes
- **Problem:** package.json author field risk.
- **Evidence:** package.json
- **Root cause:** npm metadata leak.
- **WHAT TO IMPLEMENT:** author must be Veritas Worldwide or absent; verify script.
- **Acceptance criteria:** Assert.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens npm surface.
- **Status:** Pending

### #29 — Deploy lag detector: health commit vs origin/main tip
- **Stable-ID:** T100-010
- **Area:** Ops / publication readiness
- **Anchor:** Staff+ publisher
- **Score:** 5.0→9.0
- **PRIORITY:** 85
- **Launch-critical:** yes
- **Problem:** Live health commit trails tip; researchers see stale floors intermittently.
- **Evidence:** Live health 5a2fb3c vs tip b9e4f11
- **Root cause:** Railway deploy queue; no public lag badge.
- **WHAT TO IMPLEMENT:** 1. scripts/verify-deploy-lag.mjs: compare /api/health commitShort to git rev-parse origin/main (local) or GITHUB_SHA. 2. WARN if >N commits behind. 3. Optional admin-only status; never expose personal. 4. Document in SEO-OPS-SCORECARD style under top100 execution log.
- **Acceptance criteria:** Script prints lag commits; exit 0 with WARN or configurable fail.
- **Verification:** Run script.
- **Customizability added:** N/A.
- **Surfaces:** ops
- **Risk & rollback:** False alarm during deploy.
- **Anonymity impact:** Uses entity health only.
- **Status:** Pending

### #30 — Wayback pin coverage % for Israel briefing sources
- **Stable-ID:** T100-036
- **Area:** Archive durability
- **Anchor:** ProPublica
- **Score:** 7.0→9.5
- **PRIORITY:** 85
- **Launch-critical:** yes
- **Problem:** 77+ pins exist; coverage % not shown to researchers.
- **Evidence:** briefing-source-archive-manifest
- **Root cause:** Pins without public coverage metric.
- **WHAT TO IMPLEMENT:** Show 'archive pin coverage' on briefing page; CI floor on pin count.
- **Acceptance criteria:** UI metric + floor.
- **Verification:** verify-archive-manifest.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #31 — HubSpot forms: no hidden operator identity fields
- **Stable-ID:** T100-067
- **Area:** Marketing OPSEC
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 85
- **Launch-critical:** yes
- **Problem:** Forms must not include operator personal metadata.
- **Evidence:** hubspot.ts; Newsletter
- **Root cause:** CRM field risk.
- **WHAT TO IMPLEMENT:** Audit form fields; only reader email/consent; entity portal.
- **Acceptance criteria:** Field allowlist.
- **Verification:** code audit.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #32 — Researcher hub page at /researcher
- **Stable-ID:** T100-011
- **Area:** Researcher UX
- **Anchor:** NYT VI
- **Score:** 4.0→9.0
- **PRIORITY:** 84
- **Launch-critical:** yes
- **Problem:** Tools scattered (timeline, sources, ROC export); no hub.
- **Evidence:** PersonalTimeline route; Sources; ROC
- **Root cause:** Discovery not productized.
- **WHAT TO IMPLEMENT:** Add ResearcherHubPage: cards for Timeline, Sources, ROC corpus, Israel corpus, Methodology, personal bookmarks. Route /researcher, noindex optional or index with thin-content care. Link from Sources + Methodology.
- **Acceptance criteria:** Hub lists tools with one-sentence privacy notes.
- **Verification:** Live /researcher 200; pure route.
- **Customizability added:** Central nav of custom tools.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity-only.
- **Status:** Pending

### #33 — Sitemap: ensure researcher noindex routes excluded
- **Stable-ID:** T100-035
- **Area:** SEO
- **Anchor:** SEO
- **Score:** 8.0→9.5
- **PRIORITY:** 84
- **Launch-critical:** yes
- **Problem:** noindex routes must not appear in sitemap.
- **Evidence:** sitemap.xml; robots
- **Root cause:** Risk of accidental include.
- **WHAT TO IMPLEMENT:** verify-crawler-surfaces or sitemap assert excludes /admin /bernie /researcher/timeline /bookmarks /success.
- **Acceptance criteria:** Assert green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Reduces surface.
- **Status:** Pending

### #34 — llms.txt: researcher tools + taxonomy + corpus counts live
- **Stable-ID:** T100-019
- **Area:** GEO / distribution
- **Anchor:** LLM optimizer
- **Score:** 7.5→9.5
- **PRIORITY:** 83
- **Launch-critical:** yes
- **Problem:** llms strong but may lag live counts and researcher hub.
- **Evidence:** public/llms.txt
- **Root cause:** Manual update lag.
- **WHAT TO IMPLEMENT:** Generate or hand-update sections: corpus claimCount/incidentCount, /researcher tools, evidence-taxonomy.json, privacy summary. Entity-only.
- **Acceptance criteria:** llms lists ROC 600+ and Israel 700+ and researcher tools.
- **Verification:** curl llms.txt.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** No personal.
- **Status:** Pending

### #35 — Content security: no inline operator notes in HTML comments
- **Stable-ID:** T100-075
- **Area:** OPSEC hygiene
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 83
- **Launch-critical:** yes
- **Problem:** HTML comments can leak.
- **Evidence:** index.html; prerender
- **Root cause:** Dev comments risk.
- **WHAT TO IMPLEMENT:** pure scan dist HTML for TODO personal or emails.
- **Acceptance criteria:** No matches.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #36 — ROC claim deep-link share cards (entity OG)
- **Stable-ID:** T100-013
- **Area:** ROC distribution
- **Anchor:** NYT VI + SEO
- **Score:** 6.5→9.0
- **PRIORITY:** 82
- **Launch-critical:** yes
- **Problem:** Claim-level share may lack server meta.
- **Evidence:** server-social-meta.js; ROC page
- **Root cause:** Page-level OG only.
- **WHAT TO IMPLEMENT:** If hash/query claim id supported, server meta fallback to page OG entity-only; never personal author.
- **Acceptance criteria:** Share preview entity-only.
- **Verification:** curl social bot meta.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Medium meta complexity.
- **Anonymity impact:** Must stay entity-only.
- **Status:** Pending

### #37 — Dataset schema floor sync with live claimCount
- **Stable-ID:** T100-033
- **Area:** SEO structured data
- **Anchor:** SEO
- **Score:** 7.5→9.5
- **PRIORITY:** 82
- **Launch-critical:** yes
- **Problem:** Dataset description 600+ may lag actual 642+.
- **Evidence:** ROC JSON-LD Dataset
- **Root cause:** Hardcoded floors in copy.
- **WHAT TO IMPLEMENT:** Generate Dataset number from export corpus claimCount at build; pure asserts ≥ floor.
- **Acceptance criteria:** Live JSON-LD matches order of magnitude.
- **Verification:** prerender check.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity creator only.
- **Status:** Pending

### #38 — Anonymity audit re-run template after each ship interval
- **Stable-ID:** T100-093
- **Area:** OPSEC process
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 82
- **Launch-critical:** yes
- **Problem:** Audits ad hoc.
- **Evidence:** ANONYMITY-AUDIT.md
- **Root cause:** Process gap.
- **WHAT TO IMPLEMENT:** EXECUTION-LOG template: binary anonymity audit checklist per ship.
- **Acceptance criteria:** Log used each interval.
- **Verification:** process.
- **Customizability added:** N/A.
- **Surfaces:** docs
- **Risk & rollback:** Low.
- **Anonymity impact:** Process harden.
- **Status:** Pending

### #39 — Methodology: machine-readable evidence taxonomy JSON
- **Stable-ID:** T100-018
- **Area:** Methodology / API
- **Anchor:** AP + knowledge bases
- **Score:** 5.0→9.0
- **PRIORITY:** 81
- **Launch-critical:** yes
- **Problem:** Tiers only in TS; external researchers need JSON.
- **Evidence:** evidenceTiers.ts
- **Root cause:** No public export of taxonomy.
- **WHAT TO IMPLEMENT:** Build script export public/evidence-taxonomy.json from SCHOLARLY_TIERS + legacy map; link from methodology + llms.txt.
- **Acceptance criteria:** JSON 200 live after deploy.
- **Verification:** curl + pure schema.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity publisher field.
- **Status:** Pending

### #40 — ROC: proofVsConcept filter chips
- **Stable-ID:** T100-042
- **Area:** ROC researcher
- **Anchor:** AP + customizability
- **Score:** 6.0→9.0
- **PRIORITY:** 81
- **Launch-critical:** yes
- **Problem:** proofVsConcept in data; filter may be incomplete.
- **Evidence:** ROC claims; RecordOfJesusChristPage
- **Root cause:** Tier filters first-class; proof filter secondary.
- **WHAT TO IMPLEMENT:** Add proofVsConcept multi-select chips; persist in URL query for shareable researcher views (no PII).
- **Acceptance criteria:** Filter works; URL shareable.
- **Verification:** Manual.
- **Customizability added:** Filter chips.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #41 — Bookmark evidence-tier filter on BookmarksPage
- **Stable-ID:** T100-012
- **Area:** Reader state
- **Anchor:** ProPublica
- **Score:** 5.0→8.5
- **PRIORITY:** 80
- **Launch-critical:** no
- **Problem:** Bookmarks lack tier filter.
- **Evidence:** BookmarksPage; readerState
- **Root cause:** MVP bookmarks.
- **WHAT TO IMPLEMENT:** If bookmarks store chapter+source refs, add tier filter using chapter data; local-only.
- **Acceptance criteria:** Filter works offline.
- **Verification:** Manual.
- **Customizability added:** Tier filter.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Local-only.
- **Status:** Pending

### #42 — CSP + security headers continuous pure assert
- **Stable-ID:** T100-026
- **Area:** Security
- **Anchor:** OPSEC
- **Score:** 7.5→9.5
- **PRIORITY:** 80
- **Launch-critical:** yes
- **Problem:** Headers verified but must not regress with feature adds.
- **Evidence:** verify-security-headers; verify-csp-meta
- **Root cause:** Feature scripts expand CSP needs.
- **WHAT TO IMPLEMENT:** Keep verify in pure; document allowed third parties list entity-owned analytics only.
- **Acceptance criteria:** pure security green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens platform.
- **Status:** Pending

### #43 — Personal timeline: add-from-Israel-incident button
- **Stable-ID:** T100-037
- **Area:** Researcher
- **Anchor:** Customizability
- **Score:** 5.0→9.0
- **PRIORITY:** 80
- **Launch-critical:** yes
- **Problem:** Cannot pin incident to personal timeline from dossier.
- **Evidence:** IsraelDossierPage; PersonalTimeline storage key
- **Root cause:** Surfaces disconnected.
- **WHAT TO IMPLEMENT:** On incident detail: 'Add to my timeline' writes localStorage event with corpusRef israel+id; no server.
- **Acceptance criteria:** Event appears on /researcher/timeline.
- **Verification:** Manual.
- **Customizability added:** One-tap pin.
- **Surfaces:** web
- **Risk & rollback:** Storage coupling.
- **Anonymity impact:** Local-only.
- **Status:** Pending

### #44 — Personal timeline: add-from-ROC-claim button
- **Stable-ID:** T100-038
- **Area:** Researcher
- **Anchor:** Customizability
- **Score:** 5.0→9.0
- **PRIORITY:** 80
- **Launch-critical:** yes
- **Problem:** Same for ROC claims.
- **Evidence:** RecordOfJesusChristPage
- **Root cause:** Surfaces disconnected.
- **WHAT TO IMPLEMENT:** Add to my timeline with corpusRef roc+id.
- **Acceptance criteria:** Round-trip local.
- **Verification:** Manual.
- **Customizability added:** One-tap.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Local-only.
- **Status:** Pending

### #45 — Israel: era + tier + children multi-filter URL state
- **Stable-ID:** T100-043
- **Area:** Israel researcher
- **Anchor:** Customizability
- **Score:** 6.5→9.0
- **PRIORITY:** 80
- **Launch-critical:** yes
- **Problem:** Filters may not all persist in URL.
- **Evidence:** IsraelDossierPage
- **Root cause:** State local only partially.
- **WHAT TO IMPLEMENT:** Sync key filters to query string; restore on load; shareable views.
- **Acceptance criteria:** URL round-trip.
- **Verification:** Manual.
- **Customizability added:** Full filter share.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #46 — README and CONTRIBUTING entity-only
- **Stable-ID:** T100-096
- **Area:** Docs OPSEC
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 80
- **Launch-critical:** yes
- **Problem:** README may accumulate personal contact.
- **Evidence:** README*
- **Root cause:** Drift.
- **WHAT TO IMPLEMENT:** verify-docs-anonymity already scans docs; include root md in scan.
- **Acceptance criteria:** Root md clean.
- **Verification:** verify-docs-anonymity expand.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #47 — News desk: primary-source first paragraph enforcement
- **Stable-ID:** T100-025
- **Area:** News integrity
- **Anchor:** AP
- **Score:** 7.0→9.0
- **PRIORITY:** 79
- **Launch-critical:** yes
- **Problem:** News should open with primary institutional record.
- **Evidence:** news articles; verify-article-sources
- **Root cause:** Editorial drift risk.
- **WHAT TO IMPLEMENT:** verify-article-sources asserts ≥1 .gov/.mil/court primary per news item; fail pure on missing.
- **Acceptance criteria:** verify green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Strict may block drafts — only public news.
- **Anonymity impact:** None.
- **Status:** Pending

### #48 — Public briefing: open questions list always visible
- **Stable-ID:** T100-089
- **Area:** Israel briefing trust
- **Anchor:** AP uncertainty
- **Score:** 7.0→9.5
- **PRIORITY:** 79
- **Launch-critical:** yes
- **Problem:** Confidence limits and open questions are trust core.
- **Evidence:** IsraelDossierBriefingPage
- **Root cause:** May be below fold.
- **WHAT TO IMPLEMENT:** Pin open-questions section near top after summary.
- **Acceptance criteria:** Visible without scroll on desktop.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #49 — Corrections workflow public microcopy + mailto template
- **Stable-ID:** T100-016
- **Area:** Trust / rights
- **Anchor:** AP corrections
- **Score:** 6.0→9.0
- **PRIORITY:** 78
- **Launch-critical:** no
- **Problem:** Corrections path exists but not standardized across surfaces.
- **Evidence:** methodology; rights@
- **Root cause:** Fragmented CTAs.
- **WHAT TO IMPLEMENT:** Shared CorrectionsCTA component: mailto corrections@ with subject template page URL; mount About/Methodology/ROC/Israel footers.
- **Acceptance criteria:** Consistent CTA 4+ surfaces.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity emails only.
- **Status:** Pending

### #50 — Cookie consent: analytics denied by default until accept
- **Stable-ID:** T100-066
- **Area:** Privacy
- **Anchor:** Privacy law hygiene
- **Score:** 7.5→9.5
- **PRIORITY:** 78
- **Launch-critical:** yes
- **Problem:** Consent mode defaults denied in index; ensure CookieConsent updates only on accept.
- **Evidence:** CookieConsent; index gtag
- **Root cause:** Must stay denied default.
- **WHAT TO IMPLEMENT:** verify analytics consent path; no auto-grant.
- **Acceptance criteria:** Default denied until accept.
- **Verification:** Manual+code.
- **Customizability added:** Accept/reject.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Privacy.
- **Status:** Pending

### #51 — Rights packaging: CC BY-NC-SA summary card on download surfaces
- **Stable-ID:** T100-017
- **Area:** Rights
- **Anchor:** AP + rights
- **Score:** 6.5→9.0
- **PRIORITY:** 77
- **Launch-critical:** no
- **Problem:** License in terms; download surfaces under-explained.
- **Evidence:** TermsPage; PDF downloads
- **Root cause:** Legal page separate from download moment.
- **WHAT TO IMPLEMENT:** LicenseCard component near PDF/JSON export buttons: license name, link /terms, commercial restriction one-liner, attribution 'Veritas Worldwide'.
- **Acceptance criteria:** Card on ROC+Israel+Record PDF areas.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity attribution only.
- **Status:** Pending

### #52 — Service worker: never cache admin or auth responses
- **Stable-ID:** T100-071
- **Area:** SW security
- **Anchor:** OPSEC
- **Score:** 7.0→9.5
- **PRIORITY:** 77
- **Launch-critical:** yes
- **Problem:** SW may over-cache.
- **Evidence:** public/sw.js
- **Root cause:** Cache list risk.
- **WHAT TO IMPLEMENT:** Explicit deny /admin /api/auth; network-first for HTML.
- **Acceptance criteria:** SW code audit + verify.
- **Verification:** code.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #53 — Chapter citation copy-as-APA/Chicago one-tap
- **Stable-ID:** T100-021
- **Area:** Citations
- **Anchor:** AP/Chicago
- **Score:** 6.0→9.0
- **PRIORITY:** 76
- **Launch-critical:** no
- **Problem:** CitationGenerator may not cover all chapter sources uniformly.
- **Evidence:** CitationGenerator.tsx
- **Root cause:** Coverage gaps.
- **WHAT TO IMPLEMENT:** Ensure every source row has copy citation; entity publisher; no personal author field.
- **Acceptance criteria:** Copy works; clipboard API fallback.
- **Verification:** Manual.
- **Customizability added:** Citation style select if exists.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity author only.
- **Status:** Pending

### #54 — Evidence tier color contrast AA in dark mode
- **Stable-ID:** T100-040
- **Area:** a11y / tiers
- **Anchor:** WCAG + Apple
- **Score:** 6.5→9.5
- **PRIORITY:** 76
- **Launch-critical:** yes
- **Problem:** Tier colors may fail contrast on dark parchment.
- **Evidence:** CSS vars --color-verified etc
- **Root cause:** Designed light-first.
- **WHAT TO IMPLEMENT:** Audit contrast; adjust dark tokens; pure or manual table in a11y verify.
- **Acceptance criteria:** 4.5:1 text on badges.
- **Verification:** Contrast check.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #55 — Reader accounts: minimal PII — email only
- **Stable-ID:** T100-073
- **Area:** Auth privacy
- **Anchor:** Privacy
- **Score:** 7.5→9.5
- **PRIORITY:** 76
- **Launch-critical:** yes
- **Problem:** Profile fields temptation.
- **Evidence:** authStore; ProfilePage reader
- **Root cause:** Scope creep risk.
- **WHAT TO IMPLEMENT:** Schema: email + prefs; no real name required; privacy copy.
- **Acceptance criteria:** Signup fields minimal.
- **Verification:** Manual.
- **Customizability added:** Prefs only.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Privacy.
- **Status:** Pending

### #56 — Money trail nodes: amount+date+source triple required
- **Stable-ID:** T100-083
- **Area:** Money trail
- **Anchor:** ProPublica
- **Score:** 6.5→9.0
- **PRIORITY:** 76
- **Launch-critical:** yes
- **Problem:** Nodes without complete triple erode trust.
- **Evidence:** moneyTrail corpus
- **Root cause:** Incomplete rows possible.
- **WHAT TO IMPLEMENT:** Schema validate amount/date/source; pure export validate.
- **Acceptance criteria:** Export fails incomplete.
- **Verification:** export+verify.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #57 — Integrity score transparency: public formula explainer
- **Stable-ID:** T100-023
- **Area:** Integrity score
- **Anchor:** ProPublica trust
- **Score:** 6.5→9.0
- **PRIORITY:** 75
- **Launch-critical:** no
- **Problem:** Score exists; readers may distrust black box.
- **Evidence:** integrityScore.ts; verify-integrity-score
- **Root cause:** Formula under-documented in UI.
- **WHAT TO IMPLEMENT:** Methodology subsection + tooltips on score UI linking formula inputs (sources, tiers) without gaming guidance that invites spam.
- **Acceptance criteria:** Explainer live.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #58 — Privacy page: researcher local tools disclosure
- **Stable-ID:** T100-055
- **Area:** Privacy trust
- **Anchor:** Privacy
- **Score:** 6.5→9.0
- **PRIORITY:** 75
- **Launch-critical:** yes
- **Problem:** Personal timeline localStorage not explained on privacy.
- **Evidence:** PrivacyPage; PersonalTimeline
- **Root cause:** Feature ahead of policy text.
- **WHAT TO IMPLEMENT:** Add section: researcher tools store data only in browser; never uploaded; how to clear.
- **Acceptance criteria:** Section live.
- **Verification:** Manual.
- **Customizability added:** Clear instructions.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Trust+privacy.
- **Status:** Pending

### #59 — Israel legal cases: court document primary links
- **Stable-ID:** T100-081
- **Area:** Israel legal integrity
- **Anchor:** ProPublica
- **Score:** 6.5→9.0
- **PRIORITY:** 75
- **Launch-critical:** yes
- **Problem:** Legal cases need docket/primary docs.
- **Evidence:** corpus legalCases
- **Root cause:** Secondary summary risk.
- **WHAT TO IMPLEMENT:** Each legalCase requires ≥1 primary court/filing URL or archive pin; verify floor.
- **Acceptance criteria:** verify asserts.
- **Verification:** CI.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** External link rot.
- **Anonymity impact:** None.
- **Status:** Pending

### #60 — Lobbying records: FEC/LDA primary URLs
- **Stable-ID:** T100-082
- **Area:** Money trail integrity
- **Anchor:** ProPublica
- **Score:** 6.5→9.0
- **PRIORITY:** 75
- **Launch-critical:** yes
- **Problem:** Lobbying must cite official records.
- **Evidence:** corpus lobbying
- **Root cause:** Secondary risk.
- **WHAT TO IMPLEMENT:** Require official source URL pattern list; verify.
- **Acceptance criteria:** verify asserts.
- **Verification:** CI.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #61 — Profile pages: evidence tier on claims list consistency
- **Stable-ID:** T100-024
- **Area:** Profiles
- **Anchor:** NYT VI
- **Score:** 6.0→8.5
- **PRIORITY:** 74
- **Launch-critical:** no
- **Problem:** Profile claim tiers inconsistent visual language.
- **Evidence:** ProfilePage; TierIcons
- **Root cause:** Multiple badge systems.
- **WHAT TO IMPLEMENT:** Standardize on TierIcons + SCHOLARLY or legacy map; legend footer.
- **Acceptance criteria:** Consistent badges.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #62 — Keyboard-only researcher path through Sources filters
- **Stable-ID:** T100-031
- **Area:** a11y
- **Anchor:** WCAG
- **Score:** 6.5→9.5
- **PRIORITY:** 74
- **Launch-critical:** yes
- **Problem:** Filters may miss focus rings / 44px.
- **Evidence:** SourcesPage filters
- **Root cause:** Mouse-first.
- **WHAT TO IMPLEMENT:** Focus-visible rings; 44px hit; aria-pressed on tier chips; skip link to results.
- **Acceptance criteria:** Keyboard complete path.
- **Verification:** Manual a11y.
- **Customizability added:** Tier filters.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #63 — Bible history surface: tier filter parity with ROC
- **Stable-ID:** T100-061
- **Area:** Bible / ROC family
- **Anchor:** AP
- **Score:** 6.0→9.0
- **PRIORITY:** 74
- **Launch-critical:** yes
- **Problem:** Bible page may lag ROC filter UX.
- **Evidence:** BibleHistoryPage
- **Root cause:** Parallel product incomplete parity.
- **WHAT TO IMPLEMENT:** Shared EvidenceFilterBar component used by ROC+Bible.
- **Acceptance criteria:** Parity filters.
- **Verification:** Manual.
- **Customizability added:** Tier filters.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #64 — Dispute story component: evidence both sides pattern
- **Stable-ID:** T100-080
- **Area:** Editorial UX
- **Anchor:** AP dual-source
- **Score:** 6.0→9.0
- **PRIORITY:** 74
- **Launch-critical:** yes
- **Problem:** Disputes need structured both-sides evidence slots.
- **Evidence:** DisputeStory.tsx
- **Root cause:** Component may be underused.
- **WHAT TO IMPLEMENT:** Require sourcesA/sourcesB; refuse render if empty either side when type=dispute.
- **Acceptance criteria:** Guard in component.
- **Verification:** unit if possible.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #65 — Sentry forward optional without PII breadcrumbs of operator
- **Stable-ID:** T100-028
- **Area:** Observability privacy
- **Anchor:** OPSEC
- **Score:** 6.0→9.0
- **PRIORITY:** 73
- **Launch-critical:** no
- **Problem:** sentryForwardConfigured false live; when enabled must strip PII.
- **Evidence:** health sentry fields; clientErrorReporting
- **Root cause:** Not fully wired.
- **WHAT TO IMPLEMENT:** If enabling Sentry, scrub email/IP/userAgent minimize; never send admin identity strings.
- **Acceptance criteria:** Config docs + code scrub.
- **Verification:** Code review.
- **Customizability added:** N/A.
- **Surfaces:** server
- **Risk & rollback:** Medium.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #66 — Home TOC: dual Record entries (Vol I + ROC) clarity
- **Stable-ID:** T100-058
- **Area:** IA
- **Anchor:** Publisher
- **Score:** 7.0→9.0
- **PRIORITY:** 73
- **Launch-critical:** no
- **Problem:** Two Records may confuse.
- **Evidence:** HomePage
- **Root cause:** Naming collision with ROC.
- **WHAT TO IMPLEMENT:** Label 'The Record (Volume I)' vs 'Record of Jesus Christ' with one-line scopes.
- **Acceptance criteria:** Labels clear.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #67 — Deep state / AIPAC pages: methodology banner mandatory
- **Stable-ID:** T100-079
- **Area:** Special pages integrity
- **Anchor:** AP
- **Score:** 6.0→9.0
- **PRIORITY:** 73
- **Launch-critical:** yes
- **Problem:** Sensitive topics need methodology chrome.
- **Evidence:** DeepStatePage; AipacPage
- **Root cause:** Inconsistent banners.
- **WHAT TO IMPLEMENT:** Shared InterpretationBoundaryNotice + methodology link top.
- **Acceptance criteria:** Banner present.
- **Verification:** Visual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #68 — Offline corpus pack download (zip of JSON)
- **Stable-ID:** T100-022
- **Area:** Researcher export
- **Anchor:** Knowledge bases
- **Score:** 4.0→8.5
- **PRIORITY:** 72
- **Launch-critical:** no
- **Problem:** JSON endpoints separate; no single offline pack.
- **Evidence:** corpus.json paths
- **Root cause:** No zip pipeline.
- **WHAT TO IMPLEMENT:** Build-time script zip public corpora + taxonomy → public/research-pack.zip; link on researcher hub. Size budget check.
- **Acceptance criteria:** Zip downloads; entity README inside.
- **Verification:** curl zip.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Size on deploy.
- **Anonymity impact:** README entity-only.
- **Status:** Pending

### #69 — Chapter sources: open-in-new + copy-link dual control
- **Stable-ID:** T100-039
- **Area:** Sources UX
- **Anchor:** Apple OS
- **Score:** 6.5→9.0
- **PRIORITY:** 72
- **Launch-critical:** no
- **Problem:** Researchers need copy link without navigation loss.
- **Evidence:** SourcesPage
- **Root cause:** Single open action.
- **WHAT TO IMPLEMENT:** Icon button copy URL; toast; 44px.
- **Acceptance criteria:** Copy works.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #70 — Terms: researcher export license clarity
- **Stable-ID:** T100-056
- **Area:** Rights
- **Anchor:** Rights
- **Score:** 6.5→9.0
- **PRIORITY:** 72
- **Launch-critical:** no
- **Problem:** Corpus JSON license vs narrative CC clarity.
- **Evidence:** TermsPage
- **Root cause:** Ambiguity risk.
- **WHAT TO IMPLEMENT:** Clarify machine corpora under same CC BY-NC-SA unless noted; attribution Veritas Worldwide.
- **Acceptance criteria:** Terms paragraph live.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Legal careful wording.
- **Anonymity impact:** Entity.
- **Status:** Pending

### #71 — Accessibility statement: entity contact only
- **Stable-ID:** T100-077
- **Area:** a11y compliance
- **Anchor:** WCAG
- **Score:** 8.0→9.5
- **PRIORITY:** 72
- **Launch-critical:** no
- **Problem:** Already rights@ — keep.
- **Evidence:** AccessibilityPage
- **Root cause:** Stable.
- **WHAT TO IMPLEMENT:** Maintain; add response SLA entity.
- **Acceptance criteria:** SLA line.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity.
- **Status:** Pending

### #72 — ROC PDF claim index regenerates on export
- **Stable-ID:** T100-087
- **Area:** ROC publication
- **Anchor:** Publisher
- **Score:** 7.0→9.0
- **PRIORITY:** 72
- **Launch-critical:** yes
- **Problem:** PDF can lag corpus JSON.
- **Evidence:** generate-roc-pdf; corpus
- **Root cause:** Manual step miss.
- **WHAT TO IMPLEMENT:** npm script chain export:roc-corpus && generate pdf; pure checks PDF mtime or count string.
- **Acceptance criteria:** PDF reflects count.
- **Verification:** scripts.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity PDF metadata.
- **Status:** Pending

### #73 — Mobile long-form reading: max measure + progressive image
- **Stable-ID:** T100-030
- **Area:** Reading UX
- **Anchor:** Apple OS + a11y
- **Score:** 7.0→9.5
- **PRIORITY:** 71
- **Launch-critical:** no
- **Problem:** Long chapters need perfect measure and image priority.
- **Evidence:** ChapterPage; styles
- **Root cause:** Good baseline; polish remaining.
- **WHAT TO IMPLEMENT:** Ensure ch measure ~65ch; hero fetchpriority; lazy below fold; prefers-reduced-motion respected on fades.
- **Acceptance criteria:** Lighthouse + visual mobile.
- **Verification:** Device matrix.
- **Customizability added:** Font size.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #74 — Timeline page public: source chips open primary
- **Stable-ID:** T100-078
- **Area:** Timeline UX
- **Anchor:** NYT VI
- **Score:** 6.5→9.0
- **PRIORITY:** 71
- **Launch-critical:** yes
- **Problem:** Public timeline events should deep-link sources.
- **Evidence:** TimelinePage
- **Root cause:** Variable.
- **WHAT TO IMPLEMENT:** Each event source chip uses PrimarySourceLink pattern.
- **Acceptance criteria:** Chips open sources.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #75 — Reader font/theme prefs persist without identity cookie
- **Stable-ID:** T100-029
- **Area:** Reading UX
- **Anchor:** Apple OS perfection
- **Score:** 7.0→9.0
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** Prefs should stay local.
- **Evidence:** ThemeContext; FontSizeToggle
- **Root cause:** Mostly local; audit third-party.
- **WHAT TO IMPLEMENT:** Audit storage keys; document in privacy; no HubSpot identity for font prefs.
- **Acceptance criteria:** Prefs localStorage only.
- **Verification:** DevTools.
- **Customizability added:** Font size + theme.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Privacy positive.
- **Status:** Pending

### #76 — Membership: privacy-preserving attribution params
- **Stable-ID:** T100-045
- **Area:** Monetization privacy
- **Anchor:** OPSEC
- **Score:** 7.0→9.0
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** Checkout attribution must not leak operator identity.
- **Evidence:** signupAttribution; checkout
- **Root cause:** Generally safe; audit.
- **WHAT TO IMPLEMENT:** verify-checkout-attribution continues; strip personal ref codes.
- **Acceptance criteria:** verify green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #77 — Security.txt contact entity-only + expiry monitor
- **Stable-ID:** T100-054
- **Area:** Security disclosure
- **Anchor:** Compliance
- **Score:** 8.0→9.5
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** Expires 2027; monitor.
- **Evidence:** security.txt
- **Root cause:** Static expiry.
- **WHAT TO IMPLEMENT:** CI warn if Expires < 90 days; contacts privacy@ and corrections@ only.
- **Acceptance criteria:** Warn script.
- **Verification:** script.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity contacts.
- **Status:** Pending

### #78 — ETag / cache headers for corpora
- **Stable-ID:** T100-070
- **Area:** Performance
- **Anchor:** Staff+
- **Score:** 6.0→9.0
- **PRIORITY:** 70
- **Launch-critical:** yes
- **Problem:** Large corpora re-downloaded fully.
- **Evidence:** server static
- **Root cause:** Default caching.
- **WHAT TO IMPLEMENT:** Set ETag/Cache-Control public m-time for corpus.json; short for HTML.
- **Acceptance criteria:** Headers present.
- **Verification:** curl -I.
- **Customizability added:** N/A.
- **Surfaces:** server
- **Risk & rollback:** Stale risk — moderate max-age.
- **Anonymity impact:** None.
- **Status:** Pending

### #79 — Actors roster: category completeness + profile link integrity
- **Stable-ID:** T100-084
- **Area:** Israel actors
- **Anchor:** Trust
- **Score:** 7.0→9.0
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** Actors 47; links to profiles may 404.
- **Evidence:** israelDossierActors
- **Root cause:** Drift.
- **WHAT TO IMPLEMENT:** verify related profile ids resolve; soft warn missing.
- **Acceptance criteria:** verify.
- **Verification:** CI.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #80 — Israel PDF expanded regenerates on densify
- **Stable-ID:** T100-088
- **Area:** Israel publication
- **Anchor:** Publisher
- **Score:** 6.5→9.0
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** Expanded PDF lag densify.
- **Evidence:** israel-dossier-expanded.pdf
- **Root cause:** Heavy gen.
- **WHAT TO IMPLEMENT:** Document pipeline; optional CI skip; version stamp inside PDF entity.
- **Acceptance criteria:** Stamp matches wave.
- **Verification:** manual/script.
- **Customizability added:** N/A.
- **Surfaces:** ops
- **Risk & rollback:** Costly CI.
- **Anonymity impact:** Entity.
- **Status:** Pending

### #81 — AdSense disabled until entity publisher ID — keep comment lock
- **Stable-ID:** T100-098
- **Area:** Ads OPSEC
- **Anchor:** OPSEC
- **Score:** 8.5→10.0
- **PRIORITY:** 70
- **Launch-critical:** no
- **Problem:** AdSense commented; must not enable with personal adsense.
- **Evidence:** index.html adsense comment
- **Root cause:** Future enable risk.
- **WHAT TO IMPLEMENT:** Comment remains; if enable use entity publisher only; verify no ca-pub personal.
- **Acceptance criteria:** Still disabled or entity.
- **Verification:** code.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #82 — RSS: dual corpus update items when major densify ships
- **Stable-ID:** T100-034
- **Area:** Distribution
- **Anchor:** SEO growth
- **Score:** 6.0→8.5
- **PRIORITY:** 69
- **Launch-critical:** no
- **Problem:** RSS chapters+news; corpus milestones invisible.
- **Evidence:** feed.xml export
- **Root cause:** No corpus milestone entries.
- **WHAT TO IMPLEMENT:** Optional RSS item on major wave milestones (entity title only).
- **Acceptance criteria:** Feed contains milestone when exported.
- **Verification:** export:rss-feed.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Noise risk — threshold high.
- **Anonymity impact:** Entity-only titles.
- **Status:** Pending

### #83 — Reduced-motion: disable non-essential dossier animations
- **Stable-ID:** T100-032
- **Area:** a11y
- **Anchor:** WCAG
- **Score:** 7.0→9.5
- **PRIORITY:** 68
- **Launch-critical:** no
- **Problem:** Motion may remain on counters/carousels.
- **Evidence:** AnimatedCounter; DossierCarousel
- **Root cause:** Partial respect.
- **WHAT TO IMPLEMENT:** prefers-reduced-motion media: static counters; no autoplay carousel.
- **Acceptance criteria:** OS reduce motion respected.
- **Verification:** Device.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #84 — Media kit: evidence taxonomy download + brand entity
- **Stable-ID:** T100-047
- **Area:** Distribution rights
- **Anchor:** Publisher
- **Score:** 7.0→9.0
- **PRIORITY:** 68
- **Launch-critical:** no
- **Problem:** Media kit should package tier icons + entity brand only.
- **Evidence:** MediaKitPage; brand-kit
- **Root cause:** Partial.
- **WHAT TO IMPLEMENT:** Link evidence-tier SVGs + taxonomy JSON; contact rights@ only.
- **Acceptance criteria:** Links work.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity.
- **Status:** Pending

### #85 — Search ranking: boost primary-source titles
- **Stable-ID:** T100-059
- **Area:** Search quality
- **Anchor:** Trust
- **Score:** 6.0→8.5
- **PRIORITY:** 68
- **Launch-critical:** no
- **Problem:** Search may rank secondary equal to primary.
- **Evidence:** verify-search-ranking; scoring
- **Root cause:** Scoring weights.
- **WHAT TO IMPLEMENT:** Boost methodology/sources/chapter primary; document weights.
- **Acceptance criteria:** verify-search-ranking green.
- **Verification:** pure.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #86 — Incident multimedia: caption + source + license fields
- **Stable-ID:** T100-085
- **Area:** Multimedia integrity
- **Anchor:** NYT VI
- **Score:** 5.5→9.0
- **PRIORITY:** 68
- **Launch-critical:** no
- **Problem:** Multimedia may lack rights metadata.
- **Evidence:** incident.multimedia
- **Root cause:** Schema soft.
- **WHAT TO IMPLEMENT:** Require caption/source for any multimedia entry; no unlicensed scrape.
- **Acceptance criteria:** validate on export.
- **Verification:** CI.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #87 — Social share panel: entity UTMs only
- **Stable-ID:** T100-065
- **Area:** Distribution privacy
- **Anchor:** Analytics privacy
- **Score:** 7.0→9.0
- **PRIORITY:** 67
- **Launch-critical:** no
- **Problem:** Share UTMs must not encode personal refs.
- **Evidence:** SharePanel
- **Root cause:** UTM conventions.
- **WHAT TO IMPLEMENT:** utm_source=veritas utm_medium=share; no personal campaign names.
- **Acceptance criteria:** UTM audit.
- **Verification:** code.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #88 — Topic hubs: evidence-first intro paragraphs
- **Stable-ID:** T100-060
- **Area:** Topics
- **Anchor:** ProPublica
- **Score:** 6.5→8.5
- **PRIORITY:** 66
- **Launch-critical:** no
- **Problem:** Topic pages need primary-source framing.
- **Evidence:** TopicPage; topicHubs
- **Root cause:** Variable quality.
- **WHAT TO IMPLEMENT:** Template requires sources strip; no unsupported claims.
- **Acceptance criteria:** Sample hubs pass editorial checklist.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #89 — Stripe customer portal: entity branding only
- **Stable-ID:** T100-068
- **Area:** Billing OPSEC
- **Anchor:** OPSEC
- **Score:** 7.5→9.0
- **PRIORITY:** 66
- **Launch-critical:** no
- **Problem:** Stripe portal branding entity.
- **Evidence:** Membership flows
- **Root cause:** Stripe dashboard config partially external.
- **WHAT TO IMPLEMENT:** Document entity statement descriptor; no personal name on receipts copy in-app.
- **Acceptance criteria:** Copy audit.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web+Stripe
- **Risk & rollback:** External Stripe settings Blocked residual.
- **Anonymity impact:** Hardens.
- **Status:** Pending

### #90 — Multi-volume scaffolding: Volume II placeholder IA
- **Stable-ID:** T100-041
- **Area:** The Record expansion
- **Anchor:** Publisher IA
- **Score:** 3.0→8.0
- **PRIORITY:** 65
- **Launch-critical:** no
- **Problem:** Vol II not scaffolded for future expansion.
- **Evidence:** chapters; HomePage TOC
- **Root cause:** Vol I only.
- **WHAT TO IMPLEMENT:** Add non-public or coming-soon Volume II section in data model (volume field); home TOC ready; no fake content.
- **Acceptance criteria:** Model accepts volume=2 empty.
- **Verification:** Unit.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Avoid thin SEO pages — noindex stubs.
- **Anonymity impact:** Entity-only.
- **Status:** Pending

### #91 — Pure suite: wall-clock budget + flake isolation
- **Stable-ID:** T100-091
- **Area:** CI quality
- **Anchor:** Staff+
- **Score:** 7.0→9.0
- **PRIORITY:** 65
- **Launch-critical:** no
- **Problem:** Pure must stay fast for multi-agent.
- **Evidence:** verify-pure.mjs
- **Root cause:** Growth.
- **WHAT TO IMPLEMENT:** Group pure:fast vs pure:live; document.
- **Acceptance criteria:** pure:fast < N min.
- **Verification:** time npm.
- **Customizability added:** N/A.
- **Surfaces:** CI
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #92 — Institute: keep practical content out of investigative claim contamination
- **Stable-ID:** T100-062
- **Area:** Institute integrity
- **Anchor:** Methodology
- **Score:** 7.5→9.0
- **PRIORITY:** 64
- **Launch-critical:** no
- **Problem:** Institute must not dilute investigative evidence brand.
- **Evidence:** Institute methodology
- **Root cause:** Brand boundary.
- **WHAT TO IMPLEMENT:** Clear nav labels; institute methodology separate; no false evidence tiers on how-tos.
- **Acceptance criteria:** Boundary copy.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #93 — Live verify pack scheduled docs (operator runbook)
- **Stable-ID:** T100-092
- **Area:** Ops
- **Anchor:** Staff+
- **Score:** 6.0→9.0
- **PRIORITY:** 64
- **Launch-critical:** no
- **Problem:** Live gates need runbook without personal devices notes.
- **Evidence:** verify:live*
- **Root cause:** Knowledge in heads.
- **WHAT TO IMPLEMENT:** docs/top100-value-engine/LIVE-VERIFY-RUNBOOK.md entity-only steps.
- **Acceptance criteria:** Runbook exists.
- **Verification:** doc.
- **Customizability added:** N/A.
- **Surfaces:** docs
- **Risk & rollback:** Low.
- **Anonymity impact:** Entity.
- **Status:** Pending

### #94 — Rate limit public corpus endpoints against scrape abuse
- **Stable-ID:** T100-069
- **Area:** Platform resilience
- **Anchor:** Staff+
- **Score:** 5.0→8.5
- **PRIORITY:** 62
- **Launch-critical:** no
- **Problem:** Large JSON open; abuse possible.
- **Evidence:** server static
- **Root cause:** No special rate limit.
- **WHAT TO IMPLEMENT:** Express rate limit on /israel-dossier/corpus.json and ROC corpus; generous for researchers.
- **Acceptance criteria:** 429 under abuse sim.
- **Verification:** local test.
- **Customizability added:** N/A.
- **Surfaces:** server
- **Risk & rollback:** May affect bulk research — set high.
- **Anonymity impact:** None.
- **Status:** Pending

### #95 — Forum beta: identity-safe moderation copy
- **Stable-ID:** T100-044
- **Area:** Forum
- **Anchor:** OPSEC + trust
- **Score:** 5.5→8.5
- **PRIORITY:** 60
- **Launch-critical:** no
- **Problem:** Forum beta local reports; copy must not imply personal moderators.
- **Evidence:** ForumPage
- **Root cause:** Beta incomplete.
- **WHAT TO IMPLEMENT:** Entity-only moderation copy; rights@ contact; no personal names.
- **Acceptance criteria:** Copy audit pass.
- **Verification:** grep.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Anonymity.
- **Status:** Pending

### #96 — Workbook CSV templates: schema version header
- **Stable-ID:** T100-090
- **Area:** Editor tooling
- **Anchor:** Publisher
- **Score:** 6.0→8.5
- **PRIORITY:** 60
- **Launch-critical:** no
- **Problem:** Templates need version for long-term.
- **Evidence:** israel-dossier/templates
- **Root cause:** Schema drift.
- **WHAT TO IMPLEMENT:** Add schemaVersion row/comment; manifest version bump policy.
- **Acceptance criteria:** Manifest version.
- **Verification:** file check.
- **Customizability added:** N/A.
- **Surfaces:** files
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #97 — Final path-to-10.0 scorecard for all surfaces
- **Stable-ID:** T100-100
- **Area:** Measurement
- **Anchor:** Perfection engine
- **Score:** 6.0→10.0
- **PRIORITY:** 60
- **Launch-critical:** no
- **Problem:** Need living scorecard of surface scores.
- **Evidence:** Truth model
- **Root cause:** No single scorecard file.
- **WHAT TO IMPLEMENT:** docs/top100-value-engine/SCORECARD.md with surface×score current/target; update each interval.
- **Acceptance criteria:** Scorecard exists and updates.
- **Verification:** doc.
- **Customizability added:** N/A.
- **Surfaces:** docs
- **Risk & rollback:** Low.
- **Anonymity impact:** Tracks anonymity posture row.
- **Status:** Pending

### #98 — Print stylesheet for methodology + sources
- **Stable-ID:** T100-063
- **Area:** Publication
- **Anchor:** Publisher
- **Score:** 5.0→8.5
- **PRIORITY:** 58
- **Launch-critical:** no
- **Problem:** Researchers print methodology.
- **Evidence:** CSS print
- **Root cause:** Weak print CSS.
- **WHAT TO IMPLEMENT:** print: hide nav/membership; show URL footnotes.
- **Acceptance criteria:** Print preview clean.
- **Verification:** Manual.
- **Customizability added:** N/A.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #99 — Perpetual ledger re-rank trigger doc (>30d drift)
- **Stable-ID:** T100-099
- **Area:** Value engine meta
- **Anchor:** Perpetual agent
- **Score:** 5.0→9.0
- **PRIORITY:** 55
- **Launch-critical:** no
- **Problem:** Ledger must remain coherent years.
- **Evidence:** This engine prompt
- **Root cause:** Process.
- **WHAT TO IMPLEMENT:** Document re-rank triggers: material platform change, new threat vectors, >30d drift.
- **Acceptance criteria:** Doc section in ledger.
- **Verification:** doc.
- **Customizability added:** N/A.
- **Surfaces:** docs
- **Risk & rollback:** Low.
- **Anonymity impact:** None.
- **Status:** Pending

### #100 — Dual language readiness: i18n without identity leakage
- **Stable-ID:** T100-076
- **Area:** i18n
- **Anchor:** Publisher
- **Score:** 5.0→8.0
- **PRIORITY:** 50
- **Launch-critical:** no
- **Problem:** i18n exists; translated about must stay entity.
- **Evidence:** i18n.tsx
- **Root cause:** Future languages.
- **WHAT TO IMPLEMENT:** Guideline: no translator personal credits on public pages; entity only.
- **Acceptance criteria:** Doc + sample.
- **Verification:** doc.
- **Customizability added:** Language selector exists.
- **Surfaces:** web
- **Risk & rollback:** Low.
- **Anonymity impact:** Policy.
- **Status:** Pending

## Blocked / external (tracked inside items)

- GitHub org transfer, full git history rewrite, WHOIS/KYC, Stripe dashboard branding: operator-owned infra (see Truth Model residual risks).

## Re-rank triggers

- Material platform change; new anonymity threat; drift >30 days; generation method no longer world-class.
