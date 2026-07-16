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
  { path: '/sources', text: ['Sources & References', 'WITH DIRECT LINKS'] },
  { path: '/search?q=federal+reserve', text: ['Search The Record'] },
  // SPA-lazy surfaces. CSS uppercase headings mean innerText may be ALL CAPS — match case-insensitively below.
  { path: '/content-pack', text: ['Content Pack'], anyText: ['Brand Assets', 'BRAND ASSETS', 'Shareable Graphics', 'SHAREABLE GRAPHICS', 'Usage Guidelines', 'USAGE GUIDELINES'] },
  { path: '/analytics', text: ['Reader Analytics', 'READER ANALYTICS'], anyOfAll: false, anyText: ['Release Health', 'RELEASE HEALTH', 'Lifetime Views', 'LIFETIME VIEWS', 'Transparency', 'TRANSPARENCY'] },
  { path: '/israel-dossier', text: ['Israel', 'ISRAEL'], anyText: ['Archive pins', 'ARCHIVE PINS', 'Evidence Workbooks', 'EVIDENCE WORKBOOKS', 'Dossier', 'DOSSIER'] },
  { path: '/israel-dossier/briefing', text: ['briefing', 'BRIEFING'], anyText: ['source', 'Source', 'SOURCE', 'workbook', 'WORKBOOK'] },
  { path: '/bernie', text: ['The Bernie Rollins Show'] },
  { path: '/methodology', text: ['Methodology', 'evidence'], anyText: ['Verified', 'VERIFIED', 'Circumstantial', 'CIRCUMSTANTIAL'] },
  { path: '/membership', text: ['Membership', 'MEMBERSHIP'], anyText: ['Support', 'SUPPORT', 'free', 'Free'] },
  { path: '/topics/federal-reserve', text: ['Federal Reserve', 'FEDERAL RESERVE'], anyText: ['primary-source', 'Topic', 'Subscribe', 'SUBSCRIBE'] },
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
