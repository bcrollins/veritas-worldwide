#!/usr/bin/env node
/**
 * Pure smoke: OSINT checkout must block without lawful-purpose attestations.
 * Static gate on client + server (no Playwright browser required).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

function assert(cond, msg) {
  if (!cond) {
    console.error(`[verify:osint-attestation-gate] FAIL: ${msg}`)
    process.exit(1)
  }
}

const page = read('src/pages/ComprehensiveProfilePage.tsx')
const server = read('server.js')

assert(page.includes('attestLawful'), 'client attestLawful')
assert(page.includes('attestNoHarassment'), 'client attestNoHarassment')
assert(page.includes('attestAdult'), 'client attestAdult')
assert(
  /if\s*\(\s*!form\.attestLawful\s*\|\||!form\.attestLawful/.test(page) ||
    page.includes('!form.attestLawful') ||
    page.includes('All three legal attestations'),
  'client must refuse submit without attestations',
)
assert(
  server.includes('attestLawful') &&
    server.includes('attestNoHarassment') &&
    server.includes('attestAdult'),
  'server must require all three attestations',
)
assert(
  server.includes('All legal attestations are required') ||
    /attestLawful.*attestNoHarassment.*attestAdult/s.test(server),
  'server 400 message for missing attestations',
)

// #6 — OSINT order PII never in git or public dist (fail-closed).
const gitignore = read('.gitignore')
assert(
  gitignore.includes('/data') || gitignore.includes('data/osint-orders'),
  '.gitignore must ignore data/ OSINT order storage',
)
assert(
  gitignore.includes('osint-orders'),
  '.gitignore must mention osint-orders ndjson',
)
assert(
  server.includes("pth === '/data'") &&
    server.includes("pth.startsWith('/data/')") &&
    server.includes('osint-orders'),
  'server must 404 /data and osint-orders paths (fail-closed PII)',
)
assert(
  !fs.existsSync(path.join(root, 'dist', 'data', 'osint-orders.ndjson')),
  'dist must not ship osint-orders.ndjson',
)

console.log('[verify:osint-attestation-gate] PASS')
