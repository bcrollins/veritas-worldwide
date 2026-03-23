import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../lib/AuthContext'

export default function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showAuthModal) {
      setError('')
      setEmail('')
      setPassword('')
      setDisplayName('')
      setTimeout(() => emailRef.current?.focus(), 100)
    }
  }, [showAuthModal, mode])

  // Lock body scroll + Escape key + focus trap when modal open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden'
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowAuthModal(false)
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus() }
          } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus() }
          }
        }
      }
      document.addEventListener('keydown', handleKey)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKey)
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showAuthModal, setShowAuthModal])

  if (!showAuthModal) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (mode === 'signup' && !displayName.trim()) {
      setError('Please enter your name.')
      return
    }

    setLoading(true)
    try {
      const result = mode === 'signup'
        ? await signup(email, password, displayName.trim())
        : await login(email, password)

      if (result.success) {
        setShowAuthModal(false)
      } else {
        setError(result.error || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setShowAuthModal(false) }}
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'signup' ? 'Create account' : 'Sign in'}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />

      {/* Modal */}
      <div ref={modalRef} className="relative w-full max-w-md bg-parchment rounded-sm shadow-2xl border border-border">
        {/* Close */}
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-2">
              Veritas Worldwide Press
            </p>
            <h2 className="font-display text-2xl font-bold text-ink mb-2">
              {mode === 'signup' ? 'Create Your Free Account' : 'Welcome Back'}
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed">
              {mode === 'signup'
                ? 'Join our readers to access full articles, save pages, and support independent research.'
                : 'Sign in to access your saved articles and full content.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
                />
              </div>
            )}
            <div>
              <label className="font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
              />
            </div>
            <div>
              <label className="font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-disputed font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Create Free Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <p className="font-sans text-xs text-ink-muted">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError('') }}
                className="text-crimson font-semibold hover:text-crimson-dark transition-colors"
              >
                {mode === 'signup' ? 'Sign in' : 'Create one free'}
              </button>
            </p>
          </div>

          {/* Free notice */}
          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="font-body text-xs italic text-ink-faint leading-relaxed">
              Creating an account is completely free. We believe this information should be accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
