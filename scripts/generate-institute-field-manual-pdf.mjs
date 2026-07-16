#!/usr/bin/env node
/**
 * Build-time Veritas Institute Field Manual PDF.
 * Writes a durable static asset so readers do not depend on client-side jsPDF memory.
 *
 * Outputs (when parent dirs exist):
 *   - public/veritas-institute-field-manual.pdf  (source for Vite copy + local static)
 *   - dist/veritas-institute-field-manual.pdf    (production serve path after vite build)
 *   - generated/veritas-institute-field-manual.pdf (operator/verification artifact)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { buildInstituteFieldManualPdf } from '../src/lib/instituteFieldManualPdf.ts'
import {
  instituteFieldManualEntries,
  institutePracticalTopics,
  instituteResearchSources,
} from '../src/data/instituteCatalog.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const outputTargets = [
  path.join(repoRoot, 'public', 'veritas-institute-field-manual.pdf'),
  path.join(repoRoot, 'dist', 'veritas-institute-field-manual.pdf'),
  path.join(repoRoot, 'generated', 'veritas-institute-field-manual.pdf'),
]

function assert(condition, message) {
  if (!condition) {
    console.error(`[generate:institute-pdf] FAIL — ${message}`)
    process.exit(1)
  }
}

const doc = await buildInstituteFieldManualPdf()
const pageCount =
  typeof doc.getNumberOfPages === 'function' ? doc.getNumberOfPages() : doc.internal.getNumberOfPages()
const pdfBytes = Buffer.from(doc.output('arraybuffer'))

assert(instituteFieldManualEntries.length >= 25, 'expected at least 25 field manual entries')
assert(institutePracticalTopics.length >= 50, 'expected at least 50 practical course paths')
assert(instituteResearchSources.length >= 10, 'expected at least 10 source anchors')
assert(pageCount >= 35, `expected at least 35 PDF pages, got ${pageCount}`)
assert(pdfBytes.length >= 200_000, `expected PDF to be at least 200KB, got ${pdfBytes.length} bytes`)

const latin1 = pdfBytes.toString('latin1')
for (const marker of [
  'VERITAS INSTITUTE FIELD MANUAL',
  'Run a generator without poisoning the house',
  'QUICK REFERENCE BY CATEGORY',
  'RESEARCH SOURCES',
]) {
  assert(latin1.includes(marker), `missing PDF marker: ${marker}`)
}

const written = []
for (const target of outputTargets) {
  const parent = path.dirname(target)
  // dist/ may not exist when generating outside of a full build; skip then.
  if (parent.endsWith(`${path.sep}dist`) && !fs.existsSync(parent)) {
    continue
  }
  fs.mkdirSync(parent, { recursive: true })
  fs.writeFileSync(target, pdfBytes)
  written.push(path.relative(repoRoot, target))
}

assert(written.length > 0, 'no output paths were writable')

console.log(
  `[generate:institute-pdf] PASS — ${pageCount} pages, ${pdfBytes.length} bytes, wrote ${written.join(', ')}`
)
