#!/usr/bin/env node
/**
 * Export per-article bot/OG metadata for server-side crawler injection.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = process.cwd()
const tempRoot = path.join(root, 'generated', '.news-meta-temp')
const outPath = path.join(root, 'public', 'news', 'meta.json')
const distPath = path.join(root, 'dist', 'news', 'meta.json')
const entryFile = path.join(root, 'src', 'data', 'articles.ts')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function getTempModulePath(filePath) {
  const relativePath = path.relative(root, filePath)
  return path.join(tempRoot, relativePath).replace(/\.(ts|tsx)$/, '.js')
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

function emitTsModuleGraph(entryFilePath) {
  const program = ts.createProgram([entryFilePath], {
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    rootDir: root,
    outDir: tempRoot,
    skipLibCheck: true,
  })
  const { diagnostics, emitSkipped } = program.emit()
  if (emitSkipped) {
    const messages = diagnostics.map((d) =>
      typeof d.messageText === 'string' ? d.messageText : d.messageText.messageText,
    )
    throw new Error(messages.join(' | '))
  }
  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    if (!sourceFile.fileName.startsWith(root)) continue
    if (!/\.(ts|tsx)$/.test(sourceFile.fileName)) continue
    const emittedPath = getTempModulePath(sourceFile.fileName)
    if (fs.existsSync(emittedPath)) rewriteRelativeImportSpecifiers(emittedPath)
  }
}

async function main() {
  ensureDir(tempRoot)
  ensureDir(path.dirname(outPath))
  emitTsModuleGraph(entryFile)
  const mod = await import(`${pathToFileURL(getTempModulePath(entryFile)).href}?v=${Date.now()}`)
  const articles = mod.allArticles || []
  const meta = {}
  for (const article of articles) {
    if (!article?.slug) continue
    const src = article.heroImage?.src || '/og-image.png'
    const image = src.startsWith('http')
      ? src
      : `https://veritasworldwide.com${src.startsWith('/') ? '' : '/'}${src}`
    meta[article.slug] = {
      title: article.seo?.metaTitle || `${article.title} | Veritas Worldwide`,
      desc: article.seo?.metaDescription || article.subtitle || '',
      image,
      type: 'article',
    }
  }
  const body = `${JSON.stringify(meta, null, 2)}\n`
  fs.writeFileSync(outPath, body)
  if (fs.existsSync(path.join(root, 'dist'))) {
    ensureDir(path.dirname(distPath))
    fs.writeFileSync(distPath, body)
  }
  console.log(`[export-news-meta] wrote ${outPath} · articles=${Object.keys(meta).length}`)
}

main().catch((error) => {
  console.error('[export-news-meta] FAIL', error)
  process.exit(1)
})
