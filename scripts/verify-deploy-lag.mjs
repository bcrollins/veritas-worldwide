#!/usr/bin/env node
/**
 * Compare live /api/health commit to local origin/main tip.
 * WARN by default; set DEPLOY_LAG_HARD=1 to fail when lag > DEPLOY_LAG_MAX_COMMITS (default 15).
 * Entity-only — no personal identity in output.
 */
import { execSync } from 'node:child_process'

const base = (process.env.PLATFORM_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(/\/$/, '')
const hard = process.env.DEPLOY_LAG_HARD === '1'
const maxLag = Number(process.env.DEPLOY_LAG_MAX_COMMITS || 15)

let liveCommit = ''
try {
  const res = await fetch(`${base}/api/health`, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const j = await res.json()
  liveCommit = String(j.commitShort || j.commit || '').replace(/[^0-9a-f]/gi, '').slice(0, 12)
} catch (err) {
  console.warn('[verify:deploy-lag] WARN cannot fetch live health:', err?.message || err)
  process.exit(0)
}

let tip = ''
try {
  tip = execSync('git rev-parse --short=12 origin/main', { encoding: 'utf8' }).trim()
} catch {
  try {
    tip = execSync('git rev-parse --short=12 HEAD', { encoding: 'utf8' }).trim()
  } catch (err) {
    console.warn('[verify:deploy-lag] WARN cannot read git tip:', err?.message || err)
    process.exit(0)
  }
}

if (!liveCommit) {
  console.warn('[verify:deploy-lag] WARN empty live commit')
  process.exit(0)
}

let lag = 0
let ancestry = 'unknown'
try {
  const count = execSync(`git rev-list --count ${liveCommit}..${tip}`, { encoding: 'utf8' }).trim()
  lag = Number(count) || 0
  ancestry = 'ok'
} catch {
  ancestry = 'commits-not-in-local-history'
}

const msg = `[verify:deploy-lag] live=${liveCommit} tip=${tip} lag=${lag} ancestry=${ancestry} base=${base}`
if (ancestry === 'ok' && lag > maxLag) {
  if (hard) {
    console.error(`${msg} FAIL (max ${maxLag})`)
    process.exit(1)
  }
  console.warn(`${msg} WARN exceeds max ${maxLag}`)
  process.exit(0)
}
console.log(`${msg} PASS`)
