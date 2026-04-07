#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import vm from 'node:vm'
import { spawnSync } from 'child_process'

const SITE_NAME = 'Veritas Press'
const SITE_URL = 'https://veritasworldwide.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

const repoRoot = process.cwd()
const distDir = path.join(repoRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const manifestPath = path.join(distDir, 'prerender-manifest.json')
const prerenderDir = path.join(distDir, 'prerender')
const distSitemapPath = path.join(distDir, 'sitemap.xml')
const sourceSitemapPath = path.join(repoRoot, 'public', 'sitemap.xml')
const chapterMetaPath = path.join(repoRoot, 'src', 'data', 'chapterMeta.ts')
const chapterSourceDir = path.join(repoRoot, 'src', 'data', 'chapters')
const topicHubPath = path.join(repoRoot, 'src', 'data', 'topicHubs.json')
const profileDataPath = path.join(repoRoot, 'src', 'data', 'profileData.ts')
const instituteCatalogPath = path.join(repoRoot, 'src', 'data', 'instituteCatalog.ts')

const articleCollections = [
  { file: 'src/data/articles.ts', exportName: 'articles' },
  { file: 'src/data/articlesExpanded.ts', exportName: 'expandedArticlesA' },
  { file: 'src/data/articlesExpandedB.ts', exportName: 'expandedArticlesB' },
]

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
  const relativePath = path.relative(repoRoot, filePath)
  const result = spawnSync('git', ['log', '-1', '--format=%cI', '--', relativePath], {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  if (result.status === 0 && result.stdout.trim()) {
    return result.stdout.trim()
  }

  return new Date(fs.statSync(filePath).mtimeMs).toISOString()
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

function buildDocument(baseHtml, meta, body) {
  let html = baseHtml
  html = setTitle(html, meta.title)
  html = setMetaTag(html, 'name', 'description', meta.description)
  html = setMetaTag(html, 'property', 'og:title', meta.title)
  html = setMetaTag(html, 'property', 'og:description', meta.description)
  html = setMetaTag(html, 'property', 'og:type', meta.type || 'website')
  html = setMetaTag(html, 'property', 'og:url', meta.url)
  html = setMetaTag(html, 'property', 'og:image', meta.image || DEFAULT_OG_IMAGE)
  html = setMetaTag(html, 'name', 'twitter:title', meta.title)
  html = setMetaTag(html, 'name', 'twitter:description', meta.description)
  html = setMetaTag(html, 'name', 'twitter:image', meta.image || DEFAULT_OG_IMAGE)
  html = setMetaTag(html, 'name', 'robots', meta.robots || 'index,follow')
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
  const source = fs.readFileSync(chapterMetaPath, 'utf8')
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

function getOgImage(chapterId) {
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

    const topic = {
      id: extractSingleQuotedField(block, 'id'),
      slug: extractSingleQuotedField(block, 'slug'),
      track: extractSingleQuotedField(block, 'track'),
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

function loadProfileSlugs() {
  const source = fs.readFileSync(profileDataPath, 'utf8')
  return [...new Set([...source.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]))]
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

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Veritas Press</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(page.heading)}</h1>
        <p class="font-body text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">${escapeHtml(page.description)}</p>
        ${page.body.map((paragraph) => `<p class="font-body text-base md:text-lg text-ink-light leading-8 mt-6 max-w-4xl">${escapeHtml(paragraph)}</p>`).join('\n')}
        ${relatedMarkup}
      </div>
    </main>`
}

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

function renderInstituteIndexPage(topics, researchSources) {
  const counts = Object.entries(
    topics.reduce((acc, topic) => {
      acc[topic.track] = (acc[topic.track] || 0) + 1
      return acc
    }, {})
  )

  return `
    <main class="institute-shell-root text-white">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">Veritas Institute</p>
          <h1 class="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-[color:var(--institute-ink)]">A separate learning interface for practical skills, resilient systems, and 2026 career moves.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">The institute turns the top practical skill-intent clusters of 2026 into 100 courses, 100 direct-answer guides, and a downloadable field manual. Same Veritas methodology. Different surface.</p>
          <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div class="institute-stat"><span class="institute-stat-value">100</span><span class="institute-stat-label">skills</span></div>
            <div class="institute-stat"><span class="institute-stat-value">200</span><span class="institute-stat-label">titles</span></div>
            <div class="institute-stat"><span class="institute-stat-value">10</span><span class="institute-stat-label">tracks</span></div>
            <div class="institute-stat"><span class="institute-stat-value">PDF</span><span class="institute-stat-label">field manual</span></div>
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">Tracks</p>
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            ${counts.map(([track, count]) => `
              <div class="institute-track-card">
                <p class="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">${escapeHtml(instituteTrackLabels[track] || track)}</p>
                <p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(count)} catalog entries connect to this track.</p>
              </div>`).join('\n')}
          </div>
        </section>

        <section class="institute-panel px-6 py-6 mt-8">
          <p class="institute-eyebrow">Top 100 catalog</p>
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
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">We synthesized the demand surface. We did not fake an official list.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">Search behavior changes quickly and public trend tools expose only fragments. Veritas Institute therefore uses a defensible 2026 demand synthesis based on public labor guidance, official preparedness resources, extension systems, and skill-demand reporting.</p>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Editorial rules</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            ${[
              'Career guidance is anchored to official institutions, licensing pathways, or public labor-market sources.',
              'Preparedness content stays calm, source-first, and safety-forward instead of apocalyptic theater.',
              'AI, money, and business material rejects exaggerated earnings claims and makes uncertainty visible.',
              'High-risk medical, legal, structural, and hazardous topics never get framed as casual DIY.',
            ].map((line) => `<div class="institute-list-row"><span class="text-sm leading-7 text-[color:var(--institute-ink)]">${escapeHtml(line)}</span></div>`).join('\n')}
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
  const relatedLinks = topic.related
    .map((slug) => `<a href="/institute/courses/${escapeAttr(slug)}" class="text-sm text-[color:var(--institute-accent)]">${escapeHtml(slug)}</a>`)
    .join(' · ')

  return `
    <main class="institute-shell-root text-white">
      <article class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.courseTitle)}</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
          <div class="flex flex-wrap gap-2 mt-6">
            <span class="institute-pill">${escapeHtml(topic.difficulty)}</span>
            <span class="institute-pill">${escapeHtml(topic.timeToFirstResult)}</span>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Core path</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Why now</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.whyNow)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">First action</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.firstAction)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Outcome</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.outcome)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Risk note</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.warning)}</p></div>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">Institutions</p>
          <p class="mt-4 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.institutions.join(', '))}</p>
          <div class="mt-6 flex flex-wrap gap-4">
            <a href="/institute/guides/${escapeAttr(topic.slug)}" class="institute-button-primary">Read companion guide</a>
            <a href="/institute/book" class="institute-button-secondary">Open the field manual</a>
          </div>
          ${relatedLinks ? `<p class="mt-6 text-sm leading-7 text-[color:var(--institute-muted)]"><span class="text-[color:var(--institute-ink)] font-medium">Related:</span> ${relatedLinks}</p>` : ''}
        </section>
      </article>
    </main>`
}

function renderInstituteGuidePage(topic) {
  return `
    <main class="institute-shell-root text-white">
      <article class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">${escapeHtml(topic.articleTitle)}</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">${escapeHtml(topic.summary)}</p>
          <div class="rounded-[28px] border border-[color:var(--institute-border-strong)] bg-[color:var(--institute-surface)] px-5 py-5 mt-6">
            <p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Fast answer</p>
            <p class="mt-3 text-base leading-8 text-[color:var(--institute-ink)]">Start by ${escapeHtml(topic.firstAction.charAt(0).toLowerCase() + topic.firstAction.slice(1))} Then build the path around safety, proof, and documented next steps instead of shortcuts or hype.</p>
          </div>
        </section>
        <section class="institute-panel px-6 py-6">
          <p class="institute-eyebrow">How the path works</p>
          <div class="grid gap-4 xl:grid-cols-2 mt-4">
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Why demand exists</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.whyNow)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">First action</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.firstAction)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Outcome</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.outcome)}</p></div>
            <div class="institute-mini-card"><p class="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">Risk note</p><p class="mt-3 text-sm leading-7 text-[color:var(--institute-muted)]">${escapeHtml(topic.warning)}</p></div>
          </div>
          <div class="mt-6 flex flex-wrap gap-4">
            <a href="/institute/courses/${escapeAttr(topic.slug)}" class="institute-button-primary">Open course</a>
            <a href="/institute/book" class="institute-button-secondary">See the full manual</a>
          </div>
        </section>
      </article>
    </main>`
}

function renderInstituteBookPage(topics, researchSources) {
  const grouped = topics.reduce((acc, topic) => {
    if (!acc[topic.track]) acc[topic.track] = []
    acc[topic.track].push(topic)
    return acc
  }, {})

  return `
    <main class="institute-shell-root text-white">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section class="institute-panel-strong px-6 py-8">
          <p class="institute-eyebrow">Book of Knowledge</p>
          <h1 class="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[color:var(--institute-ink)]">The field manual for work, continuity, and self-reliance.</h1>
          <p class="mt-5 max-w-4xl text-lg leading-8 text-[color:var(--institute-muted)]">This page indexes the full institute archive by track and skill so readers, crawlers, and retrieval systems can move from a practical question into the right course, guide, or print export path.</p>
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
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: topic.courseTitle,
      description: topic.summary,
      provider: {
        '@type': 'Organization',
        name: 'Veritas Institute',
        sameAs: `${SITE_URL}/institute`,
      },
      educationalLevel: topic.difficulty,
      timeRequired: topic.timeToFirstResult,
      url: `${SITE_URL}/institute/courses/${topic.slug}`,
    },
  ]
}

function buildInstituteGuideJsonLd(topic) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: topic.articleTitle,
      description: topic.summary,
      url: `${SITE_URL}/institute/guides/${topic.slug}`,
      supply: topic.institutions.map((institution) => ({
        '@type': 'HowToSupply',
        name: institution,
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

function buildArticleJsonLd(article, publishedTime, modifiedTime) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.seo?.metaDescription || article.subtitle,
      image: article.heroImage?.src || DEFAULT_OG_IMAGE,
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

function renderUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url><loc>${escapeHtml(loc)}</loc><lastmod>${escapeHtml(lastmod)}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

function writeSitemap(entries) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
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
const instituteResearchSources = parseInstituteResearchSources()

const staticPages = [
  {
    route: '/',
    title: 'The Record | Veritas Press',
    heading: 'The Record',
    description: 'A documentary history of power, money, and the institutions that shaped the modern world.',
    body: [
      'Veritas Press publishes longform investigative work built on primary sources, congressional records, court filings, declassified files, and public financial disclosures.',
      'Volume I spans 31 chapters and more than 500 source documents. Every chapter is available through a free reader account, with public previews and traceable citations.',
    ],
    featuredChapterIds: chapters.slice(0, 6).map((chapter) => chapter.id),
    sourceFile: 'src/pages/HomePage.tsx',
  },
  {
    route: '/topics',
    title: 'Research Topics | Veritas Press',
    heading: 'Research Topics',
    description: 'Curated research hubs connecting Veritas chapters, current reporting, and newsletter signup paths by topic.',
    body: [
      'Topic hubs connect high-intent search queries to the relevant chapters, news articles, and newsletter subscription path so readers can continue following a beat instead of bouncing after one page.',
    ],
    sourceFile: 'src/pages/TopicsIndexPage.tsx',
  },
  {
    route: '/institute',
    title: 'Veritas Institute | Practical Skills Courses for 2026',
    heading: 'Veritas Institute',
    description: 'A catalog of 100 practical skill-intent courses and guides covering AI, trades, healthcare, resilience, money, and self-reliance.',
    body: [
      'Veritas Institute answers practical 2026 skill questions with a separate learning interface, the same source-first discipline, and a printable Book of Knowledge.',
    ],
    sourceFile: 'src/pages/InstitutePage.tsx',
  },
  {
    route: '/institute/book',
    title: 'Book of Knowledge | Veritas Institute',
    heading: 'Book of Knowledge',
    description: 'A field manual compiling the Veritas Institute skill catalog into one printable archive.',
    body: [
      'The Book of Knowledge groups the institute catalog into one long-form field manual built for print, offline reference, and structured retrieval.',
    ],
    sourceFile: 'src/pages/InstituteBookPage.tsx',
  },
  {
    route: '/institute/methodology',
    title: 'Institute Methodology | Veritas Institute',
    heading: 'Institute Methodology',
    description: 'How the Veritas Institute synthesizes the top practical skill-intent questions of 2026 from public demand signals.',
    body: [
      'The institute uses public labor, preparedness, extension, and skill-demand sources to build a defensible catalog of 2026 practical learning priorities.',
    ],
    sourceFile: 'src/pages/InstituteMethodologyPage.tsx',
  },
  {
    route: '/methodology',
    title: 'Methodology | Veritas Press',
    heading: 'Methodology',
    description: 'The source hierarchy, evidence standards, and editorial method behind The Record.',
    body: [
      'Veritas Press distinguishes between verified, circumstantial, and disputed material so readers can assess each claim on its own documentary footing.',
      'Primary sources and traceable citations are the foundation. Interpretation is labeled clearly and separated from established record.',
    ],
    featuredChapterIds: ['foreword'],
    sourceFile: 'src/pages/MethodologyPage.tsx',
  },
  {
    route: '/sources',
    title: 'Sources | Veritas Press',
    heading: 'Sources',
    description: 'A browsable source library for The Record, organized around public documentation and traceable citations.',
    body: [
      'The publication collects source material from court filings, congressional testimony, executive records, declassified archives, peer-reviewed research, and verified investigative reporting.',
    ],
    featuredChapterIds: ['foreword', 'overview'],
    sourceFile: 'src/pages/SourcesPage.tsx',
  },
  {
    route: '/search',
    title: 'Search | The Record - Veritas Press',
    heading: 'Search The Record',
    description: 'Search chapter titles, public preview text, sources, and documentary references.',
    body: [
      'Search is built for readers who need to move from a name, institution, or event directly into the available chapter material and citations.',
    ],
    featuredChapterIds: ['overview', 'chapter-14', 'chapter-28'],
    sourceFile: 'src/pages/SearchPage.tsx',
  },
  {
    route: '/timeline',
    title: 'Timeline | Veritas Press',
    heading: 'Timeline',
    description: 'A chronological index of the events, institutions, and turning points documented in The Record.',
    body: [
      'The timeline connects publication chapters into a single navigable chronology so readers can track institutional continuity across decades and jurisdictions.',
    ],
    featuredChapterIds: ['chapter-1', 'chapter-3', 'chapter-13', 'chapter-28'],
    sourceFile: 'src/pages/TimelinePage.tsx',
  },
  {
    route: '/analytics',
    title: 'Reader Analytics | Veritas Press',
    heading: 'Reader Analytics',
    description: 'Public readership metrics for The Record and the broader Veritas publication footprint.',
    body: [
      'Reader analytics summarize how the publication is being discovered, read, and revisited without turning the editorial product into an ad-driven growth trap.',
    ],
    sourceFile: 'src/pages/AnalyticsPage.tsx',
  },
  {
    route: '/accessibility',
    title: 'Accessibility | Veritas Press',
    heading: 'Accessibility',
    description: 'Accessibility commitments, WCAG-aligned design standards, and reporting paths for readers.',
    body: [
      'Veritas Press treats accessibility as part of publication integrity: strong contrast, keyboard navigation, semantic structure, and screen-reader clarity are baseline requirements.',
    ],
    sourceFile: 'src/pages/AccessibilityPage.tsx',
  },
  {
    route: '/privacy',
    title: 'Privacy Policy | Veritas Press',
    heading: 'Privacy Policy',
    description: 'How reader data, analytics, support flows, and subscriptions are handled across Veritas properties.',
    body: [
      'The publication minimizes data collection, keeps analytics purpose-specific, and avoids turning readership into an advertising product.',
    ],
    sourceFile: 'src/pages/PrivacyPage.tsx',
  },
  {
    route: '/terms',
    title: 'Terms of Use | Veritas Press',
    heading: 'Terms of Use',
    description: 'Usage terms for The Record, supporting materials, and Veritas publication assets.',
    body: [
      'The publication is intended for public reading, citation, and responsible sharing. Source material remains attributable to its original creators and archives.',
    ],
    sourceFile: 'src/pages/TermsPage.tsx',
  },
  {
    route: '/israel-dossier',
    title: 'The Israel Dossier | Veritas Press',
    heading: 'The Israel Dossier',
    description: 'A sourced dossier covering U.S.-Israel policy, humanitarian impact, military spending, and the public record surrounding the conflict.',
    body: [
      'The dossier is organized around documented facts, attributable claims, and a clearly labeled evidence structure so readers can separate record from interpretation.',
    ],
    featuredChapterIds: ['chapter-14', 'chapter-15', 'chapter-16'],
    sourceFile: 'src/pages/IsraelDossierPage.tsx',
  },
  {
    route: '/membership',
    title: 'Membership | Veritas Press',
    heading: 'Support The Record',
    description: 'Membership and recurring support options that keep the documentary record free, open, and independent.',
    body: [
      'Support language remains humble by design. Readers fund the archive, document acquisition, and ongoing reporting without paywalling the core publication.',
    ],
    sourceFile: 'src/pages/MembershipPage.tsx',
  },
  {
    route: '/deep-state',
    title: 'The Deep State - The Epstein Network | Veritas Press',
    heading: 'The Deep State - The Epstein Network',
    description: 'An investigative dossier documenting the Epstein network through court records, testimony, and verified reporting.',
    body: [
      'This dossier is structured as a source-first investigation, linking individuals, institutions, and documented events without blurring the distinction between evidence tiers.',
    ],
    featuredChapterIds: ['chapter-28'],
    sourceFile: 'src/pages/DeepStatePage.tsx',
  },
  {
    route: '/read',
    title: 'Read The Record | Veritas Press',
    heading: 'Read The Record',
    description: 'A chapter-by-chapter reader for Volume I of The Record.',
    body: [
      'The reader experience is optimized for longform investigation: typography, chapter sequencing, and printability are designed for sustained documentary reading.',
    ],
    featuredChapterIds: chapters.slice(0, 5).map((chapter) => chapter.id),
    sourceFile: 'src/pages/ReadTheBookPage.tsx',
  },
  {
    route: '/news',
    title: 'News | Veritas Press',
    heading: 'Current Events',
    description: 'Source-first reporting on power, money, accountability, and the institutions shaping current events.',
    body: [
      'The news desk extends the methodology of The Record into live coverage, emphasizing primary documents, verified sourcing, and restrained editorial framing.',
    ],
    sourceFile: 'src/pages/NewsPage.tsx',
  },
  {
    route: '/content-pack',
    title: 'Content Packs & Brand Kit | Veritas Press',
    heading: 'Content Packs & Brand Kit',
    description: 'Official Veritas Press assets for press, advocacy, and social distribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/share',
    title: 'Content Packs & Brand Kit | Veritas Press',
    heading: 'Content Packs & Brand Kit',
    description: 'Official Veritas Press assets for press, advocacy, and social distribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/forum',
    title: 'Veritas Forum | Veritas Press',
    heading: 'Veritas Forum',
    description: 'Reader discussion around evidence, chapters, current reporting, and the documentary record.',
    body: [
      'The forum is built for accountable discussion around sourced material, not algorithmic outrage or engagement bait.',
    ],
    sourceFile: 'src/pages/ForumPage.tsx',
  },
  {
    route: '/profiles',
    title: 'Power Profiles | Veritas Press',
    heading: 'Power Profiles',
    description: 'Sourced profiles of politicians, donors, billionaires, lobbyists, and institutional actors.',
    body: [
      'Profiles aggregate claims, donations, quotes, and documented connections so readers can understand networks of influence without losing the underlying citations.',
    ],
    sourceFile: 'src/pages/ProfilesIndexPage.tsx',
  },
]

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
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    modifiedTime,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.heading,
        url: `${SITE_URL}${route === '/' ? '' : route}`,
        description: page.description,
        dateModified: modifiedTime,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  }

  let body = renderStaticPage(page, chapters)
  if (route === '/topics') body = renderTopicsIndexPage(topicHubs)
  if (route === '/institute') body = renderInstituteIndexPage(instituteTopics, instituteResearchSources)
  if (route === '/institute/book') body = renderInstituteBookPage(instituteTopics, instituteResearchSources)
  if (route === '/institute/methodology') body = renderInstituteMethodologyPage(instituteResearchSources)
  fs.writeFileSync(filePath, buildDocument(template, meta, body))
  manifest[route] = `prerender/${fileName}`

  const sitemapMeta = getStaticPageSitemapMeta(route)
  sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route === '/' ? '' : route}`, modifiedTime, sitemapMeta.changefreq, sitemapMeta.priority))
}

for (const chapter of chapters) {
  const route = `/chapter/${chapter.id}`
  const fileName = routeToFile(route)
  const filePath = path.join(prerenderDir, fileName)
  const chapterFile = path.join(chapterSourceDir, `${chapter.id}.ts`)
  const publishedTime = normalizeHumanDate(chapter.publishDate)
  const modifiedTime = getGitModified(chapterFile).slice(0, 10)
  const image = getOgImage(chapter.id)
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
  sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route}`, modifiedTime, 'monthly', chapter.id === 'foreword' || chapter.id === 'overview' ? '0.9' : '0.8'))
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
  const meta = {
    title: article.seo?.metaTitle || `${article.title} | ${SITE_NAME}`,
    description: article.seo?.metaDescription || article.subtitle,
    url: `${SITE_URL}${route}`,
    type: 'article',
    image: article.heroImage?.src || DEFAULT_OG_IMAGE,
    keywords: article.seo?.keywords || article.tags || [],
    publishedTime,
    modifiedTime,
    jsonLd: buildArticleJsonLd(article, publishedTime, modifiedTime),
  }

  fs.writeFileSync(filePath, buildDocument(template, meta, renderArticlePage(article, chapterLookup, topicAliasMap)))
  manifest[route] = `prerender/${fileName}`
  sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route}`, modifiedTime, 'weekly', '0.7'))
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
for (const profileSlug of profileSlugs) {
  const route = `/profile/${profileSlug}`
  sitemapEntries.set(route, renderUrlEntry(`${SITE_URL}${route}`, profileModified, 'monthly', '0.7'))
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
writeSitemap([...sitemapEntries.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, entry]) => entry))

console.log(`[prerender] Generated ${Object.keys(manifest).length} prerendered routes`)
console.log(`[prerender] Wrote sitemap with ${sitemapEntries.size} URLs`)
