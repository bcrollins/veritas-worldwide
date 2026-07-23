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
npm run verify:live-bot-noindex  # post-deploy Googlebot transactional/admin noindex
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
| `/search` | robots Disallow + meta `noindex` (prerender + bot-meta) |
| `/admin` | robots Disallow + bot-meta `sendNoindexShell` + SPA X-Robots |
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


## Live verification log (agent)

| When (UTC) | Tip commit | Result |
| 2026-07-23 ~09:52 | soft-404 matrix | junk chapter/profile/news/topic/institute → 404; known paths 200; admin+subscribe noindex; live-bot-noindex 9/9 |
| --- | --- | --- |
| 2026-07-23 ~09:41 | `78b8656` | Unknown chapter soft-404 LIVE; admin noindex; bot-noindex 9/9 |

### Production soft-404 matrix (verified live)

All Googlebot checks PASS on tip lineage including soft-404 gates:

- Junk: `/chapter/*` `/profile/*` `/news/*` `/topics/*` `/institute/courses|guides/*` → **404 + noindex**
- Known content: chapter-1, ted-cruz, historical-jesus-evidence → **200 + indexable titles**
- Noindex surfaces: admin, subscribe/success, search, bookmarks, bernie → **200 + noindex**
- Regression: `npm run verify:live-bot-noindex` + `npm run verify:soft-404-gates`


### wave28 soft-404 production lock (2026-07-23)

Live tip lineage verified with:
- ROC corpus **354** claims (soft anonymity floor 354)
- Googlebot soft-404 matrix: junk chapter/profile/news/topic/institute → **404 noindex**
- Known content 200 + indexable titles; admin/success/search/bookmarks/bernie **noindex**
- Pure: `verify:seo-meta`, `verify:soft-404-gates`
- Live: `verify:live-bot-noindex`, `verify:live-anonymity`


### wave29 soft-404 production lock (2026-07-23)

- ROC corpus **363** claims live; soft anonymity floor **363**
- Googlebot soft-404 matrix still green (junk dynamic prefixes → 404+noindex)
- Known content 200+index; transactional/admin/search/bookmarks/bernie noindex
- Pure + live gates: `verify:seo-meta`, `verify:soft-404-gates`, `verify:live-bot-noindex`, `verify:live-anonymity`


### wave30 soft-404 production lock (2026-07-23)

- ROC corpus **372** claims live; soft anonymity floor **372**
- Googlebot soft-404 matrix still **100% green** (all junk dynamic prefixes → 404+noindex)
- Known content 200+index; admin/success/search/bookmarks/bernie noindex
- Pure + live: `verify:seo-meta`, `verify:soft-404-gates`, `verify:live-bot-noindex`, `verify:live-anonymity`


### Slug canonical redirects (2026-07-23)

- Mixed-case public content paths → **301** lowercase (`/Profile/Ted-Cruz` → `/profile/ted-cruz`)
- Trailing-slash public content paths → **301** slashless (`/profile/ted-cruz/` → `/profile/ted-cruz`)
- Soft-404 allowlist lookups are case-insensitive (`isKnown*Slug`)
- Pure: `verify:soft-404-gates` case suite; live: `verify:live-bot-noindex` trailing-slash junk


### wave33 soft-404 + slug 301 production lock (2026-07-23)

- Soft-404 matrix still green for junk dynamic prefixes
- **301 live:** `/profile/Ted-Cruz` → `/profile/ted-cruz`
- **301 live:** `/profile/ted-cruz/` → `/profile/ted-cruz`
- Soft anonymity floor tracks wave33 (399); GEO public copy 400+
- Pure + live: `verify:seo-meta`, `verify:soft-404-gates`, `verify:live-bot-noindex`


### wave35 production SEO lock (2026-07-23)

Verified live Googlebot matrix:

| Request | Result |
| --- | --- |
| Junk dynamic prefixes | **404 + noindex** |
| `/profile/Ted-Cruz` | **301** → `/profile/ted-cruz` |
| `/profile/ted-cruz/` | **301** → `/profile/ted-cruz` |
| `/CHAPTER/CHAPTER-1` | **301** → `/chapter/chapter-1` |
| Known content | **200 + index,follow** |
| admin / success / search / bookmarks / bernie | **200 + noindex** |

ROC corpus **417** claims; soft floor **417**. Pure + live gates green.


### wave36/37 SEO production (2026-07-23)

- Soft-404 matrix + slug 301s still **live green** (junk 404; Ted-Cruz/CHAPTER/trailing-slash 301)
- Soft floor tracks latest ROC wave (435 for wave37); GEO public floors 440+
- Live regression: `verify:live-bot-noindex` includes soft-404 matrix **and** 301 canonical checks


### wave38–42 crawl canonicalization (2026-07-23)

- Soft floor tracks latest ROC wave; GEO public floors track wave public copy
- **301 lock expanded:** mixed-case exact hubs (`/About` → `/about`, `/Read` → `/read`)
- **301 lock expanded:** trailing-slash exact hubs (`/methodology/` → `/methodology`)
- **Alias lock:** `/content-packs` + `/share` → `/content-pack`; `/brand-kit` → `/media-kit` (kills dual-index + redirect loop)
- **404 hygiene:** soft-404 shells omit `rel=canonical` (no invented `/404` URL); noindex + X-Robots only
- Slug-prefix 301s unchanged (profile/chapter/news/topics/institute)
- Pure: `verify:seo-meta` + `verify:soft-404-gates`; live: `verify:live-bot-noindex` (About/Read/content-packs/share/brand-kit 301s)
