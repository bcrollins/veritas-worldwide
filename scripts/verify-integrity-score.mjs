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
  'lindsey-graham',
  'tom-cotton',
  'chuck-schumer',
  'adam-schiff',
  'cory-booker',
  'nancy-pelosi',
  'bernie-sanders',
  'hakeem-jeffries',
  'elizabeth-warren',
  'jared-kushner',
  'rand-paul',
  'ilhan-omar',
  'aoc',
  'matt-gaetz',
  'elise-stefanik',
  'tim-scott',
  'kevin-mccarthy',
  'mike-johnson',
  'jim-jordan',
  'dianne-feinstein',
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
if (!desantis || desantis.n < 3) throw new Error('ron-desantis needs ≥3 verified falsehoods, got ' + (desantis?.n ?? 0));
if (desantis.score > 60) throw new Error('ron-desantis score expected ≤60 after deep dive, got ' + desantis.score);
const desantisP = getProfileBySlug('ron-desantis');
const desantisIds = new Set((desantisP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'desantis-buy-off-states-education-2022',
  'desantis-crime-defund-causation-2021',
  'desantis-post-birth-abortions-liberal-states-2023',
]) {
  if (!desantisIds.has(id)) throw new Error('ron-desantis missing docket id: ' + id);
}
for (const f of (desantisP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('ron-desantis dual-cite collision: ' + f.id);
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

// Ted Cruz multi-entry expansion (n≥3 densify)
const cruz = scores['ted-cruz'];
if (!cruz || cruz.n < 3) throw new Error('ted-cruz needs ≥3 verified falsehoods, got ' + (cruz?.n ?? 0));
if (cruz.score > 50) throw new Error('ted-cruz score expected ≤50 after densify, got ' + cruz.score);
const cruzP = getProfileBySlug('ted-cruz');
for (const id of [
  'cruz-zuckerberg-hearings-libel-context-not-used',
  'cruz-voting-bill-register-illegal-immigrants-2021',
  'cruz-green-new-deal-electricity-costs-texas-2022',
]) {
  if (!(cruzP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('ted-cruz missing docket id: ' + id);
  }
}
for (const f of (cruzP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('ted-cruz dual-cite collision: ' + f.id);
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

// Marco Rubio multi-entry integrity gate (n≥3 densify)
const rubio = scores['marco-rubio'];
if (!rubio || rubio.n < 3) throw new Error('marco-rubio needs ≥3 verified falsehoods, got ' + (rubio?.n ?? 0));
if (rubio.score > 60) throw new Error('marco-rubio score expected ≤60 after densify, got ' + rubio.score);
const rubioP = getProfileBySlug('marco-rubio');
for (const id of [
  'rubio-20-to-30-million-illegal-immigrants-2024',
  'rubio-no-mass-shooting-guns-gun-show-internet-2022',
  'rubio-demings-abolish-police-thoughtful-2022',
]) {
  if (!(rubioP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('marco-rubio missing docket id: ' + id);
  }
}
for (const f of (rubioP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('marco-rubio dual-cite collision: ' + f.id);
}

// Mike Pompeo integrity gate (multi-entry)
const pompeo = scores['mike-pompeo'];
if (!pompeo || pompeo.n < 2) throw new Error('mike-pompeo needs ≥2 verified falsehoods, got ' + (pompeo?.n ?? 0));
if (pompeo.score > 75) throw new Error('mike-pompeo score expected ≤75, got ' + pompeo.score);
const pompeoP = getProfileBySlug('mike-pompeo');
if (!(pompeoP.documentedFalsehoods || []).some((f) => f.id === 'pompeo-defended-every-person-yovanovitch-2020')) {
  throw new Error('mike-pompeo missing Yovanovitch docket id');
}
if (!(pompeoP.documentedFalsehoods || []).some((f) => f.id === 'pompeo-trump-did-not-threaten-cultural-sites-2020')) {
  throw new Error('mike-pompeo missing cultural sites docket id');
}
for (const f of (pompeoP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mike-pompeo dual-cite collision: ' + f.id);
}

// Lindsey Graham multi-entry integrity deep-dive
const graham = scores['lindsey-graham'];
if (!graham || graham.n < 2) throw new Error('lindsey-graham needs ≥2 verified falsehoods, got ' + (graham?.n ?? 0));
if (graham.score > 75) throw new Error('lindsey-graham score expected ≤75 after deep dive, got ' + graham.score);
const grahamP = getProfileBySlug('lindsey-graham');
for (const id of [
  'graham-bbb-3-trillion-deficit-2021',
  'graham-impeachment-due-process-2019',
]) {
  if (!(grahamP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('lindsey-graham missing docket id: ' + id);
  }
}
for (const f of (grahamP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('graham dual-cite collision: ' + f.id);
}

// Tom Cotton integrity gate (multi-entry)
const cotton = scores['tom-cotton'];
if (!cotton || cotton.n < 3) throw new Error('tom-cotton needs ≥3 verified falsehoods, got ' + (cotton?.n ?? 0));
if (cotton.score > 50) throw new Error('tom-cotton score expected ≤50 after densify, got ' + cotton.score);
const cottonP = getProfileBySlug('tom-cotton');
for (const id of [
  'cotton-no-way-to-screen-immigrants-covid-2021',
  'cotton-halted-deportations-all-criminals-2021',
  'cotton-obama-hijacked-farm-bill-food-stamps-2014',
]) {
  if (!(cottonP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('tom-cotton missing docket id: ' + id);
  }
}
for (const f of (cottonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('cotton dual-cite collision: ' + f.id);
}

// Chuck Schumer multi-entry (Pants on Fire Tillerson + Afghanistan False)
const schumer = scores['chuck-schumer'];
if (!schumer || schumer.n < 3) throw new Error('chuck-schumer needs ≥3 verified falsehoods, got ' + (schumer?.n ?? 0));
if (schumer.score > 50) throw new Error('chuck-schumer score expected ≤50 after densify, got ' + schumer.score);
const schumerP = getProfileBySlug('chuck-schumer');
for (const id of [
  'schumer-tillerson-wont-divest-exxon-2017',
  'schumer-all-americans-out-afghanistan-2021',
  'schumer-black-white-student-debt-95-percent-2021',
]) {
  if (!(schumerP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('chuck-schumer missing docket id: ' + id);
  }
}
for (const f of (schumerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('schumer dual-cite collision: ' + f.id);
}

// Adam Schiff integrity gate
const schiff = scores['adam-schiff'];
if (!schiff || schiff.n < 2) throw new Error('adam-schiff needs ≥2 verified falsehoods, got ' + (schiff?.n ?? 0));
if (schiff.score > 75) throw new Error('adam-schiff score expected ≤75, got ' + schiff.score);
const schiffP = getProfileBySlug('adam-schiff');
if (!(schiffP.documentedFalsehoods || []).some((f) => f.id === 'schiff-not-spoken-whistleblower-2019')) {
  throw new Error('adam-schiff missing whistleblower docket id');
}
if (!(schiffP.documentedFalsehoods || []).some((f) => f.id === 'schiff-secret-service-trump-golf-carts-2018')) {
  throw new Error('adam-schiff missing Secret Service golf-cart docket id');
}
for (const f of (schiffP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('adam-schiff dual-cite collision: ' + f.id);
}
for (const f of (schiffP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('schiff dual-cite collision: ' + f.id);
}

// Cory Booker integrity gate
const booker = scores['cory-booker'];
if (!booker || booker.n < 2) throw new Error('cory-booker needs ≥2 verified falsehoods, got ' + (booker?.n ?? 0));
if (booker.score > 75) throw new Error('cory-booker score expected ≤75 after dual-cite densify, got ' + booker.score);
const bookerP = getProfileBySlug('cory-booker');
if (!(bookerP.documentedFalsehoods || []).some((f) => f.id === 'booker-nonexistent-cbo-medicare-50-2019')) {
  throw new Error('cory-booker missing CBO Medicare docket id');
}
if (!(bookerP.documentedFalsehoods || []).some((f) => f.id === 'booker-farmer-suicides-great-depression-2019')) {
  throw new Error('cory-booker missing farmer-suicides Great Depression docket id');
}
for (const f of (bookerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('booker dual-cite collision: ' + f.id);
}

// Nancy Pelosi integrity gate
const pelosi = scores['nancy-pelosi'];
if (!pelosi || pelosi.n < 3) throw new Error('nancy-pelosi needs ≥3 verified falsehoods, got ' + (pelosi?.n ?? 0));
if (pelosi.score > 60) throw new Error('nancy-pelosi score expected ≤60 after densify, got ' + pelosi.score);
const pelosiP = getProfileBySlug('nancy-pelosi');
for (const id of [
  'pelosi-not-told-waterboarding-eits-2009',
  'pelosi-fewer-came-under-biden-than-trump-2024',
  'pelosi-trump-morbidly-obese-2020',
]) {
  if (!(pelosiP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('nancy-pelosi missing docket id: ' + id);
  }
}
for (const f of (pelosiP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('nancy-pelosi dual-cite collision: ' + f.id);
}

// Bernie Sanders integrity gate
const sanders = scores['bernie-sanders'];
if (!sanders || sanders.n < 2) throw new Error('bernie-sanders needs ≥2 verified falsehoods, got ' + (sanders?.n ?? 0));
if (sanders.score > 75) throw new Error('bernie-sanders score expected ≤75, got ' + sanders.score);
const sandersP = getProfileBySlug('bernie-sanders');
if (!(sandersP.documentedFalsehoods || []).some((f) => f.id === 'sanders-twice-health-spending-any-country-2015')) {
  throw new Error('bernie-sanders missing health-spending docket id');
}
if (!(sandersP.documentedFalsehoods || []).some((f) => f.id === 'sanders-40-percent-guns-no-background-checks-2018')) {
  throw new Error('bernie-sanders missing 40% guns background-check docket id');
}
for (const f of (sandersP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bernie-sanders dual-cite collision: ' + f.id);
}

// Hakeem Jeffries integrity gate
const jeffries = scores['hakeem-jeffries'];
if (!jeffries || jeffries.n < 2) throw new Error('hakeem-jeffries needs ≥2 verified falsehoods, got ' + (jeffries?.n ?? 0));
if (jeffries.score > 75) throw new Error('hakeem-jeffries score expected ≤75, got ' + jeffries.score);
const jeffriesP = getProfileBySlug('hakeem-jeffries');
if (!(jeffriesP.documentedFalsehoods || []).some((f) => f.id === 'jeffries-trump-budget-2-trillion-entitlements-2018')) {
  throw new Error('hakeem-jeffries missing $2T budget docket id');
}
if (!(jeffriesP.documentedFalsehoods || []).some((f) => f.id === 'jeffries-ballroom-presidents-main-priority-2025')) {
  throw new Error('hakeem-jeffries missing ballroom main-priority docket id');
}
for (const f of (jeffriesP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('hakeem-jeffries dual-cite collision: ' + f.id);
}

// Elizabeth Warren multi-entry integrity deep-dive
const warren = scores['elizabeth-warren'];
if (!warren || warren.n < 2) throw new Error('elizabeth-warren needs ≥2 verified falsehoods, got ' + (warren?.n ?? 0));
if (warren.score > 75) throw new Error('elizabeth-warren score expected ≤75 after deep dive, got ' + warren.score);
const warrenP = getProfileBySlug('elizabeth-warren');
for (const id of [
  'warren-flat-wages-2020',
  'warren-klobuchar-health-plan-two-paragraphs-2020',
]) {
  if (!(warrenP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('elizabeth-warren missing docket id: ' + id);
  }
}
for (const f of (warrenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('warren dual-cite collision: ' + f.id);
}

// Jared Kushner integrity gate (Pants on Fire Russia ads)
const kushner = scores['jared-kushner'];
if (!kushner || kushner.n < 1) throw new Error('jared-kushner needs ≥1 verified falsehood, got ' + (kushner?.n ?? 0));
if (kushner.score > 80) throw new Error('jared-kushner score expected ≤80, got ' + kushner.score);
const kushnerP = getProfileBySlug('jared-kushner');
if (!(kushnerP.documentedFalsehoods || []).some((f) => f.id === 'kushner-russia-couple-facebook-ads-2019')) {
  throw new Error('jared-kushner missing Russia Facebook-ads docket id');
}
for (const f of (kushnerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kushner dual-cite collision: ' + f.id);
}

// Rand Paul integrity gate
const randPaul = scores['rand-paul'];
if (!randPaul || randPaul.n < 2) throw new Error('rand-paul needs ≥2 verified falsehoods, got ' + (randPaul?.n ?? 0));
if (randPaul.score > 75) throw new Error('rand-paul score expected ≤75, got ' + randPaul.score);
const randPaulP = getProfileBySlug('rand-paul');
if (!(randPaulP.documentedFalsehoods || []).some((f) => f.id === 'paul-no-omicron-hospitalizations-2022')) {
  throw new Error('rand-paul missing omicron hospitalizations docket id');
}
if (!(randPaulP.documentedFalsehoods || []).some((f) => f.id === 'paul-70pct-foreign-aid-stolen-2017')) {
  throw new Error('rand-paul missing 70% foreign-aid docket id');
}
for (const f of (randPaulP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rand-paul dual-cite collision: ' + f.id);
}

// Ilhan Omar integrity gate
const omar = scores['ilhan-omar'];
if (!omar || omar.n < 2) throw new Error('ilhan-omar needs ≥2 verified falsehoods, got ' + (omar?.n ?? 0));
if (omar.score > 75) throw new Error('ilhan-omar score expected ≤75, got ' + omar.score);
const omarP = getProfileBySlug('ilhan-omar');
if (!(omarP.documentedFalsehoods || []).some((f) => f.id === 'omar-cair-founded-after-911-2019')) {
  throw new Error('ilhan-omar missing CAIR founding docket id');
}
if (!(omarP.documentedFalsehoods || []).some((f) => f.id === 'omar-57-cents-defense-budget-2019')) {
  throw new Error('ilhan-omar missing 57% defense docket id');
}
for (const f of (omarP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('ilhan-omar dual-cite collision: ' + f.id);
}
for (const f of (omarP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('omar dual-cite collision: ' + f.id);
}

// AOC multi-entry integrity deep-dive
const aoc = scores['aoc'];
if (!aoc || aoc.n < 2) throw new Error('aoc needs ≥2 verified falsehoods, got ' + (aoc?.n ?? 0));
if (aoc.score > 75) throw new Error('aoc score expected ≤75 after deep dive, got ' + aoc.score);
const aocP = getProfileBySlug('aoc');
for (const id of [
  'aoc-pentagon-21t-accounting-m4a-2018',
  'aoc-represents-more-than-manchin-2021',
]) {
  if (!(aocP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('aoc missing docket id: ' + id);
  }
}
for (const f of (aocP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('aoc dual-cite collision: ' + f.id);
}

// Matt Gaetz integrity gate
const gaetz = scores['matt-gaetz'];
if (!gaetz || gaetz.n < 3) throw new Error('matt-gaetz needs ≥3 verified falsehoods, got ' + (gaetz?.n ?? 0));
if (gaetz.score > 60) throw new Error('matt-gaetz score expected ≤60, got ' + gaetz.score);
const gaetzP = getProfileBySlug('matt-gaetz');
if (!(gaetzP.documentedFalsehoods || []).some((f) => f.id === 'gaetz-one-in-five-federal-murder-illegal-aliens-2019')) {
  throw new Error('matt-gaetz missing 1-in-5 murder docket id');
}
if (!(gaetzP.documentedFalsehoods || []).some((f) => f.id === 'gaetz-irs-arming-up-biden-disarming-2022')) {
  throw new Error('matt-gaetz missing IRS arming docket id');
}
if (!(gaetzP.documentedFalsehoods || []).some((f) => f.id === 'gaetz-fbi-actively-investigating-clinton-sept-2016')) {
  throw new Error('matt-gaetz missing FBI Clinton investigation docket id');
}
for (const f of (gaetzP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('matt-gaetz dual-cite collision: ' + f.id);
}

// Elise Stefanik integrity gate
const stefanik = scores['elise-stefanik'];
if (!stefanik || stefanik.n < 3) throw new Error('elise-stefanik needs ≥3 verified falsehoods, got ' + (stefanik?.n ?? 0));
if (stefanik.score > 50) throw new Error('elise-stefanik score expected ≤50 after densify, got ' + stefanik.score);
const stefanikP = getProfileBySlug('elise-stefanik');
for (const id of [
  'stefanik-hr1-prevent-removal-ineligible-voters-2021',
  'stefanik-53-percent-laptop-changed-vote-2023',
  'stefanik-fulton-140k-ineligible-voters-jan6-2021',
]) {
  if (!(stefanikP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('elise-stefanik missing docket id: ' + id);
  }
}
for (const f of (stefanikP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('elise-stefanik dual-cite collision: ' + f.id);
}

// Tim Scott integrity gate (multi-entry)
const timScott = scores['tim-scott'];
if (!timScott || timScott.n < 3) throw new Error('tim-scott needs ≥3 verified falsehoods, got ' + (timScott?.n ?? 0));
if (timScott.score > 60) throw new Error('tim-scott score expected ≤60, got ' + timScott.score);
const timScottP = getProfileBySlug('tim-scott');
if (!(timScottP.documentedFalsehoods || []).some((f) => f.id === 'scott-secret-service-remains-unpaid-2026')) {
  throw new Error('tim-scott missing Secret Service unpaid docket id');
}
if (!(timScottP.documentedFalsehoods || []).some((f) => f.id === 'scott-irs-agents-90pct-under-200k-2022')) {
  throw new Error('tim-scott missing IRS 90% revenue docket id');
}
if (!(timScottP.documentedFalsehoods || []).some((f) => f.id === 'scott-more-encounters-biden-than-trump-obama-2023')) {
  throw new Error('tim-scott missing Biden vs Trump+Obama encounters docket id');
}
for (const f of (timScottP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('tim-scott dual-cite collision: ' + f.id);
}

// Kevin McCarthy integrity gate
const mccarthy = scores['kevin-mccarthy'];
if (!mccarthy || mccarthy.n < 2) throw new Error('kevin-mccarthy needs ≥2 verified falsehoods, got ' + (mccarthy?.n ?? 0));
if (mccarthy.score > 65) throw new Error('kevin-mccarthy score expected ≤65, got ' + mccarthy.score);
const mccarthyP = getProfileBySlug('kevin-mccarthy');
if (!(mccarthyP.documentedFalsehoods || []).some((f) => f.id === 'mccarthy-jan6-telecom-federal-law-violation-2021')) {
  throw new Error('kevin-mccarthy missing Jan. 6 telecom docket id');
}
if (!(mccarthyP.documentedFalsehoods || []).some((f) => f.id === 'mccarthy-nobody-questioning-election-legitimacy-2021')) {
  throw new Error('kevin-mccarthy missing election-legitimacy Pants-on-Fire docket id');
}
for (const f of (mccarthyP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kevin-mccarthy dual-cite collision: ' + f.id);
}

// Mike Johnson integrity gate
const mikeJohnson = scores['mike-johnson'];
if (!mikeJohnson || mikeJohnson.n < 3) throw new Error('mike-johnson needs ≥3 verified falsehoods, got ' + (mikeJohnson?.n ?? 0));
if (mikeJohnson.score > 50) throw new Error('mike-johnson score expected ≤50, got ' + mikeJohnson.score);
const mikeJohnsonP = getProfileBySlug('mike-johnson');
if (!(mikeJohnsonP.documentedFalsehoods || []).some((f) => f.id === 'johnson-parolees-simply-register-to-vote-dmv-2024')) {
  throw new Error('mike-johnson missing parolee DMV voter-registration docket id');
}
if (!(mikeJohnsonP.documentedFalsehoods || []).some((f) => f.id === 'johnson-not-cutting-snap-2025')) {
  throw new Error('mike-johnson missing not-cutting-SNAP docket id');
}
if (!(mikeJohnsonP.documentedFalsehoods || []).some((f) => f.id === 'johnson-1-percent-federal-employees-in-office-2024')) {
  throw new Error('mike-johnson missing 1% federal-employees-in-office docket id');
}
for (const f of (mikeJohnsonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mike-johnson dual-cite collision: ' + f.id);
}

// Jim Jordan integrity gate (multi-entry)
const jordan = scores['jim-jordan'];
if (!jordan || jordan.n < 2) throw new Error('jim-jordan needs ≥2 verified falsehoods, got ' + (jordan?.n ?? 0));
if (jordan.score > 75) throw new Error('jim-jordan score expected ≤75, got ' + jordan.score);
const jordanP = getProfileBySlug('jim-jordan');
if (!(jordanP.documentedFalsehoods || []).some((f) => f.id === 'jordan-whistleblower-form-changed-firsthand-2019')) {
  throw new Error('jim-jordan missing whistleblower form docket id');
}
if (!(jordanP.documentedFalsehoods || []).some((f) => f.id === 'jordan-record-inflation-two-years-2023')) {
  throw new Error('jim-jordan missing record inflation docket id');
}
for (const f of (jordanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('jim-jordan dual-cite collision: ' + f.id);
}

// Dianne Feinstein integrity gate (multi-entry)
const feinstein = scores['dianne-feinstein'];
if (!feinstein || feinstein.n < 2) throw new Error('dianne-feinstein needs ≥2 verified falsehoods, got ' + (feinstein?.n ?? 0));
if (feinstein.score > 75) throw new Error('dianne-feinstein score expected ≤75, got ' + feinstein.score);
const feinsteinP = getProfileBySlug('dianne-feinstein');
if (!(feinsteinP.documentedFalsehoods || []).some((f) => f.id === 'feinstein-no-regulation-commercial-drones-2013')) {
  throw new Error('dianne-feinstein missing commercial drones docket id');
}
if (!(feinsteinP.documentedFalsehoods || []).some((f) => f.id === 'feinstein-more-gun-deaths-by-far-2019')) {
  throw new Error('dianne-feinstein missing gun-deaths docket id');
}
for (const f of (feinsteinP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('dianne-feinstein dual-cite collision: ' + f.id);
}

const docketCount = PROFILES.filter((p) => p.documentedFalsehoods != null).length;
if (docketCount < 41) throw new Error('expected ≥41 compiled dockets, got ' + docketCount);

console.log(JSON.stringify({ clean: clean.score, demo: demo.score, docketCount, scores }, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
