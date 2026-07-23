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
assert(toCount === 5, `primaryLinks must be exactly 5 hubs; got ${toCount}`)
// primaryLinks short labels for Hick scent + mobile tab parity
assert(block.includes('Record') || block.includes('The Record'), 'primary label Record')
assert(block.includes('Read'), 'primary label Read')
assert(block.includes('Dossiers') || block.includes('Dossier'), 'primary label Dossiers')
assert(block.includes('Profiles') || block.includes('Profile'), 'primary label Profiles')
assert(block.includes('Search'), 'primary label Search')
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
assert(search.includes('data-testid="search-idle-hubs"') || search.includes('search-idle-state'), 'Search idle hub destinations required')
assert(search.includes('to="/content-pack"'), 'Search empty includes research pack')
assert(search.includes('to="/profiles"'), 'Search empty includes profiles')

// Soft-404 / NotFound primary hubs (inline PRIMARY_HUBS or shared PRIMARY_RELATED_HUBS)
assert(notFound.includes('data-testid="not-found-hub-chips"') || notFound.includes('PRIMARY_HUBS'), '404 hub chips required')
const notFoundHubsSrc = notFound.includes('PRIMARY_RELATED_HUBS')
  ? fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
  : notFound
assert(notFoundHubsSrc.includes("to: '/'") || notFoundHubsSrc.includes('to: "/"') || notFoundHubsSrc.includes('to="/"'), '404 Record hub')
assert(notFoundHubsSrc.includes('/israel-dossier'), '404 Dossiers hub')
assert(notFoundHubsSrc.includes('/search'), '404 Search hub')
assert(notFoundHubsSrc.includes('/profiles'), '404 Profiles hub')
assert(notFoundHubsSrc.includes('/read'), '404 Read hub')
const hubBlock =
  notFound.match(/PRIMARY_HUBS = \[([\s\S]*?)\] as const/) ||
  (notFound.includes('PRIMARY_RELATED_HUBS')
    ? fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').match(/PRIMARY_RELATED_HUBS[^=]*= \[([\s\S]*?)\] as const/)
    : null)
assert(hubBlock, 'PRIMARY_HUBS or PRIMARY_RELATED_HUBS const')
const hubCount = (hubBlock[1].match(/to:/g) || []).length
assert(hubCount === 5, `PRIMARY hubs must be exactly 5; got ${hubCount}`)
assert(notFound.includes("robots: 'noindex, nofollow'") || notFound.includes('noindex'), '404 must stay noindex')

// Server soft-404 HTML also exposes ≤5 primary hubs (no-JS / crawler recovery)
const server = fs.readFileSync(path.join(root, 'server.js'), 'utf8')
assert(server.includes('function buildNotFoundHtml'), 'server soft-404 HTML builder required')
assert(server.includes('data-testid="server-soft-404"') || server.includes('aria-label="Primary hubs"'), 'server soft-404 hub nav required')
assert(server.includes('href="/israel-dossier"'), 'server soft-404 Dossiers hub')
assert(server.includes('href="/profiles"'), 'server soft-404 Profiles hub')
assert(server.includes('href="/search"'), 'server soft-404 Search hub')
assert(server.includes('href="/read"'), 'server soft-404 Read hub')

// Cookie consent z-index above tab bar
assert(cookie.includes('z-[100]') || cookie.includes('z-\\[100\\]'), 'Cookie consent z-100 above tab bar')
assert(cookie.includes('data-z-above-tab-bar') || cookie.includes('z-[100]'), 'Cookie/tab z-index contract')
assert(membership.includes('bottom-[calc(3.75rem') || membership.includes('bottom-[calc(3.75rem+env(safe-area-inset-bottom))]'), 'Membership bar sits above mobile tab bar')

// Sprint 3: Research hub chips + footer hub order + dossiers tooltip + bookmarks News
const researchChips = fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8')
const methodology = fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8')
const sources = fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8')
const bookmarks = fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8')
assert(researchChips.includes('data-testid="research-hub-chips"'), 'ResearchHubChips testid required')
assert(methodology.includes('ResearchHubChips'), 'Methodology mounts research chips')
assert(sources.includes('ResearchHubChips'), 'Sources mounts research chips')
const researcher = fs.readFileSync(path.join(root, 'src/pages/ResearcherHubPage.tsx'), 'utf8')
const contentPack = fs.readFileSync(path.join(root, 'src/pages/ContentPackPage.tsx'), 'utf8')
assert(researcher.includes('ResearchHubChips'), 'Researcher hub mounts research chips')
assert(contentPack.includes('ResearchHubChips'), 'Content pack mounts research chips')
assert(app.includes("title: 'Israel · Deep State · Forum'") || app.includes('Israel · Deep State · Forum'), 'Dossiers tooltip scent')
assert(app.includes('Home · The Record archive') || app.includes("title: 'Home"), 'Record hub tooltip')
assert(app.includes('Power Profiles · integrity dockets') || app.includes('integrity dockets'), 'Profiles hub tooltip')
assert(app.includes('Search chapters, profiles, sources, dossiers') || app.includes('Search chapters'), 'Search hub tooltip')
assert(app.includes('title={link.title}') || app.includes('title={tab.title}'), 'ShellLink title prop must pass to Link')
assert(app.includes('title={tab.title}'), 'MobileTabBar must pass tab.title')

// Footer browseLinks: Record before Read before Dossiers before Profiles before Search
const footerBlock = app.match(/const browseLinks: ShellLink\[\] = \[([\s\S]*?)\]/)
assert(footerBlock, 'footer browseLinks required')
const fb = footerBlock[1]
const idxRecord = fb.indexOf("to: '/'")
const idxRead = fb.indexOf("to: '/read'")
const idxDossiers = fb.indexOf("to: '/israel-dossier'")
const idxProfiles = fb.indexOf("to: '/profiles'")
const idxSearch = fb.indexOf("to: '/search'")
assert(idxRecord >= 0 && idxRead > idxRecord, 'footer: Record then Read')
assert(idxDossiers > idxRead, 'footer: Dossiers after Read (hub order)')
assert(idxProfiles > idxDossiers, 'footer: Profiles after Dossiers')
assert(idxSearch > idxProfiles, 'footer: Search after Profiles')
assert(bookmarks.includes('to="/news"') || bookmarks.includes("to: '/news'"), 'Bookmarks empty includes News')
assert(search.includes('chapters, profiles, sources, dossiers') || search.includes('placeholder='), 'Search placeholder improved')

// Read hub TOC part grouping
const readPage = fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8')
assert(readPage.includes('groupChaptersByPart') || readPage.includes('data-testid="read-toc-by-part"'), 'Read TOC grouped by part')
assert(readPage.includes('Part I') || readPage.includes('Front matter'), 'Read TOC part labels present')

// Profiles hub strip recovery
const profiles = fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8')
assert(profiles.includes('to="/search"') || profiles.includes("to: '/search'"), 'Profiles strip links Search')
assert(profiles.includes('to="/israel-dossier"'), 'Profiles strip links Dossiers')

/** RelatedHubs may use data-testid= (inline) or testId= (shared component prop). */
function hasHubTestId(src, id) {
  return src.includes(`data-testid="${id}"`) || src.includes(`testId="${id}"`)
}
function hasTo(src, pathStr) {
  return src.includes(`to="${pathStr}"`) || src.includes(`to: '${pathStr}'`) || src.includes(`to: "${pathStr}"`)
}

// Timeline related hubs (Browse ↔ Read scent)
const timeline = fs.readFileSync(path.join(root, 'src/pages/TimelinePage.tsx'), 'utf8')
assert(hasHubTestId(timeline, 'timeline-related-hubs'), 'Timeline related hubs required')
assert(hasTo(timeline, '/read'), 'Timeline links Read hub')
assert(timeline.includes('RelatedHubs'), 'Timeline mounts RelatedHubs')

// News desk related hubs (Browse secondary)
const news = fs.readFileSync(path.join(root, 'src/pages/NewsPage.tsx'), 'utf8')
assert(hasHubTestId(news, 'news-related-hubs'), 'News related hubs required')
assert(hasTo(news, '/forum'), 'News links Forum')
assert(news.includes('RelatedHubs'), 'News mounts RelatedHubs')

// Topics related hubs
const topics = fs.readFileSync(path.join(root, 'src/pages/TopicsIndexPage.tsx'), 'utf8')
assert(hasHubTestId(topics, 'topics-related-hubs'), 'Topics related hubs required')
assert(hasTo(topics, '/profiles'), 'Topics links Profiles')
assert(topics.includes('RelatedHubs'), 'Topics mounts RelatedHubs')

// Institute mounts research chips
const institute = fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8')
assert(institute.includes('ResearchHubChips'), 'Institute mounts research chips')

// About + Media Kit recovery
const about = fs.readFileSync(path.join(root, 'src/pages/AboutPage.tsx'), 'utf8')
const mediaKit = fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8')
assert(hasHubTestId(about, 'about-related-hubs'), 'About related hubs required')
assert(about.includes('RelatedHubs'), 'About mounts RelatedHubs')
assert(mediaKit.includes('data-testid="media-kit-related-hubs"') || mediaKit.includes('to="/content-pack"'), 'Media Kit links content packs')
const a11yPage = fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8')
const membershipPage = fs.readFileSync(path.join(root, 'src/pages/MembershipPage.tsx'), 'utf8')
assert(hasHubTestId(a11yPage, 'accessibility-related-hubs'), 'Accessibility related hubs')
assert(hasHubTestId(membershipPage, 'membership-related-hubs'), 'Membership related hubs')
const privacy = fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8')
const terms = fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8')
assert(hasHubTestId(privacy, 'privacy-related-hubs'), 'Privacy related hubs')
assert(hasHubTestId(terms, 'terms-related-hubs'), 'Terms related hubs')
const analytics = fs.readFileSync(path.join(root, 'src/pages/AnalyticsPage.tsx'), 'utf8')
assert(hasHubTestId(analytics, 'analytics-related-hubs'), 'Analytics related hubs')
const osint = fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8')
assert(hasHubTestId(osint, 'osint-related-hubs'), 'OSINT product related hubs')
const volumeIi = fs.readFileSync(path.join(root, 'src/pages/VolumeIIHubPage.tsx'), 'utf8')
assert(volumeIi.includes('ResearchHubChips'), 'Volume II mounts research chips')
const bible = fs.readFileSync(path.join(root, 'src/pages/BibleHistoryPage.tsx'), 'utf8')
const roc = fs.readFileSync(path.join(root, 'src/pages/RecordOfJesusChristPage.tsx'), 'utf8')
assert(bible.includes('ResearchHubChips'), 'Bible history mounts research chips')
assert(roc.includes('ResearchHubChips'), 'ROC mounts research chips')
const personalTl = fs.readFileSync(path.join(root, 'src/pages/PersonalTimelinePage.tsx'), 'utf8')
assert(personalTl.includes('ResearchHubChips'), 'Personal timeline mounts research chips')
const instMeth = fs.readFileSync(path.join(root, 'src/pages/InstituteMethodologyPage.tsx'), 'utf8')
const instBook = fs.readFileSync(path.join(root, 'src/pages/InstituteBookPage.tsx'), 'utf8')
assert(instMeth.includes('ResearchHubChips'), 'Institute methodology mounts research chips')
assert(instBook.includes('ResearchHubChips'), 'Institute book mounts research chips')


// RelatedHubs PRIMARY destinations match shell primaryLinks
const relatedHubsFile = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
for (const dest of ["'/'", "'/read'", "'/israel-dossier'", "'/profiles'", "'/search'"]) {
  assert(relatedHubsFile.includes(`to: ${dest}`), `RelatedHubs has ${dest}`)
}


// MobileTabBar destinations mirror primaryLinks ≤5
const tabBarBody = app.split('function MobileTabBar')[1]?.split('function Footer')[0] || ''
assert(tabBarBody.includes('/read') && tabBarBody.includes('/search'), 'MobileTabBar has Read+Search')
assert(tabBarBody.includes('/israel-dossier') && tabBarBody.includes('/profiles'), 'MobileTabBar has Dossiers+Profiles')
assert(tabBarBody.includes("to: '/'") || tabBarBody.includes('to: "/"') || tabBarBody.includes("to: '/'") || tabBarBody.includes("to={'/'}") || tabBarBody.includes('to="/"') || tabBarBody.includes("to: '/'") || /to:\s*['"]\/['"]/.test(tabBarBody) || tabBarBody.includes("to: '/'"), 'MobileTabBar has Record')
// more reliable: count to: in tab bar data
const tabTos = (tabBarBody.match(/to:\s*['"][^'"]+['"]/g) || [])
assert(tabTos.length >= 5, `MobileTabBar destinations ${tabTos.length} < 5`)


// Account drawer retains Membership + legal without expanding primary hubs
assert(app.includes('/membership'), 'shell retains Membership')
assert(app.includes('/privacy') && app.includes('/terms'), 'shell retains Privacy+Terms')
assert(app.includes('/about'), 'shell retains About')

// Research drawer retains methodology/sources/pack without primary expansion
assert(app.includes('/methodology') && app.includes('/sources'), 'shell retains Methodology+Sources')
assert(app.includes('/content-pack') || app.includes('/researcher'), 'shell retains pack or researcher')
console.log(
  `[verify:nav-ia] PASS — primary hubs=${toCount}, mobile tab bar, Browse re-homes, dossier spokes, research chips, footer hub order, read TOC parts, recovery hubs across Browse/Research/Account/legal, soft-404, cookie z-order`,
)
