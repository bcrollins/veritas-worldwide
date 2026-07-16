#!/usr/bin/env node

/**
 * Verifies public search ranking preferences for high-intent investigative queries.
 * Title/source-weighted ranking must beat body-only mentions.
 */

const cliBaseUrl = process.argv[2] || process.env.SEARCH_VERIFY_BASE_URL || 'http://127.0.0.1:3000'
const timeoutMs = Number.parseInt(process.env.SEARCH_VERIFY_TIMEOUT_MS || '15000', 10)

function getUrl(pathname) {
  return new URL(pathname, cliBaseUrl).toString()
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function search(query) {
  const response = await fetch(getUrl(`/api/search?q=${encodeURIComponent(query)}`), {
    headers: { accept: 'application/json', 'Cache-Control': 'no-cache' },
    signal: AbortSignal.timeout(timeoutMs),
  })
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  return { response, data }
}

function firstIds(results, n = 5) {
  return (results || []).slice(0, n).map((row) => row.chapterId)
}

async function main() {
  console.log(`[verify:search] base=${cliBaseUrl}`)

  const federal = await search('federal reserve')
  assert(federal.response.ok, `federal reserve search returned ${federal.response.status}`)
  const federalResults = federal.data?.results || []
  assert(federalResults.length >= 3, 'federal reserve returned too few results')
  assert(
    typeof federalResults[0].score === 'number',
    'search results must include a numeric score field'
  )
  const federalTop = firstIds(federalResults, 3)
  // Title-bearing Fed chapters should dominate the first page of results.
  const federalPreferred = new Set(['chapter-3', 'chapter-12', 'chapter-25', 'chapter-9', 'chapter-1'])
  assert(
    federalTop.some((id) => federalPreferred.has(id)),
    `federal reserve top-3 missing preferred chapters: ${federalTop.join(', ')}`
  )
  // A body-only mention must not outrank every Fed-titled chapter forever.
  assert(
    federalResults[0].matchedIn?.includes('title') || federalResults[0].matchedIn?.includes('subtitle') || federalResults[0].matchedIn?.includes('keywords'),
    `top federal reserve hit should match title/subtitle/keywords, got matchedIn=${JSON.stringify(federalResults[0].matchedIn)}`
  )
  console.log(`[verify:search] federal reserve top: ${federalTop.join(', ')} (score=${federalResults[0].score})`)

  const central = await search('central banking')
  assert(central.response.ok, `central banking search returned ${central.response.status}`)
  const centralResults = central.data?.results || []
  assert(centralResults.length >= 1, 'central banking returned no results')
  assert(
    centralResults[0].chapterId === 'chapter-1' || centralResults[0].matchedIn?.includes('title'),
    `central banking top result should prefer Chapter 1 / title match, got ${centralResults[0].chapterId} matchedIn=${JSON.stringify(centralResults[0].matchedIn)}`
  )
  console.log(`[verify:search] central banking top: ${centralResults[0].chapterId} (score=${centralResults[0].score})`)

  const epstein = await search('epstein')
  assert(epstein.response.ok, `epstein search returned ${epstein.response.status}`)
  const epsteinResults = epstein.data?.results || []
  if (epsteinResults.length > 0) {
    assert(
      typeof epsteinResults[0].score === 'number' && epsteinResults[0].score >= epsteinResults[epsteinResults.length - 1].score,
      'results must be sorted by descending score'
    )
  }
  console.log(`[verify:search] epstein results=${epsteinResults.length}`)

  // Topic hub deep-link surface must remain wired for chapter results.
  // (Client-rendered — verify the helper mapping module stays coherent via API ranking.)
  const centralTop = centralResults[0]?.chapterId
  if (centralTop === 'chapter-1') {
    console.log('[verify:search] central banking → chapter-1 ready for topic hub federal-reserve deep-link')
  }

  console.log('[verify:search] PASS')
}

main().catch((error) => {
  console.error(`[verify:search] FAIL — ${error.message}`)
  process.exit(1)
})
