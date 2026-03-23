import { useState, useRef, type FormEvent } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error')
      return
    }

    try {
      // Store locally until backend integration
      const existing = JSON.parse(localStorage.getItem('veritas_newsletter') || '[]')
      if (!existing.includes(trimmed)) {
        existing.push(trimmed)
        localStorage.setItem('veritas_newsletter', JSON.stringify(existing))
      }
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-3">
          Stay Informed
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3">
          Volume II Is In Progress
        </h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
          New chapters, corrections, and supplemental source documents are published periodically. Enter your email to be notified when new material is available.
        </p>

        {status === 'success' ? (
          <div className="bg-verified-bg border border-verified-border rounded-sm p-4">
            <p className="font-sans text-sm font-semibold text-verified">
              You're on the list. We'll notify you when new material is published.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle') }}
              placeholder="your@email.com"
              className="flex-1 font-sans text-sm px-4 py-3 border-2 border-border rounded-sm bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
              aria-label="Email address for newsletter"
              required
            />
            <button
              type="submit"
              className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="font-sans text-xs text-disputed mt-3">
            Please enter a valid email address.
          </p>
        )}

        <p className="font-sans text-[0.55rem] text-ink-faint mt-4">
          No spam. No third parties. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
