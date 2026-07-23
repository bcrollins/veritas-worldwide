# OPSEC, Privacy, and Operator Anonymity Checklist

**Entity:** Veritas Worldwide · **Internal operator reference:** BR only  
**Public attribution:** Veritas Worldwide / rights@veritasworldwide.com  

## Closed in-repo (this series)

| Item | Status |
|------|--------|
| Client admin personal email / plaintext password | Scrubbed; entity email; env hash |
| Public GitHub personal namespace sameAs/footer | Removed |
| BibTeX personal key | `veritas*` |
| Analytics client modules operator identity strings | `verify:analytics-privacy` |
| ROC public package entity-only | PASS |
| Public raster EXIF strip tool | `scripts/strip-public-exif.mjs` |

## Operator / infrastructure (cannot finish in git alone)

| Item | Action |
|------|--------|
| `VITE_ADMIN_PASSWORD_HASH` | Set on Railway; rotate any historically exposed password |
| Domain WHOIS | Confirm privacy/proxy registration; entity registrant only |
| GitHub remote | Prefer org-owned private repo; no personal handle in public links |
| Git author history | Future commits entity identity; history rewrite only with coordinated freeze |
| Railway / billing KYC | Entity billing where available |
| Server logs | Retain minimally; no operator personal identifiers in log formats; access-controlled |
| Bernie Show surface | Product page for a named public figure; treat as separate brand risk if surname correlation is a concern — policy: keep isolated routes, no cross-link from ROC to personal family narratives |

## Server log retention (recommended defaults)

- Access logs: ≤ 14–30 days unless legal hold  
- Error logs: scrub query params that could hold emails  
- No `console.log` of auth tokens or admin session emails in production builds  

## Analytics privacy posture

- Prefer first-party `/api/analytics/*` + privacy-preserving GA4 Consent Mode  
- Never send operator real name, personal email, or home location as event properties  
- Page paths and aggregate counts only  

## WHOIS / domain checklist (manual)

- [ ] WHOIS privacy enabled  
- [ ] Registrant org = Veritas Worldwide (or privacy service)  
- [ ] Admin/tech contacts = entity mailboxes only  
- [ ] DNS host does not publish personal account handles publicly  


## Continuous verification

- `npm run verify:live-anonymity` — live HTML + corpus must not contain personal identity strings; sameAs entity-only; claimCount floor tracks corpus growth.
- `npm run verify:seo-meta` — forbids `bcrollins` in organization sameAs sources.
