import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// ── Persistent storage ────────────────────────────────────────────
// Uses DATA_DIR env var (Railway volume) or falls back to ./data
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data')
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

app.use(express.json())

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
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
  res.json({ lifetime: store.lifetime, today: store.daily[todayKey] || 0, thisWeek: store.weekly[weekKey] || 0, thisMonth: store.monthly[monthKey] || 0, thisYear: store.yearly[yearKey] || 0, countries, dailyTrend, topPages })
})

app.use(express.static(path.join(__dirname, 'dist')))

// ── Social crawler bot meta injection ─────────────────────────────
// Bots that don't execute JS get per-chapter OG tags injected server-side
const BOT_UA = /facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|redditbot/i
const SITE_URL = 'https://veritasworldwide.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

// Lightweight chapter metadata for bot responses (avoids importing TS data)
function getChapterMeta(slug) {
  // Map common slugs to titles for social preview
  const chapters = {
    'foreword': { title: 'A Note on Methodology, Evidence Standards & How to Read This Book', desc: 'This is a reference work compiling primary source documents into a chronological narrative.' },
    'overview': { title: 'Overview — The Architecture of Control', desc: 'A documentary investigation spanning 330 years of interconnected financial, political, and intelligence systems.' },
    'chapter-1': { title: 'The Talmud, Zionism & the Balfour Declaration', desc: 'From theological foundations to the 67-word letter that reshaped the Middle East.' },
    'chapter-2': { title: 'The Birth of Central Banking', desc: 'How private banks created the model for controlling national money supplies.' },
    'chapter-3': { title: 'The Bank War & Assassinated Presidents', desc: 'Three presidents opposed central banking. All three were assassinated.' },
    'chapter-4': { title: 'Jekyll Island & the Creation of the Federal Reserve', desc: 'Six men, one island, 25% of the world\'s wealth, and the law that changed money forever.' },
    'chapter-5': { title: 'The Federal Reserve — Structure, Power & Secrecy', desc: 'Who owns the Fed, how money is created, and why it matters.' },
    'chapter-17': { title: 'The Epstein Files', desc: 'The network connecting finance, politics, intelligence, and academia.' },
  }
  return chapters[slug] || null
}

app.use((req, res, next) => {
  const ua = req.headers['user-agent'] || ''
  if (!BOT_UA.test(ua)) return next()

  // Read the HTML shell
  const htmlPath = path.join(__dirname, 'dist', 'index.html')
  let html = fs.readFileSync(htmlPath, 'utf-8')

  // Check if this is a chapter route
  const chapterMatch = req.path.match(/^\/chapter\/(.+)$/)
  if (chapterMatch) {
    const meta = getChapterMeta(chapterMatch[1])
    if (meta) {
      const chapterUrl = `${SITE_URL}/chapter/${chapterMatch[1]}`
      // Replace default meta tags with chapter-specific ones
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${meta.title} | The Record — Veritas Worldwide Press</title>`)
        .replace(/content="The Record \| Veritas Worldwide Press"/, `content="${meta.title} | The Record — Veritas Worldwide Press"`)
        .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/, `content="${meta.desc}"`)
        .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/, `content="${meta.desc}"`)
        .replace(/content="https:\/\/veritasworldwide\.com"/, `content="${chapterUrl}"`)
        .replace(/content="website"/, `content="article"`)
    }
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
  if (!process.env.DATA_DIR) {
    console.warn('[veritas] WARNING: DATA_DIR not set — using ./data (data may be lost on redeploy)')
    console.warn('[veritas] Set DATA_DIR to a Railway volume mount path for persistent analytics')
  }
})
