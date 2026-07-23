import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

/**
 * Scaffold hub for Volume II track (The Record of Jesus Christ and future volumes).
 * noindex until a full multi-volume catalog ships; links only to live evidence surfaces.
 * Entity-only: Veritas Worldwide.
 */
export default function VolumeIIHubPage() {
  useEffect(() => {
    setMetaTags({
      title: `Volume II Track | ${SITE_NAME}`,
      description:
        'Scaffold hub for The Record Volume II track — pure evidentiary compilations. Currently points to The Record of Jesus Christ. Not a finished multi-volume catalog.',
      url: `${SITE_URL}/volume-ii`,
      robots: 'noindex, follow',
    })
    return () => clearMetaTags()
  }, [])

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.14em] text-crimson mb-3">
        Multi-volume scaffold · noindex
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
        Volume II track
      </h1>
      <p className="font-body text-base text-ink-muted leading-relaxed mb-6">
        The Record is organized as multi-volume primary-source work. Volume I covers institutions and
        power. The Volume II track hosts pure evidentiary compilations — beginning with{' '}
        <strong className="text-ink">The Record of Jesus Christ</strong>. This hub is a temporary
        scaffold (noindex) until a full volume catalog ships.
      </p>
      <ul className="space-y-3 mb-10">
        <li>
          <Link
            to="/record-of-jesus-christ"
            className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-crimson hover:underline"
          >
            The Record of Jesus Christ →
          </Link>
        </li>
        <li>
          <Link
            to="/bible"
            className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-crimson hover:underline"
          >
            The Bible: History &amp; Factual Record →
          </Link>
        </li>
        <li>
          <Link
            to="/read"
            className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-crimson hover:underline"
          >
            Volume I — The Record →
          </Link>
        </li>
        <li>
          <Link
            to="/methodology"
            className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold text-ink-muted hover:text-crimson hover:underline"
          >
            Methodology →
          </Link>
        </li>
      </ul>
      <p className="font-sans text-xs text-ink-faint">
        Publisher: {SITE_NAME} only. No personal operator byline.
      </p>
    </main>
  )
}
