/**
 * ForumPage.tsx — Full Reddit-style community forum for Veritas Worldwide.
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
  loadPosts, savePosts, createPost, votePost, toggleSavePost, awardPost,
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

/* ── Forum Icon Component ─────────────────────────────────────── */
const ICON_PATHS: Record<string, string> = {
  fire: 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 9.2 8 9.2s8-4.22 8-9.2c0-3.32-2.67-7.25-8-11.8z',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  new: 'M13 10H3v2h10v-2zm0-4H3v2h10V6zm0 8H3v2h10v-2zM3 16h10v-2H3v2z',
  trending: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 10 11.41l4 4 6.3-6.29L22 12v-6z',
  thunder: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  rocket: 'M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm7-7.5V2c0-.55-.45-1-1-1h-1V1c0-1.66-1.34-3-3-3s-3 1.34-3 3v1H6c-.55 0-1 .45-1 1v2.5C3.59 6.71 2.5 8.44 2.5 10.5c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-2.06-1.09-3.79-2.75-4.75z',
  newspaper: 'M5 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5zm0 2h14v10H5V5zm0 12h14v2H5v-2zm2-6h10v2H7v-2zm0 4h10v2H7v-2z',
  building: 'M12 7V3H2v18h20V7h-10zm7 12h-5v-5h5v5z',
  eye: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  beaker: 'M9 2H7.17C6.6 2 6 2.6 6 3.17V4h12V3.17C18 2.6 17.4 2 16.83 2H15v2h-2V2h-2v2H9V2z',
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  scale: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V5h2v12zm4 0h-2v-4h2v4z',
  signal: 'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z',
  shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
  chatbubble: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
  search: 'M15.5 1h-8C6.12 1 5 2.12 5 3.5v5C5 9.88 6.12 11 7.5 11h8c1.38 0 2.5-1.12 2.5-2.5v-5C18 2.12 16.88 1 15.5 1zm-4 6.5s-2.49-1.45-4.5-4.5c.71 3.71 4.7 5.85 4.5 4.5z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
  layers: 'M12 16.5L5.5 13V7.5L12 10.5l6.5-3V13l-6.5 3.5M12 12L5.5 9l6.5-4 6.5 4-6.5 3M12 2L5.5 5l6.5 4 6.5-4L12 2z',
  megaphone: 'M3 11h3v2H3v-2zm3-4H3v2h3V7zm0 8H3v2h3v-2zm4-14v14h3V3H10zm7 0c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 2h3v10h-3V3z',
  banknotes: 'M20 8H4V6h16m0 12H4v2h16m0-6H4v2h16z',
  bolt: 'M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9h-3V2zm-2 16h-2v-3H7l5-6v9zm2-11h3V2h-3v5z',
  trophy: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5h3V9h4v3h3l-5 5z',
}

function ForumIcon({ name, className }: { name: string; className?: string }) {
  const pathData = ICON_PATHS[name] || ICON_PATHS.search
  return (
    <svg className={className || 'w-4 h-4'} fill="currentColor" viewBox="0 0 24 24">
      <path d={pathData} />
    </svg>
  )
}

/* ── View Types ───────────────────────────────────────────────── */
type ForumView = 'feed' | 'community' | 'post' | 'create' | 'search' | 'saved'
type CommentSortMode = 'best' | 'new' | 'old' | 'controversial' | 'top'
type CommunityActivity = { postCount: number; commentCount: number; contributorCount: number }
type ReportTarget = { targetType: 'post' | 'comment'; targetId: string; label: string }

const EMPTY_COMMUNITY_ACTIVITY: CommunityActivity = { postCount: 0, commentCount: 0, contributorCount: 0 }

function pluralize(count: number, singular: string, plural = `${singular}s`) {
  const label = count === 1 ? singular : plural
  return `${formatNumber(count)} ${label}`
}

function buildCommunityActivityMap(posts: ForumPost[]) {
  const raw = new Map<string, { postCount: number; commentCount: number; contributors: Set<string> }>()
  posts.forEach(post => {
    const current = raw.get(post.communityId) || { postCount: 0, commentCount: 0, contributors: new Set<string>() }
    current.postCount += 1
    current.commentCount += post.commentCount
    if (post.author.trim()) current.contributors.add(post.author.trim().toLowerCase())
    raw.set(post.communityId, current)
  })
  return new Map<string, CommunityActivity>(
    Array.from(raw.entries()).map(([communityId, value]) => [communityId, {
      postCount: value.postCount,
      commentCount: value.commentCount,
      contributorCount: value.contributors.size,
    }]),
  )
}

function getCommunityActivity(activityMap: Map<string, CommunityActivity>, communityId: string | null | undefined) {
  if (!communityId) return EMPTY_COMMUNITY_ACTIVITY
  return activityMap.get(communityId) || EMPTY_COMMUNITY_ACTIVITY
}

function getCommunitySidebarLabel(activity: CommunityActivity) {
  if (activity.postCount === 0) return 'Local beta'
  if (activity.commentCount === 0) return pluralize(activity.postCount, 'local post')
  return `${pluralize(activity.postCount, 'post')} · ${pluralize(activity.commentCount, 'comment')}`
}

function getCommunityHeaderLabel(activity: CommunityActivity) {
  if (activity.postCount === 0) return 'Local beta · no posts yet'
  return `${pluralize(activity.postCount, 'local post')} · ${pluralize(activity.commentCount, 'comment')}`
}

function ForumTruthNotice() {
  return (
    <div className="mb-4 rounded border border-crimson/20 bg-parchment px-4 py-3 shadow-sm">
      <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.24em] text-crimson">Reader Beta</p>
      <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">
        This forum currently stores discussion on this device only while live moderation, persistent community data, and approved-member workflows are still being built.
      </p>
    </div>
  )
}

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
            {community && <span className="font-sans font-bold text-ink hover:underline"><ForumIcon name={community.icon} className="w-4 h-4 inline mr-1" /> {community.name}</span>}
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
function CommentThread({ comment, allComments, postId, depth, onVote, onReply, onReport, userId, sortMode }: {
  comment: ForumComment; allComments: ForumComment[]; postId: string; depth: number
  onVote: (id: string, dir: VoteDirection) => void; onReply: (parentId: string, content: string) => void
  onReport: (comment: ForumComment) => void; userId: string; sortMode: CommentSortMode
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
              <button onClick={() => onReport(comment)} className="hover:text-ink transition-colors flex items-center gap-1"><ReportIcon /> Report</button>
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
              <CommentThread key={reply.id} comment={reply} allComments={allComments} postId={postId} depth={depth + 1} onVote={onVote} onReply={onReply} onReport={onReport} userId={userId} sortMode={sortMode} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}


/* ── Post Detail View ─────────────────────────────────────────── */
function PostDetail({ post, onBack, userId, actorLabel, onPostChange, onRequireAuth }: {
  post: ForumPost; onBack: () => void; userId: string; actorLabel: string; onPostChange: () => void; onRequireAuth: () => void
}) {
  const [comments, setComments] = useState<ForumComment[]>(() => loadComments(post.id))
  const [commentSort, setCommentSort] = useState<CommentSortMode>('best')
  const [newComment, setNewComment] = useState('')
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const [showAwardModal, setShowAwardModal] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const community = getCommunity(post.communityId)
  const communityActivity = useMemo(
    () => getCommunityActivity(buildCommunityActivityMap(getPostsForCommunity(post.communityId)), post.communityId),
    [post.communityId],
  )
  const score = getScore(post)
  const hasUpvoted = post.upvotes.includes(userId)
  const hasDownvoted = post.downvotes.includes(userId)
  const isSaved = post.saved.includes(userId)
  const totalAwards = post.awards.reduce((sum, a) => sum + a.count, 0)
  const topLevel = useMemo(() => sortComments(comments.filter(c => !c.parentId && !c.deleted), commentSort), [comments, commentSort])
  const totalVotes = post.pollOptions?.reduce((sum, o) => sum + o.votes.length, 0) || 0

  useEffect(() => {
    if (!statusMessage) return undefined
    const timeoutId = window.setTimeout(() => setStatusMessage(null), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [statusMessage])

  const refresh = () => {
    setComments(loadComments(post.id))
    onPostChange()
  }

  const handlePostVote = (dir: Exclude<VoteDirection, null>) => {
    if (!userId) { onRequireAuth(); return }
    const nextDirection = dir === 'up' ? (hasUpvoted ? null : 'up') : (hasDownvoted ? null : 'down')
    votePost(post.id, userId, nextDirection)
    onPostChange()
  }

  const handlePostSave = () => {
    if (!userId) { onRequireAuth(); return }
    toggleSavePost(post.id, userId)
    onPostChange()
  }

  const handlePostAward = (awardId: string) => {
    if (!userId) { onRequireAuth(); return }
    const award = AWARDS.find(entry => entry.id === awardId)
    awardPost(post.id, awardId, actorLabel)
    setShowAwardModal(false)
    setStatusMessage(award ? `${award.name} saved locally for this thread.` : 'Local award saved.')
    onPostChange()
  }

  const openReport = (targetType: 'post' | 'comment', targetId: string, label: string) => {
    if (!userId) { onRequireAuth(); return }
    setReportTarget({ targetType, targetId, label })
  }

  const handleReportSubmit = (reason: ReportReason, details: string) => {
    if (!reportTarget) return
    submitReport({
      targetType: reportTarget.targetType,
      targetId: reportTarget.targetId,
      communityId: post.communityId,
      reporter: actorLabel,
      reason,
      details,
    })
    setStatusMessage(`Saved a local ${reason} report for ${reportTarget.label}.`)
    setReportTarget(null)
  }

  const handleCommentVote = (commentId: string, dir: VoteDirection) => {
    if (!userId) { onRequireAuth(); return }
    voteComment(commentId, userId, dir)
    refresh()
  }

  const handleReply = (parentId: string, content: string) => {
    if (!userId) { onRequireAuth(); return }
    createComment({ postId: post.id, parentId, author: actorLabel, content })
    refresh()
  }

  const handleTopLevelComment = () => {
    if (!newComment.trim()) return
    if (!userId) { onRequireAuth(); return }
    createComment({ postId: post.id, parentId: null, author: actorLabel, content: newComment.trim() })
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
              {community && <span className="font-bold text-ink"><ForumIcon name={community.icon} className="w-4 h-4 inline mr-1" /> {community.name}</span>}
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
                <button onClick={() => handlePostVote('up')} className="p-1"><UpArrow active={hasUpvoted} /></button>
                <span className={`font-mono font-bold ${score > 0 ? 'text-crimson' : score < 0 ? 'text-blue-600' : ''}`}>{formatNumber(score)}</span>
                <button onClick={() => handlePostVote('down')} className="p-1"><DownArrow active={hasDownvoted} /></button>
              </div>
              <span className="flex items-center gap-1"><CommentIcon /> {comments.filter(c => !c.deleted).length} comments</span>
              <button onClick={handlePostSave} className={`flex items-center gap-1 hover:text-crimson ${isSaved ? 'text-crimson' : ''}`}><BookmarkIcon filled={isSaved} /> {isSaved ? 'Saved' : 'Save'}</button>
              <button className="flex items-center gap-1 hover:text-ink"><ShareIcon /> Share</button>
              <button onClick={() => setShowAwardModal(true)} className="flex items-center gap-1 hover:text-yellow-600"><AwardIcon /> Award</button>
              <button onClick={() => openReport('post', post.id, 'this thread')} className="flex items-center gap-1 hover:text-red-600"><ReportIcon /> Report</button>
            </div>
            {statusMessage && (
              <p className="mt-3 rounded border border-border bg-white px-3 py-2 font-sans text-xs leading-relaxed text-ink-muted">{statusMessage}</p>
            )}
          </article>

          {/* Comment composer */}
          {userId && !post.locked ? (
            <div className="mt-4 bg-parchment border border-border rounded p-4">
              <p className="text-xs text-ink-muted mb-2">Comment as <span className="font-bold text-ink">{actorLabel}</span></p>
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
              <CommentThread
                key={c.id}
                comment={c}
                allComments={comments}
                postId={post.id}
                depth={0}
                onVote={handleCommentVote}
                onReply={handleReply}
                onReport={(comment) => openReport('comment', comment.id, `comment by ${comment.author}`)}
                userId={userId}
                sortMode={commentSort}
              />
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
            <CommunityCard community={community} activity={communityActivity} />
          </aside>
        )}
      </div>

      {showAwardModal && <AwardModal onClose={() => setShowAwardModal(false)} onSubmit={handlePostAward} />}
      {reportTarget && <ReportModal target={reportTarget} onClose={() => setReportTarget(null)} onSubmit={handleReportSubmit} />}
    </div>
  )
}


/* ── Community Sidebar Card ───────────────────────────────────── */
function CommunityCard({ community, activity }: { community: Community; activity: CommunityActivity }) {
  const [showRules, setShowRules] = useState(false)
  return (
    <div className="bg-parchment border border-border rounded overflow-hidden sticky top-4">
      <div className="h-8" style={{ background: community.bannerColor }} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <ForumIcon name={community.icon} className="w-8 h-8" />
          <div>
            <h3 className="font-sans text-sm font-bold text-ink">{community.name}</h3>
            <p className="font-sans text-xs text-ink-faint">{community.displayName}</p>
          </div>
        </div>
        <p className="font-body text-xs text-ink-muted leading-relaxed mb-3">{community.longDescription}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center rounded-full border border-crimson/20 bg-crimson/5 px-2 py-0.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-crimson">Local beta</span>
          <span className="inline-flex items-center rounded-full border border-border bg-white px-2 py-0.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ink-muted">
            {community.restricted ? 'Read-only in beta' : 'Open posting'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-border text-center">
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(activity.postCount)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint uppercase tracking-wider">Local Posts</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(activity.commentCount)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint uppercase tracking-wider">Comments</p>
          </div>
        </div>
        <p className="mt-3 font-sans text-[0.65rem] leading-relaxed text-ink-faint">
          Activity reflects this browser&apos;s saved forum state, not a shared live audience.
        </p>

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
  const postableCommunities = communities.filter(c => !c.restricted)
  const initialCommunityId = defaultCommunity && !getCommunity(defaultCommunity)?.restricted
    ? defaultCommunity
    : postableCommunities[0]?.id || communities[0]?.id || ''
  const [postType, setPostType] = useState<PostType>('text')
  const [communityId, setCommunityId] = useState(initialCommunityId)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selectedFlair, setSelectedFlair] = useState<PostFlair | undefined>()
  const [pollOptions, setPollOptions] = useState<string[]>(['', ''])
  const community = getCommunity(communityId)

  const handleSubmit = () => {
    if (!title.trim() || !communityId || community?.restricted) return
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
            {communities.map(c => (
              <option key={c.id} value={c.id} disabled={c.restricted}>
                {c.name} — {c.displayName}{c.restricted ? ' (Read-only beta)' : ''}
              </option>
            ))}
          </select>
          {community?.restricted && (
            <p className="rounded border border-yellow-200 bg-yellow-50 px-3 py-2 font-sans text-xs leading-relaxed text-yellow-800">
              Posting to this room is disabled in beta until approved-member workflows exist.
            </p>
          )}

          {/* Post type tabs */}
          <div className="flex border border-border rounded overflow-hidden">
            {(['text', 'link', 'poll'] as PostType[]).map(t => (
              <button key={t} onClick={() => setPostType(t)}
                className={`flex-1 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors ${postType === t ? 'bg-crimson text-white' : 'bg-parchment text-ink-muted hover:bg-parchment-dark'}`}
              >{t === 'text' ? <><ForumIcon name="newspaper" className="w-3 h-3 inline mr-1" /> Post</> : t === 'link' ? <><ForumIcon name="layers" className="w-3 h-3 inline mr-1" /> Link</> : <><ForumIcon name="trending" className="w-3 h-3 inline mr-1" /> Poll</>}</button>
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
            <button onClick={handleSubmit} disabled={!title.trim() || community?.restricted} className="font-sans text-sm font-bold uppercase tracking-wider px-6 py-2 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors disabled:opacity-40">Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Award Modal ─────────────────────────────────────────────── */
function AwardModal({ onClose, onSubmit }: {
  onClose: () => void; onSubmit: (awardId: string) => void
}) {
  const [selectedAwardId, setSelectedAwardId] = useState(AWARDS[0]?.id || '')

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-12 overflow-y-auto" onClick={onClose}>
      <div className="bg-parchment w-full max-w-2xl rounded shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Add Local Appreciation</h2>
            <p className="mt-1 font-sans text-xs text-ink-faint">Saved on this device only while shared identity and karma rules are still in beta.</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-ink/5 rounded"><CloseIcon /></button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {AWARDS.map(award => (
              <button
                key={award.id}
                onClick={() => setSelectedAwardId(award.id)}
                className={`rounded border p-4 text-left transition-colors ${selectedAwardId === award.id ? 'border-crimson bg-crimson/5' : 'border-border hover:border-ink/25 hover:bg-white'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-display text-2xl text-ink">{award.icon}</span>
                  <div>
                    <p className="font-sans text-sm font-bold text-ink">{award.name}</p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-ink-muted">{award.description}</p>
                    <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">{award.cost} beta karma</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded border border-border bg-white px-4 py-3">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-muted">Beta note</p>
            <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">
              Awards are decorative local reactions in the current beta. They do not spend shared karma or notify a live moderation system yet.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="font-sans text-sm text-ink-muted hover:text-ink px-4 py-2">Cancel</button>
            <button onClick={() => onSubmit(selectedAwardId)} disabled={!selectedAwardId} className="font-sans text-sm font-bold uppercase tracking-wider px-6 py-2 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors disabled:opacity-40">
              Add Award
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Report Modal ────────────────────────────────────────────── */
function ReportModal({ target, onClose, onSubmit }: {
  target: ReportTarget; onClose: () => void; onSubmit: (reason: ReportReason, details: string) => void
}) {
  const [reason, setReason] = useState<ReportReason>('misinformation')
  const [details, setDetails] = useState('')

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-12 overflow-y-auto" onClick={onClose}>
      <div className="bg-parchment w-full max-w-xl rounded shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Submit Local Report</h2>
            <p className="mt-1 font-sans text-xs text-ink-faint">{target.label}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-ink/5 rounded"><CloseIcon /></button>
        </div>

        <div className="p-6 space-y-4">
          <div className="rounded border border-border bg-white px-4 py-3">
            <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-muted">Beta note</p>
            <p className="mt-1 font-body text-sm leading-relaxed text-ink-muted">
              Reports are stored on this device only for now. They help shape moderation workflows before a shared review queue exists.
            </p>
          </div>

          <label className="block">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Reason</span>
            <select value={reason} onChange={e => setReason(e.target.value as ReportReason)} className="mt-2 w-full rounded border border-border bg-white p-3 font-sans text-sm text-ink">
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="misinformation">Misinformation</option>
              <option value="off-topic">Off-topic</option>
              <option value="doxxing">Doxxing</option>
              <option value="violence">Violence</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="block">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Notes</span>
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="Add context for the local moderation log (optional)."
              rows={5}
              maxLength={2000}
              className="mt-2 w-full rounded border border-border bg-white p-3 font-body text-sm text-ink resize-y focus:outline-none focus:ring-2 focus:ring-crimson/30"
            />
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="font-sans text-sm text-ink-muted hover:text-ink px-4 py-2">Cancel</button>
            <button onClick={() => onSubmit(reason, details.trim())} className="font-sans text-sm font-bold uppercase tracking-wider px-6 py-2 bg-crimson text-white rounded hover:bg-crimson-dark transition-colors">
              Save Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Community List Sidebar ───────────────────────────────────── */
function CommunityListSidebar({ communities, activeCommunity, onSelect, onAllPosts, activityMap }: {
  communities: Community[]; activeCommunity: string | null; onSelect: (id: string) => void; onAllPosts: () => void; activityMap: Map<string, CommunityActivity>
}) {
  return (
    <nav className="space-y-0.5">
      <button onClick={onAllPosts}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors ${!activeCommunity ? 'bg-crimson/10 text-crimson font-bold' : 'text-ink-muted hover:bg-parchment-dark hover:text-ink'}`}>
        <span className="text-base">🌐</span> All Posts
      </button>
      {communities.map(c => {
        const activity = getCommunityActivity(activityMap, c.id)
        return (
        <button key={c.id} onClick={() => onSelect(c.id)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-sans transition-colors text-left ${activeCommunity === c.id ? 'bg-crimson/10 text-crimson font-bold' : 'text-ink-muted hover:bg-parchment-dark hover:text-ink'}`}>
          <ForumIcon name={c.icon} className="w-4 h-4 flex-shrink-0" />
          <div className="min-w-0">
            <span className="block truncate">{c.name}</span>
            <span className="block text-[0.6rem] text-ink-faint truncate">{getCommunitySidebarLabel(activity)}</span>
          </div>
        </button>
        )
      })}
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
      <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink-muted mb-3"><ForumIcon name="fire" className="w-4 h-4 inline mr-1" /> Trending Today</h3>
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
function ForumStatsCard({ posts, communities }: { posts: ForumPost[]; communities: Community[] }) {
  const totalComments = posts.reduce((sum, post) => sum + post.commentCount, 0)
  const activeCommunities = new Set(posts.map(post => post.communityId)).size
  const contributors = new Set(posts.map(post => post.author.trim().toLowerCase()).filter(Boolean)).size
  return (
    <div className="bg-parchment border border-border rounded overflow-hidden">
      <div className="bg-crimson px-4 py-3">
        <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">Veritas Forum Beta</h3>
      </div>
      <div className="p-4">
        <p className="font-body text-xs text-ink-muted leading-relaxed mb-3">Local reader sandbox for archive discussion. Threads live in this browser until shared moderation, persistence, and community identity are production-ready.</p>
        <div className="grid grid-cols-2 gap-3 text-center py-2 border-t border-border">
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(posts.length)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Local Posts</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(totalComments)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Comments</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(activeCommunities)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Active Rooms</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-ink">{formatNumber(contributors)}</p>
            <p className="font-sans text-[0.6rem] text-ink-faint">Contributors</p>
          </div>
        </div>
        <p className="mt-3 font-sans text-[0.65rem] leading-relaxed text-ink-faint">
          {communities.length} discussion rooms are mapped, but only rooms with local posts appear active.
        </p>
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
      title: `Community Forum Beta | ${SITE_NAME}`,
      description: 'A local beta forum for discussing evidence, testing reader workflows, and drafting archive conversation features before the live community stack ships.',
      url: `${SITE_URL}/forum`,
    })
    setJsonLd({
      '@context': 'https://schema.org', '@type': 'DiscussionForumPosting',
      'name': `Community Forum Beta — ${SITE_NAME}`, 'url': `${SITE_URL}/forum`,
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
  const communityActivityMap = useMemo(() => buildCommunityActivityMap(posts), [posts])
  const activeCommunityActivity = useMemo(
    () => getCommunityActivity(communityActivityMap, activeCommunityObj?.id),
    [communityActivityMap, activeCommunityObj],
  )
  const canPostInActiveCommunity = !activeCommunityObj || !activeCommunityObj.restricted

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
          <h1 className="font-display text-xl font-bold text-ink">Veritas Forum Beta</h1>
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
              <PlusIcon /> Start Thread
            </button>
          ) : (
            <button onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark transition-colors">
              Sign In to Post
            </button>
          )}
        </div>
      </div>

      <ForumTruthNotice />

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
              activityMap={communityActivityMap}
            />
          </div>
        </aside>

        {/* MAIN FEED / POST VIEW */}
        <main className="flex-1 min-w-0">
          {view === 'post' && activePost ? (
            <PostDetail
              post={activePost}
              onBack={handleBack}
              userId={userId}
              actorLabel={user?.displayName || userId.split('@')[0] || 'Reader'}
              onPostChange={refresh}
              onRequireAuth={() => setShowAuthModal(true)}
            />
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
                    <span className="flex h-16 w-16 items-center justify-center bg-parchment rounded-full p-2 border-4 border-parchment shadow">
                      <ForumIcon name={activeCommunityObj.icon} className="h-8 w-8 text-ink" />
                    </span>
                    <div className="pb-1">
                      <h2 className="font-display text-xl font-bold text-ink">{activeCommunityObj.displayName}</h2>
                      <p className="font-sans text-xs text-ink-muted">
                        {activeCommunityObj.name} · {getCommunityHeaderLabel(activeCommunityActivity)} · {activeCommunityObj.restricted ? 'Read-only beta' : 'Open posting'}
                      </p>
                    </div>
                    <div className="ml-auto pb-1">
                      <button
                        onClick={() => {
                          if (activeCommunityObj.restricted) return
                          if (isLoggedIn) setShowCreatePost(true)
                          else setShowAuthModal(true)
                        }}
                        disabled={!canPostInActiveCommunity}
                        className="px-4 py-1.5 border border-crimson text-crimson rounded-full text-xs font-sans font-bold hover:bg-crimson hover:text-white transition-colors disabled:border-border disabled:text-ink-faint disabled:hover:bg-transparent disabled:hover:text-ink-faint"
                      >
                        {activeCommunityObj.restricted ? 'Read-only beta' : isLoggedIn ? 'Start Thread' : 'Sign In to Post'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sort bar */}
              <div className="flex items-center gap-2 mb-4 bg-parchment border border-border rounded px-4 py-2 flex-wrap">
                {(['hot', 'best', 'new', 'top', 'controversial', 'rising'] as SortMode[]).map(mode => (
                  <button key={mode} onClick={() => setSortMode(mode)}
                    className={`font-sans text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${sortMode === mode ? 'bg-crimson text-white' : 'text-ink-muted hover:bg-parchment-dark'}`}>
                    <ForumIcon name={mode === 'hot' ? 'fire' : mode === 'best' ? 'star' : mode === 'new' ? 'new' : mode === 'top' ? 'trending' : mode === 'controversial' ? 'thunder' : 'rocket'} className="w-3 h-3 inline mr-1" /> {mode.charAt(0).toUpperCase() + mode.slice(1)}
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
                    <p className="font-display text-lg text-ink-muted mb-2">No local posts yet</p>
                    <p className="mx-auto max-w-2xl font-body text-sm text-ink-faint mb-4 leading-relaxed">
                      This beta forum keeps discussion on this device while the shared community stack is still under construction.
                      {activeCommunityObj?.restricted ? ' This room stays read-only until approved-member workflows exist.' : ' Start the first thread here or keep moving through the archive.'}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {!activeCommunityObj?.restricted && (
                        isLoggedIn ? (
                          <button onClick={() => setShowCreatePost(true)} className="inline-flex items-center gap-1.5 px-5 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark">
                            <PlusIcon /> Start Thread
                          </button>
                        ) : (
                          <button onClick={() => setShowAuthModal(true)} className="inline-flex items-center gap-1.5 px-5 py-2 bg-crimson text-white rounded font-sans text-xs font-bold uppercase tracking-wider hover:bg-crimson-dark">
                            Sign In to Post
                          </button>
                        )
                      )}
                      <a href="/read" className="inline-flex items-center rounded border border-border px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-ink/30 hover:bg-parchment-dark">
                        Continue Reading
                      </a>
                      <a href="/sources" className="inline-flex items-center rounded border border-border px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink hover:border-ink/30 hover:bg-parchment-dark">
                        Review Sources
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR — Info & Trending */}
        <aside className="hidden xl:block w-72 2xl:w-80 flex-shrink-0 space-y-4">
          {activeCommunityObj ? (
            <CommunityCard community={activeCommunityObj} activity={activeCommunityActivity} />
          ) : (
            <ForumStatsCard posts={posts} communities={COMMUNITIES} />
          )}
          <TrendingSidebar posts={posts} />
          {/* Footer links */}
          <div className="bg-parchment border border-border rounded p-4 text-center">
            <p className="font-sans text-[0.6rem] text-ink-faint leading-relaxed">
              Veritas Worldwide Forum Beta — device-local discussion while the live community stack is under construction.
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
