#!/usr/bin/env node
/**
 * Live security-header regression guard for the public origin.
 * Asserts OWASP baseline headers and Veritas release identity headers.
 */
const baseUrl = (process.env.PLATFORM_VERIFY_BASE_URL || process.env.SECURITY_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(/\/$/, '')

const REQUIRED = {
  'x-frame-options': /^(SAMEORIGIN|DENY)$/i,
  'x-content-type-options': /^nosniff$/i,
  'referrer-policy': /strict-origin-when-cross-origin/i,
  'strict-transport-security': /max-age=\d+/i,
  'permissions-policy': /camera=\(\)/i,
  'x-xss-protection': /1/,
}

function assert(c, m) {
  if (!c) {
    console.error(`[verify:security-headers] FAIL — ${m}`)
    process.exit(1)
  }
}

const response = await fetch(`${baseUrl}/`, {
  method: 'GET',
  redirect: 'manual',
  signal: AbortSignal.timeout(20_000),
})

assert(response.status === 200 || response.status === 301 || response.status === 302, `home status ${response.status}`)

for (const [name, pattern] of Object.entries(REQUIRED)) {
  const value = response.headers.get(name)
  assert(value, `missing ${name}`)
  assert(pattern.test(value), `${name} unexpected: ${value}`)
}

const commit = response.headers.get('x-veritas-commit')
assert(commit && commit.length >= 7, `missing or short x-veritas-commit: ${commit}`)

const version = response.headers.get('x-veritas-version')
assert(version, 'missing x-veritas-version')

// API health should also carry security headers
const health = await fetch(`${baseUrl}/api/health`, {
  signal: AbortSignal.timeout(15_000),
})
assert(health.ok, `health status ${health.status}`)
assert(health.headers.get('x-content-type-options') === 'nosniff', 'health nosniff')
assert(/max-age=/.test(health.headers.get('strict-transport-security') || ''), 'health HSTS')

console.log(
  `[verify:security-headers] PASS — ${Object.keys(REQUIRED).length} baseline headers + release commit ${commit}`,
)
