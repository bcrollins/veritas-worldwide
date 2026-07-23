#!/usr/bin/env node
/**
 * Pure floor: every major public surface mounts recovery hubs or research chips.
 * Complements verify-nav-ia shell floors. Entity-only.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
function assert(c, m) { if (!c) { console.error('[verify:nav-recovery] FAIL:', m); process.exit(1) } }
function read(rel) { return fs.readFileSync(path.join(root, rel), 'utf8') }

const surfaces = [
  ['src/components/DossierHubSpokes.tsx', 'dossier-hub-spokes'],
  ['src/components/ResearchHubChips.tsx', 'research-hub-chips'],
  ['src/pages/HomePage.tsx', 'home-hub-cta-row'],
  ['src/pages/HomePage.tsx', 'home-news-chip'],
  ['src/pages/SearchPage.tsx', 'search-idle-hubs'],
  ['src/pages/SearchPage.tsx', 'search-empty-hubs'],
  ['src/pages/NotFoundPage.tsx', 'not-found-hub-chips'],
  ['src/pages/TimelinePage.tsx', 'timeline-related-hubs'],
  ['src/pages/NewsPage.tsx', 'news-related-hubs'],
  ['src/pages/TopicsIndexPage.tsx', 'topics-related-hubs'],
  ['src/pages/AboutPage.tsx', 'about-related-hubs'],
  ['src/pages/AccessibilityPage.tsx', 'accessibility-related-hubs'],
  ['src/pages/MembershipPage.tsx', 'membership-related-hubs'],
  ['src/pages/PrivacyPage.tsx', 'privacy-related-hubs'],
  ['src/pages/TermsPage.tsx', 'terms-related-hubs'],
  ['src/pages/AnalyticsPage.tsx', 'analytics-related-hubs'],
  ['src/pages/ComprehensiveProfilePage.tsx', 'osint-related-hubs'],
  ['src/pages/BookmarksPage.tsx', 'bookmarks-empty-hubs'],
  ['src/pages/ProfilesIndexPage.tsx', 'profiles-research-pack-banner'],
  ['src/pages/ReadTheBookPage.tsx', 'read-toc-by-part'],
  ['src/pages/MediaKitPage.tsx', 'media-kit-related-hubs'],
  ['src/components/CookieConsent.tsx', 'data-z-above-tab-bar'],
  ['src/components/CookieConsent.tsx', 'z-[100]'],
  ['src/components/CookieConsent.tsx', 'cookie-consent-banner'],
  ['src/App.tsx', 'mobile-tab-bar'],
  ['src/App.tsx', 'function MobileTabBar'],
  ['src/App.tsx', '<MobileTabBar'],
  ['src/App.tsx', 'primaryLinks'],
  ['src/App.tsx', 'safe-area-inset-bottom'],
  ['src/App.tsx', 'drawerBrowseLinks'],
  ['src/App.tsx', 'drawerResearchLinks'],
  ['src/components/StickyMembershipBar.tsx', 'sticky-membership-bar'],
  ['src/components/StickyMembershipBar.tsx', '3.75rem'],
  ['src/components/StickyMembershipBar.tsx', 'env(safe-area-inset-bottom)'],
]

for (const [rel, needle] of surfaces) {
  assert(read(rel).includes(needle), `${rel} must include ${needle}`)
}

// ResearchHubChips component export present
assert(read('src/components/ResearchHubChips.tsx').includes('export default function ResearchHubChips'), 'ResearchHubChips export')
const chipsBody = read('src/components/ResearchHubChips.tsx').match(/const CHIPS = \[([\s\S]*?)\] as const/)
assert(chipsBody, 'ResearchHubChips CHIPS')
const chipCount = (chipsBody[1].match(/to:/g) || []).length
assert(chipCount === 5, `ResearchHubChips count ${chipCount} !== 5`)
assert(read('src/components/DossierHubSpokes.tsx').includes('export default function DossierHubSpokes'), 'DossierHubSpokes export')
assert(read('src/components/DossierHubSpokes.tsx').includes('z-30') || read('src/components/DossierHubSpokes.tsx').includes('z-40'), 'DossierHubSpokes sticky z-order')
const spokesBody = read('src/components/DossierHubSpokes.tsx').match(/export const DOSSIER_SPOKES[^=]*= \[([\s\S]*?)\] as const/)
assert(spokesBody, 'DOSSIER_SPOKES export')
const spokeCount = (spokesBody[1].match(/id:/g) || []).length
assert(spokeCount === 5, `DOSSIER_SPOKES count ${spokeCount} !== 5`)

// Soft-404 SPA stays noindex (must not set a /404 page URL in meta)
const notFoundSrc = read('src/pages/NotFoundPage.tsx')
assert(notFoundSrc.includes('noindex'), 'NotFoundPage must stay noindex')
assert(!/url:\s*[`'"][^`'"]*\/404/.test(notFoundSrc), 'NotFoundPage must not invent /404 url meta')

// Research family mounts chips
for (const rel of [
  'src/pages/MethodologyPage.tsx',
  'src/pages/SourcesPage.tsx',
  'src/pages/ResearcherHubPage.tsx',
  'src/pages/ContentPackPage.tsx',
  'src/pages/InstitutePage.tsx',
  'src/pages/VolumeIIHubPage.tsx',
  'src/pages/BibleHistoryPage.tsx',
  'src/pages/RecordOfJesusChristPage.tsx',
  'src/pages/PersonalTimelinePage.tsx',
  'src/pages/InstituteMethodologyPage.tsx',
  'src/pages/InstituteBookPage.tsx',
]) {
  assert(read(rel).includes('ResearchHubChips'), `${rel} mounts ResearchHubChips`)

}

// Forum mounts both inline breadcrumb and also-in chip row
const forum = read('src/pages/ForumPage.tsx')
assert(forum.includes('variant="inline"') && forum.includes('variant="also-in"'), 'Forum dual DossierHubSpokes variants')
assert(forum.includes('exclude="forum"') || forum.includes("exclude='forum'"), 'Forum also-in excludes self')
const deep = read('src/pages/DeepStatePage.tsx')
assert(deep.includes('variant="also-in"') || deep.includes("variant='also-in'"), 'DeepState also-in spokes')
assert(deep.includes('exclude="deep-state"') || deep.includes("exclude='deep-state'"), 'DeepState excludes self from also-in')
const israel = read('src/pages/IsraelDossierPage.tsx')
assert(israel.includes('variant="sticky"') || israel.includes("variant='sticky'"), 'Israel sticky DossierHubSpokes')
const briefing = read('src/pages/IsraelDossierBriefingPage.tsx')
assert(briefing.includes('variant="also-in"') || briefing.includes("variant='also-in'"), 'Briefing also-in spokes')
assert(briefing.includes('exclude="briefing"') || briefing.includes("exclude='briefing'"), 'Briefing also-in excludes self')

// Dossier family mounts spokes
for (const rel of [
  'src/pages/IsraelDossierPage.tsx',
  'src/pages/IsraelDossierBriefingPage.tsx',
  'src/pages/DeepStatePage.tsx',
  'src/pages/ForumPage.tsx',
]) {
  assert(read(rel).includes('DossierHubSpokes'), `${rel} mounts DossierHubSpokes`)
}

// Server soft-404 HTML hubs (crawler / no-JS)
const server = read('server.js')
assert(server.includes('data-testid="server-soft-404"'), 'server soft-404 testid')
assert(server.includes('href="/israel-dossier"'), 'server soft-404 dossiers')
assert(server.includes('href="/profiles"'), 'server soft-404 profiles')
assert(server.includes('class="primary"'), 'server soft-404 primary Record')
const nfHtml = server.match(/function buildNotFoundHtml\(\) \{([\s\S]*?)\n\}/)
assert(nfHtml, 'buildNotFoundHtml body')
const hrefs = [...nfHtml[1].matchAll(/href="(\/[^"]*)"/g)].map((x) => x[1])
const required = ['/', '/read', '/israel-dossier', '/profiles', '/search']
for (const h of required) assert(hrefs.includes(h), `server soft-404 missing ${h}`)
assert(hrefs.length === 5, `server soft-404 hub count ${hrefs.length} !== 5`)

// Ban junk-drawer labels in shell
const appShell = read('src/App.tsx')
assert(!/label:\s*['"]More['"]/.test(appShell), 'Banned More junk drawer')
assert(!/label:\s*['"]Misc['"]/.test(appShell), 'Banned Misc junk drawer')


// Capability preservation routes reachable in shell
const app = read('src/App.tsx')
// Hick's Law: primaryLinks exactly 5
const primaryBlock = app.match(/const primaryLinks: ShellLink\[\] = \[([\s\S]*?)\]\n\n  const trustLinks/)
assert(primaryBlock, 'primaryLinks block')
const primaryCount = (primaryBlock[1].match(/to:\s*['"]/g) || []).length
assert(primaryCount === 5, `primaryLinks count ${primaryCount} !== 5`)
const footerBrowse = app.split('const browseLinks')[1]?.split('const researchLinks')[0] || ''
assert(footerBrowse.includes('/search'), 'footer browseLinks includes Search')
assert(footerBrowse.includes('/israel-dossier'), 'footer browseLinks includes Dossiers')
assert(primaryBlock[1].includes('/search'), 'Search is primary hub')
assert(primaryBlock[1].includes('/israel-dossier'), 'Dossiers is primary hub')
assert(primaryBlock[1].includes('/profiles'), 'Profiles is primary hub')
assert(primaryBlock[1].includes('/read'), 'Read is primary hub')
assert(app.includes('Account & Trust') || app.includes('Account'), 'Account drawer section present')
assert(app.includes('Hubs') || app.includes('drawerBrowseLinks'), 'Hubs or Browse drawer structure present')
assert(app.includes("/news") || app.includes('/news'), 'News reachable in shell')
assert(app.includes("/forum") || app.includes('/forum'), 'Forum reachable in shell')

for (const route of [
  '/researcher',
  '/volume-ii',
  '/record-of-jesus-christ',
  '/bible',
  '/comprehensive-profile',
  '/membership',
]) {
  assert(app.includes(route), `shell retains ${route}`)
}

console.log(`[verify:nav-recovery] PASS — ${surfaces.length} surface needles + research/dossier families green`)
