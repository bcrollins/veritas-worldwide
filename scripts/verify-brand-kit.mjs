#!/usr/bin/env node
/**
 * Verify Veritas brand kit integrity (assets, ZIP, manifest).
 * Run: node scripts/verify-brand-kit.mjs
 * Optional: BRAND_KIT_BASE_URL=https://veritasworldwide.com node scripts/verify-brand-kit.mjs
 */
import { existsSync, readFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const KIT = join(ROOT, 'public', 'brand-kit')
const base = process.env.BRAND_KIT_BASE_URL || ''

const required = [
  'manifest.json',
  'README.md',
  'logo-mark.svg',
  'logo-full.svg',
  'favicon.svg',
  '01-logos/logo-mark.svg',
  '01-logos/logo-full.svg',
  '01-logos/logo-full-stacked.svg',
  '01-logos/logo-mark-512.png',
  '02-icons/app-icon.svg',
  '02-icons/favicon.svg',
  '02-icons/app-icon-512.png',
  '02-icons/apple-touch-icon.png',
  '02-icons/favicon-32.png',
  '02-icons/favicon-16.png',
  '03-wordmarks/wordmark.svg',
  '04-social/social-profile.svg',
  '04-social/social-banner-x.svg',
  '05-og/og-image.svg',
  '05-og/og-image.png',
  '06-tokens/tokens.json',
  '07-docs/BRAND-GUIDE.md',
  '07-docs/alt-text-manifest.json',
  '08-ai-generated/seal-mark-parchment.jpg',
  '08-ai-generated/wordmark-lockup.jpg',
  '08-ai-generated/og-the-record.jpg',
  '08-ai-generated/avatar-crimson.jpg',
  '09-templates/letterhead.svg',
  '09-templates/email-signature.html',
  '09-templates/press-release-header.svg',
  '07-docs/USAGE-LEGAL.md',
  '07-docs/CRISIS-MEDIA.md',
  '07-docs/HASHTAGS.md',
  '07-docs/WCAG-CONTRAST.md',
  '07-docs/SOCIAL-ASSET-MATRIX.md',
  '06-tokens/tokens.css',
  '04-social/story-1080x1920.svg',
  '04-social/SOCIAL-ASSET-MATRIX.md',
  '04-social/highlight-chapters.svg',
  '04-social/highlight-sources.svg',
  '04-social/highlight-record.svg',
  '09-templates/business-card.svg',
  '09-templates/media-kit.html',
  '04-social/quote-card.svg',
  '04-social/youtube-thumbnail.svg',
  '04-social/linkedin-article-header.svg',
  '04-social/ig-carousel-1.svg',
  '04-social/ig-carousel-2.svg',
  '04-social/ig-carousel-3.svg',
  '09-templates/press-release-body.html',
  '07-docs/BRAND-VOICE.md',
  '04-social/evidence-tier-verified.svg',
  '04-social/evidence-tier-disputed.svg',
  '04-social/evidence-tier-circumstantial.svg',
  '04-social/evidence-tier-documented.svg',
  '04-social/evidence-tier-contested.svg',
  '04-social/evidence-tier-unverified.svg',
  '04-social/podcast-cover.svg',
  '04-social/podcast-cover.png',
  '04-social/x-post-card.svg',
  '04-social/newsletter-header.svg',
  '09-templates/presentation-title.svg',
  '09-templates/source-stamp.svg',
  '07-docs/brand-do-dont.svg',
  '07-docs/CHANGELOG.md',
  '07-docs/EVIDENCE-TIERS.md',
  'exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip',
  'exports/Veritas-Worldwide-Ultimate-Brand-Kit.sha256',
]

let failed = 0

function ok(msg) {
  console.log(`  ✓ ${msg}`)
}
function bad(msg) {
  console.error(`  ✗ ${msg}`)
  failed++
}

console.log('Brand kit file checks')
for (const rel of required) {
  const p = join(KIT, rel)
  if (!existsSync(p)) {
    bad(`missing ${rel}`)
    continue
  }
  const st = statSync(p)
  if (st.size < 32) bad(`too small ${rel} (${st.size}b)`)
  else ok(`${rel} (${st.size}b)`)
}

// SVG not corrupted binary stubs
for (const rel of ['logo-mark.svg', '01-logos/logo-mark.svg', '02-icons/favicon.svg']) {
  const raw = readFileSync(join(KIT, rel), 'utf8')
  if (!raw.includes('<svg') || !raw.includes('viewBox')) bad(`${rel} is not valid SVG`)
  else ok(`${rel} is valid SVG`)
}

// Favicon + apple-touch at site root
const fav = join(ROOT, 'public', 'favicon.svg')
if (!existsSync(fav) || !readFileSync(fav, 'utf8').includes('<svg')) bad('public/favicon.svg invalid')
else ok('public/favicon.svg valid')
const apple = join(ROOT, 'public', 'apple-touch-icon.png')
if (!existsSync(apple) || statSync(apple).size < 500) bad('public/apple-touch-icon.png missing/small')
else ok(`public/apple-touch-icon.png (${statSync(apple).size}b)`)
const rootMark = join(ROOT, 'public', 'logo-mark-512.png')
if (!existsSync(rootMark) || statSync(rootMark).size < 500) bad('public/logo-mark-512.png missing/small')
else ok(`public/logo-mark-512.png (${statSync(rootMark).size}b)`)

// index.html brand head tags
const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8')
for (const needle of [
  'apple-touch-icon',
  'theme-color" content="#FAF8F5"',
  'theme-color" content="#1A1A1A"',
  'favicon-32.png',
  'mask-icon',
]) {
  if (!indexHtml.includes(needle)) bad(`index.html missing ${needle}`)
  else ok(`index.html has ${needle}`)
}

// Manifest schema
const manifest = JSON.parse(readFileSync(join(KIT, 'manifest.json'), 'utf8'))
if (!manifest.zipPath?.includes('Brand-Kit.zip')) bad('manifest zipPath missing')
else ok(`manifest v${manifest.version}`)
if (!Array.isArray(manifest.sections) || manifest.sections.length < 8) bad('manifest sections incomplete')
else ok(`${manifest.sections.length} sections`)
if (!String(manifest.version || '').startsWith('2.')) bad('manifest version not 2.x')
else ok(`version ${manifest.version}`)
if (manifest.zipSha256 && !/^[a-f0-9]{64}$/i.test(manifest.zipSha256)) bad('zipSha256 invalid')
else if (manifest.zipSha256) ok(`zipSha256 ${manifest.zipSha256.slice(0, 12)}…`)
else ok('zipSha256 optional (regen kit to populate)')

const zip = join(KIT, 'exports', 'Veritas-Worldwide-Ultimate-Brand-Kit.zip')
const zipSize = statSync(zip).size
if (zipSize < 100_000) bad(`ZIP too small: ${zipSize}`)
else ok(`ZIP ${(zipSize / 1024).toFixed(1)} KB`)

// Optional live checks
if (base) {
  console.log(`\nLive checks against ${base}`)
  const paths = [
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/logo-mark-512.png',
    '/brand-kit/manifest.json',
    '/brand-kit/01-logos/logo-mark.svg',
    '/brand-kit/01-logos/logo-mark-512.png',
    '/brand-kit/02-icons/apple-touch-icon.png',
    '/brand-kit/09-templates/email-signature.html',
    '/brand-kit/09-templates/letterhead.svg',
    '/brand-kit/09-templates/business-card.svg',
    '/brand-kit/09-templates/media-kit.html',
    '/brand-kit/04-social/quote-card.svg',
    '/brand-kit/04-social/youtube-thumbnail.svg',
    '/brand-kit/07-docs/BRAND-VOICE.md',
    '/brand-kit/06-tokens/tokens.css',
    '/media-kit',
    '/brand-kit/04-social/SOCIAL-ASSET-MATRIX.md',
    '/brand-kit/04-social/highlight-chapters.svg',
    '/brand-kit/07-docs/HASHTAGS.md',
    '/brand-kit/04-social/evidence-tier-verified.svg',
    '/brand-kit/04-social/evidence-tier-circumstantial.svg',
    '/brand-kit/04-social/evidence-tier-disputed.svg',
    '/brand-kit/04-social/podcast-cover.png',
    '/brand-kit/04-social/x-post-card.svg',
    '/brand-kit/09-templates/presentation-title.svg',
    '/brand-kit/09-templates/source-stamp.svg',
    '/brand-kit/07-docs/brand-do-dont.svg',
    '/brand-kit/07-docs/CHANGELOG.md',
    '/brand-kit/07-docs/EVIDENCE-TIERS.md',
    '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip',
    '/og-image.png',
  ]
  async function headOk(url) {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      if (res.ok) return { ok: true, status: res.status }
      const get = await fetch(url, { method: 'GET' })
      return { ok: get.ok, status: get.status }
    } catch (e) {
      return { ok: false, status: 0, error: e instanceof Error ? e.message : String(e) }
    }
  }
  for (const path of paths) {
    const url = `${base}${path}`
    let result = await headOk(url)
    if (!result.ok) {
      await new Promise(r => setTimeout(r, 400))
      result = await headOk(url)
    }
    if (!result.ok) bad(`live ${path} → ${result.error || result.status}`)
    else ok(`live ${path} → ${result.status}`)
  }
}

console.log(failed === 0 ? '\nPASS brand kit verification' : `\nFAIL ${failed} check(s)`)
process.exit(failed === 0 ? 0 : 1)
