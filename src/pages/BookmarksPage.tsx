import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { chapters } from '../data/chapters'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

export default function BookmarksPage() {
  const { user, bookmarks } = useAuth()

  const bookmarkedChapters = chapters.filter(ch =>
    bookmarks?.includes(ch.id)
  )

  useEffect(() => {
    setMetaTags({
      title: `Your Bookmarks | The Record — ${SITE_NAME}`,
      description: 'Chapters you have saved for later reading.',
      url: `${SITE_URL}/bookmarks`,
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
            <span className="text-ink font-medium">Bookmarks</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-2">
              Your Bookmarks
            </h1>
            <p className="text-lg text-ink-muted mb-10 leading-relaxed border-b border-border pb-8">
              Chapters you've saved for later reading. Pick up right where you left off.
            </p>

            {!user ? (
              <div className="bg-surface border border-border rounded-xl p-8 md:p-12 text-center">
                <p className="text-4xl mb-4">🔒</p>
                <h2 className="text-xl font-serif font-semibold text-ink mb-3">
                  Sign in to access bookmarks
                </h2>
                <p className="text-ink-muted mb-6 max-w-md mx-auto">
                  Create a free account to save chapters, track your reading progress, and pick up where you left off.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-crimson text-white px-6 py-3 rounded-lg font-medium hover:bg-crimson-dark transition-colors"
                >
                  Sign In →
                </Link>
              </div>
            ) : bookmarkedChapters.length === 0 ? (
              <div className="bg-surface border border-border rounded-xl p-8 md:p-12 text-center">
                <p className="text-4xl mb-4">📑</p>
                <h2 className="text-xl font-serif font-semibold text-ink mb-3">
                  No bookmarks yet
                </h2>
                <p className="text-ink-muted mb-6 max-w-md mx-auto">
                  Start reading and bookmark chapters you want to come back to. Look for the bookmark icon on any chapter page.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-crimson text-white px-6 py-3 rounded-lg font-medium hover:bg-crimson-dark transition-colors"
                >
                  Browse Chapters →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookmarkedChapters.map((chapter) => (
                  <Link
                    key={chapter.id}
                    to={`/chapter/${chapter.id}`}
                    className="group block bg-surface border border-border rounded-lg p-5 hover:border-crimson/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-crimson mb-1">{chapter.number}</p>
                        <h3 className="text-lg font-serif font-semibold text-ink group-hover:text-crimson transition-colors">
                          {chapter.title}
                        </h3>
                        {chapter.subtitle && (
                          <p className="text-sm text-ink-muted mt-1 line-clamp-2">{chapter.subtitle}</p>
                        )}
                      </div>
                      <span className="text-crimson shrink-0 mt-1">★</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Reading Stats */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Reading Progress</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Total Chapters</span>
                    <span className="font-medium text-ink">{chapters.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Bookmarked</span>
                    <span className="font-medium text-crimson">{bookmarkedChapters.length}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 mt-2">
                    <div
                      className="bg-crimson rounded-full h-2 transition-all"
                      style={{ width: `${chapters.length > 0 ? (bookmarkedChapters.length / chapters.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Nav */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Quick Navigation</h3>
                <nav className="space-y-2">
                  <Link to="/" className="flex items-center gap-2 text-sm text-ink-muted hover:text-crimson transition-colors">
                    → All Chapters
                  </Link>
                  <Link to="/power-profiles" className="flex items-center gap-2 text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Power Profiles
                  </Link>
                  <Link to="/search" className="flex items-center gap-2 text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Search
                  </Link>
                  <Link to="/sources" className="flex items-center gap-2 text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Sources
                  </Link>
                </nav>
              </div>

              {/* Support CTA */}
              <div className="bg-crimson/5 border border-crimson/20 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink mb-2">Support This Work</h3>
                <p className="text-xs text-ink-muted mb-3">Independent journalism requires independent funding. Help us keep the investigation going.</p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-crimson text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-crimson-dark transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
