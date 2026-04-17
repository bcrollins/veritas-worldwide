import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allArticles as articles, CATEGORY_META, type Article, type ArticleCategory } from '../data/articles'
import SharePanel from '../components/SharePanel'
import { getPreferredImageSrc } from '../lib/imageSources'
import {
  formatCompactCount,
  getNewsCategorySummaries,
  getNewsChapterCorridors,
  getNewsDeskStats,
  getSourceTypeBreakdown,
  getTopNewsTags,
  type NewsCategorySummary,
  type NewsChapterCorridor,
  type NewsSourceBreakdown,
} from '../lib/newsDiscovery'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

function getArticleImageSrc(src: string) {
  return getPreferredImageSrc(src) || src
}

function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
      {CATEGORY_META[category].label}
    </span>
  )
}

function DeskStatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-bold text-ink">{value}</p>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{note}</p>
    </div>
  )
}

function HeroArticle({ article }: { article: Article }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block">
      <article className="grid gap-6 border-b border-border pb-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
        <div className="overflow-hidden rounded-[24px] border border-border bg-surface">
          <img
            src={getArticleImageSrc(article.heroImage.src)}
            alt={article.heroImage.alt}
            className="h-72 w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 md:h-full"
            loading="eager"
          />
          <p className="px-4 py-2 font-sans text-[10px] text-ink-faint">{article.heroImage.credit}</p>
        </div>
        <div className="flex flex-col justify-center">
          <CategoryBadge category={article.category} />
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink transition-colors group-hover:text-crimson md:text-5xl">
            {article.title}
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-muted md:text-lg">
            {article.subtitle}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 font-sans text-[0.6rem] uppercase tracking-[0.1em] text-ink-faint">
            <span>{article.author}</span>
            <span className="text-border">|</span>
            <span>{article.publishDate}</span>
            <span className="text-border">|</span>
            <span>{article.readingTime} min read</span>
            <span className="text-border">|</span>
            <span>{article.sources.length} cited sources</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function ArticleCard({ article, size = 'medium' }: { article: Article; size?: 'medium' | 'small' }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block">
      <article className={size === 'medium' ? 'pb-6' : 'pb-4'}>
        <div className="mb-3 overflow-hidden rounded-[20px] border border-border bg-surface">
          <img
            src={getArticleImageSrc(article.heroImage.src)}
            alt={article.heroImage.alt}
            className={`w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 ${
              size === 'medium' ? 'h-52' : 'h-36'
            }`}
            loading="lazy"
          />
        </div>
        <CategoryBadge category={article.category} />
        <h3
          className={`mt-1.5 font-display font-bold leading-tight text-ink transition-colors group-hover:text-crimson ${
            size === 'medium' ? 'text-xl' : 'text-lg'
          }`}
        >
          {article.title}
        </h3>
        {size === 'medium' && (
          <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-ink-muted">
            {article.subtitle}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 font-sans text-[0.55rem] uppercase tracking-[0.1em] text-ink-faint">
          <span>{article.publishDate}</span>
          <span className="text-border">|</span>
          <span>{article.readingTime} min</span>
          <span className="text-border">|</span>
          <span>{article.sources.length} sources</span>
        </div>
      </article>
    </Link>
  )
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block border-b border-border/50 py-4">
      <article className="flex gap-4">
        <div className="min-w-0 flex-1">
          <CategoryBadge category={article.category} />
          <h3 className="mt-1 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-crimson line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-ink-muted">
            {article.subtitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 font-sans text-[0.55rem] uppercase tracking-[0.1em] text-ink-faint">
            <span>{article.publishDate}</span>
            <span className="text-border">|</span>
            <span>{article.readingTime} min</span>
            <span className="text-border">|</span>
            <span>{article.sources.length} sources</span>
          </div>
        </div>
        <img
          src={getArticleImageSrc(article.heroImage.src)}
          alt={article.heroImage.alt}
          className="h-20 w-20 shrink-0 rounded-xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          loading="lazy"
        />
      </article>
    </Link>
  )
}

function CoverageLaneCard({ summary }: { summary: NewsCategorySummary }) {
  return (
    <article className="rounded-[24px] border border-border bg-surface p-5">
      <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-crimson">
        {summary.label}
      </p>
      <h3 className="mt-3 font-display text-2xl font-bold text-ink">
        {summary.articleCount} story{summary.articleCount === 1 ? '' : 'ies'}
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.14em] text-ink-faint">Cited sources</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">{summary.sourceCount}</p>
        </div>
        <div>
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.14em] text-ink-faint">Chapter links</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">{summary.relatedChapterCount}</p>
        </div>
        <div>
          <p className="font-sans text-[0.55rem] uppercase tracking-[0.14em] text-ink-faint">Avg. read</p>
          <p className="mt-1 font-serif text-lg font-semibold text-ink">{summary.averageReadingTime} min</p>
        </div>
      </div>
      {summary.topTags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {summary.topTags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="rounded-full border border-border px-3 py-1 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-crimson hover:text-crimson"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      {summary.leadArticle && (
        <Link
          to={`/news/${summary.leadArticle.slug}`}
          className="mt-5 inline-flex items-center font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-crimson transition-colors hover:text-crimson-dark"
        >
          Lead file: {summary.leadArticle.title}
        </Link>
      )}
    </article>
  )
}

function CorridorCard({ corridor }: { corridor: NewsChapterCorridor }) {
  return (
    <Link
      to={`/chapter/${corridor.chapterId}`}
      className="block rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-crimson"
    >
      <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-crimson">
        {corridor.chapterNumber}
      </p>
      <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{corridor.chapterTitle}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
        {corridor.articleCount} linked newsroom file{corridor.articleCount === 1 ? '' : 's'} with {corridor.sourceCount} cited sources and an average read time of {corridor.averageReadingTime} minutes.
      </p>
    </Link>
  )
}

function SourceBreakdownList({
  breakdown,
  totalSources,
}: {
  breakdown: NewsSourceBreakdown
  totalSources: number
}) {
  const items = [
    { label: 'Primary', value: breakdown.primary },
    { label: 'Government', value: breakdown.government },
    { label: 'Journalism', value: breakdown.journalism },
    { label: 'Academic', value: breakdown.academic },
  ]

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const share = totalSources === 0 ? 0 : Math.round((item.value / totalSources) * 100)
        return (
          <div key={item.label}>
            <div className="flex items-center justify-between gap-4 font-sans text-[0.6rem] uppercase tracking-[0.12em] text-ink-muted">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-parchment-dark/80">
              <div className="h-full rounded-full bg-crimson" style={{ width: `${share}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')

  useEffect(() => {
    setMetaTags({
      title: `Current Events — Primary Source Journalism | ${SITE_NAME}`,
      description:
        'Daily investigative reporting on power, money, and institutions. Every claim sourced to primary documents. No anonymous sources. No spin.',
      url: `${SITE_URL}/news`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Current Events — ${SITE_NAME}`,
      url: `${SITE_URL}/news`,
      description: 'Daily investigative reporting sourced exclusively to primary documents.',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    })
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  const categories = Object.keys(CATEGORY_META) as ArticleCategory[]
  const filtered = useMemo(
    () => (activeCategory === 'all' ? articles : articles.filter((article) => article.category === activeCategory)),
    [activeCategory]
  )
  const publicationStats = useMemo(() => getNewsDeskStats(), [])
  const deskStats = useMemo(() => getNewsDeskStats(filtered), [filtered])
  const coverageLanes = useMemo(() => getNewsCategorySummaries(), [])
  const chapterCorridors = useMemo(() => getNewsChapterCorridors(4, filtered), [filtered])
  const topTags = useMemo(() => getTopNewsTags(8, filtered), [filtered])
  const sourceMix = useMemo(() => getSourceTypeBreakdown(filtered), [filtered])

  const hero = filtered[0]
  const secondary = filtered.slice(1, 3)
  const remaining = filtered.slice(3)
  const activeLabel = activeCategory === 'all' ? 'Entire newsroom' : CATEGORY_META[activeCategory].label

  return (
    <div className="min-h-screen w-full max-w-[1920px] mx-auto">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted transition-colors hover:text-crimson">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <span className="font-medium text-ink">Current Events</span>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-ink bg-parchment/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_340px] lg:items-end">
            <div>
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-crimson">
                Veritas Worldwide
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
                Current Events
              </h1>
              <p className="mt-4 max-w-3xl font-body text-lg leading-relaxed text-ink-muted">
                Daily files on power, money, institutions, and the public record. Every story is packaged to connect the live news cycle back to the chapters, dossiers, and source trail underneath it.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                <span>{publicationStats.totalArticles} published files</span>
                <span className="text-border">|</span>
                <span>{publicationStats.totalSources} cited sources</span>
                <span className="text-border">|</span>
                <span>{publicationStats.totalRelatedChapters} linked chapters</span>
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-surface p-6">
              <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                Desk briefing
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">{activeLabel}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                {deskStats.totalArticles} story{deskStats.totalArticles === 1 ? '' : 'ies'} in view, {deskStats.totalSources} cited sources, and an average read time of {deskStats.averageReadingTime} minutes.
              </p>
              {topTags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {topTags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/search?q=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-border px-3 py-1 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-crimson hover:text-crimson"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/methodology"
                  className="inline-flex min-h-[42px] items-center rounded-full bg-obsidian px-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-obsidian/90"
                >
                  Methodology
                </Link>
                <Link
                  to="/sources"
                  className="inline-flex min-h-[42px] items-center rounded-full border border-border px-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                >
                  Source Library
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DeskStatCard
              label="Published files"
              value={formatCompactCount(publicationStats.totalArticles)}
              note="Live newsroom pieces currently tied into the Veritas reporting stack."
            />
            <DeskStatCard
              label="Cited sources"
              value={formatCompactCount(publicationStats.totalSources)}
              note="Primary documents, government records, reporting, and academic references cited across the desk."
            />
            <DeskStatCard
              label="Chapter corridors"
              value={formatCompactCount(publicationStats.totalRelatedChapters)}
              note="Book sections the current newsroom already links back into for context and continuity."
            />
            <DeskStatCard
              label="Tracked tags"
              value={formatCompactCount(publicationStats.uniqueTags)}
              note="Issue cues used to keep related reporting discoverable instead of siloed."
            />
          </div>
        </div>
      </div>

      <div className="sticky top-[88px] z-30 border-b border-border bg-parchment/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-2 flex items-center gap-1 overflow-x-auto px-2 py-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                activeCategory === 'all'
                  ? 'bg-obsidian text-white'
                  : 'text-ink-muted hover:bg-parchment-dark/50 hover:text-ink'
              }`}
            >
              All Stories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  activeCategory === category
                    ? 'bg-obsidian text-white'
                    : 'text-ink-muted hover:bg-parchment-dark/50 hover:text-ink'
                }`}
              >
                {CATEGORY_META[category].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-body text-lg text-ink-muted">No articles in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.5fr)_340px]">
              <div>{hero && <HeroArticle article={hero} />}</div>

              <aside>
                <div className="space-y-6 xl:sticky xl:top-32">
                  <div className="rounded-[24px] border border-border bg-surface p-5">
                    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                      Source mix
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                      This view currently draws on {deskStats.totalSources} cited sources across {deskStats.totalArticles} story{deskStats.totalArticles === 1 ? '' : 'ies'}.
                    </p>
                    <div className="mt-5">
                      <SourceBreakdownList breakdown={sourceMix} totalSources={deskStats.totalSources} />
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-border bg-surface p-5">
                    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                      Top chapter corridors
                    </p>
                    <div className="mt-4 space-y-3">
                      {chapterCorridors.map((corridor) => (
                        <CorridorCard key={corridor.chapterId} corridor={corridor} />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {secondary.length > 0 && (
              <div className="grid gap-8 border-b border-border py-10 md:grid-cols-2">
                {secondary.map((article) => (
                  <ArticleCard key={article.id} article={article} size="medium" />
                ))}
              </div>
            )}

            <section className="border-b border-border py-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-crimson">
                    Coverage lanes
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-ink">
                    The newsroom is already organized into clear beats.
                  </h2>
                </div>
                <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                  Each lane below is computed from the actual story inventory, cited-source volume, and chapter links already in the repo. Nothing here is filler.
                </p>
              </div>
              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                {coverageLanes.map((summary) => (
                  <CoverageLaneCard key={summary.category} summary={summary} />
                ))}
              </div>
            </section>

            <div className="grid gap-10 py-10 xl:grid-cols-[minmax(0,1.6fr)_340px]">
              <div>
                <h2 className="border-b border-border pb-2 font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                  More coverage
                </h2>
                <div className="mt-2">
                  {remaining.map((article) => (
                    <ArticleListItem key={article.id} article={article} />
                  ))}
                </div>
              </div>

              <aside>
                <div className="space-y-6 xl:sticky xl:top-32">
                  <div className="rounded-[24px] border border-border bg-surface p-5">
                    <h2 className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      About This Publication
                    </h2>
                    <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
                      Every article published by Veritas Worldwide cites exclusively primary sources: government documents, court filings, congressional records, official transcripts, and attributable reporting where necessary.
                    </p>
                    <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
                      We document the public record and leave conclusions to you.
                    </p>
                    <Link
                      to="/methodology"
                      className="mt-5 inline-flex font-sans text-[0.62rem] font-bold uppercase tracking-[0.12em] text-crimson transition-colors hover:text-crimson-dark"
                    >
                      Read our methodology →
                    </Link>
                  </div>

                  <div className="rounded-[24px] border border-border bg-surface p-5">
                    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                      Share this desk
                    </p>
                    <div className="mt-4">
                      <SharePanel variant="compact" title="Share Current Events" url={`${SITE_URL}/news`} />
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-obsidian p-5 text-white">
                    <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/50">
                      Support Independent Journalism
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
                      Veritas Worldwide accepts no advertising revenue. Reader support keeps the reporting, the archive, and the source layer durable.
                    </p>
                    <Link
                      to="/membership"
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-crimson px-4 py-3 font-sans text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-crimson-dark"
                    >
                      Become a Member
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
