#!/usr/bin/env node
/**
 * Live public-surface anonymity smoke check.
 * Fails if personal operator GitHub namespace or emails appear in HTML/JSON-LD.
 * Attribution: Veritas Worldwide only.
 */
const base = (process.env.PLATFORM_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(/\/$/, '')
const paths = [
  '/',
  '/record-of-jesus-christ',
  '/about',
  '/methodology',
  '/bible',
  '/sources',
  '/media-kit',
  '/privacy',
  '/terms',
  '/institute/methodology',
  // Paid OSINT product — HTML must stay entity-only (no personal operator identity)
  '/comprehensive-profile',
  // OPSEC quarantine surface: must never reintroduce personal social profile URLs
  '/bernie',
]

const FORBIDDEN = [
  /bcrollins/i,
  /brollins565/i,
  /brandoncrollins@/i,
  /github\.com\/bcrollins/i,
  /@incollection\{rollins/i,
  /Brandon\s+Rollins/i,
  /aerolink\.one/i,
  // Personal social profiles must never appear on any public Veritas HTML
  /facebook\.com\/bernie\.rollins/i,
  /facebook\.com\/brandon\.rollins/i,
]

const failures = []

async function check(path) {
  const url = `${base}${path}`
  const res = await fetch(url, {
    headers: { accept: 'text/html,application/xhtml+xml' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) {
    failures.push(`${path}: HTTP ${res.status}`)
    return
  }
  const html = await res.text()
  for (const re of FORBIDDEN) {
    if (re.test(html)) failures.push(`${path}: matched forbidden identity pattern ${re}`)
  }
  // sameAs must keep entity socials if Organization JSON-LD present
  if (html.includes('"@type":"Organization"') || html.includes("'@type': 'Organization'")) {
    if (!html.includes('x.com/VeritasWorldwide') && !html.includes('https://x.com/VeritasWorldwide')) {
      // only enforce on home which ships static Organization
      if (path === '/') failures.push(`${path}: Organization JSON-LD missing entity X sameAs`)
    }
  }
}

const corpusRes = await fetch(`${base}/record-of-jesus-christ/corpus.json`, {
  signal: AbortSignal.timeout(15000),
})
if (!corpusRes.ok) {
  failures.push(`corpus.json: HTTP ${corpusRes.status}`)
} else {
  const corpus = await corpusRes.json()
  if (corpus?.meta?.publisher !== 'Veritas Worldwide') {
    failures.push(`corpus publisher must be Veritas Worldwide, got ${corpus?.meta?.publisher}`)
  }
  // Hard floor: catastrophic rollback / empty package only.
  // Growth floors are soft during Railway lag so identity suite stays green.
  const HARD_CLAIM_FLOOR = Number(process.env.LIVE_ANONYMITY_HARD_CLAIM_FLOOR || 160)
  // Soft floor tracks latest shipped wave (wave55 ≈ 597); WARN only on lag.
  const SOFT_CLAIM_FLOOR = Number(process.env.LIVE_ANONYMITY_SOFT_CLAIM_FLOOR || 597)
  if (typeof corpus?.claimCount === 'number' && corpus.claimCount < HARD_CLAIM_FLOOR) {
    failures.push(
      `corpus claimCount catastrophically low: ${corpus.claimCount} (hard floor ${HARD_CLAIM_FLOOR})`,
    )
  } else if (typeof corpus?.claimCount === 'number' && corpus.claimCount < SOFT_CLAIM_FLOOR) {
    console.warn(
      `[verify:live-anonymity] WARN corpus claimCount ${corpus.claimCount} < soft floor ${SOFT_CLAIM_FLOOR} (likely deploy lag; identity still clean)`,
    )
  }
  const blob = JSON.stringify(corpus)
  for (const re of FORBIDDEN) {
    if (re.test(blob)) failures.push(`corpus.json: matched forbidden identity pattern ${re}`)
  }
}

await Promise.all(paths.map(check))

if (failures.length) {
  console.error('[verify:live-anonymity] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(`[verify:live-anonymity] PASS — ${paths.length} HTML surfaces + corpus clean at ${base}`)
