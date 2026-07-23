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

if (failures.length) {
  console.error('[verify:live-bot-noindex] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(
  `[verify:live-bot-noindex] PASS — ${SURFACES.length} Googlebot noindex surfaces clean at ${base}`,
)
