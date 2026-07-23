#!/usr/bin/env node
/**
 * Pure gate for Integrity Score engine.
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function fail(msg) {
  console.error(`[verify:integrity-score] FAIL — ${msg}`)
  process.exit(1)
}

for (const rel of ['src/lib/integrityScore.ts', 'src/data/profileData.ts', 'src/pages/ProfilePage.tsx']) {
  if (!fs.existsSync(path.join(root, rel))) fail(`missing ${rel}`)
}

const page = fs.readFileSync(path.join(root, 'src/pages/ProfilePage.tsx'), 'utf8')
if (!page.includes('computeIntegrityScore')) fail('ProfilePage missing computeIntegrityScore')
if (!page.includes('Integrity Score')) fail('ProfilePage missing Integrity Score UI')
if (!page.includes('IntegrityDocketModal') && !page.includes('integrityOpen')) {
  fail('ProfilePage missing clickable docket surface')
}

const index = fs.readFileSync(path.join(root, 'src/pages/ProfilesIndexPage.tsx'), 'utf8')
if (!index.includes('computeIntegrityScore')) fail('ProfilesIndex must surface integrity')
if (!index.includes('integrity-asc')) fail('ProfilesIndex must sort by integrity')

const r = spawnSync(
  process.execPath,
  [
    '--experimental-strip-types',
    '--input-type=module',
    '-e',
    `
import {
  computeIntegrityScore,
  FALSEHOOD_SEVERITY_DEDUCTION,
  INTEGRITY_SCORE_MAX,
} from './src/lib/integrityScore.ts';
import { getProfileBySlug, PROFILES } from './src/data/profileData.ts';

// Empty researched docket → 100
const clean = computeIntegrityScore([]);
if (clean.score !== 100) throw new Error('empty docket should score 100, got ' + clean.score);

// Unscored → null
const none = computeIntegrityScore(undefined);
if (none.score !== null) throw new Error('undefined docket should be null');

// Severity math
const demo = computeIntegrityScore([
  {
    id: 't1',
    statement: 'x',
    saidAt: '2020',
    context: 'c',
    whyFalse: 'w',
    correction: 'c',
    statementSource: 's',
    statementUrl: 'https://example.com/a',
    debunkSource: 'd',
    debunkUrl: 'https://example.com/b',
    severity: 'material',
    tier: 'verified',
  },
  {
    id: 't2',
    statement: 'y',
    saidAt: '2020',
    context: 'c',
    whyFalse: 'w',
    correction: 'c',
    statementSource: 's',
    statementUrl: 'https://example.com/a',
    debunkSource: 'd',
    debunkUrl: 'https://example.com/b',
    severity: 'minor',
    tier: 'circumstantial', // ignored
  },
]);
const expected = INTEGRITY_SCORE_MAX - FALSEHOOD_SEVERITY_DEDUCTION.material;
if (demo.score !== expected) throw new Error('expected ' + expected + ' got ' + demo.score);
if (demo.scoredFalsehoods.length !== 1) throw new Error('only verified should score');

const required = [
  'donald-trump',
  'byron-donalds',
  'joe-biden',
  'barack-obama',
  'hillary-clinton',
  'bill-clinton',
  'prince-andrew',
  'jeffrey-epstein',
  'ted-cruz',
  'mitch-mcconnell',
  'ghislaine-maxwell',
  'kamala-harris',
  'benjamin-netanyahu',
  'ron-desantis',
  'nikki-haley',
  'antony-blinken',
  'bob-menendez',
  'mike-pence',
  'dick-cheney',
  'marco-rubio',
  'mike-pompeo',
];
const scores = {};
for (const id of required) {
  const p = getProfileBySlug(id);
  if (!p) throw new Error('missing profile ' + id);
  const r = computeIntegrityScore(p.documentedFalsehoods);
  if (r.score == null || r.score >= 100) throw new Error(id + ' must have reduced integrity score');
  for (const f of r.scoredFalsehoods) {
    if (!/^https?:\\/\\//i.test(f.statementUrl)) throw new Error(id + ' statement url');
    if (!/^https?:\\/\\//i.test(f.debunkUrl)) throw new Error(id + ' debunk url');
    if (!f.statement || !f.whyFalse || !f.correction) throw new Error(id + ' incomplete falsehood');
  }
  scores[id] = { score: r.score, n: r.scoredFalsehoods.length };
}

// Byron Donalds exhaustive integrity deep-dive gate (dual-cite strict)
const byron = scores['byron-donalds'];
if (!byron || byron.n < 3) throw new Error('byron-donalds needs ≥3 verified falsehoods, got ' + (byron?.n ?? 0));
if (byron.score > 60) throw new Error('byron-donalds score expected ≤60 after deep dive, got ' + byron.score);
const byronP = getProfileBySlug('byron-donalds');
const byronIds = new Set((byronP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'donalds-jim-crow-black-families-2024',
  'donalds-vra-gerrymandering-reason-2026',
  'donalds-stock-act-sanctions-hypocrisy-2022-2024',
]) {
  if (!byronIds.has(id)) throw new Error('byron-donalds missing docket id: ' + id);
}
for (const f of (byronP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('byron dual-cite collision: ' + f.id);
}

// Kamala Harris dual-cited integrity deep-dive
const kamala = scores['kamala-harris'];
if (!kamala || kamala.n < 2) throw new Error('kamala-harris needs ≥2 verified falsehoods, got ' + (kamala?.n ?? 0));
if (kamala.score > 75) throw new Error('kamala-harris score expected ≤75 after deep dive, got ' + kamala.score);
const kamalaP = getProfileBySlug('kamala-harris');
const kamalaIds = new Set((kamalaP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'harris-pregnancy-monitoring-project-2025-2024',
  'harris-no-troops-combat-zone-debate-2024',
]) {
  if (!kamalaIds.has(id)) throw new Error('kamala-harris missing docket id: ' + id);
}
for (const f of (kamalaP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kamala dual-cite collision: ' + f.id);
}

// Benjamin Netanyahu dual-cited integrity deep-dive (egregious wartime falsehoods)
const bibi = scores['benjamin-netanyahu'];
if (!bibi || bibi.n < 2) throw new Error('benjamin-netanyahu needs ≥2 verified falsehoods, got ' + (bibi?.n ?? 0));
if (bibi.score > 55) throw new Error('benjamin-netanyahu score expected ≤55 after deep dive, got ' + bibi.score);
const bibiP = getProfileBySlug('benjamin-netanyahu');
const bibiIds = new Set((bibiP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'netanyahu-no-starvation-gaza-2025',
  'netanyahu-icc-starvation-nonsense-congress-2024',
]) {
  if (!bibiIds.has(id)) throw new Error('benjamin-netanyahu missing docket id: ' + id);
}
for (const f of (bibiP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('netanyahu dual-cite collision: ' + f.id);
}

// Ron DeSantis dual-cited integrity deep-dive (FL governor race relevance)
const desantis = scores['ron-desantis'];
if (!desantis || desantis.n < 2) throw new Error('ron-desantis needs ≥2 verified falsehoods, got ' + (desantis?.n ?? 0));
if (desantis.score > 75) throw new Error('ron-desantis score expected ≤75 after deep dive, got ' + desantis.score);
const desantisP = getProfileBySlug('ron-desantis');
const desantisIds = new Set((desantisP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'desantis-buy-off-states-education-2022',
  'desantis-crime-defund-causation-2021',
]) {
  if (!desantisIds.has(id)) throw new Error('ron-desantis missing docket id: ' + id);
}
for (const f of (desantisP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('desantis dual-cite collision: ' + f.id);
}

// Joe Biden multi-entry expansion (Hunter + troops + SOTU trips)
const biden = scores['joe-biden'];
if (!biden || biden.n < 3) throw new Error('joe-biden needs ≥3 verified falsehoods, got ' + (biden?.n ?? 0));
if (biden.score > 50) throw new Error('joe-biden score expected ≤50 after deep dive, got ' + biden.score);
const bidenP = getProfileBySlug('joe-biden');
for (const id of [
  'biden-keep-your-doctor-aca-echo-vs-son-business',
  'biden-no-troops-dying-abroad-debate-2024',
  'biden-iraq-afghanistan-trips-sotu-2022',
]) {
  if (!(bidenP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('joe-biden missing docket id: ' + id);
  }
}

// Ted Cruz multi-entry expansion
const cruz = scores['ted-cruz'];
if (!cruz || cruz.n < 2) throw new Error('ted-cruz needs ≥2 verified falsehoods, got ' + (cruz?.n ?? 0));
if (cruz.score > 65) throw new Error('ted-cruz score expected ≤65 after deep dive, got ' + cruz.score);
const cruzP = getProfileBySlug('ted-cruz');
for (const id of [
  'cruz-zuckerberg-hearings-libel-context-not-used',
  'cruz-voting-bill-register-illegal-immigrants-2021',
]) {
  if (!(cruzP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('ted-cruz missing docket id: ' + id);
  }
}

// Mitch McConnell multi-entry expansion
const mcconnell = scores['mitch-mcconnell'];
if (!mcconnell || mcconnell.n < 2) throw new Error('mitch-mcconnell needs ≥2 verified falsehoods, got ' + (mcconnell?.n ?? 0));
if (mcconnell.score > 75) throw new Error('mitch-mcconnell score expected ≤75 after deep dive, got ' + mcconnell.score);
const mcconnellP = getProfileBySlug('mitch-mcconnell');
for (const id of [
  'mcconnell-garland-election-year-scotus-2016',
  'mcconnell-freedom-to-vote-sprawling-takeover-2022',
]) {
  if (!(mcconnellP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('mitch-mcconnell missing docket id: ' + id);
  }
}

// Nikki Haley dual-cited integrity deep-dive
const haley = scores['nikki-haley'];
if (!haley || haley.n < 2) throw new Error('nikki-haley needs ≥2 verified falsehoods, got ' + (haley?.n ?? 0));
if (haley.score > 75) throw new Error('nikki-haley score expected ≤75 after deep dive, got ' + haley.score);
const haleyP = getProfileBySlug('nikki-haley');
for (const id of [
  'haley-texas-secession-right-2024',
  'haley-biden-harris-massive-tax-hikes-working-families-2020',
]) {
  if (!(haleyP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('nikki-haley missing docket id: ' + id);
  }
}
for (const f of (haleyP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('haley dual-cite collision: ' + f.id);
}

// Antony Blinken NSM-20 aid-access integrity gate
const blinken = scores['antony-blinken'];
if (!blinken || blinken.n < 1) throw new Error('antony-blinken needs ≥1 verified falsehood, got ' + (blinken?.n ?? 0));
if (blinken.score > 80) throw new Error('antony-blinken score expected ≤80, got ' + blinken.score);
const blinkenP = getProfileBySlug('antony-blinken');
if (!(blinkenP.documentedFalsehoods || []).some((f) => f.id === 'blinken-nsm20-israel-not-restricting-aid-2024')) {
  throw new Error('antony-blinken missing NSM-20 docket id');
}
for (const f of (blinkenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('blinken dual-cite collision: ' + f.id);
}

// Bill Clinton multi-entry (Lewinsky denial + obstruction/perjury framing)
const bill = scores['bill-clinton'];
if (!bill || bill.n < 2) throw new Error('bill-clinton needs ≥2 verified falsehoods, got ' + (bill?.n ?? 0));
if (bill.score > 55) throw new Error('bill-clinton score expected ≤55 after deep dive, got ' + bill.score);

// Barack Obama multi-entry (keep-your-plan + steel production)
const obama = scores['barack-obama'];
if (!obama || obama.n < 2) throw new Error('barack-obama needs ≥2 verified falsehoods, got ' + (obama?.n ?? 0));
if (obama.score > 65) throw new Error('barack-obama score expected ≤65 after deep dive, got ' + obama.score);

// Mike Pence dual-cited integrity gate
const pence = scores['mike-pence'];
if (!pence || pence.n < 1) throw new Error('mike-pence needs ≥1 verified falsehood, got ' + (pence?.n ?? 0));
if (pence.score > 90) throw new Error('mike-pence score expected ≤90, got ' + pence.score);
const penceP = getProfileBySlug('mike-pence');
if (!(penceP.documentedFalsehoods || []).some((f) => f.id === 'pence-border-wall-remain-mexico-90-percent-2022')) {
  throw new Error('mike-pence missing 90% immigration docket id');
}

// Dick Cheney WMD integrity gate
const cheney = scores['dick-cheney'];
if (!cheney || cheney.n < 1) throw new Error('dick-cheney needs ≥1 verified falsehood, got ' + (cheney?.n ?? 0));
if (cheney.score > 80) throw new Error('dick-cheney score expected ≤80, got ' + cheney.score);
const cheneyP = getProfileBySlug('dick-cheney');
if (!(cheneyP.documentedFalsehoods || []).some((f) => f.id === 'cheney-iraq-reconstituted-nuclear-weapons-2003')) {
  throw new Error('dick-cheney missing WMD docket id');
}

// Bob Menendez multi-entry (bribery denials vs conviction)
const menendez = scores['bob-menendez'];
if (!menendez || menendez.n < 2) throw new Error('bob-menendez needs ≥2 verified falsehoods, got ' + (menendez?.n ?? 0));
if (menendez.score > 65) throw new Error('bob-menendez score expected ≤65 after deep dive, got ' + menendez.score);
const menendezP = getProfileBySlug('bob-menendez');
for (const id of [
  'menendez-not-accepting-bribes-denial',
  'menendez-innocent-after-conviction-2024',
]) {
  if (!(menendezP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('bob-menendez missing docket id: ' + id);
  }
}
for (const f of (menendezP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('menendez dual-cite collision: ' + f.id);
}

// Prince Andrew multi-entry (Pizza Express + sweat claim)
const andrew = scores['prince-andrew'];
if (!andrew || andrew.n < 2) throw new Error('prince-andrew needs ≥2 verified falsehoods, got ' + (andrew?.n ?? 0));
if (andrew.score > 65) throw new Error('prince-andrew score expected ≤65 after deep dive, got ' + andrew.score);

// Marco Rubio integrity gate
const rubio = scores['marco-rubio'];
if (!rubio || rubio.n < 1) throw new Error('marco-rubio needs ≥1 verified falsehood, got ' + (rubio?.n ?? 0));
if (rubio.score > 90) throw new Error('marco-rubio score expected ≤90, got ' + rubio.score);
const rubioP = getProfileBySlug('marco-rubio');
if (!(rubioP.documentedFalsehoods || []).some((f) => f.id === 'rubio-20-to-30-million-illegal-immigrants-2024')) {
  throw new Error('marco-rubio missing 20-30M immigration docket id');
}

// Mike Pompeo integrity gate
const pompeo = scores['mike-pompeo'];
if (!pompeo || pompeo.n < 1) throw new Error('mike-pompeo needs ≥1 verified falsehood, got ' + (pompeo?.n ?? 0));
if (pompeo.score > 90) throw new Error('mike-pompeo score expected ≤90, got ' + pompeo.score);
const pompeoP = getProfileBySlug('mike-pompeo');
if (!(pompeoP.documentedFalsehoods || []).some((f) => f.id === 'pompeo-defended-every-person-yovanovitch-2020')) {
  throw new Error('mike-pompeo missing Yovanovitch docket id');
}

const docketCount = PROFILES.filter((p) => p.documentedFalsehoods != null).length;
if (docketCount < 21) throw new Error('expected ≥21 compiled dockets, got ' + docketCount);

console.log(JSON.stringify({ clean: clean.score, demo: demo.score, docketCount, scores }, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
