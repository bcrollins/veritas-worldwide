import path from 'path'
import fs from 'fs'

const EVIDENCE_TIER_ORDER = ['verified', 'circumstantial', 'disputed']
const EVIDENCE_TIER_FILTERS = new Set(['verified', 'circumstantial', 'disputed'])
const CHAPTER_TYPE_FILTERS = new Set(['reference', 'explainer', 'investigation'])
const SEARCH_MATCH_FILTERS = new Set(['all', 'sources'])

export function createChapterDataTools({ rootDir }) {
  const generatedChapterDataDir = path.join(rootDir, 'generated', 'chapter-data')
  const chapterPublicDir = path.join(generatedChapterDataDir, 'public')
  const chapterFullDir = path.join(generatedChapterDataDir, 'full')
  const chapterPublicIndexFile = path.join(generatedChapterDataDir, 'public-index.json')
  const chapterManifestFile = path.join(generatedChapterDataDir, 'manifest.json')

  let publicChapterIndex = []
  let chapterDataManifest = { previewBlockLimit: 3, chapterIds: [], generatedAt: '' }

  function sanitizeChapterId(value) {
    if (typeof value !== 'string') return ''
    const trimmed = value.trim()
    return /^[a-z0-9-]+$/i.test(trimmed) ? trimmed : ''
  }

  function readChapterJsonFile(scope, chapterId) {
    const safeId = sanitizeChapterId(chapterId)
    if (!safeId) return null
    const filePath = path.join(scope === 'full' ? chapterFullDir : chapterPublicDir, `${safeId}.json`)
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
      if (
        block?.type === 'evidence' &&
        typeof block.evidence?.tier === 'string' &&
        EVIDENCE_TIER_FILTERS.has(block.evidence.tier)
      ) {
        tiers.add(block.evidence.tier)
      }
    }

    return EVIDENCE_TIER_ORDER.filter((tier) => tiers.has(tier))
  }

  function normalizeChapterRecord(chapter, fallbackChapter = null) {
    if (!chapter || typeof chapter !== 'object') return null

    const preferredChapterType =
      typeof chapter.chapterType === 'string' && CHAPTER_TYPE_FILTERS.has(chapter.chapterType)
        ? chapter.chapterType
        : null
    const fallbackChapterType =
      typeof fallbackChapter?.chapterType === 'string' && CHAPTER_TYPE_FILTERS.has(fallbackChapter.chapterType)
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
      if (fs.existsSync(chapterPublicIndexFile)) {
        const rawPublicIndex = JSON.parse(fs.readFileSync(chapterPublicIndexFile, 'utf-8'))
        publicChapterIndex = Array.isArray(rawPublicIndex)
          ? rawPublicIndex
            .map((chapter) => normalizeChapterRecord(chapter, readChapterJsonFile('full', chapter?.id)))
            .filter(Boolean)
          : []
      }
      if (fs.existsSync(chapterManifestFile)) {
        chapterDataManifest = JSON.parse(fs.readFileSync(chapterManifestFile, 'utf-8'))
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
    ]
      .join(' ')
      .toLowerCase()
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

      const earliestMatch = matches.reduce((best, match) => (match.index < best.index ? match : best))
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

  return {
    loadChapterData,
    getChapterDataManifest: () => chapterDataManifest,
    getPublicChapterIndex: () => publicChapterIndex,
    getChapterJson,
    sanitizeChapterId,
    normalizeSearchQuery,
    normalizeFilter,
    searchChapters,
    evidenceTierFilters: EVIDENCE_TIER_FILTERS,
    searchMatchFilters: SEARCH_MATCH_FILTERS,
    chapterTypeFilters: CHAPTER_TYPE_FILTERS,
  }
}
