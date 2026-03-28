import { useState, useRef } from 'react'

interface SocialPost {
  platform: 'instagram' | 'facebook' | 'twitter' | 'all'
  headline: string
  body: string
  stat: string
  hashtags: string[]
  cta: string
  url: string
}

const SITE_URL = 'https://veritasworldwide.com'

const CONTENT_PACKS: SocialPost[] = [
  {
    platform: 'all',
    headline: 'The Federal Reserve is NOT Federal',
    body: 'In 1913, a private banking cartel was granted control over America\'s money supply. No audit. No oversight. No accountability. The full documented history is available — free.',
    stat: '110+ years of unaudited control',
    hashtags: ['VeritasWorldwide', 'TheRecord', 'FederalReserve', 'Truth', 'FollowTheMoney'],
    cta: 'Read the evidence',
    url: `${SITE_URL}/chapter/chapter-3`,
  },
  {
    platform: 'all',
    headline: '$3.4 Billion in U.S. Aid to Israel — Annually',
    body: 'Every year, American taxpayers fund $3.4 billion in military aid to Israel. Where does it go? Who profits? The documented money trail will change how you see your tax dollars.',
    stat: '$3.4B annually — your tax dollars',
    hashtags: ['VeritasWorldwide', 'IsraelDossier', 'TaxDollars', 'Transparency', 'TheRecord'],
    cta: 'See the full dossier',
    url: `${SITE_URL}/israel-dossier`,
  },
  {
    platform: 'all',
    headline: 'Operation Mockingbird Was Real',
    body: 'The CIA admitted to placing agents inside major news organizations. Exposed in the 1975 Church Committee hearings. Still classified documents remain sealed. The media you trust was designed.',
    stat: '400+ journalists on CIA payroll',
    hashtags: ['VeritasWorldwide', 'Mockingbird', 'MediaControl', 'Declassified', 'TheRecord'],
    cta: 'Read the declassified evidence',
    url: `${SITE_URL}/chapter/chapter-18`,
  },
  {
    platform: 'all',
    headline: 'MKUltra: The CIA\'s Mind Control Program',
    body: '149 sub-projects. 80+ institutions. Exposed only because a FOIA request uncovered 20,000 documents the CIA failed to destroy. This isn\'t conspiracy — it\'s congressional record.',
    stat: '20,000+ declassified documents',
    hashtags: ['VeritasWorldwide', 'MKUltra', 'Declassified', 'CIA', 'TheRecord'],
    cta: 'Read the full chapter',
    url: `${SITE_URL}/chapter/chapter-19`,
  },
  {
    platform: 'all',
    headline: 'The 2008 Crash Was Engineered',
    body: 'Banks packaged toxic mortgages as AAA securities, bet against their own clients, and when it collapsed — YOU paid the bailout. Not a single top executive went to prison.',
    stat: '$700B bailout — zero prosecutions',
    hashtags: ['VeritasWorldwide', 'FinancialCrisis', 'WallStreet', 'Bailout', 'TheRecord'],
    cta: 'Follow the money',
    url: `${SITE_URL}/chapter/chapter-13`,
  },
  {
    platform: 'all',
    headline: 'Every Claim We Make Is Sourced',
    body: 'Congressional records. FOIA documents. Court filings. Exposed by journalists who risked everything. We don\'t ask you to believe us — we ask you to verify us.',
    stat: '500+ primary sources cited',
    hashtags: ['VeritasWorldwide', 'PrimarySources', 'Truth', 'Verify', 'TheRecord'],
    cta: 'View our methodology',
    url: `${SITE_URL}/methodology`,
  },
  {
    platform: 'twitter',
    headline: 'Alone, we cannot change anything.',
    body: 'But together — as a community of people who care about other people, regardless of nationality or color — we truly can change the world.\n\nThe Record is free. Share it.',
    stat: 'Free. Open. Verified.',
    hashtags: ['VeritasWorldwide', 'TheRecord', 'Community', 'Truth'],
    cta: 'Download free',
    url: SITE_URL,
  },
  {
    platform: 'instagram',
    headline: 'JFK Wanted to Splinter the CIA',
    body: 'President Kennedy vowed to "splinter the CIA into a thousand pieces and scatter it to the winds." 77 days later, he was dead in Dallas. The Warren Commission sealed key evidence for 75 years.',
    stat: '75 years of sealed evidence',
    hashtags: ['VeritasWorldwide', 'JFK', 'CIA', 'Declassified', 'TheRecord', 'History'],
    cta: 'Read Chapter 9',
    url: `${SITE_URL}/chapter/chapter-9`,
  },
]

export default function AdminSocialPacks() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'instagram' | 'facebook' | 'twitter'>('all')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const filtered = CONTENT_PACKS.filter(p =>
    selectedPlatform === 'all' || p.platform === 'all' || p.platform === selectedPlatform
  )

  const copyToClipboard = (post: SocialPost, index: number) => {
    const text = formatPost(post, selectedPlatform === 'all' ? 'twitter' : selectedPlatform)
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const formatPost = (post: SocialPost, platform: string): string => {
    const tags = post.hashtags.map(t => `#${t}`).join(' ')
    if (platform === 'twitter') {
      return `${post.headline}\n\n${post.stat}\n\n${post.cta}: ${post.url}\n\n${tags}`
    }
    return `${post.headline}\n\n${post.body}\n\n${post.stat}\n\n${post.cta} → ${post.url}\n\n${tags}`
  }

  const generateCarouselImage = (post: SocialPost, slideNum: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1080
    canvas.height = 1080

    // Background
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, 1080, 1080)

    // Crimson accent bar
    ctx.fillStyle = '#8B0000'
    ctx.fillRect(0, 0, 1080, 6)

    // Bottom bar
    ctx.fillStyle = '#8B0000'
    ctx.fillRect(0, 1074, 1080, 6)

    if (slideNum === 0) {
      // Title slide
      ctx.fillStyle = '#8B0000'
      ctx.fillRect(80, 200, 60, 4)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 52px Georgia, serif'
      wrapText(ctx, post.headline, 80, 280, 920, 64)

      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.font = '24px Inter, sans-serif'
      ctx.fillText('VERITAS WORLDWIDE PRESS', 80, 960)

      ctx.fillStyle = '#8B0000'
      ctx.font = 'bold 20px Inter, sans-serif'
      ctx.fillText('SWIPE →', 920, 960)
    } else if (slideNum === 1) {
      // Stat slide
      ctx.fillStyle = '#8B0000'
      ctx.font = 'bold 16px Inter, sans-serif'
      ctx.fillText('BY THE NUMBERS', 80, 200)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 64px Georgia, serif'
      wrapText(ctx, post.stat, 80, 340, 920, 76)

      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '26px Georgia, serif'
      wrapText(ctx, post.body, 80, 540, 920, 38)
    } else {
      // CTA slide
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 44px Georgia, serif'
      wrapText(ctx, 'Read the Evidence.', 80, 300, 920, 56)

      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '28px Inter, sans-serif'
      wrapText(ctx, 'Every claim sourced. Every document linked. Free reader accounts unlock the full archive.', 80, 460, 920, 40)

      // CTA button
      ctx.fillStyle = '#8B0000'
      roundRect(ctx, 80, 620, 400, 60, 8)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 20px Inter, sans-serif'
      ctx.fillText(post.cta.toUpperCase(), 120, 658)

      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.font = '18px Inter, sans-serif'
      ctx.fillText('veritasworldwide.com', 80, 960)

      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText(post.hashtags.map(t => `#${t}`).join('  '), 80, 1000)
    }

    return canvas.toDataURL('image/png')
  }

  const downloadCarousel = (post: SocialPost, index: number) => {
    for (let slide = 0; slide < 3; slide++) {
      const dataUrl = generateCarouselImage(post, slide)
      if (dataUrl) {
        const link = document.createElement('a')
        link.download = `veritas-carousel-${index + 1}-slide-${slide + 1}.png`
        link.href = dataUrl
        link.click()
      }
    }
  }

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div>
        <h1 className="font-serif text-xl font-bold text-white">Social Media Content Packs</h1>
        <p className="font-sans text-xs text-white/30 mt-1">
          Pre-written posts with attention-grabbing statistics. Copy, customize, and post to drive traffic back to the site.
        </p>
      </div>

      {/* Platform Filter */}
      <div className="flex gap-2">
        {(['all', 'instagram', 'facebook', 'twitter'] as const).map(p => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-4 py-1.5 rounded font-sans text-xs tracking-wide transition-colors ${
              selectedPlatform === p ? 'bg-crimson/10 text-crimson' : 'bg-white/5 text-white/30 hover:text-white/50'
            }`}
          >
            {p === 'all' ? 'All Platforms' : p === 'twitter' ? 'X / Twitter' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {filtered.map((post, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex px-2 py-0.5 rounded font-sans text-[9px] font-bold tracking-wider uppercase ${
                      post.platform === 'instagram' ? 'bg-pink-500/10 text-pink-400' :
                      post.platform === 'twitter' ? 'bg-blue-400/10 text-blue-400' :
                      post.platform === 'facebook' ? 'bg-blue-600/10 text-blue-500' :
                      'bg-white/5 text-white/40'
                    }`}>
                      {post.platform === 'all' ? 'All Platforms' : post.platform === 'twitter' ? 'X / Twitter' : post.platform}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">{post.headline}</h3>
                  <p className="font-sans text-sm text-white/50 mt-2 leading-relaxed">{post.body}</p>
                  <div className="mt-3 inline-flex px-3 py-1.5 bg-crimson/10 rounded">
                    <span className="font-sans text-xs font-bold text-crimson">{post.stat}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.hashtags.map(tag => (
                      <span key={tag} className="font-sans text-[10px] text-white/20">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(post, i)}
                className="px-3 py-1.5 bg-white/5 rounded font-sans text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                {copiedIndex === i ? '✓ Copied!' : 'Copy Text'}
              </button>
              <button
                onClick={() => downloadCarousel(post, i)}
                className="px-3 py-1.5 bg-crimson/10 rounded font-sans text-xs text-crimson hover:bg-crimson/20 transition-colors"
              >
                Download Carousel (3 slides)
              </button>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/5 rounded font-sans text-xs text-white/30 hover:text-white/50 transition-colors ml-auto"
              >
                Preview Link →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Download */}
      <div className="bg-crimson/5 border border-crimson/10 rounded-lg p-5">
        <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-crimson mb-2">Sharing Guide</h3>
        <p className="font-sans text-xs text-white/40 leading-relaxed">
          Instagram: Download carousel slides (1080×1080) and post as a multi-image carousel. Add the caption from "Copy Text."
          Facebook: Copy the text and paste as a status update. The link preview will auto-generate.
          X/Twitter: Copy the text — it's pre-formatted within the character limit. The link will generate a card preview.
          All posts link back to veritasworldwide.com with chapter-specific deep links.
        </p>
      </div>
    </div>
  )
}

// Canvas helper: wrap text
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const testLine = line + word + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY)
      line = word + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), x, currentY)
}

// Canvas helper: rounded rect
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
