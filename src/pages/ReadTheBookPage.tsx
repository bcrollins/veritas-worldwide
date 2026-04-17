import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { chapterMeta } from '../data/chapterMeta'
import type { LoadedChapter } from '../data/chapterTypes'
import { CATEGORY_META, type Article } from '../data/articles'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import DownloadModal from '../components/DownloadModal'
import { loadChapterContent, preloadChapters } from '../data/chapterLoaderHybrid'
import { useAuth } from '../lib/AuthContext'
import {
  getReaderOverviewStats,
  getReadingPaths,
  getRelatedArticlesForChapter,
  type ReadingPath,
} from '../lib/readerDiscovery'

const PDF_URL = '/api/downloads/the-record.pdf'
const BOOK_TITLE = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World'

// Simple text-to-speech wrapper
function useTextToSpeech() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window)

  const speak = useCallback((text: string) => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.95
    utt.pitch = 1
    utt.onend = () => setIsPlaying(false)
    utt.onerror = () => setIsPlaying(false)
    utteranceRef.current = utt
    window.speechSynthesis.speak(utt)
    setIsPlaying(true)
  }, [isSupported])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback((text: string) => {
    if (isPlaying) { stop() } else { speak(text) }
  }, [isPlaying, speak, stop])

  return { isPlaying, toggle, stop, isSupported }
}

function ReaderStatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{value}</p>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{note}</p>
    </div>
  )
}

function ReadingPathCard({
  path,
  onSelect,
}: {
  path: ReadingPath
  onSelect: (chapterId: string) => void
}) {
  const leadChapter = path.chapters[0]

  return (
    <button
      type="button"
      onClick={() => leadChapter && onSelect(leadChapter.id)}
      className="overflow-hidden rounded-[24px] border border-border bg-surface text-left transition-colors hover:border-crimson"
    >
      {leadChapter?.heroImage && (
        <img
          src={leadChapter.heroImage}
          alt={leadChapter.title}
          className="h-36 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5">
        <p className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-crimson">
          {path.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink">{path.title}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{path.description}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="font-sans text-[0.52rem] uppercase tracking-[0.14em] text-ink-faint">Chapters</p>
            <p className="mt-1 font-serif text-lg font-semibold text-ink">{path.chapters.length}</p>
          </div>
          <div>
            <p className="font-sans text-[0.52rem] uppercase tracking-[0.14em] text-ink-faint">News links</p>
            <p className="mt-1 font-serif text-lg font-semibold text-ink">{path.relatedArticleCount}</p>
          </div>
          <div>
            <p className="font-sans text-[0.52rem] uppercase tracking-[0.14em] text-ink-faint">Lead chapter</p>
            <p className="mt-1 font-serif text-lg font-semibold text-ink">{leadChapter?.number ?? '—'}</p>
          </div>
        </div>
        {path.keywordSpine.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {path.keywordSpine.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-border px-3 py-1 font-sans text-[0.56rem] uppercase tracking-[0.12em] text-ink-muted"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

function RelatedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/news/${article.slug}`}
      className="overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-crimson"
    >
      <img
        src={article.heroImage.src}
        alt={article.heroImage.alt}
        className="h-32 w-full object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <p className="font-sans text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-crimson">
          {CATEGORY_META[article.category].label}
        </p>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-ink">{article.title}</h3>
        <p className="mt-2 line-clamp-3 font-body text-sm leading-relaxed text-ink-muted">
          {article.subtitle}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 font-sans text-[0.55rem] uppercase tracking-[0.1em] text-ink-faint">
          <span>{article.publishDate}</span>
          <span className="text-border">|</span>
          <span>{article.readingTime} min</span>
        </div>
      </div>
    </Link>
  )
}

export default function ReadTheBookPage() {
  const { authMode, canAccessProtectedContent, isLoggedIn, openAuthModal } = useAuth()
  const [activeChapter, setActiveChapter] = useState(0)
  const [loadedChapters, setLoadedChapters] = useState<Map<number, LoadedChapter>>(new Map())
  const [loadingChapterIndex, setLoadingChapterIndex] = useState<number | null>(null)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showTOC, setShowTOC] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const contentRef = useRef<HTMLDivElement>(null)
  const tts = useTextToSpeech()
  const chapterScope = canAccessProtectedContent ? 'full' : 'public'
  const isDegradedProfile = isLoggedIn && !canAccessProtectedContent && authMode === 'degraded'
  const openReaderAccessModal = useCallback(() => {
    openAuthModal({ mode: isDegradedProfile ? 'login' : 'signup' })
  }, [isDegradedProfile, openAuthModal])

  useEffect(() => {
    setMetaTags({
      title: `Read The Record | ${SITE_NAME}`,
      description: 'Read The Record online with a free reader account. Public visitors can preview every chapter before unlocking the full documentary archive.',
      url: `${SITE_URL}/read`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Book',
      'name': 'The Record — Volume I',
      'author': { '@type': 'Organization', 'name': SITE_NAME },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
      'url': `${SITE_URL}/read`,
      'numberOfPages': 31,
      'bookFormat': 'https://schema.org/EBook',
      'isAccessibleForFree': true,
      'inLanguage': 'en',
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  // Stop TTS when changing chapters
  useEffect(() => { tts.stop() }, [activeChapter])

  useEffect(() => {
    setLoadedChapters(new Map())
  }, [chapterScope])

  // Load chapter content on demand and preload adjacent chapters
  useEffect(() => {
    const staticChapter = chapterMeta[activeChapter]
    if (!staticChapter) return

    // Load current chapter
    setLoadingChapterIndex(activeChapter)
    loadChapterContent(staticChapter.id, { scope: chapterScope }).then(loadedChapter => {
      if (loadedChapter) {
        setLoadedChapters(prev => new Map(prev).set(activeChapter, loadedChapter))
      }
      setLoadingChapterIndex(null)
    }).catch(error => {
      console.error(`Failed to load chapter ${activeChapter}:`, error)
      setLoadingChapterIndex(null)
      // Fallback: leave empty, show loading error state
    })

    // Preload next and previous chapters in background
    const nextChapterIds = []
    
    if (activeChapter < chapterMeta.length - 1) {
      nextChapterIds.push(chapterMeta[activeChapter + 1].id)
    }
    if (activeChapter < chapterMeta.length - 2) {
      nextChapterIds.push(chapterMeta[activeChapter + 2].id)
    }
    
    if (nextChapterIds.length > 0) {
      preloadChapters(nextChapterIds, { scope: chapterScope })
    }
  }, [activeChapter, chapterScope])

  // Get the current chapter metadata and loaded content
  const chapterMetadata = chapterMeta[activeChapter]
  const chapter = loadedChapters.get(activeChapter)
  const readerStats = getReaderOverviewStats()
  const readingPaths = getReadingPaths()
  const relatedArticles = chapterMetadata ? getRelatedArticlesForChapter(chapterMetadata.id, 3) : []
  const visibleBlocks = chapter?.content.length ?? 0
  const remainingBlocks = chapter ? Math.max(chapter.totalBlocks - visibleBlocks, 0) : 0
  const keywordSpine = chapterMetadata?.keywords.slice(0, 8) ?? []
  const chapterText = chapter?.content
    .filter((b: any) => b.type === 'text' || b.type === 'dropcap' || b.type === 'heading' || b.type === 'subheading')
    .map((b: any) => b.text || '')
    .join('\n\n') || ''

  const goTo = (idx: number) => {
    setActiveChapter(idx)
    setShowTOC(false)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToChapterId = (chapterId: string) => {
    const idx = chapterMeta.findIndex((chapterEntry) => chapterEntry.id === chapterId)
    if (idx >= 0) {
      goTo(idx)
    }
  }

  const shareUrl = `${SITE_URL}/read`

  return (
    <div className="min-h-screen flex flex-col">
      {/* Reader Toolbar */}
      <div className="sticky top-0 z-50 bg-parchment/95 dark:bg-ink/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
          {/* TOC Toggle */}
          <button onClick={() => setShowTOC(!showTOC)} className="p-2 rounded-sm hover:bg-parchment-dark dark:hover:bg-white/5 transition-colors" title="Table of Contents">
            <svg className="w-5 h-5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
          </button>

          {/* Chapter indicator */}
          <div className="flex-1 min-w-0">
            {chapter && (
              <>
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson truncate">{chapter.number}</p>
                <p className="font-sans text-xs text-ink truncate">{chapter.title}</p>
              </>
            )}
          </div>

          {/* Font size controls */}
          <button onClick={() => setFontSize(s => Math.max(12, s - 2))} className="p-1.5 rounded-sm hover:bg-parchment-dark dark:hover:bg-white/5 transition-colors font-sans text-xs text-ink-muted" title="Smaller text">A-</button>
          <button onClick={() => setFontSize(s => Math.min(24, s + 2))} className="p-1.5 rounded-sm hover:bg-parchment-dark dark:hover:bg-white/5 transition-colors font-sans text-sm font-bold text-ink-muted" title="Larger text">A+</button>

          {/* TTS */}
          {tts.isSupported && (
            <button onClick={() => tts.toggle(chapterText)} className={`p-2 rounded-sm transition-colors ${tts.isPlaying ? 'bg-crimson/10 text-crimson' : 'hover:bg-parchment-dark dark:hover:bg-white/5 text-ink-muted'}`} title={tts.isPlaying ? 'Stop reading' : 'Read aloud'}>
              {tts.isPlaying ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5.586v12.828a1 1 0 01-1.707.707L5.586 15z" /></svg>
              )}
            </button>
          )}

          {/* Download */}
          <button onClick={() => setShowDownloadModal(true)} className="p-2 rounded-sm hover:bg-parchment-dark dark:hover:bg-white/5 transition-colors text-ink-muted" title="Download PDF">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </button>

          {/* Share */}
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(BOOK_TITLE)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-sm hover:bg-parchment-dark dark:hover:bg-white/5 transition-colors text-ink-muted" title="Share">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </a>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar TOC */}
        {showTOC && (
          <aside className="w-72 shrink-0 border-r border-border bg-surface overflow-y-auto p-4">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-4">Table of Contents</p>
            <div className="space-y-1">
              {chapterMeta.map((ch, i) => (
                <button key={ch.id} onClick={() => goTo(i)} className={`w-full text-left px-3 py-2 rounded-sm transition-colors ${i === activeChapter ? 'bg-crimson/10 text-crimson' : 'text-ink-muted hover:text-ink hover:bg-parchment-dark dark:hover:bg-white/5'}`}>
                  <p className="font-sans text-[0.55rem] font-bold tracking-wider uppercase">{ch.number}</p>
                  <p className="font-sans text-xs leading-snug">{ch.title}</p>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main reading area */}
        <main ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-12">
            {activeChapter === 0 && (
              <section className="mb-10 overflow-hidden rounded-[32px] border border-border bg-parchment/60">
                <div className="border-b border-border px-6 py-6 md:px-8 md:py-8">
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-crimson">
                    Archive guide
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
                    Read the archive like a documentary record, not a wall of chapters.
                  </h2>
                  <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-ink-muted">
                    The Record is built as a structured archive: foreword, overview, 28 numbered chapters, and an epilogue. Start anywhere, then use the paths below to move by subject instead of only by chapter number.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/methodology"
                      className="inline-flex min-h-[42px] items-center rounded-full bg-obsidian px-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-obsidian/90"
                    >
                      Methodology
                    </Link>
                    <Link
                      to="/timeline"
                      className="inline-flex min-h-[42px] items-center rounded-full border border-border px-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                    >
                      Timeline
                    </Link>
                    <Link
                      to="/sources"
                      className="inline-flex min-h-[42px] items-center rounded-full border border-border px-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                    >
                      Source Library
                    </Link>
                  </div>
                </div>
                <div className="grid gap-4 border-b border-border px-6 py-6 md:grid-cols-2 md:px-8 xl:grid-cols-4">
                  <ReaderStatCard
                    label="Archive parts"
                    value={readerStats.sectionCount.toString()}
                    note="Foreword, overview, 28 chapters, and epilogue in one reading stack."
                  />
                  <ReaderStatCard
                    label="Dated sections"
                    value={readerStats.datedSectionCount.toString()}
                    note="Historical sections anchored to specific eras, not just themes."
                  />
                  <ReaderStatCard
                    label="Illustrated entries"
                    value={readerStats.illustratedSectionCount.toString()}
                    note="Chapters with visual anchors and mapped imagery already attached."
                  />
                  <ReaderStatCard
                    label="Keyword cues"
                    value={readerStats.keywordCount.toString()}
                    note="Searchable issue terms already embedded across the archive."
                  />
                </div>
                <div className="px-6 py-6 md:px-8">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                        Reader paths
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                        Four ways into the archive.
                      </h3>
                    </div>
                    <p className="max-w-2xl font-body text-sm leading-relaxed text-ink-muted">
                      Each path uses chapters already in the repo and links them back to the live reporting layer where it exists.
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 xl:grid-cols-2">
                    {readingPaths.map((path) => (
                      <ReadingPathCard key={path.id} path={path} onSelect={goToChapterId} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Loading Indicator */}
            {loadingChapterIndex === activeChapter && (
              <div className="mb-8 p-4 bg-crimson/5 border border-crimson/20 rounded-sm">
                <div className="flex items-center gap-3">
                  <div className="animate-spin">
                    <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-crimson">Loading chapter content...</p>
                </div>
              </div>
            )}

            {/* Chapter Header */}
            {chapter && (
              <header className="mb-10 border-b border-border pb-8">
                <p className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-2">{chapter.number}</p>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-ink leading-tight mb-3">{chapter.title}</h1>
                <p className="font-body text-lg italic text-ink-muted leading-relaxed">{chapter.subtitle}</p>
                {chapter.dateRange && (
                  <p className="font-sans text-xs font-semibold text-crimson mt-3">{chapter.dateRange}</p>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <ReaderStatCard
                    label="Access"
                    value={chapter.accessLevel === 'full' ? 'Full' : 'Preview'}
                    note={
                      chapter.accessLevel === 'full'
                        ? 'This chapter is fully unlocked with sources and the complete block stack.'
                        : 'Public preview is visible now; the remaining archive unlocks after reader access.'
                    }
                  />
                  <ReaderStatCard
                    label="Visible blocks"
                    value={`${visibleBlocks}/${chapter.totalBlocks}`}
                    note={
                      chapter.accessLevel === 'full'
                        ? 'All available blocks are visible in this reader.'
                        : `${remainingBlocks} additional blocks remain behind the reader account layer.`
                    }
                  />
                  <ReaderStatCard
                    label="Linked reporting"
                    value={relatedArticles.length.toString()}
                    note="Current newsroom files that already connect back to this chapter."
                  />
                </div>
                {keywordSpine.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {keywordSpine.map((keyword) => (
                      <Link
                        key={keyword}
                        to={`/search?q=${encodeURIComponent(keyword)}`}
                        className="rounded-full border border-border px-3 py-1 font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-crimson hover:text-crimson"
                      >
                        {keyword}
                      </Link>
                    ))}
                  </div>
                )}
                {chapter.accessLevel === 'preview' && (
                  <div className="mt-5 border border-border bg-surface rounded-sm p-4">
                    <p className="font-sans text-[0.6rem] font-bold tracking-[0.14em] uppercase text-crimson mb-2">
                      {isDegradedProfile ? 'Archive Sync Unavailable' : 'Preview Mode'}
                    </p>
                    <p className="font-body text-sm text-ink-muted leading-relaxed">
                      {isDegradedProfile
                        ? `Your reader profile is saved locally, but full archive unlock is temporarily unavailable while account sync is degraded. The remaining ${remainingBlocks} blocks will unlock again after you can re-authenticate against the live account service.`
                        : `You are reading the free preview of this chapter. Create a free account to unlock the remaining ${remainingBlocks} blocks and read the full book without asset-level gating gaps.`}
                    </p>
                    <button
                      onClick={openReaderAccessModal}
                      className="mt-4 inline-flex items-center justify-center px-4 py-2.5 bg-crimson text-white font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                    >
                      {isDegradedProfile ? 'Retry Sign-In' : 'Unlock Full Access'}
                    </button>
                  </div>
                )}
              </header>
            )}

            {relatedArticles.length > 0 && (
              <section className="mb-10 rounded-[28px] border border-border bg-surface p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-crimson">
                      Linked reporting
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                      Current newsroom files tied to this chapter
                    </h2>
                  </div>
                  <Link
                    to="/news"
                    className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-crimson transition-colors hover:text-crimson-dark"
                  >
                    View all current events →
                  </Link>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {relatedArticles.map((article) => (
                    <RelatedArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Chapter Content */}
            <div style={{ fontSize: `${fontSize}px` }}>
              {chapter && chapter.content.map((block, idx) => {
                switch (block.type) {
                  case 'dropcap':
                    return <p key={idx} className="font-body leading-relaxed mb-6 first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-crimson first-letter:float-left first-letter:mr-2 first-letter:mt-1" style={{ fontSize: 'inherit' }}>{block.text}</p>
                  case 'text':
                    return <p key={idx} className="font-body leading-relaxed mb-6 text-ink" style={{ fontSize: 'inherit' }}>{block.text}</p>
                  case 'heading':
                    return <h2 key={idx} className="font-display text-2xl font-bold text-ink mt-10 mb-4">{block.text}</h2>
                  case 'subheading':
                    return <h3 key={idx} className="font-display text-xl font-bold text-ink mt-8 mb-3">{block.text}</h3>
                  case 'quote':
                    if (!block.quote) return null
                    return (
                      <blockquote key={idx} className="my-8 pl-5 border-l-4 border-crimson italic font-body text-ink-muted" style={{ fontSize: 'inherit' }}>
                        <p className="mb-2">&ldquo;{block.quote.text}&rdquo;</p>
                        <cite className="font-sans text-xs not-italic text-ink-faint">— {block.quote.attribution}</cite>
                      </blockquote>
                    )
                  case 'evidence':
                    if (!block.evidence) return null
                    const colors: Record<string, string> = { verified: 'border-green-500 bg-green-50 dark:bg-green-950/20', circumstantial: 'border-amber-500 bg-amber-50 dark:bg-amber-950/20', disputed: 'border-red-500 bg-red-50 dark:bg-red-950/20' }
                    return (
                      <div key={idx} className={`my-6 p-4 border-l-4 rounded-sm ${colors[block.evidence.tier] || ''}`}>
                        <p className="font-sans text-xs font-bold uppercase tracking-wider mb-1">{block.evidence.label}</p>
                        <p className="font-body text-sm leading-relaxed">{block.evidence.text}</p>
                      </div>
                    )
                  default:
                    return null
                }
              })}
            </div>

            {chapter?.accessLevel === 'preview' && (
              <div className="mt-8 border border-border bg-surface rounded-sm p-5">
                <p className="font-display text-xl font-bold text-ink mb-2">
                  {isDegradedProfile ? 'Archive unlock is temporarily unavailable.' : 'Continue with a free account.'}
                </p>
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  {isDegradedProfile
                    ? 'Your reader profile is saved locally, but this reader is still in degraded mode. Retry sign-in once account sync is restored to unlock the full chapter, source list, and compiled download.'
                    : `The public preview stops here. Sign in or create a free account to continue reading the remaining ${remainingBlocks} blocks, access the full sources section, and download the compiled edition.`}
                </p>
                <button
                  onClick={openReaderAccessModal}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2.5 bg-crimson text-white font-sans text-[0.65rem] font-bold tracking-[0.12em] uppercase rounded-sm hover:bg-crimson-dark transition-colors"
                >
                  {isDegradedProfile ? 'Retry Sign-In' : 'Create Free Account'}
                </button>
              </div>
            )}

            {/* Sources for this chapter */}
            {chapter && chapter.accessLevel === 'full' && chapter.sources.length > 0 && (
              <section className="mt-10 pt-8 border-t border-border">
                <h3 className="font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink-muted mb-4">Sources</h3>
                <ol className="space-y-2">
                  {chapter.sources.map(src => (
                    <li key={src.id} className="font-sans text-xs text-ink-muted leading-relaxed flex gap-2">
                      <span className="font-bold text-crimson shrink-0">[{src.id}]</span>
                      <span>{src.text} {src.url && <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-crimson hover:underline">View →</a>}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Chapter Navigation */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-4">
              {activeChapter > 0 && (
                <button onClick={() => goTo(activeChapter - 1)} className="text-left p-4 border border-border rounded-sm hover:border-crimson transition-colors">
                  <p className="font-sans text-[0.6rem] font-bold tracking-wider uppercase text-ink-faint">&larr; Previous</p>
                  <p className="font-sans text-sm font-bold text-ink mt-1">{chapterMeta[activeChapter - 1].title}</p>
                </button>
              )}
              {activeChapter < chapterMeta.length - 1 && (
                <button onClick={() => goTo(activeChapter + 1)} className="text-right p-4 border border-border rounded-sm hover:border-crimson transition-colors col-start-2">
                  <p className="font-sans text-[0.6rem] font-bold tracking-wider uppercase text-ink-faint">Next &rarr;</p>
                  <p className="font-sans text-sm font-bold text-ink mt-1">{chapterMeta[activeChapter + 1].title}</p>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Download Modal */}
      <DownloadModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} fileName="The Record - Veritas Worldwide.pdf" fileUrl={PDF_URL} />

      {/* Bottom bar — progress + quick actions */}
      <div className="border-t border-border bg-surface px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="h-1 bg-parchment-dark dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-crimson rounded-full transition-all duration-300" style={{ width: `${((activeChapter + 1) / chapterMeta.length) * 100}%` }} />
            </div>
          </div>
          <span className="font-sans text-[0.6rem] text-ink-faint">{activeChapter + 1} of {chapterMeta.length}</span>
          <Link to="/membership" className="font-sans text-[0.6rem] font-semibold text-crimson hover:text-crimson-dark transition-colors">Support the archive →</Link>
        </div>
      </div>
    </div>
  )
}
