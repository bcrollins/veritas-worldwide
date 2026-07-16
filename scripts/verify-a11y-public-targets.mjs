#!/usr/bin/env node
/**
 * Static regression floor for public 44px touch targets.
 * Scans critical source files for min-h-[44px] (or min-h-11) presence counts
 * so a11y waves cannot silently regress without failing verify:live.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** @type {Array<{ path: string, min: number, label: string }>} */
const floors = [
  { path: 'src/pages/ChapterPage.tsx', min: 11, label: 'chapter actions/nav' },
  { path: 'src/pages/HomePage.tsx', min: 11, label: 'home CTAs' },
  { path: 'src/pages/ForumPage.tsx', min: 50, label: 'forum votes/actions' },
  { path: 'src/pages/IsraelDossierPage.tsx', min: 22, label: 'dossier source anchors' },
  { path: 'src/pages/IsraelDossierBriefingPage.tsx', min: 7, label: 'dossier briefing sections' },
  { path: 'src/pages/ProfilesIndexPage.tsx', min: 5, label: 'profiles index filters' },
  { path: 'src/pages/InstitutePage.tsx', min: 2, label: 'institute catalog filters' },
  { path: 'src/pages/SourcesPage.tsx', min: 17, label: 'sources library filters' },
  { path: 'src/pages/DeepStatePage.tsx', min: 13, label: 'deep-state controls' },
  { path: 'src/pages/BibleHistoryPage.tsx', min: 11, label: 'bible-history sidebar' },
  { path: 'src/pages/SearchPage.tsx', min: 4, label: 'search chips' },
  { path: 'src/pages/MembershipPage.tsx', min: 8, label: 'membership CTAs' },
  { path: 'src/pages/TimelinePage.tsx', min: 4, label: 'timeline filters' },
  { path: 'src/components/AuthModal.tsx', min: 6, label: 'auth modal' },
  { path: 'src/components/CookieConsent.tsx', min: 4, label: 'cookie consent' },
  { path: 'src/components/LanguageSelector.tsx', min: 6, label: 'language picker' },
  { path: 'src/components/SharePanel.tsx', min: 5, label: 'share panel' },
  { path: 'src/components/CitationGenerator.tsx', min: 3, label: 'citation generator' },
  { path: 'src/components/CommunityForum.tsx', min: 7, label: 'community forum votes' },
  { path: 'src/components/Breadcrumb.tsx', min: 1, label: 'breadcrumb' },
  { path: 'src/components/ErrorBoundary.tsx', min: 2, label: 'error recovery' },
  { path: 'src/components/DossierCarousel.tsx', min: 4, label: 'dossier carousel downloads' },
  { path: 'src/pages/ReadTheBookPage.tsx', min: 16, label: 'read reader chrome' },
  { path: 'src/pages/AboutPage.tsx', min: 7, label: 'about key routes' },
  { path: 'src/pages/ProfilePage.tsx', min: 12, label: 'profile sources/nav' },
  { path: 'src/pages/admin/AdminLayout.tsx', min: 4, label: 'admin shell nav' },
  { path: 'src/components/RecordTabs.tsx', min: 3, label: 'record section tabs' },
  { path: 'src/pages/admin/AdminMedia.tsx', min: 3, label: 'admin media controls' },
  { path: 'src/pages/admin/AdminContent.tsx', min: 3, label: 'admin content tabs' },
  { path: 'src/pages/admin/AdminDashboard.tsx', min: 8, label: 'admin dashboard CTAs' },
  { path: 'src/pages/admin/AdminSocialPacks.tsx', min: 3, label: 'admin social packs' },
  { path: 'src/pages/admin/AdminSocialHub.tsx', min: 1, label: 'admin social hub tabs' },
  { path: 'src/pages/admin/AdminUsers.tsx', min: 2, label: 'admin users' },
  { path: 'src/pages/admin/AdminSubscriptions.tsx', min: 2, label: 'admin subscriptions' },
  { path: 'src/pages/admin/AdminLoginPage.tsx', min: 3, label: 'admin login form' },
  { path: 'src/pages/admin/AdminDisputes.tsx', min: 2, label: 'admin disputes' },
  { path: 'src/pages/AccessibilityPage.tsx', min: 9, label: 'accessibility trust page' },
  { path: 'src/pages/AnalyticsPage.tsx', min: 3, label: 'analytics refresh' },
  { path: 'src/pages/TermsPage.tsx', min: 8, label: 'terms sidebar' },
  { path: 'src/pages/PrivacyPage.tsx', min: 7, label: 'privacy sidebar' },
  { path: 'src/pages/BookmarksPage.tsx', min: 11, label: 'bookmarks shell' },
  { path: 'src/pages/TimelinePage.tsx', min: 8, label: 'timeline shell' },
  { path: 'src/App.tsx', min: 24, label: 'site shell header/nav/footer' },
  { path: 'src/pages/TopicPage.tsx', min: 5, label: 'topic hub breadcrumbs' },
  { path: 'src/pages/ArticlePage.tsx', min: 5, label: 'article news chrome' },
  { path: 'src/pages/NewsPage.tsx', min: 7, label: 'news desk CTAs' },
  { path: 'src/pages/SearchPage.tsx', min: 16, label: 'search filters/sidebar' },
  { path: 'src/components/institute/InstituteLayout.tsx', min: 10, label: 'institute footer nav' },
  { path: 'src/pages/SubscribeSuccessPage.tsx', min: 3, label: 'subscribe success CTAs' },
  { path: 'src/components/AipacDiagram.tsx', min: 8, label: 'AIPAC map controls' },
  { path: 'src/pages/BernieShowPage.tsx', min: 5, label: 'Bernie show controls' },
  { path: 'src/pages/ContentPackPage.tsx', min: 11, label: 'content pack downloads' },
  { path: 'src/pages/MethodologyPage.tsx', min: 12, label: 'methodology trust CTAs' },
  { path: 'src/components/DownloadModal.tsx', min: 6, label: 'download modal controls' },
  { path: 'src/components/DonationBanner.tsx', min: 4, label: 'donation banner CTAs' },
  { path: 'src/components/DisputeStory.tsx', min: 5, label: 'dispute form fields' },
  { path: 'src/components/ContentGate.tsx', min: 3, label: 'content gate subscribe' },
  { path: 'src/components/ExitIntentCapture.tsx', min: 3, label: 'exit-intent capture' },
  { path: 'src/components/NewsletterSignup.tsx', min: 2, label: 'newsletter signup' },
  { path: 'src/pages/InstituteCoursePage.tsx', min: 3, label: 'institute course chrome' },
  { path: 'src/pages/InstituteGuidePage.tsx', min: 3, label: 'institute guide chrome' },
  { path: 'src/pages/TopicsIndexPage.tsx', min: 1, label: 'topics index' },
  { path: 'src/components/StickyMembershipBar.tsx', min: 2, label: 'sticky membership bar' },
  { path: 'src/components/TextSelectionShare.tsx', min: 2, label: 'text selection share' },
  { path: 'src/components/BackToTop.tsx', min: 1, label: 'back to top' },
  { path: 'src/components/BookmarkButton.tsx', min: 1, label: 'bookmark button' },
  { path: 'src/components/ContinueReading.tsx', min: 1, label: 'continue reading' },
  { path: 'src/components/FontSizeToggle.tsx', min: 1, label: 'font size toggle' },
  { path: 'src/styles/index.css', min: 1, label: 'institute-button min-height 44' },
]

const TARGET_RE = /min-h-\[44px\]|min-h-11|min-height:\s*44px/g

let failures = 0
const results = []

for (const floor of floors) {
  const abs = join(root, floor.path)
  let src
  try {
    src = readFileSync(abs, 'utf8')
  } catch {
    console.error(`[verify:a11y-public-targets] FAIL — missing ${floor.path}`)
    failures++
    continue
  }
  const count = (src.match(TARGET_RE) || []).length
  results.push({ ...floor, count })
  if (count < floor.min) {
    console.error(
      `[verify:a11y-public-targets] FAIL — ${floor.label} (${floor.path}): ${count} < floor ${floor.min}`,
    )
    failures++
  }
}


// Ban residual p-0.5 icon buttons on high-traffic public surfaces
const banFiles = [
  'src/pages/ForumPage.tsx',
  'src/pages/ChapterPage.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/SearchPage.tsx',
  'src/components/AuthModal.tsx',
  'src/components/SharePanel.tsx',
  'src/components/CookieConsent.tsx',
  'src/pages/NewsPage.tsx',
  'src/pages/ArticlePage.tsx',
  'src/pages/DeepStatePage.tsx',
  'src/pages/BernieShowPage.tsx',
]
for (const rel of banFiles) {
  const src = readFileSync(join(root, rel), 'utf8')
  const hits = src.match(/className="p-0\.5"/g) || []
  if (hits.length > 0) {
    console.error(`[verify:a11y-public-targets] FAIL — ${rel} still has ${hits.length} className="p-0.5" controls`)
    failures++
  }
}


// Ban residual sub-44px min-height tokens on public surfaces
const sub44Files = [
  'src/pages/NewsPage.tsx',
  'src/pages/ChapterPage.tsx',
  'src/pages/IsraelDossierPage.tsx',
  'src/pages/ArticlePage.tsx',
  'src/pages/SearchPage.tsx',
  'src/pages/ReadTheBookPage.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/ForumPage.tsx',
  'src/App.tsx',
  'src/components/AipacDiagram.tsx',
  'src/pages/BernieShowPage.tsx',
  'src/pages/DeepStatePage.tsx',
  'src/pages/ProfilesIndexPage.tsx',
  'src/pages/SourcesPage.tsx',
  'src/components/SharePanel.tsx',
  'src/components/DossierCarousel.tsx',
]
for (const rel of sub44Files) {
  const src = readFileSync(join(root, rel), 'utf8')
  const hits = src.match(/min-h-\[(3[0-9]|4[0-3])px\]/g) || []
  if (hits.length > 0) {
    console.error(`[verify:a11y-public-targets] FAIL — ${rel} has sub-44 min-h: ${hits.join(',')}`)
    failures++
  }
}

if (failures > 0) {
  console.error(`[verify:a11y-public-targets] FAIL — ${failures} floor(s) breached`)
  process.exit(1)
}

const total = results.reduce((n, r) => n + r.count, 0)
const MIN_TOTAL_MARKERS = 510
if (total < MIN_TOTAL_MARKERS) {
  console.error(`[verify:a11y-public-targets] FAIL — total markers ${total} < floor ${MIN_TOTAL_MARKERS}`)
  process.exit(1)
}
console.log(
  `[verify:a11y-public-targets] PASS — ${floors.length} surfaces, ${total} target markers (floors green)`,
)
