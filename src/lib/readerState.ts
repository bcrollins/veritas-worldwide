interface StoredAuthUser {
  id?: number
  email?: string
}

export interface ReadingHistoryRecord {
  chapterId: string
  scrollPercent: number
  scrollPosition: number
  timestamp: number
}

const AUTH_USER_KEY = 'veritas_auth'
const LEGACY_READING_HISTORY_KEY = 'veritas_reading_history'
const LEGACY_SCROLL_POSITIONS_KEY = 'veritas_scroll_positions'
const READING_HISTORY_KEY_PREFIX = 'veritas_reading_history:'
const SCROLL_POSITIONS_KEY_PREFIX = 'veritas_scroll_positions:'
const ANONYMOUS_SCOPE = 'anonymous'

function readStorageJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : null
  } catch {
    return null
  }
}

function writeStorageJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getStoredAuthUser(): StoredAuthUser | null {
  return readStorageJson<StoredAuthUser>(AUTH_USER_KEY)
}

function getReaderScopes(): string[] {
  const user = getStoredAuthUser()
  if (!user) {
    return [ANONYMOUS_SCOPE]
  }

  const scopes: string[] = []

  if (typeof user.id === 'number' && Number.isFinite(user.id)) {
    scopes.push(`id:${user.id}`)
  }

  if (typeof user.email === 'string') {
    const normalizedEmail = user.email.trim().toLowerCase()
    if (normalizedEmail) {
      scopes.push(`email:${encodeURIComponent(normalizedEmail)}`)
    }
  }

  return scopes.length > 0 ? [...new Set(scopes)] : [ANONYMOUS_SCOPE]
}

function readScopedValue<T>(
  keyPrefix: string,
  legacyKey: string,
  isValid: (value: unknown) => value is T,
  fallback: T
): T {
  const scopes = getReaderScopes()
  const primaryScope = scopes[0]

  for (const scope of scopes) {
    const scopedValue = readStorageJson<unknown>(`${keyPrefix}${scope}`)
    if (isValid(scopedValue)) {
      if (scope !== primaryScope) {
        writeStorageJson(`${keyPrefix}${primaryScope}`, scopedValue)
      }
      localStorage.removeItem(legacyKey)
      return scopedValue
    }
  }

  const legacyValue = readStorageJson<unknown>(legacyKey)
  if (isValid(legacyValue)) {
    writeStorageJson(`${keyPrefix}${primaryScope}`, legacyValue)
    localStorage.removeItem(legacyKey)
    return legacyValue
  }

  return fallback
}

function writeScopedValue(keyPrefix: string, legacyKey: string, value: unknown) {
  const primaryScope = getReaderScopes()[0]
  writeStorageJson(`${keyPrefix}${primaryScope}`, value)
  localStorage.removeItem(legacyKey)
}

function isReadingHistoryRecord(value: unknown): value is ReadingHistoryRecord {
  if (!value || typeof value !== 'object') return false

  const record = value as Partial<ReadingHistoryRecord>
  return typeof record.chapterId === 'string'
    && typeof record.scrollPercent === 'number'
    && Number.isFinite(record.scrollPercent)
    && typeof record.scrollPosition === 'number'
    && Number.isFinite(record.scrollPosition)
    && typeof record.timestamp === 'number'
    && Number.isFinite(record.timestamp)
}

function isReadingHistoryList(value: unknown): value is ReadingHistoryRecord[] {
  return Array.isArray(value) && value.every(isReadingHistoryRecord)
}

function isScrollPositionMap(value: unknown): value is Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Object.values(value).every((entry) => typeof entry === 'number' && Number.isFinite(entry))
}

export function getScopedReadingHistory(): ReadingHistoryRecord[] {
  return readScopedValue(READING_HISTORY_KEY_PREFIX, LEGACY_READING_HISTORY_KEY, isReadingHistoryList, [])
}

export function saveScopedReadingHistory(chapterId: string, scrollPosition: number, scrollPercent: number) {
  const records = getScopedReadingHistory()
  const nextRecord: ReadingHistoryRecord = {
    chapterId,
    scrollPosition,
    scrollPercent,
    timestamp: Date.now(),
  }
  const existingIndex = records.findIndex((record) => record.chapterId === chapterId)

  if (existingIndex >= 0) {
    records[existingIndex] = nextRecord
  } else {
    records.push(nextRecord)
  }

  writeScopedValue(READING_HISTORY_KEY_PREFIX, LEGACY_READING_HISTORY_KEY, records.slice(-50))
}

export function getScopedScrollPositions(): Record<string, number> {
  return readScopedValue(SCROLL_POSITIONS_KEY_PREFIX, LEGACY_SCROLL_POSITIONS_KEY, isScrollPositionMap, {})
}

export function saveScopedScrollPosition(chapterId: string, scrollY: number, maxEntries = 50) {
  const positions = getScopedScrollPositions()
  positions[chapterId] = scrollY

  const keys = Object.keys(positions)
  if (keys.length > maxEntries) {
    const oldestKeys = keys.slice(0, keys.length - maxEntries)
    for (const key of oldestKeys) {
      delete positions[key]
    }
  }

  writeScopedValue(SCROLL_POSITIONS_KEY_PREFIX, LEGACY_SCROLL_POSITIONS_KEY, positions)
}
