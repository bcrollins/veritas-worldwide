import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const GENERATED_CHAPTER_DATA_DIR = path.join(__dirname, 'generated', 'chapter-data')
const CHAPTER_PUBLIC_DIR = path.join(GENERATED_CHAPTER_DATA_DIR, 'public')
const CHAPTER_FULL_DIR = path.join(GENERATED_CHAPTER_DATA_DIR, 'full')
const CHAPTER_PUBLIC_INDEX_FILE = path.join(GENERATED_CHAPTER_DATA_DIR, 'public-index.json')
const CHAPTER_MANIFEST_FILE = path.join(GENERATED_CHAPTER_DATA_DIR, 'manifest.json')
const RECORD_PDF_PATH = path.join(__dirname, 'dist', 'the-record.pdf')
const DIST_INDEX_HTML_PATH = path.join(__dirname, 'dist', 'index.html')
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json')

let publicChapterIndex = []
let chapterDataManifest = { previewBlockLimit: 3, chapterIds: [], generatedAt: '' }
const EVIDENCE_TIER_ORDER = ['verified', 'circumstantial', 'disputed']
const EVIDENCE_TIER_FILTERS = new Set(['verified', 'circumstantial', 'disputed'])
const CHAPTER_TYPE_FILTERS = new Set(['reference', 'explainer', 'investigation'])
const SEARCH_MATCH_FILTERS = new Set(['all', 'sources'])

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

function sanitizeChapterId(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return /^[a-z0-9-]+$/i.test(trimmed) ? trimmed : ''
}

function readChapterJsonFile(scope, chapterId) {
  const safeId = sanitizeChapterId(chapterId)
  if (!safeId) return null
  const filePath = path.join(scope === 'full' ? CHAPTER_FULL_DIR : CHAPTER_PUBLIC_DIR, `${safeId}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return null
  }
}

function normalizeAvailableEvidenceTiers(tiers) {
  if (!Array.isArray(tiers)) return []
  return EVIDENCE_TIER_ORDER.filter((tier) => tiers.includes(tier))
}

function inferChapterType(chapter) {
  if (!chapter || typeof chapter !== 'object') return null

  if (['foreword', 'overview', 'epilogue'].includes(chapter.id)) {
    return 'reference'
  }

  const typeText = [
    chapter.number,
    chapter.title,
    chapter.subtitle,
    chapter.dateRange,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (chapter.dateRange === 'Explainer' || /explainer|how .* works|methodology/.test(typeText)) {
    return 'explainer'
  }

  return 'investigation'
}

function inferAvailableEvidenceTiers(chapter) {
  const tiers = new Set()

  for (const block of chapter?.content || []) {
    if (block?.type === 'evidence' && typeof block.evidence?.tier === 'string' && EVIDENCE_TIER_FILTERS.has(block.evidence.tier)) {
      tiers.add(block.evidence.tier)
    }
  }

  return EVIDENCE_TIER_ORDER.filter((tier) => tiers.has(tier))
}

function normalizeChapterRecord(chapter, fallbackChapter = null) {
  if (!chapter || typeof chapter !== 'object') return null

  const preferredChapterType = typeof chapter.chapterType === 'string' && CHAPTER_TYPE_FILTERS.has(chapter.chapterType)
    ? chapter.chapterType
    : null
  const fallbackChapterType = typeof fallbackChapter?.chapterType === 'string' && CHAPTER_TYPE_FILTERS.has(fallbackChapter.chapterType)
    ? fallbackChapter.chapterType
    : null
  const preferredEvidenceTiers = normalizeAvailableEvidenceTiers(chapter.availableEvidenceTiers)
  const fallbackEvidenceTiers = normalizeAvailableEvidenceTiers(fallbackChapter?.availableEvidenceTiers)
  const metadataSource = fallbackChapter || chapter

  return {
    ...chapter,
    chapterType: preferredChapterType || fallbackChapterType || inferChapterType(metadataSource),
    availableEvidenceTiers:
      preferredEvidenceTiers.length > 0
        ? preferredEvidenceTiers
        : fallbackEvidenceTiers.length > 0
          ? fallbackEvidenceTiers
          : inferAvailableEvidenceTiers(metadataSource),
  }
}

function loadChapterData() {
  try {
    if (fs.existsSync(CHAPTER_PUBLIC_INDEX_FILE)) {
      const rawPublicIndex = JSON.parse(fs.readFileSync(CHAPTER_PUBLIC_INDEX_FILE, 'utf-8'))
      publicChapterIndex = Array.isArray(rawPublicIndex)
        ? rawPublicIndex
          .map((chapter) => normalizeChapterRecord(chapter, readChapterJsonFile('full', chapter?.id)))
          .filter(Boolean)
        : []
    }
    if (fs.existsSync(CHAPTER_MANIFEST_FILE)) {
      chapterDataManifest = JSON.parse(fs.readFileSync(CHAPTER_MANIFEST_FILE, 'utf-8'))
    }
    if (publicChapterIndex.length > 0) {
      console.log(`[chapter-data] Loaded ${publicChapterIndex.length} public chapter records`)
    }
  } catch (err) {
    console.warn('[chapter-data] Failed to load generated chapter data:', err.message)
    publicChapterIndex = []
  }
}

function getChapterJson(scope, chapterId) {
  const chapter = readChapterJsonFile(scope, chapterId)
  if (!chapter) return null

  if (scope === 'public') {
    return normalizeChapterRecord(chapter, readChapterJsonFile('full', chapterId))
  }

  return normalizeChapterRecord(chapter)
}

function getChapterCollection(scope) {
  if (scope === 'public') {
    return publicChapterIndex
  }

  return (chapterDataManifest.chapterIds || [])
    .map((chapterId) => getChapterJson('full', chapterId))
    .filter(Boolean)
}

function normalizeSearchQuery(value) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, 120)
}

function normalizeFilter(value, allowedValues) {
  if (typeof value !== 'string') return 'all'
  const normalized = value.trim()
  return allowedValues.has(normalized) ? normalized : 'all'
}

function getSearchableChapterText(chapter) {
  return [
    chapter.title,
    chapter.subtitle,
    chapter.dateRange,
    ...(chapter.keywords || []),
    ...(chapter.content || []).map((block) => block.text || block.quote?.text || block.evidence?.text || ''),
    ...(chapter.sources || []).map((source) => `${source.text || ''} ${source.url || ''}`),
  ].join(' ').toLowerCase()
}

function getSearchSnippet(chapter, terms) {
  const queryTerms = terms.filter(Boolean)

  for (const block of chapter.content || []) {
    const text = block.text || block.quote?.text || block.evidence?.text
    if (!text) continue

    const lowerText = text.toLowerCase()
    const matches = queryTerms
      .map((term) => ({ term, index: lowerText.indexOf(term) }))
      .filter((match) => match.index !== -1)

    if (matches.length === 0) continue

    const earliestMatch = matches.reduce((best, match) => (
      match.index < best.index ? match : best
    ))
    const index = earliestMatch.index
    const start = Math.max(0, index - 80)
    const end = Math.min(text.length, index + earliestMatch.term.length + 80)
    const prefix = start > 0 ? '...' : ''
    const suffix = end < text.length ? '...' : ''
    return `${prefix}${text.slice(start, end)}${suffix}`
  }

  const matchedSource = (chapter.sources || []).find((source) => {
    const sourceText = `${source.text || ''} ${source.url || ''}`.toLowerCase()
    return queryTerms.some((term) => sourceText.includes(term))
  })
  if (matchedSource) {
    return matchedSource.text.slice(0, 180) + (matchedSource.text.length > 180 ? '...' : '')
  }

  return chapter.subtitle
}

function getMatchedSearchFields(chapter, terms) {
  const queryTerms = terms.filter(Boolean)
  const matchedFields = []
  const containsAnyTerm = (text) => queryTerms.some((term) => text.includes(term))

  if (containsAnyTerm(chapter.title.toLowerCase())) matchedFields.push('title')
  if (containsAnyTerm(chapter.subtitle.toLowerCase())) matchedFields.push('subtitle')
  if ((chapter.keywords || []).some((keyword) => containsAnyTerm(keyword.toLowerCase()))) matchedFields.push('keywords')

  const contentMatched = (chapter.content || []).some((block) => {
    if (block.text && containsAnyTerm(block.text.toLowerCase())) return true
    if (block.quote?.text && containsAnyTerm(block.quote.text.toLowerCase())) return true
    if (block.evidence?.text && containsAnyTerm(block.evidence.text.toLowerCase())) return true
    if (block.table?.headers?.some((header) => containsAnyTerm(header.toLowerCase()))) return true
    if (block.table?.rows?.some((row) => row.some((cell) => containsAnyTerm(cell.toLowerCase())))) return true
    return false
  })
  if (contentMatched) matchedFields.push('content')

  const sourceMatched = (chapter.sources || []).some((source) => {
    const sourceText = `${source.text || ''} ${source.url || ''}`.toLowerCase()
    return containsAnyTerm(sourceText)
  })
  if (sourceMatched) matchedFields.push('sources')

  return matchedFields
}

function searchChapters(scope, query, filters = {}) {
  const normalized = normalizeSearchQuery(query)
  if (!normalized) return []

  const terms = normalized.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return getChapterCollection(scope)
    .map((chapter) => {
      const searchableText = getSearchableChapterText(chapter)
      if (!terms.every((term) => searchableText.includes(term))) {
        return null
      }

      const matchedIn = getMatchedSearchFields(chapter, terms)
      if (filters.match === 'sources' && !matchedIn.includes('sources')) {
        return null
      }

      if (
        filters.evidenceTier !== 'all' &&
        !(chapter.availableEvidenceTiers || []).includes(filters.evidenceTier)
      ) {
        return null
      }

      if (
        filters.chapterType !== 'all' &&
        chapter.chapterType !== filters.chapterType
      ) {
        return null
      }

      return {
        chapterId: chapter.id,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        chapterSubtitle: chapter.subtitle,
        dateRange: chapter.dateRange,
        accessLevel: chapter.accessLevel,
        chapterType: chapter.chapterType || null,
        availableEvidenceTiers: chapter.availableEvidenceTiers || [],
        matchedIn,
        snippet: getSearchSnippet(chapter, terms),
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.matchedIn.length !== a.matchedIn.length) {
        return b.matchedIn.length - a.matchedIn.length
      }

      return a.chapterId.localeCompare(b.chapterId, undefined, { numeric: true })
    })
}

loadChapterData()

// ── Persistent storage ────────────────────────────────────────────
// Uses explicit DATA_DIR, then Railway's mounted volume path, then falls back to ./data
const DATA_DIR = process.env.DATA_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'analytics.json')

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
  }
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
  '/content-pack': `Content Pack — Shareable Assets | ${ANALYTICS_SITE_NAME}`,
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
    const meta = getChapterMeta(chapterMatch[1])
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

function loadStoreFromDisk() {
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
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store), 'utf-8')
  } catch (err) {
    console.warn('[analytics] Failed to save to disk:', err.message)
  }
}

async function loadStoreFromDatabase() {
  if (!dbPool) return false

  try {
    const { rows } = await dbPool.query(
      'SELECT payload FROM analytics_state WHERE state_key = $1 LIMIT 1',
      [ANALYTICS_STATE_KEY]
    )
    if (rows.length === 0 || !rows[0].payload) return false
    const nextStore = normalizeAnalyticsStore(rows[0].payload)
    if (!hasAnalyticsData(nextStore)) return false
    applyAnalyticsStore(nextStore)
    if (migrateAnalyticsTitles(store)) {
      analyticsDirty = true
    }
    console.log(`[analytics] Loaded ${store.lifetime} lifetime views from database`)
    return true
  } catch (err) {
    console.warn('[analytics] Failed to load from database:', err.message)
    return false
  }
}

async function saveStoreToDatabase() {
  if (!dbPool) return

  try {
    await dbPool.query(
      `INSERT INTO analytics_state (state_key, payload, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (state_key)
       DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
      [ANALYTICS_STATE_KEY, JSON.stringify(store)]
    )
  } catch (err) {
    console.warn('[analytics] Failed to save to database:', err.message)
    throw err
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

// Gzip/Brotli compression — reduces 549KB chapters chunk to ~188KB
app.use(compression())

// Security headers — Lighthouse & OWASP best practices
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
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

app.use(express.json())

// ── Rate limiter (in-memory, zero dependencies) ──────────────────────
const rateLimitStore = new Map()
function rateLimit({ windowMs = 60_000, max = 10, keyFn } = {}) {
  return (req, res, next) => {
    const key = keyFn ? keyFn(req) : getClientIP(req)
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

// Apply strict rate limit to auth endpoints (5 attempts per minute per IP)
app.use('/api/auth/login', rateLimit({ windowMs: 60_000, max: 5 }))
app.use('/api/auth/register', rateLimit({ windowMs: 60_000, max: 3 }))
app.use('/api/analytics/event', rateLimit({ windowMs: 60_000, max: 120 }))

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
  const dateKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)
  store.lifetime += 1
  store.daily[dateKey] = (store.daily[dateKey] || 0) + 1
  store.weekly[weekKey] = (store.weekly[weekKey] || 0) + 1
  store.monthly[monthKey] = (store.monthly[monthKey] || 0) + 1
  store.yearly[yearKey] = (store.yearly[yearKey] || 0) + 1
  const ip = getClientIP(req)
  detectCountryFromIP(ip).then(({ country, code }) => {
    if (!store.countries[code]) { store.countries[code] = { country, code, views: 0 } }
    store.countries[code].views += 1
    markAnalyticsDirty()
  })
  const pageId = pagePath.replace(/\//g, '_') || '_home'
  const resolvedTitle = resolveAnalyticsTitle(pagePath, title)
  if (!store.pages[pageId]) { store.pages[pageId] = { path: pagePath, title: resolvedTitle || pagePath, views: 0 } }
  store.pages[pageId].views += 1
  store.pages[pageId].path = pagePath
  if (resolvedTitle) { store.pages[pageId].title = resolvedTitle }
  markAnalyticsDirty()
  res.setHeader('Cache-Control', 'no-store')
  res.json({ ok: true })
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

app.post('/api/analytics/event', (req, res) => {
  const { name, path: rawPath, properties } = req.body || {}
  if (typeof name !== 'string' || !ANALYTICS_EVENTS.has(name)) {
    return res.status(400).json({ error: 'valid event name required' })
  }

  const now = new Date()
  const dateKey = toDateKey(now)
  const eventPath = sanitizeAnalyticsPath(rawPath)
  const cleanProperties = sanitizeAnalyticsProperties(properties)

  if (!store.events[name]) {
    store.events[name] = { count: 0, lastSeenAt: '', lastPath: '', lastProperties: {} }
  }
  store.events[name].count += 1
  store.events[name].lastSeenAt = now.toISOString()
  if (eventPath) {
    store.events[name].lastPath = eventPath
  }
  if (Object.keys(cleanProperties).length > 0) {
    store.events[name].lastProperties = cleanProperties
  }

  if (!store.eventDaily[dateKey]) {
    store.eventDaily[dateKey] = {}
  }
  store.eventDaily[dateKey][name] = (store.eventDaily[dateKey][name] || 0) + 1

  markAnalyticsDirty()
  res.setHeader('Cache-Control', 'no-store')
  res.json({ ok: true })
})

app.get('/api/analytics/snapshot', (req, res) => {
  // Never cache analytics — always show live cumulative data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
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
  })
})


// ── Database connection (Neon PostgreSQL) ─────────────────────────
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const DATABASE_URL = process.env.DATABASE_URL
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')
const JWT_EXPIRY = '30d'
const BCRYPT_ROUNDS = 12

let dbPool = null
if (DATABASE_URL) {
  dbPool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  })
  dbPool.on('error', (err) => console.error('[db] Pool error:', err.message))
  console.log('[auth] PostgreSQL connected via Neon')
} else {
  console.warn('[auth] DATABASE_URL not set — auth API will return 503')
}

// Helper: verify JWT and return user
async function authenticateToken(req) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null
  try {
    jwt.verify(token, JWT_SECRET)
    if (!dbPool) return null
    const { rows } = await dbPool.query(
      `SELECT u.id, u.email, u.display_name, u.tier, u.created_at, u.is_student
       FROM sessions s
       INNER JOIN users u ON u.id = s.user_id
       WHERE s.token = $1
         AND s.expires_at > NOW()
       LIMIT 1`,
      [token]
    )
    return rows[0] || null
  } catch {
    return null
  }
}

// Helper: require DB
function requireDB(res) {
  if (!dbPool) {
    res.status(503).json({ error: 'Database not configured. Set DATABASE_URL environment variable.' })
    return false
  }
  return true
}

app.get('/api/auth/status', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.json({
    available: !!dbPool,
    mode: dbPool ? 'database' : 'degraded',
  })
})

app.get('/api/chapters', async (req, res) => {
  const wantsFull = req.query.scope === 'full'

  if (!wantsFull) {
    res.setHeader('Cache-Control', 'no-store')
    return res.json({
      previewBlockLimit: chapterDataManifest.previewBlockLimit || 3,
      chapters: publicChapterIndex,
    })
  }

  const user = await authenticateToken(req)
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const chapters = (chapterDataManifest.chapterIds || [])
    .map((chapterId) => getChapterJson('full', chapterId))
    .filter(Boolean)

  res.setHeader('Cache-Control', 'private, no-store')
  return res.json({
    previewBlockLimit: chapterDataManifest.previewBlockLimit || 3,
    chapters,
  })
})

app.get('/api/chapters/:id', async (req, res) => {
  const chapterId = sanitizeChapterId(req.params.id)
  if (!chapterId) {
    return res.status(400).json({ error: 'Invalid chapter id' })
  }

  const user = await authenticateToken(req)
  const scope = user ? 'full' : 'public'
  const chapter = getChapterJson(scope, chapterId)

  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found' })
  }

  res.setHeader('Cache-Control', user ? 'private, no-store' : 'no-store')
  return res.json(chapter)
})

app.get('/api/search', async (req, res) => {
  const query = normalizeSearchQuery(req.query.q)
  const user = await authenticateToken(req)
  const scope = user ? 'full' : 'public'
  const filters = user
    ? {
        evidenceTier: normalizeFilter(req.query.evidence, EVIDENCE_TIER_FILTERS),
        match: normalizeFilter(req.query.match, SEARCH_MATCH_FILTERS),
        chapterType: normalizeFilter(req.query.chapterType, CHAPTER_TYPE_FILTERS),
      }
    : {
        evidenceTier: 'all',
        match: 'all',
        chapterType: 'all',
      }

  res.setHeader('Cache-Control', user ? 'private, no-store' : 'no-store')

  if (!query) {
    return res.json({
      query: '',
      scope,
      filters,
      totalChapters: (chapterDataManifest.chapterIds || []).length || publicChapterIndex.length,
      results: [],
    })
  }

  return res.json({
    query,
    scope,
    filters,
    totalChapters: (chapterDataManifest.chapterIds || []).length || publicChapterIndex.length,
    results: searchChapters(scope, query, filters),
  })
})

app.get('/api/downloads/the-record.pdf', async (req, res) => {
  const user = await authenticateToken(req)
  if (!user) {
    return res.status(401).json({ error: 'Sign in required to download this file.' })
  }
  if (!fs.existsSync(RECORD_PDF_PATH)) {
    return res.status(404).json({ error: 'File not found' })
  }

  res.setHeader('Cache-Control', 'private, no-store')
  return res.sendFile(RECORD_PDF_PATH)
})

app.get('/the-record.pdf', async (req, res) => {
  const user = await authenticateToken(req)
  if (!user) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(401).type('text/plain').send('Sign in required to download this file.')
  }
  if (!fs.existsSync(RECORD_PDF_PATH)) {
    return res.status(404).type('text/plain').send('File not found.')
  }

  res.setHeader('Cache-Control', 'private, no-store')
  return res.sendFile(RECORD_PDF_PATH)
})

// ── Auth API Routes ───────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  if (!requireDB(res)) return
  const { email, password, displayName } = req.body
  if (!email || !password || !displayName) {
    return res.status(400).json({ error: 'Email, password, and display name are required.' })
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }
  const cleanEmail = email.toLowerCase().trim()
  try {
    // Check if email exists
    const existing = await dbPool.query('SELECT id FROM users WHERE email = $1', [cleanEmail])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }
    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    const { rows } = await dbPool.query(
      `INSERT INTO users (email, display_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name, tier, created_at`,
      [cleanEmail, displayName.trim(), passwordHash]
    )
    const user = rows[0]
    // Create JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    // Store session
    const ip = getClientIP(req)
    const ua = req.headers['user-agent'] || ''
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    await dbPool.query(
      'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [user.id, token, expiresAt, ip, ua.substring(0, 500)]
    )
    // Create default preferences
    await dbPool.query('INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id])
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        tier: user.tier,
        createdAt: user.created_at,
      },
    })
  } catch (err) {
    console.error('[auth] Register error:', err.message)
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
})

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  if (!requireDB(res)) return
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }
  const cleanEmail = email.toLowerCase().trim()
  try {
    const { rows } = await dbPool.query(
      'SELECT id, email, display_name, password_hash, tier, created_at, is_student FROM users WHERE email = $1',
      [cleanEmail]
    )
    if (rows.length === 0) {
      return res.status(401).json({ error: 'No account found with this email.' })
    }
    const user = rows[0]
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password.' })
    }
    // Update last login
    await dbPool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id])
    // Create JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    // Store session
    const ip = getClientIP(req)
    const ua = req.headers['user-agent'] || ''
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    await dbPool.query(
      'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [user.id, token, expiresAt, ip, ua.substring(0, 500)]
    )
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        tier: user.tier,
        createdAt: user.created_at,
        isStudent: user.is_student,
      },
    })
  } catch (err) {
    console.error('[auth] Login error:', err.message)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
})

// GET /api/auth/me — validate session + return user data
app.get('/api/auth/me', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  // Get bookmarks
  const { rows: bookmarks } = await dbPool.query(
    'SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  )
  // Get reading progress
  const { rows: progress } = await dbPool.query(
    'SELECT chapter_id, scroll_position, completed, last_read_at FROM reading_progress WHERE user_id = $1',
    [user.id]
  )
  // Get preferences
  const { rows: prefs } = await dbPool.query(
    'SELECT theme, font_size, newsletter_subscribed FROM user_preferences WHERE user_id = $1',
    [user.id]
  )
  res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      tier: user.tier,
      createdAt: user.created_at,
      isStudent: user.is_student,
    },
    bookmarks: bookmarks.map(b => b.chapter_id),
    readingProgress: progress.reduce((acc, p) => {
      acc[p.chapter_id] = { scrollPosition: p.scroll_position, completed: p.completed, lastReadAt: p.last_read_at }
      return acc
    }, {}),
    preferences: prefs[0] || { theme: 'light', font_size: 'medium', newsletter_subscribed: false },
  })
})

// POST /api/auth/logout
app.post('/api/auth/logout', async (req, res) => {
  if (!requireDB(res)) return
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (token) {
    await dbPool.query('DELETE FROM sessions WHERE token = $1', [token]).catch(() => {})
  }
  res.json({ ok: true })
})

// ── User Data API Routes ──────────────────────────────────────────

// POST /api/user/bookmarks — toggle bookmark
app.post('/api/user/bookmarks', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { chapterId, action } = req.body
  if (!chapterId) return res.status(400).json({ error: 'chapterId required' })
  try {
    if (action === 'remove') {
      await dbPool.query('DELETE FROM bookmarks WHERE user_id = $1 AND chapter_id = $2', [user.id, chapterId])
    } else {
      await dbPool.query(
        'INSERT INTO bookmarks (user_id, chapter_id) VALUES ($1, $2) ON CONFLICT (user_id, chapter_id) DO NOTHING',
        [user.id, chapterId]
      )
    }
    const { rows } = await dbPool.query('SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC', [user.id])
    res.json({ bookmarks: rows.map(r => r.chapter_id) })
  } catch (err) {
    console.error('[user] Bookmark error:', err.message)
    res.status(500).json({ error: 'Failed to update bookmark' })
  }
})

// POST /api/user/progress — save reading progress
app.post('/api/user/progress', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { chapterId, scrollPosition, completed } = req.body
  if (!chapterId) return res.status(400).json({ error: 'chapterId required' })
  try {
    await dbPool.query(
      `INSERT INTO reading_progress (user_id, chapter_id, scroll_position, completed, last_read_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, chapter_id)
       DO UPDATE SET scroll_position = $3, completed = COALESCE($4, reading_progress.completed), last_read_at = NOW()`,
      [user.id, chapterId, scrollPosition || 0, completed || false]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Progress error:', err.message)
    res.status(500).json({ error: 'Failed to save progress' })
  }
})

// PUT /api/user/preferences — update preferences
app.put('/api/user/preferences', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { theme, fontSize, newsletterSubscribed } = req.body
  try {
    await dbPool.query(
      `INSERT INTO user_preferences (user_id, theme, font_size, newsletter_subscribed, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET theme = COALESCE($2, user_preferences.theme),
                     font_size = COALESCE($3, user_preferences.font_size),
                     newsletter_subscribed = COALESCE($4, user_preferences.newsletter_subscribed),
                     updated_at = NOW()`,
      [user.id, theme, fontSize, newsletterSubscribed]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Preferences error:', err.message)
    res.status(500).json({ error: 'Failed to update preferences' })
  }
})

// PUT /api/user/profile — update display name
app.put('/api/user/profile', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { displayName } = req.body
  if (!displayName || typeof displayName !== 'string' || displayName.trim().length < 1) {
    return res.status(400).json({ error: 'Display name is required' })
  }
  try {
    await dbPool.query('UPDATE users SET display_name = $1, updated_at = NOW() WHERE id = $2', [displayName.trim(), user.id])
    res.json({ ok: true, displayName: displayName.trim() })
  } catch (err) {
    console.error('[user] Profile error:', err.message)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// POST /api/user/change-password
app.post('/api/user/change-password', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required' })
  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' })
  }
  try {
    const { rows } = await dbPool.query('SELECT password_hash FROM users WHERE id = $1', [user.id])
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
    const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
    await dbPool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newHash, user.id])
    // Invalidate all other sessions
    const authHeader = req.headers['authorization']
    const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    await dbPool.query('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [user.id, currentToken])
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Password change error:', err.message)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

async function initializeDatabaseAndAnalytics() {
  if (!dbPool) return

  let client = null

  try {
    client = await dbPool.connect()
    await client.query(`CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, applied_at TIMESTAMPTZ DEFAULT NOW())`)

    const migrations = [
      { name: '001_create_users', sql: `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, display_name VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, tier VARCHAR(50) DEFAULT 'free', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), last_login_at TIMESTAMPTZ, is_student BOOLEAN DEFAULT FALSE, student_email VARCHAR(255)); CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);` },
      { name: '002_create_sessions', sql: `CREATE TABLE IF NOT EXISTS sessions (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, token VARCHAR(512) UNIQUE NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), ip_address VARCHAR(45), user_agent TEXT); CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token); CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);` },
      { name: '003_create_bookmarks', sql: `CREATE TABLE IF NOT EXISTS bookmarks (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);` },
      { name: '004_create_reading_progress', sql: `CREATE TABLE IF NOT EXISTS reading_progress (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, scroll_position FLOAT DEFAULT 0, completed BOOLEAN DEFAULT FALSE, last_read_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_progress_user ON reading_progress(user_id);` },
      { name: '005_create_preferences', sql: `CREATE TABLE IF NOT EXISTS user_preferences (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE, theme VARCHAR(20) DEFAULT 'light', font_size VARCHAR(20) DEFAULT 'medium', newsletter_subscribed BOOLEAN DEFAULT FALSE, updated_at TIMESTAMPTZ DEFAULT NOW());` },
      { name: '006_create_analytics_state', sql: `CREATE TABLE IF NOT EXISTS analytics_state (state_key VARCHAR(100) PRIMARY KEY, payload JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());` },
    ]

    const { rows: applied } = await client.query('SELECT name FROM migrations')
    const appliedSet = new Set(applied.map((row) => row.name))

    for (const migration of migrations) {
      if (appliedSet.has(migration.name)) continue

      try {
        await client.query('BEGIN')
        await client.query(migration.sql)
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [migration.name])
        await client.query('COMMIT')
        console.log(`[db] Migration applied: ${migration.name}`)
      } catch (err) {
        await client.query('ROLLBACK').catch(() => {})
        throw err
      }
    }

    console.log('[db] All migrations up to date')
  } catch (err) {
    console.error('[db] Migration error:', err.message)
    return
  } finally {
    client?.release()
  }

  const loadedFromDatabase = await loadStoreFromDatabase()
  if (!loadedFromDatabase && hasAnalyticsData()) {
    try {
      await saveStoreToDatabase()
      console.log('[analytics] Seeded database state from disk analytics store')
    } catch (err) {
      console.warn('[analytics] Failed to seed database from disk:', err.message)
    }
  }
}


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
    previewBlockLimit: chapterDataManifest.previewBlockLimit || 3,
    publicChapterCount: publicChapterIndex.length,
    prerenderedRouteCount: Object.keys(prerenderManifest).length,
    entryAssets: getDistEntryAssets(),
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

// ── Social crawler bot meta injection ─────────────────────────────
// Bots that don't execute JS get per-chapter OG tags injected server-side
const BOT_UA = /googlebot|bingbot|yandexbot|baiduspider|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|redditbot|applebot|semrushbot|ahrefsbot|mj12bot/i
const SITE_URL = 'https://veritasworldwide.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

// Lightweight chapter metadata for bot responses (avoids importing TS data)
function getChapterMeta(slug) {
  const chapters = {
    'foreword': { title: 'A Note on Methodology, Evidence Standards & How to Read This Book', desc: 'This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and ve' },
    'overview': { title: 'The World Today', desc: 'How a convergence of financial, political, pharmaceutical, and intelligence systems created the architecture of modern control — and why most people never notic' },
    'chapter-1': { title: 'The Birth of Central Banking', desc: 'From the Frankfurt ghetto to the Bank of England, from Napoleon\'s wars to the halls of the United States Congress, the story of how private banking dynasties ca' },
    'chapter-2': { title: 'The Bank War & The Presidents Who Fought Back', desc: 'Four American presidents took on the banking establishment. Three were assassinated. One survived an assassination attempt that should have killed him.' },
    'chapter-3': { title: 'Jekyll Island & the Creation of the Federal Reserve', desc: 'In November 1910, six men representing a quarter of the world\'s wealth boarded a private rail car in New Jersey. Their destination: a private island off the c' },
    'chapter-4': { title: 'The Warburg Brothers & World War I', desc: 'Two brothers from one of Europe\'s most powerful banking families found themselves on opposite sides of the Great War — one advising the Kaiser, the other shap' },
    'chapter-5': { title: 'Henry Ford, The International Jew & the Gold Standard', desc: 'The industrialist who built the American middle class also published the most controversial newspaper series in American history — and his warnings about the go' },
    'chapter-6': { title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', desc: 'The documented history of the political movement that would reshape the Middle East and redefine the relationship between religion, nationalism, and geopolitics' },
    'chapter-7': { title: 'Mossad: The Institute', desc: 'The intelligence agency that operates by its own rules — from covert assassinations to nuclear espionage, documented through declassified files and sworn testim' },
    'chapter-8': { title: 'JFK, Dimona & AIPAC', desc: 'President Kennedy\'s documented confrontation with Israel\'s secret nuclear program and the lobby that would reshape American foreign policy.' },
    'chapter-9': { title: 'JFK — Expanded Analysis', desc: 'A comprehensive examination of the evidence surrounding the assassination of President John F. Kennedy, including declassified documents released through 2025.' },
    'chapter-10': { title: 'The Petrodollar System', desc: 'How a secret agreement between Henry Kissinger and the Saudi royal family created the foundation of American economic hegemony — and why it is now unraveling.' },
    'chapter-11': { title: 'Shadow Institutions — Bilderberg, CFR, Trilateral Commission & the BIS', desc: 'The private organizations where the world\'s most powerful people meet behind closed doors — documented through leaked attendee lists, founding charters, and t' },
    'chapter-12': { title: 'How the Federal Reserve Works', desc: 'A plain-English explainer on the institution that controls the American money supply, who owns it, and how it operates — stripped of jargon and presented with p' },
    'chapter-13': { title: 'The 2008 Financial Crisis', desc: 'How Wall Street\'s reckless gambling crashed the global economy, how the government bailed out the banks with taxpayer money, and how no one went to prison.' },
    'chapter-14': { title: 'AIPAC & Congressional Lobbying', desc: 'The most powerful foreign policy lobby in America — how it operates, who it funds, and what happens to those who oppose it.' },
    'chapter-15': { title: 'U.S. Foreign Aid to Israel', desc: 'A comprehensive accounting of American taxpayer money sent to Israel — totaling over $300 billion in inflation-adjusted terms — and the legal framework that ena' },
    'chapter-16': { title: 'The USS Liberty Incident', desc: 'On June 8, 1967, Israeli forces attacked an American intelligence ship in international waters, killing 34 U.S. servicemen. The official investigation was class' },
    'chapter-17': { title: 'The Assassination of Robert F. Kennedy', desc: 'The evidence surrounding the murder of a presidential candidate who promised to reopen his brother\'s assassination investigation.' },
    'chapter-18': { title: 'Operation Mockingbird & CIA Media Influence', desc: 'The documented CIA program to infiltrate and influence American media — from the Cold War to the present day.' },
    'chapter-19': { title: 'MKUltra & Government Mind Control Programs', desc: 'The CIA\'s documented program of human experimentation — using drugs, torture, and psychological manipulation on unwitting American citizens.' },
    'chapter-20': { title: 'Rockefeller Medicine & the Chronic Disease Machine', desc: 'How the Rockefeller Foundation reshaped American medicine to favor pharmaceutical treatment over prevention — and the financial incentives that keep the system ' },
    'chapter-21': { title: 'Vaccine History — From Polio to COVID-19', desc: 'A documented history of vaccine development, the regulatory framework that governs it, and the financial incentives that shape public health policy.' },
    'chapter-22': { title: 'September 11, 2001', desc: 'The event that changed the world — examined through the official record, the 9/11 Commission Report, and the questions that remain unanswered.' },
    'chapter-23': { title: 'The War on Drugs', desc: 'How a policy designed to criminalize dissent became the longest and most expensive domestic war in American history.' },
    'chapter-24': { title: 'Fluoride & Public Water', desc: 'The documented history of water fluoridation — from its industrial origins to its adoption as public health policy.' },
    'chapter-25': { title: 'The Titanic, the Federal Reserve & the Men Who Opposed It', desc: 'Three of the wealthiest men who opposed the creation of the Federal Reserve boarded the same ship in April 1912. None of them survived.' },
    'chapter-26': { title: 'Bohemian Grove & Elite Gatherings', desc: 'Inside the private retreat where American presidents, defense contractors, and media moguls gather each summer in the redwoods of Northern California.' },
    'chapter-27': { title: 'The Surveillance State — From ECHELON to Pegasus', desc: 'The documented history of government mass surveillance — from Cold War signals intelligence to the smartphone in your pocket.' },
    'chapter-28': { title: 'The Epstein Files', desc: 'The intelligence-linked operation that compromised the world\'s most powerful people — documented through court filings, flight logs, and the testimony of surv' },
    'epilogue': { title: 'A Note on Continued Research & Primary Source Access', desc: 'Where to find the original documents, how to verify the claims in this book, and how to continue the investigation.' },
  }
  return chapters[slug] || null
}

app.use((req, res, next) => {
  const ua = req.headers['user-agent'] || ''
  if (!BOT_UA.test(ua)) return next()

  // Read the HTML shell
  const htmlPath = path.join(__dirname, 'dist', 'index.html')
  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Static page meta for bots
  const staticPages = {
    '/methodology': { title: 'Methodology | Veritas Worldwide', desc: 'Our four-tier source hierarchy and three-tier evidence classification system explained.' },
    '/sources': { title: 'Sources | Veritas Worldwide', desc: 'Master bibliography and source library for The Record — 500+ primary source documents.' },
    '/search': { title: 'Search | Veritas Worldwide', desc: 'Search all 31 chapters of The Record by keyword, topic, or evidence classification.' },
    '/timeline': { title: 'Timeline | Veritas Worldwide', desc: 'An interactive chronological timeline of events documented in The Record, from 1694 to present.' },
    '/analytics': { title: 'Reader Analytics | Veritas Worldwide', desc: 'Public readership analytics for The Record.' },
    '/accessibility': { title: 'Accessibility | Veritas Worldwide', desc: 'Accessibility statement and WCAG 2.1 AA compliance information for Veritas Worldwide.' },
    '/privacy': { title: 'Privacy Policy | Veritas Worldwide', desc: 'How Veritas Worldwide handles reader data, analytics, and privacy. Minimal data collection, no advertising trackers.' },
    '/terms': { title: 'Terms of Use | Veritas Worldwide', desc: 'Terms of use for Veritas Worldwide. Free and open access under Creative Commons BY-NC-SA 4.0.' },
    '/israel-dossier': { title: 'The Israel Dossier | Veritas Worldwide', desc: 'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — every figure sourced to government records, UN agencies, and verified reporting.' },
    '/membership': { title: 'Membership | Veritas Worldwide', desc: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.' },
    '/deep-state': { title: 'The Deep State — The Epstein Network | Veritas Worldwide', desc: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.' },
    '/forum': { title: 'Veritas Forum | Veritas Worldwide', desc: 'Community discussion forum for truth-seekers, researchers, and investigators. Discuss The Record, share evidence, and connect with fellow citizens demanding accountability.' },
    '/profiles': { title: 'Power Profiles | Veritas Worldwide', desc: 'Sourced profiles of 235+ politicians, billionaires, lobbyists, and power brokers. Every claim cited to FEC filings, congressional records, court documents, and verified journalism.' },
    '/content-pack': { title: 'Content Packs & Brand Kit | Veritas Worldwide', desc: 'Official brand assets and social media content packs for Veritas Worldwide. Free for press, social media, and advocacy.' },
    '/news': { title: 'News | Veritas Worldwide', desc: 'Latest news and updates from Veritas Worldwide.' },
    '/donate': { title: 'Support Our Research | Veritas Worldwide', desc: 'Fund independent, source-verified investigative journalism. No party. No agenda. Just the record. Every contribution keeps the archive online and free.' },
    '/read': { title: 'Read The Record | Veritas Worldwide', desc: 'Read all 31 chapters of The Record — a documentary history spanning 1694 to present. Primary sources. Public record. Your conclusions.' },
  }

  const staticMeta = staticPages[req.path]
  if (staticMeta) {
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${staticMeta.title}</title>`)
      .replace(/content="The Record \| Veritas Worldwide"/, `content="${staticMeta.title}"`)
      .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/, `content="${staticMeta.desc}"`)
      .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/, `content="${staticMeta.desc}"`)
  }

  // Check if this is a chapter route
  const chapterMatch = req.path.match(/^\/chapter\/(.+)$/)
  if (chapterMatch) {
    const meta = getChapterMeta(chapterMatch[1])
    if (meta) {
      const chapterUrl = `${SITE_URL}/chapter/${chapterMatch[1]}`
      const chapterSlug = chapterMatch[1]
      // Use PNG OG image if available, fall back to SVG, then default
      const pngPath = path.join(__dirname, 'dist', 'og', `${chapterSlug}.png`)
      const svgPath = path.join(__dirname, 'dist', 'og', `${chapterSlug}.svg`)
      let chapterOgImage = OG_IMAGE
      if (fs.existsSync(pngPath)) {
        chapterOgImage = `${SITE_URL}/og/${chapterSlug}.png`
      } else if (fs.existsSync(svgPath)) {
        chapterOgImage = `${SITE_URL}/og/${chapterSlug}.svg`
      }
      const imgType = chapterOgImage.endsWith('.png') ? 'image/png' : chapterOgImage.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
      // Replace default meta tags with chapter-specific ones
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${meta.title} | The Record — Veritas Worldwide</title>`)
        .replace(/content="The Record \| Veritas Worldwide"/g, `content="${meta.title} | The Record — Veritas Worldwide"`)
        .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="${meta.desc}"`)
        .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="${meta.desc}"`)
        .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${chapterUrl}"`)
        .replace(/content="website"/, `content="article"`)
        .replace(/content="https:\/\/veritasworldwide\.com\/og-image\.png"/g, `content="${chapterOgImage}"`)
        .replace(/content="image\/png"/, `content="${imgType}"`)
    }
  }

  // Check if this is a profile route
  const profileMatch = req.path.match(/^\/profile\/(.+)$/)
  if (profileMatch) {
    const slug = profileMatch[1]
    // Convert slug to readable name: "ted-cruz" → "Ted Cruz"
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const profileUrl = `${SITE_URL}/profile/${slug}`
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${name} — Power Profile | Veritas Worldwide</title>`)
      .replace(/content="The Record \| Veritas Worldwide"/g, `content="${name} — Power Profile | Veritas Worldwide"`)
      .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes. Every claim cited to FEC filings, congressional records, and verified journalism."`)
      .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes."`)
      .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${profileUrl}"`)
      .replace(/content="website"/, `content="article"`)
  }

  res.send(html)
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

async function startServer() {
  await initializeDatabaseAndAnalytics()

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[veritas] Serving on port ${PORT}`)
    console.log(`[veritas] Data dir: ${DATA_DIR}`)
    console.log(`[veritas] Analytics: ${store.lifetime} lifetime views loaded`)
    if (process.env.RAILWAY_VOLUME_MOUNT_PATH && !process.env.DATA_DIR) {
      console.log(`[veritas] Using Railway volume mount path: ${process.env.RAILWAY_VOLUME_MOUNT_PATH}`)
    } else if (!process.env.DATA_DIR) {
      console.warn('[veritas] WARNING: DATA_DIR and RAILWAY_VOLUME_MOUNT_PATH not set — using ./data (data may be lost on redeploy)')
      console.warn('[veritas] Attach a Railway volume or set DATA_DIR to a persistent mount path for analytics retention')
    }
  })
}

void startServer()
