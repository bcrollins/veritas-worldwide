import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getArticleBySlug, CATEGORY_META, type ArticleBlock, type ArticleSource } from '../data/articles'
import { chapters } from '../data/chapters'
import SharePanel from '../components/SharePanel'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

function SourceBadge({ type }: { type: ArticleSource['type'] }) {
  const styles: Record<string, string> = {
    primary: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    government: 'bg-blue-100 text-blue-800 border-blue-200',
    journalism: 'bg-amber-100 text-amber-800 border-amber-200',
    academic: 'bg-purple-100 text-purple-800 border-purple-200',
  }
  return (
    <span className={`inline-block font-sans text-[9px] font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 rounded-sm border ${styles[type] || styles.journalism}`}>
      {type}
    </span>
  )
}

function TierBadge({ tier }: { tier: string }) {
  const styles: Record<string, { bg: string; label: string }> = {
    verified: { bg: 'bg-emerald-50 border-emerald-300 text-emerald-900', label: 'VERIFIED — PRIMARY SOURCE' },
    circumstantial: { bg: 'bg-amber-50 border-amber-300 text-amber-900', label: 'CIRCUMSTANTIAL EVIDENCE' },
    disputed: { bg: 'bg-red-50 border-red-300 text-red-900', label: 'DISPUTED — SEE SOURCES' },
  }
  const s = styles[tier] || styles.verified
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-[9px] font-sans font-bold tracking-[0.12em] uppercase ${s.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${tier === 'verified' ? 'bg-emerald-500' : tier === 'circumstantial' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {s.label}
    </div>
  )
}

function ContentBlock({ block, sourceCount }: { block: ArticleBlock; sourceCount: number }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="font-display text-2xl font-bold text-ink mt-10 mb-4">{block.text}</h2>
    case 'subheading':
      return <h3 className="font-display text-xl font-bold text-ink mt-8 mb-3">{block.text}</h3>
    case 'text':
      return <p className="font-body text-base md:text-[1.05rem] text-ink leading-[1.8] mb-5">{block.text}</p>
    case 'quote':
      return (
        <blockquote className="border-l-3 border-crimson pl-5 py-2 my-6 bg-crimson/3 rounded-r-sm">
          <p className="font-body text-base md:text-lg italic text-ink leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="block font-sans text-xs text-ink-muted mt-2 not-italic">
              &mdash; {block.attribution}
            </cite>
          )}
        </blockquote>
      )
    case 'evidence':
      return (
        <div className="my-6 p-4 border border-border rounded-sm bg-surface">
          {block.tier && <TierBadge tier={block.tier} />}
          <p className="font-body text-sm text-ink-muted leading-relaxed mt-2">{block.text}</p>
        </div>
      )
    case 'callout':
      return (
        <div className="my-6 p-5 bg-ink text-white rounded-sm">
          <p className="font-body text-sm leading-relaxed">{block.text}</p>
        </div>
      )
    case 'stat':
      return (
        <div className="my-8 text-center py-6 border-y border-border">
          <p className="font-display text-4xl md:text-5xl font-bold text-crimson">{block.stat?.value}</p>
          <p className="font-sans text-xs tracking-[0.1em] uppercase text-ink-muted mt-2">{block.stat?.label}</p>
        </div>
      )
    case 'image':
      return (
        <figure className="my-8">
          <img
            src={block.image?.src}
            alt={block.image?.alt || ''}
            className="w-full rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          {block.image?.caption && (
            <figcaption className="font-body text-xs text-ink-muted mt-2">
              {block.image.caption}
              {block.image.credit && <span className="text-ink-faint ml-1">({block.image.credit})</span>}
            </figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const article = slug ? getArticleBySlug(slug) : undefined

  useEffect(() => {
    if (!article) return
    setMetaTags({
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      url: `${SITE_URL}/news/${article.slug}`,
      type: 'article',
      author: article.author,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': article.title,
      'description': article.seo.metaDescription,
      'image': article.heroImage.src,
      'datePublished': article.publishDate,
      'dateModified': article.updatedDate || article.publishDate,
      'author': { '@type': 'Organization', 'name': article.author },
      'publisher': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': SITE_URL,
        'logo': { '@type': 'ImageObject', 'url': `${SITE_URL}/favicon.svg` },
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': `${SITE_URL}/news/${article.slug}` },
      'keywords': article.seo.keywords.join(', '),
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [article])

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-ink mb-4">Article Not Found</h1>
        <p className="font-body text-ink-muted mb-6">The article you are looking for does not exist or has been removed.</p>
        <Link to="/news" className="font-sans text-sm font-semibold text-crimson hover:text-crimson-dark">
          &larr; Back to Current Events
        </Link>
      </div>
    )
  }

  const relatedChapterData = article.relatedChapters
    .map(id => chapters.find(c => c.id === id))
    .filter(Boolean)

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link to="/news" className="hover:text-ink transition-colors">Current Events</Link>
          <span>/</span>
          <span className="text-ink-muted truncate max-w-[200px]">{article.title.split(' ').slice(0, 6).join(' ')}...</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 pt-6 pb-8">
        <div className="mb-3">
          <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
            {CATEGORY_META[article.category].label}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-[1.1] mb-4">
          {article.title}
        </h1>
        <p className="font-body text-lg md:text-xl text-ink-muted leading-relaxed mb-6">
          {article.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint pb-6 border-b border-border">
          <span className="font-semibold text-ink-muted">{article.author}</span>
          <span className="text-border">|</span>
          <span>Published {article.publishDate}</span>
          {article.updatedDate && (
            <>
              <span className="text-border">|</span>
              <span>Updated {article.updatedDate}</span>
            </>
          )}
          <span className="text-border">|</span>
          <span>{article.readingTime} min read</span>
          <span className="text-border">|</span>
          <span>{article.sources.length} sources cited</span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <figure>
          <img
            src={article.heroImage.src}
            alt={article.heroImage.alt}
            className="w-full h-64 sm:h-80 md:h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
            loading="eager"
          />
          <figcaption className="flex items-center justify-between mt-2">
            <p className="font-body text-xs text-ink-muted">{article.heroImage.alt}</p>
            <p className="font-sans text-[9px] text-ink-faint">{article.heroImage.credit}</p>
          </figcaption>
        </figure>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div className="min-w-0">
            {article.content.map((block, i) => (
              <ContentBlock key={i} block={block} sourceCount={article.sources.length} />
            ))}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-border">
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Topics</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="font-sans text-[0.55rem] tracking-[0.08em] uppercase px-2.5 py-1 bg-surface border border-border rounded-sm text-ink-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8">
              <SharePanel
                variant="full"
                title={article.title}
                url={`${SITE_URL}/news/${article.slug}`}
                description={article.seo.metaDescription}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Sources */}
              <div className="bg-surface border border-border rounded-sm p-5">
                <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                  Sources Cited ({article.sources.length})
                </h2>
                <ol className="space-y-3">
                  {article.sources.map(source => (
                    <li key={source.id} className="text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-sans text-[9px] font-bold text-ink-faint mt-0.5 flex-shrink-0">
                          [{source.id}]
                        </span>
                        <div>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-xs text-ink hover:text-crimson transition-colors leading-snug block"
                          >
                            {source.title}
                          </a>
                          <div className="flex items-center gap-2 mt-1">
                            <SourceBadge type={source.type} />
                            <span className="font-sans text-[9px] text-ink-faint">{source.publisher}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Related Chapters */}
              {relatedChapterData.length > 0 && (
                <div className="bg-surface border border-border rounded-sm p-5">
                  <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-faint mb-4 pb-2 border-b border-border">
                    Related Chapters
                  </h2>
                  <div className="space-y-3">
                    {relatedChapterData.map(ch => ch && (
                      <Link
                        key={ch.id}
                        to={`/chapter/${ch.id}`}
                        className="block group"
                      >
                        <p className="font-sans text-[9px] font-bold tracking-[0.1em] uppercase text-crimson">
                          Chapter {ch.number}
                        </p>
                        <p className="font-body text-sm text-ink group-hover:text-crimson transition-colors leading-snug">
                          {ch.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Support CTA */}
              <div className="bg-ink text-white rounded-sm p-5">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-2">
                  Independent Journalism
                </p>
                <p className="font-body text-sm text-white/70 leading-relaxed mb-3">
                  This reporting is funded by readers, not advertisers or political donors.
                </p>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center px-4 py-2 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase rounded-sm hover:bg-crimson-dark transition-colors w-full"
                >
                  Support This Work
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Back to News */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-crimson hover:text-crimson-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Current Events
        </Link>
      </div>
    </article>
  )
}
