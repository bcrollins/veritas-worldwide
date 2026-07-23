import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo'

const sections = [
  { id: 'license', title: 'Content License' },
  { id: 'use', title: 'Acceptable Use' },
  { id: 'accounts', title: 'Accounts & Subscriptions' },
  { id: 'corrections', title: 'Corrections Policy' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'changes', title: 'Changes to Terms' },
]

export default function TermsPage() {
  useEffect(() => {
    setMetaTags({
      title: `Terms of Use | The Record — ${SITE_NAME}`,
      description:
        'Terms of use for Veritas Worldwide. Free open access; content licensed under Creative Commons BY-NC-SA 4.0.',
      url: `${SITE_URL}/terms`,
      imageAlt: 'Terms of Use — Veritas Worldwide',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Use',
        url: `${SITE_URL}/terms`,
        description:
          'Terms of use for Veritas Worldwide. Free open access; content licensed under Creative Commons BY-NC-SA 4.0.',
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      },
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Terms of Use', url: `${SITE_URL}/terms` },
      ]),
      faqJsonLd([
        {
          question: 'Under what license is The Record published?',
          answer:
            'The Record and related Veritas assets are open access under Creative Commons BY-NC-SA 4.0: share and adapt for non-commercial use with attribution and share-alike. Commercial use requires written permission.',
        },
        {
          question: 'Can I quote Veritas chapters in my own writing?',
          answer:
            'Yes for non-commercial scholarly, journalistic, and educational use with clear attribution and a link to the source chapter when practical. Do not imply Veritas endorsement of your conclusions.',
        },
        {
          question: 'How do corrections work?',
          answer:
            'Veritas corrects the public record when primary sources show an error. Contact corrections@veritasworldwide.com or rights@veritasworldwide.com with the claim URL and supporting primary documents.',
        },
        {
          question: 'Does free access mean free for commercial reuse?',
          answer:
            'No. Free to read is not free to commercialize. Commercial licensing is separate from open-access reading. See also the Membership page for how reader funding keeps the archive free to read.',
        },
      ]),
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="inline-flex min-h-[44px] items-center text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Terms of Use</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-3">
              Terms of Use
            </h1>
            <p className="text-sm text-ink-muted mb-10 border-b border-border pb-6">
              Last updated: March 2026. By accessing Veritas Worldwide, you agree to these terms.
            </p>

            <section id="license" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Content License</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>All editorial content on Veritas Worldwide is published under the <strong className="text-ink">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)</strong> license unless otherwise noted.</p>
                <p>You are free to share and adapt our content for non-commercial purposes, provided you give appropriate credit, link back to the original, and distribute your contributions under the same license. Commercial use requires explicit written permission.</p>
                <p>
                  Machine-readable research corpora (including Israel Dossier and Record of Jesus Christ <code className="text-ink">corpus.json</code> exports and the public evidence taxonomy) are published by <strong className="text-ink">Veritas Worldwide</strong> under the same CC BY-NC-SA 4.0 terms unless a specific file states otherwise. Attribute the publisher entity — not a personal author. Contact rights@veritasworldwide.com for commercial licensing.
                </p>
              </div>
            </section>

            <section id="use" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Acceptable Use</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>You agree not to use this site to harass, threaten, or defame any individual, or to misrepresent the content as your own original work. Automated scraping or bulk downloading of content is prohibited without prior authorization.</p>
                <p>Forum and community features require civil discourse. We reserve the right to moderate or remove content that violates our community guidelines.</p>
              </div>
            </section>

            <section id="accounts" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Accounts & Subscriptions</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>The main Veritas publication, chapter pages, source library, and core downloads are public without a login. Free accounts provide bookmarking, saved reading state, and community features.</p>
                <p>Paid subscriptions and donations fund reporting, document work, infrastructure, and optional premium member features. They do not move the core publication or source record behind a paid access wall. Subscriptions are billed through Stripe. You may cancel at any time; access continues through the end of your billing period. Refunds are handled on a case-by-case basis within 30 days of purchase. The optional Comprehensive Online Profile ($499) is a private OSINT research service limited to lawfully public sources; clients must attest lawful purpose.</p>
              </div>
            </section>

            <section id="corrections" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Corrections Policy</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>We are committed to accuracy. If you identify an error in our reporting, please contact us at <a href="mailto:corrections@veritasworldwide.com" className="text-crimson hover:underline">corrections@veritasworldwide.com</a>.</p>
                <p>All corrections are made transparently: the original text is preserved with a strikethrough, the corrected text is added, and a timestamped correction note is appended. Our corrections log is publicly accessible.</p>
              </div>
            </section>

            <section id="liability" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Limitation of Liability</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>Veritas Worldwide provides investigative journalism content for informational purposes. While we strive for accuracy using our evidence tier system, we make no warranties about the completeness or reliability of any information on this site.</p>
                <p>We are not liable for any damages arising from your use of this site or reliance on its content. This site does not constitute legal, financial, or professional advice.</p>
              </div>
            </section>

            <section id="changes" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Changes to Terms</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                We may update these terms periodically. Significant changes will be communicated via email to registered users and noted on this page. Continued use of the site after changes constitutes acceptance of the updated terms.
              </p>
            </section>
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* On This Page */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">On This Page</h3>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* License Badge */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-3">License</h3>
                <div className="bg-crimson/5 border border-crimson/20 rounded-md p-3">
                  <p className="text-xs font-mono text-crimson font-medium">CC BY-NC-SA 4.0</p>
                  <p className="text-xs text-ink-muted mt-1">Share freely for non-commercial use with attribution.</p>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/privacy" className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Privacy Policy
                  </Link>
                  <Link to="/about" className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors">
                    → About
                  </Link>
                  <Link to="/methodology" className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/sources" className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Sources
                  </Link>
                  <Link to="/institute/book" className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Field Manual
                  </Link>
                  <a
                    href="/veritas-institute-field-manual.pdf"
                    className="flex min-h-[44px] items-center text-sm text-ink-muted hover:text-crimson transition-colors"
                    download="veritas-institute-field-manual.pdf"
                  >
                    → Field Manual PDF
                  </a>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
