import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Fires GA4 dataLayer events at 25/50/75/100% scroll depth milestones.
 * Each milestone fires once per page load. Resets on route change.
 */
export function useScrollDepth() {
  const fired = useRef<Set<number>>(new Set())
  const location = useLocation()

  useEffect(() => { fired.current.clear() }, [location.pathname])

  useEffect(() => {
    const milestones = [25, 50, 75, 100]
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      const depth = Math.round((window.scrollY / docH) * 100)
      for (const m of milestones) {
        if (depth >= m && !fired.current.has(m)) {
          fired.current.add(m)
          const dl = (window as unknown as Record<string, unknown>).dataLayer as Array<Record<string, unknown>> | undefined
          dl?.push({ event: 'scroll_depth', scroll_depth_threshold: m, page_path: location.pathname })
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])
}
