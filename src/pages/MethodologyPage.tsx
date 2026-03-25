import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

export default function MethodologyPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Methodology & Evidence Standards | The Record — Veritas Press',
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
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-2">
            <Link to="/" className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint hover:text-crimson transition-colors">
              The Record
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson">
              Methodology
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Two-Column Grid */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column — Main Article */}
          <article className="max-w-none">
            {/* Header */}
            <header className="mb-12 border-b border-border pb-10">
              <p className="chapter-label mb-4">Editorial Standards</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
                Methodology &amp; Evidence Standards
              </h1>
              <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl">
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
                {[
                  { title: 'Multi-Source Verification', body: 'Every claim is verified through multiple independent sources. We do not rely on single sources for factual assertions and actively seek contradictory evidence to test conclusions.' },
                  { title: 'Primary Document Priority', body: 'Reporting is based on primary sources wherever possible: original documents, correspondence, financial records, government filings, and official communications. These are made available to readers for independent verification.' },
                  { title: 'Fact vs. Analysis Separation', body: 'Established facts are clearly separated from interpretation and analysis. Where connections are inferred rather than documented, this is explicitly stated. The reader is the judge.' },
                  { title: 'Counter-Arguments Included', body: 'Where mainstream counter-arguments exist, they are presented. Skeptical frameworks are acknowledged. The goal is not advocacy but examination of the documentary record.' },
                  { title: 'Open Verification', body: 'Every source cited is publicly accessible. Congressional records through congress.gov, court filings through PACER, declassified documents through the National Archives and CIA FOIA Reading Room, SEC filings through EDGAR. The reader is encouraged to verify any claim independently.' },
                ].map((item, i, arr) => (
                  <div key={item.title} className={i < arr.length - 1 ? 'border-b border-border pb-6' : 'pb-6'}>
                    <h3 className="font-sans text-sm font-bold text-ink mb-2">{item.title}</h3>
                    <p className="font-body text-base text-ink-light leading-relaxed">{item.body}</p>
                  </div>
                ))}
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
          </article>

          {/* Right Column — Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* On This Page */}
              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  On This Page
                </h3>
                <nav className="space-y-2">
                  {['Four-Tier Source Hierarchy', 'Three-Tier Evidence Classification', 'Research Standards'].map(section => (
                    <a
                      key={section}
                      href={`#${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors leading-relaxed"
                    >
                      {section}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Evidence at a Glance */}
              <div className="border border-border rounded-sm p-5 bg-surface">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4">
                  Evidence at a Glance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-verified shrink-0" />
                    <span className="font-sans text-xs text-ink-muted">Verified — Primary Sources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-circumstantial shrink-0" />
                    <span className="font-sans text-xs text-ink-muted">Circumstantial — Interpretive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-disputed shrink-0" />
                    <span className="font-sans text-xs text-ink-muted">Disputed — Unconfirmed</span>
                  </div>
                </div>
              </div>

              {/* Related Pages */}
              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Related Pages
                </h3>
                <div className="space-y-2">
                  <Link to="/sources" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Sources &amp; Bibliography
                  </Link>
                  <Link to="/chapter/foreword" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Foreword
                  </Link>
                  <Link to="/search" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Search The Record
                  </Link>
                </div>
              </div>

              {/* Support CTA */}
              <div className="border-t border-border pt-6">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
                  Support This Work
                </p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  Maintaining rigorous editorial standards takes time and resources.
                </p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-crimson text-white font-sans text-[0.65rem] font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Contribute
                </a>
                <p className="font-sans text-[0.55rem] text-ink-faint mt-2">
                  Via Stripe &middot; No account required
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
