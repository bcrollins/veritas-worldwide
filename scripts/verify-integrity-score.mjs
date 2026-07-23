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
  'elon-musk',
  'michael-flynn',
  'steve-bannon',
  'rashida-tlaib',
  'tucker-carlson',
  'james-comey',
  'john-brennan',
  'roger-stone',
  'paul-manafort',
  'joe-rogan',
  'ben-shapiro',
  'sam-bankman-fried',
  'david-petraeus',
  'erik-prince',
  'james-clapper',
  'mark-zuckerberg',
  'karl-rove',
  'rahm-emanuel',
  'yoav-gallant',
  'john-bolton',
  'leon-black',
  'rupert-murdoch',
  'jamie-dimon',
  'charles-koch',
  'jeff-bezos',
  'alan-dershowitz',
  'les-wexner',
  'larry-fink',
  'michael-bloomberg',
  'henry-kissinger',
  'robert-mercer',
  'tony-podesta',
  'peter-thiel',
  'ken-griffin',
  'bill-gates',
  'george-soros',
  'sheldon-adelson',
  'larry-ellison',
  'marc-andreessen',
  'reid-hoffman',
  'john-podesta',
  'paul-singer',
  'bernard-marcus',
  'haim-saban',
  'warren-buffett',
  'howard-kohr',
  'miriam-adelson',
  'john-fetterman',
  'josh-gottheimer',
  'jacky-rosen',
  'brad-sherman',
  'ritchie-torres',
  'ben-cardin',
  'rachel-maddow',
  'robert-mueller',
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
if (!kamala || kamala.n < 3) throw new Error('kamala-harris needs ≥3 verified falsehoods, got ' + (kamala?.n ?? 0));
if (kamala.score > 60) throw new Error('kamala-harris score expected ≤60 after densify, got ' + kamala.score);
const kamalaP = getProfileBySlug('kamala-harris');
const kamalaIds = new Set((kamalaP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'harris-pregnancy-monitoring-project-2025-2024',
  'harris-no-troops-combat-zone-debate-2024',
  'harris-middle-class-tax-hike-refund-2019',
]) {
  if (!kamalaIds.has(id)) throw new Error('kamala-harris missing docket id: ' + id);
}
for (const f of (kamalaP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kamala dual-cite collision: ' + f.id);
}

// Benjamin Netanyahu dual-cited integrity densify (egregious wartime falsehoods)
const bibi = scores['benjamin-netanyahu'];
if (!bibi || bibi.n < 3) throw new Error('benjamin-netanyahu needs ≥3 verified falsehoods, got ' + (bibi?.n ?? 0));
if (bibi.score > 30) throw new Error('benjamin-netanyahu score expected ≤30 after densify, got ' + bibi.score);
const bibiP = getProfileBySlug('benjamin-netanyahu');
const bibiIds = new Set((bibiP.documentedFalsehoods || []).map((f) => f.id));
for (const id of [
  'netanyahu-no-starvation-gaza-2025',
  'netanyahu-icc-starvation-nonsense-congress-2024',
  'netanyahu-enough-aid-entering-gaza-2024',
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

// Mitch McConnell multi-entry expansion (n≥3 densify)
const mcconnell = scores['mitch-mcconnell'];
if (!mcconnell || mcconnell.n < 3) throw new Error('mitch-mcconnell needs ≥3 verified falsehoods, got ' + (mcconnell?.n ?? 0));
if (mcconnell.score > 60) throw new Error('mitch-mcconnell score expected ≤60 after densify, got ' + mcconnell.score);
const mcconnellP = getProfileBySlug('mitch-mcconnell');
for (const id of [
  'mcconnell-garland-election-year-scotus-2016',
  'mcconnell-freedom-to-vote-sprawling-takeover-2022',
  'mcconnell-obama-nominees-faster-than-bush-2013',
]) {
  if (!(mcconnellP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('mitch-mcconnell missing docket id: ' + id);
  }
}
for (const f of (mcconnellP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mitch-mcconnell dual-cite collision: ' + f.id);
}

// Nikki Haley dual-cited integrity deep-dive (n≥3 densify)
const haley = scores['nikki-haley'];
if (!haley || haley.n < 3) throw new Error('nikki-haley needs ≥3 verified falsehoods, got ' + (haley?.n ?? 0));
if (haley.score > 60) throw new Error('nikki-haley score expected ≤60 after densify, got ' + haley.score);
const haleyP = getProfileBySlug('nikki-haley');
for (const id of [
  'haley-texas-secession-right-2024',
  'haley-biden-harris-massive-tax-hikes-working-families-2020',
  'haley-july4-cookout-67pct-inflation-2022',
]) {
  if (!(haleyP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('nikki-haley missing docket id: ' + id);
  }
}
for (const f of (haleyP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('haley dual-cite collision: ' + f.id);
}

// Antony Blinken densify gate (n≥3)
const blinken = scores['antony-blinken'];
if (!blinken || blinken.n < 3) throw new Error('antony-blinken needs ≥3 verified falsehoods, got ' + (blinken?.n ?? 0));
if (blinken.score > 40) throw new Error('antony-blinken score expected ≤40 after densify, got ' + blinken.score);
const blinkenP = getProfileBySlug('antony-blinken');
for (const id of [
  'blinken-nsm20-israel-not-restricting-aid-2024',
  'blinken-ihl-compliance-certification-nsm20-2024',
  'blinken-afghanistan-americans-remaining-near-100-2021',
]) {
  if (!(blinkenP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('antony-blinken missing docket id: ' + id);
  }
}
for (const f of (blinkenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('blinken dual-cite collision: ' + f.id);
}

// Bill Clinton multi-entry densify (Lewinsky denial + obstruction + alone-with denials)
const bill = scores['bill-clinton'];
if (!bill || bill.n < 3) throw new Error('bill-clinton needs ≥3 verified falsehoods, got ' + (bill?.n ?? 0));
if (bill.score > 30) throw new Error('bill-clinton score expected ≤30 after densify, got ' + bill.score);
const billP = getProfileBySlug('bill-clinton');
for (const id of [
  'bill-clinton-lewinsky-denial-1998',
  'bill-clinton-never-told-anyone-to-lie-1998',
  'bill-clinton-never-alone-lewinsky-1998',
]) {
  if (!(billP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('bill-clinton missing docket id: ' + id);
  }
}
for (const f of (billP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bill-clinton dual-cite collision: ' + f.id);
}

// Hillary Clinton multi-entry densify (Bosnia + email + subpoena)
const hillary = scores['hillary-clinton'];
if (!hillary || hillary.n < 3) throw new Error('hillary-clinton needs ≥3 verified falsehoods, got ' + (hillary?.n ?? 0));
if (hillary.score > 50) throw new Error('hillary-clinton score expected ≤50 after densify, got ' + hillary.score);
const hillaryP = getProfileBySlug('hillary-clinton');
for (const id of [
  'hillary-clinton-bosnia-sniper-fire-2008',
  'hillary-clinton-email-no-classified-2015-2016',
  'hillary-clinton-never-had-subpoena-2015',
]) {
  if (!(hillaryP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('hillary-clinton missing docket id: ' + id);
  }
}
for (const f of (hillaryP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('hillary-clinton dual-cite collision: ' + f.id);
}

// Barack Obama multi-entry densify (keep-your-plan + steel + caveat rewrite)
const obama = scores['barack-obama'];
if (!obama || obama.n < 3) throw new Error('barack-obama needs ≥3 verified falsehoods, got ' + (obama?.n ?? 0));
if (obama.score > 40) throw new Error('barack-obama score expected ≤40 after densify, got ' + obama.score);
const obamaP = getProfileBySlug('barack-obama');
for (const id of [
  'obama-keep-your-plan-2013',
  'obama-steel-production-2016',
  'obama-keep-plan-caveat-rewrite-2013',
]) {
  if (!(obamaP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('barack-obama missing docket id: ' + id);
  }
}
for (const f of (obamaP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('barack-obama dual-cite collision: ' + f.id);
}

// Mike Pence dual-cited densify gate (n≥3)
const pence = scores['mike-pence'];
if (!pence || pence.n < 3) throw new Error('mike-pence needs ≥3 verified falsehoods, got ' + (pence?.n ?? 0));
if (pence.score > 60) throw new Error('mike-pence score expected ≤60 after densify, got ' + pence.score);
const penceP = getProfileBySlug('mike-pence');
for (const id of [
  'pence-border-wall-remain-mexico-90-percent-2022',
  'pence-china-travel-ban-all-travel-2020',
  'pence-testing-generating-more-cases-2020',
]) {
  if (!(penceP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('mike-pence missing docket id: ' + id);
  }
}
for (const f of (penceP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('pence dual-cite collision: ' + f.id);
}

// Dick Cheney WMD densify gate (n≥3)
const cheney = scores['dick-cheney'];
if (!cheney || cheney.n < 3) throw new Error('dick-cheney needs ≥3 verified falsehoods, got ' + (cheney?.n ?? 0));
if (cheney.score > 30) throw new Error('dick-cheney score expected ≤30 after densify, got ' + cheney.score);
const cheneyP = getProfileBySlug('dick-cheney');
for (const id of [
  'cheney-iraq-reconstituted-nuclear-weapons-2003',
  'cheney-iraq-al-qaeda-link-certainty-2003',
  'cheney-iraq-mobile-bioweapons-labs-2003',
]) {
  if (!(cheneyP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('dick-cheney missing docket id: ' + id);
  }
}
for (const f of (cheneyP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('cheney dual-cite collision: ' + f.id);
}

// Bob Menendez multi-entry (bribery denials vs conviction)
const menendez = scores['bob-menendez'];
if (!menendez || menendez.n < 3) throw new Error('bob-menendez needs ≥3 verified falsehoods, got ' + (menendez?.n ?? 0));
if (menendez.score > 40) throw new Error('bob-menendez score expected ≤40 after densify, got ' + menendez.score);
const menendezP = getProfileBySlug('bob-menendez');
for (const id of [
  'menendez-not-accepting-bribes-denial',
  'menendez-innocent-after-conviction-2024',
  'menendez-not-foreign-agent-denial',
]) {
  if (!(menendezP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('bob-menendez missing docket id: ' + id);
  }
}
for (const f of (menendezP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('menendez dual-cite collision: ' + f.id);
}

// Prince Andrew multi-entry densify (Pizza Express + sweat + Epstein cut-ties)
const andrew = scores['prince-andrew'];
if (!andrew || andrew.n < 3) throw new Error('prince-andrew needs ≥3 verified falsehoods, got ' + (andrew?.n ?? 0));
if (andrew.score > 50) throw new Error('prince-andrew score expected ≤50 after densify, got ' + andrew.score);
const andrewP = getProfileBySlug('prince-andrew');
for (const id of [
  'andrew-newsnight-pizza-express-2019',
  'andrew-newsnight-cannot-sweat-2019',
  'andrew-cut-ties-epstein-2010-false',
]) {
  if (!(andrewP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('prince-andrew missing docket id: ' + id);
  }
}
for (const f of (andrewP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('prince-andrew dual-cite collision: ' + f.id);
}

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
if (!pompeo || pompeo.n < 3) throw new Error('mike-pompeo needs ≥3 verified falsehoods, got ' + (pompeo?.n ?? 0));
if (pompeo.score > 60) throw new Error('mike-pompeo score expected ≤60 after densify, got ' + pompeo.score);
const pompeoP = getProfileBySlug('mike-pompeo');
for (const id of [
  'pompeo-defended-every-person-yovanovitch-2020',
  'pompeo-trump-did-not-threaten-cultural-sites-2020',
  'pompeo-covid-lab-enormous-evidence-2020',
]) {
  if (!(pompeoP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('mike-pompeo missing docket id: ' + id);
  }
}
for (const f of (pompeoP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mike-pompeo dual-cite collision: ' + f.id);
}

// Lindsey Graham multi-entry integrity deep-dive (n≥3 densify)
const graham = scores['lindsey-graham'];
if (!graham || graham.n < 3) throw new Error('lindsey-graham needs ≥3 verified falsehoods, got ' + (graham?.n ?? 0));
if (graham.score > 60) throw new Error('lindsey-graham score expected ≤60 after densify, got ' + graham.score);
const grahamP = getProfileBySlug('lindsey-graham');
for (const id of [
  'graham-bbb-3-trillion-deficit-2021',
  'graham-impeachment-due-process-2019',
  'graham-student-loan-surcharge-healthcare-2010',
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
if (!schiff || schiff.n < 3) throw new Error('adam-schiff needs ≥3 verified falsehoods, got ' + (schiff?.n ?? 0));
if (schiff.score > 60) throw new Error('adam-schiff score expected ≤60 after densify, got ' + schiff.score);
const schiffP = getProfileBySlug('adam-schiff');
for (const id of [
  'schiff-not-spoken-whistleblower-2019',
  'schiff-secret-service-trump-golf-carts-2018',
  'schiff-whistleblower-statutory-anonymity-2019',
]) {
  if (!(schiffP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('adam-schiff missing docket id: ' + id);
  }
}
for (const f of (schiffP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('adam-schiff dual-cite collision: ' + f.id);
}
for (const f of (schiffP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('schiff dual-cite collision: ' + f.id);
}

// Cory Booker integrity gate (n≥3 densify)
const booker = scores['cory-booker'];
if (!booker || booker.n < 3) throw new Error('cory-booker needs ≥3 verified falsehoods, got ' + (booker?.n ?? 0));
if (booker.score > 60) throw new Error('cory-booker score expected ≤60 after densify, got ' + booker.score);
const bookerP = getProfileBySlug('cory-booker');
for (const id of [
  'booker-nonexistent-cbo-medicare-50-2019',
  'booker-farmer-suicides-great-depression-2019',
  'booker-trump-cut-doj-domestic-terror-funding-2019',
]) {
  if (!(bookerP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('cory-booker missing docket id: ' + id);
  }
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

// Bernie Sanders integrity gate (n≥3 densify)
const sanders = scores['bernie-sanders'];
if (!sanders || sanders.n < 3) throw new Error('bernie-sanders needs ≥3 verified falsehoods, got ' + (sanders?.n ?? 0));
if (sanders.score > 60) throw new Error('bernie-sanders score expected ≤60 after densify, got ' + sanders.score);
const sandersP = getProfileBySlug('bernie-sanders');
for (const id of [
  'sanders-twice-health-spending-any-country-2015',
  'sanders-40-percent-guns-no-background-checks-2018',
  'sanders-only-primary-candidate-voted-against-all-trump-defense-budgets-2019',
]) {
  if (!(sandersP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('bernie-sanders missing docket id: ' + id);
  }
}
for (const f of (sandersP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bernie-sanders dual-cite collision: ' + f.id);
}

// Hakeem Jeffries integrity gate (n≥3 densify)
const jeffries = scores['hakeem-jeffries'];
if (!jeffries || jeffries.n < 3) throw new Error('hakeem-jeffries needs ≥3 verified falsehoods, got ' + (jeffries?.n ?? 0));
if (jeffries.score > 60) throw new Error('hakeem-jeffries score expected ≤60 after densify, got ' + jeffries.score);
const jeffriesP = getProfileBySlug('hakeem-jeffries');
for (const id of [
  'jeffries-trump-budget-2-trillion-entitlements-2018',
  'jeffries-ballroom-presidents-main-priority-2025',
  'jeffries-trump-more-debt-any-president-2023',
]) {
  if (!(jeffriesP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('hakeem-jeffries missing docket id: ' + id);
  }
}
for (const f of (jeffriesP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('hakeem-jeffries dual-cite collision: ' + f.id);
}

// Elizabeth Warren multi-entry integrity deep-dive
const warren = scores['elizabeth-warren'];
if (!warren || warren.n < 3) throw new Error('elizabeth-warren needs ≥3 verified falsehoods, got ' + (warren?.n ?? 0));
if (warren.score > 60) throw new Error('elizabeth-warren score expected ≤60 after densify, got ' + warren.score);
const warrenP = getProfileBySlug('elizabeth-warren');
for (const id of [
  'warren-flat-wages-2020',
  'warren-klobuchar-health-plan-two-paragraphs-2020',
  'warren-student-debt-5-percent-whites-after-20-years-2021',
]) {
  if (!(warrenP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('elizabeth-warren missing docket id: ' + id);
  }
}
for (const f of (warrenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('warren dual-cite collision: ' + f.id);
}

// Jared Kushner densify gate (n≥3)
const kushner = scores['jared-kushner'];
if (!kushner || kushner.n < 3) throw new Error('jared-kushner needs ≥3 verified falsehoods, got ' + (kushner?.n ?? 0));
if (kushner.score > 50) throw new Error('jared-kushner score expected ≤50 after densify, got ' + kushner.score);
const kushnerP = getProfileBySlug('jared-kushner');
for (const id of [
  'kushner-russia-couple-facebook-ads-2019',
  'kushner-stockpile-not-for-states-2020',
  'kushner-sf86-omitted-russian-contacts-2017',
]) {
  if (!(kushnerP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('jared-kushner missing docket id: ' + id);
  }
}
for (const f of (kushnerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kushner dual-cite collision: ' + f.id);
}

// Jeffrey Epstein densify gate (n≥3)
const epstein = scores['jeffrey-epstein'];
if (!epstein || epstein.n < 3) throw new Error('jeffrey-epstein needs ≥3 verified falsehoods, got ' + (epstein?.n ?? 0));
if (epstein.score > 30) throw new Error('jeffrey-epstein score expected ≤30 after densify, got ' + epstein.score);
const epsteinP = getProfileBySlug('jeffrey-epstein');
for (const id of [
  'epstein-not-a-sex-offender-post-plea',
  'epstein-2008-plea-closed-federal-jeopardy',
  'epstein-victims-were-prostitutes-minimization',
]) {
  if (!(epsteinP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('jeffrey-epstein missing docket id: ' + id);
  }
}
for (const f of (epsteinP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('epstein dual-cite collision: ' + f.id);
}

// Ghislaine Maxwell densify gate (n≥3)
const maxwell = scores['ghislaine-maxwell'];
if (!maxwell || maxwell.n < 3) throw new Error('ghislaine-maxwell needs ≥3 verified falsehoods, got ' + (maxwell?.n ?? 0));
if (maxwell.score > 30) throw new Error('ghislaine-maxwell score expected ≤30 after densify, got ' + maxwell.score);
const maxwellP = getProfileBySlug('ghislaine-maxwell');
for (const id of [
  'maxwell-not-guilty-trafficking-2021',
  'maxwell-never-participated-trafficking-scheme',
  'maxwell-sentencing-denial-of-responsibility-2022',
]) {
  if (!(maxwellP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('ghislaine-maxwell missing docket id: ' + id);
  }
}
for (const f of (maxwellP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('maxwell dual-cite collision: ' + f.id);
}

// Rand Paul integrity gate (n≥3 densify)
const randPaul = scores['rand-paul'];
if (!randPaul || randPaul.n < 3) throw new Error('rand-paul needs ≥3 verified falsehoods, got ' + (randPaul?.n ?? 0));
if (randPaul.score > 60) throw new Error('rand-paul score expected ≤60 after densify, got ' + randPaul.score);
const randPaulP = getProfileBySlug('rand-paul');
for (const id of [
  'paul-no-omicron-hospitalizations-2022',
  'paul-70pct-foreign-aid-stolen-2017',
  'paul-trump-ukraine-exactly-like-biden-2019',
]) {
  if (!(randPaulP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('rand-paul missing docket id: ' + id);
  }
}
for (const f of (randPaulP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rand-paul dual-cite collision: ' + f.id);
}

// Ilhan Omar integrity gate (n≥3 densify)
const omar = scores['ilhan-omar'];
if (!omar || omar.n < 3) throw new Error('ilhan-omar needs ≥3 verified falsehoods, got ' + (omar?.n ?? 0));
if (omar.score > 60) throw new Error('ilhan-omar score expected ≤60 after densify, got ' + omar.score);
const omarP = getProfileBySlug('ilhan-omar');
for (const id of [
  'omar-cair-founded-after-911-2019',
  'omar-57-cents-defense-budget-2019',
  'omar-500-gun-deaths-per-day-2019',
]) {
  if (!(omarP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('ilhan-omar missing docket id: ' + id);
  }
}
for (const f of (omarP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('ilhan-omar dual-cite collision: ' + f.id);
}

// AOC multi-entry integrity deep-dive
const aoc = scores['aoc'];
if (!aoc || aoc.n < 3) throw new Error('aoc needs ≥3 verified falsehoods, got ' + (aoc?.n ?? 0));
if (aoc.score > 50) throw new Error('aoc score expected ≤50 after densify, got ' + aoc.score);
const aocP = getProfileBySlug('aoc');
for (const id of [
  'aoc-pentagon-21t-accounting-m4a-2018',
  'aoc-represents-more-than-manchin-2021',
  'aoc-unemployment-low-everyone-two-jobs-2018',
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
if (!mccarthy || mccarthy.n < 3) throw new Error('kevin-mccarthy needs ≥3 verified falsehoods, got ' + (mccarthy?.n ?? 0));
if (mccarthy.score > 40) throw new Error('kevin-mccarthy score expected ≤40 after densify, got ' + mccarthy.score);
const mccarthyP = getProfileBySlug('kevin-mccarthy');
for (const id of [
  'mccarthy-jan6-telecom-federal-law-violation-2021',
  'mccarthy-nobody-questioning-election-legitimacy-2021',
  'mccarthy-us-never-asked-land-after-wars-2023',
]) {
  if (!(mccarthyP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('kevin-mccarthy missing docket id: ' + id);
  }
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

// Jim Jordan integrity gate (n≥3 densify)
const jordan = scores['jim-jordan'];
if (!jordan || jordan.n < 3) throw new Error('jim-jordan needs ≥3 verified falsehoods, got ' + (jordan?.n ?? 0));
if (jordan.score > 60) throw new Error('jim-jordan score expected ≤60 after densify, got ' + jordan.score);
const jordanP = getProfileBySlug('jim-jordan');
for (const id of [
  'jordan-whistleblower-form-changed-firsthand-2019',
  'jordan-record-inflation-two-years-2023',
  'jordan-ukrainians-never-promised-investigation-2019',
]) {
  if (!(jordanP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('jim-jordan missing docket id: ' + id);
  }
}
for (const f of (jordanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('jim-jordan dual-cite collision: ' + f.id);
}

// Dianne Feinstein integrity gate (multi-entry)
const feinstein = scores['dianne-feinstein'];
if (!feinstein || feinstein.n < 3) throw new Error('dianne-feinstein needs ≥3 verified falsehoods, got ' + (feinstein?.n ?? 0));
if (feinstein.score > 60) throw new Error('dianne-feinstein score expected ≤60 after densify, got ' + feinstein.score);
const feinsteinP = getProfileBySlug('dianne-feinstein');
for (const id of [
  'feinstein-no-regulation-commercial-drones-2013',
  'feinstein-more-gun-deaths-by-far-2019',
  'feinstein-assault-weapons-ban-stopped-mass-shootings-2019',
]) {
  if (!(feinsteinP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('dianne-feinstein missing docket id: ' + id);
  }
}
for (const f of (feinsteinP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('dianne-feinstein dual-cite collision: ' + f.id);
}


// Elon Musk densify gate (n≥3)
const musk = scores['elon-musk'];
if (!musk || musk.n < 3) throw new Error('elon-musk needs ≥3 verified falsehoods, got ' + (musk?.n ?? 0));
if (musk.score > 50) throw new Error('elon-musk score expected ≤50 after densify, got ' + musk.score);
const muskP = getProfileBySlug('elon-musk');
for (const id of [
  'musk-cbp-one-free-flights-illegal-immigration-2024',
  'musk-nbc-covered-up-hunter-biden-laptop-2022',
  'musk-biden-recruiting-immigrants-democratic-majority-2024',
]) {
  if (!(muskP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('elon-musk missing docket id: ' + id);
  }
}
for (const f of (muskP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('musk dual-cite collision: ' + f.id);
}

// Michael Flynn densify gate (n≥3)
const flynn = scores['michael-flynn'];
if (!flynn || flynn.n < 3) throw new Error('michael-flynn needs ≥3 verified falsehoods, got ' + (flynn?.n ?? 0));
if (flynn.score > 30) throw new Error('michael-flynn score expected ≤30 after densify, got ' + flynn.score);
const flynnP = getProfileBySlug('michael-flynn');
for (const id of [
  'flynn-lied-to-fbi-kislyak-denial-2017',
  'flynn-no-turkish-agent-work-undisclosed-2016',
  'flynn-qanon-martial-law-overturn-2020',
]) {
  if (!(flynnP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('michael-flynn missing docket id: ' + id);
  }
}
for (const f of (flynnP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('flynn dual-cite collision: ' + f.id);
}

// Steve Bannon densify gate (n≥3)
const bannon = scores['steve-bannon'];
if (!bannon || bannon.n < 3) throw new Error('steve-bannon needs ≥3 verified falsehoods, got ' + (bannon?.n ?? 0));
if (bannon.score > 30) throw new Error('steve-bannon score expected ≤30 after densify, got ' + bannon.score);
const bannonP = getProfileBySlug('steve-bannon');
for (const id of [
  'bannon-we-build-the-wall-funds-for-wall-2019',
  'bannon-not-required-to-comply-jan6-subpoena',
  'bannon-war-room-stolen-election-certainty-2020',
]) {
  if (!(bannonP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('steve-bannon missing docket id: ' + id);
  }
}
for (const f of (bannonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bannon dual-cite collision: ' + f.id);
}

// Rashida Tlaib integrity gate (n≥1 seed)
const tlaib = scores['rashida-tlaib'];
if (!tlaib || tlaib.n < 3) throw new Error('rashida-tlaib needs ≥1 verified falsehood, got ' + (tlaib?.n ?? 0));
if (tlaib.score > 60) throw new Error('rashida-tlaib score expected ≤60 after densify, got ' + tlaib.score);
const tlaibP = getProfileBySlug('rashida-tlaib');
if (!(tlaibP.documentedFalsehoods || []).some((f) => f.id === 'tlaib-detroit-police-health-spending-2020')) {
  throw new Error('rashida-tlaib missing Detroit budget docket id');
}
for (const f of (tlaibP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('tlaib dual-cite collision: ' + f.id);
}


// Tucker Carlson densify gate (n≥3)
const tucker = scores['tucker-carlson'];
if (!tucker || tucker.n < 3) throw new Error('tucker-carlson needs ≥3 verified falsehoods, got ' + (tucker?.n ?? 0));
if (tucker.score > 50) throw new Error('tucker-carlson score expected ≤50 after densify, got ' + tucker.score);
const tuckerP = getProfileBySlug('tucker-carlson');
for (const id of [
  'carlson-capitol-police-no-firearms-jan6-2023',
  'carlson-fbi-orchestrated-jan6-2021',
  'carlson-migrants-illegal-voting-comparison-2024',
]) {
  if (!(tuckerP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('tucker-carlson missing docket id: ' + id);
  }
}
for (const f of (tuckerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('tucker dual-cite collision: ' + f.id);
}


// James Comey densify gate (n≥3)
const comey = scores['james-comey'];
if (!comey || comey.n < 3) throw new Error('james-comey needs ≥3 verified falsehoods, got ' + (comey?.n ?? 0));
if (comey.score > 50) throw new Error('james-comey score expected ≤50 after densify, got ' + comey.score);
const comeyP = getProfileBySlug('james-comey');
for (const id of [
  'comey-not-a-leaker-memo-2017',
  'comey-clinton-email-exoneration-certainty-2016',
  'comey-weiner-laptop-october-surprise-process-2016',
]) {
  if (!(comeyP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('james-comey missing docket id: ' + id);
  }
}
for (const f of (comeyP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('comey dual-cite collision: ' + f.id);
}


// John Brennan densify gate (n≥3)
const brennan = scores['john-brennan'];
if (!brennan || brennan.n < 3) throw new Error('john-brennan needs ≥3 verified falsehoods, got ' + (brennan?.n ?? 0));
if (brennan.score > 60) throw new Error('john-brennan score expected ≤60 after densify, got ' + brennan.score);
const brennanP = getProfileBySlug('john-brennan');
for (const id of [
  'brennan-trump-campaign-not-spied-on-2018',
  'brennan-russian-bounties-high-confidence-framing-2020',
  'brennan-hacking-allegation-cohen-computer-2018',
]) {
  if (!(brennanP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('john-brennan missing docket id: ' + id);
  }
}
for (const f of (brennanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('brennan dual-cite collision: ' + f.id);
}


// Roger Stone densify gate (n≥3)
const stoneS = scores['roger-stone'];
if (!stoneS || stoneS.n < 3) throw new Error('roger-stone needs ≥3 verified falsehoods, got ' + (stoneS?.n ?? 0));
if (stoneS.score > 30) throw new Error('roger-stone score expected ≤30 after densify, got ' + stoneS.score);
const stoneP = getProfileBySlug('roger-stone');
for (const id of ['stone-no-wikileaks-contact-denial-2016','stone-false-statements-congress-wikileaks-2017','stone-credico-witness-tampering-2018']) {
  if (!(stoneP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('roger-stone missing docket id: ' + id);
}
for (const f of (stoneP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('stone dual-cite collision: ' + f.id);
}

// Paul Manafort densify gate (n≥3)
const manafortS = scores['paul-manafort'];
if (!manafortS || manafortS.n < 3) throw new Error('paul-manafort needs ≥3 verified falsehoods, got ' + (manafortS?.n ?? 0));
if (manafortS.score > 30) throw new Error('paul-manafort score expected ≤30 after densify, got ' + manafortS.score);
const manafortP = getProfileBySlug('paul-manafort');
for (const id of ['manafort-ukraine-lobbying-fara-concealment','manafort-tax-bank-fraud-denials-2018','manafort-no-coordination-while-sharing-polling-kilimnik']) {
  if (!(manafortP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('paul-manafort missing docket id: ' + id);
}
for (const f of (manafortP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('manafort dual-cite collision: ' + f.id);
}


// Joe Rogan densify gate (n≥3)
const rogan = scores['joe-rogan'];
if (!rogan || rogan.n < 3) throw new Error('joe-rogan needs ≥3 verified falsehoods, got ' + (rogan?.n ?? 0));
if (rogan.score > 60) throw new Error('joe-rogan score expected ≤60 after densify, got ' + rogan.score);
const roganP = getProfileBySlug('joe-rogan');
for (const id of ['rogan-mrna-vaccines-gene-therapy-2021','rogan-healthy-people-dont-need-vaccine-framing-2021','rogan-ivermectin-horse-paste-minimization-context-2021']) {
  if (!(roganP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('joe-rogan missing docket id: ' + id);
}
for (const f of (roganP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rogan dual-cite collision: ' + f.id);
}


// Ben Shapiro densify gate (n≥3)
const shapiro = scores['ben-shapiro'];
if (!shapiro || shapiro.n < 3) throw new Error('ben-shapiro needs ≥3 verified falsehoods, got ' + (shapiro?.n ?? 0));
if (shapiro.score > 50) throw new Error('ben-shapiro score expected ≤50 after densify, got ' + shapiro.score);
const shapiroP = getProfileBySlug('ben-shapiro');
for (const id of ['shapiro-majority-muslims-radicals-2014','shapiro-biden-job-figures-2021-didnt-count-2022','shapiro-absolute-framing-on-crime-cities-selective']) {
  if (!(shapiroP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('ben-shapiro missing docket id: ' + id);
}
for (const f of (shapiroP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('shapiro dual-cite collision: ' + f.id);
}


// Sam Bankman-Fried densify gate (n≥3)
const sbf = scores['sam-bankman-fried'];
if (!sbf || sbf.n < 3) throw new Error('sam-bankman-fried needs ≥3 verified falsehoods, got ' + (sbf?.n ?? 0));
if (sbf.score > 30) throw new Error('sam-bankman-fried score expected ≤30 after densify, got ' + sbf.score);
const sbfP = getProfileBySlug('sam-bankman-fried');
for (const id of ['sbf-ftx-customer-funds-safe-denial-2022','sbf-alameda-arm-length-independence-false','sbf-not-guilty-fraud-trial-posture-2023']) {
  if (!(sbfP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('sam-bankman-fried missing docket id: ' + id);
}
for (const f of (sbfP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('sbf dual-cite collision: ' + f.id);
}


// David Petraeus densify gate (n≥3)
const petraeus = scores['david-petraeus'];
if (!petraeus || petraeus.n < 3) throw new Error('david-petraeus needs ≥3 verified falsehoods, got ' + (petraeus?.n ?? 0));
if (petraeus.score > 40) throw new Error('david-petraeus score expected ≤40 after densify, got ' + petraeus.score);
const petraeusP = getProfileBySlug('david-petraeus');
for (const id of ['petraeus-affair-denial-initial-2012','petraeus-no-classified-to-broadwell-framing','petraeus-fbi-interview-incomplete-truth-2012']) {
  if (!(petraeusP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('david-petraeus missing docket id: ' + id);
}
for (const f of (petraeusP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('petraeus dual-cite collision: ' + f.id);
}


// Erik Prince densify gate (n≥3)
const prince = scores['erik-prince'];
if (!prince || prince.n < 3) throw new Error('erik-prince needs ≥3 verified falsehoods, got ' + (prince?.n ?? 0));
if (prince.score > 50) throw new Error('erik-prince score expected ≤50 after densify, got ' + prince.score);
const princeP = getProfileBySlug('erik-prince');
for (const id of ['prince-blackwater-nisour-innocent-framing','prince-no-weapons-trafficking-denial-record','prince-seymour-hersh-yemen-denial-framing-2019']) {
  if (!(princeP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('erik-prince missing docket id: ' + id);
}
for (const f of (princeP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('prince dual-cite collision: ' + f.id);
}


// James Clapper densify gate (n≥3)
const clapper = scores['james-clapper'];
if (!clapper || clapper.n < 3) throw new Error('james-clapper needs ≥3 verified falsehoods, got ' + (clapper?.n ?? 0));
if (clapper.score > 50) throw new Error('james-clapper score expected ≤50 after densify, got ' + clapper.score);
const clapperP = getProfileBySlug('james-clapper');
for (const id of [
  'clapper-no-bulk-collection-senate-2013',
  'clapper-least-untruthful-reframing-not-false-2013',
  'clapper-not-under-oath-excuse-overstated',
]) {
  if (!(clapperP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('james-clapper missing docket id: ' + id);
  }
}
for (const f of (clapperP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('clapper dual-cite collision: ' + f.id);
}

// Mark Zuckerberg densify gate (n≥3)
const zuckS = scores['mark-zuckerberg'];
if (!zuckS || zuckS.n < 3) throw new Error('mark-zuckerberg needs ≥3 verified falsehoods, got ' + (zuckS?.n ?? 0));
if (zuckS.score > 50) throw new Error('mark-zuckerberg score expected ≤50 after densify, got ' + zuckS.score);
const zuckP = getProfileBySlug('mark-zuckerberg');
for (const id of [
  'zuckerberg-we-dont-sell-data-absolute-2018',
  'zuckerberg-cambridge-analytica-not-a-data-breach-framing-2018',
  'zuckerberg-russian-ads-small-and-insignificant-2017',
]) {
  if (!(zuckP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('mark-zuckerberg missing docket id: ' + id);
  }
}
for (const f of (zuckP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('zuckerberg dual-cite collision: ' + f.id);
}


// Karl Rove densify gate (n≥3)
const rove = scores['karl-rove'];
if (!rove || rove.n < 3) throw new Error('karl-rove needs ≥3 verified falsehoods, got ' + (rove?.n ?? 0));
if (rove.score > 70) throw new Error('karl-rove score expected ≤70 after densify, got ' + rove.score);
const roveP = getProfileBySlug('karl-rove');
for (const id of [
  'rove-us-attorneys-performance-only-2007',
  'rove-plame-not-involved-absolute-framing',
  'rove-2000-florida-absolute-victory-framing',
]) {
  if (!(roveP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('karl-rove missing docket id: ' + id);
  }
}
for (const f of (roveP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rove dual-cite collision: ' + f.id);
}

// Rahm Emanuel densify gate (n≥3)
const rahm = scores['rahm-emanuel'];
if (!rahm || rahm.n < 3) throw new Error('rahm-emanuel needs ≥3 verified falsehoods, got ' + (rahm?.n ?? 0));
if (rahm.score > 50) throw new Error('rahm-emanuel score expected ≤50 after densify, got ' + rahm.score);
const rahmP = getProfileBySlug('rahm-emanuel');
for (const id of [
  'emanuel-chicago-crime-down-absolute-framing',
  'emanuel-laquan-mcdonald-video-withholding-necessity',
  'emanuel-cps-closures-purely-educational-necessity',
]) {
  if (!(rahmP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('rahm-emanuel missing docket id: ' + id);
  }
}
for (const f of (rahmP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rahm dual-cite collision: ' + f.id);
}

// Yoav Gallant densify gate (n≥3)
const gallant = scores['yoav-gallant'];
if (!gallant || gallant.n < 3) throw new Error('yoav-gallant needs ≥3 verified falsehoods, got ' + (gallant?.n ?? 0));
if (gallant.score > 30) throw new Error('yoav-gallant score expected ≤30 after densify, got ' + gallant.score);
const gallantP = getProfileBySlug('yoav-gallant');
for (const id of [
  'gallant-complete-siege-no-electricity-water-fuel-2023',
  'gallant-human-animals-dehumanization-policy-framing-2023',
  'gallant-adequate-aid-facilitation-vs-siege-record-2023-2024',
]) {
  if (!(gallantP.documentedFalsehoods || []).some((f) => f.id === id)) {
    throw new Error('yoav-gallant missing docket id: ' + id);
  }
}
for (const f of (gallantP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('gallant dual-cite collision: ' + f.id);
}


// John Bolton densify gate (n≥3)
const bolton = scores['john-bolton'];
if (!bolton || bolton.n < 3) throw new Error('john-bolton needs ≥3 verified falsehoods, got ' + (bolton?.n ?? 0));
if (bolton.score > 50) throw new Error('john-bolton score expected ≤50 after densify, got ' + bolton.score);
const boltonP = getProfileBySlug('john-bolton');
for (const id of [
  'bolton-iraq-wmd-certainty-prewar-framing',
  'bolton-libya-model-for-north-korea-absolute-success',
  'bolton-jcpoa-sunset-absolute-iran-nuclear-breakout-framing',
]) {
  if (!(boltonP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('john-bolton missing docket id: ' + id);
}
for (const f of (boltonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bolton dual-cite collision: ' + f.id);
}

// Leon Black densify gate (n≥3)
const leon = scores['leon-black'];
if (!leon || leon.n < 3) throw new Error('leon-black needs ≥3 verified falsehoods, got ' + (leon?.n ?? 0));
if (leon.score > 50) throw new Error('leon-black score expected ≤50 after densify, got ' + leon.score);
const leonP = getProfileBySlug('leon-black');
for (const id of [
  'black-epstein-fees-ordinary-tax-advice-only',
  'black-no-knowledge-epstein-crimes-absolute',
  'black-apollo-investors-fully-informed-epstein-fees',
]) {
  if (!(leonP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('leon-black missing docket id: ' + id);
}
for (const f of (leonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('leon dual-cite collision: ' + f.id);
}


// Rupert Murdoch densify gate (n≥3)
const murdoch = scores['rupert-murdoch'];
if (!murdoch || murdoch.n < 3) throw new Error('rupert-murdoch needs ≥3 verified falsehoods, got ' + (murdoch?.n ?? 0));
if (murdoch.score > 40) throw new Error('rupert-murdoch score expected ≤40 after densify, got ' + murdoch.score);
const murdochP = getProfileBySlug('rupert-murdoch');
for (const id of [
  'murdoch-phone-hacking-isolated-rogue-reporters',
  'murdoch-most-humble-day-vs-prior-knowledge-framing',
  'murdoch-fox-dominion-election-fraud-broadcast-absolutes',
]) {
  if (!(murdochP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('rupert-murdoch missing docket id: ' + id);
}
for (const f of (murdochP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('murdoch dual-cite collision: ' + f.id);
}

// Jamie Dimon densify gate (n≥3)
const dimon = scores['jamie-dimon'];
if (!dimon || dimon.n < 3) throw new Error('jamie-dimon needs ≥3 verified falsehoods, got ' + (dimon?.n ?? 0));
if (dimon.score > 60) throw new Error('jamie-dimon score expected ≤60 after densify, got ' + dimon.score);
const dimonP = getProfileBySlug('jamie-dimon');
for (const id of [
  'dimon-london-whale-tempest-in-teapot-2012',
  'dimon-fortress-risk-controls-absolute-pre-whale',
  'dimon-fully-transparent-with-regulators-whale-period',
]) {
  if (!(dimonP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('jamie-dimon missing docket id: ' + id);
}
for (const f of (dimonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('dimon dual-cite collision: ' + f.id);
}


// Charles Koch densify gate (n≥3)
const koch = scores['charles-koch'];
if (!koch || koch.n < 3) throw new Error('charles-koch needs ≥3 verified falsehoods, got ' + (koch?.n ?? 0));
if (koch.score > 70) throw new Error('charles-koch score expected ≤70 after densify, got ' + koch.score);
const kochP = getProfileBySlug('charles-koch');
for (const id of [
  'koch-no-climate-denial-funding-absolute',
  'koch-americans-for-prosperity-grassroots-only-framing',
  'koch-no-influence-on-state-legislation-absolute',
]) {
  if (!(kochP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('charles-koch missing docket id: ' + id);
}
for (const f of (kochP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('koch dual-cite collision: ' + f.id);
}

// Jeff Bezos densify gate (n≥3)
const bezos = scores['jeff-bezos'];
if (!bezos || bezos.n < 3) throw new Error('jeff-bezos needs ≥3 verified falsehoods, got ' + (bezos?.n ?? 0));
if (bezos.score > 70) throw new Error('jeff-bezos score expected ≤70 after densify, got ' + bezos.score);
const bezosP = getProfileBySlug('jeff-bezos');
for (const id of [
  'bezos-amazon-warehouse-safety-excellent-absolute',
  'bezos-amazon-not-a-monopoly-absolute-antitrust-framing',
  'bezos-customer-obsession-never-harms-workers-absolute',
]) {
  if (!(bezosP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('jeff-bezos missing docket id: ' + id);
}
for (const f of (bezosP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bezos dual-cite collision: ' + f.id);
}

// Alan Dershowitz densify gate (n≥3)
const dersh = scores['alan-dershowitz'];
if (!dersh || dersh.n < 3) throw new Error('alan-dershowitz needs ≥3 verified falsehoods, got ' + (dersh?.n ?? 0));
if (dersh.score > 60) throw new Error('alan-dershowitz score expected ≤60 after densify, got ' + dersh.score);
const dershP = getProfileBySlug('alan-dershowitz');
for (const id of [
  'dershowitz-epstein-npa-perfectly-proper-absolute',
  'dershowitz-never-met-giuffre-absolute-vs-later-record',
  'dershowitz-epstein-was-not-a-sex-trafficker-public-minimization',
]) {
  if (!(dershP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('alan-dershowitz missing docket id: ' + id);
}
for (const f of (dershP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('dershowitz dual-cite collision: ' + f.id);
}


// Les Wexner densify gate (n≥3)
const wexner = scores['les-wexner'];
if (!wexner || wexner.n < 3) throw new Error('les-wexner needs ≥3 verified falsehoods, got ' + (wexner?.n ?? 0));
if (wexner.score > 70) throw new Error('les-wexner score expected ≤70 after densify, got ' + wexner.score);
const wexnerP = getProfileBySlug('les-wexner');
for (const id of [
  'wexner-epstein-stole-everything-absolute-framing',
  'wexner-no-knowledge-epstein-abuse-absolute-post-2008',
  'wexner-fully-severed-ties-immediately-after-plea',
]) {
  if (!(wexnerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('les-wexner missing docket id: ' + id);
}
for (const f of (wexnerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('wexner dual-cite collision: ' + f.id);
}

// Larry Fink densify gate (n≥3)
const fink = scores['larry-fink'];
if (!fink || fink.n < 3) throw new Error('larry-fink needs ≥3 verified falsehoods, got ' + (fink?.n ?? 0));
if (fink.score > 80) throw new Error('larry-fink score expected ≤80 after densify, got ' + fink.score);
const finkP = getProfileBySlug('larry-fink');
for (const id of [
  'fink-esg-not-political-absolute-framing',
  'fink-blackrock-passive-only-no-power-absolute',
  'fink-forced-buying-of-all-stocks-not-a-choice-absolute',
]) {
  if (!(finkP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('larry-fink missing docket id: ' + id);
}
for (const f of (finkP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('fink dual-cite collision: ' + f.id);
}

// Michael Bloomberg densify gate (n≥3)
const bloomberg = scores['michael-bloomberg'];
if (!bloomberg || bloomberg.n < 3) throw new Error('michael-bloomberg needs ≥3 verified falsehoods, got ' + (bloomberg?.n ?? 0));
if (bloomberg.score > 50) throw new Error('michael-bloomberg score expected ≤50 after densify, got ' + bloomberg.score);
const bloombergP = getProfileBySlug('michael-bloomberg');
for (const id of [
  'bloomberg-stop-and-frisk-constitutional-absolute-defense',
  'bloomberg-soda-ban-purely-public-health-no-nanny-overreach',
  'bloomberg-2020-stop-and-frisk-apology-vs-prior-absolute-defense',
]) {
  if (!(bloombergP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('michael-bloomberg missing docket id: ' + id);
}
for (const f of (bloombergP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('bloomberg dual-cite collision: ' + f.id);
}


// Henry Kissinger densify gate (n≥3)
const kissinger = scores['henry-kissinger'];
if (!kissinger || kissinger.n < 3) throw new Error('henry-kissinger needs ≥3 verified falsehoods, got ' + (kissinger?.n ?? 0));
if (kissinger.score > 40) throw new Error('henry-kissinger score expected ≤40 after densify, got ' + kissinger.score);
const kissingerP = getProfileBySlug('henry-kissinger');
for (const id of [
  'kissinger-cambodia-bombing-secrecy-necessity-absolute',
  'kissinger-peace-is-at-hand-1972-absolute',
  'kissinger-chile-no-us-role-absolute-framing',
]) {
  if (!(kissingerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('henry-kissinger missing docket id: ' + id);
}
for (const f of (kissingerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kissinger dual-cite collision: ' + f.id);
}

// Robert Mercer densify gate (n≥3)
const mercer = scores['robert-mercer'];
if (!mercer || mercer.n < 3) throw new Error('robert-mercer needs ≥3 verified falsehoods, got ' + (mercer?.n ?? 0));
if (mercer.score > 60) throw new Error('robert-mercer score expected ≤60 after densify, got ' + mercer.score);
const mercerP = getProfileBySlug('robert-mercer');
for (const id of [
  'mercer-cambridge-analytica-no-meaningful-role-absolute',
  'mercer-breitbart-not-a-political-weapon-absolute',
  'mercer-no-coordination-with-trump-campaign-absolute',
]) {
  if (!(mercerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('robert-mercer missing docket id: ' + id);
}
for (const f of (mercerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mercer dual-cite collision: ' + f.id);
}

// Tony Podesta densify gate (n≥3)
const tonyP = scores['tony-podesta'];
if (!tonyP || tonyP.n < 3) throw new Error('tony-podesta needs ≥3 verified falsehoods, got ' + (tonyP?.n ?? 0));
if (tonyP.score > 70) throw new Error('tony-podesta score expected ≤70 after densify, got ' + tonyP.score);
const tonyProf = getProfileBySlug('tony-podesta');
for (const id of [
  'tony-podesta-unregistered-foreign-agent-denial-framing',
  'tony-podesta-no-manafortr-ukraine-problem-absolute',
  'tony-podesta-firm-closure-voluntary-rebrand-only',
]) {
  if (!(tonyProf.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('tony-podesta missing docket id: ' + id);
}
for (const f of (tonyProf.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('tony-podesta dual-cite collision: ' + f.id);
}


// Peter Thiel densify gate (n≥3)
const thiel = scores['peter-thiel'];
if (!thiel || thiel.n < 3) throw new Error('peter-thiel needs ≥3 verified falsehoods, got ' + (thiel?.n ?? 0));
if (thiel.score > 70) throw new Error('peter-thiel score expected ≤70 after densify, got ' + thiel.score);
const thielP = getProfileBySlug('peter-thiel');
for (const id of [
  'thiel-gawker-lawsuit-purely-privacy-not-destruction',
  'thiel-palantir-civil-liberties-absolute-clean-framing',
  'thiel-democracy-and-freedom-compatible-absolute-framing',
]) {
  if (!(thielP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('peter-thiel missing docket id: ' + id);
}
for (const f of (thielP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('thiel dual-cite collision: ' + f.id);
}

// Ken Griffin densify gate (n≥3)
const griffin = scores['ken-griffin'];
if (!griffin || griffin.n < 3) throw new Error('ken-griffin needs ≥3 verified falsehoods, got ' + (griffin?.n ?? 0));
if (griffin.score > 70) throw new Error('ken-griffin score expected ≤70 after densify, got ' + griffin.score);
const griffinP = getProfileBySlug('ken-griffin');
for (const id of [
  'griffin-payment-for-order-flow-no-conflict-absolute',
  'griffin-citadel-not-a-hedge-fund-market-maker-only-absolute',
  'griffin-robinhood-decision-independent-of-citadel-absolute',
]) {
  if (!(griffinP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('ken-griffin missing docket id: ' + id);
}
for (const f of (griffinP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('griffin dual-cite collision: ' + f.id);
}

// Bill Gates densify gate (n≥3)
const gatesS = scores['bill-gates'];
if (!gatesS || gatesS.n < 3) throw new Error('bill-gates needs ≥3 verified falsehoods, got ' + (gatesS?.n ?? 0));
if (gatesS.score > 80) throw new Error('bill-gates score expected ≤80 after densify, got ' + gatesS.score);
const gatesP = getProfileBySlug('bill-gates');
for (const id of [
  'gates-malaria-eradication-timeline-absolute-optimism',
  'gates-foundation-only-philanthropy-no-policy-power-absolute',
  'gates-covid-vaccine-ip-waiver-opposition-purely-production-capacity',
]) {
  if (!(gatesP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('bill-gates missing docket id: ' + id);
}
for (const f of (gatesP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('gates dual-cite collision: ' + f.id);
}


// George Soros densify gate (n≥3)
const soros = scores['george-soros'];
if (!soros || soros.n < 3) throw new Error('george-soros needs ≥3 verified falsehoods, got ' + (soros?.n ?? 0));
if (soros.score > 80) throw new Error('george-soros score expected ≤80 after densify, got ' + soros.score);
const sorosP = getProfileBySlug('george-soros');
for (const id of [
  'soros-open-society-no-political-agenda-absolute',
  'soros-1992-bank-of-england-pure-market-neutrality',
  'soros-not-a-political-actor-absolute-self-framing',
]) {
  if (!(sorosP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('george-soros missing docket id: ' + id);
}
for (const f of (sorosP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('soros dual-cite collision: ' + f.id);
}

// Sheldon Adelson densify gate (n≥3)
const adelson = scores['sheldon-adelson'];
if (!adelson || adelson.n < 3) throw new Error('sheldon-adelson needs ≥3 verified falsehoods, got ' + (adelson?.n ?? 0));
if (adelson.score > 50) throw new Error('sheldon-adelson score expected ≤50 after densify, got ' + adelson.score);
const adelsonP = getProfileBySlug('sheldon-adelson');
for (const id of [
  'adelson-casino-only-businessman-no-political-agenda-absolute',
  'adelson-macau-operations-purely-clean-absolute',
  'adelson-newspaper-ownership-pure-media-not-political-weapon',
]) {
  if (!(adelsonP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('sheldon-adelson missing docket id: ' + id);
}
for (const f of (adelsonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('adelson dual-cite collision: ' + f.id);
}

// Larry Ellison densify gate (n≥3)
const ellison = scores['larry-ellison'];
if (!ellison || ellison.n < 3) throw new Error('larry-ellison needs ≥3 verified falsehoods, got ' + (ellison?.n ?? 0));
if (ellison.score > 80) throw new Error('larry-ellison score expected ≤80 after densify, got ' + ellison.score);
const ellisonP = getProfileBySlug('larry-ellison');
for (const id of [
  'ellison-oracle-cloud-number-one-absolute-premature',
  'ellison-lanai-utopia-sustainable-absolute-framing',
  'ellison-tiktok-oracle-deal-pure-security-not-business',
]) {
  if (!(ellisonP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('larry-ellison missing docket id: ' + id);
}
for (const f of (ellisonP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('ellison dual-cite collision: ' + f.id);
}


// Marc Andreessen densify gate (n≥3)
const andreessen = scores['marc-andreessen'];
if (!andreessen || andreessen.n < 3) throw new Error('marc-andreessen needs ≥3 verified falsehoods, got ' + (andreessen?.n ?? 0));
if (andreessen.score > 80) throw new Error('marc-andreessen score expected ≤80 after densify, got ' + andreessen.score);
const andreessenP = getProfileBySlug('marc-andreessen');
for (const id of [
  'andreessen-tech-only-progress-no-tradeoffs-absolute',
  'andreessen-a16z-not-political-absolute-while-pac-spending',
  'andreessen-crypto-only-empowerment-no-fraud-vector-absolute',
]) {
  if (!(andreessenP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('marc-andreessen missing docket id: ' + id);
}
for (const f of (andreessenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('andreessen dual-cite collision: ' + f.id);
}

// Reid Hoffman densify gate (n≥3)
const hoffman = scores['reid-hoffman'];
if (!hoffman || hoffman.n < 3) throw new Error('reid-hoffman needs ≥3 verified falsehoods, got ' + (hoffman?.n ?? 0));
if (hoffman.score > 80) throw new Error('reid-hoffman score expected ≤80 after densify, got ' + hoffman.score);
const hoffmanP = getProfileBySlug('reid-hoffman');
for (const id of [
  'hoffman-linkedin-data-purely-user-controlled-absolute',
  'hoffman-soft-power-not-political-intervention-absolute',
  'hoffman-blitzscaling-no-externalities-absolute',
]) {
  if (!(hoffmanP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('reid-hoffman missing docket id: ' + id);
}
for (const f of (hoffmanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('hoffman dual-cite collision: ' + f.id);
}

// John Podesta densify gate (n≥3)
const johnPodesta = scores['john-podesta'];
if (!johnPodesta || johnPodesta.n < 3) throw new Error('john-podesta needs ≥3 verified falsehoods, got ' + (johnPodesta?.n ?? 0));
if (johnPodesta.score > 80) throw new Error('john-podesta score expected ≤80 after densify, got ' + johnPodesta.score);
const johnPodestaP = getProfileBySlug('john-podesta');
for (const id of [
  'john-podesta-clinton-email-no-big-deal-absolute-framing',
  'john-podesta-super-pac-coordination-firewall-absolute',
  'john-podesta-wikileaks-only-russia-no-content-substance-absolute',
]) {
  if (!(johnPodestaP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('john-podesta missing docket id: ' + id);
}
for (const f of (johnPodestaP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('john-podesta dual-cite collision: ' + f.id);
}


// Paul Singer densify gate (n≥3)
const singer = scores['paul-singer'];
if (!singer || singer.n < 3) throw new Error('paul-singer needs ≥3 verified falsehoods, got ' + (singer?.n ?? 0));
if (singer.score > 70) throw new Error('paul-singer score expected ≤70 after densify, got ' + singer.score);
const singerP = getProfileBySlug('paul-singer');
for (const id of [
  'singer-elliott-not-a-vulture-absolute-framing',
  'singer-pure-rule-of-law-no-political-agenda-argentina',
  'singer-no-systemic-harm-from-holdout-strategy-absolute',
]) {
  if (!(singerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('paul-singer missing docket id: ' + id);
}
for (const f of (singerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('singer dual-cite collision: ' + f.id);
}

// Bernard Marcus densify gate (n≥3)
const marcus = scores['bernard-marcus'];
if (!marcus || marcus.n < 3) throw new Error('bernard-marcus needs ≥3 verified falsehoods, got ' + (marcus?.n ?? 0));
if (marcus.score > 80) throw new Error('bernard-marcus score expected ≤80 after densify, got ' + marcus.score);
const marcusP = getProfileBySlug('bernard-marcus');
for (const id of [
  'marcus-home-depot-politics-pure-job-creator-no-agenda',
  'marcus-minimum-wage-kills-all-jobs-absolute',
  'marcus-retail-labor-no-exploitation-absolute',
]) {
  if (!(marcusP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('bernard-marcus missing docket id: ' + id);
}
for (const f of (marcusP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('marcus dual-cite collision: ' + f.id);
}

// Haim Saban densify gate (n≥3)
const saban = scores['haim-saban'];
if (!saban || saban.n < 3) throw new Error('haim-saban needs ≥3 verified falsehoods, got ' + (saban?.n ?? 0));
if (saban.score > 80) throw new Error('haim-saban score expected ≤80 after densify, got ' + saban.score);
const sabanP = getProfileBySlug('haim-saban');
for (const id of [
  'saban-one-issue-only-israel-absolute-self-framing',
  'saban-democratic-party-influence-pure-grassroots-absolute',
  'saban-media-ownership-pure-business-not-political-weapon',
]) {
  if (!(sabanP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('haim-saban missing docket id: ' + id);
}
for (const f of (sabanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('saban dual-cite collision: ' + f.id);
}


// Warren Buffett densify gate (n≥3)
const buffett = scores['warren-buffett'];
if (!buffett || buffett.n < 3) throw new Error('warren-buffett needs ≥3 verified falsehoods, got ' + (buffett?.n ?? 0));
if (buffett.score > 80) throw new Error('warren-buffett score expected ≤80 after densify, got ' + buffett.score);
const buffettP = getProfileBySlug('warren-buffett');
for (const id of [
  'buffett-never-used-derivatives-absolute-vs-practice',
  'buffett-tax-code-secretary-story-personal-absolute-generalization',
  'buffett-rating-agencies-not-to-blame-absolute-pre-crisis-framing',
]) {
  if (!(buffettP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('warren-buffett missing docket id: ' + id);
}
for (const f of (buffettP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('buffett dual-cite collision: ' + f.id);
}

// Howard Kohr densify gate (n≥3)
const kohr = scores['howard-kohr'];
if (!kohr || kohr.n < 3) throw new Error('howard-kohr needs ≥3 verified falsehoods, got ' + (kohr?.n ?? 0));
if (kohr.score > 80) throw new Error('howard-kohr score expected ≤80 after densify, got ' + kohr.score);
const kohrP = getProfileBySlug('howard-kohr');
for (const id of [
  'kohr-aipac-not-a-lobby-for-foreign-government-absolute',
  'kohr-aipac-bipartisan-only-no-partisan-capture-absolute',
  'kohr-aipac-pac-independent-no-coordination-absolute',
]) {
  if (!(kohrP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('howard-kohr missing docket id: ' + id);
}
for (const f of (kohrP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('kohr dual-cite collision: ' + f.id);
}

// Miriam Adelson densify gate (n≥3)
const miriam = scores['miriam-adelson'];
if (!miriam || miriam.n < 3) throw new Error('miriam-adelson needs ≥3 verified falsehoods, got ' + (miriam?.n ?? 0));
if (miriam.score > 70) throw new Error('miriam-adelson score expected ≤70 after densify, got ' + miriam.score);
const miriamP = getProfileBySlug('miriam-adelson');
for (const id of [
  'miriam-adelson-giving-pure-philanthropy-no-political-agenda',
  'miriam-adelson-israel-hayom-pure-media-not-political',
  'miriam-adelson-presidential-medal-merit-only-no-donor-politics',
]) {
  if (!(miriamP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('miriam-adelson missing docket id: ' + id);
}
for (const f of (miriamP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('miriam dual-cite collision: ' + f.id);
}

// John Fetterman densify gate (n≥3)
const fetterman = scores['john-fetterman'];
if (!fetterman || fetterman.n < 3) throw new Error('john-fetterman needs ≥3 verified falsehoods, got ' + (fetterman?.n ?? 0));
if (fetterman.score > 70) throw new Error('john-fetterman score expected ≤70 after densify, got ' + fetterman.score);
const fettermanP = getProfileBySlug('john-fetterman');
for (const id of [
  'fetterman-only-senate-candidate-backing-15-absolute-2016',
  'fetterman-progressive-brand-absolute-vs-later-israel-unconditional-aid',
  'fetterman-stroke-recovery-no-work-impact-absolute-campaign',
]) {
  if (!(fettermanP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('john-fetterman missing docket id: ' + id);
}
for (const f of (fettermanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('fetterman dual-cite collision: ' + f.id);
}

// Josh Gottheimer densify gate (n≥3)
const gottheimer = scores['josh-gottheimer'];
if (!gottheimer || gottheimer.n < 3) throw new Error('josh-gottheimer needs ≥3 verified falsehoods, got ' + (gottheimer?.n ?? 0));
if (gottheimer.score > 70) throw new Error('josh-gottheimer score expected ≤70 after densify, got ' + gottheimer.score);
const gottheimerP = getProfileBySlug('josh-gottheimer');
for (const id of [
  'gottheimer-problem-solvers-pure-bipartisan-not-donor-driven',
  'gottheimer-not-an-aipac-democrat-absolute',
  'gottheimer-progressive-challengers-antisemitic-absolute-framing',
]) {
  if (!(gottheimerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('josh-gottheimer missing docket id: ' + id);
}
for (const f of (gottheimerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('gottheimer dual-cite collision: ' + f.id);
}


// Jacky Rosen densify gate (n≥3)
const rosen = scores['jacky-rosen'];
if (!rosen || rosen.n < 3) throw new Error('jacky-rosen needs ≥3 verified falsehoods, got ' + (rosen?.n ?? 0));
if (rosen.score > 60) throw new Error('jacky-rosen score expected ≤60 after densify, got ' + rosen.score);
const rosenP = getProfileBySlug('jacky-rosen');
for (const id of ['jacky-rosen-not-an-aipac-democrat-absolute','jacky-rosen-unconditional-israel-aid-no-leverage-absolute','jacky-rosen-critics-of-israel-policy-antisemitic-absolute']) {
  if (!(rosenP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('jacky-rosen missing: ' + id);
}
for (const f of (rosenP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('rosen dual-cite collision: ' + f.id);
}

// Brad Sherman densify gate (n≥3)
const sherman = scores['brad-sherman'];
if (!sherman || sherman.n < 3) throw new Error('brad-sherman needs ≥3 verified falsehoods, got ' + (sherman?.n ?? 0));
if (sherman.score > 60) throw new Error('brad-sherman score expected ≤60 after densify, got ' + sherman.score);
const shermanP = getProfileBySlug('brad-sherman');
for (const id of ['brad-sherman-not-an-aipac-democrat-absolute','brad-sherman-unconditional-israel-aid-no-leverage-absolute','brad-sherman-critics-of-israel-policy-antisemitic-absolute']) {
  if (!(shermanP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('brad-sherman missing: ' + id);
}
for (const f of (shermanP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('sherman dual-cite collision: ' + f.id);
}

// Ritchie Torres densify gate (n≥3)
const torres = scores['ritchie-torres'];
if (!torres || torres.n < 3) throw new Error('ritchie-torres needs ≥3 verified falsehoods, got ' + (torres?.n ?? 0));
if (torres.score > 60) throw new Error('ritchie-torres score expected ≤60 after densify, got ' + torres.score);
const torresP = getProfileBySlug('ritchie-torres');
for (const id of ['ritchie-torres-not-an-aipac-democrat-absolute','ritchie-torres-unconditional-israel-aid-no-leverage-absolute','ritchie-torres-critics-of-israel-policy-antisemitic-absolute']) {
  if (!(torresP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('ritchie-torres missing: ' + id);
}
for (const f of (torresP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('torres dual-cite collision: ' + f.id);
}

// Ben Cardin densify gate (n≥3)
const cardin = scores['ben-cardin'];
if (!cardin || cardin.n < 3) throw new Error('ben-cardin needs ≥3 verified falsehoods, got ' + (cardin?.n ?? 0));
if (cardin.score > 60) throw new Error('ben-cardin score expected ≤60 after densify, got ' + cardin.score);
const cardinP = getProfileBySlug('ben-cardin');
for (const id of ['ben-cardin-not-an-aipac-democrat-absolute','ben-cardin-unconditional-israel-aid-no-leverage-absolute','ben-cardin-critics-of-israel-policy-antisemitic-absolute']) {
  if (!(cardinP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('ben-cardin missing: ' + id);
}
for (const f of (cardinP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('cardin dual-cite collision: ' + f.id);
}

// Rachel Maddow densify gate (n≥3)
const maddow = scores['rachel-maddow'];
if (!maddow || maddow.n < 3) throw new Error('rachel-maddow needs ≥3 verified falsehoods, got ' + (maddow?.n ?? 0));
if (maddow.score > 50) throw new Error('rachel-maddow score expected ≤50 after densify, got ' + maddow.score);
const maddowP = getProfileBySlug('rachel-maddow');
for (const id of [
  'maddow-russiagate-absolute-certainty-beyond-mueller-conspiracy',
  'maddow-trump-russian-asset-absolute-certainty',
  'maddow-overreached-russia-adjacent-story-arcs-absolute',
]) {
  if (!(maddowP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('rachel-maddow missing: ' + id);
}
for (const f of (maddowP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('maddow dual-cite collision: ' + f.id);
}

// Robert Mueller densify gate (n≥3)
const mueller = scores['robert-mueller'];
if (!mueller || mueller.n < 3) throw new Error('robert-mueller needs ≥3 verified falsehoods, got ' + (mueller?.n ?? 0));
if (mueller.score > 60) throw new Error('robert-mueller score expected ≤60 after densify, got ' + mueller.score);
const muellerP = getProfileBySlug('robert-mueller');
for (const id of [
  'mueller-fbi-anthrax-investigation-absolute-certainty-errors',
  'mueller-wmd-iraq-fbi-support-certainty-framing',
  'mueller-special-counsel-will-not-be-silent-then-silent-strategy',
]) {
  if (!(muellerP.documentedFalsehoods || []).some((f) => f.id === id)) throw new Error('robert-mueller missing: ' + id);
}
for (const f of (muellerP.documentedFalsehoods || []).filter((x) => x.tier === 'verified')) {
  if (f.statementUrl === f.debunkUrl) throw new Error('mueller dual-cite collision: ' + f.id);
}

const docketCount = PROFILES.filter((p) => p.documentedFalsehoods != null).length;
if (docketCount < 96) throw new Error('expected ≥96 compiled dockets, got ' + docketCount);

console.log(JSON.stringify({ clean: clean.score, demo: demo.score, docketCount, scores }, null, 2));
`,
  ],
  { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
)

if (r.status !== 0) fail(`runtime:\n${r.stderr || r.stdout}`)
console.log(r.stdout.trim())
console.log('[verify:integrity-score] PASS')
