import { useState, useEffect, useCallback } from 'react'
import { identifyContact, isSubscribed } from '../lib/hubspot'
import { scoreContentGateHit, scoreEmailSignup } from '../lib/leadScoring'

interface Props {
  /** Scroll depth percentage (0-100) at which to trigger */
  triggerDepth?: number
  /** Content topic for segmentation */
  contentInterest?: string
}

/**
 * Scroll-depth-triggered email capture — shows a non-blocking
 * slide-up CTA after the user reads past a configurable depth.
 * Dismissible, never shown to existing subscribers.
 */
export default function ContentGate({ triggerDepth = 40, contentInterest }: Props) {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (isSubscribed() || dismissed) return
    if (sessionStorage.getItem('veritas_gate_shown')) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (scrollPercent >= triggerDepth && !show) {
        try {
          scoreContentGateHit(window.location.pathname)
        } catch {}
        setShow(true)
        sessionStorage.setItem('veritas_gate_shown', '1')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [triggerDepth, show, dismissed])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    identifyContact({
      email,
      source: 'content_gate',
      contentInterest: contentInterest || 'general',
      referrer: window.location.pathname,
    })
    scoreEmailSignup('content_gate')

    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setShow(false), 2500)
    }, 500)
  }, [email, contentInterest])

  const handleDismiss = useCallback(() => {
    setShow(false)
    setDismissed(true)
  }, [])

  if (!show || isSubscribed()) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="max-w-2xl mx-auto px-4 pb-4">
        <div className="bg-parchment border border-border rounded-sm shadow-xl overflow-hidden">
          {/* Close */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center text-ink-faint hover:text-ink transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-4 p-4">
            {/* Icon */}
            <div className="hidden sm:flex w-12 h-12 bg-crimson/10 rounded-sm items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {status === 'success' ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="font-display text-base font-bold text-ink">Welcome to the record.</p>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-bold text-ink">
                  Following this story?
                </p>
                <p className="font-body text-xs text-ink-muted mt-0.5 hidden sm:block">
                  Get primary source investigations delivered free.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 min-w-0 px-2.5 py-1.5 font-sans text-xs border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-crimson/40"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-4 py-1.5 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {status === 'submitting' ? '...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
      `}</style>
    </div>
  )
}
