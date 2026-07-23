#!/usr/bin/env node
/**
 * Pure SEO meta / robots / soft-404 regression floors.
 * Complements live crawler checks — no network required.
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function assert(c, m) {
  if (!c) {
    console.error(`[verify:seo-meta] FAIL — ${m}`)
    process.exit(1)
  }
}

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

const seo = read('src/lib/seo.ts')
assert(seo.includes('clampMetaDescription'), 'seo.ts must clamp meta descriptions')
assert(seo.includes('clampMetaTitle'), 'seo.ts must clamp OG titles')
assert(seo.includes("og:locale"), 'seo.ts must set og:locale')
assert(seo.includes('faqJsonLd'), 'seo.ts must export FAQPage helper')
assert(seo.includes('breadcrumbJsonLd'), 'seo.ts must export BreadcrumbList helper')
assert(seo.includes('organizationJsonLd'), 'seo.ts must export Organization helper')
assert(seo.includes('sameAs'), 'Organization schema must include sameAs for E-E-A-T')
assert(seo.includes('og:image:alt'), 'seo.ts must set og:image:alt for image SEO')
assert(seo.includes('max-image-preview:large'), 'seo.ts must set Discover-friendly robots max-image-preview')
assert(seo.includes('imageAlt'), 'SEOConfig must accept imageAlt')
assert(seo.includes('DEFAULT_TITLE'), 'seo.ts must define DEFAULT_TITLE aligned with index.html')
assert(seo.includes('DEFAULT_ROBOTS'), 'seo.ts must reset robots to Discover-friendly defaults')
assert(seo.includes('howToJsonLd'), 'seo.ts must export HowTo helper')
assert(seo.includes('personJsonLd'), 'seo.ts must export Person helper')
assert(seo.includes('speakable'), 'chapter NewsArticle must include speakable for voice SEO')

const robots = read('public/robots.txt')
assert(robots.includes('Sitemap: https://veritasworldwide.com/sitemap.xml'), 'robots must declare sitemap')
assert(robots.includes('Disallow: /admin'), 'robots must disallow admin')
assert(robots.includes('Disallow: /subscribe/success'), 'robots must disallow transactional success')
assert(robots.includes('Allow: /llms.txt'), 'robots must allow llms.txt for GEO/AI crawlers')
assert(robots.includes('GPTBot') || robots.includes('ClaudeBot'), 'robots should address AI crawlers')
assert(robots.includes('record-of-jesus-christ/corpus.json'), 'robots must allow ROC machine corpus')
assert(robots.includes('record-of-jesus-christ.pdf'), 'robots must allow ROC PDF')

const searchPage = read('src/pages/SearchPage.tsx')
assert(searchPage.includes("robots: 'noindex, follow'"), 'Search page must be noindex to avoid thin SERP clutter')

const bookmarks = read('src/pages/BookmarksPage.tsx')
assert(bookmarks.includes('noindex'), 'Bookmarks must be noindex')

const home = read('src/pages/HomePage.tsx')
assert(home.includes('Primary Sources') || home.includes('primary sources'), 'Home title/description should target high-intent primary-source queries')

const roc = read('src/pages/RecordOfJesusChristPage.tsx')
assert(roc.includes('faqJsonLd'), 'ROC must emit FAQPage schema for rich results / voice')
assert(roc.includes('breadcrumbJsonLd'), 'ROC must emit BreadcrumbList')
assert(roc.includes('roc-claim-search') || roc.includes('roc-claim-search'), 'ROC must offer on-page claim search')

const subscribe = read('src/pages/SubscribeSuccessPage.tsx')
assert(subscribe.includes("robots: 'noindex, nofollow'"), 'subscribe success must be noindex')

const support = read('src/pages/SupportSuccessPage.tsx')
assert(support.includes("robots: 'noindex, nofollow'"), 'support success must be noindex')

const notFound = read('src/pages/NotFoundPage.tsx')
assert(notFound.includes("robots: 'noindex, nofollow'"), 'NotFoundPage must be noindex')
assert(notFound.includes('404'), 'NotFoundPage must surface 404')
assert(notFound.includes('/profiles'), 'NotFoundPage must hub-link Power Profiles for recovery')
assert(notFound.includes('/israel-dossier'), 'NotFoundPage must hub-link Israel Dossier')
assert(notFound.includes('/methodology'), 'NotFoundPage must hub-link Methodology')

const app = read('src/App.tsx')
assert(app.includes('NotFoundPage'), 'App catch-all must use NotFoundPage')

const server = read('server.js')
assert(server.includes('isKnownSpaRoute'), 'server soft-404 classifier present')
assert(server.includes('res.status(404)'), 'server emits HTTP 404')
assert(server.includes('buildNotFoundHtml'), 'server 404 HTML builder present')

const methodology = read('src/pages/MethodologyPage.tsx')
assert(methodology.includes('faqJsonLd'), 'Methodology must emit FAQPage schema')
assert(methodology.includes('breadcrumbJsonLd'), 'Methodology must emit breadcrumbs')

const article = read('src/pages/ArticlePage.tsx')
assert(article.includes('breadcrumbJsonLd'), 'News articles must emit BreadcrumbList')
assert(article.includes('isAccessibleForFree'), 'NewsArticle schema should mark free access')

const sources = read('src/pages/SourcesPage.tsx')
assert(sources.includes('faqJsonLd'), 'Sources must emit FAQPage for voice/PAA queries')
assert(sources.includes('How do I verify a claim'), 'Sources must use natural-language H2 for voice search')

const institute = read('src/pages/InstitutePage.tsx')
assert(
  institute.includes('Veritas Institute Field Manual'),
  'Institute title should stay SERP-compact',
)

const profile = read('src/pages/ProfilePage.tsx')
assert(profile.includes('breadcrumbJsonLd'), 'Profiles must use breadcrumbJsonLd helper')
assert(profile.includes('clampMetaDescription'), 'Profile meta descriptions must be clamped')

const prerender = read('scripts/prerender.mjs')
assert(prerender.includes('xmlns:image='), 'sitemap must declare image namespace')
assert(prerender.includes('image:image'), 'sitemap entries must support image:image')
assert(
  prerender.includes("route === '/methodology'") && prerender.includes("'@type': 'FAQPage'"),
  'prerender must emit FAQPage JSON-LD for /methodology (bot-visible)',
)
assert(
  prerender.includes('Primary Sources') && prerender.includes("route: '/'"),
  'prerender homepage title must target primary-source intent (not generic shell)',
)
assert(
  prerender.includes("route === '/'") && prerender.includes('SearchAction'),
  'prerender homepage must emit WebSite SearchAction for sitelinks',
)
assert(
  prerender.includes("route === '/sources'") && prerender.includes('How do I verify a claim in The Record?'),
  'prerender must emit Sources FAQPage for bot-visible voice/PAA queries',
)

// Home uses shared schema helpers (identity lives in seo.ts organizationJsonLd)
assert(home.includes('websiteJsonLd'), 'Home must call websiteJsonLd()')
assert(home.includes('organizationJsonLd'), 'Home must call organizationJsonLd()')
assert(seo.includes('sameAs'), 'Organization helper must include sameAs')
assert(
  seo.includes('github.com/bcrollins/veritas-worldwide'),
  'Organization sameAs should include public GitHub for E-E-A-T',
)

const consent = read('src/components/CookieConsent.tsx')
assert(consent.includes("gtag('consent', 'update'"), 'CookieConsent must update gtag consent')
assert(consent.includes('analytics_storage'), 'CookieConsent must set analytics_storage')

// index.html first-paint SEO (bot-visible without JS)
const index = read('index.html')
assert(index.includes('rel="canonical"'), 'index.html canonical present')
assert(index.includes('og:image'), 'index.html og:image present')
assert(index.includes('application/rss+xml'), 'index.html RSS alternate present')
assert(index.includes('lang="en"'), 'html lang=en for international SEO baseline')
assert(index.includes('media="print"'), 'fonts should load non-blocking via media=print swap')
assert(index.includes('max-image-preview:large'), 'index.html robots must allow large image previews')
assert(index.includes('Primary Sources'), 'index.html title/desc must target primary-source intent')
assert(index.includes('application/ld+json'), 'index.html must ship static WebSite/Organization JSON-LD')
assert(index.includes('SearchAction'), 'index.html static WebSite must include SearchAction')
assert(index.includes('og:locale'), 'index.html must declare og:locale')
assert(index.includes('og:image:alt'), 'index.html must declare og:image:alt')
// Guard against accidental JSX comments in HTML shell
assert(!index.includes('{/*'), 'index.html must not contain JSX-style comments')

const sw = read('public/sw.js')
assert(sw.includes("request.mode === 'navigate'"), 'SW must special-case navigation requests')
assert(sw.includes('fetch(request)'), 'SW navigation must be network-first')

console.log(
  '[verify:seo-meta] PASS — meta clamps, robots, soft-404, FAQ, breadcrumbs, consent, image sitemap floors green',
)
