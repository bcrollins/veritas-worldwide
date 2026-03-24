import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
      if (n >= 3) { setShowToast(true); setTimeout(() => setShowToast(false), 6000) }
    } else {
      localStorage.setItem('veritas_reading_streak', JSON.stringify({ lastDate: today, count: 1 }))
      setStreak(1)
    }
  }, [])

  if (streak <= 1) return null

  // At 5+ day streak, nudge toward membership
  const showMembershipNudge = streak >= 5

  return (
    <>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans text-[0.6rem] font-semibold bg-gold/10 text-gold"
        title={`${streak}-day reading streak`} aria-label={`${streak} day reading streak`}>
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 23c-3.866 0-7-3.134-7-7 0-3.5 2.5-6 4-7.5 1.5 1 2 2.5 2 2.5s1.5-2.5 1-5c3 1.5 5 4.5 5 7.5a4.978 4.978 0 01-2 4"/></svg>
        {streak}
      </span>
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-sm shadow-lg font-sans text-sm font-medium bg-ink text-white animate-fadeIn max-w-sm text-center"
          role="status" aria-live="polite">
          <p className="font-bold">{streak}-day reading streak!</p>
          {showMembershipNudge && (
            <p className="text-xs text-white/60 mt-1">
              Dedicated reader?{' '}
              <Link to="/membership" className="text-crimson-light hover:text-white underline">
                Get early access to new chapters →
              </Link>
            </p>
          )}
        </div>
      )}
    </>
  )
}
