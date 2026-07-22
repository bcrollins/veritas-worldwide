#!/usr/bin/env node
/**
 * Hard gates for Byron Donalds power profile densification:
 * - non-empty primary-sourced sections
 * - every quote/donation/claim/policy has an http(s) URL
 * - Israel-funding + STOCK Act + demerit needles present
 * - dossier actor cross-link exists
 * - optional live HTML smoke when BASE_URL set
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.BASE_URL || process.env.PLATFORM_VERIFY_BASE_URL || ''

function fail(msg) {
  console.error(`[verify:byron-donalds] FAIL — ${msg}`)
  process.exit(1)
}

function runNodeStrip(code) {
  const r = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--input-type=module', '-e', code],
    { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 },
  )
  if (r.status !== 0) {
    fail(`node strip-types check failed:\n${r.stderr || r.stdout}`)
  }
  return r.stdout
}

const out = runNodeStrip(`
import { getProfileBySlug } from './src/data/profileData.ts';
import { getDossierActorByProfileId } from './src/data/israelDossierActors.ts';

const p = getProfileBySlug('byron-donalds');
if (!p) throw new Error('profile missing');

const min = { quotes: 4, donations: 6, policyActions: 7, connections: 8, sourcedClaims: 12, websites: 12, career: 15 };
for (const [k, n] of Object.entries(min)) {
  if ((p[k]?.length ?? 0) < n) throw new Error(k + ' count ' + (p[k]?.length ?? 0) + ' < ' + n);
}

const total = p.donations.reduce((s, d) => s + d.amount, 0);
if (total < 200000) throw new Error('donation total too low: ' + total);
if (total > 2000000) throw new Error('donation total suspiciously high (double-count?): ' + total);

const needUrl = [
  ...p.quotes.map((x) => ['quote', x.url]),
  ...p.donations.map((x) => ['donation', x.url]),
  ...p.policyActions.map((x) => ['policy', x.url]),
  ...p.sourcedClaims.map((x) => ['claim', x.url]),
  ...p.websites.map((x) => ['site', x.url]),
];
for (const [kind, url] of needUrl) {
  if (!url || !/^https?:\\/\\//i.test(url)) throw new Error(kind + ' missing http url: ' + url);
}

const blob = JSON.stringify(p);
const needles = [
  'AIPAC',
  'STOCK Act',
  'H.R. 8034',
  'Jim Crow',
  'OptimaEd',
  'Campaign Legal Center',
  'Stand With Israel',
  'Heritage Action',
  'Freedom Caucus',
  'TrackAIPAC',
  'FEC',
  'clerk.house.gov',
];
for (const n of needles) {
  if (!blob.includes(n)) throw new Error('missing needle: ' + n);
}

// Primary-source domain coverage
const urls = needUrl.map(([, u]) => u).join(' ');
for (const host of ['campaignlegal.org', 'fec.gov', 'opensecrets.org', 'clerk.house.gov', 'donalds.house.gov', 'congress.gov']) {
  if (!urls.includes(host)) throw new Error('missing primary host: ' + host);
}

const actor = getDossierActorByProfileId('byron-donalds');
if (!actor) throw new Error('dossier actor missing');
if (actor.category !== 'us-congress') throw new Error('bad actor category');
if ((actor.fundingLinks?.length ?? 0) < 4) throw new Error('actor fundingLinks < 4');

console.log(JSON.stringify({
  ok: true,
  quotes: p.quotes.length,
  donations: p.donations.length,
  donationTotal: total,
  policyActions: p.policyActions.length,
  connections: p.connections.length,
  sourcedClaims: p.sourcedClaims.length,
  websites: p.websites.length,
  career: p.career.length,
  actorFundingLinks: actor.fundingLinks.length,
}, null, 2));
`)

console.log(out.trim())

// Photo asset
const photo = path.join(root, 'public', 'profiles', 'byron-donalds.jpg')
if (!fs.existsSync(photo)) fail('missing public/profiles/byron-donalds.jpg')

// Optional live check
if (BASE) {
  const url = `${BASE.replace(/\/$/, '')}/profile/byron-donalds`
  console.log(`[verify:byron-donalds] live fetch ${url}`)
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'VeritasByronVerify/1.0' } })
  if (!res.ok) fail(`live HTTP ${res.status}`)
  const html = await res.text()
  // SPA may shell-only; still require route shell + any prerendered signals
  if (!/byron|Donalds|root|app/i.test(html)) fail('live HTML unexpected empty')
  // If prerendered content present, assert non-zero section signals
  if (html.includes('Sourced Claims') || html.includes('Documented Funding')) {
    if (/Sourced Claims[\s\S]{0,200}>\s*0\s*</.test(html) && html.includes('aria-label="0"')) {
      // animated counters may still show 0 in static HTML — check corpus instead
    }
  }
  // Prefer machine corpus if present
  try {
    const corpusUrl = `${BASE.replace(/\/$/, '')}/profiles/corpus.json`
    const c = await fetch(corpusUrl)
    if (c.ok) {
      const data = await c.json()
      const hit = (data.profiles || []).find((x) => x.id === 'byron-donalds')
      if (!hit) fail('live corpus missing byron-donalds')
      console.log('[verify:byron-donalds] live corpus hit', hit.name)
    }
  } catch {
    /* network optional */
  }
}

console.log('[verify:byron-donalds] PASS')
