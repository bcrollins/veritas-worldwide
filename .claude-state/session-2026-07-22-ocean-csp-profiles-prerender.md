# Session 2026-07-22 — CSP harden + 94 profile prerenders

## Shipped intervals
- `f7f6823` — CSP img-src drops Wikimedia; getPreferredImageSrc refuses wiki hotlinks; pure=14
- `c83309c` — Prerender 94 power profiles (routes 292→386); bot OG first-party portraits; crawler floor 360
- `052a3cc` — ImageWithFallback treats refused wiki as placeholder

## Live proof targets
- Meta CSP img-src has no upload.wikimedia.org / commons.wikimedia.org
- `/api/build-info` prerenderedRouteCount ≥ 360 (expect 386 after c83309c)
- Twitterbot `/profile/ted-cruz` og:image → `/profiles/ted-cruz.jpg`
- verify:platform PASS · verify:pure PASS (14)

## Residual
- Lancet Langlo still lookup-only (Wayback 403)
- CRS PDF Wayback probe timed out (product page already pinned)
- Monogram SVGs for non-government profiles remain until editorial art
