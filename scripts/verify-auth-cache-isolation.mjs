#!/usr/bin/env node

class MemoryStorage {
  #map = new Map()

  getItem(key) {
    return this.#map.has(key) ? this.#map.get(key) : null
  }

  setItem(key, value) {
    this.#map.set(key, String(value))
  }

  removeItem(key) {
    this.#map.delete(key)
  }

  clear() {
    this.#map.clear()
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function loadAuthStore(tag) {
  return import(new URL(`../src/lib/authStore.ts?verify=${tag}`, import.meta.url).href)
}

async function main() {
  globalThis.localStorage = new MemoryStorage()
  globalThis.fetch = async (input) => {
    const url = typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.toString()
        : input.url

    if (url === '/api/auth/status') {
      return jsonResponse({ available: false, mode: 'degraded' })
    }

    throw new Error(`Unexpected network request during degraded auth cache verification: ${url}`)
  }

  const alice = {
    email: 'alice@example.com',
    password: 'AuditPass2026!',
    displayName: 'Alice',
  }

  const bob = {
    email: 'bob@example.com',
    password: 'AuditPass2026!',
    displayName: 'Bob',
  }

  let authStore = await loadAuthStore('initial')

  assert(await authStore.resolveAuthBackendMode() === 'degraded', 'Expected degraded auth mode in verifier harness')

  const aliceSignup = await authStore.signup(alice.email, alice.password, alice.displayName)
  assert(aliceSignup.success, 'Alice degraded-mode signup failed')

  await authStore.toggleBookmark('chapter-1')
  await authStore.saveReadingProgress('chapter-1', 128, true)

  assert(authStore.getBookmarks().includes('chapter-1'), 'Alice bookmark was not persisted')
  assert(authStore.getReadingProgress()['chapter-1']?.scrollPosition === 128, 'Alice reading progress was not persisted')

  authStore = await loadAuthStore('alice-reload')

  assert(authStore.getAuthState().user?.email === alice.email, 'Alice cached session did not restore after reload')
  assert(authStore.getBookmarks().includes('chapter-1'), 'Alice bookmark did not restore after reload')
  assert(authStore.getReadingProgress()['chapter-1']?.completed === true, 'Alice progress did not restore after reload')

  await authStore.logout()
  assert(authStore.getAuthState().user === null, 'Logout did not clear active auth user')
  assert(authStore.getBookmarks().length === 0, 'Logged-out state still exposed bookmarks')

  const bobSignup = await authStore.signup(bob.email, bob.password, bob.displayName)
  assert(bobSignup.success, 'Bob degraded-mode signup failed')
  assert(authStore.getBookmarks().length === 0, 'Bob inherited Alice bookmarks')
  assert(!authStore.getReadingProgress()['chapter-1'], 'Bob inherited Alice reading progress')

  await authStore.toggleBookmark('chapter-2')
  await authStore.saveReadingProgress('chapter-2', 64, false)

  await authStore.logout()

  const bobLogin = await authStore.login(bob.email, bob.password)
  assert(bobLogin.success, 'Bob degraded-mode login failed')
  assert(authStore.getBookmarks().length === 1 && authStore.getBookmarks()[0] === 'chapter-2', 'Bob cache did not restore his own bookmarks')

  await authStore.logout()

  const aliceLogin = await authStore.login(alice.email, alice.password)
  assert(aliceLogin.success, 'Alice degraded-mode login failed')
  assert(authStore.getBookmarks().length === 1 && authStore.getBookmarks()[0] === 'chapter-1', 'Alice did not recover her own bookmark after Bob session')
  assert(!authStore.getBookmarks().includes('chapter-2'), 'Alice inherited Bob bookmark')
  assert(authStore.getReadingProgress()['chapter-1']?.scrollPosition === 128, 'Alice did not recover her own reading progress')
  assert(!authStore.getReadingProgress()['chapter-2'], 'Alice inherited Bob reading progress')
  assert(globalThis.localStorage.getItem('veritas_bookmarks') === null, 'Legacy global bookmark cache still exists')
  assert(globalThis.localStorage.getItem('veritas_progress') === null, 'Legacy global progress cache still exists')

  console.log('[verify:auth-cache] PASS')
}

main().catch((error) => {
  console.error(`[verify:auth-cache] FAIL — ${error.message}`)
  process.exit(1)
})
