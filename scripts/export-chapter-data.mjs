#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { pathToFileURL } from 'url'

const PREVIEW_BLOCK_LIMIT = 3
const EVIDENCE_TIER_ORDER = ['verified', 'circumstantial', 'disputed']
const SOURCE_HIERARCHY_KEYS = ['primary', 'peerReviewed', 'verifiedJournalism', 'secondary']
const repoRoot = process.cwd()
const generatedRoot = path.join(repoRoot, 'generated', 'chapter-data')
const tempRoot = path.join(repoRoot, 'generated', '.chapter-temp')
const chapterDir = path.join(repoRoot, 'src', 'data', 'chapters')
const chapterMetaFile = path.join(repoRoot, 'src', 'data', 'chapterMeta.ts')

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

function classifySourceHierarchy(source) {
  const haystack = `${source.text} ${source.url || ''}`.toLowerCase()

  if (/(congress|senate|house of representatives|congressional|court|supreme court|district court|executive order|federal register|national archives|archives\.gov|sec filing|sec\.gov|edgar|gao|government accountability office|cia|reading room|readingroom|fbi vault|presidential library|declassified|committee hearing|hearing|treasury|department of justice|state department|white house|federal reserve)/.test(haystack)) {
    return 'primary'
  }

  if (/(peer-reviewed|peer reviewed|journal|doctoral|dissertation|thesis|university press|oxford university press|cambridge university press|cornell university press|harvard university press|stanford university press|university of chicago press|academic)/.test(haystack)) {
    return 'peerReviewed'
  }

  if (/(new york times|nyt|washington post|wall street journal|wsj|reuters|associated press|ap news|bloomberg|propublica|the guardian|guardian|investigative reporting|open secrets|opensecrets|documented by journalists|journalism)/.test(haystack)) {
    return 'verifiedJournalism'
  }

  return 'secondary'
}

function getSourceHierarchyCounts(sources) {
  const counts = { primary: 0, peerReviewed: 0, verifiedJournalism: 0, secondary: 0 }

  for (const source of sources) {
    counts[source.hierarchy] += 1
  }

  return counts
}

function withDerivedMetadata(chapter) {
  const sources = chapter.sources.map((source) => ({
    ...source,
    hierarchy: classifySourceHierarchy(source),
  }))

  return {
    ...chapter,
    sources,
    sourceCount: sources.length,
    videoCount: getVideoCount(chapter),
    sourceHierarchyCounts: getSourceHierarchyCounts(sources),
    availableEvidenceTiers: getAvailableEvidenceTiers(chapter),
    chapterType: classifyChapterType(chapter),
  }
}

async function importTsModule(filePath, tempName) {
  const source = fs.readFileSync(filePath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2020,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: path.basename(filePath),
  }).outputText

  const tempPath = path.join(tempRoot, tempName)
  fs.writeFileSync(tempPath, transpiled, 'utf8')
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

  const chapterMetaModule = await importTsModule(chapterMetaFile, 'chapterMeta.mjs')
  const chapterOrder = chapterMetaModule.chapterMeta.map((chapter) => chapter.id)

  const chapterFiles = fs.readdirSync(chapterDir)
    .filter((name) => name.endsWith('.ts'))
    .sort((a, b) => chapterOrder.indexOf(a.replace(/\.ts$/, '')) - chapterOrder.indexOf(b.replace(/\.ts$/, '')))

  const publicChapters = []

  for (const fileName of chapterFiles) {
    const filePath = path.join(chapterDir, fileName)
    const chapterModule = await importTsModule(filePath, fileName.replace(/\.ts$/, '.mjs'))
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
