#!/usr/bin/env node
/**
 * Pure regression lock for ProfilePage animated stat counters.
 * Prevents counters stuck at 0 when IntersectionObserver misses
 * or the ref attaches after the first effect tick.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'src/pages/ProfilePage.tsx'), 'utf8')

function assert(c, m) {
  if (!c) {
    console.error(`[verify:profile-counters] FAIL — ${m}`)
    process.exit(1)
  }
}

assert(src.includes('function useAnimatedCounter'), 'useAnimatedCounter hook present')
assert(src.includes('function StatCounter'), 'StatCounter component present')
assert(src.includes('prefers-reduced-motion'), 'reduced-motion path present')
assert(src.includes("matchMedia('(prefers-reduced-motion: reduce)')"), 'reduced-motion media query')
assert(src.includes('IntersectionObserver'), 'IntersectionObserver viewport trigger')
// Deferred attach so ref is committed before observe
assert(src.includes('setTimeout(attach, 0)') || src.includes('setTimeout(attach,0)'), 'deferred attach after paint')
// Never leave stats at zero if ref missing or IO never fires
assert(src.includes('setValue(end)'), 'final value always applied')
assert(src.includes('fallbackTimer') || src.includes('setTimeout'), 'fallback timer path')
// aria-label uses final end (not intermediate animated value) for a11y
assert(
  src.includes('aria-label={`${prefix}${end.toLocaleString()}${suffix}`}') ||
    src.includes('aria-label={`${prefix}${end.toLocaleString()}'),
  'aria-label uses final end count',
)
// Stats rendered on flagship profile surface
assert(src.includes('<StatCounter'), 'StatCounter used on profile page')
const uses = (src.match(/<StatCounter\b/g) || []).length
assert(uses >= 3, `expected ≥3 StatCounter instances, got ${uses}`)

console.log(`[verify:profile-counters] PASS — hook+IO+reduced-motion+fallback+${uses} counters`)
