import { useEffect, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import DownloadModal from '../components/DownloadModal'
import { chapters } from '../data/chapters'
import DonationBanner from '../components/DonationBanner'
import NewsletterSignup from '../components/NewsletterSignup'
import FadeInSection from '../components/FadeInSection'
import AnimatedCounter from '../components/AnimatedCounter'
import ContinueReading from '../components/ContinueReading'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { estimateReadingTime } from '../lib/readingTime'
import SocialProofBanner from '../components/engagement/SocialProofBanner'
import SharePanel from '../components/SharePanel'
import RecordTabs, { type RecordTab } from '../components/RecordTabs'

/* Lazy-load heavy tab panels */
const DownloadPDF = lazy(() => import('../components/DownloadPDF'))
const IsraelDossierPage = lazy(() => import('./IsraelDossierPage'))
const DeepStatePage = lazy(() => import('./DeepStatePage'))
const TimelinePage = lazy(() => import('./TimelinePage'))
// ContentPackPage moved to standalone route — accessible via footer link
const AipacPage = lazy(() => import('./AipacPage'))

function TabSpinner() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-label="Loading section">
      <div className="inline-block w-6 h-6 border-2 border-crimson/20 border-t-crimson rounded-full animate-spin" />
    </div>
  )
}

export default function HomePage() {
  // Support direct linking via hash: /#israel, /#deepstate, /#timeline, /#content
  const initialTab = (): RecordTab => {
    const hash = window.location.hash.replace('#', '')
    const valid: RecordTab[] = ['chapters', 'israel', 'deepstate', 'timeline', 'aipac']
    return valid.includes(hash as RecordTab) ? (hash as RecordTab) : 'chapters'
  }
  const [activeTab, setActiveTab] = useState<RecordTab>(initialTab)
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  // Sync hash with tab changes
  useEffect(() => {
    window.location.hash = activeTab === 'chapters' ? '' : activeTab
  }, [activeTab])

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
  }, [activeTab])

  const featured = chapters[0]
  const rest = chapters.slice(1)

  return (
    <div>
      {/* ── Masthead / Edition Banner ─────────────────────── */}
      <div className="border-b border-border">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-2">
            Volume I &middot; Published March 2026
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-ink leading-[1.05] mb-3">
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

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <div className="bg-ink">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson-light"><AnimatedCounter end={31} /></p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Chapters</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson-light"><AnimatedCounter end={240} suffix="+" /></p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Years Covered</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson-light"><AnimatedCounter end={500} suffix="+" /></p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Sources Cited</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-crimson-light">100%</p>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1">Free &amp; Open</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TABBED LAYOUT: Sidebar + Content Panel
         ══════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 relative">
        {/* Left sidebar tabs */}
        <RecordTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content panel */}
        <div className="flex-1 min-w-0 pb-20 md:pb-0">

          {/* ── TAB: Chapters (default) ───────────────────── */}
          {activeTab === 'chapters' && (
            <div>
              {/* Social Proof */}
              <SocialProofBanner />
              {/* Continue Reading — for returning visitors */}
              <ContinueReading />

              {/* Featured Lead */}
              <FadeInSection>
              <section className="py-12 border-b border-border">
                <p className="chapter-label mb-3">{featured.number}</p>
                <Link to={`/chapter/${featured.id}`} className="group">
                  {featured.heroImage && (
                    <div className="overflow-hidden rounded-sm mb-6">
                      <img
                        src={featured.heroImage.src}
                        alt={featured.heroImage.alt}
                        loading="eager"
                        className="w-full h-48 md:h-64 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
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
              </FadeInSection>

              {/* Key Investigations Grid */}
              <FadeInSection>
              <section className="py-12 border-b border-border">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Key Investigations</h2>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[chapters[2], chapters[4], chapters[10], chapters[14], chapters[22], chapters[28]].filter(Boolean).map((ch) => (
                    <Link key={ch.id} to={`/chapter/${ch.id}`} className="group block card-lift rounded-sm">
                      {ch.heroImage && (
                        <div className="overflow-hidden rounded-sm mb-3 aspect-[16/10] bg-parchment-dark">
                          <img src={ch.heroImage.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                        </div>
                      )}
                      <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">{ch.number}</p>
                      <h3 className="font-display text-base font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-1">{ch.title}</h3>
                      <p className="font-body text-xs text-ink-muted line-clamp-2">{ch.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </section>
              </FadeInSection>

              {/* Complete Table of Contents */}
              <section className="py-12">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Complete Table of Contents</h2>
                  <div className="flex-1 h-[1px] bg-border" />
                  <span className="font-sans text-xs text-ink-faint">{chapters.length} sections</span>
                </div>
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-0">
                  {rest.map((chapter) => (
                    <Link key={chapter.id} to={`/chapter/${chapter.id}`} className="group py-5 border-b border-border block">
                      <div className="flex gap-4">
                        {chapter.heroImage && (
                          <div className="hidden sm:block shrink-0 w-20 h-20 overflow-hidden rounded-sm bg-parchment-dark">
                            <img src={chapter.heroImage.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson shrink-0">{chapter.number}</span>
                            {chapter.dateRange && <span className="font-sans text-[0.6rem] text-ink-faint">{chapter.dateRange}</span>}
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-1">{chapter.title}</h3>
                          <p className="font-body text-sm text-ink-muted line-clamp-2">{chapter.subtitle}</p>
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
                              <span key={kw} className="font-sans text-[0.6rem] px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm">{kw}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <SharePanel
                title="The Record — Veritas Worldwide Press"
                description="A 31-chapter documentary history compiled from primary sources — court records, congressional testimony, declassified files. Free and open access."
                contentId="home"
              />
              <DonationBanner />
              <NewsletterSignup />

              {/* Reading Guide CTA */}
              <section className="py-12 border-t border-border">
                <div className="bg-ink rounded-sm p-8 md:p-12 text-center">
                  <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-3">Before You Begin</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Read the Methodology &amp; Evidence Standards</h3>
                  <p className="font-body text-sm text-white/60 max-w-xl mx-auto mb-6">
                    Every claim in this publication is classified using a three-tier evidence system. Understanding how to read the evidence tiers will help you evaluate each claim independently.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/chapter/foreword" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors">Read the Foreword</Link>
                    <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 border border-white/30 text-white rounded-sm hover:bg-white/10 transition-colors">Methodology</Link>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-4">Get the Complete Book</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                      <Link to="/read" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-ink font-sans text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        Read Online — Free
                      </Link>
                      <button onClick={() => setShowDownloadModal(true)} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-sans text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Download PDF (7.7 MB)
                      </button>
                      <a href="/the-record.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-sans text-sm font-semibold rounded-sm hover:bg-white/10 transition-colors" title="Open in Apple Books or your default PDF reader">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Open in Books
                      </a>
                    </div>
                    <p className="font-sans text-[0.55rem] text-white/30 mt-3">Free &amp; open access — share with anyone</p>
                  </div>
                </div>
              </section>
              <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} fileName="The Record - Veritas Worldwide Press.pdf" fileUrl="/the-record.pdf" />
            </div>
          )}

          {/* ── TAB: Israel Dossier ───────────────────────── */}
          {activeTab === 'israel' && (
            <Suspense fallback={<TabSpinner />}>
              <IsraelDossierPage />
            </Suspense>
          )}

          {/* ── TAB: Deep State ───────────────────────────── */}
          {activeTab === 'deepstate' && (
            <Suspense fallback={<TabSpinner />}>
              <DeepStatePage />
            </Suspense>
          )}

          {/* ── TAB: Timeline ─────────────────────────────── */}
          {activeTab === 'timeline' && (
            <Suspense fallback={<TabSpinner />}>
              <TimelinePage />
            </Suspense>
          )}

          {/* ── TAB: AIPAC Influence Map ──────────────── */}
          {activeTab === 'aipac' && (
            <Suspense fallback={<TabSpinner />}>
              <AipacPage />
            </Suspense>
          )}

        </div>{/* end flex-1 content panel */}
      </div>{/* end flex container */}
    </div>
  )
}
