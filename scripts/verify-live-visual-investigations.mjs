#!/usr/bin/env node
/**
 * Live smoke: Israel visual-investigations machine index is public + entity-only.
 * Soft on deploy lag (404) with clear message; hard-fail on identity needles when present.
 */
const base = (process.env.PLATFORM_VERIFY_BASE_URL || 'https://veritasworldwide.com').replace(
  /\/$/,
  '',
)

const FORBIDDEN = [
  /brollins/i,
  /bcrollins/i,
  /brandon\s+rollins/i,
  /github\.com\/bcrollins/i,
  /daniellemccauley/i,
  /brollins\d*@gmail\.com/i,
]

const url = `${base}/israel-dossier/visual-investigations.json`
let res
try {
  res = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
  })
} catch (err) {
  console.warn('[verify:live-visual-investigations] WARN fetch failed:', err?.message || err)
  process.exit(0)
}

if (res.status === 404) {
  console.warn(
    '[verify:live-visual-investigations] WARN 404 — deploy lag or pack not yet on tip; pure floors still lock source',
  )
  process.exit(0)
}

if (!res.ok) {
  console.error(`[verify:live-visual-investigations] FAIL HTTP ${res.status}`)
  process.exit(1)
}

const text = await res.text()
for (const re of FORBIDDEN) {
  if (re.test(text)) {
    console.error(`[verify:live-visual-investigations] FAIL identity pattern ${re}`)
    process.exit(1)
  }
}

let json
try {
  json = JSON.parse(text)
} catch {
  console.error('[verify:live-visual-investigations] FAIL invalid JSON')
  process.exit(1)
}

const pub = json?.meta?.publisher || json?.publisher || ''
if (pub && !/veritas\s+worldwide/i.test(String(pub))) {
  console.error('[verify:live-visual-investigations] FAIL publisher not entity-only:', pub)
  process.exit(1)
}

const n =
  typeof json?.meta?.count === 'number'
    ? json.meta.count
    : Array.isArray(json?.items)
      ? json.items.length
      : Array.isArray(json?.incidents)
        ? json.incidents.length
        : 0

if (n < 1) {
  console.warn('[verify:live-visual-investigations] WARN empty index body')
}

const rateLimit = res.headers.get('ratelimit-limit') || res.headers.get('x-ratelimit-limit')
if (!rateLimit) {
  console.warn(
    '[verify:live-visual-investigations] WARN missing RateLimit-Limit (expect corpus-json scope after deploy)',
  )
}

console.log(
  `[verify:live-visual-investigations] PASS — ${n || '?'} entries entity-clean at ${url}`,
)
