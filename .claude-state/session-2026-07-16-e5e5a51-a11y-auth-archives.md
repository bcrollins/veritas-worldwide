# Session proof — tip e5e5a51 (+35b7510 shipping)

**Date:** 2026-07-16  
**Live tip proven:** `e5e5a51` (full `npm run verify:live` green)  
**Follow-on tip:** `35b7510` newsletter 44px (pushed; deploy after e5e5a51)

## Interval ships this continuation

| SHA | Summary |
|-----|---------|
| `4ed5161` | Shell 44px + platform news route asserts |
| `c5acb73` | +7 archive pins (NTSB/H.15/HRW/CPJ/Amnesty/UNRWA/FAA); floors 38; search/visuals |
| `0845489` | Reject invalid emails; more 44px (exit-intent, citation, forum) |
| `f2dad3a` | Download modal 44px |
| `e5e5a51` | Bookmark 44px + aria-pressed |
| `35b7510` | Newsletter 44px |

## Live proof (`e5e5a51`)

```
[verify:platform] PASS
[verify:release] PASS
[verify:auth] PASS
[verify:search-scoring] PASS
[verify:search] PASS
[verify:crawler-surfaces] PASS
[verify:health-transitions] PASS
[verify:article-sources] PASS
[verify:archive-manifest] PASS
```

Extra curl proofs:
- `POST /api/auth/register` email=`not-an-email` → **400** `Please enter a valid email address.`
- `POST /api/auth/login` unknown user → **401**
- Archive manifest live: **41** pinned (ntsb, h15, faa present)
- Health: `status=ok`, `healthHistoryStorage=shared-database`, `prerenderedRouteCount=289`, `popularChapterCount=8`

## Residual

- Lancet Langlo article still lookup-only (Wayback CDX empty for that URL).
- Sentry DSN still optional for external paging.

## Later interval ships (same session)

| SHA | Summary |
|-----|---------|
| `35b7510` | Newsletter 44px |
| `83f3a25` | Scorecard run 57 + proof |
| `62ef63b` | News/briefing/share/forum 44px |
| `5085f9b` | Article/profile/dossier chips 44px — **verify:live green** |
| `605ac46` | displayName control-char strip; chapter keyword chips — **verify:live green** |
| `33193d1` | Deep-state media + profile tier filters 44px |

