# Top-100 Value Engine — Execution Log

**Session start:** 2026-07-23T11:26:35Z  
**Prompt:** v1.0 Veritas + Anonymity  
**Local tip at start:** b9e4f11  
**Live health at start:** 5a2fb3c  

## Anonymity audit checklist (every public ship)

- [ ] No personal names/emails/GH namespace in changed public HTML/JSON/txt  
- [ ] sameAs remains entity-only (X + Reddit)  
- [ ] Git author entity for this commit  
- [ ] `verify:live-anonymity` or pure identity suite green when network available  
- [ ] No new personal social profile URLs  

---

## Interval 1 — 2026-07-23 (ledger + P1 ship pack)

### Shipped items

| ID | Title | Status | Proof |
|----|-------|--------|-------|
| T100-meta | Truth Model + full 100-item ledger persisted | Implemented | `docs/top100-value-engine/TRUTH-MODEL.md`, `TOP-100-VALUE-LEDGER.md`, `ledger-status.json` |
| T100-001 | Harden live anonymity (Israel corpus + text cards) | Implemented | `scripts/verify-live-anonymity.mjs`, `public/israel-dossier/soft-floor.json` |
| T100-002 | Bernie quarantine coverage | Absorbed | Already in live-anonymity + X-Robots; paths retained |
| T100-003 | Entity git author forward gate | Implemented (soft) | `scripts/verify-git-author-forward.mjs`, `verify:git-author-forward` |
| T100-004 | Personal timeline tiers/tags/import/filter | Implemented | `src/pages/PersonalTimelinePage.tsx` |
| T100-005 | PrimarySourceLink archive-first | Implemented | `src/components/PrimarySourceLink.tsx` + SourcesPage wire |
| T100-009 | Analytics PII property strip | Implemented | `src/lib/analytics.ts` + verify-analytics-privacy |
| T100-011 | Researcher hub `/researcher` | Implemented | `src/pages/ResearcherHubPage.tsx` + App route |
| T100-018 | Evidence taxonomy JSON | Implemented | `scripts/export-evidence-taxonomy.mjs`, `public/evidence-taxonomy.json` |
| T100-019 | llms.txt researcher + taxonomy + floors | Implemented | `public/llms.txt` |
| T100-055 | Privacy researcher local tools section | Implemented | `src/pages/PrivacyPage.tsx` |
| T100-093 | Anonymity audit re-run template | Implemented | This EXECUTION-LOG |

### Anonymity audit (Interval 1)

| Check | Result |
|-------|--------|
| Entity-only public copy | PASS (rights@ / Veritas Worldwide only) |
| No personal GH/sameAs | PASS (no changes to sameAs) |
| Corpora identity scan gate expanded | PASS (code) |
| Git author this commit | Veritas Worldwide / rights@ |

### Deploy

- Pushed `9d58859` to `main` → Railway
- Commit author: Veritas Worldwide <rights@veritasworldwide.com>  
- Live verify after deploy: `npm run verify:live-anonymity`, curl `/evidence-taxonomy.json`, `/researcher`

### Remaining

- 100 − implemented/absorbed count still Pending  
- Infra Blocked: GH org transfer, git history rewrite, WHOIS/KYC  

---


## Interval 2 — 2026-07-23 trust chrome

| ID | Title | Status | Commit |
|----|-------|--------|--------|
| T100-007 | Volume I scholarly tier legend | Implemented | 48ec427 |
| T100-016 | Corrections CTA component | Implemented | 48ec427 |
| T100-017 | License card on exports | Implemented | 48ec427 |

Anonymity audit: entity-only mailto corrections@ / rights@ — PASS

## Interval 3 — 2026-07-23 soft-404 / pure gates

| ID | Title | Status | Commit |
|----|-------|--------|--------|
| T100-011 | Researcher hub live 200 (was soft-404) | Implemented | b408d3c |
| T100-035 | Sitemap exclusion pure gate | Implemented | b408d3c |
| T100-095 | package.json author entity gate | Implemented | b408d3c |
| T100-020 | Soft-404 researcher allowlist regression | Implemented | b408d3c |

Live proof (pre-b408 deploy): health 9d58859, evidence-taxonomy.json 200, publisher Veritas Worldwide.
/researcher soft-404 fixed in b408d3c (pending Railway).



## Interval 5–7 — 2026-07-23 researcher pack (`8706742`)

| IDs | Status |
|-----|--------|
| T100-006,042,037,038,014,010,052,072,092 | Implemented |
| T100-043 + many OPSEC pure items | Absorbed / Implemented |

## Interval 8 — rights, SW, share UTMs, briefing open questions

| IDs | Work |
|-----|------|
| T100-065 | Entity share UTMs |
| T100-056 | Terms machine corpora license |
| T100-047 | Media kit taxonomy JSON |
| T100-039 | Sources copy-link |
| T100-071 | SW never cache /admin |
| T100-067 | HubSpot field pure gate |
| T100-008 | Source URL shape pure gate |
| T100-089 | Briefing open questions top banner |



## Intervals 10–11 — bookmarks, print CSS, schema triples, corpus cache

- Bookmarks keyword filter (local)
- Print CSS hide nav/membership
- security.txt pure gate
- Israel money/legal/lobby schema triples pure
- corpus.json Cache-Control public max-age=300
- Ledger terminal ~100/100

## Interval — research pack productization (2026-07-23)

- Dual-write pack to dist/ (Railway static) + short cache + Content-Disposition
- Discovery: Home, Sources, Methodology, About, Media Kit, Content Pack, Membership FAQ, OSINT product page
- Platform health HEAD probes for pack/manifest
- Pure + live research-pack gates; VI index in ZIP
- Entity-only; coordinated with Israel densify peers (no thrash)

# Top-100 Wave 4 Execution Log

## Phase A Truth Model (2026-07-23)
- Live: researchPackZip/Manifest true, chapters 32, prerender ~685
- profiles 96 densify n≥3 96, weakHomepage 0
- Israel live ~855 (soft floor lag vs densify tip)
- ROC claims ~696
- OSINT checkoutReady true
- pure 44 PASS; live anonymity PASS; bot-noindex PASS
- Anonymity: entity-only; residual GH org + history scrub + Stripe portal + optional Sentry

## Phase B–C
- Ledger: `.claude-state/top100-value-ledger-2026-07-23-v4.json`
- Outline: `.claude-state/top100-value-ledger-2026-07-23-v4-OUTLINE.md`
- Counts: {'Implemented': 91, 'Pending': 2, 'Absorbed': 5, 'Blocked': 2}

## Phase D
- Non-operator items already shipped across continuous BOIL intervals (research-pack productization, OSINT a11y, densify peers, OPSEC noindex)
- No additional code ship required for Implemented/Absorbed ranks; operator Pending remain external

## Phase E residual
- #3 GH org transfer (operator)
- #4 git history scrub (operator + rewrite approval)
- #56 Sentry DSN optional (operator env)
- #60 Stripe portal branding (operator dashboard)

## Anonymity audits
- verify:identity-scrub PASS
- verify:live-anonymity PASS
- verify:git-author-forward PASS
- verify:package-entity PASS
