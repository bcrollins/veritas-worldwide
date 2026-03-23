import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { recordPageView } from '../lib/analytics'

/**
 * Tracks a page view on mount. Call once per page component,
 * or once in App.tsx to track all route changes globally.
 */
export function usePageView(title?: string) {
  const location = useLocation()

  useEffect(() => {
    const pageTitle = title || document.title || location.pathname
    recordPageView(location.pathname, pageTitle)
  }, [location.pathname, title])
}
