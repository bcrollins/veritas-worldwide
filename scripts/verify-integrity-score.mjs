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
import { getProfileBySlug } from './src/data/profileData.ts';

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

const trump = getProfileBySlug('donald-trump');
const tr = computeIntegrityScore(trump?.documentedFalsehoods);
if (tr.score == null || tr.score >= 100) throw new Error('trump must have reduced score');
if (tr.scoredFalsehoods.length < 2) throw new Error('trump needs multiple verified falsehoods');

const donalds = getProfileBySlug('byron-donalds');
const dr = computeIntegrityScore(donalds?.documentedFalsehoods);
if (dr.score == null || dr.score >= 100) throw new Error('donalds jim crow docket missing');

console.log(JSON.stringify({
  clean: clean.score,
  demo: demo.score,
  trump: tr.score,
  donalds: dr.score,
  trumpFalsehoods: tr.scoredFalsehoods.length,
}, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
