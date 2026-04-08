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
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'denied')
    setConsent('denied')
    updateGtagConsent(false)
  }

  if (consent !== 'pending') return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] bg-obsidian/95 backdrop-blur-md text-white px-6 py-4 no-print"
      role="dialog"
      aria-label="Cookie consent"
      data-testid="cookie-consent-banner"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="font-sans text-sm text-white/80 leading-relaxed flex-1">
          We use cookies for analytics (Google Analytics) and reader tools (HubSpot) to improve your experience.
          No advertising trackers. No data sold.{' '}
          <a href="/privacy" className="text-crimson-light hover:text-white underline transition-colors">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="font-sans text-xs font-semibold tracking-[0.1em] uppercase px-4 py-2.5 min-h-[44px] border border-white/20 text-white/70 rounded-sm hover:border-white/40 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="font-sans text-xs font-semibold tracking-[0.1em] uppercase px-5 py-2.5 min-h-[44px] bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
