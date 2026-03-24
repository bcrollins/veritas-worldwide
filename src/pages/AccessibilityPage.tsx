import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

export default function AccessibilityPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Accessibility | Veritas Worldwide Press',
      description: 'Accessibility statement for Veritas Worldwide Press. Our commitment to WCAG 2.1 AA compliance and inclusive design.',
      url: `${SITE_URL}/accessibility`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Accessibility Statement',
      'url': `${SITE_URL}/accessibility`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">Accessibility</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Accessibility Statement
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Our commitment to making The Record accessible to every reader.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Standards</h2>
        <p className="article-body mb-4">
          Veritas Worldwide Press is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We continuously test and improve our implementation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Features</h2>
        <p className="article-body mb-4">
          The following accessibility features are implemented across the publication:
        </p>
        <div className="space-y-3 mb-6">
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Evidence Tier Accessibility</p>
            <p className="font-body text-sm text-ink-muted">Evidence classifications (Verified, Circumstantial, Disputed) use color, text labels, AND icons — never color alone. All three tiers are distinguishable by colorblind readers.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Keyboard Navigation</p>
            <p className="font-body text-sm text-ink-muted">Full keyboard navigation with visible focus indicators. Press ? for keyboard shortcuts. All interactive elements meet 44pt minimum touch targets.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Color Contrast</p>
            <p className="font-body text-sm text-ink-muted">All text meets WCAG 2.1 AA minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text, in both light and dark modes.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Dark Mode</p>
            <p className="font-body text-sm text-ink-muted">Full dark mode with adjusted contrast ratios for all elements including evidence tiers, stat cards, and data tables.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Adjustable Typography</p>
            <p className="font-body text-sm text-ink-muted">Font size controls allow readers to increase or decrease article text size. Body text starts at 18px with 1.8 line-height for optimal readability.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Skip to Content</p>
            <p className="font-body text-sm text-ink-muted">A "Skip to content" link is available for keyboard users to bypass navigation and jump directly to the main content area.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Semantic HTML &amp; ARIA</p>
            <p className="font-body text-sm text-ink-muted">Proper heading hierarchy, landmark regions, ARIA labels on icon buttons, and role attributes for interactive components.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Print Optimization</p>
            <p className="font-body text-sm text-ink-muted">Every chapter prints cleanly with navigation and interactive elements hidden. Evidence boxes remain legible in grayscale.</p>
          </div>
          <div className="p-3 border border-border rounded-sm">
            <p className="font-sans text-sm font-semibold text-ink mb-1">Reduced Motion</p>
            <p className="font-body text-sm text-ink-muted">Animations and transitions respect the prefers-reduced-motion system preference.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold text-ink mb-4">Feedback</h2>
        <p className="article-body mb-4">
          If you encounter any accessibility barriers while using this publication, please contact us. We take accessibility feedback seriously and will work to address any issues promptly.
        </p>
        <a href="mailto:rights@veritasworldwide.com" className="font-sans text-sm text-crimson hover:text-crimson-dark transition-colors">
          rights@veritasworldwide.com
        </a>
      </section>

      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/about" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          About Us
        </Link>
      </div>
    </div>
  )
}
