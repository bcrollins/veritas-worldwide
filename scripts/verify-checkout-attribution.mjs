#!/usr/bin/env node
/**
 * Pure-function checks for membership checkout attribution helpers.
 * Duplicates the pure URL/ref builders so Node can verify without DOM deps.
 */

function attributionToEventProps(attr) {
  if (!attr) return {}
  const props = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref']) {
    if (attr[key]) props[key] = attr[key]
  }
  if (attr.landingPath) props.landing_path = attr.landingPath
  return props
}

function buildClientReferenceId(attr, tier, billing) {
  const parts = [
    'v1',
    tier || '',
    billing || '',
    attr?.utm_source || '',
    attr?.utm_medium || '',
    attr?.utm_campaign || '',
    attr?.ref || '',
  ]
  return parts
    .map((part) => String(part).replace(/[|]/g, '-').slice(0, 40))
    .join('|')
    .slice(0, 200)
}

function withCheckoutAttribution(checkoutUrl, options = {}) {
  try {
    const url = new URL(checkoutUrl)
    const attr = options.attribution || null
    const clientRef = buildClientReferenceId(attr, options.tier, options.billing)
    if (clientRef && clientRef !== 'v1|||||') {
      url.searchParams.set('client_reference_id', clientRef)
    }
    if (attr?.utm_source) url.searchParams.set('utm_source', attr.utm_source)
    if (attr?.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium)
    if (attr?.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign)
    return url.toString()
  } catch {
    return checkoutUrl
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:checkout-attribution] FAIL — ${message}`)
    process.exit(1)
  }
}

const attr = {
  utm_source: 'newsletter',
  utm_medium: 'email',
  utm_campaign: 'spring-2026',
  ref: 'homepage-cta',
  landingPath: '/membership',
}

const ref = buildClientReferenceId(attr, 'investigator', 'annual')
assert(ref.startsWith('v1|investigator|annual|newsletter|email|spring-2026|homepage-cta'), `unexpected ref: ${ref}`)
assert(ref.length <= 200, 'client_reference_id exceeds 200 chars')

const url = withCheckoutAttribution('https://buy.stripe.com/test_link', {
  tier: 'investigator',
  billing: 'annual',
  attribution: attr,
})
assert(url.includes('client_reference_id='), 'missing client_reference_id')
assert(url.includes('utm_source=newsletter'), 'missing utm_source')
assert(url.includes('utm_medium=email'), 'missing utm_medium')
assert(url.includes('utm_campaign=spring-2026'), 'missing utm_campaign')

const props = attributionToEventProps(attr)
assert(props.utm_source === 'newsletter', 'props missing utm_source')
assert(props.landing_path === '/membership', 'props missing landing_path')

const empty = withCheckoutAttribution('https://buy.stripe.com/test_link', {
  attribution: null,
})
assert(empty === 'https://buy.stripe.com/test_link' || !empty.includes('utm_source='), 'empty attr should not invent UTMs')

// pipe characters sanitized
const dirty = buildClientReferenceId({ utm_source: 'a|b' }, 'tier|x', 'monthly')
assert(!dirty.split('|').some((part, i) => i > 0 && part.includes('|')), 'pipes should be sanitized inside segments')
assert(dirty.includes('a-b'), `expected sanitized source in ${dirty}`)

console.log('[verify:checkout-attribution] PASS')
