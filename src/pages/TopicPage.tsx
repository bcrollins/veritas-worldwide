import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'
import { getTopicArticles, getTopicChapters, getTopicHubBySlug } from '../data/topicHubs'
import { buildSubscriptionSuccessPath } from '../lib/subscriptionSuccess'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import { formatCompactDollars, getTopicProfileMatches, getTopicProfileStats } from '../lib/topicDiscovery'
import { getProfilePhoto } from '../data/profileData'

function TopicStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </p>
    </div>
  )
}

export default function TopicPage() {
  const { slug } = useParams<{ slug: string }>()
  const topic = slug ? getTopicHubBySlug(slug) : undefined

  const chapters = useMemo(() => (topic ? getTopicChapters(topic) : []), [topic])
  const articles = useMemo(() => (topic ? getTopicArticles(topic) : []), [topic])
  const profileMatches = useMemo(() => (topic ? getTopicProfileMatches(topic).slice(0, 8) : []), [topic])
  const profileStats = useMemo(() => (topic ? getTopicProfileStats(topic) : null), [topic])

  const strongestCategories = useMemo(() => {
    if (!profileStats) return []

    return Object.entries(profileStats.categoryBreakdown)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  }, [profileStats])

  useEffect(() => {
    if (!topic) return

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
          ...profileMatches.map((match, index) => ({
            '@type': 'ListItem',
            position: chapters.length + articles.length + index + 1,
            name: match.profile.name,
            url: `${SITE_URL}/profile/${match.profile.id}`,
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
  }, [topic, chapters, articles, profileMatches])

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

  const successPath = buildSubscriptionSuccessPath({
    source: 'topic_hub',
    topic: topic.slug,
    interest: topic.name,
    returnTo: `/topics/${topic.slug}`,
  })

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <Link to="/topics" className="text-ink-muted hover:text-crimson transition-colors">
              Research Topics
            </Link>
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

          {profileStats && (
            <div className="grid gap-4 mt-10 sm:grid-cols-2 xl:grid-cols-5">
              <TopicStatCard label="Core chapters" value={String(chapters.length)} />
              <TopicStatCard label="News briefings" value={String(articles.length)} />
              <TopicStatCard label="Related profiles" value={String(profileStats.profileCount)} />
              <TopicStatCard label="Sourced claims" value={String(profileStats.claimCount)} />
              <TopicStatCard label="Tracked donations" value={formatCompactDollars(profileStats.donationVolume)} />
            </div>
          )}
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
                  This beat is currently anchored in the longform documentary archive and the profile map.
                  Use the key figures and related searches below to continue through the record while the news
                  desk expands current reporting on this corridor.
                </p>
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                Key Figures In This Beat
              </h2>
              <div className="flex-1 h-[1px] bg-border" />
            </div>
            {profileMatches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {profileMatches.map((match) => (
                  <Link
                    key={match.profile.id}
                    to={`/profile/${match.profile.id}`}
                    className="group rounded-2xl border border-border bg-surface p-5 hover:border-crimson/35 hover:bg-parchment-dark/40 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={getProfilePhoto(match.profile.id)}
                        alt={match.profile.name}
                        className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="font-sans text-[0.56rem] font-bold tracking-[0.14em] uppercase text-crimson">
                          {match.profile.category.replace('-', ' ')}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-bold text-ink group-hover:text-crimson transition-colors">
                          {match.profile.name}
                        </h3>
                        <p className="font-body text-sm text-ink-muted mt-1">{match.profile.title}</p>
                      </div>
                    </div>
                    <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted line-clamp-3">
                      {match.profile.summary}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                      <div>
                        <p className="font-display text-xl font-bold text-ink">{match.profile.sourcedClaims.length}</p>
                        <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Claims</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold text-ink">{match.profile.connections.length}</p>
                        <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Links</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold text-ink">{match.profile.donations.length}</p>
                        <p className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">Donations</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {match.matchedTerms.slice(0, 3).map((term) => (
                        <span
                          key={`${match.profile.id}-${term}`}
                          className="inline-flex items-center rounded-sm bg-parchment px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.08em] text-ink-faint"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-border bg-surface p-5">
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  No related power profiles are mapped to this topic yet.
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
              Beat Profile
            </p>
            <h2 className="font-display text-2xl font-bold text-ink leading-tight">
              What this topic opens up
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mt-3">
              This corridor links historical chapters, current reporting, and related figures so a reader can move
              from topic-level search intent into the underlying power map quickly.
            </p>
            {profileStats && (
              <div className="space-y-3 mt-5 border-t border-border pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-ink-muted">Profiles mapped</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-ink">{profileStats.profileCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-ink-muted">Sourced claims</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-ink">{profileStats.claimCount}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-sm text-ink-muted">Tracked donations</span>
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-ink">
                    {formatCompactDollars(profileStats.donationVolume)}
                  </span>
                </div>
              </div>
            )}
            {strongestCategories.length > 0 && (
              <div className="mt-5">
                <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-ink-faint">
                  Strongest profile groups
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {strongestCategories.map(([category, count]) => (
                    <span
                      key={`${topic.slug}-${category}`}
                      className="inline-flex items-center rounded-sm bg-parchment px-2.5 py-1 font-sans text-[0.58rem] uppercase tracking-[0.08em] text-ink-faint"
                    >
                      {category.replace('-', ' ')} · {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 mt-5">
              <Link
                to="/read"
                className="inline-flex items-center justify-center rounded-sm bg-crimson px-4 py-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-crimson-dark transition-colors"
              >
                Read The Record
              </Link>
              <Link
                to="/profiles"
                className="inline-flex items-center justify-center rounded-sm border border-border px-4 py-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink hover:border-crimson hover:text-crimson transition-colors"
              >
                Browse All Profiles
              </Link>
            </div>
          </div>

          <NewsletterSignup
            variant="dark"
            source="topic_hub"
            contentInterest={topic.name}
            heading={topic.subscribeHeading}
            subtext={topic.subscribeSubtext}
            successPath={successPath}
          />
        </aside>
      </div>
    </div>
  )
}
