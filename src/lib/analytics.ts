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
  signupAttribution: SignupAttributionSnapshot
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

export interface SignupAttributionEntry {
  label: string
  count: number
  lastSeenAt: string
  lastPath: string
}

export interface SignupAttributionSnapshot {
  total: number
  instituteSignups: number
  sources: SignupAttributionEntry[]
  interests: SignupAttributionEntry[]
  returnPaths: SignupAttributionEntry[]
}

function normalizeSignupAttributionEntry(value: unknown): SignupAttributionEntry | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null

  const entry = value as Partial<SignupAttributionEntry>

  return {
    label: typeof entry.label === 'string' ? entry.label : '',
    count: typeof entry.count === 'number' && Number.isFinite(entry.count) ? entry.count : 0,
    lastSeenAt: typeof entry.lastSeenAt === 'string' ? entry.lastSeenAt : '',
    lastPath: typeof entry.lastPath === 'string' ? entry.lastPath : '',
  }
}

function normalizeSignupAttributionSnapshot(value: unknown): SignupAttributionSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      total: 0,
      instituteSignups: 0,
      sources: [],
      interests: [],
      returnPaths: [],
    }
  }

  const snapshot = value as Partial<SignupAttributionSnapshot>
  const normalizeList = (entries: unknown) =>
    Array.isArray(entries) ? entries.map(normalizeSignupAttributionEntry).filter(Boolean) as SignupAttributionEntry[] : []

  return {
    total: typeof snapshot.total === 'number' && Number.isFinite(snapshot.total) ? snapshot.total : 0,
    instituteSignups:
      typeof snapshot.instituteSignups === 'number' && Number.isFinite(snapshot.instituteSignups)
        ? snapshot.instituteSignups
        : 0,
    sources: normalizeList(snapshot.sources),
    interests: normalizeList(snapshot.interests),
    returnPaths: normalizeList(snapshot.returnPaths),
  }
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
    const data = await res.json() as AnalyticsSnapshot & { signupAttribution?: SignupAttributionSnapshot }
    return {
      ...data,
      signupAttribution: normalizeSignupAttributionSnapshot(data?.signupAttribution),
    }
  } catch {
    return null
  }
}
