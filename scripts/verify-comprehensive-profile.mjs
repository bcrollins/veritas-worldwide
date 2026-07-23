#!/usr/bin/env node
/**
 * verify-comprehensive-profile.mjs
 * Gates for the $499 Comprehensive Online Profile service surface.
 * Anonymity: forbids operator personal identity strings in product surfaces.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function assert(cond, msg) {
  if (!cond) {
    console.error(`[verify:comprehensive-profile] FAIL: ${msg}`)
    process.exit(1)
  }
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

const page = read('src/pages/ComprehensiveProfilePage.tsx')
const success = read('src/pages/ComprehensiveProfileSuccessPage.tsx')
const constants = read('src/lib/constants.ts')
const product = read('src/data/comprehensiveProfileProduct.ts')
const app = read('src/App.tsx')
const server = read('server.js')
const social = read('server-social-meta.js')
const prerender = read('scripts/prerender.mjs')
const llms = read('public/llms.txt')

assert(constants.includes('COMPREHENSIVE_PROFILE'), 'constants export missing')
assert(constants.includes('priceUsd: 499'), 'price must be 499 USD')
assert(page.includes('Comprehensive Online Profile'), 'product page title missing')
assert(page.includes('/api/services/comprehensive-profile/checkout'), 'checkout API client missing')
assert(page.includes('attestLawful'), 'lawful attestation required')
assert(page.includes('device') || page.includes('Device'), 'device authentication copy required')
assert(page.includes('methodology') || page.includes('Methodology'), 'methodology required')
assert(success.includes('noindex'), 'success page must be noindex')
assert(server.includes("'/comprehensive-profile/success'") || server.includes('/comprehensive-profile/success'), 'server knows success route')
assert(/noindex/i.test(server) && server.includes('comprehensive-profile/success'), 'server bot-meta noindex for success path')
assert(app.includes('ComprehensiveProfilePage'), 'App route lazy import missing')
assert(app.includes('/comprehensive-profile'), 'App path missing')
assert(server.includes('/api/services/comprehensive-profile/checkout'), 'server checkout route missing')
assert(server.includes('osint-checkout') || server.includes("name: 'osint-checkout'"), 'OSINT rate limit missing')
assert(server.includes('createStripeCheckoutSessionForOsint') || server.includes('OSINT_PRICE_CENTS'), 'stripe session helper missing')
assert(server.includes("'/comprehensive-profile'"), 'known SPA route missing')
assert(social.includes('/comprehensive-profile'), 'bot social meta missing')
assert(prerender.includes("route: '/comprehensive-profile'"), 'prerender route missing')

assert(
  prerender.includes('og-comprehensive-profile') || page.includes('og-comprehensive-profile'),
  'OSINT social OG image path missing',
)
assert(llms.includes('comprehensive-profile'), 'llms.txt entry missing')
assert(product.includes('PROFILE_REPORT_SECTIONS'), 'report sections data missing')
assert(product.includes('PROFILE_FAQS'), 'FAQ data missing')

const robots = read('public/robots.txt')
assert(robots.includes('Allow: /comprehensive-profile'), 'robots must Allow product path')
assert(robots.includes('Disallow: /comprehensive-profile/success'), 'robots must Disallow success path')

const ogAsset = path.join(root, 'public/og-comprehensive-profile.svg')
assert(fs.existsSync(ogAsset), 'public/og-comprehensive-profile.svg missing')

const contentPack = read('src/pages/ContentPackPage.tsx')
assert(contentPack.includes('/comprehensive-profile'), 'content pack must link OSINT service')
assert(contentPack.includes('content-pack-osint-card') || contentPack.includes('Comprehensive Online Profile'), 'content pack OSINT card missing')
assert(
  page.includes('/research-pack.zip'),
  'OSINT product page must distinguish free offline research pack from paid dossier',
)

const liveAnon = read('scripts/verify-live-anonymity.mjs')
assert(liveAnon.includes('/comprehensive-profile'), 'live-anonymity must probe OSINT HTML')

assert(server.includes("service_order_recorded"), 'server must allow service_order_recorded analytics')
assert(server.includes('serviceOrders') || server.includes('service_order_recorded'), 'funnel serviceOrders wiring missing')
assert(
  server.includes('osint-orders') && server.includes("res.status(404)"),
  'server must hard-deny public osint-orders / data paths',
)
assert(page.includes('osint-form-error'), 'form error id for aria-describedby missing')
assert(page.includes('aria-describedby'), 'form aria-describedby missing')
assert(page.includes('osint-mobile-sticky-checkout') || page.includes('sticky'), 'mobile/desktop sticky checkout missing')
assert(page.includes('min-h-[44px]'), '44px touch targets expected on OSINT form')
assert(page.includes('aria-required'), 'OSINT form must mark required fields aria-required')
assert(page.includes('aria-invalid'), 'OSINT form must support aria-invalid on field errors')
assert(page.includes('aria-busy'), 'OSINT form/submit must expose aria-busy while submitting')
assert(page.includes('companyWebsite') || page.includes('osint-company-website'), 'honeypot field required for bot abuse control')
assert(page.includes('osint-form-hint') || page.includes('sr-only'), 'screen-reader form hint missing')
assert(page.includes('scroll-mt-28') || page.includes('scroll-mt-'), 'sticky jump target needs scroll margin')
assert(page.includes('FIELD_IDS') || page.includes('osint-client-name'), 'explicit field ids for labels required')
assert(page.includes('intakeReady') || page.includes('Pay now'), 'sticky checkout ready-state missing')
assert(success.includes('sanitizeOsintOrderId') || success.includes('osint_'), 'success page must sanitize order id')
assert(server.includes('purgeExpiredOsintOrders') || server.includes('OSINT_RETENTION_DAYS'), 'OSINT retention purge missing')
assert(server.includes('/api/admin/osint-orders'), 'admin OSINT orders redacted tail missing')
assert(server.includes('redactOsintOrder'), 'OSINT order redaction helper missing')
assert(server.includes('OSINT ops token not configured'), 'admin OSINT API must 503 without token')
assert(server.includes("pth.startsWith('/api/')") || server.includes('startsWith("/api/")'),
  'sensitive-path deny must skip /api/ so admin OSINT routes work')
assert(server.includes('osintTokensEqual') || server.includes('timingSafeEqual'), 'admin token compare must be timing-safe')
assert(server.includes('OSINT_LAWFUL_PURPOSES') || server.includes('due-diligence'), 'lawful-purpose allowlist missing')
assert(server.includes('sanitizeOsintKnownLinks'), 'knownLinks URL allowlist sanitizer missing')
assert(server.includes('mintOsintOrderId') || server.includes('OSINT_ORDER_ID_RE'), 'order id mint/format guard missing')
assert(server.includes('honeypot') || server.includes('companyWebsite'), 'server honeypot handling missing')
assert(
  server.includes("startsWith(OSINT_ORDERS_DIR") || server.includes('OSINT_ORDERS_PATH must resolve under data'),
  'OSINT order path must fail-closed under data/',
)
assert(
  !server.includes('qToken !== expected') || server.includes('Prefer Authorization header'),
  'admin OSINT must not accept query-string tokens (Referer/log leak)',
)


// Methodology completeness floor
const methodologyHits = (constants.match(/methodology/gi) || []).length
assert(methodologyHits >= 1, 'methodology present in constants')

// Anonymity audit on product surfaces
const identityRe = /brandon\s*rollins|brollins565|bcrollins|brandoncrollins@|fft442|910[-\s]?238|deerfield\s*beach|aero.?link/i
for (const [label, src] of [
  ['page', page],
  ['success', success],
  ['constants', constants],
  ['product', product],
]) {
  assert(!identityRe.test(src), `identity leak in ${label}`)
}

// FAQ count floor
const faqCount = (product.match(/q:/g) || []).length
assert(faqCount >= 6, `expected ≥6 FAQs, got ${faqCount}`)

// Report sections floor
const sectionCount = (product.match(/id: '/g) || []).length
assert(sectionCount >= 8, `expected ≥8 report sections, got ${sectionCount}`)

const privacy = read('src/pages/PrivacyPage.tsx')
assert(/Comprehensive Online Profile/i.test(privacy), 'privacy must mention Comprehensive Online Profile')
assert(/Stripe/i.test(privacy), 'privacy must mention Stripe')
console.log('[verify:comprehensive-profile] PASS')
console.log(
  JSON.stringify(
    {
      priceUsd: 499,
      routes: ['/comprehensive-profile', '/comprehensive-profile/success'],
      faqCount,
      sectionCount,
      anonymity: 'pass',
    },
    null,
    2
  )
)
