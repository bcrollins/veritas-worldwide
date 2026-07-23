#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import vm from 'node:vm'
import { spawnSync } from 'child_process'

const SITE_NAME = 'Veritas Worldwide'
const SITE_URL = 'https://veritasworldwide.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

const repoRoot = process.cwd()
const distDir = path.join(repoRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const manifestPath = path.join(distDir, 'prerender-manifest.json')
const prerenderDir = path.join(distDir, 'prerender')
const distSitemapPath = path.join(distDir, 'sitemap.xml')
const sourceSitemapPath = path.join(repoRoot, 'public', 'sitemap.xml')
const distLlmsPath = path.join(distDir, 'llms.txt')
const sourceLlmsPath = path.join(repoRoot, 'public', 'llms.txt')
const distInstituteMarkdownPath = path.join(distDir, 'veritas-institute.md')
const sourceInstituteMarkdownPath = path.join(repoRoot, 'public', 'veritas-institute.md')
const chapterMetaPath = path.join(repoRoot, 'src', 'data', 'chapterMeta.ts')
const chapterSourceDir = path.join(repoRoot, 'src', 'data', 'chapters')
const israelDossierCanonPath = path.join(repoRoot, 'src', 'data', 'israelDossierCanon.ts')
const topicHubPath = path.join(repoRoot, 'src', 'data', 'topicHubs.json')
const profileDataPath = path.join(repoRoot, 'src', 'data', 'profileData.ts')
const instituteCatalogPath = path.join(repoRoot, 'src', 'data', 'instituteCatalog.ts')

// Only publish article packs that are wired into allArticles (SPA reader).
const articleCollections = [
  { file: 'src/data/articles.ts', exportName: 'articles' },
  { file: 'src/data/articlesExpanded.ts', exportName: 'expandedArticlesA' },
  { file: 'src/data/articlesExpandedB.ts', exportName: 'expandedArticlesB' },
]

let gitModifiedUnavailable = false

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const template = fs.readFileSync(templatePath, 'utf8')
fs.mkdirSync(prerenderDir, { recursive: true })

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(value) {
  return escapeHtml(value)
}

function decodeTsString(value) {
  return value
    .replace(/\\n/g, ' ')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractConstObjectBlock(source, exportName) {
  const assignment = `export const ${exportName} = {`
  const objectStart = source.indexOf(assignment)
  if (objectStart === -1) {
    throw new Error(`[prerender] Could not find ${exportName} in Israel dossier canon`)
  }

  const braceStart = source.indexOf('{', objectStart)
  let depth = 0
  let inString = false
  let quote = ''
  let escaped = false

  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        inString = false
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true
      quote = char
      continue
    }

    if (char === '{') depth += 1
    if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return source.slice(braceStart, index + 1)
      }
    }
  }

  throw new Error(`[prerender] Unterminated ${exportName} object in Israel dossier canon`)
}

function extractObjectStringField(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1\\s*,`))
  if (!match) {
    throw new Error(`[prerender] Could not find string field ${field} in Israel dossier canon`)
  }

  return decodeTsString(match[2])
}

function readCanonicalIsraelChapter15() {
  const source = fs.readFileSync(israelDossierCanonPath, 'utf8')
  const assetsBlock = extractConstObjectBlock(source, 'ISRAEL_DOSSIER_ASSETS')
  const chapterBlock = extractConstObjectBlock(source, 'ISRAEL_DOSSIER_CHAPTER_15')
  const financialHeroImage = extractObjectStringField(assetsBlock, 'financial')

  return {
    subtitle: extractObjectStringField(chapterBlock, 'subtitle'),
    heroImage: financialHeroImage,
  }
}

function normalizeCanonicalChapterMetaReferences(source) {
  if (!source.includes('ISRAEL_DOSSIER_CHAPTER_15')) return source

  const chapter15 = readCanonicalIsraelChapter15()
  return source
    .replace(/subtitle:\s*ISRAEL_DOSSIER_CHAPTER_15\.subtitle/g, `subtitle: ${JSON.stringify(chapter15.subtitle)}`)
    .replace(/heroImage:\s*ISRAEL_DOSSIER_CHAPTER_15\.heroImage/g, `heroImage: ${JSON.stringify(chapter15.heroImage)}`)
}

function normalizeHumanDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10)

  const direct = new Date(value)
  if (!Number.isNaN(direct.getTime())) {
    return direct.toISOString().slice(0, 10)
  }

  const monthYear = value.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (monthYear) {
    const parsed = new Date(`${monthYear[1]} 1, ${monthYear[2]} UTC`)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10)
    }
  }

  const yearOnly = value.match(/^(\d{4})$/)
  if (yearOnly) {
    return `${yearOnly[1]}-01-01`
  }

  return new Date().toISOString().slice(0, 10)
}

function getGitModified(filePath) {
  const fallbackModified = () => new Date(fs.statSync(filePath).mtimeMs).toISOString()

  if (gitModifiedUnavailable) {
    return fallbackModified()
  }

  const relativePath = path.relative(repoRoot, filePath)
  const result = spawnSync('git', ['log', '-1', '--format=%cI', '--', relativePath], {
    cwd: repoRoot,
    encoding: 'utf8',
    killSignal: 'SIGKILL',
    timeout: 1500,
  })

  if (result.status === 0 && result.stdout.trim()) {
    return result.stdout.trim()
  }

  gitModifiedUnavailable = true
  return fallbackModified()
}

function normalizeRoute(route) {
  if (!route || route === '/') return '/'
  return route.endsWith('/') ? route.slice(0, -1) : route
}

function routeToFile(route) {
  if (route === '/') return 'home.html'
  const key = route.replace(/^\/+/, '').replace(/[^\w/-]+/g, '').replace(/\//g, '__')
  return `${key || 'home'}.html`
}

function setTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/s, () => `<title>${escapeHtml(title)}</title>`)
}

function setMetaTag(html, attr, key, content) {
  const pattern = new RegExp(`(<meta[^>]+${attr}="${escapeRegExp(key)}"[^>]+content=")([^"]*)("[^>]*>)`, 'i')
  if (pattern.test(html)) {
    return html.replace(pattern, (_match, prefix, _current, suffix) => `${prefix}${escapeAttr(content)}${suffix}`)
  }
  return html.replace('</head>', () => `    <meta ${attr}="${key}" content="${escapeAttr(content)}" />\n  </head>`)
}

function setLinkTag(html, rel, href) {
  const pattern = new RegExp(`(<link[^>]+rel="${escapeRegExp(rel)}"[^>]+href=")([^"]*)("[^>]*>)`, 'i')
  if (pattern.test(html)) {
    return html.replace(pattern, (_match, prefix, _current, suffix) => `${prefix}${escapeAttr(href)}${suffix}`)
  }
  return html.replace('</head>', () => `    <link rel="${rel}" href="${escapeAttr(href)}" />\n  </head>`)
}

function injectJsonLd(html, jsonLd) {
  const scripts = jsonLd
    .map((entry, index) => `    <script type="application/ld+json" id="prerender-jsonld-${index}">${JSON.stringify(entry)}</script>`)
    .join('\n')
  return html.replace('</head>', `${scripts}\n  </head>`)
}

function injectRoot(html, body) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function ogImageMimeType(imageUrl = '') {
  if (/\.jpe?g($|\?)/i.test(imageUrl)) return 'image/jpeg'
  if (/\.webp($|\?)/i.test(imageUrl)) return 'image/webp'
  if (/\.svg($|\?)/i.test(imageUrl)) return 'image/svg+xml'
  if (/\.gif($|\?)/i.test(imageUrl)) return 'image/gif'
  return 'image/png'
}

function buildDocument(baseHtml, meta, body) {
  let html = baseHtml
  const image = meta.image || DEFAULT_OG_IMAGE
  html = setTitle(html, meta.title)
  html = setMetaTag(html, 'name', 'description', meta.description)
  html = setMetaTag(html, 'property', 'og:title', meta.title)
  html = setMetaTag(html, 'property', 'og:description', meta.description)
  html = setMetaTag(html, 'property', 'og:type', meta.type || 'website')
  html = setMetaTag(html, 'property', 'og:url', meta.url)
  html = setMetaTag(html, 'property', 'og:image', image)
  html = setMetaTag(html, 'property', 'og:image:type', ogImageMimeType(image))
  html = setMetaTag(html, 'name', 'twitter:title', meta.title)
  html = setMetaTag(html, 'name', 'twitter:description', meta.description)
  html = setMetaTag(html, 'name', 'twitter:image', image)
  // Discover-friendly robots (Search Central max-image-preview) unless page opts out
  html = setMetaTag(
    html,
    'name',
    'robots',
    meta.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  )
  html = setLinkTag(html, 'canonical', meta.url)

  if (meta.keywords?.length) {
    html = setMetaTag(html, 'name', 'keywords', meta.keywords.join(', '))
  }

  if (meta.publishedTime) {
    html = setMetaTag(html, 'property', 'article:published_time', meta.publishedTime)
  }

  if (meta.modifiedTime) {
    html = setMetaTag(html, 'property', 'article:modified_time', meta.modifiedTime)
  }

  if (meta.jsonLd?.length) {
    html = injectJsonLd(html, meta.jsonLd)
  }

  return injectRoot(html, body)
}

function parseKeywords(rawKeywords) {
  const matches = [...rawKeywords.matchAll(/"((?:\\.|[^"])*)"/g)]
  return matches.map((match) => decodeTsString(match[1]))
}

function parseChapterMeta() {
  // Expand ISRAEL_DOSSIER_CHAPTER_15.* then normalize single-quoted heroImage paths
  // so the double-quote regex matches every chapter (historical meta uses ').
  let source = normalizeCanonicalChapterMetaReferences(fs.readFileSync(chapterMetaPath, 'utf8'))
  source = source.replace(/heroImage:\s*'((?:\\.|[^'])*)'/g, 'heroImage: "$1"')
  const pattern = /\{\s*id:\s*"([^"]+)",\s*number:\s*"((?:\\.|[^"])*)",\s*title:\s*"((?:\\.|[^"])*)",\s*subtitle:\s*"((?:\\.|[^"])*)",\s*dateRange:\s*"((?:\\.|[^"])*)",\s*author:\s*"((?:\\.|[^"])*)",\s*publishDate:\s*"((?:\\.|[^"])*)",\s*(?:heroImage:\s*"((?:\\.|[^"])*)",\s*)?keywords:\s*\[([\s\S]*?)\],\s*\}/g
  const chapters = []

  for (const match of source.matchAll(pattern)) {
    chapters.push({
      id: decodeTsString(match[1]),
      number: decodeTsString(match[2]),
      title: decodeTsString(match[3]),
      subtitle: decodeTsString(match[4]),
      dateRange: decodeTsString(match[5]),
      author: decodeTsString(match[6]),
      publishDate: decodeTsString(match[7]),
      heroImage: match[8] ? decodeTsString(match[8]) : '',
      keywords: parseKeywords(match[9]),
    })
  }

  if (chapters.length < 30) {
    console.warn(`[prerender] parseChapterMeta only found ${chapters.length} chapters (expected ≥30)`)
  }

  return chapters
}

function getChapterExcerpt(chapterId) {
  const chapterFile = path.join(chapterSourceDir, `${chapterId}.ts`)
  if (!fs.existsSync(chapterFile)) return []

  const source = fs.readFileSync(chapterFile, 'utf8')
  const pattern = /type:\s*'(?:dropcap|text)'\s*,\s*text:\s*'((?:\\.|[^'])*)'/g
  const excerpts = []

  for (const match of source.matchAll(pattern)) {
    const text = decodeTsString(match[1])
    if (text) {
      excerpts.push(text)
    }
    if (excerpts.length === 2) break
  }

  return excerpts
}

function getOgImage(chapterId, chapterHeroPath = '') {
  // Prefer first-party editorial chapter heroes when present.
  const localHeroRel = chapterHeroPath?.startsWith('/')
    ? chapterHeroPath
    : chapterHeroPath
      ? `/${chapterHeroPath}`
      : `/chapters/heroes/${chapterId}.jpg`
  const localHeroDisk = path.join(repoRoot, 'public', localHeroRel.replace(/^\//, ''))
  if (fs.existsSync(localHeroDisk)) {
    return `${SITE_URL}${localHeroRel.startsWith('/') ? '' : '/'}${localHeroRel}`
  }

  const pngPath = path.join(distDir, 'og', `${chapterId}.png`)
  const svgPath = path.join(distDir, 'og', `${chapterId}.svg`)

  if (fs.existsSync(pngPath)) return `${SITE_URL}/og/${chapterId}.png`
  if (fs.existsSync(svgPath)) return `${SITE_URL}/og/${chapterId}.svg`

  return DEFAULT_OG_IMAGE
}

function extractArrayLiteral(source, exportName) {
  const exportIndex = source.indexOf(`export const ${exportName}`)
  if (exportIndex === -1) {
    throw new Error(`Could not find export ${exportName}`)
  }

  const equalsIndex = source.indexOf('=', exportIndex)
  if (equalsIndex === -1) {
    throw new Error(`Could not find assignment for ${exportName}`)
  }

  const arrayStart = source.indexOf('[', equalsIndex)
  if (arrayStart === -1) {
    throw new Error(`Could not find array start for ${exportName}`)
  }

  let depth = 0
  let inString = false
  let quote = ''
  let escaped = false

  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        inString = false
        quote = ''
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true
      quote = char
      continue
    }

    if (char === '[') depth += 1
    if (char === ']') {
      depth -= 1
      if (depth === 0) {
        return source.slice(arrayStart, index + 1)
      }
    }
  }

  throw new Error(`Unterminated array literal for ${exportName}`)
}

function evaluateArrayLiteral(literal) {
  return vm.runInNewContext(literal, {})
}

function loadArticleData() {
  return articleCollections.flatMap(({ file, exportName }) => {
    const filePath = path.join(repoRoot, file)
    const source = fs.readFileSync(filePath, 'utf8')
    const literal = extractArrayLiteral(source, exportName)
    const articles = evaluateArrayLiteral(literal)
    if (!Array.isArray(articles)) return []
    return articles.map((article) => ({ ...article, __sourceFile: file }))
  })
}

function loadTopicHubs() {
  return JSON.parse(fs.readFileSync(topicHubPath, 'utf8'))
}

function parseSingleQuotedList(raw = '') {
  return [...raw.matchAll(/'((?:\\.|[^'])*)'/g)].map((match) => decodeTsString(match[1]))
}

function extractSingleQuotedField(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*'((?:\\\\.|[^'])*)'`))
  return match ? decodeTsString(match[1]) : ''
}

function parseInstituteTopics() {
  const source = fs.readFileSync(instituteCatalogPath, 'utf8')
  const topics = []

  for (const match of source.matchAll(/topic\(\{([\s\S]*?)\n  \}\),/g)) {
    const block = match[1]
    const keywordsMatch = block.match(/keywords:\s*\[([\s\S]*?)\],\s*institutions:/)
    const institutionsMatch = block.match(/institutions:\s*\[([\s\S]*?)\],\s*timeToFirstResult:/)
    const relatedMatch = block.match(/related:\s*\[([\s\S]*?)\],\s*tools:/)
    const toolsMatch = block.match(/tools:\s*\[([\s\S]*?)\],?/)

    const topic = {
      id: extractSingleQuotedField(block, 'id'),
      slug: extractSingleQuotedField(block, 'slug'),
      track: extractSingleQuotedField(block, 'track'),
      archetype: extractSingleQuotedField(block, 'archetype'),
      skill: extractSingleQuotedField(block, 'skill'),
      courseTitle: extractSingleQuotedField(block, 'courseTitle'),
      articleTitle: extractSingleQuotedField(block, 'articleTitle'),
      summary: extractSingleQuotedField(block, 'summary'),
      whyNow: extractSingleQuotedField(block, 'whyNow'),
      firstAction: extractSingleQuotedField(block, 'firstAction'),
      timeToFirstResult: extractSingleQuotedField(block, 'timeToFirstResult'),
      difficulty: extractSingleQuotedField(block, 'difficulty'),
      outcome: extractSingleQuotedField(block, 'outcome'),
      warning: extractSingleQuotedField(block, 'warning'),
      keywords: parseSingleQuotedList(keywordsMatch?.[1] || ''),
      institutions: parseSingleQuotedList(institutionsMatch?.[1] || ''),
      related: parseSingleQuotedList(relatedMatch?.[1] || ''),
      tools: parseSingleQuotedList(toolsMatch?.[1] || ''),
    }

    if (topic.id && topic.slug) {
      topics.push(topic)
    }
  }

  return topics
}

function parseInstituteResearchSources() {
  const source = fs.readFileSync(instituteCatalogPath, 'utf8')
  const arrayMatch = source.match(/export const instituteResearchSources = \[([\s\S]*?)\n\]/)

  if (!arrayMatch) return []

  return [...arrayMatch[1].matchAll(/\{\s*label:\s*'((?:\\.|[^'])*)',\s*url:\s*'((?:\\.|[^'])*)',\s*note:\s*'((?:\\.|[^'])*)',\s*\}/g)].map((match) => ({
    label: decodeTsString(match[1]),
    url: decodeTsString(match[2]),
    note: decodeTsString(match[3]),
  }))
}

function parseInstituteFieldManualEntries() {
  const source = fs.readFileSync(instituteCatalogPath, 'utf8')
  const literal = extractArrayLiteral(source, 'instituteFieldManualEntries')
  const entries = evaluateArrayLiteral(literal)
  return Array.isArray(entries) ? entries : []
}

function loadProfileSlugs() {
  const source = fs.readFileSync(profileDataPath, 'utf8')
  return [...new Set([...source.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]))]
}

function loadProfilePhotos() {
  const source = fs.readFileSync(profileDataPath, 'utf8')
  const photos = {}
  for (const match of source.matchAll(/'([a-z0-9-]+)':\s*'(\/profiles\/[^']+)'/g)) {
    photos[match[1]] = match[2]
  }
  return photos
}

/**
 * Parse PowerProfile list shells for crawler-visible prerender HTML.
 * Full interactive profile UI still hydrates client-side.
 */
function parseIntegrityFromProfileWindow(window) {
  if (!window.includes('documentedFalsehoods:')) {
    return { integrityScore: null, integrityFalsehoods: 0, integrityHasDocket: false }
  }
  if (/documentedFalsehoods:\s*\[\s*\]/.test(window)) {
    return { integrityScore: 100, integrityFalsehoods: 0, integrityHasDocket: true }
  }
  const blockMatch = window.match(/documentedFalsehoods:\s*\[([\s\S]*?)\n\s*\],/)
  if (!blockMatch) {
    return { integrityScore: null, integrityFalsehoods: 0, integrityHasDocket: false }
  }
  const block = blockMatch[1]
  const severities = [...block.matchAll(/severity:\s*'(minor|material|egregious)'/g)].map((m) => m[1])
  const tiers = [...block.matchAll(/tier:\s*'(verified|circumstantial|disputed)'/g)].map((m) => m[1])
  const deduct = { minor: 8, material: 15, egregious: 25 }
  let total = 0
  let verified = 0
  for (let i = 0; i < severities.length; i++) {
    if ((tiers[i] || 'verified') !== 'verified') continue
    total += deduct[severities[i]] || 0
    verified += 1
  }
  return {
    integrityScore: Math.max(0, 100 - total),
    integrityFalsehoods: verified,
    integrityHasDocket: true,
  }
}

function parseProfiles() {
  const source = fs.readFileSync(profileDataPath, 'utf8')
  const photos = loadProfilePhotos()
  const profiles = []
  const pattern =
    /\{\s*id:\s*'([^']+)',\s*name:\s*'((?:\\.|[^'])*)',\s*title:\s*'((?:\\.|[^'])*)',\s*category:\s*'([^']+)',[\s\S]*?summary:\s*'((?:\\.|[^'])*)'/g

  for (const match of source.matchAll(pattern)) {
    const id = match[1]
    const idIdx = match.index ?? source.indexOf(`id: '${id}'`)
    const nextId = source.indexOf("\n  {\n    id: '", idIdx + 10)
    const window = source.slice(idIdx, nextId > 0 ? nextId : idIdx + 25000)
    const integrity = parseIntegrityFromProfileWindow(window)
    profiles.push({
      id,
      name: decodeTsString(match[2]),
      title: decodeTsString(match[3]),
      category: match[4],
      summary: decodeTsString(match[5]),
      photo: photos[id] || '',
      ...integrity,
    })
  }

  if (profiles.length < 30) {
    console.warn(`[prerender] parseProfiles only found ${profiles.length} profiles (expected ≥30)`)
  }

  return profiles
}

function renderProfilePage(profile) {
  const photo = profile.photo
    ? `<img src="${escapeAttr(profile.photo)}" alt="${escapeAttr(profile.name)}" class="w-28 h-28 rounded-sm object-cover border border-border" width="112" height="112" loading="eager" />`
    : ''
  const integrityBlock =
    profile.integrityHasDocket && profile.integrityScore != null
      ? `<div class="mt-6 border border-border rounded-sm bg-surface p-4">
          <p class="font-sans text-[0.6rem] font-bold tracking-[0.14em] uppercase text-crimson">Integrity Score</p>
          <p class="font-display text-3xl font-bold text-ink tabular-nums mt-1">${profile.integrityScore}<span class="text-base font-sans font-normal text-ink-muted">/100</span></p>
          <p class="font-body text-sm text-ink-muted mt-1">${profile.integrityFalsehoods} verified public falsehood${profile.integrityFalsehoods === 1 ? '' : 's'} on file — open the interactive profile to inspect each statement, when it was said, why it was false, and dual sources.</p>
        </div>`
      : `<p class="font-body text-sm text-ink-faint mt-6">Integrity Score not yet compiled for this profile (unscored ≠ clean docket).</p>`
  return `
    <main class="max-w-3xl mx-auto px-4 py-12">
      <p class="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Power Profile · ${escapeHtml(profile.category)}</p>
      <div class="flex flex-col sm:flex-row gap-6 items-start">
        ${photo}
        <div>
          <h1 class="font-display text-4xl font-bold text-ink leading-tight">${escapeHtml(profile.name)}</h1>
          <p class="font-sans text-sm text-ink-muted mt-2">${escapeHtml(profile.title)}</p>
        </div>
      </div>
      <p class="font-body text-lg text-ink-muted leading-relaxed mt-8">${escapeHtml(profile.summary)}</p>
      ${integrityBlock}
      <p class="font-body text-sm text-ink-faint mt-6">This prerendered shell is for crawlers and social previews. Open the live profile for donations, policy actions, sourced claims, network connections, and the full Integrity Docket.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/profile/${escapeAttr(profile.id)}" class="inline-flex min-h-[44px] items-center px-4 py-2 bg-crimson text-white font-sans text-xs font-bold uppercase tracking-wider rounded-sm">Open interactive profile</a>
        <a href="/profiles?sort=integrity-asc" class="inline-flex min-h-[44px] items-center px-4 py-2 border border-border font-sans text-xs font-bold uppercase tracking-wider rounded-sm text-ink">Profiles by integrity</a>
        <a href="/methodology#integrity-score" class="inline-flex min-h-[44px] items-center px-4 py-2 border border-border font-sans text-xs font-bold uppercase tracking-wider rounded-sm text-ink">Score methodology</a>
      </div>
    </main>
  `
}

function buildProfileJsonLd(profile) {
  const url = `${SITE_URL}/profile/${profile.id}`
  const image = profile.photo ? absoluteSiteUrl(profile.photo) : DEFAULT_OG_IMAGE
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `${profile.name} — Power Profile`,
      url,
      description: profile.summary,
      mainEntity: {
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.title,
        description: profile.summary,
        image,
        url,
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Veritas Worldwide',
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Profiles', item: `${SITE_URL}/profiles` },
        { '@type': 'ListItem', position: 3, name: profile.name, item: url },
      ],
    },
  ]
}

function normalizeTopicTerm(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, ' ')
}

function buildTopicAliasMap(topics) {
  const map = new Map()
  for (const topic of topics) {
    const terms = new Set([topic.name, ...(topic.aliases || []), ...(topic.keywords || [])])
    for (const term of terms) {
      map.set(normalizeTopicTerm(term), topic.slug)
    }
  }
  return map
}

function getTopicRouteForTerm(term, topicAliasMap) {
  const normalized = normalizeTopicTerm(term)
  const exact = topicAliasMap.get(normalized)
  if (exact) return `/topics/${exact}`

  for (const [alias, slug] of topicAliasMap.entries()) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return `/topics/${slug}`
    }
  }

  return `/search?q=${encodeURIComponent(term)}`
}

function renderFeaturedList(chapters) {
  return chapters
    .map((chapter) => `
      <li class="border-b border-border last:border-b-0 py-4">
        <a href="/chapter/${escapeAttr(chapter.id)}" class="block">
          <p class="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">${escapeHtml(chapter.number)}</p>
          <h2 class="font-display text-xl md:text-2xl font-bold text-ink leading-tight mb-2">${escapeHtml(chapter.title)}</h2>
          <p class="font-body text-base text-ink-muted leading-relaxed">${escapeHtml(chapter.subtitle)}</p>
        </a>
      </li>`)
    .join('\n')
}

function renderStaticPage(page, chapters) {
  const chapterLinks = page.featuredChapterIds?.length
    ? chapters.filter((chapter) => page.featuredChapterIds.includes(chapter.id))
    : []

  const relatedMarkup = chapterLinks.length
    ? `
      <section class="mt-10">
        <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Featured Reading</p>
        <ul class="list-none m-0 p-0">${renderFeaturedList(chapterLinks)}</ul>
      </section>`
    : ''

  const trustLinks = Array.isArray(page.trustLinks) ? page.trustLinks : []
  const trustMarkup = trustLinks.length
    ? `
      <nav class="mt-10 border border-border bg-surface rounded-lg p-5 max-w-xl" aria-label="Related pages">
        <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Related Pages</p>
        <ul class="list-none m-0 p-0 space-y-2">
          ${trustLinks
            .map((link) => {
              const href = escapeAttr(link.href || '')
              const label = escapeHtml(link.label || '')
              const download = link.download ? ` download="${escapeAttr(link.download)}"` : ''
              return `<li><a href="${href}" class="block text-sm text-ink-muted hover:text-crimson transition-colors"${download}>${label}</a></li>`
            })
            .join('\n')}
        </ul>
      </nav>`
    : ''

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Veritas Worldwide</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(page.heading)}</h1>
        <p class="font-body text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">${escapeHtml(page.description)}</p>
        ${page.body.map((paragraph) => `<p class="font-body text-base md:text-lg text-ink-light leading-8 mt-6 max-w-4xl">${escapeHtml(paragraph)}</p>`).join('\n')}
        ${relatedMarkup}
        ${trustMarkup}
      </div>
    </main>`
}

const FIELD_MANUAL_TRUST_LINKS = [
  { href: '/institute/book', label: '→ Field Manual' },
  {
    href: '/veritas-institute-field-manual.pdf',
    label: '→ Field Manual PDF',
    download: 'veritas-institute-field-manual.pdf',
  },
]

function renderTopicsIndexPage(topics) {
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Research Topics</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">Topic hubs built for search, citation, and sustained reading.</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-4xl">
          These pages connect the longform chapters of The Record with current reporting so search visitors can move from a topic query into a documented body of work, then subscribe for future investigations.
        </p>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-10">
          ${topics.map((topic) => `
            <a href="/topics/${escapeAttr(topic.slug)}" class="border border-border bg-surface p-5 block">
              <p class="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">${escapeHtml(topic.eyebrow)}</p>
              <h2 class="font-display text-2xl font-bold text-ink leading-tight">${escapeHtml(topic.name)}</h2>
              <p class="font-body text-sm text-ink-muted leading-7 mt-3">${escapeHtml(topic.description)}</p>
            </a>
          `).join('\n')}
        </div>
      </div>
    </main>`
}

const instituteTrackLabels = {
  'ai-automation': 'AI & Automation',
  'trades': 'Trades',
  'healthcare': 'Healthcare',
  'tech': 'Tech & Data',
  'business': 'Business',
  'money': 'Money Systems',
  'home-repair': 'Repair',
  'food-self-reliance': 'Food & Garden',
  'preparedness': 'Preparedness',
  'communication': 'Core Skills',
}

function lowerFirst(value = '') {
  return value ? value.charAt(0).toLowerCase() + value.slice(1) : ''
}

function dedupeList(items = []) {
  return [...new Set(items.map((item) => String(item).trim()).filter(Boolean))]
}

const institutePracticalTrackSet = new Set([
  'trades',
  'home-repair',
  'preparedness',
  'food-self-reliance',
  'healthcare',
  'communication',
])

const israelDossierInstituteTopicSet = new Set([
  'israel-dossier-source-file',
  'israel-aid-ledger',
  'israel-humanitarian-figures',
  'israel-incident-evidence',
  'israel-legal-records',
  'israel-briefings',
])

function isIsraelDossierInstituteTopic(topic) {
  return israelDossierInstituteTopicSet.has(topic.id)
}

function filterPracticalInstituteTopics(topics) {
  return topics.filter((topic) => institutePracticalTrackSet.has(topic.track))
}

function groupInstituteTopicsByTrack(topics) {
  return Object.entries(
    topics.reduce((acc, topic) => {
      acc[topic.track] = acc[topic.track] || []
      acc[topic.track].push(topic)
      return acc
    }, {})
  )
}

function buildInstituteBrief(topic) {
  const framing = {
    career: 'a supervised skill path with visible proof of readiness',
    'ai-income': 'a narrow workflow offer with a human QA layer',
    'service-business': 'a local operating system built around clear scope and repeat work',
    'money-system': 'a rule-based stability system that reduces fragility',
    diy: 'a diagnosis-first repair workflow with explicit safety boundaries',
    resilience: 'a calm redundancy system built for rehearsal and maintenance',
    communication: 'a repeatable practice system that turns clarity into leverage',
  }[topic.archetype] || 'a disciplined, proof-first path'

  const prerequisites = {
    career: [
      'Know which local employers or training lanes actually hire into this path.',
      'Block weekly time for supervised practice or credential work.',
      'Budget for the minimum safety gear, tuition, or exam costs involved.',
    ],
    'ai-income': [
      'Choose one workflow or niche you understand well enough to judge quality.',
      'Set up a human QA checklist before offering the work to anyone else.',
      'Be ready to show one before-and-after sample instead of broad claims.',
    ],
    'service-business': [
      'Define the exact service boundary before naming the business.',
      'Know the minimum tool kit and jobs it can safely handle.',
      'Understand local registration, insurance, and quoting basics.',
    ],
    'money-system': [
      'Gather balances, due dates, and recurring expenses in one place.',
      'Pick one weekly review time you can actually keep.',
      'Stop layering competing systems until one baseline rule set works.',
    ],
    diy: [
      'Know the shutoff, isolation, or safety boundary for the system.',
      'Confirm the exact tool and material list before starting.',
      'Decide in advance which conditions force an escalation to a licensed pro.',
    ],
    resilience: [
      'Define the scenario you are preparing for before buying anything.',
      'Use official safety guidance for water, food, medicine, sanitation, or power.',
      'Start with a small system you can maintain without constant friction.',
    ],
    communication: [
      'Pick one real audience or use case where the skill matters next.',
      'Set a short practice block you can repeat without negotiation.',
      'Choose a feedback source that gives concrete notes.',
    ],
  }[topic.archetype] || []

  const proofPoints = {
    career: 'Progress means visible readiness: labs, supervised work, shadowing, or credential steps an employer can scan quickly.',
    'ai-income': 'Progress means a before-and-after sample, a revision log, or a pilot outcome with a visible QA layer.',
    'service-business': 'Progress means quotes, checklists, photos, referrals, and repeat work that prove reliability.',
    'money-system': 'Progress means fewer emergencies, a stable weekly dashboard, and rules that still hold under pressure.',
    diy: 'Progress means a correct diagnosis, the right materials, and a visible inspection or test routine.',
    resilience: 'Progress means a written plan, functioning baseline kit, and rehearsal notes that show the system works.',
    communication: 'Progress means visible writing, speaking, or teaching samples that demonstrate clarity under real conditions.',
  }[topic.archetype] || 'Progress means visible proof, not just more reading.'

  const relatedTitles = (topic.related || [])
    .map((slug) => instituteTopics.find((candidate) => candidate.slug === slug))
    .filter(Boolean)
    .map((relatedTopic) => relatedTopic.articleTitle)

  if (topic.id === 'research-fast') {
    return {
      llmSummary: 'Research anything fast by defining the claim first, choosing the correct public-record system, capturing audit-ready citations, checking contradictions, and writing the result with confidence labels instead of unsupported certainty.',
      searchIntent: 'People search for fast research workflows because they need reliable answers quickly without letting search results, screenshots, or AI summaries outrun the underlying record.',
      fastAnswer: 'Write the exact claim, evidence threshold, and first public-record system before opening a general search tab. Then preserve every source with a record log, access date, and confidence label.',
      prerequisites: [
        'A real claim or question narrow enough to test.',
        'A record log for URLs, access dates, document titles, custodians, and confidence labels.',
        'A willingness to abandon or downgrade a claim when the source chain does not support it.',
      ],
      proofPoints: 'Progress means another reader can audit the path from question to source to conclusion without reconstructing your search history.',
      relatedQueries: dedupeList([...(topic.keywords || []), ...relatedTitles]).slice(0, 6),
      officialCheckpoints: [
        'Start with National Archives, Congress.gov, Data.gov, FOIA.gov, FEC data, SEC EDGAR, Federal Register, USAspending, and court records before relying on commentary.',
        topic.warning,
        'Treat source hierarchy, citation discipline, and visible confidence labels as the proof threshold. Interest without evidence does not count.',
      ],
      modules: ['Frame the Claim', 'Build the Source Ladder', 'Search Public Records', 'Cross-Check the Record', 'Write With Confidence Labels', 'Maintain the Research File'],
    }
  }

  if (topic.id === 'fact-check') {
    return {
      llmSummary: 'Fact-check information and avoid scams by slowing urgent asks, finding the original source, verifying institutions through independent channels, checking fraud patterns, and documenting the safest decision before acting.',
      searchIntent: 'People search for fact-checking and scam-avoidance systems because urgent claims, impersonation attempts, AI summaries, and crisis rumors keep creating preventable risk.',
      fastAnswer: 'Slow the urgent ask, identify the original source, and verify the institution through a clean path before clicking, paying, forwarding, accusing, or disclosing private information.',
      prerequisites: [
        'One urgent claim, message, payment request, or public allegation to slow down and inspect.',
        'A clean path to official websites, account portals, court records, public filings, or consumer-alert pages.',
        'A rule that you do not click, pay, forward, accuse, or disclose private information until verification survives.',
      ],
      proofPoints: 'Progress means fewer rushed decisions, fewer forwarded false claims, and clearer escalation when fraud or public-risk claims appear credible.',
      relatedQueries: dedupeList([...(topic.keywords || []), ...relatedTitles]).slice(0, 6),
      officialCheckpoints: [
        'Use FTC, CFPB, FOIA.gov, official agency pages, court records, company portals, and public filings instead of contact details supplied by the urgent message.',
        topic.warning,
        'Treat an original source, an independent institution path, and a clear decision note as the proof threshold.',
      ],
      modules: ['Slow the Ask', 'Find the Original Source', 'Verify the Institution', 'Check the Fraud Pattern', 'Make the Safer Decision', 'Build a Verification Habit'],
    }
  }

  if (isIsraelDossierInstituteTopic(topic)) {
    return {
      llmSummary: `${topic.skill} by reducing each claim to a source row, classifying the evidence, preserving attribution boundaries, auditing legal and humanitarian language, and leaving a publishable file another editor can verify.`,
      searchIntent: 'People search for Israel dossier evidence workflows because the public record is high-risk, fast-moving, and easy to misstate when source classes are blended.',
      fastAnswer: `${topic.firstAction} Then label every source by class and every claim by confidence before drafting reader-facing prose.`,
      prerequisites: [
        'One Israel dossier claim narrow enough to test.',
        'A source ledger for claim text, source class, custodian, date, URL, access date, confidence label, and open question.',
        'A rule that no claim moves into public copy until its evidence tier and source boundary are explicit.',
      ],
      proofPoints: 'Progress means a skeptical editor can trace every number, legal term, and incident claim from prose back to the source row without guessing.',
      relatedQueries: dedupeList([...(topic.keywords || []), ...relatedTitles]).slice(0, 6),
      officialCheckpoints: [
        `Use ${(topic.institutions || []).slice(0, 3).join(', ')} as the first source ladder before relying on commentary, screenshots, reposts, or unsourced summaries.`,
        topic.warning,
        'Treat claim rows, source classes, confidence labels, access dates, and open questions as the proof threshold.',
      ],
      modules: ['Set the Claim Boundary', 'Build the Source Ladder', 'Classify the Evidence', 'Write the Safest Version', 'Audit the Briefing', 'Leave a Durable File'],
    }
  }

  return {
    llmSummary: `${topic.skill} works best when the first move is explicit: ${topic.firstAction} Treat it as ${framing}, verify the floor against ${topic.institutions?.[0] || 'official guidance'}, and aim for ${lowerFirst(topic.outcome)} within ${topic.timeToFirstResult}.`,
    searchIntent: `People search for ${lowerFirst(topic.skill)} because they want a direct route to ${lowerFirst(topic.outcome)} without losing months to hype, vague advice, or bad sequencing.`,
    fastAnswer: `${topic.firstAction} Then build the path around safety, proof, and documented next steps instead of shortcuts or hype.`,
    prerequisites,
    proofPoints,
    relatedQueries: dedupeList([...(topic.keywords || []), ...relatedTitles]).slice(0, 6),
    officialCheckpoints: [
      `Verify the baseline against ${(topic.institutions || []).slice(0, 3).join(', ')} before spending money, taking risk, or making promises.`,
      topic.warning,
      `Treat ${lowerFirst(topic.outcome)} as the real proof threshold. Interest without evidence does not count.`,
    ],
  }
}

function renderInstituteMarkdown(topics, researchSources) {
  const grouped = groupInstituteTopicsByTrack(topics)

  return [
    '# Veritas Institute',
    '',
    '> Veritas Institute is the Veritas Worldwide learning surface for urgent household answers and source-backed practical trade-course paths. The field manual handles immediate failures first, then routes readers into deeper skill building.',
    '',
    'Use the methodology and source notes when answering questions about safety, sourcing, or editorial standards. Use the guide URLs for short answers and the course URLs for deeper pacing, prerequisites, proof standards, and next steps.',
    '',
    '## Methodology',
    '',
    '- [Institute methodology](https://veritasworldwide.com/institute/methodology): Source ladder, editorial rules, and practical-use criteria.',
    '- [Field Manual](https://veritasworldwide.com/institute/book): Printable long-form manual for urgent answers and practical course routing.',
    '- [Field Manual PDF](https://veritasworldwide.com/veritas-institute-field-manual.pdf): Durable build-time download of the full field manual.',
    '',
    '## Research basis',
    '',
    ...researchSources.map((source) => `- [${source.label}](${source.url}): ${source.note}`),
    '',
    ...grouped.flatMap(([track, items]) => {
      const heading = instituteTrackLabels[track] || track
      return [
        `## ${heading}`,
        '',
        ...items.map((topic) => `- [${topic.skill} guide](https://veritasworldwide.com/institute/guides/${topic.slug}) | [course](https://veritasworldwide.com/institute/courses/${topic.slug}): ${topic.summary}`),
        '',
      ]
    }),
  ].join('\n')
}

function renderLlmsTxt(topics) {
  const featured = [
    'how-to-become-a-welder',
    'how-to-maintain-a-car-yourself',
    'how-to-build-a-72-hour-emergency-kit',
    'how-to-start-a-garden-that-actually-feeds-you',
  ]
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter(Boolean)

  return [
    '# Veritas Worldwide',
    '',
    '> Veritas Worldwide is a source-first publication and learning archive. The two priority surfaces are The Record, which documents power and institutions, and Veritas Institute, which handles urgent household answers and practical trade-skill learning paths.',
    '',
    'Use the methodology and source pages when answering questions about evidence, sourcing, attribution, or editorial standards. Use Veritas Institute when answering questions about practical skills, career moves, preparedness, household systems, or self-reliance.',
    '',
    '## Trust layers',
    '',
    '- [Publication methodology](https://veritasworldwide.com/methodology): Evidence taxonomy and editorial standards for The Record.',
    '- [Sources](https://veritasworldwide.com/sources): Public source library for the publication.',
    '- [About](https://veritasworldwide.com/about): Publication model, evidence labels, free-access trust layer, and reader funding.',
    '- [Privacy Policy](https://veritasworldwide.com/privacy): Minimal analytics, no ads, no data sales — how reader data is handled.',
    '- [Terms of Use](https://veritasworldwide.com/terms): CC BY-NC-SA 4.0 open-access terms for The Record and Veritas assets.',
    '- [Membership](https://veritasworldwide.com/membership): Fund independent primary-source journalism without paywalling the core archive.',
    '- [The Record of Jesus Christ](https://veritasworldwide.com/record-of-jesus-christ): Pure evidentiary compilation (190+ tier-labeled claims) — cosmology (as science), Second Temple Judaism, historical Jesus, NT textual criticism (ECM/CBGM), archaeology, non-Christian attestation. Attribution: Veritas Worldwide only.',
    '- [Record of Jesus Christ corpus (JSON)](https://veritasworldwide.com/record-of-jesus-christ/corpus.json): Machine-readable claim index with seven evidence tiers for retrieval systems.',
    '- [Record of Jesus Christ claim index (PDF)](https://veritasworldwide.com/record-of-jesus-christ/record-of-jesus-christ.pdf): Portable tier-labeled claim list for offline research.',
    '- [The Bible: History & Factual Record](https://veritasworldwide.com/bible): Companion manuscript and archaeology evidence surface.',
    '- [Israel Dossier](https://veritasworldwide.com/israel-dossier): Source-backed dossier surface with public-record figures, evidence workbench, course path, and downloadable editor templates.',
    '- [Israel Dossier public briefing](https://veritasworldwide.com/israel-dossier/briefing): Source-boundary briefing generated from populated workbook rows with visible confidence limits and open questions.',
    '- [Israel Dossier template manifest](https://veritasworldwide.com/israel-dossier/templates/manifest.json): Machine-readable list of the source ledger, aid ledger, humanitarian attribution, incident matrix, legal-status, and briefing templates.',
    '- [Israel Dossier workbook manifest](https://veritasworldwide.com/israel-dossier/workbooks/manifest.json): Machine-readable list of populated source-ledger, aid-ledger, humanitarian, incident, legal-status, briefing draft, and archive-manifest artifacts.',
    '- [Israel Dossier briefing source archive manifest](https://veritasworldwide.com/israel-dossier/workbooks/briefing-source-archive-manifest.json): 77+ pinned Wayback snapshots for briefing and primary-source durability when hosts block automated probes.',
    '- [Israel Dossier chapter draft](https://veritasworldwide.com/israel-dossier/workbooks/public-briefing-chapter-draft.md): Markdown chapter-style draft built from source-labeled workbook rows.',
    '- [Institute methodology](https://veritasworldwide.com/institute/methodology): Source ladder and editorial rules for Veritas Institute.',
    '',
    '## Veritas Institute',
    '',
    '- [Institute catalog](https://veritasworldwide.com/institute): Main entry point for the practical field-manual and trade-course catalog.',
    '- [Field Manual](https://veritasworldwide.com/institute/book): Print-friendly field manual for urgent answers and practical course routing.',
    '- [Field Manual PDF](https://veritasworldwide.com/veritas-institute-field-manual.pdf): Build-time durable PDF of the full field manual and practical course paths.',
    '- [Institute markdown index](https://veritasworldwide.com/veritas-institute.md): LLM-friendly grouped summary with guide and course links.',
    '',
    '## High-intent starting points',
    '',
    ...featured.map((topic) => `- [${topic.articleTitle}](https://veritasworldwide.com/institute/guides/${topic.slug}): ${topic.summary}`),
    '',
    '## Current reporting (primary-source news)',
    '',
    '- [News index](https://veritasworldwide.com/news): Current reporting built from government and institutional primary sources.',
    '- [News bot meta](https://veritasworldwide.com/news/meta.json): Machine-readable title, description, and first-party hero image for every news desk article.',
    '- [RSS feed](https://veritasworldwide.com/feed.xml): Archive chapters plus current-events news items with hero image enclosures.',
    '- [Election security and AI risk frameworks](https://veritasworldwide.com/news/election-security-ai-risk-frameworks-cisa-nist-2026): CISA election-security guidance and the NIST AI Risk Management Framework as the public institutional baseline.',
    '- [Treasury debt transparency](https://veritasworldwide.com/news/treasury-debt-transparency-fiscaldata-fed-h15-2026): FiscalData Debt-to-the-Penny, Monthly Treasury Statements, Fed H.15, and FOMC materials.',
    '- [Aviation safety primary records](https://veritasworldwide.com/news/aviation-safety-ntsb-faa-primary-records-2026): NTSB investigation records and FAA public portals for safety claims.',
    '- [Supreme Court Code of Conduct](https://veritasworldwide.com/news/judicial-ethics-supreme-court-code-of-conduct-primary-2026): The Court\'s November 13, 2023 Code of Conduct PDF as the primary ethics text.',
    '- [Federal Reserve holds rates — Iran oil crisis](https://veritasworldwide.com/news/federal-reserve-holds-rates-march-2026-iran-oil-crisis): FOMC decision context against energy-price and inflation primary records.',
    '- [DOJ Epstein files release](https://veritasworldwide.com/news/doj-releases-3-5-million-pages-epstein-files-2026): Documented scope of the Epstein Files Transparency Act release and privacy failures.',
    '- [FISA Section 702 reform](https://veritasworldwide.com/news/government-surveillance-reform-act-fisa-section-702-2026): Warrant requirements and sunset pressure on bulk surveillance authorities.',
    '- [Defense budget $1.5T proposal](https://veritasworldwide.com/news/us-defense-budget-1-5-trillion-2027-proposal): Senate appropriations and reconciliation primary materials.',
    '- [AIPAC record spending](https://veritasworldwide.com/news/aipac-record-spending-reshaping-congress-2026): FEC-traced super PAC and primary spending.',
    '- [China tariff escalation](https://veritasworldwide.com/news/trump-tariffs-china-145-percent-trade-war-2026): USTR and tariff-schedule documentation.',
    '- [Gaza famine / UN-ICC record](https://veritasworldwide.com/news/gaza-famine-humanitarian-crisis-un-icc-2026): UN, ICC, and humanitarian primary-source framing.',
    '- [Boeing whistleblower / FAA safety](https://veritasworldwide.com/news/boeing-whistleblower-deaths-safety-crisis-faa-2026): FAA and safety-record primary materials.',
    '- [National debt interest burden](https://veritasworldwide.com/news/national-debt-36-trillion-interest-payments-2026): Treasury and FiscalData debt service records.',
    '',
    '## Investigations & community',
    '',
    '- [The Deep State — Epstein Network](https://veritasworldwide.com/deep-state): Court-sourced dossier surface with primary-document CTAs and evidence tiers.',
    '- [Israel Dossier](https://veritasworldwide.com/israel-dossier): Public-record figures, evidence workbench, course path, and archive-pinned briefing sources.',
    '- [Community forum](https://veritasworldwide.com/forum): Beta discussion for sourced material (local until shared stack ships).',
    '',
    '## Optional',
    '',
    '- [Home](https://veritasworldwide.com/): Publication front page.',
    '- [About](https://veritasworldwide.com/about): Publication model, evidence labels, and reader funding.',
    '- [Media Kit](https://veritasworldwide.com/media-kit): Official logos, social banners, evidence-tier cards, and brand ZIP for press.',
    '- [Evidence tiers brand doc](https://veritasworldwide.com/brand-kit/07-docs/EVIDENCE-TIERS.md): Verified / Circumstantial / Disputed visual system.',
    '- [Press contact](https://veritasworldwide.com/brand-kit/07-docs/PRESS-CONTACT.md): Rights, tips, and media kit paths.',
    '- [Brand bios JSON](https://veritasworldwide.com/brand-kit/07-docs/bios.json): Handles, bios, hashtags for official accounts.',
    '- [Social launch checklist](https://veritasworldwide.com/brand-kit/07-docs/SOCIAL-LAUNCH.md): Per-platform setup paths.',
    '- [Security disclosure](https://veritasworldwide.com/.well-known/security.txt): RFC 9116 contact and policy for vulnerability reports.',
    '- [Accessibility](https://veritasworldwide.com/accessibility): WCAG targets, contrast, and touch-target standards.',
    '- [Research topics](https://veritasworldwide.com/topics): Topic hubs connecting chapters and current reporting.',
    '- [Profiles](https://veritasworldwide.com/profiles): Source-driven profiles of institutional actors.',
    '- [Power Profiles Integrity Score](https://veritasworldwide.com/profiles?sort=integrity-asc): Dual-cited public-falsehood dockets on flagship figures; click-through sources on each profile.',
    '- [Profiles corpus (JSON)](https://veritasworldwide.com/profiles/corpus.json): Machine-readable index of all power profiles with photo paths, Bioguide IDs, and integrityScore when a docket is compiled.',
    '- [Ted Cruz](https://veritasworldwide.com/profile/ted-cruz): FEC/AIPAC-sourced senator profile.',
    '- [Donald Trump](https://veritasworldwide.com/profile/donald-trump): Sourced executive/profile record.',
    '- [Nancy Pelosi](https://veritasworldwide.com/profile/nancy-pelosi): Sourced congressional leadership profile.',
    '- [AOC](https://veritasworldwide.com/profile/aoc): Progressive House profile with first-party Bioguide portrait.',
    '- [Bernie Sanders](https://veritasworldwide.com/profile/bernie-sanders): Senate profile with first-party Bioguide portrait.',
    '- [Benjamin Netanyahu](https://veritasworldwide.com/profile/benjamin-netanyahu): Sourced foreign-leader profile linked to the Israel Dossier.',
  ].join('\n')
}

function renderInstituteIndexPage(topics, researchSources, fieldManualEntries = []) {
  const grouped = groupInstituteTopicsByTrack(topics)
  const trackCount = grouped.length
  const fieldManualCount = Array.isArray(fieldManualEntries) && fieldManualEntries.length > 0
    ? fieldManualEntries.length
    : 25

  return `
    <main class="institute-shell-root text-white">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">Veritas Institute</p>
          <h1 class="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-[color:var(--institute-ink)]">The field manual for ordinary emergencies. The course library for trades, repair, and resilient households.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">Veritas Institute answers immediate household and roadside problems first, then routes readers into deeper course paths for practical trade work, repair literacy, preparedness, food resilience, and healthcare-support skills.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="/institute/book" class="institute-button-primary">Open the Field Manual</a>
            <a href="/veritas-institute-field-manual.pdf" class="institute-button-secondary" download="veritas-institute-field-manual.pdf">Download Field Manual PDF</a>
            <a href="/institute/methodology" class="institute-button-secondary">See the sourcing method</a>
          </div>
          <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(fieldManualCount))}</span><span class="institute-stat-label">field-manual answers</span></div>
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(topics.length))}</span><span class="institute-stat-label">practical course paths</span></div>
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(trackCount))}</span><span class="institute-stat-label">practical tracks</span></div>
            <div class="institute-stat"><span class="institute-stat-value">1</span><span class="institute-stat-label">printable field manual PDF</span></div>
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">How to use the institute</p>
          <div class="grid gap-4 md:grid-cols-3 mt-4">
            ${[
              ['Start with the manual', 'Use the field manual when the question is immediate: water, blood, fuel, food, cold, utilities, vehicle trouble, or a fast household failure.'],
              ['Open the course', 'Then move into prerequisites, proof standards, module logic, and a paced buildout for the practical trade or household skill.'],
              ['Keep the official anchor', 'Every answer should still route back to the right public agency, extension system, manufacturer guidance, or licensing body.'],
            ].map(([title, detail]) => `
              <article class="institute-mini-card">
                <h2 class="text-lg font-semibold text-[color:var(--institute-ink)]">${escapeHtml(title)}</h2>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(detail)}</p>
              </article>`).join('\n')}
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">Practical tracks</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${grouped.map(([track, items]) => `
              <article class="institute-track-card" id="track-${escapeAttr(track)}">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">${escapeHtml(instituteTrackLabels[track] || track)}</p>
                    <h2 class="mt-3 text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(items.length)} practical courses connect to this track.</h2>
                  </div>
                </div>
                <div class="grid gap-3 mt-5">
                  ${items.slice(0, 4).map((topic) => `
                    <a href="/institute/guides/${escapeAttr(topic.slug)}" class="institute-list-row">
                      <span class="text-sm font-medium text-[color:var(--institute-ink)]">${escapeHtml(topic.skill)}</span>
                      <span class="text-xs leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.outcome)}</span>
                    </a>`).join('\n')}
                </div>
              </article>`).join('\n')}
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">Course catalog</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${topics.map((topic) => `
              <article class="institute-topic-card">
                <div class="flex flex-wrap gap-2">
                  <span class="institute-pill">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</span>
                  <span class="institute-pill">${escapeHtml(topic.difficulty)}</span>
                  <span class="institute-pill">${escapeHtml(topic.timeToFirstResult)}</span>
                </div>
                <h2 class="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.skill)}</h2>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Why now:</span> ${escapeHtml(topic.whyNow)}</p>
                <div class="grid gap-3 lg:grid-cols-2 mt-5">
                  <a href="/institute/courses/${escapeAttr(topic.slug)}" class="institute-mini-card block">
                    <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Course</p>
                    <h3 class="mt-2 text-base font-semibold text-[color:var(--institute-ink)]">${escapeHtml(topic.courseTitle)}</h3>
                  </a>
                  <a href="/institute/guides/${escapeAttr(topic.slug)}" class="institute-mini-card block">
                    <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Guide</p>
                    <h3 class="mt-2 text-base font-semibold text-[color:var(--institute-ink)]">${escapeHtml(topic.articleTitle)}</h3>
                  </a>
                </div>
                <div class="mt-5 border-t border-[color:var(--institute-border)] pt-4">
                  <p class="text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">First action:</span> ${escapeHtml(topic.firstAction)}</p>
                  <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Outcome:</span> ${escapeHtml(topic.outcome)}</p>
                </div>
              </article>`).join('\n')}
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">Research basis</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${researchSources.map((source) => `
              <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer" class="institute-list-row">
                <span class="text-sm font-medium text-[color:var(--institute-ink)]">${escapeHtml(source.label)}</span>
                <span class="text-xs leading-7 text-[color:var(--institute-muted)]">${escapeHtml(source.note)}</span>
              </a>`).join('\n')}
          </div>
        </section>
      </div>
    </main>`
}

function renderInstituteMethodologyPage(researchSources) {
  return `
    <main class="institute-shell-root text-white">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">Institute methodology</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">We build for practical usefulness first: urgent answers in front, deeper trade-course content behind them.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">Veritas Institute is built around two defensible editorial questions: what does a reader need to know immediately when a household or roadside problem hits, and what practical course paths matter most for real repair, trade, food, preparedness, and healthcare-support skill building today?</p>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Editorial rules</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${[
              'High-risk medical, electrical, gas, structural, and legal matters never get framed as casual DIY entertainment.',
              'The fastest answer still has to be a defensible answer. We do not publish fake hacks just because they are catchy.',
              'Preparedness content stays calm, source-first, and safety-forward instead of apocalyptic theater.',
              'Career guidance is anchored to official institutions, licensing pathways, or public labor-market sources.',
            ].map((line) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(line)}</span></div>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Answer architecture</p>
          <div class="grid gap-4 md:grid-cols-3 mt-4">
            ${[
              ['Guide', 'The shortest defensible answer for search, citation, and stressed readers.'],
              ['Course', 'The deeper path with prerequisites, proof standards, and pacing.'],
              ['Field manual', 'The print-friendly archive that puts immediate emergency answers first and the practical course library second.'],
            ].map(([title, detail]) => `
              <article class="institute-mini-card">
                <h2 class="text-lg font-semibold text-[color:var(--institute-ink)]">${escapeHtml(title)}</h2>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(detail)}</p>
              </article>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Source ladder</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${researchSources.map((source) => `
              <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer" class="institute-list-row">
                <span class="text-sm font-medium text-[color:var(--institute-ink)]">${escapeHtml(source.label)}</span>
                <span class="text-xs leading-7 text-[color:var(--institute-muted)]">${escapeHtml(source.note)}</span>
              </a>`).join('\n')}
          </div>
        </section>
      </div>
    </main>`
}

function renderInstituteCoursePage(topic) {
  const brief = buildInstituteBrief(topic)
  const moduleMarkup = (brief.modules || [])
    .map((moduleTitle, index) => `
      <div class="institute-list-row">
        <span class="text-sm leading-7 text-[color:var(--institute-ink)]"><span class="font-medium">Module ${index + 1}:</span> ${escapeHtml(moduleTitle)}</span>
      </div>`)
    .join('\n')

  return `
    <main class="institute-shell-root text-white">
      <article class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.courseTitle)}</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
          <div class="rounded-[28px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface)] px-5 py-5 mt-6">
            <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Course thesis</p>
            <p class="mt-3 text-base leading-8 text-[color:var(--institute-ink)]">${escapeHtml(brief.llmSummary)}</p>
          </div>
          <div class="flex flex-wrap gap-2 mt-6">
            <span class="institute-pill">${escapeHtml(topic.difficulty)}</span>
            <span class="institute-pill">${escapeHtml(topic.timeToFirstResult)}</span>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Core brief</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Search intent</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(brief.searchIntent)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">First action</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.firstAction)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Outcome</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.outcome)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Proof standard</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(brief.proofPoints)}</p></div>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Before you start</p>
          <div class="grid gap-3 mt-4">
            ${brief.prerequisites.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Official checkpoints</p>
          <div class="grid gap-3 mt-4">
            ${brief.officialCheckpoints.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
          <p class="mt-5 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Tools:</span> ${escapeHtml((topic.tools || []).join(', '))}</p>
          <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Institutions:</span> ${escapeHtml((topic.institutions || []).join(', '))}</p>
        </section>
        ${moduleMarkup ? `
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Course architecture</p>
          <div class="grid gap-3 mt-4">
            ${moduleMarkup}
          </div>
        </section>` : ''}
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Questions people ask next</p>
          <div class="grid gap-3 mt-4">
            ${brief.relatedQueries.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
          <div class="mt-6 flex flex-wrap gap-4">
            <a href="/institute/guides/${escapeAttr(topic.slug)}" class="institute-button-primary">Read companion guide</a>
            <a href="/institute/book" class="institute-button-secondary">Open the field manual</a>
          </div>
        </section>
      </article>
    </main>`
}

function renderInstituteGuidePage(topic) {
  const brief = buildInstituteBrief(topic)

  return `
    <main class="institute-shell-root text-white">
      <article class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.articleTitle)}</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
          <div class="rounded-[28px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface)] px-5 py-5 mt-6">
            <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Fast answer</p>
            <p class="mt-3 text-base leading-8 text-[color:var(--institute-ink)]">${escapeHtml(brief.fastAnswer)}</p>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Guide brief</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Guide thesis</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(brief.llmSummary)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Search intent</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(brief.searchIntent)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Why demand exists</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.whyNow)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">First action</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.firstAction)}</p></div>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Before you start</p>
          <div class="grid gap-3 mt-4">
            ${brief.prerequisites.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Official checkpoints</p>
          <div class="grid gap-3 mt-4">
            ${brief.officialCheckpoints.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Questions people ask next</p>
          <div class="grid gap-3 mt-4">
            ${brief.relatedQueries.map((item) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(item)}</span></div>`).join('\n')}
          </div>
          <div class="mt-6 flex flex-wrap gap-4">
            <a href="/institute/courses/${escapeAttr(topic.slug)}" class="institute-button-primary">Open course</a>
            <a href="/institute/book" class="institute-button-secondary">See the full manual</a>
          </div>
        </section>
      </article>
    </main>`
}

function renderInstituteBookPage(topics, researchSources, fieldEntries = []) {
  const grouped = topics.reduce((acc, topic) => {
    if (!acc[topic.track]) acc[topic.track] = []
    acc[topic.track].push(topic)
    return acc
  }, {})
  const urgentEntryCount = fieldEntries.filter((entry) => entry.urgency === 'Immediate').length
  const categoryCount = new Set(fieldEntries.map((entry) => entry.category)).size

  return `
    <main class="institute-shell-root text-white">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">Field Manual</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">The Veritas field manual for ordinary emergencies, repair calls, and modern trade skills.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">This page indexes urgent field-manual protocols, source anchors, and practical course paths so readers, crawlers, and retrieval systems can move from an immediate problem into the right guide, course, or print export path.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="/veritas-institute-field-manual.pdf" class="institute-button-primary" download="veritas-institute-field-manual.pdf">Download Field Manual PDF</a>
            <a href="/veritas-institute-field-manual.pdf" class="institute-button-secondary">Direct PDF link</a>
          </div>
          <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(fieldEntries.length))}</span><span class="institute-stat-label">field-manual entries</span></div>
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(urgentEntryCount))}</span><span class="institute-stat-label">immediate protocols</span></div>
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(categoryCount))}</span><span class="institute-stat-label">hazard categories</span></div>
            <div class="institute-stat"><span class="institute-stat-value">${escapeHtml(String(topics.length))}</span><span class="institute-stat-label">course paths</span></div>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">How to use the manual</p>
          <div class="grid gap-4 md:grid-cols-3 mt-4">
            ${[
              ['Start with the urgent problem', 'Use the field manual when the problem is immediate and the wrong move can make it worse.'],
              ['Use the fast answer', 'Each entry starts with the shortest defensible answer before expanding into steps and risk notes.'],
              ['Escalate into the course path', 'Use the linked guide and course whenever you need deeper prerequisites, proof standards, or a paced buildout.'],
            ].map(([title, detail]) => `
              <article class="institute-mini-card">
                <h2 class="text-lg font-semibold text-[color:var(--institute-ink)]">${escapeHtml(title)}</h2>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(detail)}</p>
              </article>`).join('\n')}
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Immediate answers</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${fieldEntries.map((entry) => `
              <article id="manual-${escapeAttr(entry.id)}" class="institute-topic-card">
                <div class="flex flex-wrap gap-2">
                  <span class="institute-pill">${escapeHtml(entry.category)}</span>
                  <span class="institute-pill">${escapeHtml(entry.urgency)}</span>
                </div>
                <h2 class="mt-4 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(entry.title)}</h2>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(entry.summary)}</p>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Time window:</span> ${escapeHtml(entry.timeWindow)}</p>
                <div class="mt-4 rounded-[20px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface-strong)] px-4 py-4">
                  <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Decision rule</p>
                  <p class="mt-2 text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(entry.decisionRule)}</p>
                </div>
                <p class="mt-4 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Quick answer:</span> ${escapeHtml(entry.quickAnswer)}</p>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Escalate if:</span> ${escapeHtml((entry.escalateIf || []).join('; '))}</p>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="font-medium text-[color:var(--institute-ink)]">Source anchors:</span> ${escapeHtml((entry.sourceAnchors || []).join(', '))}</p>
              </article>`).join('\n')}
          </div>
        </section>
        ${Object.entries(grouped).map(([track, items]) => `
          <section class="institute-panel px-6 py-6">
            <p class="institute-eyebrow">${escapeHtml(instituteTrackLabels[track] || track)}</p>
            <div class="grid gap-4 xl:grid-cols-2 mt-4">
              ${items.map((topic) => `
                <article class="institute-topic-card">
                  <h2 class="text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.skill)}</h2>
                  <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
                  <div class="mt-4 flex flex-wrap gap-3">
                    <a href="/institute/guides/${escapeAttr(topic.slug)}" class="text-sm text-[color:var(--institute-accent)]">Guide →</a>
                    <a href="/institute/courses/${escapeAttr(topic.slug)}" class="text-sm text-[color:var(--institute-accent)]">Course →</a>
                  </div>
                </article>`).join('\n')}
            </div>
          </section>`).join('\n')}
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Research basis</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${researchSources.map((source) => `
              <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer" class="institute-list-row">
                <span class="text-sm font-medium text-[color:var(--institute-ink)]">${escapeHtml(source.label)}</span>
                <span class="text-xs leading-7 text-[color:var(--institute-muted)]">${escapeHtml(source.note)}</span>
              </a>`).join('\n')}
          </div>
        </section>
      </div>
    </main>`
}

function buildInstituteCourseJsonLd(topic) {
  const brief = buildInstituteBrief(topic)
  const modules = brief.modules || [
    'Set the Safety Boundary',
    'Confirm Prerequisites',
    'Use Official Checkpoints',
    'Build Visible Proof',
  ]
  const faqEntries = [
    {
      question: 'What is the fastest realistic way to get started?',
      answer: `${topic.firstAction} The institute treats fast starts as structured starts: the first win is clarity and setup, not pretending the hard part disappeared.`,
    },
    {
      question: 'What actually proves progress?',
      answer: `${lowerFirst(topic.outcome)} is the real milestone. The institute wants visible proof: a sample, a checklist, a log, a supervised result, or another artifact that shows the system works outside your head.`,
    },
    {
      question: 'How does Veritas Institute handle evidence on this path?',
      answer: 'Official rules, public guidance, and credentialing pathways are treated as verified foundations. Market outcomes, earnings, and time-to-income claims are framed more cautiously unless the proof is strong and attributable.',
    },
    {
      question: 'What should I avoid while learning this?',
      answer: topic.warning,
    },
  ]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: topic.courseTitle,
      description: brief.llmSummary,
      provider: {
        '@type': 'Organization',
        name: 'Veritas Institute',
        sameAs: `${SITE_URL}/institute`,
      },
      educationalLevel: topic.difficulty,
      educationalUse: 'Self-study',
      learningResourceType: 'Course outline',
      timeRequired: topic.timeToFirstResult,
      teaches: topic.outcome,
      isAccessibleForFree: true,
      about: [topic.skill, instituteTrackLabels[topic.track] || topic.track],
      url: `${SITE_URL}/institute/courses/${topic.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${topic.courseTitle} module sequence`,
      itemListElement: modules.map((moduleTitle, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: moduleTitle,
        url: `${SITE_URL}/institute/courses/${topic.slug}#module-${index + 1}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Veritas Institute', item: `${SITE_URL}/institute` },
        { '@type': 'ListItem', position: 2, name: 'Courses', item: `${SITE_URL}/institute` },
        { '@type': 'ListItem', position: 3, name: topic.courseTitle, item: `${SITE_URL}/institute/courses/${topic.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    },
  ]
}

function buildInstituteGuideJsonLd(topic) {
  const brief = buildInstituteBrief(topic)
  const howToSteps = [
    topic.firstAction,
    ...brief.prerequisites.slice(0, 2),
    ...brief.officialCheckpoints.slice(0, 2),
  ].filter(Boolean)
  const faqEntries = [
    {
      question: 'What is the fastest realistic way to get started?',
      answer: `${topic.firstAction} The institute treats fast starts as structured starts: the first win is clarity and setup, not pretending the hard part disappeared.`,
    },
    {
      question: 'What actually proves progress?',
      answer: `${lowerFirst(topic.outcome)} is the real milestone. The institute wants visible proof: a sample, a checklist, a log, a supervised result, or another artifact that shows the system works outside your head.`,
    },
    {
      question: 'How does Veritas Institute handle evidence on this path?',
      answer: 'Official rules, public guidance, and credentialing pathways are treated as verified foundations. Market outcomes, earnings, and time-to-income claims are framed more cautiously unless the proof is strong and attributable.',
    },
    {
      question: 'What should I avoid while learning this?',
      answer: topic.warning,
    },
  ]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: topic.articleTitle,
      description: brief.llmSummary,
      url: `${SITE_URL}/institute/guides/${topic.slug}`,
      about: [topic.skill, instituteTrackLabels[topic.track] || topic.track],
      keywords: (topic.keywords || []).join(', '),
      isAccessibleForFree: true,
      author: {
        '@type': 'Organization',
        name: 'Veritas Institute',
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: topic.articleTitle,
      description: brief.fastAnswer,
      url: `${SITE_URL}/institute/guides/${topic.slug}`,
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: index === 0 ? 'Start with the first action' : `Checkpoint ${index}`,
        text: step,
      })),
      supply: (topic.tools || []).map((tool) => ({
        '@type': 'HowToSupply',
        name: tool,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Veritas Institute', item: `${SITE_URL}/institute` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/institute` },
        { '@type': 'ListItem', position: 3, name: topic.articleTitle, item: `${SITE_URL}/institute/guides/${topic.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    },
  ]
}

function renderKeywordLinks(keywords, topicAliasMap) {
  return keywords
    .map((keyword) => `
      <li class="list-none">
        <a href="${escapeAttr(getTopicRouteForTerm(keyword, topicAliasMap))}" class="px-3 py-1 rounded-full border border-border font-sans text-[0.65rem] uppercase tracking-[0.08em] text-ink-muted inline-flex">
          ${escapeHtml(keyword)}
        </a>
      </li>`)
    .join('\n')
}

function renderChapterPage(chapter, excerpts, topicAliasMap) {
  const excerptMarkup = excerpts.length
    ? excerpts
        .map((excerpt) => `<p class="font-body text-lg leading-8 text-ink-light mt-6">${escapeHtml(excerpt)}</p>`)
        .join('\n')
    : `<p class="font-body text-lg leading-8 text-ink-light mt-6">${escapeHtml(chapter.subtitle)}</p>`

  const metaLine = [chapter.author, chapter.publishDate, chapter.dateRange].filter(Boolean).join(' \u00b7 ')

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <article class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">${escapeHtml(chapter.number)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(chapter.title)}</h1>
        <p class="font-body text-xl italic text-ink-muted leading-relaxed max-w-4xl">${escapeHtml(chapter.subtitle)}</p>
        <p class="font-sans text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint mt-5">${escapeHtml(metaLine)}</p>
        ${excerptMarkup}
        <div class="mt-8 pt-8 border-t border-border">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Topics</p>
          <ul class="flex flex-wrap gap-2 p-0 m-0">${renderKeywordLinks(chapter.keywords.slice(0, 8), topicAliasMap)}</ul>
        </div>
      </article>
    </main>`
}

function buildChapterJsonLd(chapter, image, publishedTime, modifiedTime) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: chapter.title,
      description: chapter.subtitle,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      image,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/chapter/${chapter.id}`,
      },
      keywords: chapter.keywords.join(', '),
      isAccessibleForFree: true,
      isPartOf: {
        '@type': 'PublicationVolume',
        name: 'The Record - Volume I',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'The Record',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: chapter.title,
          item: `${SITE_URL}/chapter/${chapter.id}`,
        },
      ],
    },
  ]
}

function renderArticleBlock(block) {
  switch (block.type) {
    case 'heading':
      return `<h2 class="font-display text-2xl md:text-3xl font-bold text-ink mt-10 mb-4">${escapeHtml(block.text || '')}</h2>`
    case 'subheading':
      return `<h3 class="font-display text-xl font-bold text-ink mt-8 mb-3">${escapeHtml(block.text || '')}</h3>`
    case 'text':
      return `<p class="font-body text-base md:text-[1.05rem] text-ink leading-[1.8] mb-5">${escapeHtml(block.text || '')}</p>`
    case 'quote':
      return `<blockquote class="border-l-2 border-crimson pl-5 italic font-body text-lg text-ink-light my-8">
        &ldquo;${escapeHtml(block.text || '')}&rdquo;
        ${block.attribution ? `<div class="font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint mt-3">&mdash; ${escapeHtml(block.attribution)}</div>` : ''}
      </blockquote>`
    case 'evidence':
      return `<div class="my-6 p-4 border border-border rounded-sm bg-surface">
        ${block.tier ? `<p class="font-sans text-[0.55rem] font-bold tracking-[0.14em] uppercase text-crimson">${escapeHtml(block.tier)}</p>` : ''}
        <p class="font-body text-sm text-ink-muted leading-relaxed mt-2">${escapeHtml(block.text || '')}</p>
      </div>`
    case 'callout':
      return `<div class="my-6 p-5 bg-ink text-white rounded-sm"><p class="font-body text-sm leading-relaxed">${escapeHtml(block.text || '')}</p></div>`
    case 'stat':
      return `<div class="my-8 text-center py-6 border-y border-border">
        <p class="font-display text-4xl md:text-5xl font-bold text-crimson">${escapeHtml(block.stat?.value || '')}</p>
        <p class="font-sans text-xs tracking-[0.1em] uppercase text-ink-muted mt-2">${escapeHtml(block.stat?.label || '')}</p>
      </div>`
    case 'image':
      return block.image?.src
        ? `<figure class="my-8">
            <img src="${escapeAttr(block.image.src)}" alt="${escapeAttr(block.image.alt || '')}" class="w-full object-cover" loading="lazy" />
            ${block.image.caption ? `<figcaption class="font-body text-xs text-ink-muted mt-2">${escapeHtml(block.image.caption)}${block.image.credit ? ` <span class="text-ink-faint">(${escapeHtml(block.image.credit)})</span>` : ''}</figcaption>` : ''}
          </figure>`
        : ''
    default:
      return ''
  }
}

function renderArticlePage(article, chapterLookup, topicAliasMap) {
  const tagMarkup = (article.tags || []).map((tag) => `
    <a href="${escapeAttr(getTopicRouteForTerm(tag, topicAliasMap))}" class="font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm inline-flex">
      ${escapeHtml(tag)}
    </a>`).join('\n')

  const relatedMarkup = (article.relatedChapters || [])
    .map((chapterId) => chapterLookup.get(chapterId))
    .filter(Boolean)
    .map((chapter) => `
      <li class="border-b border-border last:border-b-0 py-4">
        <a href="/chapter/${escapeAttr(chapter.id)}" class="block">
          <p class="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">${escapeHtml(chapter.number)}</p>
          <h3 class="font-display text-lg font-bold text-ink leading-tight">${escapeHtml(chapter.title)}</h3>
        </a>
      </li>`)
    .join('\n')

  const sourceMarkup = (article.sources || [])
    .map((source, index) => `
      <li class="font-body text-sm text-ink-muted leading-7">
        <span class="font-sans font-bold text-crimson mr-2">[${escapeHtml(source.id || index + 1)}]</span>
        ${escapeHtml(source.title)}${source.url ? ` <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener noreferrer" class="text-crimson underline">View Source</a>` : ''}
      </li>`)
    .join('\n')

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <article class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-3">${escapeHtml(article.category)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(article.title)}</h1>
        <p class="font-body text-xl italic text-ink-muted leading-relaxed max-w-4xl">${escapeHtml(article.subtitle)}</p>
        <p class="font-sans text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint mt-5">
          ${escapeHtml([article.author, article.publishDate, `${article.readingTime} min read`, `${article.sources.length} sources cited`].join(' \u00b7 '))}
        </p>
        ${article.heroImage?.src ? `
          <figure class="my-10">
            <img src="${escapeAttr(article.heroImage.src)}" alt="${escapeAttr(article.heroImage.alt || '')}" class="w-full object-cover" loading="eager" />
            <figcaption class="font-sans text-xs text-ink-faint mt-2">${escapeHtml(article.heroImage.credit || '')}</figcaption>
          </figure>` : ''}
        ${(article.content || []).map(renderArticleBlock).join('\n')}
        <section class="mt-10 pt-6 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Topics</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <div class="flex flex-wrap gap-2">${tagMarkup}</div>
        </section>
        ${relatedMarkup ? `
          <section class="mt-10 pt-6 border-t border-border">
            <div class="flex items-center gap-4 mb-4">
              <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Related Chapters</p>
              <div class="flex-1 h-[1px] bg-border"></div>
            </div>
            <ul class="list-none m-0 p-0">${relatedMarkup}</ul>
          </section>` : ''}
        <section class="mt-10 pt-6 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Sources</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <ol class="space-y-3 m-0 pl-0 list-none">${sourceMarkup}</ol>
        </section>
      </article>
    </main>`
}

function absoluteSiteUrl(maybePath) {
  if (!maybePath) return DEFAULT_OG_IMAGE
  if (String(maybePath).startsWith('http')) return maybePath
  return `${SITE_URL}${String(maybePath).startsWith('/') ? '' : '/'}${maybePath}`
}

function buildArticleJsonLd(article, publishedTime, modifiedTime) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.seo?.metaDescription || article.subtitle,
      image: absoluteSiteUrl(article.heroImage?.src || DEFAULT_OG_IMAGE),
      datePublished: publishedTime,
      dateModified: modifiedTime,
      author: {
        '@type': 'Organization',
        name: article.author || SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/news/${article.slug}`,
      },
      keywords: (article.seo?.keywords || article.tags || []).join(', '),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Current Events',
          item: `${SITE_URL}/news`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `${SITE_URL}/news/${article.slug}`,
        },
      ],
    },
  ]
}

function renderTopicPage(topic, chapters, articles) {
  const keywordMarkup = topic.keywords
    .map((keyword) => `
      <a href="/search?q=${encodeURIComponent(keyword)}" class="inline-flex items-center rounded-sm border border-border bg-surface px-3 py-2 font-sans text-xs text-ink-muted">
        ${escapeHtml(keyword)}
      </a>`)
    .join('\n')

  const chapterMarkup = chapters
    .map((chapter) => `
      <li class="border-b border-border last:border-b-0 py-4">
        <a href="/chapter/${escapeAttr(chapter.id)}" class="block">
          <p class="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">${escapeHtml(chapter.number)}</p>
          <h2 class="font-display text-xl font-bold text-ink leading-tight mb-2">${escapeHtml(chapter.title)}</h2>
          <p class="font-body text-sm text-ink-muted leading-relaxed">${escapeHtml(chapter.subtitle)}</p>
        </a>
      </li>`)
    .join('\n')

  const articleMarkup = articles.length
    ? articles.map((article) => `
        <li class="border-b border-border last:border-b-0 py-4">
          <a href="/news/${escapeAttr(article.slug)}" class="block">
            <p class="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson mb-1">${escapeHtml(article.category)}</p>
            <h2 class="font-display text-xl font-bold text-ink leading-tight mb-2">${escapeHtml(article.title)}</h2>
            <p class="font-body text-sm text-ink-muted leading-relaxed">${escapeHtml(article.subtitle)}</p>
          </a>
        </li>`).join('\n')
    : `<li class="py-4 font-body text-sm text-ink-muted leading-relaxed">This topic hub currently points readers into the longform archive while the news desk expands this beat.</li>`

  const faqMarkup = topic.faq
    .map((entry) => `
      <div class="border border-border bg-surface p-5">
        <h3 class="font-display text-xl font-bold text-ink leading-tight">${escapeHtml(entry.question)}</h3>
        <p class="font-body text-sm text-ink-muted leading-7 mt-3">${escapeHtml(entry.answer)}</p>
      </div>`)
    .join('\n')

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-3">${escapeHtml(topic.eyebrow)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(topic.name)}</h1>
        <p class="font-body text-xl italic text-ink-muted leading-relaxed max-w-4xl">${escapeHtml(topic.headline)}</p>
        <p class="font-body text-base md:text-lg text-ink-light leading-8 max-w-4xl mt-6">${escapeHtml(topic.description)}</p>
        <div class="flex flex-wrap gap-4 mt-8 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint">
          <span>${escapeHtml(chapters.length)} core chapters</span>
          <span>&middot;</span>
          <span>${escapeHtml(articles.length)} linked news briefings</span>
          <span>&middot;</span>
          <span>${escapeHtml(topic.keywords.length)} search terms</span>
        </div>
        <section class="mt-10 pt-8 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Core Chapters</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <ul class="list-none m-0 p-0">${chapterMarkup}</ul>
        </section>
        <section class="mt-10 pt-8 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Current Reporting</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <ul class="list-none m-0 p-0">${articleMarkup}</ul>
        </section>
        <section class="mt-10 pt-8 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Related Searches</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <div class="flex flex-wrap gap-2">${keywordMarkup}</div>
        </section>
        <section class="mt-10 pt-8 border-t border-border">
          <div class="flex items-center gap-4 mb-4">
            <p class="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink">Reader Questions</p>
            <div class="flex-1 h-[1px] bg-border"></div>
          </div>
          <div class="space-y-4">${faqMarkup}</div>
        </section>
      </div>
    </main>`
}

function buildTopicJsonLd(topic, chapters, articles) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${topic.name} | ${SITE_NAME}`,
      url: `${SITE_URL}/topics/${topic.slug}`,
      description: topic.metaDescription,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Research Topics',
          item: `${SITE_URL}/topics`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: topic.name,
          item: `${SITE_URL}/topics/${topic.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        ...chapters.map((chapter, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: chapter.title,
          url: `${SITE_URL}/chapter/${chapter.id}`,
        })),
        ...articles.map((article, index) => ({
          '@type': 'ListItem',
          position: chapters.length + index + 1,
          name: article.title,
          url: `${SITE_URL}/news/${article.slug}`,
        })),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topic.faq.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    },
  ]
}

/**
 * Sitemap URL entry. Optional imageUrl enables Google Image search discovery
 * (image sitemap extension — Search Central image guidelines).
 */
function renderUrlEntry(loc, lastmod, changefreq, priority, imageUrl = null, imageTitle = null) {
  const base = `  <url><loc>${escapeHtml(loc)}</loc><lastmod>${escapeHtml(lastmod)}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>`
  if (!imageUrl) return `${base}</url>`
  const titleXml = imageTitle
    ? `<image:title>${escapeHtml(imageTitle)}</image:title>`
    : ''
  return `${base}<image:image><image:loc>${escapeHtml(imageUrl)}</image:loc>${titleXml}</image:image></url>`
}

function writeSitemap(entries) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n')

  fs.writeFileSync(distSitemapPath, xml)
  fs.writeFileSync(sourceSitemapPath, xml)
}

function getStaticPageSitemapMeta(route) {
  switch (route) {
    case '/':
      return { changefreq: 'weekly', priority: '1.0' }
    case '/news':
      return { changefreq: 'daily', priority: '0.8' }
    case '/institute':
      return { changefreq: 'weekly', priority: '0.9' }
    case '/institute/book':
      return { changefreq: 'monthly', priority: '0.8' }
    case '/institute/methodology':
      return { changefreq: 'monthly', priority: '0.7' }
    case '/topics':
      return { changefreq: 'weekly', priority: '0.8' }
    case '/profiles':
      return { changefreq: 'weekly', priority: '0.8' }
    case '/forum':
      return { changefreq: 'daily', priority: '0.8' }
    case '/read':
    case '/methodology':
      return { changefreq: 'monthly', priority: '0.8' }
    default:
      return { changefreq: 'monthly', priority: '0.6' }
  }
}

const chapters = parseChapterMeta()
const chapterLookup = new Map(chapters.map((chapter) => [chapter.id, chapter]))
const articles = loadArticleData()
const topicHubs = loadTopicHubs()
const topicAliasMap = buildTopicAliasMap(topicHubs)
const profileSlugs = loadProfileSlugs()
const instituteTopics = parseInstituteTopics()
const institutePracticalTopics = filterPracticalInstituteTopics(instituteTopics)
const instituteResearchSources = parseInstituteResearchSources()
const instituteFieldManualEntries = parseInstituteFieldManualEntries()

const staticPages = [
  {
    route: '/',
    // Align with index.html + HomePage setMetaTags (Search Central ~50–60 char titles)
    title: 'The Record | Primary Sources — Veritas Worldwide',
    heading: 'The Record',
    description:
      'Primary-source documentary history of power, money, and institutions. 32 archive parts, 500+ citations, free public access. Verify every claim yourself.',
    body: [
      'Veritas Worldwide publishes longform investigative work built on primary sources, congressional records, court filings, declassified files, and public financial disclosures.',
      'Volume I spans 32 archive parts and more than 500 source documents. Every chapter is publicly readable, with traceable citations and source rows available without signing in.',
      'Power Profiles map politicians, donors, and institutional actors with first-party portraits — browse https://veritasworldwide.com/profiles or the machine-readable corpus at https://veritasworldwide.com/profiles/corpus.json.',
    ],
    featuredChapterIds: chapters.slice(0, 6).map((chapter) => chapter.id),
    sourceFile: 'src/pages/HomePage.tsx',
  },
  {
    route: '/topics',
    title: 'Research Topics | Veritas Worldwide',
    heading: 'Research Topics',
    description: 'Curated research hubs connecting Veritas chapters, current reporting, and newsletter signup paths by topic.',
    body: [
      'Topic hubs connect high-intent search queries to the relevant chapters, news articles, and newsletter subscription path so readers can continue following a beat instead of bouncing after one page.',
    ],
    sourceFile: 'src/pages/TopicsIndexPage.tsx',
  },
  {
    route: '/institute',
    title: 'Veritas Institute Field Manual | Veritas Worldwide',
    heading: 'Veritas Institute',
    description:
      'Veritas Institute pairs a printable field manual for ordinary emergencies with source-backed trade, repair, preparedness, food, and healthcare-support courses.',
    body: [
      'Veritas Institute answers immediate household questions first, then routes readers into practical trade and repair course paths with the same source-first discipline as the main publication.',
    ],
    sourceFile: 'src/pages/InstitutePage.tsx',
  },
  {
    route: '/institute/book',
    title: 'Field Manual | Veritas Institute',
    heading: 'Field Manual',
    description: 'A field manual for ordinary emergencies plus a practical course index for trades, repair, preparedness, food resilience, and healthcare-support work.',
    body: [
      'The Field Manual groups urgent answers and practical course links into one long-form archive built for print, offline reference, and structured retrieval.',
    ],
    sourceFile: 'src/pages/InstituteBookPage.tsx',
  },
  {
    route: '/institute/methodology',
    title: 'Veritas Institute Methodology | Veritas Worldwide',
    heading: 'Institute Methodology',
    description:
      'How Veritas Institute builds a practical field manual and trade-course library from public safety guidance, licensing pathways, extension systems, and source-first editing.',
    body: [
      'The institute uses public labor, preparedness, extension, and safety sources to build a defensible field manual and practical learning surface.',
    ],
    sourceFile: 'src/pages/InstituteMethodologyPage.tsx',
  },
  {
    route: '/methodology',
    title: 'Methodology | Veritas Worldwide',
    heading: 'Methodology',
    description: 'The source hierarchy, evidence standards, and editorial method behind The Record.',
    body: [
      'Veritas Worldwide distinguishes between verified, circumstantial, and disputed material so readers can assess each claim on its own documentary footing.',
      'Primary sources and traceable citations are the foundation. Interpretation is labeled clearly and separated from established record.',
    ],
    featuredChapterIds: ['foreword'],
    trustLinks: [
      { href: '/sources', label: '→ Sources' },
      { href: '/about', label: '→ About' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/MethodologyPage.tsx',
  },
  {
    route: '/sources',
    title: 'Sources | Veritas Worldwide',
    heading: 'Sources',
    description: 'A browsable source library for The Record, organized around public documentation and traceable citations.',
    body: [
      'The publication collects source material from court filings, congressional testimony, executive records, declassified archives, peer-reviewed research, and verified investigative reporting.',
    ],
    featuredChapterIds: ['foreword', 'overview'],
    trustLinks: [
      { href: '/methodology', label: '→ Methodology' },
      { href: '/about', label: '→ About' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/SourcesPage.tsx',
  },
  {
    route: '/search',
    title: 'Search | The Record - Veritas Worldwide',
    heading: 'Search The Record',
    description: 'Search chapter titles, full chapter text, sources, and documentary references.',
    body: [
      'Search is built for readers who need to move from a name, institution, or event directly into the available chapter material and citations.',
    ],
    featuredChapterIds: ['overview', 'chapter-14', 'chapter-28'],
    sourceFile: 'src/pages/SearchPage.tsx',
  },
  {
    route: '/timeline',
    title: 'Interactive Timeline | Veritas Worldwide',
    heading: 'Timeline',
    description:
      'Chronological timeline of The Record — 32 archive parts of primary-source history from 1694 to present. Explore power, money, and institutions by era.',
    body: [
      'The timeline connects publication chapters into a single navigable chronology so readers can track institutional continuity across decades and jurisdictions.',
    ],
    featuredChapterIds: ['chapter-1', 'chapter-3', 'chapter-13', 'chapter-28'],
    sourceFile: 'src/pages/TimelinePage.tsx',
  },
  {
    route: '/analytics',
    title: 'Reader Analytics | The Record — Veritas Worldwide',
    heading: 'Reader Analytics',
    description:
      'Public readership analytics for The Record — lifetime readers, daily traffic, and geographic distribution as a transparency surface.',
    body: [
      'Reader analytics summarize how the publication is being discovered, read, and revisited without turning the editorial product into an ad-driven growth trap.',
    ],
    sourceFile: 'src/pages/AnalyticsPage.tsx',
  },
  {
    route: '/accessibility',
    title: 'Accessibility | Veritas Worldwide',
    heading: 'Accessibility',
    description: 'Accessibility commitments, WCAG-aligned design standards, and reporting paths for readers.',
    body: [
      'Veritas Worldwide treats accessibility as part of publication integrity: strong contrast, keyboard navigation, semantic structure, and screen-reader clarity are baseline requirements.',
    ],
    trustLinks: [
      { href: '/about', label: '→ About' },
      { href: '/privacy', label: '→ Privacy Policy' },
      { href: '/terms', label: '→ Terms of Use' },
      { href: '/methodology', label: '→ Methodology' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/AccessibilityPage.tsx',
  },
  {
    route: '/privacy',
    title: 'Privacy Policy | The Record — Veritas Worldwide',
    heading: 'Privacy Policy',
    description:
      'How Veritas Worldwide collects, uses, and protects your information. Minimal analytics, no ads, no data sales.',
    body: [
      'The publication minimizes data collection, keeps analytics purpose-specific, and avoids turning readership into an advertising product.',
    ],
    trustLinks: [
      { href: '/terms', label: '→ Terms of Use' },
      { href: '/about', label: '→ About' },
      { href: '/methodology', label: '→ Methodology' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/PrivacyPage.tsx',
  },
  {
    route: '/terms',
    title: 'Terms of Use | The Record — Veritas Worldwide',
    heading: 'Terms of Use',
    description:
      'Terms of use for Veritas Worldwide. Free open access; content licensed under Creative Commons BY-NC-SA 4.0.',
    body: [
      'The publication is intended for public reading, citation, and responsible sharing. Source material remains attributable to its original creators and archives.',
    ],
    trustLinks: [
      { href: '/privacy', label: '→ Privacy Policy' },
      { href: '/about', label: '→ About' },
      { href: '/methodology', label: '→ Methodology' },
      { href: '/sources', label: '→ Sources' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/TermsPage.tsx',
  },
  {
    route: '/israel-dossier',
    title: 'The Israel Dossier | Veritas Worldwide',
    heading: 'The Israel Dossier',
    description: 'A sourced dossier covering U.S.-Israel policy, humanitarian impact, military spending, and the public record surrounding the conflict.',
    type: 'article',
    body: [
      'The dossier is organized around documented facts, attributable claims, and a clearly labeled evidence structure so readers can separate record from interpretation.',
    ],
    featuredChapterIds: ['chapter-14', 'chapter-15', 'chapter-16'],
    sourceFile: 'src/pages/IsraelDossierPage.tsx',
  },
  {
    route: '/israel-dossier/briefing',
    title: 'Israel Dossier Public Briefing | Veritas Worldwide',
    heading: 'Israel Dossier Public Briefing',
    description: 'A source-boundary briefing generated from the populated Israel dossier workbook rows, with visible confidence limits and open questions.',
    type: 'article',
    body: [
      'The briefing converts selected workbook rows into publishable prose without collapsing public records, reported figures, survey estimates, incident reconstructions, and legal procedure into one certainty level.',
    ],
    featuredChapterIds: ['chapter-14', 'chapter-15', 'chapter-16'],
    sourceFile: 'src/pages/IsraelDossierBriefingPage.tsx',
  },
  {
    route: '/membership',
    title: 'Membership | Veritas Worldwide',
    heading: 'Support The Record',
    description:
      'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.',
    body: [
      'Support language remains humble by design. Readers fund the archive, document acquisition, and ongoing reporting without paywalling the core publication.',
    ],
    sourceFile: 'src/pages/MembershipPage.tsx',
  },
  {
    route: '/membership/success',
    title: 'Membership Confirmed | Veritas Worldwide',
    heading: 'Welcome to the Membership circle.',
    description: 'Thank-you landing after Stripe membership checkout. Configure Payment Link after-payment redirect to this path.',
    body: [
      'Your membership funds independent investigative publishing. The public archive stays open.',
      'Stripe emails a receipt to the address used at checkout.',
    ],
    noindex: true,
    sourceFile: 'src/pages/SupportSuccessPage.tsx',
  },
  {
    route: '/donation/success',
    title: 'Donation Received | Veritas Worldwide',
    heading: 'Thank you for supporting the record.',
    description: 'Thank-you landing after Stripe donation checkout. Configure Payment Link after-payment redirect to this path.',
    body: [
      'Your gift funds document acquisition, primary-source research, and the infrastructure that keeps the core archive free to read.',
    ],
    noindex: true,
    sourceFile: 'src/pages/SupportSuccessPage.tsx',
  },
  {
    route: '/thank-you',
    title: 'Thank You | Veritas Worldwide',
    heading: 'Thank you for supporting the record.',
    description: 'Generic post-support thank-you landing used as a Stripe redirect alias.',
    body: [
      'Thank you for supporting independent investigative publishing at Veritas Worldwide.',
    ],
    noindex: true,
    sourceFile: 'src/pages/SupportSuccessPage.tsx',
  },
  {
    route: '/about',
    title: 'About | Veritas Worldwide',
    heading: 'About Veritas Worldwide',
    description:
      'What Veritas Worldwide publishes, how it verifies claims, what stays public, and how reader funding supports the work.',
    body: [
      'The about page explains the publication model directly: what The Record is, how evidence labels work, and how reader funding supports the archive without turning the methodology into a black box.',
      'Veritas starts with public records, filings, transcripts, and archival reporting. Evidence is labeled Verified, Circumstantial, or Disputed so readers never have to guess how strong the support is.',
    ],
    trustLinks: [
      { href: '/methodology', label: '→ Methodology' },
      { href: '/sources', label: '→ Sources' },
      { href: '/media-kit', label: '→ Media Kit' },
      ...FIELD_MANUAL_TRUST_LINKS,
    ],
    sourceFile: 'src/pages/AboutPage.tsx',
  },
  {
    route: '/media-kit',
    title: 'Media Kit | Veritas Worldwide',
    heading: 'Media Kit',
    description:
      'Official logos, social banners, letterhead, and brand guidelines for Veritas Worldwide Press and The Record.',
    body: [
      'Download the Ultimate Brand Kit ZIP, individual seal and wordmark assets, social platform banners, evidence-tier cards, and press templates. Prefer vectors; do not recolor the seal outside brand tokens.',
      'Press contact: rights@veritasworldwide.com. Evidence taxonomy: Verified / Circumstantial / Disputed. Interactive page and static HTML media kit both ship from the brand kit.',
    ],
    trustLinks: [
      { href: '/about', label: '→ About' },
      { href: '/methodology', label: '→ Methodology' },
      { href: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip', label: '→ Download ZIP' },
    ],
    sourceFile: 'src/pages/MediaKitPage.tsx',
  },
  {
    route: '/deep-state',
    title: 'The Deep State — The Epstein Network | Veritas Worldwide',
    heading: 'The Deep State — The Epstein Network',
    description:
      'Interactive Epstein network dossier: court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.',
    body: [
      'This dossier is structured as a source-first investigation, linking individuals, institutions, and documented events without blurring the distinction between evidence tiers.',
    ],
    featuredChapterIds: ['chapter-28'],
    sourceFile: 'src/pages/DeepStatePage.tsx',
  },
  {
    route: '/read',
    title: 'Read The Record | Veritas Worldwide',
    heading: 'Read The Record',
    description:
      'Read The Record online in full. Every chapter, source list, and archive path is open to every reader — free primary-source documentary history.',
    body: [
      'The reader experience is optimized for longform investigation: typography, chapter sequencing, and printability are designed for sustained documentary reading.',
    ],
    featuredChapterIds: chapters.slice(0, 5).map((chapter) => chapter.id),
    sourceFile: 'src/pages/ReadTheBookPage.tsx',
  },
  {
    route: '/news',
    title: 'Current Events — Primary Source Journalism | Veritas Worldwide',
    heading: 'Current Events',
    description:
      'Daily investigative reporting on power, money, and institutions. Every claim sourced to primary documents. No anonymous sources. No spin.',
    body: [
      'The news desk extends the methodology of The Record into live coverage, emphasizing primary documents, verified sourcing, and restrained editorial framing.',
    ],
    sourceFile: 'src/pages/NewsPage.tsx',
  },
  {
    route: '/content-pack',
    title: 'Content Packs & Brand Kit | Veritas Worldwide',
    heading: 'Content Packs & Brand Kit',
    description:
      'Official brand assets, shareable social graphics, pre-written posts, and article cards. Free for press, social media, and advocacy with attribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/share',
    title: 'Content Packs & Brand Kit | Veritas Worldwide',
    heading: 'Content Packs & Brand Kit',
    description:
      'Official brand assets, shareable social graphics, pre-written posts, and article cards. Free for press, social media, and advocacy with attribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/forum',
    title: 'Community Forum Beta | Veritas Worldwide',
    heading: 'Veritas Forum',
    description:
      'Local beta forum for discussing evidence, testing reader workflows, and drafting archive conversation features.',
    body: [
      'The forum is built for accountable discussion around sourced material, not algorithmic outrage or engagement bait.',
    ],
    sourceFile: 'src/pages/ForumPage.tsx',
  },
  {
    route: '/profiles',
    title: 'Power Profiles | Veritas Worldwide',
    heading: 'Power Profiles',
    description:
      'Browse comprehensive profiles of influential figures, politicians, financiers, lobbyists, intelligence actors, and other power brokers.',
    body: [
      'Profiles aggregate claims, donations, quotes, and documented connections so readers can understand networks of influence without losing the underlying citations.',
      'Machine-readable index: https://veritasworldwide.com/profiles/corpus.json — 94 profiles with first-party portrait paths and Bioguide IDs where available.',
    ],
    sourceFile: 'src/pages/ProfilesIndexPage.tsx',
  },
  {
    route: '/bible',
    title: 'The Bible: History & Factual Record | Veritas Worldwide',
    heading: 'The Bible: History & Factual Record',
    description:
      'A primary-source examination of the Bible’s historical claims — archaeological confirmations, manuscript evidence, and scholarly consensus. Every claim classified by evidence tier.',
    body: [
      'What the archaeological record, manuscript evidence, and independent historical sources confirm, contextualize, or contest about the most published book in human history.',
      'Companion volume track: The Record of Jesus Christ at /record-of-jesus-christ — pure evidentiary compilation from cosmological science through 2026 scholarship.',
    ],
    sourceFile: 'src/pages/BibleHistoryPage.tsx',
  },
  {
    route: '/record-of-jesus-christ',
    title: 'The Record of Jesus Christ | Veritas Worldwide',
    heading: 'The Record of Jesus Christ',
    description:
      'Pure evidentiary compilation of historical, textual, archaeological, and scientific data related to the biblical textual tradition and Jesus of Nazareth. Every claim tier-labeled. Attribution: Veritas Worldwide only.',
    body: [
      'Chronological sections cover cosmological origins (as science), Ancient Near Eastern context, Second Temple Judaism, the historical Jesus, New Testament textual criticism, non-Christian attestations, Levantine archaeology, early Christian literature, and modern scholarship to 2026.',
      'Evidence tiers: Verified, Well-Attested, Circumstantial, Contested, Interpretive, Speculative, Literary/Theological. Proof is never conflated with tradition.',
    ],
    sourceFile: 'src/pages/RecordOfJesusChristPage.tsx',
  },
]

function buildStaticPageJsonLd(page, route, modifiedTime) {
  const url = `${SITE_URL}${route === '/' ? '' : route}`
  const basePage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.heading,
    url,
    description: page.description,
    dateModified: modifiedTime,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  // Homepage: bot-visible WebSite SearchAction + NewsMediaOrganization (matches index.html / seo.ts)
  if (route === '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Record — Veritas Worldwide',
        alternateName: 'The Record',
        url: SITE_URL,
        description: page.description,
        inLanguage: 'en-US',
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'NewsMediaOrganization'],
        name: SITE_NAME,
        alternateName: 'The Record',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/brand-kit/01-logos/logo-mark-512.png`,
          width: 512,
          height: 512,
        },
        image: DEFAULT_OG_IMAGE,
        description:
          'Independent investigative journalism built on primary sources. The Record documents 240+ years of institutional power with public archives.',
        foundingDate: '2025',
        publishingPrinciples: `${SITE_URL}/methodology`,
        correctionsPolicy: `${SITE_URL}/methodology`,
        ethicsPolicy: `${SITE_URL}/methodology`,
        sameAs: [
          'https://x.com/VeritasWorldwide',
          'https://www.reddit.com/r/VeritasWorldwide',
        ],
      },
      {
        ...basePage,
        dateModified: modifiedTime,
      },
    ]
  }

  if (route === '/institute') {
    return [
      {
        ...basePage,
        '@type': 'CollectionPage',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Veritas Institute practical course catalog',
        itemListElement: institutePracticalTopics.map((topic, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: topic.skill,
          url: `${SITE_URL}/institute/guides/${topic.slug}`,
          description: topic.summary,
        })),
      },
    ]
  }

  if (route === '/institute/book') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'The Veritas Institute Field Manual',
        description: page.description,
        url,
        dateModified: modifiedTime,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        encoding: {
          '@type': 'MediaObject',
          contentUrl: `${SITE_URL}/veritas-institute-field-manual.pdf`,
          encodingFormat: 'application/pdf',
          name: 'Veritas Institute Field Manual PDF',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Field manual emergency entries',
        itemListElement: instituteFieldManualEntries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.title,
          url: `${SITE_URL}/institute/book#manual-${entry.id}`,
          description: entry.quickAnswer,
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Veritas Institute field manual course tracks',
        itemListElement: groupInstituteTopicsByTrack(institutePracticalTopics).map(([track, topics], index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: instituteTrackLabels[track] || track,
          url: `${SITE_URL}/institute/book#track-${track}`,
          description: `${topics.length} practical course paths`,
        })),
      },
    ]
  }

  if (route === '/institute/methodology') {
    return [
      {
        ...basePage,
        '@type': 'AboutPage',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Veritas Institute', item: `${SITE_URL}/institute` },
          { '@type': 'ListItem', position: 3, name: 'Methodology', item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Veritas Institute choose topics?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Topics start from durable public need—household failures, roadside failures, emergency basics, repair literacy, and trade pathways with clear real-world use—then anchor to public safety, extension, licensing, and labor guidance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Institute content the same as DIY entertainment?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. High-stakes medical, electrical, gas, structural, and legal matters are never presented as casual DIY. The fastest answer still has to be a defensible, source-backed answer.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where do Institute sources come from?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Public safety agencies, extension systems, licensing boards, manufacturers, utilities, labor guidance, and accredited training routes.',
            },
          },
        ],
      },
    ]
  }

  // Record of Jesus Christ — Book + FAQ + Breadcrumb + ItemList + Dataset + HowTo for bot-visible rich results
  // (client RecordOfJesusChristPage sets these on hydrate; prerender must match for Googlebot).
  if (route === '/record-of-jesus-christ') {
    return [
      {
        ...basePage,
        '@type': 'WebPage',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'The Record of Jesus Christ',
        alternateName: 'Record of Jesus Christ — Evidentiary Compilation',
        description: page.description,
        url,
        datePublished: '2026-07-23',
        dateModified: modifiedTime,
        inLanguage: 'en',
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        about: [
          { '@type': 'Thing', name: 'Jesus of Nazareth' },
          { '@type': 'Thing', name: 'New Testament textual criticism' },
          { '@type': 'Thing', name: 'Levantine archaeology' },
          { '@type': 'Thing', name: 'Dead Sea Scrolls' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Record of Jesus Christ', item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What evidence tiers does The Record of Jesus Christ use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Seven scholarly tiers: Verified, Well-Attested, Circumstantial, Contested, Interpretive, Speculative, and Literary/Theological. Every claim is labeled; proof is never mixed with tradition.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does this Record conclude that Jesus is divine or that the resurrection happened?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Theological conclusions are out of scope as historical or scientific fact. Early proclamation of resurrection appearances is documented as attestation of belief; ontology is not labeled VERIFIED.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many claims are in the corpus and where can researchers export them?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The live index contains 190+ tier-labeled claims. Export JSON/CSV on the page, fetch the machine corpus at /record-of-jesus-christ/corpus.json, or download the portable PDF claim index at /record-of-jesus-christ/record-of-jesus-christ.pdf.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who publishes this Record?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Veritas Worldwide only. There is no personal author byline. Contact rights@veritasworldwide.com for corrections.',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Chronological sections — Record of Jesus Christ',
        numberOfItems: 9,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Scientific Description of Cosmological Origins', url: `${url}#cosmology` },
          { '@type': 'ListItem', position: 2, name: 'Ancient Near Eastern Context', url: `${url}#ancient-near-east` },
          { '@type': 'ListItem', position: 3, name: 'Second Temple Judaism', url: `${url}#second-temple` },
          { '@type': 'ListItem', position: 4, name: 'Historical Jesus of Nazareth', url: `${url}#historical-jesus` },
          { '@type': 'ListItem', position: 5, name: 'New Testament Textual Criticism', url: `${url}#nt-textual-criticism` },
          { '@type': 'ListItem', position: 6, name: 'Non-Christian Attestations', url: `${url}#non-christian-attestation` },
          { '@type': 'ListItem', position: 7, name: 'Levantine Archaeology', url: `${url}#levantine-archaeology` },
          { '@type': 'ListItem', position: 8, name: 'Early Christian Literature', url: `${url}#early-christian-literature` },
          { '@type': 'ListItem', position: 9, name: 'Modern Scholarship to 2026', url: `${url}#modern-scholarship` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Record of Jesus Christ — claim corpus',
        description:
          'Machine-readable index of 190+ tier-labeled evidentiary claims on historical Jesus, biblical manuscripts, Levantine archaeology, and related scientific context. Publisher: Veritas Worldwide only.',
        url,
        identifier: `${SITE_URL}/record-of-jesus-christ/corpus.json`,
        keywords: [
          'historical Jesus',
          'New Testament textual criticism',
          'Dead Sea Scrolls',
          'Levantine archaeology',
          'evidence tiers',
        ],
        license: `${SITE_URL}/methodology`,
        isAccessibleForFree: true,
        creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: `${SITE_URL}/record-of-jesus-christ/corpus.json`,
          },
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/pdf',
            contentUrl: `${SITE_URL}/record-of-jesus-christ/record-of-jesus-christ.pdf`,
          },
        ],
        variableMeasured: 'Scholarly evidence tier (verified through literary_theological)',
        measurementTechnique:
          'Historical-critical method; Nestle-Aland/ECM textual standards; archaeological and scientific literature',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to use The Record of Jesus Christ evidence corpus',
        description:
          'Export and cite tier-labeled historical Jesus, manuscript, and archaeology claims from Veritas Worldwide without conflating proof and tradition.',
        url,
        totalTime: 'PT10M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Open the evidence surface',
            text: 'Go to /record-of-jesus-christ and scan the nine chronological sections from cosmology (as science) through modern scholarship.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Filter by evidence tier or search claims',
            text: 'Toggle the seven scholarly tiers and use claim search for manuscripts, archaeology sites, or non-Christian sources.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Read the tier label and sources',
            text: 'Every claim shows proofVsConcept hygiene plus primary or peer citations.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Export for research databases',
            text: 'Download JSON or CSV on-page, or fetch corpus.json / the PDF claim index for offline work.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Cite Veritas Worldwide only',
            text: 'Attribute the compilation to Veritas Worldwide. Contact rights@veritasworldwide.com for corrections.',
          },
        ],
      },
    ]
  }

  // About — FAQ + breadcrumbs for E-E-A-T / voice (matches AboutPage client schema).
  if (route === '/about') {
    return [
      {
        ...basePage,
        '@type': 'AboutPage',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About', item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Veritas Worldwide?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Veritas Worldwide publishes The Record — a primary-source documentary history of power, money, and institutions. Every major claim is tied to public records, filings, transcripts, or multi-outlet reporting that readers can inspect.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Veritas verify claims?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Evidence is labeled Verified, Circumstantial, or Disputed. Priority goes to government records, court filings, congressional documents, and archival sources. See the Methodology page for the full evidence taxonomy.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is The Record free to read?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Archive parts, sources, methodology, and power profiles remain publicly readable. Membership and donations fund the work without changing sourcing rules or paywalling the trust layer.',
            },
          },
        ],
      },
    ]
  }

  // Publication methodology — FAQ + breadcrumbs for bot-visible rich results
  // (client MethodologyPage also sets these on hydrate; prerender must match for Googlebot).
  if (route === '/methodology') {
    return [
      basePage,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Methodology', item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What evidence tiers does The Record use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Record classifies claims as Verified (primary-source documentation), Circumstantial (documented facts with interpretive conclusion), or Disputed (reported but not independently confirmed).',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the five-tier source hierarchy work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Primary government and court records sit at the top, followed by peer-reviewed research, investigative journalism with documents, contemporaneous reporting, and finally secondary commentary used only for context.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can readers verify claims independently?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every major claim links to public sources, archive pins, or downloadable workbooks so readers can re-check the public record without trusting the narrative alone.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is the archive pin manifest?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pinned Wayback snapshots for briefing sources are published at /israel-dossier/workbooks/briefing-source-archive-manifest.json for durability when origin hosts block automated probes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the Integrity Score on Power Profiles work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each profile may carry a compiled falsehood docket. The score starts at 100 and subtracts only for verified, dual-cited public falsehoods (minor −8, material −15, egregious −25). Profiles without a compiled docket show as not scored rather than a fake perfect score. Click the score to read each statement, when it was said, why it was false, and both the statement and debunk sources.',
            },
          },
        ],
      },
    ]
  }

  // Sources library — FAQ + breadcrumbs for bot-visible rich results / voice search
  // (client SourcesPage also sets these on hydrate; prerender must match for Googlebot).
  if (route === '/sources') {
    return [
      basePage,
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'The Record', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sources', item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I verify a claim in The Record?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Open the chapter that cites the claim, then use the Sources library to jump to the primary document, archive pin, or institutional URL. Every substantive claim is tier-labeled so you can weigh verified, circumstantial, and disputed evidence independently.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are The Record’s sources free to inspect?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The master bibliography and direct links are open to every reader. Accounts are optional and only affect saved reader state, not access to source verification.',
            },
          },
          {
            '@type': 'Question',
            name: 'What evidence tiers does Veritas use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Volume I archive chapters use Verified, Circumstantial, and Disputed. The Record of Jesus Christ uses a seven-tier scholarly scale (Verified through Literary/Theological). The methodology page maps both systems.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where is the machine-readable Record of Jesus Christ claim corpus?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'At /record-of-jesus-christ/corpus.json (190+ tier-labeled claims), with on-page JSON/CSV export and a portable PDF index. Publisher: Veritas Worldwide only.',
            },
          },
        ],
      },
    ]
  }

  return [basePage]
}

const manifest = {}
const sitemapEntries = new Map()

for (const page of staticPages) {
  const route = normalizeRoute(page.route)
  const fileName = routeToFile(route)
  const filePath = path.join(prerenderDir, fileName)
  const modifiedTime = getGitModified(path.join(repoRoot, page.sourceFile)).slice(0, 10)
  const meta = {
    title: page.title,
    description: page.description,
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    type: page.type || 'website',
    image: DEFAULT_OG_IMAGE,
    modifiedTime,
    robots: page.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: buildStaticPageJsonLd(page, route, modifiedTime),
  }

  let body = renderStaticPage(page, chapters)
  if (route === '/topics') body = renderTopicsIndexPage(topicHubs)
  if (route === '/institute') body = renderInstituteIndexPage(institutePracticalTopics, instituteResearchSources, instituteFieldManualEntries)
  if (route === '/institute/book') body = renderInstituteBookPage(institutePracticalTopics, instituteResearchSources, instituteFieldManualEntries)
  if (route === '/institute/methodology') body = renderInstituteMethodologyPage(instituteResearchSources)
  fs.writeFileSync(filePath, buildDocument(template, meta, body))
  manifest[route] = `prerender/${fileName}`

  // Thank-you / post-checkout landings are noindex and must not inflate the sitemap.
  if (!page.noindex) {
    const sitemapMeta = getStaticPageSitemapMeta(route)
    sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route === '/' ? '' : route}`, modifiedTime, sitemapMeta.changefreq, sitemapMeta.priority))
  }
}

for (const chapter of chapters) {
  const route = `/chapter/${chapter.id}`
  const fileName = routeToFile(route)
  const filePath = path.join(prerenderDir, fileName)
  const chapterFile = path.join(chapterSourceDir, `${chapter.id}.ts`)
  const publishedTime = normalizeHumanDate(chapter.publishDate)
  const modifiedTime = getGitModified(chapterFile).slice(0, 10)
  const image = getOgImage(chapter.id, chapter.heroImage || '')
  const body = renderChapterPage(chapter, getChapterExcerpt(chapter.id), topicAliasMap)
  const meta = {
    title: `${chapter.title} | The Record - ${SITE_NAME}`,
    description: chapter.subtitle,
    url: `${SITE_URL}${route}`,
    type: 'article',
    image,
    keywords: chapter.keywords,
    publishedTime,
    modifiedTime,
    jsonLd: buildChapterJsonLd(chapter, image, publishedTime, modifiedTime),
  }

  fs.writeFileSync(filePath, buildDocument(template, meta, body))
  manifest[route] = `prerender/${fileName}`
  sitemapEntries.set(
    route,
    renderUrlEntry(
      `${SITE_URL}${route}`,
      modifiedTime,
      'monthly',
      chapter.id === 'foreword' || chapter.id === 'overview' ? '0.9' : '0.8',
      image,
      chapter.title,
    ),
  )
}

for (const topic of topicHubs) {
  const route = `/topics/${topic.slug}`
  const fileName = routeToFile(route)
  const filePath = path.join(prerenderDir, fileName)
  const topicPageModified = getGitModified(path.join(repoRoot, 'src', 'pages', 'TopicPage.tsx')).slice(0, 10)
  const topicDataModified = getGitModified(topicHubPath).slice(0, 10)
  const modifiedTime = topicDataModified > topicPageModified ? topicDataModified : topicPageModified
  const topicChapters = (topic.featuredChapterIds || [])
    .map((chapterId) => chapterLookup.get(chapterId))
    .filter(Boolean)
  const topicArticles = articles.filter((article) => (topic.featuredArticleSlugs || []).includes(article.slug))

  const meta = {
    title: `${topic.name} | ${SITE_NAME}`,
    description: topic.metaDescription,
    url: `${SITE_URL}${route}`,
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    keywords: topic.keywords,
    modifiedTime,
    jsonLd: buildTopicJsonLd(topic, topicChapters, topicArticles),
  }

  fs.writeFileSync(filePath, buildDocument(template, meta, renderTopicPage(topic, topicChapters, topicArticles)))
  manifest[route] = `prerender/${fileName}`
  sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route}`, modifiedTime, 'weekly', '0.8'))
}

for (const article of articles) {
  const route = `/news/${article.slug}`
  const fileName = routeToFile(route)
  const filePath = path.join(prerenderDir, fileName)
  const articleSourceFile = path.join(repoRoot, article.__sourceFile)
  const publishedTime = normalizeHumanDate(article.publishDate)
  const modifiedTime = getGitModified(articleSourceFile).slice(0, 10)
  const absoluteHero = absoluteSiteUrl(article.heroImage?.src || DEFAULT_OG_IMAGE)
  const meta = {
    title: article.seo?.metaTitle || `${article.title} | ${SITE_NAME}`,
    description: article.seo?.metaDescription || article.subtitle,
    url: `${SITE_URL}${route}`,
    type: 'article',
    image: absoluteHero,
    keywords: article.seo?.keywords || article.tags || [],
    publishedTime,
    modifiedTime,
    jsonLd: buildArticleJsonLd(article, publishedTime, modifiedTime),
  }

  fs.writeFileSync(filePath, buildDocument(template, meta, renderArticlePage(article, chapterLookup, topicAliasMap)))
  manifest[route] = `prerender/${fileName}`
  sitemapEntries.set(
    route,
    renderUrlEntry(
      `${SITE_URL}${route}`,
      modifiedTime,
      'weekly',
      '0.7',
      absoluteHero,
      article.title,
    ),
  )
}

const instituteDataModified = getGitModified(instituteCatalogPath).slice(0, 10)
for (const topic of instituteTopics) {
  const courseRoute = `/institute/courses/${topic.slug}`
  const courseFileName = routeToFile(courseRoute)
  const courseFilePath = path.join(prerenderDir, courseFileName)
  const coursePageModified = getGitModified(path.join(repoRoot, 'src', 'pages', 'InstituteCoursePage.tsx')).slice(0, 10)
  const courseModified = instituteDataModified > coursePageModified ? instituteDataModified : coursePageModified
  const courseMeta = {
    title: `${topic.courseTitle} | Veritas Institute`,
    description: topic.summary,
    url: `${SITE_URL}${courseRoute}`,
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    keywords: topic.keywords,
    modifiedTime: courseModified,
    jsonLd: buildInstituteCourseJsonLd(topic),
  }

  fs.writeFileSync(courseFilePath, buildDocument(template, courseMeta, renderInstituteCoursePage(topic)))
  manifest[courseRoute] = `prerender/${courseFileName}`
  sitemapEntries.set(courseRoute, renderUrlEntry(`${SITE_URL}${courseRoute}`, courseModified, 'monthly', '0.7'))

  const guideRoute = `/institute/guides/${topic.slug}`
  const guideFileName = routeToFile(guideRoute)
  const guideFilePath = path.join(prerenderDir, guideFileName)
  const guidePageModified = getGitModified(path.join(repoRoot, 'src', 'pages', 'InstituteGuidePage.tsx')).slice(0, 10)
  const guideModified = instituteDataModified > guidePageModified ? instituteDataModified : guidePageModified
  const guideMeta = {
    title: `${topic.articleTitle} | Veritas Institute`,
    description: topic.summary,
    url: `${SITE_URL}${guideRoute}`,
    type: 'article',
    image: DEFAULT_OG_IMAGE,
    keywords: topic.keywords,
    modifiedTime: guideModified,
    jsonLd: buildInstituteGuideJsonLd(topic),
  }

  fs.writeFileSync(guideFilePath, buildDocument(template, guideMeta, renderInstituteGuidePage(topic)))
  manifest[guideRoute] = `prerender/${guideFileName}`
  sitemapEntries.set(guideRoute, renderUrlEntry(`${SITE_URL}${guideRoute}`, guideModified, 'monthly', '0.7'))
}

const profileModified = getGitModified(profileDataPath).slice(0, 10)
const profiles = parseProfiles()
const profileById = new Map(profiles.map((p) => [p.id, p]))
for (const profileSlug of profileSlugs) {
  const route = `/profile/${profileSlug}`
  const profile = profileById.get(profileSlug) || {
    id: profileSlug,
    name: profileSlug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' '),
    title: 'Power Profile',
    category: 'actor',
    summary: 'Sourced profile of institutional actors — donations, policy actions, and network connections.',
    photo: '',
  }
  const fileName = `profile__${profileSlug}.html`
  const filePath = path.join(prerenderDir, fileName)
  const photoAbs = profile.photo
    ? absoluteSiteUrl(profile.photo)
    : DEFAULT_OG_IMAGE
  const meta = {
    title: `${profile.name} — Power Profile | Veritas Worldwide`,
    description: profile.summary.slice(0, 200),
    url: `${SITE_URL}${route}`,
    type: 'profile',
    image: photoAbs,
    keywords: [profile.name, profile.category, 'power profile', 'FEC', 'primary sources'],
    modifiedTime: profileModified,
    jsonLd: buildProfileJsonLd(profile),
  }
  fs.writeFileSync(filePath, buildDocument(template, meta, renderProfilePage(profile)))
  manifest[route] = `prerender/${fileName}`
  sitemapEntries.set(
    route,
    renderUrlEntry(
      `${SITE_URL}${route}`,
      profileModified,
      'monthly',
      '0.7',
      photoAbs,
      profile.name,
    ),
  )
}

// Durable static PDFs / machine-readable corpora (not SPA routes, but crawlable public assets).
const today = new Date().toISOString().slice(0, 10)
sitemapEntries.set(
  '/veritas-institute-field-manual.pdf',
  renderUrlEntry(`${SITE_URL}/veritas-institute-field-manual.pdf`, today, 'monthly', '0.7')
)
sitemapEntries.set(
  '/the-record.pdf',
  renderUrlEntry(`${SITE_URL}/the-record.pdf`, today, 'monthly', '0.6')
)
sitemapEntries.set(
  '/israel-dossier/corpus.json',
  renderUrlEntry(`${SITE_URL}/israel-dossier/corpus.json`, today, 'weekly', '0.7')
)
sitemapEntries.set(
  '/record-of-jesus-christ/corpus.json',
  renderUrlEntry(`${SITE_URL}/record-of-jesus-christ/corpus.json`, today, 'weekly', '0.7')
)
sitemapEntries.set(
  '/record-of-jesus-christ/record-of-jesus-christ.pdf',
  renderUrlEntry(`${SITE_URL}/record-of-jesus-christ/record-of-jesus-christ.pdf`, today, 'monthly', '0.6')
)
sitemapEntries.set(
  '/profiles/corpus.json',
  renderUrlEntry(`${SITE_URL}/profiles/corpus.json`, today, 'weekly', '0.6')
)

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
writeSitemap([...sitemapEntries.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, entry]) => entry))
const llmsTxt = renderLlmsTxt(institutePracticalTopics)
const instituteMarkdown = renderInstituteMarkdown(institutePracticalTopics, instituteResearchSources)
fs.writeFileSync(distLlmsPath, llmsTxt)
fs.writeFileSync(sourceLlmsPath, llmsTxt)
fs.writeFileSync(distInstituteMarkdownPath, instituteMarkdown)
fs.writeFileSync(sourceInstituteMarkdownPath, instituteMarkdown)

console.log(`[prerender] Generated ${Object.keys(manifest).length} prerendered routes`)
console.log(`[prerender] Wrote sitemap with ${sitemapEntries.size} URLs`)
console.log('[prerender] Wrote llms.txt and veritas-institute.md')
