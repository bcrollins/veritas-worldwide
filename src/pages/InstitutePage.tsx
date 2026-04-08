import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getInstitutePracticalTrackCounts,
  getInstituteTopicsByTrack,
  instituteFieldManualEntries,
  institutePracticalTopics,
  instituteResearchSources,
  type InstituteTrackId,
} from '../data/instituteCatalog'
import InstituteCollectionSignupPanel from '../components/institute/InstituteCollectionSignupPanel'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const filters: { id: InstituteTrackId | 'all'; label: string }[] = [
  { id: 'all', label: 'All tracks' },
  { id: 'trades', label: 'Trades' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'home-repair', label: 'Repair' },
  { id: 'food-self-reliance', label: 'Food & Garden' },
  { id: 'preparedness', label: 'Preparedness' },
]

export default function InstitutePage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<InstituteTrackId | 'all'>('all')
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    setMetaTags({
      title: `Veritas Institute | Field Manual and Practical Trade Courses | ${SITE_NAME}`,
      description:
        'Veritas Institute pairs a printable field manual for ordinary emergencies with source-backed trade, repair, preparedness, food, and healthcare-support courses.',
      url: `${SITE_URL}/institute`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Veritas Institute',
        url: `${SITE_URL}/institute`,
        description:
          'A source-backed learning surface built around a practical field manual plus trade, repair, preparedness, food, and healthcare-support course paths.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: institutePracticalTopics.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.skill,
          url: `${SITE_URL}/institute/guides/${topic.slug}`,
          description: topic.summary,
        })),
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  const normalizedQuery = deferredQuery.trim().toLowerCase()
  const filteredTopics = institutePracticalTopics.filter((topic) => {
    if (activeFilter !== 'all' && topic.track !== activeFilter) return false
    if (!normalizedQuery) return true

    const haystack = [
      topic.skill,
      topic.courseTitle,
      topic.articleTitle,
      topic.summary,
      topic.whyNow,
      topic.outcome,
      ...topic.keywords,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })

  const trackCounts = getInstitutePracticalTrackCounts()
  const trackClusters = trackCounts.map((track) => ({
    ...track,
    featuredTopics: getInstituteTopicsByTrack(track.id).slice(0, 4),
  }))
  const practicalCourseCount = institutePracticalTopics.length

  return (
    <div className="space-y-8">
      <section className="institute-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="institute-eyebrow">Veritas Institute</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl lg:text-6xl">
              The field manual for ordinary emergencies. The course library for trades, repair, and resilient households.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
              Veritas Institute is built around two jobs. First: answer the immediate question in front of you, fast and safely. Second: route readers into practical course paths for real trade work, household systems, food resilience, and healthcare-support skills.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/institute/book" className="institute-button-primary">
                Open the Field Manual
              </Link>
              <Link to="/institute/methodology" className="institute-button-secondary">
                See the sourcing method
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="institute-stat">
              <span className="institute-stat-value">{instituteFieldManualEntries.length}</span>
              <span className="institute-stat-label">field-manual answers</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">{practicalCourseCount}</span>
              <span className="institute-stat-label">practical course paths</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">{trackClusters.length}</span>
              <span className="institute-stat-label">core practical tracks</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">1</span>
              <span className="institute-stat-label">printable field manual PDF</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Methodology</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            Same Veritas discipline. No “life-hack” theater.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
            Public safety guidance, extension resources, accredited pathways, code boundaries, and durable labor-market signals outrank influencer mythology. We publish the source ladder, the risk note, and the official checkpoint instead of pretending every hard problem has a shortcut.
          </p>
          <div className="mt-6 grid gap-3">
            {instituteResearchSources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="institute-list-row"
              >
                <span className="text-sm font-medium text-[color:var(--institute-ink)]">{source.label}</span>
                <span className="text-xs leading-relaxed text-[color:var(--institute-muted)]">{source.note}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">How to use the institute</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">1. Start with the manual</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Use the field manual when the question is immediate: water, blood, fuel, food, cold, utilities, vehicle trouble, or a fast household failure.
              </p>
            </article>
            <article className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">2. Open the course</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Move into the course path when the answer becomes a skill: electrician, welder, HVAC, plumbing, vehicle maintenance, food systems, or healthcare support.
              </p>
            </article>
            <article className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">3. Keep the official anchor</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Every answer should still route back to the right public agency, manufacturer guidance, licensing body, or extension resource.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="institute-eyebrow">Trade course library</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
              Five practical tracks built around work people can actually do and systems households actually need.
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
              These tracks are intentionally concrete: skilled trades, repair, preparedness, food resilience, and healthcare-support pathways. The goal is not breadth for its own sake. The goal is practical usefulness.
            </p>
          </div>
          <Link to="/institute/methodology" className="text-sm font-medium text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]">
            Read the full methodology →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {trackClusters.map((track) => (
            <article key={track.id} id={`track-${track.id}`} className="institute-track-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    {track.shortLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                    {track.label}
                  </h3>
                </div>
                <span className="rounded-full border border-[color:var(--institute-border)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">
                  {track.count} skills
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                {track.description}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                <span className="font-medium text-[color:var(--institute-ink)]">Demand signal:</span> {track.demandSignal}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                <span className="font-medium text-[color:var(--institute-ink)]">Method note:</span> {track.methodology}
              </p>

              <div className="mt-5 grid gap-3">
                {track.featuredTopics.map((topic) => (
                  <Link key={topic.id} to={`/institute/guides/${topic.slug}`} className="institute-list-row">
                    <span className="text-sm font-medium text-[color:var(--institute-ink)]">{topic.skill}</span>
                    <span className="text-xs leading-relaxed text-[color:var(--institute-muted)]">{topic.outcome}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-[color:var(--institute-border)] pt-4">
                <button
                  type="button"
                  className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]"
                  onClick={() => setActiveFilter(track.id)}
                >
                  Filter catalog
                </button>
                <a href={`#catalog`} className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  Jump to results
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="catalog" className="institute-panel px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="institute-eyebrow">Course catalog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
              Search the practical course catalog by skill, outcome, or track.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Every topic has a course path, a direct-answer guide built for retrieval and citation, and a place inside the printable field manual.
            </p>
          </div>
          <div className="min-w-0 lg:w-[24rem]">
            <label className="sr-only" htmlFor="institute-search">
              Search the practical course catalog
            </label>
            <input
              id="institute-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="institute-input"
              placeholder="Search welding, roof leak, emergency water, garden setup…"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`institute-filter-pill ${activeFilter === filter.id ? 'is-active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[color:var(--institute-border)] pt-5">
          <p className="text-sm text-[color:var(--institute-muted)]">
            Showing <span className="font-semibold text-[color:var(--institute-ink)]">{filteredTopics.length}</span> of {practicalCourseCount} practical course paths
          </p>
          <Link to="/institute/book" className="text-sm font-medium text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]">
            Jump to the full manual →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {filteredTopics.map((topic) => (
            <article key={topic.id} className="institute-topic-card">
              <div className="flex flex-wrap gap-2">
                <span className="institute-pill">{topic.trackMeta.shortLabel}</span>
                <span className="institute-pill">{topic.difficulty}</span>
                <span className="institute-pill">{topic.timeToFirstResult}</span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                {topic.skill}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                {topic.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                <span className="font-medium text-[color:var(--institute-ink)]">Why now:</span> {topic.whyNow}
              </p>

              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                <div className="institute-mini-card">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    Course
                  </p>
                  <h4 className="mt-2 text-base font-semibold text-[color:var(--institute-ink)]">
                    {topic.courseTitle}
                  </h4>
                  <Link to={`/institute/courses/${topic.slug}`} className="mt-4 inline-flex text-sm font-medium text-[color:var(--institute-accent)]">
                    Open course →
                  </Link>
                </div>

                <div className="institute-mini-card">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    Guide
                  </p>
                  <h4 className="mt-2 text-base font-semibold text-[color:var(--institute-ink)]">
                    {topic.articleTitle}
                  </h4>
                  <Link to={`/institute/guides/${topic.slug}`} className="mt-4 inline-flex text-sm font-medium text-[color:var(--institute-accent)]">
                    Open guide →
                  </Link>
                </div>
              </div>

              <div className="mt-5 border-t border-[color:var(--institute-border)] pt-4">
                <p className="text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  <span className="font-medium text-[color:var(--institute-ink)]">First action:</span> {topic.firstAction}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  <span className="font-medium text-[color:var(--institute-ink)]">Outcome:</span> {topic.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">What the institute ships</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">Courses</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Structured learning paths with prerequisites, module deliverables, proof standards, and 30-day operating sequences.
              </p>
            </div>
            <div className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">Guides</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Direct-answer reference pages built for search, citation, and low-friction retrieval by both humans and LLMs.
              </p>
            </div>
            <div className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">Field manual</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                A print-ready field manual that answers immediate household and roadside problems, then routes into the deeper course library.
              </p>
            </div>
          </div>
        </div>

        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Connection to Veritas</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            The same Veritas brand kit. A more tactical information format.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
            The institute now inherits the same parchment, ink, crimson, and gold visual system as the publication itself. What changes here is the information density: faster retrieval, clearer operational steps, and a direct bridge from emergency answer to practical trade course.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/methodology" className="institute-button-secondary">
              Publication methodology
            </Link>
            <Link to="/sources" className="institute-button-secondary">
              Source library
            </Link>
          </div>
        </div>
      </section>

      <InstituteCollectionSignupPanel
        surface="catalog"
        fieldManualCount={instituteFieldManualEntries.length}
        practicalCourseCount={practicalCourseCount}
        trackCount={trackClusters.length}
      />
    </div>
  )
}
