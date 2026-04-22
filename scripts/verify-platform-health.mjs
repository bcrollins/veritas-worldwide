#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { withVerificationBaseUrl } from './lib/verificationRuntime.mjs'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'platform-health-report.json')
const reportMdPath = path.join(stateDir, 'platform-health-report.md')

const cliBaseUrl = process.argv[2] || ''
const timeoutMs = Number.parseInt(process.env.PLATFORM_VERIFY_TIMEOUT_MS || '12000', 10)
let baseUrl = ''

const prerenderRoutes = [
  {
    path: '/read',
    label: 'Read route prerender',
    marker: 'Read The Record | Veritas Worldwide',
  },
  {
    path: '/chapter/chapter-1',
    label: 'Chapter route prerender',
    marker: 'The Birth of Central Banking',
  },
  {
    path: '/institute',
    label: 'Institute landing prerender',
    marker: 'Veritas Institute | Practical Skills Catalog, Guides, and Field Manual',
  },
  {
    path: '/institute/book',
    label: 'Institute field manual prerender',
    marker: 'Field Manual | Veritas Institute',
  },
]

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
    headers: {
      accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
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

  return { response, data, text }
}

async function fetchText(pathname) {
  const response = await fetch(getUrl(pathname), {
    headers: {
      accept: 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8',
      'Cache-Control': 'no-cache',
    },
    signal: AbortSignal.timeout(timeoutMs),
  })

  return {
    response,
    text: await response.text(),
  }
}

function addCheck(checks, failures, condition, label, detail) {
  checks.push({ ok: condition, label, detail })
  if (!condition) {
    failures.push(`${label}: ${detail}`)
  }
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function buildMarkdownReport(report) {
  const lines = [
    '# Platform Health Report',
    '',
    `- Checked at: ${report.checkedAt}`,
    `- Base URL: ${report.baseUrl}`,
    `- Status: ${report.status}`,
    `- Build commit: ${report.build.commitShort || 'unknown'}`,
    `- Deployment: ${report.build.deploymentId || 'unknown'}`,
    `- Auth mode: ${report.auth.mode || 'unknown'}`,
    `- Search results: ${report.search.totalResults}`,
    `- Analytics lifetime views: ${report.analytics.lifetime}`,
    '',
    '## Checks',
    ...report.checks.map((check) => `- ${check.ok ? 'PASS' : 'FAIL'} — ${check.label}: ${check.detail}`),
    '',
    '## Prerender Routes',
    ...report.prerenderRoutes.map(
      (route) =>
        `- ${route.path} — status ${route.status}, content-type ${route.contentType || 'unknown'}, marker ${route.markerFound ? 'present' : 'missing'}`
    ),
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
      envBaseUrl: process.env.PLATFORM_VERIFY_BASE_URL || '',
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

      const buildResult = await fetchJson('/api/build-info')
      const build = typeof buildResult.data === 'object' && buildResult.data !== null ? buildResult.data : {}

      addCheck(
        checks,
        failures,
        buildResult.response.ok && typeof buildResult.data === 'object' && buildResult.data !== null,
        'Build info route responds',
        `GET /api/build-info returned ${buildResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(build.prerenderedRouteCount) && build.prerenderedRouteCount > 0,
        'Build info reports prerender coverage',
        `prerenderedRouteCount=${build.prerenderedRouteCount ?? 'unknown'}`
      )

      const authStatusResult = await fetchJson('/api/auth/status')
      const authStatus = typeof authStatusResult.data === 'object' && authStatusResult.data !== null ? authStatusResult.data : {}

      addCheck(
        checks,
        failures,
        authStatusResult.response.ok,
        'Auth status route responds',
        `GET /api/auth/status returned ${authStatusResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        typeof authStatus.available === 'boolean',
        'Auth status exposes availability',
        `available=${authStatus.available}`
      )
      addCheck(
        checks,
        failures,
        authStatus.mode === 'database' || authStatus.mode === 'degraded',
        'Auth status exposes a known mode',
        `mode=${authStatus.mode || 'unknown'}`
      )

      const authMeResult = await fetchJson('/api/auth/me')
      const expectedAuthMeStatuses = authStatus.available ? new Set([401]) : new Set([503])
      addCheck(
        checks,
        failures,
        expectedAuthMeStatuses.has(authMeResult.response.status),
        'Anonymous auth probe returns a guarded status',
        `GET /api/auth/me returned ${authMeResult.response.status} while mode=${authStatus.mode || 'unknown'}`
      )

      const downloadResult = await fetchJson('/api/downloads/the-record.pdf')
      const expectedDownloadStatuses = new Set([200])
      addCheck(
        checks,
        failures,
        downloadResult.response.status === 200,
        'Public PDF download is readable for signed-out probes',
        `GET /api/downloads/the-record.pdf returned ${downloadResult.response.status}`
      )

      const chapterPreviewResult = await fetchJson('/api/chapters/chapter-1')
      const chapterPreview = typeof chapterPreviewResult.data === 'object' && chapterPreviewResult.data !== null ? chapterPreviewResult.data : {}

      addCheck(
        checks,
        failures,
        chapterPreviewResult.response.ok,
        'Public chapter route responds',
        `GET /api/chapters/chapter-1 returned ${chapterPreviewResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        chapterPreview.accessLevel === 'full',
        'Public chapter payload returns the full reader body',
        `accessLevel=${chapterPreview.accessLevel || 'unknown'}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(chapterPreview.content) &&
          typeof chapterPreview.totalBlocks === 'number' &&
          typeof chapterPreview.previewBlockLimit === 'number' &&
          chapterPreview.previewBlockLimit === 0 &&
          chapterPreview.content.length === chapterPreview.totalBlocks,
        'Public chapter payload is not block-limited',
        `content=${Array.isArray(chapterPreview.content) ? chapterPreview.content.length : 'invalid'} preview=${chapterPreview.previewBlockLimit ?? 'missing'} total=${chapterPreview.totalBlocks ?? 'missing'}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(chapterPreview.sources) && chapterPreview.sources.length > 0,
        'Public chapter payload exposes source rows',
        `sources=${Array.isArray(chapterPreview.sources) ? chapterPreview.sources.length : 'invalid'}`
      )
      addCheck(
        checks,
        failures,
        typeof chapterPreview.chapterType === 'string' && chapterPreview.chapterType.length > 0,
        'Public chapter payload exposes chapter type metadata',
        `chapterType=${chapterPreview.chapterType || 'missing'}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(chapterPreview.availableEvidenceTiers) && chapterPreview.availableEvidenceTiers.length > 0,
        'Public chapter payload exposes evidence tier metadata',
        `availableEvidenceTiers=${Array.isArray(chapterPreview.availableEvidenceTiers) ? chapterPreview.availableEvidenceTiers.join(', ') : 'invalid'}`
      )
      addCheck(
        checks,
        failures,
        typeof chapterPreview.evidenceCounts === 'object' &&
          chapterPreview.evidenceCounts !== null &&
          typeof chapterPreview.evidenceCounts.verified === 'number' &&
          typeof chapterPreview.evidenceCounts.circumstantial === 'number' &&
          typeof chapterPreview.evidenceCounts.disputed === 'number',
        'Public chapter payload exposes evidence counts metadata',
        `evidenceCounts=${chapterPreview.evidenceCounts ? JSON.stringify(chapterPreview.evidenceCounts) : 'missing'}`
      )

      const searchResult = await fetchJson('/api/search?q=federal%20reserve')
      const search = typeof searchResult.data === 'object' && searchResult.data !== null ? searchResult.data : {}
      const searchResults = Array.isArray(search.results) ? search.results : []
      const firstSearchResult = searchResults[0] || {}

      addCheck(
        checks,
        failures,
        searchResult.response.ok,
        'Anonymous search route responds',
        `GET /api/search returned ${searchResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        search.scope === 'full',
        'Anonymous search uses full public reader scope',
        `scope=${search.scope || 'unknown'}`
      )
      addCheck(
        checks,
        failures,
        searchResults.length > 0,
        'Anonymous search returns results for a stable investigative query',
        `results=${searchResults.length}`
      )
      addCheck(
        checks,
        failures,
        typeof firstSearchResult.chapterType === 'string' && firstSearchResult.chapterType.length > 0,
        'Anonymous search results expose chapter type metadata',
        `chapterType=${firstSearchResult.chapterType || 'missing'}`
      )
      addCheck(
        checks,
        failures,
        firstSearchResult.accessLevel === 'full',
        'Anonymous search results expose full public access',
        `accessLevel=${firstSearchResult.accessLevel || 'missing'}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(firstSearchResult.availableEvidenceTiers) && firstSearchResult.availableEvidenceTiers.length > 0,
        'Anonymous search results expose evidence tier metadata',
        `availableEvidenceTiers=${Array.isArray(firstSearchResult.availableEvidenceTiers) ? firstSearchResult.availableEvidenceTiers.join(', ') : 'invalid'}`
      )

      const analyticsResult = await fetchJson('/api/analytics/snapshot')
      const analytics = typeof analyticsResult.data === 'object' && analyticsResult.data !== null ? analyticsResult.data : {}

      addCheck(
        checks,
        failures,
        analyticsResult.response.ok,
        'Analytics snapshot route responds',
        `GET /api/analytics/snapshot returned ${analyticsResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(analytics.lifetime),
        'Analytics lifetime stays non-negative',
        `lifetime=${analytics.lifetime}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(analytics.today),
        'Analytics today count stays non-negative',
        `today=${analytics.today}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(analytics.funnel?.signups),
        'Analytics funnel exposes signup totals',
        `signups=${analytics.funnel?.signups}`
      )

      const prerenderRouteResults = []

      for (const route of prerenderRoutes) {
        const htmlResult = await fetchText(route.path)
        const contentType = htmlResult.response.headers.get('content-type') || ''
        const markerFound = htmlResult.text.includes(route.marker)

        addCheck(
          checks,
          failures,
          htmlResult.response.ok,
          `${route.label} responds`,
          `GET ${route.path} returned ${htmlResult.response.status}`
        )
        addCheck(
          checks,
          failures,
          /text\/html|application\/xhtml\+xml/i.test(contentType),
          `${route.label} returns HTML`,
          `content-type=${contentType || 'missing'}`
        )
        addCheck(
          checks,
          failures,
          markerFound,
          `${route.label} contains its route-specific marker`,
          `marker=${route.marker}`
        )

        prerenderRouteResults.push({
          path: route.path,
          label: route.label,
          status: htmlResult.response.status,
          contentType,
          marker: route.marker,
          markerFound,
        })
      }

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
        auth: {
          available: Boolean(authStatus.available),
          mode: authStatus.mode || '',
          anonymousAuthStatus: authMeResult.response.status,
          anonymousDownloadStatus: downloadResult.response.status,
        },
        search: {
          query: 'federal reserve',
          scope: search.scope || '',
          totalResults: searchResults.length,
          firstResultChapterId: firstSearchResult.chapterId || '',
        },
        analytics: {
          lifetime: analytics.lifetime || 0,
          today: analytics.today || 0,
          signups: analytics.funnel?.signups || 0,
          payments: analytics.funnel?.payments || 0,
        },
        prerenderRoutes: prerenderRouteResults,
        checks,
        failures,
      }

      writeJson(reportJsonPath, report)
      fs.writeFileSync(reportMdPath, buildMarkdownReport(report))

      console.log(`[verify:platform] ${report.status.toUpperCase()} — ${failures.length} failure(s)`)
      console.log(`[verify:platform] Report JSON: ${reportJsonPath}`)
      console.log(`[verify:platform] Report MD: ${reportMdPath}`)

      if (failures.length > 0) {
        for (const failure of failures) {
          console.error(`[verify:platform] FAIL — ${failure}`)
        }
        process.exit(1)
      }
    }
  )
}

main().catch((error) => {
  console.error(`[verify:platform] FAIL — ${error.message}`)
  process.exit(1)
})
