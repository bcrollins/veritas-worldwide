#!/usr/bin/env node
/**
 * Veritas Worldwide Brand Kit Generator v2.2
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
const KIT_VERSION = '2.5.0'

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
    join(KIT, '09-templates'),
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
    version: KIT_VERSION,
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

function letterheadSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="850" height="1100" viewBox="0 0 850 1100" role="img" aria-label="Veritas letterhead">
  <rect width="850" height="1100" fill="${C.parchment}"/>
  <rect x="0" y="0" width="850" height="6" fill="${C.crimson}"/>
  <g transform="translate(48,40) scale(0.22)">
    <circle cx="256" cy="256" r="210" fill="none" stroke="${C.crimson}" stroke-width="10"/>
    <circle cx="256" cy="256" r="192" fill="none" stroke="${C.crimson}" stroke-width="3"/>
    <path d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z" fill="${C.ink}"/>
    <rect x="108" y="122" width="68" height="8" rx="1.5" fill="${C.ink}"/>
    <rect x="336" y="122" width="68" height="8" rx="1.5" fill="${C.ink}"/>
  </g>
  <text x="180" y="78" font-family="Georgia, serif" font-size="28" font-weight="700" letter-spacing="4" fill="${C.ink}">VERITAS WORLDWIDE PRESS</text>
  <text x="180" y="104" font-family="Inter, Helvetica, Arial, sans-serif" font-size="11" letter-spacing="3" fill="${C.inkMuted}">THE DOCUMENTARY RECORD</text>
  <line x1="48" y1="140" x2="802" y2="140" stroke="${C.crimson}" stroke-width="1"/>
  <text x="48" y="1040" font-family="Inter, Helvetica, Arial, sans-serif" font-size="10" fill="${C.inkMuted}">veritasworldwide.com  ·  rights@veritasworldwide.com  ·  Primary sources · Public record · Your conclusions</text>
  <rect x="0" y="1094" width="850" height="6" fill="${C.crimson}"/>
</svg>`
}

function emailSignatureHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Veritas Worldwide — Email Signature</title>
</head>
<body style="margin:0;padding:24px;background:#ffffff;font-family:Georgia,'Times New Roman',serif;">
  <!-- Paste from <table> through </table> into your mail client -->
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:480px;">
    <tr>
      <td style="padding-right:16px;vertical-align:top;">
        <img src="https://veritasworldwide.com/brand-kit/01-logos/logo-mark-256.png" width="56" height="56" alt="Veritas Worldwide" style="display:block;border:0;" />
      </td>
      <td style="vertical-align:top;border-left:2px solid #8B1A1A;padding-left:16px;">
        <div style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#1A1A1A;letter-spacing:0.04em;">VERITAS WORLDWIDE PRESS</div>
        <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:11px;color:#666666;letter-spacing:0.12em;text-transform:uppercase;margin-top:2px;">The Documentary Record</div>
        <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:12px;color:#1A1A1A;margin-top:10px;">
          <a href="https://veritasworldwide.com" style="color:#8B1A1A;text-decoration:none;">veritasworldwide.com</a>
          <span style="color:#999999;"> · </span>
          <a href="mailto:rights@veritasworldwide.com" style="color:#666666;text-decoration:none;">rights@veritasworldwide.com</a>
        </div>
        <div style="font-family:Inter,Helvetica,Arial,sans-serif;font-size:11px;color:#999999;margin-top:6px;font-style:italic;">
          Primary sources. Public record. Your conclusions.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function pressReleaseHeaderSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200" viewBox="0 0 1200 200" role="img" aria-label="Press release header">
  <rect width="1200" height="200" fill="${C.parchment}"/>
  <rect x="0" y="0" width="1200" height="4" fill="${C.crimson}"/>
  <text x="60" y="70" font-family="Inter, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4" fill="${C.crimson}">FOR IMMEDIATE RELEASE</text>
  <text x="60" y="120" font-family="Georgia, serif" font-size="36" font-weight="700" fill="${C.ink}">Veritas Worldwide Press</text>
  <text x="60" y="155" font-family="Georgia, serif" font-size="16" font-style="italic" fill="${C.inkMuted}">Independent investigative publishing · veritasworldwide.com</text>
  <line x1="60" y1="180" x2="1140" y2="180" stroke="${C.crimson}" stroke-width="1"/>
</svg>`
}

function highlightCoverSvg(label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="Instagram highlight: ${label}">
  <rect width="400" height="400" fill="${C.black}"/>
  <circle cx="200" cy="175" r="72" fill="none" stroke="${C.crimson}" stroke-width="4"/>
  <circle cx="200" cy="175" r="60" fill="none" stroke="${C.crimson}" stroke-width="1.5" opacity="0.7"/>
  <path d="M152 130 L170 130 C172 130 173 131 174 133 L197 198 L200 206 L203 198 L226 133 C227 131 228 130 230 130 L248 130 C251 130 252 132 251 135 L208 220 C206 225 200 228 200 228 C200 228 194 225 192 220 L149 135 C148 132 149 130 152 130 Z" fill="${C.white}"/>
  <rect x="148" y="126" width="36" height="5" rx="1" fill="${C.white}"/>
  <rect x="216" y="126" width="36" height="5" rx="1" fill="${C.white}"/>
  <text x="200" y="300" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="4" fill="${C.white}">${label.toUpperCase()}</text>
</svg>`
}

function businessCardSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1050" height="600" viewBox="0 0 1050 600" role="img" aria-label="Veritas business card">
  <rect width="1050" height="600" fill="${C.parchment}"/>
  <rect x="0" y="0" width="12" height="600" fill="${C.crimson}"/>
  <g transform="translate(80,140) scale(0.35)">
    <circle cx="256" cy="256" r="210" fill="none" stroke="${C.crimson}" stroke-width="10"/>
    <circle cx="256" cy="256" r="192" fill="none" stroke="${C.crimson}" stroke-width="3"/>
    <path d="M118 128 L156 128 C160 128 163 130 165 134 L250 348 L256 364 L262 348 L347 134 C349 130 352 128 356 128 L394 128 C399 128 402 131 400 136 L270 402 C266 412 256 418 256 418 C256 418 246 412 242 402 L112 136 C110 131 113 128 118 128 Z" fill="${C.ink}"/>
    <rect x="108" y="122" width="68" height="8" rx="1.5" fill="${C.ink}"/>
    <rect x="336" y="122" width="68" height="8" rx="1.5" fill="${C.ink}"/>
  </g>
  <text x="320" y="240" font-family="Georgia, serif" font-size="42" font-weight="700" letter-spacing="4" fill="${C.ink}">VERITAS</text>
  <text x="320" y="280" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" letter-spacing="5" fill="${C.inkMuted}">WORLDWIDE PRESS</text>
  <line x1="320" y1="300" x2="620" y2="300" stroke="${C.crimson}" stroke-width="1.5"/>
  <text x="320" y="340" font-family="Georgia, serif" font-size="16" font-style="italic" fill="${C.inkMuted}">Primary sources. Public record. Your conclusions.</text>
  <text x="320" y="420" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" fill="${C.ink}">veritasworldwide.com</text>
  <text x="320" y="450" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" fill="${C.inkMuted}">rights@veritasworldwide.com</text>
</svg>`
}

function tokensCss() {
  return `/**
 * Veritas Worldwide Press — design tokens (CSS custom properties)
 * Brand kit v${KIT_VERSION} · https://veritasworldwide.com/brand-kit/
 */
:root {
  --veritas-parchment: ${C.parchment};
  --veritas-parchment-dark: ${C.parchmentDark};
  --veritas-ink: ${C.ink};
  --veritas-ink-muted: ${C.inkMuted};
  --veritas-crimson: ${C.crimson};
  --veritas-crimson-light: ${C.crimsonLight};
  --veritas-gold: ${C.gold};
  --veritas-obsidian: ${C.black};
  --veritas-white: ${C.white};

  --veritas-font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --veritas-font-body: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  --veritas-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --veritas-font-mono: 'JetBrains Mono', 'Courier New', monospace;

  --veritas-radius-sm: 2px;
  --veritas-radius-md: 6px;
  --veritas-space-unit: 8px;
}

html.dark,
[data-theme="dark"] {
  --veritas-parchment: #1A1A1A;
  --veritas-parchment-dark: #141414;
  --veritas-ink: #E8E4DF;
  --veritas-ink-muted: #A09A92;
  --veritas-crimson: #C43030;
  --veritas-crimson-light: #D44040;
}
`
}

function socialAssetMatrixMd() {
  return `# Social Asset Matrix — Veritas Worldwide Press

Use these paths when standing up or refreshing platform identities.
All paths are relative to \`https://veritasworldwide.com\`.

| Platform | Profile / logo | Banner / cover | Notes |
|----------|----------------|----------------|-------|
| **X (Twitter)** | \`/brand-kit/04-social/social-profile.svg\` or \`social-profile-400.png\` | \`/brand-kit/04-social/social-banner-x.svg\` (1500×500) | Handle @VeritasWorldwide |
| **Instagram** | same profile 320–400px PNG | Feed: square seal; Stories: \`story-1080x1920.svg\` | Handle @veritasworldwidepress |
| **Instagram Highlights** | \`highlight-chapters.svg\`, \`highlight-sources.svg\`, \`highlight-record.svg\` | — | 3 covers in 04-social |
| **LinkedIn Company** | \`/brand-kit/01-logos/logo-mark-512.png\` | \`/brand-kit/04-social/social-banner-linkedin.svg\` (1584×396) | Company: Veritas Worldwide Press |
| **Facebook Page** | profile PNG | \`social-banner-facebook.svg\` (820×312) | News/Media category |
| **YouTube** | app-icon / social-profile | \`social-banner-youtube.svg\` (2560×1440) | @VeritasWorldwide |
| **TikTok** | social-profile-400.png | N/A | @veritasworldwidepress |
| **Pinterest** | social-profile | story or OG for pins | veritasworldwide |
| **Open Graph / default share** | — | \`/og-image.png\` + \`/brand-kit/05-og/\` | Site-wide default |

## Bios (copy/paste)

- **Short:** Primary Sources. Public Record. Your Conclusions.
- **Medium:** A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. 32 archive parts. 600+ primary sources. Full archive public.
- **Link:** https://veritasworldwide.com

## Hashtags

See \`07-docs/HASHTAGS.md\`.

## Full kit

Download: \`/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip\`  
Admin UI: \`/admin/brand-kit\`
`
}

function hashtagsMd() {
  return `# Hashtag & Keyword Library — Veritas Worldwide

## Always-on brand
- #VeritasWorldwide
- #TheRecord
- #PrimarySources
- #PublicRecord
- #DocumentaryRecord

## Editorial / methodology
- #EvidenceBased
- #SourceFirst
- #OpenSources
- #InvestigativeJournalism
- #MediaLiteracy

## Topic clusters (use 1–2 max with brand tags)
- #CentralBanking #FederalReserve
- #Lobbying #AIPAC
- #Surveillance #Intelligence
- #DefenseSpending
- #CorporatePower
- #CampaignFinance

## Platform notes
- **X:** 1–3 hashtags max; prefer inline claims + link.
- **Instagram:** 5–12 in first comment; brand tags first.
- **LinkedIn:** 3–5 professional tags; avoid spam density.
- **YouTube:** title keywords + description hashtags sparingly.

## Keywords (SEO / discovery)
veritas worldwide, the record documentary, primary source journalism,
institutional power history, public record investigation, evidence taxonomy
`
}

function quoteCardSvg() {
  // Pure SVG text (no foreignObject) so PNG rasterization stays reliable.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-label="Quote card">
  <rect width="1080" height="1080" fill="${C.black}"/>
  <rect x="0" y="0" width="1080" height="8" fill="${C.crimson}"/>
  <rect x="0" y="1072" width="1080" height="8" fill="${C.crimson}"/>
  <text x="120" y="280" font-family="Georgia, serif" font-size="120" fill="${C.crimson}" opacity="0.35">“</text>
  <text x="120" y="400" font-family="Georgia, serif" font-size="48" font-style="italic" fill="${C.white}">Primary sources.</text>
  <text x="120" y="470" font-family="Georgia, serif" font-size="48" font-style="italic" fill="${C.white}">Public record.</text>
  <text x="120" y="540" font-family="Georgia, serif" font-size="48" font-style="italic" fill="${C.white}">Your conclusions.</text>
  <line x1="120" y1="800" x2="360" y2="800" stroke="${C.gold}" stroke-width="2"/>
  <text x="120" y="860" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="4" fill="${C.gold}">VERITAS WORLDWIDE PRESS</text>
  <text x="120" y="900" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.45)">veritasworldwide.com</text>
</svg>`
}

function youtubeThumbnailSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img" aria-label="YouTube thumbnail template">
  <rect width="1280" height="720" fill="${C.black}"/>
  <rect x="0" y="0" width="1280" height="6" fill="${C.crimson}"/>
  <rect x="0" y="714" width="1280" height="6" fill="${C.crimson}"/>
  <text x="80" y="120" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="6" fill="${C.gold}">VERITAS WORLDWIDE PRESS</text>
  <text x="80" y="280" font-family="Georgia, serif" font-size="64" font-weight="700" fill="${C.white}">The Record</text>
  <text x="80" y="360" font-family="Georgia, serif" font-size="32" font-style="italic" fill="rgba(255,255,255,0.7)">Primary sources. Public record.</text>
  <text x="80" y="420" font-family="Georgia, serif" font-size="32" font-style="italic" fill="rgba(255,255,255,0.7)">Your conclusions.</text>
  <circle cx="1100" cy="360" r="90" fill="none" stroke="${C.crimson}" stroke-width="6"/>
  <text x="1100" y="380" text-anchor="middle" font-family="Georgia, serif" font-size="72" font-weight="700" fill="${C.white}">V</text>
  <text x="80" y="640" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.4)">veritasworldwide.com</text>
</svg>`
}

function linkedInArticleHeaderSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1128" height="191" viewBox="0 0 1128 191" role="img" aria-label="LinkedIn article header">
  <rect width="1128" height="191" fill="${C.parchment}"/>
  <rect x="0" y="0" width="1128" height="4" fill="${C.crimson}"/>
  <rect x="0" y="187" width="1128" height="4" fill="${C.crimson}"/>
  <circle cx="72" cy="95" r="36" fill="none" stroke="${C.crimson}" stroke-width="3"/>
  <text x="72" y="106" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="700" fill="${C.ink}">V</text>
  <text x="130" y="88" font-family="Georgia, serif" font-size="28" font-weight="700" letter-spacing="3" fill="${C.ink}">VERITAS WORLDWIDE PRESS</text>
  <text x="130" y="118" font-family="Inter, Helvetica, Arial, sans-serif" font-size="14" letter-spacing="2" fill="${C.inkMuted}">THE DOCUMENTARY RECORD · veritasworldwide.com</text>
</svg>`
}

function igCarouselSlideSvg(n, title, subtitle) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080" role="img" aria-label="Instagram carousel slide ${n}">
  <rect width="1080" height="1080" fill="${C.black}"/>
  <rect x="0" y="0" width="1080" height="8" fill="${C.crimson}"/>
  <rect x="0" y="1072" width="1080" height="8" fill="${C.crimson}"/>
  <text x="80" y="120" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="6" fill="${C.gold}">VERITAS WORLDWIDE · ${n}/3</text>
  <text x="80" y="420" font-family="Georgia, serif" font-size="56" font-weight="700" fill="${C.white}">${title}</text>
  <text x="80" y="500" font-family="Georgia, serif" font-size="28" font-style="italic" fill="rgba(255,255,255,0.7)">${subtitle}</text>
  <line x1="80" y1="560" x2="280" y2="560" stroke="${C.crimson}" stroke-width="2"/>
  <text x="80" y="980" font-family="Inter, Helvetica, Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.4)">veritasworldwide.com</text>
</svg>`
}

function pressReleaseBodyHtml() {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '  <title>Press Release Template — Veritas Worldwide Press</title>',
    '  <style>',
    '    body{margin:0;font-family:Georgia,serif;background:#FAF8F5;color:#1A1A1A;line-height:1.6}',
    '    .wrap{max-width:720px;margin:0 auto;padding:48px 24px 80px}',
    '    .label{font-family:Inter,Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#8B1A1A;font-weight:700}',
    '    h1{font-size:1.75rem;margin:16px 0 8px}',
    '    .meta{font-family:Inter,Helvetica,Arial,sans-serif;font-size:13px;color:#666}',
    '    hr{border:0;border-top:1px solid #8B1A1A;margin:24px 0;opacity:.4}',
    '    p{margin:0 0 1rem}',
    '    .contact{margin-top:2rem;padding-top:1rem;border-top:1px solid #ddd;font-family:Inter,Helvetica,Arial,sans-serif;font-size:13px;color:#666}',
    '    a{color:#8B1A1A}',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="wrap">',
    '    <p class="label">For immediate release</p>',
    '    <h1>[HEADLINE — DOCUMENTARY FACT, NOT HYPE]</h1>',
    '    <p class="meta">[CITY] — [DATE] — Veritas Worldwide Press</p>',
    '    <hr />',
    '    <p><strong>Lead:</strong> Open with the institutional fact, document, or filing. Name the source.</p>',
    '    <p><strong>Body:</strong> Separate verified documentation from analysis. Use evidence-tier language where claims are contested.</p>',
    '    <p><strong>Quote (optional):</strong> Primary sources. Public record. Your conclusions.</p>',
    '    <p><strong>Boilerplate:</strong> Veritas Worldwide is an independent investigative publisher. The Record is a multi-chapter documentary archive built on primary sources and public records. Full archive: <a href="https://veritasworldwide.com">veritasworldwide.com</a>.</p>',
    '    <div class="contact">',
    '      Media contact: <a href="mailto:rights@veritasworldwide.com">rights@veritasworldwide.com</a><br />',
    '      Media kit: <a href="https://veritasworldwide.com/media-kit">veritasworldwide.com/media-kit</a><br />',
    '      Brand ZIP: <a href="https://veritasworldwide.com/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip">Ultimate Brand Kit</a>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>',
    '',
  ].join('\n')
}

function brandVoiceMd() {
  return `# Brand Voice — Veritas Worldwide Press

## Positioning
Sober investigative publisher. Archive, not agitprop. Documentary record, not punditry.

## Voice attributes
- **Precise** — prefer dates, document names, and institutional nouns over adjectives.
- **Sourced** — claims sit next to evidence tiers or source paths.
- **Calm** — intensity comes from facts, not punctuation or ALL CAPS.
- **Independent** — no party cheerleading; no protected-class blame shortcuts.
- **Readable** — longform serif body, short UI labels, plain words when possible.

## Do
- Lead with the document or institutional fact.
- Separate verified fact from analysis and opinion.
- Invite the reader to inspect sources.

## Do not
- Use unsupported accusation as fact.
- Use collective ethnic/religious blame narratives.
- Hype with "bombshell," "destroyed," or engagement bait.

## Signature line
Primary sources. Public record. Your conclusions.

## Sample social posts
1. New in The Record: [chapter]. Sources open. Methodology public.  
2. Evidence label: Verified — [claim]. Full citation on the page.  
3. We updated [page] after a source challenge. Correction logged. Trust layer first.
`
}

function mediaKitHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Veritas Worldwide Press — Media Kit</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <style>
    :root { --parchment:#FAF8F5; --ink:#1A1A1A; --muted:#666666; --crimson:#8B1A1A; --gold:#B8860B; }
    * { box-sizing: border-box; }
    body { margin:0; font-family:Georgia,'Times New Roman',serif; color:var(--ink); background:var(--parchment); line-height:1.55; }
    .bar { height:4px; background:var(--crimson); }
    .wrap { max-width:760px; margin:0 auto; padding:40px 24px 80px; }
    .logo { width:72px; height:72px; display:block; margin-bottom:20px; }
    h1 { font-size:2rem; letter-spacing:0.06em; margin:0 0 8px; }
    .sub { font-family:Inter,Helvetica,Arial,sans-serif; font-size:0.75rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); }
    hr { border:0; border-top:1px solid var(--crimson); margin:28px 0; opacity:0.5; }
    h2 { font-size:1.15rem; margin:28px 0 10px; }
    p, li { font-size:1rem; color:#333; }
    a { color:var(--crimson); }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:12px; }
    @media (max-width:560px){ .grid { grid-template-columns:1fr; } }
    .card { border:1px solid #e5e7eb; background:#fff; padding:16px; border-radius:4px; }
    .card h3 { margin:0 0 8px; font-size:0.95rem; font-family:Inter,Helvetica,Arial,sans-serif; letter-spacing:0.04em; text-transform:uppercase; color:var(--crimson); }
    .card a { font-family:Inter,Helvetica,Arial,sans-serif; font-size:0.85rem; word-break:break-all; }
    .tag { color:var(--gold); font-family:Inter,Helvetica,Arial,sans-serif; font-size:0.7rem; letter-spacing:0.14em; text-transform:uppercase; font-weight:600; }
    footer { margin-top:40px; font-family:Inter,Helvetica,Arial,sans-serif; font-size:0.8rem; color:var(--muted); }
  </style>
</head>
<body>
  <div class="bar"></div>
  <div class="wrap">
    <p class="tag">Media kit · Veritas Worldwide Press · v${KIT_VERSION}</p>
    <img class="logo" src="/brand-kit/01-logos/logo-mark.svg" alt="Veritas Worldwide seal" />
    <h1>VERITAS WORLDWIDE PRESS</h1>
    <p class="sub">The Documentary Record</p>
    <hr />
    <p>Independent investigative publisher. Flagship work <em>The Record</em> is a multi-chapter documentary archive built on primary sources, public records, and explicit evidence-tier labeling.</p>
    <h2>Boilerplate</h2>
    <p>Veritas Worldwide publishes source-first investigations into power, money, and institutions. Full archive: <a href="https://veritasworldwide.com">veritasworldwide.com</a>. Interactive kit: <a href="https://veritasworldwide.com/media-kit">/media-kit</a>.</p>
    <h2>Brand assets</h2>
    <div class="grid">
      <div class="card"><h3>Logo mark</h3><a href="/brand-kit/01-logos/logo-mark.svg">logo-mark.svg</a><br /><a href="/brand-kit/01-logos/logo-mark-512.png">logo-mark-512.png</a></div>
      <div class="card"><h3>Wordmark / lockup</h3><a href="/brand-kit/01-logos/logo-full.svg">logo-full.svg</a><br /><a href="/brand-kit/03-wordmarks/wordmark.svg">wordmark.svg</a></div>
      <div class="card"><h3>Social / OG</h3><a href="/og-image.png">og-image.png</a><br /><a href="/brand-kit/04-social/social-banner-x.svg">X banner</a></div>
      <div class="card"><h3>Full kit</h3><a href="/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip">Ultimate Brand Kit (.zip)</a><br /><a href="/brand-kit/07-docs/BRAND-GUIDE.md">Brand guide</a></div>
    </div>
    <h2>Press contact</h2>
    <p>Rights &amp; media: <a href="mailto:rights@veritasworldwide.com">rights@veritasworldwide.com</a><br />Site: <a href="https://veritasworldwide.com">veritasworldwide.com</a></p>
    <footer>© Veritas Worldwide Press · Brand kit v${KIT_VERSION} · Primary sources. Public record. Your conclusions.</footer>
  </div>
  <div class="bar"></div>
</body>
</html>
`
}

function wcagContrastMd() {
  return `# Brand Color Contrast — WCAG 2.2 AA

| Pair | Ratio (approx) | Body text | Large text / UI |
|------|----------------|-----------|-----------------|
| Ink #1A1A1A on Parchment #FAF8F5 | ~16:1 | Pass | Pass |
| Crimson #8B1A1A on Parchment | ~8:1 | Pass | Pass |
| White on Crimson #8B1A1A | ~7:1 | Pass | Pass |
| Ink muted #666666 on Parchment | ~5.7:1 | Pass | Pass |
| Gold #B8860B on Parchment | ~3.1:1 | Fail body | Pass large only |
| Gold on Obsidian #0A0A0A | ~6:1 | Pass | Pass |

## Rules
- Never use gold for body copy on parchment.
- CTAs: white text on crimson, or crimson text on parchment with underline/weight.
- Dark mode raises crimson to #C43030 for AA on near-black surfaces.
- Minimum touch target for branded controls: 44×44 CSS px.
`
}

function brandGuideMd() {
  return `# Veritas Worldwide Press — Brand Kit v${KIT_VERSION}

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
| \`09-templates/*\` | Letterhead, email signature, press header |
| \`02-icons/apple-touch-icon.png\` | iOS home screen (180×180) |

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
    version: KIT_VERSION,
    assets: [
      { path: '01-logos/logo-mark.svg', alt: 'Veritas Worldwide publisher seal: serif letter V inside concentric crimson rings on parchment' },
      { path: '01-logos/logo-full.svg', alt: 'Veritas Worldwide Press logo lockup with seal and wordmark' },
      { path: '02-icons/app-icon.svg', alt: 'Veritas app icon: white V in circle on crimson rounded square' },
      { path: '02-icons/favicon.svg', alt: 'Veritas favicon' },
      { path: '02-icons/apple-touch-icon.png', alt: 'Veritas iOS home screen icon' },
      { path: '03-wordmarks/wordmark.svg', alt: 'VERITAS WORLDWIDE PRESS wordmark' },
      { path: '04-social/social-profile.svg', alt: 'Veritas social profile mark on crimson' },
      { path: '04-social/social-banner-x.svg', alt: 'The Record social banner for X' },
      { path: '05-og/og-image.svg', alt: 'Open Graph card for The Record by Veritas Worldwide Press' },
      { path: '08-ai-generated/seal-mark-parchment.jpg', alt: 'AI reference: parchment seal mark with crimson rings' },
      { path: '08-ai-generated/wordmark-lockup.jpg', alt: 'AI reference: horizontal wordmark lockup' },
      { path: '08-ai-generated/og-the-record.jpg', alt: 'AI reference: The Record social banner' },
      { path: '08-ai-generated/avatar-crimson.jpg', alt: 'AI reference: crimson avatar with white V' },
      { path: '09-templates/letterhead.svg', alt: 'Veritas Worldwide Press letterhead template' },
      { path: '09-templates/press-release-header.svg', alt: 'Press release header with Veritas branding' },
      { path: '09-templates/email-signature.html', alt: 'HTML email signature for Veritas Worldwide Press' },
    ],
  }, null, 2)
}

function buildZip() {
  const zipPath = join(ROOT, 'public', 'brand-kit', 'exports', 'Veritas-Worldwide-Ultimate-Brand-Kit.zip')
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
  let sha256 = ''
  try {
    sha256 = execSync(`shasum -a 256 "${zipPath}"`).toString().trim().split(/\s+/)[0]
  } catch {
    sha256 = ''
  }
  console.log(`ZIP: ${zipPath} (${(size / 1024).toFixed(1)} KB)${sha256 ? ` sha256=${sha256.slice(0, 12)}…` : ''}`)
  return { zipPath, size, sha256 }
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
  writeSvg('04-social/story-1080x1920.svg', socialBanner({ w: 1080, h: 1920, title: 'The Record', subtitle: 'PRIMARY SOURCES  ·  PUBLIC RECORD' }))
  writeSvg('04-social/highlight-chapters.svg', highlightCoverSvg('Chapters'))
  writeSvg('04-social/highlight-sources.svg', highlightCoverSvg('Sources'))
  writeSvg('04-social/highlight-record.svg', highlightCoverSvg('The Record'))
  writeFileSync(join(KIT, '04-social', 'SOCIAL-ASSET-MATRIX.md'), socialAssetMatrixMd())

  writeSvg('05-og/og-image.svg', ogImage())

  writeFileSync(join(KIT, '06-tokens', 'tokens.json'), tokensJson() + '\n')
  writeFileSync(join(KIT, '06-tokens', 'color-palette.svg'), colorPalette() + '\n')
  writeFileSync(join(KIT, '07-docs', 'BRAND-GUIDE.md'), brandGuideMd())
  writeFileSync(join(KIT, '07-docs', 'alt-text-manifest.json'), altTextManifest() + '\n')
  writeFileSync(join(KIT, '07-docs', 'USAGE-LEGAL.md'), `# Veritas Worldwide — Brand Usage & Legal

**Version:** ${KIT_VERSION}
**Owner:** Veritas Worldwide Press
**Contact:** rights@veritasworldwide.com

## Authorized use
- Official Veritas Worldwide Press communications, The Record product surfaces, licensed partners, and authorized media kits.
- Social profiles and banners for official @VeritasWorldwide accounts.

## Prohibited use
- Implying endorsement of a third party, political campaign, or product without written approval.
- Altering the seal proportions, recoloring outside brand tokens, or combining with competing marks that create confusion.
- Using the mark on merchandise sold for profit without a license.

## Press & rights
Editorial and licensing: rights@veritasworldwide.com
`)
  writeFileSync(join(KIT, '07-docs', 'CRISIS-MEDIA.md'), `# Crisis & Media Response Templates

## Holding statement
> Veritas Worldwide Press is reviewing the matter carefully. We publish from primary sources and will update The Record when documentary evidence is complete and verified. Media inquiries: rights@veritasworldwide.com

## Correction notice
> Correction — [DATE]: An earlier version of [piece] stated [claim]. The public record shows [correction]. We regret the error.

## Source challenge
> Please send documentary materials (URL or PDF with page numbers). We evaluate challenges against our Methodology standards.
`)

  writeFileSync(join(KIT, 'README.md'), brandGuideMd())

  // Site root favicon + OG
  writeFileSync(join(ROOT, 'public', 'favicon.svg'), favicon() + '\n')
  writeFileSync(join(ROOT, 'public', 'og-image.svg'), ogImage() + '\n')
  copyFileSync(join(KIT, '05-og', 'og-image.svg'), join(ROOT, 'public', 'og-image.svg'))

  // Templates
  writeSvg('09-templates/letterhead.svg', letterheadSvg())
  writeSvg('09-templates/press-release-header.svg', pressReleaseHeaderSvg())
  writeSvg('09-templates/business-card.svg', businessCardSvg())
  writeSvg('04-social/quote-card.svg', quoteCardSvg())
  writeSvg('04-social/youtube-thumbnail.svg', youtubeThumbnailSvg())
  writeSvg('04-social/linkedin-article-header.svg', linkedInArticleHeaderSvg())
  writeSvg('04-social/ig-carousel-1.svg', igCarouselSlideSvg(1, 'The Record', 'A documentary archive of power and institutions'))
  writeSvg('04-social/ig-carousel-2.svg', igCarouselSlideSvg(2, 'Primary sources', 'Public filings, transcripts, and attributable records'))
  writeSvg('04-social/ig-carousel-3.svg', igCarouselSlideSvg(3, 'Your conclusions', 'Methodology and sources stay open to inspect'))
  writeFileSync(join(KIT, '09-templates', 'email-signature.html'), emailSignatureHtml())
  writeFileSync(join(KIT, '09-templates', 'media-kit.html'), mediaKitHtml())
  writeFileSync(join(KIT, '09-templates', 'press-release-body.html'), pressReleaseBodyHtml())
  writeFileSync(join(KIT, '06-tokens', 'tokens.css'), tokensCss())
  writeFileSync(join(KIT, '07-docs', 'HASHTAGS.md'), hashtagsMd())
  writeFileSync(join(KIT, '07-docs', 'WCAG-CONTRAST.md'), wcagContrastMd())
  writeFileSync(join(KIT, '07-docs', 'SOCIAL-ASSET-MATRIX.md'), socialAssetMatrixMd())
  writeFileSync(join(KIT, '07-docs', 'BRAND-VOICE.md'), brandVoiceMd())

  // Rasterize key assets
  const rasters = [
    ['01-logos/logo-mark.svg', '01-logos/logo-mark-512.png', 512],
    ['01-logos/logo-mark.svg', '01-logos/logo-mark-256.png', 256],
    ['01-logos/logo-full.svg', '01-logos/logo-full.png', 800],
    ['01-logos/logo-full-stacked.svg', '01-logos/logo-full-stacked.png', 600],
    ['02-icons/app-icon.svg', '02-icons/app-icon-512.png', 512],
    ['02-icons/app-icon.svg', '02-icons/app-icon-192.png', 192],
    ['02-icons/app-icon.svg', '02-icons/apple-touch-icon.png', 180],
    ['02-icons/favicon.svg', '02-icons/favicon-32.png', 32],
    ['02-icons/favicon.svg', '02-icons/favicon-16.png', 16],
    ['04-social/social-profile.svg', '04-social/social-profile-400.png', 400],
    ['05-og/og-image.svg', '05-og/og-image.png', 1200],
    ['03-wordmarks/wordmark.svg', '03-wordmarks/wordmark.png', 720],
    ['09-templates/letterhead.svg', '09-templates/letterhead.png', 850],
    ['09-templates/press-release-header.svg', '09-templates/press-release-header.png', 1200],
    ['09-templates/business-card.svg', '09-templates/business-card.png', 1050],
    ['04-social/highlight-chapters.svg', '04-social/highlight-chapters.png', 400],
    ['04-social/highlight-sources.svg', '04-social/highlight-sources.png', 400],
    ['04-social/highlight-record.svg', '04-social/highlight-record.png', 400],
    ['04-social/quote-card.svg', '04-social/quote-card.png', 1080],
    ['04-social/youtube-thumbnail.svg', '04-social/youtube-thumbnail.png', 1280],
    ['04-social/linkedin-article-header.svg', '04-social/linkedin-article-header.png', 1128],
    ['04-social/ig-carousel-1.svg', '04-social/ig-carousel-1.png', 1080],
    ['04-social/ig-carousel-2.svg', '04-social/ig-carousel-2.png', 1080],
    ['04-social/ig-carousel-3.svg', '04-social/ig-carousel-3.png', 1080],
  ]
  for (const [src, dest, w] of rasters) {
    try {
      svgToPng(join(KIT, src), join(KIT, dest), w)
      console.log(`PNG ${dest}`)
    } catch (e) {
      console.warn(`PNG failed ${dest}:`, e.message)
    }
  }

  // Site root deployables
  try {
    copyFileSync(join(KIT, '05-og', 'og-image.png'), join(ROOT, 'public', 'og-image.png'))
    copyFileSync(join(KIT, '02-icons', 'apple-touch-icon.png'), join(ROOT, 'public', 'apple-touch-icon.png'))
    copyFileSync(join(KIT, '02-icons', 'favicon.svg'), join(ROOT, 'public', 'favicon.svg'))
    copyFileSync(join(KIT, '02-icons', 'favicon.svg'), join(KIT, 'favicon.svg'))
    copyFileSync(join(KIT, '01-logos', 'logo-mark-512.png'), join(ROOT, 'public', 'logo-mark-512.png'))
  } catch (e) {
    console.warn('Root asset copy warning:', e.message)
  }

  // Manifest for admin UI (written twice: before zip for completeness, after zip for hash)
  const manifestBase = {
    version: KIT_VERSION,
    name: 'Veritas Worldwide Ultimate Brand Kit',
    generatedAt: new Date().toISOString(),
    zipPath: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip',
    publicMediaKit: '/media-kit',
    staticMediaKit: '/brand-kit/09-templates/media-kit.html',
    sections: [
      { id: '01-logos', title: 'Logos', description: 'Primary seal, full lockups, monochrome variants' },
      { id: '02-icons', title: 'Icons & Favicon', description: 'App icon, favicon, apple-touch, sized marks' },
      { id: '03-wordmarks', title: 'Wordmarks', description: 'Text-only brand typography' },
      { id: '04-social', title: 'Social', description: 'Profile, banners, story, highlights, quote cards' },
      { id: '05-og', title: 'Open Graph', description: 'Default social share card' },
      { id: '06-tokens', title: 'Design Tokens', description: 'Colors, type, CSS custom properties' },
      { id: '07-docs', title: 'Documentation', description: 'Guide, voice, legal, hashtags, contrast' },
      { id: '08-ai-generated', title: 'AI References', description: 'Grok Imagine brand direction renders' },
      { id: '09-templates', title: 'Templates', description: 'Letterhead, signature, press, business card, media kit' },
    ],
    downloads: [
      { label: 'Ultimate Brand Kit (.zip)', href: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip', adminOnly: true },
      { label: 'Logo mark (SVG)', href: '/brand-kit/01-logos/logo-mark.svg' },
      { label: 'Logo mark (PNG 512)', href: '/brand-kit/01-logos/logo-mark-512.png' },
      { label: 'Full lockup (SVG)', href: '/brand-kit/01-logos/logo-full.svg' },
      { label: 'App icon (SVG)', href: '/brand-kit/02-icons/app-icon.svg' },
      { label: 'Apple touch icon (PNG)', href: '/brand-kit/02-icons/apple-touch-icon.png' },
      { label: 'Wordmark (SVG)', href: '/brand-kit/03-wordmarks/wordmark.svg' },
      { label: 'OG image (PNG)', href: '/brand-kit/05-og/og-image.png' },
      { label: 'X banner (SVG)', href: '/brand-kit/04-social/social-banner-x.svg' },
      { label: 'IG story (SVG)', href: '/brand-kit/04-social/story-1080x1920.svg' },
      { label: 'Quote card (SVG)', href: '/brand-kit/04-social/quote-card.svg' },
      { label: 'YouTube thumbnail (SVG)', href: '/brand-kit/04-social/youtube-thumbnail.svg' },
      { label: 'LinkedIn article header', href: '/brand-kit/04-social/linkedin-article-header.svg' },
      { label: 'IG carousel 1–3', href: '/brand-kit/04-social/ig-carousel-1.svg' },
      { label: 'Social asset matrix', href: '/brand-kit/04-social/SOCIAL-ASSET-MATRIX.md' },
      { label: 'Email signature (HTML)', href: '/brand-kit/09-templates/email-signature.html' },
      { label: 'Letterhead (SVG)', href: '/brand-kit/09-templates/letterhead.svg' },
      { label: 'Business card (SVG)', href: '/brand-kit/09-templates/business-card.svg' },
      { label: 'Press release template', href: '/brand-kit/09-templates/press-release-body.html' },
      { label: 'Media kit (HTML)', href: '/brand-kit/09-templates/media-kit.html' },
      { label: 'Public media kit page', href: '/media-kit' },
      { label: 'Brand guide (MD)', href: '/brand-kit/07-docs/BRAND-GUIDE.md' },
      { label: 'Brand voice (MD)', href: '/brand-kit/07-docs/BRAND-VOICE.md' },
      { label: 'Hashtags (MD)', href: '/brand-kit/07-docs/HASHTAGS.md' },
      { label: 'Tokens (JSON)', href: '/brand-kit/06-tokens/tokens.json' },
      { label: 'Tokens (CSS)', href: '/brand-kit/06-tokens/tokens.css' },
      { label: 'ZIP SHA-256', href: '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.sha256' },
    ],
    platformAssets: {
      x: { profile: '/brand-kit/04-social/social-profile-400.png', banner: '/brand-kit/04-social/social-banner-x.svg' },
      instagram: {
        profile: '/brand-kit/04-social/social-profile-400.png',
        story: '/brand-kit/04-social/story-1080x1920.svg',
        carousel: [
          '/brand-kit/04-social/ig-carousel-1.svg',
          '/brand-kit/04-social/ig-carousel-2.svg',
          '/brand-kit/04-social/ig-carousel-3.svg',
        ],
      },
      linkedin: {
        logo: '/brand-kit/01-logos/logo-mark-512.png',
        banner: '/brand-kit/04-social/social-banner-linkedin.svg',
        articleHeader: '/brand-kit/04-social/linkedin-article-header.svg',
      },
      facebook: { profile: '/brand-kit/04-social/social-profile-400.png', cover: '/brand-kit/04-social/social-banner-facebook.svg' },
      youtube: {
        profile: '/brand-kit/02-icons/app-icon-512.png',
        banner: '/brand-kit/04-social/social-banner-youtube.svg',
        thumbnail: '/brand-kit/04-social/youtube-thumbnail.svg',
      },
    },
  }
  writeFileSync(join(KIT, 'manifest.json'), JSON.stringify(manifestBase, null, 2) + '\n')

  const { size, sha256 } = buildZip()
  // Publish integrity on the site (not re-zipped — self-hash would thrash)
  const manifestFinal = {
    ...manifestBase,
    zipBytes: size,
    zipSha256: sha256 || null,
  }
  writeFileSync(join(KIT, 'manifest.json'), JSON.stringify(manifestFinal, null, 2) + '\n')
  if (sha256) {
    writeFileSync(
      join(KIT, 'exports', 'Veritas-Worldwide-Ultimate-Brand-Kit.sha256'),
      `${sha256}  Veritas-Worldwide-Ultimate-Brand-Kit.zip\n`,
    )
  }
  console.log(`Brand kit v${KIT_VERSION} generation complete.`)
}

main()
