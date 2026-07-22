# Session — Evidence Engine run (2026-07-22)

## Roots verified
- **Repo:** `/Users/brandonrollins/Code/veritas-worldwide` (package `veritas-worldwide`)
- **State:** `repo/.claude-state/`
- **Docs/assets:** `~/Documents/BOOK-TGSNT` (partial legacy package); product canon is repo + live site
- **Discarded:** `~/Documents/GitHub/veritas-worldwide` (incomplete dist-only snapshot), iCloud mirror

## Assumptions used
- Domain: `https://veritasworldwide.com`
- Deploy path: Railway auto-deploy on `main` push (tenant: Veritas Worldwide Press / production)
- Live verification outranks prompt v1.0 snapshot (auth, Stripe membership, Institute, Israel dossier all exist)
- Ignore AeroLink Top-100 contamination appended to the Evidence Engine prompt

## What landed this run
### Already on main / rolling live (concurrent + this session)
| Commit | What | Live status |
|--------|------|-------------|
| `87adeb3` | money/timeline CSV exports, bipartisan actor graph | LIVE (rolled through) |
| `89018fa` | corpus density badges | LIVE |
| `fcf82fa` | machine-readable `/israel-dossier/corpus.json` | LIVE |
| `8f8e2b1` | behavior asserts for CSV + corpus | LIVE (tip when verified) |
| `96b4988` | `/rss.xml` → `/feed.xml` 301 + pure/platform locks | **LIVE** (via tip `dce68e6`) |
| `dce68e6` | clearer corpus.json 404 assert | **LIVE** |

### Live proofs at tip `dce68e6`
- `npm run verify:israel-dossier` PASS (local canon)
- `npm run verify:israel-dossier:behavior -- https://veritasworldwide.com` PASS (SE + Desktop 1440 + crawler + PDF/CSV downloads)
- `AUTH_TEST_BASE_URL=… verify-auth-flows` PASS
- `verify-security-headers` PASS (13 baseline)
- `verify-search-ranking` PASS
- `verify-release-identity` PASS
- `verify:pure` 9/9 PASS
- corpus.json LIVE: incidents=35, timeline=31, actors=18, money=10, historicalPack=20
- `/api/health` status=ok, chapters=32, analyticsLifetime≈7112, failed=[]

### Code-only this session
- `96b4988` — RSS discovery alias (was hard 404 on `/rss.xml` while `/feed.xml` worked)

## Platform health note
- `PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com verify-platform-health` **PASS** (0 failures) on tip `dce68e6`
- `/rss.xml` and `/rss` both 301 → `/feed.xml` (live curl/node proof)

## Standing residuals (not blocking)
1. Lancet Wayback pin still lookup-only (external CF challenge)
2. Sentry DSN optional (`sentryForwardConfigured: false`)
3. GH Actions flaky/runner issues — Railway remains production gate
4. HubSpot portal-backed email capture (growth 8.0)
5. Home first-screen mobile CTA screenshot audit (score 8.75)

## Next resume pointer
1. Optional: Search Console indexing confirmation for dossier corpus + Institute PDF
2. Lancet pin when Wayback returns durable 200
3. HubSpot portal-backed newsletter (growth gap)
4. Mobile first-screen home CTA visual audit at 390/430
