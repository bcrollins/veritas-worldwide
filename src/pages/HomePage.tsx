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
import {
  getInstitutePracticalTrackCounts,
  getInstituteTopicBySlug,
  instituteFieldManualEntries,
  institutePracticalTopics,
  type InstituteTopic,
} from '../data/instituteCatalog'
import { PROFILES, getProfilePhoto } from '../data/profileData'
import { trackDownload } from '../lib/ga4'
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  websiteJsonLd,
  organizationJsonLd,
  SITE_URL,
  SITE_NAME,
} from '../lib/seo'
import { estimateReadingTime } from '../lib/readingTime'
import SocialProofBanner from '../components/engagement/SocialProofBanner'
import SharePanel from '../components/SharePanel'
const DownloadPDF = lazy(() => import('../components/DownloadPDF'))

const instituteFeaturedTopics = [
  'how-to-become-a-welder',
  'how-to-maintain-a-car-yourself',
  'how-to-build-a-72-hour-emergency-kit',
  'how-to-start-a-garden-that-actually-feeds-you',
]
  .map((slug) => getInstituteTopicBySlug(slug))
  .filter((topic): topic is InstituteTopic => Boolean(topic))

const instituteTrackCount = getInstitutePracticalTrackCounts().length
const instituteGuideAndCourseCount = institutePracticalTopics.length * 2

/** High-signal power profiles for the home discovery strip (claims-dense + first-party portraits). */
const homeFeaturedProfiles = [...PROFILES]
  .sort((a, b) => b.sourcedClaims.length - a.sourcedClaims.length)
  .slice(0, 6)

export default function HomePage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  useEffect(() => {
    setMetaTags({
      // ~52 chars — within Google ~50–60 SERP title guidance
      title: `The Record | Primary Sources — ${SITE_NAME}`,
      // ~155 chars after clamp — high-intent documentary archive pitch
      description:
        'Primary-source documentary history of power, money, and institutions. 32 archive parts, 500+ citations, free public access. Verify every claim yourself.',
      url: SITE_URL,
      imageAlt: 'The Record — Veritas Worldwide documentary archive',
    })
    // Shared helpers keep client hydration aligned with index.html static JSON-LD + E-E-A-T sameAs
    setJsonLd([websiteJsonLd(), organizationJsonLd()])
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
              <span className="hidden md:inline"><AnimatedCounter end={32} /> Archive Parts</span>
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
                    <div>
                      <Link to={`/chapter/${featured.id}`} className="group block">
                        {featured.heroImage && (
                          <div className="overflow-hidden mb-6">
                            <img
                              src={featured.heroImage}
                              alt={featured.title ? `${featured.title} — chapter hero` : 'Featured chapter hero'}
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                              width={1200}
                              height={640}
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

                      {/* Mobile: primary CTA + compact text links so first-screen density stays readable */}
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <Link
                          to="/read"
                          className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-crimson px-6 py-3 text-white font-sans text-sm font-semibold hover:bg-crimson-dark transition-colors"
                        >
                          Read The Record
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:contents">
                          <Link
                            to="/israel-dossier"
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm sm:border sm:border-crimson/40 sm:bg-crimson/5 sm:px-6 sm:py-3 text-crimson font-sans text-sm font-semibold hover:text-crimson-dark sm:hover:bg-crimson/10 transition-colors"
                          >
                            Israel Dossier
                          </Link>
                          <Link
                            to="/institute"
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm sm:border sm:border-border sm:px-6 sm:py-3 text-ink-muted sm:text-ink font-sans text-sm font-semibold hover:text-crimson sm:hover:border-crimson transition-colors"
                          >
                            Veritas Institute
                          </Link>
                        </div>
                      </div>
                    </div>
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

              {/* Record of Jesus Christ — pure evidentiary volume track */}
              <div className="mt-8 rounded-sm border border-border bg-surface p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.14em] text-crimson mb-2">
                      Documentary record · Volume II track
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                      The Record of Jesus Christ
                    </h3>
                    <p className="font-body text-sm text-ink-muted leading-relaxed max-w-3xl">
                      190+ tier-labeled claims: cosmology as science, Second Temple sources, historical Jesus criteria, Nestle-Aland/ECM manuscript evidence, Levantine archaeology, and non-Christian attestation. JSON/CSV/PDF export. No advocacy. Entity attribution only.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Link
                      to="/record-of-jesus-christ"
                      className="inline-flex min-h-[44px] items-center rounded-sm bg-crimson px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-dark transition-colors"
                    >
                      Open the Record
                    </Link>
                    <Link
                      to="/bible"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      Bible history
                    </Link>
                    <Link
                      to="/methodology"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      Methodology
                    </Link>
                  </div>
                </div>
              </div>

              {/* Live interactive dossier — not a chapter; separate evidence engine */}
              <div className="mt-8 rounded-sm border border-crimson/25 bg-crimson/5 p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.14em] text-crimson mb-2">
                      Interactive evidence engine
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mb-2">
                      The Israel Dossier
                    </h3>
                    <p className="font-body text-sm text-ink-muted leading-relaxed max-w-3xl">
                      1948→ high-evidence incident corpus, bipartisan actors enablement graph, U.S. aid money trail, legal docket, multimedia source checks, CSV export, and machine-readable corpus.json. Every claim labeled and linked — not an exhaustive global ledger.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Link
                      to="/israel-dossier"
                      className="inline-flex min-h-[44px] items-center rounded-sm bg-crimson px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-dark transition-colors"
                    >
                      Open dossier
                    </Link>
                    <Link
                      to="/israel-dossier?focus=children"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      Children cases
                    </Link>
                    <Link
                      to="/israel-dossier?actor=benjamin-netanyahu"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      Actors graph
                    </Link>
                    <Link
                      to="/israel-dossier?money=hr815"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      Money trail
                    </Link>
                    <Link
                      to="/israel-dossier?era=mandate-1948"
                      className="inline-flex min-h-[44px] items-center rounded-sm border border-border bg-parchment px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-crimson/40 hover:text-crimson transition-colors"
                    >
                      1948 era
                    </Link>
                  </div>
                </div>
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
                <Link to="/topics" className="inline-flex min-h-[44px] items-center font-sans text-xs font-semibold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors">
                  Browse all research topics &rarr;
                </Link>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section className="py-12 border-b border-border" aria-labelledby="home-power-profiles-heading">
              <div className="flex items-center gap-4 mb-8">
                <h2 id="home-power-profiles-heading" className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                  Power Profiles
                </h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <p className="font-body text-sm text-ink-muted max-w-3xl mb-6">
                The people layer behind the record — donations, policy actions, and sourced claims with first-party portraits.
                Machine-readable index at{' '}
                <a href="/profiles/corpus.json" className="text-crimson hover:underline">
                  /profiles/corpus.json
                </a>
                .
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {homeFeaturedProfiles.map((profile) => (
                  <Link
                    key={profile.id}
                    to={`/profile/${profile.id}`}
                    className="group border border-border bg-surface p-4 hover:border-crimson/40 transition-colors text-center min-h-[44px]"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-parchment-dark ring-1 ring-border">
                      <img
                        src={getProfilePhoto(profile.id)}
                        alt=""
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      />
                    </div>
                    <p className="font-display text-sm font-bold text-ink leading-snug group-hover:text-crimson transition-colors">
                      {profile.name}
                    </p>
                    <p className="font-sans text-[0.55rem] uppercase tracking-wider text-ink-faint mt-1 line-clamp-2">
                      {profile.title}
                    </p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/profiles"
                  className="inline-flex min-h-[44px] items-center font-sans text-xs font-semibold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors"
                >
                  Browse all {PROFILES.length} profiles &rarr;
                </Link>
                <a
                  href="/profiles/corpus.json"
                  className="inline-flex min-h-[44px] items-center font-sans text-xs font-semibold tracking-[0.1em] uppercase text-ink-muted hover:text-crimson transition-colors"
                  download="veritas-profiles-corpus.json"
                >
                  Download corpus (JSON)
                </a>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section className="py-12 border-b border-border">
              <div className="institute-shell-root relative overflow-hidden rounded-[32px] border border-border">
                <div className="institute-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

                <div className="relative grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:px-10 lg:py-10">
                  <div className="max-w-3xl">
                    <p className="institute-eyebrow">New Learning Surface</p>
                    <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-[color:var(--institute-ink)] md:text-5xl">
                      Veritas Institute turns urgent household questions and practical trade skills into calm, source-backed instruction.
                    </h2>
                    <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-[color:var(--institute-muted)]">
                      The same Veritas brand system, applied to a different problem: immediate field-manual answers for real-world failures, plus course paths in trades, repair, preparedness, food systems, and healthcare-support work.
                    </p>
                    <p className="mt-5 max-w-2xl font-sans text-[0.72rem] font-medium uppercase tracking-[0.14em] text-[color:var(--institute-muted-strong)]">
                      Built from BLS, Ready.gov, CDC, USDA extension guidance, NHTSA, Energy.gov, and public credential pathways.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to="/institute" className="institute-button-primary">
                        Enter the Institute
                      </Link>
                      <Link to="/institute/book" className="institute-button-secondary">
                        Open the Field Manual
                      </Link>
                      <a
                        href="/veritas-institute-field-manual.pdf"
                        className="institute-button-secondary"
                        download="veritas-institute-field-manual.pdf"
                        onClick={() => trackDownload('veritas-institute-field-manual')}
                      >
                        Download PDF
                      </a>
                      <Link
                        to="/institute/methodology"
                        className="inline-flex min-h-[44px] items-center font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]"
                      >
                        Review the method →
                      </Link>
                    </div>

                    <div className="mt-8 grid gap-5 border-t border-[color:var(--institute-border)] pt-6 sm:grid-cols-3">
                      <div>
                        <p className="font-sans text-3xl font-bold tracking-[-0.04em] text-[color:var(--institute-ink)]">
                          {instituteFieldManualEntries.length}
                        </p>
                        <p className="mt-2 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--institute-muted)]">
                          field answers
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-3xl font-bold tracking-[-0.04em] text-[color:var(--institute-ink)]">
                          {instituteGuideAndCourseCount}
                        </p>
                        <p className="mt-2 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--institute-muted)]">
                          course and guide titles
                        </p>
                      </div>
                      <div>
                        <p className="font-sans text-3xl font-bold tracking-[-0.04em] text-[color:var(--institute-ink)]">
                          {instituteTrackCount}
                        </p>
                        <p className="mt-2 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--institute-muted)]">
                          practical tracks
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="self-start rounded-[28px] border border-[color:var(--institute-border)] bg-[color:var(--institute-surface)]/85 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-4 border-b border-[color:var(--institute-border)] px-5 py-4">
                      <div>
                        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[color:var(--institute-accent)]">
                          Start Here
                        </p>
                        <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                          Four practical paths
                        </h3>
                      </div>
                      <Link
                        to="/institute"
                        className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]"
                      >
                        See the catalog →
                      </Link>
                    </div>

                    <div className="divide-y divide-[color:var(--institute-border)]">
                      {instituteFeaturedTopics.map((topic) => (
                        <article key={topic.id} className="px-5 py-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="institute-pill">{topic.trackMeta.shortLabel}</span>
                            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">
                              {topic.timeToFirstResult}
                            </span>
                          </div>

                          <h4 className="mt-4 font-display text-2xl font-bold leading-tight text-[color:var(--institute-ink)]">
                            {topic.skill}
                          </h4>
                          <p className="mt-3 font-body text-sm leading-relaxed text-[color:var(--institute-muted)]">
                            {topic.summary}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-5">
                            <Link
                              to={`/institute/courses/${topic.slug}`}
                              className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]"
                            >
                              Course →
                            </Link>
                            <Link
                              to={`/institute/guides/${topic.slug}`}
                              className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]"
                            >
                              Guide →
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
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
                  <div key={chapter.id} className="group py-5 px-4 -mx-4 hover:bg-parchment-dark/30 transition-colors">
                    <Link to={`/chapter/${chapter.id}`} className="flex gap-4">
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
                      </div>
                    </Link>
                    {chapter.keywords && chapter.keywords.slice(0, 3).length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mt-2 sm:pl-28">
                        {chapter.keywords.slice(0, 3).map(kw => (
                          <Link
                            key={kw}
                            to={getTopicHrefForTerm(kw)}
                            className="inline-flex min-h-[44px] items-center font-sans text-[0.6rem] px-2.5 bg-border text-ink-faint hover:text-crimson hover:bg-crimson/5 transition-colors rounded-sm"
                          >
                            {kw}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
                  The Record is a 32-part documentary archive compiled from public archives, court records, and declassified documents. Every claim is sourced and evidence-classified.
                </p>
                <div className="flex flex-col gap-2">
                  <Link to="/methodology" className="inline-flex min-h-[44px] items-center font-sans text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors">
                    → Methodology
                  </Link>
                  <Link to="/chapter/foreword" className="inline-flex min-h-[44px] items-center font-sans text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors">
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
            title="The Record — Veritas Worldwide"
            description="A 32-part documentary archive compiled from primary sources — court records, congressional testimony, declassified files. The full archive and source library are public."
            contentId="home"
          />

          {/* Reading Guide CTA */}
          <section className="py-12 border-t border-border">
            <div className="bg-obsidian p-8 md:p-12 text-center">
              <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-3">Before You Begin</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">Read the Methodology &amp; Evidence Standards</h3>
              <p className="font-body text-sm text-white/60 max-w-xl mx-auto mb-6">
                Every claim in this publication is classified using a three-tier evidence system. Understanding how to read the evidence tiers will help you evaluate each claim independently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/chapter/foreword" className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white hover:bg-crimson-dark transition-colors">Read the Foreword</Link>
                <Link to="/methodology" className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors">Methodology</Link>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-4">Get the Complete Book</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/read" className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 bg-white text-ink font-sans text-sm font-semibold hover:bg-white/90 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Read Online — Free
                  </Link>
                  <button onClick={() => setShowDownloadModal(true)} className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-sans text-sm font-semibold hover:bg-white/10 transition-colors">
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
