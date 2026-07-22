#!/usr/bin/env node
/**
 * Export machine-readable power-profiles corpus for crawlers / GEO.
 * Parses src/data/profileData.ts + public/profiles/* without a full TS emit.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const profileDataPath = path.join(root, 'src', 'data', 'profileData.ts')
const profilesDir = path.join(root, 'public', 'profiles')
const outPublic = path.join(profilesDir, 'corpus.json')
const outDist = path.join(root, 'dist', 'profiles', 'corpus.json')

function decodeTsString(value) {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}

function loadPhotoMap() {
  const photos = {}
  if (!fs.existsSync(profilesDir)) return photos
  for (const name of fs.readdirSync(profilesDir)) {
    if (!/\.(jpe?g|png|svg|webp)$/i.test(name)) continue
    const stem = name.replace(/\.[^.]+$/, '')
    // Prefer jpg over svg if both somehow exist — readdir order not guaranteed.
    const rel = `/profiles/${name}`
    if (!photos[stem] || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
      photos[stem] = rel
    }
  }
  return photos
}

/** Rough integrity score from documentedFalsehoods block (verified-only deductions). */
function parseIntegrityFromWindow(window) {
  if (!window.includes('documentedFalsehoods:')) {
    return { integrityScore: null, integrityFalsehoods: 0, integrityHasDocket: false }
  }
  // Empty array → clean 100
  if (/documentedFalsehoods:\s*\[\s*\]/.test(window)) {
    return { integrityScore: 100, integrityFalsehoods: 0, integrityHasDocket: true }
  }
  const blockMatch = window.match(/documentedFalsehoods:\s*\[([\s\S]*?)\n\s*\],/)
  if (!blockMatch) {
    return { integrityScore: null, integrityFalsehoods: 0, integrityHasDocket: false }
  }
  const block = blockMatch[1]
  const severities = [...block.matchAll(/severity:\s*'(minor|material|egregious)'/g)].map((m) => m[1])
  const tiers = [...block.matchAll(/tier:\s*'(verified|circumstantial|disputed)'/g)].map((m) => m[1])
  const deduct = { minor: 8, material: 15, egregious: 25 }
  let total = 0
  let verified = 0
  for (let i = 0; i < severities.length; i++) {
    if ((tiers[i] || 'verified') !== 'verified') continue
    total += deduct[severities[i]] || 0
    verified += 1
  }
  return {
    integrityScore: Math.max(0, 100 - total),
    integrityFalsehoods: verified,
    integrityHasDocket: true,
  }
}

function parseProfiles() {
  const source = fs.readFileSync(profileDataPath, 'utf8')
  const photos = loadPhotoMap()
  const profiles = []
  // Capture through summary; tags/bioguide may sit before OR after summary in source.
  const pattern =
    /\{\s*id:\s*'([^']+)',\s*name:\s*'((?:\\.|[^'])*)',\s*title:\s*'((?:\\.|[^'])*)',\s*category:\s*'([^']+)',([\s\S]*?)summary:\s*'((?:\\.|[^'])*)'/g

  for (const match of source.matchAll(pattern)) {
    const id = match[1]
    const mid = match[5] || ''
    // Window after this profile's id for fields that often follow summary (tags, websites, …)
    const idIdx = match.index ?? source.indexOf(`id: '${id}'`)
    const nextId = source.indexOf("\n  {\n    id: '", idIdx + 10)
    const window = source.slice(idIdx, nextId > 0 ? nextId : idIdx + 25000)

    const bioguide =
      mid.match(/bioguideId:\s*'([^']+)'/) || window.match(/bioguideId:\s*'([^']+)'/)
    const tagsBlock = window.match(/tags:\s*\[([\s\S]*?)\]/)
    const tags = tagsBlock
      ? [...tagsBlock[1].matchAll(/'((?:\\.|[^'])*)'/g)].map((m) => decodeTsString(m[1]))
      : []
    const integrity = parseIntegrityFromWindow(window)
    profiles.push({
      id,
      name: decodeTsString(match[2]),
      title: decodeTsString(match[3]),
      category: match[4],
      summary: decodeTsString(match[6]),
      photo: photos[id] || `/profiles/${id}.svg`,
      url: `https://veritasworldwide.com/profile/${id}`,
      bioguideId: bioguide ? bioguide[1] : null,
      tags,
      ...integrity,
    })
  }

  return profiles
}

const profiles = parseProfiles()
if (profiles.length < 90) {
  console.error(`[export:profiles-corpus] FAIL — only ${profiles.length} profiles parsed`)
  process.exit(1)
}

const corpus = {
  generatedAt: new Date().toISOString(),
  count: profiles.length,
  profiles,
}

fs.mkdirSync(profilesDir, { recursive: true })
fs.writeFileSync(outPublic, `${JSON.stringify(corpus, null, 2)}\n`)

if (fs.existsSync(path.join(root, 'dist'))) {
  fs.mkdirSync(path.dirname(outDist), { recursive: true })
  fs.writeFileSync(outDist, `${JSON.stringify(corpus, null, 2)}\n`)
}

console.log(
  `[export:profiles-corpus] wrote ${profiles.length} profiles → public/profiles/corpus.json` +
    (fs.existsSync(path.join(root, 'dist')) ? ' + dist/profiles/corpus.json' : ''),
)
