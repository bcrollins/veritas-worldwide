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

const docketCount = PROFILES.filter((p) => p.documentedFalsehoods != null).length;
if (docketCount < 9) throw new Error('expected ≥9 compiled dockets, got ' + docketCount);

console.log(JSON.stringify({ clean: clean.score, demo: demo.score, docketCount, scores }, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
