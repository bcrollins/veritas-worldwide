import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import { usePageView } from './hooks/usePageView'
import { useTheme } from './lib/ThemeContext'
import { DONATE_URL, TAGLINE, MEMBERSHIP } from './lib/constants'
import { trackSupportClick } from './lib/ga4'
import NewsletterPopup from './components/engagement/NewsletterPopup'
import PerformanceMonitor from './components/engagement/PerformanceMonitor'
import ReadingStreak from './components/engagement/ReadingStreak'
import { useScrollDepth } from './hooks/useScrollDepth'
import { I18nProvider, useI18n } from './lib/i18n'
import LanguageSelector from './components/LanguageSelector'

const HomePage = lazy(() => import('./pages/HomePage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))
const SourcesPage = lazy(() => import('./pages/SourcesPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const IsraelDossierPage = lazy(() => import('./pages/IsraelDossierPage'))
const MembershipPage = lazy(() => import('./pages/MembershipPage'))
const DeepStatePage = lazy(() => import('./pages/DeepStatePage'))
const ReadTheBookPage = lazy(() => import('./pages/ReadTheBookPage'))


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
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const { isLoggedIn, user, logout, setShowAuthModal } = useAuth()
  const { t } = useI18n()

  // Auto-close menus on route change
  useEffect(() => {
    setMenuOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  // Close menus on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setMoreOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Close "More" dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return
    const handleClick = () => setMoreOpen(false)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [moreOpen])

  const primaryLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
    { to: '/timeline', label: t('nav.timeline') },
  ]

  const secondaryLinks = [
    { to: '/methodology', label: t('nav.methodology') },
    { to: '/sources', label: t('nav.sources') },
    { to: '/bookmarks', label: t('nav.bookmarks') },
    { to: '/analytics', label: t('nav.analytics') },
    { to: '/about', label: t('nav.about') },
    { to: '/israel-dossier', label: t('nav.israel') },
    { to: '/deep-state', label: t('nav.deepState') },
    { to: '/membership', label: t('nav.membership') },
  ]

  const allLinks = [...primaryLinks, ...secondaryLinks]

  const isSecondaryActive = secondaryLinks.some(l => location.pathname === l.to)

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Veritas Worldwide Press — Home">
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="4" className="fill-ink group-hover:fill-crimson transition-colors" />
              <text x="16" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#FAF8F5">V</text>
              <line x1="6" y1="27" x2="26" y2="27" stroke="#FAF8F5" strokeWidth="1.5" strokeOpacity="0.4" />
            </svg>
            <span className="hidden sm:block font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink group-hover:text-crimson transition-colors">
              Veritas
            </span>
          </Link>

          {/* Desktop Nav — center */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {primaryLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-[0.7rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm transition-colors ${
                  location.pathname === link.to
                    ? 'text-crimson font-semibold bg-crimson/5'
                    : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
                }`}
                {...(location.pathname === link.to ? { 'aria-current': 'page' as const } : {})}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setMoreOpen(!moreOpen) }}
                className={`font-sans text-[0.7rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm transition-colors inline-flex items-center gap-1 ${
                  isSecondaryActive
                    ? 'text-crimson font-semibold bg-crimson/5'
                    : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
                }`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <svg className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 mt-1 w-44 bg-parchment border border-border rounded-sm shadow-lg py-1 z-50">
                  {secondaryLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2.5 font-sans text-xs tracking-[0.05em] uppercase transition-colors ${
                        location.pathname === link.to
                          ? 'text-crimson font-semibold bg-crimson/5'
                          : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
                      }`}
                      {...(location.pathname === link.to ? { 'aria-current': 'page' as const } : {})}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-0.5">
            <ReadingStreak />
            <Link
              to="/membership"
              className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 min-h-[36px] bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
              onClick={() => trackSupportClick('header')}
            >
              {t('nav.join')}
            </Link>
            <LanguageSelector />
            <ThemeToggle />
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="hidden sm:inline-flex items-center justify-center p-2 min-w-[44px] min-h-[44px] font-sans text-[0.65rem] tracking-[0.1em] uppercase text-ink-muted hover:text-crimson transition-colors"
                title={`Sign out (${user?.displayName?.split(' ')[0]})`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="hidden sm:inline-flex items-center justify-center p-2 min-w-[44px] min-h-[44px] text-ink-muted hover:text-crimson transition-colors"
                aria-label="Sign in"
                title="Sign in"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-ink"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Accent line */}
      <div className="h-[2px] bg-crimson" />

      {/* Tagline bar */}
      <div className="bg-ink text-center py-1.5 px-4">
        <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-white/50">
          <span className="text-white/80 font-semibold">{TAGLINE}</span>
          <span className="mx-2 text-white/20">·</span>
          <Link to="/membership" className="text-crimson-light hover:text-white transition-colors font-semibold">
            Join Us →
          </Link>
        </p>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Nav */}
      <nav
        id="mobile-nav"
        className={`fixed top-0 right-0 h-full w-72 bg-parchment z-[70] md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-border">
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-ink-muted hover:text-ink"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-6 py-4 gap-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 56px)' }}>
          {allLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm tracking-[0.05em] uppercase py-3 border-b border-border/30 transition-colors ${
                location.pathname === link.to ? 'text-crimson font-semibold' : 'text-ink-muted hover:text-ink'
              }`}
              onClick={() => setMenuOpen(false)}
              {...(location.pathname === link.to ? { 'aria-current': 'page' as const } : {})}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors mt-6"
            onClick={() => { trackSupportClick('mobile-menu'); setMenuOpen(false) }}
          >
            Become a Member
          </Link>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="font-sans text-xs text-ink-faint">Theme</span>
            </div>
            {isLoggedIn ? (
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => { setShowAuthModal(true); setMenuOpen(false) }}
                className="font-sans text-xs tracking-[0.05em] uppercase text-crimson font-semibold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-ink text-white/70 py-16 mt-20 no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
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
              <Link to="/" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.home')}</Link>
              <Link to="/search" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.search')}</Link>
              <Link to="/timeline" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.timeline')}</Link>
              <Link to="/methodology" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.methodology')}</Link>
              <Link to="/sources" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.sources')}</Link>
              <Link to="/bookmarks" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.bookmarks')}</Link>
              <Link to="/about" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.about')}</Link>
              <Link to="/deep-state" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.deepState')}</Link>
              <Link to="/membership" className="font-sans text-sm text-crimson-light hover:text-white transition-colors font-semibold">{t('nav.membership')}</Link>
              <Link to="/accessibility" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.accessibility')}</Link>
              <Link to="/privacy" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.privacy')}</Link>
              <Link to="/terms" className="font-sans text-sm text-white/50 hover:text-white transition-colors">{t('nav.terms')}</Link>
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
              {t('action.support')}
            </a>
            {/* Social Links */}
            <div className="flex items-center gap-1 mt-5 flex-wrap">
              <a href="https://x.com/VeritasWorldwide" target="_blank" rel="noopener noreferrer" className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-sm" aria-label="Follow on X">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/bcrollins/veritas-worldwide" target="_blank" rel="noopener noreferrer" className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-sm" aria-label="Source code on GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.reddit.com/r/VeritasWorldwide" target="_blank" rel="noopener noreferrer" className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-sm" aria-label="Join on Reddit">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z"/></svg>
              </a>
              <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-sm" aria-label="RSS Feed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
              </a>
              <a href="mailto:rights@veritasworldwide.com" className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-sm" aria-label="Contact via email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
    <I18nProvider>
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
        <ErrorBoundary>
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/israel-dossier" element={<IsraelDossierPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/deep-state" element={<DeepStatePage />} />
          <Route path="/read" element={<ReadTheBookPage />} />
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
        </ErrorBoundary>
      </main>
      <Footer />
      <AuthModal />
      <Toast />
      <NewsletterPopup />
      <PerformanceMonitor />
    </div>
    </I18nProvider>
  )
}
