/**
 * Strip EXIF / metadata from raster images under public/ (best-effort via sharp).
 * Skips SVGs. Safe to re-run.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Default scopes avoid rewriting unrelated brand-kit assets owned by parallel agents.
const scopes = (process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['public/og', 'public/record-of-jesus-christ']
).map(s => path.resolve(root, s))

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('[strip-public-exif] sharp not installed')
  process.exit(1)
}

const RASTER = /\.(jpe?g|png|webp|tiff?)$/i
let scanned = 0
let rewritten = 0

async function processFile(filePath) {
  scanned++
  try {
    const input = fs.readFileSync(filePath)
    const img = sharp(input)
    const meta = await img.metadata()
    let pipeline = sharp(input).rotate()
    let out
    const ext = path.extname(filePath).toLowerCase()
    if (ext === '.png') out = await pipeline.png().toBuffer()
    else if (ext === '.webp') out = await pipeline.webp().toBuffer()
    else out = await pipeline.jpeg({ quality: 92, mozjpeg: true }).toBuffer()

    if (out.length > 0 && (meta.exif || meta.icc || Math.abs(out.length - input.length) > 32)) {
      fs.writeFileSync(filePath, out)
      rewritten++
    }
  } catch (e) {
    console.warn('[strip-public-exif] skip', path.relative(root, filePath), e.message)
  }
}

const queue = []
function walkCollect(dir) {
  if (!fs.existsSync(dir)) return
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walkCollect(p)
    else if (RASTER.test(name)) queue.push(p)
  }
}

for (const scope of scopes) walkCollect(scope)
for (const p of queue) {
  await processFile(p)
}

console.log(`[strip-public-exif] scopes=${scopes.map(s => path.relative(root, s)).join(',')} scanned=${scanned} rewritten=${rewritten}`)
