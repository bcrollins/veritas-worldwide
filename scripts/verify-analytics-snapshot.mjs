#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'analytics-health-report.json')
const reportMdPath = path.join(stateDir, 'analytics-health-report.md')
const baselinePath = path.join(stateDir, 'analytics-health-baseline.json')

const baseUrl = process.argv[2] || process.env.ANALYTICS_VERIFY_BASE_URL || 'http://127.0.0.1:3000'
const timeoutMs = Number.parseInt(process.env.ANALYTICS_VERIFY_TIMEOUT_MS || '12000', 10)
const allowRegression = process.env.ANALYTICS_VERIFY_ALLOW_REGRESSION === '1'

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function nowIso() {
  return new Date().toISOString()
}

function getTodayKey() {
  return nowIso().slice(0, 10)
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

function isNonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function addCheck(checks, failures, condition, label, detail) {
  checks.push({ ok: condition, label, detail })
  if (!condition) {
    failures.push(`${label}: ${detail}`)
  }
}

function getDerivedEventCounts(eventCounts) {
  const count = (name) => (typeof eventCounts?.[name] === 'number' ? eventCounts[name] : 0)

  return {
    chapterViews: count('chapter_viewed'),
    gateHits: count('content_gate_hit'),
    signups: count('email_signup') + count('account_created'),
    checkoutStarts: count('checkout_started') + count('donation_started'),
    payments: count('payment_completed') + count('donation_completed'),
    shares: count('share_clicked'),
    bookmarks: count('bookmark_added'),
    searches: count('search_performed'),
    pdfDownloads: count('pdf_downloaded'),
    profiles: count('profile_viewed'),
  }
}

function readBaseline() {
  if (!fs.existsSync(baselinePath)) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
  } catch {
    return null
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function buildMarkdownReport(report) {
  const lines = [
    `# Analytics Health Report`,
    ``,
    `- Checked at: ${report.checkedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Status: ${report.status}`,
    `- Build commit: ${report.build.commitShort || 'unknown'}`,
    `- Deployment: ${report.build.deploymentId || 'unknown'}`,
    `- Lifetime views: ${report.snapshot.lifetime}`,
    `- Funnel signups: ${report.snapshot.funnel.signups}`,
    `- Funnel chapter views: ${report.snapshot.funnel.chapterViews}`,
    ``,
    `## Checks`,
    ...report.checks.map((check) => `- ${check.ok ? 'PASS' : 'FAIL'} — ${check.label}: ${check.detail}`),
  ]

  if (report.failures.length > 0) {
    lines.push('', '## Failures', ...report.failures.map((failure) => `- ${failure}`))
  }

  if (report.warnings.length > 0) {
    lines.push('', '## Warnings', ...report.warnings.map((warning) => `- ${warning}`))
  }

  if (report.previousBaseline) {
    lines.push(
      '',
      '## Previous Baseline',
      `- Checked at: ${report.previousBaseline.checkedAt}`,
      `- Lifetime views: ${report.previousBaseline.snapshot.lifetime}`,
      `- Funnel signups: ${report.previousBaseline.snapshot.funnel.signups}`,
      `- Funnel chapter views: ${report.previousBaseline.snapshot.funnel.chapterViews}`
    )
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  ensureDir(stateDir)

  const checkedAt = nowIso()
  const checks = []
  const failures = []
  const warnings = []

  const buildResult = await fetchJson('/api/build-info')
  addCheck(
    checks,
    failures,
    buildResult.response.ok && typeof buildResult.data === 'object' && buildResult.data !== null,
    'Build info route responds',
    `GET /api/build-info returned ${buildResult.response.status}`
  )

  const snapshotResult = await fetchJson('/api/analytics/snapshot')
  addCheck(
    checks,
    failures,
    snapshotResult.response.ok && typeof snapshotResult.data === 'object' && snapshotResult.data !== null,
    'Analytics snapshot route responds',
    `GET /api/analytics/snapshot returned ${snapshotResult.response.status}`
  )

  const build = typeof buildResult.data === 'object' && buildResult.data !== null ? buildResult.data : {}
  const snapshot = typeof snapshotResult.data === 'object' && snapshotResult.data !== null ? snapshotResult.data : {}
  const funnel = typeof snapshot.funnel === 'object' && snapshot.funnel !== null ? snapshot.funnel : {}
  const eventCounts = typeof snapshot.eventCounts === 'object' && snapshot.eventCounts !== null ? snapshot.eventCounts : {}
  const dailyTrend = Array.isArray(snapshot.dailyTrend) ? snapshot.dailyTrend : []
  const eventTrend = Array.isArray(snapshot.eventTrend) ? snapshot.eventTrend : []
  const topPages = Array.isArray(snapshot.topPages) ? snapshot.topPages : []

  for (const [label, value] of Object.entries({
    lifetime: snapshot.lifetime,
    today: snapshot.today,
    thisWeek: snapshot.thisWeek,
    thisMonth: snapshot.thisMonth,
    thisYear: snapshot.thisYear,
  })) {
    addCheck(checks, failures, isNonNegativeNumber(value), `${label} is non-negative`, `${label}=${value}`)
  }

  const derived = getDerivedEventCounts(eventCounts)
  const funnelKeys = Object.keys(derived)

  for (const key of funnelKeys) {
    addCheck(
      checks,
      failures,
      isNonNegativeNumber(funnel[key]),
      `Funnel ${key} is non-negative`,
      `${key}=${funnel[key]}`
    )
  }

  addCheck(
    checks,
    failures,
    isNonNegativeNumber(snapshot.lifetime) && snapshot.lifetime >= snapshot.today,
    'Lifetime views do not undercount today',
    `lifetime=${snapshot.lifetime}, today=${snapshot.today}`
  )

  addCheck(
    checks,
    failures,
    dailyTrend.length === 30,
    'Daily trend window is 30 days',
    `dailyTrend.length=${dailyTrend.length}`
  )

  addCheck(
    checks,
    failures,
    eventTrend.length === 14,
    'Event trend window is 14 days',
    `eventTrend.length=${eventTrend.length}`
  )

  const todayKey = getTodayKey()
  const todayTrendPoint = dailyTrend.find((point) => point?.date === todayKey)
  addCheck(
    checks,
    failures,
    Boolean(todayTrendPoint),
    'Daily trend contains today',
    `todayKey=${todayKey}`
  )

  if (todayTrendPoint) {
    addCheck(
      checks,
      failures,
      todayTrendPoint.views === snapshot.today,
      'Today count matches daily trend',
      `today=${snapshot.today}, dailyTrend[today]=${todayTrendPoint.views}`
    )
  }

  const todayEventPoint = eventTrend.find((point) => point?.date === todayKey)
  addCheck(
    checks,
    failures,
    Boolean(todayEventPoint),
    'Event trend contains today',
    `todayKey=${todayKey}`
  )

  for (const key of funnelKeys) {
    addCheck(
      checks,
      failures,
      funnel[key] === derived[key],
      `Funnel ${key} matches raw event counts`,
      `funnel.${key}=${funnel[key]}, derived=${derived[key]}`
    )
  }

  if (todayEventPoint) {
    for (const key of ['chapterViews', 'signups', 'checkoutStarts', 'payments']) {
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(todayEventPoint[key]),
        `Today's event trend ${key} is non-negative`,
        `${key}=${todayEventPoint[key]}`
      )
    }
  }

  addCheck(
    checks,
    failures,
    snapshot.lifetime === 0 || topPages.length > 0,
    'Top pages are present when lifetime views exist',
    `lifetime=${snapshot.lifetime}, topPages.length=${topPages.length}`
  )

  const previousBaseline = readBaseline()
  if (!previousBaseline) {
    warnings.push('No previous analytics baseline found. Current snapshot becomes the baseline for regression checks.')
  } else if (previousBaseline.baseUrl === baseUrl) {
    if (allowRegression) {
      warnings.push('Regression checks were skipped because ANALYTICS_VERIFY_ALLOW_REGRESSION=1.')
    } else {
      addCheck(
        checks,
        failures,
        snapshot.lifetime >= previousBaseline.snapshot.lifetime,
        'Lifetime views did not regress',
        `previous=${previousBaseline.snapshot.lifetime}, current=${snapshot.lifetime}`
      )
      addCheck(
        checks,
        failures,
        funnel.signups >= previousBaseline.snapshot.funnel.signups,
        'Funnel signups did not regress',
        `previous=${previousBaseline.snapshot.funnel.signups}, current=${funnel.signups}`
      )
      addCheck(
        checks,
        failures,
        funnel.chapterViews >= previousBaseline.snapshot.funnel.chapterViews,
        'Funnel chapter views did not regress',
        `previous=${previousBaseline.snapshot.funnel.chapterViews}, current=${funnel.chapterViews}`
      )
    }
  } else {
    warnings.push(`Previous baseline base URL (${previousBaseline.baseUrl}) does not match current base URL (${baseUrl}); regression checks skipped.`)
  }

  const report = {
    checkedAt,
    baseUrl,
    status: failures.length === 0 ? 'pass' : 'fail',
    build: {
      version: build.version || '',
      commit: build.commit || '',
      commitShort: build.commitShort || '',
      deploymentId: build.deploymentId || '',
      environment: build.environment || '',
    },
    snapshot: {
      lifetime: snapshot.lifetime ?? 0,
      today: snapshot.today ?? 0,
      thisWeek: snapshot.thisWeek ?? 0,
      thisMonth: snapshot.thisMonth ?? 0,
      thisYear: snapshot.thisYear ?? 0,
      funnel: {
        chapterViews: funnel.chapterViews ?? 0,
        gateHits: funnel.gateHits ?? 0,
        signups: funnel.signups ?? 0,
        checkoutStarts: funnel.checkoutStarts ?? 0,
        payments: funnel.payments ?? 0,
        shares: funnel.shares ?? 0,
        bookmarks: funnel.bookmarks ?? 0,
        searches: funnel.searches ?? 0,
        pdfDownloads: funnel.pdfDownloads ?? 0,
        profiles: funnel.profiles ?? 0,
      },
      eventCounts,
      topPagesCount: topPages.length,
      todayKey,
    },
    checks,
    failures,
    warnings,
    previousBaseline,
  }

  writeJson(reportJsonPath, report)
  fs.writeFileSync(reportMdPath, buildMarkdownReport(report))

  if (failures.length === 0) {
    writeJson(baselinePath, {
      checkedAt,
      baseUrl,
      build: report.build,
      snapshot: report.snapshot,
    })
  }

  console.log(`[verify:analytics] ${report.status.toUpperCase()} — ${failures.length} failure(s), ${warnings.length} warning(s)`)
  console.log(`[verify:analytics] Report JSON: ${reportJsonPath}`)
  console.log(`[verify:analytics] Report MD: ${reportMdPath}`)

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`[verify:analytics] FAIL — ${failure}`)
    }
    process.exit(1)
  }
}

main().catch((error) => {
  ensureDir(stateDir)
  console.error(`[verify:analytics] FAIL — ${error.message}`)
  process.exit(1)
})
