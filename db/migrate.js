import pg from 'pg'
const { Pool } = pg

// Database migration script for Neon PostgreSQL
// Run: node db/migrate.js
// Requires: DATABASE_URL environment variable

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is required')
  console.error('Set it to your Neon PostgreSQL connection string')
  process.exit(1)
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const MIGRATIONS = [
  {
    name: '001_create_users',
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        tier VARCHAR(50) DEFAULT 'free',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ,
        is_student BOOLEAN DEFAULT FALSE,
        student_email VARCHAR(255)
      );
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `,
  },
  {
    name: '002_create_sessions',
    sql: `
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(512) UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        ip_address VARCHAR(45),
        user_agent TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
    `,
  },
  {
    name: '003_create_bookmarks',
    sql: `
      CREATE TABLE IF NOT EXISTS bookmarks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        chapter_id VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, chapter_id)
      );
      CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
    `,
  },
  {
    name: '004_create_reading_progress',
    sql: `
      CREATE TABLE IF NOT EXISTS reading_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        chapter_id VARCHAR(100) NOT NULL,
        scroll_position FLOAT DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        last_read_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, chapter_id)
      );
      CREATE INDEX IF NOT EXISTS idx_progress_user ON reading_progress(user_id);
    `,
  },
  {
    name: '005_create_preferences',
    sql: `
      CREATE TABLE IF NOT EXISTS user_preferences (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
        theme VARCHAR(20) DEFAULT 'light',
        font_size VARCHAR(20) DEFAULT 'medium',
        newsletter_subscribed BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `,
  },
  {
    name: '006_create_migrations_table',
    sql: `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );
    `,
  },
]

async function migrate() {
  const client = await pool.connect()
  try {
    // Ensure migrations table exists first
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)

    const { rows: applied } = await client.query('SELECT name FROM migrations')
    const appliedNames = new Set(applied.map(r => r.name))

    for (const migration of MIGRATIONS) {
      if (appliedNames.has(migration.name)) {
        console.log(`  [skip] ${migration.name} (already applied)`)
        continue
      }
      console.log(`  [run]  ${migration.name}`)
      await client.query('BEGIN')
      try {
        await client.query(migration.sql)
        await client.query('INSERT INTO migrations (name) VALUES ($1)', [migration.name])
        await client.query('COMMIT')
        console.log(`  [done] ${migration.name}`)
      } catch (err) {
        await client.query('ROLLBACK')
        console.error(`  [FAIL] ${migration.name}:`, err.message)
        throw err
      }
    }

    console.log('\n  All migrations complete.')
  } finally {
    client.release()
    await pool.end()
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
