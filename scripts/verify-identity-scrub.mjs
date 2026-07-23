#!/usr/bin/env node
/**
 * Pure identity scrub — public product surfaces must never embed personal
 * operator identifiers. Entity-only: Veritas Worldwide.
 *
 * Scans public/ + product src (pages, components, lib, App entry) for high-signal
 * personal operator patterns. Does NOT scan scripts/ (verify fixtures intentionally
 * mention forbidden strings to assert absence). Does NOT fail on historical
 * source surnames in chapter corpora.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const failures = []

/** High-signal personal operator patterns (not generic historical surnames alone). */
const FORBIDDEN = [
  /brollins/i,
  /bcrollins/i,
  /brandon\s+rollins/i,
  /github\.com\/bcrollins/i,
  /linkedin\.com\/in\/[^"'\s]*rollins/i,
  /brollins\d*@gmail\.com/i,
  /daniellemccauley/i,
]

// Product surfaces only — never scan scripts/ (verify suites plant patterns as guards).
const SCAN_ROOTS = ['public', 'src/pages', 'src/components', 'src/lib', 'src/data', 'src/hooks']
const EXTRA_FILES = ['src/App.tsx', 'src/main.tsx', 'index.html', 'server.js', 'server-social-meta.js']
const SKIP_DIR = new Set(['node_modules', 'dist', 'generated', '.git'])
const EXT = new Set(['.tsx', '.ts', '.js', '.mjs', '.html', '.txt', '.md', '.json', '.svg', '.xml', '.css'])

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue
    const p = join(dir, name)
    let st
    try {
      st = statSync(p)
    } catch {
      continue
    }
    if (st.isDirectory()) walk(p, out)
    else {
      const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : ''
      if (EXT.has(ext) || name === 'robots.txt' || name === 'humans.txt' || name === 'llms.txt') {
        out.push(p)
      }
    }
  }
  return out
}

function shouldSkipRel(rel) {
  // Large corpora / historical claim dumps may quote external people; not operator identity.
  if (rel.includes('corpus.json') || rel.includes('soft-floor.json')) return true
  if (rel.includes('recordOfJesusChristWave')) return true
  if (rel.includes('israelDossier') && (rel.endsWith('.ts') || rel.endsWith('.json'))) return true
  if (rel.includes('profileData.ts') || rel.includes('/profiles/')) return true
  if (rel.includes('chapter-data') || rel.includes('/chapters/')) return true
  if (rel.includes('byronDonalds') || rel.includes('ByronDonalds')) return true
  // Archive pin manifests cite third-party URLs only.
  if (rel.includes('archive-pins') || rel.includes('archiveManifest')) return true
  return false
}

const files = [
  ...SCAN_ROOTS.flatMap((r) => walk(join(root, r))),
  ...EXTRA_FILES.map((f) => join(root, f)).filter((p) => existsSync(p)),
]

const seen = new Set()
for (const file of files) {
  if (seen.has(file)) continue
  seen.add(file)
  const rel = relative(root, file)
  if (shouldSkipRel(rel)) continue

  let text
  try {
    text = readFileSync(file, 'utf8')
  } catch {
    continue
  }
  for (const re of FORBIDDEN) {
    if (re.test(text)) {
      failures.push(`${rel}: matched ${re}`)
    }
  }
}

// Entity humans.txt must not contain personal email domains of operator.
if (existsSync(join(root, 'public/humans.txt'))) {
  const h = readFileSync(join(root, 'public/humans.txt'), 'utf8')
  if (!/Veritas Worldwide/.test(h)) failures.push('humans.txt missing entity name')
  if (/@gmail\.com/i.test(h)) failures.push('humans.txt must not use personal gmail')
}

// robots must keep OPSEC quarantine surfaces Disallow'd.
if (existsSync(join(root, 'public/robots.txt'))) {
  const r = readFileSync(join(root, 'public/robots.txt'), 'utf8')
  if (!/Disallow:\s*\/bernie/i.test(r)) failures.push('robots.txt missing Disallow: /bernie')
  if (!/Disallow:\s*\/researcher\//i.test(r)) failures.push('robots.txt missing Disallow: /researcher/')
  if (!/Disallow:\s*\/admin/i.test(r)) failures.push('robots.txt missing Disallow: /admin')
}

if (failures.length) {
  console.error('[verify:identity-scrub] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log(
  `[verify:identity-scrub] PASS — ${seen.size} product files scanned; high-signal personal operator patterns clean`,
)
