import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'
import { topicHubs, getTopicArticles, getTopicChapters } from '../data/topicHubs'
import { buildSubscriptionSuccessPath } from '../lib/subscriptionSuccess'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import { formatCompactDollars, getTopicProfileStats } from '../lib/topicDiscovery'

function TopicMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="font-display text-3xl font-bold text-ink">{value}</p>
      <p className="mt-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </p>
    </div>
  )
}

export default function TopicsIndexPage() {
  const successPath = buildSubscriptionSuccessPath({
    source: 'topic_hub',
    interest: 'research topics',
    returnTo: '/topics',
  })

  const topicSnapshots = useMemo(
    () =>
      topicHubs.map((topic) => {
        const chapterCount = getTopicChapters(topic).length
        const articleCount = getTopicArticles(topic).length
        const profileStats = getTopicProfileStats(topic)
        const signalScore =
          articleCount * 4 +
          chapterCount * 3 +
          profileStats.profileCount * 2 +
          Math.min(profileStats.claimCount, 24)

        return {
          topic,
          chapterCount,
          articleCount,
          profileStats,
          signalScore,
        }
      }),
    []
  )

  const totals = useMemo(
    () =>
      topicSnapshots.reduce(
        (summary, snapshot) => {
          summary.chapters += snapshot.chapterCount
          summary.articles += snapshot.articleCount
          summary.profiles += snapshot.profileStats.profileCount
          summary.claims += snapshot.profileStats.claimCount
          return summary
        },
        { chapters: 0, articles: 0, profiles: 0, claims: 0 }
      ),
    [topicSnapshots]
  )

  const featuredTopics = useMemo(
    () => [...topicSnapshots].sort((a, b) => b.signalScore - a.signalScore).slice(0, 3),
    [topicSnapshots]
  )

  useEffect(() => {
    setMetaTags({
      title: `Research Topics | ${SITE_NAME}`,
      description:
        'Explore Veritas Worldwide topic hubs covering the Federal Reserve, AIPAC, surveillance, JFK, the Epstein network, Israel policy, and more.',
      url: `${SITE_URL}/topics`,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Research Topics | ${SITE_NAME}`,
        url: `${SITE_URL}/topics`,
        description:
          'Curated research hubs connecting Veritas chapters, current reporting, profiles, and newsletter entry paths by topic.',
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
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">
              Home
            </Link>
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
            Topic corridors built to expose the archive, the news desk, and the power map together.
          </h1>
          <p className="font-body text-lg text-ink-muted leading-relaxed max-w-3xl mt-5">
            These hubs are not just keyword landing pages. Each one ties together longform chapters,
            current reporting, and the people most associated with that beat so a reader can move from
            a single query into a structured body of evidence.
          </p>

          <div className="grid gap-4 mt-10 sm:grid-cols-2 xl:grid-cols-4">
            <TopicMetric label="Topic corridors" value={String(topicSnapshots.length)} />
            <TopicMetric label="Linked chapters" value={String(totals.chapters)} />
            <TopicMetric label="Current briefings" value={String(totals.articles)} />
            <TopicMetric label="Related profiles" value={String(totals.profiles)} />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            High-Signal Starting Points
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredTopics.map(({ topic, articleCount, chapterCount, profileStats }) => (
            <Link
              key={topic.slug}
              to={`/topics/${topic.slug}`}
              className="group rounded-[28px] border border-border bg-surface p-6 transition-colors hover:border-crimson/35 hover:bg-parchment-dark/30"
            >
              <p className="font-sans text-[0.58rem] font-bold tracking-[0.18em] uppercase text-crimson">
                {topic.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors">
                {topic.name}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                {topic.headline}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="rounded-2xl bg-parchment px-4 py-3">
                  <p className="font-display text-2xl font-bold text-ink">{chapterCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">Core chapters</p>
                </div>
                <div className="rounded-2xl bg-parchment px-4 py-3">
                  <p className="font-display text-2xl font-bold text-ink">{articleCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">News briefings</p>
                </div>
                <div className="rounded-2xl bg-parchment px-4 py-3">
                  <p className="font-display text-2xl font-bold text-ink">{profileStats.profileCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">Related profiles</p>
                </div>
                <div className="rounded-2xl bg-parchment px-4 py-3">
                  <p className="font-display text-2xl font-bold text-ink">{profileStats.claimCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.14em] text-ink-faint">Sourced claims</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {topic.keywords.slice(0, 4).map((keyword) => (
                  <span
                    key={`${topic.slug}-${keyword}`}
                    className="inline-flex items-center rounded-sm bg-obsidian px-2.5 py-1 font-sans text-[0.58rem] uppercase tracking-[0.08em] text-white/75"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Full Topic Map
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topicSnapshots.map(({ topic, articleCount, chapterCount, profileStats }) => (
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

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div>
                  <p className="font-display text-xl font-bold text-ink">{chapterCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Chapters</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">{articleCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">News briefings</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">{profileStats.profileCount}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Profiles</p>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-ink">{formatCompactDollars(profileStats.donationVolume)}</p>
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Tracked donations</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-parchment p-4">
                <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-ink-faint">
                  Search cues
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {topic.keywords.slice(0, 5).map((keyword) => (
                    <span
                      key={`${topic.slug}-cue-${keyword}`}
                      className="inline-flex items-center rounded-sm border border-border bg-surface px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.08em] text-ink-faint"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <NewsletterSignup
          variant="dark"
          source="topic_hub"
          contentInterest="research_topics"
          heading="Subscribe once. Follow every beat that matters."
          subtext="Veritas Worldwide sends new investigations, source releases, and current reporting directly to subscribers. No algorithm required."
          successPath={successPath}
        />
      </section>
    </div>
  )
}
