const cliBaseUrl = process.argv[2]
const baseUrl = cliBaseUrl || process.env.AUTH_TEST_BASE_URL || 'http://127.0.0.1:3000'
const chapterId = process.env.AUTH_TEST_CHAPTER_ID || 'chapter-1'
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

async function requestJsonWithRetry(pathname, options = {}, { retries = 8, retryOn = [429] } = {}) {
  let last = null
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    last = await requestJson(pathname, options)
    if (!retryOn.includes(last.response.status)) {
      return last
    }
    const waitMs = 2500 * (attempt + 1)
    logStep(`Rate limited (${last.response.status}), retrying`, `${pathname} in ${waitMs}ms`)
    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }
  return last
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
        `Expected public download content-type to include application/pdf, received ${contentType || 'none'}`
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
  assert(previewResult.data?.accessLevel === 'full', `Expected anonymous chapter accessLevel=full, received ${previewResult.data?.accessLevel}`)
  assert(
    Array.isArray(previewResult.data?.content) && previewResult.data.content.length === previewResult.data.totalBlocks,
    'Anonymous chapter did not return the full public body'
  )
  assert(
    previewResult.data.previewBlockLimit === 0,
    `Expected previewBlockLimit=0 for open public access, received ${previewResult.data.previewBlockLimit}`
  )
  assert(
    Array.isArray(previewResult.data?.sources) && previewResult.data.sources.length > 0,
    'Anonymous chapter did not expose source rows'
  )
  logStep('Anonymous full chapter access verified', `${previewResult.data.content.length}/${previewResult.data.totalBlocks} blocks`)

  await verifyPdfAccess(null, 200)
  logStep('Anonymous PDF download verified')

  // Negative path: invalid credentials must not mint a session
  const badLogin = await requestJsonWithRetry('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nobody-does-not-exist@example.com', password: 'wrong-password-xyz' }),
  }, { retries: 6 })
  assert(
    badLogin.response.status === 401 || badLogin.response.status === 400,
    `Expected bad login to return 400/401, received ${badLogin.response.status}`
  )
  assert(!badLogin.data?.token, 'Bad login must not return a token')
  logStep('Invalid login rejected without session')

  // Negative path: register with invalid email shape (retry through multi-agent 429s)
  const badRegister = await requestJsonWithRetry('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email', password, displayName }),
  }, { retries: 8 })
  assert(
    badRegister.response.status === 400 || badRegister.response.status === 422,
    `Expected invalid-email register to return 400/422, received ${badRegister.response.status}`
  )
  assert(!badRegister.data?.token, 'Invalid-email register must not return a token')
  logStep('Invalid-email register rejected')

  // Negative path: password too short
  const shortPassword = await requestJsonWithRetry('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `short-pw-${Date.now()}@example.com`, password: 'ab12', displayName }),
  }, { retries: 8 })
  assert(
    shortPassword.response.status === 400 || shortPassword.response.status === 422,
    `Expected short-password register to return 400/422, received ${shortPassword.response.status}`
  )
  assert(!shortPassword.data?.token, 'Short-password register must not return a token')
  logStep('Short-password register rejected')

  const registerResult = await requestJsonWithRetry('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  }, { retries: 8 })
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

  const refreshResult = await requestJson('/api/auth/refresh', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  assert(refreshResult.response.status === 200, `Session refresh failed with ${refreshResult.response.status}`)
  assert(typeof refreshResult.data?.token === 'string' && refreshResult.data.token.length > 20, 'Refresh did not return a usable token')
  assert(refreshResult.data.token !== token, 'Refresh must rotate to a new token')
  assert(typeof refreshResult.data?.expiresAt === 'string', 'Refresh did not return expiresAt')
  const refreshedToken = refreshResult.data.token
  logStep('Session refresh rotated token')

  const oldTokenMe = await requestJson('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  assert(oldTokenMe.response.status === 401, `Old token still valid after refresh (${oldTokenMe.response.status})`)
  logStep('Pre-refresh token revoked')

  const refreshedMe = await requestJson('/api/auth/me', {
    headers: { Authorization: `Bearer ${refreshedToken}` },
  })
  assert(refreshedMe.response.status === 200, `Refreshed token rejected by /api/auth/me (${refreshedMe.response.status})`)
  assert(refreshedMe.data?.user?.email === email, 'Refreshed session returned the wrong user')
  logStep('Refreshed token validated')

  const fullChapterResult = await requestJson(`/api/chapters/${chapterId}`, {
    headers: { Authorization: `Bearer ${refreshedToken}` },
  })
  assert(fullChapterResult.response.status === 200, `Authenticated chapter request failed with ${fullChapterResult.response.status}`)
  assert(fullChapterResult.data?.accessLevel === 'full', `Expected authenticated chapter accessLevel=full, received ${fullChapterResult.data?.accessLevel}`)
  assert(
    Array.isArray(fullChapterResult.data?.content) && fullChapterResult.data.content.length === fullChapterResult.data.totalBlocks,
    'Authenticated chapter did not return the full body'
  )
  assert(
    Array.isArray(fullChapterResult.data?.sources) && fullChapterResult.data.sources.length > 0,
    'Authenticated chapter did not return source rows'
  )
  logStep('Authenticated chapter access verified', `${fullChapterResult.data.content.length} blocks`)

  const searchParams = new URLSearchParams({ q: searchQuery, match: 'sources' })
  const fullSearchResult = await requestJson(`/api/search?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${refreshedToken}` },
  })
  assert(fullSearchResult.response.status === 200, `Authenticated search failed with ${fullSearchResult.response.status}`)
  assert(fullSearchResult.data?.scope === 'full', `Expected authenticated search scope=full, received ${fullSearchResult.data?.scope}`)
  assert(fullSearchResult.data?.filters?.match === 'sources', 'Authenticated source-only search filter was not preserved')
  assert(Array.isArray(fullSearchResult.data?.results) && fullSearchResult.data.results.length > 0, 'Authenticated source-only search returned no results')
  logStep('Authenticated source-only search verified', `${fullSearchResult.data.results.length} result(s)`)

  await verifyPdfAccess(refreshedToken, 200)
  logStep('Authenticated PDF download remains public')

  const logoutResult = await requestJson('/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshedToken}`,
      'Content-Type': 'application/json',
    },
  })
  assert(logoutResult.response.status === 200, `Logout failed with ${logoutResult.response.status}`)
  logStep('Logout request completed')

  const revokedMeResult = await requestJson('/api/auth/me', {
    headers: { Authorization: `Bearer ${refreshedToken}` },
  })
  assert(revokedMeResult.response.status === 401, `Revoked token still authenticated /api/auth/me with ${revokedMeResult.response.status}`)
  logStep('Revoked token rejected by /api/auth/me')

  await verifyPdfAccess(refreshedToken, 200)
  logStep('Revoked token does not block public PDF download')

  const downgradedChapterResult = await requestJson(`/api/chapters/${chapterId}`, {
    headers: { Authorization: `Bearer ${refreshedToken}` },
  })
  assert(downgradedChapterResult.response.status === 200, `Revoked-token chapter request failed with ${downgradedChapterResult.response.status}`)
  assert(
    downgradedChapterResult.data?.accessLevel === 'full' &&
      Array.isArray(downgradedChapterResult.data?.content) &&
      downgradedChapterResult.data.content.length === downgradedChapterResult.data.totalBlocks,
    'Revoked token changed public chapter access'
  )
  assert(
    Array.isArray(downgradedChapterResult.data?.sources) && downgradedChapterResult.data.sources.length > 0,
    'Revoked token request lost public source access'
  )
  logStep('Revoked token preserves public chapter access')

  console.log('[verify:auth] PASS')
}

main().catch((error) => {
  console.error(`[verify:auth] FAIL — ${error.message}`)
  process.exit(1)
})
