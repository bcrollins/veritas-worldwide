// Simple localStorage-backed auth store using React context pattern
// MVP: client-side only, no backend required

export interface User {
  email: string
  displayName: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  bookmarks: string[] // chapter IDs
}

const STORAGE_KEY = 'veritas_auth'
const BOOKMARKS_KEY = 'veritas_bookmarks'

function loadState(): AuthState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
    if (stored) {
      const user = JSON.parse(stored) as User
      return { user, isLoggedIn: true, bookmarks }
    }
  } catch {
    // ignore parse errors
  }
  return { user: null, isLoggedIn: false, bookmarks: [] }
}

function saveUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

function saveBookmarks(bookmarks: string[]) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
}

// Simple hash for localStorage password storage (NOT secure — MVP only)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'veritas_salt_2026')
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const USERS_KEY = 'veritas_users'

interface StoredUser {
  email: string
  displayName: string
  passwordHash: string
  createdAt: string
}

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function signup(email: string, password: string, displayName: string): Promise<{ success: boolean; error?: string; user?: User }> {
  const users = getStoredUsers()
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists.' }
  }
  const passwordHash = await hashPassword(password)
  const newUser: StoredUser = {
    email: email.toLowerCase(),
    displayName,
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveStoredUsers(users)
  const user: User = { email: newUser.email, displayName: newUser.displayName, createdAt: newUser.createdAt }
  saveUser(user)
  return { success: true, user }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  const users = getStoredUsers()
  const stored = users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!stored) {
    return { success: false, error: 'No account found with this email.' }
  }
  const passwordHash = await hashPassword(password)
  if (stored.passwordHash !== passwordHash) {
    return { success: false, error: 'Incorrect password.' }
  }
  const user: User = { email: stored.email, displayName: stored.displayName, createdAt: stored.createdAt }
  saveUser(user)
  return { success: true, user }
}

export function logout() {
  saveUser(null)
}

export function getAuthState(): AuthState {
  return loadState()
}

export function toggleBookmark(chapterId: string): string[] {
  const state = loadState()
  let bookmarks: string[]
  if (state.bookmarks.includes(chapterId)) {
    bookmarks = state.bookmarks.filter(id => id !== chapterId)
  } else {
    bookmarks = [...state.bookmarks, chapterId]
  }
  saveBookmarks(bookmarks)
  return bookmarks
}

export function isBookmarked(chapterId: string): boolean {
  const state = loadState()
  return state.bookmarks.includes(chapterId)
}

export function getBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]')
  } catch {
    return []
  }
}
