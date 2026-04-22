import { useState, useEffect, useCallback, useMemo, useRef, startTransition } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { ChapterType, EvidenceTier } from '../data/chapterTypes'
import { chapterMeta } from '../data/chapterMeta'
import { allArticles as articles, CATEGORY_META } from '../data/articles'
import { PROFILES, getProfilePhoto } from '../data/profileData'
import { topicHubs } from '../data/topicHubs'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { trackSearch } from '../lib/ga4'
import { scoreSearchPerformed } from '../lib/leadScoring'

type SearchMatchedField = 'title' | 'subtitle' | 'keywords' | 'content' | 'sources'
type SearchMatchFilter = 'all' | 'sources'

interface SearchResult {
  chapterId: string
  chapterNumber: string
  chapterTitle: string
  chapterSubtitle: string
  dateRange: string
  matchedIn: SearchMatchedField[]
  snippet: string
  accessLevel: 'preview' | 'full'
  chapterType: ChapterType | null
  availableEvidenceTiers: EvidenceTier[]
}

interface SearchResponse {
  results: SearchResult[]
  scope: 'public' | 'full'
  totalChapters: number
  filters?: {
    evidenceTier: EvidenceTier | 'all'
    match: SearchMatchFilter
    chapterType: ChapterType | 'all'
  }
}

const EVIDENCE_TIER_OPTIONS: Array<{ value: EvidenceTier | 'all'; label: string }> = [
  { value: 'all', label: 'All Tiers' },
  { value: 'verified', label: 'Verified' },
  { value: 'circumstantial', label: 'Circumstantial' },
  { value: 'disputed', label: 'Disputed' },
]

const CHAPTER_TYPE_OPTIONS: Array<{ value: ChapterType | 'all'; label: string }> = [
  { value: 'all', label: 'All Formats' },
  { value: 'investigation', label: 'Investigations' },
  { value: 'explainer', label: 'Explainers' },
  { value: 'reference', label: 'Reference' },
]

const MATCH_FILTER_OPTIONS: Array<{ value: SearchMatchFilter; label: string }> = [
  { value: 'all', label: 'All Matches' },
  { value: 'sources', label: 'Source Only' },
]

function sanitizeEvidenceTier(value: string | null): EvidenceTier | 'all' {
  if (value === 'verified' || value === 'circumstantial' || value === 'disputed') {
    return value
  }
  return 'all'
}

function sanitizeChapterType(value: string | null): ChapterType | 'all' {
  if (value === 'reference' || value === 'explainer' || value === 'investigation') {
    return value
  }
  return 'all'
}

function sanitizeMatchFilter(value: string | null): SearchMatchFilter {
  return value === 'sources' ? 'sources' : 'all'
}

function buildSearchParams(
  query: string,
  evidenceTier: EvidenceTier | 'all',
  matchFilter: SearchMatchFilter,
  chapterType: ChapterType | 'all'
) {
  const params = new URLSearchParams()
  if (query) params.set('q', query)
  if (evidenceTier !== 'all') params.set('evidence', evidenceTier)
  if (matchFilter !== 'all') params.set('match', matchFilter)
  if (chapterType !== 'all') params.set('chapterType', chapterType)
  return params
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

function formatMatchedField(field: SearchMatchedField) {
  switch (field) {
    case 'content':
      return 'Text'
    case 'keywords':
      return 'Keywords'
    case 'sources':
      return 'Sources'
    case 'subtitle':
      return 'Subtitle'
    case 'title':
      return 'Title'
    default:
      return field
  }
}

function formatChapterType(type: ChapterType) {
  switch (type) {
    case 'explainer':
      return 'Explainer'
    case 'reference':
      return 'Reference'
    default:
      return 'Investigation'
  }
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-crimson/15 text-ink rounded-sm px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  )
}

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function includesSearchQuery(values: string[], query: string) {
  if (!query) return false
  return normalizeSearchValue(values.join(' ')).includes(query)
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchScope, setSearchScope] = useState<'public' | 'full'>('full')
  const [evidenceTierFilter, setEvidenceTierFilter] = useState<EvidenceTier | 'all'>(
    sanitizeEvidenceTier(searchParams.get('evidence'))
  )
  const [matchFilter, setMatchFilter] = useState<SearchMatchFilter>(
    sanitizeMatchFilter(searchParams.get('match'))
  )
  const [chapterTypeFilter, setChapterTypeFilter] = useState<ChapterType | 'all'>(
    sanitizeChapterType(searchParams.get('chapterType'))
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const totalChapters = chapterMeta.length
  const searchParamString = searchParams.toString()
  const effectiveEvidenceTierFilter = evidenceTierFilter
  const effectiveMatchFilter = matchFilter
  const effectiveChapterTypeFilter = chapterTypeFilter
  const hasActiveFilters =
    effectiveEvidenceTierFilter !== 'all' ||
    effectiveMatchFilter !== 'all' ||
    effectiveChapterTypeFilter !== 'all'
  const normalizedCrossSurfaceQuery = normalizeSearchValue(debouncedQuery)

  const matchingTopics = useMemo(() => {
    if (!normalizedCrossSurfaceQuery) return []
    return topicHubs
      .filter((topic) =>
        includesSearchQuery(
          [topic.name, topic.headline, topic.description, ...topic.aliases, ...topic.keywords],
          normalizedCrossSurfaceQuery
        )
      )
      .slice(0, 3)
  }, [normalizedCrossSurfaceQuery])

  const matchingProfiles = useMemo(() => {
    if (!normalizedCrossSurfaceQuery) return []
    return PROFILES.filter((profile) =>
      includesSearchQuery(
        [
          profile.name,
          profile.title,
          profile.summary,
          ...(profile.tags || []),
          ...(profile.connections || []).map((connection) => connection.name),
          ...(profile.policyActions || []).map((action) => action.action),
        ],
        normalizedCrossSurfaceQuery
      )
    ).slice(0, 4)
  }, [normalizedCrossSurfaceQuery])

  const matchingArticles = useMemo(() => {
    if (!normalizedCrossSurfaceQuery) return []
    return articles
      .filter((article) =>
        includesSearchQuery(
          [article.title, article.subtitle, article.category, ...article.tags, ...article.relatedChapters],
          normalizedCrossSurfaceQuery
        )
      )
      .slice(0, 3)
  }, [normalizedCrossSurfaceQuery])

  useEffect(() => {
    const scopeDescription = searchScope === 'full'
      ? 'full chapter text, keywords, and source libraries'
      : 'chapter titles, keywords, and source references'

    setMetaTags({
      title: 'Search | The Record — Veritas Worldwide',
      description: `Search ${scopeDescription} across all ${totalChapters} chapters of The Record.`,
      url: `${SITE_URL}/search`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'SearchResultsPage',
      name: `Search | ${SITE_NAME}`,
      url: `${SITE_URL}/search`,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [searchScope, totalChapters])

  useEffect(() => {
    const nextQuery = searchParams.get('q') || ''
    const nextEvidenceTier = sanitizeEvidenceTier(searchParams.get('evidence'))
    const nextMatchFilter = sanitizeMatchFilter(searchParams.get('match'))
    const nextChapterType = sanitizeChapterType(searchParams.get('chapterType'))

    if (nextQuery !== query) {
      setQuery(nextQuery)
    }

    if (nextQuery !== debouncedQuery) {
      setDebouncedQuery(nextQuery)
    }

    if (nextEvidenceTier !== evidenceTierFilter) {
      setEvidenceTierFilter(nextEvidenceTier)
    }

    if (nextMatchFilter !== matchFilter) {
      setMatchFilter(nextMatchFilter)
    }

    if (nextChapterType !== chapterTypeFilter) {
      setChapterTypeFilter(nextChapterType)
    }
  }, [chapterTypeFilter, debouncedQuery, evidenceTierFilter, matchFilter, query, searchParams])

  useEffect(() => {
    const nextParams = buildSearchParams(
      debouncedQuery.trim(),
      effectiveEvidenceTierFilter,
      effectiveMatchFilter,
      effectiveChapterTypeFilter
    )

    if (nextParams.toString() !== searchParamString) {
      setSearchParams(nextParams, { replace: true })
    }
  }, [
    debouncedQuery,
    effectiveChapterTypeFilter,
    effectiveEvidenceTierFilter,
    effectiveMatchFilter,
    searchParamString,
    setSearchParams,
  ])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      const trimmedValue = value.trim()
      setDebouncedQuery(value)
      if (trimmedValue) {
        trackSearch(trimmedValue)
        scoreSearchPerformed(trimmedValue)
      }
    }, 250)
  }, [])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setError(null)
      setLoading(false)
      setSearchScope('full')
      return
    }

    let cancelled = false
    const controller = new AbortController()
    const params = new URLSearchParams({ q: debouncedQuery.trim() })

    if (effectiveEvidenceTierFilter !== 'all') {
      params.set('evidence', effectiveEvidenceTierFilter)
    }

    if (effectiveMatchFilter !== 'all') {
      params.set('match', effectiveMatchFilter)
    }

    if (effectiveChapterTypeFilter !== 'all') {
      params.set('chapterType', effectiveChapterTypeFilter)
    }

    setLoading(true)
    setError(null)

    fetch(`/api/search?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Search request failed (${response.status})`)
        }
        return response.json() as Promise<SearchResponse>
      })
      .then((data) => {
        if (cancelled) return
        startTransition(() => {
          setResults(data.results)
          setSearchScope(data.scope)
        })
        setLoading(false)
      })
      .catch((fetchError: Error) => {
        if (cancelled || controller.signal.aborted) return
        console.error('Search failed:', fetchError)
        setError('Search is temporarily unavailable. Please try again.')
        setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [
    debouncedQuery,
    effectiveChapterTypeFilter,
    effectiveEvidenceTierFilter,
    effectiveMatchFilter,
  ])

  const isPreviewSearch = searchScope === 'public'

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
              Search
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <div className="max-w-none">
            <header className="mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                Search The Record
              </h1>
              <p className="font-body text-base text-ink-muted">
                Search chapter titles, keywords, full chapter text, and source libraries across all {totalChapters} chapters.
              </p>
            </header>

            <div className="relative mb-8">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, topic, institution, date..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
                autoFocus
                aria-label="Search The Record"
                data-testid="search-input"
              />
              {query.trim() && query !== debouncedQuery && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
                </div>
              )}
            </div>

            {normalizedCrossSurfaceQuery && (
              <section className="mb-10 rounded-[28px] border border-border bg-surface-raised p-5 sm:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
                      Cross-site matches
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                      Search across topics, profiles, and current reporting
                    </h2>
                  </div>
                  <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                    Chapter search remains the primary engine here, but the wider publication now surfaces matches from the rest of the record as well.
                  </p>
                </div>

                {matchingTopics.length === 0 && matchingProfiles.length === 0 && matchingArticles.length === 0 ? (
                  <p className="mt-5 font-body text-sm leading-relaxed text-ink-muted">
                    No additional topic, profile, or newsroom matches surfaced for this query yet.
                  </p>
                ) : (
                  <div className="mt-6 grid gap-4 xl:grid-cols-3">
                    {matchingTopics.length > 0 && (
                      <div className="rounded-2xl border border-border bg-surface p-4">
                        <p className="font-sans text-[0.58rem] font-bold tracking-[0.16em] uppercase text-ink-faint">
                          Topic hubs
                        </p>
                        <div className="mt-4 space-y-3">
                          {matchingTopics.map((topic) => (
                            <Link
                              key={topic.slug}
                              to={`/topics/${topic.slug}`}
                              className="block rounded-xl border border-border bg-parchment px-4 py-3 transition-colors hover:border-crimson"
                            >
                              <p className="font-display text-lg font-bold text-ink">
                                <HighlightText text={topic.name} query={debouncedQuery} />
                              </p>
                              <p className="mt-1 line-clamp-3 font-body text-sm leading-relaxed text-ink-muted">
                                <HighlightText text={topic.description} query={debouncedQuery} />
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchingProfiles.length > 0 && (
                      <div className="rounded-2xl border border-border bg-surface p-4">
                        <p className="font-sans text-[0.58rem] font-bold tracking-[0.16em] uppercase text-ink-faint">
                          Profiles
                        </p>
                        <div className="mt-4 space-y-3">
                          {matchingProfiles.map((profile) => (
                            <Link
                              key={profile.id}
                              to={`/profile/${profile.id}`}
                              className="flex items-start gap-3 rounded-xl border border-border bg-parchment px-4 py-3 transition-colors hover:border-crimson"
                            >
                              <img
                                src={getProfilePhoto(profile.id)}
                                alt={profile.name}
                                className="h-14 w-14 rounded-full object-cover"
                                loading="lazy"
                              />
                              <div className="min-w-0">
                                <p className="font-display text-lg font-bold text-ink">
                                  <HighlightText text={profile.name} query={debouncedQuery} />
                                </p>
                                <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                                  <HighlightText text={profile.title} query={debouncedQuery} />
                                </p>
                                <p className="mt-1 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">
                                  <HighlightText text={profile.summary} query={debouncedQuery} />
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchingArticles.length > 0 && (
                      <div className="rounded-2xl border border-border bg-surface p-4">
                        <p className="font-sans text-[0.58rem] font-bold tracking-[0.16em] uppercase text-ink-faint">
                          Current reporting
                        </p>
                        <div className="mt-4 space-y-3">
                          {matchingArticles.map((article) => (
                            <Link
                              key={article.id}
                              to={`/news/${article.slug}`}
                              className="block rounded-xl border border-border bg-parchment px-4 py-3 transition-colors hover:border-crimson"
                            >
                              <p className="font-sans text-[0.55rem] font-bold tracking-[0.14em] uppercase text-crimson">
                                {CATEGORY_META[article.category].label}
                              </p>
                              <p className="mt-2 font-display text-lg font-bold text-ink">
                                <HighlightText text={article.title} query={debouncedQuery} />
                              </p>
                              <p className="mt-1 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">
                                <HighlightText text={article.subtitle} query={debouncedQuery} />
                              </p>
                              <p className="mt-2 font-sans text-[0.55rem] uppercase tracking-[0.1em] text-ink-faint">
                                {article.publishDate} · {article.readingTime} min
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {(
              <section className="mb-10 border border-border bg-surface-raised p-4 sm:p-5">
                <div className="mb-4">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
                    Archive Filters
                  </p>
                  <p className="font-body text-sm text-ink-muted leading-relaxed">
                    Narrow the full public archive by evidence tier, source-only matches, and chapter format.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
                      Match Location
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {MATCH_FILTER_OPTIONS.map((option) => {
                        const isActive = matchFilter === option.value
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setMatchFilter(option.value)}
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
                      Evidence Tier
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

                  <div>
                    <p className="font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-2">
                      Chapter Format
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CHAPTER_TYPE_OPTIONS.map((option) => {
                        const isActive = chapterTypeFilter === option.value
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setChapterTypeFilter(option.value)}
                            className={`min-h-[44px] rounded-sm border px-3 py-2 font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase transition-colors ${getFilterButtonClasses(isActive)}`}
                            aria-pressed={isActive}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-sans text-xs text-ink-faint">
                        Filters are limiting the signed-in archive search to the selected evidence mix, match location, and chapter format.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEvidenceTierFilter('all')
                          setMatchFilter('all')
                          setChapterTypeFilter('all')
                        }}
                        className="font-sans text-xs text-crimson hover:text-crimson-dark underline underline-offset-2"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {debouncedQuery.trim() === '' ? (
              <div className="text-center py-16">
                <p className="font-body text-lg text-ink-muted mb-3">Enter a search term to explore.</p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {['Federal Reserve', 'Rothschild', 'BlackRock', 'CIA', 'Eisenhower', 'AIPAC', 'Central Banking', 'Andrew Jackson'].map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="font-sans text-xs px-4 py-2.5 min-h-[44px] border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="font-body text-lg text-ink-muted mb-2">{error}</p>
                <button
                  onClick={() => handleSearch(debouncedQuery)}
                  className="font-sans text-sm text-crimson hover:text-crimson-dark underline underline-offset-2"
                >
                  Try again
                </button>
              </div>
            ) : loading && results.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 border-2 border-crimson/20 border-t-crimson rounded-full animate-spin mb-4" />
                <p className="font-body text-lg text-ink-muted">Searching the record…</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-body text-lg text-ink-muted mb-2">
                  No results found for &ldquo;{debouncedQuery}&rdquo;
                </p>
                <p className="font-sans text-sm text-ink-faint mb-4">
                  Try different keywords or browse the <Link to="/" className="text-crimson hover:underline">table of contents</Link>.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setEvidenceTierFilter('all')
                      setMatchFilter('all')
                      setChapterTypeFilter('all')
                    }}
                    className="font-sans text-sm text-crimson hover:text-crimson-dark underline underline-offset-2"
                  >
                    Clear the signed-in filters
                  </button>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-sans text-xs text-ink-faint">
                    <span className="font-bold text-crimson">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={() => {
                        setEvidenceTierFilter('all')
                        setMatchFilter('all')
                        setChapterTypeFilter('all')
                      }}
                      className="font-sans text-xs text-crimson hover:text-crimson-dark underline underline-offset-2"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <div className="space-y-0">
                  {results.map(result => (
                    <Link
                      key={result.chapterId}
                      to={`/chapter/${result.chapterId}`}
                      className="group block py-6 border-b border-border"
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson">
                          {result.chapterNumber}
                        </span>
                        {result.dateRange && (
                          <span className="font-sans text-[0.6rem] text-ink-faint">
                            {result.dateRange}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-crimson transition-colors mb-2">
                        <HighlightText text={result.chapterTitle} query={debouncedQuery} />
                      </h3>
                      <p className="font-body text-sm text-ink-muted leading-relaxed mb-3 line-clamp-3">
                        <HighlightText text={result.snippet || result.chapterSubtitle} query={debouncedQuery} />
                      </p>

                      {(result.chapterType || result.availableEvidenceTiers.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.chapterType && (
                            <span className="inline-flex items-center rounded-sm border border-border bg-parchment-dark px-2 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                              {formatChapterType(result.chapterType)}
                            </span>
                          )}
                          {result.availableEvidenceTiers.map((tier) => (
                            <span
                              key={`${result.chapterId}-${tier}`}
                              className={`inline-flex items-center rounded-sm border px-2 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${getEvidenceTierClasses(tier, true)}`}
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {result.matchedIn.map((field) => (
                          <span
                            key={field}
                            className={`font-sans text-[0.6rem] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                              field === 'sources'
                                ? 'border border-crimson/20 bg-crimson/5 text-crimson'
                                : 'bg-parchment-dark text-ink-faint'
                            }`}
                          >
                            {formatMatchedField(field)}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Topic Hubs
                </h3>
                <div className="space-y-1.5">
                  {topicHubs.map((topic) => (
                    <Link
                      key={topic.slug}
                      to={`/topics/${topic.slug}`}
                      className="block w-full text-left font-sans text-xs text-ink-muted hover:text-crimson transition-colors py-1"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Browse Chapters
                </h3>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {chapterMeta.slice(0, 15).map(ch => (
                    <Link
                      key={ch.id}
                      to={`/chapter/${ch.id}`}
                      className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors py-0.5 leading-relaxed"
                    >
                      <span className="text-crimson font-semibold">{ch.number}</span> {ch.title}
                    </Link>
                  ))}
                  {chapterMeta.length > 15 && (
                    <Link to="/" className="block font-sans text-xs text-crimson hover:text-crimson-dark mt-2">
                      View all {chapterMeta.length} chapters &rarr;
                    </Link>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Related Pages
                </h3>
                <div className="space-y-2">
                  <Link to="/sources" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Sources &amp; Bibliography
                  </Link>
                  <Link to="/topics" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Research Topics
                  </Link>
                  <Link to="/methodology" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Methodology &amp; Standards
                  </Link>
                  <Link to="/profiles" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Power Profiles
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
