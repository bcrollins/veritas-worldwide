# Ocean continuation — news images + conversion + RSS (2026-07-22)

## Shipped this wave (origin/main)
| Tip | What |
|-----|------|
| `2f23a6d` | First-party news heroes + inline assets; kill Wikimedia hotlinks |
| `3055145` / success landings | Membership/donation thank-you routes |
| `96b4988` | `/rss.xml` → `/feed.xml` |
| `d16963d` | Chapter 15/16 + profile actor deep-links (parallel) |
| `773e0d2` | ImageWithFallback layout harden + Read surface heroes |
| `61dfd1b` | News bot OG meta.json + sharp 0.35 / audit 0 |
| `c7327cb` | RSS rebuild with 13 news items + hero enclosures |
| `2883f54` | Home CTA pure lock |

## Live verification (when tip ≥ `2f23a6d`)
- `/news/heroes/*.jpg` HEAD 200 image/jpeg
- Article hero SPA: federal-reserve 1280×720
- `/membership/success` no longer SPA 404 once deployed past thank-you tip

## Operator note
Configure Stripe Payment Link after-payment redirects to:
- `https://veritasworldwide.com/membership/success`
- `https://veritasworldwide.com/donation/success`

## Resume
1. Confirm live commit ≥ `c7327cb` / latest main
2. `PLATFORM_VERIFY_BASE_URL=https://veritasworldwide.com npm run verify:platform`
3. Bot: `curl -A facebookexternalhit/1.1 https://veritasworldwide.com/news/<slug>` for og:image
