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
assert(
  server.includes("express.json({ limit: '64kb' })") || server.includes('express.json({ limit: "64kb" })'),
  'global JSON body limit must be 64kb',
)
assert(server.includes("X-Frame-Options"), 'X-Frame-Options set')
assert(server.includes('X-Content-Type-Options'), 'X-Content-Type-Options set')
assert(server.includes('Strict-Transport-Security'), 'HSTS set')
assert(server.includes('includeSubDomains; preload') || server.includes('preload'), 'HSTS includes preload directive')
assert(server.includes('Permissions-Policy'), 'Permissions-Policy set')
assert(server.includes('payment=()'), 'Permissions-Policy disables payment')
assert(server.includes('usb=()'), 'Permissions-Policy disables usb')
assert(server.includes('interest-cohort=()'), 'Permissions-Policy disables FLoC')
assert(server.includes('display-capture=()'), 'Permissions-Policy disables display-capture')
assert(server.includes('clipboard-write=(self)'), 'Permissions-Policy allows same-origin clipboard write only')
assert(!server.includes('clipboard-write=()'), 'must not fully deny clipboard-write (breaks copy CTAs)')
assert(server.includes('Referrer-Policy'), 'Referrer-Policy set')
assert(server.includes('strict-origin-when-cross-origin'), 'Referrer-Policy value locked')
assert(server.includes('X-XSS-Protection'), 'X-XSS-Protection set')
assert(server.includes('X-Permitted-Cross-Domain-Policies'), 'X-Permitted-Cross-Domain-Policies set')
assert(server.includes('X-Download-Options'), 'X-Download-Options set')
assert(server.includes("'noopen'") || server.includes('"noopen"'), 'X-Download-Options value noopen')
assert(server.includes('Cross-Origin-Opener-Policy'), 'Cross-Origin-Opener-Policy set')
assert(server.includes('same-origin-allow-popups'), 'COOP allows intentional share popups')
assert(server.includes('Cross-Origin-Resource-Policy'), 'Cross-Origin-Resource-Policy set')
assert(server.includes("'same-site'") || server.includes('"same-site"') || server.includes('same-site'), 'CORP value same-site')
assert(server.includes('X-DNS-Prefetch-Control'), 'X-DNS-Prefetch-Control set')
assert(server.includes("'off'") || server.includes('"off"'), 'DNS prefetch control off')
assert(server.includes('RateLimit-Limit'), 'rateLimit emits RateLimit-Limit header')
assert(server.includes('RateLimit-Remaining'), 'rateLimit emits RateLimit-Remaining header')
assert(server.includes('RateLimit-Reset'), 'rateLimit emits RateLimit-Reset header')
assert(server.includes('remaining: 0'), '429 JSON body includes remaining: 0')
assert(server.includes('scope: name'), '429 JSON body includes named scope')
assert(server.includes('isSyntheticProbe') || server.includes('platform-health probe'), 'client-error skips synthetic probes')
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
const publicSecurity = readFileSync(join(root, 'public', '.well-known', 'security.txt'), 'utf8')
const fallbackExpires = server.match(/Expires:\s*(\S+)/)
const publicExpires = publicSecurity.match(/Expires:\s*(\S+)/)
assert(fallbackExpires && publicExpires, 'Expires present in fallback and public security.txt')
assert(
  fallbackExpires[1] === publicExpires[1],
  `SECURITY_TXT_FALLBACK Expires (${fallbackExpires[1]}) must match public/.well-known (${publicExpires[1]})`,
)

// Change-password validation mirrors register/login max length floor
assert(serverAuth.includes('change-password'), 'change-password route present in server-auth')
assert(serverAuth.includes('newPassword.length > 128'), 'change-password rejects overlong new passwords')
assert(serverAuth.includes('currentPassword.length > 128'), 'change-password rejects overlong current passwords')

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
    (/^>=22(\.6(\.0)?)?/.test(packageJson.engines.node) ||
      /^>=22\.[6-9]/.test(packageJson.engines.node) ||
      /^>=22\.[1-9][0-9]/.test(packageJson.engines.node) ||
      /^>=2[3-9]/.test(packageJson.engines.node) ||
      packageJson.engines.node.includes('22.6')),
  `engines.node must require strip-types-capable Node (>=22.6.0), got ${packageJson.engines.node}`,
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
