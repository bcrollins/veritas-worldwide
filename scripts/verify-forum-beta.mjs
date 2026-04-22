#!/usr/bin/env node

import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { createBrowserAutomation } from './lib/browserAutomation.mjs'
import { assert, withVerificationBaseUrl } from './lib/verificationRuntime.mjs'

const DEFAULT_PORT = 4340
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TEST_TITLE = 'Forum beta verification thread'
const TEST_BODY = 'Local-only verification body. This should never leave browser storage.'

let browser

function logStep(message) {
  console.log(`[verify:forum-beta] ${message}`)
}

async function evalInPage(script) {
  return (await browser.evaluate(script)).trim()
}

async function evalBoolean(script) {
  return (await evalInPage(script)) === 'true'
}

async function evalJson(script) {
  const raw = await evalInPage(`JSON.stringify((${script}))`)
  return JSON.parse(raw)
}

async function poll(predicate, failureMessage, timeoutMs = 6000, intervalMs = 200) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    if (await predicate()) {
      return
    }
    await delay(intervalMs)
  }

  throw new Error(failureMessage)
}

async function openPage(url) {
  await browser.open(url)
  await browser.wait(900)
}

async function bodyText() {
  return evalInPage('document.body.innerText')
}

async function bodyIncludes(text) {
  return evalBoolean(`document.body.innerText.toLowerCase().includes(${JSON.stringify(text.toLowerCase())})`)
}

async function clickButton(buttonText, rootSelector = null) {
  const clicked = await evalBoolean(`
    (() => {
      const normalize = (value) => value.replace(/\\s+/g, ' ').trim().toLowerCase()
      const root = ${JSON.stringify(rootSelector)}
        ? document.querySelector(${JSON.stringify(rootSelector)})
        : document
      if (!root) return false
      const button = Array.from(root.querySelectorAll('button')).find((element) => normalize(element.textContent || '') === ${JSON.stringify(buttonText.toLowerCase())})
      if (!button) return false
      button.click()
      return true
    })()
  `)

  assert(clicked, `Could not find button "${buttonText}"${rootSelector ? ` inside ${rootSelector}` : ''}`)
}

async function clickLastButton(buttonText, rootSelector = null) {
  const clicked = await evalBoolean(`
    (() => {
      const normalize = (value) => value.replace(/\\s+/g, ' ').trim().toLowerCase()
      const root = ${JSON.stringify(rootSelector)}
        ? document.querySelector(${JSON.stringify(rootSelector)})
        : document
      if (!root) return false
      const buttons = Array.from(root.querySelectorAll('button')).filter((element) => normalize(element.textContent || '') === ${JSON.stringify(buttonText.toLowerCase())})
      const button = buttons.at(-1)
      if (!button || button.disabled) return false
      button.click()
      return true
    })()
  `)

  assert(clicked, `Could not find enabled trailing button "${buttonText}"${rootSelector ? ` inside ${rootSelector}` : ''}`)
}

async function clickText(text) {
  const clicked = await evalBoolean(`
    (() => {
      const needle = ${JSON.stringify(text.toLowerCase())}
      const element = Array.from(document.querySelectorAll('h1,h2,h3,p,span,a,button')).find((candidate) =>
        (candidate.textContent || '').replace(/\\s+/g, ' ').trim().toLowerCase().includes(needle)
      )
      if (!element) return false
      const target = element.closest('[role="button"], button, a, [class*="cursor-pointer"]') || element
      target.click()
      return true
    })()
  `)

  assert(clicked, `Could not find visible text "${text}"`)
}

async function fillField(placeholder, value) {
  const filled = await evalBoolean(`
    (() => {
      const field = Array.from(document.querySelectorAll('input, textarea')).find((element) => element.getAttribute('placeholder') === ${JSON.stringify(placeholder)})
      if (!field) return false
      const prototype = field instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
      const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value')
      if (!descriptor?.set) return false
      field.focus()
      descriptor.set.call(field, ${JSON.stringify(value)})
      field.dispatchEvent(new Event('input', { bubbles: true }))
      field.dispatchEvent(new Event('change', { bubbles: true }))
      field.blur()
      return true
    })()
  `)

  assert(filled, `Could not find field "${placeholder}"`)
}

async function seedLocalForumState() {
  await evalInPage(`
    (() => {
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem('veritas_auth', JSON.stringify({
        email: 'forum-audit@example.com',
        displayName: 'Forum Audit',
        createdAt: new Date().toISOString()
      }))
      localStorage.setItem('veritas_forum_posts', '[]')
      localStorage.setItem('veritas_forum_comments', '[]')
      localStorage.setItem('veritas_forum_reports', '[]')
      return true
    })()
  `)
}

async function getForumStorage() {
  return evalJson(`(() => ({
    posts: JSON.parse(localStorage.getItem('veritas_forum_posts') || '[]'),
    comments: JSON.parse(localStorage.getItem('veritas_forum_comments') || '[]'),
    reports: JSON.parse(localStorage.getItem('veritas_forum_reports') || '[]'),
    auth: JSON.parse(localStorage.getItem('veritas_auth') || 'null')
  }))()`)
}

async function assertNoFakeLiveCounters() {
  const counters = await evalJson(`(() => Array.from(document.querySelectorAll('p,span,div'))
    .map((element) => (element.textContent || '').replace(/\\s+/g, ' ').trim())
    .filter((text) => /^[0-9.,kK]+\\s+(members|online)$/i.test(text) || /members\\s+online/i.test(text) || /online\\s+now/i.test(text)))()`)
  const counterList = Array.isArray(counters) ? counters : Object.values(counters || {})

  assert(counterList.length === 0, `Forum exposed fake live community counters: ${counterList.join(' | ')}`)
}

async function assertNoHorizontalOverflow() {
  const metrics = await evalJson(`(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth
  }))()`)

  assert(
    metrics.scrollWidth <= metrics.clientWidth + 1 && metrics.bodyScrollWidth <= metrics.clientWidth + 1,
    `Forum page has horizontal overflow: ${JSON.stringify(metrics)}`
  )
}

async function runVerification(baseUrl) {
  browser = await createBrowserAutomation({ rootDir: ROOT_DIR })
  logStep(`Using ${browser.name} browser driver`)

  try {
    await browser.close()

    const forumUrl = new URL('/forum', baseUrl).toString()
    logStep(`Opening ${forumUrl}`)
    await openPage(forumUrl)
    await seedLocalForumState()
    await openPage(forumUrl)

    assert(await bodyIncludes('Veritas Forum Beta'), 'Forum beta title did not render')
    assert(await bodyIncludes('stores discussion on this device only'), 'Forum did not disclose device-local discussion storage')
    assert(await bodyIncludes('persistent community data'), 'Forum did not disclose missing persistent shared community data')
    assert(await bodyIncludes('No local posts yet'), 'Empty local forum state did not render the empty-state copy')
    await assertNoFakeLiveCounters()
    await assertNoHorizontalOverflow()

    const initialState = await getForumStorage()
    assert(initialState.auth?.email === 'forum-audit@example.com', 'Forum verifier did not seed a local reader identity')
    assert(initialState.posts.length === 0, 'Forum verifier expected an empty local post store')

    logStep('Creating a local beta thread through the rendered modal')
    await clickButton('Start Thread')
    await fillField('Title', TEST_TITLE)
    await fillField('Text (optional)', TEST_BODY)
    await clickLastButton('Post')

    await poll(
      async () => (await getForumStorage()).posts.length === 1,
      'Forum post was not saved to local browser storage',
    )
    assert(await bodyIncludes(TEST_TITLE), 'New local forum thread did not render in the feed')
    await assertNoHorizontalOverflow()

    logStep('Verifying local award and report controls')
    await clickText(TEST_TITLE)
    assert(await bodyIncludes(TEST_TITLE), 'New local forum thread did not open')
    await clickButton('Award')
    assert(await bodyIncludes('Saved on this device only'), 'Award modal did not disclose local-only storage')
    await clickButton('Add Award')
    await poll(
      async () => {
        const { posts } = await getForumStorage()
        return posts[0]?.awards?.some((award) => award.awardId === 'truth-seeker' && award.givenBy === 'Forum Audit')
      },
      'Forum award was not saved to local browser storage',
    )
    assert(await bodyIncludes('Truth Seeker saved locally'), 'Forum award success message did not render')

    await clickButton('Report')
    assert(await bodyIncludes('Submit Local Report'), 'Report modal did not render')
    assert(await bodyIncludes('Reports are stored on this device only'), 'Report modal did not disclose local-only storage')
    await fillField('Add context for the local moderation log (optional).', 'Verification report: local-only moderation queue.')
    await clickButton('Save Report')
    await poll(
      async () => {
        const { reports } = await getForumStorage()
        return reports.length === 1 && reports[0].reason === 'misinformation' && reports[0].reporter === 'Forum Audit'
      },
      'Forum report was not saved to local browser storage',
    )
    assert(await bodyIncludes('Saved a local misinformation report'), 'Forum report success message did not render')
    await assertNoFakeLiveCounters()
    await assertNoHorizontalOverflow()

    const finalText = (await bodyText()).toLowerCase()
    assert(finalText.includes('forum beta'), 'Final forum body lost beta framing')
    assert(!finalText.includes('join community'), 'Forum regressed to join-community language')

    logStep('PASS — forum remains a truthful device-local beta with local post, award, and report flows')
  } finally {
    await browser.dispose().catch(() => {})
  }
}

withVerificationBaseUrl({
  repoRoot: ROOT_DIR,
  cliBaseUrl: process.argv[2] || '',
  envBaseUrl: process.env.FORUM_BETA_TEST_BASE_URL || '',
  defaultPort: DEFAULT_PORT,
  readinessPath: '/api/build-info',
  requireBuild: true,
  serverEnv: {
    DATABASE_URL: '',
  },
}, runVerification).catch((error) => {
  console.error(`[verify:forum-beta] FAIL — ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
