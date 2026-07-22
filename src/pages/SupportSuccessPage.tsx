import { useEffect, useMemo } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import { useAuth } from '../lib/AuthContext'
import {
  detectStripeReturn,
  getMarketingAttribution,
  handleStripeReturn,
} from '../lib/conversionTracking'

type SupportKind = 'membership' | 'donation'

function resolveKind(pathname: string, kindParam: string | null): SupportKind {
  if (kindParam === 'donation' || kindParam === 'membership') return kindParam
  if (pathname.includes('donation')) return 'donation'
  return 'membership'
}

function tierLabel(tier: string | undefined, kind: SupportKind): string {
  if (kind === 'donation') return 'One-time support'
  switch ((tier || '').toLowerCase()) {
    case 'correspondent':
      return 'Correspondent'
    case 'investigator':
      return 'Investigator'
    case 'founding':
      return 'Founding Circle'
    default:
      return 'Membership'
  }
}

/**
 * Post-checkout landing for Stripe Payment Links and one-time donations.
 * Configure Stripe Payment Link "After payment" → redirect to:
 *   https://veritasworldwide.com/membership/success
 *   https://veritasworldwide.com/donation/success
 * Optional: append ?checkout_session_id={CHECKOUT_SESSION_ID} when Stripe supports it.
 */
export default function SupportSuccessPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { isLoggedIn, openAuthModal } = useAuth()

  const kind = resolveKind(location.pathname, searchParams.get('kind'))
  const stripe = useMemo(() => {
    if (typeof window === 'undefined') return { success: false as const }
    return detectStripeReturn()
  }, [location.pathname, location.search])

  const storedTier =
    typeof window !== 'undefined' ? localStorage.getItem('veritas_checkout_tier') || undefined : undefined
  const storedBilling =
    typeof window !== 'undefined' ? localStorage.getItem('veritas_checkout_billing') || undefined : undefined
  const tier = searchParams.get('tier') || stripe.tier || storedTier
  const billing = searchParams.get('billing') || stripe.billing || storedBilling
  const attribution = typeof window !== 'undefined' ? getMarketingAttribution() : null

  const headline =
    kind === 'donation'
      ? 'Thank you for supporting the record.'
      : `Welcome to the ${tierLabel(tier, kind)} circle.`

  const description =
    kind === 'donation'
      ? 'Your gift funds document acquisition, primary-source research, and the infrastructure that keeps the core archive free to read.'
      : 'Your membership funds independent investigative publishing. The public archive stays open — your support pays for the work behind it.'

  useEffect(() => {
    setMetaTags({
      title:
        kind === 'donation'
          ? `Donation Received | ${SITE_NAME}`
          : `Membership Confirmed | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}${location.pathname}`,
      // Success pages should not rank as evergreen content.
      robots: 'noindex, nofollow',
    })
    // Fire purchase conversion when Stripe session or recent checkout intent is present.
    handleStripeReturn()
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [kind, description, location.pathname])

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <section className="border-b border-border bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            {kind === 'donation' ? 'Support Confirmed' : 'Membership Confirmed'}
          </p>
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-sm bg-crimson/10 text-crimson flex-shrink-0"
              aria-hidden="true"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">{headline}</h1>
              <p className="font-body text-lg text-ink-muted leading-relaxed max-w-3xl mt-4">{description}</p>
              {(tier || billing) && kind === 'membership' && (
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                  Plan: {tierLabel(tier, kind)}
                  {billing && billing !== 'unknown' ? ` · ${billing}` : ''}
                </p>
              )}
              {attribution?.utm_campaign && (
                <p className="mt-2 font-mono text-[0.65rem] text-ink-faint">
                  Campaign: {attribution.utm_campaign}
                  {attribution.utm_source ? ` · ${attribution.utm_source}` : ''}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to={kind === 'donation' ? '/read' : '/israel-dossier'}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-crimson px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-crimson-dark transition-colors"
                >
                  {kind === 'donation' ? 'Continue reading' : 'Open the Israel Dossier'}
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
                >
                  {kind === 'donation' ? 'Explore membership' : 'Review membership tiers'}
                </Link>
                {!isLoggedIn && (
                  <button
                    type="button"
                    onClick={() =>
                      openAuthModal({
                        mode: 'signup',
                        intent: { returnTo: '/read', source: 'support_success' },
                      })
                    }
                    className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
                  >
                    Create free reader account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-6 md:grid-cols-3">
        {[
          {
            eyebrow: 'Archive',
            title: 'Read The Record',
            description: '32 archive parts with labeled evidence tiers and primary-source rows.',
            to: '/read',
          },
          {
            eyebrow: 'Investigation',
            title: 'Israel Dossier',
            description: 'Incidents, actors, money trail, CSV exports, and machine-readable corpus.',
            to: '/israel-dossier',
          },
          {
            eyebrow: 'Method',
            title: 'How we source',
            description: 'Evidence standards, taxonomy, and the public methodology page.',
            to: '/methodology',
          },
        ].map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group block border border-border bg-surface p-5 hover:border-crimson/40 transition-colors min-h-[44px]"
          >
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.16em] uppercase text-crimson mb-2">
              {card.eyebrow}
            </p>
            <h2 className="font-display text-xl font-bold text-ink group-hover:text-crimson transition-colors">
              {card.title}
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">{card.description}</p>
          </Link>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-border bg-surface p-5">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
            Receipts &amp; questions
          </p>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Stripe emails a receipt to the address used at checkout. For membership or rights questions, write{' '}
            <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">
              rights@veritasworldwide.com
            </a>
            . Editorial corrections:{' '}
            <a href="mailto:corrections@veritasworldwide.com" className="text-crimson hover:underline">
              corrections@veritasworldwide.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
