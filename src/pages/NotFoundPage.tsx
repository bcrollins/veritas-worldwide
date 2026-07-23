import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

/**
 * Soft-404 UI for client-side unknown routes.
 * Server also returns HTTP 404 + X-Robots-Tag for unknown URLs (see server.js).
 */
export default function NotFoundPage() {
  useEffect(() => {
    setMetaTags({
      title: `Page Not Found | ${SITE_NAME}`,
      description:
        'This page is not part of The Record. Search the archive, open a chapter, or return to the home page.',
      url: `${SITE_URL}/404`,
      robots: 'noindex, nofollow',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Not Found',
      description: 'Requested page does not exist in the Veritas Worldwide public archive.',
      url: `${SITE_URL}/404`,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    })
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
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
      <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
        >
          Return to The Record
        </Link>
        <Link
          to="/search"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Search All Chapters
        </Link>
        <Link
          to="/read"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Browse The Record
        </Link>
        <Link
          to="/profiles"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Power Profiles
        </Link>
        <Link
          to="/israel-dossier"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Israel Dossier
        </Link>
        <Link
          to="/methodology"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Methodology
        </Link>
        <Link
          to="/news"
          className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson"
        >
          Current Events
        </Link>
      </div>
    </div>
  )
}
