import { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { chapterMeta } from '../data/chapterMeta'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

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
  // Handle "Present" in original string
  if (dateRange.includes('Present')) end = 2026
  return { start, end }
}

// Group chapters into historical eras
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

  // SEO meta tags + JSON-LD
  useEffect(() => {
    setMetaTags({
      title: `Interactive Timeline | ${SITE_NAME}`,
      description: 'An interactive chronological timeline of events documented in The Record, spanning from 1694 to present. Explore 31 chapters of primary source history.',
      url: `${SITE_URL}/timeline`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Interactive Timeline | ${SITE_NAME}`,
      'description': 'A chronological timeline of 31 chapters spanning 330+ years of documented history from primary sources.',
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
      if (existing) {
        existing.count++
      } else {
        eraMap.set(era.name, { ...era, count: 1 })
      }
    }
    return Array.from(eraMap.values())
  }, [entries])

  const filteredEntries = useMemo(() => {
    if (!filterEra) return entries
    return entries.filter(e => getEra(e.startYear).name === filterEra)
  }, [entries, filterEra])

  const minYear = useMemo(() => Math.min(...entries.map(e => e.startYear)), [entries])
  const maxYear = 2026

  // Scroll to current era on filter
  useEffect(() => {
    if (filterEra && timelineRef.current) {
      timelineRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [filterEra])

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
          The Timeline
        </h1>
        <p className="font-serif text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          A chronological map of the events, institutions, and turning points documented across
          all {entries.length} chapters of The Record — spanning {minYear} to the present day.
        </p>
      </div>

      {/* Era Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setFilterEra(null)}
          className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-sans font-medium transition-all ${
            !filterEra
              ? 'bg-ink text-parchment'
              : 'bg-parchment-dark/30 text-ink-muted hover:bg-parchment-dark/50'
          }`}
        >
          All Eras ({entries.length})
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
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ink/10 -translate-x-1/2" />

        {filteredEntries.map((entry, i) => {
          const era = getEra(entry.startYear)
          const isLeft = i % 2 === 0
          const isHovered = hoveredChapter === entry.chapterId
          const spanWidth = Math.max(
            8,
            Math.min(100, ((entry.endYear - entry.startYear) / (maxYear - minYear)) * 100)
          )

          return (
            <div
              key={entry.chapterId}
              className={`relative flex items-start mb-8 md:mb-6 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              onMouseEnter={() => setHoveredChapter(entry.chapterId)}
              onMouseLeave={() => setHoveredChapter(null)}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10 transition-all duration-200"
                style={{
                  borderColor: era.color,
                  backgroundColor: isHovered ? era.color : 'var(--color-parchment, #F5F0E8)',
                  transform: `translateX(-50%) ${isHovered ? 'scale(1.5)' : 'scale(1)'}`,
                }}
              />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                }`}
              >
                <Link
                  to={`/chapter/${entry.chapterId}`}
                  className={`block p-5 rounded-lg border transition-all duration-200 ${
                    isHovered
                      ? 'border-ink/20 shadow-md bg-parchment-dark/20 -translate-y-0.5'
                      : 'border-transparent hover:border-ink/10 hover:bg-parchment-dark/10'
                  }`}
                >
                  {/* Date badge */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wide mb-2 text-white"
                    style={{ backgroundColor: era.color }}
                  >
                    {entry.dateRange}
                  </span>

                  {/* Chapter number */}
                  <p className="font-sans text-xs font-medium text-ink-muted tracking-wider uppercase mt-2">
                    {entry.chapterNumber.startsWith('Ch') ? entry.chapterNumber : `Chapter ${entry.chapterNumber}`}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-ink mt-1 leading-snug">
                    {entry.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-serif text-sm text-ink-muted mt-1 leading-relaxed">
                    {entry.subtitle}
                  </p>

                  {/* Time span bar */}
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
      <div className="mt-16 pt-8 border-t border-ink/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-ink">{entries.length}</p>
            <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Chapters</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-ink">{maxYear - minYear}+</p>
            <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Years Covered</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-ink">{eras.length}</p>
            <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Historical Eras</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-ink">{minYear}</p>
            <p className="font-sans text-xs text-ink-muted tracking-wider uppercase mt-1">Earliest Date</p>
          </div>
        </div>
      </div>
    </main>
  )
}
