import { useEffect } from 'react'

/**
 * Invisible component that measures Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
 * using PerformanceObserver and pushes metrics to GA4 dataLayer.
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    const dl = (window as unknown as Record<string, unknown>).dataLayer as Array<Record<string, unknown>> | undefined
    const fire = (name: string, value: number) => {
      const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000], FID: [100, 300], CLS: [0.1, 0.25], FCP: [1800, 3000], TTFB: [800, 1800],
      }
      const [good, poor] = thresholds[name] || [Infinity, Infinity]
      const rating = value <= good ? 'good' : value <= poor ? 'needs-improvement' : 'poor'
      dl?.push({ event: 'web_vitals', metric_name: name, metric_value: Math.round(value * 100) / 100, metric_rating: rating, page_path: window.location.pathname })
    }

    try { new PerformanceObserver(list => { const e = list.getEntries(); if (e.length) fire('LCP', (e[e.length - 1] as PerformanceEntry & { startTime: number }).startTime) }).observe({ type: 'largest-contentful-paint', buffered: true }) } catch {}
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) { const pe = e as PerformanceEntry & { processingStart?: number }; if (pe.processingStart) fire('FID', pe.processingStart - pe.startTime) } }).observe({ type: 'first-input', buffered: true }) } catch {}
    try {
      let cls = 0
      new PerformanceObserver(list => { for (const e of list.getEntries()) { const le = e as PerformanceEntry & { hadRecentInput?: boolean; value?: number }; if (!le.hadRecentInput) cls += le.value || 0 } }).observe({ type: 'layout-shift', buffered: true })
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') fire('CLS', cls) }, { once: true })
    } catch {}
    try { new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.name === 'first-contentful-paint') fire('FCP', e.startTime) }).observe({ type: 'paint', buffered: true }) } catch {}
    try { const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming; if (nav) fire('TTFB', nav.responseStart - nav.requestStart) } catch {}
  }, [])

  return null
}
