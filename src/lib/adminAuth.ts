// Admin authentication — multi-account support
// Credentials: rights@veritasworldwide.com / *Rosie2010
//              brollins565@gmail.com / *Rosie2010

const ADMIN_EMAILS = [
  'rights@veritasworldwide.com',
  'brollins565@gmail.com',
]
// SHA-256 of "*Rosie2010" + "veritas_admin_salt"
const ADMIN_SESSION_KEY = 'veritas_admin_session'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'veritas_admin_salt')
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim()
  if (!ADMIN_EMAILS.includes(normalizedEmail)) {
    return { success: false, error: 'Access denied.' }
  }
  const hash = await hashPassword(password)
  // Store session
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
    // Session expires after 24 hours
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
  const totalViews = Object.values(pageViews).reduce((sum: number, v: any) => sum + (typeof v === 'number' ? v : 0), 0)
  return {
    totalUsers: users.length,
    totalDisputes: disputes.length,
    totalPageViews: totalViews,
    newsletterSubscribers: newsletter.length,
    activeSubscriptions: users.filter((u: any) => u.subscription?.active).length,
  }
}
