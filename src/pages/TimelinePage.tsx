import { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { chapterMeta } from '../data/chapterMeta'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

interface TimelineEntry {
  chapterId: string
  chapterNumber: string
  title: string
  subtitle: string
  dateRange: string
  startYear: number
  endYear: number
}

function parseYearRange(dateRange: string): { start: number; end: number } | null {
  if (!dateRange || dateRange === 'Explainer') return null
  const cleaned = dateRange.replace(/[^\d–\-—]/g, '')
  const parts = cleaned.split(/[–\-—]/)
  const start = parseInt(parts[0], 10)
  if (isNaN(start)) return null
  let end = start
  if (parts.length > 1 && parts[1]) {
    if (parts[1].toLowerCase() === 'present' || parts[1] === '') {
      end = 2026
    } else {
      end = parseInt(parts[1], 10)
      if (isNaN(end)) end = start
    }
  }
  if (dateRange.includes('Present')) end = 2026
  return { start, end }
}

function getEra(year: number): { name: string; color: string } {
  if (year < 1900) return { name: 'Pre-Modern Era', color: '#8B7355' }
  if (year < 1920) return { name: 'Progressive Era', color: '#2E5A3E' }
  if (year < 1945) return { name: 'World Wars', color: '#8B1A1A' }
  if (year < 1970) return { name: 'Cold War', color: '#1E3A5F' }
  if (year < 2000) return { name: 'Late 20th Century', color: '#5C3D6E' }
  return { name: '21st Century', color: '#166534' }
}

export default function TimelinePage() {
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null)
  const [filterEra, setFilterEra] = useState<string | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMetaTags({
      title: `Interactive Timeline | ${SITE_NAME}`,
      description: 'An interactive chronological timeline of events documented in The Record, spanning from 1694 to present. Explore 32 archive parts of primary source history.',
      url: `${SITE_URL}/timeline`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Interactive Timeline | ${SITE_NAME}`,
      'description': 'A chronological timeline of 32 archive parts spanning 330+ years of documented history from primary sources.',
      'url': `${SITE_URL}/timeline`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const entries = useMemo(() => {
    const parsed: TimelineEntry[] = []
    for (const ch of chapterMeta) {
      if (ch.id === 'front-matter') continue
      const range = parseYearRange(ch.dateRange)
      if (!range) continue
      parsed.push({
        chapterId: ch.id,
        chapterNumber: ch.number,
        title: ch.title,
        subtitle: ch.subtitle,
        dateRange: ch.dateRange,
        startYear: range.start,
        endYear: range.end,
      })
    }
    return parsed.sort((a, b) => a.startYear - b.startYear || a.endYear - b.endYear)
  }, [])

  const eras = useMemo(() => {
    const eraMap = new Map<string, { name: string; color: string; count: number }>()
    for (const e of entries) {
      const era = getEra(e.startYear)
      const existing = eraMap.get(era.name)
      if (existing) existing.count++
      else eraMap.set(era.name, { ...era, count: 1 })
    }
    return Array.from(eraMap.values())
  }, [entries])

  const filteredEntries = useMemo(() => {
    if (!filterEra) return entries
    return entries.filter(e => getEra(e.startYear).name === filterEra)
  }, [entries, filterEra])

  const minYear = useMemo(() => Math.min(...entries.map(e => e.startYear)), [entries])
  const maxYear = 2026

  useEffect(() => {
    if (filterEra && timelineRef.current) {
      timelineRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [filterEra])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Timeline</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column */}
          <article className="max-w-none">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
              The Timeline
            </h1>
            <p className="font-serif text-lg text-ink-muted leading-relaxed mb-8 border-b border-border pb-8">
              A chronological map of the events, institutions, and turning points documented across
              all {entries.length} chapters of The Record — spanning {minYear} to the present day.
            </p>

            {/* Era Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setFilterEra(null)}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-sans font-medium transition-all ${
                  !filterEra
                    ? 'bg-ink text-parchment'
                    : 'bg-parchment-dark/30 text-ink-muted hover:bg-parchment-dark/50'
                }`}
              >
                All ({entries.length})
              </button>
              {eras.map(era => (
                <button
                  key={era.name}
                  onClick={() => setFilterEra(filterEra === era.name ? null : era.name)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-sans font-medium transition-all ${
                    filterEra === era.name
                      ? 'text-parchment'
                      : 'bg-parchment-dark/30 text-ink-muted hover:bg-parchment-dark/50'
                  }`}
                  style={filterEra === era.name ? { backgroundColor: era.color } : undefined}
                >
                  {era.name} ({era.count})
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-ink/10" />

              {filteredEntries.map((entry) => {
                const era = getEra(entry.startYear)
                const isHovered = hoveredChapter === entry.chapterId
                const spanWidth = Math.max(
                  8,
                  Math.min(100, ((entry.endYear - entry.startYear) / (maxYear - minYear)) * 100)
                )

                return (
                  <div
                    key={entry.chapterId}
                    className="relative flex items-start mb-6"
                    onMouseEnter={() => setHoveredChapter(entry.chapterId)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-6 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10 transition-all duration-200"
                      style={{
                        borderColor: era.color,
                        backgroundColor: isHovered ? era.color : 'var(--color-parchment, #F5F0E8)',
                        transform: `translateX(-50%) ${isHovered ? 'scale(1.5)' : 'scale(1)'}`,
                      }}
                    />

                    {/* Content card */}
                    <div className="ml-14 flex-1">
                      <Link
                        to={`/chapter/${entry.chapterId}`}
                        className={`block p-5 rounded-lg border transition-all duration-200 ${
                          isHovered
                            ? 'border-ink/20 shadow-md bg-parchment-dark/20 -translate-y-0.5'
                            : 'border-transparent hover:border-ink/10 hover:bg-parchment-dark/10'
                        }`}
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide mb-2 text-white"
                          style={{ backgroundColor: era.color }}
                        >
                          {entry.dateRange}
                        </span>
                        <p className="font-sans text-xs font-medium text-ink-muted tracking-wider uppercase mt-2">
                          {entry.chapterNumber.startsWith('Ch') ? entry.chapterNumber : `Chapter ${entry.chapterNumber}`}
                        </p>
                        <h3 className="font-display text-lg font-bold text-ink mt-1 leading-snug">
                          {entry.title}
                        </h3>
                        <p className="font-serif text-sm text-ink-muted mt-1 leading-relaxed line-clamp-2">
                          {entry.subtitle}
                        </p>
                        <div className="mt-3 h-1.5 bg-ink/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${spanWidth}%`,
                              backgroundColor: era.color,
                              opacity: isHovered ? 1 : 0.6,
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary stats */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="font-display text-3xl font-bold text-ink">{entries.length}</p>
                  <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Chapters</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">{maxYear - minYear}+</p>
                  <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Years</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">{eras.length}</p>
                  <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Eras</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink">{minYear}</p>
                  <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Earliest</p>
                </div>
              </div>
            </div>
          </article>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Era Legend */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Historical Eras</h3>
                <div className="space-y-3">
                  {eras.map(era => (
                    <button
                      key={era.name}
                      onClick={() => setFilterEra(filterEra === era.name ? null : era.name)}
                      className={`flex items-center gap-2 w-full text-left group transition-colors ${
                        filterEra === era.name ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: era.color }} />
                      <span className="text-sm text-ink group-hover:text-crimson transition-colors flex-1">{era.name}</span>
                      <span className="text-xs text-ink-faint">{era.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* At a Glance */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">At a Glance</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Chapters</dt>
                    <dd className="font-medium text-ink">{entries.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Time Span</dt>
                    <dd className="font-medium text-ink">{minYear}–{maxYear}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Eras</dt>
                    <dd className="font-medium text-ink">{eras.length}</dd>
                  </div>
                  {filterEra && (
                    <div className="flex justify-between border-t border-border pt-3">
                      <dt className="text-ink-muted">Filtered</dt>
                      <dd className="font-medium text-crimson">{filteredEntries.length}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Related Pages */}
              <div className="bg-surface border border-border rounded-lg p-5">
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Related Pages</h3>
                <nav className="space-y-2">
                  <Link to="/methodology" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/sources" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Sources
                  </Link>
                  <Link to="/power-profiles" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Power Profiles
                  </Link>
                  <Link to="/search" className="block text-sm text-ink-muted hover:text-crimson transition-colors">
                    → Search
                  </Link>
                </nav>
              </div>

              {/* Support CTA */}
              <div className="bg-crimson/5 border border-crimson/20 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-ink mb-2">Support This Work</h3>
                <p className="text-xs text-ink-muted mb-3">Independent, source-verified research spanning {maxYear - minYear}+ years of documented history.</p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-crimson text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-crimson-dark transition-colors"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
