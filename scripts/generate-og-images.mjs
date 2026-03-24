#!/usr/bin/env node
/**
 * Generate per-chapter OG images (1200x630 SVG) for social sharing.
 * Run: node scripts/generate-og-images.mjs
 * Output: public/og/ directory with one SVG per chapter
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'

const src = readFileSync('src/data/chapters.ts', 'utf-8')

// Extract chapter id, number, title, subtitle
const chapterRegex = /id:\s*'([^']+)',\s*\n\s*number:\s*'([^']+)',\s*\n\s*title:\s*'([^']*(?:\\.[^']*)*)',\s*\n\s*subtitle:\s*'([^']*(?:\\.[^']*)*)',/g
const chapters = []
let match
while ((match = chapterRegex.exec(src)) !== null) {
  chapters.push({
    id: match[1],
    number: match[2],
    title: match[3].replace(/\\'/g, "'"),
    subtitle: match[4].replace(/\\'/g, "'").slice(0, 140),
  })
}

console.log(`Found ${chapters.length} chapters`)
const outDir = 'public/og'
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

function escXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      lines.push(current.trim())
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current.trim()) lines.push(current.trim())
  return lines.slice(0, 3) // max 3 lines
}

for (const ch of chapters) {
  const titleLines = wrapText(ch.title, 35)
  const subtitleLines = wrapText(ch.subtitle, 55)

  const titleY = 220
  const titleSvg = titleLines.map((line, i) =>
    `<text x="80" y="${titleY + i * 52}" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="700" fill="#1A1A1A">${escXml(line)}</text>`
  ).join('\n    ')

  const subtY = titleY + titleLines.length * 52 + 20
  const subtSvg = subtitleLines.map((line, i) =>
    `<text x="80" y="${subtY + i * 26}" font-family="'Source Serif 4', 'Georgia', serif" font-size="20" fill="#666666" font-style="italic">${escXml(line)}</text>`
  ).join('\n    ')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FAF8F5"/>
      <stop offset="100%" stop-color="#F2EDE7"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Top crimson bar -->
  <rect x="0" y="0" width="1200" height="6" fill="#8B1A1A"/>
  <!-- Chapter number label -->
  <text x="80" y="120" font-family="Inter, 'Helvetica Neue', sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#8B1A1A" text-transform="uppercase">${escXml(ch.number.toUpperCase())}</text>
  <!-- Decorative rule -->
  <rect x="80" y="140" width="60" height="2" fill="#8B1A1A"/>
  <!-- Title -->
  ${titleSvg}
  <!-- Subtitle -->
  ${subtSvg}
  <!-- Bottom bar -->
  <rect x="0" y="580" width="1200" height="50" fill="#1A1A1A"/>
  <!-- Brand name -->
  <text x="80" y="612" font-family="Inter, 'Helvetica Neue', sans-serif" font-size="14" font-weight="600" letter-spacing="2" fill="#FFFFFF" opacity="0.7">VERITAS WORLDWIDE PRESS</text>
  <!-- Tagline -->
  <text x="1120" y="612" font-family="Inter, 'Helvetica Neue', sans-serif" font-size="11" fill="#FFFFFF" opacity="0.4" text-anchor="end">Primary Sources · Public Record · Your Conclusions</text>
  <!-- Evidence tier indicators -->
  <circle cx="1060" cy="120" r="6" fill="#166534"/>
  <circle cx="1085" cy="120" r="6" fill="#92400E"/>
  <circle cx="1110" cy="120" r="6" fill="#991B1B"/>
  <text x="1060" y="148" font-family="Inter, sans-serif" font-size="8" fill="#999999" text-anchor="middle">V</text>
  <text x="1085" y="148" font-family="Inter, sans-serif" font-size="8" fill="#999999" text-anchor="middle">C</text>
  <text x="1110" y="148" font-family="Inter, sans-serif" font-size="8" fill="#999999" text-anchor="middle">D</text>
</svg>`

  writeFileSync(`${outDir}/${ch.id}.svg`, svg)
}

console.log(`Generated ${chapters.length} OG images in ${outDir}/`)
