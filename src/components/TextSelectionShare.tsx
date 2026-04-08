import { useState, useEffect, useCallback } from 'react'

export default function TextSelectionShare() {
  const [show, setShow] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [text, setText] = useState('')

  const handleSelection = useCallback(() => {
    const sel = window.getSelection()
    const selected = sel?.toString().trim() || ''
    if (selected.length < 10 || selected.length > 500) {
      setShow(false)
      return
    }
    const range = sel?.getRangeAt(0)
    if (!range) return
    const rect = range.getBoundingClientRect()
    setText(selected)
    setPos({ x: rect.left + rect.width / 2, y: rect.top - 10 + window.scrollY })
    setShow(true)
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('keydown', () => setShow(false))
    return () => {
      document.removeEventListener('mouseup', handleSelection)
      document.removeEventListener('keydown', () => setShow(false))
    }
  }, [handleSelection])

  if (!show) return null

  const url = window.location.href
  const encodedText = encodeURIComponent(`"${text}" — The Record by Veritas Worldwide`)
  const encodedUrl = encodeURIComponent(url)

  return (
    <div
      className="fixed z-[100] flex items-center gap-1 bg-ink text-white rounded-full shadow-xl px-2 py-1.5 animate-fade-in no-print"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -100%)' }}
    >
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(`"${text}"`)
          setShow(false)
        }}
        className="px-2 py-1 text-xs font-sans hover:text-crimson-light transition-colors"
        title="Copy quote"
      >
        Copy
      </button>
      <div className="w-px h-4 bg-white/20" />
      <a
        href={`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 text-xs font-sans hover:text-crimson-light transition-colors"
        onClick={() => setShow(false)}
        title="Share on X"
      >
        Post
      </a>
    </div>
  )
}
