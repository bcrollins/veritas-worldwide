#!/usr/bin/env node
/**
 * Verifies drop-cap PDF helper + web component contracts:
 * - split logic keeps first letter separate
 * - writeDropCapParagraph advances y and draws without throwing
 * - DropCapParagraph / ChapterPDF / DownloadPDF import the shared helper
 * - CSS uses span-based .drop-cap-letter (not broken first-letter alone)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

function fail(msg) {
  console.error(`[verify:dropcap-pdf] FAIL — ${msg}`)
  process.exit(1)
}

function assert(cond, msg) {
  if (!cond) fail(msg)
}

// Source contracts
const css = fs.readFileSync(path.join(root, 'src/styles/index.css'), 'utf8')
assert(css.includes('.drop-cap-letter'), 'CSS missing .drop-cap-letter')
assert(css.includes('display: flow-root'), 'CSS missing flow-root containment')
assert(css.includes('shape-outside'), 'CSS missing shape-outside for float clearance')

const dropComp = fs.readFileSync(path.join(root, 'src/components/DropCapParagraph.tsx'), 'utf8')
assert(dropComp.includes('drop-cap-letter'), 'DropCapParagraph missing letter span')
assert(dropComp.includes('splitDropCap'), 'DropCapParagraph missing split helper')

const chapterPage = fs.readFileSync(path.join(root, 'src/pages/ChapterPage.tsx'), 'utf8')
assert(chapterPage.includes('DropCapParagraph'), 'ChapterPage must use DropCapParagraph')
assert(!chapterPage.includes('className="article-body drop-cap mb-6"'), 'ChapterPage still uses bare drop-cap class')

const readBook = fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8')
assert(readBook.includes('DropCapParagraph'), 'ReadTheBookPage must use DropCapParagraph')
assert(!readBook.includes('first-letter:float-left'), 'ReadTheBookPage still uses broken first-letter utilities')

const chapterPdf = fs.readFileSync(path.join(root, 'src/components/ChapterPDF.tsx'), 'utf8')
assert(chapterPdf.includes('writeDropCapParagraph'), 'ChapterPDF must use writeDropCapParagraph')

const downloadPdf = fs.readFileSync(path.join(root, 'src/components/DownloadPDF.tsx'), 'utf8')
assert(downloadPdf.includes('writeDropCapParagraph'), 'DownloadPDF must use writeDropCapParagraph')

// Runtime: pdf helper with real jspdf
const { jsPDF } = require('jspdf')
const { pathToFileURL } = await import('node:url')

// Load TS helper via strip-types
const { spawnSync } = await import('node:child_process')
const probe = spawnSync(
  process.execPath,
  [
    '--experimental-strip-types',
    '--input-type=module',
    '-e',
    `
import { jsPDF } from 'jspdf';
import { writeDropCapParagraph } from './src/lib/pdfDropCap.ts';

const doc = new jsPDF({ unit: 'mm', format: 'a4' });
const r = writeDropCapParagraph({
  doc,
  text: 'Before proceeding, it is necessary to address a phrase that will occur to many readers upon encountering this book subject matter and the documented historical record of primary sources.',
  x: 28,
  y: 40,
  maxWidth: 154,
  bodyFontSize: 10,
  bodyLineHeight: 5.5,
  dropFontSize: 34,
  wrapLines: 3,
});
if (r.letter !== 'B') throw new Error('pdf letter=' + r.letter);
if (r.y <= 40) throw new Error('y did not advance');
if (r.linesBeside < 1) throw new Error('no beside lines');
// Second paragraph on same page
const r2 = writeDropCapParagraph({
  doc,
  text: 'On the morning of January 30, 1835, President Andrew Jackson was leaving the funeral.',
  x: 28,
  y: r.y + 6,
  maxWidth: 154,
});
if (r2.letter !== 'O') throw new Error('second letter=' + r2.letter);
const bytes = doc.output('arraybuffer');
if (!bytes || bytes.byteLength < 500) throw new Error('pdf too small');
console.log(JSON.stringify({ letter: r.letter, y: r.y, beside: r.linesBeside, full: r.linesFull, second: r2.letter, bytes: bytes.byteLength }));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (probe.status !== 0) {
  fail(`runtime probe failed:\n${probe.stderr || probe.stdout}`)
}
console.log(probe.stdout.trim())
console.log('[verify:dropcap-pdf] PASS')
