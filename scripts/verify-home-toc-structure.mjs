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

console.log('[verify:home-toc-structure] PASS')
