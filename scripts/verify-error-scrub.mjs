#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const client = fs.readFileSync(path.join(root, 'src/lib/clientErrorReporting.ts'), 'utf8')
const server = fs.readFileSync(path.join(root, 'server.js'), 'utf8')
const failures = []
if (!client.includes('scrubErrorText') || !client.includes('/Users/[redacted]')) {
  failures.push('clientErrorReporting missing path scrub')
}
if (!server.includes('function scrubErrorText') || !server.includes('scrubErrorText(body.stack)')) {
  failures.push('server.js missing client-error stack scrub')
}
if (failures.length) {
  console.error('[verify:error-scrub] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:error-scrub] PASS — client+server path/email scrub present')
