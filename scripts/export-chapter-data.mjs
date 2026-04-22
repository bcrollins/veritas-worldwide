#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { pathToFileURL } from 'url'

const PREVIEW_BLOCK_LIMIT = 3
const EVIDENCE_TIER_ORDER = ['verified', 'circumstantial', 'disputed']
const repoRoot = process.cwd()
const generatedRoot = path.join(repoRoot, 'generated', 'chapter-data')
const tempRoot = path.join(repoRoot, 'generated', '.chapter-temp')
const chapterDir = path.join(repoRoot, 'src', 'data', 'chapters')
const chapterMetaFile = path.join(repoRoot, 'src', 'data', 'chapterMeta.ts')
const sourceHierarchyFile = path.join(repoRoot, 'src', 'data', 'sourceHierarchy.ts')

let sourceHierarchyUtils = null
const emittedModuleCache = new Map()

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function getVideoCount(chapter) {
  return chapter.content.filter((block) => block.type === 'video').length
}

function classifyChapterType(chapter) {
  if (chapter.chapterType) {
    return chapter.chapterType
  }

  if (['foreword', 'overview', 'epilogue'].includes(chapter.id)) {
    return 'reference'
  }

  const typeText = `${chapter.number} ${chapter.title} ${chapter.subtitle} ${chapter.dateRange}`.toLowerCase()
  if (chapter.dateRange === 'Explainer' || /explainer|how .* works|methodology/.test(typeText)) {
    return 'explainer'
  }

  return 'investigation'
}

function getAvailableEvidenceTiers(chapter) {
  const tiers = new Set()
  for (const block of chapter.content) {
    if (block.type === 'evidence' && block.evidence?.tier) {
      tiers.add(block.evidence.tier)
    }
  }
  return EVIDENCE_TIER_ORDER.filter((tier) => tiers.has(tier))
}

function getEvidenceCounts(chapter) {
  const counts = {
    verified: 0,
    circumstantial: 0,
    disputed: 0,
  }

  for (const block of chapter.content) {
    if (block.type === 'evidence' && block.evidence?.tier && block.evidence.tier in counts) {
      counts[block.evidence.tier] += 1
    }
  }

  return counts
}

function getSourceHierarchyUtils() {
  if (!sourceHierarchyUtils) {
    throw new Error('[chapter-data] Source hierarchy utilities were not loaded')
  }

  return sourceHierarchyUtils
}

function getSourceHierarchyCounts(sources) {
  const { createEmptySourceHierarchyCounts } = getSourceHierarchyUtils()
  const counts = createEmptySourceHierarchyCounts()

  for (const source of sources) {
    counts[source.hierarchy] += 1
  }

  return counts
}

function withDerivedMetadata(chapter) {
  const { normalizeSourceHierarchy } = getSourceHierarchyUtils()
  const sources = chapter.sources.map((source) => ({
    ...source,
    hierarchy: normalizeSourceHierarchy(source),
  }))

  return {
    ...chapter,
    sources,
    sourceCount: sources.length,
    videoCount: getVideoCount(chapter),
    sourceHierarchyCounts: getSourceHierarchyCounts(sources),
    availableEvidenceTiers: getAvailableEvidenceTiers(chapter),
    evidenceCounts: getEvidenceCounts(chapter),
    chapterType: classifyChapterType(chapter),
  }
}

function getTempModulePath(filePath) {
  const relativePath = path.relative(repoRoot, filePath)
  return path.join(tempRoot, relativePath).replace(/\.(ts|tsx)$/, '.js')
}

function rewriteRelativeImportSpecifiers(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const rewritten = source.replace(
    /((?:import|export)\s[\s\S]*?\sfrom\s*['"]|import\(\s*['"])(\.\.?\/[^'")]+)(['"]\s*\)?)/g,
    (match, prefix, specifier, suffix) => {
      if (path.extname(specifier)) return match
      return `${prefix}${specifier}.js${suffix}`
    }
  )

  if (rewritten !== source) {
    fs.writeFileSync(filePath, rewritten, 'utf8')
  }
}

function emitTsModuleGraph(entryFilePath) {
  const program = ts.createProgram([entryFilePath], {
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    rootDir: repoRoot,
    outDir: tempRoot,
    rewriteRelativeImportExtensions: true,
    esModuleInterop: false,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
  })

  const { diagnostics, emitSkipped } = program.emit()

  if (emitSkipped) {
    const messages = diagnostics.map((diagnostic) =>
      typeof diagnostic.messageText === 'string'
        ? diagnostic.messageText
        : diagnostic.messageText.messageText
    )
    throw new Error(`[chapter-data] Failed to emit TS module graph for ${entryFilePath}: ${messages.join(' | ')}`)
  }

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    if (!sourceFile.fileName.startsWith(repoRoot)) continue
    if (!/\.(ts|tsx)$/.test(sourceFile.fileName)) continue

    const emittedPath = getTempModulePath(sourceFile.fileName)
    if (fs.existsSync(emittedPath)) {
      rewriteRelativeImportSpecifiers(emittedPath)
    }
  }
}

async function importTsModule(filePath) {
  if (!emittedModuleCache.has(filePath)) {
    emitTsModuleGraph(filePath)
    emittedModuleCache.set(filePath, getTempModulePath(filePath))
  }

  const tempPath = emittedModuleCache.get(filePath)
  return import(`${pathToFileURL(tempPath).href}?v=${Date.now()}-${Math.random()}`)
}

function toPublicChapter(chapter) {
  const chapterWithMetadata = withDerivedMetadata(chapter)

  return {
    ...chapterWithMetadata,
    content: chapter.content.slice(0, PREVIEW_BLOCK_LIMIT),
    sources: [],
    accessLevel: 'preview',
    previewBlockLimit: PREVIEW_BLOCK_LIMIT,
    totalBlocks: chapter.content.length,
  }
}

function toFullChapter(chapter) {
  const chapterWithMetadata = withDerivedMetadata(chapter)
  return {
    ...chapterWithMetadata,
    accessLevel: 'full',
    previewBlockLimit: PREVIEW_BLOCK_LIMIT,
    totalBlocks: chapter.content.length,
  }
}

async function main() {
  ensureDir(generatedRoot)
  ensureDir(tempRoot)
  ensureDir(path.join(generatedRoot, 'public'))
  ensureDir(path.join(generatedRoot, 'full'))

  sourceHierarchyUtils = await importTsModule(sourceHierarchyFile)
  const chapterMetaModule = await importTsModule(chapterMetaFile)
  const chapterOrder = chapterMetaModule.chapterMeta.map((chapter) => chapter.id)

  const chapterFiles = fs.readdirSync(chapterDir)
    .filter((name) => name.endsWith('.ts'))
    .sort((a, b) => chapterOrder.indexOf(a.replace(/\.ts$/, '')) - chapterOrder.indexOf(b.replace(/\.ts$/, '')))

  const publicChapters = []

  for (const fileName of chapterFiles) {
    const filePath = path.join(chapterDir, fileName)
    const chapterModule = await importTsModule(filePath)
    const chapter = chapterModule.default
    const publicChapter = toPublicChapter(chapter)
    const fullChapter = toFullChapter(chapter)

    publicChapters.push(publicChapter)

    writeJson(path.join(generatedRoot, 'public', `${chapter.id}.json`), publicChapter)
    writeJson(path.join(generatedRoot, 'full', `${chapter.id}.json`), fullChapter)
  }

  writeJson(path.join(generatedRoot, 'public-index.json'), publicChapters)
  writeJson(path.join(generatedRoot, 'manifest.json'), {
    previewBlockLimit: PREVIEW_BLOCK_LIMIT,
    chapterIds: publicChapters.map((chapter) => chapter.id),
    generatedAt: new Date().toISOString(),
  })
}

main().catch((error) => {
  console.error('[chapter-data] Failed to export chapter data:', error)
  process.exit(1)
})
