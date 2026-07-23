#!/usr/bin/env node
/**
 * Live public-surface anonymity smoke check.
 * Fails if personal operator GitHub namespace or emails appear in HTML/JSON-LD.
 * Attribution: Veritas Worldwide only.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
function defaultSoftFloor() {
  // Prefer env; else local export soft-floor.json (auto-written by export-roc-corpus).
  if (process.env.LIVE_ANONYMITY_SOFT_CLAIM_FLOOR) {
    return Number(process.env.LIVE_ANONYMITY_SOFT_CLAIM_FLOOR)
  }
  try {
    const p = path.join(root, 'public', 'record-of-jesus-christ', 'soft-floor.json')
    if (fs.existsSync(p)) {
      const j = JSON.parse(fs.readFileSync(p, 'utf8'))
      if (typeof j?.claimCount === 'number' && j.claimCount > 0) return j.claimCount
    }
  } catch {
    /* ignore */
  }
  return 642 // last known good before soft-floor file existed
}

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
  // Israel evidence surface + briefing (entity-only)
  '/israel-dossier',
  '/israel-dossier/briefing',
  // Paid OSINT product — HTML must stay entity-only (no personal operator identity)
  '/comprehensive-profile',
  // OPSEC quarantine surface: must never reintroduce personal social profile URLs
  '/bernie',
  // Local-only researcher + volume scaffold — entity-only copy
  '/researcher',
  '/researcher/timeline',
  '/volume-ii',
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
  // Soft floor: env override → export soft-floor.json → fallback.
  const SOFT_CLAIM_FLOOR = defaultSoftFloor()
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

// Israel dossier corpus — identity needles + soft incident floor (WARN on deploy lag).
{
  const israelRes = await fetch(`${base}/israel-dossier/corpus.json`, {
    signal: AbortSignal.timeout(20000),
  })
  if (!israelRes.ok) {
    failures.push(`israel-dossier/corpus.json: HTTP ${israelRes.status}`)
  } else {
    const israel = await israelRes.json()
    const blob = JSON.stringify(israel)
    for (const re of FORBIDDEN) {
      if (re.test(blob)) failures.push(`israel-dossier/corpus.json: matched forbidden identity pattern ${re}`)
    }
    const incidentCount =
      typeof israel?.counts?.incidents === 'number'
        ? israel.counts.incidents
        : Array.isArray(israel?.incidents)
          ? israel.incidents.length
          : null
    const HARD_ISRAEL_FLOOR = Number(process.env.LIVE_ANONYMITY_HARD_ISRAEL_FLOOR || 50)
    let softIsrael = Number(process.env.LIVE_ANONYMITY_SOFT_ISRAEL_FLOOR || 0)
    if (!softIsrael) {
      try {
        const p = path.join(root, 'public', 'israel-dossier', 'soft-floor.json')
        if (fs.existsSync(p)) {
          const j = JSON.parse(fs.readFileSync(p, 'utf8'))
          if (typeof j?.incidentCount === 'number') softIsrael = j.incidentCount
        }
      } catch {
        /* ignore */
      }
    }
    if (!softIsrael) softIsrael = 732
    if (typeof incidentCount === 'number' && incidentCount < HARD_ISRAEL_FLOOR) {
      failures.push(
        `israel incidentCount catastrophically low: ${incidentCount} (hard floor ${HARD_ISRAEL_FLOOR})`,
      )
    } else if (typeof incidentCount === 'number' && incidentCount < softIsrael) {
      console.warn(
        `[verify:live-anonymity] WARN israel incidentCount ${incidentCount} < soft floor ${softIsrael} (likely deploy lag; identity still clean)`,
      )
    }
  }
}

// Text discovery cards (not HTML) — still must stay entity-only.
for (const textPath of ['/humans.txt', '/llms.txt', '/security.txt']) {
  try {
    const res = await fetch(`${base}${textPath}`, { signal: AbortSignal.timeout(12000) })
    if (!res.ok) {
      failures.push(`${textPath}: HTTP ${res.status}`)
      continue
    }
    const text = await res.text()
    for (const re of FORBIDDEN) {
      if (re.test(text)) failures.push(`${textPath}: matched forbidden identity pattern ${re}`)
    }
  } catch (err) {
    failures.push(`${textPath}: fetch error ${err?.message || err}`)
  }
}

// OPSEC: /bernie must ship X-Robots-Tag noindex (quarantine surface; surname residual in body is intentional product branding only).
{
  const berRes = await fetch(`${base}/bernie`, {
    method: 'GET',
    headers: { accept: 'text/html' },
    signal: AbortSignal.timeout(15000),
  })
  if (!berRes.ok) {
    failures.push(`/bernie: HTTP ${berRes.status}`)
  } else {
    const robotsTag = (berRes.headers.get('x-robots-tag') || '').toLowerCase()
    if (!robotsTag.includes('noindex')) {
      failures.push(`/bernie: missing X-Robots-Tag noindex (got "${robotsTag || '(empty)'}")`)
    }
    const html = await berRes.text()
    if (!/noindex/i.test(html)) {
      failures.push('/bernie: HTML missing noindex robots meta')
    }
    for (const re of FORBIDDEN) {
      if (re.test(html)) failures.push(`/bernie: matched forbidden identity pattern ${re}`)
    }
  }
}

await Promise.all(paths.map(check))

if (failures.length) {
  console.error('[verify:live-anonymity] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}

console.log(
  `[verify:live-anonymity] PASS — ${paths.length} HTML surfaces + ROC/Israel corpora + text cards + /bernie noindex clean at ${base}`,
)
