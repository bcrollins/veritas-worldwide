#!/usr/bin/env node
/**
 * Pure source-level security invariants for server.js.
 * Complements live header probes with compile-time guarantees.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const server = readFileSync(join(root, 'server.js'), 'utf8')
const serverAuth = readFileSync(join(root, 'server-auth.js'), 'utf8')

function assert(c, m) {
  if (!c) {
    console.error(`[verify:server-security-invariants] FAIL — ${m}`)
    process.exit(1)
  }
}

assert(server.includes("app.disable('x-powered-by')"), 'x-powered-by must be disabled')
assert(server.includes("X-Frame-Options"), 'X-Frame-Options set')
assert(server.includes('X-Content-Type-Options'), 'X-Content-Type-Options set')
assert(server.includes('Strict-Transport-Security'), 'HSTS set')
assert(server.includes('Permissions-Policy'), 'Permissions-Policy set')
assert(server.includes('payment=()'), 'Permissions-Policy disables payment')
assert(server.includes('usb=()'), 'Permissions-Policy disables usb')
assert(server.includes('interest-cohort=()'), 'Permissions-Policy disables FLoC')
assert(server.includes('Referrer-Policy'), 'Referrer-Policy set')
assert(server.includes('strict-origin-when-cross-origin'), 'Referrer-Policy value locked')
assert(server.includes('X-XSS-Protection'), 'X-XSS-Protection set')
assert(server.includes('X-Permitted-Cross-Domain-Policies'), 'X-Permitted-Cross-Domain-Policies set')
assert(server.includes('Cross-Origin-Opener-Policy'), 'Cross-Origin-Opener-Policy set')
assert(server.includes('same-origin-allow-popups'), 'COOP allows intentional share popups')
assert(server.includes('Origin-Agent-Cluster'), 'Origin-Agent-Cluster set')
assert(server.includes("'Origin-Agent-Cluster', '?1'") || server.includes('Origin-Agent-Cluster\', \'?1\''), 'Origin-Agent-Cluster value ?1')
assert(
  server.includes("/api/user/change-password") && server.includes('rateLimit'),
  'change-password must be rate-limited',
)
assert(server.includes("app.use('/api/user/change-password', rateLimit"), 'change-password rateLimit middleware registered')
assert(server.includes("app.use('/api/user/bookmarks', rateLimit"), 'bookmarks rateLimit middleware registered')
assert(server.includes("app.use('/api/user/progress', rateLimit"), 'progress rateLimit middleware registered')
assert(server.includes("app.use('/api/user/preferences', rateLimit"), 'preferences rateLimit middleware registered')
assert(server.includes("app.use('/api/user/profile', rateLimit"), 'profile rateLimit middleware registered')
assert(server.includes("app.use('/api/analytics/pageview', rateLimit"), 'pageview rateLimit middleware registered')
assert(server.includes("app.use('/api/analytics/snapshot', rateLimit"), 'analytics snapshot rateLimit registered')
assert(server.includes("app.use('/api/health/history', rateLimit"), 'health/history rateLimit registered')
assert(server.includes("app.use('/api/build-info', rateLimit"), 'build-info rateLimit registered')
assert(server.includes("app.use('/api/auth/logout', rateLimit"), 'logout rateLimit middleware registered')
assert(server.includes("app.use('/api/search', rateLimit"), 'search rateLimit middleware registered')
assert(server.includes("app.use('/api/chapters', rateLimit"), 'chapters rateLimit middleware registered')
assert(server.includes("app.use('/api/auth/me', rateLimit"), 'auth/me rateLimit middleware registered')
assert(server.includes("app.use('/api/auth/status', rateLimit"), 'auth/status rateLimit middleware registered')
assert(server.includes("app.use('/api/downloads', rateLimit"), 'downloads rateLimit middleware registered')
assert(server.includes("app.use('/the-record.pdf', rateLimit"), 'the-record.pdf rateLimit middleware registered')
assert(
  server.includes("app.use('/veritas-institute-field-manual.pdf', rateLimit"),
  'field-manual.pdf rateLimit middleware registered',
)
assert(
  server.includes("app.get(['/.well-known/security.txt', '/security.txt']") ||
    server.includes('/.well-known/security.txt'),
  'security.txt routes must be registered on the Express app',
)
assert(server.includes('SECURITY_TXT_FALLBACK') && server.includes('loadSecurityTxtBody'), 'security.txt in-process fallback present')
assert(server.includes('privacy@veritasworldwide.com'), 'security.txt contact embedded for production fallback')

// Change-password validation mirrors register/login max length floor
assert(serverAuth.includes('change-password'), 'change-password route present in server-auth')
assert(serverAuth.includes('newPassword.length > 128'), 'change-password rejects overlong new passwords')
assert(serverAuth.includes('currentPassword.length > 128'), 'change-password rejects overlong current passwords')

// Rate-limit fleet floor — protect against accidental deletion of middleware rows
const rateLimitUses = (server.match(/app\.use\([^,]+,\s*rateLimit/g) || []).length
assert(rateLimitUses >= 20, `rateLimit middleware count ${rateLimitUses} below floor 20`)

console.log(
  `[verify:server-security-invariants] PASS — server.js security surface locked · rateLimit×${rateLimitUses}`,
)
