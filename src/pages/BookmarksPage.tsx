import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { chapterMeta, type ChapterMetadata } from '../data/chapterMeta'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'
import { DONATE_URL } from '../lib/constants'
import { ImageWithFallback } from '../components/ImageWithFallback'
import { getScopedReadingHistory, type ReadingHistoryRecord } from '../lib/readerState'

interface BookmarkCardModel {
  chapter: ChapterMetadata
  progressPercent: number | null
  lastActivityTimestamp: number
  lastReadLabel: string | null
  completed: boolean
}

function formatActivityLabel(timestamp: number) {
  if (!Number.isFinite(timestamp) || timestamp <= 0) return null

  const deltaMs = Date.now() - timestamp
  const deltaHours = Math.floor(deltaMs / (60 * 60 * 1000))
  const deltaDays = Math.floor(deltaMs / (24 * 60 * 60 * 1000))

  if (deltaHours < 1) return 'Active this hour'
  if (deltaHours < 24) return `Active ${deltaHours}h ago`
  if (deltaDays < 7) return `Active ${deltaDays}d ago`

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: deltaDays > 365 ? 'numeric' : undefined,
  }).format(new Date(timestamp))
}

function getTopKeywordLabels(chapters: ChapterMetadata[], limit = 5) {
  const counts = new Map<string, number>()

  for (const chapter of chapters) {
    for (const keyword of chapter.keywords.slice(0, 4)) {
      counts.set(keyword, (counts.get(keyword) || 0) + 1)
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
}

export default function BookmarksPage() {
  const {
    user,
    authMode,
    canAccessProtectedContent,
    bookmarks,
    readingProgress,
    openAuthModal,
  } = useAuth()

  useEffect(() => {
    setMetaTags({
      title: `Your Bookmarks | The Record — ${SITE_NAME}`,
      description: 'Saved chapters, reading activity, and your next archive routes in one place.',
      url: `${SITE_URL}/bookmarks`,
    })
    return () => clearMetaTags()
  }, [])

  const readingHistory = typeof window === 'undefined' ? [] : getScopedReadingHistory()
  const historyByChapterId = new Map<string, ReadingHistoryRecord>(
    readingHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((record) => [record.chapterId, record]),
  )

  const bookmarkedChapters = chapterMeta.filter((chapter) => bookmarks.includes(chapter.id))
  const bookmarkCards: BookmarkCardModel[] = bookmarkedChapters
    .map((chapter) => {
      const progress = readingProgress[chapter.id]
      const history = historyByChapterId.get(chapter.id)
      const lastActivityTimestamp = history?.timestamp
        || (progress?.lastReadAt ? Date.parse(progress.lastReadAt) : 0)
      const completed = Boolean(progress?.completed)
      const progressPercent = completed
        ? 100
        : history && history.scrollPercent > 0
          ? Math.round(history.scrollPercent)
          : null

      return {
        chapter,
        progressPercent,
        lastActivityTimestamp,
        lastReadLabel: formatActivityLabel(lastActivityTimestamp),
        completed,
      }
    })
    .sort((a, b) => {
      if (b.lastActivityTimestamp !== a.lastActivityTimestamp) {
        return b.lastActivityTimestamp - a.lastActivityTimestamp
      }

      return chapterMeta.findIndex((chapter) => chapter.id === a.chapter.id)
        - chapterMeta.findIndex((chapter) => chapter.id === b.chapter.id)
    })

  const inProgressCards = bookmarkCards.filter((card) => !card.completed && (card.progressPercent || 0) > 5)
  const completedCards = bookmarkCards.filter((card) => card.completed)
  const recentCard = inProgressCards[0] || bookmarkCards.find((card) => card.lastActivityTimestamp > 0) || null
  const topKeywords = getTopKeywordLabels(bookmarkedChapters)

  const recommendedChapters = (() => {
    const candidateIds = new Set<string>()

    for (const card of bookmarkCards.slice(0, 4)) {
      const currentIndex = chapterMeta.findIndex((chapter) => chapter.id === card.chapter.id)
      const nextChapter = chapterMeta[currentIndex + 1]
      if (nextChapter && !bookmarks.includes(nextChapter.id)) {
        candidateIds.add(nextChapter.id)
      }
    }

    if (candidateIds.size < 3) {
      for (const chapter of chapterMeta) {
        if (candidateIds.size >= 3) break
        if (!bookmarks.includes(chapter.id)) {
          candidateIds.add(chapter.id)
        }
      }
    }

    return [...candidateIds]
      .map((chapterId) => chapterMeta.find((chapter) => chapter.id === chapterId))
      .filter((chapter): chapter is ChapterMetadata => Boolean(chapter))
      .slice(0, 3)
  })()

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted transition-colors hover:text-crimson">Home</Link>
            <span className="text-ink-muted/50">›</span>
            <span className="font-medium text-ink">Bookmarks</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <article className="max-w-none">
            <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-crimson">
              Reader Dashboard
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
              Your Bookmarks
            </h1>
            <p className="mt-4 max-w-3xl border-b border-border pb-8 font-body text-lg leading-relaxed text-ink-muted">
              Save chapters, track active investigations, and return to the archive without hunting through the table of contents again.
            </p>

            {!user ? (
              <section className="mt-10 rounded-[28px] border border-border bg-surface p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
                  <div>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                      Save the investigation trail
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
                      Create a free reader account to keep your archive path intact.
                    </h2>
                    <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-muted">
                      Bookmarks and reading activity are tied to your reader profile so you can save chapters, return to unfinished sections, and keep the archive organized around what you are actively following.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openAuthModal({ mode: 'signup', intent: { returnTo: '/bookmarks', source: 'bookmarks_gate_signup' } })}
                        className="inline-flex min-h-[44px] items-center rounded-full bg-crimson px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-crimson-dark"
                      >
                        Create Free Account
                      </button>
                      <button
                        type="button"
                        onClick={() => openAuthModal({ mode: 'login', intent: { returnTo: '/bookmarks', source: 'bookmarks_gate_login' } })}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-border px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-parchment p-5">
                    <h3 className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                      What this unlocks
                    </h3>
                    <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-ink-muted">
                      <li>Save chapters into a personal archive queue.</li>
                      <li>Resume unfinished reading sessions from the last active route.</li>
                      <li>Keep bookmarks and progress separated by reader identity on shared devices.</li>
                    </ul>
                  </div>
                </div>
              </section>
            ) : (
              <>
                {authMode === 'degraded' && !canAccessProtectedContent && (
                  <section className="mt-10 rounded-2xl border border-amber-500/25 bg-amber-500/8 px-5 py-4">
                    <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-amber-700">
                      Archive sync degraded
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                      Your bookmarks dashboard is still available from local reader storage, but full archive sync is temporarily unavailable until the live auth service is back.
                    </p>
                  </section>
                )}

                {bookmarkCards.length === 0 ? (
                  <section className="mt-10 rounded-[28px] border border-border bg-surface p-6 text-center md:p-8">
                    <h2 className="font-display text-2xl font-bold text-ink">No bookmarks yet</h2>
                    <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-ink-muted">
                      Start saving chapters from the archive, then use this page as your reading queue, progress view, and next-step dashboard.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <Link
                        to="/read"
                        className="inline-flex min-h-[44px] items-center rounded-full bg-crimson px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-crimson-dark"
                      >
                        Open the Reader
                      </Link>
                      <Link
                        to="/search"
                        className="inline-flex min-h-[44px] items-center rounded-full border border-border px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                      >
                        Search the Archive
                      </Link>
                    </div>
                  </section>
                ) : (
                  <>
                    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">Saved chapters</p>
                        <p className="mt-3 font-display text-3xl font-bold text-ink">{bookmarkCards.length}</p>
                        <p className="mt-2 font-body text-sm text-ink-muted">Chapters currently pinned into your archive queue.</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">In progress</p>
                        <p className="mt-3 font-display text-3xl font-bold text-ink">{inProgressCards.length}</p>
                        <p className="mt-2 font-body text-sm text-ink-muted">Active reading sessions with partial progress saved.</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">Completed</p>
                        <p className="mt-3 font-display text-3xl font-bold text-ink">{completedCards.length}</p>
                        <p className="mt-2 font-body text-sm text-ink-muted">Saved chapters you have already finished.</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-surface p-5">
                        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">Top tags</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {topKeywords.length > 0 ? (
                            topKeywords.slice(0, 3).map(([keyword]) => (
                              <span key={keyword} className="rounded-full bg-parchment px-3 py-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                                {keyword}
                              </span>
                            ))
                          ) : (
                            <span className="font-body text-sm text-ink-muted">No tags yet.</span>
                          )}
                        </div>
                      </div>
                    </section>

                    {recentCard && (
                      <section className="mt-8 rounded-[28px] bg-obsidian px-6 py-7 text-white md:px-8">
                        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/60">
                          Resume from your latest route
                        </p>
                        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                          <div className="max-w-2xl">
                            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-crimson-light">
                              {recentCard.chapter.number}
                            </p>
                            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                              {recentCard.chapter.title}
                            </h2>
                            <p className="mt-3 font-body text-sm leading-relaxed text-white/72">
                              {recentCard.chapter.subtitle}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/60">
                              {recentCard.progressPercent !== null && (
                                <span>{recentCard.progressPercent}% through</span>
                              )}
                              {recentCard.lastReadLabel && <span>{recentCard.lastReadLabel}</span>}
                              {recentCard.completed && <span>Completed</span>}
                            </div>
                          </div>
                          <div className="min-w-[220px]">
                            <div className="h-2 rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-crimson"
                                style={{ width: `${recentCard.progressPercent ?? (recentCard.completed ? 100 : 0)}%` }}
                              />
                            </div>
                            <Link
                              to={`/chapter/${recentCard.chapter.id}`}
                              className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-white px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-obsidian transition-colors hover:bg-white/85"
                            >
                              Resume Chapter
                            </Link>
                          </div>
                        </div>
                      </section>
                    )}

                    <section className="mt-10">
                      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                        <div>
                          <h2 className="font-display text-2xl font-bold text-ink">Saved Archive Queue</h2>
                          <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
                            Your saved chapters are sorted by the most recent reading activity first.
                          </p>
                        </div>
                        <Link to="/read" className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-crimson transition-colors hover:text-crimson-dark">
                          Open full reader
                        </Link>
                      </div>

                      <div className="mt-6 grid gap-4">
                        {bookmarkCards.map((card) => (
                          <Link
                            key={card.chapter.id}
                            to={`/chapter/${card.chapter.id}`}
                            className="group block rounded-2xl border border-border bg-surface p-5 transition-all hover:border-crimson/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                          >
                            <div className="flex flex-col gap-5 md:flex-row">
                              {card.chapter.heroImage && (
                                <div className="overflow-hidden rounded-xl bg-parchment md:h-36 md:w-44 md:flex-shrink-0">
                                  <ImageWithFallback
                                    src={card.chapter.heroImage}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                    retryCount={2}
                                  />
                                </div>
                              )}

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-crimson">
                                    {card.chapter.number}
                                  </span>
                                  {card.chapter.dateRange && (
                                    <span className="font-sans text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
                                      {card.chapter.dateRange}
                                    </span>
                                  )}
                                  {card.completed && (
                                    <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                                      Completed
                                    </span>
                                  )}
                                </div>

                                <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink transition-colors group-hover:text-crimson">
                                  {card.chapter.title}
                                </h3>
                                <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-ink-muted">
                                  {card.chapter.subtitle}
                                </p>

                                {(card.progressPercent !== null || card.lastReadLabel) && (
                                  <div className="mt-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-faint">
                                      <span>{card.progressPercent !== null ? `${card.progressPercent}% read` : 'Saved for later'}</span>
                                      {card.lastReadLabel && <span>{card.lastReadLabel}</span>}
                                    </div>
                                    <div className="mt-2 h-1.5 rounded-full bg-parchment-dark">
                                      <div
                                        className="h-full rounded-full bg-crimson"
                                        style={{ width: `${card.progressPercent ?? 0}%` }}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="mt-4 flex flex-wrap gap-2">
                                  {card.chapter.keywords.slice(0, 4).map((keyword) => (
                                    <span key={keyword} className="rounded-full bg-parchment px-3 py-1 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </>
            )}
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Archive stats
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Record chapters</dt>
                    <dd className="font-semibold text-ink">{chapterMeta.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Saved chapters</dt>
                    <dd className="font-semibold text-ink">{bookmarkCards.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Recent reading routes</dt>
                    <dd className="font-semibold text-ink">{readingHistory.length}</dd>
                  </div>
                </dl>
              </div>

              {recommendedChapters.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                    Suggested next reads
                  </h3>
                  <div className="mt-4 space-y-4">
                    {recommendedChapters.map((chapter) => (
                      <Link key={chapter.id} to={`/chapter/${chapter.id}`} className="block border-b border-border pb-4 last:border-0 last:pb-0">
                        <p className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-crimson">
                          {chapter.number}
                        </p>
                        <p className="mt-1 font-serif text-sm font-semibold leading-snug text-ink transition-colors hover:text-crimson">
                          {chapter.title}
                        </p>
                        <p className="mt-1 font-body text-xs leading-relaxed text-ink-muted">
                          {chapter.subtitle}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Quick routes
                </h3>
                <nav className="mt-4 space-y-2">
                  <Link to="/read" className="block text-sm text-ink-muted transition-colors hover:text-crimson">
                    → Read The Record
                  </Link>
                  <Link to="/profiles" className="block text-sm text-ink-muted transition-colors hover:text-crimson">
                    → Power Profiles
                  </Link>
                  <Link to="/timeline" className="block text-sm text-ink-muted transition-colors hover:text-crimson">
                    → Timeline
                  </Link>
                  <Link to="/search" className="block text-sm text-ink-muted transition-colors hover:text-crimson">
                    → Search
                  </Link>
                  <Link to="/sources" className="block text-sm text-ink-muted transition-colors hover:text-crimson">
                    → Sources
                  </Link>
                </nav>
              </div>

              <div className="rounded-2xl border border-crimson/20 bg-crimson/5 p-5">
                <h3 className="text-sm font-semibold text-ink">Support this work</h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-ink-muted">
                  Reader funding keeps the archive public-facing, the evidence layer inspectable, and the reporting durable over time.
                </p>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-full bg-crimson px-4 py-2 text-center font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-crimson-dark"
                >
                  View membership
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
