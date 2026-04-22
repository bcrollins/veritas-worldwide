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
  return { suggestedName, bytes }
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
    for (const needle of ['the israel dossier', 'source workbench', '72,289+', '21,289+', '261+', '$298b']) {
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

    console.log('[verify:israel-dossier:behavior] PASS source workbench, money trail, carousel, and PDF interactions')
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
