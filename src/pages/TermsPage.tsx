import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

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
      description: 'Terms of use for Veritas Worldwide. Content licensed under CC BY-NC-SA 4.0.',
      url: `${SITE_URL}/terms`,
    })
    return () => clearMetaTags()
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-muted hover:text-accent transition-colors">Home</Link>
            <span className="text-muted/50">›</span>
            <span className="text-foreground font-medium">Terms of Use</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Terms of Use
            </h1>
            <p className="text-sm text-muted mb-10 border-b border-border pb-6">
              Last updated: March 2026. By accessing Veritas Worldwide, you agree to these terms.
            </p>

            <section id="license" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Content License</h2>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>All editorial content on Veritas Worldwide is published under the <strong className="text-foreground">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)</strong> license unless otherwise noted.</p>
                <p>You are free to share and adapt our content for non-commercial purposes, provided you give appropriate credit, link back to the original, and distribute your contributions under the same license. Commercial use requires explicit written permission.</p>
              </div>
            </section>

            <section id="use" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Acceptable Use</h2>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>You agree not to use this site to harass, threaten, or defame any individual, or to misrepresent the content as your own original work. Automated scraping or bulk downloading of content is prohibited without prior authorization.</p>
                <p>Forum and community features require civil discourse. We reserve the right to moderate or remove content that violates our community guidelines.</p>
              </div>
            </section>

            <section id="accounts" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Accounts & Subscriptions</h2>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>Free accounts provide access to chapter previews, bookmarking, and community features. Paid subscriptions unlock the full 31-chapter investigation, power profiles, and exclusive updates.</p>
                <p>Subscriptions are billed through Stripe. You may cancel at any time; access continues through the end of your billing period. Refunds are handled on a case-by-case basis within 30 days of purchase.</p>
              </div>
            </section>

            <section id="corrections" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Corrections Policy</h2>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>We are committed to accuracy. If you identify an error in our reporting, please contact us at <a href="mailto:corrections@veritasworldwide.com" className="text-accent hover:underline">corrections@veritasworldwide.com</a>.</p>
                <p>All corrections are made transparently: the original text is preserved with a strikethrough, the corrected text is added, and a timestamped correction note is appended. Our corrections log is publicly accessible.</p>
              </div>
            </section>

            <section id="liability" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Limitation of Liability</h2>
              <div className="space-y-3 text-sm text-muted leading-relaxed">
                <p>Veritas Worldwide provides investigative journalism content for informational purposes. While we strive for accuracy using our evidence tier system, we make no warranties about the completeness or reliability of any information on this site.</p>
                <p>We are not liable for any damages arising from your use of this site or reliance on its content. This site does not constitute legal, financial, or professional advice.</p>
              </div>
            </section>

            <section id="changes" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-foreground mb-3">Changes to Terms</h2>
              <p className="text-sm text-muted leading-relaxed">
                We may update these terms periodically. Significant changes will be communicated via email to registered users and noted on this page. Continued use of the site after changes constitutes acceptance of the updated terms.
              </p>
            </section>
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* On This Page */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">On This Page</h3>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-muted hover:text-accent transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* License Badge */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">License</h3>
                <div className="bg-accent/5 border border-accent/20 rounded-md p-3">
                  <p className="text-xs font-mono text-accent font-medium">CC BY-NC-SA 4.0</p>
                  <p className="text-xs text-muted mt-1">Share freely for non-commercial use with attribution.</p>
                </div>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/privacy" className="block text-sm text-muted hover:text-accent transition-colors">
                    → Privacy Policy
                  </Link>
                  <Link to="/about" className="block text-sm text-muted hover:text-accent transition-colors">
                    → About
                  </Link>
                  <Link to="/methodology" className="block text-sm text-muted hover:text-accent transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/sources" className="block text-sm text-muted hover:text-accent transition-colors">
                    → Sources
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
