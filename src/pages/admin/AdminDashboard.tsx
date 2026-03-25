import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSiteStats, getAllUsers, getPageViews, getNewsletterSubscribers } from '../../lib/adminAuth'
import { useAllChapters } from '../../hooks/useAllChapters'
import { chapterImages } from '../../data/chapterImages'
import { MEMBERSHIP } from '../../lib/constants'

// SVG icon helper
function Icon({ d, className = 'w-4 h-4' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
    </svg>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(getSiteStats())
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [newsletter, setNewsletter] = useState<any[]>([])
  const { chapters, loading } = useAllChapters()
  const [gaUrl, setGaUrl] = useState(localStorage.getItem('veritas_ga_url') || '')
  const [showGaInput, setShowGaInput] = useState(false)
  useEffect(() => {
    setStats(getSiteStats())
    const users = getAllUsers()
    setRecentUsers(users.slice(-5).reverse())
    setNewsletter(getNewsletterSubscribers())
  }, [])

  // Count media assets
  const totalImages = Object.values(chapterImages).reduce((sum, imgs) => sum + imgs.length, 0)
  const totalVideos = chapters.reduce((sum, ch) => sum + ch.content.filter((b: any) => b.type === 'video').length, 0)
  const totalBlocks = chapters.reduce((sum, ch) => sum + ch.content.length, 0)

  const saveGaUrl = () => {
    localStorage.setItem('veritas_ga_url', gaUrl)
    setShowGaInput(false)
  }

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', to: '/admin/users', color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Page Views', value: stats.totalPageViews, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', to: '/admin', color: 'bg-emerald-500/10 text-emerald-400' },
    { label: 'Newsletter', value: stats.newsletterSubscribers, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', to: '/admin', color: 'bg-amber-500/10 text-amber-400' },
    { label: 'Chapters', value: chapters.length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', to: '/admin/content', color: 'bg-purple-500/10 text-purple-400' },
    { label: 'Images', value: totalImages, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', to: '/admin/media', color: 'bg-cyan-500/10 text-cyan-400' },
    { label: 'Videos', value: totalVideos, icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z', to: '/admin/media', color: 'bg-rose-500/10 text-rose-400' },
    { label: 'Disputes', value: stats.totalDisputes, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z', to: '/admin/disputes', color: 'bg-orange-500/10 text-orange-400' },
    { label: 'Content Blocks', value: totalBlocks, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', to: '/admin/content', color: 'bg-indigo-500/10 text-indigo-400' },
  ]
  if (loading) {
    return <div className="text-white/30 font-sans text-sm py-8 text-center animate-pulse">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      {/* ── Stat Cards Grid ────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map(card => (
          <Link key={card.label} to={card.to} className="bg-white/5 border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors group">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-white/30">{card.label}</p>
                <p className="font-serif text-2xl font-bold text-white mt-1">{card.value}</p>
              </div>
              <div className={`w-8 h-8 rounded flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform`}>
                <Icon d={card.icon} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Google Analytics Embed ──────────────────── */}
      <div className="bg-white/5 border border-white/5 rounded-lg">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">
            Google Analytics
          </h3>          <div className="flex items-center gap-2">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] text-crimson hover:text-crimson-light">
              Open GA4 ↗
            </a>
            <button onClick={() => setShowGaInput(!showGaInput)} className="font-sans text-[10px] text-white/30 hover:text-white/50">
              {showGaInput ? 'Cancel' : 'Configure'}
            </button>
          </div>
        </div>
        {showGaInput && (
          <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
            <input
              type="url"
              value={gaUrl}
              onChange={e => setGaUrl(e.target.value)}
              placeholder="Paste Looker Studio embed URL..."
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
            />
            <button onClick={saveGaUrl} className="px-3 py-2 bg-crimson/10 text-crimson font-sans text-xs rounded hover:bg-crimson/20">Save</button>
          </div>
        )}
        {gaUrl ? (
          <div className="aspect-[16/7] w-full">
            <iframe src={gaUrl} className="w-full h-full border-0 rounded-b-lg" title="Google Analytics Dashboard" />
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Icon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" className="w-8 h-8 text-white/10 mx-auto mb-3" />
            <p className="font-sans text-xs text-white/20 mb-2">No analytics dashboard configured</p>
            <p className="font-sans text-[10px] text-white/10">Click "Configure" to add a Looker Studio embed URL</p>
          </div>
        )}
      </div>
      {/* ── Two-Column: Users + Membership ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Recent Users</h3>
            <Link to="/admin/users" className="font-sans text-[10px] text-crimson hover:text-crimson-light">View All →</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentUsers.length === 0 ? (
              <p className="px-5 py-8 text-center font-sans text-xs text-white/20">No users yet</p>
            ) : recentUsers.map((user: any, i: number) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-sans text-sm text-white/80">{user.displayName || user.email}</p>
                  <p className="font-sans text-[10px] text-white/30">{user.email}</p>
                </div>
                <span className="font-sans text-[10px] text-white/20">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Membership Tiers</h3>
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] text-crimson hover:text-crimson-light">Stripe ↗</a>
          </div>          <div className="divide-y divide-white/5">
            {Object.entries(MEMBERSHIP).map(([key, tier]) => (
              <div key={key} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-sans text-sm text-white/80">{tier.name}</p>
                  <p className="font-sans text-[10px] text-white/30">${tier.monthlyPrice}/mo · ${tier.annualPrice}/yr</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                  {tier.monthlyUrl && (
                    <a href={tier.monthlyUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-[10px] text-white/20 hover:text-white/40">Link ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────── */}
      <div className="bg-white/5 border border-white/5 rounded-lg p-5">
        <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/content" className="px-4 py-2 bg-crimson/10 text-crimson font-sans text-xs tracking-wide rounded hover:bg-crimson/20 transition-colors">
            Create Article
          </Link>
          <Link to="/admin/content" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Manage Chapters
          </Link>
          <Link to="/admin/media" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Media Library
          </Link>          <Link to="/admin/social" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Social Packs
          </Link>
          <Link to="/admin/social-hub" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Social Hub
          </Link>
          <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Stripe Dashboard ↗
          </a>
          <a href="https://app.hubspot.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            HubSpot ↗
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Search Console ↗
          </a>
          <Link to="/" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            View Live Site →
          </Link>
        </div>
      </div>

      {/* ── Newsletter + Top Pages ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Newsletter */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Newsletter Subscribers</h3>
          </div>
          <div className="px-5 py-4">
            <p className="font-serif text-3xl font-bold text-white">{newsletter.length}</p>
            <p className="font-sans text-[10px] text-white/30 mt-1">Total subscribers</p>            {newsletter.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-sans text-[10px] text-white/20 uppercase tracking-wider">Recent</p>
                {newsletter.slice(-3).reverse().map((sub: any, i: number) => (
                  <p key={i} className="font-mono text-xs text-white/40">{sub.email || sub}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Top Pages</h3>
          </div>
          <TopPages />
        </div>
      </div>

      {/* ── Media Health Summary ────────────────────── */}
      <div className="bg-white/5 border border-white/5 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Media Health</h3>
          <Link to="/admin/media" className="font-sans text-[10px] text-crimson hover:text-crimson-light">Full Audit →</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-white">{totalImages}</p>
            <p className="font-sans text-[10px] text-white/30 mt-1">Chapter Images</p>          </div>
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-white">{totalVideos}</p>
            <p className="font-sans text-[10px] text-white/30 mt-1">Videos</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-emerald-400">All Wikimedia</p>
            <p className="font-sans text-[10px] text-white/30 mt-1">Source: Commons</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopPages() {
  const pageViews = getPageViews()
  const sorted = Object.entries(pageViews)
    .map(([path, views]) => ({ path, views: views as number }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  if (sorted.length === 0) {
    return <p className="px-5 py-8 text-center font-sans text-xs text-white/20">No page view data yet</p>
  }

  const max = sorted[0]?.views || 1

  return (
    <div className="divide-y divide-white/5">
      {sorted.map(({ path, views }) => (        <div key={path} className="px-5 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-mono text-xs text-white/60 truncate">{path}</p>
            <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-crimson/40 rounded-full" style={{ width: `${(views / max) * 100}%` }} />
            </div>
          </div>
          <span className="font-mono text-xs text-white/30 flex-shrink-0">{views}</span>
        </div>
      ))}
    </div>
  )
}
