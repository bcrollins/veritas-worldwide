import assert from 'node:assert/strict'

import { createDatabasePoolConfig, sanitizeDatabaseUrl } from '../db/pg-config.js'

const sampleUrl =
  'postgresql://user:pass@example.neon.tech/neondb?sslmode=require&application_name=veritas&sslrootcert=%2Ftmp%2Froot.pem'

const sanitizedUrl = sanitizeDatabaseUrl(sampleUrl)
const parsedSanitizedUrl = new URL(sanitizedUrl)

assert.equal(parsedSanitizedUrl.searchParams.get('sslmode'), null, 'sslmode should be removed')
assert.equal(parsedSanitizedUrl.searchParams.get('sslrootcert'), null, 'sslrootcert should be removed')
assert.equal(
  parsedSanitizedUrl.searchParams.get('application_name'),
  'veritas',
  'non-SSL query params should be preserved'
)

const poolConfig = createDatabasePoolConfig(sampleUrl, {
  max: 10,
  idleTimeoutMillis: 30000,
})

assert.equal(poolConfig.connectionString, sanitizedUrl, 'pool config should use the sanitized URL')
assert.deepEqual(poolConfig.ssl, { rejectUnauthorized: false }, 'SSL config should remain explicit')
assert.equal(poolConfig.max, 10, 'pool overrides should be preserved')
assert.equal(poolConfig.idleTimeoutMillis, 30000, 'pool overrides should be preserved')

const unchangedUrl = 'postgresql://user:pass@example.neon.tech/neondb?application_name=veritas'
assert.equal(
  sanitizeDatabaseUrl(unchangedUrl),
  unchangedUrl,
  'URLs without SSL query params should remain unchanged'
)

console.log('[verify:db-config] PASS — DATABASE_URL sanitization removes SSL query params and preserves pool options')
