import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { registerDatabaseAndAuthRoutes } from './server-auth.js'
import { createChapterDataTools } from './server-chapter-data.js'
import { registerBotMetaInjection } from './server-social-meta.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
// Do not advertise Express in X-Powered-By (reduces fingerprinting noise).
app.disable('x-powered-by')
const PORT = process.env.PORT || 3000
const RECORD_PDF_PATH = path.join(__dirname, 'dist', 'the-record.pdf')
const INSTITUTE_FIELD_MANUAL_PDF_PATH = path.join(__dirname, 'dist', 'veritas-institute-field-manual.pdf')
const DIST_INDEX_HTML_PATH = path.join(__dirname, 'dist', 'index.html')
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json')

function readPackageVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))
    return typeof packageJson.version === 'string' ? packageJson.version : ''
  } catch {
    return ''
  }
}

function readGitCommitFallback() {
  try {
    const gitDir = path.join(__dirname, '.git')
    const headPath = path.join(gitDir, 'HEAD')
    if (!fs.existsSync(headPath)) return ''

    const head = fs.readFileSync(headPath, 'utf-8').trim()
    if (!head) return ''

    if (!head.startsWith('ref:')) {
      return head
    }

    const refPath = path.join(gitDir, head.replace(/^ref:\s*/, ''))
    if (!fs.existsSync(refPath)) return ''

    return fs.readFileSync(refPath, 'utf-8').trim()
  } catch {
    return ''
  }
}

function getReleaseCommit() {
  return process.env.RAILWAY_GIT_COMMIT_SHA || process.env.GITHUB_SHA || readGitCommitFallback()
}

function getDistEntryAssets() {
  if (!fs.existsSync(DIST_INDEX_HTML_PATH)) {
    return { js: [], css: [] }
  }

  try {
    const html = fs.readFileSync(DIST_INDEX_HTML_PATH, 'utf-8')
    const js = [...html.matchAll(/assets\/[A-Za-z0-9._-]+\.js/g)].map((match) => match[0])
    const css = [...html.matchAll(/assets\/[A-Za-z0-9._-]+\.css/g)].map((match) => match[0])

    return {
      js: [...new Set(js)],
      css: [...new Set(css)],
    }
  } catch {
    return { js: [], css: [] }
  }
}

const APP_VERSION = readPackageVersion()
const chapterData = createChapterDataTools({ rootDir: __dirname })
chapterData.loadChapterData()

// ── Persistent storage ────────────────────────────────────────────
// Prefer database-backed analytics in production. Only require disk when an
// explicit data path is configured or when no database is available.
const CONFIGURED_DATA_DIR = process.env.DATA_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH || ''
const HAS_DATABASE_URL = Boolean(process.env.DATABASE_URL)
const USE_DISK_ANALYTICS = Boolean(CONFIGURED_DATA_DIR) || !HAS_DATABASE_URL
const DATA_DIR = USE_DISK_ANALYTICS ? (CONFIGURED_DATA_DIR || path.join(__dirname, 'data')) : null
const DATA_FILE = DATA_DIR ? path.join(DATA_DIR, 'analytics.json') : null

const ANALYTICS_STATE_KEY = 'public-analytics'

function createAnalyticsStore() {
  return {
    lifetime: 0,
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {},
    countries: {},
    pages: {},
    events: {},
    eventDaily: {},
    signupAttribution: {
      sources: {},
      interests: {},
      returnPaths: {},
    },
  }
}

function normalizeSignupAttributionBucket(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

function normalizeAnalyticsStore(value) {
  const base = createAnalyticsStore()
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return base
  }

  const source = value

  return {
    lifetime: Number.isFinite(source.lifetime) ? source.lifetime : 0,
    daily: source.daily && typeof source.daily === 'object' && !Array.isArray(source.daily) ? source.daily : {},
    weekly: source.weekly && typeof source.weekly === 'object' && !Array.isArray(source.weekly) ? source.weekly : {},
    monthly: source.monthly && typeof source.monthly === 'object' && !Array.isArray(source.monthly) ? source.monthly : {},
    yearly: source.yearly && typeof source.yearly === 'object' && !Array.isArray(source.yearly) ? source.yearly : {},
    countries: source.countries && typeof source.countries === 'object' && !Array.isArray(source.countries) ? source.countries : {},
    pages: source.pages && typeof source.pages === 'object' && !Array.isArray(source.pages) ? source.pages : {},
    events: source.events && typeof source.events === 'object' && !Array.isArray(source.events) ? source.events : {},
    eventDaily: source.eventDaily && typeof source.eventDaily === 'object' && !Array.isArray(source.eventDaily) ? source.eventDaily : {},
    signupAttribution: source.signupAttribution && typeof source.signupAttribution === 'object' && !Array.isArray(source.signupAttribution)
      ? {
          sources: normalizeSignupAttributionBucket(source.signupAttribution.sources),
          interests: normalizeSignupAttributionBucket(source.signupAttribution.interests),
          returnPaths: normalizeSignupAttributionBucket(source.signupAttribution.returnPaths),
        }
      : base.signupAttribution,
  }
}

const ANALYTICS_SITE_NAME = 'Veritas Worldwide'
const GENERIC_ANALYTICS_TITLES = new Set([
  `The Record | ${ANALYTICS_SITE_NAME}`,
  ANALYTICS_SITE_NAME,
  'Reader Analytics',
  `News | ${ANALYTICS_SITE_NAME}`,
  `Sources | ${ANALYTICS_SITE_NAME}`,
  `Methodology | ${ANALYTICS_SITE_NAME}`,
  `Search | ${ANALYTICS_SITE_NAME}`,
  `Power Profiles | ${ANALYTICS_SITE_NAME}`,
  `Research Topics | ${ANALYTICS_SITE_NAME}`,
  `Community Forum | ${ANALYTICS_SITE_NAME}`,
])

const STATIC_ANALYTICS_TITLES = {
  '/': `The Record | ${ANALYTICS_SITE_NAME}`,
  '/search': `Search | The Record — ${ANALYTICS_SITE_NAME}`,
  '/methodology': `Methodology & Evidence Standards | The Record — ${ANALYTICS_SITE_NAME}`,
  '/sources': `Sources & Bibliography | The Record — ${ANALYTICS_SITE_NAME}`,
  '/membership': `Membership | ${ANALYTICS_SITE_NAME}`,
  '/analytics': `Reader Analytics | The Record — ${ANALYTICS_SITE_NAME}`,
  '/read': `Read The Record | ${ANALYTICS_SITE_NAME}`,
  '/news': `Current Events — Primary Source Journalism | ${ANALYTICS_SITE_NAME}`,
  '/profiles': `Power Profiles | ${ANALYTICS_SITE_NAME}`,
  '/topics': `Research Topics | ${ANALYTICS_SITE_NAME}`,
  '/forum': `Community Forum | ${ANALYTICS_SITE_NAME}`,
  '/institute': `Veritas Institute | Field Manual and Practical Trade Courses | ${ANALYTICS_SITE_NAME}`,
  '/institute/book': `Field Manual | Veritas Institute | ${ANALYTICS_SITE_NAME}`,
  '/institute/methodology': `Veritas Institute Methodology | ${ANALYTICS_SITE_NAME}`,
  '/israel-dossier': `The Israel Dossier | ${ANALYTICS_SITE_NAME}`,
  '/deep-state': `The Deep State — The Epstein Network | ${ANALYTICS_SITE_NAME}`,
  '/content-pack': `Content Packs & Brand Kit | ${ANALYTICS_SITE_NAME}`,
  '/timeline': `Interactive Timeline | ${ANALYTICS_SITE_NAME}`,
  '/accessibility': `Accessibility | ${ANALYTICS_SITE_NAME}`,
  '/privacy': `Privacy Policy | ${ANALYTICS_SITE_NAME}`,
  '/terms': `Terms of Use | ${ANALYTICS_SITE_NAME}`,
  '/bible': `The Bible: History & Factual Record | ${ANALYTICS_SITE_NAME}`,
}

const ANALYTICS_ACRONYM_WORDS = {
  ai: 'AI',
  aipac: 'AIPAC',
  cia: 'CIA',
  cdc: 'CDC',
  covid: 'COVID',
  diy: 'DIY',
  doj: 'DOJ',
  epa: 'EPA',
  fbi: 'FBI',
  fda: 'FDA',
  fisa: 'FISA',
  jfk: 'JFK',
  nato: 'NATO',
  rfk: 'RFK',
  uk: 'UK',
  un: 'UN',
  us: 'U.S.',
  uss: 'USS',
  wef: 'WEF',
}

function normalizeAnalyticsTitle(value) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/Veritas Press/g, ANALYTICS_SITE_NAME)
    .replace(/\|\s+The Record\s+-\s+Veritas Worldwide/g, `| The Record — ${ANALYTICS_SITE_NAME}`)
    .replace(/\s+-\s+Power Profile\s+\|\s+Veritas Worldwide/g, ` — Power Profile | ${ANALYTICS_SITE_NAME}`)
    .trim()
}

function titleCaseAnalyticsWord(word, index) {
  const normalized = word.toLowerCase()
  if (ANALYTICS_ACRONYM_WORDS[normalized]) {
    return ANALYTICS_ACRONYM_WORDS[normalized]
  }

  if (index > 0 && ['a', 'an', 'and', 'at', 'for', 'in', 'of', 'on', 'the', 'to', 'vs', 'with'].includes(normalized)) {
    return normalized
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

function humanizeAnalyticsSlug(slug) {
  if (typeof slug !== 'string') return ''

  try {
    return decodeURIComponent(slug)
      .trim()
      .split('-')
      .filter(Boolean)
      .map((word, index) => titleCaseAnalyticsWord(word, index))
      .join(' ')
  } catch {
    return ''
  }
}

function getAnalyticsTitleFromPath(pagePath) {
  if (!pagePath) return ''

  if (STATIC_ANALYTICS_TITLES[pagePath]) {
    return STATIC_ANALYTICS_TITLES[pagePath]
  }

  const chapterMatch = pagePath.match(/^\/chapter\/([^/]+)$/)
  if (chapterMatch) {
    const meta = chapterData.getChapterMeta(chapterMatch[1])
    if (meta) {
      return `${meta.title} | The Record — ${ANALYTICS_SITE_NAME}`
    }
  }

  const profileMatch = pagePath.match(/^\/profile\/([^/]+)$/)
  if (profileMatch) {
    const label = humanizeAnalyticsSlug(profileMatch[1])
    return label ? `${label} — Power Profile | ${ANALYTICS_SITE_NAME}` : ''
  }

  const topicMatch = pagePath.match(/^\/topics\/([^/]+)$/)
  if (topicMatch) {
    const label = humanizeAnalyticsSlug(topicMatch[1])
    return label ? `${label} | ${ANALYTICS_SITE_NAME}` : ''
  }

  const newsMatch = pagePath.match(/^\/news\/([^/]+)$/)
  if (newsMatch) {
    const label = humanizeAnalyticsSlug(newsMatch[1])
    return label ? `${label} | ${ANALYTICS_SITE_NAME}` : ''
  }

  const instituteGuideMatch = pagePath.match(/^\/institute\/guides\/([^/]+)$/)
  if (instituteGuideMatch) {
    const label = humanizeAnalyticsSlug(instituteGuideMatch[1])
    return label ? `${label} | Veritas Institute | ${ANALYTICS_SITE_NAME}` : ''
  }

  const instituteCourseMatch = pagePath.match(/^\/institute\/courses\/([^/]+)$/)
  if (instituteCourseMatch) {
    const label = humanizeAnalyticsSlug(instituteCourseMatch[1])
    return label ? `${label} | Veritas Institute | ${ANALYTICS_SITE_NAME}` : ''
  }

  const instituteBookMatch = pagePath.match(/^\/institute\/book\/([^/]+)$/)
  if (instituteBookMatch) {
    const label = humanizeAnalyticsSlug(instituteBookMatch[1])
    return label ? `${label} | Veritas Institute | ${ANALYTICS_SITE_NAME}` : ''
  }

  return ''
}

function resolveAnalyticsTitle(pagePath, rawTitle) {
  const fallbackTitle = getAnalyticsTitleFromPath(pagePath)
  const normalizedTitle = normalizeAnalyticsTitle(rawTitle)

  if (STATIC_ANALYTICS_TITLES[pagePath]) {
    return fallbackTitle
  }

  if (!normalizedTitle) {
    return fallbackTitle
  }

  if (GENERIC_ANALYTICS_TITLES.has(normalizedTitle)) {
    return fallbackTitle || normalizedTitle
  }

  return normalizedTitle
}

function migrateAnalyticsTitles(targetStore) {
  if (!targetStore?.pages || typeof targetStore.pages !== 'object') return false

  let changed = false

  for (const page of Object.values(targetStore.pages)) {
    if (!page || typeof page !== 'object') continue

    const normalizedPath = sanitizeAnalyticsPath(page.path)
    if (normalizedPath && normalizedPath !== page.path) {
      page.path = normalizedPath
      changed = true
    }

    const resolvedTitle = resolveAnalyticsTitle(page.path, page.title)
    if (resolvedTitle && resolvedTitle !== page.title) {
      page.title = resolvedTitle
      changed = true
    }
  }

  return changed
}

function applyAnalyticsStore(value) {
  Object.assign(store, normalizeAnalyticsStore(value))
}

function hasAnalyticsData(value = store) {
  return value.lifetime > 0
    || Object.keys(value.daily).length > 0
    || Object.keys(value.pages).length > 0
    || Object.keys(value.events).length > 0
}

// ── In-memory analytics store ─────────────────────────────────────
const store = createAnalyticsStore()
let analyticsDirty = false
let analyticsFlushTimer = null
let analyticsFlushInFlight = null
let analyticsDbPool = null

function setAnalyticsDatabasePool(pool) {
  analyticsDbPool = pool
}

function loadStoreFromDisk() {
  if (!DATA_FILE) return false

  try {
    if (!fs.existsSync(DATA_FILE)) return false
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    applyAnalyticsStore(JSON.parse(raw))
    if (migrateAnalyticsTitles(store)) {
      analyticsDirty = true
    }
    console.log(`[analytics] Loaded ${store.lifetime} lifetime views from disk`)
    return true
  } catch (err) {
    console.warn('[analytics] Failed to load from disk:', err.message)
    return false
  }
}

function saveStoreToDisk() {
  if (!DATA_FILE || !DATA_DIR) return

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store), 'utf-8')
  } catch (err) {
    console.warn('[analytics] Failed to save to disk:', err.message)
  }
}

async function loadStoreFromDatabase({ log = true } = {}) {
  if (!analyticsDbPool) return false

  try {
    const { rows } = await analyticsDbPool.query(
      'SELECT payload FROM analytics_state WHERE state_key = $1 LIMIT 1',
      [ANALYTICS_STATE_KEY]
    )
    if (rows.length === 0 || !rows[0].payload) return false
    const nextStore = normalizeAnalyticsStore(rows[0].payload)
    if (!hasAnalyticsData(nextStore)) return false
    applyAnalyticsStore(nextStore)
    if (migrateAnalyticsTitles(store)) {
      analyticsDirty = true
      queueAnalyticsFlush()
    }
    if (log) {
      console.log(`[analytics] Loaded ${store.lifetime} lifetime views from database`)
    }
    return true
  } catch (err) {
    console.warn('[analytics] Failed to load from database:', err.message)
    return false
  }
}

async function saveStoreToDatabase(targetStore = store) {
  if (!analyticsDbPool) return

  try {
    await analyticsDbPool.query(
      `INSERT INTO analytics_state (state_key, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (state_key)
       DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
      [ANALYTICS_STATE_KEY, JSON.stringify(targetStore)]
    )
  } catch (err) {
    console.warn('[analytics] Failed to save to database:', err.message)
    throw err
  }
}

async function commitAnalyticsMutation(mutator) {
  if (!analyticsDbPool) {
    mutator(store)
    markAnalyticsDirty()
    return store
  }

  const client = await analyticsDbPool.connect()

  try {
    await client.query('BEGIN')
    await client.query(
      `INSERT INTO analytics_state (state_key, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (state_key) DO NOTHING`,
      [ANALYTICS_STATE_KEY, JSON.stringify(createAnalyticsStore())]
    )

    const { rows } = await client.query(
      'SELECT payload FROM analytics_state WHERE state_key = $1 FOR UPDATE',
      [ANALYTICS_STATE_KEY]
    )
    const nextStore = normalizeAnalyticsStore(rows[0]?.payload)
    migrateAnalyticsTitles(nextStore)
    mutator(nextStore)

    await client.query(
      'UPDATE analytics_state SET payload = $2::jsonb, updated_at = NOW() WHERE state_key = $1',
      [ANALYTICS_STATE_KEY, JSON.stringify(nextStore)]
    )
    await client.query('COMMIT')
    applyAnalyticsStore(nextStore)
    return nextStore
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    console.warn('[analytics] Failed to commit database mutation:', err.message)
    throw err
  } finally {
    client.release()
  }
}

async function flushAnalyticsStore() {
  if (analyticsFlushInFlight) return analyticsFlushInFlight
  if (!analyticsDirty) return

  analyticsDirty = false
  analyticsFlushInFlight = (async () => {
    try {
      saveStoreToDisk()
      await saveStoreToDatabase()
    } catch {
      analyticsDirty = true
    } finally {
      analyticsFlushInFlight = null
      if (analyticsDirty) {
        queueAnalyticsFlush(5000)
      }
    }
  })()

  return analyticsFlushInFlight
}

function queueAnalyticsFlush(delayMs = 1500) {
  if (analyticsFlushTimer) return
  analyticsFlushTimer = setTimeout(() => {
    analyticsFlushTimer = null
    void flushAnalyticsStore()
  }, delayMs)
}

function markAnalyticsDirty() {
  analyticsDirty = true
  queueAnalyticsFlush()
}

loadStoreFromDisk()
setInterval(() => { void flushAnalyticsStore() }, 30_000)
process.on('SIGTERM', () => {
  if (analyticsFlushTimer) clearTimeout(analyticsFlushTimer)
  void flushAnalyticsStore().finally(() => process.exit(0))
})
process.on('SIGINT', () => {
  if (analyticsFlushTimer) clearTimeout(analyticsFlushTimer)
  void flushAnalyticsStore().finally(() => process.exit(0))
})

function toDateKey(d) {
  return d.toISOString().slice(0, 10)
}

function getWeekStart(d) {
  const dt = new Date(d)
  dt.setDate(dt.getDate() - dt.getDay())
  return toDateKey(dt)
}

function getMonthKey(d) {
  return d.toISOString().slice(0, 7)
}

function getYearKey(d) {
  return String(d.getFullYear())
}

const countryCache = new Map()

async function detectCountryFromIP(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1') {
    return { country: 'Local', code: 'XX' }
  }
  if (countryCache.has(ip)) return countryCache.get(ip)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('geo-fail')
    const data = await res.json()
    const result = { country: data.country_name || 'Unknown', code: data.country_code || 'XX' }
    countryCache.set(ip, result)
    if (countryCache.size > 10000) { countryCache.delete(countryCache.keys().next().value) }
    return result
  } catch {
    const fallback = { country: 'Unknown', code: 'XX' }
    countryCache.set(ip, fallback)
    return fallback
  }
}

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

function sanitizeAnalyticsPath(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed.startsWith('/')) return ''
  const normalized = trimmed !== '/' && trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed
  return normalized.slice(0, 200)
}

function sanitizeAnalyticsProperties(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const clean = {}
  let count = 0
  for (const [rawKey, rawValue] of Object.entries(value)) {
    if (count >= 12) break
    if (!['string', 'number', 'boolean'].includes(typeof rawValue)) continue
    const key = String(rawKey).trim().slice(0, 40)
    if (!key) continue
    clean[key] = String(rawValue).slice(0, 160)
    count += 1
  }
  return clean
}

function recordCountryView(targetStore, countryInfo) {
  const country = countryInfo?.country || 'Unknown'
  const code = countryInfo?.code || 'XX'
  if (!targetStore.countries[code]) {
    targetStore.countries[code] = { country, code, views: 0 }
  }
  targetStore.countries[code].country = country
  targetStore.countries[code].views += 1
}

function recordPageView(targetStore, { pagePath, title, now }) {
  const dateKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)
  targetStore.lifetime += 1
  targetStore.daily[dateKey] = (targetStore.daily[dateKey] || 0) + 1
  targetStore.weekly[weekKey] = (targetStore.weekly[weekKey] || 0) + 1
  targetStore.monthly[monthKey] = (targetStore.monthly[monthKey] || 0) + 1
  targetStore.yearly[yearKey] = (targetStore.yearly[yearKey] || 0) + 1

  const pageId = pagePath.replace(/\//g, '_') || '_home'
  const resolvedTitle = resolveAnalyticsTitle(pagePath, title)
  if (!targetStore.pages[pageId]) {
    targetStore.pages[pageId] = { path: pagePath, title: resolvedTitle || pagePath, views: 0 }
  }
  targetStore.pages[pageId].views += 1
  targetStore.pages[pageId].path = pagePath
  if (resolvedTitle) {
    targetStore.pages[pageId].title = resolvedTitle
  }
}

// Sitewide popularity for search personalization without reader identity.
// Only chapter routes; minimum views gate avoids cold-start noise.
function getPopularChapterIdsFromAnalytics({ limit = 8, minViews = 3 } = {}) {
  if (!store?.pages || typeof store.pages !== 'object') return []

  const chapterIdFromPath = (pathValue) => {
    if (typeof pathValue !== 'string') return ''
    const match = pathValue.match(/^\/chapter\/(chapter-\d+|foreword|overview|epilogue)\/?$/i)
    return match ? match[1].toLowerCase() : ''
  }

  return Object.values(store.pages)
    .map((page) => {
      const chapterId = chapterIdFromPath(page?.path || '')
      const views = Number(page?.views) || 0
      return chapterId && views >= minViews ? { chapterId, views } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.views - a.views || a.chapterId.localeCompare(b.chapterId))
    .slice(0, limit)
    .map((row) => row.chapterId)
}

function recordSignupAttribution(targetStore, bucket, rawLabel, now, eventPath) {
  if (typeof rawLabel !== 'string') return
  const label = rawLabel.trim().slice(0, 160)
  if (!label || label === '__proto__' || label === 'constructor' || label === 'prototype') return

  if (!targetStore.signupAttribution[bucket][label]) {
    targetStore.signupAttribution[bucket][label] = { count: 0, lastSeenAt: '', lastPath: '' }
  }

  const entry = targetStore.signupAttribution[bucket][label]
  entry.count += 1
  entry.lastSeenAt = now.toISOString()
  if (eventPath) {
    entry.lastPath = eventPath
  }
}

function recordAnalyticsEvent(targetStore, { name, eventPath, cleanProperties, now }) {
  const dateKey = toDateKey(now)

  if (!targetStore.events[name]) {
    targetStore.events[name] = { count: 0, lastSeenAt: '', lastPath: '', lastProperties: {} }
  }
  targetStore.events[name].count += 1
  targetStore.events[name].lastSeenAt = now.toISOString()
  if (eventPath) {
    targetStore.events[name].lastPath = eventPath
  }
  if (Object.keys(cleanProperties).length > 0) {
    targetStore.events[name].lastProperties = cleanProperties
  }

  if (!targetStore.eventDaily[dateKey]) {
    targetStore.eventDaily[dateKey] = {}
  }
  targetStore.eventDaily[dateKey][name] = (targetStore.eventDaily[dateKey][name] || 0) + 1

  if (name === 'email_signup') {
    recordSignupAttribution(targetStore, 'sources', cleanProperties.source, now, eventPath)
    recordSignupAttribution(targetStore, 'interests', cleanProperties.content_interest, now, eventPath)
    recordSignupAttribution(targetStore, 'returnPaths', cleanProperties.return_to, now, eventPath)
  }
}

function buildSignupAttributionList(bucket) {
  return Object.entries(bucket)
    .map(([label, meta]) => ({
      label,
      count: meta.count || 0,
      lastSeenAt: meta.lastSeenAt || '',
      lastPath: meta.lastPath || '',
    }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count
      return a.label.localeCompare(b.label)
    })
    .slice(0, 20)
}

// Gzip/Brotli compression — reduces 549KB chapters chunk to ~188KB
app.use(compression())

// Security headers — Lighthouse & OWASP best practices
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  // Allow intentional share popups (window.open to X/Facebook/etc.) while isolating
  // the browsing context from unexpected cross-origin openers.
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  // Request origin-keyed agent cluster isolation for modern browsers.
  res.setHeader('Origin-Agent-Cluster', '?1')
  res.setHeader(
    'Permissions-Policy',
    // clipboard-write=(self) preserves same-origin Copy Link / citation CTAs.
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), display-capture=(), accelerometer=(), gyroscope=(), magnetometer=(), clipboard-write=(self)',
  )
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  if (APP_VERSION) {
    res.setHeader('X-Veritas-Version', APP_VERSION)
  }
  const releaseCommit = getReleaseCommit()
  if (releaseCommit) {
    res.setHeader('X-Veritas-Commit', releaseCommit.slice(0, 12))
  }
  if (process.env.RAILWAY_DEPLOYMENT_ID) {
    res.setHeader('X-Veritas-Deployment', process.env.RAILWAY_DEPLOYMENT_ID)
  }
  next()
})

// Default JSON body cap — per-route overrides (e.g. client-error 16kb) still apply when declared first.
app.use(express.json({ limit: '64kb' }))

// ── Rate limiter (in-memory, zero dependencies) ──────────────────────
// Keys are scoped per limiter name so analytics traffic cannot exhaust auth
// budgets (and vice versa). Without a scope, all routes shared one IP counter.
const rateLimitStore = new Map()
function rateLimit({ windowMs = 60_000, max = 10, keyFn, name = 'default' } = {}) {
  return (req, res, next) => {
    const identity = keyFn ? keyFn(req) : getClientIP(req)
    const key = `${name}:${identity || 'unknown'}`
    const now = Date.now()
    let entry = rateLimitStore.get(key)
    if (!entry || now - entry.start > windowMs) {
      entry = { start: now, count: 0 }
      rateLimitStore.set(key, entry)
    }
    entry.count++
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.start + windowMs - now) / 1000))
      return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }
    next()
  }
}
// Clean stale entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - 300_000
  for (const [key, entry] of rateLimitStore) {
    if (entry.start < cutoff) rateLimitStore.delete(key)
  }
}, 300_000)

// Auth endpoints stay strict, but leave headroom for concurrent multi-agent smoke
// verification without locking out legitimate readers for a full minute.
app.use('/api/auth/login', rateLimit({ name: 'auth-login', windowMs: 60_000, max: 20 }))
app.use('/api/auth/register', rateLimit({ name: 'auth-register', windowMs: 60_000, max: 24 }))
// Session refresh is authenticated and low-risk; allow regular client heartbeat calls.
app.use('/api/auth/refresh', rateLimit({ name: 'auth-refresh', windowMs: 60_000, max: 30 }))
app.use('/api/auth/logout', rateLimit({ name: 'auth-logout', windowMs: 60_000, max: 30 }))
// Public search is read-heavy; cap abusive scrapers without hurting normal readers.
app.use('/api/search', rateLimit({ name: 'search', windowMs: 60_000, max: 90 }))
// Chapter list/detail are the main content API — generous ceiling for readers.
app.use('/api/chapters', rateLimit({ name: 'chapters', windowMs: 60_000, max: 120 }))
app.use('/api/auth/me', rateLimit({ name: 'auth-me', windowMs: 60_000, max: 60 }))
app.use('/api/auth/status', rateLimit({ name: 'auth-status', windowMs: 60_000, max: 60 }))
// Large PDF downloads — protect origin bandwidth (headroom for multi-agent verify).
app.use('/api/downloads', rateLimit({ name: 'downloads', windowMs: 60_000, max: 90 }))
app.use('/the-record.pdf', rateLimit({ name: 'the-record-pdf', windowMs: 60_000, max: 90 }))
app.use('/veritas-institute-field-manual.pdf', rateLimit({ name: 'field-manual-pdf', windowMs: 60_000, max: 90 }))
// Password changes are authenticated but still brute-forceable on currentPassword.
app.use('/api/user/change-password', rateLimit({ name: 'change-password', windowMs: 60_000, max: 10 }))
// Authenticated mutation endpoints — generous for UX, hard ceiling against abuse.
app.use('/api/user/bookmarks', rateLimit({ name: 'bookmarks', windowMs: 60_000, max: 60 }))
app.use('/api/user/progress', rateLimit({ name: 'progress', windowMs: 60_000, max: 60 }))
app.use('/api/user/preferences', rateLimit({ name: 'preferences', windowMs: 60_000, max: 30 }))
app.use('/api/user/profile', rateLimit({ name: 'profile', windowMs: 60_000, max: 20 }))
app.use('/api/analytics/event', rateLimit({ name: 'analytics-event', windowMs: 60_000, max: 120 }))
app.use('/api/analytics/pageview', rateLimit({ name: 'analytics-pageview', windowMs: 60_000, max: 120 }))
app.use('/api/analytics/snapshot', rateLimit({ name: 'analytics-snapshot', windowMs: 60_000, max: 60 }))
app.use('/api/client-error', rateLimit({ name: 'client-error', windowMs: 60_000, max: 30 }))
// Operator probes — keep readable under multi-agent verify fleets.
app.use('/api/health/history', rateLimit({ name: 'health-history', windowMs: 60_000, max: 60 }))
app.use('/api/build-info', rateLimit({ name: 'build-info', windowMs: 60_000, max: 60 }))

// CORS — restrict to known origins
const ALLOWED_ORIGINS = new Set([
  'https://veritasworldwide.com',
  'https://www.veritasworldwide.com',
  'https://veritas-worldwide-production.up.railway.app',
])
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    const origin = req.headers.origin || ''
    if (ALLOWED_ORIGINS.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    } else if (!origin) {
      // Same-origin requests don't send Origin header — allow
      res.setHeader('Access-Control-Allow-Origin', 'https://veritasworldwide.com')
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
  }
  next()
})

app.post('/api/analytics/pageview', async (req, res) => {
  const { path: rawPagePath, title } = req.body
  const pagePath = sanitizeAnalyticsPath(rawPagePath)
  if (!pagePath) {
    return res.status(400).json({ error: 'path required' })
  }
  const now = new Date()
  const ip = getClientIP(req)

  try {
    await commitAnalyticsMutation((targetStore) => {
      recordPageView(targetStore, { pagePath, title, now })
    })

    void detectCountryFromIP(ip)
      .then((countryInfo) => commitAnalyticsMutation((targetStore) => {
        recordCountryView(targetStore, countryInfo)
      }))
      .catch((err) => {
        console.warn('[analytics] Failed to record country view:', err.message)
      })

    res.setHeader('Cache-Control', 'no-store')
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to record analytics pageview' })
  }
})

const ANALYTICS_EVENTS = new Set([
  'email_signup',
  'account_created',
  'chapter_viewed',
  'bookmark_added',
  'donation_clicked',
  'donation_completed',
  'share_clicked',
  'search_performed',
  'content_gate_hit',
  'forum_post',
  'pdf_downloaded',
  'profile_viewed',
  'checkout_started',
  'donation_started',
  'payment_completed',
])

function getSignupEventCount(eventCounts) {
  if (!eventCounts || typeof eventCounts !== 'object') return 0

  return (eventCounts.email_signup || 0) + (eventCounts.account_created || 0)
}

app.post('/api/analytics/event', async (req, res) => {
  const { name, path: rawPath, properties } = req.body || {}
  if (typeof name !== 'string' || !ANALYTICS_EVENTS.has(name)) {
    return res.status(400).json({ error: 'valid event name required' })
  }

  const now = new Date()
  const eventPath = sanitizeAnalyticsPath(rawPath)
  const cleanProperties = sanitizeAnalyticsProperties(properties)

  try {
    await commitAnalyticsMutation((targetStore) => {
      recordAnalyticsEvent(targetStore, { name, eventPath, cleanProperties, now })
    })

    res.setHeader('Cache-Control', 'no-store')
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Failed to record analytics event' })
  }
})

app.get('/api/analytics/snapshot', async (req, res) => {
  // Never cache analytics — always show live cumulative data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
  if (analyticsDbPool) {
    await loadStoreFromDatabase({ log: false })
  }
  const now = new Date()
  const todayKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)
  const dailyTrend = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = toDateKey(d)
    dailyTrend.push({ date: key, views: store.daily[key] || 0 })
  }
  const countries = Object.values(store.countries).sort((a, b) => b.views - a.views)
  const topPages = Object.values(store.pages)
    .map((page) => ({
      ...page,
      title: resolveAnalyticsTitle(sanitizeAnalyticsPath(page.path), page.title) || page.path,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 30)
  const eventCounts = Object.fromEntries(
    Object.entries(store.events).map(([name, meta]) => [name, meta.count || 0])
  )
  const topEvents = Object.entries(store.events)
    .sort((a, b) => (b[1].count || 0) - (a[1].count || 0))
    .slice(0, 12)
    .map(([name, meta]) => ({
      name,
      count: meta.count || 0,
      lastSeenAt: meta.lastSeenAt || '',
      lastPath: meta.lastPath || '',
    }))
  const eventTrend = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = toDateKey(d)
    const dayEvents = store.eventDaily[key] || {}
    eventTrend.push({
      date: key,
      chapterViews: dayEvents.chapter_viewed || 0,
      signups: getSignupEventCount(dayEvents),
      checkoutStarts: (dayEvents.checkout_started || 0) + (dayEvents.donation_started || 0),
      payments: (dayEvents.payment_completed || 0) + (dayEvents.donation_completed || 0),
    })
  }
  const signupSources = buildSignupAttributionList(store.signupAttribution.sources)
  const signupInterests = buildSignupAttributionList(store.signupAttribution.interests)
  const signupReturnPaths = buildSignupAttributionList(store.signupAttribution.returnPaths)
  const funnel = {
    chapterViews: eventCounts.chapter_viewed || 0,
    gateHits: eventCounts.content_gate_hit || 0,
    signups: getSignupEventCount(eventCounts),
    checkoutStarts: (eventCounts.checkout_started || 0) + (eventCounts.donation_started || 0),
    payments: (eventCounts.payment_completed || 0) + (eventCounts.donation_completed || 0),
    shares: eventCounts.share_clicked || 0,
    bookmarks: eventCounts.bookmark_added || 0,
    searches: eventCounts.search_performed || 0,
    pdfDownloads: eventCounts.pdf_downloaded || 0,
    profiles: eventCounts.profile_viewed || 0,
  }
  const instituteSignupLabels = new Set(['institute_course', 'institute_guide', 'institute_catalog', 'institute_book'])
  const instituteSignups = signupSources.reduce(
    (sum, entry) => sum + (instituteSignupLabels.has(entry.label) ? entry.count : 0),
    0,
  )
  res.json({
    lifetime: store.lifetime,
    today: store.daily[todayKey] || 0,
    thisWeek: store.weekly[weekKey] || 0,
    thisMonth: store.monthly[monthKey] || 0,
    thisYear: store.yearly[yearKey] || 0,
    countries,
    dailyTrend,
    topPages,
    eventCounts,
    topEvents,
    eventTrend,
    funnel,
    signupAttribution: {
      total: eventCounts.email_signup || 0,
      instituteSignups,
      sources: signupSources,
      interests: signupInterests,
      returnPaths: signupReturnPaths,
    },
  })
})

// Client-side error intake — structured operator logs without requiring Sentry.
// Accepts small anonymized payloads from ErrorBoundary + global handlers.
// Replica-local counters give operators a live signal without external paging.
// When SENTRY_DSN is configured, also fire-and-forget a store event for external paging.
let clientErrorIntakeCount = 0
let clientErrorIntakeLastAt = ''
let clientErrorIntakeLastMessage = ''
let clientErrorSentryForwardCount = 0
let clientErrorSentryForwardLastAt = ''
let clientErrorSentryForwardLastStatus = ''

function parseSentryDsn(dsn) {
  if (!dsn || typeof dsn !== 'string') return null
  try {
    const url = new URL(dsn)
    const publicKey = url.username
    const projectId = url.pathname.replace(/^\//, '').split('/')[0]
    if (!publicKey || !projectId) return null
    return {
      publicKey,
      projectId,
      storeUrl: `${url.protocol}//${url.host}/api/${projectId}/store/`,
    }
  } catch {
    return null
  }
}

const SENTRY_DSN_CONFIG = parseSentryDsn(process.env.SENTRY_DSN || process.env.SENTRY_DSN_SERVER || '')

function forwardClientErrorToSentry(payload) {
  if (!SENTRY_DSN_CONFIG) return
  const eventId = cryptoRandomHex(16)
  const event = {
    event_id: eventId,
    timestamp: Math.floor(Date.now() / 1000),
    platform: 'javascript',
    level: 'error',
    logger: 'veritas.client-error',
    server_name: process.env.RAILWAY_SERVICE_NAME || 'veritas-worldwide',
    release: payload.commit || getReleaseCommit().slice(0, 12) || undefined,
    environment: process.env.RAILWAY_ENVIRONMENT_NAME || process.env.NODE_ENV || 'production',
    message: payload.message,
    exception: {
      values: [
        {
          type: payload.name || 'Error',
          value: payload.message,
          stacktrace: payload.stack
            ? {
                frames: payload.stack
                  .split('\n')
                  .slice(0, 20)
                  .map((line) => ({ filename: 'app', function: line.trim().slice(0, 240) })),
              }
            : undefined,
        },
      ],
    },
    tags: {
      source: payload.source || 'client',
      path: payload.path || '',
    },
    extra: {
      componentStack: payload.componentStack || '',
      href: payload.href || '',
      userAgent: payload.userAgent || '',
    },
    request: {
      url: payload.href || payload.path || undefined,
      headers: payload.userAgent ? { 'User-Agent': payload.userAgent } : undefined,
    },
  }

  const authHeader = [
    'Sentry sentry_version=7',
    `sentry_client=veritas-worldwide/${APP_VERSION || '1.0.0'}`,
    `sentry_key=${SENTRY_DSN_CONFIG.publicKey}`,
  ].join(', ')

  // Fire-and-forget — never block the 204 response to the browser.
  void fetch(SENTRY_DSN_CONFIG.storeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Sentry-Auth': authHeader,
    },
    body: JSON.stringify(event),
    signal: AbortSignal.timeout(4000),
  })
    .then((response) => {
      clientErrorSentryForwardCount += 1
      clientErrorSentryForwardLastAt = new Date().toISOString()
      clientErrorSentryForwardLastStatus = String(response.status)
      if (!response.ok) {
        console.warn(`[monitor] sentry forward returned ${response.status}`)
      }
    })
    .catch((error) => {
      clientErrorSentryForwardLastAt = new Date().toISOString()
      clientErrorSentryForwardLastStatus = 'error'
      console.warn(
        '[monitor] sentry forward failed',
        error instanceof Error ? error.message : error
      )
    })
}

function cryptoRandomHex(byteLength) {
  // Prefer Web Crypto when available (Node 19+); fall back to Math.random for older runtimes.
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(byteLength)
      crypto.getRandomValues(bytes)
      return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
    }
  } catch {
    // fall through
  }
  let out = ''
  for (let i = 0; i < byteLength; i += 1) {
    out += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
  }
  return out
}

app.post('/api/client-error', express.json({ limit: '16kb' }), (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const message = typeof body.message === 'string' ? body.message.slice(0, 500) : ''
  if (!message) {
    return res.status(400).json({ error: 'message required' })
  }

  const payload = {
    type: 'client-error',
    message,
    name: typeof body.name === 'string' ? body.name.slice(0, 120) : 'Error',
    stack: typeof body.stack === 'string' ? body.stack.slice(0, 4000) : '',
    componentStack: typeof body.componentStack === 'string' ? body.componentStack.slice(0, 4000) : '',
    source: typeof body.source === 'string' ? body.source.slice(0, 80) : 'client',
    path: typeof body.path === 'string' ? body.path.slice(0, 240) : '',
    href: typeof body.href === 'string' ? body.href.slice(0, 500) : '',
    userAgent: typeof body.userAgent === 'string' ? body.userAgent.slice(0, 300) : '',
    ip: getClientIP(req),
    commit: getReleaseCommit().slice(0, 12),
    receivedAt: new Date().toISOString(),
  }

  clientErrorIntakeCount += 1
  clientErrorIntakeLastAt = payload.receivedAt
  clientErrorIntakeLastMessage = payload.message.slice(0, 160)

  console.error(`[monitor] ${JSON.stringify(payload)}`)

  // Optional durable append when a persistent data volume is configured.
  if (DATA_DIR) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true })
      fs.appendFileSync(
        path.join(DATA_DIR, 'client-errors.ndjson'),
        `${JSON.stringify(payload)}\n`,
        'utf8'
      )
    } catch (error) {
      console.error('[monitor] failed to persist client-error', error instanceof Error ? error.message : error)
    }
  }

  forwardClientErrorToSentry(payload)

  return res.status(204).end()
})


const { initializeDatabaseAndAnalytics } = registerDatabaseAndAuthRoutes({
  app,
  chapterState: {
    getChapterDataManifest: chapterData.getChapterDataManifest,
    getPublicChapterIndex: chapterData.getPublicChapterIndex,
  },
  chapterHelpers: {
    getChapterJson: chapterData.getChapterJson,
    sanitizeChapterId: chapterData.sanitizeChapterId,
    normalizeSearchQuery: chapterData.normalizeSearchQuery,
    normalizeFilter: chapterData.normalizeFilter,
    searchChapters: chapterData.searchChapters,
    evidenceTierFilters: chapterData.evidenceTierFilters,
    searchMatchFilters: chapterData.searchMatchFilters,
    chapterTypeFilters: chapterData.chapterTypeFilters,
  },
  analyticsStore: {
    setDatabasePool: setAnalyticsDatabasePool,
    loadStoreFromDatabase,
    hasAnalyticsData,
    saveStoreToDatabase,
    getPopularChapterIds: getPopularChapterIdsFromAnalytics,
  },
  recordPdfPath: RECORD_PDF_PATH,
  getClientIP,
})


// Build-time prerender manifest for exact-route static HTML
const PRERENDER_MANIFEST_PATH = path.join(__dirname, 'dist', 'prerender-manifest.json')
let prerenderManifest = {}

try {
  if (fs.existsSync(PRERENDER_MANIFEST_PATH)) {
    prerenderManifest = JSON.parse(fs.readFileSync(PRERENDER_MANIFEST_PATH, 'utf-8'))
    console.log(`[prerender] Loaded ${Object.keys(prerenderManifest).length} prerendered routes`)
  }
} catch (err) {
  console.warn('[prerender] Failed to load manifest:', err.message)
  prerenderManifest = {}
}

app.get('/api/build-info', (req, res) => {
  const chapterDataManifest = chapterData.getChapterDataManifest()
  const publicChapterIndex = chapterData.getPublicChapterIndex()
  const releaseCommit = getReleaseCommit()
  const distIndexLastModified = fs.existsSync(DIST_INDEX_HTML_PATH)
    ? fs.statSync(DIST_INDEX_HTML_PATH).mtime.toISOString()
    : ''

  res.setHeader('Cache-Control', 'no-store')
  res.json({
    version: APP_VERSION,
    commit: releaseCommit,
    commitShort: releaseCommit ? releaseCommit.slice(0, 12) : '',
    branch: process.env.RAILWAY_GIT_BRANCH || '',
    deploymentId: process.env.RAILWAY_DEPLOYMENT_ID || '',
    environment: process.env.RAILWAY_ENVIRONMENT_NAME || process.env.NODE_ENV || '',
    service: process.env.RAILWAY_SERVICE_NAME || '',
    replica: process.env.RAILWAY_REPLICA_ID || '',
    replicaRegion: process.env.RAILWAY_REPLICA_REGION || '',
    distIndexLastModified,
    chapterDataGeneratedAt: chapterDataManifest.generatedAt || '',
    previewBlockLimit: chapterDataManifest.previewBlockLimit ?? 3,
    publicChapterCount: publicChapterIndex.length,
    prerenderedRouteCount: Object.keys(prerenderManifest).length,
    entryAssets: getDistEntryAssets(),
    recordPdf: fs.existsSync(RECORD_PDF_PATH),
    instituteFieldManualPdf: fs.existsSync(INSTITUTE_FIELD_MANUAL_PDF_PATH),
    instituteFieldManualPdfUrl: '/veritas-institute-field-manual.pdf',
  })
})

// 96 samples @ 15m floor ≈ 24h of routine probes, with force samples on deploys.
const HEALTH_HISTORY_MAX = 96
const HEALTH_HISTORY_MIN_INTERVAL_MS = 15 * 60 * 1000
const HEALTH_HISTORY_STATE_KEY = 'health-history'
// Prefer volume/data dir when configured; otherwise best-effort local data path on the replica.
// When DATABASE_URL is set, samples are also shared across replicas via analytics_state.
const HEALTH_HISTORY_DIR = DATA_DIR || path.join(__dirname, 'data')
const HEALTH_HISTORY_FILE = path.join(HEALTH_HISTORY_DIR, 'health-history.json')
let healthHistory = []
let lastHealthHistoryWriteAt = 0
let healthHistoryDbWriteInFlight = null

function normalizeHealthHistorySample(raw) {
  if (!raw || typeof raw !== 'object') return null
  const checkedAt = typeof raw.checkedAt === 'string' ? raw.checkedAt : ''
  if (!checkedAt) return null
  return {
    checkedAt,
    status: typeof raw.status === 'string' ? raw.status : '',
    commitShort: typeof raw.commitShort === 'string' ? raw.commitShort : '',
    analyticsLifetime: Number.isFinite(Number(raw.analyticsLifetime)) ? Number(raw.analyticsLifetime) : 0,
    publicChapterCount: Number.isFinite(Number(raw.publicChapterCount)) ? Number(raw.publicChapterCount) : 0,
    prerenderedRouteCount: Number.isFinite(Number(raw.prerenderedRouteCount))
      ? Number(raw.prerenderedRouteCount)
      : 0,
    failedCount: Number.isFinite(Number(raw.failedCount)) ? Number(raw.failedCount) : 0,
    replica: typeof raw.replica === 'string' ? raw.replica.slice(0, 64) : '',
  }
}

function normalizeHealthHistorySamples(raw) {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object' && Array.isArray(raw.samples)
      ? raw.samples
      : []
  return list.map(normalizeHealthHistorySample).filter(Boolean)
}

function healthHistorySampleKey(sample) {
  return [
    sample.checkedAt,
    sample.commitShort || '',
    sample.status || '',
    String(sample.failedCount ?? 0),
    String(sample.prerenderedRouteCount ?? 0),
    sample.replica || '',
  ].join('|')
}

function mergeHealthHistorySamples(...lists) {
  const map = new Map()
  for (const list of lists) {
    for (const sample of normalizeHealthHistorySamples(list)) {
      map.set(healthHistorySampleKey(sample), sample)
    }
  }
  return [...map.values()]
    .sort((a, b) => Date.parse(a.checkedAt) - Date.parse(b.checkedAt))
    .slice(-HEALTH_HISTORY_MAX)
}

function shouldForceHealthHistorySample(last, sample) {
  const commitChanged =
    Boolean(last?.commitShort) &&
    Boolean(sample?.commitShort) &&
    last.commitShort !== sample.commitShort
  const statusChanged = Boolean(last?.status) && Boolean(sample?.status) && last.status !== sample.status
  const hasFailures = Number(sample?.failedCount || 0) > 0
  return commitChanged || statusChanged || hasFailures
}

function getHealthHistoryStorageLabel() {
  if (analyticsDbPool) return 'shared-database'
  if (DATA_DIR) return 'configured-data-dir'
  return 'replica-local-data-dir'
}

function syncHealthHistoryWriteCursor(samples = healthHistory) {
  if (!Array.isArray(samples) || samples.length === 0) {
    lastHealthHistoryWriteAt = 0
    return
  }
  const last = samples[samples.length - 1]
  const lastTs = Date.parse(last?.checkedAt || '')
  lastHealthHistoryWriteAt = Number.isFinite(lastTs) ? lastTs : 0
}

function writeHealthHistoryToDisk(samples = healthHistory) {
  try {
    fs.mkdirSync(HEALTH_HISTORY_DIR, { recursive: true })
    fs.writeFileSync(HEALTH_HISTORY_FILE, `${JSON.stringify(samples, null, 2)}\n`, 'utf8')
  } catch (error) {
    console.error('[monitor] failed to persist health history to disk', error instanceof Error ? error.message : error)
  }
}

function loadHealthHistoryFromDisk() {
  if (!fs.existsSync(HEALTH_HISTORY_FILE)) {
    healthHistory = []
    lastHealthHistoryWriteAt = 0
    return
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(HEALTH_HISTORY_FILE, 'utf8'))
    healthHistory = mergeHealthHistorySamples(parsed)
    syncHealthHistoryWriteCursor(healthHistory)
  } catch {
    healthHistory = []
    lastHealthHistoryWriteAt = 0
  }
}

async function loadHealthHistoryFromDatabase({ log = true } = {}) {
  if (!analyticsDbPool) return false

  try {
    const { rows } = await analyticsDbPool.query(
      'SELECT payload FROM analytics_state WHERE state_key = $1 LIMIT 1',
      [HEALTH_HISTORY_STATE_KEY]
    )
    if (rows.length === 0 || !rows[0].payload) return false
    const fromDb = normalizeHealthHistorySamples(rows[0].payload)
    if (fromDb.length === 0) return false
    healthHistory = mergeHealthHistorySamples(healthHistory, fromDb)
    syncHealthHistoryWriteCursor(healthHistory)
    writeHealthHistoryToDisk(healthHistory)
    if (log) {
      console.log(`[monitor] Loaded ${healthHistory.length} health history samples from database`)
    }
    return true
  } catch (err) {
    console.warn('[monitor] Failed to load health history from database:', err.message)
    return false
  }
}

async function commitHealthHistorySampleToDatabase(sample) {
  if (!analyticsDbPool) return false

  const client = await analyticsDbPool.connect()
  try {
    await client.query('BEGIN')
    await client.query(
      `INSERT INTO analytics_state (state_key, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (state_key) DO NOTHING`,
      [HEALTH_HISTORY_STATE_KEY, JSON.stringify({ samples: [] })]
    )

    const { rows } = await client.query(
      'SELECT payload FROM analytics_state WHERE state_key = $1 FOR UPDATE',
      [HEALTH_HISTORY_STATE_KEY]
    )
    const existing = normalizeHealthHistorySamples(rows[0]?.payload)
    const last = existing.length > 0 ? existing[existing.length - 1] : null
    const sampleTs = Date.parse(sample?.checkedAt || '') || Date.now()
    const lastTs = last ? Date.parse(last.checkedAt || '') : 0
    const forceSample = shouldForceHealthHistorySample(last, sample)

    // Shared interval gate so multi-replica probes do not thrash the ring buffer.
    if (!forceSample && Number.isFinite(lastTs) && sampleTs - lastTs < HEALTH_HISTORY_MIN_INTERVAL_MS) {
      healthHistory = mergeHealthHistorySamples(existing)
      syncHealthHistoryWriteCursor(healthHistory)
      await client.query('COMMIT')
      return false
    }

    const next = mergeHealthHistorySamples(existing, [sample])
    await client.query(
      'UPDATE analytics_state SET payload = $2::jsonb, updated_at = NOW() WHERE state_key = $1',
      [HEALTH_HISTORY_STATE_KEY, JSON.stringify({ samples: next })]
    )
    await client.query('COMMIT')
    healthHistory = next
    syncHealthHistoryWriteCursor(healthHistory)
    writeHealthHistoryToDisk(healthHistory)
    return true
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    console.warn('[monitor] Failed to commit health history to database:', err.message)
    throw err
  } finally {
    client.release()
  }
}

function queueHealthHistoryDatabaseWrite(sample) {
  if (!analyticsDbPool) return
  healthHistoryDbWriteInFlight = (healthHistoryDbWriteInFlight || Promise.resolve())
    .then(() => commitHealthHistorySampleToDatabase(sample))
    .catch((error) => {
      console.error(
        '[monitor] health history database write failed',
        error instanceof Error ? error.message : error
      )
    })
    .finally(() => {
      // Keep the chain only while work remains; next write re-seeds.
      if (healthHistoryDbWriteInFlight && typeof healthHistoryDbWriteInFlight.then === 'function') {
        // no-op placeholder so callers can await the shared chain
      }
    })
}

function persistHealthHistorySample(sample) {
  const normalized = normalizeHealthHistorySample(sample)
  if (!normalized) return

  // Database path owns the shared interval/force gate across replicas.
  if (analyticsDbPool) {
    // Optimistic local append so this replica's /api/health/history is never empty
    // while the shared write is in flight. Shared commit re-merges and re-gates.
    const last = healthHistory.length > 0 ? healthHistory[healthHistory.length - 1] : null
    const forceSample = shouldForceHealthHistorySample(last, normalized)
    const now = Date.parse(normalized.checkedAt) || Date.now()
    if (forceSample || now - lastHealthHistoryWriteAt >= HEALTH_HISTORY_MIN_INTERVAL_MS) {
      healthHistory = mergeHealthHistorySamples(healthHistory, [normalized])
      syncHealthHistoryWriteCursor(healthHistory)
      writeHealthHistoryToDisk(healthHistory)
    }
    queueHealthHistoryDatabaseWrite(normalized)
    return
  }

  const now = Date.now()
  const last = healthHistory.length > 0 ? healthHistory[healthHistory.length - 1] : null
  const forceSample = shouldForceHealthHistorySample(last, normalized)
  if (!forceSample && now - lastHealthHistoryWriteAt < HEALTH_HISTORY_MIN_INTERVAL_MS) return
  lastHealthHistoryWriteAt = now
  healthHistory = mergeHealthHistorySamples(healthHistory, [normalized])
  writeHealthHistoryToDisk(healthHistory)
}

function seedBootHealthHistorySample() {
  const bootCommit = getReleaseCommit()
  const bootShort = bootCommit ? bootCommit.slice(0, 12) : ''
  const last = healthHistory.length > 0 ? healthHistory[healthHistory.length - 1] : null
  if (bootShort && (!last || last.commitShort !== bootShort)) {
    persistHealthHistorySample({
      checkedAt: new Date().toISOString(),
      status: 'ok',
      commitShort: bootShort,
      analyticsLifetime: typeof store?.lifetime === 'number' ? store.lifetime : 0,
      publicChapterCount: 0,
      prerenderedRouteCount: Object.keys(prerenderManifest || {}).length,
      failedCount: 0,
      replica: process.env.RAILWAY_REPLICA_ID || '',
    })
  }
}

async function hydrateHealthHistory() {
  loadHealthHistoryFromDisk()
  if (analyticsDbPool) {
    await loadHealthHistoryFromDatabase({ log: true })
  }
  seedBootHealthHistorySample()
  if (analyticsDbPool && healthHistoryDbWriteInFlight) {
    await healthHistoryDbWriteInFlight.catch(() => {})
  }
}

loadHealthHistoryFromDisk()

// Operator-visible liveness probe — no secrets, safe to scrape and schedule.
// Returns 200 when core publish surfaces are present, 503 when degraded.
app.get('/api/health', (req, res) => {
  const chapterDataManifest = chapterData.getChapterDataManifest()
  const publicChapterIndex = chapterData.getPublicChapterIndex()
  const releaseCommit = getReleaseCommit()
  const prerenderedRouteCount = Object.keys(prerenderManifest).length

  const checks = {
    distIndex: fs.existsSync(DIST_INDEX_HTML_PATH),
    chapterData: publicChapterIndex.length > 0,
    chapterManifest: Boolean(chapterDataManifest.generatedAt),
    prerender: prerenderedRouteCount > 0,
    analyticsStore: typeof store.lifetime === 'number' && Number.isFinite(store.lifetime) && store.lifetime >= 0,
    recordPdf: fs.existsSync(RECORD_PDF_PATH),
    instituteFieldManualPdf: fs.existsSync(INSTITUTE_FIELD_MANUAL_PDF_PATH),
    databaseConfigured: HAS_DATABASE_URL,
  }

  const failed = Object.entries(checks)
    .filter(([key, ok]) => {
      // databaseConfigured is informational when degraded fallbacks exist;
      // only hard-fail the publish-critical checks.
      if (key === 'databaseConfigured') return false
      return !ok
    })
    .map(([key]) => key)

  const status = failed.length === 0 ? 'ok' : 'degraded'
  const httpStatus = status === 'ok' ? 200 : 503
  const checkedAt = new Date().toISOString()
  const payload = {
    status,
    checkedAt,
    version: APP_VERSION,
    commit: releaseCommit,
    commitShort: releaseCommit ? releaseCommit.slice(0, 12) : '',
    deploymentId: process.env.RAILWAY_DEPLOYMENT_ID || '',
    environment: process.env.RAILWAY_ENVIRONMENT_NAME || process.env.NODE_ENV || '',
    publicChapterCount: publicChapterIndex.length,
    prerenderedRouteCount,
    chapterDataGeneratedAt: chapterDataManifest.generatedAt || '',
    analyticsLifetime: store.lifetime || 0,
    clientErrorIntake: true,
    clientErrorIntakeCount,
    clientErrorIntakeLastAt,
    clientErrorIntakeLastMessage,
    sentryForwardConfigured: Boolean(SENTRY_DSN_CONFIG),
    sentryForwardCount: clientErrorSentryForwardCount,
    sentryForwardLastAt: clientErrorSentryForwardLastAt,
    sentryForwardLastStatus: clientErrorSentryForwardLastStatus,
    healthHistoryStorage: getHealthHistoryStorageLabel(),
    healthHistorySharedAcrossReplicas: Boolean(analyticsDbPool),
    healthHistorySampleCount: healthHistory.length,
    popularChapterCount: getPopularChapterIdsFromAnalytics({ limit: 8, minViews: 3 }).length,
    checks,
    failed,
  }

  persistHealthHistorySample({
    checkedAt,
    status,
    commitShort: payload.commitShort,
    analyticsLifetime: payload.analyticsLifetime,
    publicChapterCount: payload.publicChapterCount,
    prerenderedRouteCount: payload.prerenderedRouteCount,
    failedCount: failed.length,
    replica: process.env.RAILWAY_REPLICA_ID || '',
  })

  res.setHeader('Cache-Control', 'no-store')
  res.status(httpStatus).json(payload)
})

app.get('/api/health/history', async (_req, res) => {
  if (analyticsDbPool) {
    // Return the shared multi-replica view, not just this container's ring buffer.
    await loadHealthHistoryFromDatabase({ log: false })
  }

  const commitTransitions = []
  for (let i = 1; i < healthHistory.length; i += 1) {
    const prev = healthHistory[i - 1]
    const curr = healthHistory[i]
    if (prev?.commitShort && curr?.commitShort && prev.commitShort !== curr.commitShort) {
      commitTransitions.push({
        from: prev.commitShort,
        to: curr.commitShort,
        at: curr.checkedAt || '',
        status: curr.status || '',
      })
    }
  }

  res.setHeader('Cache-Control', 'no-store')
  res.json({
    samples: healthHistory,
    sampleCount: healthHistory.length,
    minIntervalMinutes: HEALTH_HISTORY_MIN_INTERVAL_MS / 60_000,
    maxSamples: HEALTH_HISTORY_MAX,
    persistence: true,
    storage: getHealthHistoryStorageLabel(),
    sharedAcrossReplicas: Boolean(analyticsDbPool),
    commitTransitions,
    uniqueCommits: [...new Set(healthHistory.map((sample) => sample?.commitShort).filter(Boolean))],
    uniqueReplicas: [
      ...new Set(healthHistory.map((sample) => sample?.replica).filter(Boolean)),
    ],
  })
})

function normalizePrerenderRoute(routePath) {
  if (!routePath || routePath === '/') return '/'
  return routePath.endsWith('/') ? routePath.slice(0, -1) : routePath
}

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  if (req.path.startsWith('/api/') || path.extname(req.path)) return next()

  const route = normalizePrerenderRoute(req.path)
  const manifestEntry = prerenderManifest[route]
  if (!manifestEntry) return next()

  const filePath = path.join(__dirname, 'dist', manifestEntry)
  if (!fs.existsSync(filePath)) return next()

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.sendFile(filePath)
})

// RFC 9116 security.txt — always serve from an in-process body so production
// never depends on Vite copying hidden public/.well-known into dist. Disk
// candidates still win when present so public/security.txt remains editable.
const SECURITY_TXT_FALLBACK = `# Veritas Worldwide — security disclosure (RFC 9116)
# https://veritasworldwide.com/.well-known/security.txt

Contact: mailto:privacy@veritasworldwide.com
Contact: mailto:corrections@veritasworldwide.com
Expires: 2027-07-16T00:00:00.000Z
Preferred-Languages: en
Canonical: https://veritasworldwide.com/.well-known/security.txt
Policy: https://veritasworldwide.com/privacy
Hiring: https://veritasworldwide.com/about

# Scope: veritasworldwide.com production web application and related APIs.
# Please report vulnerabilities privately; do not publicly disclose until fixed.
# We do not offer a paid bug bounty program at this time.
`
const SECURITY_TXT_CANDIDATES = [
  path.join(__dirname, 'dist', '.well-known', 'security.txt'),
  path.join(__dirname, 'dist', 'security.txt'),
  path.join(__dirname, 'public', '.well-known', 'security.txt'),
  path.join(__dirname, 'public', 'security.txt'),
]
function loadSecurityTxtBody() {
  for (const candidate of SECURITY_TXT_CANDIDATES) {
    try {
      if (fs.existsSync(candidate)) return fs.readFileSync(candidate, 'utf8')
    } catch {
      // continue
    }
  }
  return SECURITY_TXT_FALLBACK
}
app.get(['/.well-known/security.txt', '/security.txt'], (_req, res) => {
  const body = loadSecurityTxtBody()
  res.status(200)
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.type('text/plain; charset=utf-8')
  return res.send(body)
})

// Static files with aggressive caching for hashed assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  immutable: true,
  setHeaders(res, filePath) {
    // HTML should never be cached (SPA shell)
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
    // Sitemaps, RSS feeds, and robots.txt must not be immutably cached
    if (/\.(xml|txt)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600')
    }
    // Stable-name PDFs are rebuilt in place each deploy — never mark immutable.
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate')
      const base = path.basename(filePath)
      // Hint browsers to download with a stable filename for known public manuals.
      if (base === 'veritas-institute-field-manual.pdf' || base === 'the-record.pdf') {
        res.setHeader('Content-Disposition', `inline; filename="${base}"`)
      }
    }
  },
}))

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  if (req.path.startsWith('/api/')) return next()
  if (!path.extname(req.path)) return next()

  res.status(404)
  res.type('text/plain')
  return res.send('Not found')
})

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

registerBotMetaInjection({ app, rootDir: __dirname })

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

async function startServer() {
  await initializeDatabaseAndAnalytics()
  await hydrateHealthHistory()

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[veritas] Serving on port ${PORT}`)
    console.log(`[veritas] Analytics: ${store.lifetime} lifetime views loaded`)
    console.log(
      `[veritas] Health history: ${healthHistory.length} samples · storage=${getHealthHistoryStorageLabel()}`
    )

    if (DATA_DIR) {
      console.log(`[veritas] Data dir: ${DATA_DIR}`)
    }

    if (process.env.RAILWAY_VOLUME_MOUNT_PATH && !process.env.DATA_DIR) {
      console.log(`[veritas] Using Railway volume mount path: ${process.env.RAILWAY_VOLUME_MOUNT_PATH}`)
    } else if (HAS_DATABASE_URL && !DATA_DIR) {
      console.log('[veritas] Analytics persistence: database only (disk fallback disabled)')
    } else if (!process.env.DATA_DIR) {
      console.warn('[veritas] WARNING: DATA_DIR and RAILWAY_VOLUME_MOUNT_PATH not set — using ./data (data may be lost on redeploy)')
      console.warn('[veritas] Attach a Railway volume or set DATA_DIR to a persistent mount path for analytics retention')
    }
  })
}

void startServer()
