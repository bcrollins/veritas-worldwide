import { useEffect } from 'react'

const STORAGE_KEY = 'veritas_reading_history'

interface ReadingRecord {
  chapterId: string
  scrollPercent: number
  timestamp: number
}

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
        const raw = localStorage.getItem(STORAGE_KEY)
        const records: ReadingRecord[] = raw ? JSON.parse(raw) : []
        const idx = records.findIndex(r => r.chapterId === chapterId)
        const entry: ReadingRecord = { chapterId, scrollPercent: percent, timestamp: Date.now() }

        if (idx >= 0) {
          records[idx] = entry
        } else {
          records.push(entry)
        }

        // Keep only last 50 records
        const trimmed = records.slice(-50)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
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
