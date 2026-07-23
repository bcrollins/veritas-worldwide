#!/usr/bin/env node

import path from 'node:path'
import { chromium } from 'playwright'

const cliBaseUrl = process.argv[2]
const baseUrl = cliBaseUrl || process.env.PUBLIC_VISUAL_TEST_BASE_URL || 'http://127.0.0.1:3000'
const screenshotDir = process.env.PUBLIC_VISUAL_SCREENSHOT_DIR || ''

const devices = [
  { name: 'iphone-se', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'iphone-15-16', width: 393, height: 852, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { name: 'iphone-17-pro-max', width: 440, height: 956, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  { name: 'ipad-10th-gen', width: 820, height: 1180, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: 'desktop-1440', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  { name: 'desktop-1920', width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
]

const routes = [
  { path: '/', text: ['The Record'] },
  { path: '/read', text: ['ARCHIVE GUIDE', 'ACCESS', 'Full'] },
  { path: '/chapter/chapter-1', text: ['The Birth of Central Banking', '8 SOURCES CITED'] },
  {
    path: '/sources',
    text: ['Sources & References', 'WITH DIRECT LINKS'],
    anyText: ['Field Manual', 'FIELD MANUAL', 'Methodology', 'METHODOLOGY', 'Record PDF', 'RECORD PDF'],
  },
  { path: '/search?q=federal+reserve', text: ['Search The Record'], anyText: ['result', 'Result', 'RESULT', 'Federal', 'FEDERAL'] },
  // SPA-lazy surfaces. CSS uppercase headings mean innerText may be ALL CAPS — match case-insensitively below.
  { path: '/content-pack', text: ['Content Pack'], anyText: ['Brand Assets', 'BRAND ASSETS', 'Shareable Graphics', 'SHAREABLE GRAPHICS', 'Usage Guidelines', 'USAGE GUIDELINES'] },
  {
    path: '/analytics',
    text: ['Reader Analytics', 'READER ANALYTICS'],
    anyOfAll: false,
    anyText: [
      'Release Health',
      'RELEASE HEALTH',
      'Lifetime Views',
      'LIFETIME VIEWS',
      'Transparency',
      'TRANSPARENCY',
      'Client Errors',
      'CLIENT ERRORS',
      'Deploy transitions',
      'DEPLOY TRANSITIONS',
      'Commits in window',
      'COMMITS IN WINDOW',
    ],
  },
  { path: '/israel-dossier', text: ['Israel', 'ISRAEL'], anyText: ['Archive pins', 'ARCHIVE PINS', 'Evidence Workbooks', 'EVIDENCE WORKBOOKS', 'Dossier', 'DOSSIER'] },
  { path: '/israel-dossier/briefing', text: ['briefing', 'BRIEFING'], anyText: ['source', 'Source', 'SOURCE', 'workbook', 'WORKBOOK'] },
  { path: '/bernie', text: ['The Bernie Rollins Show'] },
  {
    path: '/record-of-jesus-christ',
    text: ['Record of Jesus Christ', 'RECORD OF JESUS CHRIST'],
    anyText: ['Verified', 'VERIFIED', 'Evidence', 'EVIDENCE', 'tier', 'Tier', 'TIER', 'Sources', 'SOURCES'],
  },
  {
    path: '/bible',
    text: ['Bible', 'BIBLE'],
    anyText: ['Evidence', 'EVIDENCE', 'Verified', 'VERIFIED', 'Scroll', 'SCROLL'],
  },
  {
    path: '/deep-state',
    text: ['Deep State', 'DEEP STATE', 'Epstein', 'EPSTEIN'],
    anyText: ['source', 'Source', 'SOURCE', 'Verified', 'VERIFIED', 'Methodology', 'METHODOLOGY'],
  },
  {
    path: '/forum',
    text: ['Forum', 'FORUM', 'Community', 'COMMUNITY'],
    anyText: ['thread', 'Thread', 'THREAD', 'beta', 'Beta', 'BETA', 'post', 'Post', 'POST'],
  },
  {
    path: '/about',
    text: ['About', 'ABOUT'],
    anyText: ['Record', 'RECORD', 'Methodology', 'METHODOLOGY', 'Membership', 'MEMBERSHIP'],
  },
  {
    path: '/media-kit',
    text: ['Media Kit', 'MEDIA KIT'],
    anyText: ['Brand', 'BRAND', 'Download', 'DOWNLOAD', 'logo', 'Logo', 'LOGO', 'ZIP'],
  },
  {
    path: '/accessibility',
    text: ['Accessibility', 'ACCESSIBILITY'],
    anyText: ['WCAG', 'contrast', 'Contrast', 'touch', 'Touch', '44'],
  },
  {
    path: '/profiles',
    text: ['Profiles', 'PROFILES'],
    anyText: ['topic', 'Topic', 'TOPIC', 'people', 'People', 'PEOPLE', 'claim', 'Claim', 'CLAIM'],
  },
  { path: '/methodology', text: ['Methodology', 'evidence'], anyText: ['Verified', 'VERIFIED', 'Circumstantial', 'CIRCUMSTANTIAL', 'Field Manual', 'FIELD MANUAL', 'Institute', 'INSTITUTE'] },
  { path: '/membership', text: ['Membership', 'MEMBERSHIP'], anyText: ['Support', 'SUPPORT', 'free', 'Free'] },
  { path: '/news', text: ['News', 'NEWS', 'Current', 'CURRENT'], anyText: ['source', 'Source', 'SOURCE', 'article', 'Article', 'ARTICLE'] },
  {
    path: '/news/election-security-ai-risk-frameworks-cisa-nist-2026',
    text: ['Election', 'ELECTION', 'CISA', 'NIST'],
    anyText: ['source', 'Source', 'SOURCE', 'Risk', 'RISK', 'Security', 'SECURITY'],
  },
  {
    path: '/news/treasury-debt-transparency-fiscaldata-fed-h15-2026',
    text: ['Treasury', 'TREASURY', 'Debt', 'DEBT', 'Fiscal'],
    anyText: ['source', 'Source', 'SOURCE', 'H.15', 'FiscalData', 'Federal'],
  },
  {
    path: '/institute',
    text: ['Veritas Institute', 'VERITAS INSTITUTE', 'Field Manual', 'FIELD MANUAL'],
    anyText: [
      'Download Field Manual PDF',
      'DOWNLOAD FIELD MANUAL PDF',
      'field-manual',
      'FIELD-MANUAL',
      'Open the Field Manual',
      'OPEN THE FIELD MANUAL',
    ],
  },
  {
    path: '/institute/book',
    text: ['Field Manual', 'FIELD MANUAL'],
    anyText: [
      'Download Field Manual PDF',
      'DOWNLOAD FIELD MANUAL PDF',
      'Direct PDF link',
      'DIRECT PDF LINK',
      'field-manual',
      'FIELD-MANUAL',
    ],
  },
  { path: '/topics/federal-reserve', text: ['Federal Reserve', 'FEDERAL RESERVE'], anyText: ['primary-source', 'Topic', 'Subscribe', 'SUBSCRIBE'] },
  { path: '/about', text: ['About', 'ABOUT'], anyText: ['Methodology', 'Field Manual', 'Membership', 'Veritas'] },
  { path: '/terms', text: ['core downloads are public without a login'] },
]

const forbidden = [
  /Private Access/i,
  /Enter the password/i,
  /Free reader accounts unlock the full archive/i,
  /Full downloads require a free reader account/i,
  /Paid subscriptions unlock the full 32-part investigation/i,
  /remaining archive unlocks after reader access/i,
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function getUrl(routePath) {
  return new URL(routePath, baseUrl).toString()
}

function safeName(value) {
  return value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'home'
}

function logStep(step, detail = '') {
  console.log(`[verify:public-visuals] ${step}${detail ? ` — ${detail}` : ''}`)
}

async function main() {
  logStep('Starting visual public-access verification', baseUrl)
  const browser = await chromium.launch({ headless: true })

  try {
    for (const device of devices) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.deviceScaleFactor,
        isMobile: device.isMobile,
        hasTouch: device.hasTouch,
      })
      const page = await context.newPage()

      try {
        for (const route of routes) {
          const response = await page.goto(getUrl(route.path), { waitUntil: 'domcontentloaded', timeout: 45_000 })
          assert(response?.ok(), `${device.name} ${route.path} returned ${response?.status() || 'no response'}`)
          await page.waitForLoadState('load', { timeout: 15_000 }).catch(() => {})
          await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {})
          await page.locator('body').waitFor({ timeout: 10_000 })
          // Give lazy route chunks a beat to hydrate on mobile.
          await page.waitForTimeout(750)
          const includesCI = (haystack, needle) => haystack.toLowerCase().includes(String(needle).toLowerCase())
          await page.waitForFunction(
            (needles) => {
              const body = document.body.innerText.toLowerCase()
              return needles.some((needle) => body.includes(String(needle).toLowerCase()))
            },
            route.text,
            { timeout: 25_000 }
          ).catch(async () => {
            const bodyText = await page.locator('body').innerText({ timeout: 5_000 }).catch(() => '')
            throw new Error(`${device.name} ${route.path} missing any of ${route.text.map((needle) => `"${needle}"`).join(', ')} (body sample: ${bodyText.slice(0, 160).replace(/\s+/g, ' ')})`)
          })

          const bodyText = await page.locator('body').innerText({ timeout: 10_000 })
          const requiredHit = route.text.some((needle) => includesCI(bodyText, needle))
          assert(requiredHit, `${device.name} ${route.path} missing any of ${route.text.map((needle) => `"${needle}"`).join(', ')}`)
          if (Array.isArray(route.anyText) && route.anyText.length > 0) {
            const matched = route.anyText.some((needle) => includesCI(bodyText, needle))
            assert(
              matched,
              `${device.name} ${route.path} missing any of ${route.anyText.map((needle) => `"${needle}"`).join(', ')}`
            )
          }
          for (const pattern of forbidden) {
            assert(!pattern.test(bodyText), `${device.name} ${route.path} rendered forbidden copy ${pattern}`)
          }

          const metrics = await page.evaluate(() => ({
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
            height: document.documentElement.scrollHeight,
          }))
          assert(metrics.overflow <= 2 && metrics.bodyOverflow <= 2, `${device.name} ${route.path} horizontal overflow html=${metrics.overflow} body=${metrics.bodyOverflow}`)
          assert(metrics.height > 0, `${device.name} ${route.path} rendered an empty document`)

          if (screenshotDir) {
            await page.screenshot({
              path: path.join(screenshotDir, `${device.name}-${safeName(route.path)}.png`),
              fullPage: false,
            })
          }
        }
      } finally {
        await context.close()
      }

      logStep('Device matrix passed', `${device.name} ${device.width}x${device.height}`)
    }
  } finally {
    await browser.close()
  }

  console.log('[verify:public-visuals] PASS')
}

main().catch((error) => {
  console.error(`[verify:public-visuals] FAIL — ${error.message}`)
  process.exit(1)
})
