#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

import {
  instituteFieldManualEntries,
  institutePracticalTopics,
  instituteResearchSources,
} from '../src/data/instituteCatalog.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const generateScript = path.join(repoRoot, 'scripts', 'generate-institute-field-manual-pdf.mjs')
const outputPath = path.join(repoRoot, 'generated', 'veritas-institute-field-manual.pdf')
const publicPath = path.join(repoRoot, 'public', 'veritas-institute-field-manual.pdf')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:institute-pdf] FAIL — ${message}`)
    process.exit(1)
  }
}

const generate = spawnSync(process.execPath, ['--experimental-strip-types', generateScript], {
  cwd: repoRoot,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
})

if (generate.status !== 0) {
  if (generate.stdout?.trim()) console.error(generate.stdout.trim())
  if (generate.stderr?.trim()) console.error(generate.stderr.trim())
  console.error('[verify:institute-pdf] FAIL — generator exited non-zero')
  process.exit(generate.status || 1)
}

assert(fs.existsSync(outputPath), `missing generated PDF at ${outputPath}`)
assert(fs.existsSync(publicPath), `missing public PDF at ${publicPath}`)

const pdfBytes = fs.readFileSync(outputPath)
const pdfLatin1 = pdfBytes.toString('latin1')
const requiredMarkers = [
  'VERITAS INSTITUTE FIELD MANUAL',
  'Run a generator without poisoning the house',
  'QUICK REFERENCE BY CATEGORY',
  'RESEARCH SOURCES',
]

assert(instituteFieldManualEntries.length >= 25, 'expected at least 25 field manual entries')
assert(institutePracticalTopics.length >= 50, 'expected at least 50 practical course paths')
assert(instituteResearchSources.length >= 10, 'expected at least 10 source anchors')
assert(pdfBytes.length >= 200_000, `expected PDF to be at least 200KB, got ${pdfBytes.length} bytes`)

for (const marker of requiredMarkers) {
  assert(pdfLatin1.includes(marker), `missing PDF marker: ${marker}`)
}

if (generate.stdout?.trim()) {
  console.log(generate.stdout.trim())
}

console.log(
  `[verify:institute-pdf] PASS — ${pdfBytes.length} bytes, ${instituteFieldManualEntries.length} field entries, public+generated assets present`
)
