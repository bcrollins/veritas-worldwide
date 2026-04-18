import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { registerDatabaseAndAuthRoutes } from './server-auth.js'
import { registerBotMetaInjection } from './server-social-meta.js'

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
    ? fallbackChapterType = fallbackChapter.chapterType
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

function recordSignupAttribution(bucket, rawLabel, now, eventPath) {
  if (typeof rawLabel !== 'string') return
  const label = rawLabel.trim().slice(0, 160)
  if (!label || label === '__proto__' || label === 'constructor' || label === 'prototype') return

  if (!store.signupAttribution[bucket][label]) {
    store.signupAttribution[bucket][label] = { count: 0, lastSeenAt: '', lastPath: '' }
  }

  const entry = store.signupAttribution[bucket][label]
  entry.count += 1
  entry.lastSeenAt = now.toISOString()
  if (eventPath) {
    entry.lastPath = eventPath
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

  if (name === 'email_signup') {
    recordSignupAttribution('sources', cleanProperties.source, now, eventPath)
    recordSignupAttribution('interests', cleanProperties.content_interest, now, eventPath)
    recordSignupAttribution('returnPaths', cleanProperties.return_to, now, eventPath)
  }

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


const { initializeDatabaseAndAnalytics } = registerDatabaseAndAuthRoutes({
  app,
  chapterState: {
    getChapterDataManifest: () => chapterDataManifest,
    getPublicChapterIndex: () => publicChapterIndex,
  },
  chapterHelpers: {
    getChapterJson,
    sanitizeChapterId,
    normalizeSearchQuery,
    normalizeFilter,
    searchChapters,
    evidenceTierFilters: EVIDENCE_TIER_FILTERS,
    searchMatchFilters: SEARCH_MATCH_FILTERS,
    chapterTypeFilters: CHAPTER_TYPE_FILTERS,
  },
  analyticsStore: {
    loadStoreFromDatabase,
    hasAnalyticsData,
    saveStoreToDatabase,
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

registerBotMetaInjection({ app, rootDir: __dirname })

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
