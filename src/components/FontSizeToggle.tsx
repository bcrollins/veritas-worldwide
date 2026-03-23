import { useState, useEffect } from 'react'

const SIZES = [
  { key: 'small', label: 'A', size: '1rem', lineHeight: '1.7' },
  { key: 'medium', label: 'A', size: '1.125rem', lineHeight: '1.8' },
  { key: 'large', label: 'A', size: '1.3rem', lineHeight: '1.85' },
] as const

type SizeKey = typeof SIZES[number]['key']

export default function FontSizeToggle() {
  const [active, setActive] = useState<SizeKey>(() => {
    try { return (localStorage.getItem('veritas_fontsize') as SizeKey) || 'medium' }
    catch { return 'medium' }
  })

  useEffect(() => {
    const s = SIZES.find(s => s.key === active)!
    document.documentElement.style.setProperty('--article-font-size', s.size)
    document.documentElement.style.setProperty('--article-line-height', s.lineHeight)
    try { localStorage.setItem('veritas_fontsize', active) } catch {}
  }, [active])

  return (
    <div className="inline-flex items-center border border-border rounded-sm overflow-hidden no-print" role="radiogroup" aria-label="Font size">
      {SIZES.map((s, i) => (
        <button
          key={s.key}
          role="radio"
          aria-checked={active === s.key}
          onClick={() => setActive(s.key)}
          className={`px-2.5 py-1.5 font-sans transition-colors ${
            active === s.key
              ? 'bg-crimson text-white'
              : 'text-ink-muted hover:text-ink hover:bg-parchment-dark'
          } ${i > 0 ? 'border-l border-border' : ''}`}
          style={{ fontSize: i === 0 ? '0.7rem' : i === 1 ? '0.85rem' : '1rem' }}
          title={`${s.key.charAt(0).toUpperCase() + s.key.slice(1)} text`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
