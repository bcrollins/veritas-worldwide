#!/usr/bin/env node

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const distDir = path.join(repoRoot, 'dist')
const screenshotDir = path.join(repoRoot, 'generated', 'visual-checks')
const route = '/institute/book'
const require = createRequire(import.meta.url)

const devices = [
  ['iphone-se', 375, 667, 2],
  ['iphone-15', 393, 852, 3],
  ['iphone-17-pro-max', 440, 956, 3],
  ['ipad-10th', 820, 1180, 2],
  ['desktop-1440', 1440, 900, 1],
  ['desktop-1920', 1920, 1080, 1],
]

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
])

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function resolveDistPath(urlPath) {
  if (urlPath === '/' || urlPath === '') return path.join(distDir, 'index.html')
  if (urlPath === route) return path.join(distDir, 'prerender', 'institute__book.html')

  const cleanPath = decodeURIComponent(urlPath).replace(/^\/+/, '')
  return path.join(distDir, cleanPath)
}

function createStaticServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://127.0.0.1')
    const filePath = resolveDistPath(url.pathname)

    if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    res.writeHead(200, {
      'content-type': contentTypes.get(path.extname(filePath)) || 'application/octet-stream',
    })
    fs.createReadStream(filePath).pipe(res)
  })
}

assert(fs.existsSync(path.join(distDir, 'prerender', 'institute__book.html')), 'dist prerender file missing; run npm run postbuild first')
fs.mkdirSync(screenshotDir, { recursive: true })

const server = createStaticServer()
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))

const { port } = server.address()
const url = `http://127.0.0.1:${port}${route}`
const { chromium } = await loadPlaywright()
const browser = await chromium.launch({ headless: true })
const results = []

try {
  for (const [name, width, height, deviceScaleFactor] of devices) {
    const context = await browser.newContext({
      deviceScaleFactor,
      hasTouch: width < 900,
      isMobile: width < 768,
      javaScriptEnabled: false,
      viewport: { width, height },
    })
    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'networkidle' })

    const result = await page.evaluate(() => {
      const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) =>
        JSON.parse(node.textContent || '{}')
      )
      const fieldList = scripts.find((entry) => entry['@type'] === 'ItemList' && entry.name === 'Field manual emergency entries')

      return {
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        fieldItems: fieldList?.itemListElement?.length || 0,
        hasDecisionRule: document.body.textContent?.includes('Decision rule') || false,
        hasEscalate: document.body.textContent?.includes('Escalate if:') || false,
        hasGenerator: document.body.textContent?.includes('Run a generator without poisoning the house') || false,
        scrollWidth: document.documentElement.scrollWidth,
        title: document.title,
        viewportWidth: window.innerWidth,
      }
    })

    await page.screenshot({
      fullPage: false,
      path: path.join(screenshotDir, `institute-book-${name}.png`),
    })
    await context.close()

    results.push({
      name,
      ...result,
      overflow: result.scrollWidth > result.viewportWidth,
    })
  }
} finally {
  await browser.close()
  server.close()
}

for (const result of results) {
  assert(!result.overflow, `${result.name} horizontal overflow: ${result.scrollWidth} > ${result.viewportWidth}`)
  assert(result.canonical === 'https://veritasworldwide.com/institute/book', `${result.name} canonical mismatch`)
  assert(result.fieldItems === 25, `${result.name} expected 25 field JSON-LD items, got ${result.fieldItems}`)
  assert(result.hasDecisionRule && result.hasEscalate && result.hasGenerator, `${result.name} missing rendered manual content`)
}

console.log(`[verify:institute-render] PASS — ${results.length} viewports, screenshots ${screenshotDir}`)

async function loadPlaywright() {
  try {
    return await import('playwright')
  } catch (error) {
    if (!process.env.PLAYWRIGHT_MODULE_PATH) {
      throw error
    }
    return require(process.env.PLAYWRIGHT_MODULE_PATH)
  }
}
