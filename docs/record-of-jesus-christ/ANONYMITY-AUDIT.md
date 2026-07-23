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
| Git commit author emails in history | Local git config may still use personal identity | `git filter-repo` / org bot identity for future commits |
| WHOIS / Railway billing KYC | Outside this codebase | Confirm privacy registration + entity billing |
| Bernie Show page family branding | Product surface with shared surname | Policy decision: retain as named public figure page vs isolate |
| Password previously committed in git history | Rotate admin password; set `VITE_ADMIN_PASSWORD_HASH` | Required before relying on client admin |

## ROC-specific audit

- [x] No personal name in `recordOfJesusChrist.ts`  
- [x] No personal name in `RecordOfJesusChristPage.tsx`  
- [x] Publisher = Veritas Worldwide  
- [x] Contact = rights@veritasworldwide.com  
- [x] JSON-LD author = Organization  

**Verdict this interval:** Public ROC package **PASS**. Infrastructure residual risks documented for continued hardening.
