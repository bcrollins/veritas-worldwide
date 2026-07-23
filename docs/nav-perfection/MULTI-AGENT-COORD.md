# Multi-agent coordination — Nav vs Israel densify

**Nav agents:** Own shell, recovery hubs, ResearchHubChips, DossierHubSpokes, pure floors under `scripts/verify-nav-*.mjs`. Never stage:

- `public/israel-dossier/*`
- `src/data/israelDossier*.ts` densify sources
- peer soft-floor / VI re-exports

**Densify agents:** Own Israel corpus dual-sided densify + VI floors. Leave `src/App.tsx`, `src/components/DossierHubSpokes.tsx`, `src/components/ResearchHubChips.tsx` alone unless resolving a true conflict.

**Ship rhythm:** finish chunk → pure green → entity commit → push → next. Rebase/retry without force when races happen.

**Live proof:** shell + home + search + soft-404 markers must stay green after densify ships (nav is orthogonal to corpus size).

## RelatedHubs platform (nav-owned)
- `src/components/RelatedHubs.tsx` + pure floors under `scripts/verify-nav-*.mjs` + `scripts/verify-related-hubs-coverage.mjs`
- Every public page under `src/pages/` (admin exempt) mounts RelatedHubs with `testId`
- Sprint 9: research/institute dual recovery (ResearchHubChips + RelatedHubs PRIMARY ≤5)
- Never stage densify corpus. Single-file pure commits when densify tip is hot.
- Live matrix: CORE shell markers + server soft-404 five hubs + Sprint 9 testIds after deploy lag clears

## Keyboard focus platform (nav-owned a11y)
- Shell: desktop primary/utility/drawer, mobile tab bar, footer, cookie, skip-link
- Chips: RelatedHubs, ResearchHubChips, DossierHubSpokes (all variants)
- Engagement: StickyMembershipBar, ExitIntent, AuthModal, NewsletterSignup, SharePanel, CorrectionsCTA
- Pure: perpetual densify locks on verify-nav-recovery / verify-nav-ia + verify-related-hubs-coverage
- Never stage densify corpus when shipping focus/a11y intervals

