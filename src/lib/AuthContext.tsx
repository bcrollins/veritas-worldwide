import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import {
  getAuthState,
  login as authLogin,
  signup as authSignup,
  logout as authLogout,
  toggleBookmark as authToggleBookmark,
  getBookmarks,
  type User,
} from './authStore'

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  bookmarks: string[]
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  toggleBookmark: (chapterId: string) => void
  isBookmarked: (chapterId: string) => boolean
  toast: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = getAuthState()
  const [user, setUser] = useState<User | null>(initial.user)
  const [bookmarks, setBookmarks] = useState<string[]>(initial.bookmarks)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await authLogin(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      setBookmarks(getBookmarks())
      showToast('Welcome back.')
    }
    return { success: result.success, error: result.error }
  }, [showToast])

  const signup = useCallback(async (email: string, password: string, displayName: string) => {
    const result = await authSignup(email, password, displayName)
    if (result.success && result.user) {
      setUser(result.user)
      setBookmarks(getBookmarks())
      showToast('Account created. Welcome.')
    }
    return { success: result.success, error: result.error }
  }, [showToast])

  const logout = useCallback(() => {
    authLogout()
    setUser(null)
    showToast('Signed out.')
  }, [showToast])

  const toggleBookmark = useCallback((chapterId: string) => {
    const newBookmarks = authToggleBookmark(chapterId)
    setBookmarks(newBookmarks)
    if (newBookmarks.includes(chapterId)) {
      showToast('Saved to bookmarks.')
    } else {
      showToast('Removed from bookmarks.')
    }
  }, [showToast])

  const isBookmarked = useCallback((chapterId: string) => {
    return bookmarks.includes(chapterId)
  }, [bookmarks])

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      bookmarks,
      showAuthModal,
      setShowAuthModal,
      login,
      signup,
      logout,
      toggleBookmark,
      isBookmarked,
      toast,
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
