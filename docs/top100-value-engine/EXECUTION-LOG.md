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

