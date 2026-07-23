#!/usr/bin/env node
/**
 * package.json must not publish personal author identity.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const failures = []
const author = pkg.author
if (author != null) {
  const s = typeof author === 'string' ? author : JSON.stringify(author)
  if (/brandon|brollins|@gmail\.com|bcrollins/i.test(s) && !/veritas/i.test(s)) {
    failures.push(`package.json author leaks personal identity: ${s}`)
  }
  if (typeof author === 'string' && author && !/veritas\s+worldwide/i.test(author)) {
    failures.push(`package.json author must be Veritas Worldwide or omitted (got ${author})`)
  }
}
if (failures.length) {
  console.error('[verify:package-entity] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:package-entity] PASS — package.json author entity-safe')
