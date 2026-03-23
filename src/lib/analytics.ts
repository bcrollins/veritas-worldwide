import { db, isConfigured } from './firebase'
export { isConfigured }
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  increment,
  Timestamp,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'

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

// ── Date helpers ───────────────────────────────────────────────────
function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

function getWeekStart(d: Date): string {
  const dt = new Date(d)
  dt.setDate(dt.getDate() - dt.getDay())
  return toDateKey(dt)
}

function getMonthKey(d: Date): string {
  return d.toISOString().slice(0, 7) // YYYY-MM
}

function getYearKey(d: Date): string {
  return String(d.getFullYear())
}

// ── Country detection ──────────────────────────────────────────────
let cachedCountry: { country: string; code: string } | null = null

async function detectCountry(): Promise<{ country: string; code: string }> {
  if (cachedCountry) return cachedCountry
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error('geo-fail')
    const data = await res.json()
    cachedCountry = {
      country: data.country_name || 'Unknown',
      code: data.country_code || 'XX',
    }
  } catch {
    cachedCountry = { country: 'Unknown', code: 'XX' }
  }
  return cachedCountry
}

// ── Record a page view ─────────────────────────────────────────────
export async function recordPageView(path: string, title: string): Promise<void> {
  if (!isConfigured || !db) return

  const now = new Date()
  const dateKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)

  const { country, code } = await detectCountry()

  try {
    // Global counters
    const globalRef = doc(db, 'analytics', 'global')
    await setDoc(globalRef, { lifetime: increment(1) }, { merge: true })

    // Daily counter
    const dailyRef = doc(db, 'analytics_daily', dateKey)
    await setDoc(dailyRef, {
      date: dateKey,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })

    // Weekly counter
    const weeklyRef = doc(db, 'analytics_weekly', weekKey)
    await setDoc(weeklyRef, {
      weekStart: weekKey,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })

    // Monthly counter
    const monthlyRef = doc(db, 'analytics_monthly', monthKey)
    await setDoc(monthlyRef, {
      month: monthKey,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })

    // Yearly counter
    const yearlyRef = doc(db, 'analytics_yearly', yearKey)
    await setDoc(yearlyRef, {
      year: yearKey,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })

    // Country counter
    const countryRef = doc(db, 'analytics_countries', code)
    await setDoc(countryRef, {
      country,
      code,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })

    // Page counter
    const pageId = path.replace(/\//g, '_') || '_home'
    const pageRef = doc(db, 'analytics_pages', pageId)
    await setDoc(pageRef, {
      path,
      title,
      views: increment(1),
      updatedAt: Timestamp.now(),
    }, { merge: true })
  } catch (err) {
    console.warn('[analytics] Failed to record view:', err)
  }
}

// ── Fetch analytics snapshot ───────────────────────────────────────
export async function fetchAnalytics(): Promise<AnalyticsSnapshot | null> {
  if (!isConfigured || !db) return null

  const now = new Date()
  const todayKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)

  try {
    // Global lifetime
    const globalSnap = await getDoc(doc(db, 'analytics', 'global'))
    const lifetime = globalSnap.exists() ? (globalSnap.data().lifetime || 0) : 0

    // Today
    const todaySnap = await getDoc(doc(db, 'analytics_daily', todayKey))
    const today = todaySnap.exists() ? (todaySnap.data().views || 0) : 0

    // This week
    const weekSnap = await getDoc(doc(db, 'analytics_weekly', weekKey))
    const thisWeek = weekSnap.exists() ? (weekSnap.data().views || 0) : 0

    // This month
    const monthSnap = await getDoc(doc(db, 'analytics_monthly', monthKey))
    const thisMonth = monthSnap.exists() ? (monthSnap.data().views || 0) : 0

    // This year
    const yearSnap = await getDoc(doc(db, 'analytics_yearly', yearKey))
    const thisYear = yearSnap.exists() ? (yearSnap.data().views || 0) : 0

    // Countries (top 20)
    const countriesSnap = await getDocs(collection(db, 'analytics_countries'))
    const countries: CountryViews[] = []
    countriesSnap.forEach(d => {
      const data = d.data()
      countries.push({ country: data.country, code: data.code, views: data.views || 0 })
    })
    countries.sort((a, b) => b.views - a.views)

    // Daily trend (last 30 days)
    const dailySnap = await getDocs(
      query(collection(db, 'analytics_daily'), orderBy('date', 'desc'), limit(30))
    )
    const dailyTrend: DailyViews[] = []
    dailySnap.forEach(d => {
      const data = d.data()
      dailyTrend.push({ date: data.date, views: data.views || 0 })
    })
    dailyTrend.reverse()

    // Top pages
    const pagesSnap = await getDocs(collection(db, 'analytics_pages'))
    const topPages: PageViews[] = []
    pagesSnap.forEach(d => {
      const data = d.data()
      topPages.push({ path: data.path, title: data.title, views: data.views || 0 })
    })
    topPages.sort((a, b) => b.views - a.views)

    return { lifetime, today, thisWeek, thisMonth, thisYear, countries, dailyTrend, topPages }
  } catch (err) {
    console.error('[analytics] Failed to fetch:', err)
    return null
  }
}
