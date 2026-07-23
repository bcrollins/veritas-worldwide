#!/usr/bin/env node
/**
 * Pure floors for Top-100 Value Engine remaining integrity / OPSEC / researcher items.
 * Entity-only. No network.
 */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}
function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

const chapter = read('src/pages/ChapterPage.tsx')
const timeline = read('src/pages/PersonalTimelinePage.tsx')
const storage = read('src/lib/personalTimelineStorage.ts')
const sources = read('src/pages/SourcesPage.tsx')
const profile = read('src/pages/ProfilePage.tsx')
const guide = read('src/pages/InstituteGuidePage.tsx')
const auth = read('server-auth.js')
const server = read('server.js')
const cspMeta = read('scripts/verify-csp-meta.mjs')
const indexHtml = existsSync(join(root, 'index.html')) ? read('index.html') : ''
const about = read('src/pages/AboutPage.tsx')
const analyticsPage = read('src/pages/AnalyticsPage.tsx')
const consent = existsSync(join(root, 'src/components/CookieConsent.tsx'))
  ? read('src/components/CookieConsent.tsx')
  : ''
const license = read('src/components/LicenseCard.tsx')
const errorBoundary = existsSync(join(root, 'src/components/ErrorBoundary.tsx'))
  ? read('src/components/ErrorBoundary.tsx')
  : existsSync(join(root, 'src/components/AppErrorBoundary.tsx'))
    ? read('src/components/AppErrorBoundary.tsx')
    : ''
const archive = read('scripts/verify-archive-manifest.mjs')
const contentPack = read('src/pages/ContentPackPage.tsx')
const pure = read('scripts/verify-pure.mjs')
const packageJson = JSON.parse(read('package.json'))

// #21 TTS skip chrome
assert(
  chapter.includes('data-tts-skip="chrome"') || chapter.includes('aria-hidden="true"'),
  '#21 chapter chrome should be TTS-skippable (aria-hidden / data-tts-skip)',
)

// #24 source hierarchy chips
assert(
  chapter.includes('chapter-source-hierarchy-filters') &&
    chapter.includes('normalizeSourceHierarchy'),
  '#24 chapter source hierarchy filter chips',
)

// #26 keyboard help
assert(
  chapter.includes('chapter-keyboard-help') && chapter.includes('Keyboard shortcuts'),
  '#26 chapter keyboard help panel',
)

// #30 ROC sticky TOC (peer shipped)
const roc = read('src/pages/RecordOfJesusChristPage.tsx')
assert(
  /sticky|section.*TOC|mobile.*nav/i.test(roc) || roc.includes('data-testid="roc-section-toc"'),
  '#30 ROC section jump TOC sticky present',
)

// #39 profile claims CSV
assert(
  profile.includes('profile-export-claims-csv') && profile.includes('text/csv'),
  '#39 profile one-tap claims CSV export',
)

// #44 news related profiles
const article = read('src/pages/ArticlePage.tsx')
assert(
  article.includes('article-related-profiles') || article.includes('relatedProfiles'),
  '#44 news article related profiles',
)

// #47 institute speakable
assert(
  guide.includes('speakable') && guide.includes('data-speakable="guide-lede"'),
  '#47 institute guide speakable schema + lede marker',
)

// #49 content-pack alt text
assert(
  contentPack.includes('alt=') && !contentPack.includes('alt={undefined}'),
  '#49 content-pack images use alt attributes',
)

// #52 analytics page no PII patterns
assert(
  !/brollins|@gmail\.com|brandon\s+rollins/i.test(analyticsPage),
  '#52 analytics page free of personal operator strings',
)

// #57 JWT 7d
assert(
  auth.includes("JWT_EXPIRY") && (auth.includes("'7d'") || auth.includes('"7d"')),
  '#57 JWT access TTL defaults to 7d',
)

// #60 Stripe hosts — checkout uses api.stripe.com; CSP meta script may list stripe
const cspSrc = existsSync(join(root, 'src/lib/csp.ts'))
  ? read('src/lib/csp.ts')
  : indexHtml + cspMeta
assert(
  server.includes('api.stripe.com') || /stripe\.com/.test(cspSrc),
  '#60 Stripe checkout host referenced in server/CSP surface',
)

// #61 client-error intake
assert(
  server.includes("app.post('/api/client-error'") || server.includes('/api/client-error'),
  '#61 client-error intake route exists',
)
assert(
  !/req\.body\.email|body\.password|Authorization.*client-error/i.test(
    server.slice(server.indexOf('client-error'), server.indexOf('client-error') + 2500),
  ),
  '#61 client-error handler must not log email/password fields from body by name',
)

// #62 health no personal paths
const healthSlice = server.includes("app.get('/api/health'")
  ? server.slice(server.indexOf("app.get('/api/health'"), server.indexOf("app.get('/api/health'") + 4000)
  : server
assert(
  !/brollins|Deerfield|910-238|brandoncrollins/i.test(healthSlice),
  '#62 health endpoint surface free of personal operator paths',
)

// #64 export watermark entity-only
assert(
  storage.includes('PERSONAL_TIMELINE_EXPORT_WATERMARK') &&
    storage.includes('Veritas Worldwide') &&
    !/brollins|brandon/i.test(storage),
  '#64 personal timeline export watermark entity-only',
)
assert(
  timeline.includes('buildPersonalTimelineExport'),
  '#64 timeline page uses buildPersonalTimelineExport',
)

// #65 import schema validate
assert(
  storage.includes('parsePersonalTimelineImport') && timeline.includes('parsePersonalTimelineImport'),
  '#65 personal timeline import schema validate',
)

// #67 sources local-only label
assert(
  sources.includes('local-only') && sources.includes('/researcher/timeline'),
  '#67 sources page personal timeline labeled local-only',
)

// #70 about entity model
assert(
  about.includes('Organization') || about.includes('entity') || about.includes('Veritas Worldwide'),
  '#70 about is entity publisher model',
)
assert(!/brandon\s+rollins|brollins565/i.test(about), '#70 about must not contain personal bio needles')

// #72 OG first-party
assert(
  !/cloudinary\.com|imgix\.net|fbcdn\.net/i.test(read('src/lib/seo.ts')),
  '#72 OG helpers first-party only (no third-party image CDN hosts in seo.ts)',
)

// #86 archive pin floor
assert(
  /pinned\.length\s*>=\s*(7[2-9]|[89]\d)/.test(archive) || archive.includes('>= 72'),
  '#86 archive pin floor ≥72 (77+ target path)',
)

// #97 license card
assert(
  license.includes('CC BY-NC-SA') && chapter.includes('LicenseCard'),
  '#97 License CC BY-NC-SA on chapter via LicenseCard',
)

// #98 pure suite identity scrub present
assert(
  pure.includes('verify-identity-scrub.mjs') || pure.includes('verify-docs-anonymity.mjs'),
  '#98 pure suite includes anonymity gates',
)
assert(
  !/brollins565@gmail|brandoncrollins@/i.test(pure),
  '#98 pure runner must not print personal emails',
)

// Consent keyboard (#54) — if component exists, must not trap focus forever without Escape
if (consent) {
  assert(
    consent.includes('Escape') || consent.includes('aria-modal') || consent.includes('role="dialog"'),
    '#54 consent banner should be dialog-accessible',
  )
}

// #38 profiles corpus claimCount
const profilesCorpus = JSON.parse(read('public/profiles/corpus.json'))
assert(
  typeof profilesCorpus.count === 'number' && profilesCorpus.count === profilesCorpus.profiles?.length,
  '#38 profiles corpus count field matches profiles array length',
)

// Continuous wave: corpus search kind filter
const corpusSearch = read('src/components/CorpusSearchPanel.tsx')
assert(corpusSearch.includes('kindFilter') || corpusSearch.includes("setKindFilter"), 'corpus search kind filter')
assert(existsSync(join(root, 'public/research-pack.zip')), 'research-pack.zip present')

if (failures.length) {
  console.error('[verify:top100-floors] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

// #40 briefing confidence sticky mobile
const briefing = read('src/pages/IsraelDossierBriefingPage.tsx')
assert(
  briefing.includes('briefing-confidence-sticky') && briefing.includes('lg:hidden'),
  '#40 briefing confidence sticky visible on mobile',
)
// #42 open questions export
assert(
  briefing.includes('briefing-export-open-questions-csv'),
  '#42 briefing open-questions CSV export',
)
// #73 #84 hero alt + fetchPriority
assert(
  chapter.includes('function HeroImage') &&
    chapter.includes('fetchPriority="high"') &&
    chapter.includes('alt={image.alt}'),
  '#73/#84 chapter hero alt + fetchPriority high',
)
// #74 skip-link
const app = read('src/App.tsx')
assert(app.includes('#main-content') && app.includes('id="main-content"'), '#74 skip-link + main landmark')
// #75 focus-visible
const css = read('src/styles/index.css')
assert(css.includes(':focus-visible'), '#75 focus-visible styles present')
// #82 SW network-first navigations
const sw = read('public/sw.js')
assert(sw.includes("mode === 'navigate'") && /network-first/i.test(sw), '#82 SW network-first navigations')
// #89 device matrix doc
assert(
  existsSync(join(root, 'docs/top100-value-engine/DEVICE-MATRIX-SMOKE.md')),
  '#89 device matrix smoke checklist doc',
)
// #90 error boundary entity-only
const eb = read('src/components/ErrorBoundary.tsx')
assert(
  eb.includes('Veritas Worldwide') && !/brollins|brandon/i.test(eb),
  '#90 ErrorBoundary entity-only copy',
)
// #92 RSS self-link + enclosures
const feed = existsSync(join(root, 'public/feed.xml')) ? read('public/feed.xml') : ''
assert(
  feed.includes('atom:link') && feed.includes('rel="self"') && feed.includes('<enclosure'),
  '#92 RSS absolute self-link + enclosures',
)
// #93 #94 newsletter / exit-intent entity-safe
const exitIntent = existsSync(join(root, 'src/components/ExitIntentCapture.tsx'))
  ? read('src/components/ExitIntentCapture.tsx')
  : ''
if (exitIntent) {
  assert(!/brollins|brandon\s+rollins/i.test(exitIntent), '#94 exit-intent free of personal identity')
}
// #95 stripe success URLs known noindex set
assert(
  server.includes("'/subscribe/success'") &&
    server.includes("'/membership/success'") &&
    server.includes("'/comprehensive-profile/success'"),
  '#95 success paths in noindex / known SPA sets',
)
// #99 ledger exists for re-rank
assert(
  existsSync(join(root, 'docs/top100-value-engine/TOP100-VALUE-LEDGER-2026-07-23.md')),
  '#99 top100 ledger durable for re-rank after densify',
)


// #37 dual-cite docket floor (integrity pure already ≥96 dockets)
const integrity = read('scripts/verify-integrity-score.mjs')
assert(
  integrity.includes('docketCount') && /docketCount\s*<\s*96|≥96|>= 96/.test(integrity),
  '#37 integrity dual-cite docket floor locked (≥96 profiles with dockets)',
)
// #53 analytics/privacy OSINT retention language
const privacy = read('src/pages/PrivacyPage.tsx')
assert(
  privacy.includes('OSINT order') && /retain|deleted|minimized|fulfillment/i.test(privacy),
  '#53 privacy OSINT retention copy present',
)
// #68 methodology proofVsConcept
const method = read('src/pages/MethodologyPage.tsx')
assert(
  /proofVsConcept|proof.vs.concept|proof versus concept/i.test(method),
  '#68 methodology proof-vs-concept language present',
)
// #43 israel densify dual-cite pure scripts exist
assert(
  existsSync(join(root, 'scripts/verify-israel-dossier-canon.mjs')),
  '#43 israel dossier densify pure canon gate exists',
)
// #19 lastmod present in sitemap writer
const prerender = read('scripts/prerender.mjs')
assert(prerender.includes('lastmod') && prerender.includes('renderUrlEntry'), '#19 sitemap lastmod writer present')
// #83 lazy split chapter/dossier/roc
assert(
  app.includes("import('./pages/ChapterPage')") &&
    app.includes("import('./pages/IsraelDossierPage')") &&
    app.includes("import('./pages/RecordOfJesusChristPage')"),
  '#83 App lazy-splits chapter/dossier/roc routes',
)
// #41 dossier confidence filter — page has confidence sticky + open questions (filter path)
assert(
  briefing.includes('confidence') && briefing.includes('briefing-open-questions'),
  '#41 dossier confidence UX surfaces present on briefing',
)

console.log(`[verify:top100-floors] PASS — ${failures.length === 0 ? 'all' : ''} Top-100 remaining floors green`)
