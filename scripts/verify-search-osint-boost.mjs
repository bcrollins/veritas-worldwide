#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
function assert(c, m) {
  if (!c) {
    console.error(`[verify:search-osint-boost] FAIL — ${m}`)
    process.exit(1)
  }
}
const page = readFileSync(join(root, 'src/pages/SearchPage.tsx'), 'utf8')
assert(page.includes('osintServiceResults'), 'osintServiceResults missing')
assert(page.includes('search-osint-service'), 'data-testid search-osint-service missing')
assert(page.includes('/comprehensive-profile'), 'comprehensive-profile link missing')
assert(page.includes('comprehensive online profile') || page.includes('osint'), 'OSINT search terms missing')
assert(page.includes('/research-pack.zip'), 'search must surface free research-pack.zip')
assert(page.includes('research pack') || page.includes('research-pack'), 'research pack search terms missing')
console.log('[verify:search-osint-boost] PASS')
