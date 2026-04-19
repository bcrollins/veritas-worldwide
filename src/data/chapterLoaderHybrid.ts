import type { LoadedChapter } from './chapterTypes'

export type ChapterScope = 'public' | 'full'

const cache = new Map<string, LoadedChapter>()
const pending = new Map<string, Promise<LoadedChapter | null>>()
const loggedFallbackWarnings = new Set<string>()
let localPublicIndexPromise: Promise<LoadedChapter[]> | null = null

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = window.localStorage.getItem('veritas_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function cacheKey(chapterId: string, scope: ChapterScope) {
  return `${scope}:${chapterId}`
}

function canUseLocalGeneratedFallback() {
  if (typeof window === 'undefined') return false
  return import.meta.env.DEV && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)
}

async function fetchLocalGeneratedJson<T>(relativePath: string): Promise<T | null> {
  if (!canUseLocalGeneratedFallback()) return null

  try {
    const response = await fetch(relativePath, {
      headers: { accept: 'application/json' },
    })

    if (!response.ok) return null

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) return null

    return response.json() as Promise<T>
  } catch {
    return null
  }
}

async function getLocalPublicChapter(chapterId: string): Promise<LoadedChapter | null> {
  return fetchLocalGeneratedJson<LoadedChapter>(`/generated/chapter-data/public/${encodeURIComponent(chapterId)}.json`)
}

async function getLocalPublicIndex(): Promise<LoadedChapter[]> {
  if (!localPublicIndexPromise) {
    localPublicIndexPromise = fetchLocalGeneratedJson<LoadedChapter[]>('/generated/chapter-data/public-index.json')
      .then((index) => (Array.isArray(index) ? index : []))
  }

  return localPublicIndexPromise
}

function logLocalFallbackWarningOnce(key: string, message: string) {
  if (loggedFallbackWarnings.has(key)) return
  loggedFallbackWarnings.add(key)
  console.warn(message)
}

function getLocalFallbackError(url: string, response: Response, bodyPreview: string) {
  const contentType = response.headers.get('content-type') || 'unknown content-type'
  const preview = bodyPreview.replace(/\s+/g, ' ').trim().slice(0, 80)
  return new Error(`Expected JSON from ${url} but received ${contentType}${preview ? ` (${preview})` : ''}`)
}

async function fetchJson<T>(url: string, scope: ChapterScope): Promise<T> {
  const response = await fetch(url, {
    headers: scope === 'full' ? getAuthHeaders() : {},
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    const bodyPreview = await response.text()
    throw getLocalFallbackError(url, response, bodyPreview)
  }

  return response.json() as Promise<T>
}

export async function loadChapterContent(
  chapterId: string,
  options: { scope?: ChapterScope } = {}
): Promise<LoadedChapter | null> {
  const scope = options.scope ?? 'full'
  const key = cacheKey(chapterId, scope)

  if (cache.has(key)) return cache.get(key) || null
  if (pending.has(key)) return pending.get(key) || null

  const promise = fetchJson<LoadedChapter>(`/api/chapters/${chapterId}`, scope)
    .catch(async (error: Error) => {
      if (!canUseLocalGeneratedFallback()) throw error

      const fallbackChapter = await getLocalPublicChapter(chapterId)
      if (!fallbackChapter) throw error

      logLocalFallbackWarningOnce(
        `chapter:${chapterId}`,
        `[chapter-loader] Falling back to generated public data for "${chapterId}" because ${error.message}`,
      )
      return fallbackChapter
    })
    .then((chapter) => {
      pending.delete(key)

      if (scope === 'full' && chapter.accessLevel === 'preview') {
        cache.set(cacheKey(chapterId, 'public'), chapter)
        return chapter
      }

      cache.set(key, chapter)
      return chapter
    })
    .catch((error: Error) => {
      console.error(`Failed to load chapter "${chapterId}":`, error)
      pending.delete(key)
      return null
    })

  pending.set(key, promise)
  return promise
}

export async function loadChapterByIndex(index: number, ids: string[], options: { scope?: ChapterScope } = {}) {
  if (index < 0 || index >= ids.length) return null
  return loadChapterContent(ids[index], options)
}

export function preloadChapters(chapterIds: string[], options: { scope?: ChapterScope } = {}) {
  for (const id of chapterIds) {
    void loadChapterContent(id, options)
  }
}

export function clearContentCache(chapterId?: string) {
  if (chapterId) {
    cache.delete(cacheKey(chapterId, 'full'))
    cache.delete(cacheKey(chapterId, 'public'))
  } else {
    cache.clear()
  }
}

export function getCacheStats() {
  return { cached: cache.size, keys: Array.from(cache.keys()) }
}

export async function loadAllChapters(options: { scope?: ChapterScope } = {}): Promise<LoadedChapter[]> {
  const scope = options.scope ?? 'public'
  const query = scope === 'full' ? '?scope=full' : ''

  try {
    const data = await fetchJson<{ chapters: LoadedChapter[] }>(`/api/chapters${query}`, scope)
    data.chapters.forEach((chapter) => {
      const cacheScope = chapter.accessLevel === 'full' ? 'full' : 'public'
      cache.set(cacheKey(chapter.id, cacheScope), chapter)
    })
    return data.chapters
  } catch (error) {
    if (canUseLocalGeneratedFallback()) {
      const localPublicIndex = await getLocalPublicIndex()
      if (localPublicIndex.length > 0) {
        logLocalFallbackWarningOnce(
          'index',
          `[chapter-loader] Falling back to generated public chapter index because ${error instanceof Error ? error.message : 'the API response was invalid'}`,
        )
        localPublicIndex.forEach((chapter) => {
          cache.set(cacheKey(chapter.id, 'public'), chapter)
        })
        return localPublicIndex
      }
    }

    console.error('Failed to load chapters:', error)
    return []
  }
}
