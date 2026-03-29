import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'
import { topicHubs, getTopicArticles, getTopicChapters } from '../data/topicHubs'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function TopicsIndexPage() {
  useEffect(() => {
    setMetaTags({
      title: `Research Topics | ${SITE_NAME}`,
      description: 'Explore Veritas Press topic hubs covering the Federal Reserve, AIPAC, surveillance, JFK, the Epstein network, Israel policy, and more.',
      url: `${SITE_URL}/topics`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Research Topics | ${SITE_NAME}`,
        url: `${SITE_URL}/topics`,
        description: 'Curated research hubs connecting Veritas chapters, current reporting, and newsletter signup paths by topic.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: topicHubs.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.name,
          url: `${SITE_URL}/topics/${topic.slug}`,
        })),
      },
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Research Topics</span>
          </div>
        </div>
      </div>

      <section className="border-b border-border bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            Research Topics
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight max-w-4xl">
            Topic hubs built for search, citation, and sustained reading.
          </h1>
          <p className="font-body text-lg text-ink-muted leading-relaxed max-w-3xl mt-5">
            These pages connect the core chapters of <em>The Record</em> with current reporting so readers can move from a search query into a documented body of work, then subscribe for the next investigation in that beat.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topicHubs.map((topic) => {
            const articleCount = getTopicArticles(topic).length
            const chapterCount = getTopicChapters(topic).length

            return (
              <Link
                key={topic.slug}
                to={`/topics/${topic.slug}`}
                className="group border border-border bg-surface p-6 hover:border-crimson/40 hover:bg-parchment-dark/40 transition-colors"
              >
                <p className="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
                  {topic.eyebrow}
                </p>
                <h2 className="font-display text-2xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
                  {topic.name}
                </h2>
                <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {topic.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={`${topic.slug}-${keyword}`}
                      className="inline-flex items-center rounded-sm bg-parchment px-2 py-1 font-sans text-[0.6rem] uppercase tracking-[0.08em] text-ink-faint"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
                  <span>{chapterCount} chapters</span>
                  <span>&middot;</span>
                  <span>{articleCount} news briefings</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <NewsletterSignup
          variant="dark"
          source="topic_hub"
          contentInterest="research_topics"
          heading="Subscribe once. Follow every beat that matters."
          subtext="Veritas Press sends new investigations, source releases, and current reporting directly to subscribers. No algorithm required."
        />
      </section>
    </div>
  )
}
