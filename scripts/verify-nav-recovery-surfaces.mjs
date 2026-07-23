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
  ['src/App.tsx', 'mobile-tab-bar'],
  ['src/App.tsx', 'primaryLinks'],
]

for (const [rel, needle] of surfaces) {
  assert(read(rel).includes(needle), `${rel} must include ${needle}`)
}

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

console.log(`[verify:nav-recovery] PASS — ${surfaces.length} surface needles + research/dossier families green`)
