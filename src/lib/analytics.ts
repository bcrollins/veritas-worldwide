// ── Types ──────────────────────────────────────────────────────────
export type AnalyticsEventName =
  | 'email_signup'
  | 'account_created'
  | 'chapter_viewed'
  | 'bookmark_added'
  | 'donation_clicked'
  | 'donation_completed'
  | 'share_clicked'
  | 'search_performed'
  | 'content_gate_hit'
  | 'forum_post'
  | 'pdf_downloaded'
  | 'profile_viewed'
  | 'checkout_started'
  | 'donation_started'
  | 'payment_completed'

export interface AnalyticsSnapshot {
  lifetime: number
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  countries: CountryViews[]
  dailyTrend: DailyViews[]
  topPages: PageViews[]
  eventCounts: Partial<Record<AnalyticsEventName, number>>
  topEvents: AnalyticsEventSummary[]
  eventTrend: EventTrendPoint[]
  funnel: FunnelSnapshot
}

export interface CountryViews {
  country: string
  code: string
  views: number
}

export interface DailyViews {
  date: string
  views: number
}

export interface PageViews {
  path: string
  title: string
  views: number
}

export interface AnalyticsEventSummary {
  name: AnalyticsEventName
  count: number
  lastSeenAt: string
  lastPath: string
}

export interface EventTrendPoint {
  date: string
  chapterViews: number
  signups: number
  checkoutStarts: number
  payments: number
}

export interface FunnelSnapshot {
  chapterViews: number
  gateHits: number
  signups: number
  checkoutStarts: number
  payments: number
  shares: number
  bookmarks: number
  searches: number
  pdfDownloads: number
  profiles: number
}

// ── Always configured (server-side analytics) ─────────────────────
export const isConfigured = true

// ── Record a page view ─────────────────────────────────────────────
export async function recordPageView(path: string, title: string): Promise<void> {
  try {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, title }),
    })
  } catch {
    // Silent fail — analytics should never block the user experience
  }
}

// ── Record a behavioral event ──────────────────────────────────────
export function recordAnalyticsEvent(
  name: AnalyticsEventName,
  properties?: Record<string, string>
): void {
  if (typeof window === 'undefined') return

  void fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      path: window.location.pathname,
      properties,
    }),
    keepalive: true,
  }).catch(() => {
    // Silent fail — analytics should never block the user experience
  })
}

// ── Fetch analytics snapshot ───────────────────────────────────────
export async function fetchAnalytics(): Promise<AnalyticsSnapshot | null> {
  try {
    // Cache-bust to ensure fresh cumulative data on every load
    const res = await fetch(`/api/analytics/snapshot?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    })
    if (!res.ok) return null
    const data: AnalyticsSnapshot = await res.json()
    return data
  } catch {
    return null
  }
}
