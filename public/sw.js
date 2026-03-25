// Veritas Press — Service Worker v2.0
// Cache-first for hashed static assets, network-first for navigation + API
const CACHE_VERSION = 'veritas-v2'
const STATIC_CACHE = 'veritas-static-v2'
const OFFLINE_URL = '/'

// Pre-cache these on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
]

// Install: pre-cache shell + skip waiting for instant activation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// Activate: clean ALL old cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external analytics, tracking, ads, and payment services
  if (
    url.hostname.includes('google') ||
    url.hostname.includes('analytics') ||
    url.hostname.includes('hubspot') ||
    url.hostname.includes('hs-scripts') ||
    url.hostname.includes('hsforms') ||
    url.hostname.includes('hs-analytics') ||
    url.hostname.includes('stripe') ||
    url.hostname.includes('ipapi')
  ) return

  // Skip API requests — never cache server responses
  if (url.pathname.startsWith('/api/')) return

  // Navigation requests: network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL))
        })
    )
    return
  }

  // Hashed static assets (contain content hash in filename): cache-first, immutable
  if (url.pathname.match(/\/assets\/.*\.[a-f0-9]{8,}\.(js|css|woff2?)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Other static assets (fonts, images, unhashed files): stale-while-revalidate
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico|xml|json)$/) ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone))
          }
          return response
        }).catch(() => cached)

        // Return cached immediately if available, update in background
        return cached || fetchPromise
      })
    )
    return
  }

  // Everything else: network-first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(() => caches.match(request))
  )
})
