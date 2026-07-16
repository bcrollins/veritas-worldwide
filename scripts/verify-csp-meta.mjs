#!/usr/bin/env node
/**
 * Assert index.html embeds a non-empty Content-Security-Policy meta tag
 * with object-src none and base-uri self (defense-in-depth alongside headers).
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const html = readFileSync(join(root, 'index.html'), 'utf8')

function assert(c, m) {
  if (!c) {
    console.error(`[verify:csp-meta] FAIL — ${m}`)
    process.exit(1)
  }
}

const m = html.match(/http-equiv=["']Content-Security-Policy["'][^>]*content=["']([^"']+)["']/i)
  || html.match(/content=["']([^"']+)["'][^>]*http-equiv=["']Content-Security-Policy["']/i)
assert(m, 'CSP meta missing in index.html')
const csp = m[1]
assert(/object-src\s+'none'/.test(csp), 'object-src none required')
assert(/base-uri\s+'self'/.test(csp), 'base-uri self required')
assert(/default-src\s+'self'/.test(csp), 'default-src self required')
assert(/form-action\s+'self'/.test(csp), 'form-action self required')
console.log('[verify:csp-meta] PASS')
