#!/usr/bin/env node
/**
 * generate-research-pack.mjs
 * Build-time offline research pack: public machine corpora + taxonomy + manifests.
 * Entity-only attribution. No personal operator identity in paths or README.
 *
 * Output: public/research-pack.zip + public/research-pack-manifest.json
 * Size budget: fail if zip > 8 MiB (keeps CDN/origin friendly).
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { deflateRawSync } from 'node:zlib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outZip = path.join(root, 'public', 'research-pack.zip')
const outManifest = path.join(root, 'public', 'research-pack-manifest.json')
const MAX_ZIP_BYTES = 8 * 1024 * 1024

/** @type {{ disk: string, archive: string, required?: boolean }[]} */
const ENTRIES = [
  { disk: 'public/evidence-taxonomy.json', archive: 'evidence-taxonomy.json', required: true },
  { disk: 'public/profiles/corpus.json', archive: 'profiles/corpus.json', required: true },
  { disk: 'public/record-of-jesus-christ/corpus.json', archive: 'record-of-jesus-christ/corpus.json', required: true },
  { disk: 'public/israel-dossier/corpus.json', archive: 'israel-dossier/corpus.json', required: true },
  { disk: 'public/profiles/soft-floor.json', archive: 'profiles/soft-floor.json' },
  { disk: 'public/record-of-jesus-christ/soft-floor.json', archive: 'record-of-jesus-christ/soft-floor.json' },
  { disk: 'public/israel-dossier/soft-floor.json', archive: 'israel-dossier/soft-floor.json' },
  { disk: 'public/israel-dossier/templates/manifest.json', archive: 'israel-dossier/templates/manifest.json' },
  { disk: 'public/israel-dossier/workbooks/manifest.json', archive: 'israel-dossier/workbooks/manifest.json' },
  { disk: 'public/llms.txt', archive: 'llms.txt' },
]

function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1
  }
  return ~c >>> 0
}

function dosDateTime(d = new Date()) {
  const year = Math.max(1980, d.getFullYear())
  const dosTime = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2)
  const dosDate = ((year - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()
  return { dosTime, dosDate }
}

/**
 * Minimal ZIP writer (deflate) — zero npm deps.
 * @param {{ name: string, data: Buffer }[]} files
 */
function buildZip(files) {
  const localParts = []
  const centralParts = []
  let offset = 0
  const { dosTime, dosDate } = dosDateTime()

  for (const file of files) {
    const nameBuf = Buffer.from(file.name, 'utf8')
    const data = file.data
    const compressed = deflateRawSync(data)
    const crc = crc32(data)
    const useStore = compressed.length >= data.length
    const payload = useStore ? data : compressed
    const method = useStore ? 0 : 8

    const localHeader = Buffer.alloc(30)
    localHeader.writeUInt32LE(0x04034b50, 0)
    localHeader.writeUInt16LE(20, 4) // version needed
    localHeader.writeUInt16LE(0, 6) // flags
    localHeader.writeUInt16LE(method, 8)
    localHeader.writeUInt16LE(dosTime, 10)
    localHeader.writeUInt16LE(dosDate, 12)
    localHeader.writeUInt32LE(crc, 14)
    localHeader.writeUInt32LE(payload.length, 18)
    localHeader.writeUInt32LE(data.length, 22)
    localHeader.writeUInt16LE(nameBuf.length, 26)
    localHeader.writeUInt16LE(0, 28) // extra

    const local = Buffer.concat([localHeader, nameBuf, payload])
    localParts.push(local)

    const central = Buffer.alloc(46)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4) // version made by
    central.writeUInt16LE(20, 6) // version needed
    central.writeUInt16LE(0, 8)
    central.writeUInt16LE(method, 10)
    central.writeUInt16LE(dosTime, 12)
    central.writeUInt16LE(dosDate, 14)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(payload.length, 20)
    central.writeUInt32LE(data.length, 24)
    central.writeUInt16LE(nameBuf.length, 28)
    central.writeUInt16LE(0, 30)
    central.writeUInt16LE(0, 32)
    central.writeUInt16LE(0, 34)
    central.writeUInt16LE(0, 36)
    central.writeUInt32LE(0, 38)
    central.writeUInt32LE(offset, 42)
    centralParts.push(Buffer.concat([central, nameBuf]))

    offset += local.length
  }

  const centralDir = Buffer.concat(centralParts)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(0, 4)
  end.writeUInt16LE(0, 6)
  end.writeUInt16LE(files.length, 8)
  end.writeUInt16LE(files.length, 10)
  end.writeUInt32LE(centralDir.length, 12)
  end.writeUInt32LE(offset, 16)
  end.writeUInt16LE(0, 20)

  return Buffer.concat([...localParts, centralDir, end])
}

const files = []
const manifestFiles = []

for (const entry of ENTRIES) {
  const abs = path.join(root, entry.disk)
  if (!fs.existsSync(abs)) {
    if (entry.required) {
      console.error(`[research-pack] FAIL missing required ${entry.disk}`)
      process.exit(1)
    }
    continue
  }
  const data = fs.readFileSync(abs)
  files.push({ name: entry.archive, data })
  manifestFiles.push({
    path: entry.archive,
    bytes: data.length,
    sha256: crypto.createHash('sha256').update(data).digest('hex'),
  })
}

// README inside the pack
const readme = `# Veritas Worldwide — Research Pack

Publisher: Veritas Worldwide only (entity attribution).
Generated: ${new Date().toISOString()}

Contents are public machine-readable corpora used by the live site:
- evidence-taxonomy.json — scholarly + Volume I tier definitions
- profiles/corpus.json — Power Profiles index + integrity densify signals
- record-of-jesus-christ/corpus.json — ROC claim index
- israel-dossier/corpus.json — incidents, actors, money trail
- soft-floor.json files — live verification floors
- manifests — Israel templates/workbooks inventory
- llms.txt — AI/crawler index of public research surfaces

License / terms: see https://veritasworldwide.com/terms and https://veritasworldwide.com/privacy
Do not scrape beyond polite research use; production rate-limits corpus JSON.

No personal operator identity is included in this pack.
`
files.push({ name: 'README.md', data: Buffer.from(readme, 'utf8') })
manifestFiles.push({
  path: 'README.md',
  bytes: Buffer.byteLength(readme),
  sha256: crypto.createHash('sha256').update(readme).digest('hex'),
})

const zipBuf = buildZip(files)
if (zipBuf.length > MAX_ZIP_BYTES) {
  console.error(
    `[research-pack] FAIL zip ${zipBuf.length} bytes exceeds budget ${MAX_ZIP_BYTES}`,
  )
  process.exit(1)
}

fs.writeFileSync(outZip, zipBuf)
const sha256 = crypto.createHash('sha256').update(zipBuf).digest('hex')
const manifest = {
  generatedAt: new Date().toISOString(),
  publisher: 'Veritas Worldwide',
  path: '/research-pack.zip',
  bytes: zipBuf.length,
  sha256,
  maxBytesBudget: MAX_ZIP_BYTES,
  fileCount: files.length,
  files: manifestFiles,
  note: 'Offline research pack of public machine corpora. Entity-only attribution.',
}
fs.writeFileSync(outManifest, `${JSON.stringify(manifest, null, 2)}\n`)

console.log(
  `[research-pack] PASS zip=${(zipBuf.length / 1024).toFixed(1)}KiB files=${files.length} sha256=${sha256.slice(0, 12)}…`,
)
