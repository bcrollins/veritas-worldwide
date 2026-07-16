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
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))

function assert(c, m) {
  if (!c) {
    console.error(`[verify:server-security-invariants] FAIL — ${m}`)
    process.exit(1)
  }
}

assert(server.includes("app.disable('x-powered-by')"), 'x-powered-by must be disabled')
assert(server.includes("app.set('trust proxy', 1)") || server.includes('app.set("trust proxy", 1)'), 'trust proxy must be enabled for Railway')
assert(server.includes('function getClientIP'), 'getClientIP helper present')
assert(server.includes('req.ip'), 'getClientIP must prefer Express req.ip under trust proxy')
assert(server.includes('ALLOWED_ORIGINS'), 'CORS allowlist present')
assert(server.includes('https://veritasworldwide.com'), 'CORS allowlist includes production origin')
assert(server.includes('https://www.veritasworldwide.com'), 'CORS allowlist includes www origin')
assert(!/Access-Control-Allow-Origin['"]?\s*,\s*['"]?\*/.test(server), 'must not use CORS wildcard *')
assert(
  server.includes("express.json({ limit: '64kb' })") || server.includes('express.json({ limit: "64kb" })'),
  'global JSON body limit must be 64kb',
)
assert(
  server.includes("express.json({ limit: '16kb' })") || server.includes('express.json({ limit: "16kb" })'),
  'client-error JSON body limit must be 16kb',
)
assert(server.includes("X-Frame-Options"), 'X-Frame-Options set')
assert(
  server.includes("'X-Frame-Options', 'SAMEORIGIN'") ||
    server.includes('"X-Frame-Options", "SAMEORIGIN"'),
  'X-Frame-Options must be SAMEORIGIN exactly',
)
assert(server.includes('X-Content-Type-Options'), 'X-Content-Type-Options set')
assert(
  server.includes("'X-Content-Type-Options', 'nosniff'") ||
    server.includes('"X-Content-Type-Options", "nosniff"'),
  'X-Content-Type-Options must be nosniff exactly',
)
assert(server.includes('Strict-Transport-Security'), 'HSTS set')
assert(server.includes('includeSubDomains; preload') || server.includes('preload'), 'HSTS includes preload directive')
assert(
  server.includes("max-age=31536000; includeSubDomains; preload") ||
    server.includes('max-age=31536000; includeSubDomains; preload'),
  'HSTS must use 1y max-age + includeSubDomains + preload',
)
assert(server.includes('Permissions-Policy'), 'Permissions-Policy set')
assert(server.includes('payment=()'), 'Permissions-Policy disables payment')
assert(server.includes('usb=()'), 'Permissions-Policy disables usb')
assert(server.includes('interest-cohort=()'), 'Permissions-Policy disables FLoC')
assert(server.includes('display-capture=()'), 'Permissions-Policy disables display-capture')
assert(server.includes('accelerometer=()'), 'Permissions-Policy disables accelerometer')
assert(server.includes('gyroscope=()'), 'Permissions-Policy disables gyroscope')
assert(server.includes('magnetometer=()'), 'Permissions-Policy disables magnetometer')
assert(server.includes('camera=()'), 'Permissions-Policy disables camera')
assert(server.includes('microphone=()'), 'Permissions-Policy disables microphone')
assert(server.includes('geolocation=()'), 'Permissions-Policy disables geolocation')
assert(server.includes('clipboard-write=(self)'), 'Permissions-Policy allows same-origin clipboard write only')
assert(!server.includes('clipboard-write=()'), 'must not fully deny clipboard-write (breaks copy CTAs)')
assert(server.includes('browsing-topics=()'), 'Permissions-Policy disables Topics API profiling')
// HTTP CSP: frame-ancestors is meta-ignored; upgrade-insecure-requests hardens mixed content.
assert(server.includes('Content-Security-Policy'), 'Content-Security-Policy HTTP header set')
assert(
  server.includes("frame-ancestors 'self'") || server.includes('frame-ancestors "self"'),
  "HTTP CSP must set frame-ancestors 'self'",
)
assert(server.includes('upgrade-insecure-requests'), 'HTTP CSP must upgrade-insecure-requests')
assert(
  server.includes("'Content-Security-Policy'") || server.includes('"Content-Security-Policy"'),
  'Content-Security-Policy header name locked',
)
// Meta CSP must carry worker/manifest/media + upgrade-insecure-requests (detailed allowlist).
const indexHtml = readFileSync(join(root, 'index.html'), 'utf8')
assert(/http-equiv=["']Content-Security-Policy["']/i.test(indexHtml), 'index.html CSP meta present')
assert(/worker-src\s+'self'/.test(indexHtml), "meta CSP worker-src 'self'")
assert(/manifest-src\s+'self'/.test(indexHtml), "meta CSP manifest-src 'self'")
assert(/media-src[^;]*'self'/.test(indexHtml), "meta CSP media-src includes 'self'")
assert(/upgrade-insecure-requests/.test(indexHtml), 'meta CSP upgrade-insecure-requests')
assert(server.includes('Referrer-Policy'), 'Referrer-Policy set')
assert(server.includes('strict-origin-when-cross-origin'), 'Referrer-Policy value locked')
assert(
  server.includes("'Referrer-Policy', 'strict-origin-when-cross-origin'") ||
    server.includes('"Referrer-Policy", "strict-origin-when-cross-origin"'),
  'Referrer-Policy must be strict-origin-when-cross-origin exactly',
)
assert(server.includes('X-XSS-Protection'), 'X-XSS-Protection set')
assert(
  server.includes("'X-XSS-Protection', '1; mode=block'") ||
    server.includes('"X-XSS-Protection", "1; mode=block"'),
  'X-XSS-Protection must be 1; mode=block exactly',
)
assert(server.includes('X-Permitted-Cross-Domain-Policies'), 'X-Permitted-Cross-Domain-Policies set')
assert(
  server.includes("'X-Permitted-Cross-Domain-Policies', 'none'") ||
    server.includes('"X-Permitted-Cross-Domain-Policies", "none"'),
  'X-Permitted-Cross-Domain-Policies must be none exactly',
)
assert(server.includes('X-Download-Options'), 'X-Download-Options set')
assert(server.includes("'noopen'") || server.includes('"noopen"'), 'X-Download-Options value noopen')
assert(server.includes('Cross-Origin-Opener-Policy'), 'Cross-Origin-Opener-Policy set')
assert(server.includes('same-origin-allow-popups'), 'COOP allows intentional share popups')
assert(
  server.includes("'Cross-Origin-Opener-Policy', 'same-origin-allow-popups'") ||
    server.includes('"Cross-Origin-Opener-Policy", "same-origin-allow-popups"'),
  'COOP must be same-origin-allow-popups exactly',
)
assert(server.includes('Cross-Origin-Resource-Policy'), 'Cross-Origin-Resource-Policy set')
assert(server.includes("'same-site'") || server.includes('"same-site"') || server.includes('same-site'), 'CORP value same-site')
assert(
  server.includes("'Cross-Origin-Resource-Policy', 'same-site'") ||
    server.includes('"Cross-Origin-Resource-Policy", "same-site"'),
  'CORP header must be set to same-site exactly',
)
assert(server.includes('X-DNS-Prefetch-Control'), 'X-DNS-Prefetch-Control set')
assert(server.includes("'off'") || server.includes('"off"'), 'DNS prefetch control off')
assert(
  server.includes("'X-DNS-Prefetch-Control', 'off'") ||
    server.includes('"X-DNS-Prefetch-Control", "off"'),
  'X-DNS-Prefetch-Control must be off exactly',
)
assert(
  server.includes("'X-Download-Options', 'noopen'") ||
    server.includes('"X-Download-Options", "noopen"'),
  'X-Download-Options must be noopen exactly',
)
assert(
  (server.match(/no-cache, no-store, must-revalidate/g) || []).length >= 2,
  'HTML/SPA shell Cache-Control must force revalidation (no-store)',
)
assert(
  server.includes("filePath.endsWith('.pdf')") || server.includes('filePath.endsWith(".pdf")'),
  'static setHeaders must special-case PDF cache policy',
)
assert(
  server.includes('max-age=3600, must-revalidate') || server.includes("max-age=3600, must-revalidate"),
  'stable-name PDFs must use must-revalidate (not year-long immutable)',
)
assert(server.includes('RateLimit-Limit'), 'rateLimit emits RateLimit-Limit header')
assert(server.includes('RateLimit-Remaining'), 'rateLimit emits RateLimit-Remaining header')
assert(server.includes('RateLimit-Reset'), 'rateLimit emits RateLimit-Reset header')
assert(server.includes('X-RateLimit-Limit'), 'rateLimit emits X-RateLimit-Limit header')
assert(server.includes('X-RateLimit-Remaining'), 'rateLimit emits X-RateLimit-Remaining header')
assert(server.includes('X-RateLimit-Reset'), 'rateLimit emits X-RateLimit-Reset header')
assert(server.includes('remaining: 0'), '429 JSON body includes remaining: 0')
assert(server.includes('scope: name'), '429 JSON body includes named scope')
assert(server.includes('isSyntheticProbe'), 'client-error isSyntheticProbe gate present')
assert(server.includes('platform-health probe'), 'client-error skips platform-health probe messages')
assert(server.includes('verify:platform'), 'client-error skips verify:platform source')
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
assert(server.includes("app.use('/api/health', rateLimit"), 'health rateLimit registered')
assert(server.includes("app.use('/api/health/history', rateLimit"), 'health/history rateLimit registered')
assert(server.includes("app.use('/api/build-info', rateLimit"), 'build-info rateLimit registered')
assert(server.includes("name: 'health'") || server.includes('name: "health"'), 'health rateLimit must be named')
assert(
  server.includes("name: 'health', windowMs: 60_000, max: 120") ||
    server.includes('name: "health", windowMs: 60_000, max: 120'),
  'health rateLimit must allow 120/min multi-agent headroom',
)
for (const scope of [
  'auth-login',
  'auth-register',
  'auth-refresh',
  'search',
  'client-error',
  'health',
  'field-manual-pdf',
  'analytics-pageview',
]) {
  assert(
    server.includes(`name: '${scope}'`) || server.includes(`name: "${scope}"`),
    `named rateLimit scope required: ${scope}`,
  )
}
assert(
  server.includes("name: 'field-manual-pdf', windowMs: 60_000, max: 90") ||
    server.includes('name: "field-manual-pdf", windowMs: 60_000, max: 90'),
  'field-manual PDF rateLimit must allow 90/min multi-agent headroom',
)
assert(
  server.includes("name: 'the-record-pdf', windowMs: 60_000, max: 90") ||
    server.includes('name: "the-record-pdf", windowMs: 60_000, max: 90'),
  'the-record PDF rateLimit must allow 90/min multi-agent headroom',
)
assert(
  server.includes("name: 'auth-login', windowMs: 60_000, max: 20") ||
    server.includes('name: "auth-login", windowMs: 60_000, max: 20'),
  'auth-login rateLimit must stay at 20/min',
)
assert(
  server.includes("name: 'search', windowMs: 60_000, max: 90") ||
    server.includes('name: "search", windowMs: 60_000, max: 90'),
  'search rateLimit must allow 90/min reader headroom',
)
assert(
  server.includes("name: 'client-error', windowMs: 60_000, max: 30") ||
    server.includes('name: "client-error", windowMs: 60_000, max: 30'),
  'client-error rateLimit must stay at 30/min',
)
assert(
  server.includes("name: 'auth-register', windowMs: 60_000, max: 24") ||
    server.includes('name: "auth-register", windowMs: 60_000, max: 24'),
  'auth-register rateLimit must stay at 24/min',
)
assert(
  server.includes("name: 'analytics-pageview', windowMs: 60_000, max: 120") ||
    server.includes('name: "analytics-pageview", windowMs: 60_000, max: 120'),
  'analytics-pageview rateLimit must allow 120/min',
)
assert(
  server.includes("name: 'analytics-event', windowMs: 60_000, max: 120") ||
    server.includes('name: "analytics-event", windowMs: 60_000, max: 120'),
  'analytics-event rateLimit must allow 120/min',
)
assert(
  server.includes("name: 'change-password', windowMs: 60_000, max: 10") ||
    server.includes('name: "change-password", windowMs: 60_000, max: 10'),
  'change-password rateLimit must stay at 10/min',
)
assert(
  server.includes("name: 'chapters', windowMs: 60_000, max: 120") ||
    server.includes('name: "chapters", windowMs: 60_000, max: 120'),
  'chapters rateLimit must allow 120/min',
)
const rateBudgetLocks = [
  ["auth-refresh", 30],
  ["auth-logout", 30],
  ["auth-me", 60],
  ["auth-status", 60],
  ["downloads", 90],
  ["bookmarks", 60],
  ["progress", 60],
  ["preferences", 30],
  ["profile", 20],
  ["analytics-snapshot", 60],
  ["health-history", 60],
  ["build-info", 60],
]
for (const [name, max] of rateBudgetLocks) {
  const needleA = `name: '${name}', windowMs: 60_000, max: ${max}`
  const needleB = `name: "${name}", windowMs: 60_000, max: ${max}`
  assert(server.includes(needleA) || server.includes(needleB), `${name} rateLimit must stay at ${max}/min`)
}
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
const publicSecurity = readFileSync(join(root, 'public', '.well-known', 'security.txt'), 'utf8')
assert(server.includes('privacy@veritasworldwide.com'), 'security.txt contact embedded for production fallback')
assert(server.includes('corrections@veritasworldwide.com'), 'security.txt corrections contact embedded for production fallback')
assert(server.includes('Preferred-Languages: en'), 'SECURITY_TXT_FALLBACK includes Preferred-Languages: en')
assert(publicSecurity.includes('privacy@veritasworldwide.com'), 'public security.txt includes privacy contact')
assert(publicSecurity.includes('corrections@veritasworldwide.com'), 'public security.txt includes corrections contact')
const fallbackExpires = server.match(/Expires:\s*(\S+)/)
const publicExpires = publicSecurity.match(/Expires:\s*(\S+)/)
assert(fallbackExpires && publicExpires, 'Expires present in fallback and public security.txt')
assert(
  fallbackExpires[1] === publicExpires[1],
  `SECURITY_TXT_FALLBACK Expires (${fallbackExpires[1]}) must match public/.well-known (${publicExpires[1]})`,
)
const fallbackLang = server.match(/Preferred-Languages:\s*(\S+)/)
const publicLang = publicSecurity.match(/Preferred-Languages:\s*(\S+)/)
assert(fallbackLang && publicLang, 'Preferred-Languages present in fallback and public security.txt')
assert(
  fallbackLang[1] === publicLang[1],
  `SECURITY_TXT_FALLBACK Preferred-Languages (${fallbackLang[1]}) must match public/.well-known (${publicLang[1]})`,
)
for (const field of ['Policy', 'Hiring', 'Canonical']) {
  const fb = server.match(new RegExp(`${field}:\\s*(\\S+)`))
  const pub = publicSecurity.match(new RegExp(`${field}:\\s*(\\S+)`))
  assert(fb && pub, `${field} present in fallback and public security.txt`)
  assert(fb[1] === pub[1], `SECURITY_TXT_FALLBACK ${field} must match public/.well-known`)
}
const fallbackContacts = (server.match(/Contact:/g) || []).length
const publicContacts = (publicSecurity.match(/Contact:/g) || []).length
assert(fallbackContacts >= 2 && publicContacts >= 2, 'security.txt must list at least two Contact lines')
assert(
  fallbackContacts === publicContacts,
  `SECURITY_TXT_FALLBACK Contact count (${fallbackContacts}) must match public (${publicContacts})`,
)

// Change-password validation mirrors register/login max length floor
assert(serverAuth.includes('change-password'), 'change-password route present in server-auth')
assert(serverAuth.includes('newPassword.length > 128'), 'change-password rejects overlong new passwords')
assert(serverAuth.includes('currentPassword.length > 128'), 'change-password rejects overlong current passwords')
// JWT algorithm pin — prevent alg=none / confusion
assert(serverAuth.includes("algorithm: 'HS256'") || serverAuth.includes('algorithm: "HS256"'), 'jwt.sign must pin HS256')
assert(
  serverAuth.includes("algorithms: ['HS256']") || serverAuth.includes('algorithms: ["HS256"]'),
  'jwt.verify must restrict algorithms to HS256',
)
assert(
  /BCRYPT_ROUNDS\s*=\s*(\d+)/.test(serverAuth) && Number(serverAuth.match(/BCRYPT_ROUNDS\s*=\s*(\d+)/)[1]) >= 12,
  'bcrypt cost factor must be >= 12',
)
assert(serverAuth.includes('jti:'), 'access tokens must include unique jti claims')
assert(serverAuth.includes("app.post('/api/auth/refresh'"), 'refresh route registered')
assert(
  serverAuth.includes('DELETE FROM sessions WHERE token = $1') ||
    serverAuth.includes('DELETE FROM sessions WHERE token=$1'),
  'session refresh must invalidate previous session row (single-use)',
)
assert(
  serverAuth.includes('DELETE FROM sessions WHERE user_id = $1 AND token != $2') ||
    serverAuth.includes('DELETE FROM sessions WHERE user_id=$1 AND token!=$2'),
  'password change must revoke other sessions for the user',
)

// Rate-limit fleet floor — protect against accidental deletion of middleware rows
const rateLimitUses = (server.match(/app\.use\([^,]+,\s*rateLimit/g) || []).length
assert(rateLimitUses >= 23, `rateLimit middleware count ${rateLimitUses} below floor 23`)
// Isolation: counters must be scoped per route name so analytics cannot exhaust auth
assert(
  server.includes('name: \'auth-login\'') || server.includes('name: "auth-login"') || server.includes("name: 'auth-login'"),
  'rateLimit keys must be named (auth-login scope required)',
)
assert(server.includes("name: 'search'") || server.includes('name: "search"'), 'search rateLimit must be named')
assert(server.includes("name: 'analytics-pageview'") || server.includes('name: "analytics-pageview"'), 'pageview rateLimit must be named')
assert(server.includes('`${name}:${identity') || server.includes('${name}:${identity'), 'rateLimit keys must combine name + identity')

const namedLimiterCount = (server.match(/rateLimit\(\{\s*name:\s*'/g) || []).length
assert(namedLimiterCount >= 23, `named rateLimit configs ${namedLimiterCount} below floor 23`)

// Dependency hygiene — start is node server.js; do not reintroduce dead static servers
assert(packageJson.scripts?.start === 'node server.js', 'start script must be node server.js')
assert(!packageJson.dependencies?.serve, 'must not reintroduce unused serve package')
assert(packageJson.dependencies?.pg, 'pg runtime dependency required')
assert(packageJson.engines?.node, 'package.json engines.node required')
const verifyLive = packageJson.scripts?.['verify:live'] || ''
assert(verifyLive.includes('verify-security-headers'), 'verify:live must include security-headers')
assert(verifyLive.includes('verify-server-security-invariants'), 'verify:live must include server-security-invariants')
assert(verifyLive.includes('verify-a11y-public-targets'), 'verify:live must include a11y floors')
assert(verifyLive.includes('verify-auth-flows'), 'verify:live must include auth smoke')
assert(verifyLive.includes('verify-platform-health'), 'verify:live must include platform health')
assert(
  (verifyLive.split('&&').length) >= 15,
  `verify:live must stay at least 15 steps (got ${verifyLive.split('&&').length})`,
)
const verifyPure = readFileSync(join(root, 'scripts', 'verify-pure.mjs'), 'utf8')
for (const pureScript of [
  'verify-server-security-invariants.mjs',
  'verify-a11y-public-targets.mjs',
  'verify-crawler-surfaces.mjs',
  'verify-auth-validation.mjs',
  'verify-csp-meta.mjs',
  'verify-archive-manifest.mjs',
  'verify-search-scoring.mjs',
  'verify-article-sources.mjs',
  'verify-home-toc-structure.mjs',
]) {
  assert(verifyPure.includes(pureScript), `verify:pure must include ${pureScript}`)
}
const pureScriptCount = (verifyPure.match(/verify-[a-z0-9-]+\.mjs/g) || []).length
assert(pureScriptCount >= 9, 'verify:pure must list at least 9 pure scripts')
assert(pureScriptCount === 9, `verify:pure must stay at exactly 9 pure scripts (got ${pureScriptCount})`)
assert(
  typeof packageJson.dependencies?.react === 'string' &&
    /19\.2\.[7-9]|19\.[3-9]|[2-9]\d/.test(packageJson.dependencies.react.replace(/^\^/, '')),
  `react must be ^19.2.7+, got ${packageJson.dependencies?.react}`,
)
assert(
  typeof packageJson.dependencies?.['react-dom'] === 'string' &&
    /19\.2\.[7-9]|19\.[3-9]|[2-9]\d/.test(packageJson.dependencies['react-dom'].replace(/^\^/, '')),
  `react-dom must be ^19.2.7+, got ${packageJson.dependencies?.['react-dom']}`,
)
// Field-manual PDF postbuild imports .ts sources via Node type stripping (22.6+).
// engines >=20 previously forced Railway railpack onto Node 20.20 which rejects
// --experimental-strip-types and failed every deploy after that declaration.
assert(
  typeof packageJson.engines.node === 'string' &&
    (packageJson.engines.node === '>=22.6.0' ||
      /^>=22(\.6(\.0)?)?$/.test(packageJson.engines.node) ||
      /^>=22\.[6-9]/.test(packageJson.engines.node) ||
      /^>=22\.[1-9][0-9]/.test(packageJson.engines.node) ||
      /^>=2[3-9]/.test(packageJson.engines.node) ||
      packageJson.engines.node.includes('22.6')),
  `engines.node must require strip-types-capable Node (>=22.6.0), got ${packageJson.engines.node}`,
)
assert(
  packageJson.engines.node === '>=22.6.0',
  `engines.node should stay pinned at >=22.6.0 for railpack (got ${packageJson.engines.node})`,
)
assert(
  packageJson.scripts?.postbuild?.includes('run-with-strip-types.mjs'),
  'postbuild must use run-with-strip-types runner (not bare --experimental-strip-types)',
)
assert(
  !packageJson.scripts?.postbuild?.includes('node --experimental-strip-types'),
  'postbuild must not hardcode bare --experimental-strip-types (breaks Node 20 and Node 24+)',
)

assert(server.includes('nodeRuntime'), 'health payload exposes nodeRuntime')
assert(server.includes('packageEnginesNode'), 'health payload exposes packageEnginesNode')
assert(
  (server.match(/nodeRuntime:\s*process\.version/g) || []).length >= 2,
  'nodeRuntime must be exposed on both /api/health and /api/build-info',
)
assert(server.includes('function readPackageEnginesNode'), 'readPackageEnginesNode helper present')
assert(
  (server.match(/packageEnginesNode:\s*readPackageEnginesNode\(\)/g) || []).length >= 2,
  'packageEnginesNode must use shared helper on health and build-info',
)
const analyticsPage = readFileSync(join(root, 'src/pages/AnalyticsPage.tsx'), 'utf8')
assert(analyticsPage.includes('nodeRuntime'), 'AnalyticsPage types nodeRuntime')
assert(analyticsPage.includes('packageEnginesNode'), 'AnalyticsPage types packageEnginesNode')
assert(analyticsPage.includes('release-health-node'), 'AnalyticsPage renders release-health-node test id')

// Pin the Node major that railpack/mise will select for strip-types-capable builds.
const nodeVersionFile = readFileSync(join(root, '.node-version'), 'utf8').trim()
assert(/^\d+\.\d+\.\d+$/.test(nodeVersionFile), `.node-version must be x.y.z, got ${nodeVersionFile}`)
const [nodeMajor, nodeMinor] = nodeVersionFile.split('.').map(Number)
assert(
  nodeMajor > 22 || (nodeMajor === 22 && nodeMinor >= 6),
  `.node-version ${nodeVersionFile} must be >= 22.6.0 for type stripping`,
)
assert(
  nodeVersionFile === '22.14.0',
  `.node-version should stay pinned at 22.14.0 (got ${nodeVersionFile}) to match live Railway runtime`,
)

for (const scriptName of ['generate:institute-pdf', 'verify:institute-pdf', 'verify:institute-manual', 'verify:auth-cache']) {
  const script = packageJson.scripts?.[scriptName] || ''
  assert(
    script.includes('run-with-strip-types.mjs') || !script.includes('--experimental-strip-types'),
    `${scriptName} must use run-with-strip-types runner when strip-types is required`,
  )
}

console.log(
  `[verify:server-security-invariants] PASS — server.js security surface locked · rateLimit×${rateLimitUses}`,
)
