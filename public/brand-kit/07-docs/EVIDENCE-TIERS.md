# Evidence Tier Visual System — Veritas Worldwide Press

Product taxonomy (`src/data/chapterTypes.ts`): **Verified** · **Circumstantial** · **Disputed**.

These match on-site UI tokens in `src/styles/index.css`.

| Tier | Hex | Card asset | Meaning |
|------|-----|------------|---------|
| Verified | `#166534` | `04-social/evidence-tier-verified.svg` | Confirmed in primary sources |
| Circumstantial | `#92400E` | `04-social/evidence-tier-circumstantial.svg` | Strong inference; open gaps |
| Disputed | `#991B1B` | `04-social/evidence-tier-disputed.svg` | Competing accounts remain |

## Usage
- Use product names on social when labeling claims from The Record.
- Prefer vector SVGs for Stories/Reels overlays; PNG rasters for platform uploads that require bitmap.
- Never invent a fourth reader-facing tier without updating Methodology + brand kit together.

## CSS variables (tokens.css)
```css
--veritas-evidence-verified: #166534;
--veritas-evidence-circumstantial: #92400E;
--veritas-evidence-disputed: #991B1B;
```

Brand kit v${KIT_VERSION}
