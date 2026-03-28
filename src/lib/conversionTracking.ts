/**
 * Conversion tracking utilities — tracks Stripe checkout completion
 * and membership signups via URL parameters and referrer detection.
 *
 * When users return from Stripe Payment Links, the URL may contain
 * a success parameter. This module detects that and fires GA4 +
 * HubSpot conversion events.
 */
import { trackEvent } from './hubspot'
import { recordAnalyticsEvent } from './analytics'
import { scoreDonationCompleted } from './leadScoring'

type GtagFn = (...args: unknown[]) => void

function getGtag(): GtagFn | null {
  const w = window as unknown as Record<string, unknown>
  return typeof w.gtag === 'function' ? (w.gtag as GtagFn) : null
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

  // GA4: begin_checkout
  getGtag()?.('event', 'begin_checkout', {
    currency: 'USD',
    value: amount,
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
  })
  recordAnalyticsEvent('checkout_started', {
    tier,
    billing,
    amount: String(amount),
  })
}

/** Track donation intent before redirecting to Stripe */
export function trackDonationIntent(amount: number): void {
  localStorage.setItem('veritas_checkout_tier', 'donation')
  localStorage.setItem('veritas_checkout_billing', 'one-time')
  localStorage.setItem('veritas_checkout_amount', String(amount))
  localStorage.setItem('veritas_checkout_ts', String(Date.now()))

  getGtag()?.('event', 'begin_checkout', {
    currency: 'USD',
    value: amount,
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
  })
  recordAnalyticsEvent('donation_started', {
    amount: String(amount),
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

  // GA4: purchase event
  getGtag()?.('event', 'purchase', {
    transaction_id: `stripe_${Date.now()}`,
    currency: 'USD',
    value: amount,
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
