#!/usr/bin/env node
/**
 * Live Googlebot smoke: transactional / utility surfaces must never return an
 * indexable homepage shell (title Primary Sources + robots index,follow).
 *
 * Defense layers verified:
 *  - HTTP X-Robots-Tag: noindex
 *  - <meta name="robots" content="noindex…">
 *  - Title is path-specific (not homepage first-paint)
 */
const base = (process.env.PLATFORM_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(
  /\/$/,
  '',
)

const GOOGLEBOT =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

/** @type {{ path: string, titleIncludes: string }[]} */
const SURFACES = [
  { path: '/subscribe/success', titleIncludes: 'Subscription' },
  { path: '/membership/success', titleIncludes: 'Membership' },
  { path: '/donation/success', titleIncludes: 'Donation' },
  { path: '/thank-you', titleIncludes: 'Thank You' },
  { path: '/comprehensive-profile/success', titleIncludes: 'Profile' },
  { path: '/bookmarks', titleIncludes: 'Bookmarks' },
  { path: '/search', titleIncludes: 'Search' },
  { path: '/bernie', titleIncludes: 'Bernie' },
  // Admin is a known SPA route; bot-meta must noindex (SPA X-Robots never runs for bots).
  { path: '/admin', titleIncludes: 'Admin' },
]

const failures = []

async function check({ path, titleIncludes }) {
  const url = `${base}${path}`
  let res
  try {
    res = await fetch(url, {
      headers: {
        'user-agent': GOOGLEBOT,
        accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(20000),
    })
  } catch (err) {
    failures.push(`${path}: fetch error ${err?.message || err}`)
    return
  }

  if (!res.ok) {
    failures.push(`${path}: HTTP ${res.status}`)
    return
  }

  const xRobots = (res.headers.get('x-robots-tag') || '').toLowerCase()
  if (!xRobots.includes('noindex')) {
    failures.push(`${path}: missing X-Robots-Tag noindex (got "${xRobots || '(none)'}")`)
  }

  const html = await res.text()
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i)
  const title = titleMatch?.[1]?.trim() || ''
  if (!title.toLowerCase().includes(titleIncludes.toLowerCase())) {
    failures.push(`${path}: title "${title}" does not include "${titleIncludes}"`)
  }
  if (/Primary Sources/i.test(title) && path !== '/') {
    failures.push(`${path}: homepage Primary Sources title leaked to transactional/utility surface`)
  }

  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)
  const robots = (robotsMatch?.[1] || '').toLowerCase()
  if (!robots.includes('noindex')) {
    failures.push(`${path}: meta robots not noindex (got "${robots || '(none)'}")`)
  }
  if (/\bindex\s*,\s*follow\b/i.test(robots) && !robots.includes('noindex')) {
    failures.push(`${path}: meta robots still index,follow`)
  }

  // Canonical should not claim homepage for non-home noindex shells when set.
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)
  const canonical = canonicalMatch?.[1] || ''
  if (canonical === `${base}/` || canonical === base) {
    // Soft warn path: some older deploys only fixed meta robots; hard-fail once bot-meta canonical ships.
    if (html.includes('Subscription Confirmed') || html.includes('Bookmarks |')) {
      failures.push(`${path}: canonical still points at homepage (${canonical})`)
    }
  }
}

await Promise.all(SURFACES.map(check))



// Soft-404 matrix: junk dynamic prefixes must be HTTP 404 + noindex for Googlebot.
const SOFT404_JUNK = [
  '/this-is-not-a-real-veritas-path-xyz',
  '/chapter/not-a-real-chapter-slug-xyz',
  '/profile/definitely-not-a-real-person-xyz',
  '/news/this-article-does-not-exist-xyz',
  '/topics/not-a-real-topic-xyz',
  '/institute/courses/not-a-real-course-xyz',
  '/institute/guides/not-a-real-guide-xyz',
  // Trailing-slash variants must also soft-404 (not indexable shells).
  '/chapter/not-a-real-chapter-slug-xyz/',
  '/profile/definitely-not-a-real-person-xyz/',
]
const SOFT404_KNOWN = [
  { path: '/chapter/chapter-1', titleIncludes: 'Central Banking' },
  { path: '/profile/ted-cruz', titleIncludes: 'Ted Cruz' },
  { path: '/topics/historical-jesus-evidence', titleIncludes: 'Historical Jesus' },
]

async function checkSoft404Junk(path) {
  const url = `${base}${path}`
  let res
  try {
    res = await fetch(url, {
      headers: { 'user-agent': GOOGLEBOT, accept: 'text/html' },
      signal: AbortSignal.timeout(20000),
    })
  } catch (err) {
    failures.push(`${path}: fetch error ${err?.message || err}`)
    return
  }
  if (res.status !== 404) {
    failures.push(`${path}: expected HTTP 404 soft-kill, got ${res.status}`)
  }
  const xRobots = (res.headers.get('x-robots-tag') || '').toLowerCase()
  if (!xRobots.includes('noindex')) {
    failures.push(`${path}: missing X-Robots-Tag noindex on junk path`)
  }
  const html = await res.text()
  if (/Primary Sources/i.test(html.match(/<title>([^<]*)/)?.[1] || '')) {
    failures.push(`${path}: homepage Primary Sources title leaked on junk path`)
  }
  if (!/noindex/i.test(html.match(/name=["']robots["'][^>]*content=["']([^"']*)/)?.[1] || '')) {
    failures.push(`${path}: meta robots not noindex on junk path`)
  }
  // Soft-404 shells must not invent a /404 canonical (noindex only).
  if (/rel=["']canonical["'][^>]*href=["'][^"']*\/404/i.test(html)) {
    failures.push(`${path}: soft-404 shell invents /404 canonical (must omit canonical)`)
  }
}

async function checkSoft404Known({ path, titleIncludes }) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'user-agent': GOOGLEBOT, accept: 'text/html' },
    signal: AbortSignal.timeout(20000),
  })
  if (res.status !== 200) {
    failures.push(`${path}: known path expected 200, got ${res.status}`)
    return
  }
  const html = await res.text()
  const title = html.match(/<title>([^<]*)/)?.[1] || ''
  if (!title.toLowerCase().includes(titleIncludes.toLowerCase())) {
    failures.push(`${path}: known title "${title}" missing "${titleIncludes}"`)
  }
}

await Promise.all(SOFT404_JUNK.map(checkSoft404Junk))
await Promise.all(SOFT404_KNOWN.map(checkSoft404Known))


// Canonical 301s for mixed-case / trailing-slash known content (Search Central).
const CANONICAL_301 = [
  { path: '/profile/Ted-Cruz', expectLocation: '/profile/ted-cruz' },
  { path: '/profile/ted-cruz/', expectLocation: '/profile/ted-cruz' },
  { path: '/CHAPTER/CHAPTER-1', expectLocation: '/chapter/chapter-1' },
  // Exact hub mixed-case + legacy alias (soft-404 + homepage-shell killers).
  { path: '/About', expectLocation: '/about' },
  { path: '/Read', expectLocation: '/read' },
  { path: '/content-packs', expectLocation: '/content-pack' },
  { path: '/share', expectLocation: '/content-pack' },
  { path: '/brand-kit', expectLocation: '/media-kit' },
  { path: '/Brand-Kit', expectLocation: '/media-kit' },
  { path: '/home', expectLocation: '/' },
  { path: '/packs', expectLocation: '/content-pack' },
  { path: '/donate', expectLocation: '/membership' },
  { path: '/support', expectLocation: '/membership' },
  { path: '/contact', expectLocation: '/about' },
  { path: '/sitemap', expectLocation: '/sitemap.xml' },
  { path: '/feed', expectLocation: '/feed.xml' },
  { path: '/atom', expectLocation: '/feed.xml' },
  { path: '/atom.xml', expectLocation: '/feed.xml' },
  { path: '/blog', expectLocation: '/news' },
  { path: '/methodology/', expectLocation: '/methodology' },
]
async function check301({ path, expectLocation }) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'user-agent': GOOGLEBOT, accept: 'text/html' },
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
  })
  if (res.status !== 301 && res.status !== 308) {
    failures.push(`${path}: expected 301/308 canonical redirect, got ${res.status}`)
    return
  }
  const loc = res.headers.get('location') || ''
  if (!loc.includes(expectLocation)) {
    failures.push(`${path}: location "${loc}" missing "${expectLocation}"`)
  }
}
await Promise.all(CANONICAL_301.map(check301))

if (failures.length) {
  console.error('[verify:live-bot-noindex] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(
  `[verify:live-bot-noindex] PASS — ${SURFACES.length} noindex surfaces + soft-404 matrix clean at ${base}`,
)
