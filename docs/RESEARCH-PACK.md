# Offline Research Pack

**Entity:** Veritas Worldwide only  
**Public:** https://veritasworldwide.com/research-pack.zip  
**Manifest:** https://veritasworldwide.com/research-pack-manifest.json  

## What it is

A single ZIP of public machine-readable corpora used by the live site:

- `evidence-taxonomy.json`
- `profiles/corpus.json`
- `record-of-jesus-christ/corpus.json`
- `israel-dossier/corpus.json`
- `israel-dossier/visual-investigations.json` (multi-source video/photo incident index)
- soft-floor JSON files
- Israel template/workbook manifests
- `llms.txt`
- `README.md` (entity attribution)

No personal operator identity. No OSINT order PII.

## Build

```bash
npm run generate:research-pack
```

Runs automatically in `postbuild` after corpus exports. Writes **both** `public/` and `dist/` so Railway `express.static(dist)` serves the pack (Vite already copied public→dist before postbuild).

## Limits

- Size budget: 8 MiB (pure gate fails over budget)
- Rate limit: 20/min/IP on the ZIP, 40/min on the manifest (`research-pack` scope)
- Cache: `max-age=3600, must-revalidate` (not immutable year)

## Discovery

- `/researcher` hub tool cards
- `/sources` machine-readable panel
- `/methodology` downloads panel
- Home Power Profiles band + Media Kit press one-liner
- `llms.txt`

## Verify

```bash
npm run verify:research-pack          # pure
npm run verify:live-research-pack     # live ZIP + manifest
```
