#!/usr/bin/env node

import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { createBrowserAutomation } from './lib/browserAutomation.mjs'
import { withVerificationBaseUrl } from './lib/verificationRuntime.mjs'

const DEFAULT_PORT = 4175
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

let browser

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function logStep(message) {
  console.log(`[verify:auth-cache-browser] ${message}`)
}

async function evalInPage(script) {
  return (await browser.evaluate(script)).trim()
}

async function evalBoolean(script) {
  return (await evalInPage(script)) === 'true'
}

async function evalNumber(script) {
  const value = Number(await evalInPage(script))
  if (!Number.isFinite(value)) {
    throw new Error(`Expected numeric browser value, received "${value}"`)
  }
  return value
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
  await browser.wait(1200)
}

async function waitMs(ms) {
  await browser.wait(ms)
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

async function fillInput(placeholder, value, rootSelector = null) {
  const filled = await evalBoolean(`
    (() => {
      const root = ${JSON.stringify(rootSelector)}
        ? document.querySelector(${JSON.stringify(rootSelector)})
        : document
      if (!root) return false
      const input = Array.from(root.querySelectorAll('input')).find((element) => element.getAttribute('placeholder') === ${JSON.stringify(placeholder)})
      if (!input) return false
      const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      if (!descriptor?.set) return false
      input.focus()
      descriptor.set.call(input, ${JSON.stringify(value)})
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
      input.blur()
      return true
    })()
  `)

  assert(filled, `Could not find input "${placeholder}"${rootSelector ? ` inside ${rootSelector}` : ''}`)
}

async function bodyIncludes(text) {
  return evalBoolean(`document.body.innerText.toLowerCase().includes(${JSON.stringify(text.toLowerCase())})`)
}

async function clearBrowserState() {
  await evalInPage(`
    localStorage.clear()
    sessionStorage.clear()
    true
  `)
}

async function openAuthModalWithSave() {
  await clickButton('Save')
}

async function signUp(name, email, password) {
  await openAuthModalWithSave()
  await fillInput('Your name', name, '[data-testid="auth-modal"]')
  await fillInput('you@example.com', email, '[data-testid="auth-modal"]')
  await fillInput('At least 6 characters', password, '[data-testid="auth-modal"]')
  await clickButton('Create Free Account', '[data-testid="auth-modal"]')
}

async function logIn(email, password) {
  await clickButton('Log In')
  await fillInput('you@example.com', email, '[data-testid="auth-modal"]')
  await fillInput('At least 6 characters', password, '[data-testid="auth-modal"]')
  await clickButton('Sign In', '[data-testid="auth-modal"]')
}

async function assertSignedOut() {
  assert(await evalBoolean('localStorage.getItem("veritas_auth") === null'), 'Expected signed-out browser state')
}

async function waitForAuthModalToClose() {
  await poll(
    async () => !(await evalBoolean('Boolean(document.querySelector("[data-testid=\\"auth-modal\\"]"))')),
    'Auth modal did not close after submit',
  )
}

async function waitForUserEmail(email) {
  await poll(
    async () => await evalBoolean(`JSON.parse(localStorage.getItem("veritas_auth") || "null")?.email === ${JSON.stringify(email.toLowerCase())}`),
    `Timed out waiting for signed-in user ${email}`,
  )
}

async function runVerification(baseUrl) {
  const alice = {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'AuditPass2026!',
  }
  const bob = {
    name: 'Bob',
    email: 'bob@example.com',
    password: 'AuditPass2026!',
  }

  browser = await createBrowserAutomation({ rootDir: ROOT_DIR })
  logStep(`Using ${browser.name} browser driver`)

  try {
    await browser.close()

    logStep(`Opening ${baseUrl}/chapter/foreword`)
    await openPage(new URL('/chapter/foreword', baseUrl).toString())
    await clearBrowserState()
    await openPage(new URL('/chapter/foreword', baseUrl).toString())

    logStep('Signing up Alice through the rendered auth modal')
    await signUp(alice.name, alice.email, alice.password)
    await waitForAuthModalToClose()
    await waitForUserEmail(alice.email)

    await clickButton('Save')
    await poll(
      async () => await bodyIncludes('Saved'),
      'Alice bookmark CTA did not switch to Saved',
    )

    const aliceScrollTarget = await evalNumber(`
      (() => {
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
        const target = Math.max(420, Math.floor(maxScroll * 0.35))
        window.scrollTo(0, target)
        return target
      })()
    `)
    await waitMs(1200)

    await openPage(new URL('/', baseUrl).toString())
    assert(await bodyIncludes('continue reading'), 'Alice continue-reading surface did not render after scrolling')
    assert(await bodyIncludes('a note on methodology'), 'Alice continue-reading card did not retain the chapter title')

    await openPage(new URL('/bookmarks', baseUrl).toString())
    assert(await bodyIncludes('a note on methodology'), 'Alice bookmark did not render on /bookmarks')

    logStep('Logging Alice out and checking Bob starts with a clean rendered reader state')
    await clickButton('Sign Out')
    await poll(async () => await evalBoolean('localStorage.getItem("veritas_auth") === null'), 'Alice logout did not clear browser auth state')

    await openPage(new URL('/chapter/foreword', baseUrl).toString())
    await waitMs(700)
    const bobInitialScrollY = await evalNumber('window.scrollY')
    assert(bobInitialScrollY < 100, `Bob inherited Alice scroll restore (${bobInitialScrollY}px)`)

    await signUp(bob.name, bob.email, bob.password)
    await waitForAuthModalToClose()
    await waitForUserEmail(bob.email)

    await openPage(new URL('/bookmarks', baseUrl).toString())
    assert(await bodyIncludes('no bookmarks yet'), 'Bob inherited Alice bookmarks in the rendered client')

    await openPage(new URL('/', baseUrl).toString())
    assert(!(await bodyIncludes('continue reading')), 'Bob inherited Alice continue-reading history')

    await openPage(new URL('/chapter/foreword', baseUrl).toString())
    await waitMs(700)
    const bobRestoredScrollY = await evalNumber('window.scrollY')
    assert(bobRestoredScrollY < 100, `Bob inherited Alice scroll restore after signup (${bobRestoredScrollY}px)`)

    await clickButton('Sign Out')
    await poll(async () => await evalBoolean('localStorage.getItem("veritas_auth") === null'), 'Bob logout did not clear browser auth state')
    await assertSignedOut()

    logStep('Logging Alice back in and checking her scoped state returns')
    await openPage(new URL('/chapter/foreword', baseUrl).toString())
    await logIn(alice.email, alice.password)
    await waitForAuthModalToClose()
    await waitForUserEmail(alice.email)

    await openPage(new URL('/', baseUrl).toString())
    assert(await bodyIncludes('continue reading'), 'Alice continue-reading surface did not return after re-login')
    assert(await bodyIncludes('a note on methodology'), 'Alice continue-reading card did not return after re-login')

    await openPage(new URL('/bookmarks', baseUrl).toString())
    assert(await bodyIncludes('a note on methodology'), 'Alice bookmark did not return after re-login')

    await openPage(new URL('/chapter/foreword', baseUrl).toString())
    await waitMs(700)
    const aliceRestoredScrollY = await evalNumber('window.scrollY')
    assert(
      aliceRestoredScrollY > Math.max(200, Math.floor(aliceScrollTarget * 0.5)),
      `Alice did not recover her own scroll position (${aliceRestoredScrollY}px)`,
    )

    assert(
      await evalBoolean('!Object.keys(localStorage).includes("veritas_reading_history") && !Object.keys(localStorage).includes("veritas_scroll_positions")'),
      'Legacy global reading-state keys still exist after browser verification',
    )
    assert(
      await evalBoolean('Object.keys(localStorage).some((key) => key.startsWith("veritas_reading_history:email:alice%40example.com"))'),
      'Alice scoped reading history key was not created',
    )
    assert(
      await evalBoolean('Object.keys(localStorage).some((key) => key.startsWith("veritas_scroll_positions:email:alice%40example.com"))'),
      'Alice scoped scroll-position key was not created',
    )
    assert(
      await evalBoolean('Object.keys(localStorage).some((key) => key.startsWith("veritas_progress:email:alice%40example.com"))'),
      'Alice scoped reading-progress key was not created',
    )

    console.log('[verify:auth-cache-browser] PASS')
  } finally {
    if (browser) {
      await browser.dispose().catch(() => {})
      browser = null
    }
  }
}

async function main() {
  const explicitBaseUrl = process.argv[2] || ''

  await withVerificationBaseUrl(
    {
      repoRoot: ROOT_DIR,
      cliBaseUrl: explicitBaseUrl,
      readinessPath: '/api/auth/status',
      defaultPort: DEFAULT_PORT,
      requireBuild: true,
      serverEnv: {
        DATABASE_URL: '',
      },
      readinessOptions: {
        timeoutMs: 8_000,
        validate: ({ response, data, endpointUrl }) => ({
          ok: response.ok && typeof data === 'object' && data !== null,
          reason: `${endpointUrl} returned ${response.status}`,
        }),
      },
    },
    async (resolvedBaseUrl) => {
      await runVerification(resolvedBaseUrl)
    },
  )
}

main().catch((error) => {
  console.error(`[verify:auth-cache-browser] FAIL — ${error.message}`)
  process.exit(1)
})
