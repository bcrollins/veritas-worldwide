import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { EvidenceTier, LoadedChapter, SourceHierarchy } from '../data/chapterTypes'
import { useAllChapters } from '../hooks/useAllChapters'
import { useAuth } from '../lib/AuthContext'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

type SourceHierarchyFilter = SourceHierarchy | 'all'

const SOURCE_HIERARCHY_OPTIONS: Array<{ value: SourceHierarchyFilter; label: string }> = [
  { value: 'all', label: 'All Sources' },
  { value: 'primary', label: 'Primary' },
  { value: 'peerReviewed', label: 'Peer Reviewed' },
  { value: 'verifiedJournalism', label: 'Verified Journalism' },
  { value: 'secondary', label: 'Secondary' },
]

const EVIDENCE_TIER_OPTIONS: Array<{ value: EvidenceTier | 'all'; label: string }> = [
  { value: 'all', label: 'All Tiers' },
  { value: 'verified', label: 'Verified' },
  { value: 'circumstantial', label: 'Circumstantial' },
  { value: 'disputed', label: 'Disputed' },
]

function getEmptyHierarchyCounts(): Record<SourceHierarchy, number> {
  return {
    primary: 0,
    peerReviewed: 0,
    verifiedJournalism: 0,
    secondary: 0,
  }
}

function getSourceCount(chapter: LoadedChapter) {
  return chapter.sourceCount ?? chapter.sources.length
}

function getSourceHierarchyLabel(hierarchy: SourceHierarchy) {
  switch (hierarchy) {
    case 'peerReviewed':
      return 'Peer Reviewed'
    case 'verifiedJournalism':
      return 'Verified Journalism'
    case 'secondary':
      return 'Secondary'
    default:
      return 'Primary'
  }
}

function getSourceHierarchyCounts(sources: LoadedChapter['sources']) {
  const counts = getEmptyHierarchyCounts()
  for (const source of sources) {
    counts[source.hierarchy ?? 'secondary'] += 1
  }
  return counts
}

function getFilterButtonClasses(active: boolean) {
  return active
    ? 'border-crimson bg-crimson/5 text-crimson'
    : 'border-border text-ink-muted hover:border-crimson hover:text-crimson'
}

function getEvidenceTierClasses(tier: EvidenceTier | 'all', active: boolean) {
  if (!active) {
    return 'border-border text-ink-muted hover:border-crimson hover:text-crimson'
  }

  if (tier === 'verified') {
    return 'border-verified-border bg-verified-bg text-verified'
  }

  if (tier === 'circumstantial') {
    return 'border-circumstantial-border bg-circumstantial-bg text-circumstantial'
  }

  if (tier === 'disputed') {
    return 'border-disputed-border bg-disputed-bg text-disputed'
  }

  return 'border-border bg-parchment-dark text-ink'
}

export default function SourcesPage() {
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const { chapters, loading: chaptersLoading } = useAllChapters({ scope: isLoggedIn ? 'full' : 'public' })
  const [sourceFilter, setSourceFilter] = useState('')
  const [sourceHierarchyFilter, setSourceHierarchyFilter] = useState<SourceHierarchyFilter>('all')
  const [evidenceTierFilter, setEvidenceTierFilter] = useState<EvidenceTier | 'all'>('all')
  const deferredSourceFilter = useDeferredValue(sourceFilter.trim().toLowerCase())

  useEffect(() => {
    setMetaTags({
      title: 'Sources & Bibliography | The Record — Veritas Press',
      description: 'Master bibliography and verification library for The Record. Free reader accounts unlock the full source archive.',
      url: `${SITE_URL}/sources`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Sources & Bibliography',
      description: 'Master bibliography and verification library for The Record.',
      url: `${SITE_URL}/sources`,
      isPartOf: { '@type': 'WebSite', name: `The Record — ${SITE_NAME}`, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const allSources = chapters.flatMap(chapter =>
    chapter.sources.map(source => ({
      ...source,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
    }))
  )
  const totalSources = chapters.reduce((sum, chapter) => sum + getSourceCount(chapter), 0)

  const chapterSources = chapters
    .filter(chapter => getSourceCount(chapter) > 0)
    .map(chapter => ({
      id: chapter.id,
      number: chapter.number,
      title: chapter.title,
      sources: chapter.sources,
      sourceCount: getSourceCount(chapter),
      sourceHierarchyCounts: {
        ...getEmptyHierarchyCounts(),
        ...(chapter.sourceHierarchyCounts ?? {}),
      },
      visibleHierarchyCounts: {
        ...getEmptyHierarchyCounts(),
        ...(chapter.sourceHierarchyCounts ?? {}),
      },
      availableEvidenceTiers: chapter.availableEvidenceTiers ?? [],
    }))

  const filteredChapterSources = isLoggedIn
    ? chapterSources
        .filter(chapter =>
          evidenceTierFilter === 'all' || chapter.availableEvidenceTiers.includes(evidenceTierFilter)
        )
        .map(chapter => {
          const visibleSources = chapter.sources.filter(source => {
            const sourceText = `${source.text} ${source.url ?? ''}`.toLowerCase()
            const matchesQuery = !deferredSourceFilter || sourceText.includes(deferredSourceFilter)
            const matchesHierarchy =
              sourceHierarchyFilter === 'all' || source.hierarchy === sourceHierarchyFilter
            return matchesQuery && matchesHierarchy
          })

          return {
            ...chapter,
            sources: visibleSources,
            visibleHierarchyCounts: getSourceHierarchyCounts(visibleSources),
          }
        })
        .filter(chapter => chapter.sources.length > 0)
    : chapterSources

  const filteredCount = filteredChapterSources.reduce((sum, chapter) => sum + chapter.sources.length, 0)
  const hasActiveSourceFilters =
    Boolean(sourceFilter.trim()) ||
    sourceHierarchyFilter !== 'all' ||
    evidenceTierFilter !== 'all'

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-2">
            <Link to="/" className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint hover:text-crimson transition-colors">
              The Record
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson">
              Sources
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <article className="max-w-none">
            <header className="mb-12 border-b border-border pb-10">
              <p className="chapter-label mb-4">Reference</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
                Sources &amp; References
              </h1>
              <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl">
                {isLoggedIn
                  ? 'Every source cited in this publication is organized here for direct verification. The reader is encouraged to inspect the record independently.'
                  : 'Free reader accounts unlock the full source archive. Public readers can review chapter-by-chapter source counts and verification databases before signing in.'}
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">{totalSources}</p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Total Sources</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">{chapterSources.length}</p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Chapters Sourced</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">
                    {isLoggedIn ? allSources.filter(source => source.url).length : 'Free'}
                  </p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">
                    {isLoggedIn ? 'With Direct Links' : 'Reader Access'}
                  </p>
                </div>
              </div>
            </header>

            {chaptersLoading ? (
              <div className="py-16 text-center">
                <div className="inline-block w-8 h-8 border-2 border-crimson/20 border-t-crimson rounded-full animate-spin mb-4" />
                <p className="font-body text-base text-ink-muted">Loading the source archive…</p>
              </div>
            ) : isLoggedIn ? (
              <>
                <section className="mb-8 no-print border border-border bg-surface-raised p-4 sm:p-5">
                  <div className="mb-4">
                    <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
                      Signed-In Filters
                    </p>
                    <p className="font-body text-sm text-ink-muted leading-relaxed">
                      Filter the full bibliography by source hierarchy and by the evidence mix present in each chapter.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search sources by name, institution, or URL..."
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 font-sans text-sm bg-surface border border-border rounded-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
                        aria-label="Filter sources"
                      />
                    </div>

                    <div>
                      <p className="font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
                        Source Hierarchy
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SOURCE_HIERARCHY_OPTIONS.map((option) => {
                          const isActive = sourceHierarchyFilter === option.value
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setSourceHierarchyFilter(option.value)}
                              className={`min-h-[44px] rounded-sm border px-3 py-2 font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase transition-colors ${getFilterButtonClasses(isActive)}`}
                              aria-pressed={isActive}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
                        Chapter Evidence Mix
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {EVIDENCE_TIER_OPTIONS.map((option) => {
                          const isActive = evidenceTierFilter === option.value
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setEvidenceTierFilter(option.value)}
                              className={`min-h-[44px] rounded-sm border px-3 py-2 font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase transition-colors ${getEvidenceTierClasses(option.value, isActive)}`}
                              aria-pressed={isActive}
                            >
                              {option.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-sans text-xs text-ink-faint">
                        <span className="font-bold text-crimson">{filteredCount}</span> source{filteredCount !== 1 ? 's' : ''} across{' '}
                        <span className="font-bold text-crimson">{filteredChapterSources.length}</span> chapter{filteredChapterSources.length !== 1 ? 's' : ''}
                        {sourceFilter.trim() ? ` matching "${sourceFilter.trim()}"` : ''}
                      </p>
                      {hasActiveSourceFilters && (
                        <button
                          type="button"
                          onClick={() => {
                            setSourceFilter('')
                            setSourceHierarchyFilter('all')
                            setEvidenceTierFilter('all')
                          }}
                          className="font-sans text-xs text-crimson hover:text-crimson-dark underline underline-offset-2"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                <nav className="mb-12 no-print" aria-label="Jump to chapter sources">
                  <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
                    Jump to Chapter
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {filteredChapterSources.map(chapter => (
                      <a
                        key={chapter.id}
                        href={`#sources-${chapter.id}`}
                        className="font-sans text-[0.65rem] font-semibold tracking-[0.05em] uppercase px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors"
                        title={chapter.title}
                      >
                        {chapter.number}
                      </a>
                    ))}
                  </div>
                </nav>

                <section>
                  <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6">
                    Sources by Chapter
                  </h2>

                  {filteredChapterSources.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="font-body text-base text-ink-muted mb-3">
                        No sources match the current signed-in filters.
                      </p>
                      {hasActiveSourceFilters && (
                        <button
                          type="button"
                          onClick={() => {
                            setSourceFilter('')
                            setSourceHierarchyFilter('all')
                            setEvidenceTierFilter('all')
                          }}
                          className="font-sans text-sm text-crimson hover:text-crimson-dark underline underline-offset-2"
                        >
                          Clear the filters
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {filteredChapterSources.map(chapter => (
                        <div key={chapter.id} id={`sources-${chapter.id}`} className="border-b border-border pb-8 scroll-mt-20">
                          <div className="flex items-baseline gap-3 mb-3">
                            <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson">
                              {chapter.number}
                            </span>
                            <Link
                              to={`/chapter/${chapter.id}`}
                              className="font-display text-lg font-bold text-ink hover:text-crimson transition-colors"
                            >
                              {chapter.title}
                            </Link>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {chapter.availableEvidenceTiers.map((tier) => (
                              <span
                                key={`${chapter.id}-${tier}`}
                                className={`inline-flex items-center rounded-sm border px-2 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${getEvidenceTierClasses(tier, true)}`}
                              >
                                {tier}
                              </span>
                            ))}

                            {SOURCE_HIERARCHY_OPTIONS.filter(option => option.value !== 'all').map((option) => {
                              const hierarchy = option.value as SourceHierarchy
                              const visibleCount = chapter.visibleHierarchyCounts[hierarchy]
                              if (visibleCount === 0) return null

                              return (
                                <span
                                  key={`${chapter.id}-${hierarchy}`}
                                  className="inline-flex items-center rounded-sm border border-border bg-parchment-dark px-2 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-ink-muted"
                                >
                                  {visibleCount} {getSourceHierarchyLabel(hierarchy)}
                                </span>
                              )
                            })}
                          </div>

                          <ol className="space-y-2 ml-1">
                            {chapter.sources.map(source => (
                              <li key={source.id} className="font-sans text-sm text-ink-muted leading-relaxed flex gap-3">
                                <span className="font-bold text-crimson shrink-0 text-xs mt-0.5">[{source.id}]</span>
                                <span>
                                  {source.text}
                                  <span className="ml-2 inline-flex items-center rounded-sm border border-border bg-parchment-dark px-1.5 py-0.5 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                                    {getSourceHierarchyLabel(source.hierarchy ?? 'secondary')}
                                  </span>
                                  {source.url && (
                                    <>
                                      {' '}
                                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-crimson hover:text-crimson-dark underline underline-offset-2">
                                        View &rarr;
                                      </a>
                                    </>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            ) : (
              <section className="border border-border bg-surface p-6 sm:p-8">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-3">
                  Reader Access
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight mb-4">
                  Create a free account to browse the full bibliography.
                </h2>
                <p className="font-body text-base text-ink-muted leading-relaxed max-w-2xl mb-6">
                  The public preview shows how heavily each chapter is sourced. Signing in unlocks the full citation library, direct links, and filter tools for document-by-document verification.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-crimson text-white font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                  >
                    Create Free Account
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-ink font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:border-crimson hover:text-crimson transition-colors"
                  >
                    Log In
                  </button>
                  <Link
                    to="/membership"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-ink-muted font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:border-ink hover:text-ink transition-colors"
                  >
                    Support The Archive
                  </Link>
                </div>
                <div className="space-y-3">
                  {chapterSources.map(chapter => (
                    <div key={chapter.id} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                      <div className="min-w-0">
                        <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson">{chapter.number}</p>
                        <Link to={`/chapter/${chapter.id}`} className="font-display text-lg font-bold text-ink hover:text-crimson transition-colors">
                          {chapter.title}
                        </Link>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-display text-xl font-bold text-ink">{chapter.sourceCount}</p>
                        <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">sources</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
                Read the Methodology
              </Link>
              <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
                Back to The Record
              </Link>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Public Verification Databases
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Congress.gov', desc: 'Legislation & records', url: 'https://www.congress.gov' },
                    { name: 'National Archives', desc: 'Declassified documents', url: 'https://www.archives.gov' },
                    { name: 'SEC EDGAR', desc: 'Corporate filings', url: 'https://www.sec.gov/cgi-bin/browse-edgar' },
                    { name: 'CIA FOIA', desc: 'Intelligence documents', url: 'https://www.cia.gov/readingroom' },
                    { name: 'PACER', desc: 'Federal court filings', url: 'https://pacer.uscourts.gov' },
                    { name: 'Federal Register', desc: 'Executive orders', url: 'https://www.federalregister.gov' },
                    { name: 'NSA Archive (GWU)', desc: 'Security archive', url: 'https://nsarchive.gwu.edu' },
                    { name: 'OpenSecrets', desc: 'Campaign finance', url: 'https://www.opensecrets.org' },
                  ].map(db => (
                    <a
                      key={db.name}
                      href={db.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-sm hover:bg-parchment-dark transition-colors"
                    >
                      <span className="font-sans text-crimson font-bold text-xs mt-0.5">&rarr;</span>
                      <div>
                        <p className="font-sans text-xs font-semibold text-ink">{db.name}</p>
                        <p className="font-sans text-[0.6rem] text-ink-faint">{db.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Related Pages
                </h3>
                <div className="space-y-2">
                  <Link to="/methodology" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Methodology &amp; Standards
                  </Link>
                  <Link to="/search" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Search The Record
                  </Link>
                  <Link to="/chapter/foreword" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Foreword
                  </Link>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
                  Support The Archive
                </p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  Free reader accounts unlock the full source archive. If this kind of traceable research matters to you, a contribution keeps the record online.
                </p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-crimson text-white font-sans text-[0.65rem] font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Support This Work
                </a>
                <p className="font-sans text-[0.55rem] text-ink-faint mt-2">
                  Via Stripe &middot; No account required
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
