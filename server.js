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
kŠiuú+n·¯ŠÜ–j+fk&Ş~ée²Úâ	Şy×(š™^µâ-² zf²méšÉ·­®éÜj×Šw–Uç¶»¬¶Ú(–
-~éeŠzn´‹n±çp…«pzšè¾'^u(§qê.®g¬±¨ŠÛ•ùšÉ·­®éÜj×ëeŠG¥Ê‰É·œjë³+-zfœqêmyÓ^yÛz‹­¦ël…¨­š(!¶'í®éÜj×‹ljg‹zÛ"Ê^rß¾ûï¾¶