import { useEffect, useRef } from 'react'

// Check if user has an active subscription (localStorage-based for MVP)
function isSubscriber(): boolean {
  try {
    const sub = localStorage.getItem('veritas_subscription')
    if (!sub) return false
    const parsed = JSON.parse(sub)
    return parsed?.active === true
  } catch {
    return false
  }
}

interface AdBannerProps {
  slot: string       // Google AdSense ad slot ID
  format?: 'auto' | 'horizontal' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

// AdSense publisher ID — set to your real ID to enable ads
const AD_CLIENT = '' // e.g. 'ca-pub-1234567890'

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    // Don't show ads to subscribers or if AdSense not configured
    if (isSubscriber() || !AD_CLIENT) return
    // Don't push the same ad twice
    if (pushed.current) return

    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
        pushed.current = true
      }
    } catch {
      // AdSense not loaded yet or blocked — fail silently
    }
  }, [])

  // Hide for subscribers or when AdSense is not configured
  if (isSubscriber() || !AD_CLIENT) return null

  return (
    <div className={`ad-container my-8 ${className}`}>
      <p className="font-sans text-[0.5rem] text-ink-faint/40 text-center uppercase tracking-widest mb-1">Advertisement</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Export the subscriber check so other components can use it
export { isSubscriber }
