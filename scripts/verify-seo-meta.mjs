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

const robots = read('public/robots.txt')
assert(robots.includes('Sitemap: https://veritasworldwide.com/sitemap.xml'), 'robots must declare sitemap')
assert(robots.includes('Disallow: /admin'), 'robots must disallow admin')
assert(robots.includes('Disallow: /subscribe/success'), 'robots must disallow transactional success')
assert(robots.includes('Allow: /llms.txt'), 'robots must allow llms.txt for GEO/AI crawlers')
assert(robots.includes('GPTBot') || robots.includes('ClaudeBot'), 'robots should address AI crawlers')

const subscribe = read('src/pages/SubscribeSuccessPage.tsx')
assert(subscribe.includes("robots: 'noindex, nofollow'"), 'subscribe success must be noindex')

const support = read('src/pages/SupportSuccessPage.tsx')
assert(support.includes("robots: 'noindex, nofollow'"), 'support success must be noindex')

const notFound = read('src/pages/NotFoundPage.tsx')
assert(notFound.includes("robots: 'noindex, nofollow'"), 'NotFoundPage must be noindex')
assert(notFound.includes('404'), 'NotFoundPage must surface 404')

const app = read('src/App.tsx')
assert(app.includes('NotFoundPage'), 'App catch-all must use NotFoundPage')

const server = read('server.js')
assert(server.includes('isKnownSpaRoute'), 'server soft-404 classifier present')
assert(server.includes('res.status(404)'), 'server emits HTTP 404')
assert(server.includes('buildNotFoundHtml'), 'server 404 HTML builder present')

const methodology = read('src/pages/MethodologyPage.tsx')
assert(methodology.includes('faqJsonLd'), 'Methodology must emit FAQPage schema')
assert(methodology.includes('breadcrumbJsonLd'), 'Methodology must emit breadcrumbs')

const prerender = read('scripts/prerender.mjs')
assert(prerender.includes('xmlns:image='), 'sitemap must declare image namespace')
assert(prerender.includes('image:image'), 'sitemap entries must support image:image')

// Home Organization sameAs still present
const home = read('src/pages/HomePage.tsx')
assert(home.includes('sameAs'), 'Home Organization JSON-LD must include sameAs')
assert(home.includes('WebSite'), 'Home must emit WebSite schema')

// index.html baseline
const index = read('index.html')
assert(index.includes('rel="canonical"'), 'index.html canonical present')
assert(index.includes('og:image'), 'index.html og:image present')
assert(index.includes('application/rss+xml'), 'index.html RSS alternate present')
assert(index.includes('lang="en"'), 'html lang=en for international SEO baseline')

console.log('[verify:seo-meta] PASS — meta clamps, robots, soft-404, FAQ, image sitemap floors green')
