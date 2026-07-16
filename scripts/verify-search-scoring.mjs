#!/usr/bin/env node
/**
 * Pure-function checks for search score ladder:
 * title weights >> personal engagement (+18) >> sitewide popularity (+8).
 */

function scoreSearchMatch(matchedIn = [], { recentBoost = false, popularityBoost = false } = {}) {
  const SEARCH_FIELD_WEIGHTS = {
    title: 100,
    subtitle: 45,
    keywords: 35,
    sources: 30,
    content: 12,
  }
  let score = matchedIn.reduce((sum, field) => sum + (SEARCH_FIELD_WEIGHTS[field] || 0), 0)
  if (recentBoost) score += 18
  if (popularityBoost && !recentBoost) score += 8
  return score
}

function chapterIdFromPath(pathValue) {
  if (typeof pathValue !== 'string') return ''
  const match = pathValue.match(/^\/chapter\/(chapter-\d+|foreword|overview|epilogue)\/?$/i)
  return match ? match[1].toLowerCase() : ''
}

function getPopularChapterIds(pages, { limit = 8, minViews = 3 } = {}) {
  return Object.values(pages)
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

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:search-scoring] FAIL — ${message}`)
    process.exit(1)
  }
}

const base = scoreSearchMatch(['title', 'content'])
const popular = scoreSearchMatch(['title', 'content'], { popularityBoost: true })
const engaged = scoreSearchMatch(['title', 'content'], { recentBoost: true, popularityBoost: true })
assert(popular === base + 8, `popularity +8 expected, got ${popular - base}`)
assert(engaged === base + 18, `engagement +18 supersedes popularity, got ${engaged - base}`)
assert(base + 18 < 100, 'engagement must remain below title weight')

const ids = getPopularChapterIds({
  a: { path: '/chapter/chapter-9', views: 12 },
  b: { path: '/chapter/chapter-1/', views: 20 },
  c: { path: '/about', views: 100 },
  d: { path: '/chapter/chapter-3', views: 2 },
  e: { path: '/chapter/chapter-12', views: 5 },
})
assert(JSON.stringify(ids) === JSON.stringify(['chapter-1', 'chapter-9', 'chapter-12']), `ids=${ids}`)

console.log('[verify:search-scoring] PASS')
