import { useState, useEffect, useCallback, useRef, startTransition } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { chapterMeta } from '../data/chapterMeta'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { trackSearch } from '../lib/ga4'
import { scoreSearchPerformed } from '../lib/leadScoring'

interface SearchResult {
  chapterId: string
  chapterNumber: string
  chapterTitle: string
  chapterSubtitle: string
  dateRange: string
  matchedIn: string[]
  snippet: string
  accessLevel: 'preview' | 'full'
}

interface SearchResponse {
  results: SearchResult[]
  scope: 'public' | 'full'
  totalChapters: number
}

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = window.localStorage.getItem('veritas_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
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

export default function SearchPage() {
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchScope, setSearchScope] = useState<'public' | 'full'>(isLoggedIn ? 'full' : 'public')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const totalChapters = chapterMeta.length

  useEffect(() => {
    const scopeDescription = searchScope === 'full'
      ? 'full chapter text, keywords, and source libraries'
      : 'chapter titles, keywords, and public preview text'

    setMetaTags({
      title: 'Search | The Record — Veritas Press',
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
    if (nextQuery !== query) {
      setQuery(nextQuery)
      setDebouncedQuery(nextQuery)
    }
  }, [query, searchParams])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(value)
      if (value.trim()) {
        setSearchParams({ q: value })
        trackSearch(value.trim())
        scoreSearchPerformed(value.trim())
      } else {
        setSearchParams({})
      }
    }, 250)
  }, [setSearchParams])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setError(null)
      setLoading(false)
      setSearchScope(isLoggedIn ? 'full' : 'public')
      return
    }

    let cancelled = false
    const controller = new AbortController()
    const params = new URLSearchParams({ q: debouncedQuery.trim() })

    setLoading(true)
    setError(null)

    fetch(`/api/search?${params.toString()}`, {
      headers: isLoggedIn ? getAuthHeaders() : {},
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
  }, [debouncedQuery, isLoggedIn])

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
                Search chapter titles, keywords, and {isPreviewSearch ? 'public preview text' : 'full chapter text plus source libraries'} across all {totalChapters} chapters.
              </p>
            </header>

            {isPreviewSearch && (
              <div className="mb-8 border border-border bg-surface p-4 sm:p-5">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
                  Preview Search
                </p>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-3">
                  Anonymous readers can search titles, keywords, and the three-block public preview. Sign in with a free reader account to search the full archive and source text.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-crimson text-white font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                >
                  Unlock Full Search
                </button>
              </div>
            )}

            <div className="relative mb-10">
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
                <p className="font-sans text-sm text-ink-faint">
                  Try different keywords or browse the <Link to="/" className="text-crimson hover:underline">table of contents</Link>.
                </p>
              </div>
            ) : (
              <div>
                <p className="font-sans text-xs text-ink-faint mb-6">
                  <span className="font-bold text-crimson">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for &ldquo;{debouncedQuery}&rdquo;
                </p>
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
                      <div className="flex flex-wrap gap-2">
                        {result.matchedIn.map(field => (
                          <span key={field} className="font-sans text-[0.6rem] font-semibold px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm uppercase tracking-wider">
                            {field}
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
                  Popular Topics
                </h3>
                <div className="space-y-1.5">
                  {['Federal Reserve', 'AIPAC', 'CIA', 'BlackRock', 'Rothschild', 'Eisenhower', 'Central Banking', 'Israel Lobby', 'Wall Street', 'Epstein'].map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearch(term)}
                      className="block w-full text-left font-sans text-xs text-ink-muted hover:text-crimson transition-colors py-1"
                    >
                      {term}
                    </button>
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
