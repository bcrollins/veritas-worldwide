import { type ReactNode, useEffect, useMemo, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { chapterMeta, type ChapterMetadata } from '../data/chapterMeta'
import type { ContentBlock, Chapter, ImageData, LoadedChapter } from '../data/chapterTypes'
import { loadChapterContent, preloadChapters } from '../data/chapterLoaderHybrid'
import { useAuth } from '../lib/AuthContext'
import BookmarkButton from '../components/BookmarkButton'
import ReadingProgress from '../components/ReadingProgress'
import BackToTop from '../components/BackToTop'
import Breadcrumb from '../components/Breadcrumb'
import FontSizeToggle from '../components/FontSizeToggle'
import TimeRemaining from '../components/TimeRemaining'
import TextSelectionShare from '../components/TextSelectionShare'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, chapterJsonLd, SITE_URL } from '../lib/seo'
import { useScrollRestore } from '../hooks/useScrollRestore'
import { useReadingHistory } from '../hooks/useReadingHistory'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { estimateReadingTime } from '../lib/readingTime'
import { DONATE_URL } from '../lib/constants'
import { trackShare, trackDownload, trackReadingMilestone, trackChapterComplete } from '../lib/ga4'
import { scoreChapterViewed, scorePdfDownloaded } from '../lib/leadScoring'
import ChapterPDF from '../components/ChapterPDF'
import FloatingShareBar from '../components/engagement/FloatingShareBar'
import CitationGenerator from '../components/CitationGenerator'
import CommunityForum from '../components/CommunityForum'
import DisputeStory from '../components/DisputeStory'
import SharePanel from '../components/SharePanel'
import AdBanner from '../components/AdBanner'
import NewsletterSignup from '../components/NewsletterSignup'
import { getChapterImages } from '../data/chapterImages'
import { getTopicHrefForTerm } from '../data/topicHubs'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { MediaOwnershipDiagram, FederalReserveStructureDiagram, AssetManagerDiagram } from '../components/Diagrams'
import { scoreContentGateHit } from '../lib/leadScoring'

const diagramComponents: Record<string, React.ComponentType> = {
  'media-ownership': MediaOwnershipDiagram,
  'federal-reserve-structure': FederalReserveStructureDiagram,
  'asset-manager-cross-sector': AssetManagerDiagram,
}

const PREVIEW_BLOCK_LIMIT = 3

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ── Image Components ──────────────────────────────────── */

function FigureBlock({ image }: { image: ImageData }) {
  const widthClass = image.width === 'full'
    ? 'max-w-none -mx-6 md:-mx-12'
    : image.width === 'narrow'
    ? 'max-w-md mx-auto'
    : 'max-w-2xl mx-auto'

  return (
    <figure className={`my-10 ${widthClass}`}>
      <div className="overflow-hidden rounded-sm border border-border bg-parchment-dark">
        <ImageWithFallback
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="w-full h-auto object-cover"
          retryCount={3}
        />
      </div>
      {(image.caption || image.credit) && (
        <figcaption className="mt-3 px-1">
          {image.caption && (
            <p className="font-sans text-sm text-ink-muted leading-relaxed">{image.caption}</p>
          )}
          {image.credit && (
            <p className="font-sans text-xs text-ink-faint mt-1">
              {image.creditUrl ? (
                <a href={image.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
                  {image.credit}
                </a>
              ) : (
                image.credit
              )}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

function HeroImage({ image }: { image: ImageData }) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          img.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <figure className="mb-10 -mx-4 sm:-mx-6 lg:mx-0 hero-image">
      <div className="overflow-hidden">
        <ImageWithFallback
          src={image.src}
          alt={image.alt}
          loading="eager"
          className="w-full h-64 md:h-80 lg:h-[420px] object-cover will-change-transform"
          style={{ transform: 'translateY(0) scale(1.1)' }}
          retryCount={3}
        />
      </div>
      {(image.caption || image.credit) && (
        <figcaption className="mt-2 px-4 sm:px-6 lg:px-0">
          {image.caption && (
            <p className="font-sans text-xs text-ink-muted">{image.caption}</p>
          )}
          {image.credit && (
            <p className="font-sans text-[0.65rem] text-ink-faint mt-0.5">
              {image.creditUrl ? (
                <a href={image.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">
                  {image.credit}
                </a>
              ) : (
                image.credit
              )}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Content Block Renderer ────────────────────────────── */

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'dropcap':
      return (
        <p className="article-body drop-cap mb-6">
          {block.text}
        </p>
      )

    case 'text':
      return (
        <p className="article-body mb-6">
          {block.text}
        </p>
      )

    case 'heading':
      return (
        <>
          <div className="section-divider mt-12 mb-8" aria-hidden="true">
            <div className="section-divider-diamond" />
          </div>
          <h2 id={slugify(block.text || '')} className="font-display text-2xl md:text-3xl font-bold text-ink mb-4 scroll-mt-24">
            {block.text}
          </h2>
        </>
      )

    case 'subheading':
      return (
        <h3 id={slugify(block.text || '')} className="font-display text-xl md:text-2xl font-bold text-ink mt-8 mb-3 scroll-mt-24">
          {block.text}
        </h3>
      )

    case 'quote':
      if (!block.quote) return null
      return (
        <blockquote className="pullquote">
          &ldquo;{block.quote.text}&rdquo;
          <div className="pullquote-attribution">
            &mdash; {block.quote.attribution}
            {block.quote.note && (
              <span className="block font-normal text-ink-faint mt-1">{block.quote.note}</span>
            )}
          </div>
        </blockquote>
      )

    case 'evidence':
      if (!block.evidence) return null
      const tierClass = `evidence-${block.evidence.tier}`
      const tierColors: Record<string, string> = {
        verified: 'text-verified',
        circumstantial: 'text-circumstantial',
        disputed: 'text-disputed',
      }
      const tierIcons: Record<string, string> = {
        verified: '✓',
        circumstantial: '◐',
        disputed: '⚠',
      }
      const tierAriaLabels: Record<string, string> = {
        verified: 'Verified — Primary Source Documentation',
        circumstantial: 'Circumstantial — Documented Facts, Interpretive Conclusion',
        disputed: 'Disputed — Reported But Not Independently Confirmed',
      }
      return (
        <div className={tierClass} role="note" aria-label={tierAriaLabels[block.evidence.tier]}>
          <p className={`evidence-label ${tierColors[block.evidence.tier] || ''}`}>
            <span aria-hidden="true" className="mr-1.5">{tierIcons[block.evidence.tier]}</span>
            {block.evidence.label}
          </p>
          <p className="font-body text-sm leading-relaxed text-ink-light">
            {block.evidence.text}
          </p>
        </div>
      )

    case 'stats':
      if (!block.stats) return null
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
          {block.stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      )

    case 'table':
      if (!block.table) return null
      return (
        <div className="overflow-x-auto my-8 table-scroll-wrapper" onScroll={(e) => {
          const el = e.currentTarget
          el.classList.toggle('has-overflow', el.scrollWidth > el.clientWidth && el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
        }} ref={(el) => {
          if (el) el.classList.toggle('has-overflow', el.scrollWidth > el.clientWidth)
        }}>
          <table className="data-table">
            {block.table.caption && (
              <caption className="font-sans text-xs font-bold tracking-[0.08em] uppercase text-ink-muted mb-3 text-left">
                {block.table.caption}
              </caption>
            )}
            <thead>
              <tr>
                {block.table.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'timeline':
      if (!block.timeline) return null
      return (
        <div className="my-8">
          {block.timeline.map((event, i) => (
            <div key={i} className="timeline-item">
              <span className="timeline-year">{event.year}</span>
              <p className="font-body text-sm text-ink-light leading-relaxed">{event.text}</p>
            </div>
          ))}
        </div>
      )

    case 'image':
      if (!block.image) return null
      return <FigureBlock image={block.image} />

    case 'video':
      if (!block.video) return null
      return (
        <figure className="my-10 max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-sm border border-border bg-parchment-dark">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${block.video.youtubeId}`}
                title={block.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
          {(block.video.title || block.video.caption) && (
            <figcaption className="mt-3 px-1">
              {block.video.title && (
                <p className="font-sans text-sm font-semibold text-ink leading-relaxed">{block.video.title}</p>
              )}
              {block.video.caption && (
                <p className="font-sans text-xs text-ink-muted mt-1">{block.video.caption}</p>
              )}
            </figcaption>
          )}
        </figure>
      )

    case 'diagram': {
      if (!block.diagramId) return null
      const DiagramComponent = diagramComponents[block.diagramId]
      if (!DiagramComponent) return null
      return <DiagramComponent />
    }

    default:
      return null
  }
}

/* ── Helper Functions ──────────────────────────────────── */

function getRelatedByKeywords(current: Chapter, maxResults = 4): ChapterMetadata[] {
  const scored = chapterMeta
    .filter(c => c.id !== current.id)
    .map(c => {
      const shared = current.keywords.filter((kw: string) => c.keywords.includes(kw)).length
      return { chapter: c, score: shared }
    })
    .filter((s: any) => s.score > 0)
    .sort((a: any, b: any) => b.score - a.score)
  return scored.slice(0, maxResults).map((s: any) => s.chapter)
}

function getEvidenceCounts(chapter: Chapter) {
  const counts = { verified: 0, circumstantial: 0, disputed: 0 }
  for (const block of chapter.content) {
    if (block.type === 'evidence' && block.evidence) {
      counts[block.evidence.tier]++
    }
  }
  return counts
}

/* ── Sidebar: Table of Contents ────────────────────────── */

function SidebarTOC({ chapter }: { chapter: Chapter }) {
  const headings = chapter.content.filter(b => b.type === 'heading' || b.type === 'subheading')
  if (headings.length < 3) return null

  return (
    <nav aria-label="Table of contents">
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">
        In This Chapter
      </p>
      <ol className="space-y-2 border-l border-border pl-4">
        {headings.map((block, i) => (
          <li key={i}>
            <a
              href={`#${slugify(block.text || '')}`}
              className={`block font-sans text-[0.75rem] leading-snug hover:text-crimson transition-colors ${
                block.type === 'subheading'
                  ? 'pl-3 text-ink-faint'
                  : 'text-ink-muted font-medium'
              }`}
            >
              {block.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ── Sidebar: Evidence Summary ─────────────────────────── */

function SidebarEvidence({ counts, sourceCount }: { counts: { verified: number; circumstantial: number; disputed: number }; sourceCount: number }) {
  const total = counts.verified + counts.circumstantial + counts.disputed
  if (total === 0) return null

  return (
    <div>
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">
        Evidence Classification
      </p>
      <div className="space-y-3">
        {counts.verified > 0 && (
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-verified">
              <span aria-hidden="true">✓</span> Verified
            </span>
            <span className="font-sans text-xs font-bold text-verified">{counts.verified}</span>
          </div>
        )}
        {counts.circumstantial > 0 && (
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-circumstantial">
              <span aria-hidden="true">◐</span> Circumstantial
            </span>
            <span className="font-sans text-xs font-bold text-circumstantial">{counts.circumstantial}</span>
          </div>
        )}
        {counts.disputed > 0 && (
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-disputed">
              <span aria-hidden="true">⚠</span> Disputed
            </span>
            <span className="font-sans text-xs font-bold text-disputed">{counts.disputed}</span>
          </div>
        )}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs text-ink-faint">Total Sources</span>
            <span className="font-sans text-xs font-bold text-ink-muted">{sourceCount}</span>
          </div>
        </div>
        {/* Visual bar */}
        <div className="h-1.5 rounded-full bg-border overflow-hidden flex" aria-hidden="true">
          {counts.verified > 0 && (
            <div className="bg-verified h-full" style={{ width: `${(counts.verified / total) * 100}%` }} />
          )}
          {counts.circumstantial > 0 && (
            <div className="bg-circumstantial h-full" style={{ width: `${(counts.circumstantial / total) * 100}%` }} />
          )}
          {counts.disputed > 0 && (
            <div className="bg-disputed h-full" style={{ width: `${(counts.disputed / total) * 100}%` }} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Chapter Navigation Bar ────────────────────────────── */

function ChapterPositionBar({ current }: { current: Chapter }) {
  const idx = chapterMeta.findIndex(c => c.id === current.id)
  const prev = idx > 0 ? chapterMeta[idx - 1] : null
  const next = idx < chapterMeta.length - 1 ? chapterMeta[idx + 1] : null

  return (
    <div className="border-b border-border no-print">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {prev ? (
            <Link to={`/chapter/${prev.id}`} className="flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.08em] uppercase text-ink-muted hover:text-crimson transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              <span className="hidden sm:inline">{prev.number}</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : <span />}
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink">
              {current.number}
            </span>
            <span className="font-sans text-[0.55rem] text-ink-faint">
              {idx + 1} of {chapterMeta.length}
            </span>
          </div>
          {next ? (
            <Link to={`/chapter/${next.id}`} className="flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.08em] uppercase text-ink-muted hover:text-crimson transition-colors">
              <span className="hidden sm:inline">{next.number}</span>
              <span className="sm:hidden">Next</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}

/* ── Bottom Chapter Navigation ─────────────────────────── */

function ChapterNav({ current }: { current: Chapter }) {
  const idx = chapterMeta.findIndex(c => c.id === current.id)
  const prev = idx > 0 ? chapterMeta[idx - 1] : null
  const next = idx < chapterMeta.length - 1 ? chapterMeta[idx + 1] : null

  return (
    <div className="border-t border-border mt-16 pt-8">
      <div className="grid md:grid-cols-2 gap-6">
        {prev && (
          <Link to={`/chapter/${prev.id}`} className="group p-5 border border-border hover:border-crimson transition-colors">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-2">&larr; Previous</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{prev.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{prev.number}{prev.dateRange ? ` · ${prev.dateRange}` : ''}</p>
          </Link>
        )}
        {next && (
          <Link to={`/chapter/${next.id}`} className="group p-5 border border-border hover:border-crimson transition-colors md:text-right md:ml-auto">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-2">Next &rarr;</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{next.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{next.number}{next.dateRange ? ` · ${next.dateRange}` : ''}</p>
          </Link>
        )}
      </div>
    </div>
  )
}

/* ── Action Buttons ────────────────────────────────────── */

function PremiumAction({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors"
    >
      {icon}
      {label}
    </button>
  )
}

function ChapterAccessGate({
  chapter,
  remainingBlocks,
  onUnlock,
}: {
  chapter: Chapter
  remainingBlocks: number
  onUnlock: () => void
}) {
  const sourceCount = chapter.sourceCount ?? chapter.sources.length

  return (
    <section className="relative overflow-hidden border border-border bg-surface mb-12" aria-label="Create a free account to continue reading">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson/80 to-transparent" />
      <div className="p-6 sm:p-8">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-3">
          Reader Access
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight mb-4">
          Continue reading with a free account.
        </h2>
        <p className="font-body text-base text-ink-muted leading-relaxed max-w-2xl">
          Veritas keeps the documentary record free to the public. Create a free reader account to unlock the remaining {remainingBlocks} blocks of this chapter, keep your place, save bookmarks, and receive weekly source-first updates.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-6 mb-6">
          <div className="border border-border rounded-sm bg-parchment px-4 py-3">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-1">Preview</p>
            <p className="font-display text-2xl font-bold text-ink">{PREVIEW_BLOCK_LIMIT}</p>
            <p className="font-sans text-xs text-ink-muted">blocks unlocked</p>
          </div>
          <div className="border border-border rounded-sm bg-parchment px-4 py-3">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-1">Remaining</p>
            <p className="font-display text-2xl font-bold text-crimson">{remainingBlocks}</p>
            <p className="font-sans text-xs text-ink-muted">blocks in this chapter</p>
          </div>
          <div className="border border-border rounded-sm bg-parchment px-4 py-3">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-1">Sources</p>
            <p className="font-display text-2xl font-bold text-ink">{sourceCount}</p>
            <p className="font-sans text-xs text-ink-muted">references available after sign-in</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onUnlock}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-crimson text-white font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 4v16m8-8H4" />
            </svg>
            Create Free Account
          </button>
          <button
            onClick={onUnlock}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-ink font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:border-crimson hover:text-crimson transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 11V7a3 3 0 10-6 0v4m-1 0h8a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2z" />
            </svg>
            Log In To Continue
          </button>
          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-border text-ink-muted font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:border-ink hover:text-ink transition-colors"
          >
            Support The Archive
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <NewsletterSignup
            variant="minimal"
            source="content_gate"
            contentInterest={chapter.id}
            heading="Get free access + weekly updates."
            subtext="Create your free account above to unlock the rest of this chapter. If you just want source-first updates in your inbox, subscribe here."
          />
        </div>
      </div>
    </section>
  )
}

function ShareButton({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => {
      const firstItem = menuRef.current?.querySelector('[role="menuitem"]') as HTMLElement
      firstItem?.focus()
    })
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        const trigger = ref.current?.querySelector('button[aria-haspopup]') as HTMLElement
        trigger?.focus()
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const items = menuRef.current?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>
        if (!items?.length) return
        const current = document.activeElement as HTMLElement
        const idx = Array.from(items).indexOf(current)
        const next = e.key === 'ArrowDown'
          ? items[(idx + 1) % items.length]
          : items[(idx - 1 + items.length) % items.length]
        next?.focus()
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const url = `${window.location.origin}/chapter/${chapter.id}`
  const text = `${chapter.title} — The Record by Veritas Press`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setOpen(false)
    const toastEl = document.getElementById('share-toast')
    if (toastEl) {
      toastEl.textContent = 'Link copied to clipboard'
      toastEl.classList.remove('opacity-0', 'translate-y-2')
      toastEl.classList.add('opacity-100', 'translate-y-0')
      setTimeout(() => {
        toastEl.classList.remove('opacity-100', 'translate-y-0')
        toastEl.classList.add('opacity-0', 'translate-y-2')
      }, 2500)
    }
  }

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: text, url })
    } catch {}
    setOpen(false)
  }

  const shareLinks = [
    { label: 'Copy Link', onClick: () => { handleCopy(); trackShare('copy_link', chapter.id) }, icon: '🔗' },
    ...(typeof navigator.share === 'function' ? [{ label: 'Share…', onClick: () => { handleNativeShare(); trackShare('native', chapter.id) }, icon: '📤' }] : []),
    { label: 'X / Twitter', onClick: () => { window.open(`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank'); trackShare('twitter', chapter.id); setOpen(false) }, icon: '𝕏' },
    { label: 'LinkedIn', onClick: () => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank'); trackShare('linkedin', chapter.id); setOpen(false) }, icon: 'in' },
    { label: 'Email', onClick: () => { window.open(`mailto:?subject=${encodedText}&body=${encodedUrl}`, '_self'); trackShare('email', chapter.id); setOpen(false) }, icon: '✉' },
  ]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Share this chapter"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      {open && (
        <div ref={menuRef} role="menu" className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-sm shadow-lg z-50 py-1 animate-fade-in">
          {shareLinks.map(link => (
            <button
              key={link.label}
              role="menuitem"
              onClick={link.onClick}
              className="w-full text-left px-4 py-2.5 font-sans text-sm text-ink hover:bg-parchment-dark transition-colors flex items-center gap-3"
            >
              <span className="w-5 text-center text-xs" aria-hidden="true">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>
      )}
      <div
        id="share-toast"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-ink text-white font-sans text-sm rounded-sm shadow-lg opacity-0 translate-y-2 transition-all duration-200 pointer-events-none z-[100]"
        aria-live="polite"
      />
    </div>
  )
}

function DownloadButton({ chapter }: { chapter: Chapter }) {
  const handleDownload = () => {
    const lines: string[] = [
      chapter.title,
      chapter.subtitle,
      `By ${chapter.author} — ${chapter.publishDate}`,
      chapter.dateRange ? `Period: ${chapter.dateRange}` : '',
      '',
      '---',
      '',
    ]
    chapter.content.forEach(block => {
      if (block.type === 'dropcap' || block.type === 'text') lines.push(block.text || '', '')
      if (block.type === 'heading') lines.push(`## ${block.text}`, '')
      if (block.type === 'subheading') lines.push(`### ${block.text}`, '')
      if (block.type === 'quote' && block.quote) lines.push(`> "${block.quote.text}"`, `> — ${block.quote.attribution}`, '')
      if (block.type === 'evidence' && block.evidence) lines.push(`[${block.evidence.label}]`, block.evidence.text, '')
    })
    lines.push('---', '', 'Sources & References', '')
    chapter.sources.forEach(s => {
      lines.push(`[${s.id}] ${s.text}${s.url ? ` — ${s.url}` : ''}`)
    })
    lines.push('', '© 2026 Veritas Press — veritasworldwide.com — Free reader account access')

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `veritas-${chapter.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
    trackDownload(chapter.id)
    scorePdfDownloaded(chapter.id)
  }

  return (
    <PremiumAction
      onClick={handleDownload}
      label="Download"
      icon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      }
    />
  )
}

/* ── Social Share Bar ──────────────────────────────────── */

function SocialShareBar({ chapter }: { chapter: Chapter }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}/chapter/${chapter.id}`
  const text = `${chapter.title} — The Record by Veritas Press`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnClass = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold text-ink-muted border border-border rounded-sm hover:border-ink hover:text-ink transition-colors"

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-border my-8 no-print">
      <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mr-1">Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&via=VeritasWorldwide`} target="_blank" rel="noopener noreferrer" className={btnClass} aria-label="Share on X / Twitter">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={btnClass} aria-label="Share on Facebook">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>
      <a href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`} target="_blank" rel="noopener noreferrer" className={btnClass} aria-label="Share on Reddit">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
        Reddit
      </a>
      <button onClick={handleCopy} className={btnClass} aria-label="Copy link">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT — NYT-STYLE TWO-COLUMN LAYOUT
   ══════════════════════════════════════════════════════════ */

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>()
  const { isLoggedIn, setShowAuthModal } = useAuth()
  const staticMetadata = chapterMeta.find(ch => ch.id === id)
  const [chapter, setChapter] = useState<LoadedChapter | null>(null)
  const [isLoading, setIsLoading] = useState(!staticMetadata)
  
  const readingTime = useMemo(() => chapter ? estimateReadingTime(chapter) : 0, [chapter])
  const evidenceCounts = useMemo(() => chapter ? getEvidenceCounts(chapter) : { verified: 0, circumstantial: 0, disputed: 0 }, [chapter])
  const hasEvidence = evidenceCounts.verified + evidenceCounts.circumstantial + evidenceCounts.disputed > 0

  useScrollRestore(id)
  useReadingHistory(id)
  useKeyboardNav()

  useEffect(() => {
    if (!id || !staticMetadata) return
    
    setIsLoading(true)
    loadChapterContent(id).then(loadedChapter => {
      setChapter(loadedChapter)
      setIsLoading(false)
    }).catch(error => {
      console.error('Failed to load chapter content:', error)
      setIsLoading(false)
    })

    const currentIndex = chapterMeta.findIndex(ch => ch.id === id)
    if (currentIndex !== -1) {
      const nextChapterIds = []
      if (currentIndex < chapterMeta.length - 1) {
        nextChapterIds.push(chapterMeta[currentIndex + 1].id)
      }
      if (currentIndex < chapterMeta.length - 2) {
        nextChapterIds.push(chapterMeta[currentIndex + 2].id)
      }
      if (nextChapterIds.length > 0) {
        preloadChapters(nextChapterIds)
      }
    }
  }, [id, staticMetadata])

  useEffect(() => {
    if (chapter) {
      const chapterOgImage = `${SITE_URL}/og/${chapter.id}.png`
      setMetaTags({
        title: `${chapter.title} | The Record — Veritas Press`,
        description: chapter.subtitle,
        url: `${SITE_URL}/chapter/${chapter.id}`,
        type: 'article',
        image: chapterOgImage,
        publishedTime: chapter.publishDate,
        author: chapter.author,
        section: 'Documentary History',
        tags: chapter.keywords,
      })
      setJsonLd(chapterJsonLd({ ...chapter, image: chapterOgImage }))
      scoreChapterViewed(chapter.id, chapter.title)
    } else if (!isLoading) {
      document.title = 'Chapter Not Found | The Record — Veritas Press'
    }
    return () => { clearMetaTags(); removeJsonLd() }
  }, [chapter, isLoading])

  useEffect(() => {
    if (!chapter || chapter.accessLevel !== 'preview') return
    const gateKey = `veritas_gate_hit:${chapter.id}`
    if (sessionStorage.getItem(gateKey)) return
    scoreContentGateHit(chapter.id)
    sessionStorage.setItem(gateKey, '1')
  }, [chapter])

  /* ── Reading Milestone Tracking (GA4) ──────────────── */
  useEffect(() => {
    if (!chapter) return
    const milestonesFired = new Set<number>()
    const startTime = Date.now()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const m of [25, 50, 75, 100] as const) {
        if (pct >= m && !milestonesFired.has(m)) {
          milestonesFired.add(m)
          trackReadingMilestone(chapter.id, m)
          if (m === 100) {
            trackChapterComplete(chapter.id, Math.round((Date.now() - startTime) / 1000))
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapter])

  /* ── Loading State ─────────────────────────────────── */

  if (isLoading && !chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="inline-block w-8 h-8 border-2 border-crimson/20 border-t-crimson rounded-full animate-spin" />
        </div>
        <h2 className="font-display text-2xl font-bold text-ink mb-2">Loading chapter...</h2>
        <p className="font-body text-ink-muted">Please wait while we fetch the content.</p>
      </div>
    )
  }

  /* ── Not Found State ───────────────────────────────── */

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-ink mb-4">Chapter Not Found</h1>
        <p className="font-body text-lg text-ink-muted mb-8">The chapter you're looking for doesn't exist.</p>
        <Link to="/" className="font-sans text-sm font-semibold text-crimson hover:text-crimson-dark">
          &larr; Return to The Record
        </Link>
      </div>
    )
  }

  const images = getChapterImages(chapter.id)
  const relatedChapters = getRelatedByKeywords(chapter)
  const hasLockedContent = chapter.accessLevel === 'preview'
  const visibleBlocks = chapter.content
  const remainingBlocks = Math.max(chapter.totalBlocks - chapter.content.length, 0)
  const sourceCount = chapter.sourceCount ?? chapter.sources.length
  const sidebarChapter = hasLockedContent ? { ...chapter, content: visibleBlocks } : chapter

  /* ── Main Render ───────────────────────────────────── */

  return (
    <>
      <ReadingProgress />
      <FloatingShareBar title={chapter.title} description={chapter.subtitle} contentId={chapter.id} />
      <BackToTop />
      <TimeRemaining totalMinutes={readingTime} />
      <TextSelectionShare />

      {/* ── Chapter Position Navigation Bar ─────────── */}
      <ChapterPositionBar current={chapter} />

      {/* ── Full-Width Article Container ────────────── */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Article Header — Full Width ──────────── */}
        <header className="max-w-4xl mx-auto pt-8 pb-8 border-b border-border">
          {/* Breadcrumb */}
          <Breadcrumb chapter={chapter} />

          {/* Category/Section label */}
          <div className="mt-6 mb-4">
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson">
              {chapter.number}
              {chapter.dateRange && <span className="text-ink-faint ml-3">{chapter.dateRange}</span>}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-[1.05] mb-5">
            {chapter.title}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-xl md:text-2xl text-ink-muted italic leading-relaxed mb-6 max-w-3xl">
            {chapter.subtitle}
          </p>

          {/* Byline + Meta */}
          <div className="flex flex-wrap items-center gap-3 font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-faint">
            <span className="font-semibold text-ink-muted">By {chapter.author}</span>
            <span className="text-border">|</span>
            <span>{chapter.publishDate}</span>
            <span className="text-border">|</span>
            <span>{readingTime} min read</span>
            <span className="text-border">|</span>
            <span>{sourceCount} sources</span>
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-3 sm:gap-4 mt-5 pt-5 border-t border-border flex-wrap">
            <FontSizeToggle />
            <ShareButton chapter={chapter} />
            {chapter.accessLevel === 'full' ? (
              <>
                <DownloadButton chapter={chapter} />
                <ChapterPDF chapter={chapter} />
                <CitationGenerator chapter={chapter} />
                <PremiumAction
                  onClick={() => window.print()}
                  label="Print"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  }
                />
              </>
            ) : (
              <>
                <PremiumAction
                  onClick={() => setShowAuthModal(true)}
                  label="Download"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 10-8 0v4m-1 0h10a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2zm5 4l-3 3-3-3m3 3V9" />
                    </svg>
                  }
                />
                <PremiumAction
                  onClick={() => setShowAuthModal(true)}
                  label="PDF"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm8 1v4h4" />
                    </svg>
                  }
                />
                <PremiumAction
                  onClick={() => setShowAuthModal(true)}
                  label="Print"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 10-8 0v4m-1 0h10a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2z" />
                    </svg>
                  }
                />
              </>
            )}
            <BookmarkButton chapterId={chapter.id} />
          </div>

          {/* Evidence Tier Summary — compact inline badges */}
          {hasEvidence && (
            <div className="flex flex-wrap items-center gap-3 mt-5" aria-label="Evidence classification summary">
              <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Evidence:</span>
              {evidenceCounts.verified > 0 && (
                <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-verified bg-verified-bg border border-verified-border px-2.5 py-1 rounded-sm relative group cursor-help">
                  <span aria-hidden="true">✓</span> {evidenceCounts.verified} Verified
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-ink text-white text-[11px] font-normal leading-relaxed rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 normal-case tracking-normal">
                    Supported by primary source documents — court filings, congressional records, executive orders, peer-reviewed studies.
                  </span>
                </span>
              )}
              {evidenceCounts.circumstantial > 0 && (
                <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-circumstantial bg-circumstantial-bg border border-circumstantial-border px-2.5 py-1 rounded-sm relative group cursor-help">
                  <span aria-hidden="true">◐</span> {evidenceCounts.circumstantial} Circumstantial
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-ink text-white text-[11px] font-normal leading-relaxed rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 normal-case tracking-normal">
                    Individual facts are documented. The connection drawn between them is an interpretation. Alternative explanations noted.
                  </span>
                </span>
              )}
              {evidenceCounts.disputed > 0 && (
                <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-disputed bg-disputed-bg border border-disputed-border px-2.5 py-1 rounded-sm relative group cursor-help">
                  <span aria-hidden="true">⚠</span> {evidenceCounts.disputed} Disputed
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-ink text-white text-[11px] font-normal leading-relaxed rounded-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 normal-case tracking-normal">
                    Claimed by a named source or in sworn testimony but not independently confirmed. Clearly labeled.
                  </span>
                </span>
              )}
            </div>
          )}
        </header>

        {/* ── Hero Image — Full Width ─────────────── */}
        {chapter.heroImage && (
          <div className="max-w-5xl mx-auto mt-8">
            <HeroImage image={chapter.heroImage} />
          </div>
        )}

        {/* ══════════════════════════════════════════════
            TWO-COLUMN LAYOUT: Article + Sidebar
           ══════════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-[1200px] mx-auto">

          {/* ── LEFT: Article Body ──────────────────── */}
          <article className="min-w-0 py-10">
            {/* Chapter Images — Historical Photographs */}
            {!hasLockedContent && images.length > 0 && (
              <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <figure key={i} className="border border-border rounded-sm overflow-hidden bg-surface">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-48 sm:h-56 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <figcaption className="px-4 py-3">
                      <p className="font-body text-xs text-ink-muted leading-relaxed">{img.caption}</p>
                      <p className="font-sans text-[9px] text-ink-faint mt-1">{img.credit}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className={`mb-12 ${hasLockedContent ? 'relative' : ''}`}>
              {visibleBlocks.map((block, idx) => (
                <ContentBlockRenderer key={idx} block={block} />
              ))}
              {hasLockedContent && (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-parchment/92 to-parchment"
                  aria-hidden="true"
                />
              )}
            </div>

            {hasLockedContent && (
              <ChapterAccessGate
                chapter={chapter}
                remainingBlocks={remainingBlocks}
                onUnlock={() => setShowAuthModal(true)}
              />
            )}

            {/* Social Share Bar */}
            {!hasLockedContent && <SocialShareBar chapter={chapter} />}

            {/* Sources */}
            {!hasLockedContent && sourceCount > 0 && (
              <section id="sources--references" className="border-t border-border pt-8 mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                    Sources &amp; References
                  </h3>
                  <div className="flex-1 h-[1px] bg-border" />
                  <span className="font-sans text-xs text-ink-faint">{sourceCount}</span>
                </div>
                <ol className="space-y-3">
                  {chapter.sources.map(source => (
                    <li key={source.id} className="font-sans text-sm text-ink-muted leading-relaxed flex gap-3">
                      <span className="font-bold text-crimson shrink-0">[{source.id}]</span>
                      <span>
                        {source.text}
                        {source.url && (
                          <>
                            {' '}
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-crimson hover:text-crimson-dark underline underline-offset-2"
                            >
                              View Source &rarr;
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Keywords */}
            {!hasLockedContent && chapter.keywords.length > 0 && (
              <section className="border-t border-border pt-8 mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                    Topics &amp; Keywords
                  </h3>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {chapter.keywords.map(kw => (
                    <Link
                      key={kw}
                      to={getTopicHrefForTerm(kw)}
                      className="font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm hover:text-crimson hover:bg-crimson/5 transition-colors"
                    >
                      {kw}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Chapters */}
            {(chapter.crossLinks.length > 0 || relatedChapters.length > 0) && (
              <section className="border-t border-border pt-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
                    Related Chapters
                  </h3>
                  <div className="flex-1 h-[1px] bg-border" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {chapter.crossLinks.map(link => (
                    <Link
                      key={link.chapterId}
                      to={`/chapter/${link.chapterId}`}
                      className="group flex items-start gap-3 p-4 border border-border hover:border-crimson transition-colors"
                    >
                      <span className="font-sans text-crimson font-bold text-sm shrink-0">&rarr;</span>
                      <span className="font-sans text-sm text-ink group-hover:text-crimson transition-colors">{link.label}</span>
                    </Link>
                  ))}
                  {relatedChapters.map(related => (
                    <Link
                      key={related.id}
                      to={`/chapter/${related.id}`}
                      className="group flex items-start gap-3 p-4 border border-border hover:border-crimson transition-colors"
                    >
                      <span className="font-sans text-ink-faint font-bold text-sm shrink-0">&rarr;</span>
                      <div>
                        <span className="font-sans text-sm text-ink group-hover:text-crimson transition-colors">{related.title}</span>
                        <span className="block font-sans text-[0.65rem] text-ink-faint mt-0.5">{related.number}{related.dateRange ? ` · ${related.dateRange}` : ''}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Support CTA */}
            {!hasLockedContent && (
              <section className="border-t border-border pt-10 mb-8 text-center">
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-3">
                Free &amp; Open Access
              </p>
              <p className="font-body text-sm text-ink-muted leading-relaxed max-w-md mx-auto mb-5">
                This chapter — and every chapter of The Record — is free because we believe the public record belongs to everyone. If this research has been useful to you, a small contribution helps us continue.
              </p>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Support This Work
              </a>
              <p className="font-sans text-[0.6rem] text-ink-faint mt-3">
                Processed securely via Stripe &middot; No account required
              </p>
              </section>
            )}

            {!hasLockedContent && <AdBanner slot="chapter-bottom" format="horizontal" />}

            {!hasLockedContent && (
              <SharePanel
                title={chapter.title}
                description={`${chapter.title} — from The Record by Veritas Press. Primary sources. Public record.`}
                contentId={chapter.id}
              />
            )}

            {!hasLockedContent && <DisputeStory pageId={`chapter-${chapter.id}`} pageTitle={chapter.title} />}

            {!hasLockedContent && <CommunityForum pageId={`chapter-${chapter.id}`} pageTitle={chapter.title} />}

            {/* ── Contextual Donation CTA ──────────────── */}
            {!hasLockedContent && (
              <div className="border-t border-b border-border mt-12 py-8 text-center">
                <p className="font-serif text-base text-ink-muted leading-relaxed max-w-lg mx-auto mb-4">
                  This research is free because the documentary record belongs to everyone.
                  If you value independent, source-verified journalism, any contribution helps us continue.
                </p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase hover:bg-crimson-dark transition-colors"
                  data-testid="chapter-donate-cta"
                >
                  Support This Research
                </a>
                <p className="font-sans text-xs text-ink-faint mt-3">
                  $5 keeps the archive online for a month. $25 funds document acquisition.
                </p>
              </div>
            )}

            <ChapterNav current={chapter} />
          </article>

          {/* ── RIGHT: Sticky Sidebar ───────────────── */}
          <aside className="hidden lg:block py-10">
            <div className="sticky top-16 space-y-10">
              {/* Evidence Summary */}
              <SidebarEvidence counts={evidenceCounts} sourceCount={sourceCount} />

              {/* Reading Stats */}
              <div>
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Reading Stats</p>
                <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-display font-bold text-crimson">{readingTime}</span>
                    <span className="text-xs text-ink-muted leading-tight">min<br />read</span>
                  </div>
                  <div className="border-t border-border pt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-ink-faint uppercase tracking-wider text-[0.55rem] mb-0.5">Sources</p>
                      <p className="font-bold text-ink">{sourceCount}</p>
                    </div>
                    <div>
                      <p className="text-ink-faint uppercase tracking-wider text-[0.55rem] mb-0.5">Evidence</p>
                      <p className="font-bold text-ink">{evidenceCounts.verified + evidenceCounts.circumstantial + evidenceCounts.disputed}</p>
                    </div>
                    <div>
                      <p className="text-ink-faint uppercase tracking-wider text-[0.55rem] mb-0.5">Published</p>
                      <p className="font-bold text-ink text-[0.7rem]">{chapter.publishDate}</p>
                    </div>
                    <div>
                      <p className="text-ink-faint uppercase tracking-wider text-[0.55rem] mb-0.5">Period</p>
                      <p className="font-bold text-ink text-[0.7rem]">{chapter.dateRange || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <SidebarTOC chapter={sidebarChapter} />

              {/* Quick Jump to Sources */}
              <div>
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Quick Links</p>
                <div className="flex flex-col gap-2">
                  {!hasLockedContent && (
                    <a href="#sources--references" className="font-sans text-xs text-ink-muted hover:text-crimson transition-colors">→ Sources &amp; References</a>
                  )}
                  <Link to="/methodology" className="font-sans text-xs text-ink-muted hover:text-crimson transition-colors">→ Methodology</Link>
                  <Link to="/sources" className="font-sans text-xs text-ink-muted hover:text-crimson transition-colors">→ Full Bibliography</Link>
                </div>
              </div>

              {/* Related — compact */}
              {relatedChapters.length > 0 && (
                <div className="border-t border-border pt-8">
                  <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Also Read</p>
                  <div className="space-y-3">
                    {relatedChapters.slice(0, 3).map((related, idx) => (
                      <Link key={related.id} to={`/chapter/${related.id}`} className="group block">
                        <p className="font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-ink-faint mb-0.5">{idx + 1}.</p>
                        <p className="font-display text-sm font-bold text-ink leading-snug group-hover:text-crimson transition-colors">
                          {related.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Support — sidebar */}
              <div className="border-t border-border pt-8">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">Support</p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  Independent, source-verified research. Free forever.
                </p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 bg-crimson text-white font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase hover:bg-crimson-dark transition-colors"
                >
                  Support This Work
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
