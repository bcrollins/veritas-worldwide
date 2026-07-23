import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRIMARY_RELATED_HUBS } from '../components/RelatedHubs'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

/**
 * Soft-404 UI for client-side unknown routes.
 * Server also returns HTTP 404 + X-Robots-Tag for unknown URLs (see server.js).
 * Hub chips mirror the ≤5 primary IA so recovery never dumps readers into a dead end.
 */
const PRIMARY_HUBS = PRIMARY_RELATED_HUBS

const SECONDARY = [
  { to: '/news', label: 'News' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/content-pack', label: 'Research Pack' },
] as const

export default function NotFoundPage() {
  useEffect(() => {
    // No canonical on 404 — noindex alone; do not invent a /404 URL for crawlers.
    setMetaTags({
      title: `Page Not Found | ${SITE_NAME}`,
      description:
        'This page is not part of The Record. Search the archive, open a chapter, or return to the home page.',
      robots: 'noindex, nofollow',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Not Found',
      description: 'Requested page does not exist in the Veritas Worldwide public archive.',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    })
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center" data-testid="not-found-page">
      <p className="mb-6 font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson">
        Document Not Found
      </p>
      <h1 className="mb-4 font-display text-6xl font-bold text-ink md:text-8xl">404</h1>
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-[1px] w-12 bg-crimson" aria-hidden="true" />
        <p className="font-body text-lg italic text-ink-muted">This page is not part of the record.</p>
        <div className="h-[1px] w-12 bg-crimson" aria-hidden="true" />
      </div>
      <p className="mx-auto mb-10 max-w-md font-body text-sm text-ink-faint">
        The page you requested does not exist, may have been moved, or is not yet published.
      </p>

      <p className="mb-3 font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-ink-faint">
        Primary hubs
      </p>
      <div
        className="mb-8 flex flex-wrap items-center justify-center gap-2"
        data-testid="not-found-hub-chips"
        aria-label="Primary hubs"
      >
        {PRIMARY_HUBS.map((hub) => (
          <Link
            key={hub.to}
            to={hub.to}
            className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-colors ${
              hub.to === '/'
                ? 'bg-crimson text-white hover:bg-crimson-dark'
                : 'border border-border text-ink hover:border-crimson hover:text-crimson'
            }`}
          >
            {hub.label}
          </Link>
        ))}
      </div>

      <p className="mb-3 font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-ink-faint">
        Also useful
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {SECONDARY.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-4 py-2 font-sans text-xs font-semibold text-ink-muted transition-colors hover:border-crimson hover:text-crimson"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
