#!/usr/bin/env node
/**
 * Auth must not wire GitHub OAuth (would link personal GH identity to product).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const files = [
  'src/lib/AuthContext.tsx',
  'src/lib/authStore.ts',
  'src/lib/firebase.ts',
  'server-auth.js',
  'server.js',
]
const failures = []
const forbid = [
  /github\.com\/login\/oauth/i,
  /GithubAuthProvider/i,
  /signInWithPopup\([^)]*Github/i,
  /provider:\s*['"]github['"]/i,
  /oauth.*github|github.*oauth/i,
]
for (const rel of files) {
  const p = path.join(root, rel)
  if (!fs.existsSync(p)) continue
  const text = fs.readFileSync(p, 'utf8')
  for (const re of forbid) {
    if (re.test(text)) failures.push(`${rel} matches ${re}`)
  }
}
if (failures.length) {
  console.error('[verify:oauth-no-github] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:oauth-no-github] PASS — no GitHub OAuth wiring in auth surfaces')
