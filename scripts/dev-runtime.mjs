#!/usr/bin/env node

import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { getAvailablePort, waitForJsonEndpoint } from './lib/verificationRuntime.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_FRONTEND_PORT = 3000
const DEFAULT_BACKEND_PORT = 4175
const STARTUP_TIMEOUT_MS = 12_000

function parsePort(value, fallback) {
  const parsed = Number.parseInt(value || '', 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

async function stopChild(child, signal = 'SIGTERM') {
  if (!child || child.killed) return

  child.kill(signal)

  await new Promise((resolve) => {
    const timeout = setTimeout(() => {
      if (!child.killed) {
        child.kill('SIGKILL')
      }
      resolve()
    }, 500)

    child.once('exit', () => {
      clearTimeout(timeout)
      resolve()
    })
  })
}

async function main() {
  const preferredFrontendPort = parsePort(process.env.VERITAS_DEV_PORT, DEFAULT_FRONTEND_PORT)
  const preferredBackendPort = parsePort(process.env.VERITAS_API_PORT, DEFAULT_BACKEND_PORT)
  const backendPort = await getAvailablePort(preferredBackendPort)
  const backendBaseUrl = `http://127.0.0.1:${backendPort}`

  let frontend = null
  let backend = null
  let shuttingDown = false

  const shutdown = async (exitCode = 0) => {
    if (shuttingDown) return
    shuttingDown = true
    await Promise.all([stopChild(frontend), stopChild(backend)])
    process.exit(exitCode)
  }

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      void shutdown(0)
    })
  }

  backend = spawn('node', ['server.js'], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      PORT: String(backendPort),
    },
    stdio: 'inherit',
  })

  backend.on('exit', (code, signal) => {
    if (shuttingDown) return
    console.error(`[dev] Express API exited unexpectedly (${signal || code || 0}).`)
    void shutdown(code || 1)
  })

  try {
    await waitForJsonEndpoint(backendBaseUrl, '/api/auth/status', {
      timeoutMs: STARTUP_TIMEOUT_MS,
      validate: ({ response, data, endpointUrl }) => ({
        ok: response.ok && typeof data === 'object' && data !== null,
        reason: `${endpointUrl} returned ${response.status}`,
      }),
    })
  } catch (error) {
    console.error(`[dev] Backend failed to become ready at ${backendBaseUrl}.`)
    if (error instanceof Error) {
      console.error(`[dev] ${error.message}`)
    }
    await shutdown(1)
    return
  }

  console.log(`[dev] Express API ready at ${backendBaseUrl}`)
  console.log(`[dev] Proxying /api/* through Vite on preferred port ${preferredFrontendPort}`)

  frontend = spawn('node', ['./node_modules/vite/bin/vite.js', '--port', String(preferredFrontendPort)], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      VERITAS_DEV_PORT: String(preferredFrontendPort),
      VERITAS_API_PROXY_TARGET: backendBaseUrl,
    },
    stdio: 'inherit',
  })

  frontend.on('exit', (code, signal) => {
    if (shuttingDown) return
    console.error(`[dev] Vite exited (${signal || code || 0}).`)
    void shutdown(code || 0)
  })
}

main().catch((error) => {
  console.error('[dev] Failed to start local runtime.')
  if (error instanceof Error) {
    console.error(error.stack || error.message)
  } else {
    console.error(String(error))
  }
  process.exit(1)
})
