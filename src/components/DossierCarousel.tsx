/**
 * DossierCarousel — Generates downloadable 10-slide Instagram carousels
 * Uses Canvas API to create 1080x1080 images with Veritas brand styling
 */
import { useState, useCallback } from 'react'
import type { CarouselSlide, PinnedPostData } from '../data/israelDossierExpanded'

const BRAND = {
  ink: '#1A1A1A',
  parchment: '#FAF8F5',
  crimson: '#8B1A1A',
  crimsonDark: '#6B1010',
  white: '#FFFFFF',
  border: '#E5E7EB',
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 20
): number {
  const lines: string[] = []
  const paragraphs = text.split('\n')
  for (const para of paragraphs) {
    if (para.trim() === '') { lines.push(''); continue }
    const words = para.split(' ')
    let line = ''
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > maxWidth && line !== '') {
        lines.push(line.trim())
        line = word + ' '
      } else {
        line = test
      }
    }
    lines.push(line.trim())
  }
  const drawn = lines.slice(0, maxLines)
  drawn.forEach((l, i) => {
    ctx.fillText(l, x, y + i * lineHeight)
  })
  return y + drawn.length * lineHeight
}

function drawSlide(canvas: HTMLCanvasElement, slide: CarouselSlide, slideNum: number, totalSlides: number) {
  const W = 1080
  const H = 1080
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Background
  const bgColors: Record<string, { bg: string; text: string; accent: string }> = {
    dark: { bg: BRAND.ink, text: BRAND.white, accent: BRAND.crimson },
    crimson: { bg: BRAND.crimson, text: BRAND.white, accent: BRAND.white },
    light: { bg: BRAND.parchment, text: BRAND.ink, accent: BRAND.crimson },
    stat: { bg: BRAND.ink, text: BRAND.white, accent: BRAND.crimson },
  }
  const theme = bgColors[slide.bgStyle] || bgColors.dark

  ctx.fillStyle = theme.bg
  ctx.fillRect(0, 0, W, H)

  // Top crimson accent bar
  ctx.fillStyle = BRAND.crimson
  ctx.fillRect(0, 0, W, 6)

  // Branding
  ctx.fillStyle = theme.text + '66'
  ctx.font = 'bold 16px Inter, Helvetica, Arial, sans-serif'
  ctx.letterSpacing = '5px'
  ctx.textAlign = 'left'
  ctx.fillText('VERITAS WORLDWIDE PRESS', 80, 70)
  ctx.letterSpacing = '0px'

  // Thin rule
  ctx.strokeStyle = theme.text + '20'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(80, 88)
  ctx.lineTo(W - 80, 88)
  ctx.stroke()

  // Slide indicator
  ctx.fillStyle = theme.text + '40'
  ctx.font = '600 13px Inter, Helvetica, Arial, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(`${slideNum} / ${totalSlides}`, W - 80, 70)
  ctx.textAlign = 'left'

  let yPos = 140

  // Stat (if present)
  if (slide.stat) {
    ctx.fillStyle = theme.accent
    ctx.font = 'bold 120px Georgia, serif'
    ctx.fillText(slide.stat, 80, yPos + 100)
    yPos += 140
  }

  // Headline
  ctx.fillStyle = theme.text
  ctx.font = 'bold 52px Georgia, serif'
  yPos = wrapText(ctx, slide.headline, 80, yPos + 60, W - 160, 62, 4)
  yPos += 30

  // Body
  ctx.fillStyle = theme.text + 'B3'
  ctx.font = '28px Inter, Helvetica, Arial, sans-serif'
  yPos = wrapText(ctx, slide.body, 80, yPos, W - 160, 40, 10)

  // Source at bottom
  ctx.fillStyle = theme.text + '50'
  ctx.font = '600 13px Inter, Helvetica, Arial, sans-serif'
  ctx.letterSpacing = '2px'
  ctx.fillText('SOURCE', 80, H - 120)
  ctx.letterSpacing = '0px'
  ctx.font = '15px Inter, Helvetica, Arial, sans-serif'
  ctx.fillStyle = theme.text + '70'
  ctx.fillText(slide.source.substring(0, 70), 80, H - 96)

  // Bottom crimson bar with URL
  ctx.fillStyle = BRAND.crimson
  ctx.fillRect(0, H - 60, W, 60)
  ctx.fillStyle = BRAND.white
  ctx.font = 'bold 18px Inter, Helvetica, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('veritasworldwide.com/israel-dossier', W / 2, H - 28)
  ctx.textAlign = 'left'
}

function drawPinnedPost(canvas: HTMLCanvasElement, post: PinnedPostData) {
  const W = 1080
  const H = 1080
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  if (post.bgStyle === 'dark-crimson') {
    // Dark background with crimson accents
    ctx.fillStyle = BRAND.ink
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = BRAND.crimson
    ctx.fillRect(0, 0, W, 8)
    ctx.fillRect(0, H - 8, W, 8)

    // Stat
    ctx.fillStyle = BRAND.crimson
    ctx.font = 'bold 180px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText(post.stat, W / 2, 380)

    // Stat label
    ctx.fillStyle = BRAND.white + '60'
    ctx.font = '600 24px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.statLabel, W / 2, 430)

    // Title
    ctx.fillStyle = BRAND.white
    ctx.font = 'bold 56px Georgia, serif'
    wrapText(ctx, post.title, W / 2 - 400, 520, 800, 66, 3)
    ctx.textAlign = 'center'

    // Subtitle
    ctx.fillStyle = BRAND.white + '80'
    ctx.font = '24px Inter, Helvetica, Arial, sans-serif'
    wrapText(ctx, post.subtitle, W / 2 - 380, 700, 760, 36, 3)

    // CTA Button
    const btnW = 380
    const btnH = 60
    const btnX = (W - btnW) / 2
    const btnY = 820
    ctx.fillStyle = BRAND.crimson
    ctx.beginPath()
    ctx.roundRect(btnX, btnY, btnW, btnH, 4)
    ctx.fill()
    ctx.fillStyle = BRAND.white
    ctx.font = 'bold 20px Inter, Helvetica, Arial, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(post.cta, W / 2, btnY + 38)
    ctx.letterSpacing = '0px'

    // URL
    ctx.fillStyle = BRAND.white + '40'
    ctx.font = '16px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.url, W / 2, H - 40)

    // Branding
    ctx.fillStyle = BRAND.white + '30'
    ctx.font = 'bold 14px Inter, Helvetica, Arial, sans-serif'
    ctx.letterSpacing = '4px'
    ctx.fillText('VERITAS WORLDWIDE PRESS', W / 2, 60)
    ctx.letterSpacing = '0px'

  } else if (post.bgStyle === 'parchment') {
    // Light parchment background
    ctx.fillStyle = BRAND.parchment
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = BRAND.crimson
    ctx.fillRect(0, 0, W, 8)
    ctx.fillStyle = BRAND.ink
    ctx.fillRect(0, H - 4, W, 4)

    // Branding
    ctx.fillStyle = BRAND.ink + '40'
    ctx.font = 'bold 14px Inter, Helvetica, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '4px'
    ctx.fillText('VERITAS WORLDWIDE PRESS', W / 2, 60)
    ctx.letterSpacing = '0px'

    // Stat
    ctx.fillStyle = BRAND.crimson
    ctx.font = 'bold 160px Georgia, serif'
    ctx.fillText(post.stat, W / 2, 360)

    // Stat label
    ctx.fillStyle = BRAND.ink + '60'
    ctx.font = '600 22px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.statLabel, W / 2, 410)

    // Title
    ctx.fillStyle = BRAND.ink
    ctx.font = 'bold 48px Georgia, serif'
    wrapText(ctx, post.title, W / 2 - 380, 500, 760, 58, 3)

    // Subtitle
    ctx.textAlign = 'center'
    ctx.fillStyle = BRAND.ink + '70'
    ctx.font = '22px Inter, Helvetica, Arial, sans-serif'
    wrapText(ctx, post.subtitle, W / 2 - 360, 680, 720, 34, 3)

    // CTA
    const btnW = 380
    const btnH = 56
    const btnX = (W - btnW) / 2
    const btnY = 820
    ctx.fillStyle = BRAND.ink
    ctx.beginPath()
    ctx.roundRect(btnX, btnY, btnW, btnH, 4)
    ctx.fill()
    ctx.fillStyle = BRAND.parchment
    ctx.font = 'bold 18px Inter, Helvetica, Arial, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(post.cta, W / 2, btnY + 36)
    ctx.letterSpacing = '0px'

    // URL
    ctx.fillStyle = BRAND.ink + '40'
    ctx.font = '16px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.url, W / 2, H - 36)

  } else {
    // Full crimson
    ctx.fillStyle = BRAND.crimson
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = BRAND.white
    ctx.fillRect(0, 0, W, 4)
    ctx.fillRect(0, H - 4, W, 4)

    // Branding
    ctx.fillStyle = BRAND.white + '50'
    ctx.font = 'bold 14px Inter, Helvetica, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.letterSpacing = '4px'
    ctx.fillText('VERITAS WORLDWIDE PRESS', W / 2, 60)
    ctx.letterSpacing = '0px'

    // Stat
    ctx.fillStyle = BRAND.white
    ctx.font = 'bold 160px Georgia, serif'
    ctx.fillText(post.stat, W / 2, 360)

    // Stat label
    ctx.fillStyle = BRAND.white + '70'
    ctx.font = '600 22px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.statLabel, W / 2, 410)

    // Title
    ctx.fillStyle = BRAND.white
    ctx.font = 'bold 44px Georgia, serif'
    wrapText(ctx, post.title, W / 2 - 380, 500, 760, 54, 3)

    // Subtitle
    ctx.textAlign = 'center'
    ctx.fillStyle = BRAND.white + '80'
    ctx.font = '22px Inter, Helvetica, Arial, sans-serif'
    wrapText(ctx, post.subtitle, W / 2 - 360, 680, 720, 34, 3)

    // CTA
    const btnW = 380
    const btnH = 56
    const btnX = (W - btnW) / 2
    const btnY = 820
    ctx.fillStyle = BRAND.white
    ctx.beginPath()
    ctx.roundRect(btnX, btnY, btnW, btnH, 4)
    ctx.fill()
    ctx.fillStyle = BRAND.crimson
    ctx.font = 'bold 18px Inter, Helvetica, Arial, sans-serif'
    ctx.letterSpacing = '3px'
    ctx.fillText(post.cta, W / 2, btnY + 36)
    ctx.letterSpacing = '0px'

    // URL
    ctx.fillStyle = BRAND.white + '40'
    ctx.font = '16px Inter, Helvetica, Arial, sans-serif'
    ctx.fillText(post.url, W / 2, H - 36)
  }
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

// ── Carousel Download Section ──
export function CarouselDownloader({ slides, title, filenamePrefix }: {
  slides: CarouselSlide[]
  title: string
  filenamePrefix: string
}) {
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownloadAll = useCallback(async () => {
    setGenerating(true)
    setProgress(0)
    const canvas = document.createElement('canvas')

    for (let i = 0; i < slides.length; i++) {
      drawSlide(canvas, slides[i], i + 1, slides.length)
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95)
      })
      downloadBlob(blob, `${filenamePrefix}-slide-${String(i + 1).padStart(2, '0')}.jpg`)
      setProgress(i + 1)
      await new Promise(r => setTimeout(r, 300)) // stagger downloads
    }
    setGenerating(false)
  }, [slides, filenamePrefix])

  const handleDownloadSingle = useCallback(async (index: number) => {
    const canvas = document.createElement('canvas')
    drawSlide(canvas, slides[index], index + 1, slides.length)
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95)
    })
    downloadBlob(blob, `${filenamePrefix}-slide-${String(index + 1).padStart(2, '0')}.jpg`)
  }, [slides, filenamePrefix])

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-surface">
      <div className="bg-obsidian text-white p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
              Instagram Carousel · {slides.length} Slides
            </p>
            <h3 className="font-display text-xl font-bold">{title}</h3>
          </div>
          <button
            onClick={handleDownloadAll}
            disabled={generating}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white font-sans text-xs font-bold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50"
          >
            {generating ? (
              <>Downloading {progress}/{slides.length}...</>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download All {slides.length} Slides
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slide previews */}
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {slides.map((slide, i) => {
            const bgColors: Record<string, string> = {
              dark: BRAND.ink,
              crimson: BRAND.crimson,
              light: BRAND.parchment,
              stat: BRAND.ink,
            }
            const textColors: Record<string, string> = {
              dark: BRAND.white,
              crimson: BRAND.white,
              light: BRAND.ink,
              stat: BRAND.white,
            }
            return (
              <button
                key={i}
                onClick={() => handleDownloadSingle(i)}
                className="group relative aspect-square rounded-sm overflow-hidden border border-border hover:border-crimson/40 transition-all hover:shadow-md"
                style={{ backgroundColor: bgColors[slide.bgStyle] }}
              >
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  <p className="font-sans text-[0.5rem] font-bold tracking-wider uppercase" style={{ color: textColors[slide.bgStyle] + '60' }}>
                    {i + 1}/{slides.length}
                  </p>
                  <div>
                    {slide.stat && (
                      <p className="font-display text-lg font-bold text-crimson leading-tight">{slide.stat}</p>
                    )}
                    <p className="font-sans text-[0.55rem] font-semibold leading-snug line-clamp-3" style={{ color: textColors[slide.bgStyle] }}>
                      {slide.headline}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
        <p className="font-sans text-[0.55rem] text-ink-faint mt-3 text-center">
          Click any slide to download individually · All slides are 1080×1080px (Instagram optimal)
        </p>
      </div>
    </div>
  )
}

// ── Pinned Post Downloader ──
export function PinnedPostDownloader({ posts }: { posts: PinnedPostData[] }) {
  const [generating, setGenerating] = useState<string | null>(null)

  const handleDownload = useCallback(async (post: PinnedPostData) => {
    setGenerating(post.id)
    const canvas = document.createElement('canvas')
    drawPinnedPost(canvas, post)
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95)
    })
    downloadBlob(blob, `veritas-pinned-${post.id}.jpg`)
    setGenerating(null)
  }, [])

  const handleDownloadAll = useCallback(async () => {
    setGenerating('all')
    const canvas = document.createElement('canvas')
    for (const post of posts) {
      drawPinnedPost(canvas, post)
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.95)
      })
      downloadBlob(blob, `veritas-pinned-${post.id}.jpg`)
      await new Promise(r => setTimeout(r, 300))
    }
    setGenerating(null)
  }, [posts])

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-surface">
      <div className="bg-crimson text-white p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase text-white/60 mb-1">
              Pinned Profile Posts · {posts.length} Images
            </p>
            <h3 className="font-display text-xl font-bold">Pin These to Your Profile</h3>
          </div>
          <button
            onClick={handleDownloadAll}
            disabled={generating !== null}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-crimson font-sans text-xs font-bold tracking-[0.08em] uppercase rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50"
          >
            {generating === 'all' ? 'Downloading...' : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download All 3
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {posts.map(post => {
            const bgMap: Record<string, string> = {
              'dark-crimson': BRAND.ink,
              parchment: BRAND.parchment,
              'full-crimson': BRAND.crimson,
            }
            const textMap: Record<string, string> = {
              'dark-crimson': BRAND.white,
              parchment: BRAND.ink,
              'full-crimson': BRAND.white,
            }
            return (
              <button
                key={post.id}
                onClick={() => handleDownload(post)}
                disabled={generating !== null}
                className="group relative aspect-square rounded-sm overflow-hidden border border-border hover:border-crimson/40 transition-all hover:shadow-lg text-left"
                style={{ backgroundColor: bgMap[post.bgStyle] }}
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <p className="font-sans text-[0.55rem] font-bold tracking-[0.2em] uppercase" style={{ color: textMap[post.bgStyle] + '40' }}>
                    Veritas Worldwide
                  </p>
                  <div>
                    <p className="font-display text-3xl font-bold mb-1" style={{ color: post.bgStyle === 'parchment' ? BRAND.crimson : BRAND.crimson }}>
                      {post.stat}
                    </p>
                    <p className="font-sans text-xs" style={{ color: textMap[post.bgStyle] + '60' }}>
                      {post.statLabel}
                    </p>
                    <p className="font-display text-lg font-bold mt-3 leading-snug" style={{ color: textMap[post.bgStyle] }}>
                      {post.title}
                    </p>
                    <p className="font-sans text-[0.6rem] mt-1 leading-relaxed" style={{ color: textMap[post.bgStyle] + '70' }}>
                      {post.subtitle}
                    </p>
                    <div className="mt-3 inline-block px-4 py-1.5 rounded-sm text-[0.55rem] font-bold tracking-wider uppercase"
                      style={{
                        backgroundColor: post.bgStyle === 'parchment' ? BRAND.ink : (post.bgStyle === 'full-crimson' ? BRAND.white : BRAND.crimson),
                        color: post.bgStyle === 'parchment' ? BRAND.parchment : (post.bgStyle === 'full-crimson' ? BRAND.crimson : BRAND.white),
                      }}
                    >
                      {post.cta}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 rounded-full p-3 shadow-lg">
                    <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
        <p className="font-sans text-[0.55rem] text-ink-faint mt-3 text-center">
          1080×1080px · Optimized for Instagram grid and Facebook pinned posts
        </p>
      </div>
    </div>
  )
}
