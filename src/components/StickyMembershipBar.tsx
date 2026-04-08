import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { trackSupportClick } from '../lib/ga4'

/**
 * Sticky bottom bar promoting membership — appears after user scrolls
 * past 400px on content pages. Hidden on membership page itself,
 * admin pages, and for existing subscribers.
 */
export default function StickyMembershipBar() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const location = useLocation()

  const isExcluded =
    location.pathname === '/membership' ||
    location.pathname.startsWith('/admin')

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

  if (!show || isExcluded || dismissed) return null

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
              className="px-4 py-1.5 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
              onClick={() => trackSupportClick('sticky-bar')}
            >
              Join
            </Link>
            <button
              onClick={() => {
                setDismissed(true)
                sessionStorage.setItem('veritas_sticky_dismissed', '1')
              }}
              className="p-1.5 text-white/40 hover:text-white/80 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
