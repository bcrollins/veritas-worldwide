# The Record of Jesus Christ — Manuscript Package

**Attribution:** Veritas Worldwide only  
**Platform:** `/record-of-jesus-christ`  
**Companion:** `/bible`  
**Corpus code:** `src/data/recordOfJesusChrist.ts`  
**Tier system:** `src/data/evidenceTiers.ts`  

## Package contents

| File | Role |
|------|------|
| `00-METHODOLOGY.md` | Evidence tiers, tools, anonymity, update triggers |
| `01-SOURCE-MAP.md` | Primary source families and critical editions |
| `02-CHRONOLOGICAL-OUTLINE.md` | Section skeleton Big Bang → 2026 |
| `03-ASSUMPTION-LEDGER.md` | Inferred dates and consensus levels |
| `MANUSCRIPT-CLAIMS.md` | Export of live claim set (regenerate from corpus) |
| `ANONYMITY-AUDIT.md` | Public-surface identity scan results |

## Status

Interval 1 (2026-07-23): Foundation shipped — full 7-tier taxonomy, 9 chronological sections, platform page, anonymity P0 scrub, prerender/SEO wiring.

## How to expand

1. Add claims only in `src/data/recordOfJesusChrist.ts` with tier + sources + proofVsConcept.  
2. Keep manuscript docs entity-only.  
3. Run build + `verify:crawler-surfaces` after route changes.  
4. Never insert personal names, career details, or operator fingerprints.
