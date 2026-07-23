// Admin authentication — entity-only accounts.
// Credentials are never stored in source comments. Password hash is supplied via
// VITE_ADMIN_PASSWORD_HASH (SHA-256 of password + "veritas_admin_salt").
// In production, login fails closed if the hash is not configured.

const ADMIN_EMAILS = [
  'rights@veritasworldwide.com',
]

const ADMIN_SESSION_KEY = 'veritas_admin_session'
const PASSWORD_SALT = 'veritas_admin_salt'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + PASSWORD_SALT)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function expectedPasswordHash(): string {
  try {
    // Vite injects import.meta.env at build time; empty string if unset.
    return String((import.meta as ImportMeta & { env?: Record<string, string> }).env?.VITE_ADMIN_PASSWORD_HASH || '').trim()
  } catch {
    return ''
  }
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim()
  if (!ADMIN_EMAILS.includes(normalizedEmail)) {
    return { success: false, error: 'Access denied.' }
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return { success: false, error: 'Access denied.' }
  }

  const expected = expectedPasswordHash()
  const hash = await hashPassword(password)

  // Production: fail closed without configured hash.
  const isProd = (() => {
    try {
      return Boolean((import.meta as ImportMeta & { env?: Record<string, boolean> }).env?.PROD)
    } catch {
      return true
    }
  })()

  if (!expected) {
    if (isProd) {
      return { success: false, error: 'Admin authentication is not configured.' }
    }
    // Development only: accept any password ≥8 for entity admin when hash unset.
  } else if (hash !== expected) {
    return { success: false, error: 'Access denied.' }
  }

  const session = {
    email: normalizedEmail,
    hash,
    loginAt: new Date().toISOString(),
    token: crypto.randomUUID(),
  }
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  return { success: true }
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

export function isAdminLoggedIn(): boolean {
  try {
    const session = localStorage.getItem(ADMIN_SESSION_KEY)
    if (!session) return false
    const parsed = JSON.parse(session)
    const loginTime = new Date(parsed.loginAt).getTime()
    if (Date.now() - loginTime > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(ADMIN_SESSION_KEY)
      return false
    }
    return ADMIN_EMAILS.includes(parsed.email)
  } catch {
    return false
  }
}

export function getAdminSession() {
  try {
    const session = localStorage.getItem(ADMIN_SESSION_KEY)
    return session ? JSON.parse(session) : null
  } catch {
    return null
  }
}

// Data access helpers for admin
export function getAllUsers() {
  try {
    return JSON.parse(localStorage.getItem('veritas_users') || '[]')
  } catch { return [] }
}

export function getAllSubscriptions() {
  try {
    return JSON.parse(localStorage.getItem('veritas_subscription') || 'null')
  } catch { return null }
}

export function getAllDisputes() {
  try {
    return JSON.parse(localStorage.getItem('veritas_disputes') || '[]')
  } catch { return [] }
}

export function getPageViews() {
  try {
    return JSON.parse(localStorage.getItem('veritas_page_views') || '{}')
  } catch { return {} }
}

export function getNewsletterSubscribers() {
  try {
    return JSON.parse(localStorage.getItem('veritas_newsletter') || '[]')
  } catch { return [] }
}

export function getSiteStats() {
  const users = getAllUsers()
  const disputes = getAllDisputes()
  const pageViews = getPageViews()
  const newsletter = getNewsletterSubscribers()
  const totalViews = Object.values(pageViews).reduce((sum: number, v: unknown) => sum + (typeof v === 'number' ? v : 0), 0)
  return {
    totalUsers: users.length,
    totalDisputes: disputes.length,
    totalPageViews: totalViews,
    newsletterSubscribers: newsletter.length,
    activeSubscriptions: users.filter((u: { subscription?: { active?: boolean } }) => u.subscription?.active).length,
  }
}
