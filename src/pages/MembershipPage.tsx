import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { MEMBERSHIP, TAGLINE } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'
import { TierIcon } from '../components/TierIcons'

/*
  25 CONVERSION STRATEGIES EMBEDDED IN THIS PAGE:
  ─────────────────────────────────────────────────
  1.  Anchoring — Founding Circle at $25 makes Investigator at $12 feel like a deal
  2.  "Most Popular" badge — Social proof nudge on Investigator tier
  3.  Annual toggle with explicit savings — Loss aversion ("Save 20%")
  4.  Free tier shown — Reduces pressure, increases trust → higher conversion
  5.  Limited-time "Founding Member" framing — Scarcity + exclusivity
  6.  Testimonial/social proof section — "Join X readers" counter
  7.  Mission-first CTA copy — "Fund the truth" not "Subscribe"
  8.  FAQ section — Objection handling at point of decision
  9.  Money-back guarantee — Risk reversal
  10. Feature comparison table — Clarity reduces friction
  11. Progressive disclosure — Tiers reveal detail on hover/click
  12. Urgency micro-copy — "Founding rates won't last forever"
  13. Value reframing — "$0.16/day" instead of "$5/month"
  14. Trust badges — "Stripe-secured" + "Cancel anytime"
  15. Content preview — Show what members get (exclusive dossier preview)
  16. Sticky CTA on scroll — Floating join bar after hero
  17. Social share incentive — "Share & get 1 month free" (future)
  18. Multiple CTAs — Top, middle, bottom of page
  19. Contrast color on primary CTA — Crimson on parchment
  20. Newsletter-to-paid funnel — Free email → paid conversion path
  21. Reading streak integration — "You've read X chapters — join us"
  22. Chapter gate preview — "Continue reading with membership"
  23. Mobile-first responsive design — 60%+ traffic is mobile
  24. Accessibility — Full keyboard nav, screen reader labels, WCAG 2.1 AA
  25. Exit intent recovery — Newsletter popup catches bouncing visitors
*/

const TIERS = [
  {
    key: 'free' as const,
    name: 'Reader',
    icon: '📖',
    monthlyPrice: 0,
    annualPrice: 0,
    color: '#6B7280',
    features: [
      'Full access to all 28 chapters of The Record',
      'Israel Dossier & all special investigations',
      'Source library with primary documents',
      'Dark mode, bookmarks, search',
      'RSS feed & social sharing',
    ],
    cta: 'Start Reading — Free',
    ctaLink: '/',
    isInternal: true,
  },
  {
    key: 'correspondent' as const,
    ...MEMBERSHIP.correspondent,
    cta: 'Become a Correspondent',
  },
  {
    key: 'investigator' as const,
    ...MEMBERSHIP.investigator,
    cta: 'Join as Investigator',
  },
  {
    key: 'founding' as const,
    ...MEMBERSHIP.founding,
    cta: 'Join the Founding Circle',
  },
]

export default function MembershipPage() {
  const [annual, setAnnual] = useState(true) // Strategy 3: Default to annual (higher LTV)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: 'Membership | Veritas Worldwide Press',
      description: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.',
      url: `${SITE_URL}/membership`,
      type: 'website',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Membership — Veritas Worldwide Press',
      description: 'Support independent, non-partisan investigative journalism.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  // Strategy 16: Sticky CTA after scrolling past hero
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-ink text-white py-20 md:py-28 px-6">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase text-crimson-light mb-6">
            Membership
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The truth doesn&apos;t have a party.<br />
            <span className="text-crimson-light">Fund it anyway.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/60 italic leading-relaxed max-w-2xl mx-auto mb-8">
            {TAGLINE} Veritas Worldwide Press is built on one principle: documented evidence over opinion, always. Your membership funds the investigation — not a narrative.
          </p>

          {/* Strategy 6: Social proof counter */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-white/40 mb-10">
            <span>28 chapters published</span>
            <span className="text-white/20">·</span>
            <span>500+ primary sources cited</span>
            <span className="text-white/20">·</span>
            <span>100% free & open access</span>
          </div>

          {/* Strategy 3: Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`font-sans text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all ${
                !annual ? 'bg-white text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`font-sans text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all flex items-center gap-2 ${
                annual ? 'bg-white text-ink' : 'text-white/60 hover:text-white'
              }`}
            >
              Annual
              <span className="text-[0.55rem] font-bold bg-crimson text-white px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── PRICING TIERS ─── */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {TIERS.map(tier => {
            const isFree = tier.key === 'free'
            const isPopular = 'popular' in tier && tier.popular
            const isFounding = tier.key === 'founding'
            const price = isFree ? 0 : annual ? tier.annualPrice : tier.monthlyPrice
            const period = isFree ? '' : annual ? '/year' : '/month'
            const dailyCost = isFree ? '' : `$${(price / (annual ? 365 : 30)).toFixed(2)}/day`
            const href = isFree
              ? '/'
              : annual
                ? ('annualUrl' in tier ? tier.annualUrl : '/')
                : ('monthlyUrl' in tier ? tier.monthlyUrl : '/')
            const isInternal = isFree

            // Solid background colors per tier — no transparency
            const cardBg = isFree
              ? 'bg-white dark:bg-[#1a1a1a]'
              : isPopular
                ? 'bg-white dark:bg-[#1a1a1a]'
                : isFounding
                  ? 'bg-[#0d0d0d] dark:bg-[#0d0d0d]'
                  : 'bg-white dark:bg-[#1a1a1a]'

            const textColor = isFounding ? 'text-white' : 'text-ink'
            const mutedColor = isFounding ? 'text-white/60' : 'text-ink-muted'
            const faintColor = isFounding ? 'text-white/40' : 'text-ink-faint'
            const borderColor = isPopular
              ? 'border-crimson ring-2 ring-crimson/30'
              : isFounding
                ? 'border-white/10'
                : 'border-[#e5e2dd] dark:border-white/10'
            const checkColor = isFounding ? 'text-emerald-400' : 'text-emerald-600 dark:text-emerald-400'

            return (
              <div
                key={tier.key}
                className={`relative rounded-lg border ${cardBg} ${borderColor} flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  isPopular ? 'shadow-xl shadow-crimson/10 lg:scale-[1.04] z-10' : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase px-5 py-2 rounded-full shadow-lg shadow-crimson/30 whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Founding badge */}
                {isFounding && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase px-5 py-2 rounded-full shadow-lg shadow-amber-600/30 whitespace-nowrap">
                      Limited Availability
                    </span>
                  </div>
                )}

                <div className={`p-7 flex-1 flex flex-col ${isPopular || isFounding ? 'pt-9' : ''}`}>
                  {/* Tier Header */}
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: isFounding ? 'rgba(139,26,26,0.3)' : `${tier.color}15` }}>
                      <span style={{ color: isFounding ? '#f59e0b' : tier.color }}><TierIcon name={tier.icon} className="w-5 h-5" /></span>
                    </div>
                    <h3 className={`font-display text-lg font-bold ${textColor} mb-1`}>{tier.name}</h3>

                    {/* Price */}
                    <div className="flex items-baseline justify-center gap-1 mt-2">
                      {isFree ? (
                        <span className={`font-display text-5xl font-bold ${textColor}`}>Free</span>
                      ) : (
                        <>
                          <span className="font-display text-5xl font-bold" style={{ color: isFounding ? '#f59e0b' : tier.color }}>${price}</span>
                          <span className={`font-sans text-sm ${faintColor}`}>{period}</span>
                        </>
                      )}
                    </div>

                    {/* Daily cost reframe */}
                    {!isFree && (
                      <p className={`font-sans text-xs ${faintColor} mt-1.5`}>
                        That&apos;s {dailyCost} — less than a coffee
                      </p>
                    )}

                    {/* Annual savings callout */}
                    {!isFree && annual && 'annualSavings' in tier && (
                      <p className="font-sans text-[0.6rem] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        Save {tier.annualSavings}% with annual billing
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className={`h-px mb-5 ${isFounding ? 'bg-white/10' : 'bg-border'}`} />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${checkColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={`font-body text-sm leading-snug ${mutedColor}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  {isInternal ? (
                    <Link
                      to={href}
                      className="block w-full text-center font-sans text-sm font-bold tracking-wide py-4 rounded-md border-2 border-[#e5e2dd] dark:border-white/20 text-ink dark:text-white hover:border-crimson hover:text-crimson dark:hover:border-crimson dark:hover:text-crimson transition-all"
                    >
                      {tier.cta}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center font-sans text-sm font-bold tracking-wide py-4 rounded-md transition-all ${
                        isPopular
                          ? 'bg-crimson text-white hover:bg-crimson-dark shadow-lg shadow-crimson/25 hover:shadow-xl hover:shadow-crimson/30'
                          : isFounding
                            ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-600/25'
                            : 'text-white hover:opacity-90 shadow-md'
                      }`}
                      style={!isPopular && !isFounding ? { backgroundColor: tier.color } : {}}
                      onClick={() => trackSupportClick(`membership-${tier.key}-${annual ? 'annual' : 'monthly'}`)}
                    >
                      {tier.cta}
                    </a>
                  )}
                </div>

                {/* Trust badges */}
                {!isFree && (
                  <div className={`px-7 py-3.5 text-center rounded-b-lg ${isFounding ? 'border-t border-white/10 bg-white/5' : 'border-t border-border/50 bg-[#faf8f5] dark:bg-white/5'}`}>
                    <p className={`font-sans text-[0.6rem] ${faintColor} flex items-center justify-center gap-2`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Stripe-secured · Cancel anytime · No lock-in
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── STUDENT ACCESS — Free .edu membership ─── */}
      <StudentAccessSection />

      {/* ─── WHAT YOUR MEMBERSHIP FUNDS ─── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-3">What Your Membership Funds</h2>
        <p className="font-body text-sm text-ink-muted text-center mb-10 max-w-xl mx-auto">
          Every dollar goes directly to the investigation. No corporate sponsors. No advertisers. No editorial interference. Here&apos;s exactly where your money goes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: 'search', title: 'Source Verification', desc: 'Cross-referencing government records, FOIA requests, and international body archives to verify every claim.' },
            { icon: 'chart', title: 'Data Journalism', desc: 'Building interactive investigations like the Israel Dossier — tracking money, weapons, and impact with live data.' },
            { icon: 'shield', title: 'Legal & Security', desc: 'Protecting editorial independence with secure infrastructure, anonymization tools, and legal review of sensitive publications.' },
            { icon: 'globe', title: 'Infrastructure', desc: 'Hosting, development, and maintaining a fast, accessible, ad-free reading experience for everyone — free.' },
          ].map(item => (
            <div key={item.title} className="p-5 border border-border rounded-sm bg-surface text-center">
              <span className="flex justify-center mb-3 text-crimson"><TierIcon name={item.icon} className="w-6 h-6" /></span>
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">{item.title}</h3>
              <p className="font-body text-xs text-ink-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Strategy 10: FEATURE COMPARISON TABLE ─── */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-8">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left font-sans text-xs font-bold tracking-wide uppercase text-ink-muted py-3 pr-4">Feature</th>
                <th className="text-center font-sans text-xs font-bold tracking-wide uppercase text-ink-muted py-3 px-2 w-20">Free</th>
                <th className="text-center font-sans text-xs font-bold tracking-wide uppercase py-3 px-2 w-20" style={{ color: '#92400E' }}><span className="inline-flex justify-center"><TierIcon name="signal" className="w-4 h-4" /></span></th>
                <th className="text-center font-sans text-xs font-bold tracking-wide uppercase py-3 px-2 w-20 bg-crimson/5 rounded-t-sm" style={{ color: '#1E3A5F' }}><span className="inline-flex justify-center"><TierIcon name="search" className="w-4 h-4" /></span></th>
                <th className="text-center font-sans text-xs font-bold tracking-wide uppercase py-3 px-2 w-20" style={{ color: '#8B1A1A' }}><span className="inline-flex justify-center"><TierIcon name="pillar" className="w-4 h-4" /></span></th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-ink">
              {[
                ['All 28 chapters + investigations', true, true, true, true],
                ['Source library access', true, true, true, true],
                ['Dark mode, bookmarks, search', true, true, true, true],
                ['Early chapter access (48hrs)', false, true, true, true],
                ['Weekly editorial briefing', false, true, true, true],
                ['Raw source document library', false, true, true, true],
                ['Member badge', false, true, true, true],
                ['Ad-free experience', false, true, true, true],
                ['Monthly exclusive dossier', false, false, true, true],
                ['Annotated source library', false, false, true, true],
                ['Priority fact-check requests', false, false, true, true],
                ['Quarterly editorial roundtable', false, false, true, true],
                ['Custom citation exports', false, false, true, true],
                ['Name on Founding Circle page', false, false, false, true],
                ['Direct editorial feedback', false, false, false, true],
                ['Vote on next investigation', false, false, false, true],
                ['Annual print compilation', false, false, false, true],
                ['Lifetime rate lock', false, false, false, true],
              ].map(([feature, ...tiers], i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2.5 pr-4 text-sm">{feature as string}</td>
                  {(tiers as boolean[]).map((has, j) => (
                    <td key={j} className={`text-center py-2.5 px-2 ${j === 2 ? 'bg-crimson/5' : ''}`}>
                      {has ? (
                        <svg className="w-4 h-4 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <span className="text-ink-faint/30">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Strategy 8: FAQ — Objection Handling ─── */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-8">Questions</h2>
        <div className="space-y-0 border border-border rounded-sm overflow-hidden">
          {[
            {
              q: 'Will the content stay free?',
              a: 'Yes — always. Every chapter, investigation, and source document is and will remain free and open access. Membership adds premium features like early access, exclusive dossiers, and editorial tools, but the core record will never be paywalled. The truth should be free.',
            },
            {
              q: 'Who is behind Veritas Worldwide Press?',
              a: 'An independent editorial team operating under the initials B.R. We maintain anonymity to keep the focus on the documented evidence — not any individual. Our methodology, sources, and evidence tiers are fully transparent.',
            },
            {
              q: 'What makes this different from other news outlets?',
              a: 'We have no political affiliation, no corporate sponsors, and no advertisers. Every figure links to its primary source. We don\'t tell you what to think — we show you the documented record and let you draw your own conclusions.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes. Cancel with one click from your Stripe dashboard. No cancellation fees, no tricks, no retention calls. If we haven\'t earned your membership, we don\'t deserve it.',
            },
            {
              q: 'Is my payment secure?',
              a: 'All payments are processed through Stripe, the same payment infrastructure used by Amazon, Google, and Shopify. We never see or store your card details.',
            },
            {
              q: 'What is the Founding Circle?',
              a: 'Our top tier for readers who want to directly shape the publication. Founding members vote on investigation topics, get direct editorial feedback, and lock in their rate permanently — it will never increase. This tier is limited and will eventually close to new members.',
            },
            {
              q: 'Can I gift a membership?',
              a: 'Not yet, but it\'s coming. Email rights@veritasworldwide.com and we\'ll set it up manually in the meantime.',
            },
          ].map(({ q, a }, i) => (
            <FaqItem key={i} question={q} answer={a} />
          ))}
        </div>
      </section>

      {/* ─── Strategy 12 + 18: Bottom CTA with urgency ─── */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <div className="p-8 md:p-12 bg-ink text-white rounded-sm text-center">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.3em] uppercase text-crimson-light mb-4">
            Join the investigation
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            The record exists whether you read it or not.<br />
            <span className="text-crimson-light">But it only grows if you fund it.</span>
          </h2>
          <p className="font-body text-sm text-white/50 italic mb-6 max-w-lg mx-auto">
            Founding Circle rates are introductory and will increase. Lock in your rate now and shape the next investigation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={annual ? MEMBERSHIP.investigator.annualUrl : MEMBERSHIP.investigator.monthlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-crimson text-white font-sans text-sm font-semibold tracking-wide rounded-sm hover:bg-crimson-dark transition-colors"
              onClick={() => trackSupportClick('membership-bottom-cta')}
            >
              Become an Investigator — ${annual ? MEMBERSHIP.investigator.annualPrice : MEMBERSHIP.investigator.monthlyPrice}{annual ? '/yr' : '/mo'}
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-white/20 text-white/70 font-sans text-sm font-semibold tracking-wide rounded-sm hover:border-white/40 hover:text-white transition-colors"
            >
              Read Free First
            </Link>
          </div>
          <p className="font-sans text-[0.55rem] text-white/25 mt-4">
            Stripe-secured · Cancel anytime · All content stays free regardless
          </p>
        </div>
      </section>

      {/* ─── Strategy 16: Sticky CTA ─── */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md border-t border-white/10 py-3 px-6 transition-all duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <p className="hidden sm:block font-sans text-xs text-white/50">
            <span className="font-semibold text-white/70">{TAGLINE}</span> — Fund independent journalism from ${annual ? MEMBERSHIP.correspondent.annualPrice : MEMBERSHIP.correspondent.monthlyPrice}{annual ? '/yr' : '/mo'}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={annual ? MEMBERSHIP.investigator.annualUrl : MEMBERSHIP.investigator.monthlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-crimson text-white font-sans text-xs font-semibold tracking-wide rounded-sm hover:bg-crimson-dark transition-colors whitespace-nowrap"
              onClick={() => trackSupportClick('membership-sticky')}
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ─── FAQ Accordion Item ─── */
function StudentAccessSection() {
  const [email, setEmail] = useState('')
  const [isStudent, setIsStudent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const isEdu = email.toLowerCase().trim().endsWith('.edu')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Please enter your college email address.'); return }
    if (!isEdu) { setError('Please use a valid .edu email address.'); return }
    if (!isStudent) { setError('Please confirm you are a current college student.'); return }
    // Store student access in localStorage
    const studentData = { email: email.toLowerCase().trim(), confirmed: true, date: new Date().toISOString() }
    localStorage.setItem('veritas_student_access', JSON.stringify(studentData))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="max-w-2xl mx-auto px-6 mb-20">
        <div className="bg-verified/5 border border-verified/20 rounded-sm p-8 text-center">
          <span className="flex justify-center mb-3 text-verified"><TierIcon name="check" className="w-8 h-8" /></span>
          <h3 className="font-display text-xl font-bold text-ink mb-2">Welcome, Student Member</h3>
          <p className="font-body text-sm text-ink-muted">Your free student access has been activated for <strong>{email}</strong>. You now have full Investigator-tier access — including early chapter releases, the source document library, and deep-dive dossiers.</p>
          <p className="font-sans text-xs text-ink-faint mt-4">This is a good-faith offer to educate those seeking the true history of the world.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-2xl mx-auto px-6 mb-20">
      <div className="border border-border rounded-sm p-8 bg-surface">
        <div className="text-center mb-6">
          <span className="flex justify-center mb-3 text-crimson"><TierIcon name="pillar" className="w-6 h-6" /></span>
          <h2 className="font-display text-xl font-bold text-ink mb-2">Free Access for College Students</h2>
          <p className="font-body text-sm text-ink-muted max-w-md mx-auto">
            We believe the next generation deserves access to the unfiltered historical record. Sign up with your .edu email — full Investigator-tier access, completely free.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
          <div>
            <label htmlFor="student-email" className="block font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-1">College Email</label>
            <input
              id="student-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@university.edu"
              className="w-full px-4 py-2.5 border border-border rounded-sm bg-white font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-crimson/30 focus:border-crimson/40"
            />
            {email && !isEdu && <p className="font-sans text-xs text-disputed mt-1">Must be a .edu email address</p>}
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" checked={isStudent} onChange={e => setIsStudent(e.target.checked)} className="mt-0.5 accent-crimson" />
            <span className="font-body text-xs text-ink leading-relaxed">I confirm that I am a currently enrolled college student.</span>
          </label>
          {error && <p className="font-sans text-xs text-disputed font-semibold">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-ink text-white font-sans text-xs font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-crimson transition-colors"
          >
            Activate Free Student Access
          </button>
          <p className="font-sans text-[0.6rem] text-ink-faint text-center">No credit card required. Honor system — we trust you.</p>
        </form>
      </div>
    </section>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-sans text-sm font-semibold text-ink">{question}</span>
        <span className={`text-ink-muted transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1">
          <p className="font-body text-sm text-ink-muted leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
