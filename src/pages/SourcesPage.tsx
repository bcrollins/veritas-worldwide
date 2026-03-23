import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import { setMetaTags, clearMetaTags, SITE_URL } from '../lib/seo'

export default function SourcesPage() {
  useEffect(() => {
    setMetaTags({
      title: 'Sources & Bibliography | The Record — Veritas Worldwide Press',
      description: 'Master bibliography of 500+ primary sources cited across 31 chapters. Congressional records, court filings, declassified documents, and academic research.',
      url: `${SITE_URL}/sources`,
    })
    return () => { clearMetaTags() }
  }, [])
  // Aggregate all sources from all chapters
  const allSources = chapters.flatMap(chapter =>
    chapter.sources.map(source => ({
      ...source,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
    }))
  )

  // Group by chapter
  const chapterSources = chapters
    .filter(ch => ch.sources.length > 0)
    .map(ch => ({
      id: ch.id,
      number: ch.number,
      title: ch.title,
      sources: ch.sources,
    }))

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <header className="mb-12 border-b border-border pb-10">
        <p className="chapter-label mb-4">Reference</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          Sources &amp; References
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed">
          Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.
        </p>
        <div className="flex items-center gap-6 mt-6">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson">{allSources.length}</p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Total Sources</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson">{chapterSources.length}</p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">Chapters Sourced</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson">{allSources.filter(s => s.url).length}</p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint">With Direct Links</p>
          </div>
        </div>
      </header>

      {/* Verification Resources */}
      <section className="mb-12 bg-parchment-dark p-6 rounded-sm">
        <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
          Public Verification Databases
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: 'Congress.gov', desc: 'Congressional records & legislation', url: 'https://www.congress.gov' },
            { name: 'National Archives', desc: 'Declassified government documents', url: 'https://www.archives.gov' },
            { name: 'SEC EDGAR', desc: 'Corporate & financial filings', url: 'https://www.sec.gov/cgi-bin/browse-edgar' },
            { name: 'CIA FOIA Reading Room', desc: 'Declassified intelligence documents', url: 'https://www.cia.gov/readingroom' },
            { name: 'PACER', desc: 'Federal court filings', url: 'https://pacer.uscourts.gov' },
            { name: 'Federal Register', desc: 'Executive orders & regulations', url: 'https://www.federalregister.gov' },
            { name: 'NSA Archive (GWU)', desc: 'National Security Archive', url: 'https://nsarchive.gwu.edu' },
            { name: 'OpenSecrets', desc: 'Campaign finance & lobbying data', url: 'https://www.opensecrets.org' },
          ].map(db => (
            <a
              key={db.name}
              href={db.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors bg-surface"
            >
              <span className="font-sans text-crimson font-bold text-sm mt-0.5">&rarr;</span>
              <div>
                <p className="font-sans text-sm font-semibold text-ink">{db.name}</p>
                <p className="font-sans text-xs text-ink-faint">{db.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Sources by Chapter */}
      <section>
        <h2 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6">
          Sources by Chapter
        </h2>

        {chapterSources.length === 0 ? (
          <p className="font-body text-base text-ink-muted text-center py-12">
            Sources are being compiled and will be published with each chapter.
          </p>
        ) : (
          <div className="space-y-10">
            {chapterSources.map(ch => (
              <div key={ch.id} className="border-b border-border pb-8">
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
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-crimson hover:text-crimson-dark underline underline-offset-2"
                            >
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
        <Link
          to="/methodology"
          className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center"
        >
          Read the Methodology
        </Link>
        <Link
          to="/"
          className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center"
        >
          Back to The Record
        </Link>
      </div>

      {/* Support CTA */}
      <section className="border-t border-border mt-12 pt-8 text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
          Free &amp; Open Access
        </p>
        <p className="font-body text-sm text-ink-muted leading-relaxed max-w-md mx-auto mb-5">
          Every source in this bibliography is publicly accessible. If transparent, primary-source research matters to you, a small contribution helps us continue.
        </p>
        <a
          href="https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Support This Work
        </a>
        <p className="font-sans text-[0.6rem] text-ink-faint mt-3">
          Processed securely via Stripe &middot; No account required
        </p>
      </section>
    </div>
  )
}
