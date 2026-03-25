import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

const sections = [
  { id: 'collection', title: 'Information We Collect' },
  { id: 'usage', title: 'How We Use Your Information' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'contact', title: 'Contact Us' },
]

export default function PrivacyPage() {
  useEffect(() => {
    setMetaTags({
      title: `Privacy Policy | The Record — ${SITE_NAME}`,
      description: 'How Veritas Press collects, uses, and protects your information. No ads, no data sales.',
      url: `${SITE_URL}/privacy`,
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
            <span className="text-ink font-medium">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-ink-muted mb-10 border-b border-border pb-6">
              Last updated: March 2026. This policy explains how Veritas Press collects, uses, and protects your information.
            </p>

            <section id="collection" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Information We Collect</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>We collect information you provide directly when you create an account, subscribe, or contact us. This includes your email address, name, and payment information (processed securely via Stripe).</p>
                <p>We automatically collect certain technical data when you visit our site, including IP address, browser type, device information, pages viewed, and referring URL. This data is collected through Google Analytics 4 and our server logs.</p>
                <p>If you participate in our community forums, we collect the content you post and your user profile information.</p>
              </div>
            </section>

            <section id="usage" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">How We Use Your Information</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>Your information is used to provide and improve our services, process subscriptions, send editorial updates, and maintain site security. We use analytics data to understand how readers engage with our investigations and to improve the reading experience.</p>
                <p>We use HubSpot CRM to manage subscriber relationships and deliver targeted content recommendations based on your reading interests. You can opt out of marketing communications at any time.</p>
              </div>
            </section>

            <section id="third-party" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Third-Party Services</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>We integrate with the following third-party services, each governed by their own privacy policies:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-ink">Stripe</strong> — Payment processing for subscriptions</li>
                  <li><strong className="text-ink">Google Analytics 4</strong> — Site usage analytics</li>
                  <li><strong className="text-ink">HubSpot</strong> — CRM and email communications</li>
                  <li><strong className="text-ink">Railway</strong> — Application hosting</li>
                </ul>
                <p>We do not sell your personal information to third parties. We do not share your data with advertisers.</p>
              </div>
            </section>

            <section id="cookies" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Cookies & Tracking</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>We use essential cookies to maintain your session and preferences. Analytics cookies (GA4) help us understand site usage patterns. You can disable non-essential cookies through your browser settings.</p>
                <p>We do not use cookies for advertising purposes. No third-party advertising trackers are present on this site.</p>
              </div>
            </section>

            <section id="rights" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Your Rights</h2>
              <div className="space-y-3 text-sm text-ink-muted leading-relaxed">
                <p>You have the right to access, correct, or delete your personal data. You can export your data or request account deletion by contacting us. California residents have additional rights under the CCPA, including the right to know what data we collect and to opt out of data sales (we do not sell data).</p>
                <p>EU/EEA residents have rights under the GDPR including data portability, right to erasure, and the right to lodge a complaint with a supervisory authority.</p>
              </div>
            </section>

            <section id="contact" className="mb-10">
              <h2 className="text-xl font-serif font-semibold text-ink mb-3">Contact Us</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                For privacy-related questions or requests, contact us at{' '}
                <a href="mailto:privacy@veritasworldwide.com" className="text-crimson hover:underline">privacy@veritasworldwide.com</a>.
                We respond to all privacy requests within 30 days.
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
                      className="block text-sm text-ink-muted hover:text-crimson transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/terms" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Terms of Use
                  </Link>
                  <Link to="/about" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → About
                  </Link>
                  <Link to="/methodology" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Methodology
                  </Link>
                </nav>
              </div>

              {/* Privacy Note */}
              <div className="bg-crimson/5 border border-crimson/20 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink mb-2">Your Privacy Matters</h3>
                <p className="text-xs text-ink-muted">We believe investigative journalism and data privacy go hand in hand. No ads, no data sales, ever.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
