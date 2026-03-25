import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

const editorialTeam = [
  {
    initials: 'VP',
    name: 'Veritas Press',
    role: 'Lead Investigator & Editor-in-Chief',
    bio: 'Former intelligence analyst with over a decade of experience in open-source intelligence gathering. Specializes in financial networks and political influence operations.',
  },
  {
    initials: 'M.K.',
    name: 'M. Kavanaugh',
    role: 'Senior Political Correspondent',
    bio: 'Veteran political journalist covering Washington power structures for 15 years. Expert in legislative process and lobbying networks.',
  },
  {
    initials: 'D.W.',
    name: 'D. Walsh',
    role: 'Financial Investigations Editor',
    bio: 'Certified fraud examiner and forensic accountant. Tracks dark money flows and corporate shell structures across international jurisdictions.',
  },
  {
    initials: 'R.A.',
    name: 'R. Alvarez',
    role: 'National Security Reporter',
    bio: 'Covers intelligence community operations and military-industrial complex relationships. Previously embedded with NATO operations in Eastern Europe.',
  },
  {
    initials: 'S.L.',
    name: 'S. Lindström',
    role: 'International Affairs Analyst',
    bio: 'Former diplomatic correspondent with expertise in geopolitical influence campaigns. Fluent in four languages with sources across European and Asian capitals.',
  },
]

export default function AboutPage() {
  useEffect(() => {
    setMetaTags({
      title: `About | The Record — ${SITE_NAME}`,
      description: 'Independent investigative journalism holding power accountable through documented evidence. Meet the editorial team behind Veritas Press.',
      url: `${SITE_URL}/about`,
    })
    return () => clearMetaTags()
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">About</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-3">
              About Veritas Press
            </h1>
            <p className="text-lg text-ink-muted mb-10 leading-relaxed border-b border-border pb-8">
              Independent investigative journalism holding power accountable through documented evidence.
            </p>

            {/* Origin Story */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-ink mb-4">Our Mission</h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>
                  Veritas Press began as a single question: <em>What happens when you follow the money?</em> What started as independent research into political financing evolved into a 31-chapter investigation documenting the networks of power, influence, and accountability that shape American democracy.
                </p>
                <p>
                  Every claim in this publication is sourced. Every connection is documented. We believe the public deserves access to the same information that insiders use to make decisions that affect millions of lives. Our evidence tier system — Verified, Circumstantial, and Disputed — ensures readers always know the strength of the evidence behind every assertion.
                </p>
                <p>
                  We are not affiliated with any political party, PAC, lobbying firm, or government agency. Our funding comes from readers, not special interests.
                </p>
              </div>
            </section>

            {/* Editorial Team */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-ink mb-6">Editorial Team</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {editorialTeam.map((member) => (
                  <div key={member.initials} className="bg-surface border border-border rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-crimson/10 text-crimson flex items-center justify-center text-sm font-bold">
                        {member.initials}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-ink">{member.name}</h3>
                        <p className="text-xs text-crimson">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Standards */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-ink mb-4">Editorial Standards</h2>
              <div className="bg-surface border border-border rounded-lg p-6 space-y-4 text-sm text-ink-muted">
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#166534] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-ink mb-1">Source Verification</h4>
                    <p>Every factual claim requires at least one primary source. Court documents, financial filings, and government records form the backbone of our evidence base.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#92400E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-ink mb-1">Evidence Tiering</h4>
                    <p>All evidence is classified as Verified (confirmed by primary sources), Circumstantial (supported by indirect evidence), or Disputed (contested by credible parties).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#991B1B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-ink mb-1">Corrections Policy</h4>
                    <p>Errors are corrected promptly and transparently. All corrections are noted inline with the original text and logged in our corrections archive.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-ink mb-4">Contact</h2>
              <div className="bg-surface border border-border rounded-lg p-6">
                <a href="mailto:tips@veritasworldwide.com" className="text-crimson hover:underline font-medium">
                  tips@veritasworldwide.com
                </a>
                <p className="text-sm text-ink-muted mt-2">
                  For tips, corrections, or press inquiries. We use end-to-end encrypted communication for source protection. PGP key available on request.
                </p>
              </div>
            </section>

            {/* Subscribe CTA */}
            <section className="bg-ink text-parchment rounded-xl p-8 md:p-10">
              <h2 className="text-2xl font-serif font-bold mb-3">Support Independent Journalism</h2>
              <p className="text-parchment/70 mb-6 max-w-lg">
                Veritas Press is funded entirely by readers. Subscribe to get full access to all 31 chapters, power profiles, and exclusive investigative updates.
              </p>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-crimson text-white px-6 py-3 rounded-lg font-medium hover:bg-crimson-dark transition-colors"
              >
                Subscribe Now →
              </a>
            </section>
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* At a Glance */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">At a Glance</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Chapters</dt>
                    <dd className="font-medium text-ink">31</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Power Profiles</dt>
                    <dd className="font-medium text-ink">91+</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Primary Sources</dt>
                    <dd className="font-medium text-ink">500+</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Founded</dt>
                    <dd className="font-medium text-ink">2024</dd>
                  </div>
                </dl>
              </div>

              {/* Evidence Tiers */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Evidence Tiers</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#166534]" />
                    <span className="text-sm text-ink">Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#92400E]" />
                    <span className="text-sm text-ink">Circumstantial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#991B1B]" />
                    <span className="text-sm text-ink">Disputed</span>
                  </div>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/methodology" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/sources" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Sources
                  </Link>
                  <Link to="/privacy" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Privacy Policy
                  </Link>
                  <Link to="/terms" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Terms of Use
                  </Link>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
