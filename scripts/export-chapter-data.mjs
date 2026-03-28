#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { pathToFileURL } from 'url'

const PREVIEW_BLOCK_LIMIT = 3
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
  return {
    ...chapter,
    content: chapter.content.slice(0, PREVIEW_BLOCK_LIMIT),
    accessLevel: 'preview',
    previewBlockLimit: PREVIEW_BLOCK_LIMIT,
    totalBlocks: chapter.content.length,
  }
}

function toFullChapter(chapter) {
  return {
    ...chapter,
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
