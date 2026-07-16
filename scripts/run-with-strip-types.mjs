#!/usr/bin/env node
/**
 * Run a TypeScript-importing script under the best available Node strip-types mode.
 *
 * - Node 22.6–22.17: requires --experimental-strip-types
 * - Node 22.18+/23+/24+: type stripping often enabled by default; the experimental
 *   flag may be a no-op or rejected as a "bad option"
 * - Never hard-fail the package.json script on a bad flag when a fallback works
 *
 * Usage: node scripts/run-with-strip-types.mjs path/to/script.mjs [...args]
 */
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = process.argv[2]
const forwardArgs = process.argv.slice(3)

if (!target) {
  console.error('[run-with-strip-types] usage: node scripts/run-with-strip-types.mjs <script> [...args]')
  process.exit(2)
}

const scriptPath = path.isAbsolute(target) ? target : path.join(repoRoot, target)

/** @type {string[][]} */
const attempts = [
  // Prefer explicit experimental flag first (Node 22.6–22.17 local + CI).
  ['--experimental-strip-types', scriptPath, ...forwardArgs],
  // Fall back to default type stripping (newer Node where the flag was removed).
  [scriptPath, ...forwardArgs],
]

let lastStatus = 1
let lastStderr = ''

for (const args of attempts) {
  const result = spawnSync(process.execPath, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    env: process.env,
  })
  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)

  if (result.status === 0) {
    process.exit(0)
  }

  lastStatus = result.status ?? 1
  lastStderr = result.stderr || ''

  // Node prints "bad option: --experimental-strip-types" when the flag is unknown.
  // Continue to the next attempt instead of failing the build.
  const badOption =
    /bad option:\s*--experimental-strip-types/i.test(lastStderr) ||
    /bad option:\s*--experimental-strip-types/i.test(result.stdout || '')
  if (badOption) {
    console.warn(
      '[run-with-strip-types] --experimental-strip-types unsupported on this Node; retrying without flag',
    )
    continue
  }
  // Non-flag failure: surface it immediately.
  process.exit(lastStatus)
}

console.error('[run-with-strip-types] FAIL — all Node strip-types attempts failed')
process.exit(lastStatus || 1)
