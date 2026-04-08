import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getArticleBySlug } from '../data/articles'
import { chapterMeta } from '../data/chapterMeta'
import { getInstituteTopicBySlug } from '../data/instituteCatalog'
import { getTopicArticles, getTopicChapters, getTopicHubByKeyword, getTopicHubBySlug } from '../data/topicHubs'
import { useAuth } from '../lib/AuthContext'
import { clearMetaTags, removeJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

function ChapterCard({ chapterId }: { chapterId: string }) {
  const chapter = chapterMeta.find((entry) => entry.id === chapterId)
  if (!chapter) return null

  return (
    <Link
      to={`/chapter/${chapter.id}`}
      className="group block border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
    >
      <p className="font-sans text-[0.55rem] font-bold tracking-[0.16em] uppercase text-crimson mb-2">
        {chapter.number}
      </p>
      <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
        {chapter.title}
      </h3>
      <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
        {chapter.subtitle}
      </p>
    </Link>
  )
}

function ArticleCard({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)
  if (!article) return null

  return (
    <Link
      to={`/news/${article.slug}`}
      className="group block border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
    >
      <p className="font-sans text-[0.55rem] font-bold tracking-[0.16em] uppercase text-crimson mb-2">
        {article.category}
      </p>
      <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
        {article.title}
      </h3>
      <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
        {article.subtitle}
      </p>
    </Link>
  )
}

function InstitutePathCard({
  eyebrow,
  title,
  description,
  to,
}: {
  eyebrow: string
  title: string
  description: string
  to: string
}) {
  return (
    <Link
      to={to}
      className="group block border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
    >
      <p className="font-sans text-[0.55rem] font-bold tracking-[0.16em] uppercase text-crimson mb-2">
        {eyebrow}
      </p>
      <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
        {title}
      </h3>
      <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
        {description}
      </p>
    </Link>
  )
}

const SOURCE_LABELS: Record<string, string> = {
  topic_hub: 'Topic Hub Subscriber',
  article_cta: 'Current Reporting Subscriber',
  institute_course: 'Institute Course Subscriber',
  institute_guide: 'Institute Guide Subscriber',
  institute_catalog: 'Institute Catalog Subscriber',
  institute_book: 'Field Manual Subscriber',
  newsletter_inline: 'New Subscriber',
  newsletter_footer: 'New Subscriber',
  exit_intent: 'New Subscriber',
  content_gate: 'Archive Subscriber',
  dossier_download: 'Dossier Subscriber',
  membership_page: 'Membership Subscriber',
}

const INSTITUTE_SOURCES = ['institute_course', 'institute_guide', 'institute_catalog', 'institute_book'] as const

export default function SubscribeSuccessPage() {
  const [searchParams] = useSearchParams()
  const { isLoggedIn, openAuthModal } = useAuth()

  const source = searchParams.get('source') || 'newsletter_inline'
  const topicSlug = searchParams.get('topic') || ''
  const articleSlug = searchParams.get('article') || ''
  const interest = searchParams.get('interest') || ''
  const returnTo = searchParams.get('returnTo') || ''

  const instituteTopic = getInstituteTopicBySlug(topicSlug)
  const topic = getTopicHubBySlug(topicSlug) || (interest ? getTopicHubByKeyword(interest) : undefined)
  const article = articleSlug ? getArticleBySlug(articleSlug) : undefined
  const isInstituteSource = INSTITUTE_SOURCES.includes(source as (typeof INSTITUTE_SOURCES)[number])
  const isInstituteTopicSource = Boolean(instituteTopic && (source === 'institute_course' || source === 'institute_guide'))
  const isInstituteBookSource = source === 'institute_book'

  const featuredChapters = (topic ? getTopicChapters(topic) : chapterMeta.slice(0, 3)).slice(0, 3)
  const featuredArticles = (topic ? getTopicArticles(topic) : article ? [article] : []).slice(0, 2)
  const instituteContinueHref = source === 'institute_course'
    ? `/institute/courses/${topicSlug}`
    : source === 'institute_guide'
      ? `/institute/guides/${topicSlug}`
      : source === 'institute_book'
        ? '/institute/book'
        : '/institute'
  const continueHref = returnTo || (
    isInstituteSource
      ? instituteContinueHref
      : article
        ? `/news/${article.slug}`
        : topic
          ? `/topics/${topic.slug}`
          : '/read'
  )
  const accountReturnTo = isInstituteSource
    ? continueHref
    : topic
      ? `/topics/${topic.slug}`
      : continueHref

  const headline = isInstituteSource
    ? 'Your institute subscription is active.'
    : topic
      ? `You're in for ${topic.name}.`
      : 'You are subscribed to the record.'
  const description = isInstituteTopicSource && instituteTopic
    ? `Your inbox is set for ${instituteTopic.trackMeta.shortLabel.toLowerCase()} updates. Use the links below to move from signup into the guide, companion course, and field manual without losing the thread.`
    : isInstituteBookSource
      ? 'Your inbox is set for field-manual updates and new practical paths. Use the links below to reopen the manual, move into the institute catalog, and keep the sourcing method visible.'
      : isInstituteSource
        ? 'Your inbox is set for new practical paths and field-manual updates. Use the links below to reopen the institute, move into the field manual, and keep the sourcing method visible.'
    : topic
      ? `Your inbox is set for ${topic.name} reporting. Use the links below to move from subscription into the documented archive.`
      : 'Your inbox is set. Use the links below to move from subscription into the documented archive.'

  const instituteStartCards = isInstituteTopicSource && instituteTopic
    ? [
        source === 'institute_course'
          ? {
              eyebrow: 'Course',
              title: instituteTopic.courseTitle,
              description: `Return to the paced path for ${instituteTopic.outcome.toLowerCase()}.`,
              to: `/institute/courses/${instituteTopic.slug}`,
            }
          : {
              eyebrow: 'Guide',
              title: instituteTopic.articleTitle,
              description: `Reopen the shortest defensible answer for ${instituteTopic.skill.toLowerCase()}.`,
              to: `/institute/guides/${instituteTopic.slug}`,
            },
        source === 'institute_course'
          ? {
              eyebrow: 'Companion Guide',
              title: instituteTopic.articleTitle,
              description: 'Move from the paced course into the shorter retrieval-first version.',
              to: `/institute/guides/${instituteTopic.slug}`,
            }
          : {
              eyebrow: 'Companion Course',
              title: instituteTopic.courseTitle,
              description: 'Turn the short answer into a paced system with proof standards and checkpoints.',
              to: `/institute/courses/${instituteTopic.slug}`,
            },
        {
          eyebrow: 'Field Manual',
          title: 'Veritas Institute Field Manual',
          description: 'Use the print-friendly manual when the question becomes immediate, household, or time-sensitive.',
          to: '/institute/book',
        },
      ]
    : isInstituteBookSource
      ? [
          {
            eyebrow: 'Field Manual',
            title: 'Veritas Institute Field Manual',
            description: 'Return to the print-friendly manual for immediate household, roadside, and repair answers.',
            to: '/institute/book',
          },
          {
            eyebrow: 'Institute',
            title: 'Veritas Institute Catalog',
            description: 'Move from urgent retrieval into the full catalog of practical trade, repair, preparedness, food, and healthcare-support paths.',
            to: '/institute',
          },
          {
            eyebrow: 'Methodology',
            title: 'Institute Methodology',
            description: 'Review the public source ladder, official anchors, and proof standard behind the manual.',
            to: '/institute/methodology',
          },
        ]
      : isInstituteSource
        ? [
            {
              eyebrow: 'Institute',
              title: 'Veritas Institute Catalog',
              description: 'Return to the catalog of practical trade, repair, preparedness, food, and healthcare-support paths.',
              to: '/institute',
            },
            {
              eyebrow: 'Field Manual',
              title: 'Veritas Institute Field Manual',
              description: 'Open the print-friendly manual for immediate household, roadside, and repair answers.',
              to: '/institute/book',
            },
            {
              eyebrow: 'Methodology',
              title: 'Institute Methodology',
              description: 'Review the public source ladder, official anchors, and proof standard behind the institute.',
              to: '/institute/methodology',
            },
          ]
    : []

  useEffect(() => {
    setMetaTags({
      title: `Subscription Confirmed | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/subscribe/success`,
    })

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [description])

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <section className="border-b border-border bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            {SOURCE_LABELS[source] || 'New Subscriber'}
          </p>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-crimson/10 text-crimson flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
                {headline}
              </h1>
              <p className="font-body text-lg text-ink-muted leading-relaxed max-w-3xl mt-4">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  to={continueHref}
                  className="inline-flex items-center justify-center rounded-sm bg-crimson px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-crimson-dark transition-colors"
                >
                  {isInstituteSource
                    ? isInstituteTopicSource
                      ? 'Continue the path'
                      : isInstituteBookSource
                        ? 'Continue with the manual'
                        : 'Continue with the institute'
                    : topic
                      ? `Continue with ${topic.name}`
                      : 'Continue reading'}
                </Link>
                {isLoggedIn ? (
                  <Link
                    to={isInstituteSource ? '/institute' : '/read'}
                    className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
                  >
                    {isInstituteSource ? 'Open the institute' : 'Open the full archive'}
                  </Link>
                ) : (
                  <button
                    onClick={() => openAuthModal({
                      mode: 'signup',
                      intent: {
                        returnTo: accountReturnTo,
                        source: 'subscribe_success',
                      },
                    })}
                    className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
                  >
                    Create free reader account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
              Start Here
            </h2>
            <div className="flex-1 h-[1px] bg-border" />
          </div>
          <div className="grid gap-4">
            {isInstituteSource
              ? instituteStartCards.map((card) => (
                  <InstitutePathCard
                    key={`${card.eyebrow}-${card.to}`}
                    eyebrow={card.eyebrow}
                    title={card.title}
                    description={card.description}
                    to={card.to}
                  />
                ))
              : featuredChapters.map((chapter) => (
                  <ChapterCard key={chapter.id} chapterId={chapter.id} />
                ))}
          </div>
        </div>

        <aside className="space-y-8">
          <div className="border border-border bg-surface p-5">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
              What Happens Next
            </p>
            <ul className="space-y-3 font-body text-sm text-ink-muted leading-relaxed">
              {isInstituteTopicSource ? (
                <>
                  <li>You&apos;ll receive new practical paths and field-manual updates in this lane.</li>
                  <li>Use a free reader account to move from email into saved institute routes and the wider Veritas archive.</li>
                  <li>The guide handles the short answer. The companion course handles the paced buildout. The field manual handles urgent retrieval.</li>
                </>
              ) : isInstituteSource ? (
                <>
                  <li>You&apos;ll receive new field-manual updates and practical paths from the institute.</li>
                  <li>Use a free reader account to move from email into saved institute routes and the wider Veritas archive.</li>
                  <li>The field manual handles urgent retrieval. The catalog handles the deeper trade, repair, preparedness, food, and healthcare-support path.</li>
                </>
              ) : (
                <>
                  <li>You&apos;ll receive new reporting and source releases in your inbox.</li>
                  <li>Use a free reader account to move from email into the full archive, bookmarks, and gated chapters.</li>
                  <li>Every beat on Veritas links back to the underlying public record.</li>
                </>
              )}
            </ul>
          </div>

          {!isInstituteSource && featuredArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                  Current Reporting
                </h2>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <div className="space-y-4">
                {featuredArticles.map((entry) => (
                  <ArticleCard key={entry.slug} slug={entry.slug} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </div>
  )
}
