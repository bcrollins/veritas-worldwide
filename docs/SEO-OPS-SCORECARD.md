# Veritas Worldwide — SEO Ops Scorecard & GSC Runbook

**Owner:** Veritas Worldwide (entity operator only — no personal byline)  
**Property:** https://veritasworldwide.com  
**Last updated:** 2026-07-23  
**Companion audit:** `docs/SEO-AUDIT-50.md`

---

## 1. Weekly Google Search Console checklist

1. **Coverage / Pages** — note new 404s, soft-404s, excluded by `noindex`.
2. **Sitemaps** — confirm `https://veritasworldwide.com/sitemap.xml` is **Success**; URL count ≥ prerender floor (~380+).
3. **Performance (28d)** — clicks, impressions, CTR, average position for:
   - `/` homepage
   - `/chapter/*`
   - `/profile/*`
   - `/israel-dossier`
   - `/topics/*`
   - `/methodology`, `/sources`
4. **Enhancements** — FAQ, Breadcrumbs, Article (if available) valid vs invalid.
5. **Manual actions / Security** — must stay **None**.
6. **URL Inspection** — re-request indexing after major content densify (homepage, new hub, densified profile).

### Submit / refresh sitemap
```
GSC → Sitemaps → https://veritasworldwide.com/sitemap.xml
```
Optional ping (informational only; GSC is source of truth):
```bash
curl -s "https://www.google.com/ping?sitemap=https://veritasworldwide.com/sitemap.xml"
```

---

## 2. Pure regression floors (run before every SEO ship)

```bash
cd ~/Code/veritas-worldwide
npm run verify:seo-meta
# Prefer full pure suite when time allows:
npm run verify:pure
```

Live smoke (post-deploy):
```bash
curl -sI https://veritasworldwide.com/not-a-real-path | head -1   # expect 404
curl -s https://veritasworldwide.com/ | rg -o 'Primary Sources|SearchAction|max-image-preview:large'
curl -s https://veritasworldwide.com/methodology | rg -o 'FAQPage|BreadcrumbList'
curl -s https://veritasworldwide.com/robots.txt | rg 'Sitemap:|Disallow: /search|Disallow: /admin'
curl -s https://veritasworldwide.com/sitemap.xml | rg -c 'image:image|</url>'
```

---

## 3. Quarterly scorecard (fill each quarter)

| Metric | Q_ baseline | Current | Target | Notes |
|--------|-------------|---------|--------|-------|
| Soft-404 rate (junk paths → 404) | ~0 | | 0 | Curl random paths |
| Indexed pages (GSC) | | | +5–15%/q | After densify waves |
| Homepage CTR (GSC 28d) | | | ≥ industry +1–2pp | Title/desc tests |
| FAQ rich results (valid) | Methodology, Sources, ROC | | +dossier +about | Rich Results Test |
| Archive pins | 77+ | | + pins when CDX allows | Trust moat |
| `verify:seo-meta` | PASS | PASS | Always PASS | Block merge if red |
| Pure suite count | 20+ | | Hold or raise | `verify:pure` |
| Core Web Vitals (mobile LCP) | | | LCP <2.5s | PSI field/lab |
| Image sitemap nodes | 100+ | | Hold | Prerender image:image |

### Scorecard file location
Store quarterly snapshots under:
```
.claude-state/seo-scorecard-YYYY-QN.md
```
(or append a dated section to this file).

---

## 4. Ship rhythm (SEO increments)

1. Finish logical chunk (metas, schema, prerender, pure floors).  
2. `npm run verify:seo-meta` green.  
3. Commit with `feat(seo):` / `fix(seo):` message.  
4. Push `main` (coordinate if other agents mid-push).  
5. Wait for Railway deploy; run live smoke above.  
6. Optionally URL Inspection for changed high-value URLs.

**Do not** batch unrelated densify + soft-404 classifier changes in one unreviewed bomb.

---

## 5. noindex inventory (must stay noindex)

| Path | Mechanism |
|------|-----------|
| `/admin/*` | robots + X-Robots-Tag |
| `/subscribe/success`, `/membership/success`, `/donation/success`, `/thank-you` | robots + meta |
| `/bookmarks` | robots + meta |
| `/search` | robots Disallow + meta `noindex,follow` |
| Unknown SPA paths | HTTP 404 + X-Robots-Tag |

---

## 6. High-value index targets

| Surface | Schema | Intent |
|---------|--------|--------|
| `/` | WebSite + Organization/NewsMediaOrganization | Brand + sitelinks |
| `/chapter/*` | NewsArticle + BreadcrumbList + speakable | Documentary long-tail |
| `/profile/*` | Person + BreadcrumbList | “Who is X” |
| `/topics/*` | CollectionPage + FAQ + ItemList | Hub-and-spoke |
| `/methodology`, `/sources`, `/about` | FAQPage + WebPage | Trust / PAA |
| `/israel-dossier` | NewsArticle + FAQ + BreadcrumbList | High-intent investigation |
| `/institute/guides/*` | HowTo + FAQ + Article | Practical long-tail |
| `/record-of-jesus-christ` | FAQ + Book/ItemList | Faith documentary cluster |

---

## 7. Backlink / citation ops

See `docs/BACKLINK-OUTREACH.md` for journalist outreach templates.  
Prefer citations to **pinned primary sources** and methodology, not homepage alone.

---

## 8. Definition of “done” for an SEO session

- [ ] Pure floors green  
- [ ] Changes committed + pushed  
- [ ] Live smoke matches expected titles/schemas  
- [ ] Audit doc / this scorecard updated if priorities shifted  
- [ ] No soft-404 regression  
- [ ] No accidental indexation of transactional URLs  
