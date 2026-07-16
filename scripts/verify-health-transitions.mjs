#!/usr/bin/env node
/**
 * Pure-function checks for health-history commit transition derivation.
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

console.log('[verify:health-transitions] PASS')
