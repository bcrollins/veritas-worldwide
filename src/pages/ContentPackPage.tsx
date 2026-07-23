import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allArticles as articles } from '../data/articles'
import {
  setMetaTags,
  clearMetaTags,
  SITE_URL,
  SITE_NAME,
  setJsonLd,
  removeJsonLd,
  breadcrumbJsonLd,
} from '../lib/seo'

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
    articleSlug: 'doj-releases-3-5-million-pages-epstein-files-2026',
    category: 'ACCOUNTABILITY',
    bgColor: '#FAF8F5',
    textColor: '#1A1A1A',
  },
  {
    id: 'fisa-reform',
    headline: 'FISA Section 702 faces April sunset \u2014 bipartisan reform bill demands warrant requirement',
    stat: 'April 2026 sunset',
    source: 'Congress.gov, S.4201 / H.R.8901',
    articleSlug: 'government-surveillance-reform-act-fisa-section-702-2026',
    category: 'SURVEILLANCE',
    bgColor: '#1E3A5F',
    textColor: '#FFFFFF',
  },
  {
    id: 'defense-budget',
    headline: '$1.5 trillion defense budget proposed for FY2027 \u2014 largest in U.S. history',
    stat: '$1.5 trillion',
    source: 'Senate Appropriations Committee, FY2027 Request',
    articleSlug: 'us-defense-budget-1-5-trillion-2027-proposal',
    category: 'DEFENSE & FOREIGN POLICY',
    bgColor: '#1A1A1A',
    textColor: '#FFFFFF',
  },
  {
    id: 'aipac-spending',
    headline: 'AIPAC spends $28 million reshaping 2026 congressional primaries through shell PACs',
    stat: '$28M in primaries',
    source: 'OpenSecrets FEC filings, 2026 cycle',
    articleSlug: 'aipac-record-spending-reshaping-congress-2026',
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
      { text: 'The DOJ just released 3.5 million pages of Epstein files.\n\n2,000 videos. 180,000 images. Names.\n\nEvery document sourced. No commentary. Just the record.\nveritasworldwide.com/news/doj-releases-3-5-million-pages-epstein-files-2026', chars: 212 },
      { text: 'AIPAC spent $28 million in 2026 congressional primaries through shell PACs.\n\n$22M in Illinois alone.\n\nFEC filings. Named donors. Follow the money:\nveritasworldwide.com/news/aipac-record-spending-reshaping-congress-2026', chars: 223 },
    ],
  },
  {
    platform: 'Facebook / LinkedIn',
    icon: 'fb',
    posts: [
      { text: 'Congress is debating the largest defense budget in American history: $1.5 trillion for FY2027.\n\nWe sourced every line item to the Senate Appropriations Committee markup. F-47 stealth fighter. $500M for Israel missile defense. $152B reconciliation supplement.\n\nNo opinion. Just the documented record.\n\nRead the full analysis: veritasworldwide.com/news/us-defense-budget-1-5-trillion-2027-proposal', chars: 380 },
      { text: 'FISA Section 702 expires in April 2026. A bipartisan coalition is pushing the Government Surveillance Reform Act \u2014 requiring warrants for American communications.\n\nWe tracked the bill text, the EFF analysis, and the PCLOB reinstatement push.\n\nPrimary sources only: veritasworldwide.com/news/government-surveillance-reform-act-fisa-section-702-2026', chars: 345 },
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

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

async function generateLogoPNG(size: number, variant: 'dark' | 'light'): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')

  const bg = variant === 'dark' ? '#1A1A1A' : '#FAF8F5'
  const markBg = variant === 'dark' ? '#8B1A1A' : '#1A1A1A'
  const markFg = '#FAF8F5'
  const radius = Math.round(size * 0.06)

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  const pad = Math.round(size * 0.18)
  const box = size - pad * 2
  const x = pad
  const y = pad
  ctx.fillStyle = markBg
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + box, y, x + box, y + box, radius)
  ctx.arcTo(x + box, y + box, x, y + box, radius)
  ctx.arcTo(x, y + box, x, y, radius)
  ctx.arcTo(x, y, x + box, y, radius)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = markFg
  ctx.font = `bold ${Math.round(size * 0.42)}px Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('V', size / 2, size / 2 + Math.round(size * 0.03))

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('PNG export failed'))
    }, 'image/png')
  })
}

export default function ContentPackPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [downloadingLogo, setDownloadingLogo] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: `Content Packs & Brand Kit | ${SITE_NAME}`,
      description:
        'Official brand assets, shareable social graphics, pre-written posts, and article cards. Free for press, social media, and advocacy with attribution.',
      url: `${SITE_URL}/content-pack`,
      imageAlt: 'Veritas Worldwide content packs and brand kit',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Content Packs | Veritas Worldwide',
        url: `${SITE_URL}/content-pack`,
        description:
          'Official brand assets and shareable social graphics for Veritas Worldwide Press.',
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Content Packs', url: `${SITE_URL}/content-pack` },
      ]),
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
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

  const handleLogoDownload = useCallback(async (variant: 'dark' | 'light', size: number) => {
    setDownloadingLogo(true)
    try {
      // Prefer production brand-kit rasters; fall back to canvas generator.
      const kitUrl =
        variant === 'dark'
          ? size >= 512
            ? '/brand-kit/02-icons/app-icon-512.png'
            : '/brand-kit/04-social/social-profile-400.png'
          : size >= 512
            ? '/brand-kit/01-logos/logo-mark-512.png'
            : '/brand-kit/01-logos/logo-mark-256.png'
      try {
        const res = await fetch(kitUrl)
        if (res.ok) {
          const blob = await res.blob()
          downloadBlob(blob, `veritas-logo-${variant}-${size}px.png`)
          return
        }
      } catch {
        /* fall through */
      }
      const blob = await generateLogoPNG(size, variant)
      downloadBlob(blob, `veritas-logo-${variant}-${size}px.png`)
    } finally {
      setDownloadingLogo(false)
    }
  }, [])

  const handleSVGDownload = useCallback(async () => {
    try {
      const res = await fetch('/brand-kit/01-logos/logo-mark.svg')
      if (res.ok) {
        downloadBlob(await res.blob(), 'veritas-logo-mark.svg')
        return
      }
    } catch {
      /* fall through */
    }
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="2" fill="#1A1A1A"/><text x="16" y="23" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#FAF8F5">V</text><line x1="4" y1="28" x2="28" y2="28" stroke="#8B1A1A" stroke-width="2"/></svg>`
    downloadBlob(new Blob([svgContent], { type: 'image/svg+xml' }), 'veritas-logo.svg')
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
            Content Packs &amp; Brand Kit
          </h1>
          <p className="font-body text-base text-ink-muted max-w-2xl leading-relaxed">
            Official logos, brand colors, shareable graphics, social copy, and article links.
            Download, share, and help primary-source journalism reach more people. Every editorial asset
            links back to a fully sourced article.
          </p>
        </div>
      </div>

      {/* Brand Assets — production seal from Ultimate Brand Kit */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-border" data-testid="brand-assets-section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <h2 className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink-faint mb-2 pb-2 border-b border-border">
              Brand Assets
            </h2>
            <p className="font-body text-sm text-ink-muted max-w-2xl">
              Official seal mark, app icon, and colors from the Ultimate Brand Kit. Prefer the Media Kit for the full package.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/media-kit"
              className="inline-flex min-h-[44px] items-center rounded-sm bg-crimson px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white hover:bg-crimson-dark"
            >
              Open Media Kit
            </Link>
            <a
              href="/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip"
              download
              className="inline-flex min-h-[44px] items-center rounded-sm border border-border px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink hover:border-crimson hover:text-crimson"
            >
              Download ZIP
            </a>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-border rounded-sm p-5 text-center bg-surface">
            <div className="w-20 h-20 mx-auto mb-4 bg-obsidian rounded-sm flex items-center justify-center overflow-hidden">
              <img src="/brand-kit/02-icons/app-icon.svg" alt="" className="h-16 w-16" width={64} height={64} />
            </div>
            <p className="font-sans text-xs font-semibold text-ink mb-2">App icon — crimson</p>
            <div className="flex gap-1 justify-center">
              <button type="button" onClick={() => handleLogoDownload('dark', 512)} disabled={downloadingLogo} className="min-h-[44px] px-3 py-2 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">512px</button>
              <button type="button" onClick={() => handleLogoDownload('dark', 1024)} disabled={downloadingLogo} className="min-h-[44px] px-3 py-2 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">PNG</button>
            </div>
          </div>
          <div className="border border-border rounded-sm p-5 text-center bg-surface">
            <div className="w-20 h-20 mx-auto mb-4 bg-parchment border border-border rounded-sm flex items-center justify-center overflow-hidden">
              <img src="/brand-kit/01-logos/logo-mark.svg" alt="" className="h-16 w-16" width={64} height={64} />
            </div>
            <p className="font-sans text-xs font-semibold text-ink mb-2">Seal mark — parchment</p>
            <div className="flex gap-1 justify-center">
              <button type="button" onClick={() => handleLogoDownload('light', 512)} disabled={downloadingLogo} className="min-h-[44px] px-3 py-2 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">512px</button>
              <button type="button" onClick={() => handleLogoDownload('light', 256)} disabled={downloadingLogo} className="min-h-[44px] px-3 py-2 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">256px</button>
            </div>
          </div>
          <div className="border border-border rounded-sm p-5 text-center bg-surface">
            <div className="w-20 h-20 mx-auto mb-4 bg-surface border border-border rounded-sm flex items-center justify-center overflow-hidden p-2">
              <img src="/brand-kit/01-logos/logo-mark.svg" alt="" className="max-h-full max-w-full" />
            </div>
            <p className="font-sans text-xs font-semibold text-ink mb-2">Vector seal (SVG)</p>
            <button type="button" onClick={() => void handleSVGDownload()} className="min-h-[44px] px-3 py-2 rounded-sm border border-border font-sans text-[0.55rem] font-semibold text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">
              Download SVG
            </button>
          </div>
          <div className="border border-border rounded-sm p-5 bg-surface">
            <p className="font-sans text-xs font-semibold text-ink mb-3">Brand Colors</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#1A1A1A]" aria-hidden="true" />
                <span className="font-mono text-[0.6rem] text-ink-muted">Ink #1A1A1A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#8B1A1A]" aria-hidden="true" />
                <span className="font-mono text-[0.6rem] text-ink-muted">Crimson #8B1A1A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-[#FAF8F5] border border-border" aria-hidden="true" />
                <span className="font-mono text-[0.6rem] text-ink-muted">Parchment #FAF8F5</span>
              </div>
            </div>
            <p className="font-sans text-[0.55rem] text-ink-faint mt-3">Fonts: Playfair Display, Source Serif 4, Inter</p>
            <a href="/brand-kit/06-tokens/tokens.css" className="mt-2 inline-flex min-h-[44px] items-center font-sans text-[0.6rem] text-crimson hover:underline">
              tokens.css →
            </a>
          </div>
        </div>
        <div className="mt-6 rounded-sm border border-border bg-surface p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-sans text-xs font-semibold text-ink">Evidence tier social cards</p>
              <p className="mt-1 font-body text-sm text-ink-muted">
                Product taxonomy (Verified / Circumstantial / Disputed) — match The Record labels on social.
              </p>
            </div>
            <a
              href="/brand-kit/07-docs/EVIDENCE-TIERS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] font-semibold text-crimson hover:underline"
            >
              Taxonomy doc →
            </a>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Verified', href: '/brand-kit/04-social/evidence-tier-verified.svg', hex: '#166534' },
              { label: 'Circumstantial', href: '/brand-kit/04-social/evidence-tier-circumstantial.svg', hex: '#92400E' },
              { label: 'Disputed', href: '/brand-kit/04-social/evidence-tier-disputed.svg', hex: '#991B1B' },
            ].map(card => (
              <a
                key={card.href}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-sm border border-border hover:border-crimson/40"
              >
                <div className="flex h-28 items-center justify-center bg-obsidian p-3">
                  <img src={card.href} alt={`${card.label} evidence tier card`} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="font-sans text-xs font-semibold text-ink group-hover:text-crimson">{card.label}</span>
                  <span className="font-mono text-[0.55rem] text-ink-faint" style={{ color: card.hex }}>{card.hex}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/brand-kit/04-social/citation-card.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] font-semibold text-crimson hover:underline">Citation card →</a>
            <a href="/brand-kit/09-templates/correction-notice.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Correction template →</a>
            <a href="/brand-kit/04-social/bluesky-banner.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Bluesky banner →</a>
            <a href="/brand-kit/04-social/pinterest-pin.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Pinterest pin →</a>
            <a href="/brand-kit/07-docs/SOCIAL-LAUNCH.md" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Social launch →</a>
            <a href="/brand-kit/04-social/tiktok-cover.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">TikTok cover →</a>
            <a href="/brand-kit/04-social/reddit-banner.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Reddit banner →</a>
            <a href="/brand-kit/04-social/reels-safe-zone.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Reels safe zone →</a>
            <a href="/brand-kit/04-social/mastodon-banner.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Mastodon →</a>
            <a href="/brand-kit/04-social/whatsapp-cover.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">WhatsApp →</a>
            <a href="/brand-kit/04-social/video-end-card.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Video end →</a>
            <a href="/brand-kit/07-docs/bios.json" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Bios JSON →</a>
            <a href="/brand-kit/04-social/linkedin-post.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">LinkedIn post →</a>
            <a href="/brand-kit/04-social/facebook-post.svg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] text-ink-muted hover:text-crimson">Facebook post →</a>
          </div>
        </div>
      </section>

      {/* Download All CTA */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center gap-4 border-b border-border">
        <button
          onClick={handleDownloadAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-obsidian text-white font-sans text-[13px] font-semibold hover:bg-obsidian/80 transition-colors"
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
                  className="inline-flex min-h-[44px] items-center font-sans text-[11px] font-semibold text-crimson hover:text-crimson-dark transition-colors"
                >
                  Read full article &rarr;
                </Link>
                <button
                  onClick={() => handleDownloadCard(card)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
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
                          className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
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
                <Link to={`/news/${article.slug}`} className="inline-flex min-h-[44px] items-center font-display text-sm font-bold text-ink hover:text-crimson transition-colors line-clamp-1">
                  {article.title}
                </Link>
                <p className="font-sans text-[10px] text-ink-faint mt-0.5">{article.sources.length} sources · {article.readingTime} min read</p>
              </div>
              <button
                onClick={() => copyText(`${SITE_URL}/news/${article.slug}`, article.id)}
                className="flex-shrink-0 inline-flex min-h-[44px] items-center gap-1.5 font-sans text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors"
              >
                {copiedId === article.id ? 'Copied' : 'Copy link'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-8">
        <div className="bg-surface border border-border rounded-sm p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Usage Guidelines</h2>
          <div className="grid sm:grid-cols-2 gap-6 font-body text-sm text-ink-muted leading-relaxed">
            <div>
              <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">You May</h3>
              <p>Share any content pack on any platform. Download and use any graphic. Modify post text to fit your audience. Link to any article or chapter. Use our logo in press coverage or social posts that reference Veritas Worldwide.</p>
            </div>
            <div>
              <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">Please Do Not</h3>
              <p>Alter the meaning of quoted statistics or claims. Remove attribution to Veritas Worldwide. Use our brand to imply endorsement of products, candidates, or organizations. Misrepresent our editorial stance — we present evidence, not opinion.</p>
            </div>
          </div>
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
