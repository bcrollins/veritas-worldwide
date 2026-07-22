#!/usr/bin/env node
/**
 * Veritas Worldwide Brand Kit Generator v2.0
 * Produces production SVG/PNG brand assets + downloadable ZIP for admin.
 * Run: node scripts/generate-brand-kit.mjs
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync, copyFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const KIT = join(ROOT, 'public', 'brand-kit')
const EXPORTS = join(KIT, 'exports')

const C = {
  parchment: '#FAF8F5',
  parchmentDark: '#F2EDE7',
  ink: '#1A1A1A',
  inkMuted: '#666666',
  crimson: '#8B1A1A',
  crimsonLight: '#A52A2A',
  gold: '#B8860B',
  white: '#FFFFFF',
  black: '#0A0A0A',
}

function ensureDirs() {
  const dirs = [
    KIT,
    join(KIT, '01-logos'),
    join(KIT, '02-icons'),
    join(KIT, '03-wordmarks'),
    join(KIT, '04-social'),
    join(KIT, '05-og'),
    join(KIT, '06-tokens'),
    join(KIT, '07-docs'),
    join(KIT, '08-ai-generated'),
    EXPORTS,
  ]
  for (const d of dirs) mkdirSync(d, { recursive: true })
}

function writeSvg(relPath, content) {
  const full = join(KIT, relPath)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content.trim() + '\n', 'utf8')
  return full
}

function svgToPng(svgPath, pngPath, width) {
  const svg = readFileSync(svgPath)
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    background: 'rgba(0,0,0,0)',
  })
  const png = resvg.render().asPng()
  writeFileSync(pngPath, png)
}

/** Primary mark: serif V in concentric crimson rings on parchment */
function logoMark({ bg = C.parchment, ring = C.crimson, v = C.ink, size = 512 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="Veritas Worldwide mark">
  <rect width="512" height="512" fill="${bg}"/>
  <circle cx="256" cy="256" r="210" fill="none" stroke="${ring}" stroke-width="10"/>
  <circle cx="256" cy="256" r="192" fill="none" stroke="${ring}" stroke-width="3" opacity="0.85"/>
  <circle cx="256" cy="256" r="178" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.55"/>
  <!-- Angular serif V -->
  <path d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z" fill="${v}"/>
  <!-- Serif caps -->
  <rect x="108" y="122" width="68" height="8" rx="1.5" fill="${v}"/>
  <rect x="336" y="122" width="68" height="8" rx="1.5" fill="${v}"/>
</svg>`
}

function logoMarkTransparent({ ring = C.crimson, v = C.ink, size = 512 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="Veritas Worldwide mark">
  <circle cx="256" cy="256" r="210" fill="none" stroke="${ring}" stroke-width="10"/>
  <circle cx="256" cy="256" r="192" fill="none" stroke="${ring}" stroke-width="3" opacity="0.85"/>
  <circle cx="256" cy="256" r="178" fill="none" stroke="${ring}" stroke-width="1.5" opacity="0.55"/>
  <path d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z" fill="${v}"/>
  <rect x="108" y="122" width="68" height="8" rx="1.5" fill="${v}"/>
  <rect x="336" y="122" width="68" height="8" rx="1.5" fill="${v}"/>
</svg>`
}

function logoMarkRoundedApp({ bg = C.crimson, v = C.white, size = 512 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512" role="img" aria-label="Veritas Worldwide app icon">
  <rect width="512" height="512" rx="96" fill="${bg}"/>
  <circle cx="256" cy="256" r="168" fill="none" stroke="${v}" stroke-width="14"/>
  <path d="M148 150 L186 150 C190 150 193 152 195 156 L250 320 L256 336 L262 320 L317 156 C319 152 322 150 326 150 L364 150 C369 150 372 153 370 158 L270 374 C266 384 256 390 256 390 C256 390 246 384 242 374 L142 158 C140 153 143 150 148 150 Z" fill="${v}"/>
  <rect x="140" y="144" width="60" height="8" rx="1.5" fill="${v}"/>
  <rect x="312" y="144" width="60" height="8" rx="1.5" fill="${v}"/>
</svg>`
}

function logoFull({ bg = C.parchment, ink = C.ink, ring = C.crimson, muted = C.inkMuted } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="280" viewBox="0 0 800 280" role="img" aria-label="Veritas Worldwide Press">
  <rect width="800" height="280" fill="${bg}"/>
  <!-- Mark -->
  <g transform="translate(40,40)">
    <circle cx="100" cy="100" r="92" fill="none" stroke="${ring}" stroke-width="6"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="${ring}" stroke-width="2" opacity="0.8"/>
    <path d="M42 48 L62 48 C64 48 66 49 67 51 L97 145 L100 154 L103 145 L133 51 C134 49 136 48 138 48 L158 48 C161 48 163 50 162 53 L108 170 C106 175 100 178 100 178 C100 178 94 175 92 170 L38 53 C37 50 39 48 42 48 Z" fill="${ink}"/>
    <rect x="38" y="44" width="36" height="5" rx="1" fill="${ink}"/>
    <rect x="126" y="44" width="36" height="5" rx="1" fill="${ink}"/>
  </g>
  <!-- Wordmark -->
  <text x="280" y="130" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" letter-spacing="8" fill="${ink}">VERITAS</text>
  <text x="284" y="168" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" letter-spacing="6" fill="${muted}">WORLDWIDE PRESS</text>
  <line x1="284" y1="184" x2="560" y2="184" stroke="${ring}" stroke-width="1.5"/>
  <text x="284" y="210" font-family="Georgia, 'Times New Roman', serif" font-size="13" font-style="italic" letter-spacing="2" fill="${muted}">The Documentary Record</text>
</svg>`
}

function logoFullStacked({ bg = C.parchment, ink = C.ink, ring = C.crimson, muted = C.inkMuted } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="720" viewBox="0 0 600 720" role="img" aria-label="Veritas Worldwide Press stacked">
  <rect width="600" height="720" fill="${bg}"/>
  <g transform="translate(150,80)">
    <circle cx="150" cy="150" r="130" fill="none" stroke="${ring}" stroke-width="8"/>
    <circle cx="150" cy="150" r="116" fill="none" stroke="${ring}" stroke-width="2.5" opacity="0.85"/>
    <path d="M58 68 L88 68 C91 68 94 70 95 73 L145 220 L150 234 L155 220 L205 73 C206 70 209 68 212 68 L242 68 C246 68 249 71 247 75 L162 252 C159 260 150 266 150 266 C150 266 141 260 138 252 L53 75 C51 71 54 68 58 68 Z" fill="${ink}"/>
    <rect x="52" y="62" width="50" height="7" rx="1" fill="${ink}"/>
    <rect x="198" y="62" width="50" height="7" rx="1" fill="${ink}"/>
  </g>
  <text x="300" y="480" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="700" letter-spacing="10" fill="${ink}">VERITAS</text>
  <line x1="180" y1="510" x2="420" y2="510" stroke="${ring}" stroke-width="1.5"/>
  <text x="300" y="545" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="15" font-weight="500" letter-spacing="6" fill="${muted}">WORLDWIDE PRESS</text>
  <text x="300" y="590" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="14" font-style="italic" letter-spacing="3" fill="${muted}">THE DOCUMENTARY RECORD</text>
</svg>`
}

function wordmarkOnly({ bg = 'none', ink = C.ink, muted = C.inkMuted, ring = C.crimson } = {}) {
  const bgRect = bg !== 'none' ? `<rect width="720" height="160" fill="${bg}"/>` : ''
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="160" viewBox="0 0 720 160" role="img" aria-label="Veritas Worldwide wordmark">
  ${bgRect}
  <text x="360" y="78" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="700" letter-spacing="10" fill="${ink}">VERITAS</text>
  <line x1="220" y1="98" x2="500" y2="98" stroke="${ring}" stroke-width="1.5"/>
  <text x="360" y="128" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" letter-spacing="6" fill="${muted}">WORLDWIDE PRESS</text>
</svg>`
}

function socialBanner({ w = 1500, h = 500, title = 'The Record', subtitle = 'PRIMARY SOURCES  ·  PUBLIC RECORD' } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Veritas Worldwide social banner">
  <rect width="${w}" height="${h}" fill="${C.black}"/>
  <rect x="0" y="0" width="${w}" height="6" fill="${C.crimson}"/>
  <rect x="0" y="${h - 6}" width="${w}" height="6" fill="${C.crimson}"/>
  <text x="${w / 2}" y="${h * 0.32}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="6" fill="${C.gold}">VERITAS WORLDWIDE PRESS</text>
  <text x="${w / 2}" y="${h * 0.52}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="700" fill="${C.white}">${title}</text>
  <line x1="${w / 2 - 80}" y1="${h * 0.58}" x2="${w / 2 + 80}" y2="${h * 0.58}" stroke="${C.gold}" stroke-width="1.5"/>
  <text x="${w / 2}" y="${h * 0.72}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16" font-weight="500" letter-spacing="4" fill="rgba(255,255,255,0.7)">${subtitle}</text>
  <text x="${w / 2}" y="${h * 0.86}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.35)">veritasworldwide.com</text>
</svg>`
}

function socialProfile() {
  return logoMark({ bg: C.crimson, ring: C.white, v: C.white, size: 400 })
}

function colorPalette() {
  const swatches = [
    { name: 'Parchment', hex: C.parchment, x: 40 },
    { name: 'Ink', hex: C.ink, x: 180 },
    { name: 'Crimson', hex: C.crimson, x: 320 },
    { name: 'Gold', hex: C.gold, x: 460 },
    { name: 'Obsidian', hex: C.black, x: 600 },
  ]
  const blocks = swatches.map(s => `
  <rect x="${s.x}" y="80" width="120" height="120" rx="8" fill="${s.hex}" stroke="#E5E7EB" stroke-width="1"/>
  <text x="${s.x + 60}" y="230" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="${C.ink}">${s.name}</text>
  <text x="${s.x + 60}" y="250" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="${C.inkMuted}">${s.hex}</text>
  `).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="760" height="300" viewBox="0 0 760 300" role="img" aria-label="Veritas color palette">
  <rect width="760" height="300" fill="${C.parchment}"/>
  <text x="40" y="48" font-family="Georgia, serif" font-size="22" font-weight="700" fill="${C.ink}">Veritas Worldwide · Color Tokens</text>
  ${blocks}
</svg>`
}

function ogImage() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="The Record | Veritas Worldwide">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0A"/>
      <stop offset="100%" stop-color="#1A1212"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="5" fill="${C.crimson}"/>
  <rect x="0" y="625" width="1200" height="5" fill="${C.crimson}"/>
  <!-- Seal mark -->
  <g transform="translate(520,70) scale(0.28)">
    <circle cx="256" cy="256" r="210" fill="none" stroke="${C.crimson}" stroke-width="14"/>
    <circle cx="256" cy="256" r="192" fill="none" stroke="${C.crimson}" stroke-width="4"/>
    <path d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z" fill="${C.white}"/>
    <rect x="108" y="122" width="68" height="10" rx="1.5" fill="${C.white}"/>
    <rect x="336" y="122" width="68" height="10" rx="1.5" fill="${C.white}"/>
  </g>
  <text x="600" y="280" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="6" fill="${C.gold}">VERITAS WORLDWIDE PRESS</text>
  <text x="600" y="370" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" fill="${C.white}">The Record</text>
  <line x1="480" y1="400" x2="720" y2="400" stroke="${C.gold}" stroke-width="1.5"/>
  <text x="600" y="450" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-style="italic" fill="rgba(255,255,255,0.65)">A documentary history of power, money, and the</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="20" font-style="italic" fill="rgba(255,255,255,0.65)">institutions that shaped the modern world</text>
  <text x="600" y="555" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="13" letter-spacing="3" fill="rgba(255,255,255,0.4)">PRIMARY SOURCES · PUBLIC RECORD · YOUR CONCLUSIONS</text>
  <text x="600" y="590" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.3)">veritasworldwide.com</text>
</svg>`
}

function favicon() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Veritas">
  <rect width="32" height="32" rx="6" fill="${C.crimson}"/>
  <circle cx="16" cy="16" r="11" fill="none" stroke="${C.white}" stroke-width="1.4"/>
  <path d="M9.2 9.5 L12 9.5 C12.3 9.5 12.5 9.65 12.6 9.9 L15.6 19.2 L16 20.4 L16.4 19.2 L19.4 9.9 C19.5 9.65 19.7 9.5 20 9.5 L22.8 9.5 C23.2 9.5 23.4 9.75 23.25 10.1 L16.9 23.2 C16.7 23.8 16 24.2 16 24.2 C16 24.2 15.3 23.8 15.1 23.2 L8.75 10.1 C8.6 9.75 8.8 9.5 9.2 9.5 Z" fill="${C.white}"/>
</svg>`
}

function tokensJson() {
  return JSON.stringify({
    name: 'Veritas Worldwide Press Brand Tokens',
    version: '2.0.0',
    updated: new Date().toISOString().slice(0, 10),
    brand: {
      legalName: 'Veritas Worldwide Press',
      productName: 'The Record',
      domain: 'veritasworldwide.com',
      tagline: 'Primary sources. Public record. Your conclusions.',
    },
    colors: {
      light: {
        parchment: C.parchment,
        parchmentDark: C.parchmentDark,
        ink: C.ink,
        inkMuted: C.inkMuted,
        crimson: C.crimson,
        crimsonLight: C.crimsonLight,
        gold: C.gold,
        surface: '#FFFFFF',
        border: '#E5E7EB',
      },
      dark: {
        parchment: '#1A1A1A',
        parchmentDark: '#141414',
        ink: '#E8E4DF',
        inkMuted: '#A09A92',
        crimson: '#C43030',
        gold: C.gold,
        surface: '#242424',
        border: '#333333',
      },
    },
    typography: {
      display: "Playfair Display, Georgia, 'Times New Roman', serif",
      body: "Source Serif 4, Georgia, 'Times New Roman', serif",
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "JetBrains Mono, 'Courier New', monospace",
    },
    usage: {
      logoClearSpace: 'Equal to height of the V serif cap',
      minLogoSizePx: 32,
      primaryMark: '01-logos/logo-mark.svg',
      primaryWordmark: '03-wordmarks/wordmark.svg',
      appIcon: '02-icons/app-icon.svg',
      ogImage: '05-og/og-image.svg',
    },
    accessibility: {
      standard: 'WCAG 2.2 AA',
      minContrastBody: '4.5:1',
      minContrastLarge: '3:1',
    },
  }, null, 2)
}

function brandGuideMd() {
  return `# Veritas Worldwide Press — Brand Kit v2.0

**Updated:** ${new Date().toISOString().slice(0, 10)}  
**Domain:** veritasworldwide.com  
**Product:** The Record  
**Publisher:** Veritas Worldwide Press

## Brand Story

Veritas ("truth" in Latin) is an independent investigative publishing operation.  
The visual system signals documentary rigor: parchment paper, ink, crimson seals, and restrained gold accents — the aesthetic of an archive, not a startup.

## Logo System

| Asset | Use |
|-------|-----|
| \`01-logos/logo-mark.svg\` | Primary seal (parchment + crimson ring + ink V) |
| \`01-logos/logo-mark-crimson.svg\` | Crimson-on-parchment accent mark |
| \`01-logos/logo-mark-white.svg\` | White/transparent for dark backgrounds |
| \`01-logos/logo-full.svg\` | Horizontal lockup (mark + wordmark) |
| \`01-logos/logo-full-stacked.svg\` | Stacked lockup for covers / splash |
| \`01-logos/logo-full-white.svg\` | White lockup for dark backgrounds |
| \`02-icons/app-icon.svg\` | App / PWA rounded icon (crimson) |
| \`02-icons/favicon.svg\` | Browser favicon |
| \`03-wordmarks/wordmark.svg\` | Text-only VERITAS WORLDWIDE PRESS |
| \`04-social/*\` | Profile + platform banners |
| \`05-og/og-image.svg\` | Default Open Graph card |
| \`08-ai-generated/*\` | Grok Imagine reference renders |

### Clear space
Leave empty space around the mark equal to the height of the V's top serif bar.  
Never stretch, recolor outside approved tokens, or place on busy photography without a solid scrim.

### Minimum sizes
- Mark: 32×32 px digital
- Horizontal lockup: 160 px wide
- Favicon: 16×16 / 32×32

## Color Tokens

| Token | Hex | Role |
|-------|-----|------|
| Parchment | \`#FAF8F5\` | Primary background (light) |
| Ink | \`#1A1A1A\` | Body / logo ink |
| Crimson | \`#8B1A1A\` | Accent, CTAs, seal rings |
| Gold | \`#B8860B\` | Secondary accent, social labels |
| Obsidian | \`#0A0A0A\` | Dark social / OG backgrounds |

Dark mode shifts parchment→ink and raises crimson to \`#C43030\` for WCAG AA.

## Typography

- **Display:** Playfair Display (headlines, chapter titles)
- **Body:** Source Serif 4 (long-form reading)
- **UI:** Inter (navigation, labels, admin)
- **Data:** JetBrains Mono (citations, codes, metrics)

## Voice

Sober. Specific. Evidence-conscious.  
Never sensational. Never unsupported accusation as fact.  
Prefer: "Primary sources. Public record. Your conclusions."

## AI-generated references

\`08-ai-generated/\` contains Grok Imagine compositions used to lock the 2026 brand direction.  
Production surfaces ship the vector SVGs above (exact text, scalable). AI rasters are marketing references and social mood boards.

## Download

Admins: **/admin/brand-kit** → Download Ultimate Brand Kit (.zip)

## Legal

© Veritas Worldwide Press. Brand assets for authorized Veritas Worldwide use only.  
Do not alter the mark for third-party products without written permission.
`
}

function altTextManifest() {
  return JSON.stringify({
    version: '2.0.0',
    assets: [
      { path: '01-logos/logo-mark.svg', alt: 'Veritas Worldwide publisher seal: serif letter V inside concentric crimson rings on parchment' },
      { path: '01-logos/logo-full.svg', alt: 'Veritas Worldwide Press logo lockup with seal and wordmark' },
      { path: '02-icons/app-icon.svg', alt: 'Veritas app icon: white V in circle on crimson rounded square' },
      { path: '02-icons/favicon.svg', alt: 'Veritas favicon' },
      { path: '03-wordmarks/wordmark.svg', alt: 'VERITAS WORLDWIDE PRESS wordmark' },
      { path: '04-social/social-profile.svg', alt: 'Veritas social profile mark on crimson' },
      { path: '04-social/social-banner-x.svg', alt: 'The Record social banner for X' },
      { path: '05-og/og-image.svg', alt: 'Open Graph card for The Record by Veritas Worldwide Press' },
      { path: '08-ai-generated/seal-mark-parchment.jpg', alt: 'AI reference: parchment seal mark with crimson rings' },
      { path: '08-ai-generated/wordmark-lockup.jpg', alt: 'AI reference: horizontal wordmark lockup' },
      { path: '08-ai-generated/og-the-record.jpg', alt: 'AI reference: The Record social banner' },
      { path: '08-ai-generated/avatar-crimson.jpg', alt: 'AI reference: crimson avatar with white V' },
    ],
  }, null, 2)
}

function buildZip() {
  const zipPath = join(ROOT, 'public', 'brand-kit', 'exports', 'Veritas-Worldwide-Ultimate-Brand-Kit.zip')
  // zip from inside brand-kit so paths are clean
  const exclude = ['exports/*']
  try {
    execSync(
      `cd "${KIT}" && rm -f exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip && zip -r exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip . -x "exports/*" -x "*.DS_Store"`,
      { stdio: 'inherit' }
    )
  } catch (e) {
    console.error('ZIP build failed:', e.message)
    process.exit(1)
  }
  const size = statSync(zipPath).size
  console.log(`ZIP: ${zipPath} (${(size / 1024).toFixed(1)} KB)`)
  return zipPath
}

function main() {
  console.log('Generating Veritas Worldwide Brand Kit v2.0…')
  ensureDirs()

  // Root-level aliases (manifest + legacy paths)
  writeSvg('logo-mark.svg', logoMark())
  writeSvg('logo-mark-crimson.svg', logoMark({ ring: C.crimson, v: C.crimson }))
  writeSvg('logo-mark-white.svg', logoMarkTransparent({ ring: C.white, v: C.white }))
  writeSvg('logo-full.svg', logoFull())
  writeSvg('logo-full-white.svg', logoFull({ bg: C.black, ink: C.white, ring: C.crimson, muted: 'rgba(255,255,255,0.55)' }))
  writeSvg('color-palette.svg', colorPalette())
  writeSvg('social-profile.svg', socialProfile())
  writeSvg('social-banner-x.svg', socialBanner({ w: 1500, h: 500 }))
  writeSvg('social-banner-facebook.svg', socialBanner({ w: 820, h: 312 }))
  writeSvg('social-banner-linkedin.svg', socialBanner({ w: 1584, h: 396 }))

  // Taxonomy folders
  writeSvg('01-logos/logo-mark.svg', logoMark())
  writeSvg('01-logos/logo-mark-crimson.svg', logoMark({ ring: C.crimson, v: C.crimson }))
  writeSvg('01-logos/logo-mark-ink.svg', logoMark({ ring: C.ink, v: C.ink }))
  writeSvg('01-logos/logo-mark-white.svg', logoMarkTransparent({ ring: C.white, v: C.white }))
  writeSvg('01-logos/logo-mark-on-crimson.svg', logoMark({ bg: C.crimson, ring: C.white, v: C.white }))
  writeSvg('01-logos/logo-full.svg', logoFull())
  writeSvg('01-logos/logo-full-white.svg', logoFull({ bg: C.black, ink: C.white, ring: C.crimson, muted: 'rgba(255,255,255,0.55)' }))
  writeSvg('01-logos/logo-full-stacked.svg', logoFullStacked())

  writeSvg('02-icons/app-icon.svg', logoMarkRoundedApp())
  writeSvg('02-icons/favicon.svg', favicon())
  writeSvg('02-icons/logo-mark-32.svg', logoMark({ size: 32 }))
  writeSvg('02-icons/logo-mark-64.svg', logoMark({ size: 64 }))
  writeSvg('02-icons/logo-mark-128.svg', logoMark({ size: 128 }))
  writeSvg('02-icons/logo-mark-256.svg', logoMark({ size: 256 }))
  writeSvg('02-icons/logo-mark-512.svg', logoMark({ size: 512 }))

  writeSvg('03-wordmarks/wordmark.svg', wordmarkOnly({ bg: C.parchment }))
  writeSvg('03-wordmarks/wordmark-transparent.svg', wordmarkOnly({ bg: 'none' }))
  writeSvg('03-wordmarks/wordmark-white.svg', wordmarkOnly({ bg: C.black, ink: C.white, muted: 'rgba(255,255,255,0.55)' }))

  writeSvg('04-social/social-profile.svg', socialProfile())
  writeSvg('04-social/social-banner-x.svg', socialBanner({ w: 1500, h: 500 }))
  writeSvg('04-social/social-banner-facebook.svg', socialBanner({ w: 820, h: 312 }))
  writeSvg('04-social/social-banner-linkedin.svg', socialBanner({ w: 1584, h: 396 }))
  writeSvg('04-social/social-banner-youtube.svg', socialBanner({ w: 2560, h: 1440, title: 'The Record', subtitle: 'DOCUMENTARY ARCHIVE' }))

  writeSvg('05-og/og-image.svg', ogImage())

  writeFileSync(join(KIT, '06-tokens', 'tokens.json'), tokensJson() + '\n')
  writeFileSync(join(KIT, '06-tokens', 'color-palette.svg'), colorPalette() + '\n')
  writeFileSync(join(KIT, '07-docs', 'BRAND-GUIDE.md'), brandGuideMd())
  writeFileSync(join(KIT, '07-docs', 'alt-text-manifest.json'), altTextManifest() + '\n')
  writeFileSync(join(KIT, 'README.md'), brandGuideMd())

  // Site root favicon + OG
  writeFileSync(join(ROOT, 'public', 'favicon.svg'), favicon() + '\n')
  writeFileSync(join(ROOT, 'public', 'og-image.svg'), ogImage() + '\n')
  copyFileSync(join(KIT, '05-og', 'og-image.svg'), join(ROOT, 'public', 'og-image.svg'))

  // Rasterize key assets
  const rasters = [
    ['01-logos/logo-mark.svg', '01-logos/logo-mark-512.png', 512],
    ['01-logos/logo-mark.svg', '01-logos/logo-mark-256.png', 256],
    ['01-logos/logo-full.svg', '01-logos/logo-full.png', 800],
    ['01-logos/logo-full-stacked.svg', '01-logos/logo-full-stacked.png', 600],
    ['02-icons/app-icon.svg', '02-icons/app-icon-512.png', 512],
    ['02-icons/app-icon.svg', '02-icons/app-icon-192.png', 192],
    ['04-social/social-profile.svg', '04-social/social-profile-400.png', 400],
    ['05-og/og-image.svg', '05-og/og-image.png', 1200],
    ['03-wordmarks/wordmark.svg', '03-wordmarks/wordmark.png', 720],
  ]
  for (const [src, dest, w] of rasters) {
    try {
      svgToPng(join(KIT, src), join(KIT, dest), w)
      console.log(`PNG ${dest}`)
    } catch (e) {
      console.warn(`PNG failed ${dest}:`, e.message)
    }
  }

  // Copy OG png to public root
  try {
    copyFileSync(join(KIT, '05-og', 'og-image.png'), join(ROOT, 'public', 'og-image.png'))
  } catch { /* optional */ }

  // Manifest for admin UI
  const manifest = {
    version: '2.0.0',
    name: 'Veritas Worldwide Ultimate Brand Kit',
    generatedAt: new Date().toISOString(),
    zipPath: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip',
    sections: [
      { id: '01-logos', title: 'Logos', description: 'Primary seal, full lockups, monochrome variants' },
      { id: '02-icons', title: 'Icons & Favicon', description: 'App icon, favicon, sized marks' },
      { id: '03-wordmarks', title: 'Wordmarks', description: 'Text-only brand typography' },
      { id: '04-social', title: 'Social', description: 'Profile and platform banners' },
      { id: '05-og', title: 'Open Graph', description: 'Default social share card' },
      { id: '06-tokens', title: 'Design Tokens', description: 'Colors, type, usage rules (JSON)' },
      { id: '07-docs', title: 'Documentation', description: 'Brand guide and alt-text manifest' },
      { id: '08-ai-generated', title: 'AI References', description: 'Grok Imagine brand direction renders' },
    ],
    downloads: [
      { label: 'Ultimate Brand Kit (.zip)', href: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip', adminOnly: true },
      { label: 'Logo mark (SVG)', href: '/brand-kit/01-logos/logo-mark.svg' },
      { label: 'Full lockup (SVG)', href: '/brand-kit/01-logos/logo-full.svg' },
      { label: 'App icon (SVG)', href: '/brand-kit/02-icons/app-icon.svg' },
      { label: 'Wordmark (SVG)', href: '/brand-kit/03-wordmarks/wordmark.svg' },
      { label: 'OG image (PNG)', href: '/brand-kit/05-og/og-image.png' },
      { label: 'Brand guide (MD)', href: '/brand-kit/07-docs/BRAND-GUIDE.md' },
      { label: 'Tokens (JSON)', href: '/brand-kit/06-tokens/tokens.json' },
    ],
  }
  writeFileSync(join(KIT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

  buildZip()
  console.log('Brand kit generation complete.')
}

main()
