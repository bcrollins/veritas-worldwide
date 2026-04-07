const baseUrl = process.env.AUTH_TEST_BASE_URL || 'http://127.0.0.1:3000'
const chapterId = process.env.AUTH_TEST_CHAPTER_ID || 'foreword'
const searchQuery = process.env.AUTH_TEST_QUERY || 'federal reserve'
const password = process.env.AUTH_TEST_PASSWORD || 'AuditPass2026!'
const displayName = process.env.AUTH_TEST_DISPLAY_NAME || 'Veritas Auth Smoke'
const email = process.env.AUTH_TEST_EMAIL || `veritas-auth-smoke-${Date.now()}@example.com`

function getUrl(pathname) {
  return new URL(pathname, baseUrl).toString()
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function logStep(step, detail = '') {
  console.log(`[verify:auth] ${step}${detail ? ` — ${detail}` : ''}`)
}

async function request(pathname, options = {}) {
  const response = await fetch(getUrl(pathname), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
    ...options,
  })
  return response
}

async function requestJson(pathname, options = {}) {
  const response = await request(pathname, options)
  const text = await response.text()
  let data = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  return { response, data }
}

async function verifyPdfAccess(token, expectedStatus) {
  const response = await request('/api/downloads/the-record.pdf', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  try {
    assert(
      response.status === expectedStatus,
      `Expected PDF route to return ${expectedStatus}, received ${response.status}`
    )

    if (expectedStatus === 200) {
      const contentType = response.headers.get('content-type') || ''
      assert(
        contentType.includes('application/pdf'),
        `Expected protected download content-type to include application/pdf, received ${contentType || 'none'}`
      )
    }
  } finally {
    await response.body?.cancel().catch(() => {})
  }
}

async function main() {
  logStep('Starting auth smoke verification', baseUrl)

  const previewResult = await requestJson(`/api/chapters/${chapterId}`)
  assert(previewResult.response.status === 200, `Anonymous chapter request failed with ${previewResult.response.status}`)
  assert(previewResult.data?.accessLevel === 'preview', `Expected anonymous chapter accessLevel=preview, received ${previewResult.data?.accessLevel}`)
  assert(
    Array.isArray(previewResult.data?.content) && previewResult.data.content.length === previewResult.data.previewBlockLimit,
    'Anonymous preview did not respect previewBlockLimit'
  )
  assert(
    previewResult.data.totalBlocks > previewResult.data.content.length,
    'Anonymous preview unexpectedly returned the full chapter body'
  )
  assert(
    Array.isArray(previewResult.data?.sources) && previewResult.data.sources.length === 0,
    'Anonymous preview leaked protected source rows'
  )
  logStep('Anonymous chapter preview boundary holds', `${previewResult.data.content.length}/${previewResult.data.totalBlocks} blocks`)

  await verifyPdfAccess(null, 401)
  logStep('Anonymous protected download blocked')

  const registerResult = await requestJson('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  })
  assert(registerResult.response.status === 201, `Register failed with ${registerResult.response.status}`)
  assert(typeof registerResult.data?.token === 'string' && registerResult.data.token.length > 20, 'Register did not return a usable token')
  const token = registerResult.data.token
  logStep('Disposable reader account created', email)

  const meResult = await requestJson('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(meResult.response.status === 200, `Authenticated /api/auth/me failed with ${meResult.response.status}`)
  assert(meResult.data?.user?.email === email, 'Authenticated session returned the wrong user')
  logStep('Authenticated session validated')

  const fullChapterResult = await requestJson(`/api/chapters/${chapterId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(fullChapterResult.response.status === 200, `Authenticated chapter request failed with ${fullChapterResult.response.status}`)
  assert(fullChapterResult.data?.accessLevel === 'full', `Expected authenticated chapter accessLevel=full, received ${fullChapterResult.data?.accessLevel}`)
  assert(
    Array.isArray(fullChapterResult.data?.content) && fullChapterResult.data.content.length === fullChapterResult.data.totalBlocks,
    'Authenticated chapter did not return the full body'
  )
  assert(
    Array.isArray(fullChapterResult.data?.sources) && fullChapterResult.data.sources.length > 0,
    'Authenticated chapter did not return protected source rows'
  )
  logStep('Authenticated chapter unlock verified', `${fullChapterResult.data.content.length} blocks`)

  const searchParams = new URLSearchParams({ q: searchQuery, match: 'sources' })
  const fullSearchResult = await requestJson(`/api/search?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(fullSearchResult.response.status === 200, `Authenticated search failed with ${fullSearchResult.response.status}`)
  assert(fullSearchResult.data?.scope === 'full', `Expected authenticated search scope=full, received ${fullSearchResult.data?.scope}`)
  assert(fullSearchResult.data?.filters?.match === 'sources', 'Authenticated source-only search filter was not preserved')
  assert(Array.isArray(fullSearchResult.data?.results) && fullSearchResult.data.results.length > 0, 'Authenticated source-only search returned no results')
  logStep('Authenticated source-only search verified', `${fullSearchResult.data.results.length} result(s)`)

  await verifyPdfAccess(token, 200)
  logStep('Authenticated protected download verified')

  const logoutResult = await requestJson('/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  assert(logoutResult.response.status === 200, `Logout failed with ${logoutResult.response.status}`)
  logStep('Logout request completed')

  const revokedMeResult = await requestJson('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(revokedMeResult.response.status === 401, `Revoked token still authenticated /api/auth/me with ${revokedMeResult.response.status}`)
  logStep('Revoked token rejected by /api/auth/me')

  await verifyPdfAccess(token, 401)
  logStep('Revoked token rejected by protected download')

  const downgradedChapterResult = await requestJson(`/api/chapters/${chapterId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(downgradedChapterResult.response.status === 200, `Revoked-token chapter request failed with ${downgradedChapterResult.response.status}`)
  assert(
    downgradedChapterResult.data?.accessLevel === 'preview' &&
      downgradedChapterResult.data.content.length === downgradedChapterResult.data.previewBlockLimit,
    'Revoked token did not downgrade chapter access back to preview scope'
  )
  logStep('Revoked token downgraded chapter access back to preview')

  console.log('[verify:auth] PASS')
}

main().catch((error) => {
  console.error(`[verify:auth] FAIL — ${error.message}`)
  process.exit(1)
})
