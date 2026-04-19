import fs from 'fs'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export function registerDatabaseAndAuthRoutes({
  app,
  chapterState,
  chapterHelpers,
  analyticsStore,
  recordPdfPath,
  getClientIP,
}) {
  const DATABASE_URL = process.env.DATABASE_URL
  const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')
  const JWT_EXPIRY = '30d'
  const BCRYPT_ROUNDS = 12

  let dbPool = null
  if (DATABASE_URL) {
    dbPool = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    })
    dbPool.on('error', (err) => console.error('[db] Pool error:', err.message))
    console.log('[auth] PostgreSQL connected via Neon')
  } else {
    console.warn('[auth] DATABASE_URL not set - auth API will return 503')
  }

  analyticsStore.setDatabasePool?.(dbPool)

  async function authenticateToken(req) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token) return null

    try {
      jwt.verify(token, JWT_SECRET)
      if (!dbPool) return null

      const { rows } = await dbPool.query(
        `SELECT u.id, u.email, u.display_name, u.tier, u.created_at, u.is_student
         FROM sessions s
         INNER JOIN users u ON u.id = s.user_id
         WHERE s.token = $1
           AND s.expires_at > NOW()
         LIMIT 1`,
        [token]
      )

      return rows[0] || null
    } catch {
      return null
    }
  }

  function requireDB(res) {
    if (!dbPool) {
      res.status(503).json({ error: 'Database not configured. Set DATABASE_URL environment variable.' })
      return false
    }

    return true
  }

  app.get('/api/auth/status', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    res.json({
      available: !!dbPool,
      mode: dbPool ? 'database' : 'degraded',
    })
  })

  app.get('/api/chapters', async (req, res) => {
    const wantsFull = req.query.scope === 'full'
    const chapterDataManifest = chapterState.getChapterDataManifest()
    const publicChapterIndex = chapterState.getPublicChapterIndex()

    if (!wantsFull) {
      res.setHeader('Cache-Control', 'no-store')
      return res.json({
        previewBlockLimit: chapterDataManifest.previewBlockLimit || 3,
        chapters: publicChapterIndex,
      })
    }

    const user = await authenticateToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const chapters = (chapterDataManifest.chapterIds || [])
      .map((chapterId) => chapterHelpers.getChapterJson('full', chapterId))
      .filter(Boolean)

    res.setHeader('Cache-Control', 'private, no-store')
    return res.json({
      previewBlockLimit: chapterDataManifest.previewBlockLimit || 3,
      chapters,
    })
  })

  app.get('/api/chapters/:id', async (req, res) => {
    const chapterId = chapterHelpers.sanitizeChapterId(req.params.id)
    if (!chapterId) {
      return res.status(400).json({ error: 'Invalid chapter id' })
    }

    const user = await authenticateToken(req)
    const scope = user ? 'full' : 'public'
    const chapter = chapterHelpers.getChapterJson(scope, chapterId)

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' })
    }

    res.setHeader('Cache-Control', user ? 'private, no-store' : 'no-store')
    return res.json(chapter)
  })

  app.get('/api/search', async (req, res) => {
    const query = chapterHelpers.normalizeSearchQuery(req.query.q)
    const user = await authenticateToken(req)
    const scope = user ? 'full' : 'public'
    const filters = user
      ? {
          evidenceTier: chapterHelpers.normalizeFilter(req.query.evidence, chapterHelpers.evidenceTierFilters),
          match: chapterHelpers.normalizeFilter(req.query.match, chapterHelpers.searchMatchFilters),
          chapterType: chapterHelpers.normalizeFilter(req.query.chapterType, chapterHelpers.chapterTypeFilters),
        }
      : {
          evidenceTier: 'all',
          match: 'all',
          chapterType: 'all',
        }

    const chapterDataManifest = chapterState.getChapterDataManifest()
    const publicChapterIndex = chapterState.getPublicChapterIndex()

    res.setHeader('Cache-Control', user ? 'private, no-store' : 'no-store')

    if (!query) {
      return res.json({
        query: '',
        scope,
        filters,
        totalChapters: (chapterDataManifest.chapterIds || []).length || publicChapterIndex.length,
        results: [],
      })
    }

    return res.json({
      query,
      scope,
      filters,
      totalChapters: (chapterDataManifest.chapterIds || []).length || publicChapterIndex.length,
      results: chapterHelpers.searchChapters(scope, query, filters),
    })
  })

  app.get('/api/downloads/the-record.pdf', async (req, res) => {
    const user = await authenticateToken(req)
    if (!user) {
      return res.status(401).json({ error: 'Sign in required to download this file.' })
    }
    if (!fs.existsSync(recordPdfPath)) {
      return res.status(404).json({ error: 'File not found' })
    }

    res.setHeader('Cache-Control', 'private, no-store')
    return res.sendFile(recordPdfPath)
  })

  app.get('/the-record.pdf', async (req, res) => {
    const user = await authenticateToken(req)
    if (!user) {
      res.setHeader('Cache-Control', 'no-store')
      return res.status(401).type('text/plain').send('Sign in required to download this file.')
    }
    if (!fs.existsSync(recordPdfPath)) {
      return res.status(404).type('text/plain').send('File not found.')
    }

    res.setHeader('Cache-Control', 'private, no-store')
    return res.sendFile(recordPdfPath)
  })

  app.post('/api/auth/register', async (req, res) => {
    if (!requireDB(res)) return

    const { email, password, displayName } = req.body
    if (!email || !password || !displayName) {
      return res.status(400).json({ error: 'Email, password, and display name are required.' })
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' })
    }

    const cleanEmail = email.toLowerCase().trim()

    try {
      const existing = await dbPool.query('SELECT id FROM users WHERE email = $1', [cleanEmail])
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'An account with this email already exists.' })
      }

      const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
      const { rows } = await dbPool.query(
        `INSERT INTO users (email, display_name, password_hash)
         VALUES ($1, $2, $3)
         RETURNING id, email, display_name, tier, created_at`,
        [cleanEmail, displayName.trim(), passwordHash]
      )

      const user = rows[0]
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
      const ip = getClientIP(req)
      const ua = req.headers['user-agent'] || ''
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

      await dbPool.query(
        'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [user.id, token, expiresAt, ip, ua.substring(0, 500)]
      )
      await dbPool.query('INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id])

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          tier: user.tier,
          createdAt: user.created_at,
        },
      })
    } catch (err) {
      console.error('[auth] Register error:', err.message)
      res.status(500).json({ error: 'Registration failed. Please try again.' })
    }
  })

  app.post('/api/auth/login', async (req, res) => {
    if (!requireDB(res)) return

    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const cleanEmail = email.toLowerCase().trim()

    try {
      const { rows } = await dbPool.query(
        'SELECT id, email, display_name, password_hash, tier, created_at, is_student FROM users WHERE email = $1',
        [cleanEmail]
      )
      if (rows.length === 0) {
        return res.status(401).json({ error: 'No account found with this email.' })
      }

      const user = rows[0]
      const validPassword = await bcrypt.compare(password, user.password_hash)
      if (!validPassword) {
        return res.status(401).json({ error: 'Incorrect password.' })
      }

      await dbPool.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id])

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
      const ip = getClientIP(req)
      const ua = req.headers['user-agent'] || ''
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

      await dbPool.query(
        'INSERT INTO sessions (user_id, token, expires_at, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
        [user.id, token, expiresAt, ip, ua.substring(0, 500)]
      )

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          tier: user.tier,
          createdAt: user.created_at,
          isStudent: user.is_student,
        },
      })
    } catch (err) {
      console.error('[auth] Login error:', err.message)
      res.status(500).json({ error: 'Login failed. Please try again.' })
    }
  })

  app.get('/api/auth/me', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { rows: bookmarks } = await dbPool.query(
      'SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
      [user.id]
    )
    const { rows: progress } = await dbPool.query(
      'SELECT chapter_id, scroll_position, completed, last_read_at FROM reading_progress WHERE user_id = $1',
      [user.id]
    )
    const { rows: prefs } = await dbPool.query(
      'SELECT theme, font_size, newsletter_subscribed FROM user_preferences WHERE user_id = $1',
      [user.id]
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        tier: user.tier,
        createdAt: user.created_at,
        isStudent: user.is_student,
      },
      bookmarks: bookmarks.map((bookmark) => bookmark.chapter_id),
      readingProgress: progress.reduce((acc, entry) => {
        acc[entry.chapter_id] = {
          scrollPosition: entry.scroll_position,
          completed: entry.completed,
          lastReadAt: entry.last_read_at,
        }
        return acc
      }, {}),
      preferences: prefs[0] || { theme: 'light', font_size: 'medium', newsletter_subscribed: false },
    })
  })

  app.post('/api/auth/logout', async (req, res) => {
    if (!requireDB(res)) return

    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (token) {
      await dbPool.query('DELETE FROM sessions WHERE token = $1', [token]).catch(() => {})
    }

    res.json({ ok: true })
  })

  app.post('/api/user/bookmarks', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { chapterId, action } = req.body
    if (!chapterId) return res.status(400).json({ error: 'chapterId required' })

    try {
      if (action === 'remove') {
        await dbPool.query('DELETE FROM bookmarks WHERE user_id = $1 AND chapter_id = $2', [user.id, chapterId])
      } else {
        await dbPool.query(
          'INSERT INTO bookmarks (user_id, chapter_id) VALUES ($1, $2) ON CONFLICT (user_id, chapter_id) DO NOTHING',
          [user.id, chapterId]
        )
      }

      const { rows } = await dbPool.query(
        'SELECT chapter_id FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC',
        [user.id]
      )
      res.json({ bookmarks: rows.map((row) => row.chapter_id) })
    } catch (err) {
      console.error('[user] Bookmark error:', err.message)
      res.status(500).json({ error: 'Failed to update bookmark' })
    }
  })

  app.post('/api/user/progress', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { chapterId, scrollPosition, completed } = req.body
    if (!chapterId) return res.status(400).json({ error: 'chapterId required' })

    try {
      await dbPool.query(
        `INSERT INTO reading_progress (user_id, chapter_id, scroll_position, completed, last_read_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, chapter_id)
         DO UPDATE SET scroll_position = $3, completed = COALESCE($4, reading_progress.completed), last_read_at = NOW()`,
        [user.id, chapterId, scrollPosition || 0, completed || false]
      )
      res.json({ ok: true })
    } catch (err) {
      console.error('[user] Progress error:', err.message)
      res.status(500).json({ error: 'Failed to save progress' })
    }
  })

  app.put('/api/user/preferences', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { theme, fontSize, newsletterSubscribed } = req.body

    try {
      await dbPool.query(
        `INSERT INTO user_preferences (user_id, theme, font_size, newsletter_subscribed, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id)
         DO UPDATE SET theme = COALESCE($2, user_preferences.theme),
                       font_size = COALESCE($3, user_preferences.font_size),
                       newsletter_subscribed = COALESCE($4, user_preferences.newsletter_subscribed),
                       updated_at = NOW()`,
        [user.id, theme, fontSize, newsletterSubscribed]
      )
      res.json({ ok: true })
    } catch (err) {
      console.error('[user] Preferences error:', err.message)
      res.status(500).json({ error: 'Failed to update preferences' })
    }
  })

  app.put('/api/user/profile', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { displayName } = req.body
    if (!displayName || typeof displayName !== 'string' || displayName.trim().length < 1) {
      return res.status(400).json({ error: 'Display name is required' })
    }

    try {
      await dbPool.query('UPDATE users SET display_name = $1, updated_at = NOW() WHERE id = $2', [displayName.trim(), user.id])
      res.json({ ok: true, displayName: displayName.trim() })
    } catch (err) {
      console.error('[user] Profile error:', err.message)
      res.status(500).json({ error: 'Failed to update profile' })
    }
  })

  app.post('/api/user/change-password', async (req, res) => {
    if (!requireDB(res)) return

    const user = await authenticateToken(req)
    if (!user) return res.status(401).json({ error: 'Not authenticated' })

    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both passwords required' })
    }
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' })
    }

    try {
      const { rows } = await dbPool.query('SELECT password_hash FROM users WHERE id = $1', [user.id])
      const valid = await bcrypt.compare(currentPassword, rows[0].password_hash)
      if (!valid) {
        return res.status(401).json({ error: 'Current password is incorrect' })
      }

      const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
      await dbPool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newHash, user.id])

      const authHeader = req.headers.authorization
      const currentToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
      await dbPool.query('DELETE FROM sessions WHERE user_id = $1 AND token != $2', [user.id, currentToken])

      res.json({ ok: true })
    } catch (err) {
      console.error('[user] Password change error:', err.message)
      res.status(500).json({ error: 'Failed to change password' })
    }
  })

  async function initializeDatabaseAndAnalytics() {
    if (!dbPool) return

    let client = null

    try {
      client = await dbPool.connect()
      await client.query(
        'CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL, applied_at TIMESTAMPTZ DEFAULT NOW())'
      )

      const migrations = [
        { name: '001_create_users', sql: "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, display_name VARCHAR(255) NOT NULL, password_hash VARCHAR(255) NOT NULL, tier VARCHAR(50) DEFAULT 'free', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), last_login_at TIMESTAMPTZ, is_student BOOLEAN DEFAULT FALSE, student_email VARCHAR(255)); CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);" },
        { name: '002_create_sessions', sql: 'CREATE TABLE IF NOT EXISTS sessions (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, token VARCHAR(512) UNIQUE NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), ip_address VARCHAR(45), user_agent TEXT); CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token); CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);' },
        { name: '003_create_bookmarks', sql: 'CREATE TABLE IF NOT EXISTS bookmarks (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);' },
        { name: '004_create_reading_progress', sql: 'CREATE TABLE IF NOT EXISTS reading_progress (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, chapter_id VARCHAR(100) NOT NULL, scroll_position FLOAT DEFAULT 0, completed BOOLEAN DEFAULT FALSE, last_read_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE(user_id, chapter_id)); CREATE INDEX IF NOT EXISTS idx_progress_user ON reading_progress(user_id);' },
        { name: '005_create_preferences', sql: "CREATE TABLE IF NOT EXISTS user_preferences (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE, theme VARCHAR(20) DEFAULT 'light', font_size VARCHAR(20) DEFAULT 'medium', newsletter_subscribed BOOLEAN DEFAULT FALSE, updated_at TIMESTAMPTZ DEFAULT NOW());" },
        { name: '006_create_analytics_state', sql: 'CREATE TABLE IF NOT EXISTS analytics_state (state_key VARCHAR(100) PRIMARY KEY, payload JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());' },
      ]

      const { rows: applied } = await client.query('SELECT name FROM migrations')
      const appliedSet = new Set(applied.map((row) => row.name))

      for (const migration of migrations) {
        if (appliedSet.has(migration.name)) continue

        try {
          await client.query('BEGIN')
          await client.query(migration.sql)
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [migration.name])
          await client.query('COMMIT')
          console.log(`[db] Migration applied: ${migration.name}`)
        } catch (err) {
          await client.query('ROLLBACK').catch(() => {})
          throw err
        }
      }

      console.log('[db] All migrations up to date')
    } catch (err) {
      console.error('[db] Migration error:', err.message)
      return
    } finally {
      client?.release()
    }

    const loadedFromDatabase = await analyticsStore.loadStoreFromDatabase()
    if (!loadedFromDatabase && analyticsStore.hasAnalyticsData()) {
      try {
        await analyticsStore.saveStoreToDatabase()
        console.log('[analytics] Seeded database state from disk analytics store')
      } catch (err) {
        console.warn('[analytics] Failed to seed database from disk:', err.message)
      }
    }
  }

  return { initializeDatabaseAndAnalytics }
}
