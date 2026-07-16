type ClientErrorPayload = {
  message: string
  name?: string
  stack?: string
  componentStack?: string
  source?: string
  path?: string
  userAgent?: string
  href?: string
}

const RECENT_FINGERPRINTS = new Map<string, number>()
const DEDUPE_WINDOW_MS = 30_000

function fingerprint(payload: ClientErrorPayload): string {
  return `${payload.name || 'Error'}|${payload.message}|${payload.source || ''}|${payload.path || ''}`
}

export function reportClientError(payload: ClientErrorPayload): void {
  if (typeof window === 'undefined') return

  const key = fingerprint(payload)
  const now = Date.now()
  const last = RECENT_FINGERPRINTS.get(key) || 0
  if (now - last < DEDUPE_WINDOW_MS) return
  RECENT_FINGERPRINTS.set(key, now)

  // Bound the fingerprint map so long sessions do not grow unbounded.
  if (RECENT_FINGERPRINTS.size > 50) {
    const oldest = [...RECENT_FINGERPRINTS.entries()].sort((a, b) => a[1] - b[1])[0]
    if (oldest) RECENT_FINGERPRINTS.delete(oldest[0])
  }

  const body = JSON.stringify({
    message: String(payload.message || 'Unknown client error').slice(0, 500),
    name: String(payload.name || 'Error').slice(0, 120),
    stack: String(payload.stack || '').slice(0, 4000),
    componentStack: String(payload.componentStack || '').slice(0, 4000),
    source: String(payload.source || 'client').slice(0, 80),
    path: String(payload.path || window.location.pathname || '').slice(0, 240),
    href: String(payload.href || window.location.href || '').slice(0, 500),
    userAgent: String(payload.userAgent || navigator.userAgent || '').slice(0, 300),
  })

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/client-error', blob)
      return
    }
  } catch {
    // fall through to fetch
  }

  void fetch('/api/client-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Never throw from error reporting.
  })
}

let installed = false

export function installGlobalClientErrorReporting(): void {
  if (typeof window === 'undefined' || installed) return
  installed = true

  window.addEventListener('error', (event) => {
    const error = event.error instanceof Error ? event.error : null
    reportClientError({
      message: error?.message || event.message || 'window.error',
      name: error?.name || 'Error',
      stack: error?.stack || '',
      source: 'window.error',
      path: window.location.pathname,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    if (reason instanceof Error) {
      reportClientError({
        message: reason.message,
        name: reason.name,
        stack: reason.stack || '',
        source: 'unhandledrejection',
        path: window.location.pathname,
      })
      return
    }

    reportClientError({
      message: typeof reason === 'string' ? reason : 'Unhandled promise rejection',
      name: 'UnhandledRejection',
      stack: '',
      source: 'unhandledrejection',
      path: window.location.pathname,
    })
  })
}
