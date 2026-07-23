# Veritas Worldwide Press — Brand Kit v3.0.0

**Updated:** 2026-07-23  
**Domain:** veritasworldwide.com  
**Product:** The Record  
**Publisher:** Veritas Worldwide Press

## Brand Story

Veritas ("truth" in Latin) is an independent investigative publishing operation.  
The visual system signals documentary rigor: parchment paper, ink, crimson seals, and restrained gold accents — the aesthetic of an archive, not a startup.

## Logo System

| Asset | Use |
|-------|-----|
| `01-logos/logo-mark.svg` | Primary seal (parchment + crimson ring + ink V) |
| `01-logos/logo-mark-crimson.svg` | Crimson-on-parchment accent mark |
| `01-logos/logo-mark-white.svg` | White/transparent for dark backgrounds |
| `01-logos/logo-full.svg` | Horizontal lockup (mark + wordmark) |
| `01-logos/logo-full-stacked.svg` | Stacked lockup for covers / splash |
| `01-logos/logo-full-white.svg` | White lockup for dark backgrounds |
| `02-icons/app-icon.svg` | App / PWA rounded icon (crimson) |
| `02-icons/favicon.svg` | Browser favicon |
| `03-wordmarks/wordmark.svg` | Text-only VERITAS WORLDWIDE PRESS |
| `04-social/*` | Profile + platform banners |
| `05-og/og-image.svg` | Default Open Graph card |
| `08-ai-generated/*` | Grok Imagine reference renders |
| `09-templates/*` | Letterhead, email signature, press header |
| `02-icons/apple-touch-icon.png` | iOS home screen (180×180) |

### Clear space
Leave empty space around the mark equal to the height of the V's top serif bar.  
Never stretch, recolor outside approved tokens, or place on busy photography without a solid scrim.

### Minimum sizes
- Mark: 32×32 px digital
- Horizontal lockup: 160 px wide
- Favicon: 16×16 / 32×32

## Color Tokens

| Token | Hex | Role |
|-------|-----|------|
| Parchment | `#FAF8F5` | Primary background (light) |
| Ink | `#1A1A1A` | Body / logo ink |
| Crimson | `#8B1A1A` | Accent, CTAs, seal rings |
| Gold | `#B8860B` | Secondary accent, social labels |
| Obsidian | `#0A0A0A` | Dark social / OG backgrounds |

Dark mode shifts parchment→ink and raises crimson to `#C43030` for WCAG AA.

## Typography

- **Display:** Playfair Display (headlines, chapter titles)
- **Body:** Source Serif 4 (long-form reading)
- **UI:** Inter (navigation, labels, admin)
- **Data:** JetBrains Mono (citations, codes, metrics)

## Voice

Sober. Specific. Evidence-conscious.  
Never sensational. Never unsupported accusation as fact.  
Prefer: "Primary sources. Public record. Your conclusions."

## AI-generated references

`08-ai-generated/` contains Grok Imagine compositions used to lock the 2026 brand direction.  
Production surfaces ship the vector SVGs above (exact text, scalable). AI rasters are marketing references and social mood boards.

## Download

Admins: **/admin/brand-kit** → Download Ultimate Brand Kit (.zip)

## Regenerate

Run: npm run generate:brand-kit  
Then: npm run verify:brand-kit  
Live: BRAND_KIT_BASE_URL=https://veritasworldwide.com npm run verify:brand-kit

Generator: scripts/generate-brand-kit.mjs  
Verifier: scripts/verify-brand-kit.mjs (also runs on postbuild)

## Legal

© Veritas Worldwide Press. Brand assets for authorized Veritas Worldwide use only.  
Do not alter the mark for third-party products without written permission.
