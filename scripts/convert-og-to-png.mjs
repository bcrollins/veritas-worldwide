#!/usr/bin/env node
/**
 * Convert per-chapter OG SVG images to PNG for social platform compatibility.
 * Facebook, LinkedIn, Slack, Discord, etc. require raster images (PNG/JPG).
 * Uses @resvg/resvg-js (already in devDependencies).
 * Run: node scripts/convert-og-to-png.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { Resvg } from '@resvg/resvg-js'

const ogDir = 'public/og'
const files = readdirSync(ogDir).filter(f => f.endsWith('.svg'))

console.log(`Converting ${files.length} SVG OG images to PNG...`)

for (const file of files) {
  const svgPath = join(ogDir, file)
  const pngPath = join(ogDir, file.replace('.svg', '.png'))
  const svg = readFileSync(svgPath, 'utf-8')

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true },
  })
  const rendered = resvg.render()
  const png = rendered.asPng()

  writeFileSync(pngPath, png)
  console.log(`  ✓ ${file} → ${file.replace('.svg', '.png')} (${Math.round(png.length / 1024)}KB)`)
}

console.log(`Done — ${files.length} PNG files generated in ${ogDir}/`)
