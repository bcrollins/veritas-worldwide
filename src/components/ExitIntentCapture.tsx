import { useState, useEffect, useCallback } from 'react'
import { identifyContact, isSubscribed } from '../lib/hubspot'

/**
 * Exit-intent modal — triggers when the user moves their cursor toward
 * the top of the viewport (desktop) or after 45 seconds of inactivity (mobile).
 * Only shows once per session, never to existing subscribers.
 */
export default function ExitIntentCapture() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already subscribed or dismissed this session
    if (isSubscribed() || dismissed) return
    if (sessionStorage.getItem('veritas_exit_shown')) return

    let timeout: ReturnType<typeof setTimeout>

    // Desktop: detect mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !show) {
        setShow(true)
        sessionStorage.setItem('veritas_exit_shown', '1')
      }
    }

    // Mobile fallback: show after 45 seconds
    timeout = setTimeout(() => {
      if (!isSubscribed() && !sessionStorage.getItem('veritas_exit_shown')) {
        setShow(true)
        sessionStorage.setItem('veritas_exit_shown', '1')
      }
    }, 45000)

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeout)
    }
  }, [show, dismissed])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    identifyContact({
      email,
      source: 'exit_intent',
      contentInterest: 'general',
      referrer: window.location.pathname,
    })

    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setShow(false), 2000)
    }, 500)
  }, [email])

  const handleDismiss = useCallback(() => {
    setShow(false)
    setDismissed(true)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={handleDismiss} />

      {/* Modal */}
      <div className="relative bg-white rounded-sm shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-ink-faint hover:text-ink transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header bar */}
        <div className="bg-ink px-6 py-4">
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-crimson">
            Before you go
          </p>
          <h2 className="font-display text-xl font-bold text-white mt-1">
            Don&apos;t miss the next investigation.
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {status === 'success' ? (
            <div className="text-center py-4">
              <svg className="w-10 h-10 mx-auto mb-3 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-display text-lg font-bold text-ink">Welcome to the record.</p>
            </div>
          ) : (
            <>
              <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                Veritas Worldwide Press publishes investigations sourced entirely from primary
                documents — court filings, government records, and the public record. No
                anonymous sources. No opinion. No spin.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoFocus
                  className="w-full px-3 py-2.5 font-sans text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-crimson/40"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-2.5 bg-crimson text-white font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Joining...' : 'Get Free Investigations'}
                </button>
              </form>
              <p className="font-sans text-[0.5rem] text-ink-faint mt-3 text-center">
                Free forever. Unsubscribe in one click. We never sell your data.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
