#!/usr/bin/env node

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = (process.argv[2] || process.env.ISRAEL_DOSSIER_VERIFY_BASE_URL || `http://127.0.0.1:${process.env.PORT || '4382'}`).replace(/\/$/, '')
const downloadDir = fs.mkdtempSync(path.join(os.tmpdir(), 'veritas-israel-dossier-'))
const errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

function parseShowingCount(text) {
  const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+sources/i)
  if (!match) return null
  return { filtered: Number(match[1]), total: Number(match[2]) }
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function getMetaContent(html, name, attr = 'property') {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const patternA = new RegExp(`<meta[^>]+${attr}=["']${escapedName}["'][^>]+content=["']([^"']*)["']`, 'i')
  const patternB = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${escapedName}["']`, 'i')
  return decodeHtml(html.match(patternA)?.[1] || html.match(patternB)?.[1] || '')
}

function getTitle(html) {
  return decodeHtml(html.match(/<title>(.*?)<\/title>/i)?.[1] || '')
}

function decodePdfLiteral(value) {
  let decoded = ''

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i]
    if (char !== '\\') {
      decoded += char
      continue
    }

    const next = value[i + 1]
    if (!next) {
      break
    }

    if (next === 'n') decoded += '\n'
    else if (next === 'r') decoded += '\r'
    else if (next === 't') decoded += '\t'
    else if (next === 'b') decoded += '\b'
    else if (next === 'f') decoded += '\f'
    else if (next === '(' || next === ')' || next === '\\') decoded += next
    else if (/[0-7]/.test(next)) {
      const octal = value.slice(i + 1, i + 4).match(/^[0-7]{1,3}/)?.[0] || next
      decoded += String.fromCharCode(Number.parseInt(octal, 8))
      i += octal.length - 1
    } else {
      decoded += next
    }

    i += 1
  }

  return decoded
}

function extractPdfText(filePath) {
  const raw = fs.readFileSync(filePath, 'latin1')
  const chunks = []

  for (const match of raw.matchAll(/\((?:\\[\s\S]|[^\\)])*\)\s*Tj/g)) {
    const literal = match[0].slice(1, match[0].lastIndexOf(')'))
    chunks.push(decodePdfLiteral(literal))
  }

  for (const match of raw.matchAll(/\[(.*?)\]\s*TJ/g)) {
    for (const literal of match[1].matchAll(/\((?:\\[\s\S]|[^\\)])*\)/g)) {
      chunks.push(decodePdfLiteral(literal[0].slice(1, -1)))
    }
  }

  return chunks.join(' ').replace(/\s+/g, ' ').trim()
}

async function getWorkbenchCount(workbench) {
  const summary = workbench.locator('text=/Showing\\s+\\d+\\s+of\\s+\\d+\\s+sources/i').first()
  await summary.waitFor({ timeout: 10000 })
  const text = await summary.innerText()
  return parseShowingCount(text)
}

async function waitForSectionText(page, selector, needle) {
  await page.waitForFunction(
    ({ selector: sectionSelector, needle: expected }) => document.querySelector(sectionSelector)?.textContent?.toLowerCase().includes(expected.toLowerCase()),
    { selector, needle },
    { timeout: 15000 },
  )
}

async function saveAndMeasureDownload(download, expectedNamePattern, minBytes) {
  const failure = await download.failure()
  assert(!failure, `download failed: ${failure}`)

  const suggestedName = download.suggestedFilename()
  assert(expectedNamePattern.test(suggestedName), `download filename mismatch: ${suggestedName}`)

  const filePath = path.join(downloadDir, suggestedName)
  await download.saveAs(filePath)
  const bytes = fs.statSync(filePath).size
  assert(bytes >= minBytes, `${suggestedName} too small: ${bytes} bytes`)
  return { suggestedName, bytes, filePath }
}

async function verifyPreviewImage(browser, label, imageUrl) {
  const response = await fetch(imageUrl, {
    headers: { 'user-agent': 'Twitterbot/1.0' },
  })
  assert(response.ok, `${label} preview image returned ${response.status}: ${imageUrl}`)
  const contentType = response.headers.get('content-type') || ''
  assert(contentType.startsWith('image/'), `${label} preview image content-type mismatch: ${contentType}`)
  const bytes = (await response.arrayBuffer()).byteLength
  assert(bytes > 10_000, `${label} preview image too small: ${bytes} bytes`)

  const context = await browser.newContext()
  const page = await context.newPage()
  try {
    await page.goto(imageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
    const dimensions = await page.evaluate(() => {
      const image = document.images[0]
      return image ? { width: image.naturalWidth, height: image.naturalHeight } : null
    })
    assert(dimensions && dimensions.width >= 1000 && dimensions.height >= 500, `${label} preview image dimensions invalid: ${JSON.stringify(dimensions)}`)
  } finally {
    await context.close()
  }
}

async function runCrawlerMetaChecks(browser) {
  const startingErrorCount = errors.length
  const cases = [
    {
      path: '/israel-dossier',
      label: 'Israel dossier',
      title: 'The Israel Dossier | Veritas Worldwide',
      description: 'A sourced dossier covering U.S.-Israel policy, humanitarian impact, military spending, and the public record surrounding the conflict.',
      type: 'article',
      imageSuffix: '/og-image.png',
    },
    {
      path: '/chapter/chapter-15',
      label: 'Chapter 15',
      title: 'U.S. Foreign Aid to Israel | The Record - Veritas Worldwide',
      descriptionIncludes: ['CRS', '$298 billion', '1946-2024'],
      type: 'article',
      imageSuffix: '/og/chapter-15.png',
    },
  ]

  for (const item of cases) {
    const routeUrl = `${baseUrl}${item.path}`
    const publicUrl = `https://veritasworldwide.com${item.path}`
    const response = await fetch(routeUrl, {
      headers: { 'user-agent': 'Twitterbot/1.0' },
    })
    assert(response.ok, `${item.label} crawler route returned ${response.status}`)
    const html = await response.text()
    const pageTitle = getTitle(html)
    const ogTitle = getMetaContent(html, 'og:title')
    const ogDescription = getMetaContent(html, 'og:description')
    const ogType = getMetaContent(html, 'og:type')
    const ogUrl = getMetaContent(html, 'og:url')
    const ogImage = getMetaContent(html, 'og:image')
    const twitterTitle = getMetaContent(html, 'twitter:title', 'name')
    const twitterDescription = getMetaContent(html, 'twitter:description', 'name')
    const twitterImage = getMetaContent(html, 'twitter:image', 'name')

    assert(pageTitle === item.title, `${item.label} title mismatch: ${pageTitle}`)
    assert(ogTitle === item.title, `${item.label} og:title mismatch: ${ogTitle}`)
    assert(twitterTitle === item.title, `${item.label} twitter:title mismatch: ${twitterTitle}`)
    assert(ogType === item.type, `${item.label} og:type mismatch: ${ogType}`)
    assert(ogUrl === publicUrl, `${item.label} og:url mismatch: ${ogUrl}`)
    assert(ogImage.endsWith(item.imageSuffix), `${item.label} og:image mismatch: ${ogImage}`)
    assert(twitterImage === ogImage, `${item.label} twitter:image diverges from og:image`)

    if (item.description) {
      assert(ogDescription === item.description, `${item.label} og:description mismatch: ${ogDescription}`)
      assert(twitterDescription === item.description, `${item.label} twitter:description mismatch: ${twitterDescription}`)
    }

    if (item.descriptionIncludes) {
      for (const needle of item.descriptionIncludes) {
        assert(ogDescription.includes(needle), `${item.label} og:description missing ${needle}`)
        assert(twitterDescription.includes(needle), `${item.label} twitter:description missing ${needle}`)
      }
    }

    assert(!ogDescription.includes('A Documentary History of Power'), `${item.label} leaked generic OG description`)
    assert(!twitterDescription.includes('Primary Sources. Public Record.'), `${item.label} leaked generic Twitter description`)
    await verifyPreviewImage(browser, item.label, ogImage)
  }

  if (errors.length === startingErrorCount) {
    console.log('[verify:israel-dossier:behavior] PASS crawler metadata and preview images')
  }
}

async function runViewportSmoke(browser, name, viewport, isMobile = false) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    isMobile,
    hasTouch: isMobile,
  })
  const page = await context.newPage()
  try {
    await page.goto(`${baseUrl}/israel-dossier`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.getByText(/Source Workbench/i).waitFor({ timeout: 20000 })
    const body = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['the israel dossier', 'source workbench', 'evidence course path', '72,289+', '21,289+', '261+', '$298b']) {
      assert(body.includes(needle), `${name} missing ${needle}`)
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    assert(overflow <= 2, `${name} has ${overflow}px horizontal overflow`)
    console.log(`[verify:israel-dossier:behavior] PASS viewport ${name}`)
  } finally {
    await context.close()
  }
}

async function runInteractiveChecks(browser) {
  const context = await browser.newContext({
    acceptDownloads: true,
    downloadsPath: downloadDir,
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()
  try {
    await page.goto(`${baseUrl}/israel-dossier`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.getByText(/Source Workbench/i).waitFor({ timeout: 20000 })

    const workbench = page.locator('#source-workbench')
    const sourceInput = workbench.getByPlaceholder('Search sources')
    const initialCount = await getWorkbenchCount(workbench)
    assert(initialCount && initialCount.total >= 100, `source workbench total unexpectedly low: ${JSON.stringify(initialCount)}`)

    await sourceInput.fill('Hind Rajab')
    await waitForSectionText(page, '#source-workbench', 'Hind Rajab')
    const hindCount = await getWorkbenchCount(workbench)
    assert(hindCount && hindCount.filtered > 0 && hindCount.filtered < hindCount.total, `Hind Rajab source filter did not narrow results: ${JSON.stringify(hindCount)}`)
    assert((await workbench.innerText()).includes('Forensic Architecture'), 'Hind Rajab source filter did not surface forensic source context')

    await sourceInput.fill('')
    await workbench.getByRole('button', { name: /Public record \(\d+\)/i }).click()
    const publicRecordCount = await getWorkbenchCount(workbench)
    assert(publicRecordCount && publicRecordCount.filtered > 0 && publicRecordCount.filtered < publicRecordCount.total, `public-record category filter did not narrow results: ${JSON.stringify(publicRecordCount)}`)
    assert((await workbench.innerText()).includes('Congressional Research Service'), 'public-record filter did not surface CRS source context')

    const coursePath = page.locator('#course-path')
    await coursePath.scrollIntoViewIfNeeded()
    await coursePath.getByRole('tab', { name: /Module 3 Verify humanitarian figures/i }).click()
    await waitForSectionText(page, '#course-path', 'OCHA / UNICEF attribution table')
    const courseText = await coursePath.innerText()
    assert(courseText.includes('Verify humanitarian figures'), 'course path did not activate humanitarian figures module')
    assert(/open course/i.test(courseText), 'course path missing Institute course CTA')
    const courseHref = await coursePath.getByRole('link', { name: /Open course/i }).getAttribute('href')
    assert(courseHref === '/institute/courses/verify-gaza-humanitarian-figures', `course CTA href mismatch: ${courseHref}`)

    const moneyTrail = page.locator('#money-trail')
    await moneyTrail.scrollIntoViewIfNeeded()
    await moneyTrail.getByText(/H\.R\.815 — Israel Security Supplemental/i).click()
    await waitForSectionText(page, '#money-trail', 'Artillery & Critical Munitions Production')
    assert((await moneyTrail.innerText()).toLowerCase().includes('where this money went'), 'money-trail expansion did not show child-node explainer')

    const downloads = page.locator('#downloads')
    await downloads.scrollIntoViewIfNeeded()
    const slideButtons = downloads.locator('button').filter({ hasText: /\d+\/10/ })
    const slideCount = await slideButtons.count()
    assert(slideCount === 10, `carousel preview count mismatch: ${slideCount}`)

    const [slideDownload] = await Promise.all([
      page.waitForEvent('download', { timeout: 60000 }),
      slideButtons.first().click(),
    ])
    const slideResult = await saveAndMeasureDownload(slideDownload, /^veritas-israel-dossier-slide-01\.jpg$/, 10_000)
    console.log(`[verify:israel-dossier:behavior] PASS carousel download ${slideResult.suggestedName} ${slideResult.bytes} bytes`)

    const [pdfDownload] = await Promise.all([
      page.waitForEvent('download', { timeout: 90000 }),
      downloads.getByRole('button', { name: /Download Complete Dossier \(PDF\)/i }).click(),
    ])
    const pdfResult = await saveAndMeasureDownload(pdfDownload, /^veritas-israel-dossier\.pdf$/, 20_000)
    console.log(`[verify:israel-dossier:behavior] PASS PDF download ${pdfResult.suggestedName} ${pdfResult.bytes} bytes`)
    const pdfErrorCount = errors.length
    const pdfText = extractPdfText(pdfResult.filePath)
    for (const needle of ['THE ISRAEL DOSSIER', 'Congressional Research Service', 'UN OCHA', 'Forensic Architecture', 'Hind Rajab', '$298B', 'EVIDENCE COURSE PATH', 'OCHA / UNICEF attribution table', 'SOURCE METHODOLOGY']) {
      assert(pdfText.includes(needle), `PDF text missing ${needle}`)
    }
    if (errors.length === pdfErrorCount) {
      console.log('[verify:israel-dossier:behavior] PASS PDF text assertions')
    }

    console.log('[verify:israel-dossier:behavior] PASS source workbench, course path, money trail, carousel, and PDF interactions')
  } finally {
    await context.close()
  }
}

async function runChapter15PreviewCheck(browser) {
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()
  try {
    await page.goto(`${baseUrl}/chapter/chapter-15`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.getByRole('heading', { name: 'U.S. Foreign Aid to Israel' }).waitFor({ timeout: 20000 })
    const body = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['u.s. foreign aid to israel', '$298 billion', 'crs', 'free account']) {
      assert(body.includes(needle), `chapter 15 public preview missing ${needle}`)
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    assert(overflow <= 2, `chapter 15 public preview has ${overflow}px horizontal overflow`)
    console.log('[verify:israel-dossier:behavior] PASS chapter 15 public preview')
  } finally {
    await context.close()
  }
}

const browser = await chromium.launch({ headless: true })

try {
  await runViewportSmoke(browser, 'iPhone SE', { width: 375, height: 667 }, true)
  await runViewportSmoke(browser, 'Desktop 1440', { width: 1440, height: 900 })
  await runCrawlerMetaChecks(browser)
  await runInteractiveChecks(browser)
  await runChapter15PreviewCheck(browser)
} finally {
  await browser.close()
  fs.rmSync(downloadDir, { recursive: true, force: true })
}

if (errors.length > 0) {
  console.error('[verify:israel-dossier:behavior] FAIL')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`[verify:israel-dossier:behavior] PASS ${baseUrl}`)
