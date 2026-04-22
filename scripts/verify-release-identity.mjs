#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { setTimeout as delay } from 'node:timers/promises'
import { withVerificationBaseUrl } from './lib/verificationRuntime.mjs'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'release-health-report.json')
const reportMdPath = path.join(stateDir, 'release-health-report.md')

const cliBaseUrl = process.argv[2] || ''
const timeoutMs = Number.parseInt(process.env.RELEASE_VERIFY_TIMEOUT_MS || '12000', 10)
const expectedCommit = (process.env.RELEASE_VERIFY_EXPECT_COMMIT || '').trim()
const deployTimeoutMs = Number.parseInt(process.env.RELEASE_VERIFY_DEPLOY_TIMEOUT_MS || '0', 10)
const deployPollIntervalMs = Number.parseInt(process.env.RELEASE_VERIFY_DEPLOY_POLL_INTERVAL_MS || '15000', 10)
let baseUrl = ''

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function nowIso() {
  return new Date().toISOString()
}

function getUrl(pathname) {
  return new URL(pathname, baseUrl).toString()
}

async function fetchJson(pathname) {
  const response = await fetch(getUrl(pathname), {
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

async function fetchHead(pathname) {
  return fetch(getUrl(pathname), {
    method: 'HEAD',
    signal: AbortSignal.timeout(timeoutMs),
  })
}

function addCheck(checks, failures, condition, label, detail) {
  checks.push({ ok: condition, label, detail })
  if (!condition) {
    failures.push(`${label}: ${detail}`)
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function matchesExpectedCommit(observedCommit, expectedCommitValue) {
  if (!observedCommit || !expectedCommitValue) return false
  return observedCommit.startsWith(expectedCommitValue) || expectedCommitValue.startsWith(observedCommit)
}

async function waitForExpectedCommit() {
  let buildResult = await fetchJson('/api/build-info')

  if (!expectedCommit) {
    return buildResult
  }

  const deadline = Date.now() + Math.max(deployTimeoutMs, 0)

  while (Date.now() < deadline) {
    const build = typeof buildResult.data === 'object' && buildResult.data !== null ? buildResult.data : {}
    if (buildResult.response.ok && matchesExpectedCommit(build.commit || build.commitShort || '', expectedCommit)) {
      return buildResult
    }

    await delay(deployPollIntervalMs)
    buildResult = await fetchJson('/api/build-info')
  }

  return buildResult
}

function buildMarkdownReport(report) {
  const lines = [
    '# Release Health Report',
    '',
    `- Checked at: ${report.checkedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Status: ${report.status}`,
    `- Version: ${report.build.version || 'unknown'}`,
    `- Commit: ${report.build.commitShort || 'unknown'}`,
    `- Deployment: ${report.build.deploymentId || 'unknown'}`,
    `- Analytics lifetime views: ${report.analytics.lifetime}`,
    `- Analytics signups: ${report.analytics.signups}`,
    '',
    '## Checks',
    ...report.checks.map((check) => `- ${check.ok ? 'PASS' : 'FAIL'} — ${check.label}: ${check.detail}`),
  ]

  if (report.failures.length > 0) {
    lines.push('', '## Failures', ...report.failures.map((failure) => `- ${failure}`))
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  await withVerificationBaseUrl(
    {
      repoRoot,
      cliBaseUrl,
      envBaseUrl: process.env.RELEASE_VERIFY_BASE_URL || '',
      readinessPath: '/api/build-info',
      requireBuild: true,
      readinessOptions: {
        timeoutMs,
        validate: ({ response, data, endpointUrl }) => ({
          ok: response.ok && typeof data === 'object' && data !== null,
          reason: `${endpointUrl} returned ${response.status}`,
        }),
      },
    },
    async (resolvedBaseUrl) => {
      baseUrl = resolvedBaseUrl
      ensureDir(stateDir)

      const checkedAt = nowIso()
      const checks = []
      const failures = []

      const buildResult = await waitForExpectedCommit()
      addCheck(
        checks,
        failures,
        buildResult.response.ok && typeof buildResult.data === 'object' && buildResult.data !== null,
        'Build info route responds',
        `GET /api/build-info returned ${buildResult.response.status}`
      )

      const build = typeof buildResult.data === 'object' && buildResult.data !== null ? buildResult.data : {}
      const expectsDeploymentHeader = Boolean(build.deploymentId)

      if (expectedCommit) {
        addCheck(
          checks,
          failures,
          matchesExpectedCommit(build.commit || build.commitShort || '', expectedCommit),
          'Live commit matches expected release',
          `expected ${expectedCommit}, observed ${build.commitShort || build.commit || 'unknown'}`
        )
      }

      const rootHead = await fetchHead('/')
      const headerVersion = rootHead.headers.get('x-veritas-version') || ''
      const headerCommit = rootHead.headers.get('x-veritas-commit') || ''
      const headerDeployment = rootHead.headers.get('x-veritas-deployment') || ''

      addCheck(checks, failures, rootHead.ok, 'Homepage release headers respond', `HEAD / returned ${rootHead.status}`)
      addCheck(checks, failures, Boolean(headerVersion), 'Release version header present', headerVersion || 'X-Veritas-Version missing')
      addCheck(checks, failures, Boolean(headerCommit), 'Release commit header present', headerCommit || 'X-Veritas-Commit missing')
      addCheck(
        checks,
        failures,
        expectsDeploymentHeader ? Boolean(headerDeployment) : true,
        'Release deployment header present',
        expectsDeploymentHeader ? (headerDeployment || 'X-Veritas-Deployment missing') : 'Deployment header not expected outside Railway'
      )

      if (build.commitShort || build.deploymentId || build.version) {
        addCheck(
          checks,
          failures,
          headerVersion === (build.version || '') &&
            headerCommit === (build.commitShort || '') &&
            (!expectsDeploymentHeader || headerDeployment === (build.deploymentId || '')),
          'Release headers match build info',
          `api=${build.commitShort || 'n/a'} / ${build.deploymentId || 'n/a'} · headers=${headerCommit || 'missing'} / ${headerDeployment || 'missing'}`
        )
      }

      addCheck(
        checks,
        failures,
        Array.isArray(build.entryAssets?.js) && build.entryAssets.js.length > 0,
        'Build info includes JavaScript entry assets',
        `js=${build.entryAssets?.js?.length ?? 0}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(build.entryAssets?.css) && build.entryAssets.css.length > 0,
        'Build info includes CSS entry assets',
        `css=${build.entryAssets?.css?.length ?? 0}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(build.entryAssets?.js) &&
          !build.entryAssets.js.some((asset) => typeof asset === 'string' && asset.includes('adminAuth')),
        'Public bundle excludes deprecated admin auth assets',
        `js=${Array.isArray(build.entryAssets?.js) ? build.entryAssets.js.join(', ') : 'missing'}`
      )

      const analyticsResult = await fetchJson('/api/analytics/snapshot')
      const analytics = typeof analyticsResult.data === 'object' && analyticsResult.data !== null ? analyticsResult.data : {}
      addCheck(
        checks,
        failures,
        analyticsResult.response.ok && typeof analytics === 'object',
        'Analytics snapshot responds',
        `GET /api/analytics/snapshot returned ${analyticsResult.response.status}`
      )

      const llmsHead = await fetchHead('/llms.txt')
      addCheck(checks, failures, llmsHead.ok, 'Machine-readable llms surface responds', `HEAD /llms.txt returned ${llmsHead.status}`)

      const instituteHead = await fetchHead('/veritas-institute.md')
      addCheck(
        checks,
        failures,
        instituteHead.ok,
        'Institute markdown surface responds',
        `HEAD /veritas-institute.md returned ${instituteHead.status}`
      )

      const report = {
        checkedAt,
        baseUrl,
        status: failures.length > 0 ? 'fail' : 'pass',
        build: {
          version: build.version || '',
          commit: build.commit || '',
          commitShort: build.commitShort || '',
          deploymentId: build.deploymentId || '',
          environment: build.environment || '',
          prerenderedRouteCount: build.prerenderedRouteCount || 0,
        },
        headers: {
          version: headerVersion,
          commit: headerCommit,
          deployment: headerDeployment,
        },
        analytics: {
          lifetime: analytics.lifetime || 0,
          today: analytics.today || 0,
          signups: analytics.funnel?.signups || 0,
          payments: analytics.funnel?.payments || 0,
        },
        checks,
        failures,
      }

      writeJson(reportJsonPath, report)
      fs.writeFileSync(reportMdPath, buildMarkdownReport(report))

      console.log(`[verify:release] ${report.status.toUpperCase()} — ${failures.length} failure(s)`)
      console.log(`[verify:release] Report JSON: ${reportJsonPath}`)
      console.log(`[verify:release] Report MD: ${reportMdPath}`)

      if (failures.length > 0) {
        for (const failure of failures) {
          console.error(`[verify:release] FAIL — ${failure}`)
        }
        process.exit(1)
      }
    }
  )
}

main().catch((error) => {
  console.error(`[verify:release] FAIL — ${error.message}`)
  process.exit(1)
})
