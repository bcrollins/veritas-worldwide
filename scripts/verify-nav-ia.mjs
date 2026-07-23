#!/usr/bin/env node
/**
 * Navigation IA floors for Veritas shell (Hick's Law ≤5 primary hubs, search-as-nav, mobile tab bar).
 * Entity-only. Does not remove capabilities — only structure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8')

function assert(cond, msg) {
  if (!cond) {
    console.error(`[verify:nav-ia] FAIL: ${msg}`)
    process.exit(1)
  }
}

// Extract primaryLinks array block (first occurrence in Header)
const m = app.match(/const primaryLinks: ShellLink\[\] = \[([\s\S]*?)\]\n\n  const trustLinks/)
assert(m, 'primaryLinks block not found')
const block = m[1]
const toCount = (block.match(/to:\s*['"]/g) || []).length
assert(toCount <= 5, `primaryLinks must be ≤5 hubs (Hick's Law); got ${toCount}`)
assert(toCount >= 4, `primaryLinks unexpectedly sparse (${toCount})`)
assert(block.includes("/search"), 'Search must be a primary hub')
assert(block.includes('/read'), 'Read must be a primary hub')
assert(block.includes('/israel-dossier'), 'Dossiers hub required')
assert(block.includes('/profiles'), 'Profiles hub required')

// News and Forum must remain reachable (not deleted) — drawer Browse or utility
assert(app.includes("to: '/news'") || app.includes('to: "/news"'), 'News route link must exist in shell')
assert(app.includes("to: '/forum'") || app.includes('to: "/forum"'), 'Forum route link must exist in shell')
assert(app.includes('drawerBrowseLinks') || app.includes('Browse'), 'Named Browse section for re-homed primary items')

// Mobile tab bar thumb-zone
assert(app.includes('function MobileTabBar'), 'MobileTabBar component required')
assert(app.includes('data-testid="mobile-tab-bar"'), 'mobile-tab-bar testid required')
assert(app.includes('<MobileTabBar />'), 'MobileTabBar must mount in App shell')
assert(app.includes('safe-area-inset-bottom'), 'safe-area padding for fixed bottom chrome')

// Researcher + volume-ii preserved in drawer research
assert(app.includes('/researcher'), 'Researcher tools must remain reachable')
assert(app.includes('/volume-ii'), 'Volume II track must remain reachable')
assert(app.includes('/record-of-jesus-christ'), 'ROC must remain reachable')
assert(app.includes('/bible'), 'Bible history must remain reachable')
assert(app.includes('/comprehensive-profile'), 'OSINT product must remain reachable')
assert(app.includes('/membership'), 'Membership must remain reachable')

// No mystery More junk drawer label
assert(!/label:\s*['"]More['"]/.test(app), 'Banned: More junk-drawer label')
assert(!/label:\s*['"]Misc['"]/.test(app), 'Banned: Misc junk-drawer label')

console.log(`[verify:nav-ia] PASS — primary hubs=${toCount}, mobile tab bar, Browse re-homes, no capability drops`)
