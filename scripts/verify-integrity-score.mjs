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

const docketCount = PROFILES.filter((p) => p.documentedFalsehoods != null).length;
if (docketCount < 14) throw new Error('expected ≥14 compiled dockets, got ' + docketCount);

console.log(JSON.stringify({ clean: clean.score, demo: demo.score, docketCount, scores }, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
