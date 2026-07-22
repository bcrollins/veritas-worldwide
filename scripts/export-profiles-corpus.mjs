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
