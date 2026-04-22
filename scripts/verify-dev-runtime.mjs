#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { createBrowserAutomation } from './lib/browserAutomation.mjs'
import { assert, getAvailablePort, waitForJsonEndpoint } from './lib/verificationRuntime.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_FRONTEND_PORT = 4310
const DEFAULT_BACKEND_PORT = 4315
const TIMEOUT_MS = Number.parseInt(process.env.DEV_RUNTIME_VERIFY_TIMEOUT_MS || '15000', 10)

function logStep(message) {
  console.log(`[verify:dev-runtime] ${message}`)
}

async function evalInPage(browser, script) {
  return (await browser.evaluate(script)).trim()
}

async function evalBoolean(browser, script) {
  return (await evalInPage(browser, script)) === 'true'
}

function stopProcessGroup(child) {
  if (!child || child.exitCode !== null) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const finalize = () => resolve()
    const timeout = setTimeout(() => {
      try {
        process.kill(-child.pid, 'SIGKILL')
      } catch {}
      finalize()
    }, 750)

    child.once('exit', () => {
      clearTimeout(timeout)
      finalize()
    })

    try {
      process.kill(-child.pid, 'SIGTERM')
    } catch {
      clearTimeout(timeout)
      finalize()
    }
  })
}

async function fetchJson(baseUrl, pathname) {
  const response = await fetch(new URL(pathname, baseUrl), {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })

  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return { response, data }
}

async function main() {
  const frontendPort = await getAvailablePort(DEFAULT_FRONTEND_PORT)
  const backendPort = await getAvailablePort(DEFAULT_BACKEND_PORT)
  const frontendBaseUrl = `http://localhost:${frontendPort}`
  const browser = await createBrowserAutomation({ rootDir: ROOT_DIR })

  let runtimeLogs = ''
  const runtime = spawn(process.platform === 'win32' ? 'node.exe' : 'node', ['scripts/dev-runtime.mjs'], {
    cwd: ROOT_DIR,
    detached: process.platform !== 'win32',
    env: {
      ...process.env,
      VERITAS_DEV_PORT: String(frontendPort),
      VERITAS_API_PORT: String(backendPort),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  runtime.stdout.on('data', (chunk) => {
    runtimeLogs += chunk.toString()
  })
  runtime.stderr.on('data', (chunk) => {
    runtimeLogs += chunk.toString()
  })

  try {
    logStep(`Using ${browser.name} browser driver`)
    logStep(`Starting unified dev runtime on frontend ${frontendPort} and backend ${backendPort}`)

    await waitForJsonEndpoint(frontendBaseUrl, '/api/build-info', {
      timeoutMs: TIMEOUT_MS,
      validate: ({ response, data, endpointUrl }) => ({
        ok: response.ok && typeof data === 'object' && data !== null,
        reason: `${endpointUrl} returned ${response.status}`,
      }),
    })

    const authStatus = await fetchJson(frontendBaseUrl, '/api/auth/status')
    assert(
      authStatus.response.ok &&
        typeof authStatus.data === 'object' &&
        authStatus.data !== null &&
        typeof authStatus.data.mode === 'string',
      `Expected auth status JSON through dev proxy, received ${authStatus.response.status}`,
    )

    const chapter = await fetchJson(frontendBaseUrl, '/api/chapters/foreword')
    assert(
      chapter.response.ok &&
        typeof chapter.data === 'object' &&
        chapter.data !== null &&
        chapter.data.id === 'foreword',
      `Expected foreword chapter JSON through dev proxy, received ${chapter.response.status}`,
    )

    const search = await fetchJson(frontendBaseUrl, '/api/search?q=federal+reserve')
    assert(
      search.response.ok &&
        typeof search.data === 'object' &&
        search.data !== null &&
        Array.isArray(search.data.results),
      `Expected search JSON through dev proxy, received ${search.response.status}`,
    )

    await browser.close()
    await browser.open(new URL('/read', frontendBaseUrl).toString())
    await delay(750)

    assert(
      !(await evalBoolean(browser, 'Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"))')),
      'Detected a browser error overlay while loading /read through the dev runtime',
    )
    assert(
      await evalBoolean(browser, 'document.body.innerText.trim().length > 0'),
      'The /read route rendered a blank page through the dev runtime',
    )
    assert(
      await evalBoolean(browser, 'document.body.innerText.includes("A Note on Methodology, Evidence Standards & How to Read This Book")'),
      'The /read route did not render the foreword heading through the dev runtime',
    )

    await browser.close()
    await browser.open(new URL('/chapter/chapter-1', frontendBaseUrl).toString())
    await delay(750)

    assert(
      !(await evalBoolean(browser, 'Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"))')),
      'Detected a browser error overlay while loading /chapter/chapter-1 through the dev runtime',
    )
    assert(
      await evalBoolean(browser, 'document.body.innerText.includes("The Birth of Central Banking")'),
      'The /chapter/chapter-1 route did not render the chapter title through the dev runtime',
    )
    assert(
      await evalBoolean(browser, 'document.body.innerText.includes("Supported by primary source documents")'),
      'The /chapter/chapter-1 route did not render the chapter evidence panel through the dev runtime',
    )

    logStep('PASS — proxied API routes, /read, and /chapter/chapter-1 render correctly through the unified dev runtime')
  } catch (error) {
    if (runtimeLogs.trim()) {
      console.error(runtimeLogs.trim())
    }
    throw error
  } finally {
    await browser.dispose().catch(() => {})
    await stopProcessGroup(runtime)
  }
}

main().catch((error) => {
  console.error(`[verify:dev-runtime] FAIL — ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
