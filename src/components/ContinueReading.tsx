import { ImageWithFallback } from './ImageWithFallback'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { chapterMeta } from '../data/chapterMeta'
import { estimateReadingTime } from '../lib/readingTime'
import { getScopedReadingHistory, type ReadingHistoryRecord } from '../lib/readerState'

export default function ContinueReading() {
  const [recent, setRecent] = useState<ReadingHistoryRecord[]>([])

  useEffect(() => {
    try {
      const records = getScopedReadingHistory()
      if (records.length === 0) return
      // Show chapters that are partially read (5-95%) and recent (last 30 days)
      const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
      const filtered = records
        .filter(r => r.scrollPercent > 5 && r.scrollPercent < 95 && r.timestamp > cutoff)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3)
      setRecent(filtered)
    } catch {}
  }, [])

  if (recent.length === 0) return null

  return (
    <section className="py-8 border-b border-border">
      <div className="flex items-center gap-4 mb-5">
        <h2 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">
          Continue Reading
        </h2>
        <div className="flex-1 h-[1px] bg-border" />
      </div>
      <div className="grid gap-3">
        {recent.map(record => {
          const ch = chapterMeta.find(c => c.id === record.chapterId)
          if (!ch) return null
          return (
            <Link
              key={record.chapterId}
              to={`/chapter/${record.chapterId}`}
              className="group flex items-center gap-4 p-4 border border-border rounded-sm hover:border-crimson transition-colors card-lift"
            >
              {ch.heroImage && (
                <div className="hidden sm:block shrink-0 w-16 h-16 overflow-hidden rounded-sm bg-parchment-dark">
                  <ImageWithFallback src={ch.heroImage} alt="" loading="lazy" className="w-full h-full object-cover" retryCount={2} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson mb-0.5">{ch.number}</p>
                <p className="font-display text-base font-bold text-ink group-hover:text-crimson transition-colors truncate">{ch.title}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1 h-1 bg-border rounded-full max-w-[120px]">
                    <div className="h-full bg-crimson rounded-full" style={{ width: `${record.scrollPercent}%` }} />
                  </div>
                  <span className="font-sans text-[0.6rem] text-ink-faint">{Math.round(record.scrollPercent)}%</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
