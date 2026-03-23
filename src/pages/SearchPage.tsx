import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { chapters, searchChapters } from '../data/chapters'
import type { Chapter } from '../data/chapters'
import { setMetaTags, clearMetaTags } from '../lib/seo'

interface SearchResult {
  chapter: Chapter
  matchedIn: string[]
  snippet: string
}

/** Highlight matched terms in text with <mark> tags */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-crimson/15 text-ink px-0.5 rounded-sm">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [inputValue, setInputValue] = useState(initialQuery)
  const [query, setQuery] = useState(initialQuery)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    setMetaTags({
      title: 'Search | The Record — Veritas Worldwide Press',
      description: `Full-text search across all ${chapters.length} chapters, sources, evidence, and data tables.`,
      url: 'https://veritasworldwide.com/search',
    })
    return () => { clearMetaTags() }
  }, [])

  useEffect(() => {
    const q = searchParams.get('q')
    if (q && q !== inputValue) {
      setInputValue(q)
      setQuery(q)
    }
  }, [searchParams])

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) return []
    const matched = searchChapters(query)
    return matched.map(chapter => ({
      chapter,
      matchedIn: getMatchedFields(chapter, query),
      snippet: getSnippet(chapter, query),
    }))
  }, [query])

  const handleSearch = useCallback((value: string) => {
    setInputValue(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setQuery(value)
      if (value.trim()) {
        setSearchParams({ q: value })
      } else {
        setSearchParams({})
      }
    }, 250)
  }, [setSearchParams])

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
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
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, topic, institution, date..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>

      {/* Results */}
      {query.trim() === '' ? (
        <div className="text-center py-16">
          <p className="font-body text-lg text-ink-muted mb-3">Enter a search term to explore.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Federal Reserve', 'Rothschild', 'BlackRock', 'CIA', 'Eisenhower', 'AIPAC', 'Central Banking', 'Andrew Jackson'].map(term => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="font-sans text-xs px-3 py-1.5 border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-body text-lg text-ink-muted mb-2">
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p className="font-sans text-sm text-ink-faint">
            Try different keywords or browse the <Link to="/" className="text-crimson hover:underline">table of contents</Link>.
          </p>
        </div>
      ) : (
        <div>
          <p className="font-sans text-xs text-ink-faint mb-6">
            <span className="font-bold text-crimson">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
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
                  <HighlightedText text={result.chapter.title} query={query} />
                </h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-3 line-clamp-3">
                  <HighlightedText text={result.snippet} query={query} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matchedIn.map(field => (
                    <span
                      key={field}
                      className="font-sans text-[0.6rem] font-semibold px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm uppercase tracking-wider"
                    >
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
  )
}
