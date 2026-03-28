/**
 * Lead Scoring Engine — Unified behavioral tracking for HubSpot + GA4
 *
 * Fires events to both HubSpot (via _hsq) and GA4 (via gtag) simultaneously.
 * Maintains a local lead score in localStorage for client-side personalization
 * (e.g., showing different CTAs based on engagement level).
 *
 * Scoring: Subscriber(10) → Lead(25) → MQL(50+) → Opportunity(70+) → Customer(120+)
 */
import { trackEvent } from './hubspot'
import { recordAnalyticsEvent } from './analytics'

const SCORE_KEY = 'veritas_lead_score'
const ACTIONS_KEY = 'veritas_lead_actions'

/* ── Score weights per the spec ───────────────────────────────── */
const WEIGHTS = {
  email_signup: 10,
  account_created: 15,
  chapter_viewed: 5,
  bookmark_added: 3,
  donation_clicked: 20,
  donation_completed: 50,
  share_clicked: 10,
  search_performed: 2,
  content_gate_hit: 1,
  forum_post: 8,
  pdf_downloaded: 5,
  profile_viewed: 5,
} as const

type ScoringAction = keyof typeof WEIGHTS

/* ── Lifecycle stage thresholds ────────────────────────────────── */
export type LifecycleStage = 'visitor' | 'subscriber' | 'lead' | 'mql' | 'opportunity' | 'customer' | 'evangelist'

function getStage(score: number, shareCount: number): LifecycleStage {
  if (shareCount >= 3) return 'evangelist'
  if (score >= 120) return 'customer'
  if (score >= 70) return 'opportunity'
  if (score >= 50) return 'mql'
  if (score >= 25) return 'lead'
  if (score >= 10) return 'subscriber'
  return 'visitor'
}

/* ── Local state ──────────────────────────────────────────────── */
interface LeadState {
  score: number
  stage: LifecycleStage
  chaptersViewed: string[]
  shares: number
  lastActivity: string
}

function loadState(): LeadState {
  try {
    const raw = localStorage.getItem(SCORE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { score: 0, stage: 'visitor', chaptersViewed: [], shares: 0, lastActivity: new Date().toISOString() }
}

function saveState(state: LeadState): void {
  try { localStorage.setItem(SCORE_KEY, JSON.stringify(state)) } catch {}
}

function logAction(action: ScoringAction, props?: Record<string, string>): void {
  try {
    const raw = localStorage.getItem(ACTIONS_KEY)
    const actions: Array<{ action: string; ts: string; props?: Record<string, string> }> = raw ? JSON.parse(raw) : []
    actions.push({ action, ts: new Date().toISOString(), props })
    // Keep last 100 actions
    if (actions.length > 100) actions.splice(0, actions.length - 100)
    localStorage.setItem(ACTIONS_KEY, JSON.stringify(actions))
  } catch {}
}

/* ── Core scoring function ────────────────────────────────────── */
function score(action: ScoringAction, props?: Record<string, string>): LeadState {
  const state = loadState()
  state.score += WEIGHTS[action]
  state.lastActivity = new Date().toISOString()

  if (action === 'share_clicked') state.shares++
  if (action === 'chapter_viewed' && props?.chapter_id) {
    if (!state.chaptersViewed.includes(props.chapter_id)) {
      state.chaptersViewed.push(props.chapter_id)
    }
  }

  state.stage = getStage(state.score, state.shares)
  saveState(state)
  logAction(action, props)

  // Fire to HubSpot
  trackEvent(action, {
    ...props,
    lead_score: String(state.score),
    lifecycle_stage: state.stage,
    chapters_read: String(state.chaptersViewed.length),
  })
  recordAnalyticsEvent(action, props)

  return state
}

/* ── Public API ────────────────────────────────────────────────── */
export function scoreEmailSignup(source: string): LeadState {
  return score('email_signup', { source })
}

export function scoreAccountCreated(): LeadState {
  return score('account_created')
}

export function scoreChapterViewed(chapterId: string, chapterTitle: string): LeadState {
  return score('chapter_viewed', { chapter_id: chapterId, chapter_title: chapterTitle })
}

export function scoreBookmarkAdded(chapterId: string): LeadState {
  return score('bookmark_added', { chapter_id: chapterId })
}

export function scoreDonationClicked(tier: string): LeadState {
  return score('donation_clicked', { tier })
}

export function scoreDonationCompleted(amount: string): LeadState {
  return score('donation_completed', { amount })
}

export function scoreShareClicked(platform: string, contentId: string): LeadState {
  return score('share_clicked', { platform, content_id: contentId })
}

export function scoreSearchPerformed(query: string): LeadState {
  return score('search_performed', { query })
}

export function scoreContentGateHit(chapterId: string): LeadState {
  return score('content_gate_hit', { chapter_id: chapterId })
}

export function scoreForumPost(topicId: string): LeadState {
  return score('forum_post', { topic_id: topicId })
}

export function scorePdfDownloaded(chapterId: string): LeadState {
  return score('pdf_downloaded', { chapter_id: chapterId })
}

export function scoreProfileViewed(profileId: string): LeadState {
  return score('profile_viewed', { profile_id: profileId })
}

/** Get current lead state without modifying it */
export function getLeadState(): LeadState {
  return loadState()
}

/** Get lifecycle stage string */
export function getLifecycleStage(): LifecycleStage {
  return loadState().stage
}

/** Check if user is at or above a given engagement threshold */
export function isEngaged(minStage: LifecycleStage = 'mql'): boolean {
  const stages: LifecycleStage[] = ['visitor', 'subscriber', 'lead', 'mql', 'opportunity', 'customer', 'evangelist']
  const current = stages.indexOf(loadState().stage)
  const target = stages.indexOf(minStage)
  return current >= target
}
