/**
 * Export machine-readable ROC claim index by parsing TypeScript sources.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  path.join(root, 'src/data/recordOfJesusChrist.ts'),
  path.join(root, 'src/data/recordOfJesusChristExtras.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave3.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave4.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave5.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave6.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave7.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave8.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave9.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave10.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave11.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave12.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave13.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave14.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave15.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave16.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave17.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave18.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave19.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave20.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave21.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave22.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave23.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave24.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave25.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave26.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave27.ts'),
  path.join(root, 'src/data/recordOfJesusChristWave28.ts'),
]

const CLAIM_ID = /id:\s*'((?:cosmo|ane|st|hj|nt|nc|arch|ec|mod)-[^']+)'/g

function extractFromFile(src, fileLabel) {
  const claims = []
  let m
  while ((m = CLAIM_ID.exec(src))) {
    const id = m[1]
    const start = m.index
    // Look ahead ~2.5k chars for claim/tier/proof fields of this object
    const window = src.slice(start, start + 2800)
    const claimM = window.match(/claim:\s*'((?:\\'|[^'])*)'/)
    const tierM = window.match(/tier:\s*'([a-z_]+)'/)
    const proofM = window.match(/proofVsConcept:\s*'([a-z_]+)'/)
    if (!claimM || !tierM || !proofM) continue
    claims.push({
      id,
      claim: claimM[1].replace(/\\'/g, "'").replace(/\\n/g, ' ').trim(),
      tier: tierM[1],
      proofVsConcept: proofM[1],
      file: fileLabel,
    })
  }
  return claims
}

const all = []
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error('[export-roc-corpus] missing', f)
    process.exit(1)
  }
  all.push(...extractFromFile(fs.readFileSync(f, 'utf8'), path.relative(root, f)))
}

const byId = new Map()
for (const c of all) byId.set(c.id, c)
const claims = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id))

const hist = {}
for (const c of claims) hist[c.tier] = (hist[c.tier] || 0) + 1

const payload = {
  meta: {
    title: 'The Record of Jesus Christ',
    publisher: 'Veritas Worldwide',
    path: '/record-of-jesus-christ',
    page: 'https://veritasworldwide.com/record-of-jesus-christ',
    attribution: 'Veritas Worldwide only',
  },
  generatedAt: new Date().toISOString(),
  claimCount: claims.length,
  tierHistogram: hist,
  claims,
}

const json = JSON.stringify(payload, null, 2)
const outDir = path.join(root, 'public', 'record-of-jesus-christ')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'corpus.json'), json)

if (fs.existsSync(path.join(root, 'dist'))) {
  const distDir = path.join(root, 'dist', 'record-of-jesus-christ')
  fs.mkdirSync(distDir, { recursive: true })
  fs.writeFileSync(path.join(distDir, 'corpus.json'), json)
}

if (claims.length < 50) {
  console.error('[export-roc-corpus] too few claims parsed:', claims.length)
  process.exit(1)
}

console.log(`[export-roc-corpus] ${claims.length} claims → public/record-of-jesus-christ/corpus.json`)
console.log('[export-roc-corpus] tiers', JSON.stringify(hist))
