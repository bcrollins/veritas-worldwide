import { useState, useMemo, useCallback } from 'react'
import { useAuth } from '../lib/AuthContext'

/* ── Types ────────────────────────────────────────────────────── */
interface Comment {
  id: string
  parentId: string | null
  pageId: string
  author: string
  authorInitials: string
  content: string
  timestamp: number
  upvotes: string[]   // user IDs who upvoted
  downvotes: string[] // user IDs who downvoted
  edited: boolean
  deleted: boolean
}

type SortMode = 'best' | 'newest' | 'oldest' | 'controversial'

/* ── Storage helpers ──────────────────────────────────────────── */
const STORAGE_KEY = 'veritas_forum'

function loadComments(pageId: string): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const all: Comment[] = JSON.parse(raw)
    return all.filter(c => c.pageId === pageId)
  } catch { return [] }
}

function saveComment(comment: Comment) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const all: Comment[] = raw ? JSON.parse(raw) : []
    const idx = all.findIndex(c => c.id === comment.id)
    if (idx >= 0) all[idx] = comment
    else all.push(comment)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch { /* storage full fallback */ }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

/* ── Score & Sort ─────────────────────────────────────────────── */
function getScore(c: Comment): number {
  return c.upvotes.length - c.downvotes.length
}

function sortComments(comments: Comment[], mode: SortMode): Comment[] {
  const sorted = [...comments]
  switch (mode) {
    case 'best': return sorted.sort((a, b) => getScore(b) - getScore(a))
    case 'newest': return sorted.sort((a, b) => b.timestamp - a.timestamp)
    case 'oldest': return sorted.sort((a, b) => a.timestamp - b.timestamp)
    case 'controversial': return sorted.sort((a, b) => (b.upvotes.length + b.downvotes.length) - (a.upvotes.length + a.downvotes.length))
    default: return sorted
  }
}

/* ── SVG Icons ────────────────────────────────────────────────── */
function UpIcon({ active }: { active?: boolean }) {
  return <svg className={`w-3.5 h-3.5 ${active ? 'text-crimson' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
}
function DownIcon({ active }: { active?: boolean }) {
  return <svg className={`w-3.5 h-3.5 ${active ? 'text-blue-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
}
function ReplyIcon() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l7-7m0 0v14m0-14h11"/></svg>
}

/* ── Comment Composer ─────────────────────────────────────────── */
function CommentComposer({ pageId, parentId, onPost, onCancel, placeholder }: {
  pageId: string; parentId: string | null; onPost: (c: Comment) => void; onCancel?: () => void; placeholder?: string
}) {
  const [text, setText] = useState('')
  const { user } = useAuth()

  const handleSubmit = () => {
    if (!text.trim() || !user) return
    const comment: Comment = {
      id: generateId(),
      parentId,
      pageId,
      author: user.displayName || user.email.split('@')[0],
      authorInitials: getInitials(user.displayName || user.email),
      content: text.trim(),
      timestamp: Date.now(),
      upvotes: [],
      downvotes: [],
      edited: false,
      deleted: false,
    }
    saveComment(comment)
    onPost(comment)
    setText('')
  }

  if (!user) return null

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center flex-shrink-0">
        <span className="font-sans text-[0.6rem] font-bold text-crimson">{getInitials(user.displayName || user.email)}</span>
      </div>
      <div className="flex-1">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder || 'Share your thoughts...'}
          className="w-full min-h-[80px] p-3 border border-border rounded-sm bg-parchment font-body text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-1 focus:ring-crimson/30 focus:border-crimson/40"
          maxLength={5000}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="font-sans text-[0.55rem] text-ink-faint">{text.length}/5000</span>
          <div className="flex gap-2">
            {onCancel && <button onClick={onCancel} className="font-sans text-xs text-ink-muted hover:text-ink px-3 py-1.5">Cancel</button>}
            <button
              onClick={handleSubmit}
              disabled={!text.trim()}
              className="font-sans text-xs font-bold tracking-[0.08em] uppercase px-4 py-1.5 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {parentId ? 'Reply' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Single Comment Thread ────────────────────────────────────── */
function CommentThread({ comment, allComments, pageId, depth, onUpdate }: {
  comment: Comment; allComments: Comment[]; pageId: string; depth: number; onUpdate: () => void
}) {
  const [showReply, setShowReply] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  const userId = user?.email || ''
  const score = getScore(comment)
  const hasUpvoted = comment.upvotes.includes(userId)
  const hasDownvoted = comment.downvotes.includes(userId)
  const replies = allComments.filter(c => c.parentId === comment.id && !c.deleted)
  const maxDepth = 4

  const handleVote = (direction: 'up' | 'down') => {
    if (!user) return
    const updated = { ...comment }
    if (direction === 'up') {
      if (hasUpvoted) updated.upvotes = updated.upvotes.filter(id => id !== userId)
      else { updated.upvotes = [...updated.upvotes, userId]; updated.downvotes = updated.downvotes.filter(id => id !== userId) }
    } else {
      if (hasDownvoted) updated.downvotes = updated.downvotes.filter(id => id !== userId)
      else { updated.downvotes = [...updated.downvotes, userId]; updated.upvotes = updated.upvotes.filter(id => id !== userId) }
    }
    saveComment(updated)
    onUpdate()
  }

  const handleReply = (newComment: Comment) => {
    setShowReply(false)
    onUpdate()
  }

  return (
    <div className={`${depth > 0 ? 'ml-4 sm:ml-8 border-l-2 border-border/40 pl-4' : ''}`}>
      <div className="flex gap-2 py-3">
        {/* Vote Column */}
        <div className="flex flex-col items-center gap-0.5 pt-0.5">
          <button onClick={() => handleVote('up')} className={`p-0.5 rounded hover:bg-crimson/10 transition-colors ${!user ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={!user} aria-label="Upvote">
            <UpIcon active={hasUpvoted} />
          </button>
          <span className={`font-mono text-[0.65rem] font-bold min-w-[1.5rem] text-center ${score > 0 ? 'text-crimson' : score < 0 ? 'text-blue-600' : 'text-ink-faint'}`}>{score}</span>
          <button onClick={() => handleVote('down')} className={`p-0.5 rounded hover:bg-blue-600/10 transition-colors ${!user ? 'opacity-30 cursor-not-allowed' : ''}`} disabled={!user} aria-label="Downvote">
            <DownIcon active={hasDownvoted} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center">
              <span className="font-sans text-[0.45rem] font-bold text-ink-muted">{comment.authorInitials}</span>
            </div>
            <span className="font-sans text-xs font-semibold text-ink">{comment.author}</span>
            <span className="font-sans text-[0.6rem] text-ink-faint">{timeAgo(comment.timestamp)}</span>
            {comment.edited && <span className="font-sans text-[0.55rem] text-ink-faint italic">(edited)</span>}
          </div>

          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="font-sans text-xs text-ink-faint hover:text-ink mt-1">
              [{replies.length} repl{replies.length === 1 ? 'y' : 'ies'} hidden — click to expand]
            </button>
          ) : (
            <>
              <p className="font-body text-sm text-ink leading-relaxed mt-1.5 whitespace-pre-wrap break-words">{comment.content}</p>
              <div className="flex items-center gap-3 mt-2">
                {user && depth < maxDepth && (
                  <button onClick={() => setShowReply(!showReply)} className="inline-flex items-center gap-1 font-sans text-[0.6rem] font-semibold text-ink-muted hover:text-crimson uppercase tracking-wider transition-colors">
                    <ReplyIcon /> Reply
                  </button>
                )}
                {replies.length > 0 && (
                  <button onClick={() => setCollapsed(true)} className="font-sans text-[0.6rem] text-ink-faint hover:text-ink uppercase tracking-wider">
                    Collapse
                  </button>
                )}
              </div>
              {showReply && (
                <div className="mt-3">
                  <CommentComposer pageId={pageId} parentId={comment.id} onPost={handleReply} onCancel={() => setShowReply(false)} placeholder={`Reply to ${comment.author}...`} />
                </div>
              )}
              {/* Nested replies */}
              {replies.length > 0 && (
                <div className="mt-1">
                  {sortComments(replies, 'best').map(reply => (
                    <CommentThread key={reply.id} comment={reply} allComments={allComments} pageId={pageId} depth={depth + 1} onUpdate={onUpdate} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main Forum Component ─────────────────────────────────────── */
export default function CommunityForum({ pageId, pageTitle }: { pageId: string; pageTitle: string }) {
  const [comments, setComments] = useState<Comment[]>(() => loadComments(pageId))
  const [sortMode, setSortMode] = useState<SortMode>('best')
  const { isLoggedIn, setShowAuthModal } = useAuth()

  const refresh = useCallback(() => {
    setComments(loadComments(pageId))
  }, [pageId])

  const topLevel = useMemo(() => {
    return sortComments(comments.filter(c => !c.parentId && !c.deleted), sortMode)
  }, [comments, sortMode])

  const totalCount = comments.filter(c => !c.deleted).length

  return (
    <section className="mt-16 pt-10 border-t-2 border-border" id="community">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <svg className="w-5 h-5 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            Discussion Beta
          </h2>
          <p className="font-sans text-[0.6rem] text-ink-faint tracking-wider uppercase mt-0.5">{totalCount} local comment{totalCount !== 1 ? 's' : ''} on {pageTitle}</p>
          <p className="mt-2 max-w-2xl font-body text-xs leading-relaxed text-ink-muted">
            Comments in this section stay in this browser for now. Shared discussion history, moderation, and account-wide community identity have not shipped yet.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1 bg-parchment-dark rounded-sm p-0.5">
          {(['best', 'newest', 'oldest', 'controversial'] as SortMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setSortMode(mode)}
              className={`font-sans text-[0.6rem] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-colors ${sortMode === mode ? 'bg-parchment text-crimson shadow-sm' : 'text-ink-muted hover:text-ink'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Composer or Sign-In Prompt */}
      {isLoggedIn ? (
        <div className="mb-8">
          <CommentComposer pageId={pageId} parentId={null} onPost={refresh} placeholder="Add a local beta comment — what's your take?" />
        </div>
      ) : (
        <button
          onClick={() => setShowAuthModal(true)}
          className="w-full mb-8 py-4 border-2 border-dashed border-border rounded-sm text-center font-sans text-sm text-ink-muted hover:border-crimson/40 hover:text-crimson transition-colors"
        >
          Sign in to add a local beta comment
        </button>
      )}

      {/* Comment Threads */}
      {topLevel.length > 0 ? (
        <div className="divide-y divide-border/30">
          {topLevel.map(comment => (
            <CommentThread
              key={comment.id}
              comment={comment}
              allComments={comments}
              pageId={pageId}
              depth={0}
              onUpdate={refresh}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <svg className="w-10 h-10 mx-auto text-ink-faint/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <p className="font-display text-sm text-ink-muted mb-1">No local comments yet</p>
          <p className="font-sans text-xs text-ink-faint">Be the first to draft a browser-local reaction to this page.</p>
        </div>
      )}
    </section>
  )
}
