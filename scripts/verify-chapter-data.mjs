#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()
const generatedRoot = path.join(repoRoot, 'generated', 'chapter-data')
const publicDir = path.join(generatedRoot, 'public')
const fullDir = path.join(generatedRoot, 'full')
const publicIndexPath = path.join(generatedRoot, 'public-index.json')
const manifestPath = path.join(generatedRoot, 'manifest.json')
const evidenceTiers = ['verified', 'circumstantial', 'disputed']

function fail(message) {
  console.error(`[verify:chapter-data] FAIL - ${message}`)
  process.exit(1)
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing ${path.relative(repoRoot, filePath)}`)
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    fail(`Invalid JSON in ${path.relative(repoRoot, filePath)}: ${error.message}`)
  }
}

function isValidEvidenceCounts(value) {
  return value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    evidenceTiers.every((tier) => Number.isInteger(value[tier]) && value[tier] >= 0)
}

function evidenceBlockCounts(chapter) {
  const counts = { verified: 0, circumstantial: 0, disputed: 0 }

  for (const block of chapter.content || []) {
    const tier = block?.evidence?.tier
    if (evidenceTiers.includes(tier)) {
      counts[tier] += 1
    }
  }

  return counts
}

function countsEqual(left, right) {
  return evidenceTiers.every((tier) => left[tier] === right[tier])
}

const manifest = readJson(manifestPath)
const publicIndex = readJson(publicIndexPath)

if (!Array.isArray(manifest.chapterIds) || manifest.chapterIds.length === 0) {
  fail('Manifest does not contain chapterIds')
}

if (!Array.isArray(publicIndex) || publicIndex.length !== manifest.chapterIds.length) {
  fail(`public-index length ${Array.isArray(publicIndex) ? publicIndex.length : 'invalid'} does not match manifest chapter count ${manifest.chapterIds.length}`)
}

const publicIndexById = new Map(publicIndex.map((chapter) => [chapter?.id, chapter]))
const missingCounts = []
const mismatchedCounts = []
const missingPublicSources = []

for (const chapterId of manifest.chapterIds) {
  const publicChapter = readJson(path.join(publicDir, `${chapterId}.json`))
  const fullChapter = readJson(path.join(fullDir, `${chapterId}.json`))
  const indexChapter = publicIndexById.get(chapterId)

  if (!indexChapter) {
    missingCounts.push(`${chapterId}: missing from public-index`)
    continue
  }

  for (const [scope, chapter] of [
    ['public', publicChapter],
    ['full', fullChapter],
    ['public-index', indexChapter],
  ]) {
    if (!isValidEvidenceCounts(chapter.evidenceCounts)) {
      missingCounts.push(`${chapterId}: ${scope} evidenceCounts missing or invalid`)
    }
  }

  if (!Array.isArray(publicChapter.content) || publicChapter.content.length !== fullChapter.totalBlocks) {
    mismatchedCounts.push(`${chapterId}: public JSON content length ${Array.isArray(publicChapter.content) ? publicChapter.content.length : 'invalid'} does not match totalBlocks ${fullChapter.totalBlocks}`)
  }

  if (publicChapter.accessLevel !== 'full' || indexChapter.accessLevel !== 'full') {
    mismatchedCounts.push(`${chapterId}: public accessLevel is not full`)
  }

  if (publicChapter.previewBlockLimit !== 0 || indexChapter.previewBlockLimit !== 0) {
    mismatchedCounts.push(`${chapterId}: public previewBlockLimit is not 0`)
  }

  if (!Array.isArray(publicChapter.sources) || publicChapter.sources.length !== fullChapter.sources.length) {
    missingPublicSources.push(`${chapterId}: public JSON source count ${Array.isArray(publicChapter.sources) ? publicChapter.sources.length : 'invalid'} does not match full source count ${fullChapter.sources.length}`)
  }

  if (!Array.isArray(indexChapter.sources) || indexChapter.sources.length !== fullChapter.sources.length) {
    missingPublicSources.push(`${chapterId}: public index source count ${Array.isArray(indexChapter.sources) ? indexChapter.sources.length : 'invalid'} does not match full source count ${fullChapter.sources.length}`)
  }

  const fullBlockCounts = evidenceBlockCounts(fullChapter)
  if (isValidEvidenceCounts(fullChapter.evidenceCounts) && !countsEqual(fullBlockCounts, fullChapter.evidenceCounts)) {
    mismatchedCounts.push(`${chapterId}: full counts ${JSON.stringify(fullChapter.evidenceCounts)} do not match full content ${JSON.stringify(fullBlockCounts)}`)
  }

  if (isValidEvidenceCounts(publicChapter.evidenceCounts) && !countsEqual(publicChapter.evidenceCounts, fullChapter.evidenceCounts)) {
    mismatchedCounts.push(`${chapterId}: public counts ${JSON.stringify(publicChapter.evidenceCounts)} do not match full counts ${JSON.stringify(fullChapter.evidenceCounts)}`)
  }

  if (isValidEvidenceCounts(indexChapter.evidenceCounts) && !countsEqual(indexChapter.evidenceCounts, fullChapter.evidenceCounts)) {
    mismatchedCounts.push(`${chapterId}: public-index counts ${JSON.stringify(indexChapter.evidenceCounts)} do not match full counts ${JSON.stringify(fullChapter.evidenceCounts)}`)
  }
}

if (missingCounts.length > 0) {
  fail(missingCounts.join('; '))
}

if (mismatchedCounts.length > 0) {
  fail(mismatchedCounts.join('; '))
}

if (missingPublicSources.length > 0) {
  fail(missingPublicSources.join('; '))
}

const chaptersWithInterpretiveEvidence = publicIndex.filter((chapter) =>
  (chapter.evidenceCounts?.circumstantial || 0) > 0 || (chapter.evidenceCounts?.disputed || 0) > 0
)

if (chaptersWithInterpretiveEvidence.length === 0) {
  fail('No public chapters expose interpretive evidence counts; interpretation-boundary notices cannot render from preview payloads')
}

console.log(
  `[verify:chapter-data] PASS - ${manifest.chapterIds.length} public chapter records expose full bodies, source rows, and valid evidenceCounts; ${chaptersWithInterpretiveEvidence.length} records carry interpretive-evidence guardrail data`
)
