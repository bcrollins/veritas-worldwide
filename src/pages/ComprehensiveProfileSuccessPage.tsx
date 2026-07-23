import { useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import { COMPREHENSIVE_PROFILE } from '../lib/constants'
import { detectStripeReturn, handleStripeReturn, getMarketingAttribution } from '../lib/conversionTracking'
import { recordAnalyticsEvent } from '../lib/analytics'

/**
 * Post-checkout landing for Comprehensive Online Profile ($499).
 * Configure Stripe success_url → /comprehensive-profile/success?order={ORDER_ID}
 */
/** Only accept server-shaped order IDs — never reflect free-form query junk. */
function sanitizeOsintOrderId(raw: string | null | undefined): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined
  const trimmed = raw.trim()
  if (!/^osint_[a-z0-9_]{6,80}$/i.test(trimmed)) return undefined
  return trimmed
}

export default function ComprehensiveProfileSuccessPage() {
  const [params] = useSearchParams()
  const orderId = useMemo(() => {
    const fromQuery = sanitizeOsintOrderId(params.get('order'))
    if (fromQuery) return fromQuery
    if (typeof window === 'undefined') return undefined
    return sanitizeOsintOrderId(localStorage.getItem('veritas_osint_order_id'))
  }, [params])

  const stripe = useMemo(() => {
    if (typeof window === 'undefined') return { success: false as const }
    return detectStripeReturn()
  }, [])

  useEffect(() => {
    setMetaTags({
      title: `Profile Order Received | ${SITE_NAME}`,
      description: 'Your Comprehensive Online Profile order was received. Delivery follows methodology intake.',
      url: `${SITE_URL}/comprehensive-profile/success`,
      robots: 'noindex, nofollow',
    })

    handleStripeReturn()
    recordAnalyticsEvent('payment_completed', {
      product: 'comprehensive_profile',
      amount: String(COMPREHENSIVE_PROFILE.priceUsd),
      // Never send unsanitized query strings into analytics
      order_id: orderId || '',
    })

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [orderId])

  const attribution = typeof window !== 'undefined' ? getMarketingAttribution() : null

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full border border-border bg-surface p-8 md:p-10 text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.25em] uppercase text-crimson mb-4">
          Order received
        </p>
        <h1 className="font-display text-3xl font-bold text-ink mb-4">
          Comprehensive Online Profile commissioned
        </h1>
        <p className="font-body text-ink-muted leading-relaxed mb-6">
          Thank you. Payment for ${COMPREHENSIVE_PROFILE.priceUsd} USD is confirmed
          {stripe.success ? ' via Stripe' : ''}. Our research team will open your case, confirm
          subject disambiguation if needed, and deliver within{' '}
          {COMPREHENSIVE_PROFILE.deliveryBusinessDays} business days with a methodology appendix.
        </p>
        {orderId && (
          <p className="font-mono text-xs text-ink-faint mb-6 break-all">
            Reference: {orderId}
          </p>
        )}
        <ul className="text-left font-body text-sm text-ink-muted space-y-2 mb-8 border border-border bg-parchment/40 p-4">
          <li>1. Watch your inbox (and spam) for case confirmation from {COMPREHENSIVE_PROFILE.contactEmail}.</li>
          <li>2. Reply only from the email you used at checkout if we need disambiguators.</li>
          <li>3. Delivery is encrypted; re-verify sources using the methodology appendix.</li>
        </ul>
        {attribution?.utm_source && (
          <p className="font-sans text-[0.55rem] text-ink-faint mb-4">
            Attribution retained for internal analytics only.
          </p>
        )}
        <div
          className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
          data-testid="osint-success-related-hubs"
        >
          <Link
            to="/comprehensive-profile"
            className="inline-flex min-h-[44px] items-center justify-center px-5 border border-border font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink"
          >
            Service details
          </Link>
          <Link
            to="/methodology"
            className="inline-flex min-h-[44px] items-center justify-center px-5 bg-obsidian text-white font-sans text-xs font-semibold uppercase tracking-wide hover:bg-crimson"
          >
            Editorial methodology
          </Link>
          <Link
            to="/profiles"
            className="inline-flex min-h-[44px] items-center justify-center px-5 border border-border font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink"
          >
            Free Power Profiles
          </Link>
          <Link
            to="/search"
            className="inline-flex min-h-[44px] items-center justify-center px-5 border border-border font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink"
          >
            Search
          </Link>
          <a
            href="/research-pack.zip"
            download="veritas-research-pack.zip"
            className="inline-flex min-h-[44px] items-center justify-center px-5 border border-border font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:border-ink"
            data-testid="osint-success-research-pack"
          >
            Free research pack (ZIP)
          </a>
        </div>
      </div>
    </div>
  )
}
