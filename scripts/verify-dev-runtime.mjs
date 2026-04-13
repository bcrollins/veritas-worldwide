#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { assert, getAvailablePort, waitForJsonEndpoint } from './lib/verificationRuntime.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_FRONTEND_PORT = 4310
const DEFAULT_BACKEND_PORT = 4315
const TIMEOUT_MS = Number.parseInt(process.env.DEV_RUNTIME_VERIFY_TIMEOUT_MS || '15000', 10)

function logStep(message) {
  console.log(`[verify:dev-runtime] ${message}`)
}

function runAgentBrowser(args, input = null, allowFailure = false) {
  const result = spawnSync('agent-browser', args, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
    input,
  })

  const stdout = (result.stdout || '').trim()
  const stderr = (result.stderr || '').trim()

  if (result.status !== 0 && !allowFailure) {
    throw new Error(`agent-browser ${args.join(' ')} failed: ${stderr || stdout || `exit ${result.status}`}`)
  }

  return stdout || stderr
}

function evalInPage(script) {
  return runAgentBrowser(['eval', '--stdin'], script).trim()
}

function evalBoolean(script) {
  return evalInPage(script) === 'true'
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

    runAgentBrowser(['close'], null, true)
    runAgentBrowser(['open', new URL('/read', frontendBaseUrl).toString()])
    runAgentBrowser(['wait', '--load', 'networkidle'])
    await delay(250)

    assert(
      !evalBoolean('Boolean(document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay"))'),
      'Detected a browser error overlay while loading /read through the dev runtime',
    )
    assert(
      evalBoolean('document.body.innerText.trim().length > 0'),
      'The /read route rendered a blank page through the dev runtime',
    )
    assert(
      evalBoolean('document.body.innerText.includes("A Note on Methodology, Evidence Standards & How to Read This Book")'),
      'The /read route did not render the foreword heading through the dev runtime',
    )

    logStep('PASS — proxied API routes and /read render correctly through the unified dev runtime')
  } catch (error) {
    if (runtimeLogs.trim()) {
      console.error(runtimeLogs.trim())
    }
    throw error
  } finally {
    runAgentBrowser(['close'], null, true)
    await stopProcessGroup(runtime)
  }
}

main().catch((error) => {
  console.error(`[verify:dev-runtime] FAIL — ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
})
