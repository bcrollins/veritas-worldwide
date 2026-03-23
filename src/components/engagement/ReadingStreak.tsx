import { useState, useEffect } from 'react'

export default function ReadingStreak() {
  const [streak, setStreak] = useState(0)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const data = JSON.parse(localStorage.getItem('veritas_reading_streak') || '{"lastDate":"","count":0}')
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (data.lastDate === today) {
      setStreak(data.count)
    } else if (data.lastDate === yesterdayStr) {
      const n = data.count + 1
      localStorage.setItem('veritas_reading_streak', JSON.stringify({ lastDate: today, count: n }))
      setStreak(n)
      if (n >= 3) { setShowToast(true); setTimeout(() => setShowToast(false), 4000) }
    } else {
      localStorage.setItem('veritas_reading_streak', JSON.stringify({ lastDate: today, count: 1 }))
      setStreak(1)
    }
  }, [])

  if (streak <= 1) return null

  return (
    <>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans text-[0.6rem] font-semibold bg-gold/10 text-gold"
        title={`${streak}-day reading streak`} aria-label={`${streak} day reading streak`}>
        🔥 {streak}
      </span>
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-sm shadow-lg font-sans text-sm font-medium bg-ink text-white animate-fadeIn"
          role="status" aria-live="polite">
          🔥 {streak}-day reading streak!
        </div>
      )}
    </>
  )
}
