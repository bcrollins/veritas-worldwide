import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { recordPageView } from '../lib/analytics'
import { trackPageView } from '../lib/ga4'

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
    trackPageView(location.pathname, pageTitle)
    // Custom server-side analytics
    recordPageView(location.pathname, pageTitle)
  }, [location.pathname, title])
}
