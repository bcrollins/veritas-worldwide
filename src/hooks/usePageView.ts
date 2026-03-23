import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { recordPageView } from '../lib/analytics'

// Typed gtag helper for GA4 — avoids polluting global types
function sendGA4PageView(path: string, title: string) {
  const w = window as unknown as Record<string, unknown>
  if (typeof w.gtag === 'function') {
    ;(w.gtag as (...args: unknown[]) => void)('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.origin + path,
    })
  }
}

/**
 * Tracks a page view on every route change:
 * 1. Fires GA4 gtag('event', 'page_view') for Google Analytics SPA tracking
 * 2. Sends to custom /api/analytics/pageview for server-side analytics
 */
export function usePageView(title?: string) {
  const location = useLocation()

  useEffect(() => {
    const pageTitle = title || document.title || location.pathname
    // GA4 SPA page view — critical for tracking route changes in React SPA
    sendGA4PageView(location.pathname, pageTitle)
    // Custom server-side analytics
    recordPageView(location.pathname, pageTitle)
  }, [location.pathname, title])
}
