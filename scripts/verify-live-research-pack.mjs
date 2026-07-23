#!/usr/bin/env node
/**
 * Live probe: offline research pack must be downloadable as a valid ZIP.
 * Entity-only. Uses PLATFORM_VERIFY_BASE_URL (default production).
 */
import { inflateRawSync } from 'node:zlib'

const base = (process.env.PLATFORM_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(
  /\/$/,
  '',
)

const failures = []

function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

async function main() {
  const zipUrl = `${base}/research-pack.zip`
  const manUrl = `${base}/research-pack-manifest.json`

  let zipRes
  try {
    zipRes = await fetch(zipUrl, {
      headers: { accept: 'application/zip,*/*' },
      signal: AbortSignal.timeout(30000),
    })
  } catch (err) {
    failures.push(`zip fetch error: ${err?.message || err}`)
    return finish()
  }

  assert(zipRes.ok, `zip HTTP ${zipRes.status}`)
  const rateLimit = zipRes.headers.get('ratelimit-limit') || zipRes.headers.get('x-ratelimit-limit')
  assert(rateLimit, 'zip response missing RateLimit-Limit (research-pack scope)')
  const cache = (zipRes.headers.get('cache-control') || '').toLowerCase()
  assert(
    cache.includes('must-revalidate') || cache.includes('max-age=3600'),
    `zip must not use immutable year cache (got "${cache || 'none'}")`,
  )
  assert(!cache.includes('immutable'), `zip Cache-Control must not be immutable (got "${cache}")`)
  const disposition = (zipRes.headers.get('content-disposition') || '').toLowerCase()
  assert(
    disposition.includes('attachment') && disposition.includes('research-pack'),
    `zip Content-Disposition should be attachment research-pack (got "${disposition || 'none'}")`,
  )
  const buf = Buffer.from(await zipRes.arrayBuffer())
  assert(buf.length > 50_000, `zip too small (${buf.length})`)
  assert(buf.length <= 8 * 1024 * 1024, `zip exceeds 8MiB (${buf.length})`)
  assert(buf.readUInt32LE(0) === 0x04034b50, 'zip local file header magic missing')

  // Inflate first entry if deflated
  const method = buf.readUInt16LE(8)
  const compSize = buf.readUInt32LE(18)
  const nameLen = buf.readUInt16LE(26)
  const extraLen = buf.readUInt16LE(28)
  const payload = buf.subarray(30 + nameLen + extraLen, 30 + nameLen + extraLen + compSize)
  if (method === 8) {
    try {
      const out = inflateRawSync(payload)
      assert(out.length > 0, 'first zip entry inflate empty')
    } catch (err) {
      failures.push(`zip inflate failed: ${err?.message || err}`)
    }
  }

  let manRes
  try {
    manRes = await fetch(manUrl, { signal: AbortSignal.timeout(15000) })
  } catch (err) {
    failures.push(`manifest fetch error: ${err?.message || err}`)
    return finish()
  }
  assert(manRes.ok, `manifest HTTP ${manRes.status}`)
  const man = await manRes.json().catch(() => null)
  assert(man && man.publisher === 'Veritas Worldwide', 'manifest publisher must be entity-only')
  assert(man.path === '/research-pack.zip', 'manifest path')
  assert(typeof man.sha256 === 'string' && /^[a-f0-9]{64}$/i.test(man.sha256), 'manifest sha256')
  assert(Array.isArray(man.files) && man.files.length >= 5, 'manifest files thin')

  finish()
}

function finish() {
  if (failures.length) {
    console.error('[verify:live-research-pack] FAIL')
    for (const f of failures) console.error(' -', f)
    process.exit(1)
  }
  console.log(`[verify:live-research-pack] PASS — zip+manifest live at ${base}`)
}

main().catch((err) => {
  console.error('[verify:live-research-pack] FAIL', err?.message || err)
  process.exit(1)
})
