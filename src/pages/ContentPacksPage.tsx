import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { allArticles as articles } from '../data/articles'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import { PACK_CAROUSELS } from '../data/contentPackCarousels'
import { CarouselDownloader } from '../components/DossierCarousel'
import type { CarouselSlide } from '../data/israelDossierExpanded'

const SITE = 'https://veritasworldwide.com'

// ── Brand colors ──
const BRAND = {
  ink: '#1A1A1A',
  parchment: '#FAF8F5',
  crimson: '#8B1A1A',
  crimsonDark: '#6B1010',
  white: '#FFFFFF',
}

// ── Shareable content packs with article hyperlinks ──
interface ContentPack {
  id: string
  headline: string
  body: string
  stat: { value: string; label: string }
  hashtags: string[]
  articleSlug?: string
  chapterPath?: string
  platforms: {
    twitter: string
    facebook: string
    instagram: string
  }
}

const PACKS: ContentPack[] = [
  {
    id: 'fed-rates',
    headline: 'The Fed Is Holding Rates While Oil Hits $110/Barrel',
    body: 'The FOMC voted 11-1 to keep the federal funds rate at 3.5-3.75% on March 18, 2026, as the Iran conflict drives crude past $110. Read the primary source analysis.',
    stat: { value: '$110/bbl', label: 'Crude oil price amid Iran conflict' },
    hashtags: ['VeritasWorldwide', 'FederalReserve', 'OilCrisis', 'FOMC', 'PrimarySources'],
    articleSlug: 'federal-reserve-holds-rates-march-2026-iran-oil-crisis',
    chapterPath: '/chapter/chapter-3',
    platforms: {
      twitter: 'The FOMC voted 11-1 to hold rates at 3.5-3.75% while crude oil surges past $110/barrel. The documented history of the Federal Reserve\u2019s crisis responses tells a pattern.\n\nPrimary sources. No spin. Read the evidence:',
      facebook: 'The Federal Reserve held rates steady on March 18, 2026 \u2014 an 11-1 vote \u2014 while oil prices surge past $110 per barrel due to the Iran conflict.\n\nVeritas Press has the full FOMC analysis with every primary source linked. No opinion. No anonymous sources. Just the documented record.\n\nRead the evidence:',
      instagram: 'The Fed is holding rates at 3.5-3.75% while crude oil tops $110/barrel.\n\n11-1 FOMC vote. Iran conflict driving energy prices. Dot plot projections show uncertainty.\n\nFull primary-source analysis on our site \u2014 link in bio.\n\nNo spin. No anonymous sources. Just the record.',
    },
  },
  {
    id: 'epstein-files',
    headline: '3.5 Million Pages of Epstein Files Just Dropped',
    body: 'The DOJ released the largest document disclosure in its history under the Epstein Transparency Act: 3.5 million pages, 2,000 videos, 180,000 images. We have the primary source breakdown.',
    stat: { value: '3.5M', label: 'Pages released by DOJ' },
    hashtags: ['VeritasWorldwide', 'EpsteinFiles', 'Transparency', 'DOJ', 'PublicRecord'],
    articleSlug: 'doj-releases-3-5-million-pages-epstein-files-2026',
    platforms: {
      twitter: '3.5 million pages. 2,000 videos. 180,000 images.\n\nThe DOJ just released the largest document disclosure in its history under the Epstein Transparency Act.\n\nWe\u2019ve documented every primary source:',
      facebook: 'The Department of Justice has released 3.5 million pages of Jeffrey Epstein files \u2014 the largest document disclosure in DOJ history.\n\nVeritas Press breaks down every primary source: the Congressional authorization, the DOJ compliance filing, the UN OHCHR statement on victim privacy, and what these documents actually contain.\n\nRead the full analysis:',
      instagram: '3.5 MILLION PAGES.\n2,000 videos.\n180,000 images.\n\nThe largest document disclosure in DOJ history just happened. The Epstein Transparency Act is now being enforced.\n\nFull primary-source breakdown on our site \u2014 link in bio.',
    },
  },
  {
    id: 'fisa-702',
    headline: 'The Government Can Read Your Texts Without a Warrant',
    body: 'FISA Section 702 sunsets in April 2026. The Government Surveillance Reform Act would require a warrant for the first time. Congress is deciding right now.',
    stat: { value: '702', label: 'The FISA section that allows warrantless surveillance' },
    hashtags: ['VeritasWorldwide', 'FISA702', 'Surveillance', 'FourthAmendment', 'Privacy'],
    articleSlug: 'government-surveillance-reform-act-fisa-section-702-2026',
    chapterPath: '/chapter/chapter-18',
    platforms: {
      twitter: 'FISA Section 702 lets the government read your texts, emails, and calls \u2014 without a warrant.\n\nIt sunsets in April 2026. Congress is deciding right now whether to add warrant requirements.\n\nThe full legislative analysis with primary sources:',
      facebook: 'Did you know the U.S. government can access your electronic communications without a warrant?\n\nFISA Section 702 is up for renewal in April 2026. The Government Surveillance Reform Act \u2014 introduced by a bipartisan coalition \u2014 would require a warrant for the first time.\n\nWe\u2019ve documented every primary source: the bill text, sponsor statements, EFF analysis, and the historical context from the Church Committee era.\n\nRead the evidence:',
      instagram: 'The government can read your texts without a warrant.\n\nFISA Section 702 sunsets April 2026. A bipartisan bill would finally require a warrant.\n\nCongress is deciding right now.\n\nFull analysis with every primary source on our site \u2014 link in bio.',
    },
  },
  {
    id: 'defense-budget',
    headline: '$1.5 TRILLION for the Military in 2027',
    body: 'The proposed FY2027 defense budget is $1.5 trillion when you include the $152B reconciliation supplement. That\'s $4,500 for every American. Primary source breakdown inside.',
    stat: { value: '$1.5T', label: 'Proposed FY2027 total defense spending' },
    hashtags: ['VeritasWorldwide', 'DefenseBudget', 'MilitarySpending', 'YourTaxDollars', 'Transparency'],
    articleSlug: 'us-defense-budget-1-5-trillion-2027-proposal',
    chapterPath: '/chapter/chapter-10',
    platforms: {
      twitter: '$1.5 TRILLION.\n\nThat\u2019s the proposed FY2027 defense budget including the $152B reconciliation supplement.\n\n$4,500 per American. F-47 stealth fighter. $500M for Israel missile defense.\n\nEvery line item sourced to Senate Appropriations and CRS:',
      facebook: 'The proposed FY2027 defense budget totals $1.5 trillion when you include the $152 billion reconciliation supplement.\n\nThat\u2019s $4,500 for every man, woman, and child in America.\n\nVeritas Press has broken down the full budget with primary sources: Senate Appropriations Committee data, Congressional Research Service analysis, and Defense Department filings.\n\nRead the breakdown:',
      instagram: '$1.5 TRILLION.\n\nThat\u2019s how much the U.S. plans to spend on defense in FY2027.\n\n$839B base + $152B supplemental.\nF-47 stealth fighter funded.\n$500M for Israel missile defense.\n\nFull primary-source breakdown on our site \u2014 link in bio.',
    },
  },
  {
    id: 'aipac-spending',
    headline: 'One Lobby Spent $28M to Reshape Congress This Year',
    body: 'AIPAC and its network of shell PACs have spent $28 million in the 2026 election cycle. $22 million in Illinois alone. Every dollar traced through FEC filings.',
    stat: { value: '$28M', label: 'AIPAC spending in 2026 election cycle' },
    hashtags: ['VeritasWorldwide', 'AIPAC', 'DarkMoney', 'Elections', 'FECFilings'],
    articleSlug: 'aipac-record-spending-reshaping-congress-2026',
    chapterPath: '/chapter/chapter-8',
    platforms: {
      twitter: '$28 million from one lobby.\n$22 million in Illinois primaries alone.\nFunneled through anonymous shell PACs.\n\nEvery dollar traced through FEC filings. No opinion. Just the documented money trail:',
      facebook: 'AIPAC and its affiliated PACs have spent $28 million in the 2026 election cycle \u2014 including $22 million in Illinois primary races alone, funneled through shell PACs that obscure the original donors.\n\nVeritas Press has traced every dollar through FEC filings, OpenSecrets data, and investigative reporting.\n\nNo opinion. No anonymous sources. Just the documented money trail.\n\nRead the evidence:',
      instagram: '$28 MILLION from one lobby.\n$22M in Illinois alone.\nFunneled through anonymous shell PACs.\n\nEvery dollar traced through FEC filings and OpenSecrets data.\n\nFull investigation on our site \u2014 link in bio.',
    },
  },
  {
    id: 'brand-mission',
    headline: 'We Don\u2019t Tell You What to Think',
    body: 'Veritas Press cites exclusively primary sources: government documents, court filings, congressional records. No anonymous sources. No opinion. No spin. We document the public record and leave conclusions to you.',
    stat: { value: '500+', label: 'Primary sources cited across the publication' },
    hashtags: ['VeritasWorldwide', 'PrimarySources', 'TheRecord', 'Truth', 'Journalism'],
    platforms: {
      twitter: 'We don\u2019t tell you what to think.\n\nVeritas Press cites exclusively primary sources: government documents, court filings, congressional records.\n\nNo anonymous sources. No opinion. No spin.\n\n500+ sources. 31 chapters. Free reader accounts unlock the full archive.',
      facebook: 'We don\u2019t tell you what to think.\n\nVeritas Press is a documentary publication that cites exclusively primary sources: government documents, court filings, congressional records, and declassified intelligence reports.\n\nNo anonymous sources. No editorial opinion. No narrative framing.\n\n31 chapters. 500+ primary sources. Three-tier evidence classification. Free reader accounts unlock the full archive.\n\nRead the record for yourself:',
      instagram: 'We don\u2019t tell you what to think.\n\nPrimary sources only:\n\u2022 Government documents\n\u2022 Court filings\n\u2022 Congressional records\n\u2022 Declassified reports\n\nNo anonymous sources.\nNo opinion.\nNo spin.\n\n500+ sources. 31 chapters. Free.\n\nLink in bio.',
    },
  },
]

// ── Canvas-based share graphic generator ──
function generateShareGraphic(
  pack: ContentPack,
  format: 'story' | 'square' | 'wide',
): Promise<Blob> {
  return new Promise((resolve) => {
    const sizes = {
      story: { w: 1080, h: 1920 },
      square: { w: 1080, h: 1080 },
      wide: { w: 1200, h: 630 },
    }
    const { w, h } = sizes[format]
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = BRAND.ink
    ctx.fillRect(0, 0, w, h)

    // Top crimson accent
    ctx.fillStyle = BRAND.crimson
    ctx.fillRect(0, 0, w, 6)

    // Veritas branding top
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.font = `bold ${Math.round(w * 0.018)}px Inter, Helvetica, Arial, sans-serif`
    ctx.letterSpacing = '4px'
    ctx.textAlign = 'left'
    const brandY = format === 'story' ? 80 : 60
    ctx.fillText('VERITAS WORLDWIDE PRESS', w * 0.08, brandY)
    ctx.letterSpacing = '0px'

    // Thin rule under branding
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(w * 0.08, brandY + 16)
    ctx.lineTo(w * 0.92, brandY + 16)
    ctx.stroke()

    // Stat value — big crimson number
    const statY = format === 'story' ? h * 0.22 : h * 0.3
    ctx.fillStyle = BRAND.crimson
    ctx.font = `bold ${Math.round(w * (format === 'story' ? 0.14 : 0.12))}px Georgia, serif`
    ctx.textAlign = 'left'
    ctx.fillText(pack.stat.value, w * 0.08, statY)

    // Stat label
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = `${Math.round(w * 0.022)}px Inter, Helvetica, Arial, sans-serif`
    ctx.fillText(pack.stat.label.toUpperCase(), w * 0.08, statY + Math.round(w * 0.04))

    // Headline
    ctx.fillStyle = BRAND.white
    const headlineSize = Math.round(w * (format === 'story' ? 0.065 : 0.055))
    ctx.font = `bold ${headlineSize}px Georgia, serif`
    const headlineY = format === 'story' ? h * 0.36 : h * 0.48
    const maxW = w * 0.84
    wrapText(ctx, pack.headline, w * 0.08, headlineY, maxW, headlineSize * 1.2)

    // Body text
    const bodySize = Math.round(w * (format === 'story' ? 0.033 : 0.028))
    ctx.fillStyle = 'rgba(255,255,255,0.65)'
    ctx.font = `${bodySize}px Inter, Helvetica, Arial, sans-serif`
    const bodyY = format === 'story' ? h * 0.52 : h * 0.68
    wrapText(ctx, pack.body.substring(0, 180) + (pack.body.length > 180 ? '...' : ''), w * 0.08, bodyY, maxW, bodySize * 1.6)

    // Bottom bar
    const bottomBarY = h - (format === 'story' ? 140 : 80)
    ctx.fillStyle = BRAND.crimson
    ctx.fillRect(0, bottomBarY, w, h - bottomBarY)

    // URL in bottom bar
    ctx.fillStyle = BRAND.white
    ctx.font = `bold ${Math.round(w * 0.025)}px Inter, Helvetica, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText('veritasworldwide.com', w / 2, bottomBarY + (format === 'story' ? 50 : 35))

    // Tagline
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.font = `${Math.round(w * 0.016)}px Inter, Helvetica, Arial, sans-serif`
    ctx.fillText('Primary Sources \u00b7 Public Record \u00b7 Your Conclusions', w / 2, bottomBarY + (format === 'story' ? 80 : 58))

    canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.92)
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY)
      line = word + ' '
      currentY += lineHeight
    } else {
      line = test
    }
  }
  ctx.fillText(line.trim(), x, currentY)
}

// ── Logo generator ──
function generateLogoPNG(size: number, variant: 'dark' | 'light'): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = variant === 'dark' ? BRAND.ink : BRAND.parchment
    ctx.fillRect(0, 0, size, size)

    // Rounded rect
    const pad = size * 0.1
    const r = size * 0.06
    roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, r)
    ctx.fillStyle = variant === 'dark' ? BRAND.crimson : BRAND.ink
    ctx.fill()

    // V letter
    ctx.fillStyle = variant === 'dark' ? BRAND.white : BRAND.parchment
    ctx.font = `bold ${size * 0.5}px Georgia, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('V', size / 2, size * 0.47)

    // Bottom rule
    ctx.strokeStyle = variant === 'dark' ? BRAND.white : BRAND.parchment
    ctx.lineWidth = size * 0.03
    ctx.globalAlpha = 0.4
    ctx.beginPath()
    ctx.moveTo(pad + size * 0.08, size - pad - size * 0.08)
    ctx.lineTo(size - pad - size * 0.08, size - pad - size * 0.08)
    ctx.stroke()
    ctx.globalAlpha = 1

    canvas.toBlob((blob) => resolve(blob!), 'image/png')
  })
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── Components ──
function PackCard({ pack }: { pack: ContentPack }) {
  const [activePlatform, setActivePlatform] = useState<'twitter' | 'facebook' | 'instagram'>('twitter')
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const articleUrl = pack.articleSlug ? `${SITE}/news/${pack.articleSlug}` : SITE
  const platformText = pack.platforms[activePlatform]
  const fullText = `${platformText}\n${articleUrl}\n\n${pack.hashtags.map(h => '#' + h).join(' ')}`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareDirect = (platform: 'twitter' | 'facebook') => {
    const text = pack.platforms[platform]
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}&hashtags=${pack.hashtags.slice(0, 3).join(',')}`, '_blank')
    } else {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}&quote=${encodeURIComponent(text)}`, '_blank')
    }
  }

  const handleDownloadGraphic = async (format: 'square' | 'story' | 'wide') => {
    setGenerating(true)
    try {
      const blob = await generateShareGraphic(pack, format)
      downloadBlob(blob, `veritas-${pack.id}-${format}.jpg`)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Stat Header */}
      <div className="bg-ink text-white p-5">
        <p className="font-display text-3xl font-bold text-crimson-light">{pack.stat.value}</p>
        <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-white/50 mt-1">{pack.stat.label}</p>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-ink mb-2">{pack.headline}</h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">{pack.body}</p>

        {/* Article link */}
        {pack.articleSlug && (
          <Link
            to={`/news/${pack.articleSlug}`}
            className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors mb-4"
          >
            Read the full article &rarr;
          </Link>
        )}

        {/* Platform tabs */}
        <div className="flex gap-1 mb-3">
          {(['twitter', 'facebook', 'instagram'] as const).map(p => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm transition-colors ${
                activePlatform === p ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink hover:bg-parchment-dark/50'
              }`}
            >
              {p === 'twitter' ? 'X / Twitter' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Post preview */}
        <div className="bg-surface border border-border rounded-sm p-4 mb-4 font-body text-sm text-ink leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
          {platformText}
          {'\n\n'}
          <span className="text-crimson font-semibold">{articleUrl}</span>
          {'\n\n'}
          <span className="text-ink-faint">{pack.hashtags.map(h => '#' + h).join(' ')}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-sm font-sans text-xs font-semibold transition-all ${
              copied ? 'bg-emerald-600 text-white' : 'bg-ink text-white hover:bg-ink/80'
            }`}
          >
            {copied ? (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
            ) : (
              <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>Copy Post</>
            )}
          </button>
          <button onClick={() => handleShareDirect('twitter')} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm font-sans text-xs font-semibold bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors">
            Share on X
          </button>
          <button onClick={() => handleShareDirect('facebook')} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm font-sans text-xs font-semibold bg-[#1877F2] text-white hover:bg-[#166fe5] transition-colors">
            Share on Facebook
          </button>
        </div>

        {/* Download graphics */}
        <div>
          <p className="font-sans text-[0.55rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">Download Share Graphics</p>
          <div className="flex gap-2">
            <button onClick={() => handleDownloadGraphic('square')} disabled={generating} className="px-3 py-1.5 rounded-sm border border-border font-sans text-[0.6rem] font-semibold text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">
              1080×1080
            </button>
            <button onClick={() => handleDownloadGraphic('story')} disabled={generating} className="px-3 py-1.5 rounded-sm border border-border font-sans text-[0.6rem] font-semibold text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">
              Story 9:16
            </button>
            <button onClick={() => handleDownloadGraphic('wide')} disabled={generating} className="px-3 py-1.5 rounded-sm border border-border font-sans text-[0.6rem] font-semibold text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors disabled:opacity-50">
              OG 1200×630
            </button>
          </div>
        </div>

        {/* 10-Slide Instagram Carousel */}
        {(() => {
          const carousel = PACK_CAROUSELS.find(c => c.packId === pack.id)
          if (!carousel) return null
          const carouselSlides: CarouselSlide[] = carousel.slides.map(s => ({
            headline: s.headline,
            stat: s.stat,
            body: s.body,
            source: s.source,
            sourceUrl: pack.platforms.twitter.includes('veritasworldwide.com') ? `https://veritasworldwide.com/news/${pack.articleSlug || ''}` : 'https://veritasworldwide.com',
            bgStyle: s.bgStyle,
          }))
          return (
            <div className="mt-4">
              <CarouselDownloader
                slides={carouselSlides}
                title={`${carousel.title} — 10 Slides`}
                filenamePrefix={`veritas-${pack.id}`}
              />
            </div>
          )
        })()}
      </div>
    </div>
  )
}

export default function ContentPacksPage() {
  useEffect(() => {
    setMetaTags({
      title: `Share the Truth \u2014 Content Packs | ${SITE_NAME}`,
      description: 'Ready-to-share social media posts, graphics, and brand assets. Help spread primary-source journalism.',
      url: `${SITE_URL}/share`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Content Packs \u2014 ${SITE_NAME}`,
      'url': `${SITE_URL}/share`,
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const [downloadingLogo, setDownloadingLogo] = useState(false)

  const handleLogoDownload = async (variant: 'dark' | 'light', size: number) => {
    setDownloadingLogo(true)
    try {
      const blob = await generateLogoPNG(size, variant)
      downloadBlob(blob, `veritas-logo-${variant}-${size}px.png`)
    } finally {
      setDownloadingLogo(false)
    }
  }

  const handleSVGDownload = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="2" fill="#1A1A1A"/><text x="16" y="23" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#8B1A1A">V</text><line x1="4" y1="28" x2="28" y2="28" stroke="#8B1A1A" stroke-width="2"/></svg>`
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    downloadBlob(blob, 'veritas-logo.svg')
  }

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-screen">
      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted hover:text-crimson transition-colors">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="text-ink font-medium">Content Packs</span>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="bg-ink text-white">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">
            Veritas Press
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Share the Truth
          </h1>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-2">
            Ready-to-post content, share graphics, and brand assets. Every post links back to primary sources. Every graphic is free to use.
          </p>
          <p className="font-body text-sm italic text-white/40">
            An informed public is the strongest safeguard against the abuse of power.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Brand Assets Section */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Brand Assets</h2>
              <p className="font-body text-sm text-ink-muted mt-1">Logo files, brand marks, and visual identity assets for press and social media.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Logo Preview Dark */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-lg p-5 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-ink rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="2" fill="#8B1A1A" />
                  <text x="16" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#FAF8F5">V</text>
                </svg>
              </div>
              <p className="font-sans text-xs font-semibold text-ink mb-2">Logo — Dark BG</p>
              <div className="flex gap-1 justify-center">
                <button onClick={() => handleLogoDownload('dark', 512)} disabled={downloadingLogo} className="px-2 py-1 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">512px</button>
                <button onClick={() => handleLogoDownload('dark', 1024)} disabled={downloadingLogo} className="px-2 py-1 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">1024px</button>
              </div>
            </div>

            {/* Logo Preview Light */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-lg p-5 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-parchment border border-border rounded-lg flex items-center justify-center">
                <svg className="w-12 h-12" viewBox="0 0 32 32">
                  <rect width="32" height="32" rx="2" fill="#1A1A1A" />
                  <text x="16" y="23" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#FAF8F5">V</text>
                </svg>
              </div>
              <p className="font-sans text-xs font-semibold text-ink mb-2">Logo — Light BG</p>
              <div className="flex gap-1 justify-center">
                <button onClick={() => handleLogoDownload('light', 512)} disabled={downloadingLogo} className="px-2 py-1 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">512px</button>
                <button onClick={() => handleLogoDownload('light', 1024)} disabled={downloadingLogo} className="px-2 py-1 rounded-sm border border-border font-sans text-[0.55rem] text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">1024px</button>
              </div>
            </div>

            {/* SVG */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-lg p-5 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-surface border border-border rounded-lg flex items-center justify-center">
                <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint">SVG</span>
              </div>
              <p className="font-sans text-xs font-semibold text-ink mb-2">Vector Logo</p>
              <button onClick={handleSVGDownload} className="px-3 py-1 rounded-sm border border-border font-sans text-[0.55rem] font-semibold text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">
                Download SVG
              </button>
            </div>

            {/* Brand Guidelines Quick */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-lg p-5">
              <p className="font-sans text-xs font-semibold text-ink mb-3">Brand Colors</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-[#1A1A1A]" />
                  <span className="font-mono text-[0.6rem] text-ink-muted">Ink #1A1A1A</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-[#8B1A1A]" />
                  <span className="font-mono text-[0.6rem] text-ink-muted">Crimson #8B1A1A</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-sm bg-[#FAF8F5] border border-border" />
                  <span className="font-mono text-[0.6rem] text-ink-muted">Parchment #FAF8F5</span>
                </div>
              </div>
              <p className="font-sans text-[0.55rem] text-ink-faint mt-3">Fonts: Playfair Display, Source Serif 4, Inter</p>
            </div>
          </div>
        </section>

        {/* Content Packs Section */}
        <section>
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">Content Packs</h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed max-w-3xl">
              Pre-written posts for every major platform with article hyperlinks. Copy the text, download the share graphic, and post. Every piece links directly to our primary-source reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PACKS.map(pack => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mt-16 bg-surface border border-border rounded-lg p-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Usage Guidelines</h2>
          <div className="grid sm:grid-cols-2 gap-6 font-body text-sm text-ink-muted leading-relaxed">
            <div>
              <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">You May</h3>
              <p>Share any content pack on any platform. Download and use any graphic. Modify post text to fit your audience. Link to any article or chapter. Use our logo in press coverage or social posts that reference Veritas Press.</p>
            </div>
            <div>
              <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-2">Please Do Not</h3>
              <p>Alter the meaning of quoted statistics or claims. Remove attribution to Veritas Press. Use our brand to imply endorsement of products, candidates, or organizations. Misrepresent our editorial stance — we present evidence, not opinion.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
