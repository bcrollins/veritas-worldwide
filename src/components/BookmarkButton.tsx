import { useAuth } from '../lib/AuthContext'

export default function BookmarkButton({ chapterId }: { chapterId: string }) {
  const { isLoggedIn, isBookmarked, toggleBookmark, setShowAuthModal } = useAuth()
  const saved = isBookmarked(chapterId)

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    toggleBookmark(chapterId)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors"
      title={isLoggedIn ? (saved ? 'Remove bookmark' : 'Save article') : 'Sign in to save'}
    >
      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={saved ? 0 : 1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
