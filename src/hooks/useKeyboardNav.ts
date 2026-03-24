import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { chapterMeta } from '../data/chapterMeta'

export function useKeyboardNav() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      // "/" to focus search
      if (e.key === '/') {
        e.preventDefault()
        navigate('/search')
        return
      }

      // j/k for next/prev chapter
      const match = location.pathname.match(/^\/chapter\/(.+)$/)
      if (!match) return
      const currentId = match[1]
      const idx = chapterMeta.findIndex(c => c.id === currentId)
      if (idx === -1) return

      if (e.key === 'j' && idx < chapterMeta.length - 1) {
        e.preventDefault()
        navigate(`/chapter/${chapterMeta[idx + 1].id}`)
      }
      if (e.key === 'k' && idx > 0) {
        e.preventDefault()
        navigate(`/chapter/${chapterMeta[idx - 1].id}`)
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate, location.pathname])
}
