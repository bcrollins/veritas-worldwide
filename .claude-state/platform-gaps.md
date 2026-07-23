
## Recently Closed (2026-07-23 — product QA / evidence / OSINT funnel wave)

## Recently Closed (2026-07-23 — offline research pack)

- **Offline research pack ZIP is live.**
  Impact: Researchers download one ZIP of public machine corpora (profiles, ROC, Israel, taxonomy) instead of hunting individual JSON URLs.
  Resolution: `scripts/generate-research-pack.mjs` dual-writes `public/` + `dist/`, rate-limited download, Sources/Methodology/Researcher hub + llms.txt discovery, pure + live verify gates.


- **Chapter evidence-tier filter chips** on Volume I reader (`chapter-evidence-tier-filters`).
- **Sources CSV export** with `chapter_evidence_tiers` column + active filters.
- **Analytics `serviceOrders` funnel** + server `service_order_recorded` on OSINT intake.
- **OG card** `/og-comprehensive-profile.svg` + content-pack OSINT service card.
- **CSP Stripe Checkout hosts** + comprehensive-profile verify gates (robots/OG/anonymity).

## Recently Closed (2026-07-23 — integrity densify + OSINT hardening wave)

- **Integrity n≥3 LIVE floor at 22 profiles.** McConnell, Rand Paul, Omar, Haley, Sanders, Graham densified with dual-cite False dockets this session; live corpus confirms 22 n≥3 including Graham 55/3.
- **OSINT product abuse controls live-bound:** rate-limit 8/min, refuse-list keywords, privacy retention language, gitignore PII orders, health orderIntakeCount + admin ops note.

## Recently Closed (2026-07-23 — Top-100 Value Engine Wave 2)

- **Comprehensive Online Profile ($499) is live.**
  Impact: Clients can commission a fixed-price authenticated OSINT dossier at `/comprehensive-profile` with lawful-purpose intake, methodology appendix, Product+FAQ schema, and Stripe Checkout (server-created session when `STRIPE_SECRET_KEY` is set).
  Resolution: product page + success route + API `/api/services/comprehensive-profile/checkout` + verify suite + terms/privacy/membership/profiles/about wiring. Live proof: HTTP 200, bot title correct, `checkoutReady:true`, soft-404 bot 404 preserved. Commits `3435580` + follow-ons.

- **McConnell integrity densify to n=3 (55) on origin.**
  Impact: Dual-cited PolitiFact False (2013 Meet the Press nominees pace) added; score 100−3×15=55. Commit `fee10bd` on origin; live corpus may lag one deploy wave.

# Platform Gaps — 2026-04-08

## Recently Closed

- **Israel dossier briefing source-row expansion is live.**
  Impact: `/israel-dossier/briefing` now carries the workbook-grade footnote layer directly in the reader experience instead of hiding the evidence chain behind downloads. The page shows paragraph source IDs, section-level source-row tables, corrected row coverage for the financial/humanitarian/incident/legal panels, and a reader-facing chapter sequence before the downloadable draft.
  Resolution: added canonical briefing source-row objects, corrected drifted row coverage for `AID-P-004`, `HUM-P-003`, `INC-P-004`, and `LAW-P-002`, rendered the source-row table and chapter sequence on the briefing route, expanded the Markdown chapter draft with paragraph-level source IDs, and extended canon/behavior verification. Production commit `6e3ab5f` / deployment `e4bb7bbc-d009-431a-b76b-e28381178915` passed all five GitHub Actions workflows, live behavior verification, crawler metadata, direct Markdown artifact probes, and the full primary live viewport matrix.

- **Israel dossier downloadable chapter-style draft is source-boundary checked and live.**
  Impact: the briefing route now has a chapter-like Markdown artifact instead of only a shorter briefing draft, giving editors a direct expansion path from workbook rows to publishable chapter prose.
  Resolution: added `/israel-dossier/workbooks/public-briefing-chapter-draft.md`, registered it in the workbook manifest and canon, exposed it on `/israel-dossier/briefing`, indexed it in `llms.txt`, and extended verification to download and assert the draft text. Production commit `88c37c6` / deployment `deae3aa8-5a3b-4b81-9906-d26b67584574` passed all GitHub Actions workflows, live Markdown/manifest/LLM probes, behavior verification, and the focused primary live viewport matrix.

- **Israel dossier public briefing surface is source-boundary checked, prerendered, and live.**
  Impact: the populated workbook rows now have a reader-facing briefing route instead of remaining only downloadable files. The new surface keeps source-row IDs, status labels, procedural posture, unsafe-wording warnings, and open questions visible while moving the strongest rows into publishable prose.
  Resolution: added canonical briefing sections, routed `/israel-dossier/briefing`, linked it from `/israel-dossier`, added prerender/sitemap/LLM index coverage, wired bot metadata, and extended canon plus behavior verification. Production commit `c7ec930` / deployment `d2f7235f-89e6-472b-9385-d35e95c8b27d` passed all GitHub Actions workflows, live dossier behavior with briefing interaction, crawler route probes, sitemap/LLM/workbook probes, and the primary live viewport matrix.

- **Israel dossier populated workbook pack is source-checked, UI-wired, and live.**
  Impact: the dossier now has source-labeled working records rather than blank templates only: source ledger rows, aid-ledger entries, humanitarian attribution rows, incident evidence rows, legal-status rows, and a publishable briefing draft are bundled as public workbooks for editor/course reuse.
  Resolution: added populated artifacts under `/israel-dossier/workbooks/`, exposed them in the `/israel-dossier` Evidence Workbooks section, linked the workbook manifest from `llms.txt`, and extended canon, behavior, source-link, and visual verification to cover the pack. Production commit `ea4c1a0` / deployment `5d1991c6-2a23-4cff-af28-8dd85335484e` passed all GitHub Actions workflows, live dossier behavior with populated-workbook download assertion, direct static workbook/template probes, and the primary live viewport matrix.

- **Israel dossier editor templates are source-checked, UI-wired, and live.**
  Impact: the course path now has usable artifacts instead of instruction-only modules: source ledger, aid ledger, humanitarian attribution table, incident evidence matrix, legal-status brief, and publishable briefing outline.
  Resolution: added static templates under `/israel-dossier/templates/`, attached each artifact to canonical course modules, exposed downloads on `/israel-dossier`, added the template manifest to `llms.txt`, updated the generated dossier PDF with artifact labels, and extended source-link verification to scan public template files. Production commit `b205bd8f9214` / deployment `21a42519-8209-4356-a8a4-abaf6c34879e` passed all GitHub Actions workflows, live dossier behavior with template-download assertion, direct static template probes, and the primary viewport matrix.

- **Israel dossier course path is source-backed, verification-guarded, and live.**
  Impact: the dossier now has a reusable training layer instead of only a reading surface: source-file building, aid-ledger auditing, humanitarian figure attribution, incident evidence testing, legal-record reading, and publishable briefing work are all linked to canonical source anchors and corresponding Institute course/guide routes.
  Resolution: added `ISRAEL_DOSSIER_COURSE_PATH`, rendered it on `/israel-dossier`, exported it into the dossier PDF, added six Institute topics with source-safe course/guide copy, regenerated sitemap and `veritas-institute.md`, and extended canon plus behavior verification to cover the course path, module interaction, Institute links, and generated PDF text. Production commit `49a19b627432` / deployment `93e4009b-800a-4735-b015-03d740de41ee` passed live behavior verification, the primary viewport matrix, all twelve new Institute route probes, sitemap checks, and all GitHub Actions workflows.

- **Israel dossier verification is now CI-backed and live-behavior verified.**
  Impact: the dossier canon, source-link graph, production build, reader bundle, local rendered behavior, crawler metadata, preview images, carousel export, PDF export/text content, source workbench, money trail, and Chapter 15 public preview now have automated verification instead of relying on manual operator runs.
  Resolution: added `.github/workflows/verify-israel-dossier.yml`, pinned Playwright in `package.json`, added crawler/PDF assertions to `scripts/verify-israel-dossier-behavior.mjs`, stabilized CI source-link checking with archive-backed, restricted-host, and transient/retry-limited classification, split runtime and source-link jobs so external source checks cannot hide rendered dossier regressions, and added `.claude-state/source-link-trends.*` artifacts for run-over-run source drift. GitHub Actions run `24771280086` passed on commit `98f320f` with runtime verification plus source-link trend artifacts; the source graph had 448 unique URLs, 0 missing, 0 failed, 0 invalid, and 0 transient blockers.

- **Route-canon drift around `/about` and `/content-packs` is closed locally.**
  Impact: trust links and verification memory no longer point at dead routes in the local product map; `/about` is now a real trust surface again, and `/content-packs` resolves to the canonical content-pack surface instead of 404 drift.
  Resolution: rewrote `src/pages/AboutPage.tsx` with truthful publication copy, wired `/about` into `src/App.tsx`, added `/about` to `scripts/prerender.mjs`, and added a compatibility alias from `/content-packs` to `/content-pack`.


## Recently Closed (2026-07-16 — PDF cache + client errors)

- **Stable-name PDF immutable cache bug fixed and live.**
  Impact: `/veritas-institute-field-manual.pdf` no longer returns `max-age=31536000, immutable`, which would pin readers to a year-old PDF after content updates.
  Resolution: `server.js` setHeaders marks `*.pdf` as `public, max-age=3600, must-revalidate`; platform health asserts non-immutable. Live on `d734137`.

- **Replica client-error counters are live on release health.**
  Impact: operators see intake count + last message from `/api/health` and the analytics Release Health panel without Sentry.
  Resolution: in-memory counters on `/api/client-error` intake, surfaced in health payload and AnalyticsPage.


## Recently Closed (2026-07-16 — auth TTL + health transitions)

- **Access-token lifetime shortened 30d → 7d and live.**
  Impact: new sessions expire in one week instead of a month, reducing the window for stolen tokens while preserving weekly return reading.
  Resolution: JWT_EXPIRY/SESSION_TTL_MS in server-auth; status fields on /api/auth/status. Live-verified accessTokenTtl=7d.

- **Health history deploy transitions are operator-visible and live.**
  Impact: /api/health/history exposes commitTransitions and uniqueCommits; samples force-write on commit/status/failure changes and process boot; analytics Release Health renders the timeline.
  Resolution: server.js history + AnalyticsPage UI + verify:health-transitions.


## Recently Closed (2026-07-16 — session refresh + search engagement)

- **Silent session refresh is live.**
  Impact: readers stay signed in across the 7-day TTL without re-entering credentials; refresh rotates tokens and invalidates the previous session row (single-use).
  Resolution: POST /api/auth/refresh, client refreshSession/shouldRefreshSession, auth smoke rotation proof, unique JWT jti.

- **Search engagement personalization is live.**
  Impact: recently read chapters receive a modest ranking boost without displacing title/source relevance.
  Resolution: recent= query param, +18 score, SearchPage reading-history wiring, verify:search boost assertion.

## Recently Closed (2026-07-16 — a11y shell + auth validation + archive pins)

- **Invalid-email register hole closed and live.**
  Impact: `/api/auth/register` previously accepted bare tokens like `not-an-email` (201 + session). Now returns 400 with no token; login also validates email shape and password max length; display names strip control characters.
  Resolution: `isValidEmail` + bounds in `server-auth.js`; auth smoke covers bad-login and invalid-email. Live tip `e5e5a51` / `0845489` verified with `verify:auth` PASS and curl proof (`400 Please enter a valid email address`).

- **43 archive pins live (floor 40).**
  Impact: NTSB, Fed H.15, FAA, HRW, Amnesty, CPJ, UNRWA, DOJ, NTSB investigations join CISA/NIST/FiscalData/SCOTUS and dossier pins; Lancet remains explicit lookup-only until Wayback captures the Langlo article.
  Resolution: `briefing-source-archive-manifest.json` + raised floors. Live pin count **43** on tip `11775a1`+.

- **Public 44px touch-target wave complete across reader surfaces.**
  Impact: Shell, modals, news, search, membership, home, topics, forum, dossier, donation, continue-reading, institute pills, and chapter share controls meet 44px minimum hit areas.
  Resolution: incremental commits `4ed5161` → `62550a8`. Platform asserts four sourced news routes.


## Recently Closed (2026-07-16 — ocean continuation wave)

- **llms investigations section live.** Deep-state + forum indexed for AI crawlers; crawler floors require them in sitemap and llms needles. Tip `c27bb72`/`b287aa4`.
- **45 archive pins (floor 45).** DocumentCloud Epstein manifests + CourtListener Giuffre parties; floors raised through 45.
- **verify:auth-validation pure suite** in `verify:live`; short-password register rejected.
- **Public 44px wave** extended to deep-state, forum, dossier footer, dispute form, terms/privacy, breadcrumbs across shells.


- **Auth returnTo open-redirect hole closed.**
  Impact: post-login navigation no longer accepts protocol-relative or absolute URLs from sessionStorage intent.
  Resolution: `sanitizeReturnTo` in AuthContext + pure suite asserts. Tip ships with verify:auth-validation.

## Critical

- **Third-party paging (Sentry cloud) is still optional.**
  Impact: client errors now reach structured Railway logs via `/api/client-error` and optional volume NDJSON, but there is still no external pager/email until a Sentry DSN or similar is configured.
  Recommendation: if out-of-band paging is required, set a Sentry DSN (or equivalent) on top of the native client-error intake.


## Recently Closed (2026-07-16 — field manual PDF)

- **Build-time Veritas Institute Field Manual PDF is live.**
  Impact: `/veritas-institute-field-manual.pdf` is a durable 60-page static asset (application/pdf) generated at postbuild, indexed in `llms.txt`, preferred by the book download control, and reported on `/api/health` as `instituteFieldManualPdf`.
  Resolution: `scripts/generate-institute-field-manual-pdf.mjs`, postbuild wiring, InstituteBookPDF static-first download, platform health HEAD check. Production commit `3cfe939` verified with platform PASS.

- **Membership checkout UTM attribution is live.**
  Impact: first/last-touch UTM+ref capture, Stripe `client_reference_id` stamps, and checkout analytics attribution properties on membership CTAs.
  Resolution: `src/lib/conversionTracking.ts` + MembershipPage wiring + `verify:checkout-attribution`.

## Recently Closed (2026-07-16 continued)

- **Native client error intake is live.**
  Impact: ErrorBoundary and global window error/rejection handlers report to `/api/client-error` with rate limiting and structured `[monitor]` logs (and optional volume persistence).
  Resolution: `src/lib/clientErrorReporting.ts`, ErrorBoundary/main wiring, and Express intake route.

- **Additional briefing archive pins landed.**
  Impact: Forensic Architecture Hind Rajab and OCHA Mar 2025 response update now carry exact Wayback snapshots (14/16 briefing source URLs pinned).

## Recently Closed (2026-07-16)

- **Operator-visible release health probe is live in code.**
  Impact: `/api/health` returns commit, chapter count, prerender coverage, analytics lifetime, and per-check status (200 ok / 503 degraded). `/analytics` now surfaces a Release Health panel. Platform health verification asserts the probe.
  Resolution: added `/api/health` in `server.js`, Release Health panel on `AnalyticsPage`, and `/api/health` checks in `scripts/verify-platform-health.mjs`.

- **GitHub Actions Node 20 action-runtime deprecation posture upgraded.**
  Impact: all nine verification workflows now pin `node-version: '24'` and set `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` so the June/September 2026 Node 20 action-runtime deprecation does not silently age out the verification fleet.
  Resolution: updated every workflow under `.github/workflows/`.

- **Dead ContentPacksPage dual-route drift is closed.**
  Impact: brand kit and content packs now live on one canon (`/content-pack`); `/content-packs` remains a redirect alias.
  Resolution: merged Brand Assets + Usage Guidelines into `ContentPackPage.tsx` and deleted `ContentPacksPage.tsx`.

- **Public briefing source archive pins are published.**
  Impact: 11 briefing source URLs now carry exact Wayback snapshot URLs instead of wildcard lookups; a machine-readable manifest is public for editors and verifiers.
  Resolution: `PINNED_BRIEFING_ARCHIVES` in `israelDossierCanon.ts` plus `public/israel-dossier/workbooks/briefing-source-archive-manifest.json`.

## Emerging

- **The Veritas Institute manual export now has a durable build-time PDF** at `/veritas-institute-field-manual.pdf`, with client-side generation retained only as a fallback when the static asset is absent (local dev).

- **The Veritas Institute catalog is code-authored, not editor-authored.**
  Impact: the new learning vertical can scale fast in the repo, but long-term editorial expansion will bottleneck on code changes instead of structured publishing workflows.
  Recommendation: once the information architecture is validated, introduce a structured authoring system or content model for courses, guides, and manual sections.

## Recently Closed (2026-07-16 — a11y ocean wave + floors)

- **Public 44px wave expanded and floor-gated.** Home/dossier/forum/deep-state sources, chapter actions, /read chrome, about key routes, profiles, language picker, cookie privacy, breadcrumbs, error recovery, admin shell/media/content/disputes, RecordTabs.
- **verify:a11y-public-targets** pure scanner in `verify:live` with per-surface floors so the wave cannot silently regress.
- Interval-shipped tips through `a4e73a5` / `b14c5cd` / `1c4fea6` / `ec05960` / `47dc991` with full live green on successive deploys.

## Recently Closed (2026-07-16 — admin a11y + security headers)

- **Admin shell 44px complete.** Layout nav, dashboard CTAs, media/content filters, social packs/hub, disputes, users, subscriptions, login form fields all meet 44px.
- **Public a11y wave closed residual p-0.5 forum list votes** and claim share; pure floors + p-0.5 ban on core pages.
- **verify:security-headers** in verify:live (HSTS/XFO/nosniff/referrer/permissions/XSS + X-Veritas-Commit).
- **Express X-Powered-By disabled** live; fingerprinting closed.
- **Crawler floors** require `/profiles` and `/analytics`.

## Recently Closed (2026-07-16 — TLD email + 13-step verify:live)

- **Email TLD floor ≥2 chars live** (`ff8886b`). `a@b.c` register returns 400.
- **verify:live is now 13 steps**: + a11y floors + security-headers + server-security-invariants.
- **Admin + public + footer 44px wave complete** with pure floors (40 surfaces / 313 markers).

## Recently Closed (2026-07-16 — wave 2)

- **Home TOC nested-link bug fixed.** Keyword topic chips no longer nest inside chapter Links; pure `verify:home-toc-structure` locks the invariant.
- **X-Permitted-Cross-Domain-Policies: none** live with pure+live header suites (7 baseline headers).
- **Residual sub-44 min-h (40/42) eliminated** on news/article/chapter/dossier; pure ban on 30–43px tokens for core pages.
- **AIPAC diagram + Bernie show** interactive controls 44px.
- **Institute footer** 44px columns.
- **verify:live = 14 steps** (a11y floors, security-headers, server invariants, home-toc).

## Recently Closed (2026-07-16 — security.txt masterpiece)

- **RFC 9116 security.txt is live and verify-gated.**
  Impact: researchers and automated scanners can discover `/.well-known/security.txt` with Contact, Expires, Canonical, and Privacy policy links. Root `/security.txt` also 200s.
  Resolution: Express in-process fallback (Vite/deploy skipped hidden `public/.well-known`); dual public files; Privacy link; robots Allow; live verify:security-headers asserts body. Tip `34e9a94` 15-step green.

## Recently Closed (2026-07-16 — GEO generator lock)

- **llms.txt security disclosure survives postbuild.**
  Impact: AI crawlers discover RFC 9116 security.txt via llms.txt; hand-edits no longer wiped by prerender.
  Resolution: `renderLlmsTxt` emits Security disclosure; pure suite asserts generator + robots + files. Live tip `5bda159`.

## Recently Closed (2026-07-16 — ocean rate-limit + trust-proxy wave)

- **Rate-limit counter isolation fixed.** Limiters previously shared one IP key; analytics traffic could exhaust auth budgets. Keys are now `name:ip` with 22 named scopes. Pure floors lock isolation.
- **Express trust proxy enabled** for Railway single-hop X-Forwarded-*.
- **JSON body capped at 64kb** (413 on oversized POST); client-error keeps 16kb.
- **Permissions-Policy tightened** (display-capture/sensors denied; clipboard-write=(self) for copy CTAs).
- **Dead `serve` package removed**; package.json hygiene pure-locked.
- **PDF download rate limits** (Record + Field Manual) at 90/min with multi-agent headroom.
- **Residual public 44px** forum flair/awards, dossier carousel, deep-state, profiles, sources, Bernie, Read paths; pure bans expanded; 460 markers / 52 surfaces.

## Recently Closed (2026-07-16 — deploy + security ocean)

- **Railway postbuild restored after engines.node floor regression.**
  Impact: every deploy after `b8d840e` failed on `node: bad option: --experimental-strip-types` because railpack selected Node 20.20.2 for `engines.node: >=20`.
  Resolution: require `>=22.6.0`, pin `.node-version` 22.14.0, route PDF/TS scripts through `run-with-strip-types.mjs`. Live tip `1626660` SUCCESS + 15-step green.

- **CORP same-site + DNS-prefetch off + RateLimit headers live.**
  Impact: cross-site resource isolation, no opportunistic third-party DNS prefetch, clients see limiter budgets.
  Resolution: Express security middleware + rateLimit header emission; pure + live header suites (11 baseline).

- **Synthetic client-error probes no longer pollute operator counters.**
  Impact: platform-health probes return 204 without incrementing intake count, lastMessage, NDJSON, or Sentry.
  Resolution: early return for `platform-health probe` / `verify:platform` source.

- **Public a11y floors expanded to conversion surfaces.**
  Impact: MethodologyPage, DownloadModal, DonationBanner, DisputeStory, ContentGate, ExitIntent, NewsletterSignup floor-gated; residual floors raised toward measured counts (60 surfaces / 506 markers).


## Recently Closed (2026-07-16 — CSP frame-ancestors + password floor 8 + a11y residual)

- **HTTP Content-Security-Policy with frame-ancestors is live (13 baseline headers).**
  Impact: clickjacking defense is now enforced via HTTP (meta CSP cannot carry frame-ancestors). Meta CSP also carries worker-src/manifest-src/media-src and upgrade-insecure-requests. Topics API denied via browsing-topics=().
  Resolution: tips `0db6fb3` → pure+live header suite; verify:security-headers 13 baseline PASS on tip `3e1f119`.

- **Password floor raised 6 → 8 characters and live.**
  Impact: register and change-password reject 7-character passwords; AuthModal mirrors the floor. Live curl proof + verify:auth 7-char reject step.
  Resolution: tip `6461238` 15-step green.

- **DeepState filters + Forum compose 44px residual closed.**
  Impact: search/category controls and forum title/link/body/poll-option inputs meet WCAG 2.5.5 target size.
  Resolution: tip `3e1f119`; pure floors Forum 57 / DeepState 17 (531 markers / 69 surfaces).


## Recently Closed (2026-07-16 — anti-enum + admin noindex)

- **Login email enumeration closed and live.**
  Impact: missing accounts and wrong passwords both return `Invalid email or password.`; dummy bcrypt compare on misses equalizes timing.
  Resolution: tip `3b9d2ed` 15-step green with auth smoke assert.

- **Admin console de-indexed (robots + header).**
  Impact: `Disallow: /admin` in robots.txt and `X-Robots-Tag: noindex, nofollow` on `/admin` SPA shell responses.
  Resolution: tips `5423b8c` + `cbd9729`; live security-headers asserts admin tag.

- **security.txt Cache-Control must-revalidate live.**
  Impact: RFC 9116 updates revalidate within one hour.
  Resolution: tip `f1def06`.


## Recently Closed (2026-07-16 — ocean CSP/auth/CORS/a11y wave complete)

- **HTTP CSP frame-ancestors + Topics denial + meta hardening (13 headers).** Tips `0db6fb3`+.
- **Password floor 8** with 7-char reject live. Tip `6461238`.
- **Login + register anti-enumeration** with dummy bcrypt work. Tips `3b9d2ed` / `3cadc01`.
- **Admin de-index**: robots Disallow + X-Robots-Tag. Tips `5423b8c` / `cbd9729`.
- **security.txt must-revalidate**. Tip `f1def06`.
- **CORS Vary / Max-Age 600 / Expose RateLimit**. Tips `39e33ad` / `3277c22`.
- **Public a11y residual**: DeepState, Forum, Topics, Analytics, Institute catalog/course/guide/book/methodology — 71 surfaces / 548 markers.
- **Sitemap + prerender pure-lock exclude /admin**.
- **AuthModal TLD ≥2 parity** with server. Tip `18356a0`.

## External residual (2026-07-16)

- **GitHub Actions runners are not allocating (jobs fail in ~2s with empty steps).**
  Impact: all `verify-*` workflows report `failure` with `runner_id: 0` and zero steps — not a product regression. Railway is the production deploy path and is green after the Node 22.6 engines fix.
  Recommendation: restore GitHub Actions minutes/billing or self-hosted runners; local `npm run verify:live` + Railway remain the release gate.

## Recently Closed (2026-07-16 — ocean tip 7316998)

- **Structured 429 JSON with named limiter scope is live.**
  Impact: multi-agent fleets and clients can see which rate-limit scope fired (`auth-login`, `field-manual-pdf`, etc.) plus limit/remaining/reset.
  Resolution: rateLimit middleware 429 body; pure-locked. Tip `7316998` 15-step green.

- **Node runtime diagnostics closed loop live.**
  Impact: `/api/health`, `/api/build-info`, and `/analytics` all expose runtime Node + engines floor so the strip-types deploy class is operator-visible.
  Resolution: tips `b15a00c` → `d7ffe48` → `d83ff5f` → `45fb992`.

## Recently Closed (2026-07-16 — tip ef4e527)

- **X-Download-Options: noopen live (12 baseline header suite).**
  Impact: legacy IE/Edge cannot open HTML downloads as same-origin documents; security-headers pure+live suite now asserts 12 baseline headers.
  Resolution: Express security middleware + pure/live locks. Tip `ef4e527` 15-step green.

## Recently Closed (2026-07-16 — tip ed0b9b9)

- **JWT algorithm pinned to HS256 on sign and verify.**
  Impact: Bearer tokens reject alg=none and algorithm-confusion vectors; sessions continue to rotate with unique jti.
  Resolution: server-auth mintAccessToken + authenticateToken options; pure suite locks both. Tip `ed0b9b9` auth smoke 15-step green.


## Closed 2026-07-23
- Integrity densify floor: all 96 profiles n≥3 dual-cite (live)
- OSINT product CTA surfaces: home + profiles index
