#!/usr/bin/env node
/**
 * Ensure chapter heroes and gallery images are first-party /chapters/* assets.
 * Chapter 15 may reference ISRAEL_DOSSIER_CHAPTER_15.heroImage, which must resolve
 * to a local /chapters/heroes/* path via ISRAEL_DOSSIER_ASSETS.financial.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function assert(condition, message) {
  if (!condition) {
    console.error(`[verify:chapter-images] FAIL — ${message}`)
    process.exit(1)
  }
}

function resolveDossierFinancialHero() {
  const canon = fs.readFileSync(path.join(root, 'src/data/israelDossierCanon.ts'), 'utf8')
  const financial = canon.match(/financial:\s*['"]([^'"]+)['"]/)
  assert(financial, 'ISRAEL_DOSSIER_ASSETS.financial not found')
  const hero = financial[1]
  assert(
    hero.startsWith('/chapters/heroes/'),
    `ISRAEL_DOSSIER_ASSETS.financial must be first-party hero, got ${hero}`,
  )
  return hero
}

const meta = fs.readFileSync(path.join(root, 'src/data/chapterMeta.ts'), 'utf8')
const gallery = fs.readFileSync(path.join(root, 'src/data/chapterImages.ts'), 'utf8')
const dossierHero = resolveDossierFinancialHero()

assert(!meta.includes('upload.wikimedia.org'), 'chapterMeta still has Wikimedia hotlinks')
assert(!gallery.includes('upload.wikimedia.org'), 'chapterImages still has Wikimedia hotlinks')

const heroRefs = [...meta.matchAll(/heroImage:\s*['"](\/chapters\/heroes\/[^'"]+)['"]/g)].map((m) => m[1])
if (meta.includes('ISRAEL_DOSSIER_CHAPTER_15.heroImage')) {
  heroRefs.push(dossierHero)
}
assert(heroRefs.length >= 30, `expected ≥30 local chapter heroes in meta, got ${heroRefs.length}`)

const galleryRefs = [
  ...gallery.matchAll(/src:\s*['"](\/chapters\/heroes\/[^'"]+)['"]/g),
].map((m) => m[1])
if (gallery.includes('ISRAEL_DOSSIER_CHAPTER_15.heroImage')) {
  galleryRefs.push(dossierHero)
}
assert(galleryRefs.length >= 28, `expected ≥28 local gallery srcs, got ${galleryRefs.length}`)

const all = new Set([...heroRefs, ...galleryRefs])
for (const src of all) {
  const filePath = path.join(root, 'public', src.replace(/^\//, ''))
  assert(fs.existsSync(filePath), `missing public asset ${src}`)
  assert(fs.statSync(filePath).size > 5_000, `asset too small ${src}`)
}

// Content chapter sources must also be first-party (no Wikimedia hotlinks).
// Chapter 15 may use ISRAEL_DOSSIER_CHAPTER_15.heroImage which we already verified is local.
const chaptersDir = path.join(root, 'src', 'data', 'chapters')
if (fs.existsSync(chaptersDir)) {
  for (const f of fs.readdirSync(chaptersDir).filter((x) => x.endsWith('.ts'))) {
    const body = fs.readFileSync(path.join(chaptersDir, f), 'utf8')
    assert(!body.includes('upload.wikimedia.org'), `chapter source still hotlinks Wikimedia: ${f}`)
  }
}

console.log(
  `[verify:chapter-images] PASS — metaHeroes=${heroRefs.length} gallery=${galleryRefs.length} uniqueAssets=${all.size} dossierHero=${dossierHero}`,
)
