import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getInstituteTrackCounts,
  instituteResearchSources,
  instituteTopics,
  type InstituteTrackId,
} from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const filters: { id: InstituteTrackId | 'all'; label: string }[] = [
  { id: 'all', label: 'All tracks' },
  { id: 'ai-automation', label: 'AI & Automation' },
  { id: 'trades', label: 'Trades' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'tech', label: 'Tech & Data' },
  { id: 'business', label: 'Business' },
  { id: 'money', label: 'Money systems' },
  { id: 'home-repair', label: 'Repair' },
  { id: 'food-self-reliance', label: 'Food & Garden' },
  { id: 'preparedness', label: 'Preparedness' },
  { id: 'communication', label: 'Core skills' },
]

export default function InstitutePage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<InstituteTrackId | 'all'>('all')

  useEffect(() => {
    setMetaTags({
      title: `Veritas Institute | Practical Skills Courses for 2026 | ${SITE_NAME}`,
      description:
        'Veritas Institute turns the top 100 practical skill-intent questions of 2026 into source-backed courses, direct-answer guides, and a print-ready Book of Knowledge.',
      url: `${SITE_URL}/institute`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Veritas Institute',
        url: `${SITE_URL}/institute`,
        description:
          'A course-and-guide catalog answering the top practical skill-intent questions of 2026 across AI, trades, healthcare, business, household systems, and preparedness.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: instituteTopics.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.skill,
          url: `${SITE_URL}/institute/guides/${topic.slug}`,
        })),
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredTopics = instituteTopics.filter((topic) => {
    if (activeFilter !== 'all' && topic.track !== activeFilter) return false
    if (!normalizedQuery) return true

    const haystack = [
      topic.skill,
      topic.courseTitle,
      topic.articleTitle,
      topic.summary,
      topic.whyNow,
      ...topic.keywords,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })

  const trackCounts = getInstituteTrackCounts()

  return (
    <div className="space-y-8">
      <section className="institute-panel-strong overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="institute-eyebrow">Veritas Institute</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl lg:text-6xl">
              A separate learning interface for practical skills, resilient systems, and proof-first career moves.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
              We took the strongest 2026 public demand signals across labor markets, official preparedness guidance, household repair, self-reliance, and AI-era work. Then we turned them into 100 course pathways, 100 direct-answer guides, and one field manual.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/institute/book" className="institute-button-primary">
                Open the Book of Knowledge
              </Link>
              <Link to="/institute/methodology" className="institute-button-secondary">
                See the demand method
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="institute-stat">
              <span className="institute-stat-value">100</span>
              <span className="institute-stat-label">search-intent skills</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">200</span>
              <span className="institute-stat-label">course and guide titles</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">10</span>
              <span className="institute-stat-label">tracks for navigation</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">1</span>
              <span className="institute-stat-label">printable field manual</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Methodology</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            Same Veritas discipline. No guru theater.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
            Official guidance, accredited pathways, extension resources, and durable labor-market signals outrank influencer mythology. We do not pretend there is a single official “top 100” search report. We show the synthesis and the source ladder.
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
          <p className="institute-eyebrow">Tracks</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trackCounts.map((track) => (
              <article key={track.id} id={`track-${track.id}`} className="institute-track-card">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  {track.shortLabel}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                  {track.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  {track.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-[color:var(--institute-border)] pt-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">
                    {track.count} skills
                  </span>
                  <button
                    type="button"
                    className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]"
                    onClick={() => setActiveFilter(track.id)}
                  >
                    Filter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="institute-eyebrow">Top 100 catalog</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
              Search the 2026 catalog by skill, outcome, or track.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Every topic has a course path, a direct-answer guide built for search and LLM retrieval, and a place inside the Book of Knowledge.
            </p>
          </div>
          <div className="min-w-0 lg:w-[24rem]">
            <label className="sr-only" htmlFor="institute-search">
              Search the institute catalog
            </label>
            <input
              id="institute-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="institute-input"
              placeholder="Search welding, AI income, emergency water, bookkeeping…"
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
            Showing <span className="font-semibold text-[color:var(--institute-ink)]">{filteredTopics.length}</span> of 100 skills
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
                Structured learning paths with modules, action plans, common mistakes, and proof-of-work framing.
              </p>
            </div>
            <div className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">Guides</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                Direct-answer articles with quick answers, HowTo schema, FAQ structure, and retrieval-friendly steps.
              </p>
            </div>
            <div className="institute-mini-card">
              <h3 className="text-lg font-semibold text-[color:var(--institute-ink)]">Field manual</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                A print-ready Book of Knowledge that compiles the whole catalog into a searchable and downloadable resilience archive.
              </p>
            </div>
          </div>
        </div>

        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Connection to Veritas</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            Still part of Veritas Worldwide. Not dressed like the publication.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
            The institute keeps the documentary discipline of Veritas Press but uses a more technical learning interface: tighter navigation, stronger scanability, clearer steps, and direct-answer structure for search and LLM use.
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
    </div>
  )
}
