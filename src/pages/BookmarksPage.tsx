import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { chapterMeta } from '../data/chapterMeta'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

export default function BookmarksPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Saved Articles | The Record — Veritas Worldwide Press',
      description: 'Your saved chapters from The Record — a documentary history of power, money, and institutions.',
      url: `${SITE_URL}/bookmarks`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Saved Chapters',
      'url': `${SITE_URL}/bookmarks`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])
  const { isLoggedIn, bookmarks, setShowAuthModal } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="chapter-label mb-4">Saved Articles</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">
          Your Bookmarks
        </h1>
        <p className="font-body text-lg text-ink-muted mb-8">
          Sign in to save articles and access them anytime.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
        >
          Sign In to View Bookmarks
        </button>
      </div>
    )
  }

  const savedChapters = chapterMeta.filter(ch => bookmarks.includes(ch.id))

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">Your Library</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Saved Articles
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          {savedChapters.length === 0
            ? 'You haven\'t saved any articles yet. Browse The Record and tap the bookmark icon to save chapters here.'
            : `${savedChapters.length} article${savedChapters.length === 1 ? '' : 's'} saved.`
          }
        </p>
      </header>

      {savedChapters.length > 0 ? (
        <div className="space-y-4">
          {savedChapters.map(ch => (
            <Link
              key={ch.id}
              to={`/chapter/${ch.id}`}
              className="group block p-5 border border-border rounded-sm hover:border-crimson transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson">
                  {ch.number}
                </span>
                {ch.dateRange && (
                  <span className="font-sans text-xs text-ink-faint">{ch.dateRange}</span>
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-ink group-hover:text-crimson transition-colors">
                {ch.title}
              </h3>
              <p className="font-body text-sm text-ink-muted mt-1 line-clamp-2">{ch.subtitle}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-12 h-12 text-ink-faint mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <p className="font-body text-base text-ink-muted mb-6">
            Tap the bookmark icon on any chapter to save it here for quick access.
          </p>
          <Link
            to="/"
            className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
          >
            Browse The Record
          </Link>
        </div>
      )}
    </div>
  )
}
