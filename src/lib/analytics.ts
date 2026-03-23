// ── Types ──────────────────────────────────────────────────────────
export interface AnalyticsSnapshot {
  lifetime: number
  today: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  countries: CountryViews[]
  dailyTrend: DailyViews[]
  topPages: PageViews[]
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
