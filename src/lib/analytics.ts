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
  | 'service_checkout_started'
  | 'service_order_recorded'

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
  /** $499 Comprehensive Online Profile intake records */
  serviceOrders: number
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

/** Keys that must never leave the browser as analytics event properties (reader or operator PII). */
const FORBIDDEN_ANALYTICS_PROP_KEYS = new Set([
  'email',
  'e-mail',
  'mail',
  'phone',
  'telephone',
  'mobile',
  'fullname',
  'fullname',
  'firstname',
  'lastname',
  'fullname',
  'username',
  'password',
  'author',
  'authoremail',
  'author_email',
  'userid',
  'user_id',
  'useremail',
  'user_email',
  'ip',
  'ipaddress',
  'ip_address',
  'ssn',
  'address',
  'street',
])

/**
 * Strip PII-shaped keys from analytics event properties.
 * Keeps analytics purpose-specific and protects operator + reader anonymity.
 */
export function sanitizeAnalyticsProperties(
  properties?: Record<string, string>,
): Record<string, string> | undefined {
  if (!properties || typeof properties !== 'object') return undefined
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(properties)) {
    if (typeof key !== 'string' || typeof value !== 'string') continue
    const norm = key.toLowerCase().replace(/[\s-]+/g, '')
    if (FORBIDDEN_ANALYTICS_PROP_KEYS.has(norm) || FORBIDDEN_ANALYTICS_PROP_KEYS.has(key.toLowerCase())) {
      continue
    }
    // Drop values that look like emails even under benign keys
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) continue
    out[key] = value.slice(0, 200)
  }
  return Object.keys(out).length ? out : undefined
}

// ── Record a behavioral event ──────────────────────────────────────
export function recordAnalyticsEvent(
  name: AnalyticsEventName,
  properties?: Record<string, string>
): void {
  if (typeof window === 'undefined') return

  const safeProps = sanitizeAnalyticsProperties(properties)

  void fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      path: window.location.pathname,
      properties: safeProps,
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
