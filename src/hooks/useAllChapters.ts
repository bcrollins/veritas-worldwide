import { useState, useEffect } from 'react'
import type { LoadedChapter } from '../data/chapterTypes'
import { loadAllChapters, type ChapterScope } from '../data/chapterLoaderHybrid'

/**
 * Hook to lazily load all chapter content.
 * Returns { chapters, loading } — chapters is empty array until loaded.
 * Used by pages that need full content (SourcesPage, SearchPage, Admin).
 */
export function useAllChapters(options: { scope?: ChapterScope } = {}) {
  const [chapters, setChapters] = useState<LoadedChapter[]>([])
  const [loading, setLoading] = useState(true)
  const scope = options.scope ?? 'public'

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    loadAllChapters({ scope }).then(all => {
      if (!cancelled) {
        setChapters(all)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [scope])

  return { chapters, loading }
}
