#!/usr/bin/env node
/**
 * Pure floor: every public page under src/pages/ mounts RelatedHubs
 * (import + JSX + data-testid). Admin surfaces are exempt.
 * Complements verify-nav-recovery-surfaces needle list.
 * Entity-only — no personal identity.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pagesDir = path.join(root, 'src/pages')

function assert(c, m) {
  if (!c) {
    console.error('[verify:related-hubs-coverage] FAIL:', m)
    process.exit(1)
  }
}

function listTsx(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'admin') continue // admin exempt
      listTsx(p, out)
    } else if (ent.name.endsWith('.tsx')) {
      out.push(p)
    }
  }
  return out
}

const files = listTsx(pagesDir)
assert(files.length >= 40, `expected ≥40 public page files, got ${files.length}`)

const missing = []
const noTestId = []
for (const abs of files) {
  const rel = path.relative(root, abs)
  const src = fs.readFileSync(abs, 'utf8')
  const hasImport =
    /import\s+RelatedHubs\b/.test(src) ||
    /import\s+RelatedHubs\s*,/.test(src) ||
    /from\s+['"].*RelatedHubs['"]/.test(src)
  const hasJsx = /<RelatedHubs\b/.test(src)
  if (!hasImport || !hasJsx) {
    missing.push(rel)
    continue
  }
  // At least one testId= on a RelatedHubs mount
  if (!/<RelatedHubs\b[^>]*testId=/.test(src) && !/testId=\{/.test(src)) {
    // multiline props: testId on following line after <RelatedHubs
    const block = src.match(/<RelatedHubs[\s\S]{0,400}?\/>/g) || []
    const ok = block.some((b) => /testId=/.test(b))
    if (!ok) noTestId.push(rel)
  }
}

assert(missing.length === 0, `public pages missing RelatedHubs: ${missing.join(', ')}`)
assert(noTestId.length === 0, `RelatedHubs mounts missing testId: ${noTestId.join(', ')}`)

// Platform component invariants
const rh = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(rh.includes('PRIMARY_RELATED_HUBS'), 'PRIMARY_RELATED_HUBS export')
assert(rh.includes('emphasizeTo'), 'emphasizeTo prop')
assert(rh.includes('min-h-[44px]'), '44px touch targets')
assert(rh.includes('no-print'), 'no-print class')
assert(rh.includes('focus-visible:ring-2'), 'focus-visible ring on chips')
assert(rh.includes('aria-current'), 'aria-current active hub')
assert(rh.includes('useLocation'), 'useLocation for active hub')
assert(rh.includes('activeChip'), 'activeChip visual current hub')
assert(rh.includes("tone === 'parchment'"), 'parchment tone ternary')
assert((rh.match(/PRIMARY_RELATED_HUBS[\s\S]*?\] as const/) || [''])[0].split('{ to:').length - 1 <= 5, 'PRIMARY ≤5 hubs')

console.log(
  `[verify:related-hubs-coverage] PASS — ${files.length} public pages mount RelatedHubs with testId; platform ≤5 primary hubs`,
)
