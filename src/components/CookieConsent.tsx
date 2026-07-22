import { useState, useEffect } from 'react'

const CONSENT_KEY = 'veritas_cookie_consent'

type ConsentState = 'pending' | 'granted' | 'denied'

function getStoredConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === 'granted' || v === 'denied') return v
  } catch {}
  return 'pending'
}

function updateGtagConsent(granted: boolean): void {
  const w = window as unknown as Record<string, unknown>
  if (typeof w.gtag === 'function') {
    const gtag = w.gtag as (...args: unknown[]) => void
    gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
    })
  }
  // Also update HubSpot tracking consent
  const hsq = (w._hsq as unknown[]) || []
  if (Array.isArray(hsq)) {
    hsq.push(['doNotTrack', { track: granted }])
  }
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => getStoredConsent())

  // On mount, apply stored consent
  useEffect(() => {
    if (consent !== 'pending') {
      updateGtagConsent(consent === 'granted')
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'granted')
    setConsent('granted')
    updateGtagConsent(true)
    // Notify same-tab listeners (sticky membership bar) without a storage event.
    window.dispatchEvent(new Event('veritas-cookie-consent'))
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'denied')
    setConsent('denied')
    updateGtagConsent(false)
    window.dispatchEvent(new Event('veritas-cookie-consent'))
  }

  if (consent !== 'pending') return null

  return (
    <div
      /*
       * Mobile: dock under the site header (top) so first-screen hero CTAs
       * and bottom sticky membership are not buried. Desktop: classic bottom bar.
       */
      className="fixed top-14 left-0 right-0 z-[100] sm:top-auto sm:bottom-0 bg-obsidian/95 backdrop-blur-md text-white px-3 py-2 sm:px-6 sm:py-4 no-print sm:safe-area-pb border-b border-white/10 sm:border-b-0 sm:border-t sm:border-white/10 shadow-lg sm:shadow-none"
      role="dialog"
      aria-label="Cookie consent"
      data-testid="cookie-consent-banner"
      data-placement="mobile-top-desktop-bottom"
    >
      <div className="max-w-5xl mx-auto flex flex-row items-center gap-2 sm:gap-4">
        <p className="font-sans text-[11px] sm:text-sm text-white/80 leading-snug sm:leading-relaxed flex-1 min-w-0">
          <span className="sm:hidden">
            Analytics only. No ads sold.{' '}
            <a
              href="/privacy"
              className="inline-flex min-h-[44px] items-center text-crimson-light hover:text-white underline transition-colors"
            >
              Privacy
            </a>
          </span>
          <span className="hidden sm:inline">
            We use cookies for analytics (Google Analytics) and reader tools (HubSpot) to improve your experience.
            No advertising trackers. No data sold.{' '}
            <a
              href="/privacy"
              className="inline-flex min-h-[44px] items-center text-crimson-light hover:text-white underline transition-colors"
            >
              Privacy Policy
            </a>
          </span>
        </p>
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.08em] sm:tracking-[0.1em] uppercase px-2.5 py-2 sm:px-4 sm:py-2.5 min-h-[44px] border border-white/20 text-white/70 rounded-sm hover:border-white/40 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.08em] sm:tracking-[0.1em] uppercase px-3 py-2 sm:px-5 sm:py-2.5 min-h-[44px] bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
