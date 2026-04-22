import { useEffect, useRef } from 'react'
import { getScopedScrollPositions, saveScopedScrollPosition } from '../lib/readerState'

const MAX_ENTRIES = 50

export function useScrollRestore(chapterId: string | undefined) {
  const restored = useRef(false)

  // Restore scroll position on mount
  useEffect(() => {
    if (!chapterId || restored.current) return
    const positions = getScopedScrollPositions()
    const saved = positions[chapterId]
    if (saved && saved > 100) {
      // Small delay to let content render
      const timer = setTimeout(() => {
        window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior })
        restored.current = true
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
        saveScopedScrollPosition(chapterId, window.scrollY, MAX_ENTRIES)
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
      saveScopedScrollPosition(chapterId, window.scrollY, MAX_ENTRIES)
    }
  }, [chapterId])
}
