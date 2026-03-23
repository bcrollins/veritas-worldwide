import { type ReactNode, useEffect, useMemo, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { chapters } from '../data/chapters'
import type { ContentBlock, Chapter } from '../data/chapters'
import BookmarkButton from '../components/BookmarkButton'
import ReadingProgress from '../components/ReadingProgress'
import BackToTop from '../components/BackToTop'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, chapterJsonLd, SITE_URL } from '../lib/seo'
import { useScrollRestore } from '../hooks/useScrollRestore'
import { estimateReadingTime } from '../lib/readingTime'

const DONATE_URL = 'https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

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
        <h2 id={slugify(block.text || '')} className="font-display text-2xl md:text-3xl font-bold text-ink mt-12 mb-4 scroll-mt-20">
          {block.text}
        </h2>
      )

    case 'subheading':
      return (
        <h3 id={slugify(block.text || '')} className="font-display text-xl md:text-2xl font-bold text-ink mt-8 mb-3 scroll-mt-20">
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
        <div className="overflow-x-auto my-8">
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

    default:
      return null
  }
}

function getRelatedByKeywords(current: Chapter, maxResults = 4): Chapter[] {
  const crossLinkIds = new Set(current.crossLinks.map(cl => cl.chapterId))
  const scored = chapters
    .filter(c => c.id !== current.id && !crossLinkIds.has(c.id))
    .map(c => {
      const shared = current.keywords.filter(kw => c.keywords.includes(kw)).length
      return { chapter: c, score: shared }
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, maxResults).map(s => s.chapter)
}

function ChapterTOC({ chapter }: { chapter: Chapter }) {
  const headings = chapter.content.filter(b => b.type === 'heading' || b.type === 'subheading')
  if (headings.length < 3) return null // Only show TOC for chapters with 3+ headings

  return (
    <nav className="mb-10 p-5 bg-surface border border-border rounded-sm no-print" aria-label="Table of contents">
      <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">
        In This Chapter
      </p>
      <ol className="space-y-1.5">
        {headings.map((block, i) => (
          <li key={i}>
            <a
              href={`#${slugify(block.text || '')}`}
              className={`font-sans text-sm hover:text-crimson transition-colors ${
                block.type === 'subheading'
                  ? 'pl-4 text-ink-faint text-xs'
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

function ChapterNav({ current }: { current: Chapter }) {
  const idx = chapters.findIndex(c => c.id === current.id)
  const prev = idx > 0 ? chapters[idx - 1] : null
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null

  return (
    <div className="border-t border-border mt-16 pt-8">
      <div className="grid md:grid-cols-2 gap-6">
        {prev && (
          <Link to={`/chapter/${prev.id}`} className="group p-4 border border-border rounded-sm hover:border-crimson transition-colors">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">&larr; Previous</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{prev.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{prev.number}</p>
          </Link>
        )}
        {next && (
          <Link to={`/chapter/${next.id}`} className="group p-4 border border-border rounded-sm hover:border-crimson transition-colors md:text-right md:ml-auto">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1">Next &rarr;</p>
            <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors">{next.title}</p>
            <p className="font-sans text-xs text-ink-muted mt-1">{next.number}</p>
          </Link>
        )}
      </div>
    </div>
  )
}

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

function ShareButton({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click or Escape key
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const url = `${window.location.origin}/chapter/${chapter.id}`
  const text = `${chapter.title} — The Record by Veritas Worldwide Press`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setOpen(false)
    // Toast is managed by AuthContext — trigger via a small workaround
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
    { label: 'Copy Link', onClick: handleCopy, icon: '🔗' },
    ...(typeof navigator.share === 'function' ? [{ label: 'Share…', onClick: handleNativeShare, icon: '📤' }] : []),
    { label: 'X / Twitter', onClick: () => { window.open(`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank'); setOpen(false) }, icon: '𝕏' },
    { label: 'LinkedIn', onClick: () => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank'); setOpen(false) }, icon: 'in' },
    { label: 'Email', onClick: () => { window.open(`mailto:?subject=${encodedText}&body=${encodedUrl}`, '_self'); setOpen(false) }, icon: '✉' },
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
        <div role="menu" className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-sm shadow-lg z-50 py-1 animate-fade-in">
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
      {/* Lightweight share toast — independent of auth toast */}
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
    // Generate a text version of the chapter for download
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
    lines.push('', '© 2026 Veritas Worldwide Press — veritasworldwide.com — Free & Open Access')

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `veritas-${chapter.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
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

function SocialShareBar({ chapter }: { chapter: Chapter }) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}/chapter/${chapter.id}`
  const text = `${chapter.title} — The Record by Veritas Worldwide Press`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-border my-8 no-print">
      <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mr-1">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&via=VeritasWorldwide`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold text-ink-muted border border-border rounded-sm hover:border-ink hover:text-ink transition-colors"
        aria-label="Share on X / Twitter"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold text-ink-muted border border-border rounded-sm hover:border-ink hover:text-ink transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>
      <a
        href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold text-ink-muted border border-border rounded-sm hover:border-ink hover:text-ink transition-colors"
        aria-label="Share on Reddit"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
        Reddit
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold text-ink-muted border border-border rounded-sm hover:border-ink hover:text-ink transition-colors"
        aria-label="Copy link"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

// estimateReadingTime imported from ../lib/readingTime

function getEvidenceCounts(chapter: Chapter) {
  const counts = { verified: 0, circumstantial: 0, disputed: 0 }
  for (const block of chapter.content) {
    if (block.type === 'evidence' && block.evidence) {
      counts[block.evidence.tier]++
    }
  }
  return counts
}

export default function ChapterPage() {
  const { id } = useParams<{ id: string }>()
  const chapter = chapters.find(ch => ch.id === id)
  const readingTime = useMemo(() => chapter ? estimateReadingTime(chapter) : 0, [chapter])
  const evidenceCounts = useMemo(() => chapter ? getEvidenceCounts(chapter) : { verified: 0, circumstantial: 0, disputed: 0 }, [chapter])
  const hasEvidence = evidenceCounts.verified + evidenceCounts.circumstantial + evidenceCounts.disputed > 0

  useScrollRestore(id)

  useEffect(() => {
    if (chapter) {
      setMetaTags({
        title: `${chapter.title} | The Record — Veritas Worldwide Press`,
        description: chapter.subtitle,
        url: `${SITE_URL}/chapter/${chapter.id}`,
        type: 'article',
        publishedTime: '2026-03-01',
        author: chapter.author,
        section: 'Documentary History',
        tags: chapter.keywords,
      })
      setJsonLd(chapterJsonLd(chapter))
    } else {
      document.title = 'Chapter Not Found | The Record — Veritas Worldwide Press'
    }
    return () => { clearMetaTags(); removeJsonLd() }
  }, [chapter])

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

  return (
    <>
    <ReadingProgress />
    <BackToTop />
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Chapter Header */}
      <header className="mb-12 border-b border-border pb-10">
        <div className="flex items-start justify-between gap-4">
          <p className="chapter-label mb-4">{chapter.number}</p>
          <div className="flex items-center gap-4">
            <ShareButton chapter={chapter} />
            <DownloadButton chapter={chapter} />
            <BookmarkButton chapterId={chapter.id} />
          </div>
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4">
          {chapter.title}
        </h1>
        <p className="font-body text-lg italic text-ink-muted leading-relaxed mb-6">
          {chapter.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-sans text-xs text-ink-faint">By {chapter.author}</span>
          <span className="font-sans text-xs text-ink-faint">{chapter.publishDate}</span>
          <span className="font-sans text-xs text-ink-faint">{readingTime} min read</span>
          {chapter.dateRange && (
            <span className="font-sans text-xs font-semibold text-crimson px-2 py-1 bg-crimson/5 rounded-sm">
              {chapter.dateRange}
            </span>
          )}
        </div>
        {/* Evidence Tier Summary */}
        {hasEvidence && (
          <div className="flex flex-wrap items-center gap-3 mt-5" aria-label="Evidence classification summary">
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint">Evidence:</span>
            {evidenceCounts.verified > 0 && (
              <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-verified bg-verified-bg border border-verified-border px-2.5 py-1 rounded-sm">
                <span aria-hidden="true">✓</span> {evidenceCounts.verified} Verified
              </span>
            )}
            {evidenceCounts.circumstantial > 0 && (
              <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-circumstantial bg-circumstantial-bg border border-circumstantial-border px-2.5 py-1 rounded-sm">
                <span aria-hidden="true">◐</span> {evidenceCounts.circumstantial} Circumstantial
              </span>
            )}
            {evidenceCounts.disputed > 0 && (
              <span className="inline-flex items-center gap-1.5 font-sans text-[0.65rem] font-semibold text-disputed bg-disputed-bg border border-disputed-border px-2.5 py-1 rounded-sm">
                <span aria-hidden="true">⚠</span> {evidenceCounts.disputed} Disputed
              </span>
            )}
            <span className="font-sans text-[0.6rem] text-ink-faint">{chapter.sources.length} sources</span>
          </div>
        )}
      </header>

      {/* In-Chapter TOC */}
      <ChapterTOC chapter={chapter} />

      {/* Full Content — Free for all readers */}
      <div className="mb-12">
        {chapter.content.map((block, idx) => (
          <ContentBlockRenderer key={idx} block={block} />
        ))}
      </div>

      {/* Social Share Bar */}
      <SocialShareBar chapter={chapter} />

      {/* Sources */}
      {chapter.sources.length > 0 && (
        <section className="border-t border-border pt-8 mb-12">
          <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6">
            Sources &amp; References
          </h3>
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
      {chapter.keywords.length > 0 && (
        <section className="border-t border-border pt-8 mb-12">
          <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
            Topics &amp; Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {chapter.keywords.map(kw => (
              <Link
                key={kw}
                to={`/search?q=${encodeURIComponent(kw)}`}
                className="font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm hover:text-crimson hover:bg-crimson/5 transition-colors"
              >
                {kw}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Cross-Links + Keyword-Based Related Chapters */}
      {(chapter.crossLinks.length > 0 || chapter.keywords.length > 0) && (() => {
        const keywordRelated = getRelatedByKeywords(chapter)
        const hasCrossLinks = chapter.crossLinks.length > 0
        const hasKeywordRelated = keywordRelated.length > 0
        if (!hasCrossLinks && !hasKeywordRelated) return null
        return (
          <section className="border-t border-border pt-8 mb-8">
            <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4">
              Related Chapters
            </h3>
            <div className="grid gap-3">
              {chapter.crossLinks.map(link => (
                <Link
                  key={link.chapterId}
                  to={`/chapter/${link.chapterId}`}
                  className="group flex items-center gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors"
                >
                  <span className="font-sans text-crimson font-bold text-sm">&rarr;</span>
                  <span className="font-sans text-sm text-ink group-hover:text-crimson transition-colors">{link.label}</span>
                </Link>
              ))}
              {hasKeywordRelated && hasCrossLinks && (
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mt-2 mb-1">
                  Also Related by Topic
                </p>
              )}
              {keywordRelated.map(related => (
                <Link
                  key={related.id}
                  to={`/chapter/${related.id}`}
                  className="group flex items-start gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors"
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
        )
      })()}

      {/* Support CTA — post-chapter, high engagement point */}
      <section className="border-t border-border pt-8 mb-8 text-center">
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

      {/* Chapter Navigation */}
      <ChapterNav current={chapter} />
    </article>
    </>
  )
}
