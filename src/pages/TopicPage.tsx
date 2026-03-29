import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'
import { getTopicArticles, getTopicChapters, getTopicHubBySlug } from '../data/topicHubs'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getTopicHubBySlug(slug) : undefined

  useEffect(() => {
    if (!topic) return

    const chapters = getTopicChapters(topic)
    const articles = getTopicArticles(topic)

    setMetaTags({
      title: `${topic.name} | ${SITE_NAME}`,
      description: topic.metaDescription,
      url: `${SITE_URL}/topics/${topic.slug}`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${topic.name} | ${SITE_NAME}`,
        url: `${SITE_URL}/topics/${topic.slug}`,
        description: topic.metaDescription,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Research Topics', item: `${SITE_URL}/topics` },
          { '@type': 'ListItem', position: 3, name: topic.name, item: `${SITE_URL}/topics/${topic.slug}` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: [
          ...chapters.map((chapter, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: chapter.title,
            url: `${SITE_URL}/chapter/${chapter.id}`,
          })),
          ...articles.map((article, index) => ({
            '@type': 'ListItem',
            position: chapters.length + index + 1,
            name: article.title,
            url: `${SITE_URL}/news/${article.slug}`,
          })),
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: topic.faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: entry.answer,
          },
        })),
      },
    ])

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [topic])

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink mb-4">Topic Not Found</h1>
        <p className="font-body text-ink-muted mb-6">The research topic you requested does not exist.</p>
        <Link to="/topics" className="font-sans text-sm font-semibold text-crimson hover:text-crimson-dark">
          &larr; Back to Research Topics
        </Link>
      </div>
    )
  }

  const chapters = getTopicChapters(topic)
  const articles = getTopicArticles(topic)

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <Link to="/topics" className="text-ink-muted hover:text-crimson transition-colors">Research Topics</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">{topic.name}</span>
          </div>
        </div>
      </div>

      <section className="border-b border-border bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            {topic.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight max-w-4xl">
            {topic.name}
          </h1>
          <p className="font-body text-xl italic text-ink-muted leading-relaxed max-w-4xl mt-4">
            {topic.headline}
          </p>
          <p className="font-body text-base md:text-lg text-ink-light leading-8 max-w-4xl mt-6">
            {topic.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-8 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
            <span>{chapters.length} core chapters</span>
            <span>&middot;</span>
            <span>{articles.length} linked news briefings</span>
            <span>&middot;</span>
            <span>{topic.keywords.length} search terms</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                Core Chapters
              </h2>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/chapter/${chapter.id}`}
                  className="group border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
                >
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.14em] uppercase text-crimson mb-2">
                    {chapter.number}
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
                    {chapter.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {chapter.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={`${chapter.id}-${keyword}`}
                        className="inline-flex items-center rounded-sm bg-parchment px-2 py-1 font-sans text-[0.6rem] uppercase tracking-[0.08em] text-ink-faint"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                Current Reporting
              </h2>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            {articles.length > 0 ? (
              <div className="space-y-4">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/news/${article.slug}`}
                    className="group block border border-border bg-surface p-5 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
                  >
                    <p className="font-sans text-[0.6rem] font-bold tracking-[0.14em] uppercase text-crimson mb-2">
                      {article.category}
                    </p>
                    <h3 className="font-display text-xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
                      {article.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4 font-sans text-[0.6rem] uppercase tracking-[0.1em] text-ink-faint">
                      <span>{article.publishDate}</span>
                      <span>&middot;</span>
                      <span>{article.readingTime} min read</span>
                      <span>&middot;</span>
                      <span>{article.sources.length} sources</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-border bg-surface p-5">
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  This topic hub is currently anchored in the longform documentary chapters. Use the related search terms below to explore the archive while the news desk expands this beat.
                </p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                Related Searches
              </h2>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.keywords.map((keyword) => (
                <Link
                  key={`${topic.slug}-${keyword}`}
                  to={`/search?q=${encodeURIComponent(keyword)}`}
                  className="inline-flex items-center rounded-sm border border-border bg-surface px-3 py-2 font-sans text-xs text-ink-muted hover:border-crimson hover:text-crimson transition-colors"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                Reader Questions
              </h2>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            <div className="space-y-4">
              {topic.faq.map((entry) => (
                <div key={entry.question} className="border border-border bg-surface p-5">
                  <h3 className="font-display text-xl font-bold text-ink leading-tight">{entry.question}</h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">{entry.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="border border-border bg-surface p-5">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
              Free Reader Accounts
            </p>
            <h2 className="font-display text-2xl font-bold text-ink leading-tight">
              Move from the search result to the full archive.
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
              Topic hubs are built to help readers arrive through search, understand the beat quickly, and then continue into the full chapter archive with a free reader account.
            </p>
            <div className="flex flex-col gap-3 mt-5">
              <Link
                to="/read"
                className="inline-flex items-center justify-center rounded-sm bg-crimson px-4 py-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-crimson-dark transition-colors"
              >
                Read The Record
              </Link>
              <Link
                to="/methodology"
                className="inline-flex items-center justify-center rounded-sm border border-border px-4 py-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
              >
                Methodology
              </Link>
            </div>
          </div>

          <NewsletterSignup
            variant="dark"
            source="topic_hub"
            contentInterest={topic.name}
            heading={topic.subscribeHeading}
            subtext={topic.subscribeSubtext}
          />
        </aside>
      </div>
    </div>
  )
}
