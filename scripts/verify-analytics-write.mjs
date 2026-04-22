#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'analytics-write-report.json')
const reportMdPath = path.join(stateDir, 'analytics-write-report.md')

const baseUrl = process.argv[2] || process.env.ANALYTICS_WRITE_BASE_URL || 'http://127.0.0.1:3000'
const timeoutMs = Number.parseInt(process.env.ANALYTICS_WRITE_TIMEOUT_MS || '15000', 10)
const pollAttempts = Number.parseInt(process.env.ANALYTICS_WRITE_POLL_ATTEMPTS || '10', 10)
const pollIntervalMs = Number.parseInt(process.env.ANALYTICS_WRITE_POLL_INTERVAL_MS || '1000', 10)
const stabilityAttempts = Number.parseInt(process.env.ANALYTICS_WRITE_STABILITY_ATTEMPTS || '5', 10)
const stabilityIntervalMs = Number.parseInt(process.env.ANALYTICS_WRITE_STABILITY_INTERVAL_MS || '1500', 10)
const eventName = process.env.ANALYTICS_WRITE_EVENT_NAME || 'search_performed'
const eventPath = process.env.ANALYTICS_WRITE_PATH || '/search'
const runId = `analytics-write-${new Date().toISOString().replace(/[:.]/g, '-')}`

const funnelKeysByEvent = {
  chapter_viewed: 'chapterViews',
  content_gate_hit: 'gateHits',
  email_signup: 'signups',
  account_created: 'signups',
  checkout_started: 'checkoutStarts',
  donation_started: 'checkoutStarts',
  payment_completed: 'payments',
  donation_completed: 'payments',
  share_clicked: 'shares',
  bookmark_added: 'bookmarks',
  search_performed: 'searches',
  pdf_downloaded: 'pdfDownloads',
  profile_viewed: 'profiles',
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function getUrl(pathname) {
  return new URL(pathname, baseUrl).toString()
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJson(pathname, options = {}) {
  const response = await fetch(getUrl(pathname), {
    headers: {
      accept: 'application/json',
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    signal: AbortSignal.timeout(timeoutMs),
    ...options,
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

async function getSnapshot(label) {
  const [buildResult, snapshotResult] = await Promise.all([
    fetchJson(`/api/build-info?t=${Date.now()}-${label}`),
    fetchJson(`/api/analytics/snapshot?t=${Date.now()}-${label}`),
  ])

  if (!buildResult.response.ok || typeof buildResult.data !== 'object' || !buildResult.data) {
    throw new Error(`build-info failed during ${label}: ${buildResult.response.status}`)
  }
  if (!snapshotResult.response.ok || typeof snapshotResult.data !== 'object' || !snapshotResult.data) {
    throw new Error(`analytics snapshot failed during ${label}: ${snapshotResult.response.status}`)
  }

  return {
    label,
    checkedAt: new Date().toISOString(),
    build: {
      commit: buildResult.data.commit || '',
      commitShort: buildResult.data.commitShort || '',
      deploymentId: buildResult.data.deploymentId || '',
      replica: buildResult.data.replica || '',
      replicaRegion: buildResult.data.replicaRegion || '',
    },
    snapshot: snapshotResult.data,
  }
}

function getEventCount(snapshot) {
  return Number(snapshot?.eventCounts?.[eventName] || 0)
}

function getFunnelCount(snapshot) {
  const key = funnelKeysByEvent[eventName]
  if (!key) return null
  return Number(snapshot?.funnel?.[key] || 0)
}

function summarize(point) {
  return {
    label: point.label,
    checkedAt: point.checkedAt,
    commitShort: point.build.commitShort,
    deploymentId: point.build.deploymentId,
    replica: point.build.replica,
    replicaRegion: point.build.replicaRegion,
    eventCount: getEventCount(point.snapshot),
    funnelCount: getFunnelCount(point.snapshot),
  }
}

function writeReports(report) {
  ensureDir(stateDir)
  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`)

  const lines = [
    '# Analytics Write Report',
    '',
    `- Checked at: ${report.checkedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Status: ${report.status}`,
    `- Event: ${report.eventName}`,
    `- Path: ${report.eventPath}`,
    `- Run ID: ${report.runId}`,
    `- Before count: ${report.before.eventCount}`,
    `- Expected minimum: ${report.expectedMinimum}`,
    `- Confirmed count: ${report.confirmed.eventCount}`,
    `- Distinct observed regions: ${report.observedRegions.length ? report.observedRegions.join(', ') : 'not exposed'}`,
    '',
    '## Stability Samples',
    ...report.stability.map((sample) => `- ${sample.checkedAt} ${sample.replicaRegion || 'unknown-region'} count=${sample.eventCount}`),
  ]

  if (report.failures.length > 0) {
    lines.push('', '## Failures', ...report.failures.map((failure) => `- ${failure}`))
  }

  fs.writeFileSync(reportMdPath, `${lines.join('\n')}\n`)
}

async function main() {
  const before = await getSnapshot('before')
  const beforeCount = getEventCount(before.snapshot)
  const expectedMinimum = beforeCount + 1

  const eventResult = await fetchJson('/api/analytics/event', {
    method: 'POST',
    body: JSON.stringify({
      name: eventName,
      path: eventPath,
      properties: {
        verification: 'analytics_write_probe',
        run_id: runId,
      },
    }),
  })

  if (!eventResult.response.ok || eventResult.data?.ok !== true) {
    throw new Error(`analytics event write failed: ${eventResult.response.status}`)
  }

  let confirmed = null
  for (let attempt = 1; attempt <= pollAttempts; attempt += 1) {
    const point = await getSnapshot(`confirm-${attempt}`)
    if (getEventCount(point.snapshot) >= expectedMinimum) {
      confirmed = point
      break
    }
    await delay(pollIntervalMs)
  }

  if (!confirmed) {
    throw new Error(`${eventName} did not reach ${expectedMinimum} after ${pollAttempts} poll(s)`)
  }

  const stability = []
  const failures = []
  for (let attempt = 1; attempt <= stabilityAttempts; attempt += 1) {
    await delay(stabilityIntervalMs)
    const point = await getSnapshot(`stable-${attempt}`)
    const count = getEventCount(point.snapshot)
    const funnelCount = getFunnelCount(point.snapshot)
    const funnelKey = funnelKeysByEvent[eventName]
    stability.push(summarize(point))

    if (count < expectedMinimum) {
      failures.push(`${eventName} regressed below ${expectedMinimum} during stability sample ${attempt}: ${count}`)
    }
    if (funnelKey && funnelCount !== null && funnelCount < expectedMinimum) {
      failures.push(`funnel.${funnelKey} regressed below ${expectedMinimum} during stability sample ${attempt}: ${funnelCount}`)
    }
  }

  const allPoints = [before, confirmed, ...stability.map((sample) => ({
    label: sample.label,
    checkedAt: sample.checkedAt,
    build: {
      commitShort: sample.commitShort,
      deploymentId: sample.deploymentId,
      replica: sample.replica,
      replicaRegion: sample.replicaRegion,
    },
    snapshot: {},
  }))]
  const observedRegions = [...new Set(allPoints.map((point) => point.build?.replicaRegion).filter(Boolean))]

  const report = {
    checkedAt: new Date().toISOString(),
    baseUrl,
    status: failures.length === 0 ? 'pass' : 'fail',
    eventName,
    eventPath,
    runId,
    expectedMinimum,
    before: summarize(before),
    confirmed: summarize(confirmed),
    stability,
    observedRegions,
    failures,
  }

  writeReports(report)

  console.log(`[verify:analytics-write] ${report.status.toUpperCase()} — ${failures.length} failure(s)`)
  console.log(`[verify:analytics-write] Report JSON: ${reportJsonPath}`)
  console.log(`[verify:analytics-write] Report MD: ${reportMdPath}`)

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`[verify:analytics-write] FAIL — ${failure}`)
    }
    process.exit(1)
  }
}

main().catch((error) => {
  ensureDir(stateDir)
  console.error(`[verify:analytics-write] FAIL — ${error.message}`)
  process.exit(1)
})
