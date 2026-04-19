import pg from 'pg'

const { Pool } = pg

const SSL_QUERY_KEYS = [
  'ssl',
  'sslcert',
  'sslkey',
  'sslmode',
  'sslpassword',
  'sslrootcert',
]

export function sanitizeDatabaseUrl(databaseUrl) {
  if (!databaseUrl) return databaseUrl

  try {
    const parsedUrl = new URL(databaseUrl)

    for (const key of SSL_QUERY_KEYS) {
      parsedUrl.searchParams.delete(key)
    }

    return parsedUrl.toString()
  } catch {
    return databaseUrl
  }
}

export function createDatabasePoolConfig(databaseUrl, overrides = {}) {
  return {
    connectionString: sanitizeDatabaseUrl(databaseUrl),
    ssl: { rejectUnauthorized: false },
    ...overrides,
  }
}

export function createDatabasePool(databaseUrl, overrides = {}) {
  return new Pool(createDatabasePoolConfig(databaseUrl, overrides))
}
