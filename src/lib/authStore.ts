// Auth store — API-backed with localStorage fallback
// Connects to Neon PostgreSQL via /api/auth/* endpoints
// Falls back to localStorage when API is unavailable (offline/no DB)

export interface User {
  id?: number
  email: string
  displayName: string
  tier?: string
  createdAt: string
  isStudent?: boolean
}

export interface ReadingProgress {
  [chapterId: string]: {
    scrollPosition: number
    completed: boolean
    lastReadAt: string
  }
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  bookmarks: string[]
  readingProgress: ReadingProgress
  token: string | null
}

const AUTH_TOKEN_KEY = 'veritas_token'
const AUTH_USER_KEY = 'veritas_auth'
const BOOKMARKS_KEY = 'veritas_bookmarks'
const USERS_KEY = 'veritas_users'
const PROGRESS_KEY = 'veritas_progress'

// ── Token management ──
function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json' }
}

type AuthBackendAvailability = 'available' | 'unavailable' | 'unknown'
export type AuthBackendMode = 'database' | 'degraded' | 'unknown'

// ── Auth backend availability check ──
let authBackendAvailable: AuthBackendAvailability | null = null
let authBackendMode: AuthBackendMode = 'unknown'
let authBackendRefreshTimer: ReturnType<typeof setTimeout> | null = null

function normalizeAuthBackendMode(value: unknown, fallback: AuthBackendMode = 'unknown'): AuthBackendMode {
  if (value === 'database' || value === 'degraded') {
    return value
  }

  return fallback
}

function cacheAuthBackendStatus(
  availability: AuthBackendAvailability,
  mode: AuthBackendMode = 'unknown'
) {
  authBackendAvailable = availability
  authBackendMode = mode

  if (authBackendRefreshTimer) {
    clearTimeout(authBackendRefreshTimer)
  }

  authBackendRefreshTimer = setTimeout(() => {
    authBackendAvailable = null
    authBackendMode = 'unknown'
    authBackendRefreshTimer = null
  }, 60000)
}

export function getAuthBackendMode(): AuthBackendMode {
  return authBackendMode
}

export async function resolveAuthBackendMode(): Promise<AuthBackendMode> {
  await checkAuthBackend()
  return authBackendMode
}

function getCachedFallbackState() {
  const state = loadState()
  if (!state.user) return null

  return {
    user: state.user,
    bookmarks: state.bookmarks,
    readingProgress: state.readingProgress,
  }
}

function shouldTryAuthBackend(status: AuthBackendAvailability) {
  return status !== 'unavailable'
}

function updateAuthBackendAvailabilityFromResponse(
  status: number,
  mode: AuthBackendMode = 'database'
) {
  if (status === 503 || status === 404 || status === 405) {
    cacheAuthBackendStatus('unavailable', mode)
    return 'unavailable' as const
  }

  cacheAuthBackendStatus('available', mode)
  return 'available' as const
}

async function readJsonResponse<T>(response: Response): Promise<T | null> {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

async function checkAuthBackend(): Promise<AuthBackendAvailability> {
  if (authBackendAvailable !== null) return authBackendAvailable

  try {
    const res = await fetch('/api/auth/status', { method: 'GET', signal: AbortSignal.timeout(3000) })
    const data = await readJsonResponse<{ available?: boolean; mode?: string }>(res)
    const resolvedMode = normalizeAuthBackendMode(
      data?.mode,
      res.ok ? 'database' : 'unknown'
    )

    if (!res.ok) {
      if (res.status === 503 || res.status === 404 || res.status === 405) {
        cacheAuthBackendStatus('unavailable', resolvedMode)
        return 'unavailable'
      }

      cacheAuthBackendStatus('unknown', resolvedMode)
      return 'unknown'
    }

    cacheAuthBackendStatus(
      data?.available === true ? 'available' : 'unavailable',
      resolvedMode
    )
  } catch {
    cacheAuthBackendStatus('unavailable', 'unknown')
  }

  return authBackendAvailable!
}

// ── localStorage fallback (original MVP auth) ──
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'veritas_salt_2026')
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

interface StoredUser {
  email: string
  displayName: string
  passwordHash: string
  createdAt: string
}

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') } catch { return [] }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// ── State management ──
function loadState(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY)
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
    const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
    const token = getToken()
    if (stored) {
      const user = JSON.parse(stored) as User
      return { user, isLoggedIn: true, bookmarks, readingProgress: progress, token }
    }
  } catch { /* ignore */ }
  return { user: null, isLoggedIn: false, bookmarks: [], readingProgress: {}, token: null }
}

function saveUserLocal(user: User | null) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_USER_KEY)
  }
}

function saveBookmarksLocal(bookmarks: string[]) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

function saveProgressLocal(progress: ReadingProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

// ── Public API ──

export async function signup(email: string, password: string, displayName: string): Promise<{ success: boolean; error?: string; user?: User }> {
  const authBackendStatus = await checkAuthBackend()

  if (shouldTryAuthBackend(authBackendStatus)) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      })
      const backendResponse = updateAuthBackendAvailabilityFromResponse(res.status)
      if (backendResponse === 'unavailable') throw new Error('Auth backend unavailable')
      const data = await readJsonResponse<{ error?: string; token?: string; user?: User }>(res)
      if (!res.ok) return { success: false, error: data?.error || 'Registration failed' }
      setToken(data?.token || null)
      const user = data?.user
      if (!user) return { success: false, error: 'Registration failed' }
      saveUserLocal(user)
      return { success: true, user }
    } catch {
      cacheAuthBackendStatus('unavailable', getAuthBackendMode())
      // Fall through to localStorage when auth is degraded.
    }
  }

  // localStorage fallback
  const users = getStoredUsers()
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists.' }
  }
  const passwordHash = await hashPassword(password)
  const newUser: StoredUser = { email: email.toLowerCase(), displayName, passwordHash, createdAt: new Date().toISOString() }
  users.push(newUser)
  saveStoredUsers(users)
  const user: User = { email: newUser.email, displayName: newUser.displayName, createdAt: newUser.createdAt }
  saveUserLocal(user)
  return { success: true, user }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  const authBackendStatus = await checkAuthBackend()

  if (shouldTryAuthBackend(authBackendStatus)) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const backendResponse = updateAuthBackendAvailabilityFromResponse(res.status)
      if (backendResponse === 'unavailable') throw new Error('Auth backend unavailable')
      const data = await readJsonResponse<{ error?: string; token?: string; user?: User }>(res)
      if (!res.ok) return { success: false, error: data?.error || 'Login failed' }
      setToken(data?.token || null)
      const user = data?.user
      if (!user) return { success: false, error: 'Login failed' }
      saveUserLocal(user)
      return { success: true, user }
    } catch {
      cacheAuthBackendStatus('unavailable', getAuthBackendMode())
      // Fall through to localStorage when auth is degraded.
    }
  }

  // localStorage fallback
  const users = getStoredUsers()
  const stored = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!stored) return { success: false, error: 'No account found with this email.' }
  const passwordHash = await hashPassword(password)
  if (stored.passwordHash !== passwordHash) return { success: false, error: 'Incorrect password.' }
  const user: User = { email: stored.email, displayName: stored.displayName, createdAt: stored.createdAt }
  saveUserLocal(user)
  return { success: true, user }
}

export async function validateSession(): Promise<{ user: User; bookmarks: string[]; readingProgress: ReadingProgress } | null> {
  const token = getToken()
  if (!token) return null

  const authBackendStatus = await checkAuthBackend()
  if (!shouldTryAuthBackend(authBackendStatus)) {
    return getCachedFallbackState()
  }

  try {
    const res = await fetch('/api/auth/me', { headers: authHeaders() })
    const backendResponse = updateAuthBackendAvailabilityFromResponse(res.status)
    if (!res.ok) {
      if (backendResponse === 'unavailable') {
        return getCachedFallbackState()
      }
      if (res.status === 401) { setToken(null); saveUserLocal(null) }
      return null
    }
    const data = await readJsonResponse<{ user: User; bookmarks?: string[]; readingProgress?: ReadingProgress }>(res)
    if (!data?.user) {
      return null
    }
    const user: User = data.user
    saveUserLocal(user)
    saveBookmarksLocal(data.bookmarks || [])
    saveProgressLocal(data.readingProgress || {})
    return { user, bookmarks: data.bookmarks || [], readingProgress: data.readingProgress || {} }
  } catch {
    cacheAuthBackendStatus('unavailable', getAuthBackendMode())
    // Offline — use cached state
    return getCachedFallbackState()
  }
}

export async function logout() {
  const token = getToken()
  if (token) {
    fetch('/api/auth/logout', { method: 'POST', headers: authHeaders() }).catch(() => {})
  }
  setToken(null)
  saveUserLocal(null)
}

export function getAuthState(): AuthState {
  return loadState()
}

export async function toggleBookmark(chapterId: string): Promise<string[]> {
  const state = loadState()
  const isBookmarkedNow = state.bookmarks.includes(chapterId)
  const action = isBookmarkedNow ? 'remove' : 'add'

  // Optimistic update
  const newBookmarks = isBookmarkedNow
    ? state.bookmarks.filter(id => id !== chapterId)
    : [...state.bookmarks, chapterId]
  saveBookmarksLocal(newBookmarks)

  // Sync to API
  const token = getToken()
  if (token) {
    fetch('/api/user/bookmarks', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ chapterId, action }),
    }).catch(() => {})
  }

  return newBookmarks
}

export function isBookmarked(chapterId: string): boolean {
  const state = loadState()
  return state.bookmarks.includes(chapterId)
}

export function getBookmarks(): string[] {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]') } catch { return [] }
}

export async function saveReadingProgress(chapterId: string, scrollPosition: number, completed?: boolean): Promise<void> {
  // Save locally
  const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
  progress[chapterId] = { scrollPosition, completed: completed || progress[chapterId]?.completed || false, lastReadAt: new Date().toISOString() }
  saveProgressLocal(progress)

  // Sync to API (fire and forget)
  const token = getToken()
  if (token) {
    fetch('/api/user/progress', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ chapterId, scrollPosition, completed }),
    }).catch(() => {})
  }
}

export function getReadingProgress(): ReadingProgress {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') } catch { return {} }
}

export async function updatePreferences(prefs: { theme?: string; fontSize?: string; newsletterSubscribed?: boolean }): Promise<void> {
  const token = getToken()
  if (token) {
    fetch('/api/user/preferences', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(prefs),
    }).catch(() => {})
  }
}
