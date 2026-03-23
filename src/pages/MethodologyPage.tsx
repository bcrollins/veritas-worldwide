import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

export default function MethodologyPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Methodology & Evidence Standards | The Record — Veritas Worldwide Press',
      description: 'How The Record classifies evidence: Verified, Circumstantial, and Disputed. Source hierarchy, editorial standards, and independent verification guidance.',
      url: `${SITE_URL}/methodology`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Methodology & Evidence Standards',
      'description': 'How The Record classifies evidence: Verified, Circumstantial, and Disputed.',
      'url': `${SITE_URL}/methodology`,
      'isPartOf': { '@type': 'WebSite', 'name': `The Record — ${SITE_NAME}`, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">Editorial Standards</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Methodology &amp; Evidence Standards
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          How this publication was researched, sourced, and structured — and how you should read it.
        </p>
      </header>

      {/* Source Hierarchy */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Four-Tier Source Hierarchy</h2>
        <p className="article-body mb-8">
          Every factual claim in The Record is sourced. Sources are prioritized in a four-tier hierarchy designed to maximize verifiability and minimize reliance on secondary interpretation.
        </p>

        <div className="space-y-4">
          {[
            {
              tier: 'Tier 1 — Primary',
              desc: 'Congressional records, court filings, executive orders, declassified intelligence documents, SEC filings, Federal Register entries, and National Archives materials.',
              color: 'border-l-verified bg-verified-bg',
            },
            {
              tier: 'Tier 2 — Peer-Reviewed',
              desc: 'Academic journal articles, university press monographs, and doctoral dissertations.',
              color: 'border-l-verified bg-verified-bg',
            },
            {
              tier: 'Tier 3 — Verified Journalism',
              desc: 'Investigative reporting from established outlets with named sources, FOIA-obtained documents, and court-verified testimony.',
              color: 'border-l-circumstantial bg-circumstantial-bg',
            },
            {
              tier: 'Tier 4 — Secondary',
              desc: 'Biographies, historical surveys, and memoirs — used for context but not as sole evidence for factual claims.',
              color: 'border-l-disputed bg-disputed-bg',
            },
          ].map(item => (
            <div key={item.tier} className={`border-l-4 rounded-r-sm p-5 ${item.color}`}>
              <p className="font-sans text-xs font-bold tracking-[0.08em] uppercase text-ink mb-2">{item.tier}</p>
              <p className="font-body text-sm text-ink-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Classification */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Three-Tier Evidence Classification</h2>
        <p className="article-body mb-8">
          Every substantive claim is classified using this system, allowing you to evaluate each claim independently rather than accepting or rejecting the work as a whole.
        </p>

        <div className="evidence-verified">
          <p className="evidence-label text-verified">VERIFIED — Primary Source Documentation</p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            This claim is supported by a primary source document: a court filing, a congressional record, a National Archives document, a signed executive order, a published academic study with peer review, or a verified journalistic investigation. The source is cited. The document exists and is publicly accessible.
          </p>
        </div>

        <div className="evidence-circumstantial">
          <p className="evidence-label text-circumstantial">CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion</p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            Each individual fact is documented and independently verifiable. However, the connection drawn between those facts — the inference that they form a pattern or indicate coordination — is an interpretation, not a proven conclusion. Alternative explanations exist and are noted.
          </p>
        </div>

        <div className="evidence-disputed">
          <p className="evidence-label text-disputed">DISPUTED / UNPROVEN — Reported But Not Independently Confirmed</p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            This claim has been made by a named source, in a published report, or in sworn testimony — but has not been independently confirmed by multiple credible sources, proven in a court of law, or supported by primary documentation. It is included as part of the historical record and clearly labeled.
          </p>
        </div>
      </section>

      {/* Research Standards */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Research Standards</h2>

        <div className="space-y-6">
          <div className="border-b border-border pb-6">
            <h3 className="font-sans text-sm font-bold text-ink mb-2">Multi-Source Verification</h3>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Every claim is verified through multiple independent sources. We do not rely on single sources for factual assertions and actively seek contradictory evidence to test conclusions.
            </p>
          </div>

          <div className="border-b border-border pb-6">
            <h3 className="font-sans text-sm font-bold text-ink mb-2">Primary Document Priority</h3>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Reporting is based on primary sources wherever possible: original documents, correspondence, financial records, government filings, and official communications. These are made available to readers for independent verification.
            </p>
          </div>

          <div className="border-b border-border pb-6">
            <h3 className="font-sans text-sm font-bold text-ink mb-2">Fact vs. Analysis Separation</h3>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Established facts are clearly separated from interpretation and analysis. Where connections are inferred rather than documented, this is explicitly stated. The reader is the judge.
            </p>
          </div>

          <div className="border-b border-border pb-6">
            <h3 className="font-sans text-sm font-bold text-ink mb-2">Counter-Arguments Included</h3>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Where mainstream counter-arguments exist, they are presented. Skeptical frameworks are acknowledged. The goal is not advocacy but examination of the documentary record.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="font-sans text-sm font-bold text-ink mb-2">Open Verification</h3>
            <p className="font-body text-base text-ink-light leading-relaxed">
              Every source cited is publicly accessible. Congressional records through congress.gov, court filings through PACER, declassified documents through the National Archives and CIA FOIA Reading Room, SEC filings through EDGAR. The reader is encouraged to verify any claim independently.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/chapter/foreword"
          className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center"
        >
          Read the Full Foreword
        </Link>
        <Link
          to="/sources"
          className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center"
        >
          View All Sources
        </Link>
      </div>

      {/* Support CTA */}
      <section className="border-t border-border mt-12 pt-8 text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
          Free &amp; Open Access
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed max-w-md mx-auto mb-5">
          Maintaining rigorous editorial standards takes time and resources. If these standards matter to you, a small contribution helps us continue this work.
        </p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support This Work
        </a>
        <p className="font-sans text-[0.6rem] text-ink-faint mt-3">
          Processed securely via Stripe &middot; No account required
        </p>
      </section>
    </div>
  )
}
