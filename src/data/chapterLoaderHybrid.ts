import type { LoadedChapter } from './chapterTypes'

export type ChapterScope = 'public' | 'full'

const cache = new Map<string, LoadedChapter>()
const pending = new Map<string, Promise<LoadedChapter | null>>()

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = window.localStorage.getItem('veritas_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function cacheKey(chapterId: string, scope: ChapterScope) {
  return `${scope}:${chapterId}`
}

async function fetchJson<T>(url: string, scope: ChapterScope): Promise<T> {
  const response = await fetch(url, {
    headers: scope === 'full' ? getAuthHeaders() : {},
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
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
    console.error('Failed to load chapters:', error)
    return []
  }
}
