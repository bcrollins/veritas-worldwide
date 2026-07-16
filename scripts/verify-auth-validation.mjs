#!/usr/bin/env node
/**
 * Pure validation ladder for auth input guards (mirrors server-auth.js).
 */

function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const email = value.trim()
  if (email.length < 5 || email.length > 254) return false
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
}

function isValidPassword(value) {
  return typeof value === 'string' && value.length >= 6 && value.length <= 128
}

function cleanDisplayName(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/[\u0000-\u001F\u007F]/g, '')
}

function assert(c, m) {
  if (!c) {
    console.error(`[verify:auth-validation] FAIL — ${m}`)
    process.exit(1)
  }
}

assert(isValidEmail('reader@example.com'), 'valid email')
assert(!isValidEmail('not-an-email'), 'reject bare token')
assert(!isValidEmail('x@y'), 'reject missing TLD')
assert(!isValidEmail(''), 'reject empty')
assert(isValidPassword('abcdef'), 'min length 6')
assert(!isValidPassword('abcde'), 'reject short password')
assert(!isValidPassword('a'.repeat(129)), 'reject overlong password')
assert(cleanDisplayName('  Alice  ') === 'Alice', 'trim display name')
assert(cleanDisplayName('A\u0000B') === 'AB', 'strip control chars')
assert(cleanDisplayName('\u0000\u0001') === '', 'control-only becomes empty')

console.log('[verify:auth-validation] PASS')
