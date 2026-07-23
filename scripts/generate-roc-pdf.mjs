/**
 * Build-time PDF for The Record of Jesus Christ claim index.
 * Reads public/record-of-jesus-christ/corpus.json (run export:roc-corpus first).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { jsPDF } from 'jspdf'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const corpusPath = path.join(root, 'public/record-of-jesus-christ/corpus.json')

if (!fs.existsSync(corpusPath)) {
  console.error('[generate-roc-pdf] missing corpus.json — run npm run export:roc-corpus first')
  process.exit(1)
}

const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'))
const claims = corpus.claims || []
if (claims.length < 50) {
  console.error('[generate-roc-pdf] too few claims:', claims.length)
  process.exit(1)
}

const doc = new jsPDF({ unit: 'pt', format: 'letter' })
const margin = 54
const pageW = doc.internal.pageSize.getWidth()
const pageH = doc.internal.pageSize.getHeight()
const maxW = pageW - margin * 2
let y = margin

function newPage() {
  doc.addPage()
  y = margin
}

function ensureSpace(h) {
  if (y + h > pageH - margin) newPage()
}

function wrap(text, size = 10) {
  doc.setFontSize(size)
  return doc.splitTextToSize(String(text || ''), maxW)
}

// Cover
doc.setFont('times', 'bold')
doc.setFontSize(22)
doc.text('The Record of Jesus Christ', margin, y)
y += 28
doc.setFont('times', 'normal')
doc.setFontSize(12)
doc.text('Pure evidentiary claim index', margin, y)
y += 18
doc.setFontSize(10)
doc.setTextColor(100)
doc.text('Publisher: Veritas Worldwide · Entity attribution only', margin, y)
y += 14
doc.text(`Generated: ${corpus.generatedAt || new Date().toISOString()}`, margin, y)
y += 14
doc.text(`Claims: ${corpus.claimCount} · Tiers: ${JSON.stringify(corpus.tierHistogram || {})}`, margin, y)
y += 20
doc.setTextColor(0)
const intro = wrap(
  'Every claim is labeled by evidence tier. Proof-grade data is never conflated with literary or theological development. This PDF is a portable index; the live platform at veritasworldwide.com/record-of-jesus-christ remains the canonical interactive surface.',
  10,
)
doc.text(intro, margin, y)
y += intro.length * 12 + 16

doc.setFont('times', 'bold')
doc.setFontSize(11)
doc.text('Methodology (summary)', margin, y)
y += 16
doc.setFont('times', 'normal')
doc.setFontSize(9)
const method = wrap(
  'Tiers: Verified · Well-Attested · Circumstantial · Contested · Interpretive · Speculative · Literary/Theological. Tools: multiple attestation, Nestle-Aland/UBS standards, archaeological dating with ranges, observational cosmology as science only.',
  9,
)
doc.text(method, margin, y)
y += method.length * 11 + 20

// Claims
for (const c of claims) {
  const titleLines = wrap(`[${c.tier}] ${c.id}`, 10)
  const bodyLines = wrap(c.claim, 10)
  const need = (titleLines.length + bodyLines.length) * 12 + 18
  ensureSpace(need)
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120)
  doc.text(titleLines, margin, y)
  y += titleLines.length * 10 + 2
  doc.setFont('times', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(20)
  doc.text(bodyLines, margin, y)
  y += bodyLines.length * 12 + 10
}

// Footer page numbers
const pages = doc.getNumberOfPages()
for (let i = 1; i <= pages; i++) {
  doc.setPage(i)
  doc.setFontSize(8)
  doc.setTextColor(140)
  doc.text(
    `Veritas Worldwide · Record of Jesus Christ · ${i}/${pages}`,
    margin,
    pageH - 28,
  )
}

const outPaths = [
  path.join(root, 'public/record-of-jesus-christ/record-of-jesus-christ.pdf'),
  path.join(root, 'dist/record-of-jesus-christ/record-of-jesus-christ.pdf'),
  path.join(root, 'generated/record-of-jesus-christ.pdf'),
]

const buf = Buffer.from(doc.output('arraybuffer'))
for (const p of outPaths) {
  fs.mkdirSync(path.dirname(p), { recursive: true })
  // only write dist if dist root exists
  if (p.includes(`${path.sep}dist${path.sep}`) && !fs.existsSync(path.join(root, 'dist'))) continue
  fs.writeFileSync(p, buf)
  console.log('[generate-roc-pdf] wrote', path.relative(root, p), buf.length, 'bytes')
}

console.log(`[generate-roc-pdf] PASS — ${claims.length} claims, ${pages} pages`)
