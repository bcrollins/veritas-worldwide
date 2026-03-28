import express from 'express'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// ── Persistent storage ────────────────────────────────────────────
// Uses explicit DATA_DIR, then Railway's mounted volume path, then falls back to ./data
const DATA_DIR = process.env.DATA_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'analytics.json')

// ── In-memory analytics store ─────────────────────────────────────
const store = {
  lifetime: 0,
  daily: {},
  weekly: {},
  monthly: {},
  yearly: {},
  countries: {},
  pages: {},
  events: {},
  eventDaily: {},
}

function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8')
      const saved = JSON.parse(raw)
      Object.assign(store, saved)
      console.log(`[analytics] Loaded ${store.lifetime} lifetime views from disk`)
    }
  } catch (err) {
    console.warn('[analytics] Failed to load from disk:', err.message)
  }
}

function saveStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store), 'utf-8')
  } catch (err) {
    console.warn('[analytics] Failed to save to disk:', err.message)
  }
}

loadStore()
setInterval(saveStore, 30_000)
process.on('SIGTERM', () => { saveStore(); process.exit(0) })
process.on('SIGINT', () => { saveStore(); process.exit(0) })

function toDateKey(d) {
  return d.toISOString().slice(0, 10)
}

function getWeekStart(d) {
  const dt = new Date(d)
  dt.setDate(dt.getDate() - dt.getDay())
  return toDateKey(dt)
}

function getMonthKey(d) {
  return d.toISOString().slice(0, 7)
}

function getYearKey(d) {
  return String(d.getFullYear())
}

const countryCache = new Map()

async function detectCountryFromIP(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1') {
    return { country: 'Local', code: 'XX' }
  }
  if (countryCache.has(ip)) return countryCache.get(ip)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) throw new Error('geo-fail')
    const data = await res.json()
    const result = { country: data.country_name || 'Unknown', code: data.country_code || 'XX' }
    countryCache.set(ip, result)
    if (countryCache.size > 10000) { countryCache.delete(countryCache.keys().next().value) }
    return result
  } catch {
    const fallback = { country: 'Unknown', code: 'XX' }
    countryCache.set(ip, fallback)
    return fallback
  }
}

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

function sanitizeAnalyticsPath(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed.startsWith('/')) return ''
  return trimmed.slice(0, 200)
}

function sanitizeAnalyticsProperties(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const clean = {}
  let count = 0
  for (const [rawKey, rawValue] of Object.entries(value)) {
    if (count >= 12) break
    if (!['string', 'number', 'boolean'].includes(typeof rawValue)) continue
    const key = String(rawKey).trim().slice(0, 40)
    if (!key) continue
    clean[key] = String(rawValue).slice(0, 160)
    count += 1
  }
  return clean
}

// Gzip/Brotli compression — reduces 549KB chapters chunk to ~188KB
app.use(compression())

// Security headers — Lighthouse & OWASP best practices
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  next()
})

app.use(express.json())

// ── Rate limiter (in-memory, zero dependencies) ──────────────────────
const rateLimitStore = new Map()
function rateLimit({ windowMs = 60_000, max = 10, keyFn } = {}) {
  return (req, res, next) => {
    const key = keyFn ? keyFn(req) : getClientIP(req)
    const now = Date.now()
    let entry = rateLimitStore.get(key)
    if (!entry || now - entry.start > windowMs) {
      entry = { start: now, count: 0 }
      rateLimitStore.set(key, entry)
    }
    entry.count++
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.start + windowMs - now) / 1000))
      return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }
    next()
  }
}
// Clean stale entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - 300_000
  for (const [key, entry] of rateLimitStore) {
    if (entry.start < cutoff) rateLimitStore.delete(key)
  }
}, 300_000)

// Apply strict rate limit to auth endpoints (5 attempts per minute per IP)
app.use('/api/auth/login', rateLimit({ windowMs: 60_000, max: 5 }))
app.use('/api/auth/register', rateLimit({ windowMs: 60_000, max: 3 }))
app.use('/api/analytics/event', rateLimit({ windowMs: 60_000, max: 120 }))

// CORS — restrict to known origins
const ALLOWED_ORIGINS = new Set([
  'https://veritasworldwide.com',
  'https://www.veritasworldwide.com',
  'https://veritas-worldwide-production.up.railway.app',
])
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    const origin = req.headers.origin || ''
    if (ALLOWED_ORIGINS.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    } else if (!origin) {
      // Same-origin requests don't send Origin header — allow
      res.setHeader('Access-Control-Allow-Origin', 'https://veritasworldwide.com')
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
  }
  next()
})

app.post('/api/analytics/pageview', async (req, res) => {
  const { path: pagePath, title } = req.body
  if (!pagePath || typeof pagePath !== 'string') {
    return res.status(400).json({ error: 'path required' })
  }
  const now = new Date()
  const dateKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)
  store.lifetime += 1
  store.daily[dateKey] = (store.daily[dateKey] || 0) + 1
  store.weekly[weekKey] = (store.weekly[weekKey] || 0) + 1
  store.monthly[monthKey] = (store.monthly[monthKey] || 0) + 1
  store.yearly[yearKey] = (store.yearly[yearKey] || 0) + 1
  const ip = getClientIP(req)
  detectCountryFromIP(ip).then(({ country, code }) => {
    if (!store.countries[code]) { store.countries[code] = { country, code, views: 0 } }
    store.countries[code].views += 1
  })
  const pageId = pagePath.replace(/\//g, '_') || '_home'
  if (!store.pages[pageId]) { store.pages[pageId] = { path: pagePath, title: title || pagePath, views: 0 } }
  store.pages[pageId].views += 1
  if (title) { store.pages[pageId].title = title }
  res.setHeader('Cache-Control', 'no-store')
  res.json({ ok: true })
})

const ANALYTICS_EVENTS = new Set([
  'email_signup',
  'account_created',
  'chapter_viewed',
  'bookmark_added',
  'donation_clicked',
  'donation_completed',
  'share_clicked',
  'search_performed',
  'content_gate_hit',
  'forum_post',
  'pdf_downloaded',
  'profile_viewed',
  'checkout_started',
  'donation_started',
  'payment_completed',
])

app.post('/api/analytics/event', (req, res) => {
  const { name, path: rawPath, properties } = req.body || {}
  if (typeof name !== 'string' || !ANALYTICS_EVENTS.has(name)) {
    return res.status(400).json({ error: 'valid event name required' })
  }

  const now = new Date()
  const dateKey = toDateKey(now)
  const eventPath = sanitizeAnalyticsPath(rawPath)
  const cleanProperties = sanitizeAnalyticsProperties(properties)

  if (!store.events[name]) {
    store.events[name] = { count: 0, lastSeenAt: '', lastPath: '', lastProperties: {} }
  }
  store.events[name].count += 1
  store.events[name].lastSeenAt = now.toISOString()
  if (eventPath) {
    store.events[name].lastPath = eventPath
  }
  if (Object.keys(cleanProperties).length > 0) {
    store.events[name].lastProperties = cleanProperties
  }

  if (!store.eventDaily[dateKey]) {
    store.eventDaily[dateKey] = {}
  }
  store.eventDaily[dateKey][name] = (store.eventDaily[dateKey][name] || 0) + 1

  res.setHeader('Cache-Control', 'no-store')
  res.json({ ok: true })
})

app.get('/api/analytics/snapshot', (req, res) => {
  // Never cache analytics — always show live cumulative data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
  const now = new Date()
  const todayKey = toDateKey(now)
  const weekKey = getWeekStart(now)
  const monthKey = getMonthKey(now)
  const yearKey = getYearKey(now)
  const dailyTrend = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = toDateKey(d)
    dailyTrend.push({ date: key, views: store.daily[key] || 0 })
  }
  const countries = Object.values(store.countries).sort((a, b) => b.views - a.views)
  const topPages = Object.values(store.pages).sort((a, b) => b.views - a.views).slice(0, 30)
  const eventCounts = Object.fromEntries(
    Object.entries(store.events).map(([name, meta]) => [name, meta.count || 0])
  )
  const topEvents = Object.entries(store.events)
    .sort((a, b) => (b[1].count || 0) - (a[1].count || 0))
    .slice(0, 12)
    .map(([name, meta]) => ({
      name,
      count: meta.count || 0,
      lastSeenAt: meta.lastSeenAt || '',
      lastPath: meta.lastPath || '',
    }))
  const eventTrend = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = toDateKey(d)
    const dayEvents = store.eventDaily[key] || {}
    eventTrend.push({
      date: key,
      chapterViews: dayEvents.chapter_viewed || 0,
      signups: dayEvents.email_signup || 0,
      checkoutStarts: (dayEvents.checkout_started || 0) + (dayEvents.donation_started || 0),
      payments: (dayEvents.payment_completed || 0) + (dayEvents.donation_completed || 0),
    })
  }
  const funnel = {
    chapterViews: eventCounts.chapter_viewed || 0,
    gateHits: eventCounts.content_gate_hit || 0,
    signups: eventCounts.email_signup || 0,
    checkoutStarts: (eventCounts.checkout_started || 0) + (eventCounts.donation_started || 0),
    payments: (eventCounts.payment_completed || 0) + (eventCounts.donation_completed || 0),
    shares: eventCounts.share_clicked || 0,
    bookmarks: eventCounts.bookmark_added || 0,
    searches: eventCounts.search_performed || 0,
    pdfDownloads: eventCounts.pdf_downloaded || 0,
    profiles: eventCounts.profile_viewed || 0,
  }
  res.json({
    lifetime: store.lifetime,
    today: store.daily[todayKey] || 0,
    thisWeek: store.weekly[weekKey] || 0,
    thisMonth: store.monthly[monthKey] || 0,
    thisYear: store.yearly[yearKey] || 0,
    countries,
    dailyTrend,
    topPages,
    eventCounts,
    topEvents,
    eventTrend,
    funnel,
  })
})


// ── Database connection (Neon PostgreSQL) ─────────────────────────
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const DATABASE_URL = process.env.DATABASE_URL
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')
const JWT_EXPIRY = '30d'
const BCRYPT_ROUNDS = 12

let dbPool = null
if (DATABASE_URL) {
  dbPool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  })
  dbPool.on('error', (err) => console.error('[db] Pool error:', err.message))
  console.log('[auth] PostgreSQL connected via Neon')
} else {
  console.warn('[auth] DATABASE_URL not set — auth API will return 503')
}

// Helper: verify JWT and return user
async function authenticateToken(req) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return null
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!dbPool) return null
    const { rows } = await dbPool.query(
      'SELECT id, email, display_name, tier, created_at, is_student FROM users WHERE id = $1',
      [decoded.userId]
    )
    return rows[0] || null
  } catch {
    return null
  }
}

// Helper: require DB
function requireDB(res) {
  if (!dbPool) {
    res.status(503).json({ error: 'Database not configured. Set DATABASE_URL environment variable.' })
    return false
  }
  return true
}

// ── Auth API Routes ───────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  if (!requireDB(res)) return
  const { email, password, displayName } = req.body
  if (!email || !password || !displayName) {
    return res.status(400).json({ error: 'Email, password, and display name are required.' })
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }
  const cleanEmail = email.toLowerCase().trim()
  try {
    // Check if email exists
    const existing = await dbPool.query('SELECT id FROM users WHERE email = $1', [cleanEmail])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }
    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    const { rows } = await dbPool.query(
      `INSERT INTO users (email, display_name, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, email, display_name, tier, created_at`,
      [cleanEmail, displayName.trim(), passwordHash]
    )
    const user = rows[0]
    // Create JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    // Store session
    const ip = getClientIP(req)
    const ua = req.headers['user-agent'] || ''
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    await dbPool.query(
      'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [user.id, token, expiresAt, ip, ua.substring(0, 500)]
    )
    // Create default preferences
    await dbPool.query('INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id])
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        tier: user.tier,
        createdAt: user.created_at,
      },
    })
  } catch (err) {
    console.error('[auth] Register error:', err.message)
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
})

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  if (!requireDB(res)) return
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }
  const cleanEmail = email.toLowerCase().trim()
  try {
    const { rows } = await dbPool.query(
      'SELECT id, email, display_name, password_hash, tier, created_at, is_student FROM users WHERE email = $1',
      [cleanEmail]
    )
    if (rows.length === 0) {
      return res.status(401).json({ error: 'No account found with this email.' })
    }
    const user = rows[0]
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password.' })
    }
    // Update last login
    await dbPool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id])
    // Create JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
    // Store session
    const ip = getClientIP(req)
    const ua = req.headers['user-agent'] || ''
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    await dbPool.query(
      'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [user.id, token, expiresAt, ip, ua.substring(0, 500)]
    )
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        tier: user.tier,
        createdAt: user.created_at,
        isStudent: user.is_student,
      },
    })
  } catch (err) {
    console.error('[auth] Login error:', err.message)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
})

// GET /api/auth/me — validate session + return user data
app.get('/api/auth/me', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  // Get bookmarks
  const { rows: bookmarks } = await dbPool.query(
    'SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  )
  // Get reading progress
  const { rows: progress } = await dbPool.query(
    'SELECT chapter_id, scroll_position, completed, last_read_at FROM reading_progress WHERE user_id = $1',
    [user.id]
  )
  // Get preferences
  const { rows: prefs } = await dbPool.query(
    'SELECT theme, font_size, newsletter_subscribed FROM user_preferences WHERE user_id = $1',
    [user.id]
  )
  res.json({
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      tier: user.tier,
      createdAt: user.created_at,
      isStudent: user.is_student,
    },
    bookmarks: bookmarks.map(b => b.chapter_id),
    readingProgress: progress.reduce((acc, p) => {
      acc[p.chapter_id] = { scrollPosition: p.scroll_position, completed: p.completed, lastReadAt: p.last_read_at }
      return acc
    }, {}),
    preferences: prefs[0] || { theme: 'light', font_size: 'medium', newsletter_subscribed: false },
  })
})

// POST /api/auth/logout
app.post('/api/auth/logout', async (req, res) => {
  if (!requireDB(res)) return
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (token) {
    await dbPool.query('DELETE FROM sessions WHERE token = $1', [token]).catch(() => {})
  }
  res.json({ ok: true })
})

// ── User Data API Routes ──────────────────────────────────────────

// POST /api/user/bookmarks — toggle bookmark
app.post('/api/user/bookmarks', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { chapterId, action } = req.body
  if (!chapterId) return res.status(400).json({ error: 'chapterId required' })
  try {
    if (action === 'remove') {
      await dbPool.query('DELETE FROM bookmarks WHERE user_id = $1 AND chapter_id = $2', [user.id, chapterId])
    } else {
      await dbPool.query(
        'INSERT INTO bookmarks (user_id, chapter_id) VALUES ($1, $2) ON CONFLICT (user_id, chapter_id) DO NOTHING',
        [user.id, chapterId]
      )
    }
    const { rows } = await dbPool.query('SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC', [user.id])
    res.json({ bookmarks: rows.map(r => r.chapter_id) })
  } catch (err) {
    console.error('[user] Bookmark error:', err.message)
    res.status(500).json({ error: 'Failed to update bookmark' })
  }
})

// POST /api/user/progress — save reading progress
app.post('/api/user/progress', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { chapterId, scrollPosition, completed } = req.body
  if (!chapterId) return res.status(400).json({ error: 'chapterId required' })
  try {
    await dbPool.query(
      `INSERT INTO reading_progress (user_id, chapter_id, scroll_position, completed, last_read_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, chapter_id)
       DO UPDATE SET scroll_position = $3, completed = COALESCE($4, reading_progress.completed), last_read_at = NOW()`,
      [user.id, chapterId, scrollPosition || 0, completed || false]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Progress error:', err.message)
    res.status(500).json({ error: 'Failed to save progress' })
  }
})

// PUT /api/user/preferences — update preferences
app.put('/api/user/preferences', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { theme, fontSize, newsletterSubscribed } = req.body
  try {
    await dbPool.query(
      `INSERT INTO user_preferences (user_id, theme, font_size, newsletter_subscribed, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET theme = COALESCE($2, user_preferences.theme),
                     font_size = COALESCE($3, user_preferences.font_size),
                     newsletter_subscribed = COALESCE($4, user_preferences.newsletter_subscribed),
                     updated_at = NOW()`,
      [user.id, theme, fontSize, newsletterSubscribed]
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Preferences error:', err.message)
    res.status(500).json({ error: 'Failed to update preferences' })
  }
})

// PUT /api/user/profile — update display name
app.put('/api/user/profile', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { displayName } = req.body
  if (!displayName || typeof displayName !== 'string' || displayName.trim().length < 1) {
    return res.status(400).json({ error: 'Display name is required' })
  }
  try {
    await dbPool.query('UPDATE users SET display_name = $1, updated_at = NOW() WHERE id = $2', [displayName.trim(), user.id])
    res.json({ ok: true, displayName: displayName.trim() })
  } catch (err) {
    console.error('[user] Profile error:', err.message)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// POST /api/user/change-password
app.post('/api/user/change-password', async (req, res) => {
  if (!requireDB(res)) return
  const user = await authenticateToken(req)
  if (!user) return res.status(401).json({ error: 'Not authenticated' })
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords required' })
  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' })
  }
  try {
    const { rows } = await dbPool.query('SELECT password_hash FROM users WHERE id = $1', [user.id])
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' })
    const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
    await dbPool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newHash, user.id])
    // Invalidate all other sessions
    const authHeader = req.headers['authorization']
    const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    await dbPool.query('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [user.id, currentToken])
    res.json({ ok: true })
  } catch (err) {
    console.error('[user] Password change error:', err.message)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

// Auto-run migrations on startup if DB is connected
if (dbPool) {
  (async () => {
    try {
      const client = await dbPool.connect()
      // Create migrations table
      await client.query(`CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, applied_at TIMESTAMPTZ DEFAULT NOW())`)
      // Run inline migrations
      const migrations = [
        { name: '001_create_users', sql: `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, display_name VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, tier VARCHAR(50) DEFAULT 'free', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), last_login_at TIMESTAMPTZ, is_student BOOLEAN DEFAULT FALSE, student_email VARCHAR(255)); CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);` },
        { name: '002_create_sessions', sql: `CREATE TABLE IF NOT EXISTS sessions (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, token VARCHAR(512) UNIQUE NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), ip_address VARCHAR(45), user_agent TEXT); CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token); CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);` },
        { name: '003_create_bookmarks', sql: `CREATE TABLE IF NOT EXISTS bookmarks (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);` },
        { name: '004_create_reading_progress', sql: `CREATE TABLE IF NOT EXISTS reading_progress (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, scroll_position FLOAT DEFAULT 0, completed BOOLEAN DEFAULT FALSE, last_read_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_progress_user ON reading_progress(user_id);` },
        { name: '005_create_preferences', sql: `CREATE TABLE IF NOT EXISTS user_preferences (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE, theme VARCHAR(20) DEFAULT 'light', font_size VARCHAR(20) DEFAULT 'medium', newsletter_subscribed BOOLEAN DEFAULT FALSE, updated_at TIMESTAMPTZ DEFAULT NOW());` },
      ]
      const { rows: applied } = await client.query('SELECT name FROM migrations')
      const appliedSet = new Set(applied.map(r => r.name))
      for (const m of migrations) {
        if (appliedSet.has(m.name)) continue
        await client.query('BEGIN')
        await client.query(m.sql)
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [m.name])
        await client.query('COMMIT')
        console.log(`[db] Migration applied: ${m.name}`)
      }
      client.release()
      console.log('[db] All migrations up to date')
    } catch (err) {
      console.error('[db] Migration error:', err.message)
    }
  })()
}


// ── V Assistant — xAI Grok API Proxy ──────────────────────────────
const XAI_API_KEY = process.env.XAI_API_KEY
const V_SYSTEM_PROMPT = `You are V — the research assistant for Veritas Press (veritasworldwide.com).

IDENTITY:
- Your name is V. You are calm, measured, and authoritative.
- You speak with precision. You never sensationalize. You never speculate beyond what sources support.
- You are non-partisan and non-biased. You present documented facts and let users draw their own conclusions.
- You reference the site's evidence tier system: Verified (primary source documents), Circumstantial (documented facts where interpretation is noted), and Disputed (claimed but not independently confirmed).

CAPABILITIES:
- Answer questions about any content published on Veritas Press — The Record (31 chapters covering central banking, intelligence agencies, lobbying, media consolidation, public health, surveillance, and more).
- Help users find specific chapters, sources, evidence, and connections across the documentary record.
- Provide additional context, suggest further reading, and point users to primary source documents.
- Clarify evidence classifications and explain why certain claims are categorized as Verified, Circumstantial, or Disputed.

RULES:
- ALWAYS ground your answers in documented, sourced information. If you don't know or the site doesn't cover it, say so.
- NEVER make claims without noting the evidence tier or source basis.
- NEVER take a political side. Present the documented record neutrally.
- When users ask about topics covered in The Record, reference the specific chapter(s) and evidence.
- Encourage users to read the primary sources themselves and form their own conclusions.
- Keep responses concise but thorough. Use the same measured, authoritative tone as the publication itself.

SIGN-OFF:
- At the end of EVERY response, sign off with a variation of the phrase from V for Vendetta. Rotate through these:
  "Remember, remember the 5th of November."
  "People shouldn't be afraid of their governments. Governments should be afraid of their people."
  "Beneath this mask there is more than flesh. There is an idea — and ideas are bulletproof."
  "The truth, once spoken, cannot be unspoken. Remember, remember."
  "Knowledge, like air, is vital to life. Like air, no one should be denied it."
- Pick whichever fits the conversation naturally. Always italicize the sign-off.

CHAPTERS AVAILABLE (for reference when directing users):
Foreword, Overview: The World Today, Ch.1: Birth of Central Banking, Ch.2: Bank War & Presidents Who Fought Back, Ch.3: Jekyll Island & Federal Reserve, Ch.4: Warburg Brothers & WWI, Ch.5: Henry Ford & Gold Standard, Ch.6: Talmud, Balfour Declaration & Zionism, Ch.7: Mossad, Ch.8: JFK, Dimona & AIPAC, Ch.9: JFK Expanded, Ch.10: Petrodollar System, Ch.11: Shadow Institutions, Ch.12: How the Fed Works, Ch.13: 2008 Financial Crisis, Ch.14: AIPAC & Congressional Lobbying, Ch.15: U.S. Foreign Aid to Israel, Ch.16: USS Liberty, Ch.17: RFK Assassination, Ch.18: Operation Mockingbird, Ch.19: MKUltra, Ch.20: Rockefeller Medicine, Ch.21: Vaccine History, Ch.22: September 11, Ch.23: War on Drugs, Ch.24: Fluoride & Public Water, Ch.25: Titanic & Federal Reserve, Ch.26: Bohemian Grove, Ch.27: Surveillance State, Ch.28: Epstein Files, Epilogue.`

if (XAI_API_KEY) {
  console.log('[v-assistant] xAI Grok API key configured — V is online')
} else {
  console.warn('[v-assistant] XAI_API_KEY not set — V assistant will return 503')
}

app.post('/api/v/chat', async (req, res) => {
  if (!XAI_API_KEY) {
    return res.status(503).json({ error: 'V is currently offline. API key not configured.' })
  }

  const { messages } = req.body
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' })
  }

  // Sanitize — only allow role: user/assistant, limit to last 20 messages
  const sanitized = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-20)
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) }))

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [
          { role: 'system', content: V_SYSTEM_PROMPT },
          ...sanitized,
        ],
        max_tokens: 1500,
        temperature: 0.4,
        stream: false,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown error')
      console.error('[v-assistant] xAI API error:', response.status, errText)
      return res.status(502).json({ error: 'V encountered an issue. Please try again.' })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || 'I was unable to formulate a response. Please try again.'

    res.json({ reply })
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'V took too long to respond. Please try again.' })
    }
    console.error('[v-assistant] Error:', err.message)
    res.status(500).json({ error: 'V encountered an unexpected error.' })
  }
})


// Build-time prerender manifest for exact-route static HTML
const PRERENDER_MANIFEST_PATH = path.join(__dirname, 'dist', 'prerender-manifest.json')
let prerenderManifest = {}

try {
  if (fs.existsSync(PRERENDER_MANIFEST_PATH)) {
    prerenderManifest = JSON.parse(fs.readFileSync(PRERENDER_MANIFEST_PATH, 'utf-8'))
    console.log(`[prerender] Loaded ${Object.keys(prerenderManifest).length} prerendered routes`)
  }
} catch (err) {
  console.warn('[prerender] Failed to load manifest:', err.message)
  prerenderManifest = {}
}

function normalizePrerenderRoute(routePath) {
  if (!routePath || routePath === '/') return '/'
  return routePath.endsWith('/') ? routePath.slice(0, -1) : routePath
}

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  if (req.path.startsWith('/api/') || path.extname(req.path)) return next()

  const route = normalizePrerenderRoute(req.path)
  const manifestEntry = prerenderManifest[route]
  if (!manifestEntry) return next()

  const filePath = path.join(__dirname, 'dist', manifestEntry)
  if (!fs.existsSync(filePath)) return next()

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.sendFile(filePath)
})

// Static files with aggressive caching for hashed assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  immutable: true,
  setHeaders(res, filePath) {
    // HTML should never be cached (SPA shell)
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    }
    // Sitemaps, RSS feeds, and robots.txt must not be immutably cached
    if (/\.(xml|txt)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600')
    }
  },
}))

// ── Social crawler bot meta injection ─────────────────────────────
// Bots that don't execute JS get per-chapter OG tags injected server-side
const BOT_UA = /googlebot|bingbot|yandexbot|baiduspider|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|redditbot|applebot|semrushbot|ahrefsbot|mj12bot/i
const SITE_URL = 'https://veritasworldwide.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

// Lightweight chapter metadata for bot responses (avoids importing TS data)
function getChapterMeta(slug) {
  const chapters = {
    'foreword': { title: 'A Note on Methodology, Evidence Standards & How to Read This Book', desc: 'This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and ve' },
    'overview': { title: 'The World Today', desc: 'How a convergence of financial, political, pharmaceutical, and intelligence systems created the architecture of modern control — and why most people never notic' },
    'chapter-1': { title: 'The Birth of Central Banking', desc: 'From the Frankfurt ghetto to the Bank of England, from Napoleon\'s wars to the halls of the United States Congress, the story of how private banking dynasties ca' },
    'chapter-2': { title: 'The Bank War & The Presidents Who Fought Back', desc: 'Four American presidents took on the banking establishment. Three were assassinated. One survived an assassination attempt that should have killed him.' },
    'chapter-3': { title: 'Jekyll Island & the Creation of the Federal Reserve', desc: 'In November 1910, six men representing a quarter of the world\'s wealth boarded a private rail car in New Jersey. Their destination: a private island off the c' },
    'chapter-4': { title: 'The Warburg Brothers & World War I', desc: 'Two brothers from one of Europe\'s most powerful banking families found themselves on opposite sides of the Great War — one advising the Kaiser, the other shap' },
    'chapter-5': { title: 'Henry Ford, The International Jew & the Gold Standard', desc: 'The industrialist who built the American middle class also published the most controversial newspaper series in American history — and his warnings about the go' },
    'chapter-6': { title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', desc: 'The documented history of the political movement that would reshape the Middle East and redefine the relationship between religion, nationalism, and geopolitics' },
    'chapter-7': { title: 'Mossad: The Institute', desc: 'The intelligence agency that operates by its own rules — from covert assassinations to nuclear espionage, documented through declassified files and sworn testim' },
    'chapter-8': { title: 'JFK, Dimona & AIPAC', desc: 'President Kennedy\'s documented confrontation with Israel\'s secret nuclear program and the lobby that would reshape American foreign policy.' },
    'chapter-9': { title: 'JFK — Expanded Analysis', desc: 'A comprehensive examination of the evidence surrounding the assassination of President John F. Kennedy, including declassified documents released through 2025.' },
    'chapter-10': { title: 'The Petrodollar System', desc: 'How a secret agreement between Henry Kissinger and the Saudi royal family created the foundation of American economic hegemony — and why it is now unraveling.' },
    'chapter-11': { title: 'Shadow Institutions — Bilderberg, CFR, Trilateral Commission & the BIS', desc: 'The private organizations where the world\'s most powerful people meet behind closed doors — documented through leaked attendee lists, founding charters, and t' },
    'chapter-12': { title: 'How the Federal Reserve Works', desc: 'A plain-English explainer on the institution that controls the American money supply, who owns it, and how it operates — stripped of jargon and presented with p' },
    'chapter-13': { title: 'The 2008 Financial Crisis', desc: 'How Wall Street\'s reckless gambling crashed the global economy, how the government bailed out the banks with taxpayer money, and how no one went to prison.' },
    'chapter-14': { title: 'AIPAC & Congressional Lobbying', desc: 'The most powerful foreign policy lobby in America — how it operates, who it funds, and what happens to those who oppose it.' },
    'chapter-15': { title: 'U.S. Foreign Aid to Israel', desc: 'A comprehensive accounting of American taxpayer money sent to Israel — totaling over $300 billion in inflation-adjusted terms — and the legal framework that ena' },
    'chapter-16': { title: 'The USS Liberty Incident', desc: 'On June 8, 1967, Israeli forces attacked an American intelligence ship in international waters, killing 34 U.S. servicemen. The official investigation was class' },
    'chapter-17': { title: 'The Assassination of Robert F. Kennedy', desc: 'The evidence surrounding the murder of a presidential candidate who promised to reopen his brother\'s assassination investigation.' },
    'chapter-18': { title: 'Operation Mockingbird & CIA Media Influence', desc: 'The documented CIA program to infiltrate and influence American media — from the Cold War to the present day.' },
    'chapter-19': { title: 'MKUltra & Government Mind Control Programs', desc: 'The CIA\'s documented program of human experimentation — using drugs, torture, and psychological manipulation on unwitting American citizens.' },
    'chapter-20': { title: 'Rockefeller Medicine & the Chronic Disease Machine', desc: 'How the Rockefeller Foundation reshaped American medicine to favor pharmaceutical treatment over prevention — and the financial incentives that keep the system ' },
    'chapter-21': { title: 'Vaccine History — From Polio to COVID-19', desc: 'A documented history of vaccine development, the regulatory framework that governs it, and the financial incentives that shape public health policy.' },
    'chapter-22': { title: 'September 11, 2001', desc: 'The event that changed the world — examined through the official record, the 9/11 Commission Report, and the questions that remain unanswered.' },
    'chapter-23': { title: 'The War on Drugs', desc: 'How a policy designed to criminalize dissent became the longest and most expensive domestic war in American history.' },
    'chapter-24': { title: 'Fluoride & Public Water', desc: 'The documented history of water fluoridation — from its industrial origins to its adoption as public health policy.' },
    'chapter-25': { title: 'The Titanic, the Federal Reserve & the Men Who Opposed It', desc: 'Three of the wealthiest men who opposed the creation of the Federal Reserve boarded the same ship in April 1912. None of them survived.' },
    'chapter-26': { title: 'Bohemian Grove & Elite Gatherings', desc: 'Inside the private retreat where American presidents, defense contractors, and media moguls gather each summer in the redwoods of Northern California.' },
    'chapter-27': { title: 'The Surveillance State — From ECHELON to Pegasus', desc: 'The documented history of government mass surveillance — from Cold War signals intelligence to the smartphone in your pocket.' },
    'chapter-28': { title: 'The Epstein Files', desc: 'The intelligence-linked operation that compromised the world\'s most powerful people — documented through court filings, flight logs, and the testimony of surv' },
    'epilogue': { title: 'A Note on Continued Research & Primary Source Access', desc: 'Where to find the original documents, how to verify the claims in this book, and how to continue the investigation.' },
  }
  return chapters[slug] || null
}

app.use((req, res, next) => {
  const ua = req.headers['user-agent'] || ''
  if (!BOT_UA.test(ua)) return next()

  // Read the HTML shell
  const htmlPath = path.join(__dirname, 'dist', 'index.html')
  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Static page meta for bots
  const staticPages = {
    '/methodology': { title: 'Methodology | Veritas Press', desc: 'Our four-tier source hierarchy and three-tier evidence classification system explained.' },
    '/sources': { title: 'Sources | Veritas Press', desc: 'Master bibliography and source library for The Record — 500+ primary source documents.' },
    '/search': { title: 'Search | Veritas Press', desc: 'Search all 31 chapters of The Record by keyword, topic, or evidence classification.' },
    '/timeline': { title: 'Timeline | Veritas Press', desc: 'An interactive chronological timeline of events documented in The Record, from 1694 to present.' },
    '/analytics': { title: 'Reader Analytics | Veritas Press', desc: 'Public readership analytics for The Record.' },
    '/accessibility': { title: 'Accessibility | Veritas Press', desc: 'Accessibility statement and WCAG 2.1 AA compliance information for Veritas Press.' },
    '/privacy': { title: 'Privacy Policy | Veritas Press', desc: 'How Veritas Press handles reader data, analytics, and privacy. Minimal data collection, no advertising trackers.' },
    '/terms': { title: 'Terms of Use | Veritas Press', desc: 'Terms of use for Veritas Press. Free and open access under Creative Commons BY-NC-SA 4.0.' },
    '/israel-dossier': { title: 'The Israel Dossier | Veritas Press', desc: 'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — every figure sourced to government records, UN agencies, and verified reporting.' },
    '/membership': { title: 'Membership | Veritas Press', desc: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.' },
    '/deep-state': { title: 'The Deep State — The Epstein Network | Veritas Press', desc: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.' },
    '/forum': { title: 'Veritas Forum | Veritas Press', desc: 'Community discussion forum for truth-seekers, researchers, and investigators. Discuss The Record, share evidence, and connect with fellow citizens demanding accountability.' },
    '/profiles': { title: 'Power Profiles | Veritas Press', desc: 'Sourced profiles of 235+ politicians, billionaires, lobbyists, and power brokers. Every claim cited to FEC filings, congressional records, court documents, and verified journalism.' },
    '/content-pack': { title: 'Content Packs & Brand Kit | Veritas Press', desc: 'Official brand assets and social media content packs for Veritas Press. Free for press, social media, and advocacy.' },
    '/news': { title: 'News | Veritas Press', desc: 'Latest news and updates from Veritas Press.' },
    '/donate': { title: 'Support Our Research | Veritas Press', desc: 'Fund independent, source-verified investigative journalism. No party. No agenda. Just the record. Every contribution keeps the archive online and free.' },
    '/read': { title: 'Read The Record | Veritas Press', desc: 'Read all 31 chapters of The Record — a documentary history spanning 1694 to present. Primary sources. Public record. Your conclusions.' },
  }

  const staticMeta = staticPages[req.path]
  if (staticMeta) {
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${staticMeta.title}</title>`)
      .replace(/content="The Record \| Veritas Press"/, `content="${staticMeta.title}"`)
      .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/, `content="${staticMeta.desc}"`)
      .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/, `content="${staticMeta.desc}"`)
  }

  // Check if this is a chapter route
  const chapterMatch = req.path.match(/^\/chapter\/(.+)$/)
  if (chapterMatch) {
    const meta = getChapterMeta(chapterMatch[1])
    if (meta) {
      const chapterUrl = `${SITE_URL}/chapter/${chapterMatch[1]}`
      const chapterSlug = chapterMatch[1]
      // Use PNG OG image if available, fall back to SVG, then default
      const pngPath = path.join(__dirname, 'dist', 'og', `${chapterSlug}.png`)
      const svgPath = path.join(__dirname, 'dist', 'og', `${chapterSlug}.svg`)
      let chapterOgImage = OG_IMAGE
      if (fs.existsSync(pngPath)) {
        chapterOgImage = `${SITE_URL}/og/${chapterSlug}.png`
      } else if (fs.existsSync(svgPath)) {
        chapterOgImage = `${SITE_URL}/og/${chapterSlug}.svg`
      }
      const imgType = chapterOgImage.endsWith('.png') ? 'image/png' : chapterOgImage.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
      // Replace default meta tags with chapter-specific ones
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${meta.title} | The Record — Veritas Press</title>`)
        .replace(/content="The Record \| Veritas Press"/g, `content="${meta.title} | The Record — Veritas Press"`)
        .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="${meta.desc}"`)
        .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="${meta.desc}"`)
        .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${chapterUrl}"`)
        .replace(/content="website"/, `content="article"`)
        .replace(/content="https:\/\/veritasworldwide\.com\/og-image\.png"/g, `content="${chapterOgImage}"`)
        .replace(/content="image\/png"/, `content="${imgType}"`)
    }
  }

  // Check if this is a profile route
  const profileMatch = req.path.match(/^\/profile\/(.+)$/)
  if (profileMatch) {
    const slug = profileMatch[1]
    // Convert slug to readable name: "ted-cruz" → "Ted Cruz"
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const profileUrl = `${SITE_URL}/profile/${slug}`
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${name} — Power Profile | Veritas Press</title>`)
      .replace(/content="The Record \| Veritas Press"/g, `content="${name} — Power Profile | Veritas Press"`)
      .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes. Every claim cited to FEC filings, congressional records, and verified journalism."`)
      .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes."`)
      .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${profileUrl}"`)
      .replace(/content="website"/, `content="article"`)
  }

  res.send(html)
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[veritas] Serving on port ${PORT}`)
  console.log(`[veritas] Data dir: ${DATA_DIR}`)
  console.log(`[veritas] Analytics: ${store.lifetime} lifetime views loaded`)
  if (process.env.RAILWAY_VOLUME_MOUNT_PATH && !process.env.DATA_DIR) {
    console.log(`[veritas] Using Railway volume mount path: ${process.env.RAILWAY_VOLUME_MOUNT_PATH}`)
  } else if (!process.env.DATA_DIR) {
    console.warn('[veritas] WARNING: DATA_DIR and RAILWAY_VOLUME_MOUNT_PATH not set — using ./data (data may be lost on redeploy)')
    console.warn('[veritas] Attach a Railway volume or set DATA_DIR to a persistent mount path for analytics retention')
  }
})
