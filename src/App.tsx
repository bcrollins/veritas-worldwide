import { useState, useEffect, lazy, Suspense, type FocusEvent } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import { isAdminLoggedIn } from './lib/adminAuth'
import Toast from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import { usePageView } from './hooks/usePageView'
import { useTheme } from './lib/ThemeContext'
import { DONATE_URL } from './lib/constants'
import { trackSupportClick } from './lib/ga4'
import ReadingStreak from './components/engagement/ReadingStreak'
import { useScrollDepth } from './hooks/useScrollDepth'
import { I18nProvider, useI18n } from './lib/i18n'
import LanguageSelector from './components/LanguageSelector'
import NewsletterSignup from './components/NewsletterSignup'
import { trackPageView } from './lib/hubspot'
import { handleStripeReturn } from './lib/conversionTracking'
import VeritasLogo from './components/VeritasLogo'
import { useExperiment } from './hooks/useExperiment'
import { trackConversion } from './lib/abTest'

const AuthModal = lazy(() => import('./components/AuthModal'))
const NewsletterPopup = lazy(() => import('./components/engagement/NewsletterPopup'))
const PerformanceMonitor = lazy(() => import('./components/engagement/PerformanceMonitor'))
const ExitIntentCapture = lazy(() => import('./components/ExitIntentCapture'))
const StickyMembershipBar = lazy(() => import('./components/StickyMembershipBar'))
const CookieConsent = lazy(() => import('./components/CookieConsent'))

const HomePage = lazy(() => import('./pages/HomePage'))
const ChapterPage = lazy(() => import('./pages/ChapterPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))
const SourcesPage = lazy(() => import('./pages/SourcesPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const TimelinePage = lazy(() => import('./pages/TimelinePage'))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const IsraelDossierPage = lazy(() => import('./pages/IsraelDossierPage'))
const MembershipPage = lazy(() => import('./pages/MembershipPage'))
const DeepStatePage = lazy(() => import('./pages/DeepStatePage'))
const ReadTheBookPage = lazy(() => import('./pages/ReadTheBookPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const ContentPackPage = lazy(() => import('./pages/ContentPackPage'))
const ForumPage = lazy(() => import('./pages/ForumPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ProfilesIndexPage = lazy(() => import('./pages/ProfilesIndexPage'))
const TopicsIndexPage = lazy(() => import('./pages/TopicsIndexPage'))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const InstituteLayout = lazy(() => import('./components/institute/InstituteLayout'))
const InstitutePage = lazy(() => import('./pages/InstitutePage'))
const InstituteCoursePage = lazy(() => import('./pages/InstituteCoursePage'))
const InstituteGuidePage = lazy(() => import('./pages/InstituteGuidePage'))
const InstituteBookPage = lazy(() => import('./pages/InstituteBookPage'))
const InstituteMethodologyPage = lazy(() => import('./pages/InstituteMethodologyPage'))
const SubscribeSuccessPage = lazy(() => import('./pages/SubscribeSuccessPage'))
const BibleHistoryPage = lazy(() => import('./pages/BibleHistoryPage'))
const BernieShowPage = lazy(() => import('./pages/BernieShowPage'))
const ArticlePage = lazy(() => import('./pages/ArticlePage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminSubscriptions = lazy(() => import('./pages/admin/AdminSubscriptions'))
const AdminMedia = lazy(() => import('./pages/admin/AdminMedia'))
const AdminContent = lazy(() => import('./pages/admin/AdminContent'))
const AdminSocialPacks = lazy(() => import('./pages/admin/AdminSocialPacks'))
const AdminSocialHub = lazy(() => import('./pages/admin/AdminSocialHub'))
const AdminDisputes = lazy(() => import('./pages/admin/AdminDisputes'))

type ShellLink = {
  to: string
  label: string
  match?: (pathname: string) => boolean
}

type ShellMenuItem = ShellLink & {
  description?: string
}

type ShellDropdown = {
  label: string
  items: ShellMenuItem[]
  match: (pathname: string) => boolean
}

function normalizePath(pathname: string) {
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function matchesPrefix(pathname: string, prefix: string) {
  const normalizedPath = normalizePath(pathname)
  const normalizedPrefix = normalizePath(prefix)

  return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`)
}

function isLinkActive(pathname: string, link: ShellLink) {
  return link.match ? link.match(pathname) : normalizePath(pathname) === normalizePath(link.to)
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/70 text-ink-muted transition-colors hover:border-ink/15 hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const location = useLocation()
  const { isLoggedIn, user, logout, openAuthModal } = useAuth()
  const { t } = useI18n()
  const ctaVariant = useExperiment('membership-cta-copy')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn())
  }, [location.pathname, isLoggedIn])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDesktopMenu(null)
  }, [location.pathname])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setOpenDesktopMenu(null)
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const trustLinks: ShellLink[] = [
    { to: '/methodology', label: t('nav.methodology') },
    { to: '/sources', label: t('nav.sources') },
  ]

  const instituteLink: ShellLink = {
    to: '/institute',
    label: 'Veritas Institute',
    match: pathname => matchesPrefix(pathname, '/institute'),
  }

  const desktopDropdowns: ShellDropdown[] = [
    {
      label: 'The Record',
      match: pathname =>
        normalizePath(pathname) === '/' ||
        normalizePath(pathname) === '/read' ||
        matchesPrefix(pathname, '/chapter') ||
        normalizePath(pathname) === '/timeline',
      items: [
        {
          to: '/read',
          label: 'Read the Book',
          match: pathname => normalizePath(pathname) === '/read' || matchesPrefix(pathname, '/chapter'),
          description: 'Foreword, overview, and the full chapter archive.',
        },
        {
          to: '/',
          label: 'Front Page',
          match: pathname => normalizePath(pathname) === '/',
          description: 'The publication front with the strongest current entry points.',
        },
        {
          to: '/timeline',
          label: t('nav.timeline'),
          match: pathname => normalizePath(pathname) === '/timeline',
          description: 'A chronological map of the record and its recurring actors.',
        },
      ],
    },
    {
      label: 'Dossiers',
      match: pathname => matchesPrefix(pathname, '/israel-dossier') || normalizePath(pathname) === '/deep-state',
      items: [
        {
          to: '/israel-dossier',
          label: 'Israel Dossier',
          match: pathname => matchesPrefix(pathname, '/israel-dossier'),
          description: 'War, lobbying, aid, and institutional influence in one dossier shell.',
        },
        {
          to: '/deep-state',
          label: 'Deep State / Epstein',
          match: pathname => normalizePath(pathname) === '/deep-state',
          description: 'The intelligence, blackmail, and institutional capture investigation.',
        },
      ],
    },
    {
      label: 'Reference',
      match: pathname =>
        matchesPrefix(pathname, '/profiles') ||
        matchesPrefix(pathname, '/profile') ||
        matchesPrefix(pathname, '/topics') ||
        normalizePath(pathname) === '/methodology' ||
        normalizePath(pathname) === '/sources',
      items: [
        {
          to: '/profiles',
          label: 'Profiles',
          match: pathname => matchesPrefix(pathname, '/profiles') || matchesPrefix(pathname, '/profile'),
          description: 'People, organizations, and relationship context tied back to the record.',
        },
        {
          to: '/topics',
          label: 'Topics',
          match: pathname => matchesPrefix(pathname, '/topics'),
          description: 'Search-intent explainers that bridge investigations, news, and study paths.',
        },
        {
          to: '/methodology',
          label: t('nav.methodology'),
          match: pathname => normalizePath(pathname) === '/methodology',
          description: 'How evidence is graded, sourced, and corrected.',
        },
        {
          to: '/sources',
          label: t('nav.sources'),
          match: pathname => normalizePath(pathname) === '/sources',
          description: 'The public bibliography and outbound trust layer.',
        },
      ],
    },
  ]

  const desktopPrimaryLinks: ShellLink[] = [
    { to: '/news', label: 'Current Events', match: pathname => matchesPrefix(pathname, '/news') },
    { to: '/forum', label: 'Forum Beta', match: pathname => matchesPrefix(pathname, '/forum') },
  ]

  const desktopUtilityLinks: ShellLink[] = [
    { to: '/search', label: t('nav.search'), match: pathname => normalizePath(pathname) === '/search' },
  ]

  const mobileQuickLinks: ShellLink[] = [
    { to: '/read', label: 'The Record', match: pathname => normalizePath(pathname) === '/read' || matchesPrefix(pathname, '/chapter') },
    { to: '/news', label: 'Current Events', match: pathname => matchesPrefix(pathname, '/news') },
    { to: '/israel-dossier', label: 'Dossiers', match: pathname => matchesPrefix(pathname, '/israel-dossier') || normalizePath(pathname) === '/deep-state' },
    { to: '/institute', label: 'Institute', match: pathname => matchesPrefix(pathname, '/institute') },
    { to: '/search', label: t('nav.search'), match: pathname => normalizePath(pathname) === '/search' },
  ]

  const drawerPublicationLinks: ShellLink[] = [
    { to: '/', label: 'Front Page', match: pathname => normalizePath(pathname) === '/' },
    { to: '/read', label: 'The Record', match: pathname => normalizePath(pathname) === '/read' || matchesPrefix(pathname, '/chapter') },
    { to: '/news', label: 'Current Events', match: pathname => matchesPrefix(pathname, '/news') },
    { to: '/forum', label: 'Forum Beta', match: pathname => matchesPrefix(pathname, '/forum') },
    { to: '/timeline', label: t('nav.timeline'), match: pathname => normalizePath(pathname) === '/timeline' },
    instituteLink,
  ]

  const drawerDossierLinks: ShellLink[] = [
    { to: '/israel-dossier', label: 'Israel Dossier', match: pathname => matchesPrefix(pathname, '/israel-dossier') },
    { to: '/deep-state', label: 'Deep State / Epstein', match: pathname => normalizePath(pathname) === '/deep-state' },
  ]

  const drawerReferenceLinks: ShellLink[] = [
    { to: '/profiles', label: 'Profiles', match: pathname => matchesPrefix(pathname, '/profiles') || matchesPrefix(pathname, '/profile') },
    { to: '/topics', label: 'Topics', match: pathname => matchesPrefix(pathname, '/topics') },
    { to: '/methodology', label: t('nav.methodology'), match: pathname => normalizePath(pathname) === '/methodology' },
    { to: '/sources', label: t('nav.sources'), match: pathname => normalizePath(pathname) === '/sources' },
    { to: '/search', label: t('nav.search'), match: pathname => normalizePath(pathname) === '/search' },
    { to: '/bible', label: 'The Bible', match: pathname => normalizePath(pathname) === '/bible' },
  ]

  const accountLinks: ShellLink[] = [
    { to: '/bookmarks', label: t('nav.bookmarks') },
    { to: '/analytics', label: t('nav.analytics') },
  ]

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const desktopUtilityLinkClass = (link: ShellLink) => {
    const active = isLinkActive(location.pathname, link)

    return `inline-flex min-h-[44px] items-center rounded-full px-3 font-sans text-[0.62rem] font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
      active
        ? 'text-crimson'
        : 'text-ink-faint hover:text-ink'
    }`
  }

  const desktopNavItemClass = (active: boolean, expanded = false) =>
    `inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
      active || expanded
        ? 'bg-ink text-surface shadow-sm'
        : 'text-ink-muted hover:bg-surface hover:text-ink'
    }`

  const desktopPrimaryLinkClass = (link: ShellLink) => desktopNavItemClass(isLinkActive(location.pathname, link))

  const desktopInstituteLinkClass = () => {
    const active = isLinkActive(location.pathname, instituteLink)

    return `inline-flex min-h-[44px] items-center rounded-full border px-4 font-sans text-[0.62rem] font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
      active
        ? 'border-crimson bg-crimson text-surface shadow-sm'
        : 'border-crimson/20 bg-surface text-crimson hover:border-crimson/40 hover:bg-crimson/5'
    }`
  }

  const desktopSubmenuItemClass = (link: ShellMenuItem) => {
    const active = isLinkActive(location.pathname, link)

    return `block rounded-[1.1rem] px-4 py-3 transition-colors ${
      active
        ? 'bg-surface text-ink shadow-sm'
        : 'text-ink-muted hover:bg-surface hover:text-ink'
    }`
  }

  const drawerLinkClass = (link: ShellLink) => {
    const active = isLinkActive(location.pathname, link)

    return `inline-flex min-h-[48px] items-center justify-between rounded-2xl border px-4 py-3 font-sans text-sm transition-colors ${
      active
        ? 'border-ink bg-ink text-surface'
        : 'border-border bg-surface text-ink-muted hover:border-ink/15 hover:text-ink'
    }`
  }

  const mobilePillClass = (link: ShellLink) => {
    const active = isLinkActive(location.pathname, link)

    return `inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.65rem] font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
      active
        ? 'bg-ink text-surface'
        : 'border border-border bg-surface text-ink-muted'
    }`
  }

  const handleDesktopMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenDesktopMenu(null)
    }
  }

  return (
    <header className="bg-parchment no-print" data-testid="site-header">
      <div className="border-b border-border/70">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[48px] items-center justify-between gap-4 py-1.5">
            <div className="hidden md:flex min-w-0 items-center gap-3 lg:gap-5">
              <span className="hidden xl:block font-sans text-[0.62rem] tracking-[0.08em] uppercase text-ink-faint">
                {todayDate}
              </span>
              <div className="flex items-center gap-1">
                {trustLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={desktopUtilityLinkClass(link)}
                    {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <Link
                to="/read"
                className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-surface px-4 font-sans text-[0.65rem] font-semibold tracking-[0.08em] uppercase text-ink"
              >
                Read
              </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden xl:block">
                <ReadingStreak />
              </div>
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              <ThemeToggle />

              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden lg:inline-flex min-h-[44px] items-center rounded-full border border-crimson/20 px-4 font-sans text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-crimson transition-colors hover:border-crimson/40 hover:bg-crimson/5"
                >
                  Admin
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={logout}
                  className="hidden sm:inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-ink-muted transition-colors hover:text-crimson"
                  title={`Sign out (${user?.displayName?.split(' ')[0]})`}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal({ mode: 'login' })}
                  className="hidden sm:inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-ink-muted transition-colors hover:text-ink"
                  aria-label="Sign in"
                >
                  Log In
                </button>
              )}

              <Link
                to="/membership"
                className="hidden sm:inline-flex min-h-[44px] items-center rounded-full bg-ink px-4 font-sans text-[0.62rem] font-bold tracking-[0.08em] uppercase text-surface transition-colors hover:bg-crimson"
                onClick={() => {
                  trackSupportClick('header')
                  trackConversion('membership-cta-copy', 'header_click')
                }}
                data-testid="header-join-cta"
              >
                {ctaVariant}
              </Link>

              <button
                type="button"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-ink transition-colors md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                data-testid="mobile-menu-toggle"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-ink/5">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-[1920px] px-4 py-5 text-center sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <p className="mb-3 font-sans text-[0.55rem] tracking-[0.18em] uppercase text-ink-faint/70">
            Est. 2025 · Volume I · Primary Source Journalism
          </p>

          <Link to="/" className="inline-flex flex-col items-center gap-3 group sm:flex-row sm:gap-5" aria-label="Veritas Worldwide — Home">
            <VeritasLogo variant="icon" size="md" className="flex-shrink-0 transition-transform group-hover:scale-[1.02]" />
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-display text-2xl font-bold leading-none tracking-tight text-ink transition-colors group-hover:text-crimson sm:text-4xl lg:text-[2.75rem]">
                Veritas Worldwide
              </span>
              <span className="mt-1 font-serif text-sm italic text-ink-muted">
                No party. No agenda. Just the record.
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="sticky top-0 z-50 border-b border-border bg-parchment/92 backdrop-blur-md shadow-sm">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <nav className="hidden min-h-[56px] items-center justify-between gap-6 md:flex" aria-label="Primary navigation">
            <div className="flex min-w-0 items-center gap-2 overflow-x-auto py-2">
              <Link
                to="/"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:text-crimson"
                aria-label="Home"
              >
                <VeritasLogo variant="icon" size="xs" />
              </Link>

              {desktopDropdowns.map(menu => {
                const active = menu.match(location.pathname)
                const expanded = openDesktopMenu === menu.label

                return (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => setOpenDesktopMenu(menu.label)}
                    onMouseLeave={() => setOpenDesktopMenu(current => (current === menu.label ? null : current))}
                    onFocus={() => setOpenDesktopMenu(menu.label)}
                    onBlur={handleDesktopMenuBlur}
                  >
                    <button
                      type="button"
                      className={`${desktopNavItemClass(active, expanded)} gap-2`}
                      aria-haspopup="true"
                      aria-expanded={expanded}
                      onClick={() => setOpenDesktopMenu(current => (current === menu.label ? null : menu.label))}
                    >
                      <span>{menu.label}</span>
                      <svg
                        className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M2.25 4.5L6 8.25L9.75 4.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {expanded && (
                      <div className="absolute left-0 top-full z-20 mt-3 w-[18rem] rounded-[1.4rem] border border-border/80 bg-parchment-dark/95 p-2 shadow-[0_20px_60px_-30px_rgba(26,26,26,0.35)] backdrop-blur">
                        {menu.items.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className={desktopSubmenuItemClass(link)}
                            onClick={() => setOpenDesktopMenu(null)}
                            {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                          >
                            <span className="block font-sans text-[0.68rem] font-semibold tracking-[0.08em] uppercase">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="mt-1 block font-body text-sm leading-snug text-ink-faint">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}

              {desktopPrimaryLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={desktopPrimaryLinkClass(link)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 py-2">
              {desktopUtilityLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={desktopUtilityLinkClass(link)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to={instituteLink.to}
                className={desktopInstituteLinkClass()}
                {...(isLinkActive(location.pathname, instituteLink) ? { 'aria-current': 'page' as const } : {})}
              >
                <span className="hidden lg:inline">Veritas Institute</span>
                <span className="lg:hidden">Institute</span>
              </Link>
            </div>
          </nav>

          <nav className="flex items-center gap-2 overflow-x-auto py-2 md:hidden" aria-label="Primary navigation">
            {mobileQuickLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={mobilePillClass(link)}
                {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-obsidian/30 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-nav"
        className={`fixed inset-y-0 right-0 z-[70] w-[20rem] max-w-[86vw] border-l border-border bg-parchment shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <VeritasLogo variant="icon" size="xs" />
            <span className="font-display text-lg font-bold text-ink">Veritas</span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:text-ink"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col overflow-y-auto px-6 py-6">
          <section>
            <p className="mb-3 font-sans text-[0.62rem] font-bold tracking-[0.12em] uppercase text-ink-faint">
              Publication
            </p>
            <div className="flex flex-col gap-2">
              {drawerPublicationLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={drawerLinkClass(link)}
                  onClick={() => setMenuOpen(false)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <p className="mb-3 font-sans text-[0.62rem] font-bold tracking-[0.12em] uppercase text-ink-faint">
              Investigations
            </p>
            <div className="flex flex-col gap-2">
              {drawerDossierLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={drawerLinkClass(link)}
                  onClick={() => setMenuOpen(false)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <p className="mb-3 font-sans text-[0.62rem] font-bold tracking-[0.12em] uppercase text-ink-faint">
              Reference
            </p>
            <div className="flex flex-col gap-2">
              {drawerReferenceLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={drawerLinkClass(link)}
                  onClick={() => setMenuOpen(false)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-7">
            <p className="mb-3 font-sans text-[0.62rem] font-bold tracking-[0.12em] uppercase text-ink-faint">
              Account
            </p>
            <div className="flex flex-col gap-2">
              {accountLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={drawerLinkClass(link)}
                  onClick={() => setMenuOpen(false)}
                  {...(isLinkActive(location.pathname, link) ? { 'aria-current': 'page' as const } : {})}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={drawerLinkClass({ to: '/admin', label: 'Admin', match: pathname => matchesPrefix(pathname, '/admin') })}
                  onClick={() => setMenuOpen(false)}
                  {...(matchesPrefix(location.pathname, '/admin') ? { 'aria-current': 'page' as const } : {})}
                >
                  <span>Admin</span>
                  <span aria-hidden="true">›</span>
                </Link>
              )}
            </div>
          </section>

          <div className="mt-auto border-t border-border/70 pt-6">
            <Link
              to="/membership"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-ink px-4 font-sans text-[0.68rem] font-bold tracking-[0.08em] uppercase text-surface transition-colors hover:bg-crimson"
              onClick={() => {
                trackSupportClick('mobile-menu')
                trackConversion('membership-cta-copy', 'mobile_menu_click')
                setMenuOpen(false)
              }}
            >
              {ctaVariant}
            </Link>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="sm:hidden">
                  <LanguageSelector />
                </div>
                <ThemeToggle />
              </div>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setMenuOpen(false)
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-ink-muted transition-colors hover:text-crimson"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    openAuthModal({ mode: 'login' })
                    setMenuOpen(false)
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-ink transition-colors hover:text-crimson"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  const { t } = useI18n()

  const browseLinks: ShellLink[] = [
    { to: '/', label: 'The Record' },
    { to: '/read', label: 'Read' },
    { to: '/news', label: 'Current Events' },
    { to: '/profiles', label: 'Profiles' },
    { to: '/israel-dossier', label: 'Dossiers' },
    { to: '/forum', label: 'Forum Beta' },
  ]

  const researchLinks: ShellLink[] = [
    { to: '/methodology', label: t('nav.methodology') },
    { to: '/sources', label: t('nav.sources') },
    { to: '/institute', label: 'Institute' },
    { to: '/topics', label: 'Topics' },
    { to: '/timeline', label: t('nav.timeline') },
    { to: '/content-pack', label: 'Content Packs' },
    { to: '/bible', label: 'The Bible' },
  ]

  const utilityLinks: ShellLink[] = [
    { to: '/search', label: t('nav.search') },
    { to: '/bookmarks', label: t('nav.bookmarks') },
    { to: '/analytics', label: t('nav.analytics') },
    { to: '/about', label: t('nav.about') },
    { to: '/accessibility', label: t('nav.accessibility') },
    { to: '/privacy', label: t('nav.privacy') },
    { to: '/terms', label: t('nav.terms') },
  ]

  return (
    <footer className="bg-obsidian text-white/70 no-print" data-testid="site-footer">
      <div className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-10">
          <div>
            <Link to="/" className="group inline-flex items-center gap-4">
              <VeritasLogo variant="icon" size="md" className="flex-shrink-0 opacity-85 transition-all group-hover:opacity-100 group-hover:scale-[1.02]" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold leading-tight text-white transition-colors group-hover:text-crimson-light">
                  Veritas Worldwide
                </span>
                <span className="mt-0.5 font-serif text-sm italic text-white/45">
                  The documentary record stays public because readers fund the work.
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/membership"
                className="inline-flex min-h-[44px] items-center rounded-full bg-white px-5 font-sans text-[0.68rem] font-bold tracking-[0.08em] uppercase text-obsidian transition-colors hover:bg-white/85"
              >
                {t('nav.membership')}
              </Link>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 font-sans text-[0.68rem] font-bold tracking-[0.08em] uppercase text-white transition-colors hover:border-white/35"
                onClick={() => trackSupportClick('footer')}
              >
                {t('action.support')}
              </a>
            </div>
            <p className="max-w-md font-body text-sm leading-relaxed text-white/45 lg:text-right">
              Methodology, sources, and the archive remain public because support is framed as civic funding, not a subscription trap.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1920px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:px-8">
        <div>
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/60">
            Stay Connected
          </p>
          <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/45">
            Follow the record, track new investigations, and keep a direct line to the trust layer without wading through unnecessary navigation.
          </p>
          <div className="mt-6 max-w-md">
            <NewsletterSignup variant="footer" source="newsletter_footer" />
          </div>
        </div>

        <nav aria-label="Browse">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/60">
            Browse
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {browseLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-sans text-sm text-white/45 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Research">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/60">
            Research
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {researchLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-sans text-sm text-white/45 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Utility">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-white/60">
            Utility
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {utilityLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-sans text-sm text-white/45 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
            <a href="mailto:rights@veritasworldwide.com" className="font-sans text-sm text-white/45 transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-1">
            <a href="https://x.com/VeritasWorldwide" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/30 transition-colors hover:text-white" aria-label="Follow on X">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://github.com/bcrollins/veritas-worldwide" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/30 transition-colors hover:text-white" aria-label="Source code on GitHub">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.reddit.com/r/VeritasWorldwide" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/30 transition-colors hover:text-white" aria-label="Join on Reddit">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z"/></svg>
            </a>
            <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/30 transition-colors hover:text-white" aria-label="RSS Feed">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
            </a>
          </div>

          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4 lg:justify-end">
            <VeritasLogo variant="icon" size="xs" className="opacity-15" />
            <p className="font-sans text-[0.65rem] tracking-[0.05em] text-white/30">
              © 2026 Veritas Worldwide · veritasworldwide.com · Free & Open Access
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function PageViewTracker() {
  usePageView()
  useScrollDepth()
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    handleStripeReturn()
  }, [])

  return null
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const isInstitute = location.pathname.startsWith('/institute')

  return (
    <I18nProvider>
      <div className={isInstitute ? 'min-h-screen institute-shell-root' : 'min-h-screen bg-parchment text-ink'}>
        {!isAdmin && !isInstitute && (
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[200] focus:rounded-sm focus:bg-crimson focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
        )}
        <ScrollToTop />
        <PageViewTracker />
        {!isAdmin && !isInstitute && <Header />}
        {!isAdmin && !isInstitute && (
          <div className="hidden print:block print:mb-6 print:border-b print:border-black/20 print:pb-4 print:text-center">
            <VeritasLogo variant="icon" size="sm" className="mx-auto mb-2 print:block" />
            <p className="font-display text-lg font-bold tracking-tight text-black">Veritas Worldwide</p>
            <p className="font-serif text-[0.6rem] italic text-gray-500">The Documentary Record · veritasworldwide.com</p>
          </div>
        )}
        <main id="main-content">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="mx-auto max-w-3xl px-6 py-24 text-center" role="status" aria-label="Loading page">
                  <div className="mb-4 animate-pulse">
                    <VeritasLogo variant="icon" size="md" className="mx-auto opacity-40" />
                  </div>
                  <p className="font-sans text-[0.5rem] font-medium tracking-[0.25em] uppercase text-ink-faint">
                    Loading
                  </p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chapter/:id" element={<ChapterPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/topics" element={<TopicsIndexPage />} />
                <Route path="/topics/:slug" element={<TopicPage />} />
                <Route path="/subscribe/success" element={<SubscribeSuccessPage />} />
                <Route path="/methodology" element={<MethodologyPage />} />
                <Route path="/sources" element={<SourcesPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/israel-dossier" element={<IsraelDossierPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/deep-state" element={<DeepStatePage />} />
                <Route path="/read" element={<ReadTheBookPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/content-pack" element={<ContentPackPage />} />
                <Route path="/content-packs" element={<Navigate replace to="/content-pack" />} />
                <Route path="/share" element={<ContentPackPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/profiles" element={<ProfilesIndexPage />} />
                <Route path="/profile/:slug" element={<ProfilePage />} />
                <Route path="/news/:slug" element={<ArticlePage />} />
                <Route path="/institute" element={<InstituteLayout />}>
                  <Route index element={<InstitutePage />} />
                  <Route path="courses/:slug" element={<InstituteCoursePage />} />
                  <Route path="guides/:slug" element={<InstituteGuidePage />} />
                  <Route path="book" element={<InstituteBookPage />} />
                  <Route path="methodology" element={<InstituteMethodologyPage />} />
                </Route>
                <Route path="/bible" element={<BibleHistoryPage />} />
                <Route path="/bernie" element={<BernieShowPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="subscriptions" element={<AdminSubscriptions />} />
                  <Route path="media" element={<AdminMedia />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="social" element={<AdminSocialPacks />} />
                  <Route path="social-hub" element={<AdminSocialHub />} />
                  <Route path="disputes" element={<AdminDisputes />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
                      <p className="mb-6 font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson">
                        Document Not Found
                      </p>
                      <h1 className="mb-4 font-display text-6xl font-bold text-ink md:text-8xl">404</h1>
                      <div className="mb-6 flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-crimson" />
                        <p className="font-body text-lg italic text-ink-muted">
                          This page is not part of the record.
                        </p>
                        <div className="h-[1px] w-12 bg-crimson" />
                      </div>
                      <p className="mx-auto mb-10 max-w-md font-body text-sm text-ink-faint">
                        The page you requested does not exist, may have been moved, or is not yet published.
                      </p>
                      <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/" className="rounded-sm bg-crimson px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-crimson-dark">
                          Return to The Record
                        </Link>
                        <Link to="/search" className="rounded-sm border border-border px-6 py-3 font-sans text-sm font-semibold text-ink transition-colors hover:border-crimson hover:text-crimson">
                          Search All Chapters
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        {!isAdmin && !isInstitute && <Footer />}
        <Suspense fallback={null}>
          <AuthModal />
        </Suspense>
        <Toast />
        <Suspense fallback={null}>
          {!isInstitute && (
            <>
              <NewsletterPopup />
              <ExitIntentCapture />
              <StickyMembershipBar />
            </>
          )}
          <PerformanceMonitor />
          <CookieConsent />
        </Suspense>
      </div>
    </I18nProvider>
  )
}
