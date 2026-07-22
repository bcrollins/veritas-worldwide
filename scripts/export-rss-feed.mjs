#!/usr/bin/env node
/**
 * Rebuild public/feed.xml with chapter archive + current-events news items.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = process.cwd()
const tempRoot = path.join(root, 'generated', '.rss-temp')
const outPath = path.join(root, 'public', 'feed.xml')
const distPath = path.join(root, 'dist', 'feed.xml')
const SITE = 'https://veritasworldwide.com'

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function getTempModulePath(filePath) {
  return path.join(tempRoot, path.relative(root, filePath)).replace(/\.(ts|tsx)$/, '.js')
}

function rewriteRelativeImportSpecifiers(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const rewritten = source.replace(
    /((?:import|export)\s[\s\S]*?\sfrom\s*['"]|import\(\s*['"])(\.\.?\/[^'")]+)(['"]\s*\)?)/g,
    (match, prefix, specifier, suffix) => {
      if (path.extname(specifier)) return match
      return `${prefix}${specifier}.js${suffix}`
    },
  )
  if (rewritten !== source) fs.writeFileSync(filePath, rewritten, 'utf8')
}

function emitTs(entry) {
  const program = ts.createProgram([entry], {
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    rootDir: root,
    outDir: tempRoot,
    skipLibCheck: true,
  })
  const { emitSkipped, diagnostics } = program.emit()
  if (emitSkipped) {
    throw new Error(diagnostics.map((d) => (typeof d.messageText === 'string' ? d.messageText : d.messageText.messageText)).join(' | '))
  }
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    if (!sourceFile.fileName.startsWith(root)) continue
    if (!/\.(ts|tsx)$/.test(sourceFile.fileName)) continue
    const emitted = getTempModulePath(sourceFile.fileName)
    if (fs.existsSync(emitted)) rewriteRelativeImportSpecifiers(emitted)
  }
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rfc822(dateLike) {
  const d = dateLike ? new Date(dateLike) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toUTCString()
  return d.toUTCString()
}

function itemXml({ title, link, description, pubDate, enclosure }) {
  const parts = [
    '    <item>',
    `      <title>${escapeXml(title)}</title>`,
    `      <link>${escapeXml(link)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `      <description>${escapeXml(description)}</description>`,
    `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
  ]
  if (enclosure?.url) {
    parts.push(
      `      <enclosure url="${escapeXml(enclosure.url)}" length="${enclosure.length || 0}" type="${escapeXml(enclosure.type || 'image/jpeg')}" />`,
    )
  }
  parts.push('    </item>')
  return parts.join('\n')
}

async function main() {
  ensureDir(tempRoot)
  const articlesEntry = path.join(root, 'src/data/articles.ts')
  const chaptersEntry = path.join(root, 'src/data/chapterMeta.ts')
  emitTs(articlesEntry)
  emitTs(chaptersEntry)
  const articlesMod = await import(`${pathToFileURL(getTempModulePath(articlesEntry)).href}?v=${Date.now()}`)
  const chaptersMod = await import(`${pathToFileURL(getTempModulePath(chaptersEntry)).href}?v=${Date.now()}`)
  const articles = articlesMod.allArticles || []
  const chapters = chaptersMod.chapterMeta || []

  const now = new Date().toUTCString()
  const items = []

  // Field manual
  const pdfPath = path.join(root, 'public', 'veritas-institute-field-manual.pdf')
  const pdfLen = fs.existsSync(pdfPath) ? fs.statSync(pdfPath).size : 0
  items.push(
    itemXml({
      title: 'Veritas Institute Field Manual (PDF)',
      link: `${SITE}/veritas-institute-field-manual.pdf`,
      description:
        'Build-time durable PDF of the Veritas Institute field manual: urgent household and roadside protocols plus practical course paths, source-anchored for print and offline use.',
      pubDate: now,
      enclosure: {
        url: `${SITE}/veritas-institute-field-manual.pdf`,
        length: pdfLen,
        type: 'application/pdf',
      },
    }),
  )

  // News first (current events)
  for (const article of articles) {
    const hero = article.heroImage?.src || '/og-image.png'
    const heroAbs = hero.startsWith('http') ? hero : `${SITE}${hero.startsWith('/') ? '' : '/'}${hero}`
    const heroDisk = hero.startsWith('/') ? path.join(root, 'public', hero.slice(1)) : null
    const heroLen = heroDisk && fs.existsSync(heroDisk) ? fs.statSync(heroDisk).size : 0
    items.push(
      itemXml({
        title: article.title,
        link: `${SITE}/news/${article.slug}`,
        description: article.subtitle || article.seo?.metaDescription || '',
        pubDate: rfc822(article.publishDate),
        enclosure: heroLen
          ? { url: heroAbs, length: heroLen, type: 'image/jpeg' }
          : undefined,
      }),
    )
  }

  // Archive chapters
  for (const chapter of chapters) {
    items.push(
      itemXml({
        title: chapter.title,
        link: `${SITE}/chapter/${chapter.id}`,
        description: chapter.subtitle || '',
        pubDate: rfc822(chapter.publishDate || '2026-03-01'),
      }),
    )
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Record — Veritas Worldwide</title>
    <link>${SITE}</link>
    <description>A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. Primary Sources. Public Record. Your Conclusions.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/og-image.png</url>
      <title>The Record — Veritas Worldwide</title>
      <link>${SITE}</link>
    </image>

${items.join('\n')}
  </channel>
</rss>
`
  fs.writeFileSync(outPath, xml)
  if (fs.existsSync(path.join(root, 'dist'))) {
    fs.writeFileSync(distPath, xml)
  }
  console.log(`[export-rss-feed] wrote ${outPath} · items=${items.length} (news=${articles.length} chapters=${chapters.length})`)
}

main().catch((error) => {
  console.error('[export-rss-feed] FAIL', error)
  process.exit(1)
})
