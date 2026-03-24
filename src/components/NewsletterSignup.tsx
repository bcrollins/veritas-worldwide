import { useState, useCallback } from 'react'
import { identifyContact, isSubscribed, type SubscriptionSource } from '../lib/hubspot'
import { scoreEmailSignup } from '../lib/leadScoring'

interface Props {
  /** Visual variant */
  variant?: 'inline' | 'footer' | 'dark' | 'minimal'
  /** Where this signup form is placed (tracked in HubSpot) */
  source?: SubscriptionSource
  /** Optional content topic hint */
  contentInterest?: string
  /** Custom heading */
  heading?: string
  /** Custom subtext */
  subtext?: string
}

export default function NewsletterSignup({
  variant = 'inline',
  source = 'newsletter_inline',
  contentInterest,
  heading,
  subtext,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Don't render if already subscribed (unless footer — always show footer)
  const alreadySubscribed = isSubscribed()
  if (alreadySubscribed && variant !== 'footer') {
    return null
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'submitting') return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      identifyContact({
        email,
        source,
        contentInterest: contentInterest || 'general',
        referrer: window.location.pathname,
      })
      scoreEmailSignup(source)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [email, status, source, contentInterest])

  if (status === 'success') {
    return (
      <div className={`${variant === 'dark' ? 'bg-ink text-white' : 'bg-crimson/5 border border-crimson/20'} rounded-sm p-6 text-center`}>
        <svg className="w-8 h-8 mx-auto mb-3 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className={`font-display text-lg font-bold ${variant === 'dark' ? 'text-white' : 'text-ink'}`}>
          Welcome to the record.
        </p>
        <p className={`font-body text-sm mt-1 ${variant === 'dark' ? 'text-white/60' : 'text-ink-muted'}`}>
          You will receive our next investigation directly.
        </p>
      </div>
    )
  }

  const defaultHeading = variant === 'footer'
    ? 'The truth belongs to everyone.'
    : 'Get the investigations that matter.'
  const defaultSubtext = variant === 'footer'
    ? 'Primary source journalism delivered to your inbox. No spin, no anonymous sources.'
    : 'Join readers who want primary source journalism — not opinion, not spin. Every claim sourced to the public record.'

  const isDark = variant === 'dark' || variant === 'footer'

  return (
    <div className={`rounded-sm p-6 ${
      isDark ? 'bg-ink text-white' :
      variant === 'minimal' ? '' :
      'bg-parchment-dark/50 border border-border'
    }`}>
      <p className={`font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase mb-2 ${
        isDark ? 'text-crimson' : 'text-crimson'
      }`}>
        Veritas Worldwide Press
      </p>
      <h3 className={`font-display text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-ink'}`}>
        {heading || defaultHeading}
      </h3>
      <p className={`font-body text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-ink-muted'}`}>
        {subtext || defaultSubtext}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2" data-testid="newsletter-form">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          data-testid="newsletter-email-input"
          className={`flex-1 px-3 py-2.5 font-sans text-sm rounded-sm border focus:outline-none focus:ring-1 focus:ring-crimson/40 ${
            isDark
              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/30'
              : 'bg-white border-border text-ink placeholder:text-ink-faint'
          } ${status === 'error' ? 'border-red-500' : ''}`}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          data-testid="newsletter-submit"
          className="px-5 py-2.5 bg-crimson text-white font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'submitting' ? 'Joining...' : 'Subscribe'}
        </button>
      </form>

      {status === 'error' && (
        <p className="font-sans text-xs text-red-500 mt-2">Please enter a valid email address.</p>
      )}

      <p className={`font-sans text-[0.5rem] mt-3 ${isDark ? 'text-white/30' : 'text-ink-faint'}`}>
        Free. No spam. Unsubscribe anytime. We never share your information.
      </p>
    </div>
  )
}
