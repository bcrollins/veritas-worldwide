import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { chapters } from '../data/chapters'
import DonationBanner from '../components/DonationBanner'
import NewsletterSignup from '../components/NewsletterSignup'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { estimateReadingTime } from '../lib/readingTime'
const DownloadPDF = lazy(() => import('../components/DownloadPDF'))

export default function HomePage() {
  useEffect(() => {
    setMetaTags({
      title: `The Record | ${SITE_NAME}`,
      description: 'A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. 31 chapters, 500+ primary sources, 100% free and open access.',
      url: SITE_URL,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': `The Record — ${SITE_NAME}`,
      'url': SITE_URL,
      'description': 'A Documentary History of Power, Money, and the Institutions That Shaped the Modern World.',
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': { '@type': 'EntryPoint', 'urlTemplate': `${SITE_URL}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])
  const featured = chapters[0]
  const rest = chapters.slice(1)

  return (
    <div>
      {/* Masthead / Edition Banner */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center">
          <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-2">
            Volume I &middot; Published March 2026
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-ink leading-[1.05] mb-3">
            The Record
          </h1>
          <p className="font-body text-lg md:text-xl italic text-ink-muted max-w-2xl mx-auto">
            A Documentary History of Power, Money, and the Institutions That Shaped the Modern World
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-16 bg-crimson" />
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson">
              Primary Sources &middot; Public Record &middot; Your Conclusions
            </p>
            <div className="h-[1px] w-16 bg-crimson" />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-ink">
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '31', label: 'Chapters' },
            { value: '240+', label: 'Years Covered' },
            { value: '500+', label: 'Sources Cited' },
            { value: '100%', label: 'Free & Open' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-crimson-light">{stat.value}</p>
              <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Featured Lead */}
        <section className="py-12 border-b border-border">
          <p className="chapter-label mb-3">{featured.number}</p>
          <Link to={`/chapter/${featured.id}`} className="group">
            {/* Featured Article Hero Image */}
            {featured.heroImage && (
              <div className="overflow-hidden rounded-sm mb-6">
                <img
                  src={featured.heroImage.src}
                  alt={featured.heroImage.alt}
                  loading="eager"
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.display = 'none'
                  }}
                />
              </div>
            )}
            <h2 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors mb-3">
              {featured.title}
            </h2>
            <p className="font-body text-lg text-ink-muted italic mb-4 max-w-3xl">
              {featured.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-sans text-xs text-ink-faint">{featured.author}</span>
              <span className="font-sans text-xs text-ink-faint">{featured.publishDate}</span>
              <span className="font-sans text-xs text-ink-faint">{estimateReadingTime(featured)} min read</span>
              {featured.sources.length > 0 && (
                <span className="font-sans text-xs text-ink-faint">{featured.sources.length} {featured.sources.length === 1 ? 'source' : 'sources'}</span>
              )}
              {featured.dateRange && (
                <span className="font-sans text-xs font-semibold text-crimson">{featured.dateRange}</span>
              )}
            </div>
          </Link>
        </section>

        {/* Chapter Grid */}
        <section className="py-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
              Complete Table of Contents
            </h2>
            <div className="flex-1 h-[1px] bg-border" />
            <span className="font-sans text-xs text-ink-faint">{chapters.length} sections</span>
          </div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-0">
            {rest.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.id}`}
                className="group py-5 border-b border-border block"
              >
                <div className="flex gap-4">
                  {/* Chapter Thumbnail */}
                  {chapter.heroImage && (
                    <div className="hidden sm:block shrink-0 w-20 h-20 overflow-hidden rounded-sm bg-parchment-dark">
                      <img
                        src={chapter.heroImage.src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).parentElement!.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson shrink-0">
                    {chapter.number}
                  </span>
                  {chapter.dateRange && (
                    <span className="font-sans text-[0.6rem] text-ink-faint">
                      {chapter.dateRange}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-1">
                  {chapter.title}
                </h3>
                <p className="font-body text-sm text-ink-muted line-clamp-2">
                  {chapter.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-sans text-[0.6rem] text-ink-faint">{estimateReadingTime(chapter)} min</span>
                  {chapter.sources.length > 0 && (
                    <>
                      <span className="font-sans text-[0.6rem] text-ink-faint">·</span>
                      <span className="font-sans text-[0.6rem] text-ink-faint">{chapter.sources.length} {chapter.sources.length === 1 ? 'source' : 'sources'}</span>
                    </>
                  )}
                  {chapter.content.some(b => b.type === 'evidence') && (
                    <span className="font-sans text-[0.6rem] text-ink-faint">·</span>
                  )}
                  {chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'verified').length > 0 && (
                    <span className="font-sans text-[0.6rem] text-verified" aria-label="Verified evidence blocks">
                      ✓{chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'verified').length}
                    </span>
                  )}
                  {chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'circumstantial').length > 0 && (
                    <span className="font-sans text-[0.6rem] text-circumstantial" aria-label="Circumstantial evidence blocks">
                      ◐{chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'circumstantial').length}
                    </span>
                  )}
                  {chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'disputed').length > 0 && (
                    <span className="font-sans text-[0.6rem] text-disputed" aria-label="Disputed evidence blocks">
                      ⚠{chapter.content.filter(b => b.type === 'evidence' && b.evidence?.tier === 'disputed').length}
                    </span>
                  )}
                  {chapter.keywords.slice(0, 3).map(kw => (
                    <span key={kw} className="font-sans text-[0.6rem] px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm">
                      {kw}
                    </span>
                  ))}
                </div>
                  </div>{/* end flex-1 */}
                </div>{/* end flex gap-4 */}
              </Link>
            ))}
          </div>
        </section>

        <DonationBanner />

        <NewsletterSignup />

        {/* Reading Guide CTA */}
        <section className="py-12 border-t border-border">
          <div className="bg-ink rounded-sm p-8 md:p-12 text-center">
            <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-3">
              Before You Begin
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Read the Methodology &amp; Evidence Standards
            </h3>
            <p className="font-body text-sm text-white/60 max-w-xl mx-auto mb-6">
              Every claim in this publication is classified using a three-tier evidence system. Understanding how to read the evidence tiers will help you evaluate each claim independently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/chapter/foreword"
                className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
              >
                Read the Foreword
              </Link>
              <Link
                to="/methodology"
                className="font-sans text-sm font-semibold px-6 py-3 border border-white/30 text-white rounded-sm hover:bg-white/10 transition-colors"
              >
                Methodology
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-sans text-xs text-white/40 mb-3">Download the entire publication for offline reading</p>
              <Suspense fallback={<span className="text-white/40 text-xs">Loading…</span>}><DownloadPDF /></Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
