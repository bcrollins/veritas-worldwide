import { useEffect } from 'react'
import { saveScopedReadingHistory } from '../lib/readerState'

export function useReadingHistory(chapterId: string | undefined) {
  useEffect(() => {
    if (!chapterId) return

    let ticking = false
    const save = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))

      try {
        saveScopedReadingHistory(chapterId, scrollTop, percent)
      } catch {}
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          save()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [chapterId])
}
