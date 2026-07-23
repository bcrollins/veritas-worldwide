#!/usr/bin/env node
/**
 * Forward-looking entity git author gate.
 * Soft by default (WARN): last N commits should use Veritas Worldwide / rights@.
 * Set GIT_AUTHOR_FORWARD_HARD=1 to fail pure on non-entity authors.
 * Full history rewrite remains an offline OPSEC project (not this script).
 */
import { execSync } from 'node:child_process'

const n = Number(process.env.GIT_AUTHOR_FORWARD_COMMITS || 20)
const hard = process.env.GIT_AUTHOR_FORWARD_HARD === '1'
const allowedName = /veritas\s+worldwide/i
const allowedEmail = /rights@veritasworldwide\.com/i

let log
try {
  log = execSync(`git log -n ${n} --format=%H%x09%an%x09%ae`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
} catch (err) {
  console.warn('[verify:git-author-forward] WARN cannot read git log:', err?.message || err)
  process.exit(0)
}

if (!log) {
  console.log('[verify:git-author-forward] PASS — no commits')
  process.exit(0)
}

const bad = []
for (const line of log.split('\n')) {
  const [hash, name, email] = line.split('\t')
  if (!allowedName.test(name || '') || !allowedEmail.test(email || '')) {
    bad.push(`${hash?.slice(0, 8)} ${name} <${email}>`)
  }
}

if (bad.length) {
  const msg = `[verify:git-author-forward] ${hard ? 'FAIL' : 'WARN'} ${bad.length}/${n} recent commit(s) not entity-authored:\n - ${bad.join('\n - ')}`
  if (hard) {
    console.error(msg)
    process.exit(1)
  }
  console.warn(msg)
  console.warn('[verify:git-author-forward] soft mode — set GIT_AUTHOR_FORWARD_HARD=1 to enforce')
  process.exit(0)
}

console.log(`[verify:git-author-forward] PASS — last ${n} commits entity-authored (Veritas Worldwide <rights@…>)`)
