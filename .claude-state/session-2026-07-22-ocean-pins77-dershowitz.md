# Session 2026-07-22 — pins 71→77 + Alan Dershowitz densify

## Ships (main)
| Commit | What |
|--------|------|
| `ad926ff` | pins 63→71; floors ≥66 |
| `b1d01ba` | profile counter pure lock; pure 17; body-parser override |
| `7ece988` | pins 71→77; floors ≥72 |
| `452c6e2` | Alan Dershowitz NPA/CVRA densify + verifier; pure lock 19 |

## Multi-agent peers (coordinated)
- `43a66ae` Byron Donalds densify
- `c099e39` profile counter fix (stuck at 0)
- `b1caed9` corpus tags export order
- `d39a7da` drop-cap PDF print quality

## Live proof targets
- pinned ≥77 on briefing-source-archive-manifest.json
- tip ≥ `7ece988` then `452c6e2`
- `/profile/alan-dershowitz` 200
- pure suite 19 green

## Residual
- Lancet Langlo lookup-only (Wayback/CDX residual)
- Dependabot #25 body-parser (override ≥2.3.0 shipped; npm ls already 2.3.0)
