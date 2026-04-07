import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InstituteBookPDF from '../components/institute/InstituteBookPDF'
import {
  buildInstituteBookSection,
  getInstituteTrackCounts,
  getInstituteTopicsByTrack,
  instituteResearchSources,
} from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function InstituteBookPage() {
  const tracks = getInstituteTrackCounts()

  useEffect(() => {
    setMetaTags({
      title: `Book of Knowledge | Veritas Institute | ${SITE_NAME}`,
      description:
        'The Veritas Institute Book of Knowledge compiles practical 2026 skill paths, preparedness systems, and source-backed field guidance into one print-ready manual.',
      url: `${SITE_URL}/institute/book`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'The Veritas Institute Book of Knowledge',
        description:
          'A print-ready field manual compiling the Veritas Institute catalog of practical skills, career paths, and grid-down resilience systems.',
        url: `${SITE_URL}/institute/book`,
        author: {
          '@type': 'Organization',
          name: 'Veritas Institute',
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: tracks.map((track, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: track.label,
          url: `${SITE_URL}/institute/book#track-${track.id}`,
        })),
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [tracks])

  return (
    <div className="space-y-8">
      <section className="institute-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <p className="institute-eyebrow">Book of Knowledge</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl">
              The grid-down field manual for work, household continuity, and practical self-reliance.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
              This is the institute’s long-form archive: 100 search-intent skills turned into printable operating notes, direct answers, and source-aware next steps. It is designed to remain useful when bandwidth, attention, or infrastructure is thin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <InstituteBookPDF />
              <button type="button" onClick={() => window.print()} className="institute-button-secondary">
                Print this page
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="institute-stat">
              <span className="institute-stat-value">100</span>
              <span className="institute-stat-label">knowledge entries</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">10</span>
              <span className="institute-stat-label">navigable tracks</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">PDF</span>
              <span className="institute-stat-label">offline export</span>
            </div>
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Table of contents</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => (
            <a key={track.id} href={`#track-${track.id}`} className="institute-list-row">
              <span className="text-sm font-medium text-[color:var(--institute-ink)]">{track.label}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">{track.count} entries</span>
            </a>
          ))}
        </div>
      </section>

      {tracks.map((track) => {
        const topics = getInstituteTopicsByTrack(track.id)

        return (
          <section key={track.id} id={`track-${track.id}`} className="institute-panel px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="institute-eyebrow">{track.shortLabel}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                  {track.label}
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  {track.demandSignal}
                </p>
              </div>
              <div className="rounded-full border border-[color:var(--institute-border)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">
                {topics.length} field entries
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {topics.map((topic) => {
                const section = buildInstituteBookSection(topic)

                return (
                  <article key={topic.id} className="institute-topic-card">
                    <div className="flex flex-wrap gap-2">
                      <span className="institute-pill">{topic.difficulty}</span>
                      <span className="institute-pill">{topic.timeToFirstResult}</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                      {section.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{section.summary}</p>

                    <div className="mt-4 rounded-2xl border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                        Fast answer
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{section.quickAnswer}</p>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {section.steps.slice(0, 3).map((step, index) => (
                        <div key={step.title} className="institute-mini-card">
                          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                            Step {index + 1}
                          </p>
                          <h4 className="mt-2 text-base font-semibold text-[color:var(--institute-ink)]">{step.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-muted)]">{step.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 border-t border-[color:var(--institute-border)] pt-4">
                      <p className="text-sm leading-relaxed text-[color:var(--institute-muted)]">
                        <span className="font-medium text-[color:var(--institute-ink)]">Risk note:</span> {section.warning}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                        <span className="font-medium text-[color:var(--institute-ink)]">Official anchors:</span> {section.institutions.join(', ')}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to={`/institute/guides/${topic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                        Guide →
                      </Link>
                      <Link to={`/institute/courses/${topic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                        Course →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Research basis</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
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
      </section>
    </div>
  )
}
