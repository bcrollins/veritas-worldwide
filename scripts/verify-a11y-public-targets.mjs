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
  { path: 'src/pages/ChapterPage.tsx', min: 8, label: 'chapter actions/nav' },
  { path: 'src/pages/HomePage.tsx', min: 8, label: 'home CTAs' },
  { path: 'src/pages/ForumPage.tsx', min: 12, label: 'forum votes/actions' },
  { path: 'src/pages/IsraelDossierPage.tsx', min: 10, label: 'dossier source anchors' },
  { path: 'src/pages/DeepStatePage.tsx', min: 6, label: 'deep-state controls' },
  { path: 'src/pages/BibleHistoryPage.tsx', min: 8, label: 'bible-history sidebar' },
  { path: 'src/pages/SearchPage.tsx', min: 4, label: 'search chips' },
  { path: 'src/pages/MembershipPage.tsx', min: 6, label: 'membership CTAs' },
  { path: 'src/pages/TimelinePage.tsx', min: 4, label: 'timeline filters' },
  { path: 'src/components/AuthModal.tsx', min: 4, label: 'auth modal' },
  { path: 'src/components/CookieConsent.tsx', min: 2, label: 'cookie consent' },
  { path: 'src/components/LanguageSelector.tsx', min: 4, label: 'language picker' },
  { path: 'src/components/SharePanel.tsx', min: 3, label: 'share panel' },
  { path: 'src/components/CommunityForum.tsx', min: 4, label: 'community forum votes' },
  { path: 'src/components/Breadcrumb.tsx', min: 1, label: 'breadcrumb' },
  { path: 'src/components/ErrorBoundary.tsx', min: 2, label: 'error recovery' },
  { path: 'src/components/DossierCarousel.tsx', min: 2, label: 'dossier carousel downloads' },
  { path: 'src/pages/ReadTheBookPage.tsx', min: 10, label: 'read reader chrome' },
  { path: 'src/pages/AboutPage.tsx', min: 7, label: 'about key routes' },
  { path: 'src/pages/ProfilePage.tsx', min: 4, label: 'profile sources/nav' },
  { path: 'src/pages/admin/AdminLayout.tsx', min: 4, label: 'admin shell nav' },
  { path: 'src/components/RecordTabs.tsx', min: 3, label: 'record section tabs' },
  { path: 'src/pages/admin/AdminMedia.tsx', min: 3, label: 'admin media controls' },
  { path: 'src/pages/admin/AdminContent.tsx', min: 3, label: 'admin content tabs' },
  { path: 'src/pages/admin/AdminDashboard.tsx', min: 6, label: 'admin dashboard CTAs' },
  { path: 'src/pages/admin/AdminSocialPacks.tsx', min: 3, label: 'admin social packs' },
  { path: 'src/pages/admin/AdminSocialHub.tsx', min: 1, label: 'admin social hub tabs' },
  { path: 'src/pages/admin/AdminUsers.tsx', min: 2, label: 'admin users' },
  { path: 'src/pages/admin/AdminSubscriptions.tsx', min: 2, label: 'admin subscriptions' },
  { path: 'src/pages/admin/AdminLoginPage.tsx', min: 3, label: 'admin login form' },
  { path: 'src/pages/admin/AdminDisputes.tsx', min: 2, label: 'admin disputes' },
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

if (failures > 0) {
  console.error(`[verify:a11y-public-targets] FAIL — ${failures} floor(s) breached`)
  process.exit(1)
}

const total = results.reduce((n, r) => n + r.count, 0)
console.log(
  `[verify:a11y-public-targets] PASS — ${floors.length} surfaces, ${total} target markers (floors green)`,
)
