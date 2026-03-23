import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL } from '../lib/seo'

export default function TermsPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Terms of Use | Veritas Worldwide Press',
      description: 'Terms of use for Veritas Worldwide Press and The Record. Free and open access publication with Creative Commons licensing.',
      url: `${SITE_URL}/terms`,
    })
    return () => { clearMetaTags() }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-10 border-b border-border pb-8">
        <p className="chapter-label mb-4">Legal</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Terms of Use
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Last updated: March 2026
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Acceptance of Terms</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            By accessing and using veritasworldwide.com ("the Site"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Nature of Content</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            The Record is a documentary reference work that compiles and presents primary source documents, public records, and historical analysis. Content is organized using a three-tier evidence classification system (Verified, Circumstantial, Disputed) to help readers evaluate the strength of each claim independently. The publication does not provide legal, financial, medical, or professional advice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Intellectual Property & Licensing</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Original editorial content, design, and code of The Record are the property of Veritas Worldwide Press. The publication is distributed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license. You are free to share and adapt the material for non-commercial purposes, provided you give appropriate credit, link to the license, and distribute derivative works under the same terms.
          </p>
          <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
            Primary source documents cited throughout the publication (congressional records, court filings, government reports) are public domain or used under fair use for documentary and educational purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">User Accounts</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Account creation is optional and free. Accounts are stored locally in your browser using hashed credentials. You are responsible for maintaining the security of your browser environment. Veritas Worldwide Press is not liable for unauthorized access to your locally stored account data.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Donations</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Donations are voluntary and processed through Stripe. Donations do not constitute purchases and are non-refundable unless required by applicable law. Donation does not grant any special access, privileges, or editorial influence.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Corrections & Disputes</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            We are committed to accuracy and welcome factual corrections. If you believe any claim is inaccurately classified or sourced, you may submit a correction request to the email address below. All corrections will be reviewed against primary sources and, if warranted, incorporated into future editions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Limitation of Liability</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            The content is provided "as is" without warranty of any kind. Veritas Worldwide Press shall not be liable for any damages arising from the use of or inability to use this Site or its content. Readers are encouraged to independently verify all claims using the cited sources.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Modifications</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            Veritas Worldwide Press reserves the right to modify these terms at any time. Changes will be reflected on this page with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink mb-3">Contact</h2>
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            For questions about these terms:{' '}
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
        <Link to="/privacy" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}
