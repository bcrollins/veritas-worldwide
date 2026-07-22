#!/usr/bin/env node
/**
 * Trust surfaces must expose machine-readable corpora downloads.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
function assert(c, m) {
  if (!c) {
    console.error(`[verify:trust-corpora-links] FAIL — ${m}`)
    process.exit(1)
  }
}

const sources = readFileSync(join(root, 'src/pages/SourcesPage.tsx'), 'utf8')
const methodology = readFileSync(join(root, 'src/pages/MethodologyPage.tsx'), 'utf8')
const home = readFileSync(join(root, 'src/pages/HomePage.tsx'), 'utf8')

for (const [label, src] of [
  ['SourcesPage', sources],
  ['MethodologyPage', methodology],
]) {
  assert(src.includes('briefing-source-archive-manifest.json'), `${label} must link archive pin manifest`)
  assert(src.includes('profiles/corpus.json'), `${label} must link profiles corpus`)
}

assert(home.includes('profiles/corpus.json'), 'HomePage must expose profiles corpus URL')
assert(home.includes('homeFeaturedProfiles'), 'HomePage must feature power profiles strip')

console.log('[verify:trust-corpora-links] PASS — Sources + Methodology + Home corpora discovery locked')
