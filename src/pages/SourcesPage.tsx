import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAllChapters } from '../hooks/useAllChapters'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'

export default function SourcesPage() {
  const { chapters, loading: chaptersLoading } = useAllChapters()
  useEffect(() => {
    setMetaTags({
      title: 'Sources & Bibliography | The Record — Veritas Worldwide Press',
      description: 'Master bibliography of 500+ primary sources cited across 31 chapters. Congressional records, court filings, declassified documents, and academic research.',
      url: `${SITE_URL}/sources`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Sources & Bibliography',
      'description': 'Master bibliography of 500+ primary sources cited across 31 chapters.',
      'url': `${SITE_URL}/sources`,
      'isPartOf': { '@type': 'WebSite', 'name': `The Record — ${SITE_NAME}`, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
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

  const chapterSources = chapters
    .filter(ch => ch.sources.length > 0)
    .map(ch => ({
      id: ch.id,
      number: ch.number,
      title: ch.title,
      sources: ch.sources,
    }))

  const [sourceFilter, setSourceFilter] = useState('')
  const filteredChapterSources = sourceFilter.trim()
    ? chapterSources
        .map(ch => ({
          ...ch,
          sources: ch.sources.filter(s =>
            s.text.toLowerCase().includes(sourceFilter.toLowerCase()) ||
            (s.url && s.url.toLowerCase().includes(sourceFilter.toLowerCase()))
          ),
        }))
        .filter(ch => ch.sources.length > 0)
    : chapterSources
  const filteredCount = filteredChapterSources.reduce((sum, ch) => sum + ch.sources.length, 0)

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
              Sources
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Left Column — Main Content */}
          <article className="max-w-none">
            {/* Header */}
            <header className="mb-12 border-b border-border pb-10">
              <p className="chapter-label mb-4">Reference</p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
                Sources &amp; References
              </h1>
              <p className="font-body text-lg italic text-ink-muted leading-relaxed max-w-2xl">
                Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">{allSources.length}</p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Total Sources</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">{chapterSources.length}</p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Chapters Sourced</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-xl sm:text-2xl font-bold text-crimson">{allSources.filter(s => s.url).length}</p>
                  <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">With Direct Links</p>
                </div>
              </div>
            </header>

            {/* Source Search */}
            <div className="mb-8 no-print">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search sources by name, institution, or URL..."
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 font-sans text-sm bg-surface border border-border rounded-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors"
                  aria-label="Filter sources"
                />
                {sourceFilter.trim() && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-sans text-xs text-ink-faint">
                      <span className="font-bold text-crimson">{filteredCount}</span> source{filteredCount !== 1 ? 's' : ''} matching &ldquo;{sourceFilter}&rdquo;
                    </span>
                    <button onClick={() => setSourceFilter('')} className="font-sans text-xs text-crimson hover:text-crimson-dark underline underline-offset-2">
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Chapter Quick Nav */}
            <nav className="mb-12 no-print" aria-label="Jump to chapter sources">
              <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
                Jump to Chapter
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {chapterSources.map(ch => (
                  <a
                    key={ch.id}
                    href={`#sources-${ch.id}`}
                    className="font-sans text-[0.65rem] font-semibold tracking-[0.05em] uppercase px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors"
                    title={ch.title}
                  >
                    {ch.number}
                  </a>
                ))}
              </div>
            </nav>

            {/* Sources by Chapter */}
            <section>
              <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6">
                Sources by Chapter
              </h2>

              {filteredChapterSources.length === 0 ? (
                <p className="font-body text-base text-ink-muted text-center py-12">
                  {sourceFilter.trim()
                    ? <>No sources matching &ldquo;{sourceFilter}&rdquo;. <button onClick={() => setSourceFilter('')} className="text-crimson hover:underline">Clear search</button></>
                    : 'Sources are being compiled and will be published with each chapter.'
                  }
                </p>
              ) : (
                <div className="space-y-10">
                  {filteredChapterSources.map(ch => (
                    <div key={ch.id} id={`sources-${ch.id}`} className="border-b border-border pb-8 scroll-mt-20">
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson">
                          {ch.number}
                        </span>
                        <Link
                          to={`/chapter/${ch.id}`}
                          className="font-display text-lg font-bold text-ink hover:text-crimson transition-colors"
                        >
                          {ch.title}
                        </Link>
                      </div>
                      <ol className="space-y-2 ml-1">
                        {ch.sources.map(source => (
                          <li key={source.id} className="font-sans text-sm text-ink-muted leading-relaxed flex gap-3">
                            <span className="font-bold text-crimson shrink-0 text-xs mt-0.5">[{source.id}]</span>
                            <span>
                              {source.text}
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

            {/* CTA */}
            <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center">
                Read the Methodology
              </Link>
              <Link to="/" className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center">
                Back to The Record
              </Link>
            </div>
          </article>

          {/* Right Column — Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Verification Databases */}
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

              {/* Related Pages */}
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

              {/* Support CTA */}
              <div className="border-t border-border pt-6">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
                  Free &amp; Open Access
                </p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  Every source is publicly accessible. If transparent research matters to you, a contribution helps us continue.
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
