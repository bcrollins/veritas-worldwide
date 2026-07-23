# Anonymity Audit — Record of Jesus Christ

**Date:** 2026-07-23 (Intervals 1 + 9 re-audit)  
**Scope:** ROC artifacts + public identity vectors (entity-only)  

## Pass criteria

Sophisticated OSINT on public Veritas surfaces finds **zero recoverable path** to the real identity of the operator.

## Actions completed

| Vector | Severity | Action |
|--------|----------|--------|
| Client admin auth comments with personal email + plaintext password | P0 | Scrubbed; entity email only; password via env hash; fail-closed in prod |
| Public GitHub `sameAs` / footer link to personal namespace | P0 | Removed from `index.html`, `seo.ts` Organization + NewsMediaOrganization, `prerender.mjs`; live sameAs = X + Reddit only |
| verify-seo-meta regression | P0 | Inverted: **forbids** `bcrollins` / personal GH; requires entity social profiles |
| BibTeX citation key containing personal surname | P0 | Renamed `rollins…` → `veritas…` |
| Admin brand kit UI showing personal email | P0 | Entity-only display |
| ROC manuscript + platform content + wave6 | — | Entity attribution only; no personal byline |

## Residual risks (not fully closable in-repo alone)

| Vector | Notes | Recommended next action |
|--------|-------|-------------------------|
| GitHub remote org/user namespace | Hosting under a personal GH account remains an infrastructure OPSEC concern | Transfer repo to org-only identity; scrub git author history offline |
| Git commit author emails in history | Pre-2026-07-23 commits may still use personal author identity in history | Future commits: local `user.name=Veritas Worldwide` / `user.email=rights@veritasworldwide.com`. Offline `git filter-repo` for full history rewrite is a deliberate OPSEC project |
| WHOIS / Railway billing KYC | Outside this codebase | Confirm privacy registration + entity billing |
| Bernie Show page family branding | Product surface with shared surname | **Mitigated 2026-07-23:** server X-Robots-Tag + robots.txt Disallow + bot-meta/client noindex so crawlers cannot index the page; residual surname still in HTML body for intentional product branding |
| Password previously committed in git history | Rotate admin password; set `VITE_ADMIN_PASSWORD_HASH` | Required before relying on client admin |
| Ops/outreach docs with personal byline | Scrubbed 2026-07-23: entity-only in SEO ops scorecard + outreach templates; pure floors forbid personal byline | Keep entity-only; future commits use Veritas Worldwide git author |

## ROC-specific audit

- [x] No personal name in `recordOfJesusChrist.ts`  
- [x] No personal name in `RecordOfJesusChristPage.tsx`  
- [x] Publisher = Veritas Worldwide  
- [x] Contact = rights@veritasworldwide.com  
- [x] JSON-LD author = Organization  

## Interval re-audit (2026-07-23 Perfection Engine)

| Check | Result |
|--------|--------|
| Live HTML identity patterns (10 paths) | PASS |
| `/bernie` Googlebot noindex | LIVE (`x-robots-tag` + meta + robots Disallow) |
| Ops/outreach personal byline | SCRUBBED |
| Entity git author (future commits) | Veritas Worldwide / rights@ |
| Live-anonymity hard claim floor | 160 (catastrophe); soft 198 WARN on deploy lag |
| Comprehensive profile success | noindex client + robots Disallow + prerender noindex |

**Verdict this interval:** Public package **PASS**. Infrastructure residual risks (GH namespace, git history rewrite, WHOIS/KYC) remain documented.

## Interval 49 / Wave 46 anonymity checkpoint (2026-07-23)

- Live HTML multi-path scan: no `bcrollins`, no personal GH `sameAs` (entity-only X + Reddit).
- `verify-live-anonymity` PASS on identity suite (soft claim-floor WARN during Railway lag only).
- Commits authored as `Veritas Worldwide <rights@veritasworldwide.com>`.
- Residual operator infra (org GH transfer, admin password hash, full history rewrite) remains operator-owned.

