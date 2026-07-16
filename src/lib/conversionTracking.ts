/**
 * Conversion tracking utilities — tracks Stripe checkout completion
 * and membership signups via URL parameters and referrer detection.
 *
 * Captures marketing attribution (UTM + ref) for first-touch and last-touch,
 * attaches it to analytics events, and stamps Stripe Payment Links with
 * client_reference_id so sessions remain attributable after redirect.
 */
import { trackEvent } from './hubspot'
import { recordAnalyticsEvent } from './analytics'
import { scoreDonationCompleted } from './leadScoring'

type GtagFn = (...args: unknown[]) => void

const ATTRIBUTION_SESSION_KEY = 'veritas_attribution_last'
const ATTRIBUTION_FIRST_KEY = 'veritas_attribution_first'
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'ref',
] as const

export type MarketingAttribution = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  ref?: string
  landingPath?: string
  capturedAt?: number
}

function getGtag(): GtagFn | null {
  const w = window as unknown as Record<string, unknown>
  return typeof w.gtag === 'function' ? (w.gtag as GtagFn) : null
}

function readStoredAttribution(key: string): MarketingAttribution | null {
  try {
    const raw = localStorage.getItem(key) || sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as MarketingAttribution
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function attributionFromSearch(search: string, pathname: string): MarketingAttribution | null {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
  const attr: MarketingAttribution = {}
  let found = false

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim()
    if (value) {
      attr[key] = value.slice(0, 120)
      found = true
    }
  }

  if (!found) return null

  attr.landingPath = pathname || '/'
  attr.capturedAt = Date.now()
  return attr
}

/** Serialize attribution for analytics event properties (string values only). */
export function attributionToEventProps(attr: MarketingAttribution | null): Record<string, string> {
  if (!attr) return {}
  const props: Record<string, string> = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = attr[key]
    if (value) props[key] = value
  }
  if (attr.landingPath) props.landing_path = attr.landingPath
  return props
}

/**
 * Compact reference id for Stripe Payment Links (max ~200 chars recommended).
 * Format: v1|src|med|camp|ref
 */
export function buildClientReferenceId(
  attr: MarketingAttribution | null,
  tier?: string,
  billing?: string
): string {
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

/**
 * Append client_reference_id (and known UTM params as client_reference fallback)
 * to a Stripe Payment Link URL without clobbering existing query params.
 */
export function withCheckoutAttribution(
  checkoutUrl: string,
  options?: { tier?: string; billing?: string; attribution?: MarketingAttribution | null }
): string {
  try {
    const url = new URL(checkoutUrl)
    const attr = options?.attribution ?? getMarketingAttribution()
    const clientRef = buildClientReferenceId(attr, options?.tier, options?.billing)
    if (clientRef && clientRef !== 'v1|||||') {
      url.searchParams.set('client_reference_id', clientRef)
    }
    if (attr?.utm_source) url.searchParams.set('utm_source', attr.utm_source)
    if (attr?.utm_medium) url.searchParams.set('utm_medium', attr.utm_medium)
    if (attr?.utm_campaign) url.searchParams.set('utm_campaign', attr.utm_campaign)
    if (attr?.utm_content) url.searchParams.set('utm_content', attr.utm_content)
    if (attr?.utm_term) url.searchParams.set('utm_term', attr.utm_term)
    return url.toString()
  } catch {
    return checkoutUrl
  }
}

/** Capture UTM/ref from the current URL into session (last-touch) and local (first-touch). */
export function captureMarketingAttribution(
  search: string = typeof window !== 'undefined' ? window.location.search : '',
  pathname: string = typeof window !== 'undefined' ? window.location.pathname : '/'
): MarketingAttribution | null {
  if (typeof window === 'undefined') return null

  const attr = attributionFromSearch(search, pathname)
  if (!attr) return getMarketingAttribution()

  try {
    sessionStorage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(attr))
    if (!localStorage.getItem(ATTRIBUTION_FIRST_KEY)) {
      localStorage.setItem(ATTRIBUTION_FIRST_KEY, JSON.stringify(attr))
    }
  } catch {
    // storage may be unavailable (private mode); ignore
  }

  return attr
}

/** Prefer last-touch session attribution, fall back to first-touch. */
export function getMarketingAttribution(): MarketingAttribution | null {
  if (typeof window === 'undefined') return null
  return readStoredAttribution(ATTRIBUTION_SESSION_KEY) || readStoredAttribution(ATTRIBUTION_FIRST_KEY)
}

/** Parse URL for Stripe checkout success indicators */
export function detectStripeReturn(): { success: boolean; tier?: string; billing?: string } {
  const params = new URLSearchParams(window.location.search)
  // Stripe Payment Links redirect back with checkout_session_id
  const sessionId = params.get('checkout_session_id') || params.get('session_id')
  if (sessionId) {
    // Try to extract tier from the referrer or stored state
    const tier = localStorage.getItem('veritas_checkout_tier') || 'unknown'
    const billing = localStorage.getItem('veritas_checkout_billing') || 'unknown'
    return { success: true, tier, billing }
  }
  return { success: false }
}

/** Store checkout intent before redirecting to Stripe */
export function trackCheckoutIntent(tier: string, billing: 'monthly' | 'annual', amount: number): void {
  localStorage.setItem('veritas_checkout_tier', tier)
  localStorage.setItem('veritas_checkout_billing', billing)
  localStorage.setItem('veritas_checkout_amount', String(amount))
  localStorage.setItem('veritas_checkout_ts', String(Date.now()))

  const attributionProps = attributionToEventProps(getMarketingAttribution())

  // GA4: begin_checkout
  getGtag()?.('event', 'begin_checkout', {
    currency: 'USD',
    value: amount,
    ...attributionProps,
    items: [{
      item_id: `membership_${tier}`,
      item_name: `${tier} Membership (${billing})`,
      item_category: 'Membership',
      price: amount,
      quantity: 1,
    }],
  })

  // HubSpot: track checkout intent
  trackEvent('checkout_started', {
    tier,
    billing,
    amount: String(amount),
    page: window.location.pathname,
    ...attributionProps,
  })
  recordAnalyticsEvent('checkout_started', {
    tier,
    billing,
    amount: String(amount),
    ...attributionProps,
  })
}

/** Track donation intent before redirecting to Stripe */
export function trackDonationIntent(amount: number): void {
  localStorage.setItem('veritas_checkout_tier', 'donation')
  localStorage.setItem('veritas_checkout_billing', 'one-time')
  localStorage.setItem('veritas_checkout_amount', String(amount))
  localStorage.setItem('veritas_checkout_ts', String(Date.now()))

  const attributionProps = attributionToEventProps(getMarketingAttribution())

  getGtag()?.('event', 'begin_checkout', {
    currency: 'USD',
    value: amount,
    ...attributionProps,
    items: [{
      item_id: 'donation',
      item_name: 'One-Time Donation',
      item_category: 'Donation',
      price: amount,
      quantity: 1,
    }],
  })

  trackEvent('donation_started', {
    amount: String(amount),
    page: window.location.pathname,
    ...attributionProps,
  })
  recordAnalyticsEvent('donation_started', {
    amount: String(amount),
    ...attributionProps,
  })
}

/** Fire conversion events when user returns from successful Stripe checkout */
export function handleStripeReturn(): void {
  const { success, tier, billing } = detectStripeReturn()
  if (!success) return

  const amount = parseFloat(localStorage.getItem('veritas_checkout_amount') || '0')
  const checkoutTs = parseInt(localStorage.getItem('veritas_checkout_ts') || '0', 10)

  // Only process if checkout was initiated in the last 2 hours
  if (Date.now() - checkoutTs > 2 * 60 * 60 * 1000) return

  const attributionProps = attributionToEventProps(getMarketingAttribution())

  // GA4: purchase event
  getGtag()?.('event', 'purchase', {
    transaction_id: `stripe_${Date.now()}`,
    currency: 'USD',
    value: amount,
    ...attributionProps,
    items: [{
      item_id: tier === 'donation' ? 'donation' : `membership_${tier}`,
      item_name: tier === 'donation' ? 'One-Time Donation' : `${tier} Membership (${billing})`,
      item_category: tier === 'donation' ? 'Donation' : 'Membership',
      price: amount,
      quantity: 1,
    }],
  })

  const completionProps = {
    tier: tier || 'unknown',
    billing: billing || 'unknown',
    amount: String(amount),
    ...attributionProps,
  }

  if (tier === 'donation') {
    scoreDonationCompleted(String(amount))
  } else {
    trackEvent('payment_completed', completionProps)
    recordAnalyticsEvent('payment_completed', completionProps)
  }

  // Clean up checkout state
  localStorage.removeItem('veritas_checkout_tier')
  localStorage.removeItem('veritas_checkout_billing')
  localStorage.removeItem('veritas_checkout_amount')
  localStorage.removeItem('veritas_checkout_ts')

  // Clean the URL (remove Stripe params)
  const url = new URL(window.location.href)
  url.searchParams.delete('checkout_session_id')
  url.searchParams.delete('session_id')
  window.history.replaceState({}, '', url.toString())
}
