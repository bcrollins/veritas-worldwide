import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getArticleBySlug, CATEGORY_META, type ArticleBlock, type ArticleSource } from '../data/articles'
import NewsletterSignup from '../components/NewsletterSignup'
import { chapterMeta } from '../data/chapterMeta'
import { getTopicHrefForTerm, getTopicHubByKeyword } from '../data/topicHubs'
import SharePanel from '../components/SharePanel'
import { getPreferredImageSrc } from '../lib/imageSources'
import { buildSubscriptionSuccessPath } from '../lib/subscriptionSuccess'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'

function getArticleImageSrc(src?: string) {
  return getPreferredImageSrc(src) || src
}

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
    verified: { bg: 'bg-verified-bg border-verified-border text-verified', label: 'VERIFIED — PRIMARY SOURCE' },
    circumstantial: { bg: 'bg-circumstantial-bg border-circumstantial-border text-circumstantial', label: 'CIRCUMSTANTIAL EVIDENCE' },
    disputed: { bg: 'bg-disputed-bg border-disputed-border text-disputed', label: 'DISPUTED — SEE SOURCES' },
  }
  const s = styles[tier] || styles.verified
  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-[9px] font-sans font-bold tracking-[0.12em] uppercase ${s.bg}`}>
      <span aria-hidden="true">{tier === 'verified' ? '✓' : tier === 'circumstantial' ? '◐' : '⚠'}</span>
      {s.label}
    </div>
  )
}

function ContentBlock({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mt-10 mb-4">{block.text}</h2>
    case 'subheading':
      return <h3 className="font-display text-xl font-bold text-ink mt-8 mb-3">{block.text}</h3>
    case 'text':
      return <p className="font-body text-base md:text-[1.05rem] text-ink leading-[1.8] mb-5">{block.text}</p>
    case 'quote':
      return (
        <blockquote className="pullquote">
          &ldquo;{block.text}&rdquo;
          {block.attribution && (
            <div className="pullquote-attribution">
              &mdash; {block.attribution}
            </div>
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
        <div className="my-6 p-5 bg-obsidian text-white rounded-sm">
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
            src={getArticleImageSrc(block.image?.src)}
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
  const heroImageSrc = article ? getArticleImageSrc(article.heroImage.src) : undefined

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
      'image': heroImageSrc,
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
  }, [article, heroImageSrc])

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

  const primaryTopic =
    getTopicHubByKeyword(article.category) ||
    article.tags.map((tag) => getTopicHubByKeyword(tag)).find(Boolean)
  const successPath = buildSubscriptionSuccessPath({
    source: 'article_cta',
    topic: primaryTopic?.slug,
    article: article.slug,
    interest: article.category,
    returnTo: `/news/${article.slug}`,
  })

  const relatedChapterData = article.relatedChapters
    .map(id => chapterMeta.find(c => c.id === id))
    .filter(Boolean)
  return (
    <article className="min-h-screen">
      {/* ── Section Bar ──────────────────────────────── */}
      <div className="border-b border-border no-print">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <Link to="/news" className="flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.08em] uppercase text-ink-muted hover:text-crimson transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Current Events
            </Link>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson">
              {CATEGORY_META[article.category].label}
            </span>
            <span className="font-sans text-[0.55rem] text-ink-faint">{article.readingTime} min read</span>
          </div>
        </div>
      </div>

      {/* ── Article Header — Full Width Container ──── */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-4xl mx-auto pt-8 pb-8 border-b border-border">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-ink transition-colors">Current Events</Link>
            <span>/</span>
            <span className="text-ink-muted truncate max-w-[200px]">{article.title.split(' ').slice(0, 6).join(' ')}...</span>
          </nav>

          {/* Category label */}
          <div className="mb-4">
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
              {CATEGORY_META[article.category].label}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-[1.05] mb-5">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-xl md:text-2xl text-ink-muted italic leading-relaxed mb-6 max-w-3xl">
            {article.subtitle}
          </p>

          {/* Byline + Meta */}
          <div className="flex flex-wrap items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint">
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

        {/* ── Hero Image ───────────────────────────── */}
        <div className="max-w-5xl mx-auto mt-8 mb-10">
          <figure>
            <img
              src={heroImageSrc}
              alt={article.heroImage.alt}
              className="w-full h-64 sm:h-80 md:h-[420px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              loading="eager"
            />
            <figcaption className="flex items-center justify-between mt-2">
              <p className="font-sans text-xs text-ink-muted">{article.heroImage.alt}</p>
              <p className="font-sans text-[0.6rem] text-ink-faint">{article.heroImage.credit}</p>
            </figcaption>
          </figure>
        </div>

        {/* ══════════════════════════════════════════════
            TWO-COLUMN LAYOUT: Content + Sidebar
           ══════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-[1200px] mx-auto">

          {/* ── LEFT: Article Content ───────────────── */}
          <div className="min-w-0 py-4">
            {article.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex items-center gap-4 mb-4">
                <p className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Topics</p>
                <div className="flex-1 h-[1px] bg-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    to={getTopicHrefForTerm(tag)}
                    className="font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm hover:text-crimson hover:bg-crimson/5 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8">
              <SharePanel
                title={article.title}
                description={article.seo.metaDescription}
                contentId={`news-${article.slug}`}
              />
            </div>

            {/* Newsletter CTA */}
            <div className="mt-10">
              <NewsletterSignup
                variant="dark"
                source="article_cta"
                contentInterest={article.category}
                heading="Get investigations like this delivered free."
                subtext="Join readers who follow the public record — not opinion, not spin. Every claim sourced to primary documents."
                successPath={successPath}
              />
            </div>

            {/* Back to News */}
            <div className="py-12">
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
          </div>

          {/* ── RIGHT: Sticky Sidebar ───────────────── */}
          <aside className="hidden lg:block py-4">
            <div className="sticky top-16 space-y-8">
              {/* Sources */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint">
                    Sources ({article.sources.length})
                  </p>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>
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
                <div className="border-t border-border pt-8">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">
                    Related Chapters
                  </p>
                  <div className="space-y-3">
                    {relatedChapterData.map((ch, idx) => ch && (
                      <Link key={ch.id} to={`/chapter/${ch.id}`} className="group block">
                        <p className="font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-ink-faint mb-0.5">{idx + 1}.</p>
                        <p className="font-display text-sm font-bold text-ink leading-snug group-hover:text-crimson transition-colors">
                          {ch.title}
                        </p>
                        <p className="font-sans text-[0.6rem] text-ink-faint mt-0.5">{ch.number}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Support CTA */}
              <div className="border-t border-border pt-8">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Support</p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  Independent, source-verified journalism. Free forever.
                </p>
                <Link
                  to="/membership"
                  className="block text-center px-4 py-2.5 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase hover:bg-crimson-dark transition-colors"
                >
                  Become a Member
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
