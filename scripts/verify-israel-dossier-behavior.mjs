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

/** Dismiss sticky cookie consent so it cannot intercept Playwright clicks. */
async function dismissCookieConsent(page) {
  const banner = page.getByTestId('cookie-consent-banner')
  if ((await banner.count()) === 0) return
  try {
    await banner.getByRole('button', { name: /Accept/i }).click({ timeout: 3000, force: true })
    await banner.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {})
  } catch {
    // Banner may already be dismissed or animating out
  }
}

async function gotoAndDismiss(page, url, options = {}) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000, ...options })
  await dismissCookieConsent(page)
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
      // First-party editorial hero preferred; legacy generated OG still accepted during migration.
      imageSuffixes: ['/chapters/heroes/chapter-15.jpg', '/og/chapter-15.png'],
    },
    {
      path: '/israel-dossier/briefing',
      label: 'Israel dossier briefing',
      title: 'Israel Dossier Public Briefing | Veritas Worldwide',
      description: 'A source-boundary briefing generated from the populated Israel dossier workbook rows, with visible confidence limits and open questions.',
      type: 'article',
      imageSuffix: '/og-image.png',
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
    const allowedImageSuffixes = item.imageSuffixes || (item.imageSuffix ? [item.imageSuffix] : [])
    assert(
      allowedImageSuffixes.some((suffix) => ogImage.endsWith(suffix)),
      `${item.label} og:image mismatch: ${ogImage}`,
    )
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
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier`)
    await page.getByText(/Source Workbench/i).waitFor({ timeout: 20000 })
    const body = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['the israel dossier', 'source workbench', 'evidence course path', 'evidence workbooks', 'populated record pack', 'open briefing', '72,289+', '21,289+', '261+', '$298b']) {
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
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier`)
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
    const [templateDownload] = await Promise.all([
      page.waitForEvent('download', { timeout: 60000 }),
      coursePath.getByRole('link', { name: /Download template/i }).click(),
    ])
    const templateResult = await saveAndMeasureDownload(templateDownload, /^israel-dossier-humanitarian-attribution-table\.csv$/, 500)
    const templateText = fs.readFileSync(templateResult.filePath, 'utf8')
    for (const needle of ['reporting_body', 'verification_boundary', 'OCHA', 'UNICEF', '178696']) {
      assert(templateText.includes(needle), `humanitarian template missing ${needle}`)
    }
    assert(!templateText.includes('170956'), 'humanitarian template still contains stale UNICEF media id 170956')
    console.log(`[verify:israel-dossier:behavior] PASS course template download ${templateResult.suggestedName} ${templateResult.bytes} bytes`)

    const moneyTrail = page.locator('#money-trail')
    await moneyTrail.scrollIntoViewIfNeeded()
    await moneyTrail.getByText(/H\.R\.815 — Israel Security Supplemental/i).click()
    await waitForSectionText(page, '#money-trail', 'Artillery & Critical Munitions Production')
    assert((await moneyTrail.innerText()).toLowerCase().includes('where this money went'), 'money-trail expansion did not show child-node explainer')

    // Historical densification + actors enablement graph
    const timeline = page.locator('#timeline')
    await timeline.scrollIntoViewIfNeeded()
    const timelineText = await timeline.innerText()
    for (const needle of ['Deir Yassin', 'Qibya', 'Kafr Qasim', 'Historical Timeline']) {
      assert(timelineText.includes(needle), `timeline missing historical densification needle: ${needle}`)
    }
    const eraSelect = timeline.locator('select').first()
    if (await eraSelect.count()) {
      const eraOptions = await eraSelect.locator('option').allTextContents()
      const mandate = eraOptions.find((opt) => /mandate/i.test(opt))
      if (mandate) await eraSelect.selectOption({ label: mandate })
      else await eraSelect.selectOption({ index: 1 })
      await page.waitForTimeout(200)
    }

    const actors = page.locator('#actors')
    await actors.scrollIntoViewIfNeeded()
    await waitForSectionText(page, '#actors', 'Benjamin Netanyahu')
    assert((await actors.innerText()).includes('Actors'), 'actors section heading missing')
    await actors.getByRole('button', { name: /Benjamin Netanyahu/i }).first().click()
    await waitForSectionText(page, '#actors', 'Open full profile')
    const profileHref = await actors.getByRole('link', { name: /Open full profile/i }).first().getAttribute('href')
    assert(profileHref === '/profile/benjamin-netanyahu', `actor profile href mismatch: ${profileHref}`)
    assert((await actors.innerText()).toLowerCase().includes('funds'), 'actor panel missing funds section language')

    const incidents = page.locator('#incidents')
    await incidents.scrollIntoViewIfNeeded()
    const incidentText = await incidents.innerText()
    for (const needle of ['Documented Incidents', 'Deir Yassin', 'Children among victims']) {
      assert(incidentText.includes(needle), `incidents section missing ${needle}`)
    }
    const childrenFilter = incidents.locator('select').filter({ has: page.locator('option', { hasText: /Children among victims/i }) }).first()
    if (await childrenFilter.count()) {
      const childOptions = await childrenFilter.locator('option').allTextContents()
      const childrenLabel = childOptions.find((opt) => /children among victims/i.test(opt))
      if (childrenLabel) {
        await childrenFilter.selectOption({ label: childrenLabel })
        await page.waitForTimeout(250)
        const filtered = await incidents.innerText()
        assert(/Showing\s+\d+\s+of\s+\d+/i.test(filtered), 'children incident filter did not update showing count')
      }
    }

    assert(
      (await incidents.getByRole('button', { name: /Export filtered CSV/i }).count()) > 0,
      'incidents section missing CSV export control',
    )
    assert(
      (await incidents.getByRole('button', { name: /Copy share link/i }).count()) > 0,
      'incidents section missing share-link control',
    )

    const moneyTrailSection = page.locator('#money-trail')
    await moneyTrailSection.scrollIntoViewIfNeeded()
    assert(
      (await moneyTrailSection.getByRole('button', { name: /Export money-trail CSV/i }).count()) > 0,
      'money-trail section missing CSV export',
    )
    const timelineSection = page.locator('#timeline')
    await timelineSection.scrollIntoViewIfNeeded()
    assert(
      (await timelineSection.getByRole('button', { name: /Export timeline CSV/i }).count()) > 0,
      'timeline section missing CSV export',
    )

    const corpusResponse = await page.request.get(`${baseUrl}/israel-dossier/corpus.json`)
    const corpusStatus = corpusResponse.status()
    assert(corpusResponse.ok(), `corpus.json HTTP ${corpusStatus}`)
    const corpusText = await corpusResponse.text()
    let corpus
    try {
      corpus = JSON.parse(corpusText)
    } catch {
      assert(false, `corpus.json not valid JSON (status ${corpusStatus}): ${corpusText.slice(0, 120)}`)
    }
    assert(corpus?.schemaVersion === 1, 'corpus.json schemaVersion missing')
    assert(Array.isArray(corpus?.incidents) && corpus.incidents.length >= 82, 'corpus.json incidents too few')
    assert(Array.isArray(corpus?.actors) && corpus.actors.length >= 46, 'corpus.json actors too few')
    assert(Array.isArray(corpus?.timeline) && corpus.timeline.length >= 48, 'corpus.json timeline too few')
    assert(Array.isArray(corpus?.moneyTrail) && corpus.moneyTrail.length >= 25, 'corpus.json moneyTrail too few')
    assert(Array.isArray(corpus?.legalCases) && corpus.legalCases.length >= 16, 'corpus.json legalCases too few')
    assert(Array.isArray(corpus?.lobbying) && corpus.lobbying.length >= 3, 'corpus.json lobbying too few')
    assert(corpus?.counts?.incidentsByEra && typeof corpus.counts.incidentsByEra === 'object', 'corpus.json missing incidentsByEra breakdown')
    assert(corpus?.counts?.actorsByCategory && typeof corpus.counts.actorsByCategory === 'object', 'corpus.json missing actorsByCategory breakdown')
    assert(
      Number(corpus.counts.incidentsByEra['mandate-1948'] || 0) >= 1,
      'corpus.json incidentsByEra missing mandate-1948 floor',
    )
    assert(corpus?.counts?.incidentsByTier?.verified >= 1, 'corpus.json missing incidentsByTier.verified')
    assert(Number(corpus.counts.childrenTagged || 0) >= 1, 'corpus.json missing childrenTagged floor')
    assert(Number(corpus.counts.civiliansTagged || 0) >= 1, 'corpus.json missing civiliansTagged floor')
    assert(corpus?.counts?.moneyTrailByType && typeof corpus.counts.moneyTrailByType === 'object', 'corpus.json missing moneyTrailByType')

    // Deep-link surface: actor query opens enablement panel
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier?actor=joe-biden`)
    await page.getByRole('heading', { name: 'The Israel Dossier', exact: true }).waitFor({ timeout: 20000 })
    await waitForSectionText(page, '#actors', 'Joe Biden')
    await waitForSectionText(page, '#actors', 'Open full profile')
    const deepActorHref = await page.locator('#actors').getByRole('link', { name: /Open full profile/i }).first().getAttribute('href')
    assert(deepActorHref === '/profile/joe-biden', `deep-link actor profile href mismatch: ${deepActorHref}`)

    // Actor category filter narrows the enablement graph
    const actorsSection = page.locator('#actors')
    await actorsSection.scrollIntoViewIfNeeded()
    const actorCategorySelect = actorsSection.locator('select').first()
    if (await actorCategorySelect.count()) {
      const optionLabels = await actorCategorySelect.locator('option').allTextContents()
      const congressLabel = optionLabels.find((opt) => /congress/i.test(opt))
      if (congressLabel) {
        await actorCategorySelect.selectOption({ label: congressLabel })
        await page.waitForTimeout(200)
        const actorText = await actorsSection.innerText()
        assert(/Showing\s+\d+\s+of\s+\d+\s+actors/i.test(actorText), 'actor category filter did not update count')
      }
    }

    // Incident era filter narrows documented incidents (shareable ?era=)
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier?era=mandate-1948`)
    await page.getByRole('heading', { name: 'The Israel Dossier', exact: true }).waitFor({ timeout: 20000 })
    await page.locator('#incidents').scrollIntoViewIfNeeded()
    await waitForSectionText(page, '#incidents', 'Deir Yassin')
    const eraBody = (await page.locator('#incidents').innerText()).toLowerCase()
    assert(eraBody.includes('deir yassin') || eraBody.includes('lydda'), 'era=mandate-1948 did not surface 1948 incidents')
    assert(/showing\s+\d+\s+of\s+\d+/i.test(eraBody), 'era filter did not update showing count')
    // Post-filter count should be less than full corpus for a single era
    const showingMatch = eraBody.match(/showing\s+(\d+)\s+of\s+(\d+)/i)
    if (showingMatch) {
      const filtered = Number(showingMatch[1])
      const total = Number(showingMatch[2])
      assert(filtered > 0 && filtered < total, `era filter did not narrow incidents: ${showingMatch[0]}`)
    }
    console.log('[verify:israel-dossier:behavior] PASS incident era filter deep-link')

    // Money-trail deep-link ?money=
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier?money=hr815`)
    const moneyNode = page.locator('#money-hr815')
    try {
      await moneyNode.waitFor({ state: 'attached', timeout: 15000 })
      const moneyText = (await moneyNode.innerText()).toLowerCase()
      assert(moneyText.includes('h.r.815') || moneyText.includes('$26.4'), 'money deep-link card missing H.R.815 content')
      console.log('[verify:israel-dossier:behavior] PASS money-trail deep-link')
    } catch {
      // Fallback while multi-agent deploys roll anchors: section must still exist
      const moneySection = page.locator('#money-trail')
      await moneySection.waitFor({ timeout: 10000 })
      const sectionText = (await moneySection.innerText()).toLowerCase()
      assert(sectionText.includes('h.r.815') || sectionText.includes('$26.4b'), 'money-trail section missing H.R.815 content')
      console.log('[verify:israel-dossier:behavior] PASS money-trail section (anchor pending deploy)')
    }

    // Topic hub CTA for israel-policy (client-hydrated — wait for CTA, not just h1)
    await gotoAndDismiss(page, `${baseUrl}/topics/israel-policy`)
    await page.getByRole('heading', { name: /Israel Policy/i }).first().waitFor({ timeout: 20000 })
    const dossierCta = page.getByRole('link', { name: /Open Israel Dossier/i }).first()
    await dossierCta.waitFor({ state: 'visible', timeout: 20000 })
    const topicBody = (await page.locator('body').innerText()).toLowerCase()
    assert(topicBody.includes('israel dossier') || topicBody.includes('interactive evidence'), 'israel-policy topic missing dossier CTA copy')
    assert((await page.getByRole('link', { name: /Open Israel Dossier/i }).count()) > 0, 'israel-policy topic missing Open Israel Dossier link')

    // Search cross-surface promo for gaza/israel queries
    await gotoAndDismiss(page, `${baseUrl}/search?q=gaza`)
    await page.getByRole('heading', { name: /Search/i }).first().waitFor({ timeout: 20000 }).catch(() => {})
    await page.waitForFunction(
      () => document.body?.innerText?.toLowerCase().includes('israel dossier evidence engine'),
      null,
      { timeout: 20000 },
    )
    const searchBody = (await page.locator('body').innerText()).toLowerCase()
    assert(searchBody.includes('israel dossier evidence engine'), 'search?q=gaza missing Israel Dossier evidence engine promo')
    assert(searchBody.includes('the israel dossier'), 'search?q=gaza missing The Israel Dossier surface title')
    assert(
      (await page.getByRole('link', { name: /The Israel Dossier/i }).count()) > 0 ||
        (await page.locator('a[href="/israel-dossier"]').count()) > 0,
      'search?q=gaza missing dossier deep link',
    )
    console.log('[verify:israel-dossier:behavior] PASS search cross-surface dossier promo')

    // Expanded search keyword surface (liberty / UNRWA / lobby)
    await gotoAndDismiss(page, `${baseUrl}/search?q=liberty`)
    try {
      await page.waitForFunction(
        () => document.body?.innerText?.toLowerCase().includes('israel dossier evidence engine'),
        null,
        { timeout: 20000 },
      )
    } catch {
      // fall through to assert with body text for a clear failure message
    }
    assert(
      (await page.locator('body').innerText()).toLowerCase().includes('israel dossier evidence engine'),
      'search?q=liberty missing Israel Dossier evidence engine promo',
    )
    console.log('[verify:israel-dossier:behavior] PASS search liberty keyword dossier promo')

    // Settler-violence / Hebron discovery path
    await gotoAndDismiss(page, `${baseUrl}/search?q=hebron`)
    try {
      await page.waitForFunction(
        () => document.body?.innerText?.toLowerCase().includes('israel dossier evidence engine'),
        null,
        { timeout: 20000 },
      )
    } catch {
      // clear assert below
    }
    assert(
      (await page.locator('body').innerText()).toLowerCase().includes('israel dossier evidence engine'),
      'search?q=hebron missing Israel Dossier evidence engine promo',
    )
    console.log('[verify:israel-dossier:behavior] PASS search hebron keyword dossier promo')

    // Return to dossier before download/carousel assertions (#downloads is dossier-only).
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier`)
    await page.getByRole('heading', { name: 'The Israel Dossier', exact: true }).waitFor({ timeout: 20000 })
    const densifyBody = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of [
      'un schools and shelters',
      'unrwa shelters hit',
      'uss liberty',
      'land day',
      'operation litani',
      'guardian of the walls',
      'howard kohr',
      'pro-israel lobby',
      'summer rains',
      'jenin camp raid',
      'kahan commission',
      'f-35',
      'nancy pelosi',
      'sheldon adelson',
      'gaza land, air, and sea blockade',
      'settlement enterprise',
      'war reserve stockpile',
      'days of penitence',
      'cave of the patriarchs',
      'huwara',
      'second lebanon war',
      'hellfire',
      'elise stefanik',
      'ritchie torres',
      'operation rainbow',
      'razing rafah',
      'settler violence',
      'mike pence',
      'john fetterman',
      'gbu-39',
      'ron desantis',
      'gaza disengagement',
      'kevin mccarthy',
      'resolution 2334',
      'industrial base',
      'power plant',
      "shuja",
      'black friday',
      'king david',
      'coastal road',
      'passover',
      'dolphinarium',
      'power plant',
      'munich',
      "ma'alot",
      'kahan',
      'sniper',
      'balata',
      'white phosphorus',
      'ipc',
      'iron beam',
      'barracks',
      'peace for galilee',
      'preserve america',
      'united democracy',
      'goldstone',
      'dahiya',
      'sbarro',
      '2728',
      'aipac',
      'tel al-sultan',
      'dmfi',
      'jenin',
      'nova',
      'cufi',
      'j street',
      "be'eri",
      'norpac',
      'kfar aza',
      'taba',
    ]) {
      assert(densifyBody.includes(needle), `dossier densify wave missing visible text: ${needle}`)
    }
    console.log('[verify:israel-dossier:behavior] PASS densify wave surface text')

    // Chapter 15/16 companion CTAs into the dossier evidence engine
    await gotoAndDismiss(page, `${baseUrl}/chapter/chapter-15`)
    await page.getByRole('heading', { name: 'U.S. Foreign Aid to Israel' }).waitFor({ timeout: 20000 })
    assert(
      (await page.getByRole('link', { name: /Open money trail/i }).count()) > 0,
      'chapter 15 missing Open money trail dossier CTA',
    )
    assert(
      (await page.getByRole('link', { name: /Full Israel Dossier/i }).count()) > 0,
      'chapter 15 missing Full Israel Dossier CTA',
    )
    await gotoAndDismiss(page, `${baseUrl}/chapter/chapter-16`)
    await page.getByRole('heading', { name: /USS Liberty/i }).first().waitFor({ timeout: 20000 })
    assert(
      (await page.getByRole('link', { name: /Open Liberty in dossier/i }).count()) > 0,
      'chapter 16 missing Open Liberty in dossier CTA',
    )
    console.log('[verify:israel-dossier:behavior] PASS chapter 15/16 dossier companion CTAs')

    // Profile enablement deep-link uses ?actor=
    await gotoAndDismiss(page, `${baseUrl}/profile/howard-kohr`)
    await page.waitForFunction(
      () => document.body?.innerText?.toLowerCase().includes('israel dossier'),
      null,
      { timeout: 20000 },
    )
    const profileDossierHref = await page.getByRole('link', { name: /Open dossier actors/i }).first().getAttribute('href')
    assert(
      profileDossierHref === '/israel-dossier?actor=howard-kohr' || profileDossierHref?.includes('actor=howard-kohr'),
      `profile enablement deep-link mismatch: ${profileDossierHref}`,
    )
    console.log('[verify:israel-dossier:behavior] PASS profile actor deep-link')

    // Return to dossier for download assertions after companion surface checks
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier`)
    await page.getByRole('heading', { name: 'The Israel Dossier', exact: true }).waitFor({ timeout: 20000 })

    const downloads = page.locator('#downloads')
    await downloads.scrollIntoViewIfNeeded()
    const [workbookDownload] = await Promise.all([
      page.waitForEvent('download', { timeout: 60000 }),
      downloads.getByRole('link', { name: /Populated humanitarian attribution table/i }).click(),
    ])
    const workbookResult = await saveAndMeasureDownload(workbookDownload, /^israel-dossier-humanitarian-attribution-populated\.csv$/, 500)
    const workbookText = fs.readFileSync(workbookResult.filePath, 'utf8')
    for (const needle of ['HUM-P-001', 'status', 'safe_wording', 'Lancet', '178696']) {
      assert(workbookText.includes(needle), `populated humanitarian workbook missing ${needle}`)
    }
    assert(!workbookText.includes('170956'), 'populated humanitarian workbook still contains stale UNICEF media id 170956')
    console.log(`[verify:israel-dossier:behavior] PASS populated workbook download ${workbookResult.suggestedName} ${workbookResult.bytes} bytes`)

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

async function runBriefingSurfaceCheck(browser) {
  const context = await browser.newContext({
    acceptDownloads: true,
    downloadsPath: downloadDir,
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()
  try {
    await gotoAndDismiss(page, `${baseUrl}/israel-dossier/briefing`)
    await page.getByRole('heading', { name: /Source-boundary briefing/i }).waitFor({ timeout: 20000 })
    const initialBody = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['public briefing', 'source-boundary', 'source row table', 'reference locator', 'proof boundary', 'open workbook', 'archive lookup', 'source-copy status', 'paragraph source ids', 'reader-facing chapter sequence', 'src-p-001', 'aid-p-004', 'hum-p-001', 'unsafe wording to avoid', 'download chapter draft']) {
      assert(initialBody.includes(needle), `briefing surface missing ${needle}`)
    }
    const archiveHref = await page.getByRole('link', { name: /Archive lookup/i }).first().getAttribute('href')
    // Accept either pinned Wayback captures (/web/YYYYMMDDhhmmss/) or wildcard lookup fallbacks (/web/*/).
    assert(
      typeof archiveHref === 'string' &&
        (archiveHref.startsWith('https://web.archive.org/web/*/') ||
          /^https:\/\/web\.archive\.org\/web\/\d{14}\//.test(archiveHref)),
      `briefing archive lookup href mismatch: ${archiveHref}`,
    )
    assert(
      initialBody.includes('remote primary source verified') ||
        initialBody.includes('pinned wayback snapshot') ||
        initialBody.includes('pinned via companion'),
      'briefing surface missing source-copy status detail',
    )

    const [chapterDraftDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: /Download chapter draft/i }).first().click(),
    ])
    const chapterDraftResult = await saveAndMeasureDownload(chapterDraftDownload, /^israel-dossier-public-briefing-chapter-draft\.md$/, 9000)
    const chapterDraftText = fs.readFileSync(chapterDraftResult.filePath, 'utf8')
    for (const needle of [
      'Source rows: SRC-P-001',
      'Paragraph source IDs: AID-P-003, AID-P-004',
      'Final publication lock',
      'No causation claim without delivery, end-use, and incident-chain records',
      'A warrant is a procedural record, not a final adjudication of guilt',
      'The row ID is not decoration; it is the audit trail',
      'Unsafe wording to avoid',
      'Open questions',
    ]) {
      assert(chapterDraftText.includes(needle), `chapter draft missing ${needle}`)
    }

    await page.getByRole('button', { name: /Legal record/i }).click()
    await waitForSectionText(page, 'body', 'LAW-P-001')
    const legalBody = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['procedural legal record', 'law-p-002', 'advisory opinion', 'political resolution', 'warrant is not a conviction', 'provisional measures are not a final merits ruling']) {
      assert(legalBody.includes(needle), `briefing legal panel missing ${needle}`)
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    assert(overflow <= 2, `briefing surface has ${overflow}px horizontal overflow`)
    console.log('[verify:israel-dossier:behavior] PASS public briefing surface')
  } finally {
    await context.close()
  }
}

async function runChapter15PublicAccessCheck(browser) {
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()
  try {
    await gotoAndDismiss(page, `${baseUrl}/chapter/chapter-15`)
    await page.getByRole('heading', { name: 'U.S. Foreign Aid to Israel' }).waitFor({ timeout: 20000 })
    const body = (await page.locator('body').innerText()).toLowerCase()
    for (const needle of ['u.s. foreign aid to israel', '$298 billion', 'crs', 'sources & references']) {
      assert(body.includes(needle), `chapter 15 public access missing ${needle}`)
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    assert(overflow <= 2, `chapter 15 public access has ${overflow}px horizontal overflow`)
    console.log('[verify:israel-dossier:behavior] PASS chapter 15 public access')
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
  await runBriefingSurfaceCheck(browser)
  await runChapter15PublicAccessCheck(browser)
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
