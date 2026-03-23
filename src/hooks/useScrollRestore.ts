import { useEffect, useRef } from 'react'

const STORAGE_KEY = 'veritas_scroll_positions'
const MAX_ENTRIES = 50

function getPositions(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function savePosition(chapterId: string, scrollY: number) {
  const positions = getPositions()
  positions[chapterId] = scrollY

  // Evict oldest entries if over limit
  const keys = Object.keys(positions)
  if (keys.length > MAX_ENTRIES) {
    const oldest = keys.slice(0, keys.length - MAX_ENTRIES)
    for (const k of oldest) delete positions[k]
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
  } catch {
    // localStorage full or disabled — fail silently
  }
}

export function useScrollRestore(chapterId: string | undefined) {
  const restored = useRef(false)

  // Restore scroll position on mount
  useEffect(() => {
    if (!chapterId || restored.current) return
    const positions = getPositions()
    const saved = positions[chapterId]
    if (saved && saved > 100) {
      // Small delay to let content render
      const timer = setTimeout(() => {
        window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior })
      }, 50)
      return () => clearTimeout(timer)
    }
    restored.current = true
  }, [chapterId])

  // Save scroll position on scroll (debounced)
  useEffect(() => {
    if (!chapterId) return
    let timer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        savePosition(chapterId, window.scrollY)
      }, 300)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [chapterId])

  // Save on unmount (page leave)
  useEffect(() => {
    if (!chapterId) return
    return () => {
      savePosition(chapterId, window.scrollY)
    }
  }, [chapterId])
}
