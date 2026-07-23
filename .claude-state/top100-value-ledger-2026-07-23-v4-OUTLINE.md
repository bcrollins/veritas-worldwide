# Top-100 Value Ledger Wave 4 OUTLINE
Generated: 2026-07-23T12:29:45.500387+00:00
Entity-only. Operator ref internal: BR.

## #1 — Entity-only public surfaces continuous pure gate
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 95 · Launch-critical: True
- **Problem:** Identity must never appear in product surfaces
- **WHAT TO IMPLEMENT:** Maintain verify:identity-scrub + verify:live-anonymity floors; scan new files
- **Acceptance:** Pure + live anonymity PASS; no personal needles
- **Verification:** verify:identity-scrub; verify:live-anonymity; pure suite
- **Anonymity:** Hardens BR anonymity
- **Note:** Wave3+ continuous; pure 44 PASS

## #2 — Git author forward entity-only
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 94 · Launch-critical: True
- **Problem:** Commits must be Veritas Worldwide <rights@…>
- **WHAT TO IMPLEMENT:** Keep entity author; pure floor last N commits
- **Acceptance:** Last 20 commits entity-authored
- **Verification:** verify:git-author-forward
- **Anonymity:** Hardens history forward
- **Note:** PASS

## #3 — Transfer GitHub repo to org-only identity
- **Status:** Pending
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 93 · Launch-critical: True
- **Problem:** Repo under personal GH namespace
- **WHAT TO IMPLEMENT:** Transfer to org account; update remotes; no personal namespace in package
- **Acceptance:** Remote org URL; package entity; docs updated
- **Verification:** gh repo view; package.json; live no personal GH
- **Anonymity:** Hardens operator link
- **Note:** OPERATOR: requires human GH org transfer

## #4 — Scrub git author history of personal identity
- **Status:** Pending
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 92 · Launch-critical: True
- **Problem:** Historical commits may contain personal author
- **WHAT TO IMPLEMENT:** Filter-repo rewrite with operator approval; force-push policy
- **Acceptance:** No personal emails in git log
- **Verification:** git log --all --format; operator approval
- **Anonymity:** Hardens history
- **Note:** OPERATOR: rewrite needs explicit approval

## #5 — Admin and /bernie first-paint noindex for all UAs
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 91 · Launch-critical: True
- **Problem:** Sensitive paths must never index
- **WHAT TO IMPLEMENT:** NOINDEX_EXACT + bot meta + forceNoindexHtml
- **Acceptance:** X-Robots + meta noindex
- **Verification:** verify:live-bot-noindex
- **Anonymity:** Hardens OPSEC
- **Note:** live bot-noindex 15 surfaces

## #6 — /researcher and /volume-ii noindex first-paint
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 90 · Launch-critical: True
- **Problem:** Scaffold tools must not SERP
- **WHAT TO IMPLEMENT:** noindexBotPages + NOINDEX_EXACT + robots Disallow
- **Acceptance:** noindex live
- **Verification:** verify:live-bot-noindex; robots
- **Anonymity:** Hardens OPSEC

## #7 — Package.json entity author / no personal GH
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 89 · Launch-critical: True
- **Problem:** package author must be entity-safe
- **WHAT TO IMPLEMENT:** package-entity pure floor
- **Acceptance:** PASS pure
- **Verification:** verify:package-entity
- **Anonymity:** Hardens

## #8 — security.txt entity contacts only
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 88 · Launch-critical: True
- **Problem:** Disclosure contacts entity-only
- **WHAT TO IMPLEMENT:** public/security.txt dual-write well-known
- **Acceptance:** privacy@ + corrections@; no personal
- **Verification:** verify:security-txt pure + live
- **Anonymity:** Hardens

## #9 — humans.txt entity + corpora paths no personal
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 87 · Launch-critical: True
- **Problem:** humans.txt must stay entity-only
- **WHAT TO IMPLEMENT:** Corpora line + Veritas Worldwide only
- **Acceptance:** No personal needles; pack listed
- **Verification:** verify-crawler-surfaces; identity-scrub
- **Anonymity:** Hardens
- **Note:** 6d1f6ac

## #10 — Client error path scrub (home dirs/emails)
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 86 · Launch-critical: True
- **Problem:** Stacks must not leak /Users/operator
- **WHAT TO IMPLEMENT:** scrubErrorText in clientErrorReporting
- **Acceptance:** Pure error-scrub PASS
- **Verification:** verify:error-scrub
- **Anonymity:** Hardens

## #11 — Integrity densify n≥3 all 96 profiles
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** ProPublica
- **PRIORITY:** 85 · Launch-critical: True
- **Problem:** Dual-cite falsehood dockets floor
- **WHAT TO IMPLEMENT:** dual-cite deep paths; integrity pure
- **Acceptance:** 96/96 n≥3; weakHomepage 0
- **Verification:** verify:integrity-score; live corpus
- **Anonymity:** None if sources public
- **Note:** live densify 96/96

## #12 — Integrity weakHomepage continuous pure
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** AP
- **PRIORITY:** 84 · Launch-critical: True
- **Problem:** Homepage URLs as sole cite weaken dockets
- **WHAT TO IMPLEMENT:** WARN threshold + deep paths
- **Acceptance:** weakHomepage 0
- **Verification:** verify:integrity-score
- **Anonymity:** None

## #13 — Israel dossier dual-sided densify continuous
- **Status:** Absorbed
- **Area:** Evidence · **Anchor:** NYT VI
- **PRIORITY:** 83 · Launch-critical: True
- **Problem:** Incident corpus growth dual-sided
- **WHAT TO IMPLEMENT:** Peers densify; soft floors lag-aware
- **Acceptance:** Soft floor WARN only on lag; identity clean
- **Verification:** verify:live-anonymity; israel soft-floor
- **Anonymity:** None if entity-only
- **Note:** Multi-agent densify waves continuous

## #14 — Israel visual-investigations machine index
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** NYT VI
- **PRIORITY:** 82 · Launch-critical: True
- **Problem:** VI need machine index + dual-cite
- **WHAT TO IMPLEMENT:** JSON index + pure floors + short cache
- **Acceptance:** 200 short cache; pure floors
- **Verification:** live VI; verify pure floors
- **Anonymity:** None
- **Note:** peers + short-cache 21c9667

## #15 — ROC claim corpus soft floor lag-aware
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** AP
- **PRIORITY:** 81 · Launch-critical: False
- **Problem:** claimCount deploy lag soft WARN
- **WHAT TO IMPLEMENT:** soft floor WARN not hard fail
- **Acceptance:** Live anonymity WARN-only on lag
- **Verification:** verify:live-anonymity ROC soft
- **Anonymity:** None

## #16 — Evidence taxonomy machine JSON
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** AP
- **PRIORITY:** 80 · Launch-critical: True
- **Problem:** Tier definitions must be machine-readable
- **WHAT TO IMPLEMENT:** export-evidence-taxonomy + pure
- **Acceptance:** 200 entity publisher
- **Verification:** live HEAD
- **Anonymity:** None

## #17 — Chapter evidence-tier filter chips
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** ProPublica
- **PRIORITY:** 79 · Launch-critical: True
- **Problem:** Reader filter by tier
- **WHAT TO IMPLEMENT:** chips on chapter reader
- **Acceptance:** Live filters work
- **Verification:** device matrix chapter
- **Anonymity:** None

## #18 — Sources CSV export with tier columns
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** ProPublica
- **PRIORITY:** 78 · Launch-critical: False
- **Problem:** CSV must include tier filters
- **WHAT TO IMPLEMENT:** chapter_evidence_tiers column
- **Acceptance:** CSV includes tiers
- **Verification:** verify sources export
- **Anonymity:** None

## #19 — Israel briefing source-row expansion
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** NYT VI
- **PRIORITY:** 77 · Launch-critical: True
- **Problem:** Briefing needs paragraph source IDs
- **WHAT TO IMPLEMENT:** source-row tables
- **Acceptance:** Source rows visible
- **Verification:** israel behavior verify
- **Anonymity:** None

## #20 — Archive pin floor ≥45 briefing sources
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** AP
- **PRIORITY:** 76 · Launch-critical: False
- **Problem:** Wayback pins for durability
- **WHAT TO IMPLEMENT:** briefing-source-archive-manifest
- **Acceptance:** Floor met pure
- **Verification:** verify:archive-manifest
- **Anonymity:** None

## #21 — Comprehensive Online Profile $499 live Stripe
- **Status:** Implemented
- **Area:** Monetization · **Anchor:** ProPublica
- **PRIORITY:** 75 · Launch-critical: True
- **Problem:** Paid OSINT product must work
- **WHAT TO IMPLEMENT:** page+API+Stripe+verify
- **Acceptance:** checkoutReady true; anonymity pass
- **Verification:** health OSINT; comprehensive pure
- **Anonymity:** Entity-only product

## #22 — OSINT form a11y aria-required invalid busy
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 74 · Launch-critical: True
- **Problem:** Form a11y incomplete
- **WHAT TO IMPLEMENT:** ids htmlFor aria honeypot sticky
- **Acceptance:** Pure comprehensive + a11y floors
- **Verification:** verify:comprehensive-profile a11y
- **Anonymity:** None

## #23 — OSINT order path hardening honeypot allowlist
- **Status:** Implemented
- **Area:** Security · **Anchor:** OPSEC
- **PRIORITY:** 73 · Launch-critical: True
- **Problem:** Abuse and injection vectors
- **WHAT TO IMPLEMENT:** honeypot allowlist knownLinks https only timing-safe admin
- **Acceptance:** 400/202 behaviors live
- **Verification:** OSINT live smoke
- **Anonymity:** Hardens ops

## #24 — Offline research-pack.zip dual-write dist
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** ProPublica
- **PRIORITY:** 72 · Launch-critical: True
- **Problem:** Pack must serve from Railway dist
- **WHAT TO IMPLEMENT:** generate-research-pack public+dist
- **Acceptance:** 200 attachment short cache RateLimit
- **Verification:** verify:live-research-pack
- **Anonymity:** Entity corpora only
- **Note:** LIVE health researchPackZip true

## #25 — Research pack discovery multi-surface
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** Apple OS
- **PRIORITY:** 71 · Launch-critical: True
- **Problem:** Pack buried if only one surface
- **WHAT TO IMPLEMENT:** CTAs all major surfaces
- **Acceptance:** Pure floors on all discovery testids
- **Verification:** verify:research-pack pure
- **Anonymity:** None

## #26 — Research pack health.checks hard publish
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Vercel ops
- **PRIORITY:** 70 · Launch-critical: True
- **Problem:** Missing pack silent degrade
- **WHAT TO IMPLEMENT:** fs.existsSync dist checks hard-fail
- **Acceptance:** checks true live
- **Verification:** /api/health
- **Anonymity:** None
- **Note:** LIVE

## #27 — Research pack RateLimit + non-immutable cache
- **Status:** Implemented
- **Area:** Ops · **Anchor:** OPSEC
- **PRIORITY:** 69 · Launch-critical: True
- **Problem:** Immutable year cache pins stale pack
- **WHAT TO IMPLEMENT:** setHeaders + rate limit scope
- **Acceptance:** Live headers correct
- **Verification:** curl SI research-pack.zip
- **Anonymity:** None
- **Note:** LIVE

## #28 — robots Allow research-pack + taxonomy + VI JSON
- **Status:** Implemented
- **Area:** SEO · **Anchor:** GEO
- **PRIORITY:** 68 · Launch-critical: True
- **Problem:** Allow list incomplete for corpora
- **WHAT TO IMPLEMENT:** explicit Allow floors pure
- **Acceptance:** Allow lines present
- **Verification:** verify-robots-disallow
- **Anonymity:** None

## #29 — Search surfaces free pack with paid OSINT
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 67 · Launch-critical: False
- **Problem:** Search only paid OSINT
- **WHAT TO IMPLEMENT:** free pack terms + result card
- **Acceptance:** search pure floors
- **Verification:** verify-search-osint-boost
- **Anonymity:** None

## #30 — OSINT free pack vs paid product distinction
- **Status:** Implemented
- **Area:** Monetization · **Anchor:** ProPublica
- **PRIORITY:** 66 · Launch-critical: True
- **Problem:** Users confuse free corpora with paid dossier
- **WHAT TO IMPLEMENT:** links on product success membership FAQ privacy terms
- **Acceptance:** Pure floors
- **Verification:** verify-research-pack + comprehensive
- **Anonymity:** None

## #31 — Soft-404 unknown paths HTTP 404 noindex
- **Status:** Implemented
- **Area:** SEO · **Anchor:** Google
- **PRIORITY:** 65 · Launch-critical: True
- **Problem:** Unknown URLs must not soft-200
- **WHAT TO IMPLEMENT:** isKnownSpaRoute + buildNotFoundHtml
- **Acceptance:** 404 + noindex
- **Verification:** verify soft-404 live
- **Anonymity:** None

## #32 — Prerender floor ≥360 routes
- **Status:** Implemented
- **Area:** SEO · **Anchor:** GEO
- **PRIORITY:** 64 · Launch-critical: True
- **Problem:** Prerender shrink regression
- **WHAT TO IMPLEMENT:** crawler pure floors
- **Acceptance:** ≥360
- **Verification:** verify-crawler-surfaces
- **Anonymity:** None

## #33 — llms.txt research pack + corpora GEO
- **Status:** Implemented
- **Area:** SEO · **Anchor:** GEO
- **PRIORITY:** 63 · Launch-critical: True
- **Problem:** AI crawlers need pack entry
- **WHAT TO IMPLEMENT:** llms needles pure
- **Acceptance:** Needle present
- **Verification:** verify-crawler-surfaces
- **Anonymity:** None

## #34 — llms ROC claim advertise lag <50
- **Status:** Implemented
- **Area:** SEO · **Anchor:** GEO
- **PRIORITY:** 62 · Launch-critical: False
- **Problem:** Advertised claim floor stale
- **WHAT TO IMPLEMENT:** sync-roc-geo-floors pure
- **Acceptance:** Lag <50
- **Verification:** verify-seo-meta
- **Anonymity:** None

## #35 — Sitemap excludes noindex OPSEC paths
- **Status:** Implemented
- **Area:** SEO · **Anchor:** Google
- **PRIORITY:** 61 · Launch-critical: True
- **Problem:** noindex paths in sitemap
- **WHAT TO IMPLEMENT:** pure exclusions
- **Acceptance:** PASS
- **Verification:** verify:sitemap-exclusions
- **Anonymity:** Hardens OPSEC

## #36 — Crawler humans.txt entity + pack
- **Status:** Implemented
- **Area:** SEO · **Anchor:** GEO
- **PRIORITY:** 60 · Launch-critical: False
- **Problem:** humans.txt incomplete
- **WHAT TO IMPLEMENT:** crawler pure floor
- **Acceptance:** PASS
- **Verification:** verify-crawler-surfaces humans
- **Anonymity:** Hardens

## #37 — Social bot meta for static product pages
- **Status:** Implemented
- **Area:** SEO · **Anchor:** NYT
- **PRIORITY:** 59 · Launch-critical: True
- **Problem:** Bots need titles
- **WHAT TO IMPLEMENT:** bot meta injection
- **Acceptance:** Titles correct bots
- **Verification:** live bot meta
- **Anonymity:** None

## #38 — OG comprehensive-profile asset
- **Status:** Implemented
- **Area:** SEO · **Anchor:** Monetization
- **PRIORITY:** 58 · Launch-critical: False
- **Problem:** OSINT social card
- **WHAT TO IMPLEMENT:** public OG + page meta
- **Acceptance:** Asset exists pure
- **Verification:** verify comprehensive
- **Anonymity:** None

## #39 — CSP Stripe checkout hosts
- **Status:** Implemented
- **Area:** Security · **Anchor:** Security
- **PRIORITY:** 57 · Launch-critical: True
- **Problem:** Stripe CSP blocks checkout
- **WHAT TO IMPLEMENT:** allow Stripe hosts
- **Acceptance:** CSP pure
- **Verification:** verify:csp-meta
- **Anonymity:** None

## #40 — Security headers baseline live
- **Status:** Implemented
- **Area:** Security · **Anchor:** Security
- **PRIORITY:** 56 · Launch-critical: True
- **Problem:** Headers regression
- **WHAT TO IMPLEMENT:** live header matrix
- **Acceptance:** PASS
- **Verification:** verify-security-headers
- **Anonymity:** Hardens

## #41 — Public 44px touch target pure floors
- **Status:** Implemented
- **Area:** A11y · **Anchor:** Apple OS
- **PRIORITY:** 55 · Launch-critical: True
- **Problem:** Touch targets regress
- **WHAT TO IMPLEMENT:** verify-a11y-public-targets
- **Acceptance:** All floors green
- **Verification:** verify:a11y-public-targets
- **Anonymity:** None

## #42 — Reduced motion counters and animations
- **Status:** Implemented
- **Area:** A11y · **Anchor:** Apple OS
- **PRIORITY:** 54 · Launch-critical: False
- **Problem:** Motion preference ignored
- **WHAT TO IMPLEMENT:** CSS + AnimatedCounter
- **Acceptance:** Pure profile-counters reduced-motion
- **Verification:** verify
- **Anonymity:** None

## #43 — Skip link + main landmark
- **Status:** Implemented
- **Area:** A11y · **Anchor:** WCAG
- **PRIORITY:** 53 · Launch-critical: True
- **Problem:** Keyboard skip missing
- **WHAT TO IMPLEMENT:** App skip link
- **Acceptance:** Present pure top100 floors
- **Verification:** verify-top100-floors
- **Anonymity:** None

## #44 — Accessibility page corpora download note
- **Status:** Implemented
- **Area:** A11y · **Anchor:** WCAG
- **PRIORITY:** 52 · Launch-critical: False
- **Problem:** A11y page incomplete on pack CTAs
- **WHAT TO IMPLEMENT:** features list corpora downloads
- **Acceptance:** Copy present
- **Verification:** page source
- **Anonymity:** None

## #45 — Print CSS hide chrome append URLs
- **Status:** Implemented
- **Area:** A11y · **Anchor:** ProPublica
- **PRIORITY:** 51 · Launch-critical: False
- **Problem:** Print junk chrome
- **WHAT TO IMPLEMENT:** @media print no-print
- **Acceptance:** CSS present
- **Verification:** index.css
- **Anonymity:** None

## #46 — Researcher hub local timeline noindex
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** ProPublica
- **PRIORITY:** 50 · Launch-critical: True
- **Problem:** Local timeline must not index
- **WHAT TO IMPLEMENT:** noindex localStorage only
- **Acceptance:** Live noindex
- **Verification:** bot noindex
- **Anonymity:** Hardens privacy

## #47 — Researcher hub live corpus counts
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** Apple OS
- **PRIORITY:** 49 · Launch-critical: False
- **Problem:** Hub lacked live counts
- **WHAT TO IMPLEMENT:** fetch corpus counts
- **Acceptance:** Counts display
- **Verification:** page live
- **Anonymity:** None

## #48 — Corpus search kind filter
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** Apple OS
- **PRIORITY:** 48 · Launch-critical: False
- **Problem:** Cross-corpus search unfiltered kinds
- **WHAT TO IMPLEMENT:** kindFilter
- **Acceptance:** Pure top100 floors
- **Verification:** verify-top100-floors
- **Anonymity:** None

## #49 — Personal timeline local-only storage
- **Status:** Implemented
- **Area:** Researcher · **Anchor:** OPSEC
- **PRIORITY:** 47 · Launch-critical: True
- **Problem:** Timeline must never upload
- **WHAT TO IMPLEMENT:** personalTimelineStorage
- **Acceptance:** Privacy page documents local-only
- **Verification:** privacy copy
- **Anonymity:** Hardens privacy

## #50 — Footer Researcher tools link
- **Status:** Implemented
- **Area:** Nav · **Anchor:** Apple OS
- **PRIORITY:** 46 · Launch-critical: False
- **Problem:** Footer missing researcher
- **WHAT TO IMPLEMENT:** Researcher tools link
- **Acceptance:** Pure research-pack App shell
- **Verification:** verify-research-pack
- **Anonymity:** None

## #51 — Analytics PII strip recordAnalyticsEvent
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** OPSEC
- **PRIORITY:** 45 · Launch-critical: True
- **Problem:** Analytics must not store free-text PII
- **WHAT TO IMPLEMENT:** cleanProperties strip
- **Acceptance:** PASS pure
- **Verification:** verify:analytics-privacy
- **Anonymity:** Hardens

## #52 — OSINT analytics service_order_recorded no PII
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** OPSEC
- **PRIORITY:** 44 · Launch-critical: True
- **Problem:** Order funnel must not log subject PII
- **WHAT TO IMPLEMENT:** order_id + purpose only
- **Acceptance:** verify-osint-analytics-privacy
- **Verification:** pure
- **Anonymity:** Hardens

## #53 — Release health panel research pack
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 43 · Launch-critical: False
- **Problem:** Operators need pack visibility
- **WHAT TO IMPLEMENT:** health-research-pack-check
- **Acceptance:** testid present pure
- **Verification:** verify-research-pack
- **Anonymity:** None

## #54 — Health history deploy transitions
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 42 · Launch-critical: False
- **Problem:** Deploy transitions invisible
- **WHAT TO IMPLEMENT:** commitTransitions samples
- **Acceptance:** Live history
- **Verification:** verify health-transitions
- **Anonymity:** None

## #55 — Client error intake rate limited
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 41 · Launch-critical: True
- **Problem:** Error flood
- **WHAT TO IMPLEMENT:** rate limit 30/min
- **Acceptance:** Rate limited
- **Verification:** server
- **Anonymity:** None

## #56 — Optional Sentry DSN forward
- **Status:** Blocked
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 40 · Launch-critical: False
- **Problem:** No external pager
- **WHAT TO IMPLEMENT:** document optional Sentry; do not force
- **Acceptance:** Docs present; 503-safe without DSN
- **Verification:** COMPREHENSIVE + platform-gaps
- **Anonymity:** None if entity DSN
- **Note:** OPERATOR: set SENTRY_DSN if paging required

## #57 — Terms license research-pack CC BY-NC-SA
- **Status:** Implemented
- **Area:** Rights · **Anchor:** AP
- **PRIORITY:** 39 · Launch-critical: True
- **Problem:** License unclear for pack
- **WHAT TO IMPLEMENT:** pack in license + scrape carve-out
- **Acceptance:** Pure terms floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #58 — Privacy research-pack downloads logging
- **Status:** Implemented
- **Area:** Rights · **Anchor:** OPSEC
- **PRIORITY:** 38 · Launch-critical: True
- **Problem:** Users need logging transparency
- **WHAT TO IMPLEMENT:** rate-limit logging note
- **Acceptance:** Pure privacy floor
- **Verification:** verify-research-pack
- **Anonymity:** Hardens transparency

## #59 — Membership FAQ free pack not gated
- **Status:** Implemented
- **Area:** Rights · **Anchor:** Apple OS
- **PRIORITY:** 37 · Launch-critical: False
- **Problem:** Membership confuses free pack
- **WHAT TO IMPLEMENT:** FAQ free ZIP
- **Acceptance:** Pure membership floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #60 — Stripe customer portal entity branding
- **Status:** Blocked
- **Area:** Monetization · **Anchor:** Monetization
- **PRIORITY:** 36 · Launch-critical: False
- **Problem:** Stripe portal may show personal branding
- **WHAT TO IMPLEMENT:** Operator sets entity branding in Stripe
- **Acceptance:** Portal shows Veritas entity only
- **Verification:** manual Stripe dashboard
- **Anonymity:** Hardens if fixed
- **Note:** OPERATOR: Stripe Dashboard entity branding

## #61 — Pure suite ≥40 offline gates
- **Status:** Implemented
- **Area:** QA · **Anchor:** Ops
- **PRIORITY:** 35 · Launch-critical: True
- **Problem:** Pure suite shrink risk
- **WHAT TO IMPLEMENT:** verify:pure ceiling 50
- **Acceptance:** ≥40 pure scripts
- **Verification:** verify-pure + security invariants ceiling
- **Anonymity:** None

## #62 — Israel schema triples pure floor
- **Status:** Implemented
- **Area:** QA · **Anchor:** Evidence
- **PRIORITY:** 34 · Launch-critical: False
- **Problem:** Money/legal/lobby missing sourceUrl
- **WHAT TO IMPLEMENT:** pure money legal lobby
- **Acceptance:** PASS
- **Verification:** verify-israel-schema-triples
- **Anonymity:** None

## #63 — Live research-pack verify gate
- **Status:** Implemented
- **Area:** QA · **Anchor:** Ops
- **PRIORITY:** 33 · Launch-critical: True
- **Problem:** Pack can 404 silently
- **WHAT TO IMPLEMENT:** ZIP magic RateLimit health checks
- **Acceptance:** PASS live
- **Verification:** npm run verify:live-research-pack
- **Anonymity:** None
- **Note:** LIVE PASS

## #64 — Live bot-noindex matrix 15 surfaces
- **Status:** Implemented
- **Area:** QA · **Anchor:** OPSEC
- **PRIORITY:** 32 · Launch-critical: True
- **Problem:** Transactional index risk
- **WHAT TO IMPLEMENT:** matrix volume-ii researcher admin etc
- **Acceptance:** PASS 15 surfaces
- **Verification:** verify:live-bot-noindex
- **Anonymity:** Hardens

## #65 — Device matrix smoke checklist pack OSINT
- **Status:** Implemented
- **Area:** QA · **Anchor:** Apple OS
- **PRIORITY:** 31 · Launch-critical: False
- **Problem:** Device matrix incomplete
- **WHAT TO IMPLEMENT:** pack OSINT volume-ii rows
- **Acceptance:** Doc updated
- **Verification:** docs
- **Anonymity:** None

## #66 — Live-verify runbook pack VI OSINT
- **Status:** Implemented
- **Area:** QA · **Anchor:** Ops
- **PRIORITY:** 30 · Launch-critical: False
- **Problem:** Runbook incomplete
- **WHAT TO IMPLEMENT:** pack VI OSINT rows
- **Acceptance:** Doc updated
- **Verification:** docs
- **Anonymity:** None

## #67 — Corpus JSON rate limit 40/min shared
- **Status:** Implemented
- **Area:** Security · **Anchor:** OPSEC
- **PRIORITY:** 29 · Launch-critical: True
- **Problem:** Corpus scrape abuse
- **WHAT TO IMPLEMENT:** shared scope profiles ROC Israel VI taxonomy
- **Acceptance:** RateLimit headers live
- **Verification:** curl corpus SI
- **Anonymity:** Hardens

## #68 — Admin OSINT orders redacted API timing-safe
- **Status:** Implemented
- **Area:** Ops · **Anchor:** OPSEC
- **PRIORITY:** 28 · Launch-critical: True
- **Problem:** Admin orders auth
- **WHAT TO IMPLEMENT:** timingSafeEqual bearer
- **Acceptance:** 401 without token live
- **Verification:** curl admin
- **Anonymity:** Hardens

## #69 — OSINT PII orders gitignored + path deny
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 27 · Launch-critical: True
- **Problem:** PII path exposure
- **WHAT TO IMPLEMENT:** sensitive path deny skip /api/
- **Acceptance:** 404 public paths
- **Verification:** live 404 osint-orders
- **Anonymity:** Hardens

## #70 — Auth returnTo open-redirect closed
- **Status:** Implemented
- **Area:** Security · **Anchor:** Security
- **PRIORITY:** 26 · Launch-critical: True
- **Problem:** Open redirect post-login
- **WHAT TO IMPLEMENT:** AuthContext sanitize
- **Acceptance:** Pure auth-validation
- **Verification:** verify:auth-validation
- **Anonymity:** Hardens

## #71 — Volume II scaffold hub noindex
- **Status:** Implemented
- **Area:** Multi-volume · **Anchor:** ProPublica
- **PRIORITY:** 25 · Launch-critical: True
- **Problem:** Multi-volume scaffold premature index
- **WHAT TO IMPLEMENT:** VolumeIIHubPage noindex + server
- **Acceptance:** Live noindex
- **Verification:** bot volume-ii
- **Anonymity:** None

## #72 — Multi-volume IA pure floors
- **Status:** Implemented
- **Area:** Multi-volume · **Anchor:** AP
- **PRIORITY:** 24 · Launch-critical: False
- **Problem:** IA floors missing
- **WHAT TO IMPLEMENT:** known SPA + noindex floors
- **Acceptance:** Pure seo-meta volume-ii
- **Verification:** verify-seo-meta
- **Anonymity:** None

## #73 — ROC PDF portable claim index
- **Status:** Implemented
- **Area:** Evidence · **Anchor:** AP
- **PRIORITY:** 23 · Launch-critical: False
- **Problem:** Offline ROC claims
- **WHAT TO IMPLEMENT:** generate-roc-pdf postbuild
- **Acceptance:** PDF exists
- **Verification:** live HEAD
- **Anonymity:** None

## #74 — Institute field manual PDF non-immutable
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 22 · Launch-critical: True
- **Problem:** Immutable PDF pin stale content
- **WHAT TO IMPLEMENT:** max-age=3600 must-revalidate
- **Acceptance:** Not immutable live
- **Verification:** platform health
- **Anonymity:** None

## #75 — The Record PDF non-immutable
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 21 · Launch-critical: True
- **Problem:** Same PDF cache bug
- **WHAT TO IMPLEMENT:** must-revalidate
- **Acceptance:** Not immutable
- **Verification:** platform health
- **Anonymity:** None

## #76 — Share UTMs entity-only conversion
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** Growth
- **PRIORITY:** 20 · Launch-critical: False
- **Problem:** Share attribution
- **WHAT TO IMPLEMENT:** entity UTMs
- **Acceptance:** PASS pure
- **Verification:** verify-share-utms
- **Anonymity:** None

## #77 — Checkout attribution membership UTM
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** Growth
- **PRIORITY:** 19 · Launch-critical: False
- **Problem:** Membership UTM
- **WHAT TO IMPLEMENT:** conversionTracking
- **Acceptance:** PASS
- **Verification:** verify-checkout-attribution
- **Anonymity:** None

## #78 — HubSpot OSINT lead mirror no free-text PII
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** OPSEC
- **PRIORITY:** 18 · Launch-critical: False
- **Problem:** CRM free-text risk
- **WHAT TO IMPLEMENT:** email + source only
- **Acceptance:** Code review hubspot fields pure
- **Verification:** verify-hubspot-fields
- **Anonymity:** Hardens

## #79 — OAuth no GitHub wiring
- **Status:** Implemented
- **Area:** OPSEC · **Anchor:** OPSEC
- **PRIORITY:** 17 · Launch-critical: True
- **Problem:** GH OAuth would link identity
- **WHAT TO IMPLEMENT:** forbid GitHub OAuth
- **Acceptance:** PASS pure
- **Verification:** verify-oauth-no-github
- **Anonymity:** Hardens

## #80 — Admin password hash Vite build-time env
- **Status:** Absorbed
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 16 · Launch-critical: False
- **Problem:** Admin login needs hash
- **WHAT TO IMPLEMENT:** env on Railway
- **Acceptance:** Hash set docs credentials local mode 600
- **Verification:** operator credentials file
- **Anonymity:** Hardens if rotated
- **Note:** Prior session set Railway hash; redeploy needed for admin UI

## #81 — OSINT retention 90d purge boot
- **Status:** Implemented
- **Area:** Ops · **Anchor:** OPSEC
- **PRIORITY:** 15 · Launch-critical: True
- **Problem:** PII retention
- **WHAT TO IMPLEMENT:** purgeExpiredOsintOrders boot
- **Acceptance:** retentionDays 90 health
- **Verification:** OSINT health
- **Anonymity:** Hardens privacy

## #82 — OSINT rate limit 8/min checkout
- **Status:** Implemented
- **Area:** Security · **Anchor:** Security
- **PRIORITY:** 14 · Launch-critical: True
- **Problem:** Checkout abuse
- **WHAT TO IMPLEMENT:** rateLimit middleware
- **Acceptance:** rateLimitPerMinute 8 health
- **Verification:** OSINT health
- **Anonymity:** Hardens

## #83 — Profiles index free pack banner vs OSINT
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 13 · Launch-critical: False
- **Problem:** Paid vs free confusion on profiles
- **WHAT TO IMPLEMENT:** banner next to $499
- **Acceptance:** Pure profiles floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #84 — Subscribe success free pack card
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 12 · Launch-critical: False
- **Problem:** New subscribers miss corpora
- **WHAT TO IMPLEMENT:** SubscribeSuccessPage card
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #85 — Support success free pack card
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 11 · Launch-critical: False
- **Problem:** Donors miss corpora
- **WHAT TO IMPLEMENT:** SupportSuccessPage
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #86 — Bookmarks quick routes pack
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 10 · Launch-critical: False
- **Problem:** Bookmarks shell isolated
- **WHAT TO IMPLEMENT:** BookmarksPage
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #87 — Content pack free pack card
- **Status:** Implemented
- **Area:** UX · **Anchor:** Growth
- **PRIORITY:** 9 · Launch-critical: False
- **Problem:** Content pack only paid OSINT
- **WHAT TO IMPLEMENT:** ContentPackPage
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #88 — Media kit research pack one-liner
- **Status:** Implemented
- **Area:** UX · **Anchor:** Growth
- **PRIORITY:** 8 · Launch-critical: False
- **Problem:** Press miss free corpora
- **WHAT TO IMPLEMENT:** MediaKitPage
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #89 — About key routes pack + researcher
- **Status:** Implemented
- **Area:** UX · **Anchor:** Trust
- **PRIORITY:** 7 · Launch-critical: False
- **Problem:** About incomplete tools map
- **WHAT TO IMPLEMENT:** AboutPage
- **Acceptance:** Pure floor
- **Verification:** verify-research-pack
- **Anonymity:** None

## #90 — RESEARCH-PACK.md operator runbook
- **Status:** Implemented
- **Area:** Docs · **Anchor:** Ops
- **PRIORITY:** 6 · Launch-critical: False
- **Problem:** Ops missing pack runbook
- **WHAT TO IMPLEMENT:** dual-write health rate robots discovery
- **Acceptance:** Doc entity-only
- **Verification:** verify-docs-anonymity
- **Anonymity:** None

## #91 — COMPREHENSIVE-PROFILE free alternatives docs
- **Status:** Implemented
- **Area:** Docs · **Anchor:** Monetization
- **PRIORITY:** 5 · Launch-critical: False
- **Problem:** Ops confuses free pack with paid
- **WHAT TO IMPLEMENT:** free alternatives section
- **Acceptance:** Doc present
- **Verification:** docs
- **Anonymity:** None

## #92 — Deploy lag detector pure/live
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 4 · Launch-critical: False
- **Problem:** Tip vs live invisible
- **WHAT TO IMPLEMENT:** scripts/verify-deploy-lag.mjs
- **Acceptance:** WARN lag PASS ancestry
- **Verification:** verify-deploy-lag
- **Anonymity:** None

## #93 — Israel VI dual-cite multi-party floors pure
- **Status:** Absorbed
- **Area:** Evidence · **Anchor:** NYT VI
- **PRIORITY:** 3 · Launch-critical: False
- **Problem:** VI dual-cite regression
- **WHAT TO IMPLEMENT:** pure VI floors
- **Acceptance:** Peers maintain floors
- **Verification:** pure suite
- **Anonymity:** None
- **Note:** Peer densify continuous waves

## #94 — Israel CSV multimedia type column
- **Status:** Absorbed
- **Area:** Evidence · **Anchor:** NYT VI
- **PRIORITY:** 2 · Launch-critical: False
- **Problem:** CSV missing multimedia types
- **WHAT TO IMPLEMENT:** multimedia type column
- **Acceptance:** Peer ship a5cce76
- **Verification:** git log
- **Anonymity:** None
- **Note:** Peer densify

## #95 — Video-first sort + hash deep-link VI
- **Status:** Absorbed
- **Area:** UX · **Anchor:** NYT VI
- **PRIORITY:** 2 · Launch-critical: False
- **Problem:** VI hard to deep-link
- **WHAT TO IMPLEMENT:** hash scroll + video-first sort
- **Acceptance:** Peer ship 30bb072
- **Verification:** live dossier
- **Anonymity:** None
- **Note:** Peer densify

## #96 — OSINT success page free pack CTAs
- **Status:** Implemented
- **Area:** UX · **Anchor:** Apple OS
- **PRIORITY:** 2 · Launch-critical: False
- **Problem:** Post-checkout dead end
- **WHAT TO IMPLEMENT:** success free pack profiles
- **Acceptance:** Pure comprehensive success
- **Verification:** verify-comprehensive-profile
- **Anonymity:** None

## #97 — Platform health HEAD research pack
- **Status:** Implemented
- **Area:** QA · **Anchor:** Ops
- **PRIORITY:** 2 · Launch-critical: True
- **Problem:** Platform health missing pack
- **WHAT TO IMPLEMENT:** HEAD pack cache disposition rate limit manifest
- **Acceptance:** Code present pure floors
- **Verification:** verify-research-pack platform
- **Anonymity:** None

## #98 — Analytics privacy pure continuous
- **Status:** Implemented
- **Area:** Analytics · **Anchor:** OPSEC
- **PRIORITY:** 2 · Launch-critical: True
- **Problem:** PII strip regression
- **WHAT TO IMPLEMENT:** pure in suite
- **Acceptance:** PASS
- **Verification:** verify:analytics-privacy
- **Anonymity:** Hardens

## #99 — Document continuous densify multi-agent coord
- **Status:** Implemented
- **Area:** Ops · **Anchor:** Ops
- **PRIORITY:** 1 · Launch-critical: False
- **Problem:** Multi-agent thrash risk
- **WHAT TO IMPLEMENT:** do not stage peer israel/ROC WIP; ship own files only
- **Acceptance:** Process documented execution log
- **Verification:** docs EXECUTION-LOG
- **Anonymity:** Hardens process
- **Note:** BOIL sessions coordinate

## #100 — Wave4 truth model + ledger durable persistence
- **Status:** Implemented
- **Area:** Meta · **Anchor:** Ops
- **PRIORITY:** 1 · Launch-critical: True
- **Problem:** Ledger must persist before implement
- **WHAT TO IMPLEMENT:** Write v4 ledger + outline + truth model
- **Acceptance:** Files in .claude-state + docs
- **Verification:** ls paths
- **Anonymity:** None
- **Note:** This wave

