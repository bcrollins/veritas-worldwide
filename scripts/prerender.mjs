#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import vm from 'node:vm'

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
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Veritas Worldwide</p>
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
])

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

  return {
    llmSummary: `${topic.skill} works best when you start by ${lowerFirst(topic.firstAction)}. Treat it as ${framing}, verify the floor against ${topic.institutions?.[0] || 'official guidance'}, and aim for ${lowerFirst(topic.outcome)} within ${topic.timeToFirstResult}.`,
    searchIntent: `People search for ${lowerFirst(topic.skill)} because they want a direct route to ${lowerFirst(topic.outcome)} without losing months to hype, vague advice, or bad sequencing.`,
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
    '- [Institute methodology](https://veritasworldwide.com/institute/methodology)',
    '- [Institute catalog](https://veritasworldwide.com/institute)',
    '- [Field manual](https://veritasworldwide.com/institute/book)',
    '- [Source standards](https://veritasworldwide.com/methodology)',
    '',
    '## Quick Route',
    '',
    '- If the user needs an urgent answer, start with the relevant guide article and state the safety boundary first.',
    '- If the user wants a durable path, move from the guide into the course page and make the proof threshold explicit.',
    '- If the topic involves licensing, legal, electrical, structural, medical, gas, or hazardous work, preserve the warning language and route them to official/local requirements.',
    '',
    '## Practical Tracks',
    '',
    ...grouped.flatMap(([track, items]) => [
      `### ${instituteTrackLabels[track] || track}`,
      '',
      ...items.flatMap((topic) => {
        const brief = buildInstituteBrief(topic)
        return [
          `#### ${topic.skill}`,
          '',
          `- Guide: https://veritasworldwide.com/institute/guides/${topic.slug}`,
          `- Course: https://veritasworldwide.com/institute/courses/${topic.slug}`,
          `- Why it matters: ${topic.summary}`,
          `- First action: ${topic.firstAction}`,
          `- Time to first result: ${topic.timeToFirstResult}`,
          `- Difficulty: ${topic.difficulty}`,
          `- Outcome: ${topic.outcome}`,
          `- Search intent: ${brief.searchIntent}`,
          `- LLM summary: ${brief.llmSummary}`,
          `- Proof standard: ${brief.proofPoints}`,
          '',
          'Prerequisites:',
          ...brief.prerequisites.map((item) => `- ${item}`),
          '',
          'Official checkpoints:',
          ...brief.officialCheckpoints.map((item) => `- ${item}`),
          '',
          `- Related queries: ${brief.relatedQueries.join(', ')}`,
          `- Institutions: ${(topic.institutions || []).join(', ')}`,
          `- Keywords: ${(topic.keywords || []).join(', ')}`,
          `- Tools: ${(topic.tools || []).join(', ')}`,
          '',
        ]
      }),
    ]),
    '## Research Sources',
    '',
    ...researchSources.flatMap((source) => [
      `- [${source.label}](${source.url}) — ${source.note}`,
    ]),
    '',
  ].join('\n')
}

function renderInstituteIndexPage(topics, researchSources) {
  const grouped = groupInstituteTopicsByTrack(topics)

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Veritas Institute</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">Practical skill paths built with the same proof standard as the publication.</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-4xl">
          The institute starts with urgent household questions, then routes readers into structured practical trade and resilience paths built from public safety guidance, extension systems, and real credential lanes.
        </p>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-10">
          ${topics.map((topic) => `
            <a href="/institute/guides/${escapeAttr(topic.slug)}" class="border border-border bg-surface p-5 block">
              <p class="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
              <h2 class="font-display text-2xl font-bold text-ink leading-tight">${escapeHtml(topic.skill)}</h2>
              <p class="font-body text-sm text-ink-muted leading-7 mt-3">${escapeHtml(topic.summary)}</p>
            </a>
          `).join('\n')}
        </div>
        <section class="mt-12">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Source baseline</p>
          <ul class="list-none m-0 p-0 space-y-3">
            ${researchSources.map((source) => `
              <li>
                <a href="${escapeAttr(source.url)}" class="font-sans text-sm font-semibold text-crimson">${escapeHtml(source.label)}</a>
                <p class="font-body text-sm text-ink-muted leading-7">${escapeHtml(source.note)}</p>
              </li>
            `).join('\n')}
          </ul>
        </section>
      </div>
    </main>`
}

function renderInstituteBookPage(topics, researchSources) {
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Field Manual</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">The Veritas field manual combines urgent guides with durable trade-course paths.</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-4xl">
          Use the manual to answer immediate repair, preparedness, food, and healthcare-support questions, then move into the deeper course pages for a path with proof standards and next steps.
        </p>
        <div class="space-y-6 mt-10">
          ${topics.map((topic) => {
            const brief = buildInstituteBrief(topic)
            return `
              <article class="border border-border bg-surface p-5">
                <p class="font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
                <h2 class="font-display text-2xl font-bold text-ink leading-tight">${escapeHtml(topic.skill)}</h2>
                <p class="font-body text-sm text-ink-muted leading-7 mt-3">${escapeHtml(topic.summary)}</p>
                <p class="font-body text-sm text-ink-light leading-7 mt-3"><strong>First action:</strong> ${escapeHtml(topic.firstAction)}</p>
                <p class="font-body text-sm text-ink-light leading-7"><strong>Outcome:</strong> ${escapeHtml(topic.outcome)}</p>
                <p class="font-body text-sm text-ink-light leading-7"><strong>Proof standard:</strong> ${escapeHtml(brief.proofPoints)}</p>
                <div class="flex flex-wrap gap-3 mt-4">
                  <a href="/institute/guides/${escapeAttr(topic.slug)}" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Guide</a>
                  <a href="/institute/courses/${escapeAttr(topic.slug)}" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Course</a>
                </div>
              </article>
            `
          }).join('\n')}
        </div>
        <section class="mt-12">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Research baseline</p>
          <ul class="list-none m-0 p-0 space-y-3">
            ${researchSources.map((source) => `
              <li>
                <a href="${escapeAttr(source.url)}" class="font-sans text-sm font-semibold text-crimson">${escapeHtml(source.label)}</a>
                <p class="font-body text-sm text-ink-muted leading-7">${escapeHtml(source.note)}</p>
              </li>
            `).join('\n')}
          </ul>
        </section>
      </div>
    </main>`
}

function renderInstituteMethodologyPage(researchSources) {
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Institute Methodology</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">Practical guidance is sourced, labeled, and bounded before it is published.</h1>
        <div class="space-y-6 font-body text-base text-ink-muted leading-8 max-w-3xl">
          <p>Institute guides start with source hierarchy, not style. Public safety agencies, labor and licensing bodies, extension systems, and hospital or occupational guidance outrank anecdotal internet summaries.</p>
          <p>Each guide names the safety boundary explicitly. If a task crosses into electrical service, structural work, hazardous materials, medical escalation, gas systems, or legal requirements, that boundary is stated before procedural guidance appears.</p>
          <p>Course pages then turn a short guide into a durable path: prerequisites, proof threshold, next action, and official checkpoints. The standard is practical clarity without pretending a web article replaces supervised training or licensing.</p>
        </div>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Core source stack</p>
          <ul class="list-none m-0 p-0 space-y-3">
            ${researchSources.map((source) => `
              <li>
                <a href="${escapeAttr(source.url)}" class="font-sans text-sm font-semibold text-crimson">${escapeHtml(source.label)}</a>
                <p class="font-body text-sm text-ink-muted leading-7">${escapeHtml(source.note)}</p>
              </li>
            `).join('\n')}
          </ul>
        </section>
      </div>
    </main>`
}

function renderInstituteGuidePage(topic) {
  const brief = buildInstituteBrief(topic)
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(topic.articleTitle)}</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-3xl">${escapeHtml(topic.summary)}</p>
        <div class="space-y-6 font-body text-base text-ink-light leading-8 mt-8 max-w-3xl">
          <p><strong>Why now:</strong> ${escapeHtml(topic.whyNow)}</p>
          <p><strong>First action:</strong> ${escapeHtml(topic.firstAction)}</p>
          <p><strong>Time to first result:</strong> ${escapeHtml(topic.timeToFirstResult)}</p>
          <p><strong>Outcome:</strong> ${escapeHtml(topic.outcome)}</p>
          <p><strong>Proof standard:</strong> ${escapeHtml(brief.proofPoints)}</p>
          <p><strong>Warning:</strong> ${escapeHtml(topic.warning)}</p>
        </div>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Prerequisites</p>
          <ul class="space-y-3 font-body text-base text-ink-muted leading-8">
            ${brief.prerequisites.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>
        </section>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Official checkpoints</p>
          <ul class="space-y-3 font-body text-base text-ink-muted leading-8">
            ${brief.officialCheckpoints.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>
        </section>
        <div class="flex flex-wrap gap-4 mt-10">
          <a href="/institute/courses/${escapeAttr(topic.slug)}" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Go deeper</a>
          <a href="/institute" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Back to catalog</a>
        </div>
      </div>
    </main>`
}

function renderInstituteCoursePage(topic) {
  const brief = buildInstituteBrief(topic)
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">${escapeHtml(instituteTrackLabels[topic.track] || topic.track)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(topic.courseTitle)}</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-3xl">${escapeHtml(topic.summary)}</p>
        <div class="space-y-6 font-body text-base text-ink-light leading-8 mt-8 max-w-3xl">
          <p><strong>Path framing:</strong> ${escapeHtml(brief.llmSummary)}</p>
          <p><strong>First action:</strong> ${escapeHtml(topic.firstAction)}</p>
          <p><strong>Difficulty:</strong> ${escapeHtml(topic.difficulty)}</p>
          <p><strong>Time to first result:</strong> ${escapeHtml(topic.timeToFirstResult)}</p>
          <p><strong>Outcome:</strong> ${escapeHtml(topic.outcome)}</p>
        </div>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">What you need before you start</p>
          <ul class="space-y-3 font-body text-base text-ink-muted leading-8">
            ${brief.prerequisites.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>
        </section>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Proof standard</p>
          <p class="font-body text-base text-ink-muted leading-8">${escapeHtml(brief.proofPoints)}</p>
        </section>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Official checkpoints</p>
          <ul class="space-y-3 font-body text-base text-ink-muted leading-8">
            ${brief.officialCheckpoints.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>
        </section>
        <section class="mt-10">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Related queries</p>
          <p class="font-body text-base text-ink-muted leading-8">${escapeHtml(brief.relatedQueries.join(', '))}</p>
        </section>
      </div>
    </main>`
}

function renderChapterPage(chapter, excerpts, topicAliasMap) {
  const excerptHtml = excerpts
    .map((paragraph) => {
      const linkedParagraph = paragraph.replace(/\b([A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+){0,3})\b/g, (match) => {
        const route = getTopicRouteForTerm(match, topicAliasMap)
        return route.startsWith('/topics/')
          ? `<a href="${escapeAttr(route)}" class="text-crimson hover:text-crimson-dark underline decoration-crimson/30">${escapeHtml(match)}</a>`
          : escapeHtml(match)
      })

      return `<p class="font-body text-lg text-ink-muted leading-8 mb-5">${linkedParagraph}</p>`
    })
    .join('\n')

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">${escapeHtml(chapter.number)} · ${escapeHtml(chapter.dateRange)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(chapter.title)}</h1>
        <p class="font-body text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">${escapeHtml(chapter.subtitle)}</p>
        <div class="mt-8 flex flex-wrap gap-3 text-[0.65rem] font-sans uppercase tracking-[0.1em] text-ink-faint">
          <span>${escapeHtml(chapter.author)}</span>
          <span>Published ${escapeHtml(chapter.publishDate)}</span>
        </div>
        <section class="mt-10">${excerptHtml}</section>
        <div class="mt-12 flex flex-wrap gap-4">
          <a href="/read" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Open the reader</a>
          <a href="/search" class="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-crimson">Search citations</a>
        </div>
      </article>
    </main>`
}

function renderArticlePage(article, chapterMap, topicAliasMap) {
  const relatedChapterLinks = (article.relatedChapters || [])
    .map((chapterId) => chapterMap.get(chapterId))
    .filter(Boolean)
    .map((chapter) => `<li><a href="/chapter/${escapeAttr(chapter.id)}" class="font-sans text-sm font-semibold text-crimson">${escapeHtml(chapter.title)}</a></li>`)
    .join('\n')

  const body = (article.content || []).map((block) => {
    if (block.type === 'quote') {
      return `<blockquote class="border-l-4 border-crimson pl-4 italic text-ink-light my-8">${escapeHtml(block.text)}</blockquote>`
    }

    if (block.type === 'list') {
      return `<ul class="list-disc pl-6 space-y-2 my-6">${(block.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    }

    if (block.type === 'paragraph') {
      const linked = escapeHtml(block.text).replace(/\b([A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+){0,3})\b/g, (match) => {
        const route = getTopicRouteForTerm(match, topicAliasMap)
        return route.startsWith('/topics/')
          ? `<a href="${escapeAttr(route)}" class="text-crimson hover:text-crimson-dark underline decoration-crimson/30">${match}</a>`
          : match
      })
      return `<p class="font-body text-lg text-ink-muted leading-8 mb-5">${linked}</p>`
    }

    return ''
  }).join('\n')

  return `
    <main class="min-h-screen bg-parchment text-ink">
      <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Current Events</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(article.title)}</h1>
        <p class="font-body text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">${escapeHtml(article.subtitle)}</p>
        <div class="mt-8 flex flex-wrap gap-3 text-[0.65rem] font-sans uppercase tracking-[0.1em] text-ink-faint">
          <span>${escapeHtml(article.publishDate)}</span>
          ${(article.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
        </div>
        <section class="mt-10">${body}</section>
        ${relatedChapterLinks ? `
          <section class="mt-12">
            <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Related chapters</p>
            <ul class="space-y-2">${relatedChapterLinks}</ul>
          </section>` : ''}
      </article>
    </main>`
}

function renderTopicPage(topic, chapters, articles) {
  return `
    <main class="min-h-screen bg-parchment text-ink">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <p class="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">${escapeHtml(topic.eyebrow)}</p>
        <h1 class="font-display text-4xl md:text-5xl font-bold leading-tight text-ink mb-4">${escapeHtml(topic.name)}</h1>
        <p class="font-body text-lg text-ink-muted leading-8 max-w-4xl">${escapeHtml(topic.description)}</p>
        <div class="mt-8 flex flex-wrap gap-3 text-[0.65rem] font-sans uppercase tracking-[0.1em] text-ink-faint">
          ${(topic.keywords || []).slice(0, 6).map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}
        </div>
        <section class="mt-12">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Featured chapters</p>
          <ul class="list-none m-0 p-0">${renderFeaturedList(chapters)}</ul>
        </section>
        ${articles.length ? `
          <section class="mt-12">
            <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Current reporting</p>
            <ul class="list-none m-0 p-0 space-y-4">
              ${articles.map((article) => `
                <li class="border border-border bg-surface p-4">
                  <a href="/news/${escapeAttr(article.slug)}" class="block">
                    <h2 class="font-display text-2xl font-bold text-ink leading-tight">${escapeHtml(article.title)}</h2>
                    <p class="font-body text-sm text-ink-muted leading-7 mt-2">${escapeHtml(article.subtitle)}</p>
                  </a>
                </li>
              `).join('\n')}
            </ul>
          </section>` : ''}
        <section class="mt-12">
          <p class="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink-faint mb-3">Questions readers ask</p>
          <div class="space-y-4">
            ${topic.faq.map((entry) => `
              <div class="border border-border bg-surface p-4">
                <h3 class="font-display text-xl font-bold text-ink leading-tight">${escapeHtml(entry.question)}</h3>
                <p class="font-body text-sm text-ink-muted leading-7 mt-3">${escapeHtml(entry.answer)}</p>
              </div>
            `).join('\n')}
          </div>
        </section>
      </div>
    </main>`
}

function buildChapterJsonLd(chapter, image, publishedTime, modifiedTime) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: chapter.title,
      alternativeHeadline: chapter.subtitle,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      image,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      mainEntityOfPage: `${SITE_URL}/chapter/${chapter.id}`,
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
          name: 'Read The Record',
          item: `${SITE_URL}/read`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: chapter.title,
          item: `${SITE_URL}/chapter/${chapter.id}`,
        },
      ],
    },
  ]
}

function buildArticleJsonLd(article, publishedTime, modifiedTime) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      alternativeHeadline: article.subtitle,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      image: article.heroImage?.src || DEFAULT_OG_IMAGE,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
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

function buildInstituteCourseJsonLd(topic) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: topic.courseTitle,
      description: topic.summary,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      educationalLevel: topic.difficulty,
      teaches: [...(topic.keywords || []), ...(topic.tools || [])],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        timeRequired: topic.timeToFirstResult,
      },
      url: `${SITE_URL}/institute/courses/${topic.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the fastest way to start ${topic.skill}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${topic.firstAction} The first visible result should be ${topic.outcome} within ${topic.timeToFirstResult}.`,
          },
        },
      ],
    },
  ]
}

function buildInstituteGuideJsonLd(topic) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: topic.articleTitle,
      description: topic.summary,
      about: topic.skill,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      mainEntityOfPage: `${SITE_URL}/institute/guides/${topic.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: topic.articleTitle,
      description: topic.summary,
      totalTime: topic.timeToFirstResult,
      step: [
        {
          '@type': 'HowToStep',
          name: 'Start with the first action',
          text: topic.firstAction,
        },
      ],
    },
  ]
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
const institutePracticalTopics = filterPracticalInstituteTopics(instituteTopics)
const instituteResearchSources = parseInstituteResearchSources()

const staticPages = [
  {
    route: '/',
    title: 'The Record | Veritas Worldwide',
    heading: 'The Record',
    description: 'A documentary history of power, money, and the institutions that shaped the modern world.',
    body: [
      'Veritas Worldwide publishes longform investigative work built on primary sources, congressional records, court filings, declassified files, and public financial disclosures.',
      'Volume I spans 31 chapters and more than 500 source documents. Every chapter is available through a free reader account, with public previews and traceable citations.',
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
    title: 'Veritas Institute | Practical Skills Catalog, Guides, and Field Manual',
    heading: 'Veritas Institute',
    description: 'A source-backed field manual and practical course catalog covering trades, repair, preparedness, food resilience, and healthcare-support work.',
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
    title: 'Institute Methodology | Veritas Institute',
    heading: 'Institute Methodology',
    description: 'How Veritas Institute builds a practical field manual and course library from public safety guidance, licensing pathways, extension systems, and source-first editing.',
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
    sourceFile: 'src/pages/SourcesPage.tsx',
  },
  {
    route: '/search',
    title: 'Search | The Record - Veritas Worldwide',
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
    title: 'Timeline | Veritas Worldwide',
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
    title: 'Reader Analytics | Veritas Worldwide',
    heading: 'Reader Analytics',
    description: 'Public readership metrics for The Record and the broader Veritas publication footprint.',
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
    sourceFile: 'src/pages/AccessibilityPage.tsx',
  },
  {
    route: '/privacy',
    title: 'Privacy Policy | Veritas Worldwide',
    heading: 'Privacy Policy',
    description: 'How reader data, analytics, support flows, and subscriptions are handled across Veritas properties.',
    body: [
      'The publication minimizes data collection, keeps analytics purpose-specific, and avoids turning readership into an advertising product.',
    ],
    sourceFile: 'src/pages/PrivacyPage.tsx',
  },
  {
    route: '/terms',
    title: 'Terms of Use | Veritas Worldwide',
    heading: 'Terms of Use',
    description: 'Usage terms for The Record, supporting materials, and Veritas publication assets.',
    body: [
      'The publication is intended for public reading, citation, and responsible sharing. Source material remains attributable to its original creators and archives.',
    ],
    sourceFile: 'src/pages/TermsPage.tsx',
  },
  {
    route: '/israel-dossier',
    title: 'The Israel Dossier | Veritas Worldwide',
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
    title: 'Membership | Veritas Worldwide',
    heading: 'Support The Record',
    description: 'Membership and recurring support options that keep the documentary record free, open, and independent.',
    body: [
      'Support language remains humble by design. Readers fund the archive, document acquisition, and ongoing reporting without paywalling the core publication.',
    ],
    sourceFile: 'src/pages/MembershipPage.tsx',
  },
  {
    route: '/about',
    title: 'About | Veritas Worldwide',
    heading: 'About Veritas Worldwide',
    description: 'How Veritas Worldwide publishes, verifies claims, and keeps its trust layer public.',
    body: [
      'The about page explains the publication model directly: what The Record is, how evidence labels work, and how reader funding supports the archive without turning the methodology into a black box.',
    ],
    sourceFile: 'src/pages/AboutPage.tsx',
  },
  {
    route: '/deep-state',
    title: 'The Deep State - The Epstein Network | Veritas Worldwide',
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
    title: 'Read The Record | Veritas Worldwide',
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
    title: 'News | Veritas Worldwide',
    heading: 'Current Events',
    description: 'Source-first reporting on power, money, accountability, and the institutions shaping current events.',
    body: [
      'The news desk extends the methodology of The Record into live coverage, emphasizing primary documents, verified sourcing, and restrained editorial framing.',
    ],
    sourceFile: 'src/pages/NewsPage.tsx',
  },
  {
    route: '/content-pack',
    title: 'Content Packs & Brand Kit | Veritas Worldwide',
    heading: 'Content Packs & Brand Kit',
    description: 'Official Veritas Worldwide assets for press, advocacy, and social distribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/share',
    title: 'Content Packs & Brand Kit | Veritas Worldwide',
    heading: 'Content Packs & Brand Kit',
    description: 'Official Veritas Worldwide assets for press, advocacy, and social distribution.',
    body: [
      'Content packs are designed to preserve source integrity while making sharing easier across social, newsletter, and press contexts.',
    ],
    sourceFile: 'src/pages/ContentPackPage.tsx',
  },
  {
    route: '/forum',
    title: 'Veritas Forum | Veritas Worldwide',
    heading: 'Veritas Forum',
    description: 'Reader discussion around evidence, chapters, current reporting, and the documentary record.',
    body: [
      'The forum is built for accountable discussion around sourced material, not algorithmic outrage or engagement bait.',
    ],
    sourceFile: 'src/pages/ForumPage.tsx',
  },
  {
    route: '/profiles',
    title: 'Power Profiles | Veritas Worldwide',
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
  if (route === '/institute') body = renderInstituteIndexPage(institutePracticalTopics, instituteResearchSources)
  if (route === '/institute/book') body = renderInstituteBookPage(institutePracticalTopics, instituteResearchSources)
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
const llmsTxt = renderLlmsTxt(institutePracticalTopics)
const instituteMarkdown = renderInstituteMarkdown(institutePracticalTopics, instituteResearchSources)
fs.writeFileSync(distLlmsPath, llmsTxt)
fs.writeFileSync(sourceLlmsPath, llmsTxt)
fs.writeFileSync(distInstituteMarkdownPath, instituteMarkdown)
fs.writeFileSync(sourceInstituteMarkdownPath, instituteMarkdown)

console.log(`[prerender] Generated ${Object.keys(manifest).length} prerendered routes`)
console.log(`[prerender] Wrote sitemap with ${sitemapEntries.size} URLs`)
console.log('[prerender] Wrote llms.txt and veritas-institute.md')
