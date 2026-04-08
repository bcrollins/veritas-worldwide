import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { allArticles as articles, CATEGORY_META, type Article, type ArticleCategory } from '../data/articles'
import SharePanel from '../components/SharePanel'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

function CategoryBadge({ category }: { category: ArticleCategory }) {
  return (
    <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
      {CATEGORY_META[category].label}
    </span>
  )
}

function HeroArticle({ article }: { article: Article }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block">
      <article className="grid md:grid-cols-2 gap-6 md:gap-10 pb-10 border-b border-border">
        <div className="overflow-hidden">
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="w-full h-64 md:h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            loading="eager"
          />
          <p className="font-sans text-[9px] text-ink-faint mt-1.5">{article.heroImage.credit}</p>
        </div>
        <div className="flex flex-col justify-center">
          <CategoryBadge category={article.category} />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight mt-2 mb-3 group-hover:text-crimson transition-colors">
            {article.title}
          </h2>
          <p className="font-body text-base md:text-lg text-ink-muted leading-relaxed mb-4 line-clamp-3">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint">
            <span>{article.author}</span>
            <span className="text-border">|</span>
            <span>{article.publishDate}</span>
            <span className="text-border">|</span>
            <span>{article.readingTime} min read</span>
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
        <div className="overflow-hidden mb-3">
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className={`w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${
              size === 'medium' ? 'h-48' : 'h-36'
            }`}
            loading="lazy"
          />
        </div>
        <CategoryBadge category={article.category} />
        <h3 className={`font-display font-bold text-ink leading-tight mt-1.5 mb-2 group-hover:text-crimson transition-colors ${
          size === 'medium' ? 'text-xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        {size === 'medium' && (
          <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 line-clamp-2">
            {article.subtitle}
          </p>
        )}
        <div className="flex items-center gap-2 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-ink-faint">
          <span>{article.publishDate}</span>
          <span className="text-border">|</span>
          <span>{article.readingTime} min</span>
        </div>
      </article>
    </Link>
  )
}

function ArticleListItem({ article }: { article: Article }) {
  return (
    <Link to={`/news/${article.slug}`} className="group block py-4 border-b border-border/50">
      <article className="flex gap-4">
        <div className="flex-1 min-w-0">
          <CategoryBadge category={article.category} />
          <h3 className="font-display text-base font-bold text-ink leading-snug mt-1 mb-1 group-hover:text-crimson transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="font-body text-xs text-ink-muted leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-2 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-ink-faint mt-1.5">
            <span>{article.publishDate}</span>
            <span className="text-border">|</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>
        <img
          src={article.heroImage.src}
          alt={article.heroImage.alt}
          className="w-20 h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 flex-shrink-0"
          loading="lazy"
        />
      </article>
    </Link>
  )
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')

  useEffect(() => {
    setMetaTags({
      title: `Current Events — Primary Source Journalism | ${SITE_NAME}`,
      description: 'Daily investigative reporting on power, money, and institutions. Every claim sourced to primary documents. No anonymous sources. No spin.',
      url: `${SITE_URL}/news`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Current Events — ${SITE_NAME}`,
      'url': `${SITE_URL}/news`,
      'description': 'Daily investigative reporting sourced exclusively to primary documents.',
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const categories = Object.keys(CATEGORY_META) as ArticleCategory[]
  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const hero = filtered[0]
  const secondary = filtered.slice(1, 3)
  const remaining = filtered.slice(3)

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Current Events</span>
          </div>
        </div>
      </div>

      {/* Edition Header */}
      <div className="border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-1">
                Veritas Worldwide
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Current Events
              </h1>
            </div>
            <div className="hidden sm:block text-right">
              <p className="font-sans text-[0.55rem] tracking-[0.15em] uppercase text-ink-faint">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="font-body text-xs italic text-ink-muted mt-0.5">
                Primary sources only — your conclusions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="border-b border-border bg-parchment/80 sticky top-[88px] z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-2 -mx-2 px-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap font-sans text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-sm transition-colors ${
                activeCategory === 'all'
                  ? 'bg-ink text-white'
                  : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
              }`}
            >
              All Stories
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap font-sans text-[0.6rem] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-sm transition-colors ${
                  activeCategory === cat
                    ? 'bg-ink text-white'
                    : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
                }`}
              >
                {CATEGORY_META[cat].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-lg text-ink-muted">No articles in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Hero Lead Story */}
            {hero && <HeroArticle article={hero} />}

            {/* Secondary Stories Grid */}
            {secondary.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 py-10 border-b border-border">
                {secondary.map(article => (
                  <ArticleCard key={article.id} article={article} size="medium" />
                ))}
              </div>
            )}

            {/* Remaining Stories — List Layout */}
            {remaining.length > 0 && (
              <div className="py-8">
                <div className="grid md:grid-cols-3 gap-x-10">
                  <div className="md:col-span-2">
                    <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                      More Coverage
                    </h2>
                    {remaining.map(article => (
                      <ArticleListItem key={article.id} article={article} />
                    ))}
                  </div>

                  {/* Sidebar */}
                  <aside className="hidden md:block">
                    <div className="sticky top-36">
                      <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                        About This Publication
                      </h2>
                      <div className="bg-surface border border-border rounded-sm p-5">
                        <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                          Every article published by Veritas Worldwide cites exclusively
                          primary sources: government documents, court filings, congressional
                          records, and official transcripts.
                        </p>
                        <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                          We do not use anonymous sources. We do not publish opinion.
                          We document the public record and leave conclusions to you.
                        </p>
                        <Link
                          to="/methodology"
                          className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-crimson hover:text-crimson-dark transition-colors"
                        >
                          Read Our Methodology &rarr;
                        </Link>
                      </div>

                      <div className="mt-6">
                        <SharePanel variant="compact" title="Share Veritas News" url={`${SITE_URL}/news`} />
                      </div>

                      <div className="mt-6 bg-ink text-white rounded-sm p-5">
                        <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-2">
                          Support Independent Journalism
                        </p>
                        <p className="font-body text-sm text-white/70 leading-relaxed mb-4">
                          Veritas Worldwide accepts no advertising revenue. Our reporting
                          is funded entirely by readers who believe the public record matters.
                        </p>
                        <Link
                          to="/membership"
                          className="inline-flex items-center justify-center px-4 py-2 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors w-full"
                        >
                          Become a Member
                        </Link>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
