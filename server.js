import express from 'express'
import compression from 'compression'
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

// Gzip/Brotli compression — reduces 549KB chapters chunk to ~188KB
app.use(compression())

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
    '/about': { title: 'About | Veritas Worldwide Press', desc: 'About Veritas Worldwide Press — our mission, editorial standards, and funding model.' },
    '/methodology': { title: 'Methodology | Veritas Worldwide Press', desc: 'Our four-tier source hierarchy and three-tier evidence classification system explained.' },
    '/sources': { title: 'Sources | Veritas Worldwide Press', desc: 'Master bibliography and source library for The Record — 500+ primary source documents.' },
    '/search': { title: 'Search | Veritas Worldwide Press', desc: 'Search all 31 chapters of The Record by keyword, topic, or evidence classification.' },
    '/timeline': { title: 'Timeline | Veritas Worldwide Press', desc: 'An interactive chronological timeline of events documented in The Record, from 1694 to present.' },
    '/analytics': { title: 'Reader Analytics | Veritas Worldwide Press', desc: 'Public readership analytics for The Record.' },
    '/accessibility': { title: 'Accessibility | Veritas Worldwide Press', desc: 'Accessibility statement and WCAG 2.1 AA compliance information for Veritas Worldwide Press.' },
    '/privacy': { title: 'Privacy Policy | Veritas Worldwide Press', desc: 'How Veritas Worldwide Press handles reader data, analytics, and privacy. Minimal data collection, no advertising trackers.' },
    '/terms': { title: 'Terms of Use | Veritas Worldwide Press', desc: 'Terms of use for Veritas Worldwide Press. Free and open access under Creative Commons BY-NC-SA 4.0.' },
    '/israel-dossier': { title: 'The Israel Dossier | Veritas Worldwide Press', desc: 'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — every figure sourced to government records, UN agencies, and verified reporting.' },
    '/membership': { title: 'Membership | Veritas Worldwide Press', desc: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.' },
    '/deep-state': { title: 'The Deep State — The Epstein Network | Veritas Worldwide Press', desc: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.' },
  }

  const staticMeta = staticPages[req.path]
  if (staticMeta) {
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${staticMeta.title}</title>`)
      .replace(/content="The Record \| Veritas Worldwide Press"/, `content="${staticMeta.title}"`)
      .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/, `content="${staticMeta.desc}"`)
      .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/, `content="${staticMeta.desc}"`)
  }

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
