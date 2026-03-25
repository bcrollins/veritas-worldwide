import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

const a11yFeatures = [
  { title: 'Evidence Tier Accessibility', desc: 'Evidence classifications (Verified, Circumstantial, Disputed) use color, text labels, AND icons — never color alone. All three tiers are distinguishable by colorblind readers.' },
  { title: 'Keyboard Navigation', desc: 'Full keyboard navigation with visible focus indicators. Press ? for keyboard shortcuts. All interactive elements meet 44pt minimum touch targets.' },
  { title: 'Color Contrast', desc: 'All text meets WCAG 2.1 AA minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text, in both light and dark modes.' },
  { title: 'Dark Mode', desc: 'Full dark mode with adjusted contrast ratios for all elements including evidence tiers, stat cards, and data tables.' },
  { title: 'Adjustable Typography', desc: 'Font size controls allow readers to increase or decrease article text size. Body text starts at 18px with 1.8 line-height for optimal readability.' },
  { title: 'Skip to Content', desc: 'A "Skip to content" link is available for keyboard users to bypass navigation and jump directly to the main content area.' },
  { title: 'Semantic HTML & ARIA', desc: 'Proper heading hierarchy, landmark regions, ARIA labels on icon buttons, and role attributes for interactive components.' },
  { title: 'Print Optimization', desc: 'Every chapter prints cleanly with navigation and interactive elements hidden. Evidence boxes remain legible in grayscale.' },
  { title: 'Reduced Motion', desc: 'Animations and transitions respect the prefers-reduced-motion system preference.' },
]

const sections = [
  { id: 'standards', title: 'Standards' },
  { id: 'features', title: 'Features' },
  { id: 'feedback', title: 'Feedback' },
]

export default function AccessibilityPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Accessibility | Veritas Press',
      description: 'Accessibility statement for Veritas Press. Our commitment to WCAG 2.1 AA compliance and inclusive design.',
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
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Accessibility</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-ink mb-3">
              Accessibility Statement
            </h1>
            <p className="text-lg text-ink-muted mb-10 leading-relaxed border-b border-border pb-8">
              Our commitment to making The Record accessible to every reader.
            </p>

            <section id="standards" className="mb-10">
              <h2 className="text-xl font-display font-semibold text-ink mb-3">Standards</h2>
              <p className="text-sm text-ink-muted leading-relaxed">
                Veritas Press is designed to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. We continuously test and improve our implementation.
              </p>
            </section>

            <section id="features" className="mb-10">
              <h2 className="text-xl font-display font-semibold text-ink mb-4">Features</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-5">
                The following accessibility features are implemented across the publication:
              </p>
              <div className="space-y-3">
                {a11yFeatures.map((feature) => (
                  <div key={feature.title} className="p-4 bg-surface border border-border rounded-lg">
                    <p className="font-sans text-sm font-semibold text-ink mb-1">{feature.title}</p>
                    <p className="font-body text-sm text-ink-muted leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="feedback" className="mb-10">
              <h2 className="text-xl font-display font-semibold text-ink mb-3">Feedback</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-4">
                If you encounter any accessibility barriers while using this publication, please contact us. We take accessibility feedback seriously and will work to address any issues promptly.
              </p>
              <a href="mailto:rights@veritasworldwide.com" className="font-sans text-sm text-crimson hover:text-crimson-dark transition-colors">
                rights@veritasworldwide.com
              </a>
            </section>

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-lg hover:bg-crimson-dark transition-colors text-center">
                Read The Record
              </Link>
              <Link to="/about" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-lg hover:border-crimson hover:text-crimson transition-colors text-center">
                About Us
              </Link>
            </div>
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* On This Page */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">On This Page</h3>
                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Compliance Badge */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Compliance</h3>
                <div className="bg-verified-bg border border-verified-border rounded-md p-3">
                  <p className="text-xs font-mono text-verified font-medium">WCAG 2.1 AA</p>
                  <p className="text-xs text-ink-muted mt-1">Web Content Accessibility Guidelines conformance target.</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Key Metrics</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Contrast Ratio</dt>
                    <dd className="font-medium text-ink">≥ 4.5:1</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Touch Targets</dt>
                    <dd className="font-medium text-ink">≥ 44px</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Body Text</dt>
                    <dd className="font-medium text-ink">18px</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Line Height</dt>
                    <dd className="font-medium text-ink">1.8</dd>
                  </div>
                </dl>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/about" className="block text-sm text-ink-muted hover:text-crimson transition-colors">→ About</Link>
                  <Link to="/privacy" className="block text-sm text-ink-muted hover:text-crimson transition-colors">→ Privacy Policy</Link>
                  <Link to="/terms" className="block text-sm text-ink-muted hover:text-crimson transition-colors">→ Terms of Use</Link>
                  <Link to="/methodology" className="block text-sm text-ink-muted hover:text-crimson transition-colors">→ Methodology</Link>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
