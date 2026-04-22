#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import ts from 'typescript'

const repoRoot = process.cwd()
const stateDir = path.join(repoRoot, '.claude-state')
const reportJsonPath = path.join(stateDir, 'source-link-report.json')
const reportMdPath = path.join(stateDir, 'source-link-report.md')

const timeoutMs = Number.parseInt(process.env.SOURCE_LINK_TIMEOUT_MS || '12000', 10)
const concurrency = Number.parseInt(process.env.SOURCE_LINK_CONCURRENCY || '12', 10)
const strictMode = process.env.SOURCE_LINK_STRICT === '1'
const userAgent = process.env.SOURCE_LINK_USER_AGENT || 'Mozilla/5.0 (compatible; VeritasSourceLinkChecker/1.0; +https://veritasworldwide.com)'
const retryCount = Number.parseInt(process.env.SOURCE_LINK_RETRIES || '1', 10)

const candidateFiles = [
  ...fs.readdirSync(path.join(repoRoot, 'src', 'data', 'chapters'))
    .filter((fileName) => fileName.endsWith('.ts'))
    .map((fileName) => path.join(repoRoot, 'src', 'data', 'chapters', fileName)),
  path.join(repoRoot, 'src', 'data', 'articles.ts'),
  path.join(repoRoot, 'src', 'data', 'articlesExpanded.ts'),
  path.join(repoRoot, 'src', 'data', 'israelDossierExpanded.ts'),
  path.join(repoRoot, 'src', 'data', 'profileData.ts'),
]

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

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    try {
      return await fetchOnceWithTimeout(url, options)
    } catch (error) {
      lastError = error
      if (attempt >= retryCount || !isTransientFetchError(error)) {
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

function classifyHttpStatus(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return 'ok'
  }

  if (statusCode >= 300 && statusCode < 400) {
    return 'redirect'
  }

  if ([401, 403, 429].includes(statusCode)) {
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

  for (const attempt of attempts) {
    try {
      const response = await fetchWithTimeout(url, { method: attempt.method })
      const classification = classifyHttpStatus(response.status)

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
      }

      if (classification === 'redirect' && result.finalUrl === url) {
        result.status = 'ok'
      }

      await response.body?.cancel().catch(() => {})
      return result
    } catch (error) {
      lastError = error
    }
  }

  return {
    status: 'error',
    httpStatus: null,
    finalUrl: url,
    redirected: false,
    checkedWith: 'GET',
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

  const restrictedResults = report.results.filter((result) => result.status === 'restricted')
  if (restrictedResults.length > 0) {
    lines.push('', '## Restricted / Bot-Blocked', '')
    for (const result of restrictedResults.slice(0, 20)) {
      lines.push(`- ${result.url} | HTTP ${result.httpStatus ?? 'n/a'} | ${result.referenceLabels.join(' ; ')}`)
    }
  }

  return `${lines.join('\n')}\n`
}

async function main() {
  ensureDir(stateDir)

  const rawReferences = candidateFiles.flatMap((filePath) => extractReferencesFromFile(filePath))

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
        archive: null,
        referenceCount: item.references.length,
        referenceLabels: item.references.map((reference) => reference.label),
        referenceFiles: [...new Set(item.references.map((reference) => reference.file))],
      }
    }

    const probe = await probeUrl(item.normalizedUrl)
    const needsArchive = ['missing', 'failed', 'error'].includes(probe.status)
    const archive = needsArchive ? await getArchiveSnapshot(item.normalizedUrl) : null

    return {
      url: item.normalizedUrl,
      domain: item.domain,
      status: probe.status,
      httpStatus: probe.httpStatus,
      finalUrl: probe.finalUrl,
      redirected: probe.redirected,
      checkedWith: probe.checkedWith,
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
    missing: results.filter((item) => item.status === 'missing').length,
    failed: results.filter((item) => item.status === 'failed' || item.status === 'error').length,
    invalid: results.filter((item) => item.status === 'invalid').length,
    archived: results.filter((item) => item.archive?.available).length,
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
