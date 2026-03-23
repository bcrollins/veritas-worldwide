import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import { usePageView } from './hooks/usePageView'
import { useTheme } from './lib/ThemeContext'
import { DONATE_URL } from './lib/constants'
import { trackSupportClick } from './lib/ga4'
import NewsletterPopup from './components/engagement/NewsletterPopup'
import PerformanceMonitor from './components/engagement/PerformanceMonitor'
import ReadingStreak from './components/engagement/ReadingStreak'
import { useScrollDepth } from './hooks/useScrollDepth'

const HomePage = lazy(() => import('./pages/HomePage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))
const SourcesPage = lazy(() => import('./pages/SourcesPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))


function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-ink-muted hover:text-ink transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isLoggedIn, user, logout, setShowAuthModal } = useAuth()

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const navLinks = [
    { to: '/', label: 'The Record' },
    { to: '/search', label: 'Search' },
    { to: '/timeline', label: 'Timeline' },
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
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-xs tracking-[0.1em] uppercase transition-colors ${
                  location.pathname === link.to ? 'text-crimson font-bold' : 'text-ink-muted hover:text-ink'
                }`}
                {...(location.pathname === link.to ? { 'aria-current': 'page' as const } : {})}
              >
                {link.label}
              </Link>
            ))}
            <ReadingStreak />
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-crimson/10 text-crimson font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson hover:text-white transition-all duration-200"
              aria-label="Support Veritas Worldwide Press"
              onClick={() => trackSupportClick('header')}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support
            </a>
            <ThemeToggle />
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
            className="md:hidden p-3 -mr-3 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
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
        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        {/* Mobile Slide-in Nav */}
        <nav
          id="mobile-nav"
          className={`fixed top-0 right-0 h-full w-72 bg-parchment z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <span className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 -mr-2 text-ink-muted hover:text-ink"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col px-6 py-4 gap-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 60px)' }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm tracking-[0.05em] uppercase py-3 border-b border-border/50 transition-colors ${
                  location.pathname === link.to ? 'text-crimson font-bold' : 'text-ink-muted hover:text-ink'
                }`}
                onClick={() => setMenuOpen(false)}
                {...(location.pathname === link.to ? { 'aria-current': 'page' as const } : {})}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-crimson/10 text-crimson font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson hover:text-white transition-all duration-200 mt-4"
              onClick={() => { trackSupportClick('mobile-menu'); setMenuOpen(false) }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support This Work
            </a>
            <div className="flex items-center gap-2 mt-4">
              <ThemeToggle />
              <span className="font-sans text-sm text-ink-muted">Toggle theme</span>
            </div>
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-crimson text-left py-3"
              >
                Sign Out ({user?.displayName?.split(' ')[0]})
              </button>
            ) : (
              <button
                onClick={() => { setShowAuthModal(true); setMenuOpen(false) }}
                className="font-sans text-sm tracking-[0.05em] uppercase text-crimson font-semibold text-left py-3"
              >
                Sign In
              </button>
            )}
            <p className="font-sans text-[0.6rem] text-ink-faint mt-6">
              Press <kbd className="px-1.5 py-0.5 bg-parchment-dark rounded text-[0.55rem] font-mono">/</kbd> to search &middot;
              <kbd className="px-1.5 py-0.5 bg-parchment-dark rounded text-[0.55rem] font-mono ml-1">j</kbd>/<kbd className="px-1.5 py-0.5 bg-parchment-dark rounded text-[0.55rem] font-mono">k</kbd> to navigate chapters
            </p>
          </div>
        </nav>
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
          <nav aria-label="Footer navigation">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-white/50 hover:text-white transition-colors">The Record</Link>
              <Link to="/search" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Search</Link>
              <Link to="/timeline" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Timeline</Link>
              <Link to="/methodology" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Methodology</Link>
              <Link to="/sources" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Sources</Link>
              <Link to="/bookmarks" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Saved Articles</Link>
            </div>
          </nav>
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Principles</p>
            <p className="font-body text-sm italic text-white/50 leading-relaxed">
              Primary Sources &middot; Public Record &middot; Your Conclusions
            </p>
            <p className="font-sans text-xs text-white/30 mt-6">
              Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.
            </p>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 font-sans text-xs font-semibold text-crimson-light hover:text-white transition-colors"
              onClick={() => trackSupportClick('footer')}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Support This Work
            </a>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://x.com/VeritasWorldwide" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors" aria-label="Follow on X">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="mailto:contact@veritasworldwide.com" className="text-white/30 hover:text-white transition-colors" aria-label="Contact via email">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
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
  useScrollDepth()
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
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-6">
                Document Not Found
              </p>
              <h1 className="font-display text-6xl md:text-8xl font-bold text-ink mb-4">404</h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-crimson" />
                <p className="font-body text-lg italic text-ink-muted">
                  This page is not part of the record.
                </p>
                <div className="h-[1px] w-12 bg-crimson" />
              </div>
              <p className="font-body text-sm text-ink-faint mb-10 max-w-md mx-auto">
                The page you requested does not exist, may have been moved, or is not yet published.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors">
                  Return to The Record
                </Link>
                <Link to="/search" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors">
                  Search All Chapters
                </Link>
              </div>
            </div>
          } />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <AuthModal />
      <Toast />
      <NewsletterPopup />
      <PerformanceMonitor />
    </div>
  )
}
