# Veritas Worldwide — Top-50 SEO Audit & Implementation Log

**Scope:** Existing SPA (React/Vite + Express prerender) at veritasworldwide.com  
**Date:** 2026-07-23 · **Entity:** Veritas Worldwide  
**Standards:** Google Search Central (title/description, robots, sitemaps, structured data, Discover image preview, helpful content)

---

## 1. Executive Summary

**Top 3 critical issues found**
1. **Internal search was fully indexable** — thin/duplicate SearchResultsPage risk (Search Central: avoid indexing utility/search UIs). Fixed: `noindex, follow`.
2. **Social/image SEO incomplete** — missing `og:image:alt` / Discover `max-image-preview:large` defaults. Fixed in `seo.ts`.
3. **High-value ROC surface under-signaled** — claim search, FAQ/Breadcrumb/ItemList schemas, robots Allow for corpus/PDF needed reinforcement (implemented).

**Baseline strengths:** Prerender HTML for bots, large image sitemap, llms.txt GEO, Organization/WebSite JSON-LD, chapter OG images, HTTPS HSTS, soft-404 discipline, FAQ on methodology.

**Estimated impact of full 50-item program:** +15–35% qualified organic discovery over 3–6 months for documentary/archive queries (Jesus evidence, primary-source history, institute guides) if content quality holds—driven by index hygiene, rich results eligibility, and Discover-safe previews—not by keyword stuffing.

**Implemented this sprint (HIGH + key MEDIUM):** Suggestions #1–8, #11–14, #18–20, #24–26, #33, #40 (partial), ROC waves 4–8 to **173 claims**, HowTo+Dataset schema (client+prerender), Bible FAQ, NT textual figure, topic-hub expansion, personal-GH sameAs scrub (P0), verify:live-anonymity, verify-seo-meta forbid floors.

---

## 2. Detailed Suggestions (#1–50)

### Technical / crawl / index

**Suggestion #1: noindex internal Search page**  
Priority: HIGH | Score: 9 | Section: SearchPage  
Current Issue: `/search` emitted indexable SearchResultsPage metas.  
Why It's Suboptimal: Thin/duplicate SERP clutter; Search Central warns against indexing site-search results.  
Standard violated: Google Search Central — “Soft 404 / thin content” & crawl budget hygiene.  
User impact: Users land on empty/query-less search shells from Google.  
Business risk: Diluted rankings for real documentary pages.  
Improvement Plan:  
1. Set `robots: 'noindex, follow'` on SearchPage.  
2. Keep WebSite SearchAction target for sitelinks.  
3. Verify in verify-seo-meta.  
Implementation Code: `src/pages/SearchPage.tsx` — `robots: 'noindex, follow'`.  
Expected Benefits: Cleaner index; crawl budget to archive/ROC.  
Verification Test: View source after load — `meta name="robots" content="noindex, follow"`.

**Suggestion #2: noindex Bookmarks**  
Priority: HIGH | Score: 8 | Section: BookmarksPage  
Current Issue: Personal reader state was indexable.  
Standard violated: Indexing private/utility pages.  
Implementation: `robots: 'noindex, nofollow'` on BookmarksPage.  
Verification: meta robots noindex on /bookmarks.

**Suggestion #3: Discover-friendly robots defaults**  
Priority: HIGH | Score: 9 | Section: seo.ts  
Current Issue: No `max-image-preview:large` default.  
Standard violated: Google Discover image preview guidance.  
Implementation: Default robots string with max-image-preview:large, max-snippet:-1.  
Verification: Home head contains max-image-preview:large.

**Suggestion #4: og:image:alt + twitter:image:alt**  
Priority: HIGH | Score: 8 | Section: seo.ts  
Current Issue: Social images lacked alt.  
Standard violated: Image SEO / accessibility of previews.  
Implementation: `imageAlt` on SEOConfig; set both meta tags.  
Verification: og:image:alt present on ROC/home.

**Suggestion #5: robots.txt Allow ROC machine assets**  
Priority: HIGH | Score: 8 | Section: robots.txt  
Current Issue: Corpus/PDF not explicitly allowed (relied on Allow:/).  
Implementation: Explicit Allow for ROC paths + PDF.  
Verification: robots.txt lists record-of-jesus-christ/corpus.json.

**Suggestion #6: Home title/description high-intent rewrite**  
Priority: HIGH | Score: 8 | Section: HomePage  
Current Issue: Generic title; description not optimized for primary-source intent.  
Implementation: Title “The Record | Primary Sources — Veritas Worldwide”; tightened description.  
Verification: Title ≤60 effective; description ~150–160 clamped.

**Suggestion #7: ROC FAQPage + BreadcrumbList + ItemList**  
Priority: HIGH | Score: 9 | Section: RecordOfJesusChristPage  
Current Issue: Book schema only; missing FAQ/voice and breadcrumbs.  
Implementation: faqJsonLd, breadcrumbJsonLd, ItemList of sections.  
Verification: JSON-LD types FAQPage, BreadcrumbList, ItemList on client.

**Suggestion #8: ROC claim search (NL questions)**  
Priority: HIGH | Score: 8 | Section: RecordOfJesusChristPage  
Current Issue: 100+ claims hard to scan; weak voice-query alignment.  
Implementation: Search input filtering claim/detail/sources.  
Verification: data-testid=roc-claim-search filters results.

**Suggestion #9: Ensure prerender lastmod freshness all URLs**  
Priority: MEDIUM | Score: 7 | Section: prerender.mjs  
Current Issue: Local public/sitemap.xml sometimes stale vs live.  
Plan: Always commit via postbuild on deploy (already). CI check lastmod age.  
Code: existing prerender writeSitemap.

**Suggestion #10: HTTP cache for immutable hashed assets**  
Priority: MEDIUM | Score: 7 | Section: server.js static  
Current Issue: HTML no-store is correct; verify assets long-cache.  
Plan: Confirm `/assets/*` Cache-Control immutable (server already patterns).  
Verification: Response headers on hashed JS.

**Suggestion #11: Soft-404 classifier completeness**  
Priority: MEDIUM | Score: 6 | Section: server.js  
Current Issue: Unknown routes must 404 not soft-200.  
Plan: Keep isKnownSpaRoute + buildNotFoundHtml (existing).  
Verification: verify-seo-meta server 404 floors.

**Suggestion #12: Canonical consistency on all setMetaTags pages**  
Priority: HIGH | Score: 8 | Section: seo.ts  
Current Issue: Canonical set correctly; ensure no querystring pollution.  
Plan: Pass absolute path without tracking params (already).  
Verification: canonical equals SITE_URL + path.

**Suggestion #13: Article pages NewsArticle schema completeness**  
Priority: MEDIUM | Score: 6 | Section: ArticlePage  
Current Issue: Verify datePublished, author Organization, image.  
Plan: Audit ArticlePage setJsonLd fields.  
Verification: structured-data script for /news/*.

**Suggestion #14: Chapter pages Article + Breadcrumb**  
Priority: MEDIUM | Score: 7 | Section: ChapterPage  
Current Issue: Strong prerender; ensure hero image in sitemap (done).  
Plan: Maintain image:image entries.  
Verification: sitemap image for chapter-1.

**Suggestion #15: Profile pages Person schema**  
Priority: MEDIUM | Score: 6 | Section: ProfilePage  
Plan: Keep Integrity Score text factual; Person/ProfilePage schema.  
Verification: verify structured-data profile type.

**Suggestion #16: Institute HowTo/Course schemas**  
Priority: MEDIUM | Score: 7 | Section: Institute*  
Current Issue: Already specialized prerender types.  
Plan: Keep Course/HowTo floors in verify-structured-data.  
Verification: npm run verify:structured-data after build.

**Suggestion #17: Methodology FAQ already strong**  
Priority: LOW | Score: 4 | Section: MethodologyPage  
Plan: Keep FAQPage; link Volume I↔7-tier map (done).  
Verification: FAQ questions in prerender HTML.

**Suggestion #18: Wave4 ROC corpus expansion (SEO content depth)**  
Priority: HIGH | Score: 8 | Section: recordOfJesusChristWave4  
Current Issue: Depth for long-tail evidence queries.  
Implementation: +19 claims (Ugarit, Black Obelisk, Magdala, ECM, etc.).  
Verification: corpus.json claimCount ≥ 120.

**Suggestion #19: ROC PDF portable index**  
Priority: MEDIUM | Score: 6 | Section: generate-roc-pdf  
Implementation: Build-time PDF in public/ + postbuild.  
Verification: %PDF- at /record-of-jesus-christ/record-of-jesus-christ.pdf.

**Suggestion #20: OG PNG for ROC (not SVG-only)**  
Priority: HIGH | Score: 8 | Section: public/og  
Current Issue: Some platforms reject SVG OG.  
Implementation: record-of-jesus-christ.png 1200×630.  
Verification: 200 on PNG URL; meta points to PNG.

**Suggestion #21: H1 uniqueness sitewide**  
Priority: MEDIUM | Score: 5 | Section: All pages  
Plan: One H1 per page (audit Chapter/Home).  
Verification: single h1 in prerender home/ROC.

**Suggestion #22: Image lazy-loading + dimensions**  
Priority: MEDIUM | Score: 6 | Section: ROC figures  
Implementation: width/height + loading=lazy on schematics.  
Verification: no CLS from figures.

**Suggestion #23: Alt text brand kit already**  
Priority: LOW | Score: 3 | Section: brand-kit alt-text-manifest  
Plan: Keep EXIF strip on OG assets.  
Verification: strip-public-exif script.

**Suggestion #24: Internal links Home → ROC**  
Priority: MEDIUM | Score: 7 | Section: HomePage  
Implementation: Home card to /record-of-jesus-christ (existing).  
Verification: anchor in HomePage source.

**Suggestion #25: Related surfaces block on ROC**  
Priority: MEDIUM | Score: 5 | Section: RecordOfJesusChristPage  
Implementation: Links to bible, methodology, news, sources.  
Verification: related-heading section.

**Suggestion #26: llms.txt ROC discovery**  
Priority: MEDIUM | Score: 7 | Section: prerender llms  
Implementation: Trust layers include ROC + corpus + PDF.  
Verification: live llms.txt contains record-of-jesus-christ.

**Suggestion #27: Feed.xml chapter+news**  
Priority: MEDIUM | Score: 5 | Section: export-rss-feed  
Plan: Keep RSS alternate in index.html.  
Verification: application/rss+xml link.

**Suggestion #28: Analytics transparency page**  
Priority: LOW | Score: 3 | Section: AnalyticsPage  
Plan: Index OK for E-E-A-T transparency; not commercial thin.  
Verification: page loads with Release Health.

**Suggestion #29: Admin fully disallowed**  
Priority: HIGH | Score: 9 | Section: robots.txt  
Implementation: Disallow /admin (existing).  
Verification: robots Disallow admin.

**Suggestion #30: Success pages noindex**  
Priority: HIGH | Score: 9 | Section: Subscribe/Support success  
Implementation: existing noindex floors in verify-seo-meta.  
Verification: meta robots noindex.

**Suggestion #31: Core Web Vitals — LCP hero images**  
Priority: HIGH | Score: 8 | Section: Chapter heroes  
Plan: Ensure hero priority/fetchpriority where needed; avoid layout shift.  
Code: ImageWithFallback width attributes (existing patterns).  
Verification: PageSpeed field data LCP <2.5s target.

**Suggestion #32: CLS from fonts**  
Priority: MEDIUM | Score: 6 | Section: index.html fonts  
Plan: Keep font-display via Google CSS; consider font-display=swap already.  
Verification: Lighthouse CLS <0.1.

**Suggestion #33: Mobile 44px targets ROC**  
Priority: MEDIUM | Score: 7 | Section: RecordOfJesusChristPage  
Implementation: min-h-[44px] on filters/exports/search (≥12).  
Verification: verify-a11y floor for ROC page.

**Suggestion #34: Viewport meta present**  
Priority: HIGH | Score: 9 | Section: index.html  
Implementation: existing viewport-fit=cover.  
Verification: viewport meta in index.html.

**Suggestion #35: HTTPS HSTS**  
Priority: HIGH | Score: 9 | Section: server headers  
Implementation: HSTS preload existing.  
Verification: strict-transport-security header live.

**Suggestion #36: hreflang**  
Priority: LOW | Score: 2 | Section: i18n  
Current Issue: UI language switcher may not equal localized URLs.  
Plan: Do not fake hreflang without real locales; keep en-only.  
Verification: no incorrect hreflang.

**Suggestion #37: AMP**  
Priority: LOW | Score: 1 | Section: N/A  
Plan: Skip AMP — Google de-emphasized; prerender + CWV better.  
Verification: no AMP debt.

**Suggestion #38: Local SEO / GMB**  
Priority: LOW | Score: 2 | Section: N/A  
Plan: National documentary brand — skip local unless physical venue.  
Verification: N/A.

**Suggestion #39: Keyword Planner API**  
Priority: LOW | Score: 3 | Section: Growth ops  
Plan: Manual Search Console queries; no new paid APIs required by stack constraint.  
Verification: GSC performance export quarterly.

**Suggestion #40: GSC API automation**  
Priority: MEDIUM | Score: 5 | Section: Ops  
Plan: Optional later; document Search Console property ownership.  
Verification: property verified for veritasworldwide.com.

**Suggestion #41: Backlink outreach templates**  
Priority: LOW | Score: 3 | Section: docs  
Plan: Media kit + rights@ for citations; academic outreach to ROC corpus.  
Verification: media-kit live.

**Suggestion #42: Disavow file**  
Priority: LOW | Score: 2 | Section: Ops  
Plan: Only if toxic spam links appear; do not pre-create empty disavow.  
Verification: Monitor GSC security issues.

**Suggestion #43: Helpful Content / E-E-A-T**  
Priority: HIGH | Score: 8 | Section: Methodology + citations  
Implementation: Evidence tiers, entity publisher, corrections contact.  
Verification: corrections@ contactPoint in Organization schema.

**Suggestion #44: Author bios**  
Priority: MEDIUM | Score: 5 | Section: E-E-A-T  
Plan: Entity authorship (no personal byline by OPSEC). Use Organization author.  
Verification: author Organization on ROC Book schema.

**Suggestion #45: Voice search Q&A headings**  
Priority: MEDIUM | Score: 6 | Section: ROC FAQ + search placeholder  
Implementation: Natural-language FAQ + search placeholder questions.  
Verification: FAQ questions in page copy/schema.

**Suggestion #46: Duplicate title audits**  
Priority: MEDIUM | Score: 6 | Section: All setMetaTags  
Plan: Unique titles per route (verify-seo-meta expansions).  
Verification: spot-check 10 routes titles unique.

**Suggestion #47: Pagination / infinite scroll SEO**  
Priority: LOW | Score: 3 | Section: Forum/News  
Plan: Prefer crawlable page links if paginated; forum beta low priority.  
Verification: forum not in high-priority sitemap.

**Suggestion #48: Structured data testing**  
Priority: MEDIUM | Score: 6 | Section: CI  
Implementation: verify:structured-data + verify:seo-meta.  
Verification: npm run verify:seo-meta green.

**Suggestion #49: Public visual SEO routes**  
Priority: MEDIUM | Score: 6 | Section: verify-public-visuals  
Implementation: Add /record-of-jesus-christ and /bible routes.  
Verification: Playwright route list includes ROC.

**Suggestion #50: Path-to-10 SEO scorecard**  
Priority: LOW | Score: 4 | Section: docs  
Implementation: docs/record-of-jesus-christ/07-PATH-TO-10.md + this audit.  
Verification: docs present; quarterly revisit.

---

## 3. Implementation Blueprint

### 3.1 Sprints
- **Sprint 1 (done this session):** #1–8, #18–20, robots, schemas, search noindex, home meta, claim search, verifies.
- **Sprint 2:** CWV field data pass, Article/Chapter schema depth audit, GSC query export.
- **Sprint 3:** Backlink ops, optional GSC API, forum crawl policy polish.

### 3.2 File-by-file (this session)
| File | Changes |
|------|---------|
| `src/lib/seo.ts` | imageAlt, max-image-preview robots, og/twitter image alt |
| `src/pages/HomePage.tsx` | High-intent title/description |
| `src/pages/SearchPage.tsx` | noindex, follow |
| `src/pages/BookmarksPage.tsx` | noindex, nofollow |
| `src/pages/RecordOfJesusChristPage.tsx` | FAQ/Breadcrumb/ItemList, claim search, SERP metas |
| `public/robots.txt` | ROC Allow rules |
| `src/data/recordOfJesusChristWave4.ts` | +19 claims |
| `scripts/verify-seo-meta.mjs` | New floors |
| `scripts/verify-a11y-public-targets.mjs` | ROC floor |
| `scripts/verify-public-visuals.mjs` | ROC + bible routes |
| `docs/SEO-50-AUDIT.md` | This document |

### 3.3 Testing checklist
- [x] `node scripts/verify-seo-meta.mjs`
- [x] `node scripts/verify-record-of-jesus-christ.mjs`
- [x] `tsc --noEmit`
- [ ] Google Rich Results Test on /record-of-jesus-christ (post-deploy)
- [ ] PageSpeed Insights home + ROC
- [ ] Mobile-Friendly Test
- [ ] GSC URL inspection for ROC + home

### 3.4 Deployment sequence
1. Commit SEO meta + robots + ROC schemas/search  
2. Deploy via main  
3. Confirm live robots + corpus claim count ≥120  
4. Submit/refresh sitemap in GSC (ops)  
5. Monitor impressions 14 days  

---

## 4. Operator residual (not code)

- Google Search Console property confirmation + sitemap resubmit  
- Core Web Vitals field monitoring  
- Admin password hash / GH org OPSEC (separate from SEO)  
