import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import SearchPage from './pages/SearchPage'
import MethodologyPage from './pages/MethodologyPage'
import SourcesPage from './pages/SourcesPage'
import BookmarksPage from './pages/BookmarksPage'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isLoggedIn, user, logout, setShowAuthModal } = useAuth()

  const navLinks = [
    { to: '/', label: 'The Record' },
    { to: '/search', label: 'Search' },
    { to: '/methodology', label: 'Methodology' },
    { to: '/sources', label: 'Sources' },
    ...(isLoggedIn ? [{ to: '/bookmarks', label: 'Saved' }] : []),
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
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Routes>
      </main>
      <Footer />
      <AuthModal />
      <Toast />
    </div>
  )
}
