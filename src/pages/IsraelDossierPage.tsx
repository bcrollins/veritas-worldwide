import { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { trackSupportClick } from '../lib/ga4'
import CommunityForum from '../components/CommunityForum'
import DisputeStory from '../components/DisputeStory'
import SharePanel from '../components/SharePanel'
import AdBanner from '../components/AdBanner'
import { TierIcon } from '../components/TierIcons'
import { HISTORICAL_TIMELINE, EXPANDED_INCIDENTS, EXPANDED_STATS, LOBBYING_DATA, LEGAL_CASES, ISRAEL_DOSSIER_CAROUSEL, PINNED_POSTS } from '../data/israelDossierExpanded'
import { CarouselDownloader, PinnedPostDownloader } from '../components/DossierCarousel'
import DossierPDF from '../components/DossierPDF'
import NewsletterSignup from '../components/NewsletterSignup'
import ContentGate from '../components/ContentGate'
import ReadingProgress from '../components/ReadingProgress'
import { buildSubscriptionSuccessPath } from '../lib/subscriptionSuccess'
import {
  ISRAEL_DOSSIER_ASSETS,
  ISRAEL_DOSSIER_CATEGORY_META,
  ISRAEL_DOSSIER_LAST_VERIFIED,
  ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS,
  ISRAEL_DOSSIER_SOURCE_CATEGORY_META,
  ISRAEL_DOSSIER_CORE_STATS,
  ISRAEL_DOSSIER_CORE_INCIDENTS,
  ISRAEL_DOSSIER_MONEY_TRAIL,
  type DossierCategory,
  type DossierCategoryMeta,
  type DossierSourceCategory,
  type DossierStatCard,
  type DossierDocumentedIncident,
  type DossierMoneyTrailNode,
} from '../data/israelDossierCanon'

/* ═══════════════════════════════════════════════════════════
   CATEGORY META
   ═══════════════════════════════════════════════════════════ */

const CATEGORY_META = ISRAEL_DOSSIER_CATEGORY_META

/* ═══════════════════════════════════════════════════════════
   HELPER: Format "Last verified" date
   ═══════════════════════════════════════════════════════════ */
function formatVerified(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE STAT CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function InteractiveStatCard({ stat, meta }: { stat: DossierStatCard; meta: DossierCategoryMeta }) {
  const [open, setOpen] = useState(false)
  const hasDetails = stat.details && stat.details.length > 0

  return (
    <div
      className={`p-5 rounded-sm border transition-all duration-200 ${meta.border} ${meta.bg} ${hasDetails ? `cursor-pointer ${meta.hoverBorder} hover:shadow-md` : ''}`}
      onClick={() => hasDetails && setOpen(!open)}
      role={hasDetails ? 'button' : undefined}
      tabIndex={hasDetails ? 0 : undefined}
      onKeyDown={e => hasDetails && e.key === 'Enter' && setOpen(!open)}
      aria-expanded={hasDetails ? open : undefined}
    >
      {/* Value + expand indicator */}
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-3xl md:text-4xl font-bold leading-tight text-crimson">
          {stat.value}
        </p>
        {hasDetails && (
          <span className={`mt-1 text-lg transition-transform duration-200 text-ink-faint ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        )}
      </div>

      <p className="font-body text-sm text-ink leading-relaxed mt-2 mb-2">{stat.label}</p>

      {stat.note && (
        <p className="font-body text-xs text-ink-muted italic leading-relaxed mb-2">{stat.note}</p>
      )}

      {/* Source + verification badge */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <a
          href={stat.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-sans text-[0.6rem] font-semibold tracking-wide uppercase hover:underline transition-colors text-crimson hover:text-crimson-dark"
          onClick={e => e.stopPropagation()}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          {stat.source}
        </a>
        <span className="font-sans text-[0.55rem] text-ink-faint">
          Verified {formatVerified(stat.lastVerified)}
        </span>
      </div>

      {/* Expandable detail panel */}
      {hasDetails && open && (
        <div className="mt-4 pt-4 border-t border-current/10 space-y-3" onClick={e => e.stopPropagation()}>
          {stat.details!.map((d, i) => (
            <div key={i}>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase mb-1 text-ink">{d.title}</p>
              <p className="font-body text-xs text-ink leading-relaxed">{d.text}</p>
              {d.sourceUrl && (
                <a href={d.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 font-sans text-[0.55rem] hover:underline text-crimson hover:text-crimson-dark">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  View source
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MONEY TRAIL NODE COMPONENT
   ═══════════════════════════════════════════════════════════ */
const NODE_COLORS = {
  legislation: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'file' },
  weapon: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'shield' },
  delivery: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'plane' },
  impact: { bg: 'bg-surface', border: 'border-border', color: '#1a1a1a', icon: 'warning' },
}

function MoneyTrailCard({ node }: { node: DossierMoneyTrailNode }) {
  const [open, setOpen] = useState(false)
  const style = NODE_COLORS[node.type]
  const childNodes = node.children?.map(cid => ISRAEL_DOSSIER_MONEY_TRAIL.find(n => n.id === cid)).filter(Boolean) as DossierMoneyTrailNode[] | undefined

  return (
    <div className={`border rounded-sm overflow-hidden transition-all duration-200 ${style.border} ${style.bg} ${childNodes ? 'cursor-pointer hover:shadow-md' : ''}`}>
      <div
        className="p-4 flex items-start gap-3"
        onClick={() => childNodes && setOpen(!open)}
        role={childNodes ? 'button' : undefined}
        tabIndex={childNodes ? 0 : undefined}
        onKeyDown={e => childNodes && e.key === 'Enter' && setOpen(!open)}
      >
        <span className="flex-shrink-0 mt-0.5 text-crimson"><TierIcon name={style.icon} className="w-5 h-5" /></span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-xl font-bold text-crimson">{node.amount}</span>
            <span className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full text-white bg-obsidian">
              {node.type}
            </span>
          </div>
          <p className="font-sans text-sm font-semibold text-ink mt-1">{node.label}</p>
          <p className="font-sans text-[0.6rem] text-ink-faint mt-0.5">{node.date}</p>
          <p className="font-body text-xs text-ink-muted leading-relaxed mt-2">{node.detail}</p>
          <a href={node.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.6rem] font-semibold hover:underline text-crimson hover:text-crimson-dark" onClick={e => e.stopPropagation()}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Source
          </a>
        </div>
        {childNodes && (
          <span className={`text-lg transition-transform duration-200 flex-shrink-0 text-ink-faint ${open ? 'rotate-180' : ''}`}>▾</span>
        )}
      </div>
      {/* Expanded children */}
      {open && childNodes && (
        <div className="border-t border-current/10 p-4 pl-10 space-y-3">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-muted mb-2">Where this money went →</p>
          {childNodes.map(child => (
            <MoneyTrailCard key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   INCIDENT CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function IncidentCard({ incident }: { incident: DossierDocumentedIncident }) {
  const [expanded, setExpanded] = useState(false)
  const MEDIA_ICONS: Record<string, string> = { video: 'video', investigation: 'search', 'photo-essay': 'camera', document: 'file' }

  return (
    <article className="border border-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div
        className="p-5 border-b border-border bg-surface cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase text-white ${
                incident.tier === 'verified' ? 'bg-obsidian' : 'bg-obsidian/70'
              }`}>
                {incident.tier === 'verified' ? '✓ Verified' : '◐ Circumstantial'}
              </span>
              {incident.casualties && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-sans font-bold bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
                  {incident.casualties.killed} killed{incident.casualties.injured ? ` · ${incident.casualties.injured} injured` : ''}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold text-ink leading-snug">{incident.title}</h3>
            <p className="font-sans text-xs text-ink-faint mt-1">{incident.date} — {incident.location}</p>
          </div>
          <span className={`text-lg transition-transform duration-200 flex-shrink-0 mt-2 ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>

        {/* Preview when collapsed */}
        {!expanded && (
          <p className="font-body text-sm text-ink-muted leading-relaxed mt-3 line-clamp-2">{incident.summary}</p>
        )}
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="p-5 space-y-5">
          {/* What Happened */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">What Happened</p>
            <p className="font-body text-sm text-ink leading-relaxed">{incident.summary}</p>
          </div>

          {/* Evidence */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Evidence</p>
            <p className="font-body text-sm text-ink leading-relaxed">{incident.evidence}</p>
          </div>

          {/* Multimedia Evidence */}
          {incident.multimedia.length > 0 && (
            <div>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Multimedia Evidence</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {incident.multimedia.map((m, j) => (
                  <a
                    key={j}
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-sm border border-border bg-surface hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group"
                  >
                    <span className="flex-shrink-0 text-crimson"><TierIcon name={MEDIA_ICONS[m.type] || 'file'} className="w-4 h-4" /></span>
                    <div>
                      <span className="font-sans text-[0.55rem] font-bold tracking-wider uppercase text-crimson">{m.type.replace('-', ' ')}</span>
                      <p className="font-sans text-xs text-ink group-hover:text-crimson transition-colors">{m.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          <div>
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Sources</p>
            <div className="space-y-1.5">
              {incident.sources.map((src, j) => (
                <a
                  key={j}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 font-sans text-xs text-crimson hover:text-crimson-dark transition-colors group"
                >
                  <svg className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="underline-offset-2 group-hover:underline">{src.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

/* ═══════════════════════════════════════════════════════════
   LIVE COUNTER — Days since Oct 7, 2023
   ═══════════════════════════════════════════════════════════ */
function LiveCounter() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const start = new Date('2023-10-07T06:30:00Z') // approximate start of Oct 7 attack
  const diffMs = now.getTime() - start.getTime()
  const days = Math.floor(diffMs / 86400000)
  const hours = Math.floor((diffMs % 86400000) / 3600000)
  const minutes = Math.floor((diffMs % 3600000) / 60000)
  const seconds = Math.floor((diffMs % 60000) / 1000)

  return (
    <div className="text-center py-8 px-4">
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">Time Since October 7, 2023</p>
      <div className="flex justify-center gap-3 sm:gap-6">
        {[
          { val: days, unit: 'Days' },
          { val: hours, unit: 'Hours' },
          { val: minutes, unit: 'Min' },
          { val: seconds, unit: 'Sec' },
        ].map(({ val, unit }) => (
          <div key={unit} className="text-center">
            <p className="font-display text-3xl sm:text-5xl font-bold text-crimson tabular-nums">{String(val).padStart(unit === 'Days' ? 1 : 2, '0')}</p>
            <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mt-1">{unit}</p>
          </div>
        ))}
      </div>
      <p className="font-sans text-[0.55rem] text-ink-faint mt-3">
        Live clock · {now.toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} UTC
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SECTION JUMP NAV
   ═══════════════════════════════════════════════════════════ */
const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'source-workbench', label: 'Sources' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'money-trail', label: 'Follow the Money' },
  { id: 'financial', label: 'U.S. Aid & Spending' },
  { id: 'humanitarian', label: 'Humanitarian Impact' },
  { id: 'legal', label: 'International Law' },
  { id: 'social', label: 'Domestic Policy' },
  { id: 'lobbying', label: 'AIPAC & Lobbying' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'incidents', label: 'Documented Incidents' },
  { id: 'downloads', label: 'Download & Share' },
  { id: 'methodology', label: 'Methodology' },
]

function JumpNav() {
  const [active, setActive] = useState('')
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.current!.observe(el)
    })
    return () => observer.current?.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-parchment/95 dark:bg-ink/95 backdrop-blur-sm border-b border-border py-2 -mx-6 px-6 mb-8 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`font-sans text-[0.6rem] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              active === s.id ? 'bg-crimson text-white' : 'text-ink-muted hover:text-crimson hover:bg-crimson/5'
            }`}
            onClick={e => {
              e.preventDefault()
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

interface SourceIndexRecord {
  label: string
  url: string
  category: DossierSourceCategory
  context: string
  tier?: 'verified' | 'circumstantial' | 'disputed'
}

function classifySource(label: string, url: string): DossierSourceCategory {
  const haystack = `${label} ${url}`.toLowerCase()
  if (/(congress\.gov|dsca\.mil|state\.gov|defense\.gov|foreignassistance\.gov|worldbank\.org|data\.worldbank\.org|mfa\.gov\.il|gov\.il|house\.gov|senate\.gov|fec\.gov|opensecrets\.org)/.test(haystack)) return 'public-record'
  if (/(un\.org|unrwa\.org|ochaopt\.org|ohchr\.org|unicef\.org|who\.int|icj-cij\.org|icc-cpi\.int|ipcinfo\.org|unosat\.org|unitar\.org|unesco\.org|wfp\.org)/.test(haystack)) return 'un-international'
  if (/(thelancet\.com|sipri\.org|tandfonline\.com|jstor\.org|doi\.org|max planck|university|academic)/.test(haystack)) return 'peer-reviewed'
  if (/(cpj\.org|btselem\.org|hrw\.org|dci-palestine\.org|airwars\.org|forensic-architecture\.org|euromedmonitor\.org|palestinelegal\.org|amnesty\.org|redcross|palestinercs\.org|wck\.org|hindrajabfoundation\.org)/.test(haystack)) return 'monitor-ngo'
  if (/(reuters\.com|apnews\.com|cnn\.com|npr\.org|bbc\.com|washingtonpost\.com|nbcnews\.com|aljazeera\.com|theguardian\.com|972mag\.com|bellingcat\.com|cbc\.ca|middleeasteye\.net|aa\.com\.tr|trtworld\.com|responsiblestatecraft\.org)/.test(haystack)) return 'press-osint'
  return 'other'
}

function normalizeIncidentKey(incident: DossierDocumentedIncident) {
  return `${incident.date}|${incident.location}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function dedupeIncidents(incidents: DossierDocumentedIncident[]) {
  const seen = new Set<string>()
  const deduped: DossierDocumentedIncident[] = []
  for (const incident of incidents) {
    const key = normalizeIncidentKey(incident)
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push(incident)
  }
  return deduped
}

function buildSourceIndex(): SourceIndexRecord[] {
  const records: SourceIndexRecord[] = []
  const push = (label: string, url: string | undefined, context: string, tier?: SourceIndexRecord['tier']) => {
    if (!url) return
    records.push({ label, url, context, tier, category: classifySource(label, url) })
  }

  ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS.forEach((record) => push(record.source, record.sourceUrl, `Latest record: ${record.label}`, 'verified'))
  ISRAEL_DOSSIER_CORE_STATS.forEach((stat) => {
    push(stat.source, stat.sourceUrl, `Statistic: ${stat.label}`, 'verified')
    stat.details?.forEach((detail) => push(detail.title, detail.sourceUrl, `Detail under ${stat.label}`, 'verified'))
  })
  HISTORICAL_TIMELINE.forEach((event) => push(event.source, event.sourceUrl, `Timeline: ${event.title}`, event.tier))
  ISRAEL_DOSSIER_MONEY_TRAIL.forEach((node) => push(node.label, node.sourceUrl, `Money trail: ${node.detail}`, 'verified'))
  dedupeIncidents([...ISRAEL_DOSSIER_CORE_INCIDENTS, ...EXPANDED_INCIDENTS]).forEach((incident) => {
    incident.sources.forEach((source) => push(source.label, source.url, `Incident: ${incident.title}`, incident.tier))
    incident.multimedia.forEach((source) => push(source.label, source.url, `Incident media: ${incident.title}`, incident.tier))
  })
  EXPANDED_STATS.forEach((stat) => {
    push(stat.source, stat.sourceUrl, `Expanded statistic: ${stat.label}`, stat.tier)
    stat.details?.forEach((detail) => push(detail.title, detail.sourceUrl, `Detail under ${stat.label}`, stat.tier))
  })
  LOBBYING_DATA.forEach((record) => push(record.source, record.sourceUrl, `Lobbying record: ${record.organization}`, 'verified'))
  LEGAL_CASES.forEach((legalCase) => push(legalCase.title, legalCase.sourceUrl, `Legal case: ${legalCase.court}`, 'verified'))

  const unique = new Map<string, SourceIndexRecord>()
  for (const record of records) {
    const existing = unique.get(record.url)
    if (existing) {
      existing.context = `${existing.context}; ${record.context}`
      continue
    }
    unique.set(record.url, record)
  }
  return Array.from(unique.values()).sort((a, b) => a.category.localeCompare(b.category) || a.label.localeCompare(b.label))
}

function DossierSourceWorkbench({ records }: { records: SourceIndexRecord[] }) {
  const [category, setCategory] = useState<'all' | DossierSourceCategory>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return records.filter((record) => {
      const categoryMatch = category === 'all' || record.category === category
      const queryMatch = !q || `${record.label} ${record.context} ${record.url}`.toLowerCase().includes(q)
      return categoryMatch && queryMatch
    })
  }, [category, query, records])

  const counts = useMemo(() => {
    const result = new Map<'all' | DossierSourceCategory, number>([['all', records.length]])
    for (const record of records) result.set(record.category, (result.get(record.category) ?? 0) + 1)
    return result
  }, [records])

  return (
    <section id="source-workbench" className="mb-16 scroll-mt-20 rounded-sm border border-border bg-surface p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted">Source Workbench</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">Audit the dossier by source class.</h2>
          <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-ink-muted">
            This index is generated from the live page data. Use it to separate public records, UN and international records,
            peer-reviewed research, monitoring organizations, and press or open-source investigations before relying on a claim.
          </p>
        </div>
        <div className="rounded-sm border border-border bg-parchment px-4 py-3">
          <p className="font-display text-3xl font-bold text-crimson">{records.length}</p>
          <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-faint">unique source URLs</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ISRAEL_DOSSIER_SOURCE_CATEGORY_META) as Array<'all' | DossierSourceCategory>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`min-h-[40px] rounded-full border px-3 font-sans text-[0.62rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                category === key ? 'border-crimson bg-crimson text-white' : 'border-border text-ink-muted hover:border-crimson hover:text-crimson'
              }`}
              title={ISRAEL_DOSSIER_SOURCE_CATEGORY_META[key].description}
            >
              {ISRAEL_DOSSIER_SOURCE_CATEGORY_META[key].label} ({counts.get(key) ?? 0})
            </button>
          ))}
        </div>
        <label className="block">
          <span className="sr-only">Search source index</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sources"
            className="min-h-[44px] w-full rounded-sm border border-border bg-parchment px-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-crimson focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        Showing {filtered.length} of {records.length} sources · {ISRAEL_DOSSIER_SOURCE_CATEGORY_META[category].description}
      </p>
      <div className="mt-4 grid max-h-[520px] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
        {filtered.map((record) => (
          <a
            key={record.url}
            href={record.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-sm border border-border bg-parchment p-3 transition-colors hover:border-crimson/40 hover:bg-parchment-dark/40"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-obsidian px-2 py-0.5 font-sans text-[0.52rem] font-bold uppercase tracking-[0.1em] text-white">
                {ISRAEL_DOSSIER_SOURCE_CATEGORY_META[record.category].label}
              </span>
              {record.tier && (
                <span className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  {record.tier}
                </span>
              )}
            </div>
            <p className="mt-2 font-sans text-sm font-bold text-ink group-hover:text-crimson">{record.label}</p>
            <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-ink-muted">{record.context}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function IsraelDossierPage() {
  const successPath = buildSubscriptionSuccessPath({
    source: 'article_cta',
    topic: 'israel-policy',
    interest: 'israel-dossier',
    returnTo: '/israel-dossier',
  })

  useEffect(() => {
    setMetaTags({
      title: 'The Israel Dossier | Veritas Worldwide',
      description: 'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — every figure sourced to government records, UN agencies, and verified reporting.',
      url: `${SITE_URL}/israel-dossier`,
      type: 'article',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'The Israel Dossier — A Documented Record',
      description: 'Interactive investigation: Follow U.S. taxpayer money from Congress to weapons to civilian impact. Every figure sourced to CRS, UN OCHA, ICJ, CPJ, and official records.',
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      datePublished: '2026-03-24',
      dateModified: new Date().toISOString().split('T')[0],
      isAccessibleForFree: true,
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const categories: DossierCategory[] = ['financial', 'humanitarian', 'legal', 'social']
  const [incidentQuery, setIncidentQuery] = useState('')
  const [incidentTier, setIncidentTier] = useState<'all' | DossierDocumentedIncident['tier']>('all')
  const sourceIndex = useMemo(() => buildSourceIndex(), [])
  const allIncidents = useMemo(() => dedupeIncidents([...ISRAEL_DOSSIER_CORE_INCIDENTS, ...EXPANDED_INCIDENTS]), [])
  const filteredIncidents = useMemo(() => {
    const q = incidentQuery.trim().toLowerCase()
    return allIncidents.filter((incident) => {
      const tierMatch = incidentTier === 'all' || incident.tier === incidentTier
      const queryMatch = !q || `${incident.title} ${incident.location} ${incident.summary} ${incident.evidence}`.toLowerCase().includes(q)
      return tierMatch && queryMatch
    })
  }, [allIncidents, incidentQuery, incidentTier])
  const totalIncidentDeaths = allIncidents.reduce((sum, i) => sum + (i.casualties?.killed ?? 0), 0)
  const verifiedIncidentCount = allIncidents.filter((incident) => incident.tier === 'verified').length

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ReadingProgress />
      {/* ─── MASTHEAD ─── */}
      <header id="overview" className="text-center mb-6 border-b border-border pb-10">
        <p className="chapter-label mb-4">Special Investigation</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          The Israel Dossier
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6">
          An interactive documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — compiled from government records, UN agencies, and verified investigative reporting.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs font-sans text-ink-faint mb-6">
          <span>Sources: CRS</span><span className="text-ink-faint/30">·</span>
          <span>UN OCHA</span><span className="text-ink-faint/30">·</span>
          <span>ICJ</span><span className="text-ink-faint/30">·</span>
          <span>CPJ</span><span className="text-ink-faint/30">·</span>
          <span>B&apos;Tselem</span><span className="text-ink-faint/30">·</span>
          <span>OHCHR</span><span className="text-ink-faint/30">·</span>
          <span>The Lancet</span><span className="text-ink-faint/30">·</span>
          <span>Forensic Architecture</span><span className="text-ink-faint/30">·</span>
          <span>UNICEF</span><span className="text-ink-faint/30">·</span>
          <span>SIPRI</span>
        </div>

        {/* Key numbers bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
          {ISRAEL_DOSSIER_LATEST_PUBLIC_RECORDS.map((record) => (
            <a
              key={record.label}
              href={record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-sm border border-border bg-surface text-center hover:border-crimson/40 transition-colors"
              title={`${record.source}: ${record.note}`}
            >
              <p className="font-display text-2xl md:text-3xl font-bold text-crimson">{record.value}</p>
              <p className="font-sans text-[0.6rem] font-semibold tracking-wider uppercase text-ink-faint mt-1 group-hover:text-crimson">{record.label}</p>
            </a>
          ))}
        </div>
        <p className="mt-3 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Latest public-record check: {formatVerified(ISRAEL_DOSSIER_LAST_VERIFIED)}
        </p>
      </header>

      {/* Live Counter */}
      <LiveCounter />

      {/* Jump Nav */}
      <JumpNav />

      {/* ─── EDITORIAL NOTE ─── */}
      <div className="mb-12 p-5 border border-border rounded-sm bg-surface">
        <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-2">Editorial Note</p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          This page presents sourced public-record claims, reported figures, survey estimates, and analysis as separate evidence classes. Every figure links to its original source. Click any statistic card to expand it and see what the source can prove, what remains disputed, and where the public record stops. Reported casualty figures are attributed to the body that reported them; they are not presented as final adjudicated findings unless the cited source says so.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <DossierPDF />
        </div>
      </div>

      <DossierSourceWorkbench records={sourceIndex} />

      {/* ═══════════════════════════════════════════════════════════
         HISTORICAL TIMELINE — From Balfour to Present
         ═══════════════════════════════════════════════════════════ */}
      <section id="timeline" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Historical Timeline: 1917–Present</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          A chronological record of key events from the Balfour Declaration to the present day. Every entry identifies its source class and links to the underlying record.
        </p>
        <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
          {HISTORICAL_TIMELINE.length} documented events · Click any source to verify
        </p>
        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-1">
            {HISTORICAL_TIMELINE.map((event, i) => (
              <div key={i} className="relative pl-12 pb-4">
                <div className="absolute left-[14px] top-1.5 w-[17px] h-[17px] rounded-full border-2 border-crimson bg-parchment dark:bg-ink flex items-center justify-center z-10">
                  <div className="w-[7px] h-[7px] rounded-full bg-crimson" />
                </div>
                <div className="p-4 rounded-sm border border-border bg-surface hover:border-crimson/20 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    {event.imageUrl && (
                      <img src={event.imageUrl} alt={event.title} loading="lazy" className="w-16 h-16 object-cover rounded-sm flex-shrink-0 hidden sm:block" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-display text-lg font-bold text-crimson">{event.year}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-sans font-bold tracking-wider uppercase text-white ${event.tier === 'verified' ? 'bg-obsidian' : 'bg-obsidian/70'}`}>
                          {event.tier === 'verified' ? '✓ Verified' : '◐ Circumstantial'}
                        </span>
                      </div>
                      <h3 className="font-sans text-sm font-bold text-ink mb-1">{event.title}</h3>
                      <p className="font-body text-xs text-ink-muted leading-relaxed">{event.description}</p>
                      <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline transition-colors">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        {event.source}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         FOLLOW THE MONEY — Interactive Money Trail
         ═══════════════════════════════════════════════════════════ */}
      <section id="money-trail" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-ink" />
          <h2 className="font-display text-2xl font-bold text-ink">Follow the Money</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          Click any node to trace U.S. taxpayer dollars from Congress → weapons procurement → delivery → documented civilian impact. Every link in the chain is sourced.
        </p>
        <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
          Interactive — click to expand each level
        </p>

        <div className="space-y-3">
          {ISRAEL_DOSSIER_MONEY_TRAIL.filter(n => n.type === 'legislation' || n.type === 'delivery').map(node => (
            <MoneyTrailCard key={node.id} node={node} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         STATISTICS BY CATEGORY — Interactive expandable cards
         ═══════════════════════════════════════════════════════════ */}
      {categories.map(cat => {
        const meta = CATEGORY_META[cat]
        const items = ISRAEL_DOSSIER_CORE_STATS.filter(s => s.category === cat)
        return (
          <section key={cat} id={cat} className="mb-14 scroll-mt-20">
            {/* Section Header Image */}
            {meta.headerImage && (
              <div className="mb-5 -mx-4 sm:-mx-6 overflow-hidden rounded-sm">
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img src={meta.headerImage} alt={meta.label} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).closest('.relative')?.classList.add('hidden') }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{meta.label}</h2>
                    </div>
                    {meta.headerCaption && <p className="font-sans text-[0.6rem] text-white/60 mt-1">{meta.headerCaption}</p>}
                  </div>
                </div>
              </div>
            )}
            {!meta.headerImage && (
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
                <h2 className="font-display text-2xl font-bold text-ink">{meta.label}</h2>
              </div>
            )}
            <p className="font-sans text-[0.55rem] font-semibold tracking-wider uppercase text-ink-faint mb-6">
              {items.filter(s => s.details?.length).length} of {items.length} cards have expandable details — click to explore
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((stat, i) => (
                <InteractiveStatCard key={i} stat={stat} meta={meta} />
              ))}
            </div>
          </section>
        )
      })}

      {/* ═══════════════════════════════════════════════════════════
         AIPAC & CONGRESSIONAL LOBBYING
         ═══════════════════════════════════════════════════════════ */}
      <section id="lobbying" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">AIPAC & Congressional Lobbying</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6 max-w-3xl">
          The pro-Israel lobby was the single largest source of PAC spending in the 2024 federal election cycle. Every dollar traced through FEC filings.
        </p>
        <div className="space-y-3">
          {LOBBYING_DATA.map((record, i) => (
            <div key={i} className="p-4 border border-border rounded-sm bg-surface hover:border-crimson/20 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-display text-xl font-bold text-crimson">{record.amount}</span>
                    <span className="font-sans text-[0.55rem] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-obsidian text-white">{record.cycle}</span>
                  </div>
                  <p className="font-sans text-sm font-bold text-ink">{record.organization}</p>
                  <p className="font-body text-xs text-ink-muted mt-1">Recipients: {record.recipients}</p>
                  {record.note && <p className="font-body text-xs text-ink-muted italic mt-1">{record.note}</p>}
                </div>
                <a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  {record.source}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Cases */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mt-10 mb-4">International Legal Record</h3>
        <div className="space-y-3">
          {LEGAL_CASES.map((legalCase, i) => (
            <div key={i} className="p-4 border border-border rounded-sm bg-surface">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.55rem] font-sans font-bold tracking-wider uppercase text-white ${legalCase.status === 'decided' ? 'bg-obsidian' : legalCase.status === 'ongoing' ? 'bg-crimson' : 'bg-obsidian/70'}`}>
                  {legalCase.status}
                </span>
                <span className="font-sans text-[0.55rem] text-ink-faint">{legalCase.court} · {legalCase.date}</span>
              </div>
              <h4 className="font-sans text-sm font-bold text-ink mb-1">{legalCase.title}</h4>
              <p className="font-body text-xs text-ink-muted leading-relaxed mb-1">{legalCase.ruling}</p>
              <p className="font-body text-xs text-ink-muted italic leading-relaxed mb-2">{legalCase.significance}</p>
              <a href={legalCase.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View ruling
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         INFRASTRUCTURE DESTRUCTION
         ═══════════════════════════════════════════════════════════ */}
      <section id="infrastructure" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Infrastructure Destruction & Expanded Data</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6 max-w-3xl">
          Additional documented statistics covering infrastructure, domestic policy, lobbying, and comparative analysis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPANDED_STATS.map((stat, i) => (
            <div key={i} className="p-5 rounded-sm border border-border bg-surface hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                {stat.imageUrl && (
                  <img src={stat.imageUrl} alt={stat.label} loading="lazy" className="w-14 h-14 object-cover rounded-sm flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-3xl md:text-4xl font-bold leading-tight text-crimson">{stat.value}</p>
                    {stat.tier && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.5rem] font-sans font-bold tracking-wider uppercase text-white flex-shrink-0 ${stat.tier === 'verified' ? 'bg-obsidian' : 'bg-obsidian/70'}`}>
                        {stat.tier === 'verified' ? '✓' : '◐'}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-ink leading-relaxed mt-2">{stat.label}</p>
                  {stat.note && <p className="font-body text-xs text-ink-muted italic mt-1">{stat.note}</p>}
                  {stat.details && stat.details.map((d, j) => (
                    <div key={j} className="mt-2 pt-2 border-t border-current/5">
                      <p className="font-sans text-[0.55rem] font-bold tracking-wider uppercase text-ink-muted mb-0.5">{d.title}</p>
                      <p className="font-body text-xs text-ink-muted leading-relaxed">{d.text}</p>
                    </div>
                  ))}
                  <a href={stat.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 font-sans text-[0.55rem] font-semibold text-crimson hover:text-crimson-dark hover:underline">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    {stat.source}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         DOCUMENTED INCIDENTS — Expandable with multimedia (ORIGINAL + EXPANDED)
         ═══════════════════════════════════════════════════════════ */}
      <section id="incidents" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Documented Incidents</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-3xl">
          The following incidents are documented through multiple independent sources including video evidence, forensic analysis, and official investigations. Each entry includes multimedia evidence links — videos, forensic reconstructions, and investigative reports you can verify yourself.
        </p>
        <div className="flex flex-wrap gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
            {allIncidents.length} deduped incidents documented
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300">
            {totalIncidentDeaths.toLocaleString()}+ killed in these incidents alone
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6rem] font-sans font-bold tracking-wider uppercase bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300">
            {verifiedIncidentCount} verified · {allIncidents.length - verifiedIncidentCount} circumstantial / disputed-record entries
          </span>
        </div>

        <div className="mb-6 grid gap-3 rounded-sm border border-border bg-surface p-4 md:grid-cols-[minmax(0,1fr)_180px]">
          <label className="block">
            <span className="sr-only">Search documented incidents</span>
            <input
              value={incidentQuery}
              onChange={(event) => setIncidentQuery(event.target.value)}
              placeholder="Search incidents, locations, evidence, or source language"
              className="min-h-[44px] w-full rounded-sm border border-border bg-parchment px-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-crimson focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="sr-only">Filter incidents by evidence tier</span>
            <select
              value={incidentTier}
              onChange={(event) => setIncidentTier(event.target.value as 'all' | DossierDocumentedIncident['tier'])}
              className="min-h-[44px] w-full rounded-sm border border-border bg-parchment px-3 font-sans text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="all">All evidence tiers</option>
              <option value="verified">Verified only</option>
              <option value="circumstantial">Circumstantial only</option>
            </select>
          </label>
          <p className="md:col-span-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Showing {filteredIncidents.length} of {allIncidents.length}. Duplicate incident records are merged by date and location to avoid double-counting.
          </p>
        </div>

        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <IncidentCard key={`${incident.date}-${incident.location}-${incident.title}`} incident={incident} />
          ))}
          {filteredIncidents.length === 0 && (
            <div className="rounded-sm border border-border bg-surface p-5">
              <p className="font-body text-sm text-ink-muted">No incidents match the current filters.</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 border border-border rounded-sm bg-surface">
          <p className="font-body text-xs text-ink-muted italic leading-relaxed">
            This is not an exhaustive list. Thousands of additional incidents have been documented by Airwars, OHCHR, Al Jazeera, and other monitoring organizations. These {allIncidents.length} entries were selected for the strength and independence of their evidence.
            <a href="https://gaza-patterns-harm.airwars.org/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline ml-1">
              View the Airwars Gaza Patterns of Harm database →
            </a>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         EVIDENCE MEDIA GALLERY — Embedded video & photographic evidence
         ═══════════════════════════════════════════════════════════ */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Evidence Media Gallery</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 max-w-3xl">
          Primary source video evidence, investigative journalism, and forensic analysis. Watch the documented record — every video below comes from established news organizations, UN agencies, or verified open-source investigators.
        </p>

        {/* Embedded Videos */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            { id: 'sYzmBJfFra8', title: 'Al Jazeera Investigation: Gaza\'s Killing Zone', caption: 'Forensic analysis of Israeli military targeting patterns in designated "safe zones" using satellite imagery and survivor testimony.' },
            { id: 'XJ-5mMOsBqA', title: 'Forensic Architecture: Destruction of Medical Infrastructure', caption: 'Spatial analysis documenting the systematic targeting of hospitals, clinics, and ambulances across Gaza.' },
            { id: 'kVECk17Hwzs', title: 'PBS Frontline: The U.S. & Israel\'s War in Gaza', caption: 'In-depth PBS investigation into U.S. weapons transfers and their documented use in civilian areas.' },
            { id: 'oGalFi-NMBI', title: 'UN Human Rights Council: Report on Gaza', caption: 'Official UN presentation of documented human rights violations, including evidence of disproportionate force against civilians.' },
          ].map(v => (
            <div key={v.id} className="rounded-sm overflow-hidden border border-border bg-surface">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans text-sm font-bold text-ink mb-1">{v.title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed">{v.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Photographic Evidence */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">Key Photographic Evidence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { src: ISRAEL_DOSSIER_ASSETS.humanitarian, alt: 'Veritas Israel dossier humanitarian impact card', caption: 'Humanitarian impact — sourced casualty, displacement, and infrastructure records' },
            { src: ISRAEL_DOSSIER_ASSETS.legal, alt: 'Veritas Israel dossier international law card', caption: 'International law — ICJ, ICC, UN, and treaty-record source classes' },
            { src: ISRAEL_DOSSIER_ASSETS.financial, alt: 'Veritas Israel dossier U.S. aid card', caption: 'U.S. aid — CRS, Congress.gov, FEC, and OpenSecrets records' },
          ].map((img, i) => (
            <a key={i} href={img.src.replace('/thumb/', '/').replace(/\/\d+px-[^/]+$/, '')} target="_blank" rel="noopener noreferrer" className="group block rounded-sm overflow-hidden border border-border hover:border-crimson/40 transition-colors">
              <div className="aspect-[4/3] overflow-hidden bg-parchment-dark">
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).closest('a')?.classList.add('hidden') }} />
              </div>
              <p className="p-2 font-sans text-[0.6rem] text-ink-muted leading-snug">{img.caption}</p>
            </a>
          ))}
        </div>

        {/* Primary Source Documents */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">Primary Source Documents</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'ICJ Advisory Opinion — Legality of Occupation (2024)', url: 'https://www.icj-cij.org/node/204176', icon: 'scale' },
            { label: 'ICC Arrest Warrants — Netanyahu & Gallant', url: 'https://www.icc-cpi.int/situations/palestine', icon: 'file' },
            { label: 'CRS Report RL33222 — U.S. Aid to Israel', url: 'https://www.congress.gov/crs-product/RL33222', icon: 'money' },
            { label: 'Lancet: Mortality Study (Jan 2025)', url: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext', icon: 'search' },
            { label: 'OHCHR Gaza Update Report (Nov 2024)', url: 'https://www.ohchr.org/sites/default/files/documents/countries/opt/20241106-Gaza-Update-Report-OPT.pdf', icon: 'file' },
            { label: 'Airwars — Gaza Patterns of Harm Database', url: 'https://gaza-patterns-harm.airwars.org/', icon: 'search' },
          ].map((doc, i) => (
            <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-sm border border-border bg-surface hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group">
              <span className="flex-shrink-0 mt-0.5 text-crimson"><TierIcon name={doc.icon} className="w-4 h-4" /></span>
              <span className="font-sans text-xs text-ink group-hover:text-crimson transition-colors leading-snug">{doc.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         DOWNLOAD & SHARE — Carousels, Pinned Posts, PDF
         ═══════════════════════════════════════════════════════════ */}
      <section id="downloads" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full flex-shrink-0 bg-crimson" />
          <h2 className="font-display text-2xl font-bold text-ink">Download & Share</h2>
        </div>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 max-w-3xl">
          Download the complete dossier as a PDF, share a 10-slide Instagram carousel, or pin high-impact images to your profile. Every asset is free to use — the documented record only matters if people see it.
        </p>

        {/* PDF Download */}
        <div className="mb-8 p-5 border border-border rounded-sm bg-surface">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-1">Complete Document</p>
              <p className="font-body text-sm text-ink-muted">Download the entire Israel Dossier as a print-quality PDF with all statistics, incidents, and sources.</p>
            </div>
            <DossierPDF />
          </div>
        </div>

        {/* Instagram Carousel */}
        <div className="mb-8">
          <CarouselDownloader
            slides={ISRAEL_DOSSIER_CAROUSEL}
            title="The Israel Dossier — 10 Slides That Matter"
            filenamePrefix="veritas-israel-dossier"
          />
        </div>

        {/* Pinned Profile Posts */}
        <div className="mb-8">
          <PinnedPostDownloader posts={PINNED_POSTS} />
        </div>
      </section>

      {/* ─── RELATED CHAPTERS ─── */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold text-ink mb-6">Related Chapters in The Record</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'chapter-6', title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', num: '6' },
            { id: 'chapter-7', title: 'Mossad: The Institute', num: '7' },
            { id: 'chapter-8', title: 'JFK, Dimona & AIPAC', num: '8' },
            { id: 'chapter-14', title: 'AIPAC & Congressional Lobbying', num: '14' },
            { id: 'chapter-15', title: 'U.S. Foreign Aid to Israel', num: '15' },
            { id: 'chapter-16', title: 'The USS Liberty Incident', num: '16' },
          ].map(ch => (
            <Link
              key={ch.id}
              to={`/chapter/${ch.id}`}
              className="p-4 border border-border rounded-sm hover:border-crimson/30 hover:bg-parchment-dark/10 transition-all group"
            >
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson mb-1">Chapter {ch.num}</p>
              <p className="font-display text-sm font-bold text-ink group-hover:text-crimson transition-colors">{ch.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── METHODOLOGY ─── */}
      <section id="methodology" className="mb-12 p-5 border border-border rounded-sm bg-surface scroll-mt-20">
        <h2 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-3">Source Methodology</h2>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
          Every statistic on this page is sourced to one or more of the following categories of primary evidence: official government publications (Congressional Research Service, Israeli Ministry of Health, Bituach Leumi), international body records (UN OCHA, ICJ, OHCHR, UNSC), verified independent organizations (CPJ, B&apos;Tselem, DCIP, Airwars), peer-reviewed research (The Lancet, Max Planck Institute), and established investigative journalism (Washington Post, CNN, NPR, NBC News, Al Jazeera, Forensic Architecture) with named sources and corroborating evidence.
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
          Where figures are disputed or represent estimates with methodological uncertainty, this is noted. All "last verified" dates indicate when the editorial team last confirmed the source was active and the figure unchanged.
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          Readers are encouraged to verify all claims independently using the linked primary sources. If you find an error or an outdated figure, contact <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">rights@veritasworldwide.com</a>.
        </p>
      </section>

      {/* ─── SHARE BAR ─── */}
      <div className="mb-12 p-5 border border-border rounded-sm bg-surface text-center">
        <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink-muted mb-3">Share This Investigation</p>
        <p className="font-body text-sm text-ink-muted mb-4">If this page informed you, share it. The documented record only matters if people see it.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('The Israel Dossier — every statistic sourced, every dollar traced, every incident documented.')}&url=${encodeURIComponent(SITE_URL + '/israel-dossier')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-obsidian text-white font-sans text-xs font-semibold tracking-wide rounded-sm hover:bg-obsidian/80 transition-colors"
          >
            Share on X / Twitter
          </a>
          <button
            onClick={() => { navigator.clipboard.writeText(SITE_URL + '/israel-dossier'); alert('Link copied to clipboard') }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-ink font-sans text-xs font-semibold tracking-wide rounded-sm hover:border-crimson hover:text-crimson transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* ─── DONATION CTA ─── */}
      <section className="p-8 bg-obsidian text-white rounded-sm text-center mb-12">
        <p className="font-body text-sm italic text-white/60 mb-4">
          Documenting the public record takes time and resources. If this page informed you, consider supporting the work.
        </p>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          onClick={() => trackSupportClick('israel-dossier')}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support This Work
        </a>
        <p className="font-sans text-[0.6rem] text-white/30 mt-3">
          Processed securely via Stripe &middot; No account required
        </p>
      </section>

      {/* Ad — one per page, hidden for subscribers */}
      <AdBanner slot="dossier-bottom" format="horizontal" />

      {/* Share */}
      <SharePanel
        title="The Israel Dossier — Veritas Worldwide"
        description="A documented record of U.S.-Israel policy, military spending, and humanitarian impact. Every figure sourced to government records and UN agencies."
        contentId="israel-dossier"
      />

      {/* Dispute This Content */}
      <DisputeStory pageId="israel-dossier" pageTitle="The Israel Dossier" />

      {/* Community Forum */}
      <CommunityForum pageId="israel-dossier" pageTitle="The Israel Dossier" />

      {/* ─── Newsletter CTA ─── */}
      <NewsletterSignup
        variant="dark"
        source="article_cta"
        contentInterest="israel-dossier"
        successPath={successPath}
      />

      {/* Scroll-depth content gate */}
      <ContentGate triggerDepth={40} contentInterest="israel-dossier" />

      {/* ─── BOTTOM NAV ─── */}
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
        <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
          Read The Record
        </Link>
        <Link to="/chapter/chapter-15" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Ch. 15: U.S. Foreign Aid to Israel
        </Link>
        <Link to="/sources" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          Source Library
        </Link>
        <Link to="/deep-state" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
          The Deep State — Epstein Network
        </Link>
      </div>
    </div>
  )
}
