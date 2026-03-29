import { useEffect, useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import DownloadModal from '../components/DownloadModal'
import { chapterMeta } from '../data/chapterMeta'
import DonationBanner from '../components/DonationBanner'
import NewsletterSignup from '../components/NewsletterSignup'
import FadeInSection from '../components/FadeInSection'
import AnimatedCounter from '../components/AnimatedCounter'
import ContinueReading from '../components/ContinueReading'
import { getTopicHrefForTerm, topicHubs } from '../data/topicHubs'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { estimateReadingTime } from '../lib/readingTime'
import SocialProofBanner from '../components/engagement/SocialProofBanner'
import SharePanel from '../components/SharePanel'
const DownloadPDF = lazy(() => import('../components/DownloadPDF'))

export default function HomePage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: `The Record | ${SITE_NAME}`,
      description: 'A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. 31 chapters, 500+ primary sources, and free reader accounts for full archive access.',
      url: SITE_URL,
    })
    setJsonLd([
      {
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
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': SITE_NAME,
        'alternateName': 'The Record',
        'url': SITE_URL,
        'logo': `${SITE_URL}/og-image.png`,
        'description': 'Independent investigative journalism built on primary sources. 31 chapters documenting 240+ years of institutional power.',
        'foundingDate': '2025',
        'sameAs': [
          'https://x.com/VeritasWorldwide',
          'https://github.com/bcrollins/veritas-worldwide',
          'https://www.reddit.com/r/VeritasWorldwide',
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'rights@veritasworldwide.com',
          'contactType': 'editorial',
        },
      },
    ])
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const featured = chapterMeta[0]
  const rest = chapterMeta.slice(1)
  const keyInvestigations = [chapterMeta[2], chapterMeta[4], chapterMeta[10], chapterMeta[14], chapterMeta[22], chapterMeta[28]].filter(Boolean)

  return (
    <div>
      {/* ── Edition Bar (NYT-style compact) ────────────────── */}
      <div className="border-b border-border">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-ink leading-none">The Record</h1>
              <p className="hidden sm:block font-body text-sm italic text-ink-muted">A Documentary History of Power, Money &amp; Institutions</p>
            </div>
            <div className="flex items-center gap-4 font-sans text-[0.6rem] tracking-[0.08em] uppercase text-ink-faint">
              <span className="hidden md:inline"><AnimatedCounter end={31} /> Chapters</span>
              <span className="hidden md:inline">&middot;</span>
              <span className="hidden md:inline"><AnimatedCounter end={500} suffix="+" /> Sources</span>
              <span>Volume I</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: HERO / LEAD STORY AREA
          Three-column layout (60/20/20 split) with featured story
         ══════════════════════════════════════════════════════ */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <section className="py-12 border-b border-border">
              <div className="grid md:grid-cols-5 gap-8">
                {/* Featured story: 60% width (3/5 of grid) */}
                <div className="md:col-span-3">
                  {featured && (
                    <Link to={`/chapter/${featured.id}`} className="group block">
                      {featured.heroImage && (
                        <div className="overflow-hidden mb-6">
                          <img
                            src={featured.heroImage}
                            alt=""
                            loading="eager"
                            className="w-full h-64 md:h-80 object-cover group-hover:opacity-85 transition-opacity duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                          />
                        </div>
                      )}
                      <p className="chapter-label mb-3">{featured.number}</p>
                      <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors mb-4">
                        {featured.title}
                      </h2>
                      <p className="font-body text-lg text-ink-muted italic mb-5 max-w-3xl">
                        {featured.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm border-t border-border pt-4">
                        <span className="font-sans text-xs text-ink-faint">{featured.author}</span>
                        <span className="font-sans text-xs text-ink-faint">{featured.publishDate}</span>
                        {featured.dateRange && (
                          <span className="font-sans text-xs font-semibold text-crimson">{featured.dateRange}</span>
                        )}
                      </div>
                    </Link>
                  )}
                </div>

                {/* Right column: two secondary stories (20/20 split vertically) */}
                <div className="md:col-span-2 space-y-8">
                  {[chapterMeta[1], chapterMeta[3]].filter(Boolean).map((ch) => (
                    <Link key={ch.id} to={`/chapter/${ch.id}`} className="group block border-b border-border pb-8 last:border-b-0 last:pb-0">
                      {ch.heroImage && (
                        <div className="overflow-hidden mb-3 aspect-[4/3] bg-parchment-dark">
                          <img
                            src={ch.heroImage}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                          />
                        </div>
                      )}
                      <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson mb-2">{ch.number}</p>
                      <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors mb-2">
                        {ch.title}
                      </h3>
                      <p className="font-body text-sm text-ink-muted line-clamp-2">{ch.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </FadeInSection>

          {/* ══════════════════════════════════════════════════════
              SECTION 2: KEY INVESTIGATIONS
              4-column grid with 6 key chapters
             ══════════════════════════════════════════════════════ */}
          <FadeInSection>
            <section className="py-12 border-b border-border">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Key Investigations</h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {keyInvestigations.map((ch) => (
                  <Link key={ch.id} to={`/chapter/${ch.id}`} className="group block">
                    {ch.heroImage && (
                      <div className="overflow-hidden mb-3 aspect-[16/10] bg-parchment-dark">
                        <img
                          src={ch.heroImage}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                          onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                        />
                      </div>
                    )}
                    <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">{ch.number}</p>
                    <h3 className="font-display text-base font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-2">
                      {ch.title}
                    </h3>
                    <p className="font-body text-xs text-ink-muted line-clamp-2">{ch.subtitle}</p>
                    {ch.dateRange && (
                      <p className="font-sans text-[0.6rem] text-ink-faint mt-2">{ch.dateRange}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section className="py-12 border-b border-border">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Research Topics</h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {topicHubs.slice(0, 6).map((topic) => (
                  <Link
                    key={topic.slug}
                    to={`/topics/${topic.slug}`}
                    className="group border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
                  >
                    <p className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
                      {topic.eyebrow}
                    </p>
                    <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
                      {topic.name}
                    </h3>
                    <p className="font-body text-sm text-ink-muted leading-relaxed mt-3 line-clamp-3">
                      {topic.description}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/topics" className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors">
                  Browse all research topics &rarr;
                </Link>
              </div>
            </section>
          </FadeInSection>

          {/* Social Proof */}
          <SocialProofBanner />
          
          {/* Continue Reading — for returning visitors */}
          <ContinueReading />
        </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: MAIN CONTENT + SIDEBAR
          70/30 split with table of contents and sidebar
         ══════════════════════════════════════════════════════ */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <section className="py-12 grid lg:grid-cols-3 gap-12">
            {/* Main content: Complete Table of Contents (70%) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Complete Table of Contents</h2>
                <div className="flex-1 h-[1px] bg-border" />
                <span className="font-sans text-xs text-ink-faint">{chapterMeta.length} sections</span>
              </div>
              <div className="space-y-0 divide-y divide-border">
                {rest.map((chapter) => (
                  <Link key={chapter.id} to={`/chapter/${chapter.id}`} className="group py-5 block hover:bg-parchment-dark/30 transition-colors px-4 -mx-4">
                    <div className="flex gap-4">
                      {chapter.heroImage && (
                        <div className="hidden sm:block shrink-0 w-24 h-24 overflow-hidden bg-parchment-dark border border-border">
                          <img
                            src={chapter.heroImage}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                            onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson shrink-0">{chapter.number}</span>
                          {chapter.dateRange && <span className="font-sans text-[0.6rem] text-ink-faint">{chapter.dateRange}</span>}
                        </div>
                        <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-1">
                          {chapter.title}
                        </h3>
                        <p className="font-body text-sm text-ink-muted line-clamp-2">{chapter.subtitle}</p>
                        {chapter.keywords && chapter.keywords.slice(0, 3).length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {chapter.keywords.slice(0, 3).map(kw => (
                              <Link
                                key={kw}
                                to={getTopicHrefForTerm(kw)}
                                className="font-sans text-[0.6rem] px-2 py-0.5 bg-border text-ink-faint hover:text-crimson hover:bg-crimson/5 transition-colors"
                              >
                                {kw}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar: Most Read, Newsletter, About (30%) */}
            <div className="lg:col-span-1 space-y-12">
              {/* Most Read */}
              <div className="border-t border-border pt-8">
                <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink mb-6">Most Read</h3>
                <div className="space-y-4 divide-y divide-border">
                  {chapterMeta.slice(0, 5).map((ch, idx) => (
                    <Link
                      key={ch.id}
                      to={`/chapter/${ch.id}`}
                      className="group py-4 first:pt-0 block"
                    >
                      <p className="font-sans text-[0.7rem] font-bold tracking-[0.08em] uppercase text-ink-faint mb-1">{idx + 1}.</p>
                      <h4 className="font-display text-sm font-bold text-ink group-hover:text-crimson transition-colors leading-snug">
                        {ch.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="border-t border-border pt-8">
                <NewsletterSignup />
              </div>

              {/* About / Information */}
              <div className="border-t border-border pt-8">
                <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink mb-3">About This Project</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                  The Record is a 31-chapter documentary history compiled from public archives, court records, and declassified documents. Every claim is sourced and evidence-classified.
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/methodology" className="font-sans text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/chapter/foreword" className="font-sans text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors">
                    → Read the Foreword
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: BOTTOM SECTION
          Continue Reading, Reading Guide, Share Panel
         ══════════════════════════════════════════════════════ */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <SharePanel
            title="The Record — Veritas Press"
            description="A 31-chapter documentary history compiled from primary sources — court records, congressional testimony, declassified files. Free reader accounts unlock the full archive."
            contentId="home"
          />

          {/* Reading Guide CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-ink p-8 md:p-12 text-center">
              <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-3">Before You Begin</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Read the Methodology &amp; Evidence Standards</h3>
              <p className="font-body text-sm text-white/60 max-w-xl mx-auto mb-6">
                Every claim in this publication is classified using a three-tier evidence system. Understanding how to read the evidence tiers will help you evaluate each claim independently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/chapter/foreword" className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white hover:bg-crimson-dark transition-colors">Read the Foreword</Link>
                <Link to="/methodology" className="font-sans text-sm font-semibold px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors">Methodology</Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-4">Get the Complete Book</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/read" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-ink font-sans text-sm font-semibold hover:bg-white/90 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Read Online — Free
                  </Link>
                  <button onClick={() => setShowDownloadModal(true)} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-sans text-sm font-semibold hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download PDF (7.7 MB)
                  </button>
                </div>
              </div>
            </div>
          </section>

          <DonationBanner />
        </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} fileName="The Record" fileUrl="/api/downloads/the-record.pdf" />
      )}
    </div>
  )
}
