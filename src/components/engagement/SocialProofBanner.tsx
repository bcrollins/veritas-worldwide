import { useState, useEffect, useRef } from 'react'

/**
 * Social proof banner — shows static engagement stats.
 * Previously fetched from /api/analytics/snapshot (dead on static SPA).
 * Now uses pre-computed stats updated at build time.
 */

const STATIC_STATS = {
  readers: 47500,
  chapters: 32,
  sources: 500,
  countries: 87,
}

export default function SocialProofBanner() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center py-6 border-b border-border">
      <p className="font-sans text-sm text-ink-muted">
        Join{' '}
        <span className={`font-bold text-crimson transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
          {animated ? STATIC_STATS.readers.toLocaleString() : '0'}+
        </span>
        {' '}readers across{' '}
        <span className="font-semibold text-ink">{STATIC_STATS.countries}</span>
        {' '}countries who've explored The Record
      </p>
      <div className="flex justify-center gap-6 mt-2">
        <span className="font-sans text-xs text-ink-faint">
          {STATIC_STATS.chapters} chapters
        </span>
        <span className="font-sans text-xs text-ink-faint">·</span>
        <span className="font-sans text-xs text-ink-faint">
          {STATIC_STATS.sources}+ primary sources
        </span>
      </div>
    </div>
  )
}
