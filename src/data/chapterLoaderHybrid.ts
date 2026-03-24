/**
 * Hybrid Chapter Loader — dynamic import with Vite code-splitting
 * 
 * Each chapter is a separate chunk loaded on demand.
 * TOC uses lightweight chapterMeta; full content loaded lazily.
 */

import type { Chapter } from './chapterTypes'

// Vite glob import — each chapter becomes its own async chunk
const chapterModules = import.meta.glob<{ default: Chapter }>(
  './chapters/*.ts',
  { eager: false }
) as Record<string, () => Promise<{ default: Chapter }>>

// Cache resolved chapters
const cache = new Map<string, Chapter>()
const pending = new Map<string, Promise<Chapter>>()

/**
 * Load a single chapter by ID. Returns cached if available.
 */
export async function loadChapterContent(chapterId: string): Promise<Chapter | null> {
  // Return from cache
  if (cache.has(chapterId)) return cache.get(chapterId)!

  // Deduplicate concurrent requests
  if (pending.has(chapterId)) return pending.get(chapterId)!

  const key = `./chapters/${chapterId}.ts`
  const loader = chapterModules[key]
  if (!loader) {
    console.warn(`No chapter module for "${chapterId}"`)
    return null
  }

  const promise = loader().then((mod: { default: Chapter }) => {
    const chapter = mod.default
    cache.set(chapterId, chapter)
    pending.delete(chapterId)
    return chapter
  }).catch((err: Error) => {
    console.error(`Failed to load chapter "${chapterId}":`, err)
    pending.delete(chapterId)
    return null as unknown as Chapter
  })

  pending.set(chapterId, promise)
  return promise
}

/**
 * Load chapter by array index (for ReadTheBookPage navigation)
 */
export async function loadChapterByIndex(index: number, ids: string[]): Promise<Chapter | null> {
  if (index < 0 || index >= ids.length) return null
  return loadChapterContent(ids[index])
}

/**
 * Preload chapters in background (e.g. next/prev for smooth nav)
 */
export function preloadChapters(chapterIds: string[]) {
  for (const id of chapterIds) {
    if (!cache.has(id) && !pending.has(id)) {
      loadChapterContent(id).catch(() => {})
    }
  }
}

/**
 * Clear cache (memory management)
 */
export function clearContentCache(chapterId?: string) {
  if (chapterId) { cache.delete(chapterId) }
  else { cache.clear() }
}

export function getCacheStats() {
  return { cached: cache.size, keys: Array.from(cache.keys()) }
}
