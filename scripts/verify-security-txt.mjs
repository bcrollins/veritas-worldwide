#!/usr/bin/env node
/**
 * RFC 9116 security.txt floors — entity contacts only, no personal identity.
 * Keeps public/security.txt, public/.well-known/security.txt, and server route in lockstep.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

const text = read('public/security.txt')
const wellKnown = read('public/.well-known/security.txt')
const server = read('server.js')

if (!/Contact:\s*mailto:privacy@veritasworldwide\.com/i.test(text)) {
  failures.push('missing privacy contact')
}
if (!/Contact:\s*mailto:corrections@veritasworldwide\.com/i.test(text)) {
  failures.push('missing corrections contact')
}
if (/brollins|brandon|@gmail\.com|910[-\s]?238|deerfield/i.test(text)) {
  failures.push('personal identity in security.txt')
}
if (/brollins|brandon|@gmail\.com/i.test(wellKnown)) {
  failures.push('personal identity in .well-known/security.txt')
}
if (text.trim() !== wellKnown.trim()) {
  failures.push('public/security.txt and public/.well-known/security.txt must match')
}

const m = text.match(/Expires:\s*([^\s]+)/i)
if (!m) failures.push('missing Expires')
else {
  const exp = Date.parse(m[1])
  const days = (exp - Date.now()) / 86400000
  if (!Number.isFinite(exp)) failures.push('unparseable Expires')
  else if (days < 90) console.warn(`[verify:security-txt] WARN expires in ${Math.floor(days)} days`)
}

if (!/Canonical:\s*https:\/\/veritasworldwide\.com\/\.well-known\/security\.txt/i.test(text)) {
  failures.push('Canonical must point at /.well-known/security.txt')
}
if (!/Policy:\s*https:\/\/veritasworldwide\.com\/privacy/i.test(text)) {
  failures.push('Policy URL missing')
}

// Server must expose both well-known and root aliases without depending solely on dist copy.
if (!server.includes('/.well-known/security.txt') || !server.includes('/security.txt')) {
  failures.push('server must register /.well-known/security.txt and /security.txt')
}

if (failures.length) {
  console.error('[verify:security-txt] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:security-txt] PASS — entity contacts + Expires + well-known lockstep')

