import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { chapters, searchChapters } from '../data/chapters'
import type { Chapter } from '../data/chapters'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { trackSearch } from '../lib/ga4'
import { scoreSearchPerformed } from '../lib/leadScoring'

interface SearchResult {
  chapter: Chapter
  matchedIn: string[]
  snippet: string
}

function getSnippet(chapter: Chapter, query: string): string {
  const q = query.toLowerCase()
  for (const block of chapter.content) {
    if (block.text && block.text.toLowerCase().includes(q)) {
      const idx = block.text.toLowerCase().indexOf(q)
      const start = Math.max(0, idx - 80)
      const end = Math.min(block.text.length, idx + query.length + 80)
      const prefix = start > 0 ? '...' : ''
      const suffix = end < block.text.length ? '...' : ''
      return prefix + block.text.substring(start, end) + suffix
    }
    if (block.quote?.text.toLowerCase().includes(q)) {
      return `"${block.quote.text.substring(0, 160)}..."`
    }
    if (block.evidence?.text.toLowerCase().includes(q)) {
      return block.evidence.text.substring(0, 160) + '...'
    }
  }
  return chapter.subtitle
}

function getMatchedFields(chapter: Chapter, query: string): string[] {
  const q = query.toLowerCase()
  const fields: string[] = []
  if (chapter.title.toLowerCase().includes(q)) fields.push('title')
  if (chapter.subtitle.toLowerCase().includes(q)) fields.push('subtitle')
  if (chapter.keywords.some(k => k.toLowerCase().includes(q))) fields.push('keywords')
  const inContent = chapter.content.some(block => {
    if (block.text?.toLowerCase().includes(q)) return true
    if (block.quote?.text.toLowerCase().includes(q)) return true
    if (block.evidence?.text.toLowerCase().includes(q)) return true
    if (block.table?.headers.some(h => h.toLowerCase().includes(q))) return true
    if (block.table?.rows.some(r => r.some(c => c.toLowerCase().includes(q)))) return true
    return false
  })
  if (inContent) fields.push('content')
  const inSources = chapter.sources.some(s => s.text.toLowerCase().includes(q))
  if (inSources) fields.push('sources')
  return fields
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
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMetaTags({
      title: 'Search | The Record — Veritas Worldwide Press',
      description: `Full-text search across all ${chapters.length} chapters, sources, evidence, and data tables.`,
      url: `${SITE_URL}/search`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'SearchResultsPage',
      'name': `Search | ${SITE_NAME}`,
      'url': `${SITE_URL}/search`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  useEffect(() => {
    const q = searchParams.get('q')
    if (q && q !== query) {
      setQuery(q)
      setDebouncedQuery(q)
    }
  }, [searchParams])

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

  const results: SearchResult[] = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    const matched = searchChapters(debouncedQuery)
    return matched.map(chapter => ({
      chapter,
      matchedIn: getMatchedFields(chapter, debouncedQuery),
      snippet: getSnippet(chapter, debouncedQuery),
    }))
  }, [debouncedQuery])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      {/* Section Bar */}
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column — Search & Results */}
          <div className="max-w-none">
            {/* Header */}
            <header className="mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-2">
                Search The Record
              </h1>
              <p className="font-body text-base text-ink-muted">
                Full-text search across all {chapters.length} chapters, sources, evidence, and data tables.
              </p>
            </header>

            {/* Search Input */}
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
              />
              {query.trim() && query !== debouncedQuery && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Results */}
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
                      key={result.chapter.id}
                      to={`/chapter/${result.chapter.id}`}
                      className="group block py-6 border-b border-border"
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson">
                          {result.chapter.number}
                        </span>
                        {result.chapter.dateRange && (
                          <span className="font-sans text-[0.6rem] text-ink-faint">
                            {result.chapter.dateRange}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-crimson transition-colors mb-2">
                        <HighlightText text={result.chapter.title} query={debouncedQuery} />
                      </h3>
                      <p className="font-body text-sm text-ink-muted leading-relaxed mb-3 line-clamp-3">
                        <HighlightText text={result.snippet} query={debouncedQuery} />
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

          {/* Right Column — Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Quick Topics */}
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

              {/* Browse by Chapter */}
              <div>
                <h3 className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Browse Chapters
                </h3>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {chapters.slice(0, 15).map(ch => (
                    <Link
                      key={ch.id}
                      to={`/chapter/${ch.id}`}
                      className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors py-0.5 leading-relaxed"
                    >
                      <span className="text-crimson font-semibold">{ch.number}</span> {ch.title}
                    </Link>
                  ))}
                  {chapters.length > 15 && (
                    <Link to="/" className="block font-sans text-xs text-crimson hover:text-crimson-dark mt-2">
                      View all {chapters.length} chapters &rarr;
                    </Link>
                  )}
                </div>
              </div>

              {/* Related Pages */}
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
