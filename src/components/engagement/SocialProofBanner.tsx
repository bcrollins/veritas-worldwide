import { useState, useEffect, useRef } from 'react'

export default function SocialProofBanner() {
  const [count, setCount] = useState(0)
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch live count from analytics backend
    fetch('/api/analytics/snapshot')
      .then(r => r.json())
      .then(data => setCount(data.lifetime || 0))
      .catch(() => setCount(0))
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setAnimated(true) }, { threshold: 0.5 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  if (count < 10) return null

  return (
    <div ref={ref} className="text-center py-4">
      <p className="font-sans text-sm text-ink-muted">
        Join{' '}
        <span className="font-bold text-crimson transition-all duration-1000">
          {animated ? count.toLocaleString() : '0'}+
        </span>
        {' '}readers who've explored The Record
      </p>
    </div>
  )
}
