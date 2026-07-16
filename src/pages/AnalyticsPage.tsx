import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchAnalytics } from '../lib/analytics'
import type {
  AnalyticsEventSummary,
  AnalyticsSnapshot,
  CountryViews,
  EventTrendPoint,
  FunnelSnapshot,
  SignupAttributionEntry,
  SignupAttributionSnapshot,
} from '../lib/analytics'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'
import { formatSignupSourceLabel } from '../lib/signupAttribution'

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

function titleCaseLabel(value: string): string {
  return value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
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
    { label: 'Archive Depth Events', value: funnel.gateHits, description: 'Anonymous readers who reached deep reading milestones.' },
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

function SignupAttributionTable({
  entries,
  formatLabel,
  rawLabel,
  title,
  total,
  emptyText,
}: {
  entries: SignupAttributionEntry[]
  formatLabel?: (value: string) => string
  rawLabel?: (value: string) => string
  title: string
  total: number
  emptyText: string
}) {
  const renderRawLabel = rawLabel || ((value: string) => value)

  return (
    <div className="border border-border rounded-sm bg-surface overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-parchment-dark">
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint w-8">#</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Label</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right">Count</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint text-right">Share</th>
              <th className="px-5 py-3 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Latest Capture Path</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              const share = total > 0 ? (entry.count / total) * 100 : 0
              return (
                <tr key={`${title}-${entry.label}`} className="border-b border-border/50 hover:bg-parchment-dark/50 transition-colors">
                  <td className="px-5 py-3 font-sans text-xs text-ink-faint">{index + 1}</td>
                  <td className="px-5 py-3">
                    <p className="font-sans text-sm text-ink font-semibold">
                      {formatLabel ? formatLabel(entry.label) : entry.label}
                    </p>
                    <p className="font-mono text-[10px] text-ink-faint mt-0.5">
                      {renderRawLabel(entry.label)}
                    </p>
                  </td>
                  <td className="px-5 py-3 font-sans text-sm text-ink font-semibold text-right tabular-nums">
                    {entry.count.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 font-sans text-xs text-ink-muted text-right tabular-nums">
                    {share.toFixed(1)}%
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-mono text-xs text-ink-muted">
                      {entry.lastPath || '—'}
                    </p>
                    <p className="font-sans text-[10px] text-ink-faint mt-0.5">
                      {formatLastSeen(entry.lastSeenAt)}
                    </p>
                  </td>
                </tr>
              )
            })}
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-ink-muted italic">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SignupAttributionSection({ attribution }: { attribution: SignupAttributionSnapshot }) {
  const instituteShare = attribution.total > 0 ? (attribution.instituteSignups / attribution.total) * 100 : 0

  return (
    <section className="space-y-6">
      <div className="border border-border rounded-sm bg-surface p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
              Newsletter Capture Attribution
            </h2>
            <p className="font-body text-sm text-ink-muted mt-2 max-w-3xl">
              This view isolates newsletter capture from general reader signups so institute entry routes, topic hubs,
              and reporting pages can be compared without mixing them into account-creation totals.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Newsletter Signups" value={attribution.total} accent />
            <StatCard label="Institute Share" value={`${instituteShare.toFixed(1)}%`} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SignupAttributionTable
          title="Signup Sources"
          entries={attribution.sources}
          total={attribution.total}
          formatLabel={formatSignupSourceLabel}
          rawLabel={value => value}
          emptyText="No newsletter source attribution recorded yet."
        />
        <SignupAttributionTable
          title="Content Interests"
          entries={attribution.interests}
          total={attribution.total}
          formatLabel={titleCaseLabel}
          rawLabel={value => value}
          emptyText="No signup interests recorded yet."
        />
        <SignupAttributionTable
          title="Success Handoffs"
          entries={attribution.returnPaths}
          total={attribution.total}
          rawLabel={value => value}
          emptyText="No return-path handoffs recorded yet."
        />
      </div>
    </section>
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

type ReleaseHealth = {
  status: string
  checkedAt?: string
  commitShort?: string
  deploymentId?: string
  environment?: string
  publicChapterCount?: number
  prerenderedRouteCount?: number
  chapterDataGeneratedAt?: string
  analyticsLifetime?: number
  clientErrorIntake?: boolean
  clientErrorIntakeCount?: number
  clientErrorIntakeLastAt?: string
  clientErrorIntakeLastMessage?: string
  checks?: Record<string, boolean>
  failed?: string[]
  version?: string
}

type HealthHistorySample = {
  checkedAt?: string
  status?: string
  commitShort?: string
  analyticsLifetime?: number
  publicChapterCount?: number
  prerenderedRouteCount?: number
  failedCount?: number
  replica?: string
}

type HealthHistoryTransition = {
  from?: string
  to?: string
  at?: string
  status?: string
}

type HealthHistory = {
  samples?: HealthHistorySample[]
  sampleCount?: number
  minIntervalMinutes?: number
  maxSamples?: number
  persistence?: boolean
  storage?: string
  sharedAcrossReplicas?: boolean
  commitTransitions?: HealthHistoryTransition[]
  uniqueCommits?: string[]
}

function ReleaseHealthPanel({
  health,
  history,
}: {
  health: ReleaseHealth | null
  history: HealthHistory | null
}) {
  if (!health) {
    return (
      <section className="border border-border rounded-sm bg-surface p-5 sm:p-6">
        <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">
          Release Health
        </h2>
        <p className="font-body text-sm text-ink-muted">
          Live release probe unavailable. Open <code className="font-mono text-xs">/api/health</code> directly if this persists.
        </p>
      </section>
    )
  }

  const isOk = health.status === 'ok'
  const checkEntries = Object.entries(health.checks || {})
  const samples = Array.isArray(history?.samples) ? history.samples : []
  const recent = samples.slice(-12)
  const okCount = recent.filter((sample) => sample.status === 'ok').length
  const failedSampleCount = recent.filter((sample) => (sample.failedCount || 0) > 0 || sample.status === 'degraded').length
  const maxLifetime = Math.max(...recent.map((sample) => sample.analyticsLifetime || 0), 1)
  const maxFailed = Math.max(...recent.map((sample) => sample.failedCount || 0), 1)
  const hasInstitutePdfCheck = Object.prototype.hasOwnProperty.call(health.checks || {}, 'instituteFieldManualPdf')

  const commitTransitions = (() => {
    if (Array.isArray(history?.commitTransitions) && history.commitTransitions.length > 0) {
      return history.commitTransitions.slice(-8)
    }
    const derived: HealthHistoryTransition[] = []
    for (let i = 1; i < recent.length; i += 1) {
      const prev = recent[i - 1]
      const curr = recent[i]
      if (prev.commitShort && curr.commitShort && prev.commitShort !== curr.commitShort) {
        derived.push({
          from: prev.commitShort,
          to: curr.commitShort,
          at: curr.checkedAt,
          status: curr.status,
        })
      }
    }
    return derived.slice(-8)
  })()

  const uniqueCommits =
    Array.isArray(history?.uniqueCommits) && history.uniqueCommits.length > 0
      ? history.uniqueCommits.slice(-8)
      : [...new Set(recent.map((sample) => sample.commitShort).filter(Boolean) as string[])].slice(-8)

  return (
    <section
      className={`border rounded-sm p-5 sm:p-6 ${isOk ? 'border-border bg-surface' : 'border-disputed bg-disputed-bg'}`}
      data-testid="release-health-panel"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div>
          <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink">
            Release Health
          </h2>
          <p className="font-body text-sm text-ink-muted mt-2 max-w-2xl">
            Operator-visible liveness for the live deploy. Confirms chapter data, prerender coverage, analytics store, the manuscript PDF, and the Institute field-manual PDF without requiring Railway console access.
          </p>
        </div>
        <span
          className={`inline-flex items-center self-start font-sans text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-sm border ${
            isOk
              ? 'border-verified text-verified bg-verified/10'
              : 'border-disputed text-disputed bg-disputed/10'
          }`}
        >
          {isOk ? 'OK' : 'DEGRADED'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <StatCard label="Commit" value={health.commitShort || '—'} />
        <StatCard label="Chapters" value={health.publicChapterCount ?? '—'} />
        <StatCard label="Prerender Routes" value={health.prerenderedRouteCount ?? '—'} />
        <StatCard label="Analytics Lifetime" value={health.analyticsLifetime ?? '—'} />
        <StatCard
          label="Client Errors (replica)"
          value={health.clientErrorIntakeCount ?? 0}
          accent={(health.clientErrorIntakeCount || 0) > 0}
        />
        <StatCard label="Version" value={health.version || '—'} />
      </div>

      {health.clientErrorIntakeLastAt && (
        <p className="font-sans text-[10px] text-ink-muted mb-3">
          Last client error on this replica:{' '}
          <span className="font-mono">{new Date(health.clientErrorIntakeLastAt).toLocaleString()}</span>
          {health.clientErrorIntakeLastMessage ? (
            <>
              {' — '}
              <span className="text-ink">{health.clientErrorIntakeLastMessage}</span>
            </>
          ) : null}
        </p>
      )}

      {hasInstitutePdfCheck && (
        <p className="font-sans text-[10px] text-ink-muted mb-3">
          Institute field manual PDF check:{' '}
          <span className={health.checks?.instituteFieldManualPdf ? 'text-verified font-semibold' : 'text-disputed font-semibold'}>
            {health.checks?.instituteFieldManualPdf ? 'present' : 'missing'}
          </span>
          {' · '}
          <a href="/veritas-institute-field-manual.pdf" className="text-crimson underline hover:text-crimson-dark">
            /veritas-institute-field-manual.pdf
          </a>
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {checkEntries.map(([key, ok]) => (
          <span
            key={key}
            className={`font-mono text-[10px] px-2 py-1 rounded-sm border ${
              ok ? 'border-border text-ink-muted' : 'border-disputed text-disputed'
            }`}
          >
            {ok ? '✓' : '✗'} {key}
          </span>
        ))}
      </div>

      {Array.isArray(health.failed) && health.failed.length > 0 && (
        <p className="font-sans text-xs text-disputed mt-3">
          Failed checks: {health.failed.join(', ')}
        </p>
      )}

      {recent.length > 0 && (
        <div className="mt-5 border-t border-border pt-4" data-testid="health-history-trend">
          <div className="flex flex-wrap items-end justify-between gap-2 mb-3">
            <div>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink">
                Health samples
              </p>
              <p className="font-body text-xs text-ink-muted mt-1">
                {okCount}/{recent.length} recent samples OK
                {failedSampleCount > 0 ? ` · ${failedSampleCount} with failures` : ''}
                {history?.minIntervalMinutes ? ` · ≥${history.minIntervalMinutes}m apart` : ''}
                {history?.persistence ? ' · persisted' : ' · in-memory until volume available'}
                {history?.storage ? ` · ${history.storage}` : ''}
                {history?.sharedAcrossReplicas ? ' · multi-replica' : ''}
              </p>
            </div>
            <a href="/api/health/history" className="font-mono text-[10px] text-crimson underline hover:text-crimson-dark">
              /api/health/history
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
                Analytics lifetime trend
              </p>
              <div className="flex items-end gap-1 h-16">
                {recent.map((sample, index) => {
                  const height = Math.max(8, Math.round(((sample.analyticsLifetime || 0) / maxLifetime) * 100))
                  const ok = sample.status === 'ok'
                  return (
                    <div
                      key={`life-${sample.checkedAt || index}-${sample.commitShort || index}`}
                      className={`flex-1 rounded-t-sm ${ok ? 'bg-crimson/70' : 'bg-disputed/80'}`}
                      style={{ height: `${height}%` }}
                      title={`${sample.checkedAt || 'sample'} · ${sample.status || 'unknown'} · lifetime ${sample.analyticsLifetime ?? '—'}`}
                    />
                  )
                })}
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
                Failed-check trend
              </p>
              <div className="flex items-end gap-1 h-16">
                {recent.map((sample, index) => {
                  const failed = sample.failedCount || 0
                  const height = failed === 0 ? 6 : Math.max(12, Math.round((failed / maxFailed) * 100))
                  return (
                    <div
                      key={`fail-${sample.checkedAt || index}-${sample.commitShort || index}`}
                      className={`flex-1 rounded-t-sm ${failed === 0 ? 'bg-border' : 'bg-disputed/90'}`}
                      style={{ height: `${height}%` }}
                      title={`${sample.checkedAt || 'sample'} · failedCount ${failed} · commit ${sample.commitShort || '—'}${sample.replica ? ` · replica ${sample.replica.slice(0, 8)}` : ''}`}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {(uniqueCommits.length > 0 || commitTransitions.length > 0) && (
            <div className="mt-4 grid gap-3 lg:grid-cols-2" data-testid="health-commit-transitions">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
                  Commits in window
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueCommits.length > 0 ? (
                    uniqueCommits.map((commit) => (
                      <span
                        key={commit}
                        className={`font-mono text-[10px] px-2 py-1 rounded-sm border ${
                          commit === health.commitShort
                            ? 'border-crimson text-crimson bg-crimson/5'
                            : 'border-border text-ink-muted'
                        }`}
                      >
                        {commit.slice(0, 12)}
                        {commit === health.commitShort ? ' · live' : ''}
                      </span>
                    ))
                  ) : (
                    <span className="font-body text-xs text-ink-faint">No commit samples yet</span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-ink-faint mb-2">
                  Deploy transitions
                </p>
                {commitTransitions.length > 0 ? (
                  <ul className="space-y-1.5">
                    {commitTransitions.map((transition, index) => (
                      <li
                        key={`${transition.from}-${transition.to}-${transition.at || index}`}
                        className="font-mono text-[10px] text-ink-muted"
                      >
                        <span className="text-ink-faint">{transition.from?.slice(0, 8)}</span>
                        <span className="mx-1 text-crimson">→</span>
                        <span className="text-ink">{transition.to?.slice(0, 8)}</span>
                        {transition.at ? (
                          <span className="text-ink-faint">
                            {' · '}
                            {new Date(transition.at).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-body text-xs text-ink-faint">
                    No commit changes in recent samples yet. Deploy transitions force a history sample.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <p className="font-sans text-[10px] text-ink-faint mt-3">
        Deploy {health.deploymentId || 'unknown'} · env {health.environment || 'unknown'} · probed{' '}
        {health.checkedAt ? new Date(health.checkedAt).toLocaleString() : '—'} · endpoint{' '}
        <a href="/api/health" className="underline hover:text-crimson">
          /api/health
        </a>
      </p>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsSnapshot | null>(null)
  const [health, setHealth] = useState<ReleaseHealth | null>(null)
  const [healthHistory, setHealthHistory] = useState<HealthHistory | null>(null)
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
      const [snapshot, healthRes, historyRes] = await Promise.all([
        fetchAnalytics(),
        fetch('/api/health', { cache: 'no-store' })
          .then(async (res) => {
            try {
              return (await res.json()) as ReleaseHealth
            } catch {
              return null
            }
          })
          .catch(() => null),
        fetch('/api/health/history', { cache: 'no-store' })
          .then(async (res) => {
            try {
              return (await res.json()) as HealthHistory
            } catch {
              return null
            }
          })
          .catch(() => null),
      ])
      if (snapshot) {
        setData(snapshot)
      } else {
        setError('fetch-failed')
      }
      setHealth(healthRes)
      setHealthHistory(historyRes)
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
          <ReleaseHealthPanel health={health} history={healthHistory} />

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

          <SignupAttributionSection attribution={data.signupAttribution} />

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
