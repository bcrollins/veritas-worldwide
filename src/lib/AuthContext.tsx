import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  getAuthState,
  login as authLogin,
  signup as authSignup,
  logout as authLogout,
  toggleBookmark as authToggleBookmark,
  getBookmarks,
  validateSession,
  saveReadingProgress as authSaveProgress,
  getReadingProgress,
  updatePreferences as authUpdatePrefs,
  type User,
  type ReadingProgress,
} from './authStore'
import { trackSignUp, trackLogin, trackBookmark } from './ga4'
import { scoreAccountCreated } from './leadScoring'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  bookmarks: string[]
  readingProgress: ReadingProgress
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  toggleBookmark: (chapterId: string) => void
  isBookmarked: (chapterId: string) => boolean
  saveReadingProgress: (chapterId: string, scrollPosition: number, completed?: boolean) => void
  updatePreferences: (prefs: { theme?: string; fontSize?: string; newsletterSubscribed?: boolean }) => void
  toast: string | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = getAuthState()
  const [user, setUser] = useState<User | null>(initial.user)
  const [bookmarks, setBookmarks] = useState<string[]>(initial.bookmarks)
  const [readingProgress, setReadingProgress] = useState<ReadingProgress>(initial.readingProgress || {})
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(!!initial.token)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Validate session on mount — sync with server
  useEffect(() => {
    if (!initial.token) { setIsLoading(false); return }
    validateSession().then(result => {
      if (result) {
        setUser(result.user)
        setBookmarks(result.bookmarks)
        setReadingProgress(result.readingProgress)
      } else {
        // Token invalid — clear state
        setUser(null)
        setBookmarks([])
      }
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email: string, password: string) => {
    const result = await authLogin(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      setBookmarks(getBookmarks())
      setReadingProgress(getReadingProgress())
      trackLogin('email')
      showToast('Welcome back.')
      // Sync full state from server
      validateSession().then(data => {
        if (data) {
          setBookmarks(data.bookmarks)
          setReadingProgress(data.readingProgress)
        }
      }).catch(() => {})
    }
    return { success: result.success, error: result.error }
  }, [showToast])

  const signup = useCallback(async (email: string, password: string, displayName: string) => {
    const result = await authSignup(email, password, displayName)
    if (result.success && result.user) {
      setUser(result.user)
      setBookmarks(getBookmarks())
      trackSignUp('email')
      scoreAccountCreated()
      showToast('Account created. Welcome.')
    }
    return { success: result.success, error: result.error }
  }, [showToast])

  const logout = useCallback(() => {
    authLogout()
    setUser(null)
    setBookmarks([])
    setReadingProgress({})
    showToast('Signed out.')
  }, [showToast])

  const toggleBookmark = useCallback((chapterId: string) => {
    authToggleBookmark(chapterId).then(newBookmarks => {
      setBookmarks(newBookmarks)
      if (newBookmarks.includes(chapterId)) {
        trackBookmark(chapterId, 'add')
        showToast('Saved to bookmarks.')
      } else {
        trackBookmark(chapterId, 'remove')
        showToast('Removed from bookmarks.')
      }
    })
  }, [showToast])

  const isBookmarkedFn = useCallback((chapterId: string) => {
    return bookmarks.includes(chapterId)
  }, [bookmarks])

  const saveProgress = useCallback((chapterId: string, scrollPosition: number, completed?: boolean) => {
    authSaveProgress(chapterId, scrollPosition, completed)
    setReadingProgress(prev => ({
      ...prev,
      [chapterId]: { scrollPosition, completed: completed || prev[chapterId]?.completed || false, lastReadAt: new Date().toISOString() },
    }))
  }, [])

  const updatePrefs = useCallback((prefs: { theme?: string; fontSize?: string; newsletterSubscribed?: boolean }) => {
    authUpdatePrefs(prefs)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      bookmarks,
      readingProgress,
      showAuthModal,
      setShowAuthModal,
      login,
      signup,
      logout,
      toggleBookmark,
      isBookmarked: isBookmarkedFn,
      saveReadingProgress: saveProgress,
      updatePreferences: updatePrefs,
      toast,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
