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
assert(app.includes('ComprehensiveProfilePage'), 'App route lazy import missing')
assert(app.includes('/comprehensive-profile'), 'App path missing')
assert(server.includes('/api/services/comprehensive-profile/checkout'), 'server checkout route missing')
assert(server.includes('osint-checkout') || server.includes("name: 'osint-checkout'"), 'OSINT rate limit missing')
assert(server.includes('createStripeCheckoutSessionForOsint') || server.includes('OSINT_PRICE_CENTS'), 'stripe session helper missing')
assert(server.includes("'/comprehensive-profile'"), 'known SPA route missing')
assert(social.includes('/comprehensive-profile'), 'bot social meta missing')
assert(prerender.includes("route: '/comprehensive-profile'"), 'prerender route missing')
assert(llms.includes('comprehensive-profile'), 'llms.txt entry missing')
assert(product.includes('PROFILE_REPORT_SECTIONS'), 'report sections data missing')
assert(product.includes('PROFILE_FAQS'), 'FAQ data missing')

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
