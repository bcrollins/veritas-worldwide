import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import RelatedHubs, { type RelatedHub } from '../components/RelatedHubs'

import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  breadcrumbJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo'

import { COMPREHENSIVE_PROFILE, TAGLINE } from '../lib/constants'
import {
  PROFILE_FAQS,
  PROFILE_REPORT_SECTIONS,
  LAWFUL_PURPOSE_OPTIONS,
} from '../data/comprehensiveProfileProduct'
import { trackCheckoutIntent, withCheckoutAttribution } from '../lib/conversionTracking'
import { trackSupportClick } from '../lib/ga4'
import { recordAnalyticsEvent } from '../lib/analytics'
import { identifyContact } from '../lib/hubspot'
import FontSizeToggle from '../components/FontSizeToggle'
import { useI18n } from '../lib/i18n'

const OSINT_HUBS: readonly RelatedHub[] = [
  { to: '/profiles', label: 'Profiles' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/israel-dossier', label: 'Dossiers' },
  { to: '/search', label: 'Search' },
  { to: '/read', label: 'Read' },
]

type IntakeState = {
  clientName: string
  clientEmail: string
  subjectFullName: string
  subjectAliases: string
  subjectLocation: string
  subjectDobOrAge: string
  subjectIdentifiers: string
  lawfulPurpose: string
  purposeDetail: string
  knownLinks: string
  notes: string
  /** Honeypot — must stay empty. Bots that fill it are rejected server-side. */
  companyWebsite: string
  attestLawful: boolean
  attestNoHarassment: boolean
  attestAdult: boolean
}

const INITIAL: IntakeState = {
  clientName: '',
  clientEmail: '',
  subjectFullName: '',
  subjectAliases: '',
  subjectLocation: '',
  subjectDobOrAge: '',
  subjectIdentifiers: '',
  lawfulPurpose: 'due-diligence',
  purposeDetail: '',
  knownLinks: '',
  notes: '',
  companyWebsite: '',
  attestLawful: false,
  attestNoHarassment: false,
  attestAdult: false,
}

const FIELD_IDS = {
  clientName: 'osint-client-name',
  clientEmail: 'osint-client-email',
  subjectFullName: 'osint-subject-name',
  subjectAliases: 'osint-subject-aliases',
  subjectLocation: 'osint-subject-location',
  subjectDobOrAge: 'osint-subject-dob',
  subjectIdentifiers: 'osint-subject-ids',
  knownLinks: 'osint-known-links',
  lawfulPurpose: 'osint-lawful-purpose',
  purposeDetail: 'osint-purpose-detail',
  notes: 'osint-notes',
  companyWebsite: 'osint-company-website',
  attestLawful: 'osint-attest-lawful',
  attestNoHarassment: 'osint-attest-harassment',
  attestAdult: 'osint-attest-adult',
} as const

export default function ComprehensiveProfilePage() {
  const { t } = useI18n()
  const [form, setForm] = useState<IntakeState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof IntakeState, string>>>({})
  const [orderId, setOrderId] = useState<string | null>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const canceled = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('canceled') === '1'
  }, [])

  const priceLabel = `$${COMPREHENSIVE_PROFILE.priceUsd}`
  const intakeReady =
    form.attestLawful &&
    form.attestNoHarassment &&
    form.attestAdult &&
    form.clientEmail.includes('@') &&
    form.subjectFullName.trim().length >= 2 &&
    form.clientName.trim().length >= 1

  useEffect(() => {
    const url = `${SITE_URL}/comprehensive-profile`
    setMetaTags({
      title: `Comprehensive Online Profile ($${COMPREHENSIVE_PROFILE.priceUsd}) | ${SITE_NAME}`,
      description:
        'Commission a $499 comprehensive online profile: expert OSINT investigators gather every authenticated public trail on a subject — devices and accounts only when verified — with full methodology.',
      url,
      type: 'website',
      image: `${SITE_URL}/og-comprehensive-profile.svg`,
      imageAlt: 'Comprehensive Online Profile ($499) — Veritas Worldwide research service',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Comprehensive Online Profile',
        description:
          'Fixed-price authenticated open-source investigation report with methodology appendix.',
        url,
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        mainEntity: {
          '@type': 'Product',
          name: COMPREHENSIVE_PROFILE.name,
          description: COMPREHENSIVE_PROFILE.tagline,
          brand: { '@type': 'Organization', name: SITE_NAME },
          category: 'Investigative research service',
          offers: {
            '@type': 'Offer',
            price: String(COMPREHENSIVE_PROFILE.priceUsd),
            priceCurrency: COMPREHENSIVE_PROFILE.currency,
            availability: 'https://schema.org/InStock',
            url,
            priceValidUntil: '2027-12-31',
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: PROFILE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Services', url: `${SITE_URL}/comprehensive-profile` },
        { name: 'Comprehensive Online Profile', url },
      ]),
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  function update<K extends keyof IntakeState>(key: K, value: IntakeState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function focusFormError() {
    // Defer so the error node is in the DOM after setState paint.
    requestAnimationFrame(() => {
      errorRef.current?.focus()
      errorRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    })
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    const nextFieldErrors: Partial<Record<keyof IntakeState, string>> = {}

    if (!form.clientName.trim()) {
      nextFieldErrors.clientName = 'Your name is required.'
    }
    if (!form.clientEmail.includes('@')) {
      nextFieldErrors.clientEmail = 'A valid delivery email is required.'
    }
    if (form.subjectFullName.trim().length < 2) {
      nextFieldErrors.subjectFullName = 'Subject full name is required.'
    }
    if (!form.attestLawful || !form.attestNoHarassment || !form.attestAdult) {
      nextFieldErrors.attestLawful = 'All three legal attestations are required before checkout.'
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setError(
        nextFieldErrors.attestLawful ||
          nextFieldErrors.clientEmail ||
          nextFieldErrors.subjectFullName ||
          nextFieldErrors.clientName ||
          'Please correct the highlighted fields.',
      )
      focusFormError()
      // Move keyboard focus to first invalid control when possible
      const firstKey = (['clientName', 'clientEmail', 'subjectFullName'] as const).find(
        (k) => nextFieldErrors[k],
      )
      if (firstKey) {
        const el = document.getElementById(FIELD_IDS[firstKey])
        el?.focus()
      }
      return
    }

    setFieldErrors({})
    setSubmitting(true)
    try {
      trackSupportClick('comprehensive-profile-checkout')
      trackCheckoutIntent('comprehensive-profile', 'annual', COMPREHENSIVE_PROFILE.priceUsd)
      recordAnalyticsEvent('checkout_started', {
        product: 'comprehensive_profile',
        amount: String(COMPREHENSIVE_PROFILE.priceUsd),
      })

      const res = await fetch('/api/services/comprehensive-profile/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName.trim(),
          clientEmail: form.clientEmail.trim().toLowerCase(),
          subjectFullName: form.subjectFullName.trim(),
          subjectAliases: form.subjectAliases.trim(),
          subjectLocation: form.subjectLocation.trim(),
          subjectDobOrAge: form.subjectDobOrAge.trim(),
          subjectIdentifiers: form.subjectIdentifiers.trim(),
          lawfulPurpose: form.lawfulPurpose,
          purposeDetail: form.purposeDetail.trim(),
          knownLinks: form.knownLinks.trim(),
          notes: form.notes.trim(),
          companyWebsite: form.companyWebsite,
          attestLawful: form.attestLawful,
          attestNoHarassment: form.attestNoHarassment,
          attestAdult: form.attestAdult,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        orderId?: string
        checkoutUrl?: string
        message?: string
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Checkout failed (${res.status})`)
      }

      if (data.orderId && /^osint_[a-z0-9_]+$/i.test(data.orderId)) {
        setOrderId(data.orderId)
        try {
          localStorage.setItem('veritas_osint_order_id', data.orderId)
          localStorage.setItem('veritas_checkout_tier', 'comprehensive-profile')
          localStorage.setItem('veritas_checkout_amount', String(COMPREHENSIVE_PROFILE.priceUsd))
        } catch {
          /* ignore */
        }
        // Optional HubSpot lead mirror — email + service source only (no free-text purpose/notes in CRM props)
        try {
          identifyContact({
            email: form.clientEmail.trim().toLowerCase(),
            firstName: form.clientName.trim().split(/\s+/)[0] || undefined,
            source: 'comprehensive_profile',
            contentInterest: 'osint_service',
            referrer: '/comprehensive-profile',
          })
        } catch {
          /* HubSpot optional */
        }
      }

      if (data.checkoutUrl && /^https:\/\//i.test(data.checkoutUrl)) {
        const attributed = withCheckoutAttribution(data.checkoutUrl, {
          tier: 'comprehensive-profile',
          billing: 'one_time',
        })
        window.location.assign(attributed)
        return
      }

      // Static Payment Link fallback from constants when server has no Stripe key
      if (COMPREHENSIVE_PROFILE.checkoutUrl && /^https:\/\//i.test(COMPREHENSIVE_PROFILE.checkoutUrl)) {
        window.location.assign(
          withCheckoutAttribution(COMPREHENSIVE_PROFILE.checkoutUrl, {
            tier: 'comprehensive-profile',
            billing: 'one_time',
          }),
        )
        return
      }

      setError(
        data.message ||
          'Order recorded. Secure checkout is temporarily unavailable — we will email a payment link to the address you provided within one business day.',
      )
      focusFormError()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed. Please try again.')
      focusFormError()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="inline-flex min-h-[44px] items-center text-ink-muted hover:text-crimson transition-colors">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <Link to="/membership" className="inline-flex min-h-[44px] items-center text-ink-muted hover:text-crimson transition-colors">
              Support
            </Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Comprehensive Online Profile</span>
            <span className="ml-auto">
              <FontSizeToggle />
            </span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-obsidian text-white py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto relative">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase text-crimson-light mb-6">
            Research service · Fixed price
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6">
            {t('osint.hero.title')}
            <span className="block text-crimson-light mt-2">
              {priceLabel} — {t('osint.hero.lead')}
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/65 leading-relaxed max-w-3xl mb-6">
            {COMPREHENSIVE_PROFILE.tagline} Our research team gathers what is lawfully public and
            verifiably linked to your subject — including device and account identifiers only when
            authentication holds — and delivers one structured report with full methodology.
          </p>
          <p className="font-sans text-sm text-white/45 mb-6 max-w-2xl">
            {TAGLINE} This is a private research deliverable, separate from free Power Profiles and
            the public archive.
          </p>
          <RelatedHubs
            testId="osint-related-hubs"
            hubs={OSINT_HUBS}
            className="mt-5"
          />
          <div className="flex flex-wrap gap-4 text-sm font-sans text-white/50">
            <span>{priceLabel} USD one-time</span>
            <span className="text-white/20">·</span>
            <span>{COMPREHENSIVE_PROFILE.deliveryBusinessDays} business day delivery</span>
            <span className="text-white/20">·</span>
            <span>Stripe secure checkout</span>
            <span className="text-white/20">·</span>
            <span>Methodology appendix included</span>
          </div>
          {canceled && (
            <p className="mt-6 rounded-sm border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100" role="status">
              Checkout was canceled. Your intake is not lost — update the form and try again when ready.
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-4">What you receive</h2>
          <ul className="space-y-3 mb-10">
            {COMPREHENSIVE_PROFILE.scope.map((item) => (
              <li key={item} className="flex gap-3 font-body text-[15px] text-ink-muted leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-crimson" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="font-display text-2xl font-bold text-ink mb-4">Report structure</h2>
          <ol className="space-y-4 mb-10">
            {PROFILE_REPORT_SECTIONS.map((section, index) => (
              <li key={section.id} className="border border-border bg-surface p-4">
                <p className="font-sans text-[0.55rem] font-bold tracking-[0.15em] uppercase text-crimson mb-1">
                  Section {index + 1}
                </p>
                <h3 className="font-display text-lg font-semibold text-ink">{section.title}</h3>
                <p className="font-body text-sm text-ink-muted mt-1 leading-relaxed">{section.body}</p>
              </li>
            ))}
          </ol>

          <h2 className="font-display text-2xl font-bold text-ink mb-4">Our methodology</h2>
          <ol className="space-y-3 mb-10 list-decimal list-inside">
            {COMPREHENSIVE_PROFILE.methodology.map((step) => (
              <li key={step} className="font-body text-[15px] text-ink-muted leading-relaxed pl-1">
                {step}
              </li>
            ))}
          </ol>

          <h2 className="font-display text-2xl font-bold text-ink mb-4">Hard exclusions</h2>
          <ul className="space-y-2 mb-4">
            {COMPREHENSIVE_PROFILE.exclusions.map((item) => (
              <li key={item} className="font-body text-sm text-ink-muted border-l-2 border-crimson/40 pl-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="font-body text-xs text-ink-faint leading-relaxed">
            Free public Power Profiles remain available at{' '}
            <Link to="/profiles" className="text-crimson hover:underline">
              /profiles
            </Link>
            . Offline machine corpora (not a private dossier) download as a ZIP at{' '}
            <a href="/research-pack.zip" className="text-crimson hover:underline" download="veritas-research-pack.zip">
              /research-pack.zip
            </a>
            . Editorial methodology for The Record is at{' '}
            <Link to="/methodology" className="text-crimson hover:underline">
              /methodology
            </Link>
            .
          </p>
        </div>

        <div>
          <div className="sticky top-24 border border-border bg-surface shadow-sm">
            <div className="border-b border-border bg-parchment-dark/40 px-6 py-5">
              <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-crimson">
                Commission a profile
              </p>
              <p className="font-display text-3xl font-bold text-ink mt-1">
                {priceLabel}
                <span className="font-sans text-sm font-normal text-ink-muted ml-2">USD · one-time</span>
              </p>
              <p className="font-body text-sm text-ink-muted mt-2">
                Complete intake, attest lawful use, then pay via Stripe. Delivery in{' '}
                {COMPREHENSIVE_PROFILE.deliveryBusinessDays} business days after payment.
              </p>
            </div>

            <form
              ref={formRef}
              id="osint-intake-form"
              onSubmit={onSubmit}
              className="px-6 py-6 space-y-4 scroll-mt-28"
              noValidate
              aria-busy={submitting}
              aria-describedby={error ? 'osint-form-error' : 'osint-form-hint'}
            >
              <p id="osint-form-hint" className="sr-only">
                Required fields: your name, delivery email, subject full name, and three legal attestations.
                Payment uses Stripe secure checkout after intake.
              </p>

              {/* Honeypot — visually hidden; must remain empty */}
              <div
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor={FIELD_IDS.companyWebsite}>Company website</label>
                <input
                  id={FIELD_IDS.companyWebsite}
                  name="companyWebsite"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.companyWebsite}
                  onChange={(e) => update('companyWebsite', e.target.value)}
                />
              </div>

              <fieldset className="space-y-3">
                <legend className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-1">
                  Client
                </legend>
                <label className="block" htmlFor={FIELD_IDS.clientName}>
                  <span className="font-sans text-xs text-ink-muted">Your name</span>
                  <input
                    id={FIELD_IDS.clientName}
                    name="clientName"
                    required
                    aria-required="true"
                    aria-invalid={fieldErrors.clientName ? true : undefined}
                    aria-describedby={fieldErrors.clientName ? 'osint-err-client-name' : undefined}
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.clientName}
                    onChange={(e) => update('clientName', e.target.value)}
                    autoComplete="name"
                  />
                  {fieldErrors.clientName && (
                    <span id="osint-err-client-name" className="mt-1 block font-body text-xs text-crimson">
                      {fieldErrors.clientName}
                    </span>
                  )}
                </label>
                <label className="block" htmlFor={FIELD_IDS.clientEmail}>
                  <span className="font-sans text-xs text-ink-muted">Email for delivery</span>
                  <input
                    id={FIELD_IDS.clientEmail}
                    name="clientEmail"
                    required
                    type="email"
                    inputMode="email"
                    aria-required="true"
                    aria-invalid={fieldErrors.clientEmail ? true : undefined}
                    aria-describedby={fieldErrors.clientEmail ? 'osint-err-client-email' : undefined}
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.clientEmail}
                    onChange={(e) => update('clientEmail', e.target.value)}
                    autoComplete="email"
                  />
                  {fieldErrors.clientEmail && (
                    <span id="osint-err-client-email" className="mt-1 block font-body text-xs text-crimson">
                      {fieldErrors.clientEmail}
                    </span>
                  )}
                </label>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-1">
                  Subject
                </legend>
                <label className="block" htmlFor={FIELD_IDS.subjectFullName}>
                  <span className="font-sans text-xs text-ink-muted">Full legal name (required)</span>
                  <input
                    id={FIELD_IDS.subjectFullName}
                    name="subjectFullName"
                    required
                    aria-required="true"
                    aria-invalid={fieldErrors.subjectFullName ? true : undefined}
                    aria-describedby={fieldErrors.subjectFullName ? 'osint-err-subject-name' : undefined}
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.subjectFullName}
                    onChange={(e) => update('subjectFullName', e.target.value)}
                    autoComplete="off"
                  />
                  {fieldErrors.subjectFullName && (
                    <span id="osint-err-subject-name" className="mt-1 block font-body text-xs text-crimson">
                      {fieldErrors.subjectFullName}
                    </span>
                  )}
                </label>
                <label className="block" htmlFor={FIELD_IDS.subjectAliases}>
                  <span className="font-sans text-xs text-ink-muted">Known aliases / handles</span>
                  <input
                    id={FIELD_IDS.subjectAliases}
                    name="subjectAliases"
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.subjectAliases}
                    onChange={(e) => update('subjectAliases', e.target.value)}
                    placeholder="usernames, former names, DBAs"
                    autoComplete="off"
                  />
                </label>
                <label className="block" htmlFor={FIELD_IDS.subjectLocation}>
                  <span className="font-sans text-xs text-ink-muted">City / region / country</span>
                  <input
                    id={FIELD_IDS.subjectLocation}
                    name="subjectLocation"
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.subjectLocation}
                    onChange={(e) => update('subjectLocation', e.target.value)}
                    autoComplete="off"
                  />
                </label>
                <label className="block" htmlFor={FIELD_IDS.subjectDobOrAge}>
                  <span className="font-sans text-xs text-ink-muted">Approx. age or DOB (if known)</span>
                  <input
                    id={FIELD_IDS.subjectDobOrAge}
                    name="subjectDobOrAge"
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.subjectDobOrAge}
                    onChange={(e) => update('subjectDobOrAge', e.target.value)}
                    autoComplete="off"
                  />
                </label>
                <label className="block" htmlFor={FIELD_IDS.subjectIdentifiers}>
                  <span className="font-sans text-xs text-ink-muted">
                    Identifiers to verify (email, phone, domain, employer)
                  </span>
                  <textarea
                    id={FIELD_IDS.subjectIdentifiers}
                    name="subjectIdentifiers"
                    className="mt-1 w-full min-h-[88px] border border-border bg-parchment px-3 py-2 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.subjectIdentifiers}
                    onChange={(e) => update('subjectIdentifiers', e.target.value)}
                  />
                </label>
                <label className="block" htmlFor={FIELD_IDS.knownLinks}>
                  <span className="font-sans text-xs text-ink-muted">Known profile / news URLs</span>
                  <textarea
                    id={FIELD_IDS.knownLinks}
                    name="knownLinks"
                    className="mt-1 w-full min-h-[72px] border border-border bg-parchment px-3 py-2 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.knownLinks}
                    onChange={(e) => update('knownLinks', e.target.value)}
                    placeholder="One https URL per line"
                  />
                </label>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-1">
                  Lawful purpose
                </legend>
                <label className="block" htmlFor={FIELD_IDS.lawfulPurpose}>
                  <span className="font-sans text-xs text-ink-muted">Purpose category</span>
                  <select
                    id={FIELD_IDS.lawfulPurpose}
                    name="lawfulPurpose"
                    className="mt-1 w-full min-h-[44px] border border-border bg-parchment px-3 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.lawfulPurpose}
                    onChange={(e) => update('lawfulPurpose', e.target.value)}
                  >
                    {LAWFUL_PURPOSE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block" htmlFor={FIELD_IDS.purposeDetail}>
                  <span className="font-sans text-xs text-ink-muted">Purpose detail</span>
                  <textarea
                    id={FIELD_IDS.purposeDetail}
                    name="purposeDetail"
                    className="mt-1 w-full min-h-[72px] border border-border bg-parchment px-3 py-2 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.purposeDetail}
                    onChange={(e) => update('purposeDetail', e.target.value)}
                    placeholder="Brief description of lawful need"
                  />
                </label>
                <label className="block" htmlFor={FIELD_IDS.notes}>
                  <span className="font-sans text-xs text-ink-muted">Additional notes</span>
                  <textarea
                    id={FIELD_IDS.notes}
                    name="notes"
                    className="mt-1 w-full min-h-[64px] border border-border bg-parchment px-3 py-2 font-body text-sm text-ink dark:border-white/20 dark:bg-obsidian dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                  />
                </label>
              </fieldset>

              <fieldset
                className="space-y-3 border border-border/80 bg-parchment/50 p-4"
                aria-required="true"
                aria-invalid={fieldErrors.attestLawful ? true : undefined}
              >
                <legend className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink px-1">
                  Required attestations
                </legend>
                <label
                  className="flex items-start gap-3 min-h-[44px] cursor-pointer"
                  htmlFor={FIELD_IDS.attestLawful}
                >
                  <input
                    id={FIELD_IDS.attestLawful}
                    name="attestLawful"
                    type="checkbox"
                    className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] accent-crimson"
                    checked={form.attestLawful}
                    onChange={(e) => update('attestLawful', e.target.checked)}
                    aria-required="true"
                  />
                  <span className="font-body text-sm text-ink-muted">
                    I will use this report only for a lawful purpose and will not use it to commit a crime.
                  </span>
                </label>
                <label
                  className="flex items-start gap-3 min-h-[44px] cursor-pointer"
                  htmlFor={FIELD_IDS.attestNoHarassment}
                >
                  <input
                    id={FIELD_IDS.attestNoHarassment}
                    name="attestNoHarassment"
                    type="checkbox"
                    className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] accent-crimson"
                    checked={form.attestNoHarassment}
                    onChange={(e) => update('attestNoHarassment', e.target.checked)}
                    aria-required="true"
                  />
                  <span className="font-body text-sm text-ink-muted">
                    I will not use this report to harass, stalk, threaten, dox, or unlawfully surveil any person.
                  </span>
                </label>
                <label
                  className="flex items-start gap-3 min-h-[44px] cursor-pointer"
                  htmlFor={FIELD_IDS.attestAdult}
                >
                  <input
                    id={FIELD_IDS.attestAdult}
                    name="attestAdult"
                    type="checkbox"
                    className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] accent-crimson"
                    checked={form.attestAdult}
                    onChange={(e) => update('attestAdult', e.target.checked)}
                    aria-required="true"
                  />
                  <span className="font-body text-sm text-ink-muted">
                    I am 18 or older and authorized to commission this research.
                  </span>
                </label>
              </fieldset>

              {error && (
                <p
                  ref={errorRef}
                  id="osint-form-error"
                  className="font-body text-sm text-crimson border border-crimson/30 bg-crimson/5 px-3 py-2"
                  role="alert"
                  tabIndex={-1}
                >
                  {error}
                  {orderId ? ` Order reference: ${orderId}` : ''}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                aria-disabled={submitting}
                aria-busy={submitting}
                className="w-full min-h-[48px] bg-obsidian text-white font-sans text-sm font-semibold tracking-wide hover:bg-crimson transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
              >
                {submitting ? 'Starting secure checkout…' : `Pay ${priceLabel} — start investigation`}
              </button>
              <p className="font-sans text-[0.6rem] text-ink-faint text-center leading-relaxed">
                Secure Stripe checkout · Questions:{' '}
                <a className="text-crimson hover:underline" href={`mailto:${COMPREHENSIVE_PROFILE.contactEmail}`}>
                  {COMPREHENSIVE_PROFILE.contactEmail}
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 px-4 pb-28 lg:pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-ink mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            {PROFILE_FAQS.map((item) => (
              <details
                key={item.q}
                name="osint-faq"
                className="border border-border bg-parchment/40 px-5 py-4 group dark:border-white/15 dark:bg-white/5"
              >
                <summary className="cursor-pointer font-display text-base font-semibold text-ink min-h-[44px] flex items-center list-none rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson dark:text-white">
                  {item.q}
                </summary>
                <p className="font-body text-sm text-ink-muted leading-relaxed mt-3 pb-1 dark:text-white/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky checkout summary — desktop already uses sticky form card */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-parchment/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] lg:hidden"
        data-testid="osint-mobile-sticky-checkout"
        role="region"
        aria-label="Checkout summary"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.14em] text-crimson">
              Comprehensive Online Profile
            </p>
            <p className="font-display text-xl font-bold text-ink">
              {priceLabel}
              <span className="ml-2 font-sans text-xs font-normal text-ink-muted">USD · one-time</span>
            </p>
            {intakeReady && (
              <p className="font-sans text-[0.6rem] text-ink-muted mt-0.5">Intake ready — pay to start</p>
            )}
          </div>
          <a
            href="#osint-intake-form"
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm bg-obsidian px-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.08em] text-white hover:bg-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            aria-label={
              submitting
                ? 'Checkout in progress'
                : intakeReady
                  ? `Continue to Stripe checkout for ${priceLabel}`
                  : `Jump to intake form to commission for ${priceLabel}`
            }
          >
            {submitting ? 'Working…' : intakeReady ? 'Pay now' : 'Start intake'}
          </a>
        </div>
      </div>
    </div>
  )
}
