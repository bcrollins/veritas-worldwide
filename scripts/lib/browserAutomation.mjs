import { spawnSync } from 'node:child_process'
import process from 'node:process'

function formatCommandFailure(command, result) {
  const stdout = (result.stdout || '').trim()
  const stderr = (result.stderr || '').trim()
  const detail = stderr || stdout || `exit ${result.status}`
  return `${command} failed: ${detail}`
}

function canUseAgentBrowser(rootDir) {
  const result = spawnSync('agent-browser', ['--help'], {
    cwd: rootDir,
    encoding: 'utf8',
  })

  return !result.error
}

function createAgentBrowserDriver(rootDir) {
  function run(args, input = null, allowFailure = false) {
    const result = spawnSync('agent-browser', args, {
      cwd: rootDir,
      encoding: 'utf8',
      input,
    })

    if (result.status !== 0 && !allowFailure) {
      throw new Error(formatCommandFailure(`agent-browser ${args.join(' ')}`, result))
    }

    return (result.stdout || '').trim() || (result.stderr || '').trim()
  }

  return {
    name: 'agent-browser',
    async open(url) {
      run(['open', url])
    },
    async wait(ms) {
      run(['wait', String(ms)])
    },
    async waitForLoadState(state = 'load') {
      run(['wait', '--load', state])
    },
    async evaluate(script) {
      return run(['eval', '--stdin'], script)
    },
    async close() {
      run(['close'], null, true)
    },
    async dispose() {
      await this.close()
    },
  }
}

async function createPlaywrightDriver() {
  let playwrightModule

  try {
    playwrightModule = await import('playwright')
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(
      `Playwright is not available. Install it with \`npm install --save-dev playwright\` or set VERITAS_BROWSER_DRIVER=agent-browser. Original error: ${message}`
    )
  }

  const { chromium } = playwrightModule
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  let page = null

  async function ensurePage() {
    if (!page || page.isClosed()) {
      page = await context.newPage()
    }

    return page
  }

  async function closePages() {
    await Promise.all(
      context.pages().map(async (existingPage) => {
        if (!existingPage.isClosed()) {
          await existingPage.close().catch(() => {})
        }
      }),
    )
    page = null
  }

  return {
    name: 'playwright',
    async open(url) {
      const activePage = await ensurePage()
      await activePage.goto(url, { waitUntil: 'load' })
    },
    async wait(ms) {
      const activePage = await ensurePage()
      await activePage.waitForTimeout(ms)
    },
    async waitForLoadState(state = 'load') {
      const activePage = await ensurePage()
      await activePage.waitForLoadState(state)
    },
    async evaluate(script) {
      const activePage = await ensurePage()
      const value = await activePage.evaluate((source) => {
        const result = window.eval(source)
        if (typeof result === 'string') {
          return result
        }
        if (result == null) {
          return ''
        }
        return String(result)
      }, script)

      return typeof value === 'string' ? value : String(value)
    },
    async close() {
      await closePages()
    },
    async dispose() {
      await closePages()
      await context.close().catch(() => {})
      await browser.close().catch(() => {})
    },
  }
}

export async function createBrowserAutomation({ rootDir }) {
  const preferredDriver = (process.env.VERITAS_BROWSER_DRIVER || 'auto').trim().toLowerCase()

  if (preferredDriver === 'agent-browser') {
    if (!canUseAgentBrowser(rootDir)) {
      throw new Error('VERITAS_BROWSER_DRIVER=agent-browser was requested, but the `agent-browser` binary is not available.')
    }

    return createAgentBrowserDriver(rootDir)
  }

  if (preferredDriver === 'playwright') {
    return createPlaywrightDriver()
  }

  if (canUseAgentBrowser(rootDir)) {
    return createAgentBrowserDriver(rootDir)
  }

  return createPlaywrightDriver()
}
