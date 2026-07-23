#!/usr/bin/env node
/**
 * Offline schema hygiene for Israel money trail / legal / lobby rows.
 * Soft on empty optional fields when type does not require them; hard on missing
 * amount+date+sourceUrl for money nodes and missing sourceUrl for legal/lobby.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const corpus = JSON.parse(
  fs.readFileSync(path.join(root, 'public/israel-dossier/corpus.json'), 'utf8'),
)
const failures = []

const money = corpus.moneyTrail || []
for (const n of money) {
  if (!n?.id) failures.push('money node missing id')
  if (n?.amount == null || n?.amount === '') failures.push(`money ${n?.id}: missing amount`)
  if (!n?.date) failures.push(`money ${n?.id}: missing date`)
  if (!n?.sourceUrl || !/^https?:\/\//i.test(n.sourceUrl)) {
    failures.push(`money ${n?.id}: missing/invalid sourceUrl`)
  }
}

const legal = corpus.legalCases || []
for (const c of legal) {
  if (!c?.title) failures.push('legal case missing title')
  if (!c?.sourceUrl || !/^https?:\/\//i.test(c.sourceUrl)) {
    failures.push(`legal ${c?.title || '?'}: missing/invalid sourceUrl`)
  }
}

const lobby = corpus.lobbying || []
for (const r of lobby) {
  if (!r?.organization) failures.push('lobby row missing organization')
  if (!r?.sourceUrl || !/^https?:\/\//i.test(r.sourceUrl)) {
    failures.push(`lobby ${r?.organization || '?'}: missing/invalid sourceUrl`)
  }
}

const actors = corpus.actors || []
if (actors.length < 10) failures.push(`actors roster too small: ${actors.length}`)

if (failures.length) {
  console.error('[verify:israel-schema-triples] FAIL')
  for (const f of failures.slice(0, 40)) console.error(' -', f)
  if (failures.length > 40) console.error(` ... +${failures.length - 40} more`)
  process.exit(1)
}
console.log(
  `[verify:israel-schema-triples] PASS — money=${money.length} legal=${legal.length} lobby=${lobby.length} actors=${actors.length}`,
)
