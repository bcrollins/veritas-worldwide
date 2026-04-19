#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST_ASSETS_DIR = path.join(ROOT_DIR, 'dist', 'assets')
const CHAPTER_LOADER_PREFIX = 'chapterLoaderHybrid-'
const FORBIDDEN_ASSET_PREFIXES = ['public-index-']
const MAX_CHAPTER_LOADER_BYTES = Number.parseInt(
  process.env.VERITAS_MAX_CHAPTER_LOADER_BYTES || `${100 * 1024}`,
  10,
)

function fail(message) {
  console.error(`[verify:bundle] FAIL — ${message}`)
  process.exit(1)
}

if (!fs.existsSync(DIST_ASSETS_DIR)) {
  fail(`Missing dist assets directory at ${DIST_ASSETS_DIR}. Run npm run build first.`)
}

const assetFileNames = fs.readdirSync(DIST_ASSETS_DIR)
const chapterLoaderFiles = assetFileNames.filter(
  (fileName) => fileName.startsWith(CHAPTER_LOADER_PREFIX) && fileName.endsWith('.js'),
)

if (chapterLoaderFiles.length === 0) {
  fail(`Could not find a ${CHAPTER_LOADER_PREFIX}*.js asset in ${DIST_ASSETS_DIR}.`)
}

const forbiddenAssets = assetFileNames.filter((fileName) =>
  FORBIDDEN_ASSET_PREFIXES.some((prefix) => fileName.startsWith(prefix)),
)

if (forbiddenAssets.length > 0) {
  fail(
    `Found forbidden generated-data asset(s) in dist/assets: ${forbiddenAssets.join(', ')}. Generated public chapter indexes must not ship in the production bundle.`,
  )
}

const oversizedFiles = chapterLoaderFiles
  .map((fileName) => {
    const filePath = path.join(DIST_ASSETS_DIR, fileName)
    const sizeBytes = fs.statSync(filePath).size
    return { fileName, sizeBytes }
  })
  .filter(({ sizeBytes }) => sizeBytes > MAX_CHAPTER_LOADER_BYTES)

if (oversizedFiles.length > 0) {
  const details = oversizedFiles
    .map(({ fileName, sizeBytes }) => `${fileName}=${sizeBytes} bytes`)
    .join(', ')
  fail(
    `Chapter loader bundle exceeded ${MAX_CHAPTER_LOADER_BYTES} bytes. ${details}. This usually means generated chapter fallback data was bundled eagerly again.`,
  )
}

const fileSummaries = chapterLoaderFiles
  .map((fileName) => {
    const sizeBytes = fs.statSync(path.join(DIST_ASSETS_DIR, fileName)).size
    return `${fileName}=${sizeBytes} bytes`
  })
  .join(', ')

console.log(`[verify:bundle] PASS — ${fileSummaries}`)
