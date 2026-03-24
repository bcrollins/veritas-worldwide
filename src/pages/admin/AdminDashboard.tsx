import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSiteStats, getAllUsers, getAllDisputes, getPageViews } from '../../lib/adminAuth'

interface StatCard {
  label: string
  value: number | string
  change?: string
  icon: string
  to: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(getSiteStats())
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentDisputes, setRecentDisputes] = useState<any[]>([])

  useEffect(() => {
    setStats(getSiteStats())
    const users = getAllUsers()
    setRecentUsers(users.slice(-5).reverse())
    const disputes = getAllDisputes()
    setRecentDisputes(disputes.slice(-5).reverse())
  }, [])

  const cards: StatCard[] = [
    { label: 'Total Users', value: stats.totalUsers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', to: '/admin/users' },
    { label: 'Page Views', value: stats.totalPageViews, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', to: '/admin' },
    { label: 'Newsletter', value: stats.newsletterSubscribers, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', to: '/admin' },
    { label: 'Disputes', value: stats.totalDisputes, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z', to: '/admin/disputes' },
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <Link key={card.label} to={card.to} className="bg-white/5 border border-white/5 rounded-lg p-5 hover:border-crimson/20 transition-colors group">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-white/30">{card.label}</p>
                <p className="font-serif text-3xl font-bold text-white mt-1">{card.value}</p>
              </div>
              <div className="w-9 h-9 rounded bg-crimson/10 flex items-center justify-center group-hover:bg-crimson/20 transition-colors">
                <svg className="w-4 h-4 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Recent Users</h3>
            <Link to="/admin/users" className="font-sans text-[10px] tracking-wide text-crimson hover:text-crimson-light">View All →</Link>
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
                <span className="font-sans text-[10px] text-white/20">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Disputes */}
        <div className="bg-white/5 border border-white/5 rounded-lg">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Recent Disputes</h3>
            <Link to="/admin/disputes" className="font-sans text-[10px] tracking-wide text-crimson hover:text-crimson-light">View All →</Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentDisputes.length === 0 ? (
              <p className="px-5 py-8 text-center font-sans text-xs text-white/20">No disputes filed</p>
            ) : recentDisputes.map((d: any, i: number) => (
              <div key={i} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-sans text-sm text-white/80">{d.name}</p>
                  <span className="font-sans text-[10px] text-white/20">{d.pageTitle}</span>
                </div>
                <p className="font-sans text-xs text-white/40 line-clamp-2">{d.claim}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/5 rounded-lg p-5">
        <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/social" className="px-4 py-2 bg-crimson/10 text-crimson font-sans text-xs tracking-wide rounded hover:bg-crimson/20 transition-colors">
            Generate Social Pack
          </Link>
          <Link to="/admin/content" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Manage Chapters
          </Link>
          <Link to="/admin/media" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Media Library
          </Link>
          <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs tracking-wide rounded hover:bg-white/10 transition-colors">
            Stripe Dashboard ↗
          </a>
        </div>
      </div>

      {/* Page View Breakdown */}
      <div className="bg-white/5 border border-white/5 rounded-lg">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Top Pages</h3>
        </div>
        <TopPages />
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
      {sorted.map(({ path, views }) => (
        <div key={path} className="px-5 py-3 flex items-center gap-4">
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
