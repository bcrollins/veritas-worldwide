import { useState, useEffect } from 'react'

export default function TimeRemaining({ totalMinutes }: { totalMinutes: number }) {
  const [remaining, setRemaining] = useState(totalMinutes)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const progress = Math.min(1, Math.max(0, scrollTop / docHeight))
      const left = Math.max(1, Math.ceil(totalMinutes * (1 - progress)))
      setRemaining(left)
      setVisible(scrollTop > 200 && progress < 0.95)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [totalMinutes])

  if (!visible) return null

  return (
    <div
      className="fixed top-[52px] right-4 z-50 px-3 py-1.5 bg-obsidian/80 backdrop-blur-sm text-white font-sans text-xs rounded-full shadow-lg no-print transition-opacity duration-300"
      aria-live="polite"
      aria-label={`${remaining} minutes remaining`}
    >
      {remaining} min left
    </div>
  )
}
