import { useState, useEffect, type FormEvent } from 'react'

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const suppressed = sessionStorage.getItem('veritas_popup_suppressed')
    const alreadySubscribed = localStorage.getItem('veritas_newsletter_subscribed')
    if (suppressed || alreadySubscribed) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        sessionStorage.setItem('veritas_popup_suppressed', 'true')
        document.removeEventListener('mouseout', handleMouseLeave)
      }
    }
    // Mobile: show after 90s of engagement
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setIsOpen(true)
        sessionStorage.setItem('veritas_popup_suppressed', 'true')
      }
    }, 90000)

    document.addEventListener('mouseout', handleMouseLeave)
    return () => { document.removeEventListener('mouseout', handleMouseLeave); clearTimeout(timer) }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    const existing = JSON.parse(localStorage.getItem('veritas_newsletter') || '[]')
    if (!existing.includes(trimmed)) { existing.push(trimmed); localStorage.setItem('veritas_newsletter', JSON.stringify(existing)) }
    localStorage.setItem('veritas_newsletter_subscribed', 'true')
    setSubmitted(true)
    setTimeout(() => setIsOpen(false), 2500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Newsletter signup">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => { setIsOpen(false); sessionStorage.setItem('veritas_popup_suppressed', 'true') }} />
      <div className="relative bg-surface rounded-sm p-8 max-w-md w-full shadow-2xl animate-fadeIn">
        <button onClick={() => { setIsOpen(false); sessionStorage.setItem('veritas_popup_suppressed', 'true') }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-parchment-dark transition-colors"
          aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <svg className="w-12 h-12 mx-auto mb-3 text-verified" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            <p className="font-display text-lg font-bold text-ink">You're on the list.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-parchment-dark">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              </div>
              <h2 className="font-display text-xl font-bold text-ink mb-2">Don't Miss a Chapter</h2>
              <p className="font-body text-sm text-ink-muted">Get notified when new source documents and chapters are added to The Record. No spam — just primary sources.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-sm border border-border font-sans text-sm min-h-[44px] bg-parchment focus:outline-none focus:border-crimson"
                aria-label="Email address" />
              <button type="submit"
                className="w-full px-4 py-3 rounded-sm font-sans text-sm font-semibold min-h-[44px] bg-crimson text-white hover:bg-crimson-dark transition-colors">
                Get the Full Documentary Record
              </button>
            </form>
            <p className="text-center font-sans text-[0.6rem] text-ink-faint mt-3">Free forever. Unsubscribe anytime.</p>
          </>
        )}
      </div>
    </div>
  )
}
