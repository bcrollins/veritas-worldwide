import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { createServer as createNetServer } from 'node:net'
import { setTimeout as delay } from 'node:timers/promises'

export function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function normalizeValidationResult(result, fallbackReason) {
  if (typeof result === 'boolean') {
    return { ok: result, reason: fallbackReason }
  }

  if (result && typeof result === 'object' && typeof result.ok === 'boolean') {
    return {
      ok: result.ok,
      reason: result.reason || fallbackReason,
    }
  }

  return { ok: false, reason: fallbackReason }
}

function looksLikeHtmlDocument(value) {
  return typeof value === 'string' && /<!doctype html>|<html[\s>]/i.test(value)
}

async function fetchJson(url, timeoutMs) {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(timeoutMs),
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

export async function waitForJsonEndpoint(baseUrl, readinessPath, options = {}) {
  const {
    timeoutMs = 12_000,
    intervalMs = 250,
    validate = ({ response }) => response.ok,
  } = options
  const endpointUrl = new URL(readinessPath, baseUrl).toString()
  const startedAt = Date.now()
  let lastReason = `Timed out waiting for ${endpointUrl}`

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const result = await fetchJson(endpointUrl, timeoutMs)
      const validation = normalizeValidationResult(
        validate({
          baseUrl,
          endpointUrl,
          response: result.response,
          data: result.data,
        }),
        `${endpointUrl} returned ${result.response.status}`
      )

      if (validation.ok) {
        return result
      }

      lastReason = validation.reason

      if (looksLikeHtmlDocument(result.data)) {
        throw new Error(
          `${endpointUrl} returned HTML instead of JSON. Point this verifier at the Express API server or a deployed environment, not the Vite dev server.`
        )
      }
    } catch (error) {
      lastReason = error instanceof Error ? error.message : String(error)
    }

    await delay(intervalMs)
  }

  throw new Error(lastReason)
}

async function stopServer(server) {
  if (!server || server.killed) {
    return
  }

  server.kill('SIGTERM')
  await delay(250)

  if (!server.killed) {
    server.kill('SIGKILL')
  }
}

export function getAvailablePort(preferredPort = 0) {
  return new Promise((resolve, reject) => {
    const tryListen = (port) => {
      const server = createNetServer()
      server.unref()

      server.once('error', (error) => {
        server.close()
        if (port !== 0) {
          tryListen(0)
          return
        }
        reject(error)
      })

      server.listen(port, '127.0.0.1', () => {
        const address = server.address()
        const resolvedPort = typeof address === 'object' && address ? address.port : port
        server.close((error) => {
          if (error) {
            reject(error)
            return
          }
          resolve(resolvedPort)
        })
      })
    }

    tryListen(preferredPort)
  })
}

export async function withVerificationBaseUrl(options, task) {
  const {
    repoRoot,
    cliBaseUrl = '',
    envBaseUrl = '',
    defaultPort = 4175,
    readinessPath,
    readinessOptions,
    requireBuild = false,
    requireDatabase = false,
    serverEnv = {},
  } = options

  const explicitBaseUrl = cliBaseUrl || envBaseUrl

  if (explicitBaseUrl) {
    await waitForJsonEndpoint(explicitBaseUrl, readinessPath, readinessOptions)
    return task(explicitBaseUrl)
  }

  if (requireBuild) {
    const distIndexPath = path.join(repoRoot, 'dist', 'index.html')
    assert(
      fs.existsSync(distIndexPath),
      `Missing dist/index.html. Run \`npm run build\` before running this verifier without an explicit base URL.`
    )
  }

  if (requireDatabase && !process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL environment variable is required when no AUTH_TEST_BASE_URL is provided. Set DATABASE_URL locally or point the verifier at a deployed API.'
    )
  }

  const port = await getAvailablePort(defaultPort)
  const baseUrl = `http://localhost:${port}`
  const server = spawn('node', ['server.js'], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PORT: String(port),
      ...serverEnv,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  let serverLogs = ''
  server.stdout.on('data', (chunk) => {
    serverLogs += chunk.toString()
  })
  server.stderr.on('data', (chunk) => {
    serverLogs += chunk.toString()
  })

  try {
    await waitForJsonEndpoint(baseUrl, readinessPath, readinessOptions)
    return await task(baseUrl)
  } catch (error) {
    if (serverLogs.trim()) {
      console.error(serverLogs.trim())
    }
    throw error
  } finally {
    await stopServer(server)
  }
}
