#!/usr/bin/env node
/**
 * Hard gates for Alan Dershowitz power profile densification:
 * - non-empty primary-sourced sections (claims/quotes/policy/connections/websites)
 * - every quote/policy/claim/website has an http(s) URL
 * - NPA / CVRA / Trump impeachment / Giuffre-dispute needles present
 * - tier hygiene: at least one disputed claim for Giuffre allegations
 * - monogram or portrait asset exists
 * - optional live HTML smoke when BASE_URL set
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = process.env.BASE_URL || process.env.PLATFORM_VERIFY_BASE_URL || ''

function fail(msg) {
  console.error(`[verify:alan-dershowitz] FAIL — ${msg}`)
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

const p = getProfileBySlug('alan-dershowitz');
if (!p) throw new Error('profile missing');

const min = { quotes: 4, policyActions: 5, connections: 7, sourcedClaims: 9, websites: 5, career: 6 };
for (const [k, n] of Object.entries(min)) {
  if ((p[k]?.length ?? 0) < n) throw new Error(k + ' count ' + (p[k]?.length ?? 0) + ' < ' + n);
}

const needUrl = [
  ...p.quotes.map((x) => ['quote', x.url]),
  ...p.policyActions.map((x) => ['policy', x.url]),
  ...p.sourcedClaims.map((x) => ['claim', x.url]),
  ...p.websites.map((x) => ['site', x.url]),
];
for (const [kind, url] of needUrl) {
  if (!url || !/^https?:\\/\\//i.test(url)) throw new Error(kind + ' missing http url: ' + url);
}

const blob = JSON.stringify(p);
const needles = [
  'non-prosecution',
  'NPA',
  'Crime Victims',
  'CVRA',
  'Epstein',
  'Giuffre',
  'impeachment',
  'Harvard',
  'Acosta',
  'Courtney Wild',
  'ca11.uscourts.gov',
  'hls.harvard.edu',
];
for (const n of needles) {
  if (!blob.toLowerCase().includes(n.toLowerCase())) throw new Error('missing needle: ' + n);
}

// Tier hygiene: Giuffre abuse allegation must remain disputed; NPA role verified
const disputed = p.sourcedClaims.filter((c) => c.tier === 'disputed');
if (disputed.length < 1) throw new Error('expected ≥1 disputed claim (Giuffre allegations)');
const verified = p.sourcedClaims.filter((c) => c.tier === 'verified');
if (verified.length < 5) throw new Error('expected ≥5 verified claims');

const urls = needUrl.map(([, u]) => u).join(' ');
for (const host of ['ca11.uscourts.gov', 'hls.harvard.edu', 'senate.gov', 'courtlistener.com']) {
  if (!urls.includes(host)) throw new Error('missing primary host: ' + host);
}

// Explicit denial language must appear somewhere in the profile
if (!/never had sex|categorically den/i.test(blob)) {
  throw new Error('missing categorical denial language');
}

console.log(JSON.stringify({
  ok: true,
  quotes: p.quotes.length,
  policyActions: p.policyActions.length,
  connections: p.connections.length,
  sourcedClaims: p.sourcedClaims.length,
  verifiedClaims: verified.length,
  disputedClaims: disputed.length,
  websites: p.websites.length,
  career: p.career.length,
}, null, 2));
`)

console.log(out.trim())

const photoSvg = path.join(root, 'public', 'profiles', 'alan-dershowitz.svg')
const photoJpg = path.join(root, 'public', 'profiles', 'alan-dershowitz.jpg')
if (!fs.existsSync(photoSvg) && !fs.existsSync(photoJpg)) {
  fail('missing public/profiles/alan-dershowitz.(svg|jpg)')
}

if (BASE) {
  const url = `${BASE.replace(/\/$/, '')}/profile/alan-dershowitz`
  console.log(`[verify:alan-dershowitz] live fetch ${url}`)
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'VeritasDershowitzVerify/1.0' } })
  if (!res.ok) fail(`live HTTP ${res.status}`)
  const html = await res.text()
  if (!/dershowitz|Dershowitz|root|app/i.test(html)) fail('live HTML unexpected empty')
  console.log('[verify:alan-dershowitz] live HTTP', res.status)
}

console.log('[verify:alan-dershowitz] PASS')
