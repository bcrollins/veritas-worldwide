import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  buildInstituteCourse,
  getInstituteRelatedTopics,
  getInstituteTopicBySlug,
} from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function InstituteCoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getInstituteTopicBySlug(slug) : undefined

  useEffect(() => {
    if (!topic) return

    setMetaTags({
      title: `${topic.courseTitle} | Veritas Institute | ${SITE_NAME}`,
      description: topic.summary,
      url: `${SITE_URL}/institute/courses/${topic.slug}`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: topic.courseTitle,
        description: topic.summary,
        provider: {
          '@type': 'Organization',
          name: 'Veritas Institute',
          sameAs: `${SITE_URL}/institute`,
        },
        educationalLevel: topic.difficulty,
        timeRequired: topic.timeToFirstResult,
        url: `${SITE_URL}/institute/courses/${topic.slug}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Veritas Institute', item: `${SITE_URL}/institute` },
          { '@type': 'ListItem', position: 2, name: 'Courses', item: `${SITE_URL}/institute` },
          { '@type': 'ListItem', position: 3, name: topic.courseTitle, item: `${SITE_URL}/institute/courses/${topic.slug}` },
        ],
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [topic])

  if (!topic) {
    return (
      <div className="institute-panel px-6 py-12 text-center">
        <p className="institute-eyebrow">Course not found</p>
        <h1 className="mt-4 text-3xl font-semibold text-[color:var(--institute-ink)]">
          This institute course is not in the catalog.
        </h1>
        <Link to="/institute" className="institute-button-primary mt-6 inline-flex">
          Return to the catalog
        </Link>
      </div>
    )
  }

  const course = buildInstituteCourse(topic)
  const relatedTopics = getInstituteRelatedTopics(topic)

  return (
    <article className="space-y-8">
      <section className="institute-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <Link to="/institute" className="text-sm font-medium text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]">
          ← Back to the top 100 catalog
        </Link>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="institute-pill">{topic.trackMeta.shortLabel}</span>
          <span className="institute-pill">{topic.difficulty}</span>
          <span className="institute-pill">{topic.timeToFirstResult}</span>
        </div>

        <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl">
          {course.title}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
          {topic.summary}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Why now</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.whyNow}</p>
          </div>
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">First action</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.firstAction}</p>
          </div>
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Outcome</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.outcome}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={`/institute/guides/${topic.slug}`} className="institute-button-primary">
            Read companion guide
          </Link>
          <Link to="/institute/book" className="institute-button-secondary">
            See it in the Book of Knowledge
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Course architecture</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
            Six modules built to move from clarity to proof.
          </h2>
          <div className="mt-6 space-y-4">
            {course.modules.map((module, index) => (
              <section key={module.title} className="institute-topic-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface-strong)] text-sm font-semibold text-[color:var(--institute-ink)]">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                    {module.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  This module turns {topic.skill.toLowerCase()} into a repeatable operating sequence rather than a pile of disconnected advice.
                </p>
                <ul className="mt-4 grid gap-2">
                  {module.lessons.map((lesson) => (
                    <li key={lesson} className="institute-list-row">
                      <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Action plan</p>
            <div className="mt-4 space-y-4">
              {course.actionPlan.map((step, index) => (
                <article key={step.title} className="institute-mini-card">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[color:var(--institute-ink)]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{step.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Common mistakes</p>
            <div className="mt-4 grid gap-2">
              {course.commonMistakes.map((mistake) => (
                <div key={mistake} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{mistake}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Operating kit</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Tools, institutions, and official constraints keep the course grounded in reality instead of aspirational content marketing.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">Tools</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{topic.tools.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">Institutions</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{topic.institutions.join(', ')}</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-muted-strong)]">Risk note</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{topic.warning}</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Frequently asked</p>
          <div className="mt-4 space-y-4">
            {course.faq.map((faq) => (
              <article key={faq.question} className="institute-mini-card">
                <h3 className="text-base font-semibold text-[color:var(--institute-ink)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Related paths</p>
          <div className="mt-4 grid gap-4">
            {relatedTopics.map((relatedTopic) => (
              <article key={relatedTopic.id} className="institute-topic-card">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  {relatedTopic.trackMeta.shortLabel}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                  {relatedTopic.skill}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{relatedTopic.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to={`/institute/courses/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                    Course →
                  </Link>
                  <Link to={`/institute/guides/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                    Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
