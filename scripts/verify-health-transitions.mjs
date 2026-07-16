#!/usr/bin/env node
/**
 * Pure-function checks for health-history commit transition derivation,
 * force-sample gating, and multi-replica sample merge behavior.
 */

function deriveCommitTransitions(samples) {
  const commitTransitions = []
  for (let i = 1; i < samples.length; i += 1) {
    const prev = samples[i - 1]
    const curr = samples[i]
    if (prev?.commitShort && curr?.commitShort && prev.commitShort !== curr.commitShort) {
      commitTransitions.push({
        from: prev.commitShort,
        to: curr.commitShort,
        at: curr.checkedAt || '',
        status: curr.status || '',
      })
    }
  }
  return commitTransitions
}

function uniqueCommits(samples) {
  return [...new Set(samples.map((sample) => sample?.commitShort).filter(Boolean))]
}

function shouldForceSample(last, sample) {
  const commitChanged =
    Boolean(last?.commitShort) &&
    Boolean(sample?.commitShort) &&
    last.commitShort !== sample.commitShort
  const statusChanged = Boolean(last?.status) && Boolean(sample?.status) && last.status !== sample.status
  const hasFailures = Number(sample?.failedCount || 0) > 0
  return commitChanged || statusChanged || hasFailures
}

function healthHistorySampleKey(sample) {
  return [
    sample.checkedAt,
    sample.commitShort || '',
    sample.status || '',
    String(sample.failedCount ?? 0),
    String(sample.prerenderedRouteCount ?? 0),
  ].join('|')
}

function mergeHealthHistorySamples(...lists) {
  const map = new Map()
  for (const list of lists) {
    const samples = Array.isArray(list) ? list : list?.samples || []
    for (const sample of samples) {
      if (!sample?.checkedAt) continue
      map.set(healthHistorySampleKey(sample), sample)
    }
  }
  return [...map.values()]
    .sort((a, b) => Date.parse(a.checkedAt) - Date.parse(b.checkedAt))
}

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:health-transitions] FAIL — ${message}`)
    process.exit(1)
  }
}

const samples = [
  { commitShort: 'aaa111', status: 'ok', checkedAt: '2026-07-16T01:00:00.000Z', failedCount: 0 },
  { commitShort: 'aaa111', status: 'ok', checkedAt: '2026-07-16T01:15:00.000Z', failedCount: 0 },
  { commitShort: 'bbb222', status: 'ok', checkedAt: '2026-07-16T01:16:00.000Z', failedCount: 0 },
  { commitShort: 'bbb222', status: 'degraded', checkedAt: '2026-07-16T01:30:00.000Z', failedCount: 1 },
  { commitShort: 'ccc333', status: 'ok', checkedAt: '2026-07-16T01:31:00.000Z', failedCount: 0 },
]

const transitions = deriveCommitTransitions(samples)
assert(transitions.length === 2, `expected 2 transitions, got ${transitions.length}`)
assert(transitions[0].from === 'aaa111' && transitions[0].to === 'bbb222', 'first transition wrong')
assert(transitions[1].from === 'bbb222' && transitions[1].to === 'ccc333', 'second transition wrong')

const commits = uniqueCommits(samples)
assert(commits.join(',') === 'aaa111,bbb222,ccc333', `unique commits wrong: ${commits.join(',')}`)

assert(!shouldForceSample(samples[0], samples[1]), 'same commit/status should not force')
assert(shouldForceSample(samples[1], samples[2]), 'commit change should force')
assert(shouldForceSample(samples[2], samples[3]), 'status/failure should force')
assert(shouldForceSample(samples[3], samples[4]), 'commit change after failure should force')

// Multi-replica merge: two replicas report overlapping windows; keys de-dupe.
const replicaA = [
  { checkedAt: '2026-07-16T02:00:00.000Z', commitShort: 'ddd444', status: 'ok', failedCount: 0, prerenderedRouteCount: 289 },
  { checkedAt: '2026-07-16T02:15:00.000Z', commitShort: 'ddd444', status: 'ok', failedCount: 0, prerenderedRouteCount: 289 },
]
const replicaB = [
  { checkedAt: '2026-07-16T02:15:00.000Z', commitShort: 'ddd444', status: 'ok', failedCount: 0, prerenderedRouteCount: 289 },
  { checkedAt: '2026-07-16T02:16:00.000Z', commitShort: 'eee555', status: 'ok', failedCount: 0, prerenderedRouteCount: 290 },
]
const merged = mergeHealthHistorySamples(replicaA, replicaB)
assert(merged.length === 3, `expected 3 merged samples, got ${merged.length}`)
assert(merged[2].commitShort === 'eee555', 'merged order should keep deploy transition last')
assert(
  deriveCommitTransitions(merged).length === 1 && deriveCommitTransitions(merged)[0].to === 'eee555',
  'merged history should expose the deploy transition'
)

// Storage label contract used by /api/health/history
function getHealthHistoryStorageLabel({ hasDb, hasDataDir }) {
  if (hasDb) return 'shared-database'
  if (hasDataDir) return 'configured-data-dir'
  return 'replica-local-data-dir'
}
assert(getHealthHistoryStorageLabel({ hasDb: true, hasDataDir: false }) === 'shared-database', 'db storage label')
assert(getHealthHistoryStorageLabel({ hasDb: false, hasDataDir: true }) === 'configured-data-dir', 'volume storage label')
assert(getHealthHistoryStorageLabel({ hasDb: false, hasDataDir: false }) === 'replica-local-data-dir', 'local storage label')

function parseSentryDsn(dsn) {
  if (!dsn || typeof dsn !== 'string') return null
  try {
    const url = new URL(dsn)
    const publicKey = url.username
    const projectId = url.pathname.replace(/^\//, '').split('/')[0]
    if (!publicKey || !projectId) return null
    return {
      publicKey,
      projectId,
      storeUrl: `${url.protocol}//${url.host}/api/${projectId}/store/`,
    }
  } catch {
    return null
  }
}

const sentryOk = parseSentryDsn('https://abc123@o999.ingest.sentry.io/12345')
assert(sentryOk && sentryOk.publicKey === 'abc123' && sentryOk.projectId === '12345', 'sentry dsn parse publicKey/project')
assert(
  sentryOk.storeUrl === 'https://o999.ingest.sentry.io/api/12345/store/',
  `sentry store url wrong: ${sentryOk.storeUrl}`
)
assert(parseSentryDsn('') === null, 'empty sentry dsn should be null')
assert(parseSentryDsn('not-a-url') === null, 'invalid sentry dsn should be null')
assert(parseSentryDsn('https://@host/1') === null, 'missing key sentry dsn should be null')

console.log('[verify:health-transitions] PASS')
