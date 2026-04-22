#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'source-link-report.json')
const reportMdPath = path.join(stateDir, 'source-link-report.md')
const trendJsonPath = path.join(stateDir, 'source-link-trends.json')
const trendMdPath = path.join(stateDir, 'source-link-trends.md')

const timeoutMs = Number.parseInt(process.env.SOURCE_LINK_TIMEOUT_MS || '12000', 10)
const concurrency = Number.parseInt(process.env.SOURCE_LINK_CONCURRENCY || '12', 10)
const strictMode = process.env.SOURCE_LINK_STRICT === '1'
const userAgent = process.env.SOURCE_LINK_USER_AGENT || 'Mozilla/5.0 (compatible; VeritasSourceLinkChecker/1.0; +https://veritasworldwide.com)'
const retryCount = Number.parseInt(process.env.SOURCE_LINK_RETRIES || '1', 10)
const hardFailureStatuses = new Set(['missing', 'failed', 'error', 'invalid'])

const wafRestrictedHosts = new Set([
  'en-social-sciences.tau.ac.il',
  'socsci-english-cms.tau.ac.il',
  'web.archive.org',
])

const candidateFiles = [
  ...fs.readdirSync(path.join(repoRoot, 'src', 'data', 'chapters'))
    .filter((fileName) => fileName.endsWith('.ts'))
    .map((fileName) => path.join(repoRoot, 'src', 'data', 'chapters', fileName)),
  path.join(repoRoot, 'src', 'data', 'articles.ts'),
  path.join(repoRoot, 'src', 'data', 'articlesExpanded.ts'),
  path.join(repoRoot, 'src', 'data', 'israelDossierCanon.ts'),
  path.join(repoRoot, 'src', 'data', 'israelDossierExpanded.ts'),
  path.join(repoRoot, 'src', 'data', 'profileData.ts'),
]

const publicTemplateDir = path.join(repoRoot, 'public', 'israel-dossier', 'templates')
const staticReferenceFiles = fs.existsSync(publicTemplateDir)
  ? fs.readdirSync(publicTemplateDir)
    .filter((fileName) => /\.(csv|md|json)$/i.test(fileName))
    .map((fileName) => path.join(publicTemplateDir, fileName))
  : []

const allowedPathKeys = new Set([
  'sources',
  'sourcedclaims',
  'donations',
  'policyactions',
  'quotes',
  'multimedia',
])

const blockedPathKeys = new Set([
  'heroimage',
  'image',
  'imageurl',
  'photourl',
  'websites',
  'seo',
  'contact',
])

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function getNodeText(node, sourceFile) {
  return node.getText(sourceFile)
}

function getPropertyName(nameNode) {
  if (!nameNode) {
    return null
  }

  if (ts.isIdentifier(nameNode) || ts.isStringLiteral(nameNode) || ts.isNumericLiteral(nameNode)) {
    return nameNode.text
  }

  return null
}

function getStringValue(node) {
  if (!node) {
    return null
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }

  return null
}

function truncate(text, maxLength = 140) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) {
    return normalized
  }
  return `${normalized.slice(0, maxLength - 3)}...`
}

function normalizeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl.trim())
    parsed.hash = ''
    return parsed.toString()
  } catch {
    return null
  }
}

function shouldCollectUrl({ propertyName, pathKeys, siblingKeys }) {
  if (pathKeys.some((key) => blockedPathKeys.has(key))) {
    return false
  }

  if (propertyName === 'sourceurl') {
    return true
  }

  if (pathKeys.some((key) => allowedPathKeys.has(key))) {
    return true
  }

  if (siblingKeys.has('source') || siblingKeys.has('publisher')) {
    return true
  }

  return false
}

function buildReferenceLabel(stringProps) {
  const candidates = [
    stringProps.get('title'),
    stringProps.get('label'),
    stringProps.get('text'),
    stringProps.get('claim'),
    stringProps.get('action'),
    stringProps.get('source'),
    stringProps.get('publisher'),
    stringProps.get('from'),
    stringProps.get('context'),
  ].filter(Boolean)

  if (candidates.length === 0) {
    return 'Untitled reference'
  }

  return truncate(candidates[0])
}

function extractReferencesFromFile(filePath) {
  const relativeFile = path.relative(repoRoot, filePath)
  const sourceText = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS)
  const references = []

  function visitExpression(expression, pathSegments) {
    if (ts.isObjectLiteralExpression(expression)) {
      visitObject(expression, pathSegments)
      return
    }

    if (ts.isArrayLiteralExpression(expression)) {
      expression.elements.forEach((element) => {
        if (ts.isObjectLiteralExpression(element) || ts.isArrayLiteralExpression(element)) {
          visitExpression(element, pathSegments)
        }
      })
    }
  }

  function visitObject(objectNode, pathSegments) {
    const stringProps = new Map()
    const siblingKeys = new Set()

    for (const property of objectNode.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue
      }

      const propertyName = getPropertyName(property.name)
      if (!propertyName) {
        continue
      }

      siblingKeys.add(propertyName.toLowerCase())
      const stringValue = getStringValue(property.initializer)
      if (stringValue) {
        stringProps.set(propertyName.toLowerCase(), stringValue)
      }
    }

    for (const property of objectNode.properties) {
      if (!ts.isPropertyAssignment(property)) {
        continue
      }

      const propertyName = getPropertyName(property.name)
      if (!propertyName) {
        continue
      }

      const normalizedPropertyName = propertyName.toLowerCase()
      const nextPath = [...pathSegments, normalizedPropertyName]

      if (normalizedPropertyName === 'url' || normalizedPropertyName === 'sourceurl') {
        const rawUrl = getStringValue(property.initializer)
        if (rawUrl) {
          const normalizedUrl = normalizeUrl(rawUrl)
          const pathKeys = pathSegments.map((segment) => segment.toLowerCase())
          const referenceLabel = buildReferenceLabel(stringProps)

          if (shouldCollectUrl({ propertyName: normalizedPropertyName, pathKeys, siblingKeys })) {
            references.push({
              file: relativeFile,
              path: nextPath.join('.'),
              label: referenceLabel,
              rawUrl,
              normalizedUrl,
            })
          }
        }
      }

      if (ts.isObjectLiteralExpression(property.initializer) || ts.isArrayLiteralExpression(property.initializer)) {
        visitExpression(property.initializer, nextPath)
      }
    }
  }

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!declaration.initializer) {
        continue
      }

      const declarationName = getNodeText(declaration.name, sourceFile).toLowerCase()
      if (ts.isObjectLiteralExpression(declaration.initializer) || ts.isArrayLiteralExpression(declaration.initializer)) {
        visitExpression(declaration.initializer, [declarationName])
      }
    }
  }

  return references
}

function extractReferencesFromStaticFile(filePath) {
  const relativeFile = path.relative(repoRoot, filePath)
  const sourceText = fs.readFileSync(filePath, 'utf8')
  const references = []
  const urlPattern = /https?:\/\/[^\s"',<>]+/g
  const seen = new Set()

  for (const match of sourceText.matchAll(urlPattern)) {
    const rawUrl = match[0].replace(/[),.;\]]+$/, '')
    const normalizedUrl = normalizeUrl(rawUrl)
    if (seen.has(rawUrl)) {
      continue
    }

    seen.add(rawUrl)
    const lineStart = sourceText.lastIndexOf('\n', match.index) + 1
    const lineEnd = sourceText.indexOf('\n', match.index)
    const line = sourceText.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
    references.push({
      file: relativeFile,
      path: 'static-template.url',
      label: truncate(line || path.basename(filePath)),
      rawUrl,
      normalizedUrl,
    })
  }

  return references
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isTransientFetchError(error) {
  const code = error?.cause?.code || error?.code
  return error?.name === 'AbortError' || ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_SOCKET'].includes(code)
}

async function fetchOnceWithTimeout(url, options) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': userAgent,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      ...options,
    })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchWithTimeout(url, options) {
  let lastError = null
  const transientErrors = []

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    try {
      const response = await fetchOnceWithTimeout(url, options)
      response.veritasAttempts = attempt + 1
      response.veritasTransientErrors = transientErrors
      return response
    } catch (error) {
      lastError = error
      const transient = isTransientFetchError(error)
      if (transient) {
        transientErrors.push({
          attempt: attempt + 1,
          error: error instanceof Error ? error.message : String(error),
        })
      }
      if (attempt >= retryCount || !transient) {
        if (error && typeof error === 'object') {
          error.veritasAttempts = attempt + 1
          error.veritasTransientErrors = transientErrors
        }
        throw error
      }
      await sleep(250 * (attempt + 1))
    }
  }

  throw lastError
}

async function getArchiveSnapshot(url) {
  try {
    const response = await fetchWithTimeout(`https://archive.org/wayback/available?url=${encodeURIComponent(url)}`, {
      method: 'GET',
    })

    if (!response.ok) {
      return null
    }

    const payload = await response.json()
    const snapshot = payload?.archived_snapshots?.closest
    if (!snapshot?.available || !snapshot?.url) {
      return null
    }

    return {
      available: true,
      url: snapshot.url,
      timestamp: snapshot.timestamp || null,
      status: snapshot.status || null,
    }
  } catch {
    return null
  }
}

function isKnownVerifierRestrictedHost(url) {
  try {
    return wafRestrictedHosts.has(new URL(url).hostname)
  } catch {
    return false
  }
}

function classifyHttpStatus(statusCode, url) {
  if (statusCode >= 200 && statusCode < 300) {
    return 'ok'
  }

  if (statusCode >= 300 && statusCode < 400) {
    return 'redirect'
  }

  if ([401, 403, 429].includes(statusCode) || (statusCode === 503 && isKnownVerifierRestrictedHost(url))) {
    return 'restricted'
  }

  if ([404, 410].includes(statusCode)) {
    return 'missing'
  }

  if (statusCode >= 500) {
    return 'error'
  }

  return 'failed'
}

async function probeUrl(url) {
  const attempts = [
    { method: 'HEAD' },
    { method: 'GET' },
  ]

  let lastError = null
  let attemptCount = 0
  const transientErrors = []

  for (const attempt of attempts) {
    try {
      const response = await fetchWithTimeout(url, { method: attempt.method })
      attemptCount += response.veritasAttempts || 1
      transientErrors.push(...(response.veritasTransientErrors || []))
      const classification = classifyHttpStatus(response.status, url)

      if (
        attempt.method === 'HEAD' &&
        (lastError || [400, 404, 405, 500, 501, 502, 503, 504].includes(response.status))
      ) {
        await response.body?.cancel().catch(() => {})
        continue
      }

      const result = {
        status: classification,
        httpStatus: response.status,
        finalUrl: response.url || url,
        redirected: response.redirected || response.url !== url,
        checkedWith: attempt.method,
        attempts: attemptCount,
        transientErrors,
      }

      if (classification === 'redirect' && result.finalUrl === url) {
        result.status = 'ok'
      }

      await response.body?.cancel().catch(() => {})
      return result
    } catch (error) {
      attemptCount += error?.veritasAttempts || 1
      transientErrors.push(...(error?.veritasTransientErrors || []))
      lastError = error
    }
  }

  return {
    status: 'error',
    httpStatus: null,
    finalUrl: url,
    redirected: false,
    checkedWith: 'GET',
    attempts: attemptCount,
    transientErrors,
    error: lastError instanceof Error ? lastError.message : String(lastError),
  }
}

async function mapWithConcurrency(items, worker, limit) {
  const results = new Array(items.length)
  let index = 0

  async function runNext() {
    const currentIndex = index
    index += 1
    if (currentIndex >= items.length) {
      return
    }

    results[currentIndex] = await worker(items[currentIndex], currentIndex)
    await runNext()
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runNext()))
  return results
}

function getDomain(url) {
  try {
    return new URL(url).hostname
  } catch {
    return 'invalid-url'
  }
}

function summarizeByDomain(results) {
  const counts = new Map()

  for (const result of results) {
    const key = result.domain
    counts.set(key, (counts.get(key) || 0) + 1)
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([domain, count]) => ({ domain, count }))
}

function readJsonIfExists(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

function buildResultMap(report) {
  const map = new Map()

  for (const result of report?.results || []) {
    map.set(result.url, result)
  }

  return map
}

function buildSummaryDelta(currentSummary, previousSummary) {
  const keys = [
    'referenceCount',
    'uniqueUrlCount',
    'ok',
    'redirect',
    'restricted',
    'transient',
    'missing',
    'failed',
    'invalid',
    'archived',
  ]

  return Object.fromEntries(keys.map((key) => {
    const current = currentSummary?.[key] || 0
    const previous = previousSummary?.[key] || 0
    return [key, { current, previous, delta: current - previous }]
  }))
}

function summarizeResult(result) {
  return {
    url: result.url,
    domain: result.domain,
    status: result.status,
    probeStatus: result.probeStatus || result.status,
    httpStatus: result.httpStatus,
    attempts: result.attempts || 0,
    transientErrorCount: result.transientErrors?.length || 0,
    archiveUrl: result.archive?.url || null,
    referenceLabels: (result.referenceLabels || []).slice(0, 3),
    referenceFiles: result.referenceFiles || [],
  }
}

function buildDomainCounts(results, predicate) {
  const counts = new Map()

  for (const result of results) {
    if (!predicate(result)) {
      continue
    }

    counts.set(result.domain, (counts.get(result.domain) || 0) + 1)
  }

  return counts
}

function buildDomainDeltas(currentResults, previousResults, predicate) {
  const currentCounts = buildDomainCounts(currentResults, predicate)
  const previousCounts = buildDomainCounts(previousResults, predicate)
  const domains = new Set([...currentCounts.keys(), ...previousCounts.keys()])

  return Array.from(domains)
    .map((domain) => {
      const current = currentCounts.get(domain) || 0
      const previous = previousCounts.get(domain) || 0
      return { domain, current, previous, delta: current - previous }
    })
    .filter((item) => item.delta !== 0)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || a.domain.localeCompare(b.domain))
    .slice(0, 20)
}

function buildTrendReport(report, previousReport) {
  const currentMap = buildResultMap(report)
  const previousMap = buildResultMap(previousReport)
  const currentResults = report.results || []
  const previousResults = previousReport?.results || []

  const newUrls = Array.from(currentMap.values())
    .filter((result) => !previousMap.has(result.url))
    .map(summarizeResult)

  const removedUrls = Array.from(previousMap.values())
    .filter((result) => !currentMap.has(result.url))
    .map(summarizeResult)

  const statusChanges = Array.from(currentMap.values())
    .map((current) => {
      const previous = previousMap.get(current.url)
      if (!previous || previous.status === current.status) {
        return null
      }

      return {
        ...summarizeResult(current),
        previousStatus: previous.status,
        currentStatus: current.status,
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.domain.localeCompare(b.domain) || a.url.localeCompare(b.url))

  const newHardFailures = currentResults
    .filter((current) => hardFailureStatuses.has(current.status) && !hardFailureStatuses.has(previousMap.get(current.url)?.status))
    .map(summarizeResult)

  const resolvedHardFailures = previousResults
    .filter((previous) => hardFailureStatuses.has(previous.status) && !hardFailureStatuses.has(currentMap.get(previous.url)?.status))
    .map((previous) => ({
      ...summarizeResult(previous),
      previousStatus: previous.status,
      currentStatus: currentMap.get(previous.url)?.status || 'removed',
    }))

  const newRestricted = currentResults
    .filter((current) => current.status === 'restricted' && previousMap.get(current.url)?.status !== 'restricted')
    .map(summarizeResult)

  const resolvedRestricted = previousResults
    .filter((previous) => previous.status === 'restricted' && currentMap.get(previous.url)?.status !== 'restricted')
    .map((previous) => ({
      ...summarizeResult(previous),
      previousStatus: previous.status,
      currentStatus: currentMap.get(previous.url)?.status || 'removed',
    }))

  const newArchived = currentResults
    .filter((current) => current.status === 'archived' && previousMap.get(current.url)?.status !== 'archived')
    .map(summarizeResult)

  const newTransient = currentResults
    .filter((current) => current.status === 'transient' && previousMap.get(current.url)?.status !== 'transient')
    .map(summarizeResult)

  const resolvedTransient = previousResults
    .filter((previous) => previous.status === 'transient' && currentMap.get(previous.url)?.status !== 'transient')
    .map((previous) => ({
      ...summarizeResult(previous),
      previousStatus: previous.status,
      currentStatus: currentMap.get(previous.url)?.status || 'removed',
    }))

  const retryHeavy = currentResults
    .filter((result) => (result.attempts || 0) > 2 || (result.transientErrors?.length || 0) > 0)
    .sort((a, b) => (b.attempts || 0) - (a.attempts || 0) || (b.transientErrors?.length || 0) - (a.transientErrors?.length || 0))
    .slice(0, 40)
    .map(summarizeResult)

  return {
    generatedAt: new Date().toISOString(),
    currentGeneratedAt: report.generatedAt,
    previousGeneratedAt: previousReport?.generatedAt || null,
    summaryDelta: buildSummaryDelta(report.summary, previousReport?.summary),
    totals: {
      newUrls: newUrls.length,
      removedUrls: removedUrls.length,
      statusChanges: statusChanges.length,
      newHardFailures: newHardFailures.length,
      resolvedHardFailures: resolvedHardFailures.length,
      newRestricted: newRestricted.length,
      resolvedRestricted: resolvedRestricted.length,
      newArchived: newArchived.length,
      newTransient: newTransient.length,
      resolvedTransient: resolvedTransient.length,
      retryHeavy: retryHeavy.length,
    },
    newUrls: newUrls.slice(0, 40),
    removedUrls: removedUrls.slice(0, 40),
    statusChanges: statusChanges.slice(0, 60),
    newHardFailures,
    resolvedHardFailures,
    newRestricted: newRestricted.slice(0, 40),
    resolvedRestricted: resolvedRestricted.slice(0, 40),
    newArchived: newArchived.slice(0, 40),
    newTransient: newTransient.slice(0, 40),
    resolvedTransient: resolvedTransient.slice(0, 40),
    retryHeavy,
    domainDeltas: {
      hardFailures: buildDomainDeltas(currentResults, previousResults, (result) => hardFailureStatuses.has(result.status)),
      restricted: buildDomainDeltas(currentResults, previousResults, (result) => result.status === 'restricted'),
      archived: buildDomainDeltas(currentResults, previousResults, (result) => result.status === 'archived'),
      transient: buildDomainDeltas(currentResults, previousResults, (result) => result.status === 'transient'),
    },
  }
}

function formatDelta(delta) {
  if (delta > 0) {
    return `+${delta}`
  }

  return String(delta)
}

function formatTrendItem(item) {
  const status = item.previousStatus && item.currentStatus
    ? `${item.previousStatus} -> ${item.currentStatus}`
    : item.status
  const attempts = item.attempts ? ` | attempts: ${item.attempts}` : ''
  const transient = item.transientErrorCount ? ` | transient errors: ${item.transientErrorCount}` : ''
  const archive = item.archiveUrl ? ` | archive: ${item.archiveUrl}` : ''
  return `- [${status}] ${item.url} | ${item.referenceLabels.join(' ; ')}${attempts}${transient}${archive}`
}

function pushTrendSection(lines, title, items, emptyText, limit = 20) {
  lines.push('', `## ${title}`, '')

  if (!items.length) {
    lines.push(emptyText)
    return
  }

  for (const item of items.slice(0, limit)) {
    lines.push(formatTrendItem(item))
  }
}

function buildMarkdownTrendReport(trend) {
  const lines = [
    '# Source Link Trends',
    '',
    `Generated: ${trend.generatedAt}`,
    `Current report: ${trend.currentGeneratedAt}`,
    `Previous report: ${trend.previousGeneratedAt || 'none'}`,
    '',
    '## Summary Delta',
    '',
  ]

  for (const [key, item] of Object.entries(trend.summaryDelta)) {
    lines.push(`- ${key}: ${item.current} (${formatDelta(item.delta)} from ${item.previous})`)
  }

  lines.push('', '## Movement', '')
  for (const [key, value] of Object.entries(trend.totals)) {
    lines.push(`- ${key}: ${value}`)
  }

  pushTrendSection(lines, 'New Hard Failures', trend.newHardFailures, 'No new hard failures.')
  pushTrendSection(lines, 'Resolved Hard Failures', trend.resolvedHardFailures, 'No resolved hard failures.')
  pushTrendSection(lines, 'New Restricted / Bot-Blocked URLs', trend.newRestricted, 'No new restricted URLs.')
  pushTrendSection(lines, 'Archive-Backed Recoveries', trend.newArchived, 'No new archive-backed recoveries.')
  pushTrendSection(lines, 'New Transient / Retry-Limited URLs', trend.newTransient, 'No new transient URLs.')
  pushTrendSection(lines, 'Resolved Transient URLs', trend.resolvedTransient, 'No resolved transient URLs.')
  pushTrendSection(lines, 'Retry-Heavy URLs', trend.retryHeavy, 'No retry-heavy URLs.')
  pushTrendSection(lines, 'Status Changes', trend.statusChanges, 'No status changes.', 30)

  lines.push('', '## Restricted Domain Delta', '')
  if (!trend.domainDeltas.restricted.length) {
    lines.push('No restricted-domain delta.')
  } else {
    for (const item of trend.domainDeltas.restricted) {
      lines.push(`- ${item.domain}: ${item.current} (${formatDelta(item.delta)} from ${item.previous})`)
    }
  }

  lines.push('', '## Hard-Failure Domain Delta', '')
  if (!trend.domainDeltas.hardFailures.length) {
    lines.push('No hard-failure domain delta.')
  } else {
    for (const item of trend.domainDeltas.hardFailures) {
      lines.push(`- ${item.domain}: ${item.current} (${formatDelta(item.delta)} from ${item.previous})`)
    }
  }

  lines.push('', '## Transient Domain Delta', '')
  if (!trend.domainDeltas.transient.length) {
    lines.push('No transient-domain delta.')
  } else {
    for (const item of trend.domainDeltas.transient) {
      lines.push(`- ${item.domain}: ${item.current} (${formatDelta(item.delta)} from ${item.previous})`)
    }
  }

  pushTrendSection(lines, 'New URLs', trend.newUrls, 'No new URLs.', 20)
  pushTrendSection(lines, 'Removed URLs', trend.removedUrls, 'No removed URLs.', 20)

  return `${lines.join('\n')}\n`
}

function buildMarkdownReport(report) {
  const lines = [
    '# Source Link Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Summary',
    '',
    `- References scanned: ${report.summary.referenceCount}`,
    `- Unique URLs: ${report.summary.uniqueUrlCount}`,
    `- OK: ${report.summary.ok}`,
    `- Redirected: ${report.summary.redirect}`,
    `- Restricted: ${report.summary.restricted}`,
    `- Transient / retry-limited: ${report.summary.transient}`,
    `- Missing: ${report.summary.missing}`,
    `- Failed: ${report.summary.failed}`,
    `- Invalid: ${report.summary.invalid}`,
    `- Archive fallbacks found: ${report.summary.archived}`,
  ]

  if (report.topFailingDomains.length > 0) {
    lines.push('', '## Top Failing Domains', '')
    for (const item of report.topFailingDomains) {
      lines.push(`- ${item.domain}: ${item.count}`)
    }
  }

  const actionableFailures = report.results.filter((result) => ['missing', 'failed', 'error', 'invalid'].includes(result.status))
  if (actionableFailures.length > 0) {
    lines.push('', '## Actionable Failures', '')
    for (const result of actionableFailures.slice(0, 40)) {
      const archiveSuffix = result.archive?.url ? ` | archive: ${result.archive.url}` : ''
      lines.push(`- [${result.status.toUpperCase()}] ${result.url} | ${result.referenceLabels.join(' ; ')} | ${result.referenceFiles.join(', ')}${archiveSuffix}`)
    }
  }

  const archivedResults = report.results.filter((result) => result.status === 'archived')
  if (archivedResults.length > 0) {
    lines.push('', '## Archive-Backed Fallbacks', '')
    for (const result of archivedResults.slice(0, 20)) {
      lines.push(`- ${result.url} | live check: ${result.probeStatus || 'error'} | archive: ${result.archive.url} | ${result.referenceLabels.join(' ; ')}`)
    }
  }

  const restrictedResults = report.results.filter((result) => result.status === 'restricted')
  if (restrictedResults.length > 0) {
    lines.push('', '## Restricted / Bot-Blocked', '')
    for (const result of restrictedResults.slice(0, 20)) {
      lines.push(`- ${result.url} | HTTP ${result.httpStatus ?? 'n/a'} | ${result.referenceLabels.join(' ; ')}`)
    }
  }

  const transientResults = report.results.filter((result) => result.status === 'transient')
  if (transientResults.length > 0) {
    lines.push('', '## Transient / Retry-Limited', '')
    for (const result of transientResults.slice(0, 20)) {
      lines.push(`- ${result.url} | attempts: ${result.attempts || 0} | transient errors: ${result.transientErrors?.length || 0} | ${result.referenceLabels.join(' ; ')}`)
    }
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  ensureDir(stateDir)
  const previousReport = readJsonIfExists(reportJsonPath)

  const rawReferences = [
    ...candidateFiles.flatMap((filePath) => extractReferencesFromFile(filePath)),
    ...staticReferenceFiles.flatMap((filePath) => extractReferencesFromStaticFile(filePath)),
  ]

  const grouped = new Map()
  for (const reference of rawReferences) {
    const groupKey = reference.normalizedUrl || `invalid:${reference.rawUrl}`
    const existing = grouped.get(groupKey)

    if (existing) {
      existing.references.push(reference)
      continue
    }

    grouped.set(groupKey, {
      url: reference.normalizedUrl || reference.rawUrl,
      normalizedUrl: reference.normalizedUrl,
      domain: reference.normalizedUrl ? getDomain(reference.normalizedUrl) : 'invalid-url',
      references: [reference],
    })
  }

  const groupedReferences = Array.from(grouped.values())

  const results = await mapWithConcurrency(groupedReferences, async (item) => {
    if (!item.normalizedUrl) {
      return {
        url: item.url,
        domain: item.domain,
        status: 'invalid',
        httpStatus: null,
        finalUrl: item.url,
        redirected: false,
        checkedWith: 'none',
        attempts: 0,
        transientErrors: [],
        archive: null,
        referenceCount: item.references.length,
        referenceLabels: item.references.map((reference) => reference.label),
        referenceFiles: [...new Set(item.references.map((reference) => reference.file))],
      }
    }

    const probe = await probeUrl(item.normalizedUrl)
    const needsArchive = ['missing', 'failed', 'error'].includes(probe.status)
    const archive = needsArchive ? await getArchiveSnapshot(item.normalizedUrl) : null
    const verifierRestrictedError = probe.status === 'error' && isKnownVerifierRestrictedHost(item.normalizedUrl)
    const retryLimitedTransient = probe.status === 'error' && (probe.transientErrors?.length || 0) > 0 && !probe.httpStatus
    const recoveredByArchive = needsArchive && archive?.available

    return {
      url: item.normalizedUrl,
      domain: item.domain,
      status: verifierRestrictedError ? 'restricted' : recoveredByArchive ? 'archived' : retryLimitedTransient ? 'transient' : probe.status,
      probeStatus: probe.status,
      httpStatus: probe.httpStatus,
      finalUrl: probe.finalUrl,
      redirected: probe.redirected,
      checkedWith: probe.checkedWith,
      attempts: probe.attempts || 0,
      transientErrors: probe.transientErrors || [],
      error: probe.error || null,
      archive,
      referenceCount: item.references.length,
      referenceLabels: item.references.map((reference) => reference.label),
      referenceFiles: [...new Set(item.references.map((reference) => reference.file))],
    }
  }, concurrency)

  const summary = {
    referenceCount: rawReferences.length,
    uniqueUrlCount: groupedReferences.length,
    ok: results.filter((item) => item.status === 'ok').length,
    redirect: results.filter((item) => item.status === 'redirect').length,
    restricted: results.filter((item) => item.status === 'restricted').length,
    transient: results.filter((item) => item.status === 'transient').length,
    missing: results.filter((item) => item.status === 'missing').length,
    failed: results.filter((item) => item.status === 'failed' || item.status === 'error').length,
    invalid: results.filter((item) => item.status === 'invalid').length,
    archived: results.filter((item) => item.status === 'archived').length,
  }

  const topFailingDomains = summarizeByDomain(results.filter((item) => ['missing', 'failed', 'error', 'invalid'].includes(item.status)))

  const report = {
    generatedAt: new Date().toISOString(),
    timeoutMs,
    concurrency,
    strictMode,
    summary,
    topFailingDomains,
    results: results.sort((a, b) => a.status.localeCompare(b.status) || a.url.localeCompare(b.url)),
  }

  fs.writeFileSync(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(reportMdPath, buildMarkdownReport(report))
  const trendReport = buildTrendReport(report, previousReport)
  fs.writeFileSync(trendJsonPath, `${JSON.stringify(trendReport, null, 2)}\n`)
  fs.writeFileSync(trendMdPath, buildMarkdownTrendReport(trendReport))

  const hardFailures = summary.invalid + summary.missing + summary.failed
  if (hardFailures > 0) {
    console.log(`[verify:sources] completed with ${hardFailures} actionable issues. Report: ${path.relative(repoRoot, reportMdPath)}`)
  } else {
    console.log(`[verify:sources] PASS ${summary.uniqueUrlCount} unique URLs checked. Report: ${path.relative(repoRoot, reportMdPath)}`)
  }

  if (strictMode && hardFailures > 0) {
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('[verify:sources] FAIL', error)
  process.exit(1)
})
