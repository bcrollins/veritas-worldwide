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

console.log('[verify:osint-attestation-gate] PASS')
