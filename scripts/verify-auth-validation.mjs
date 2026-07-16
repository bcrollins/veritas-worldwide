#!/usr/bin/env node
/**
 * Pure validation ladder for auth input guards (mirrors server-auth.js).
 */

function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const email = value.trim()
  if (email.length < 5 || email.length > 254) return false
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email)
}

function isValidPassword(value) {
  return typeof value === 'string' && value.length >= 6 && value.length <= 128
}

function cleanDisplayName(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/[\u0000-\u001F\u007F]/g, '')
}

function sanitizeReturnTo(returnTo) {
  if (typeof returnTo !== 'string') return null
  const path = returnTo.trim()
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return null
  if (path.includes('://')) return null
  return path
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
assert(sanitizeReturnTo('/chapter/chapter-1') === '/chapter/chapter-1', 'allow relative path')
assert(sanitizeReturnTo('//evil.com') === null, 'reject protocol-relative')
assert(sanitizeReturnTo('https://evil.com') === null, 'reject absolute URL')
assert(sanitizeReturnTo('/\\evil') === null, 'reject backslash')
assert(sanitizeReturnTo('chapter-1') === null, 'reject non-root-relative')


assert(!isValidEmail('a@b.c'), 'reject single-char TLD')
assert(!isValidEmail('a@1.2'), 'reject short numeric TLD')
assert(isValidEmail('user@mail.example.com'), 'accept multi-label domain')
assert(isValidEmail('  reader@example.com  '), 'trim valid email')
assert(sanitizeReturnTo('/about?x=1') === '/about?x=1', 'allow query on relative path')
assert(sanitizeReturnTo('//evil.com/path') === null, 'reject // with path')
assert(sanitizeReturnTo(null) === null, 'reject null')
assert(sanitizeReturnTo('') === null, 'reject empty returnTo')
assert(sanitizeReturnTo('/chapter/1://x') === null, 'reject embedded scheme')

console.log('[verify:auth-validation] PASS')
