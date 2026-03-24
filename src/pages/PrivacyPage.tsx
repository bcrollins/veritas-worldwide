import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

export default function PrivacyPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Privacy Policy | Veritas Worldwide Press',
      description: 'How Veritas Worldwide Press handles reader data, analytics, and privacy. We collect minimal data and never sell personal information.',
      url: `${SITE_URL}/privacy`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Privacy Policy',
      'url': `${SITE_URL}/privacy`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-10 border-b border-border pb-8">
        <p className="chapter-label mb-4">Legal</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Privacy Policy
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Last updated: March 2026
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Overview</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Veritas Worldwide Press is committed to reader privacy. This publication exists to inform, not to surveil. We collect the minimum data necessary to operate and improve the site, and we never sell, share, or monetize personal information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">What We Collect</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Anonymous Analytics</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                We record page views to understand which chapters are most read and to measure overall traffic. This includes: the page visited, the date/time of the visit, and approximate country (derived from IP address). We do not store IP addresses after geolocation lookup.
              </p>
            </div>
            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Newsletter Signup</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                If you voluntarily enter your email for newsletter notifications, that email is stored locally in your browser (localStorage). It is not transmitted to any server until a backend newsletter service is configured.
              </p>
            </div>

            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Account Data</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                If you create a free account, your email is hashed using SHA-256 via the Web Crypto API and stored in your browser's localStorage. The plaintext email is never stored or transmitted. Account data is used solely for bookmarking chapters and reading preferences.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">What We Do Not Collect</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            We do not use advertising trackers, retargeting pixels, or third-party data brokers. We do not collect names, physical addresses, phone numbers, payment information (donations are processed entirely by Stripe on their servers), browsing history beyond this site, or any device fingerprinting data.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Third-Party Services</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Google Analytics (GA4)</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                We use Google Analytics 4 for aggregate traffic analysis. GA4 does not collect personally identifiable information and is configured with IP anonymization enabled. You can opt out using browser extensions or privacy-focused browsers.
              </p>
            </div>

            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Stripe</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                Donations are processed through Stripe Payment Links. We never see, store, or have access to your credit card number or payment details. Stripe's privacy policy governs all payment data.
              </p>
            </div>
            <div className="border border-border rounded-sm p-4 bg-surface">
              <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Railway (Hosting)</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                This site is hosted on Railway. Standard server access logs (IP address, request path, timestamp) may be collected by the hosting provider per their terms of service.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Cookies</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            This site uses localStorage for theme preferences, bookmarks, reading progress, and account data. We use Google Analytics cookies for aggregate traffic measurement. No advertising or tracking cookies are used.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Your Rights</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            You can clear all locally stored data at any time by clearing your browser's localStorage for this site. If you have questions about your data or wish to request deletion of any information associated with you, contact us at the address below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Contact</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            For privacy-related inquiries:{' '}
            <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:text-crimson-dark transition-colors">
              rights@veritasworldwide.com
            </a>
          </p>
        </section>
      </div>

      <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/terms" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Terms of Use
        </Link>
      </div>
    </div>
  )
}
