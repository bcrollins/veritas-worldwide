import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { trackSupportClick } from '../lib/ga4'

/**
 * Sticky bottom bar promoting membership — appears after user scrolls
 * past 400px on content pages. Hidden on membership page itself,
 * admin pages, success landings, and for existing subscribers.
 *
 * Also stays hidden while the cookie-consent banner is pending so mobile
 * first-screens are not double-stacked with two full-width bottom bars.
 */
export default function StickyMembershipBar() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [cookiePending, setCookiePending] = useState(true)
  const location = useLocation()

  const isExcluded =
    location.pathname === '/membership' ||
    location.pathname.startsWith('/membership/') ||
    location.pathname.startsWith('/donation/') ||
    location.pathname === '/thank-you' ||
    location.pathname.startsWith('/admin')

  useEffect(() => {
    // Mirror CookieConsent storage key — hide while banner is still pending.
    try {
      const v = localStorage.getItem('veritas_cookie_consent')
      setCookiePending(v !== 'granted' && v !== 'denied')
    } catch {
      setCookiePending(true)
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'veritas_cookie_consent') {
        setCookiePending(e.newValue !== 'granted' && e.newValue !== 'denied')
      }
    }
    window.addEventListener('storage', onStorage)

    // Same-tab consent changes write localStorage but do not fire storage events.
    const onConsent = () => {
      try {
        const v = localStorage.getItem('veritas_cookie_consent')
        setCookiePending(v !== 'granted' && v !== 'denied')
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('veritas-cookie-consent', onConsent)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('veritas-cookie-consent', onConsent)
    }
  }, [])

  useEffect(() => {
    if (isExcluded || dismissed) return
    // Don't show if user already dismissed this session
    if (sessionStorage.getItem('veritas_sticky_dismissed')) {
      setDismissed(true)
      return
    }

    const handleScroll = () => {
      setShow(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExcluded, dismissed])

  if (!show || isExcluded || dismissed || cookiePending) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 no-print animate-slide-up">
      <div className="bg-obsidian/95 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <p className="font-body text-xs text-white/70 hidden sm:block">
            <span className="text-white font-semibold">Fund the investigation.</span>{' '}
            Memberships start at $0.16/day.
          </p>
          <p className="font-body text-xs text-white/70 sm:hidden">
            Support independent journalism
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/membership"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-4 py-2 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
              onClick={() => trackSupportClick('sticky-bar')}
            >
              Join
            </Link>
            <button
              type="button"
              onClick={() => {
                setDismissed(true)
                sessionStorage.setItem('veritas_sticky_dismissed', '1')
              }}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-white/40 hover:text-white/80 transition-colors"
              aria-label="Dismiss membership bar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  )
}
