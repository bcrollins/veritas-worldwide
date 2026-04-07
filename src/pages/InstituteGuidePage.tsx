import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  buildInstituteGuide,
  getInstituteRelatedTopics,
  getInstituteTopicBySlug,
} from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function InstituteGuidePage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getInstituteTopicBySlug(slug) : undefined
  const guide = topic ? buildInstituteGuide(topic) : undefined

  useEffect(() => {
    if (!topic || !guide) return

    setMetaTags({
      title: `${guide.title} | Veritas Institute | ${SITE_NAME}`,
      description: guide.llmSummary,
      url: `${SITE_URL}/institute/guides/${topic.slug}`,
      type: 'article',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.llmSummary,
        url: `${SITE_URL}/institute/guides/${topic.slug}`,
        about: [topic.skill, topic.trackMeta.label],
        keywords: topic.keywords.join(', '),
        isAccessibleForFree: true,
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
        '@type': 'HowTo',
        name: guide.title,
        description: guide.quickAnswer,
        url: `${SITE_URL}/institute/guides/${topic.slug}`,
        step: guide.steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.title,
          text: step.detail,
        })),
        supply: topic.tools.map((tool) => ({
          '@type': 'HowToSupply',
          name: tool,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Veritas Institute', item: `${SITE_URL}/institute` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/institute` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: `${SITE_URL}/institute/guides/${topic.slug}` },
        ],
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [guide, topic])

  if (!topic || !guide) {
    return (
      <div className="institute-panel px-6 py-12 text-center">
        <p className="institute-eyebrow">Guide not found</p>
        <h1 className="mt-4 text-3xl font-semibold text-[color:var(--institute-ink)]">
          This institute guide is not in the catalog.
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
          {guide.title}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
          {topic.summary}
        </p>

        <div className="mt-8 rounded-[28px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface)] px-5 py-5">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
            Fast answer
          </p>
          <p className="mt-3 text-base leading-relaxed text-[color:var(--institute-ink)]">
            {guide.quickAnswer}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
              Guide thesis
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{guide.llmSummary}</p>
          </div>
          <div className="institute-mini-card">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
              Why readers land here
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{guide.searchIntent}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">How the path works</p>
          <div className="mt-4 space-y-5">
            {guide.steps.map((step, index) => (
              <section key={step.title} className="institute-topic-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface-strong)] text-sm font-semibold text-[color:var(--institute-ink)]">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                    {step.title}
                  </h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-[color:var(--institute-muted)]">
                  {step.detail}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                  In the Veritas Institute model, this step matters because {topic.skill.toLowerCase()} usually fails when the sequence is unclear and the proof standard is invisible. The guide keeps both in view.
                </p>
              </section>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Who this answer is for</p>
            <div className="mt-4 grid gap-3">
              {guide.idealFor.map((item) => (
                <div key={item} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Before you start</p>
            <div className="mt-4 grid gap-3">
              {guide.prerequisites.map((item) => (
                <div key={item} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Demand and constraints</p>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.whyNow}</p>
            <div className="mt-5 grid gap-4">
              <div className="institute-mini-card">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  First action
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.firstAction}</p>
              </div>
              <div className="institute-mini-card">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  Outcome
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{topic.outcome}</p>
              </div>
              <div className="rounded-2xl border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                  Risk note
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-ink)]">{topic.warning}</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Official checkpoints</p>
            <div className="mt-4 space-y-4">
              {guide.officialCheckpoints.map((item) => (
                <article key={item.title} className="institute-mini-card">
                  <h3 className="text-base font-semibold text-[color:var(--institute-ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Avoid these traps</p>
            <div className="mt-4 grid gap-2">
              {guide.commonMistakes.map((mistake) => (
                <div key={mistake} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{mistake}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Questions people ask next</p>
            <div className="mt-4 grid gap-2">
              {guide.relatedQueries.map((query) => (
                <div key={query} className="institute-list-row">
                  <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{query}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="institute-panel px-6 py-6">
            <p className="institute-eyebrow">Continue the path</p>
            <div className="mt-4 rounded-[28px] border border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)] px-5 py-5">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">
                Companion course
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
                {topic.courseTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                The guide gives the shortest defensible answer. The course turns that answer into a paced system with proof standards, module deliverables, and a 30-day buildout.
              </p>
              <Link to={`/institute/courses/${topic.slug}`} className="institute-button-primary mt-5 inline-flex">
                Open course
              </Link>
            </div>

            <div className="grid gap-4">
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
                    <Link to={`/institute/guides/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                      Guide →
                    </Link>
                    <Link to={`/institute/courses/${relatedTopic.slug}`} className="text-sm font-medium text-[color:var(--institute-accent)]">
                      Course →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Frequently asked</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {guide.faq.map((faq) => (
            <article key={faq.question} className="institute-mini-card">
              <h3 className="text-base font-semibold text-[color:var(--institute-ink)]">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  )
}
