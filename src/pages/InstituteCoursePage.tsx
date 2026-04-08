import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  buildInstituteCourse,
  getInstituteRelatedTopics,
  getInstituteTopicBySlug,
} from '../data/instituteCatalog'
import InstituteSignupPanel from '../components/institute/InstituteSignupPanel'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function InstituteCoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getInstituteTopicBySlug(slug) : undefined
  const course = topic ? buildInstituteCourse(topic) : undefined

  useEffect(() => {
    if (!topic || !course) return

    setMetaTags({
      title: `${topic.courseTitle} | Veritas Institute | ${SITE_NAME}`,
      description: course.llmSummary,
      url: `${SITE_URL}/institute/courses/${topic.slug}`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: topic.courseTitle,
        description: course.llmSummary,
        provider: {
          '@type': 'Organization',
          name: 'Veritas Institute',
          sameAs: `${SITE_URL}/institute`,
        },
        educationalLevel: topic.difficulty,
        educationalUse: 'Self-study',
        learningResourceType: 'Course outline',
        timeRequired: topic.timeToFirstResult,
        teaches: topic.outcome,
        isAccessibleForFree: true,
        about: [topic.skill, topic.trackMeta.label],
        url: `${SITE_URL}/institute/courses/${topic.slug}`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: course.modules.map((module, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: module.title,
          description: module.summary,
        })),
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
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: course.faq.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [course, topic])

  if (!topic || !course) {
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

  const relatedTopics = getInstituteRelatedTopics(topic)

  return (
    <article className="space-y-8">
      <section className="institute-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <Link to="/institute" className="text-sm font-medium text-[color:var(--institute-accent)] transition-colors hover:text-[color:var(--institute-ink)]">
          ← Back to the practical course catalog
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

        <div className="mt-8 rounded-[28px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface)] px-5 py-5">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Course thesis</p>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-[color:var(--institute-ink)]">
            {course.llmSummary}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Search intent</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{course.searchIntent}</p>
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
            See it in the Field Manual
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Who this course is for</p>
            <div className="mt-4 grid gap-3">
              {course.idealFor.map((item) => (
                <div key={item} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Before you start</p>
            <div className="mt-4 grid gap-3">
              {course.prerequisites.map((item) => (
                <div key={item} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">What you leave with</p>
            <div className="mt-4 grid gap-3">
              {course.outcomes.map((item) => (
                <div key={item} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">30-day sprint</p>
            <div className="mt-4 space-y-4">
              {course.sprint.map((week) => (
                <article key={week.title} className="institute-mini-card">
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                    {week.title}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[color:var(--institute-ink)]">{week.objective}</h3>
                  <div className="mt-3 grid gap-2">
                    {week.tasks.map((task) => (
                      <div key={task} className="institute-list-row">
                        <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{task}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Demand signals</p>
            <div className="mt-4 space-y-4">
              {course.demandSignals.map((signal) => (
                <article key={signal.title} className="institute-mini-card">
                  <h3 className="text-base font-semibold text-[color:var(--institute-ink)]">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{signal.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Proof standard</p>
            <div className="mt-4 space-y-4">
              {course.proofFramework.map((item) => (
                <article key={item.title} className="institute-mini-card">
                  <h3 className="text-base font-semibold text-[color:var(--institute-ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Official checkpoints</p>
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
              <div className="grid gap-3">
                {course.officialCheckpoints.map((item) => (
                  <div key={item.title} className="institute-list-row">
                    <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">
                      <span className="font-semibold">{item.title}:</span> {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Course architecture</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
          Six modules built to move from clarity to proof.
        </h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
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
                {module.summary}
              </p>
              <div className="mt-4 rounded-2xl border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  Deliverable
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--institute-ink)]">{module.deliverable}</p>
              </div>
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

        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Questions people ask next</p>
            <div className="mt-4 grid gap-2">
              {course.relatedQueries.map((query) => (
                <div key={query} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{query}</span>
                </div>
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
          </section>
        </div>
      </section>

      <InstituteSignupPanel topic={topic} surface="course" />
    </article>
  )
}
