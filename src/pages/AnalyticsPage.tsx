import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchAnalytics } from '../lib/analytics'
import type { AnalyticsEventSummary, AnalyticsSnapshot, CountryViews, EventTrendPoint, FunnelSnapshot } from '../lib/analytics'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

// ── Country flag emoji from ISO code ───────────────────────────────
function flagEmoji(code: string): string {
  if (!code || code === 'XX') return '--'
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
    <div className={`p-4 sm:p-5 rounded-sm border ${accent ? 'border-crimson bg-crimson/5' : 'border-border bg-surface'}`}>
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
        {label}
      </p>
      <p className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold ${accent ? 'text-crimson' : 'text-ink'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  )
}

function formatEventLabel(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function formatLastSeen(value: string): string {
  if (!value) return 'No activity yet'

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
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
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-obsidian text-white text-[10px] font-sans px-2 py-1 rounded whitespace-nowrap z-10">
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

function FunnelSection({ funnel }: { funnel: FunnelSnapshot }) {
  const stages = [
    { label: 'Chapter Views', value: funnel.chapterViews, description: 'Readers who reached a chapter page.' },
    { label: 'Content Gate Hits', value: funnel.gateHits, description: 'Anonymous readers who reached gated depth.' },
    { label: 'Reader Signups', value: funnel.signups, description: 'Free account creation and newsletter subscriptions.' },
    { label: 'Checkout Starts', value: funnel.checkoutStarts, description: 'Donation or membership checkout intent.' },
    { label: 'Completed Support', value: funnel.payments, description: 'Confirmed donation or membership return.' },
  ]

  return (
    <section className="border border-border rounded-sm bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-5">
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
            Reader Funnel
          </h3>
          <p className="font-body text-sm text-ink-muted mt-1">
            Public visibility from reading through support. Conversion rates are measured against the previous stage.
          </p>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          Signals captured client-side and stored server-side
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {stages.map((stage, index) => {
          const previous = index > 0 ? stages[index - 1].value : 0
          const conversion = index === 0 || previous === 0 ? 'Baseline' : `${((stage.value / previous) * 100).toFixed(1)}%`

          return (
            <div key={stage.label} className="rounded-sm border border-border bg-parchment px-4 py-4">
              <p className="font-sans text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ink-faint">
                Stage {index + 1}
              </p>
              <p className="font-display text-2xl font-bold text-ink mt-2">{stage.value.toLocaleString()}</p>
              <p className="font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-crimson mt-2">
                {stage.label}
              </p>
              <p className="font-body text-xs text-ink-muted leading-relaxed mt-2">
                {stage.description}
              </p>
              <p className="font-sans text-[10px] text-ink-faint mt-3">
                {conversion}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function EventTrendChart({ data }: { data: EventTrendPoint[] }) {
  const maxValue = Math.max(
    ...data.flatMap(point => [point.chapterViews, point.signups, point.checkoutStarts, point.payments]),
    1,
  )

  const series = [
    { key: 'chapterViews', label: 'Chapter Views', color: 'bg-crimson/80' },
    { key: 'signups', label: 'Reader Signups', color: 'bg-gold/80' },
    { key: 'checkoutStarts', label: 'Checkout Starts', color: 'bg-verified/80' },
    { key: 'payments', label: 'Completed Support', color: 'bg-ink/70' },
  ] as const

  return (
    <div className="border border-border rounded-sm p-5 bg-surface">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
            Behavioral Trend — Last 14 Days
          </h3>
          <p className="font-body text-sm text-ink-muted mt-1">
            Daily movement across reading, signup, checkout, and completed support activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {series.map(item => (
            <span key={item.key} className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.08em] text-ink-faint">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${item.color}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="grid gap-2 items-end h-40 sm:h-48"
        style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
      >
        {data.map(point => (
          <div key={point.date} className="flex h-full flex-col justify-end gap-1">
            {series.map(item => {
              const value = point[item.key]
              const pct = (value / maxValue) * 100
              return (
                <div
                  key={item.key}
                  className={`${item.color} rounded-t-sm transition-all`}
                  style={{ height: `${Math.max(value === 0 ? 0 : pct, value === 0 ? 0 : 6)}%` }}
                  title={`${point.date} — ${item.label}: ${value.toLocaleString()}`}
                />
              )
            })}
          </div>
        ))}
      </div>

      <div
        className="grid gap-2 mt-3"
        style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
      >
        {data.map((point, index) => (
          <span
            key={point.date}
            className="font-sans text-[9px] text-ink-faint text-center"
          >
            {index === 0 || index === data.length - 1 || index % 3 === 0 ? point.date.slice(5) : ''}
          </span>
        ))}
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

function TopEventsTable({ events }: { events: AnalyticsEventSummary[] }) {
  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
          Top Behavioral Events
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-parchment-dark">
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint w-8">#</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Event</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right">Count</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Last Path</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.name} className="border-b border-border/50 hover:bg-parchment-dark/50 transition-colors">
                <td className="px-5 py-3 font-sans text-xs text-ink-faint">{index + 1}</td>
                <td className="px-5 py-3">
                  <p className="font-sans text-sm text-ink font-semibold">{formatEventLabel(event.name)}</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.08em] text-ink-faint mt-0.5">{event.name}</p>
                </td>
                <td className="px-5 py-3 font-sans text-sm text-ink font-semibold text-right tabular-nums">
                  {event.count.toLocaleString()}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-ink-muted">
                  {event.lastPath || '—'}
                </td>
                <td className="px-5 py-3 font-sans text-xs text-ink-muted">
                  {formatLastSeen(event.lastSeenAt)}
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-ink-muted italic">
                  No behavioral events recorded yet. This table populates after readers search, subscribe, share, or support the publication.
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
      title: 'Reader Analytics | The Record — Veritas Worldwide',
      description: 'Public readership analytics for The Record. View lifetime readers, daily traffic, and geographic distribution.',
      url: `${SITE_URL}/analytics`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Reader Analytics',
      'url': `${SITE_URL}/analytics`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <StatCard label="Lifetime Views" value={data.lifetime} accent />
            <StatCard label="Today" value={data.today} />
            <StatCard label="This Week" value={data.thisWeek} />
            <StatCard label="This Month" value={data.thisMonth} />
            <StatCard label="This Year" value={data.thisYear} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <StatCard label="Chapter Views" value={data.funnel.chapterViews} />
            <StatCard label="Reader Signups" value={data.funnel.signups} />
            <StatCard label="Checkout Starts" value={data.funnel.checkoutStarts} />
            <StatCard label="Completed Support" value={data.funnel.payments} />
            <StatCard label="Shares" value={data.funnel.shares} />
          </div>

          <FunnelSection funnel={data.funnel} />

          {/* Daily Trend Chart */}
          {data.dailyTrend.length > 0 && (
            <DailyChart data={data.dailyTrend} />
          )}

          {data.eventTrend.length > 0 && (
            <EventTrendChart data={data.eventTrend} />
          )}

          {/* Country Breakdown */}
          <CountryTable countries={data.countries} />

          {/* Top Pages */}
          <TopPagesTable pages={data.topPages} />

          {/* Behavioral events */}
          <TopEventsTable events={data.topEvents} />

          {/* Footer note */}
          <div className="border-t border-border pt-6 mt-4">
            <p className="font-sans text-xs text-ink-faint leading-relaxed">
              Analytics are collected anonymously. No personal data is stored in the public dashboard. Country detection is based on IP geolocation, and behavioral events reflect chapter reading, reader signups, share activity, and support actions recorded on the site.
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
