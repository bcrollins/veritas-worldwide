import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import { usePageView } from './hooks/usePageView'

const HomePage = lazy(() => import('./pages/HomePage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))
const SourcesPage = lazy(() => import('./pages/SourcesPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))

const DONATE_URL = 'https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isLoggedIn, user, logout, setShowAuthModal } = useAuth()

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: 'The Record' },
    { to: '/search', label: 'Search' },
    { to: '/methodology', label: 'Methodology' },
    { to: '/sources', label: 'Sources' },
    { to: '/bookmarks', label: 'Saved' },
    { to: '/analytics', label: 'Analytics' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink hover:text-crimson transition-colors">
            Veritas Worldwide Press
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-xs tracking-[0.1em] uppercase transition-colors ${
                  location.pathname === link.to ? 'text-crimson font-bold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-crimson/10 text-crimson font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson hover:text-white transition-all duration-200"
              aria-label="Support Veritas Worldwide Press"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support
            </a>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs text-ink-faint">
                  {user?.displayName?.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className="font-sans text-xs tracking-[0.1em] uppercase text-ink-muted hover:text-crimson transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors"
              >
                Sign In
              </button>
            )}
          </nav>
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-3 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-crimson/10 text-crimson font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson hover:text-white transition-all duration-200 mt-1"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support This Work
            </a>
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-crimson text-left"
              >
                Sign Out ({user?.displayName?.split(' ')[0]})
              </button>
            ) : (
              <button
                onClick={() => { setShowAuthModal(true); setMenuOpen(false) }}
                className="font-sans text-sm tracking-[0.05em] uppercase text-crimson font-semibold text-left"
              >
                Sign In
              </button>
            )}
          </nav>
        )}
      </div>
      <div className="h-[3px] bg-crimson" />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white/70 py-16 mt-20 no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-4">
              Veritas Worldwide Press
            </p>
            <p className="font-body text-sm leading-relaxed text-white/50">
              Published March 2026<br />
              Compiled &amp; Edited by B.R.<br />
              Volume I
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-white/50 hover:text-white transition-colors">The Record</Link>
              <Link to="/search" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Search</Link>
              <Link to="/methodology" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Methodology</Link>
              <Link to="/sources" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Sources</Link>
              <Link to="/bookmarks" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Saved Articles</Link>
              <Link to="/analytics" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Analytics</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Principles</p>
            <p className="font-body text-sm italic text-white/50 leading-relaxed">
              Primary Sources &middot; Public Record &middot; Your Conclusions
            </p>
            <p className="font-sans text-xs text-white/30 mt-6">
              Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="font-sans text-xs text-white/30">
            &copy; 2026 Veritas Worldwide Press &middot; veritasworldwide.com &middot; Free &amp; Open Access
          </p>
        </div>
      </div>
    </footer>
  )
}

function PageViewTracker() {
  usePageView()
  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-sm focus:font-sans focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <PageViewTracker />
      <Header />
      <main id="main-content">
        <Suspense fallback={
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <div className="inline-block w-5 h-5 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
          </div>
        }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
              <h1 className="font-display text-5xl font-bold text-ink mb-4">404</h1>
              <p className="font-body text-lg text-ink-muted mb-8">This page doesn't exist.</p>
              <Link to="/" className="font-sans text-sm font-semibold text-crimson hover:text-crimson-dark">
                &larr; Return to The Record
              </Link>
            </div>
          } />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <AuthModal />
      <Toast />
    </div>
  )
}
