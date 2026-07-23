# SEO Scorecard — 2026 Q3 snapshot

**Date:** 2026-07-23  
**Tip at snapshot:** `fdeb105` (hub ItemLists) + soft-404 bot-meta fix `74cff50`  
**Runbook:** `docs/SEO-OPS-SCORECARD.md`  
**Audit:** `docs/SEO-AUDIT-50.md`

## Live smoke (this session)

| Check | Result |
|-------|--------|
| Unknown path HTTP status | **404** |
| Homepage Primary Sources title/desc | **PASS** |
| Homepage SearchAction + max-image-preview | **PASS** |
| About FAQPage (`What is Veritas Worldwide?`) | **PASS** |
| Methodology FAQPage + BreadcrumbList | **PASS** |
| robots Sitemap + Disallow /search + /admin | **PASS** |
| Image sitemap `image:image` nodes | Present (count varies with build) |
| `npm run verify:seo-meta` | **PASS** |
| Googlebot UA on junk path | Expect **404** (soft-404 + bot-meta defer) |

## Shipped this session (SEO increments)

1. `b98b77d` — prerender homepage Primary Sources + SearchAction  
2. `1201b21` — About/Timeline/Read/Topics breadcrumbs + About FAQ + ops scorecard  
3. `41ab567` — Membership/MediaKit/DeepState/Bible/Accessibility breadcrumbs  
4. `fdeb105` — News + Profiles ItemList schemas  
5. Peer: `74cff50` — bot meta defers unknown paths so soft-404 reaches crawlers  
6. Peer: privacy scrub of personal GitHub from sameAs  

## Open (content-led Sprint 3 remainder)

- Profile densify wave (integrity dockets) — ongoing parallel agents  
- News article volume / weekly cadence  
- Archive pin floors when CDX allows  
- GSC manual: re-request homepage + about after this deploy  

## Notes

- Organization `sameAs` is entity-only (X + Reddit); no personal GitHub (P0 anonymity).  
- Do not regress soft-404 classifier or bot-meta unknown-path deferral.  
