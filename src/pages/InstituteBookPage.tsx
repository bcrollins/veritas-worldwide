import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InstituteBookPDF from '../components/institute/InstituteBookPDF'
import {
  buildInstituteBookSection,
  getInstitutePracticalTrackCounts,
  getInstituteTopicBySlug,
  getInstituteTopicsByTrack,
  instituteFieldManualEntries,
  instituteResearchSources,
  institutePracticalTopics,
} from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const practicalTracks = getInstitutePracticalTrackCounts()

export default function InstituteBookPage() {
  useEffect(() => {
    setMetaTags({
      title: `Field Manual | Veritas Institute | ${SITE_NAME}`,
      description:
        'The Veritas Institute Field Manual combines urgent household and roadside answers with source-backed trade, repair, preparedness, food, and healthcare-support course paths.',
      url: `${SITE_URL}/institute/book`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'The Veritas Institute Field Manual',
        description:
          'A print-ready field manual for ordinary emergencies plus a practical course library for skilled trades, repair, food resilience, preparedness, and healthcare-support work.',
        url: `${SITE_URL}/institute/book`,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
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
        itemListElement: practicalTracks.map((track, index) => ({
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
  }, [])

  return (
    <div className="space-y-8">
      <section className="institute-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <p className="institute-eyebrow">Field Manual</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl">
              The Veritas field manual for ordinary emergencies, repair calls, and modern trade skills.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
              The front half answers immediate problems: dangerous berries, heavy bleeding, dead batteries, water safety,
              outage sanitation, gas leaks, winter vehicles, and utility failures. The back half organizes the deeper
              course library around practical trade and household systems people can use today.
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
              <span className="institute-stat-value">{instituteFieldManualEntries.length}</span>
              <span className="institute-stat-label">field-manual answers</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">{practicalTracks.length}</span>
              <span className="institute-stat-label">practical tracks</span>
            </div>
            <div className="institute-stat">
              <span className="institute-stat-value">{institutePracticalTopics.length}</span>
              <span className="institute-stat-label">course paths</span>
            </div>
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">How to use the manual</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Start with the urgent problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Open the field-manual entry first when the problem is immediate and the wrong move can make it worse.
            </p>
          </article>
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Use the fast answer</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Each entry shows the shortest defensible answer, what to do now, what to avoid, and the public source that
              should govern the next move.
            </p>
          </article>
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Escalate into the course path</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              When the answer becomes a skill, move into the related guide and course for trades, repair, food systems,
              preparedness, and healthcare-support training.
            </p>
          </article>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Table of contents</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Field manual entries</p>
            <div className="grid gap-3">
              {instituteFieldManualEntries.map((entry) => (
                <a key={entry.id} href={`#manual-${entry.id}`} className="institute-list-row">
                  <span className="text-sm font-medium text-[color:var(--institute-ink)]">{entry.title}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">{entry.category}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Trade course tracks</p>
            <div className="grid gap-3">
              {practicalTracks.map((track) => (
                <a key={track.id} href={`#track-${track.id}`} className="institute-list-row">
                  <span className="text-sm font-medium text-[color:var(--institute-ink)]">{track.label}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">{track.count} courses</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Immediate answers</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
          The printable field-manual section covers the problem first, then the official anchor.
        </h2>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {instituteFieldManualEntries.map((entry) => {
            const relatedTopic = entry.relatedTopicSlug ? getInstituteTopicBySlug(entry.relatedTopicSlug) : undefined

            return (
              <article key={entry.id} id={`manual-${entry.id}`} className="institute-topic-card">
                <div className="flex flex-wrap gap-2">
                  <span className="institute-pill">{entry.category}</span>
                  <span className="institute-pill">Field manual</span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{entry.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  <span className="font-medium text-[color:var(--institute-ink)]">When to use:</span> {entry.whenToUse}
                </p>

                <div className="mt-5 rounded-2xl border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    Quick answer
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{entry.quickAnswer}</p>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="institute-mini-card">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Do now</p>
                    <div className="mt-3 grid gap-3">
                      {entry.doNow.map((item) => (
                        <div key={item} className="institute-list-row">
                          <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="institute-mini-card">
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Avoid</p>
                    <div className="mt-3 grid gap-3">
                      {entry.avoid.map((item) => (
                        <div key={item} className="institute-list-row">
                          <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-[color:var(--institute-border)] pt-4">
                  <p className="text-sm leading-relaxed text-[color:var(--institute-muted)]">
                    <span className="font-medium text-[color:var(--institute-ink)]">Source anchors:</span> {entry.sourceAnchors.join(', ')}
                  </p>
                </div>

                {relatedTopic ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to={`/institute/guides/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                      Companion guide →
                    </Link>
                    <Link to={`/institute/courses/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                      Companion course →
                    </Link>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      {practicalTracks.map((track) => {
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
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  <span className="font-medium text-[color:var(--institute-ink)]">Method note:</span> {track.methodology}
                </p>
              </div>
              <div className="rounded-full border border-[color:var(--institute-border)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">
                {topics.length} courses
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
                        Guide answer
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
                        <span className="font-medium text-[color:var(--institute-ink)]">First action:</span> {topic.firstAction}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                        <span className="font-medium text-[color:var(--institute-ink)]">Outcome:</span> {topic.outcome}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                        <span className="font-medium text-[color:var(--institute-ink)]">Risk note:</span> {section.warning}
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
