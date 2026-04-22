#!/usr/bin/env node

const cliBaseUrl = process.argv[2]
const baseUrl = cliBaseUrl || process.env.PUBLIC_ACCESS_TEST_BASE_URL || 'http://127.0.0.1:3000'
const chapterId = process.env.PUBLIC_ACCESS_TEST_CHAPTER_ID || 'chapter-1'
const searchQuery = process.env.PUBLIC_ACCESS_TEST_QUERY || 'federal reserve'

function getUrl(pathname) {
  return new URL(pathname, baseUrl).toString()
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function logStep(step, detail = '') {
  console.log(`[verify:public-access] ${step}${detail ? ` — ${detail}` : ''}`)
}

async function request(pathname, options = {}) {
  return fetch(getUrl(pathname), {
    redirect: 'manual',
    signal: AbortSignal.timeout(20_000),
    ...options,
  })
}

async function requestText(pathname, options = {}) {
  const response = await request(pathname, options)
  const text = await response.text()
  return { response, text }
}

async function requestJson(pathname, options = {}) {
  const { response, text } = await requestText(pathname, options)
  let data

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error(`${pathname} did not return JSON`)
  }

  return { response, data }
}

async function verifyFullChapter() {
  const { response, data } = await requestJson(`/api/chapters/${chapterId}`)
  assert(response.status === 200, `anonymous chapter returned ${response.status}`)
  assert(data?.accessLevel === 'full', `anonymous chapter accessLevel=${data?.accessLevel}`)
  assert(data?.previewBlockLimit === 0, `anonymous chapter previewBlockLimit=${data?.previewBlockLimit}`)
  assert(Array.isArray(data?.content), 'anonymous chapter content is not an array')
  assert(Number.isInteger(data?.totalBlocks), 'anonymous chapter totalBlocks is missing')
  assert(data.content.length === data.totalBlocks, `anonymous chapter returned ${data.content.length}/${data.totalBlocks} blocks`)
  assert(Array.isArray(data?.sources) && data.sources.length > 0, 'anonymous chapter did not expose source rows')
  assert(data.sources.some((source) => typeof source?.text === 'string' && source.text.trim()), 'anonymous source rows did not include source text')
  logStep('Anonymous chapter API exposes full body and source rows', `${data.content.length}/${data.totalBlocks} blocks, ${data.sources.length} sources`)
}

async function verifyChapterIndex() {
  const { response, data } = await requestJson('/api/chapters')
  assert(response.status === 200, `anonymous chapter index returned ${response.status}`)
  assert(data?.previewBlockLimit === 0, `chapter index previewBlockLimit=${data?.previewBlockLimit}`)
  assert(Array.isArray(data?.chapters) && data.chapters.length > 0, 'chapter index returned no chapters')

  const chapter = data.chapters.find((item) => item?.id === chapterId) || data.chapters[0]
  assert(chapter?.accessLevel === 'full', `chapter index accessLevel=${chapter?.accessLevel}`)
  assert(chapter?.previewBlockLimit === 0, `chapter index chapter previewBlockLimit=${chapter?.previewBlockLimit}`)
  assert(Array.isArray(chapter?.sources) && chapter.sources.length > 0, 'chapter index did not expose source rows')
  logStep('Anonymous chapter index exposes full public records', `${data.chapters.length} chapters`)
}

async function verifySourceSearch() {
  const params = new URLSearchParams({ q: searchQuery, match: 'sources' })
  const { response, data } = await requestJson(`/api/search?${params.toString()}`)
  assert(response.status === 200, `anonymous source search returned ${response.status}`)
  assert(data?.scope === 'full', `anonymous source search scope=${data?.scope}`)
  assert(data?.filters?.match === 'sources', `anonymous source search match filter=${data?.filters?.match}`)
  assert(Array.isArray(data?.results) && data.results.length > 0, 'anonymous source search returned no results')
  assert(
    data.results.some((result) => Array.isArray(result?.matchedIn) && result.matchedIn.includes('sources')),
    'anonymous source search did not report any source matches'
  )
  logStep('Anonymous source search uses full scope and source filters', `${data.results.length} result(s)`)
}

async function verifyPdfDownload() {
  const response = await request('/api/downloads/the-record.pdf')

  try {
    assert(response.status === 200, `anonymous PDF route returned ${response.status}`)
    const contentType = response.headers.get('content-type') || ''
    assert(contentType.includes('application/pdf'), `PDF route content-type=${contentType || 'none'}`)
    logStep('Anonymous PDF download route returns application/pdf')
  } finally {
    await response.body?.cancel().catch(() => {})
  }
}

async function verifyPublicPages() {
  for (const pathname of ['/read', `/chapter/${chapterId}`, '/sources', '/search?q=federal+reserve', '/bernie']) {
    const { response, text } = await requestText(pathname)
    assert(response.status === 200, `${pathname} returned ${response.status}`)
    assert(!/Private Access|Enter the password|Incorrect password/i.test(text), `${pathname} rendered password-gate copy`)
    assert(!/Free reader accounts unlock the full archive|Full downloads require a free reader account|Paid subscriptions unlock the full 32-part investigation/i.test(text), `${pathname} rendered stale account-gate copy`)
  }

  logStep('Public HTML routes render without login-gate copy')
}

async function main() {
  logStep('Starting public-access verification', baseUrl)
  await verifyFullChapter()
  await verifyChapterIndex()
  await verifySourceSearch()
  await verifyPdfDownload()
  await verifyPublicPages()
  console.log('[verify:public-access] PASS')
}

main().catch((error) => {
  console.error(`[verify:public-access] FAIL — ${error.message}`)
  process.exit(1)
})
