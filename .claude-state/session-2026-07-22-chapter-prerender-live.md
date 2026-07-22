# Session 2026-07-22 — Chapter prerender floor + first-party ch15 live

## Shipped
- `914ff87` fix(prerender): parse all 32 chapter heroes and ship first-party ch15 asset
  - Root cause: `parseChapterMeta` only matched double-quoted `heroImage`; single-quoted meta dropped chapter routes to ~1 and prerender to 261 (< floor 270).
  - Fix: normalize single-quoted heroes before regex; `ISRAEL_DOSSIER_ASSETS` → `/chapters/heroes/*`.
  - Live proof: commit `914ff87`, `prerenderedRouteCount=292`, chapter-15 bot OG = `https://veritasworldwide.com/chapters/heroes/chapter-15.jpg`, platform health PASS.
- `ec0c9d3` fix(ux): unstack mobile first-screen consent and membership CTAs
  - Sticky membership bar waits for cookie consent decision; home hero primary CTA full-width on mobile.

## Verified live (914ff87 wave)
- `/api/build-info` routes=292 chapters=32
- Twitterbot `/chapter/chapter-15` og:image first-party hero
- Hero assets chapter-1/14/15/16/29 HTTP 200
- `/membership/success` `/donation/success` `/thank-you` HTTP 200
- `verify:platform` PASS against production

## Residual
- Lancet Langlo still lookup-only (Wayback 403 / archive.ph 429 as of 2026-07-22 re-probe)
- Profile + DeepState Wikimedia portrait hotlinks remain (separate first-party campaign)
- og:image:type jpeg accuracy fix queued in same session (server-social-meta + prerender)
