import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchAnalytics } from '../lib/analytics'
import type { AnalyticsSnapshot, CountryViews } from '../lib/analytics'
import { setMetaTags, clearMetaTags, SITE_URL } from '../lib/seo'

// ── Country flag emoji from ISO code ───────────────────────────────
function flagEmoji(code: string): string {
  if (!code || code === 'XX') return '🌍'
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

// ── Sort options for country table ─────────────────────────────────
type SortKey = 'views' | 'country'
type SortDir = 'asc' | 'desc'

// ── Stat Card ──────────────────────────────────────────────────────
function StatCard({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`p-5 rounded-sm border ${accent ? 'border-crimson bg-crimson/5' : 'border-border bg-surface'}`}>
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
        {label}
      </p>
      <p className={`font-display text-3xl md:text-4xl font-bold ${accent ? 'text-crimson' : 'text-ink'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  )
}

// ── Mini bar chart (pure CSS) ──────────────────────────────────────
function DailyChart({ data }: { data: { date: string; views: number }[] }) {
  const maxViews = Math.max(...data.map(d => d.views), 1)

  return (
    <div className="border border-border rounded-sm p-5 bg-surface">
      <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-4">
        Daily Views — Last 30 Days
      </h3>
      <div className="flex items-end gap-[2px] h-32">
        {data.map(d => {
          const pct = (d.views / maxViews) * 100
          return (
            <div
              key={d.date}
              className="flex-1 bg-crimson/70 hover:bg-crimson rounded-t-sm transition-colors relative group"
              style={{ height: `${Math.max(pct, 2)}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-ink text-white text-[10px] font-sans px-2 py-1 rounded whitespace-nowrap z-10">
                {d.date}: {d.views.toLocaleString()}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-2">
        <span className="font-sans text-[10px] text-ink-faint">
          {data.length > 0 ? data[0].date : ''}
        </span>
        <span className="font-sans text-[10px] text-ink-faint">
          {data.length > 0 ? data[data.length - 1].date : ''}
        </span>
      </div>
    </div>
  )
}

// ── Country Table ──────────────────────────────────────────────────
function CountryTable({ countries }: { countries: CountryViews[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('views')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    const copy = [...countries]
    copy.sort((a, b) => {
      const valA = sortKey === 'views' ? a.views : a.country
      const valB = sortKey === 'views' ? b.views : b.country
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDir === 'desc' ? valB - valA : valA - valB
      }
      const strA = String(valA).toLowerCase()
      const strB = String(valB).toLowerCase()
      return sortDir === 'desc' ? strB.localeCompare(strA) : strA.localeCompare(strB)
    })
    return copy
  }, [countries, sortKey, sortDir])

  const totalViews = countries.reduce((s, c) => s + c.views, 0)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'views' ? 'desc' : 'asc')
    }
  }

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === 'desc' ? ' ↓' : ' ↑') : ''

  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
          Views by Country
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-parchment-dark">
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint w-8">
                #
              </th>
              <th
                className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint cursor-pointer hover:text-crimson transition-colors"
                onClick={() => toggleSort('country')}
              >
                Country{arrow('country')}
              </th>
              <th
                className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right cursor-pointer hover:text-crimson transition-colors"
                onClick={() => toggleSort('views')}
              >
                Views{arrow('views')}
              </th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right">
                Share
              </th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint w-32">
                Distribution
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const pct = totalViews > 0 ? ((c.views / totalViews) * 100) : 0
              return (
                <tr key={c.code} className="border-b border-border/50 hover:bg-parchment-dark/50 transition-colors">
                  <td className="px-5 py-3 font-sans text-xs text-ink-faint">{i + 1}</td>
                  <td className="px-5 py-3 font-sans text-sm text-ink">
                    <span className="mr-2">{flagEmoji(c.code)}</span>
                    {c.country}
                    <span className="ml-2 text-ink-faint text-xs">({c.code})</span>
                  </td>
                  <td className="px-5 py-3 font-sans text-sm text-ink font-semibold text-right tabular-nums">
                    {c.views.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 font-sans text-xs text-ink-muted text-right tabular-nums">
                    {pct.toFixed(1)}%
                  </td>
                  <td className="px-5 py-3">
                    <div className="w-full bg-border/50 rounded-full h-2">
                      <div
                        className="bg-crimson/70 h-2 rounded-full transition-all"
                        style={{ width: `${Math.max(pct, 0.5)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-ink-muted italic">
                  No country data recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Top Pages Table ────────────────────────────────────────────────
function TopPagesTable({ pages }: { pages: { path: string; title: string; views: number }[] }) {
  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
          Most Viewed Pages
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-parchment-dark">
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint w-8">#</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Page</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right">Views</th>
            </tr>
          </thead>
          <tbody>
            {pages.slice(0, 20).map((p, i) => (
              <tr key={p.path} className="border-b border-border/50 hover:bg-parchment-dark/50 transition-colors">
                <td className="px-5 py-3 font-sans text-xs text-ink-faint">{i + 1}</td>
                <td className="px-5 py-3">
                  <Link to={p.path} className="font-sans text-sm text-crimson hover:text-crimson-dark transition-colors">
                    {p.title || p.path}
                  </Link>
                  <span className="block font-sans text-[10px] text-ink-faint mt-0.5">{p.path}</span>
                </td>
                <td className="px-5 py-3 font-sans text-sm text-ink font-semibold text-right tabular-nums">
                  {p.views.toLocaleString()}
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center font-body text-sm text-ink-muted italic">
                  No page view data recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    setMetaTags({
      title: 'Reader Analytics | The Record — Veritas Worldwide Press',
      description: 'Public readership analytics for The Record. View lifetime readers, daily traffic, and geographic distribution.',
      url: `${SITE_URL}/analytics`,
    })
    return () => { clearMetaTags() }
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const snapshot = await fetchAnalytics()
      if (snapshot) {
        setData(snapshot)
      } else {
        setError('fetch-failed')
      }
    } catch {
      setError('fetch-failed')
    } finally {
      setLoading(false)
      setLastRefresh(new Date())
    }
  }

  useEffect(() => { loadData() }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <header className="mb-10 border-b border-border pb-8">
        <p className="chapter-label mb-4">Transparency</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Reader Analytics
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Real-time readership data. We believe in transparency — these numbers are public.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={loadData}
            disabled={loading}
            className="font-sans text-xs font-semibold px-4 py-2 border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <span className="font-sans text-[10px] text-ink-faint">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
        </div>
      </header>

      {/* Loading */}
      {loading && !data && (
        <div className="text-center py-20">
          <div className="inline-block w-6 h-6 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
          <p className="font-sans text-sm text-ink-muted mt-4">Loading analytics...</p>
        </div>
      )}

      {/* Error */}
      {error === 'fetch-failed' && (
        <div className="border border-disputed rounded-sm p-5 bg-disputed-bg mb-8">
          <p className="font-sans text-sm text-ink">Failed to load analytics data. Please try again.</p>
        </div>
      )}

      {/* Data */}
      {data && (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <StatCard label="Lifetime Views" value={data.lifetime} accent />
            <StatCard label="Today" value={data.today} />
            <StatCard label="This Week" value={data.thisWeek} />
            <StatCard label="This Month" value={data.thisMonth} />
            <StatCard label="This Year" value={data.thisYear} />
          </div>

          {/* Daily Trend Chart */}
          {data.dailyTrend.length > 0 && (
            <DailyChart data={data.dailyTrend} />
          )}

          {/* Country Breakdown */}
          <CountryTable countries={data.countries} />

          {/* Top Pages */}
          <TopPagesTable pages={data.topPages} />

          {/* Footer note */}
          <div className="border-t border-border pt-6 mt-4">
            <p className="font-sans text-xs text-ink-faint leading-relaxed">
              Analytics are collected anonymously. No personal data is stored. Country detection is based on IP geolocation. View counts include all page loads.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center"
        >
          Read The Record
        </Link>
        <Link
          to="/methodology"
          className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center"
        >
          Our Methodology
        </Link>
      </div>
    </div>
  )
}
