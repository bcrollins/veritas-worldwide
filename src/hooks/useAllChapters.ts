import { useState, useEffect } from 'react'
import type { LoadedChapter } from '../data/chapterTypes'
import { loadAllChapters } from '../data/chapterLoaderHybrid'

/**
 * Hook to lazily load all chapter content.
 * Returns { chapters, loading } — chapters is empty array until loaded.
 * Used by pages that need full content (SourcesPage, SearchPage, Admin).
 */
export function useAllChapters() {
  const [chapters, setChapters] = useState<LoadedChapter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    loadAllChapters().then(all => {
      if (!cancelled) {
        setChapters(all)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  return { chapters, loading }
}
