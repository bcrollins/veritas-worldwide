#!/usr/bin/env node
/**
 * Auto-bump public GEO/copy floors when ROC claimCount crosses decade boundaries.
 * Reads public/record-of-jesus-christ/corpus.json (or soft-floor.json).
 * Attribution: Veritas Worldwide only.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function readClaimCount() {
  const corpusPath = path.join(root, 'public/record-of-jesus-christ/corpus.json')
  const softPath = path.join(root, 'public/record-of-jesus-christ/soft-floor.json')
  if (fs.existsSync(corpusPath)) {
    const j = JSON.parse(fs.readFileSync(corpusPath, 'utf8'))
    if (typeof j.claimCount === 'number') return j.claimCount
  }
  if (fs.existsSync(softPath)) {
    const j = JSON.parse(fs.readFileSync(softPath, 'utf8'))
    if (typeof j.claimCount === 'number') return j.claimCount
  }
  throw new Error('[sync-roc-geo-floors] no corpus/soft-floor claimCount')
}

const claimCount = readClaimCount()
// Advertise floor: largest decade-aligned N+ that is ≤ claimCount (e.g. 651 → 650+)
const floor = Math.floor(claimCount / 10) * 10
const floorLabel = `${floor}+`

const targets = [
  {
    file: path.join(root, 'public/llms.txt'),
    // Match "NNN+ tier-labeled" near ROC language
    re: /(\d{3})\+\s*tier-labeled claims/g,
    // Only rewrite lines that mention Record of Jesus / corpus depth
    lineFilter: (line) =>
      /record-of-jesus-christ|Record of Jesus|tier-labeled claims/i.test(line),
  },
  {
    file: path.join(root, 'src/pages/HomePage.tsx'),
    re: /(\d{3})\+\s*tier-labeled claims/g,
    lineFilter: () => true,
  },
  {
    file: path.join(root, 'src/pages/SourcesPage.tsx'),
    re: /(\d{3})\+\s*tier-labeled claims/g,
    lineFilter: () => true,
  },
  {
    file: path.join(root, 'scripts/prerender.mjs'),
    re: /(\d{3})\+\s*tier-labeled claims/g,
    lineFilter: (line) =>
      /record-of-jesus|Record of Jesus|historical Jesus|corpus\.json|tier-labeled claims/i.test(line),
  },
]

let total = 0
for (const t of targets) {
  if (!fs.existsSync(t.file)) {
    console.warn('[sync-roc-geo-floors] skip missing', path.relative(root, t.file))
    continue
  }
  const raw = fs.readFileSync(t.file, 'utf8')
  const lines = raw.split('\n')
  let fileHits = 0
  const out = lines
    .map((line) => {
      if (!t.lineFilter(line)) return line
      if (!t.re.test(line)) return line
      t.re.lastIndex = 0
      const next = line.replace(t.re, `${floorLabel} tier-labeled claims`)
      if (next !== line) fileHits++
      return next
    })
    .join('\n')
  if (fileHits > 0) {
    fs.writeFileSync(t.file, out)
    total += fileHits
    console.log(`[sync-roc-geo-floors] ${path.relative(root, t.file)}: ${fileHits} floor(s) → ${floorLabel}`)
  } else {
    console.log(`[sync-roc-geo-floors] ${path.relative(root, t.file)}: no change (already current or no match)`)
  }
}

console.log(
  `[sync-roc-geo-floors] claimCount=${claimCount} advertise=${floorLabel} replacements=${total}`,
)
