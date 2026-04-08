import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { recordPageView } from '../lib/analytics'
import { trackPageView } from '../lib/ga4'
import { trackPageView as trackHubSpotPageView } from '../lib/hubspot'

const TITLE_RETRY_DELAY_MS = 40
const TITLE_RETRY_LIMIT = 8
const GENERIC_TITLE = 'The Record | Veritas Worldwide'

function shouldRetryTitle(pathname: string, explicitTitle: string | undefined, currentTitle: string) {
  if (explicitTitle) return false
  if (pathname === '/') return false

  return !currentTitle || currentTitle === GENERIC_TITLE
}

/**
 * Tracks a page view on every route change:
 * 1. Fires GA4 gtag('event', 'page_view') for Google Analytics SPA tracking
 * 2. Sends to custom /api/analytics/pageview for server-side analytics
 * 3. Emits the matching HubSpot SPA page view once the route title settles
 */
export function usePageView(title?: string) {
  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    let frameOne = 0
    let frameTwo = 0
    let retryTimer: ReturnType<typeof window.setTimeout> | null = null

    const dispatchPageView = (pageTitle: string) => {
      if (cancelled) return

      trackPageView(location.pathname, pageTitle)
      recordPageView(location.pathname, pageTitle)
      trackHubSpotPageView(location.pathname)
    }

    const resolveTitleAndTrack = (attempt = 0) => {
      if (cancelled) return

      const resolvedTitle = (title || document.title || location.pathname).trim()
      if (shouldRetryTitle(location.pathname, title, resolvedTitle) && attempt < TITLE_RETRY_LIMIT) {
        retryTimer = window.setTimeout(() => resolveTitleAndTrack(attempt + 1), TITLE_RETRY_DELAY_MS)
        return
      }

      dispatchPageView(resolvedTitle || location.pathname)
    }

    // Wait until the next paint so route-level SEO effects can update document.title.
    frameOne = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(() => {
        resolveTitleAndTrack()
      })
    })

    return () => {
      cancelled = true
      if (frameOne) window.cancelAnimationFrame(frameOne)
      if (frameTwo) window.cancelAnimationFrame(frameTwo)
      if (retryTimer !== null) window.clearTimeout(retryTimer)
    }
  }, [location.pathname, title])
}
