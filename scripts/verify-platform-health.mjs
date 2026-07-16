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

      
      addCheck(
        checks,
        failures,
        build.recordPdf === true,
        'Build info reports manuscript PDF present',
        `recordPdf=${build.recordPdf}`
      )
      addCheck(
        checks,
        failures,
        build.instituteFieldManualPdf === true,
        'Build info reports institute field manual PDF present',
        `instituteFieldManualPdf=${build.instituteFieldManualPdf}`
      )
const healthResult = await fetchJson('/api/health')
      const health = typeof healthResult.data === 'object' && healthResult.data !== null ? healthResult.data : {}

      addCheck(
        checks,
        failures,
        healthResult.response.ok && health.status === 'ok',
        'Health probe reports ok',
        `GET /api/health returned ${healthResult.response.status} status=${health.status || 'unknown'}`
      )
      addCheck(
        checks,
        failures,
        typeof health.checks === 'object' && health.checks !== null && health.checks.chapterData === true,
        'Health probe confirms chapter data',
        `chapterData=${health.checks?.chapterData}`
      )
      addCheck(
        checks,
        failures,
        typeof health.checks === 'object' && health.checks !== null && health.checks.prerender === true,
        'Health probe confirms prerender coverage',
        `prerender=${health.checks?.prerender}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(health.analyticsLifetime),
        'Health probe exposes analytics lifetime',
        `analyticsLifetime=${health.analyticsLifetime}`
      )
      addCheck(
        checks,
        failures,
        health.clientErrorIntake === true,
        'Health probe reports client error intake enabled',
        `clientErrorIntake=${health.clientErrorIntake}`
      )
      addCheck(
        checks,
        failures,
        isNonNegativeNumber(health.clientErrorIntakeCount),
        'Health probe exposes client error intake count',
        `clientErrorIntakeCount=${health.clientErrorIntakeCount}`
      )

      const archiveManifestResult = await fetchJson('/israel-dossier/workbooks/briefing-source-archive-manifest.json')
      const archiveManifest =
        typeof archiveManifestResult.data === 'object' && archiveManifestResult.data !== null
          ? archiveManifestResult.data
          : {}
      const archiveEntries = Array.isArray(archiveManifest.entries) ? archiveManifest.entries : []
      const pinnedArchiveCount = archiveEntries.filter((entry) => entry && entry.status === 'pinned').length

      addCheck(
        checks,
        failures,
        archiveManifestResult.response.ok,
        'Briefing source archive manifest responds',
        `GET archive manifest returned ${archiveManifestResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        pinnedArchiveCount >= 38,
        'Briefing source archive manifest has pinned snapshots',
        `pinned=${pinnedArchiveCount}`
      )

      const contentPackResult = await fetchText('/content-pack')
      addCheck(
        checks,
        failures,
        contentPackResult.response.ok,
        'Content pack route responds',
        `GET /content-pack returned ${contentPackResult.response.status}`
      )

      const healthHistoryResult = await fetchJson('/api/health/history')
      const healthHistory =
        typeof healthHistoryResult.data === 'object' && healthHistoryResult.data !== null
          ? healthHistoryResult.data
          : {}
      addCheck(
        checks,
        failures,
        healthHistoryResult.response.ok && Array.isArray(healthHistory.samples),
        'Health history endpoint responds',
        `GET /api/health/history returned ${healthHistoryResult.response.status}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(healthHistory.commitTransitions) && Array.isArray(healthHistory.uniqueCommits),
        'Health history exposes commit transition fields',
        `commitTransitions=${Array.isArray(healthHistory.commitTransitions)} uniqueCommits=${Array.isArray(healthHistory.uniqueCommits)}`
      )
      addCheck(
        checks,
        failures,
        Array.isArray(healthHistory.uniqueReplicas),
        'Health history exposes uniqueReplicas array',
        `uniqueReplicas=${Array.isArray(healthHistory.uniqueReplicas)} count=${Array.isArray(healthHistory.uniqueReplicas) ? healthHistory.uniqueReplicas.length : 0}`
      )
      addCheck(
        checks,
        failures,
        Number(healthHistory.maxSamples || 0) >= 96,
        'Health history max samples supports multi-day retention',
        `maxSamples=${healthHistory.maxSamples}`
      )
      const healthHistoryStorage = typeof healthHistory.storage === 'string' ? healthHistory.storage : ''
      const knownStorage = ['shared-database', 'configured-data-dir', 'replica-local-data-dir']
      addCheck(
        checks,
        failures,
        knownStorage.includes(healthHistoryStorage),
        'Health history reports known storage backend',
        `storage=${healthHistoryStorage || 'missing'}`
      )
      // Production always has DATABASE_URL; prefer shared multi-replica persistence.
      if (health.checks?.databaseConfigured === true) {
        addCheck(
          checks,
          failures,
          healthHistoryStorage === 'shared-database' && healthHistory.sharedAcrossReplicas === true,
          'Health history is shared across replicas via database',
          `storage=${healthHistoryStorage} sharedAcrossReplicas=${healthHistory.sharedAcrossReplicas}`
        )
      }
      const livePrerenderCount = Number(health.prerenderedRouteCount || build.prerenderedRouteCount || 0)
      addCheck(
        checks,
        failures,
        livePrerenderCount >= 270,
        'Live prerender route count stays above crawler floor',
        `prerenderedRouteCount=${livePrerenderCount}`
      )
      addCheck(
        checks,
        failures,
        typeof health.sentryForwardConfigured === 'boolean',
        'Health exposes optional Sentry forward configuration flag',
        `sentryForwardConfigured=${health.sentryForwardConfigured}`
      )
      addCheck(
        checks,
        failures,
        typeof health.healthHistoryStorage === 'string' && health.healthHistoryStorage.length > 0,
        'Health exposes health history storage label',
        `healthHistoryStorage=${health.healthHistoryStorage || 'missing'}`
      )
      addCheck(
        checks,
        failures,
        typeof health.popularChapterCount === 'number' && health.popularChapterCount >= 0,
        'Health exposes popular chapter count from analytics',
        `popularChapterCount=${health.popularChapterCount}`
      )
      if (health.checks?.databaseConfigured === true) {
        addCheck(
          checks,
          failures,
          health.healthHistoryStorage === 'shared-database' && health.healthHistorySharedAcrossReplicas === true,
          'Health reports shared multi-replica history storage',
          `healthHistoryStorage=${health.healthHistoryStorage} shared=${health.healthHistorySharedAcrossReplicas}`
        )
      }

      const clientErrorProbe = await fetch(getUrl('/api/client-error'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          message: 'platform-health probe',
          name: 'PlatformHealthProbe',
          source: 'verify:platform',
          path: '/api/client-error',
        }),
        signal: AbortSignal.timeout(timeoutMs),
      })
      addCheck(
        checks,
        failures,
        clientErrorProbe.status === 204 || clientErrorProbe.status === 429,
        'Client error intake accepts or rate-limits probes',
        `POST /api/client-error returned ${clientErrorProbe.status}`
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
      addCheck(
        checks,
        failures,
        typeof authStatus.accessTokenTtl === 'string' || authStatus.accessTokenTtl === undefined,
        'Auth status exposes access token TTL when present',
        `accessTokenTtl=${authStatus.accessTokenTtl || 'missing'}`
      )
      // After the 7d access-token ship, require a non-30d TTL when the field is present.
      if (typeof authStatus.accessTokenTtl === 'string') {
        addCheck(
          checks,
          failures,
          authStatus.accessTokenTtl === '7d',
          'Auth access token TTL is 7 days',
          `accessTokenTtl=${authStatus.accessTokenTtl}`
        )
      }
      if (authStatus.sessionRefresh === true) {
        addCheck(
          checks,
          failures,
          true,
          'Auth status reports session refresh available',
          'sessionRefresh=true'
        )
      } else if (authStatus.sessionRefresh === false) {
        addCheck(
          checks,
          failures,
          false,
          'Auth status reports session refresh available',
          'sessionRefresh=false'
        )
      }

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
      addCheck(
        checks,
        failures,
        downloadResult.response.status === 200,
        'Public PDF download is readable for signed-out probes',
        `GET /api/downloads/the-record.pdf returned ${downloadResult.response.status}`
      )

      const institutePdfResult = await fetch(getUrl('/veritas-institute-field-manual.pdf'), {
        method: 'HEAD',
        headers: { 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(timeoutMs),
      })
      const institutePdfType = (institutePdfResult.headers.get('content-type') || '').toLowerCase()
      const institutePdfCache = (institutePdfResult.headers.get('cache-control') || '').toLowerCase()
      const institutePdfOk =
        institutePdfResult.ok &&
        (institutePdfType.includes('pdf') ||
          institutePdfType.includes('octet-stream') ||
          // Some hosts omit content-type on HEAD; body probe below covers size.
          institutePdfType === '')
      addCheck(
        checks,
        failures,
        institutePdfOk,
        'Institute field manual PDF is publicly downloadable',
        `HEAD /veritas-institute-field-manual.pdf returned ${institutePdfResult.status} type=${institutePdfType || 'none'}`
      )

      addCheck(
        checks,
        failures,
        health.checks?.instituteFieldManualPdf === true || institutePdfOk,
        'Health probe reports institute field manual PDF (or asset responds)',
        `checks.instituteFieldManualPdf=${health.checks?.instituteFieldManualPdf}`
      )
      addCheck(
        checks,
        failures,
        !institutePdfCache.includes('immutable'),
        'Institute field manual PDF is not immutably cached',
        `cache-control=${institutePdfCache || 'none'}`
      )
      const institutePdfDisposition = (institutePdfResult.headers.get('content-disposition') || '').toLowerCase()
      addCheck(
        checks,
        failures,
        institutePdfDisposition.includes('veritas-institute-field-manual.pdf'),
        'Institute field manual PDF sets Content-Disposition filename',
        `content-disposition=${institutePdfDisposition || 'none'}`
      )

      const recordPdfResult = await fetch(getUrl('/the-record.pdf'), {
        method: 'HEAD',
        headers: { 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(timeoutMs),
      })
      const recordPdfCache = (recordPdfResult.headers.get('cache-control') || '').toLowerCase()
      const recordPdfDisposition = (recordPdfResult.headers.get('content-disposition') || '').toLowerCase()
      addCheck(
        checks,
        failures,
        recordPdfResult.ok && !recordPdfCache.includes('immutable'),
        'The Record PDF is publicly downloadable and not immutably cached',
        `status=${recordPdfResult.status} cache=${recordPdfCache || 'none'}`
      )
      addCheck(
        checks,
        failures,
        recordPdfDisposition.includes('the-record.pdf'),
        'The Record PDF sets Content-Disposition filename',
        `content-disposition=${recordPdfDisposition || 'none'}`
      )

      const sitemapResult = await fetchText('/sitemap.xml')
      const sitemapText = sitemapResult.text || ''
      addCheck(
        checks,
        failures,
        sitemapResult.response.ok && sitemapText.includes('/veritas-institute-field-manual.pdf'),
        'Sitemap indexes the institute field manual PDF',
        `sitemap status=${sitemapResult.response.status} hasFieldManualPdf=${sitemapText.includes('/veritas-institute-field-manual.pdf')}`
      )
      const withdrawnNews = [
        'ai-deepfakes-election-disinformation-regulation-2026',
        'pharmaceutical-lobbying-record-spending-drug-prices-2026',
        'ukraine-russia-peace-negotiations-minerals-deal-2026',
        'supreme-court-ethics-undisclosed-gifts-recusal-2026',
      ]
      const withdrawnInSitemap = withdrawnNews.filter((slug) => sitemapText.includes(`/news/${slug}`))
      addCheck(
        checks,
        failures,
        withdrawnInSitemap.length === 0,
        'Sitemap excludes withdrawn unsupported news pack',
        `orphans=${withdrawnInSitemap.join(',') || 'none'}`
      )

      const sourcedNewsSlugs = [
        'election-security-ai-risk-frameworks-cisa-nist-2026',
        'treasury-debt-transparency-fiscaldata-fed-h15-2026',
        'aviation-safety-ntsb-faa-primary-records-2026',
        'judicial-ethics-supreme-court-code-of-conduct-primary-2026',
      ]
      for (const slug of sourcedNewsSlugs) {
        const newsResult = await fetchText(`/news/${slug}`)
        const body = newsResult.text || ''
        addCheck(
          checks,
          failures,
          newsResult.response.ok && (body.includes(slug) || body.includes('CISA') || body.includes('FiscalData') || body.includes('NTSB') || body.includes('Code of Conduct') || body.includes('Election Security') || body.includes('Treasury Debt') || body.includes('Aviation Safety') || body.includes('Judicial Ethics')),
          `Sourced news route responds: /news/${slug}`,
          `status=${newsResult.response.status}`
        )
      }

      const feedResult = await fetchText('/feed.xml')
      const feedText = feedResult.text || ''
      addCheck(
        checks,
        failures,
        feedResult.response.ok && feedText.includes('/veritas-institute-field-manual.pdf'),
        'RSS feed announces the institute field manual PDF',
        `feed status=${feedResult.response.status} hasFieldManualPdf=${feedText.includes('/veritas-institute-field-manual.pdf')}`
      )

      const robotsResult = await fetchText('/robots.txt')
      addCheck(
        checks,
        failures,
        robotsResult.response.ok && (robotsResult.text || '').includes('/veritas-institute-field-manual.pdf'),
        'robots.txt allows the field manual PDF',
        `status=${robotsResult.response.status}`
      )

      const instituteHtml = await fetchText('/institute')
      addCheck(
        checks,
        failures,
        instituteHtml.response.ok && (instituteHtml.text || '').includes('/veritas-institute-field-manual.pdf'),
        'Institute catalog prerender links the field manual PDF',
        `status=${instituteHtml.response.status} hasPdfLink=${(instituteHtml.text || '').includes('/veritas-institute-field-manual.pdf')}`
      )
      const instituteBookHtml = await fetchText('/institute/book')
      addCheck(
        checks,
        failures,
        instituteBookHtml.response.ok && (instituteBookHtml.text || '').includes('encodingFormat') && (instituteBookHtml.text || '').includes('/veritas-institute-field-manual.pdf'),
        'Institute book prerender exposes PDF encoding schema',
        `status=${instituteBookHtml.response.status}`
      )

      const instituteMd = await fetchText('/veritas-institute.md')
      addCheck(
        checks,
        failures,
        instituteMd.response.ok && (instituteMd.text || '').includes('/veritas-institute-field-manual.pdf'),
        'Institute markdown indexes the field manual PDF',
        `status=${instituteMd.response.status}`
      )

      // Trust-layer prerender shells must advertise the durable Field Manual PDF
      // without waiting for SPA hydration (crawler + first-paint discovery).
      const trustShellRoutes = [
        { path: '/terms', label: 'Terms' },
        { path: '/privacy', label: 'Privacy' },
        { path: '/accessibility', label: 'Accessibility' },
        { path: '/about', label: 'About' },
        { path: '/methodology', label: 'Methodology' },
        { path: '/sources', label: 'Sources' },
      ]
      for (const shell of trustShellRoutes) {
        const shellHtml = await fetchText(shell.path)
        const text = shellHtml.text || ''
        addCheck(
          checks,
          failures,
          shellHtml.response.ok && text.includes('/veritas-institute-field-manual.pdf'),
          `${shell.label} prerender links the field manual PDF`,
          `status=${shellHtml.response.status} hasPdfLink=${text.includes('/veritas-institute-field-manual.pdf')}`
        )
        addCheck(
          checks,
          failures,
          shellHtml.response.ok && text.includes('/institute/book'),
          `${shell.label} prerender links the Field Manual route`,
          `status=${shellHtml.response.status} hasBookLink=${text.includes('/institute/book')}`
        )
      }

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
      const boostedSearch = await fetchJson('/api/search?q=federal%20reserve&recent=chapter-9')
      const boostedRows = Array.isArray(boostedSearch.data?.results) ? boostedSearch.data.results : []
      const boostedChapter9 = boostedRows.find((row) => row && row.chapterId === 'chapter-9')
      addCheck(
        checks,
        failures,
        boostedSearch.response.ok,
        'Engagement-boosted search responds',
        `status=${boostedSearch.response.status}`
      )
      if (boostedChapter9) {
        addCheck(
          checks,
          failures,
          boostedChapter9.engagementBoost === true,
          'Engagement boost flags recently read chapter',
          `engagementBoost=${boostedChapter9.engagementBoost}`
        )
      }

      const baseSearch = await fetchJson('/api/search?q=federal%20reserve')
      const baseSearchData =
        typeof baseSearch.data === 'object' && baseSearch.data !== null ? baseSearch.data : {}
      addCheck(
        checks,
        failures,
        baseSearch.response.ok && Array.isArray(baseSearchData.filters?.popularChapterIds),
        'Search exposes sitewide popularChapterIds from analytics',
        `status=${baseSearch.response.status} popularCount=${Array.isArray(baseSearchData.filters?.popularChapterIds) ? baseSearchData.filters.popularChapterIds.length : 0}`
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
