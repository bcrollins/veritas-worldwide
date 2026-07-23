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
// Permanent: url must stay optional so noindex soft-404 shells (NotFoundPage) typecheck on Railway.
assert(/url\?:\s*string/.test(seo), 'SEOConfig.url must be optional (noindex shells omit canonical)')
assert(seo.includes('DEFAULT_TITLE'), 'seo.ts must define DEFAULT_TITLE aligned with index.html')
assert(seo.includes('DEFAULT_ROBOTS'), 'seo.ts must reset robots to Discover-friendly defaults')
assert(seo.includes('absoluteUrl'), 'seo.ts must normalize absolute HTTPS canonicals')
assert(seo.includes('article:modified_time'), 'seo.ts must set article:modified_time')
assert(seo.includes('NewsMediaOrganization'), 'Organization must dual-type NewsMediaOrganization')
assert(seo.includes('howToJsonLd'), 'seo.ts must export HowTo helper')
assert(seo.includes('personJsonLd'), 'seo.ts must export Person helper')
assert(seo.includes('itemListJsonLd'), 'seo.ts must export ItemList helper')
assert(seo.includes('websiteJsonLd'), 'seo.ts must export WebSite helper')
assert(seo.includes('speakable'), 'chapter NewsArticle must include speakable for voice SEO')
const rocPage = read('src/pages/RecordOfJesusChristPage.tsx')
assert(rocPage.includes('howToJsonLd'), 'ROC page must emit HowTo schema for export/researcher path')
assert(rocPage.includes('faqJsonLd'), 'ROC page must emit FAQPage schema')
assert(rocPage.includes('breadcrumbJsonLd'), 'ROC page must emit BreadcrumbList schema')
assert(rocPage.includes("'@type': 'Dataset'") || rocPage.includes('"@type": "Dataset"'), 'ROC page must emit Dataset schema for corpus GEO')
assert(rocPage.includes('DataDownload'), 'ROC Dataset must list DataDownload distributions')
const biblePage = read('src/pages/BibleHistoryPage.tsx')
assert(biblePage.includes('faqJsonLd'), 'Bible history page must emit FAQPage schema')
assert(biblePage.includes('breadcrumbJsonLd'), 'Bible history page must emit breadcrumbs')
assert(biblePage.includes('/record-of-jesus-christ'), 'Bible page must cross-link ROC surface')

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
assert(profile.includes('imageAlt'), 'Profile OG image must declare imageAlt')

const about = read('src/pages/AboutPage.tsx')
assert(about.includes('faqJsonLd'), 'About must emit FAQPage for E-E-A-T / voice')
assert(about.includes('breadcrumbJsonLd'), 'About must emit breadcrumbs')

const timeline = read('src/pages/TimelinePage.tsx')
assert(timeline.includes('breadcrumbJsonLd'), 'Timeline must emit breadcrumbs')
assert(timeline.includes('itemListJsonLd'), 'Timeline must emit ItemList of chapters')

const readBook = read('src/pages/ReadTheBookPage.tsx')
assert(readBook.includes('breadcrumbJsonLd'), 'Read page must emit breadcrumbs')
assert(readBook.includes("'@type': 'Book'") || readBook.includes('"@type": "Book"') || readBook.includes("@type': 'Book'"), 'Read page must emit Book schema')

const topicsIndex = read('src/pages/TopicsIndexPage.tsx')
assert(topicsIndex.includes('breadcrumbJsonLd'), 'Topics index must emit breadcrumbs')
assert(topicsIndex.includes('itemListJsonLd'), 'Topics index must use itemListJsonLd helper')

const chapterPage = read('src/pages/ChapterPage.tsx')
assert(chapterPage.includes('imageAlt'), 'Chapter pages must set imageAlt for OG/image SEO')

const guide = read('src/pages/InstituteGuidePage.tsx')
assert(guide.includes('howToJsonLd'), 'Institute guides must use howToJsonLd helper')
assert(guide.includes('faqJsonLd'), 'Institute guides must use faqJsonLd helper')

const prerender = read('scripts/prerender.mjs')
assert(prerender.includes('xmlns:image='), 'sitemap must declare image namespace')
assert(prerender.includes('image:image'), 'sitemap entries must support image:image')
assert(
  prerender.includes('Default for remaining static hubs') &&
    prerender.includes('name: page.heading') &&
    /Default for remaining static hubs[\s\S]{0,500}'@type': 'BreadcrumbList'/.test(prerender),
  'prerender buildStaticPageJsonLd default must include BreadcrumbList for membership/content-pack/etc',
)
assert(
  /if \(route === '\/institute'\) \{[\s\S]*?name: 'Veritas Institute'[\s\S]*?'@type': 'BreadcrumbList'/.test(
    prerender,
  ),
  'prerender /institute must emit BreadcrumbList',
)
assert(
  prerender.includes("name: 'Field Manual'") &&
    /if \(route === '\/institute\/book'\) \{[\s\S]*?name: 'Field Manual'[\s\S]*?item: url/.test(prerender),
  'prerender /institute/book must emit Field Manual BreadcrumbList',
)
assert(
  prerender.includes("route === '/methodology'") && prerender.includes("'@type': 'FAQPage'"),
  'prerender must emit FAQPage JSON-LD for /methodology (bot-visible)',
)
assert(
  prerender.includes("route === '/record-of-jesus-christ'") &&
    prerender.includes('What evidence tiers does The Record of Jesus Christ use?'),
  'prerender must emit bot-visible FAQ for /record-of-jesus-christ',
)
assert(prerender.includes("'@type': 'Book'"), 'prerender ROC path should include Book schema')
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
assert(
  prerender.includes("route === '/about'") && prerender.includes('What is Veritas Worldwide?'),
  'prerender must emit About FAQPage for bot-visible E-E-A-T / voice queries',
)
assert(
  prerender.includes("route === '/membership'") &&
    prerender.includes('Does membership paywall The Record?'),
  'prerender must emit Membership FAQPage for bot-visible conversion queries',
)
const membershipPage = read('src/pages/MembershipPage.tsx')
assert(membershipPage.includes('faqJsonLd'), 'MembershipPage must emit FAQPage schema')
assert(
  membershipPage.includes('Does membership paywall The Record?'),
  'Membership FAQ must answer paywall concern for SERP/PAA',
)
assert(
  prerender.includes("route === '/media-kit'") &&
    prerender.includes('Can journalists use Veritas Worldwide logos'),
  'prerender must emit Media Kit FAQPage for press discoverability',
)
const mediaKitPage = read('src/pages/MediaKitPage.tsx')
assert(mediaKitPage.includes('faqJsonLd'), 'MediaKitPage must emit FAQPage schema')
assert(
  mediaKitPage.includes('Is /brand-kit a public page?'),
  'Media Kit FAQ must clarify /brand-kit alias vs /media-kit',
)
assert(
  prerender.includes("route === '/content-pack'") &&
    prerender.includes('What is in a Veritas content pack?'),
  'prerender must emit Content Pack FAQPage for share/alias discoverability',
)
const contentPackPage = read('src/pages/ContentPackPage.tsx')
assert(contentPackPage.includes('faqJsonLd'), 'ContentPackPage must emit FAQPage schema')
assert(
  contentPackPage.includes('How do /share and /content-packs relate'),
  'Content Pack FAQ must document legacy /share and /content-packs aliases',
)
assert(
  prerender.includes("route === '/privacy'") &&
    prerender.includes('Does Veritas Worldwide sell reader data?'),
  'prerender must emit Privacy FAQPage for trust / voice queries',
)
const privacyPage = read('src/pages/PrivacyPage.tsx')
assert(privacyPage.includes('faqJsonLd'), 'PrivacyPage must emit FAQPage schema')
assert(
  privacyPage.includes('Does Veritas Worldwide sell reader data?'),
  'Privacy FAQ must answer data-sale concern for E-E-A-T',
)
assert(
  prerender.includes("route === '/terms'") &&
    prerender.includes('Under what license is The Record published?'),
  'prerender must emit Terms FAQPage for license / reuse queries',
)
const termsPage = read('src/pages/TermsPage.tsx')
assert(termsPage.includes('faqJsonLd'), 'TermsPage must emit FAQPage schema')
assert(
  termsPage.includes('Under what license is The Record published?'),
  'Terms FAQ must answer CC BY-NC-SA license question',
)
assert(
  prerender.includes("route === '/accessibility'") &&
    prerender.includes('What accessibility standard does Veritas target?'),
  'prerender must emit Accessibility FAQPage for a11y discoverability',
)
const a11yPage = read('src/pages/AccessibilityPage.tsx')
assert(a11yPage.includes('faqJsonLd'), 'AccessibilityPage must emit FAQPage schema')
assert(
  a11yPage.includes('Are evidence tiers colorblind-safe?'),
  'Accessibility FAQ must cover evidence-tier colorblind safety',
)
assert(existsSync(join(root, 'docs/SEO-OPS-SCORECARD.md')), 'SEO ops scorecard + GSC runbook must exist')
assert(existsSync(join(root, 'docs/SEO-AUDIT-50.md')), 'SEO 50-item audit must exist')

// Home uses shared schema helpers (identity lives in seo.ts organizationJsonLd)
assert(home.includes('websiteJsonLd'), 'Home must call websiteJsonLd()')
assert(home.includes('organizationJsonLd'), 'Home must call organizationJsonLd()')
assert(seo.includes('sameAs'), 'Organization helper must include sameAs')
// P0 operator anonymity: entity-only identity. Personal GitHub namespace must never ship.
assert(
  !seo.includes('github.com/bcrollins') && !seo.includes('bcrollins/'),
  'Organization sameAs must not expose personal GitHub namespace (bcrollins)',
)
assert(
  !prerender.includes('github.com/bcrollins') && !prerender.includes('bcrollins/veritas'),
  'prerender must not emit personal GitHub namespace (bcrollins)',
)
assert(
  prerender.includes("route === '/record-of-jesus-christ'") &&
    prerender.includes("'@type': 'Dataset'") &&
    prerender.includes("'@type': 'HowTo'"),
  'prerender ROC route must emit bot-visible Dataset + HowTo JSON-LD',
)
assert(
  seo.includes('x.com/VeritasWorldwide') && seo.includes('reddit.com/r/VeritasWorldwide'),
  'Organization sameAs must keep official entity social profiles for E-E-A-T',
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
// P0: index.html shell must not leak personal operator GitHub
assert(
  !index.includes('github.com/bcrollins') && !index.includes('bcrollins/'),
  'index.html must not expose personal GitHub namespace (bcrollins)',
)
assert(
  index.includes('x.com/VeritasWorldwide') && index.includes('reddit.com/r/VeritasWorldwide'),
  'index.html sameAs must keep official entity social profiles',
)

const sw = read('public/sw.js')
assert(sw.includes("request.mode === 'navigate'"), 'SW must special-case navigation requests')
assert(sw.includes('fetch(request)'), 'SW navigation must be network-first')

// Bot meta must defer unknown paths so crawlers get true soft-404 (not 200 homepage shells).
const botMeta = read('server-social-meta.js')
assert(botMeta.includes('isKnownRoute'), 'bot meta must accept isKnownRoute for soft-404 deferral')
assert(
  botMeta.includes('typeof isKnownRoute === \'function\'') || botMeta.includes('typeof isKnownRoute === "function"'),
  'bot meta must guard isKnownRoute and next() for unknown crawler paths',
)
assert(server.includes('isKnownRoute: isKnownSpaRoute'), 'server must pass isKnownSpaRoute into bot meta')
assert(server.includes('buildNotFoundHtml'), 'server must soft-404 with dedicated HTML')
assert(
  server.includes("'/institute/methodology'") && server.includes("'/content-pack'"),
  'soft-404 allowlist must include institute methodology + content-pack exact routes',
)
assert(
  server.includes("/bernie") && server.includes("X-Robots-Tag"),
  'server must emit X-Robots-Tag noindex path handling for /bernie OPSEC surface',
)
assert(server.includes("req.path === '/bernie'") || server.includes("path === '/bernie'"), 'server must special-case /bernie noindex')
const berne = read('src/pages/BernieShowPage.tsx')
assert(berne.includes("robots: 'noindex, nofollow'"), 'BernieShowPage must set robots noindex via setMetaTags')
const robotsTxt = read('public/robots.txt')
assert(robotsTxt.includes('Disallow: /bernie'), 'robots.txt must Disallow /bernie')
assert(botMeta.includes('/bernie'), 'bot meta must noindex /bernie for JS-skipping crawlers')
assert(
  robotsTxt.includes('Disallow: /comprehensive-profile/success'),
  'robots.txt must Disallow transactional comprehensive-profile success',
)
assert(
  prerender.includes("route: '/comprehensive-profile/success'") && prerender.includes('noindex: true'),
  'prerender must mark comprehensive-profile success noindex',
)
assert(
  botMeta.includes('comprehensive-profile/success') || botMeta.includes("'/comprehensive-profile/success'"),
  'bot meta must noindex comprehensive-profile success for JS-skipping crawlers',
)
assert(
  botMeta.includes("'/subscribe/success'") && botMeta.includes("'/membership/success'"),
  'bot meta must noindex subscribe/membership success shells (not homepage index,follow)',
)
assert(
  botMeta.includes('noindexBotPages') || botMeta.includes('sendNoindexShell'),
  'bot meta must centralize noindex shell delivery for transactional paths',
)
assert(
  botMeta.includes("'/admin'") || botMeta.includes('/admin'),
  'bot meta must noindex /admin (known SPA; SPA X-Robots never runs for bots)',
)
assert(
  botMeta.includes('Operator console') || botMeta.includes("path === '/admin'"),
  'bot meta must special-case admin operator console noindex shell',
)
const adminLayout = read('src/pages/admin/AdminLayout.tsx')
assert(adminLayout.includes("robots: 'noindex, nofollow'"), 'AdminLayout must set client robots noindex')
const adminLogin = read('src/pages/admin/AdminLoginPage.tsx')
assert(adminLogin.includes("robots: 'noindex, nofollow'"), 'AdminLoginPage must set client robots noindex')
assert(
  botMeta.includes('rel="canonical" href=') || botMeta.includes("rel=\"canonical\" href="),
  'bot meta applyBotPageMeta must rewrite link rel=canonical (not only og:url content=)',
)
assert(
  prerender.includes("route: '/subscribe/success'") &&
    prerender.includes("route: '/bookmarks'") &&
    prerender.includes("route: '/search'"),
  'prerender must include subscribe/success, bookmarks, and search shells',
)
// Defense-in-depth: utility + transactional routes are noindex in prerender so
// static HTML never ships index,follow even if bot-meta is bypassed by middleware order.
assert(
  /route: '\/subscribe\/success'[\s\S]*?noindex:\s*true/.test(prerender) ||
    (prerender.includes("route: '/subscribe/success'") &&
      prerender.split("route: '/subscribe/success'")[1]?.includes('noindex: true')),
  'prerender /subscribe/success must be noindex',
)
assert(
  prerender.includes("route: '/bookmarks'") &&
    prerender.split("route: '/bookmarks'")[1]?.slice(0, 600).includes('noindex: true'),
  'prerender /bookmarks must be noindex',
)
assert(
  prerender.includes("route: '/search'") &&
    prerender.split("route: '/search'")[1]?.slice(0, 800).includes('noindex: true'),
  'prerender /search must be noindex (robots Disallow utility; no indexable thin SERP)',
)
assert(
  server.includes('comprehensive-profile/success') && server.includes("X-Robots-Tag"),
  'server must be able to emit X-Robots-Tag for transactional success paths',
)
assert(
  server.includes('isNoindexPublicPath') || server.includes('NOINDEX_EXACT_PATHS'),
  'server prerender middleware must tag noindex paths with X-Robots-Tag',
)

assert(botMeta.includes('applyBotPageMeta'), 'bot meta must use applyBotPageMeta helper for shell rewrite')
assert(
  botMeta.includes('Primary-source documentary history') || botMeta.includes('Primary Sources'),
  'bot meta rewrite must align with first-paint primary-source description',
)

// Prerender HTML is what Googlebot often sees for known SPA routes — keep SERP copy in lockstep.
assert(
  prerender.includes('Minimal analytics, no ads, no data sales'),
  'prerender /privacy description must match client high-intent privacy copy',
)
assert(
  prerender.includes('Veritas Institute Field Manual | Veritas Worldwide'),
  'prerender /institute title must stay SERP-compact',
)
assert(
  prerender.includes('Current Events — Primary Source Journalism'),
  'prerender /news title must target primary-source journalism intent',
)
assert(
  prerender.includes('Fund independent investigative journalism'),
  'prerender /membership description must match client membership pitch',
)
assert(
  prerender.includes('Interactive Epstein network dossier') ||
    prerender.includes('Interactive Epstein network'),
  'prerender /deep-state description must match client investigation pitch',
)

const instituteMethod = read('src/pages/InstituteMethodologyPage.tsx')
assert(instituteMethod.includes('breadcrumbJsonLd'), 'Institute methodology must emit breadcrumbs')
assert(instituteMethod.includes('faqJsonLd'), 'Institute methodology must emit FAQPage for voice/PAA')
const searchPageSeo = read('src/pages/SearchPage.tsx')
assert(searchPageSeo.includes('breadcrumbJsonLd'), 'Search page must emit breadcrumbs even when noindex')
assert(searchPageSeo.includes("robots: 'noindex, follow'"), 'Search page must remain noindex')

// Speakable schema selectors must exist in ChapterPage DOM (voice / Google Assistant).
const chapterDom = read('src/pages/ChapterPage.tsx')
assert(chapterDom.includes('chapter-subtitle'), 'ChapterPage must expose .chapter-subtitle for speakable schema')
assert(chapterDom.includes('data-speakable="lede"'), 'ChapterPage lede must be data-speakable for voice SEO')
assert(
  prerender.includes("route === '/institute/methodology'") && prerender.includes('How does Veritas Institute choose topics?'),
  'prerender must emit bot-visible FAQ for /institute/methodology',
)

const llms = read('public/llms.txt')
assert(llms.includes('veritasworldwide.com/privacy'), 'llms.txt must link Privacy for GEO trust discovery')
assert(llms.includes('veritasworldwide.com/terms'), 'llms.txt must link Terms for GEO trust discovery')
assert(llms.includes('veritasworldwide.com/membership'), 'llms.txt must link Membership for GEO discovery')
assert(
  prerender.includes('veritasworldwide.com/privacy') && prerender.includes('## Trust layers'),
  'prerender llms generator must emit Privacy in Trust layers',
)

// P0 anonymity: entity-only language in ops/outreach docs (no personal byline)
const opsDocs = [
  'docs/SEO-OPS-SCORECARD.md',
  'docs/SEO-AUDIT-50.md',
  'docs/BACKLINK-OUTREACH.md',
]
for (const rel of opsDocs) {
  if (!existsSync(join(root, rel))) continue
  const body = read(rel)
  assert(
    !/Brandon\s+Rollins/i.test(body) && !/brandoncrollins@/i.test(body) && !/brollins565@/i.test(body),
    `${rel} must not contain personal operator identity (use entity-only language)`,
  )
}

console.log(
  '[verify:seo-meta] PASS — meta clamps, robots, soft-404, FAQ, breadcrumbs, consent, anonymity floors green',
)

// CWV: LCP hero must advertise fetchPriority=high for mobile CWV.
const homeLcp = read('src/pages/HomePage.tsx')
assert(homeLcp.includes('fetchPriority') || homeLcp.includes('fetchpriority'), 'HomePage featured hero must set fetchPriority high for LCP')

// Topic hub GEO copy must track ROC claim growth (never advertise stale 150+/200+ floors).
// Permanent: accept any 3-digit N+ floor so wave growth never breaks SEO asserts.
const topicHubs = read('src/data/topicHubs.json')
assert(topicHubs.includes('historical-jesus-evidence'), 'topic hubs must include historical-jesus-evidence')
assert(!topicHubs.includes('150+ tier-labeled'), 'historical Jesus topic must not advertise stale 150+ claim floor')
assert(!topicHubs.includes('200+ tier-labeled'), 'historical Jesus topic must not advertise stale 200+ claim floor')
assert(
  /(?<!\d)([3-9]\d{2})\+\s*tier-labeled/.test(topicHubs),
  'historical Jesus topic must advertise current 300+ claim floor (e.g. 450+ tier-labeled)',
)

// Soft-404: unknown /chapter/* must not soft-serve homepage shells to crawlers.
assert(botMeta.includes('isKnownChapterSlug') || server.includes('isKnownChapterSlug'), 'server must validate known chapter slugs for soft-404')
assert(botMeta.includes('chapter-29') || botMeta.includes("'chapter-29'"), 'bot meta must include chapter-29 archive part')
assert(server.includes('isKnownChapterSlug'), 'isKnownSpaRoute must gate /chapter/* via isKnownChapterSlug')
assert(botMeta.includes('Unknown chapter slug') || botMeta.includes('not part of The Record public archive'), 'bot meta must 404 unknown chapter slugs for Googlebot')

assert(botMeta.includes('isKnownProfileSlug') || server.includes('isKnownProfileSlug'), 'must validate known profile slugs for soft-404')
assert(server.includes('isKnownProfileSlug'), 'isKnownSpaRoute must gate /profile/* via isKnownProfileSlug')

assert(server.includes('isKnownInstituteSlug') && botMeta.includes('isKnownInstituteSlug'), 'must soft-404 unknown institute course/guide slugs')

const forumPage = read('src/pages/ForumPage.tsx')
assert(!forumPage.includes('Local beta forum'), 'Forum SERP copy must not advertise Local beta forum')
assert(forumPage.includes('Community Forum |') || forumPage.includes('Community Forum ${'), 'Forum title should drop Beta for SERP cleanliness')
assert(prerender.includes("route: '/forum'") && prerender.includes('Source-first conversation'), 'prerender /forum must match client high-intent description')

// server.js must import every soft-404 gate used by isKnownSpaRoute
assert(
  server.includes('isKnownChapterSlug') &&
    server.includes('isKnownProfileSlug') &&
    server.includes('isKnownNewsSlug') &&
    server.includes('isKnownTopicSlug') &&
    server.includes('isKnownInstituteSlug'),
  'server.js isKnownSpaRoute must import all soft-404 gates',
)
assert(
  server.includes('SLUG_CONTENT_PATH') || server.includes('CASE_CANONICAL_PATH'),
  'server must 301 mixed-case / trailing-slash public content paths to canonical URLs',
)
assert(
  botMeta.includes('.toLowerCase()') &&
    (server.includes('SLUG_CONTENT_PATH') || server.includes('CASE_CANONICAL_PATH')),
  'bot meta + server must case-normalize public content slugs for crawl consistency',
)

const homePage = read('src/pages/HomePage.tsx')
assert(!homePage.includes('200+ tier-labeled claims'), 'Home must not advertise stale 200+ ROC claim floor')
assert(
  /(?<!\d)([3-9]\d{2})\+\s*tier-labeled/.test(homePage),
  'Home must advertise current ROC claim floor (e.g. 450+ tier-labeled)',
)
const sourcesPage = read('src/pages/SourcesPage.tsx')
assert(!sourcesPage.includes('200+ tier-labeled'), 'Sources must not advertise stale 200+ ROC claim floor')
assert(
  /(?<!\d)([3-9]\d{2})\+\s*tier-labeled/.test(sourcesPage),
  'Sources must advertise current ROC claim floor (e.g. 450+ tier-labeled)',
)

const methodPage = read('src/pages/MethodologyPage.tsx')
assert(!methodPage.includes('200+ claims with proofVsConcept'), 'Methodology must not advertise stale 200+ ROC claim floor')
assert(
  /(?<!\d)([3-9]\d{2})\+\s*claims/.test(methodPage),
  'Methodology must advertise current ROC claim floor (e.g. 450+ claims)',
)

// Unique H1 per template (Search Central / a11y).
for (const [rel, label] of [
  ['src/pages/HomePage.tsx', 'Home'],
  ['src/pages/AboutPage.tsx', 'About'],
  ['src/pages/MethodologyPage.tsx', 'Methodology'],
  ['src/pages/SourcesPage.tsx', 'Sources'],
  ['src/pages/NotFoundPage.tsx', 'NotFound'],
]) {
  const src = read(rel)
  const h1Count = (src.match(/<h1[\s>]/g) || []).length
  assert(h1Count === 1, label + ' must expose exactly one H1 (found ' + h1Count + ')')
}

assert(/SLUG_CONTENT_PATH[\s\S]{0,80}\/i/.test(server) || server.includes('/?$/i'), 'SLUG_CONTENT_PATH must be case-insensitive (/i flag)')

assert(server.includes('rawPath') || server.includes("split('?')[0]"), 'slug canonical middleware must inspect raw URL for trailing slashes')

// Exact hub case + content-packs alias — never soft-404 /About or serve homepage on /content-packs.
assert(server.includes('STATIC_CANONICAL_PATHS'), 'server must 301 mixed-case exact hubs (/About → /about)')
assert(
  /express\.static\([\s\S]{0,200}redirect:\s*false/.test(server),
  'express.static must set redirect:false so asset dirs (e.g. /brand-kit) do not 301-loop',
)
assert(
  server.includes('PATH_ALIASES') &&
    server.includes("'/content-packs'") &&
    server.includes("'/share'") &&
    server.includes("'/content-pack'") &&
    server.includes("'/brand-kit'") &&
    server.includes("'/media-kit'") &&
    server.includes("'/home'") &&
    server.includes("'/packs'") &&
    server.includes("'/donate'") &&
    server.includes("'/support'") &&
    server.includes("'/contact'"),
  'server must 301 content-pack/share/brand-kit/home/packs/donate/support/contact aliases',
)
assert(server.includes("'/about'") && server.includes("'/read'") && server.includes("'/methodology'"), 'STATIC_CANONICAL_PATHS must include core hubs')
const knownExactBlock = server.match(/const knownExact = new Set\(\[([\s\S]*?)\]\)/)?.[1] || ''
assert(
  !knownExactBlock.includes("'/content-packs'") &&
    !knownExactBlock.includes("'/share'") &&
    !knownExactBlock.includes("'/brand-kit'"),
  'isKnownSpaRoute knownExact must not list alias-only paths (content-packs/share/brand-kit)',
)
assert(knownExactBlock.includes("'/content-pack'"), 'isKnownSpaRoute knownExact must list canonical /content-pack')
assert(knownExactBlock.includes("'/media-kit'"), 'isKnownSpaRoute knownExact must list canonical /media-kit')
assert(!prerender.includes("route: '/share'"), 'prerender must not emit duplicate /share content-pack page')
assert(prerender.includes("route: '/content-pack'"), 'prerender must emit canonical /content-pack')
// Soft-404 shells: no invented /404 canonical (noindex only).
assert(botMeta.includes('omitCanonical'), 'bot-meta soft-404 shells must omit canonical (/404 not a real page)')
assert(!server.includes('veritasworldwide.com/404'), 'server buildNotFoundHtml must not invent /404 canonical')
assert(!notFound.includes("url: `${SITE_URL}/404`") && !notFound.includes("url: '${SITE_URL}/404'"), 'NotFoundPage must not invent /404 canonical URL')
