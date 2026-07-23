import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../lib/adminAuth'
import { clearMetaTags, setMetaTags, SITE_NAME, SITE_URL } from '../../lib/seo'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setMetaTags({
      title: `Admin Login | ${SITE_NAME}`,
      description: 'Operator console login. Not part of the public archive.',
      url: `${SITE_URL}/admin/login`,
      robots: 'noindex, nofollow',
    })
    return () => {
      clearMetaTags()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await adminLogin(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error || 'Login failed.')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/brand-kit/02-icons/app-icon.svg"
            alt="Veritas Worldwide"
            width={56}
            height={56}
            className="mx-auto mb-4 h-14 w-14 rounded-lg shadow-lg shadow-crimson/20"
          />
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">Admin Access</h1>
          <p className="font-sans text-xs tracking-widest uppercase text-white/40 mt-2">Veritas Worldwide Press</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded p-6 space-y-4">
          {error && (
            <div className="bg-crimson/20 border border-crimson/30 rounded px-3 py-2 text-crimson-light text-sm font-sans">
              {error}
            </div>
          )}
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-white/50 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2.5 bg-white/5 border border-white/10 rounded text-white font-sans text-sm focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/30 transition-colors"
              placeholder="admin@veritasworldwide.com"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-white/50 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2.5 bg-white/5 border border-white/10 rounded text-white font-sans text-sm focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/30 transition-colors"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[44px] py-2.5 bg-crimson text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-crimson-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 font-sans text-xs text-white/20">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  )
}
