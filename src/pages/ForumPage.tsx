/**
 * ForumPage.tsx — Full Reddit-style community forum for Veritas Worldwide Press.
 * Features: communities (subreddits), post feed, threaded comments, voting, sorting,
 * search, flairs, awards, polls, crossposting, saving, reporting, moderation panel,
 * user karma display, community sidebars, create post modal, and full-width layout.
 */
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useAuth } from '../lib/AuthContext'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import {
  type ForumPost, type ForumComment, type Community, type SortMode, type TopTimeframe,
  type PostType, type PostFlair, type ReportReason, type VoteDirection,
  COMMUNITIES, AWARDS, SEED_POSTS, SEED_COMMENTS,
  loadPosts, savePosts, createPost, votePost, toggleSavePost,
  loadComments, createComment, voteComment,
  sortPosts, sortComments, getScore, timeAgo, formatNumber, getInitials,
  getCommunity, getPostsForCommunity, getAllPosts, searchPosts, searchCommunities,
  submitReport, generateId,
} from '../data/forumData'

/* ── SVG Icons ────────────────────────────────────────────────── */
function UpArrow({ active }: { active?: boolean }) {
  return <svg className={`w-5 h-5 ${active ? 'text-crimson' : 'text-ink-muted hover:text-crimson'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/></svg>
}
function DownArrow({ active }: { active?: boolean }) {
  return <svg className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-ink-muted hover:text-blue-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
}
function CommentIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
}
function ShareIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
}
function BookmarkIcon({ filled }: { filled?: boolean }) {
  return filled
    ? <svg className="w-4 h-4 text-crimson" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
}
function AwardIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
}
function ReportIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
}
function SearchIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
}
function PlusIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
}
function CloseIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
}
function PinIcon() {
  return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1.323l3.954.99a1.5 1.5 0 01.672 2.518L13.4 10.052l1.56 6.247a1 1 0 01-1.732.849L10 13.5l-3.228 3.648a1 1 0 01-1.732-.849l1.56-6.247-2.226-2.22a1.5 1.5 0 01.672-2.52L9 5.324V3a1 1 0 011-1z"/></svg>
}
function LockIcon() {
  return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
}


/* ── View Types ───────────────────────────────────────────────── */
type ForumView = 'feed' | 'community' | 'post' | 'create' | 'search' | 'saved'
type CommentSortMode = 'best' | 'new' | 'old' | 'controversial' | 'top'

/* ── Post Card ────────────────────────────────────────────────── */
function PostCard({ post, onOpen, onVote, onSave, userId, compact }: {
  post: ForumPost; onOpen: (id: string) => void; onVote: (id: string, dir: VoteDirection) => void
  onSave: (id: string) => void; userId: string; compact?: boolean
}) {
  const score = getScore(post)
  const hasUpvoted = post.upvotes.includes(userId)
  const hasDownvoted = post.downvotes.includes(userId)
  const isSaved = post.saved.includes(userId)
  const community = getCommunity(post.communityId)
  const totalAwards = post.awards.reduce((sum, a) => sum + a.count, 0)

  return (
    <div className={`bg-parchment border border-border hover:border-ink/20 transition-colors rounded ${compact ? 'p-2' : 'p-0'}`}>
      <div className="flex">
        {/* Vote column */}
        <div className="flex flex-col items-center w-10 sm:w-12 py-2 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); onVote(post.id, hasUpvoted ? null : 'up') }} className="p-0.5"><UpArrow active={hasUpvoted} /></button>
          <span className={`font-mono text-xs font-bold ${score > 0 ? 'text-crimson' : score < 0 ? 'text-blue-600' : 'text-ink-faint'}`}>{formatNumber(score)}</span>
          <button onClick={e => { e.stopPropagation(); onVote(post.id, hasDownvoted ? null : 'down') }} className="p-0.5"><DownArrow active={hasDownvoted} /></button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 py-2 pr-3 cursor-pointer" onClick={() => onOpen(post.id)}>
          {/* Meta line */}
          <div className="flex items-center gap-2 flex-wrap text-xs mb-1">
            {community && <span className="font-sans font-bold text-ink hover:underline">{community.icon} {community.name}</span>}
            <span className="text-ink-faint">•</span>
            <span className="text-ink-muted">Posted by <span className="hover:underline">{post.author}</span></span>
            {post.authorFlair && (
              <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold" style={{ background: post.authorFlair.bgColor, color: post.authorFlair.textColor }}>{post.authorFlair.text}</span>
            )}
            <span className="text-ink-faint">{timeAgo(post.timestamp)}</span>
            {post.pinned && <span className="text-green-700 flex items-center gap-0.5"><PinIcon /> Pinned</span>}
            {post.locked && <span className="text-yellow-700 flex items-center gap-0.5"><LockIcon /> Locked</span>}
          </div>

          {/* Title */}
          <h3 className="font-display text-base sm:text-lg font-bold text-ink leading-snug mb-1">
            {post.postFlair && (
              <span className="inline-block px-2 py-0.5 rounded text-[0.6rem] font-sans font-bold mr-2 align-middle" style={{ background: post.postFlair.bgColor, color: post.postFlair.textColor }}>{post.postFlair.text}</span>
            )}
            {post.title}
            {post.type === 'link' && <span className="text-xs font-normal text-blue-600 ml-2">({new URL(post.body).hostname})</span>}
          </h3>

          {/* Awards */}
          {totalAwards > 0 && (
            <div className="flex items-center gap-1 mb-1.5">
              {post.awards.map((a, i) => {
                const award = AWARDS.find(aw => aw.id === a.awardId)
                return award ? <span key={i} className="text-sm" title={`${award.name} x${a.count}`}>{award.icon}{a.count > 1 && <span className="text-[0.55rem] text-ink-faint ml-0.5">{a.count}</span>}</span> : null
              })}
            </div>
          )}

          {/* Preview body for text posts */}
          {post.type === 'text' && !compact && (
            <p className="font-body text-sm text-ink-muted leading-relaxed line-clamp-3 mb-2">{post.body}</p>
          )}

          {/* Poll preview */}
          {post.type === 'poll' && post.pollOptions && (
            <div className="flex gap-2 mb-2 flex-wrap">
              {post.pollOptions.slice(0, 3).map(opt => (
                <span key={opt.id} className="px-2 py-1 bg-parchment-dark rounded text-xs text-ink-muted">{opt.text} ({opt.votes.length})</span>
              ))}
              {post.pollOptions.length > 3 && <span className="text-xs text-ink-faint self-center">+{post.pollOptions.length - 3} more</span>}
            </div>
          )}

          {/* Action bar */}
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1 hover:text-ink transition-colors"><CommentIcon /> {formatNumber(post.commentCount)} comments</span>
            <button onClick={e => { e.stopPropagation(); onSave(post.id) }} className={`flex items-center gap-1 hover:text-crimson transition-colors ${isSaved ? 'text-crimson' : ''}`}><BookmarkIcon filled={isSaved} /> {isSaved ? 'Saved' : 'Save'}</button>
            <button className="flex items-center gap-1 hover:text-ink transition-colors"><ShareIcon /> Share</button>
            {totalAwards > 0 && <span className="flex items-center gap-1"><AwardIcon /> {totalAwards}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}


/* ── Comment Thread ───────────────────────────────────────────── */
function CommentThread({ comment, allComments, postId, depth, onVote, onReply, userId, sortMode }: {
  comment: ForumComment; allComments: ForumComment[]; postId: string; depth: number
  onVote: (id: string, dir: VoteDirection) => void; onReply: (parentId: string, content: string) => void
  userId: string; sortMode: CommentSortMode
}) {
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const score = getScore(comment)
  const hasUpvoted = comment.upvotes.includes(userId)
  const hasDownvoted = comment.downvotes.includes(userId)
  const replies = sortComments(allComments.filter(c => c.parentId === comment.id && !c.deleted), sortMode)
  const maxDepth = 6
  const totalAwards = comment.awards.reduce((sum, a) => sum + a.count, 0)

  const handleReply = () => {
    if (!replyText.trim()) return
    onReply(comment.id, replyText.trim())
    setReplyText('')
    setShowReply(false)
  }

  const depthColors = ['border-crimson/30', 'border-blue-500/30', 'border-green-500/30', 'border-purple-500/30', 'border-orange-500/30', 'border-pink-500/30']

  return (
    <div className={`${depth > 0 ? `ml-3 sm:ml-6 pl-3 border-l-2 ${depthColors[depth % depthColors.length]}` : ''}`}>
      <div className="py-2">
        {/* Collapse line */}
        {collapsed ? (
          <button onClick={() => setCollapsed(false)} className="flex items-center gap-2 text-xs text-ink-faint hover:text-ink">
            <span className="w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center text-[0.5rem] font-bold">{getInitials(comment.author)}</span>
            <span className="font-semibold">{comment.author}</span>
            <span>{formatNumber(score)} points</span>
            <span>• {replies.length} repl{replies.length === 1 ? 'y' : 'ies'}</span>
            <span className="text-blue-600">[+] expand</span>
          </button>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs mb-1">
              <button onClick={() => setCollapsed(true)} className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center text-[0.5rem] font-bold text-ink-muted hover:bg-ink/20 flex-shrink-0">{getInitials(comment.author)}</button>
              <span className="font-sans font-bold text-ink">{comment.author}</span>
              {comment.authorFlair && (
                <span className="px-1.5 py-0.5 rounded text-[0.55rem] font-bold" style={{ background: comment.authorFlair.bgColor, color: comment.authorFlair.textColor }}>{comment.authorFlair.text}</span>
              )}
              <span className="text-ink-faint">• {timeAgo(comment.timestamp)}</span>
              {comment.edited && <span className="text-ink-faint italic">(edited)</span>}
              {totalAwards > 0 && comment.awards.map((a, i) => {
                const award = AWARDS.find(aw => aw.id === a.awardId)
                return award ? <span key={i} className="text-sm" title={award.name}>{award.icon}{a.count > 1 && <sup className="text-[0.5rem]">{a.count}</sup>}</span> : null
              })}
            </div>

            {/* Body */}
            <p className="font-body text-sm text-ink leading-relaxed whitespace-pre-wrap break-words mb-1.5 ml-7">{comment.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-7 text-xs text-ink-muted">
              <div className="flex items-center gap-1">
                <button onClick={() => onVote(comment.id, hasUpvoted ? null : 'up')} className="p-0.5"><UpArrow active={hasUpvoted} /></button>
                <span className={`font-mono font-bold min-w-[1.5rem] text-center ${score > 0 ? 'text-crimson' : score < 0 ? 'text-blue-600' : ''}`}>{formatNumber(score)}</span>
                <button onClick={() => onVote(comment.id, hasDownvoted ? null : 'down')} className="p-0.5"><DownArrow active={hasDownvoted} /></button>
              </div>
              {userId && depth < maxDepth && (
                <button onClick={() => setShowReply(!showReply)} className="font-sans font-semibold hover:text-crimson transition-colors">Reply</button>
              )}
              <button className="hover:text-ink transition-colors">Share</button>
              <button className="hover:text-ink transition-colors flex items-center gap-1"><ReportIcon /> Report</button>
            </div>

            {/* Reply composer */}
            {showReply && (
              <div className="ml-7 mt-2 mb-2">
                <textarea
                  value={replyText} onChange={e => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.author}...`}
                  className="w-full min-h-[80px] p-3 border border-border rounded bg-parchment font-body text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-1 focus:ring-crimson/30"
                  maxLength={10000}
                />
                <div className="flex gap-2 mt-1 justify-end">
                  <button onClick={() => setShowReply(false)} className="font-sans text-xs text-ink-muted hover:text-ink px-3 py-1.5">Cancel</button>
                  <button onClick={handleReply} disabled={!replyText.trim()} className="font-sans text-xs font-bold uppercase tracking-wider px-4 py-1.5 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors disabled:opacity-40">Reply</button>
                </div>
              </div>
            )}

            {/* Nested replies */}
            {replies.map(reply => (
              <CommentThread key={reply.id} comment={reply} allComments={allComments} postId={postId} depth={depth + 1} onVote={onVote} onReply={onReply} userId={userId} sortMode={sortMode} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}


/* ── Post Detail View ─────────────────────────────────────────── */
function PostDetail({ post, onBack, userId }: {
  post: ForumPost; onBack: () => void; userId: string
}) {
  const [comments, setComments] = useState<ForumComment[]>(() => loadComments(post.id))
  const [commentSort, setCommentSort] = useState<CommentSortMode>('best')
  const [newComment, setNewComment] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAwardModal, setShowAwardModal] = useState(false)
  const community = getCommunity(post.communityId)
  const score = getScore(post)
  const totalAwards = post.awards.reduce((sum, a) => sum + a.count, 0)
  const topLevel = useMemo(() => sortComments(comments.filter(c => !c.parentId && !c.deleted), commentSort), [comments, commentSort])
  const totalVotes = post.pollOptions?.reduce((sum, o) => sum + o.votes.length, 0) || 0

  const refresh = () => setComments(loadComments(post.id))

  const handleCommentVote = (commentId: string, dir: VoteDirection) => {
    if (!userId) return
    voteComment(commentId, userId, dir)
    refresh()
  }

  const handleReply = (parentId: string, content: string) => {
    if (!userId) return
    createComment({ postId: post.id, parentId, author: userId.split('@')[0], content })
    refresh()
  }

  const handleTopLevelComment = () => {
    if (!newComment.trim() || !userId) return
    createComment({ postId: post.id, parentId: null, author: userId.split('@')[0], content: newComment.trim() })
    setNewComment('')
    refresh()
  }

  return (
    <div className="w-full">
      {/* Back nav */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-muted hover:text-crimson mb-4 font-sans">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Back to {community?.displayName || 'feed'}
      </button>

      <div className="flex gap-6 w-full">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <article className="bg-parchment border border-border rounded p-4 sm:p-6">
            {/* Post meta */}
            <div className="flex items-center gap-2 text-xs mb-3 flex-wrap">
              {community && <span className="font-bold text-ink">{community.icon} {community.name}</span>}
              <span className="text-ink-faint">•</span>
              <span className="text-ink-muted">Posted by {post.author}</span>
              {post.authorFlair && <span className="px-1.5 py-0.5 rounded text-[0.55rem] font-bold" style={{ background: post.authorFlair.bgColor, color: post.authorFlair.textColor }}>{post.authorFlair.text}</span>}
              <span className="text-ink-faint">{timeAgo(post.timestamp)}</span>
              {post.pinned && <span className="text-green-700 flex items-center gap-0.5 font-semibold"><PinIcon /> Pinned</span>}
              {post.locked && <span className="text-yellow-700 flex items-center gap-0.5 font-semibold"><LockIcon /> Locked</span>}
            </div>

            {/* Title */}
            <h1 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3">
              {post.postFlair && <span className="inline-block px-2 py-0.5 rounded text-xs font-sans font-bold mr-2 align-middle" style={{ background: post.postFlair.bgColor, color: post.postFlair.textColor }}>{post.postFlair.text}</span>}
              {post.title}
            </h1>

            {/* Awards */}
            {totalAwards > 0 && (
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {post.awards.map((a, i) => {
                  const award = AWARDS.find(aw => aw.id === a.awardId)
                  return award ? (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 border border-yellow-200 rounded-full text-xs">
                      <span>{award.icon}</span>
                      <span className="font-semibold">{award.name}</span>
                      {a.count > 1 && <span className="text-ink-faint">x{a.count}</span>}
                    </span>
                  ) : null
                })}
              </div>
            )}

            {/* Body */}
            {post.type === 'text' && <div className="font-body text-sm text-ink leading-relaxed whitespace-pre-wrap break-words mb-4">{post.body}</div>}
            {post.type === 'link' && (
              <a href={post.body} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all mb-4 block">{post.body}</a>
            )}

            {/* Poll */}
            {post.type === 'poll' && post.pollOptions && (
              <div className="space-y-2 mb-4">
                {post.pollOptions.map(opt => {
                  const pct = totalVotes ? Math.round((opt.votes.length / totalVotes) * 100) : 0
                  const hasVoted = opt.votes.includes(userId)
                  return (
                    <div key={opt.id} className="relative">
                      <div className="absolute inset-0 bg-crimson/10 rounded" style={{ width: `${pct}%` }} />
                      <div className={`relative flex items-center justify-between px-3 py-2 border rounded ${hasVoted ? 'border-crimson' : 'border-border'}`}>
                        <span className="font-body text-sm">{opt.text}</span>
                        <span className="font-mono text-xs font-bold">{pct}% ({opt.votes.length})</span>
                      </div>
                    </div>
                  )
                })}
                <p className="text-xs text-ink-faint">{totalVotes} total votes</p>
              </div>
            )}

            {/* Action bar */}
            <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-ink-muted">
              <div className="flex items-center gap-1">
                <button className="p-1"><UpArrow active={post.upvotes.includes(userId)} /></button>
                <span className={`font-mono font-bold ${score > 0 ? 'text-crimson' : score < 0 ? 'text-blue-600' : ''}`}>{formatNumber(score)}</span>
                <button className="p-1"><DownArrow active={post.downvotes.includes(userId)} /></button>
              </div>
              <span className="flex items-center gap-1"><CommentIcon /> {comments.filter(c => !c.deleted).length} comments</span>
              <button className="flex items-center gap-1 hover:text-crimson"><BookmarkIcon filled={post.saved.includes(userId)} /> Save</button>
              <button className="flex items-center gap-1 hover:text-ink"><ShareIcon /> Share</button>
              <button onClick={() => setShowAwardModal(true)} className="flex items-center gap-1 hover:text-yellow-600"><AwardIcon /> Award</button>
              <button onClick={() => setShowReportModal(true)} className="flex items-center gap-1 hover:text-red-600"><ReportIcon /> Report</button>
            </div>
          </article>

          {/* Comment composer */}
          {userId && !post.locked ? (
            <div className="mt-4 bg-parchment border border-border rounded p-4">
              <p className="text-xs text-ink-muted mb-2">Comment as <span className="font-bold text-ink">{userId.split('@')[0]}</span></p>
              <textarea
                value={newComment} onChange={e => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full min-h-[100px] p-3 border border-border rounded bg-white font-body text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-crimson/30"
                maxLength={10000}
              />
              <div className="flex justify-end mt-2">
                <button onClick={handleTopLevelComment} disabled={!newComment.trim()} className="font-sans text-xs font-bold uppercase tracking-wider px-5 py-2 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors disabled:opacity-40">Comment</button>
              </div>
            </div>
          ) : post.locked ? (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-4 text-center text-sm text-yellow-800">
              <LockIcon /> This thread is locked. New comments cannot be posted.
            </div>
          ) : null}

          {/* Comment sort */}
          <div className="flex items-center gap-2 mt-6 mb-3">
            <span className="text-xs text-ink-muted font-sans">Sort by:</span>
            {(['best', 'new', 'old', 'top', 'controversial'] as CommentSortMode[]).map(mode => (
              <button key={mode} onClick={() => setCommentSort(mode)}
                className={`font-sans text-xs font-semibold px-2 py-1 rounded transition-colors ${commentSort === mode ? 'bg-crimson/10 text-crimson' : 'text-ink-muted hover:text-ink'}`}
              >{mode.charAt(0).toUpperCase() + mode.slice(1)}</button>
            ))}
          </div>

          {/* Comments */}
          <div className="space-y-0">
            {topLevel.map(c => (
              <CommentThread key={c.id} comment={c} allComments={comments} postId={post.id} depth={0} onVote={handleCommentVote} onReply={handleReply} userId={userId} sortMode={commentSort} />
            ))}
            {topLevel.length === 0 && (
              <div className="py-12 text-center">
                <p className="font-display text-sm text-ink-muted">No comments yet</p>
                <p className="font-sans text-xs text-ink-faint mt-1">Be the first to share your analysis.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {community && (
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <CommunityCard community={community} />
          </aside>
        )}
      </div>
    </div>
  )
}


/* ── Community Sidebar Card ───────────────────────────────────── */
function CommunityCard({ community }: { community: Community }) {
  const [showRules, setShowRules] = useState(false)
  return (
    <div className="bg-parchment border border-border rounded overflow-hidden sticky top-4">
      <div className="h-8" style={{ background: community.bannerColor }} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{community.icon}</span>
          <div>
            <h3 className="font-sans text-sm font-bold text-ink">{community.name}</h3>
            <p className="font-sans text-xs text-ink-faint">{community.displayName}</p>
          </div>
        </div>
        <p className="font-body text-xs text-ink-muted leading-relaxed mb-3">{community.longDescription}</p>
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-border text-center">
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(community.memberCount)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint uppercase tracking-wider">Members</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-green-600">{formatNumber(community.onlineCount)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint uppercase tracking-wider">Online</p>
          </div>
        </div>

        {/* Flairs */}
        <div className="mt-3">
          <p className="font-sans text-[0.6rem] font-bold text-ink-muted uppercase tracking-wider mb-1.5">Post Flairs</p>
          <div className="flex flex-wrap gap-1">
            {community.flairs.map(f => (
              <span key={f.id} className="px-2 py-0.5 rounded text-[0.6rem] font-bold" style={{ background: f.bgColor, color: f.textColor }}>{f.text}</span>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="mt-3">
          <button onClick={() => setShowRules(!showRules)} className="font-sans text-[0.6rem] font-bold text-ink-muted uppercase tracking-wider hover:text-ink w-full text-left flex items-center justify-between">
            Rules ({community.rules.length})
            <svg className={`w-3 h-3 transition-transform ${showRules ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </button>
          {showRules && (
            <ol className="mt-2 space-y-2">
              {community.rules.map((r, i) => (
                <li key={i} className="text-xs">
                  <span className="font-sans font-bold text-ink">{i + 1}. {r.title}</span>
                  <p className="font-body text-ink-muted mt-0.5">{r.body}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Moderators */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="font-sans text-[0.6rem] font-bold text-ink-muted uppercase tracking-wider mb-1.5">Moderators</p>
          {community.moderators.map(m => (
            <p key={m} className="font-sans text-xs text-ink hover:text-crimson cursor-pointer">u/{m}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Create Post Modal ────────────────────────────────────────── */
function CreatePostModal({ communities, onClose, onSubmit, defaultCommunity }: {
  communities: Community[]; onClose: () => void; onSubmit: (post: any) => void; defaultCommunity?: string
}) {
  const [postType, setPostType] = useState<PostType>('text')
  const [communityId, setCommunityId] = useState(defaultCommunity || communities[0]?.id || '')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selectedFlair, setSelectedFlair] = useState<PostFlair | undefined>()
  const [pollOptions, setPollOptions] = useState<string[]>(['', ''])
  const community = getCommunity(communityId)

  const handleSubmit = () => {
    if (!title.trim() || !communityId) return
    const post: any = { communityId, type: postType, title: title.trim(), body: body.trim(), author: 'You', postFlair: selectedFlair }
    if (postType === 'poll') {
      post.pollOptions = pollOptions.filter(o => o.trim()).map(o => ({ id: generateId(), text: o.trim(), votes: [] }))
    }
    onSubmit(post)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-12 overflow-y-auto" onClick={onClose}>
      <div className="bg-parchment w-full max-w-3xl rounded shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-lg font-bold text-ink">Create a Post</h2>
          <button onClick={onClose} className="p-1 hover:bg-ink/5 rounded"><CloseIcon /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* Community selector */}
          <select value={communityId} onChange={e => { setCommunityId(e.target.value); setSelectedFlair(undefined) }}
            className="w-full p-2 border border-border rounded bg-white font-sans text-sm">
            {communities.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name} — {c.displayName}</option>)}
          </select>

          {/* Post type tabs */}
          <div className="flex border border-border rounded overflow-hidden">
            {(['text', 'link', 'poll'] as PostType[]).map(t => (
              <button key={t} onClick={() => setPostType(t)}
                className={`flex-1 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors ${postType === t ? 'bg-crimson text-white' : 'bg-parchment text-ink-muted hover:bg-parchment-dark'}`}
              >{t === 'text' ? '📝 Post' : t === 'link' ? '🔗 Link' : '📊 Poll'}</button>
            ))}
          </div>

          {/* Title */}
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" maxLength={300}
            className="w-full p-3 border border-border rounded bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />

          {/* Body */}
          {postType === 'text' && (
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Text (optional)" rows={8}
              className="w-full p-3 border border-border rounded bg-white font-body text-sm resize-y focus:outline-none focus:ring-2 focus:ring-crimson/30" maxLength={40000} />
          )}
          {postType === 'link' && (
            <input type="url" value={body} onChange={e => setBody(e.target.value)} placeholder="URL"
              className="w-full p-3 border border-border rounded bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30" />
          )}
          {postType === 'poll' && (
            <div className="space-y-2">
              <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Description (optional)" rows={3}
                className="w-full p-3 border border-border rounded bg-white font-body text-sm resize-y focus:outline-none focus:ring-2 focus:ring-crimson/30" />
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={opt} onChange={e => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n) }}
                    placeholder={`Option ${i + 1}`} className="flex-1 p-2 border border-border rounded bg-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-crimson/30" />
                  {pollOptions.length > 2 && <button onClick={() => setPollOptions(pollOptions.filter((_, j) => j !== i))} className="text-ink-faint hover:text-red-600 px-2">×</button>}
                </div>
              ))}
              {pollOptions.length < 6 && <button onClick={() => setPollOptions([...pollOptions, ''])} className="text-xs text-crimson font-semibold hover:underline">+ Add option</button>}
            </div>
          )}

          {/* Flair selector */}
          {community && community.flairs.length > 0 && (
            <div>
              <p className="font-sans text-xs text-ink-muted mb-1.5">Post Flair:</p>
              <div className="flex flex-wrap gap-1.5">
                {community.flairs.map(f => (
                  <button key={f.id} onClick={() => setSelectedFlair(selectedFlair?.id === f.id ? undefined : f)}
                    className={`px-2 py-1 rounded text-xs font-bold transition-all ${selectedFlair?.id === f.id ? 'ring-2 ring-ink scale-105' : 'opacity-70 hover:opacity-100'}`}
                    style={{ background: f.bgColor, color: f.textColor }}>{f.text}</button>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="font-sans text-sm text-ink-muted hover:text-ink px-4 py-2">Cancel</button>
            <button onClick={handleSubmit} disabled={!title.trim()} className="font-sans text-sm font-bold uppercase tracking-wider px-6 py-2 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors disabled:opacity-40">Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ── Community List Sidebar ───────────────────────────────────── */
function CommunityListSidebar({ communities, activeCommunity, onSelect, onAllPosts }: {
  communities: Community[]; activeCommunity: string | null; onSelect: (id: string) => void; onAllPosts: () => void
}) {
  return (
    <nav className="space-y-0.5">
      <button onClick={onAllPosts}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${!activeCommunity ? 'bg-crimson/10 text-crimson font-bold' : 'text-ink-muted hover:bg-parchment-dark hover:text-ink'}`}>
        <span className="text-base">🌐</span> All Posts
      </button>
      {communities.map(c => (
        <button key={c.id} onClick={() => onSelect(c.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors text-left ${activeCommunity === c.id ? 'bg-crimson/10 text-crimson font-bold' : 'text-ink-muted hover:bg-parchment-dark hover:text-ink'}`}>
          <span className="text-base flex-shrink-0">{c.icon}</span>
          <div className="min-w-0">
            <span className="block truncate">{c.name}</span>
            <span className="block text-[0.6rem] text-ink-faint truncate">{formatNumber(c.memberCount)} members</span>
          </div>
        </button>
      ))}
    </nav>
  )
}

/* ── Trending Sidebar ─────────────────────────────────────────── */
function TrendingSidebar({ posts }: { posts: ForumPost[] }) {
  const trending = useMemo(() => {
    const recent = posts.filter(p => p.timestamp > Date.now() - 24 * 3600000)
    return recent.sort((a, b) => (b.upvotes.length + b.commentCount) - (a.upvotes.length + a.commentCount)).slice(0, 5)
  }, [posts])

  if (trending.length === 0) return null

  return (
    <div className="bg-parchment border border-border rounded p-4">
      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">🔥 Trending Today</h3>
      <div className="space-y-3">
        {trending.map((p, i) => {
          const community = getCommunity(p.communityId)
          return (
            <div key={p.id} className="flex gap-2">
              <span className="font-mono text-lg font-bold text-ink-faint/40 leading-none">{i + 1}</span>
              <div className="min-w-0">
                <p className="font-sans text-xs font-semibold text-ink leading-snug line-clamp-2">{p.title}</p>
                <p className="font-sans text-[0.6rem] text-ink-faint mt-0.5">{community?.name} · {formatNumber(getScore(p))} pts · {formatNumber(p.commentCount)} comments</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Forum Stats Card ─────────────────────────────────────────── */
function ForumStatsCard() {
  const totalMembers = COMMUNITIES.reduce((s, c) => s + c.memberCount, 0)
  const totalOnline = COMMUNITIES.reduce((s, c) => s + c.onlineCount, 0)
  return (
    <div className="bg-parchment border border-border rounded overflow-hidden">
      <div className="bg-crimson px-4 py-3">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Veritas Forum</h3>
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-ink-muted leading-relaxed mb-3">The community hub for truth-seekers, researchers, and investigators. Discuss The Record, share evidence, and connect with fellow citizens demanding accountability.</p>
        <div className="grid grid-cols-2 gap-3 text-center py-2 border-t border-border">
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(totalMembers)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Total Members</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-green-600">{formatNumber(totalOnline)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Online Now</p>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════════
   MAIN FORUM PAGE — Full-width Reddit-style layout
   ══════════════════════════════════════════════════════════════════ */

export default function ForumPage() {
  const { user, isLoggedIn, setShowAuthModal } = useAuth()
  const userId = user?.email || ''
  const [view, setView] = useState<ForumView>('feed')
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('hot')
  const [topTimeframe, setTopTimeframe] = useState<TopTimeframe>('day')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ForumPost[]>([])
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [posts, setPosts] = useState<ForumPost[]>(() => loadPosts())
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // SEO
  useEffect(() => {
    setMetaTags({
      title: `Community Forum | ${SITE_NAME}`,
      description: 'Discuss the evidence, debate the findings, and connect with researchers investigating power, money, and institutional corruption.',
      url: `${SITE_URL}/forum`,
    })
    setJsonLd({
      '@context': 'https://schema.org', '@type': 'DiscussionForumPosting',
      'name': `Community Forum — ${SITE_NAME}`, 'url': `${SITE_URL}/forum`,
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  // Refresh posts
  const refresh = useCallback(() => setPosts(loadPosts()), [])

  // Filtered & sorted posts
  const displayPosts = useMemo(() => {
    let list = activeCommunity ? posts.filter(p => p.communityId === activeCommunity && !p.removed) : posts.filter(p => !p.removed)
    return sortPosts(list, sortMode, topTimeframe)
  }, [posts, activeCommunity, sortMode, topTimeframe])

  // Active post object
  const activePost = useMemo(() => activePostId ? posts.find(p => p.id === activePostId) : null, [activePostId, posts])

  // Handlers
  const handleVote = (postId: string, dir: VoteDirection) => {
    if (!userId) { setShowAuthModal(true); return }
    votePost(postId, userId, dir)
    refresh()
  }

  const handleSave = (postId: string) => {
    if (!userId) { setShowAuthModal(true); return }
    toggleSavePost(postId, userId)
    refresh()
  }

  const handleOpenPost = (postId: string) => {
    setActivePostId(postId)
    setView('post')
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setActivePostId(null)
    setView('feed')
  }

  const handleCreatePost = (postData: any) => {
    if (!userId) { setShowAuthModal(true); return }
    createPost({ ...postData, author: user?.displayName || userId.split('@')[0] })
    refresh()
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    setSearchResults(searchPosts(searchQuery.trim()))
    setView('search')
  }

  const handleSelectCommunity = (id: string) => {
    setActiveCommunity(id)
    setView('feed')
    setActivePostId(null)
    setShowMobileSidebar(false)
  }

  const activeCommunityObj = activeCommunity ? getCommunity(activeCommunity) : null

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* ── Top Bar ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 py-4 border-b border-border mb-4 flex-wrap">
        {/* Mobile sidebar toggle */}
        <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="lg:hidden p-2 border border-border rounded hover:bg-parchment-dark">
          <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">📰</span>
          <h1 className="font-display text-xl font-bold text-ink">Veritas Forum</h1>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input ref={searchRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Search posts, communities, users..."
              className="w-full pl-9 pr-4 py-2 border border-border rounded-full bg-parchment-dark/30 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-crimson/30 focus:bg-white" />
            <button onClick={handleSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"><SearchIcon /></button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark transition-colors">
              <PlusIcon /> Create Post
            </button>
          ) : (
            <button onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark transition-colors">
              Sign In to Post
            </button>
          )}
        </div>
      </div>

      {/* ── Three-column Layout ──────────────────────────────────── */}
      <div className="flex gap-6 w-full">

        {/* LEFT SIDEBAR — Community Navigation */}
        <aside className={`${showMobileSidebar ? 'fixed inset-0 z-40 bg-black/50 lg:relative lg:bg-transparent' : 'hidden'} lg:block lg:w-56 xl:w-64 flex-shrink-0`}>
          <div className={`${showMobileSidebar ? 'w-72 h-full bg-parchment p-4 overflow-y-auto shadow-2xl' : ''} lg:sticky lg:top-4 lg:w-auto lg:h-auto lg:bg-transparent lg:p-0 lg:shadow-none`}>
            {showMobileSidebar && (
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <span className="font-sans text-sm font-bold text-ink">Communities</span>
                <button onClick={() => setShowMobileSidebar(false)}><CloseIcon /></button>
              </div>
            )}
            <CommunityListSidebar
              communities={COMMUNITIES}
              activeCommunity={activeCommunity}
              onSelect={handleSelectCommunity}
              onAllPosts={() => { setActiveCommunity(null); setView('feed'); setActivePostId(null); setShowMobileSidebar(false) }}
            />
          </div>
        </aside>

        {/* MAIN FEED / POST VIEW */}
        <main className="flex-1 min-w-0">
          {view === 'post' && activePost ? (
            <PostDetail post={activePost} onBack={handleBack} userId={userId} />
          ) : view === 'search' ? (
            /* Search Results */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-ink">Search: "{searchQuery}" — {searchResults.length} results</h2>
                <button onClick={() => { setView('feed'); setSearchQuery('') }} className="text-xs text-ink-muted hover:text-crimson font-sans">Clear search</button>
              </div>
              <div className="space-y-2">
                {searchResults.map(p => (
                  <PostCard key={p.id} post={p} onOpen={handleOpenPost} onVote={handleVote} onSave={handleSave} userId={userId} />
                ))}
                {searchResults.length === 0 && <p className="py-12 text-center font-body text-sm text-ink-muted">No results found.</p>}
              </div>
            </div>
          ) : (
            /* Feed View */
            <div>
              {/* Community header */}
              {activeCommunityObj && (
                <div className="bg-parchment border border-border rounded mb-4 overflow-hidden">
                  <div className="h-16 sm:h-24" style={{ background: activeCommunityObj.bannerColor }} />
                  <div className="px-4 sm:px-6 pb-4 -mt-4 flex items-end gap-3">
                    <span className="text-4xl bg-parchment rounded-full p-2 border-4 border-parchment shadow">{activeCommunityObj.icon}</span>
                    <div className="pb-1">
                      <h2 className="font-display text-xl font-bold text-ink">{activeCommunityObj.displayName}</h2>
                      <p className="font-sans text-xs text-ink-muted">{activeCommunityObj.name} · {formatNumber(activeCommunityObj.memberCount)} members · {formatNumber(activeCommunityObj.onlineCount)} online</p>
                    </div>
                    <div className="ml-auto pb-1">
                      <button className="px-4 py-1.5 border border-crimson text-crimson rounded-full text-xs font-sans font-bold hover:bg-crimson hover:text-white transition-colors">Join</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sort bar */}
              <div className="flex items-center gap-2 mb-4 bg-parchment border border-border rounded px-4 py-2 flex-wrap">
                {(['hot', 'best', 'new', 'top', 'controversial', 'rising'] as SortMode[]).map(mode => (
                  <button key={mode} onClick={() => setSortMode(mode)}
                    className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${sortMode === mode ? 'bg-crimson text-white' : 'text-ink-muted hover:bg-parchment-dark'}`}>
                    {mode === 'hot' ? '🔥' : mode === 'best' ? '⭐' : mode === 'new' ? '🆕' : mode === 'top' ? '📈' : mode === 'controversial' ? '⚡' : '🚀'} {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
                {sortMode === 'top' && (
                  <select value={topTimeframe} onChange={e => setTopTimeframe(e.target.value as TopTimeframe)}
                    className="ml-2 px-2 py-1 border border-border rounded text-xs font-sans bg-white">
                    {(['hour', 'day', 'week', 'month', 'year', 'all'] as TopTimeframe[]).map(t => (
                      <option key={t} value={t}>{t === 'hour' ? 'Past Hour' : t === 'day' ? 'Today' : t === 'week' ? 'This Week' : t === 'month' ? 'This Month' : t === 'year' ? 'This Year' : 'All Time'}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Post list */}
              <div className="space-y-2">
                {displayPosts.map(p => (
                  <PostCard key={p.id} post={p} onOpen={handleOpenPost} onVote={handleVote} onSave={handleSave} userId={userId} />
                ))}
                {displayPosts.length === 0 && (
                  <div className="py-16 text-center bg-parchment border border-border rounded">
                    <p className="font-display text-lg text-ink-muted mb-2">No posts yet</p>
                    <p className="font-body text-sm text-ink-faint mb-4">Be the first to start a discussion.</p>
                    {isLoggedIn && (
                      <button onClick={() => setShowCreatePost(true)} className="inline-flex items-center gap-1.5 px-5 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark">
                        <PlusIcon /> Create Post
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR — Info & Trending */}
        <aside className="hidden xl:block w-72 2xl:w-80 flex-shrink-0 space-y-4">
          {activeCommunityObj ? (
            <CommunityCard community={activeCommunityObj} />
          ) : (
            <ForumStatsCard />
          )}
          <TrendingSidebar posts={posts} />
          {/* Footer links */}
          <div className="bg-parchment border border-border rounded p-4 text-center">
            <p className="font-sans text-[0.6rem] text-ink-faint leading-relaxed">
              Veritas Worldwide Press Forum — Community-driven investigation.
              <br />All claims must be sourced. No party. No agenda. Just the record.
            </p>
          </div>
        </aside>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          communities={COMMUNITIES}
          defaultCommunity={activeCommunity || undefined}
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </div>
  )
}
