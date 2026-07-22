#!/usr/bin/env node
/**
 * Home TOC structural invariants:
 * - keyword topic chips must not nest inside chapter Links
 * - keyword chips must advertise 44px targets
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'src/pages/HomePage.tsx'), 'utf8')

function assert(c, m) {
  if (!c) {
    console.error(`[verify:home-toc-structure] FAIL — ${m}`)
    process.exit(1)
  }
}

// Find the TOC rest.map block
const idx = src.indexOf('{rest.map((chapter)')
assert(idx >= 0, 'missing rest.map TOC block')
const block = src.slice(idx, idx + 2500)

// Outer container should be a div, not a Link wrapping keywords
assert(block.includes('<div key={chapter.id}'), 'TOC row must be a div container')
assert(block.includes('getTopicHrefForTerm'), 'keyword chips present')
assert(block.includes('min-h-[44px]'), 'keyword chips 44px')

// Ensure chapter Link closes before keyword Links open
const chapterLinkClose = block.indexOf('</Link>')
const keywordLink = block.indexOf('getTopicHrefForTerm')
assert(chapterLinkClose > 0 && keywordLink > chapterLinkClose, 'keyword links must follow chapter Link close (no nesting)')

// First-screen CTAs: archive + live investigation must remain one tap away
assert(src.includes('to="/read"'), 'home hero must link Read The Record')
assert(src.includes('to="/israel-dossier"'), 'home hero must link Israel Dossier')
assert(src.includes('Israel Dossier'), 'home hero must show Israel Dossier label')

// Power Profiles discovery strip (first-party portraits + corpus)
assert(src.includes('homeFeaturedProfiles'), 'home must feature power profiles strip')
assert(src.includes('to="/profiles"'), 'home must deep-link to profiles index')
assert(src.includes('/profiles/corpus.json'), 'home must expose profiles corpus URL')
assert(src.includes('getProfilePhoto'), 'home profile cards must use first-party getProfilePhoto')

console.log('[verify:home-toc-structure] PASS')
