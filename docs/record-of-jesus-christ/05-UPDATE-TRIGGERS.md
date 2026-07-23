# Perpetual Update Architecture — Record of Jesus Christ

**Entity:** Veritas Worldwide · **Version:** 1.0

## Reactive triggers

| Trigger | Action |
|---------|--------|
| New INTF Liste entry / major papyrus publication | Add claim or update MS catalogue card; re-export corpus.json |
| ECM fascicle / NA29 release | Update `mod-na28-ubs5`, `nt-ecm-method`; bump wave file; re-export PDF |
| Major cosmological parameter paper (Planck successor / DESI BAO) | Update cosmo-* claims; keep science_model hygiene |
| Authenticated new Levantine inscription relevant to Israel/Judah | Add ane-* or arch-* card with museum/primary citation |
| Operator identity reappearance in sameAs / footer | P0: scrub + invert verify-seo-meta (forbid personal GH) |
| Peer-reviewed dig report (IAA, BASOR, IEJ, etc.) | Stratigraphy claim with ¹⁴C ranges if published |
| Radiocarbon program results (DSS, relics) | Update science_model claims; never inflate to VERIFIED without data |
| Material consensus shift (e.g., TF reconstructions) | Contested card rewrite with both poles |
| NA29 / ECM fascicle release | Critical edition claim update |

## Scheduled

| Cadence | Action |
|---------|--------|
| Annual | Full adversarial four-persona pass; ledger re-rank |
| Quarterly | Source URL health sample; anonymity grep on ROC paths |
| Per deploy | `npm run verify:record-of-jesus-christ` + `export:roc-corpus` |

## Never

- Present consensus as certainty when debate remains  
- Promote literary-theological claims to verified history  
- Insert operator identity into public artifacts  
