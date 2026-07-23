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

// primaryLinks destinations exact set
for (const dest of ["'/'", "'/read'", "'/israel-dossier'", "'/profiles'", "'/search'"]) {
  assert(block.includes(`to: ${dest}`), `primaryLinks has ${dest}`)
}
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
assert(
  search.includes('to="/content-pack"') || search.includes("to: '/content-pack'") || search.includes('content-pack'),
  'Search empty includes research pack',
)
assert(
  search.includes('to="/profiles"') || search.includes("to: '/profiles'") || search.includes('/profiles'),
  'Search empty includes profiles',
)

// Soft-404 / NotFound primary hubs (RelatedHubs testId or legacy PRIMARY_HUBS)
assert(
  notFound.includes('data-testid="not-found-hub-chips"') ||
    notFound.includes('testId="not-found-hub-chips"') ||
    notFound.includes('not-found-hub-chips') ||
    notFound.includes('PRIMARY_HUBS'),
  '404 hub chips required',
)
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

// footer browseLinks destinations include primary hubs
assert(fb.includes("to: '/'") || fb.includes('to: "/"'), 'footer Record')
assert(fb.includes("to: '/read'") || fb.includes('to: "/read"'), 'footer Read')
assert(fb.includes('/israel-dossier'), 'footer Dossiers')
assert(fb.includes('/profiles'), 'footer Profiles')
assert(fb.includes('/search'), 'footer Search')
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

// Browse drawer re-homes News + Forum (no More junk)
assert(app.includes('/news') && app.includes('/forum'), 'Browse drawer News+Forum')
assert(!/label:\s*['"]More['"]/.test(app), 'No More junk drawer label')

// Dossiers hub-and-spoke: deep-state + forum mark dossiers active
assert(app.includes('/deep-state') && app.includes('/forum'), 'shell deep-state+forum')
// spokes component variants used on family pages
assert(fs.readFileSync(path.join(root, 'src/pages/IsraelDossierPage.tsx'), 'utf8').includes('DossierHubSpokes'), 'Israel mounts spokes')
assert(fs.readFileSync(path.join(root, 'src/pages/DeepStatePage.tsx'), 'utf8').includes('DossierHubSpokes'), 'DeepState mounts spokes')
assert(fs.readFileSync(path.join(root, 'src/pages/ForumPage.tsx'), 'utf8').includes('DossierHubSpokes'), 'Forum mounts spokes')

// RelatedHubs component is first-class recovery primitive
assert(fs.existsSync(path.join(root, 'src/components/RelatedHubs.tsx')), 'RelatedHubs component file')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('PRIMARY_RELATED_HUBS'), 'PRIMARY_RELATED_HUBS export')

// RelatedHubs PRIMARY destinations match primaryLinks destinations
const relatedPrimary = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
for (const dest of ["'/'", "'/read'", "'/israel-dossier'", "'/profiles'", "'/search'"]) {
  assert(relatedPrimary.includes(`to: ${dest}`) && block.includes(`to: ${dest}`), `RelatedHubs+primaryLinks share ${dest}`)
}

// Sprint 7 remaining recovery mounts
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'MediaKit primary RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('bookmarks-related-hubs'), 'Bookmarks RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'Profiles RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'Read RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfileSuccessPage.tsx'), 'utf8').includes('RelatedHubs'), 'OSINT success RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'Bernie RelatedHubs dark recovery')
const relatedTone = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedTone.includes("'dark'") || relatedTone.includes('"dark"'), 'RelatedHubs dark tone')


// Sprint 7b Search RelatedHubs platformization
const searchS7b = fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8')
assert(searchS7b.includes('RelatedHubs') && searchS7b.includes('SEARCH_RECOVERY_HUBS'), 'Search RelatedHubs platform')
assert(searchS7b.includes('search-idle-hubs') && searchS7b.includes('search-empty-hubs'), 'Search idle+empty testids')


// Sprint 7d Home underfold + soft-404 secondary
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'Home RelatedHubs underfold')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-secondary-hubs'), 'NotFound secondary RelatedHubs')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('NOT_FOUND_SECONDARY_HUBS'), 'NOT_FOUND_SECONDARY_HUBS')


// Bookmarks empty RelatedHubs platform + dual mounts
const bookmarksIa = fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8')
assert(bookmarksIa.includes('bookmarks-related-hubs') && bookmarksIa.includes('bookmarks-empty-hubs'), 'Bookmarks header+empty hubs')
assert(bookmarksIa.includes('BOOKMARKS_HUBS') && bookmarksIa.includes('RelatedHubs'), 'Bookmarks RelatedHubs platform')
assert((bookmarksIa.match(/<RelatedHubs\b/g) || []).length >= 2, 'Bookmarks dual RelatedHubs mounts')

// Search dual RelatedHubs IA
const searchIa = fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8')
assert((searchIa.match(/<RelatedHubs\b/g) || []).length >= 2, 'Search dual RelatedHubs mounts IA')
assert(searchIa.includes('SEARCH_RECOVERY_HUBS'), 'SEARCH_RECOVERY_HUBS IA')


// Bernie dark RelatedHubs IA + RelatedHubs dark tone platform
const bernieIa = fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8')
assert(bernieIa.includes('bernie-related-hubs') && bernieIa.includes('RelatedHubs'), 'Bernie RelatedHubs IA')
assert(bernieIa.includes('tone="dark"') || bernieIa.includes("tone='dark'"), 'Bernie dark tone IA')
const relatedIaTone = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedIaTone.includes("'dark'") || relatedIaTone.includes('"dark"'), 'RelatedHubs dark tone IA')
assert(relatedIaTone.includes('excludeTo'), 'RelatedHubs excludeTo IA')


// MediaKit primary RelatedHubs IA + Home underfold IA
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'MediaKit primary RelatedHubs IA')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('MEDIA_KIT_PRIMARY_HUBS'), 'MEDIA_KIT_PRIMARY_HUBS IA')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'Home underfold IA')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-hub-cta-row'), 'Home hero CTA IA')


// RelatedHubs PRIMARY five labels IA end
const relatedIaEnd = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
const plIa = relatedIaEnd.match(/PRIMARY_RELATED_HUBS[^=]*= \[([\s\S]*?)\] as const/)
assert(plIa, 'PRIMARY IA end')
for (const label of ['Record', 'Read', 'Dossiers', 'Profiles', 'Search']) {
  assert(plIa[1].includes(label), `PRIMARY IA label ${label}`)
}
assert((plIa[1].match(/to:/g) || []).length === 5, 'PRIMARY IA count 5')


// RelatedHubs tones surface parchment dark IA
const relatedTonesIa = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedTonesIa.includes('surface') && relatedTonesIa.includes('parchment') && (relatedTonesIa.includes("'dark'") || relatedTonesIa.includes('"dark"')), 'RelatedHubs three tones IA')
assert(relatedTonesIa.includes('min-h-[44px]') && relatedTonesIa.includes('no-print'), 'RelatedHubs a11y chrome IA')


// OSINT success RelatedHubs IA end
const osintIaEnd = fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfileSuccessPage.tsx'), 'utf8')
assert(osintIaEnd.includes('RelatedHubs') && osintIaEnd.includes('osint-success-related-hubs'), 'OSINT success RelatedHubs IA')
assert(osintIaEnd.includes('OSINT_SUCCESS_HUBS'), 'OSINT_SUCCESS_HUBS IA')
assert(osintIaEnd.includes('osint-success-research-pack'), 'osint pack IA')


// Search dual RelatedHubs mounts IA end
const searchDualIa = fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8')
assert((searchDualIa.match(/<RelatedHubs\b/g) || []).length >= 2, 'Search dual RelatedHubs IA end')
assert(searchDualIa.includes('SEARCH_RECOVERY_HUBS'), 'SEARCH_RECOVERY_HUBS IA end')
const bmDualIa = fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8')
assert((bmDualIa.match(/<RelatedHubs\b/g) || []).length >= 2, 'Bookmarks dual RelatedHubs IA end')
assert(bmDualIa.includes('BOOKMARKS_HUBS'), 'BOOKMARKS_HUBS IA end')


// RelatedHubs emphasizeTo IA + NotFound dual RelatedHubs
const relatedEmphIa = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedEmphIa.includes('emphasizeTo'), 'RelatedHubs emphasizeTo IA')
assert(relatedEmphIa.includes('bg-crimson'), 'RelatedHubs emphasize crimson IA')
const nfEmphIa = fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8')
assert((nfEmphIa.match(/<RelatedHubs\b/g) || []).length >= 2, 'NotFound dual RelatedHubs IA')
assert(nfEmphIa.includes('emphasizeTo="/"') || nfEmphIa.includes("emphasizeTo='/'"), 'NotFound emphasize Record IA')


// A11Y_HUBS five destinations IA
const a11yIa = fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8')
const a11yB = a11yIa.match(/const A11Y_HUBS[^=]*= \[([\s\S]*?)\]/)
assert(a11yB && (a11yB[1].match(/to:/g) || []).length === 5, 'A11Y_HUBS count 5 IA')
const osintIa = fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8')
const osintB = osintIa.match(/const OSINT_HUBS[^=]*= \[([\s\S]*?)\]/)
assert(osintB && (osintB[1].match(/to:/g) || []).length === 5, 'OSINT_HUBS count 5 IA')


// PRIVACY TERMS Membership IA
const privacyIa = fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8')
const privacyBIa = privacyIa.match(/const PRIVACY_HUBS[^=]*= \[([\s\S]*?)\]/)
assert(privacyBIa && (privacyBIa[1].match(/to:/g) || []).length === 5, 'PRIVACY_HUBS count 5 IA')
assert(privacyBIa[1].includes('/membership'), 'PRIVACY Membership IA')
const termsIa = fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8')
const termsBIa = termsIa.match(/const TERMS_HUBS[^=]*= \[([\s\S]*?)\]/)
assert(termsBIa && (termsBIa[1].match(/to:/g) || []).length === 5, 'TERMS_HUBS count 5 IA')
assert(termsBIa[1].includes('/membership'), 'TERMS Membership IA')


// RelatedHubs platform complete IA sentinel
const relatedPlatIa = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedPlatIa.includes('PRIMARY_RELATED_HUBS') && relatedPlatIa.includes('emphasizeTo'), 'RelatedHubs platform complete IA')
assert(relatedPlatIa.includes("'dark'") || relatedPlatIa.includes('"dark"'), 'RelatedHubs dark IA complete')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'soft-404 primary RelatedHubs IA complete')


// Account recovery five matrix IA ultimate
for (const [file, constName] of [
  ['AccessibilityPage.tsx', 'A11Y_HUBS'],
  ['ComprehensiveProfilePage.tsx', 'OSINT_HUBS'],
  ['PrivacyPage.tsx', 'PRIVACY_HUBS'],
  ['TermsPage.tsx', 'TERMS_HUBS'],
]) {
  const src = fs.readFileSync(path.join(root, 'src/pages', file), 'utf8')
  const b = src.match(new RegExp(`const ${constName}[^=]*= \\[([\\s\\S]*?)\\]`))
  assert(b && (b[1].match(/to:/g) || []).length === 5, `${constName} count 5 IA ultimate`)
}


// Account five-hub live lock IA
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'A11Y Membership IA live lock')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'OSINT Dossiers IA live lock')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'Privacy Membership IA live lock')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'Terms Membership IA live lock')


// full RelatedHubs platform final IA sentinel
const platFinalIa = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(platFinalIa.includes('emphasizeTo') && platFinalIa.includes('PRIMARY_RELATED_HUBS'), 'platform final IA')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('emphasizeTo="/"') || fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes("emphasizeTo='/'"), 'soft-404 emphasize final IA')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'Privacy Membership final IA')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'Terms Membership final IA')


// RelatedHubs boil-complete IA green
const boilIa = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(boilIa.includes('PRIMARY_RELATED_HUBS') && boilIa.includes('emphasizeTo'), 'boil IA platform')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'boil IA Privacy Membership')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'boil IA Terms Membership')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'boil IA A11Y Membership')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'boil IA OSINT Dossiers')


// all product live IA celebration lock
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'live IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'live IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'live IA Privacy Membership')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'live IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'live IA search')


// RelatedHubs perpetual densify lock v2 IA
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v2 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v2 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v2 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v2 IA emphasize')


// RelatedHubs perpetual densify lock v3 IA
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v3 IA soft-404 primary')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-secondary-hubs'), 'perpetual v3 IA soft-404 secondary')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v3 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v3 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v3 IA Privacy Membership')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v3 IA emphasize')


// RelatedHubs perpetual densify lock v4 IA
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v4 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v4 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v4 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v4 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v4 IA emphasize')


// RelatedHubs perpetual densify lock v5 IA
const relatedV5Ia = fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8')
assert(relatedV5Ia.includes('PRIMARY_RELATED_HUBS') && relatedV5Ia.includes('emphasizeTo'), 'perpetual v5 IA platform')
assert(relatedV5Ia.includes('excludeTo') && relatedV5Ia.includes('min-h-[44px]'), 'perpetual v5 IA a11y')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v5 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v5 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v5 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v5 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v5 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v5 IA read')


// RelatedHubs perpetual densify lock v6 IA
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v6 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v6 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v6 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v6 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v6 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v6 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v6 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v6 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v6 IA read')


// RelatedHubs perpetual densify lock v7 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v7 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('PRIMARY_RELATED_HUBS'), 'perpetual v7 IA PRIMARY')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v7 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v7 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v7 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v7 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v7 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v7 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v7 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v7 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v7 IA read')


// RelatedHubs perpetual densify lock v8 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v8 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v8 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v8 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v8 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v8 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v8 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v8 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v8 IA Privacy')


// RelatedHubs perpetual densify lock v9 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v9 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v9 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v9 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v9 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v9 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v9 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v9 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v9 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v9 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v9 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v9 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v9 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v9 IA read')


// RelatedHubs perpetual densify lock v10 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v10 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v10 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v10 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v10 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v10 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v10 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v10 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v10 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v10 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v10 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v10 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v10 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v10 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v10 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v10 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v10 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v10 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v10 IA OSINT')


// RelatedHubs perpetual densify lock v11 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v11 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v11 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v11 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v11 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v11 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v11 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v11 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v11 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v11 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v11 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v11 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v11 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v11 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v11 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v11 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v11 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v11 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v11 IA OSINT')


// RelatedHubs perpetual densify lock v12 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v12 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v12 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v12 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v12 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v12 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v12 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v12 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v12 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v12 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v12 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v12 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v12 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v12 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v12 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v12 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v12 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v12 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v12 IA OSINT')


// RelatedHubs perpetual densify lock v13 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v13 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v13 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v13 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v13 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v13 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v13 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v13 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v13 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v13 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v13 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v13 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v13 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v13 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v13 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v13 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v13 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v13 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v13 IA OSINT')


// RelatedHubs perpetual densify lock v14 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v14 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v14 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v14 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v14 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v14 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v14 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v14 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v14 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v14 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v14 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v14 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v14 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v14 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v14 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v14 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v14 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v14 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v14 IA OSINT')



// RelatedHubs perpetual densify lock v15 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v15 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v15 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v15 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v15 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v15 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v15 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v15 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v15 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v15 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v15 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v15 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v15 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v15 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v15 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v15 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v15 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v15 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v15 IA OSINT')



// RelatedHubs perpetual densify lock v16 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v16 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v16 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v16 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v16 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v16 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v16 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v16 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v16 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v16 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v16 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v16 IA Terms')
assert(fs.readFileSync(path.join(root, 'src/pages/BookmarksPage.tsx'), 'utf8').includes('BOOKMARKS_HUBS'), 'perpetual v16 IA bookmarks')
assert(fs.readFileSync(path.join(root, 'src/pages/BernieShowPage.tsx'), 'utf8').includes('bernie-related-hubs'), 'perpetual v16 IA bernie')
assert(fs.readFileSync(path.join(root, 'src/pages/MediaKitPage.tsx'), 'utf8').includes('media-kit-primary-hubs'), 'perpetual v16 IA media-kit')
assert(fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8').includes('profiles-related-hubs'), 'perpetual v16 IA profiles')
assert(fs.readFileSync(path.join(root, 'src/pages/ReadTheBookPage.tsx'), 'utf8').includes('read-related-hubs'), 'perpetual v16 IA read')
assert(fs.readFileSync(path.join(root, 'src/pages/AccessibilityPage.tsx'), 'utf8').includes('/membership'), 'perpetual v16 IA A11Y')
assert(fs.readFileSync(path.join(root, 'src/pages/ComprehensiveProfilePage.tsx'), 'utf8').includes('/israel-dossier'), 'perpetual v16 IA OSINT')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v16 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v16 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v16 IA sources')



// RelatedHubs perpetual densify lock v17 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v17 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v17 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v17 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v17 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v17 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v17 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v17 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('DOSSIER_SPOKES'), 'perpetual v17 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('excludePath'), 'perpetual v17 IA research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v17 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v17 IA search')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v17 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v17 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v17 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v17 IA sources')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v17 IA coverage suite')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v17 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/PrivacyPage.tsx'), 'utf8').includes('/membership'), 'perpetual v17 IA Privacy')
assert(fs.readFileSync(path.join(root, 'src/pages/TermsPage.tsx'), 'utf8').includes('/membership'), 'perpetual v17 IA Terms')



// RelatedHubs perpetual densify lock v18 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v18 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v18 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v18 IA footer focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('desktopPrimaryLinkClass'), 'perpetual v18 IA desktop primary')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v18 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v18 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v18 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v18 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v18 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v18 IA cookie focus')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v18 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v18 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v18 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v18 IA sources')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v18 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v18 IA pure wire')



// RelatedHubs perpetual densify lock v19 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v19 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v19 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v19 IA footer focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('desktopPrimaryLinkClass'), 'perpetual v19 IA desktop primary')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v19 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v19 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA cookie focus')
assert(fs.readFileSync(path.join(root, 'src/components/StickyMembershipBar.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA sticky membership')
assert(fs.readFileSync(path.join(root, 'src/components/ExitIntentCapture.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA exit intent')
assert(fs.readFileSync(path.join(root, 'src/components/AuthModal.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v19 IA auth modal')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v19 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v19 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v19 IA sources')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v19 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v19 IA pure wire')



// RelatedHubs perpetual densify lock v20 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v20 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v20 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v20 IA footer focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('desktopPrimaryLinkClass'), 'perpetual v20 IA desktop primary')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v20 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v20 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA cookie focus')
assert(fs.readFileSync(path.join(root, 'src/components/StickyMembershipBar.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA sticky membership')
assert(fs.readFileSync(path.join(root, 'src/components/ExitIntentCapture.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA exit intent')
assert(fs.readFileSync(path.join(root, 'src/components/AuthModal.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA auth modal')
assert(fs.readFileSync(path.join(root, 'src/components/NewsletterSignup.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA newsletter')
assert(fs.readFileSync(path.join(root, 'src/components/SharePanel.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA share panel')
assert(fs.readFileSync(path.join(root, 'src/components/CorrectionsCTA.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v20 IA corrections')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v20 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v20 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v20 IA sources')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v20 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v20 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v20 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v20 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v20 IA search')



// RelatedHubs perpetual densify lock v21 IA
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v21 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v21 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v21 IA footer focus')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v21 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v21 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/components/BookmarkButton.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA bookmark')
assert(fs.readFileSync(path.join(root, 'src/components/institute/InstituteLayout.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA institute layout')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v21 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v21 IA methodology')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v21 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v21 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v21 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v21 IA home')
assert(fs.readFileSync(path.join(root, 'src/components/SharePanel.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA share')
assert(fs.readFileSync(path.join(root, 'src/components/AuthModal.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA auth')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v21 IA cookie')



// RelatedHubs perpetual densify lock v22 IA
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('aria-current'), 'perpetual v22 IA RelatedHubs aria-current')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('useLocation'), 'perpetual v22 IA RelatedHubs useLocation')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v22 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v22 IA RelatedHubs focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v22 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v22 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v22 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v22 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v22 IA methodology')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v22 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v22 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v22 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v22 IA home')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v22 IA Research chips focus')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v22 IA spokes focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v22 IA footer focus')



// RelatedHubs perpetual densify lock v23 IA
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('activeChip'), 'perpetual v23 IA activeChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('darkActiveChip'), 'perpetual v23 IA darkActiveChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('aria-current'), 'perpetual v23 IA aria-current')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('useLocation'), 'perpetual v23 IA useLocation')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes("tone === 'parchment'"), 'perpetual v23 IA parchment')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v23 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v23 IA focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v23 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v23 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v23 IA institute')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v23 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v23 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v23 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v23 IA home')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v23 IA Research chips')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v23 IA footer focus')



// RelatedHubs perpetual densify lock v24 IA
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('activeChip'), 'perpetual v24 IA activeChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('darkActiveChip'), 'perpetual v24 IA darkActiveChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('aria-current'), 'perpetual v24 IA aria-current')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('useLocation'), 'perpetual v24 IA useLocation')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes("tone === 'parchment'"), 'perpetual v24 IA parchment')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v24 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('PRIMARY_RELATED_HUBS'), 'perpetual v24 IA PRIMARY')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v24 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v24 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v24 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v24 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v24 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v24 IA sources')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v24 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v24 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v24 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v24 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v24 IA search')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA Research chips')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v24 IA footer focus')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA cookie')
assert(fs.readFileSync(path.join(root, 'src/components/SharePanel.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA share')
assert(fs.readFileSync(path.join(root, 'src/components/AuthModal.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA auth')
assert(fs.readFileSync(path.join(root, 'src/components/BookmarkButton.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v24 IA bookmark')



// RelatedHubs perpetual densify lock v25 IA
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('activeChip'), 'perpetual v25 IA activeChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('darkActiveChip'), 'perpetual v25 IA darkActiveChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('aria-current'), 'perpetual v25 IA aria-current')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('useLocation'), 'perpetual v25 IA useLocation')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes("tone === 'parchment'"), 'perpetual v25 IA parchment')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v25 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('PRIMARY_RELATED_HUBS'), 'perpetual v25 IA PRIMARY')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA focus')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v25 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('primaryLinks'), 'perpetual v25 IA primaryLinks')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v25 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v25 IA institute')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v25 IA methodology')
assert(fs.readFileSync(path.join(root, 'src/pages/SourcesPage.tsx'), 'utf8').includes('sources-related-hubs'), 'perpetual v25 IA sources')
assert(fs.readFileSync(path.join(root, 'src/pages/ResearcherHubPage.tsx'), 'utf8').includes('researcher-related-hubs'), 'perpetual v25 IA researcher')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v25 IA coverage')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v25 IA pure wire')
assert(fs.readFileSync(path.join(root, 'package.json'), 'utf8').includes('verify:related-hubs-coverage'), 'perpetual v25 IA package script')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v25 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v25 IA home')
assert(fs.readFileSync(path.join(root, 'src/pages/SearchPage.tsx'), 'utf8').includes('SEARCH_RECOVERY_HUBS'), 'perpetual v25 IA search')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA Research chips')
assert(fs.readFileSync(path.join(root, 'src/components/DossierHubSpokes.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA spokes')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v25 IA footer focus')
assert(fs.readFileSync(path.join(root, 'src/components/CookieConsent.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA cookie')
assert(fs.readFileSync(path.join(root, 'src/components/SharePanel.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA share')
assert(fs.readFileSync(path.join(root, 'src/components/AuthModal.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA auth')
assert(fs.readFileSync(path.join(root, 'src/components/BookmarkButton.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA bookmark')
assert(fs.readFileSync(path.join(root, 'src/components/NewsletterSignup.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA newsletter')
assert(fs.readFileSync(path.join(root, 'src/components/StickyMembershipBar.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA sticky membership')
assert(fs.readFileSync(path.join(root, 'src/components/institute/InstituteLayout.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v25 IA institute layout')



// RelatedHubs perpetual densify lock v26 IA
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('activeChip'), 'perpetual v26 IA activeChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('darkActiveChip'), 'perpetual v26 IA darkActiveChip')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('aria-current'), 'perpetual v26 IA aria-current')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes("tone === 'parchment'"), 'perpetual v26 IA parchment')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('mobile-tab-bar'), 'perpetual v26 IA mobile tab bar')
assert(fs.readFileSync(path.join(root, 'server.js'), 'utf8').includes('server-soft-404'), 'perpetual v26 IA server soft-404')
assert(fs.readFileSync(path.join(root, 'src/pages/InstitutePage.tsx'), 'utf8').includes('institute-related-hubs'), 'perpetual v26 IA institute')
assert(fs.readFileSync(path.join(root, 'scripts/verify-related-hubs-coverage.mjs'), 'utf8').includes('related-hubs-coverage'), 'perpetual v26 IA coverage')
assert(fs.readFileSync(path.join(root, 'src/pages/NotFoundPage.tsx'), 'utf8').includes('not-found-hub-chips'), 'perpetual v26 IA soft-404')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('emphasizeTo'), 'perpetual v26 IA emphasize')
assert(fs.readFileSync(path.join(root, 'src/components/RelatedHubs.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v26 IA focus')
assert(fs.readFileSync(path.join(root, 'src/pages/HomePage.tsx'), 'utf8').includes('home-related-hubs'), 'perpetual v26 IA home')
assert(fs.readFileSync(path.join(root, 'scripts/verify-pure.mjs'), 'utf8').includes('verify-related-hubs-coverage.mjs'), 'perpetual v26 IA pure wire')
assert(fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8').includes('focus-visible:ring-offset-obsidian'), 'perpetual v26 IA footer')
assert(fs.readFileSync(path.join(root, 'src/components/ResearchHubChips.tsx'), 'utf8').includes('focus-visible:ring-2'), 'perpetual v26 IA Research chips')
assert(fs.readFileSync(path.join(root, 'src/pages/MethodologyPage.tsx'), 'utf8').includes('methodology-related-hubs'), 'perpetual v26 IA methodology')

console.log(
  `[verify:nav-ia] PASS — primary hubs=${toCount}, mobile tab bar, Browse re-homes, dossier spokes, research chips, footer hub order, read TOC parts, recovery hubs across Browse/Research/Account/legal, soft-404, cookie z-order`,
)
