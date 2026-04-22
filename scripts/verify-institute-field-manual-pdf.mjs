#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { buildInstituteFieldManualPdf } from '../src/lib/instituteFieldManualPdf.ts'
import { instituteFieldManualEntries, institutePracticalTopics, instituteResearchSources } from '../src/data/instituteCatalog.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outputDir = path.join(repoRoot, 'generated')
const outputPath = path.join(outputDir, 'veritas-institute-field-manual.pdf')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:institute-pdf] FAIL — ${message}`)
    process.exit(1)
  }
}

fs.mkdirSync(outputDir, { recursive: true })

const doc = await buildInstituteFieldManualPdf()
const pageCount = typeof doc.getNumberOfPages === 'function' ? doc.getNumberOfPages() : doc.internal.getNumberOfPages()
const pdfBytes = Buffer.from(doc.output('arraybuffer'))
fs.writeFileSync(outputPath, pdfBytes)

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
assert(pageCount >= 35, `expected at least 35 PDF pages, got ${pageCount}`)
assert(pdfBytes.length >= 200_000, `expected PDF to be at least 200KB, got ${pdfBytes.length} bytes`)

for (const marker of requiredMarkers) {
  assert(pdfLatin1.includes(marker), `missing PDF marker: ${marker}`)
}

console.log(
  `[verify:institute-pdf] PASS — ${pageCount} pages, ${pdfBytes.length} bytes, ${instituteFieldManualEntries.length} field entries, output ${outputPath}`
)
