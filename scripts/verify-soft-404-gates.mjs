#!/usr/bin/env node
/**
 * Pure soft-404 allowlist gates (no network).
 */
import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  isKnownChapterSlug,
  isKnownProfileSlug,
  isKnownNewsSlug,
  isKnownTopicSlug,
  isKnownInstituteSlug,
} from '../server-social-meta.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

assert(isKnownChapterSlug('chapter-1') === true, 'chapter-1 known')
assert(isKnownChapterSlug('chapter-29') === true, 'chapter-29 known')
assert(isKnownChapterSlug('CHAPTER-1') === true, 'chapter slug lookup is case-insensitive')
assert(isKnownChapterSlug('not-a-real-chapter-slug-xyz') === false, 'junk chapter unknown')
assert(isKnownProfileSlug('ted-cruz', root) === true, 'ted-cruz known')
assert(isKnownProfileSlug('Ted-Cruz', root) === true, 'profile slug lookup is case-insensitive')
assert(isKnownProfileSlug('definitely-not-a-real-person-xyz', root) === false, 'junk profile unknown')
assert(isKnownNewsSlug('aviation-safety-ntsb-faa-primary-records-2026', root) === true, 'news known')
assert(isKnownNewsSlug('Aviation-Safety-Ntsb-Faa-Primary-Records-2026', root) === true, 'news slug lookup is case-insensitive')
assert(isKnownNewsSlug('this-article-does-not-exist-xyz', root) === false, 'junk news unknown')
assert(isKnownTopicSlug('historical-jesus-evidence', root) === true, 'topic known')
assert(isKnownTopicSlug('Historical-Jesus-Evidence', root) === true, 'topic slug lookup is case-insensitive')
assert(isKnownTopicSlug('not-a-real-topic-xyz', root) === false, 'junk topic unknown')
assert(isKnownInstituteSlug('how-to-become-a-welder', root) === true, 'institute known')
assert(isKnownInstituteSlug('How-To-Become-A-Welder', root) === true, 'institute slug lookup is case-insensitive')
assert(isKnownInstituteSlug('not-a-real-course-xyz', root) === false, 'junk institute unknown')
assert(isKnownChapterSlug('') === false, 'empty chapter slug unknown')
assert(isKnownProfileSlug('', root) === false, 'empty profile slug unknown')
assert(isKnownChapterSlug(null) === false, 'null chapter slug unknown')
assert(isKnownNewsSlug('', root) === false, 'empty news slug unknown')
assert(isKnownTopicSlug('', root) === false, 'empty topic slug unknown')
assert(isKnownInstituteSlug('', root) === false, 'empty institute slug unknown')

// SPA soft-404 allowlist must include researcher hub (not only /researcher/timeline).
{
  const serverJs = fs.readFileSync(path.join(root, 'server.js'), 'utf8')
  assert(
    serverJs.includes("'/researcher'") || serverJs.includes('"/researcher"'),
    'server.js isKnownSpaRoute must allow /researcher hub',
  )
  assert(
    serverJs.includes("'/researcher/timeline'") || serverJs.includes('"/researcher/timeline"'),
    'server.js isKnownSpaRoute must allow /researcher/timeline',
  )
}

if (failures.length) {
  console.error('[verify:soft-404-gates] FAIL')
  for (const f of failures) console.error(' -', f)
  process.exit(1)
}
console.log('[verify:soft-404-gates] PASS — chapter/profile/news/topic/institute allowlists green')
