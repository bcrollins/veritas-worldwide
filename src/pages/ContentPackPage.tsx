import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allArticles as articles } from '../data/articles'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME, setJsonLd, removeJsonLd } from '../lib/seo'

interface ShareCard {
  id: string
  headline: string
  stat: string
  source: string
  articleSlug: string
  category: string
  bgColor: string
  textColor: string
}

const SHARE_CARDS: ShareCard[] = [
  {
    id: 'fed-rates',
    headline: 'The Fed held rates at 3.5\u20133.75% while crude oil surges past $110/barrel',
    stat: '$110/bbl',
    source: 'Federal Reserve FOMC Statement, March 18, 2026',
    articleSlug: 'federal-reserve-holds-rates-march-2026-iran-oil-crisis',
    category: 'FEDERAL RESERVE',
    bgColor: '#1A1A1A',
    textColor: '#FFFFFF',
  },
  {
    id: 'epstein-files',
    headline: 'DOJ releases 3.5 million pages of Epstein files under the Transparency Act',
    stat: '3.5M pages',
    source: 'U.S. Department of Justice, March 2026',
    articleSlug: 'doj-releases-epstein-files-march-2026',
    category: 'ACCOUNTABILITY',
    bgColor: '#FAF8F5',
    textColor: '#1A1A1A',
  },
  {
    id: 'fisa-reform',
    headline: 'FISA Section 702 faces April sunset \u2014 bipartisan reform bill demands warrant requirement',
    stat: 'April 2026 sunset',
    source: 'Congress.gov, S.4201 / H.R.8901',
    articleSlug: 'fisa-section-702-reform-april-2026-sunset',
    category: 'SURVEILLANCE',
    bgColor: '#1E3A5F',
    textColor: '#FFFFFF',
  },
  {
    id: 'defense-budget',
    headline: '$1.5 trillion defense budget proposed for FY2027 \u2014 largest in U.S. history',
    stat: '$1.5 trillion',
    source: 'Senate Appropriations Committee, FY2027 Request',
    articleSlug: 'defense-budget-fy2027-proposal-1-5-trillion',
    category: 'DEFENSE & FOREIGN POLICY',
    bgColor: '#1A1A1A',
    textColor: '#FFFFFF',
  },
  {
    id: 'aipac-spending',
    headline: 'AIPAC spends $28 million reshaping 2026 congressional primaries through shell PACs',
    stat: '$28M in primaries',
    source: 'OpenSecrets FEC filings, 2026 cycle',
    articleSlug: 'aipac-28-million-2026-congressional-primaries',
    category: 'LOBBYING & INFLUENCE',
    bgColor: '#FAF8F5',
    textColor: '#1A1A1A',
  },
]

const SOCIAL_POSTS = [
  {
    platform: 'X / Twitter',
    icon: 'x',
    posts: [
      { text: 'The Federal Reserve held rates at 3.5\u20133.75% on March 18. The FOMC vote was 11\u20131. Crude oil is past $110/barrel.\n\nFull FOMC analysis with primary sources:\nveritasworldwide.com/news/federal-reserve-holds-rates-march-2026-iran-oil-crisis', chars: 245 },
      { text: 'The DOJ just released 3.5 million pages of Epstein files.\n\n2,000 videos. 180,000 images. Names.\n\nEvery document sourced. No commentary. Just the record.\nveritasworldwide.com/news/doj-releases-epstein-files-march-2026', chars: 212 },
      { text: 'AIPAC spent $28 million in 2026 congressional primaries through shell PACs.\n\n$22M in Illinois alone.\n\nFEC filings. Named donors. Follow the money:\nveritasworldwide.com/news/aipac-28-million-2026-congressional-primaries', chars: 223 },
    ],
  },
  {
    platform: 'Facebook / LinkedIn',
    icon: 'fb',
    posts: [
      { text: 'Congress is debating the largest defense budget in American history: $1.5 trillion for FY2027.\n\nWe sourced every line item to the Senate Appropriations Committee markup. F-47 stealth fighter. $500M for Israel missile defense. $152B reconciliation supplement.\n\nNo opinion. Just the documented record.\n\nRead the full analysis: veritasworldwide.com/news/defense-budget-fy2027-proposal-1-5-trillion', chars: 380 },
      { text: 'FISA Section 702 expires in April 2026. A bipartisan coalition is pushing the Government Surveillance Reform Act \u2014 requiring warrants for American communications.\n\nWe tracked the bill text, the EFF analysis, and the PCLOB reinstatement push.\n\nPrimary sources only: veritasworldwide.com/news/fisa-section-702-reform-april-2026-sunset', chars: 345 },
    ],
  },
]

function generateCardCanvas(card: ShareCard, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = 1200
  const h = 630
  canvas.width = w
  canvas.height = h

  // Background
  ctx.fillStyle = card.bgColor
  ctx.fillRect(0, 0, w, h)

  const isLight = card.bgColor === '#FAF8F5'
  const accent = '#8B1A1A'

  // Top accent line
  ctx.fillStyle = accent
  ctx.fillRect(0, 0, w, 4)

  // Category label
  ctx.fillStyle = isLight ? '#666666' : 'rgba(255,255,255,0.5)'
  ctx.font = '600 13px Inter, system-ui, sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText(card.category, 60, 60)

  // Stat — large display
  ctx.fillStyle = accent
  ctx.font = 'bold 72px Georgia, serif'
  ctx.fillText(card.stat, 60, 160)

  // Headline
  ctx.fillStyle = card.textColor
  ctx.font = 'bold 32px Georgia, serif'
  const words = card.headline.split(' ')
  let line = ''
  let lineY = 220
  for (const word of words) {
    const test = line + word + ' '
    const metrics = ctx.measureText(test)
    if (metrics.width > w - 120 && line) {
      ctx.fillText(line.trim(), 60, lineY)
      line = word + ' '
      lineY += 42
    } else {
      line = test
    }
  }
  ctx.fillText(line.trim(), 60, lineY)

  // Source
  ctx.fillStyle = isLight ? '#999999' : 'rgba(255,255,255,0.4)'
  ctx.font = '14px Inter, system-ui, sans-serif'
  ctx.fillText('SOURCE: ' + card.source, 60, h - 100)

  // Bottom bar
  ctx.fillStyle = isLight ? '#1A1A1A' : 'rgba(255,255,255,0.08)'
  ctx.fillRect(0, h - 56, w, 56)

  // Publication name
  ctx.fillStyle = isLight ? '#FFFFFF' : 'rgba(255,255,255,0.6)'
  ctx.font = '600 12px Inter, system-ui, sans-serif'
  ctx.fillText('VERITAS WORLDWIDE PRESS', 60, h - 28)

  // URL
  ctx.fillStyle = isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'
  ctx.font = '12px Inter, system-ui, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('veritasworldwide.com', w - 60, h - 28)
  ctx.textAlign = 'left'

  // Crimson accent bar at bottom
  ctx.fillStyle = accent
  ctx.fillRect(0, h - 4, w, 4)
}

export default function ContentPackPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  useEffect(() => {
    setMetaTags({
      title: `Content Pack \u2014 Shareable Assets | ${SITE_NAME}`,
      description: 'Download shareable social media graphics, pre-written posts, and article cards. Help spread primary-source journalism.',
      url: `${SITE_URL}/content-pack`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Content Packs | Veritas Worldwide',
      'url': `${SITE_URL}/content-pack`,
      'isPartOf': { '@type': 'WebSite', 'name': SITE_NAME, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const handleDownloadCard = useCallback((card: ShareCard) => {
    const canvas = canvasRef.current
    if (!canvas) return
    setDownloadingId(card.id)
    generateCardCanvas(card, canvas)
    const link = document.createElement('a')
    link.download = `veritas-${card.id}-share.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    setTimeout(() => setDownloadingId(null), 1000)
  }, [])

  const handleDownloadAll = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    SHARE_CARDS.forEach((card, i) => {
      setTimeout(() => {
        generateCardCanvas(card, canvas)
        const link = document.createElement('a')
        link.download = `veritas-${card.id}-share.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      }, i * 400)
    })
  }, [])

  const copyText = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="border-b-2 border-ink">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="font-sans text-[0.55rem] font-semibold tracking-[0.25em] uppercase text-ink-faint mb-2">
            Veritas Worldwide
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            Content Pack
          </h1>
          <p className="font-body text-base text-ink-muted max-w-2xl leading-relaxed">
            Pre-made shareable graphics, social media copy, and article links. Download, share, and help
            primary-source journalism reach more people. Every asset links back to a fully sourced article.
          </p>
        </div>
      </div>

      {/* Download All CTA */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center gap-4 border-b border-border">
        <button
          onClick={handleDownloadAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white font-sans text-[13px] font-semibold hover:bg-ink/80 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download All Graphics ({SHARE_CARDS.length} images)
        </button>
        <p className="font-sans text-xs text-ink-faint">
          1200×630 PNG · Optimized for social sharing · Free to use with attribution
        </p>
      </div>

      {/* Shareable Graphics */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink-faint mb-6 pb-2 border-b border-border">
          Shareable Graphics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHARE_CARDS.map(card => (
            <div key={card.id} className="border border-border">
              {/* Preview */}
              <div
                className="aspect-[1200/630] p-6 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: card.bgColor }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-crimson" />
                <div>
                  <p className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: card.bgColor === '#FAF8F5' ? '#666' : 'rgba(255,255,255,0.5)' }}>
                    {card.category}
                  </p>
                  <p className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3" style={{ color: '#8B1A1A' }}>
                    {card.stat}
                  </p>
                  <p className="font-display text-sm md:text-base font-bold leading-snug" style={{ color: card.textColor }}>
                    {card.headline}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[9px] mt-4" style={{ color: card.bgColor === '#FAF8F5' ? '#999' : 'rgba(255,255,255,0.4)' }}>
                    SOURCE: {card.source}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-crimson" />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-4 py-3 bg-surface">
                <Link
                  to={`/news/${card.articleSlug}`}
                  className="font-sans text-[11px] font-semibold text-crimson hover:text-crimson-dark transition-colors"
                >
                  Read full article &rarr;
                </Link>
                <button
                  onClick={() => handleDownloadCard(card)}
                  className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {downloadingId === card.id ? 'Downloaded' : 'Download PNG'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Written Social Posts */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink-faint mb-6 pb-2 border-b border-border">
          Pre-Written Social Posts
        </h2>
        <p className="font-body text-sm text-ink-muted mb-8 max-w-2xl">
          Copy-ready posts for each platform. Every post links to a fully sourced article.
          Edit freely — the only thing we ask is that the link stays intact.
        </p>

        <div className="space-y-10">
          {SOCIAL_POSTS.map(platform => (
            <div key={platform.platform}>
              <h3 className="font-sans text-sm font-bold text-ink mb-4">{platform.platform}</h3>
              <div className="space-y-4">
                {platform.posts.map((post, i) => {
                  const postId = `${platform.icon}-${i}`
                  return (
                    <div key={postId} className="border border-border rounded-none p-5 bg-white dark:bg-[#151515]">
                      <pre className="font-body text-sm text-ink whitespace-pre-wrap leading-relaxed mb-3">{post.text}</pre>
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[10px] text-ink-faint">{post.chars} characters</span>
                        <button
                          onClick={() => copyText(post.text, postId)}
                          className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
                        >
                          {copiedId === postId ? (
                            <>
                              <svg className="w-3.5 h-3.5 text-verified" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              Copied
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Quick Links */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink-faint mb-6 pb-2 border-b border-border">
          Article Links
        </h2>
        <p className="font-body text-sm text-ink-muted mb-6">
          Direct links to every article. Share any of these — every page is optimized with Open Graph metadata for rich previews.
        </p>
        <div className="space-y-3">
          {articles.map(article => (
            <div key={article.id} className="flex items-center justify-between gap-4 py-3 border-b border-border/50">
              <div className="min-w-0">
                <Link to={`/news/${article.slug}`} className="font-display text-sm font-bold text-ink hover:text-crimson transition-colors line-clamp-1">
                  {article.title}
                </Link>
                <p className="font-sans text-[10px] text-ink-faint mt-0.5">{article.sources.length} sources · {article.readingTime} min read</p>
              </div>
              <button
                onClick={() => copyText(`${SITE_URL}/news/${article.slug}`, article.id)}
                className="flex-shrink-0 inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
              >
                {copiedId === article.id ? 'Copied' : 'Copy link'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial note */}
      <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="h-px bg-border mb-8" />
        <p className="font-body text-sm text-ink-muted italic leading-relaxed max-w-xl mx-auto">
          An informed public is the strongest safeguard against the abuse of power.
          Every time you share a primary source, you make it harder to rewrite history.
        </p>
        <p className="font-sans text-[0.55rem] font-semibold tracking-[0.2em] uppercase text-ink-faint mt-4">
          Veritas Worldwide
        </p>
      </div>
    </div>
  )
}
