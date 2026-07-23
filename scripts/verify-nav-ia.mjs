#!/usr/bin/env node
/**
 * Navigation IA floors for Veritas shell (Hick's Law ≤5 primary hubs, search-as-nav, mobile tab bar).
 * Sprint 2: dossier hub spokes + empty-state/404 recovery hubs.
 * Entity-only. Does not remove capabilities — only structure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8')
const spokes = fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8')
const home = fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8')
const search = fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8')
const notFound = fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8')
const deepState = fs.readFileSync(path.join(root, 'src/pages/DeepStatePage.tsx'), 'utf8')
const forum = fs.readFileSync(path.join(root, 'src/pages/ForumPage.tsx'), 'utf8')
const israel = fs.readFileSync(path.join(root, 'src/pages/IsraelDossierPage.tsx'), 'utf8')
const cookie = fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8')
const membership = fs.readFileSync(path.join(root, 'src/components/StickyMembershipBar.tsx'), 'utf8')

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

// ── Sprint 2: Dossier hub spokes ─────────────────────────────────
assert(spokes.includes('data-testid="dossier-hub-spokes"'), 'DossierHubSpokes testid required')
assert(spokes.includes("to: '/israel-dossier/briefing'") || spokes.includes('to: "/israel-dossier/briefing"'), 'Briefing spoke required')
assert(spokes.includes("to: '/deep-state'") || spokes.includes('to: "/deep-state"'), 'Deep State spoke required')
assert(spokes.includes("to: '/forum'") || spokes.includes('to: "/forum"'), 'Forum spoke required')
assert(spokes.includes("to: '/profiles'") || spokes.includes('to: "/profiles"'), 'Profiles spoke required')
assert(israel.includes('DossierHubSpokes'), 'Israel dossier mounts hub spokes')
assert(deepState.includes('DossierHubSpokes'), 'Deep State mounts hub spokes')
assert(deepState.includes('also-in') || deepState.includes('Also in Dossiers'), 'Deep State “Also in Dossiers” scent')
assert(forum.includes('DossierHubSpokes'), 'Forum mounts hub spokes / breadcrumb')

// Home Record hub CTAs + News chip
assert(home.includes('data-testid="home-hub-cta-row"'), 'Home primary hub CTA row required')
assert(home.includes('data-testid="home-news-chip"') || home.includes('to="/news"'), 'Home News 1-tap chip required')
assert(home.includes('to="/search"'), 'Home Search hub CTA required')
assert(home.includes('to="/israel-dossier"'), 'Home Dossiers hub CTA required')
assert(home.includes('to="/read"'), 'Home Read hub CTA required')

// Search empty-state hubs
assert(search.includes('data-testid="search-empty-hubs"') || search.includes('search-empty-state'), 'Search empty hub destinations required')
assert(search.includes('to="/content-pack"'), 'Search empty includes research pack')
assert(search.includes('to="/profiles"'), 'Search empty includes profiles')

// Soft-404 / NotFound primary hubs
assert(notFound.includes('data-testid="not-found-hub-chips"') || notFound.includes('PRIMARY_HUBS'), '404 hub chips required')
assert(notFound.includes("to: '/'") || notFound.includes('to: "/"') || notFound.includes("to: '/'") || notFound.includes('to="/"'), '404 Record hub')
assert(notFound.includes('/israel-dossier'), '404 Dossiers hub')
assert(notFound.includes('/search'), '404 Search hub')
assert(notFound.includes('/profiles'), '404 Profiles hub')
assert(notFound.includes('/read'), '404 Read hub')
assert(notFound.includes("robots: 'noindex, nofollow'") || notFound.includes('noindex'), '404 must stay noindex')

// Cookie consent z-index above tab bar
assert(cookie.includes('z-[100]') || cookie.includes('z-\\[100\\]'), 'Cookie consent z-100 above tab bar')
assert(cookie.includes('data-z-above-tab-bar') || cookie.includes('z-[100]'), 'Cookie/tab z-index contract')
assert(membership.includes('bottom-[calc(3.75rem') || membership.includes('bottom-[calc(3.75rem+env(safe-area-inset-bottom))]'), 'Membership bar sits above mobile tab bar')

console.log(
  `[verify:nav-ia] PASS — primary hubs=${toCount}, mobile tab bar, Browse re-homes, dossier spokes, home/search/404 recovery, cookie z-order`,
)
