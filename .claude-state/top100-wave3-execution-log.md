# Top-100 Wave 3 Execution Log

## Phase A Truth Model (2026-07-23)
- Live commit lag ~5a2fb3c vs tip b9e4f11+
- publicChapterCount 32, prerender ~683
- profiles 96, densify n≥3 = 96 live
- ROC claimCount live ~633 (soft floor lag WARN)
- OSINT health: checkoutReady true, stripeConfigured true, retentionDays 90
- Anonymity: verify:live-anonymity PASS entity-only

## Phase B–C
- Ledger: `.claude-state/top100-value-ledger-2026-07-23-v3.json`
- Outline: `.claude-state/top100-value-ledger-2026-07-23-v3-OUTLINE.md`
- 100 items outlined with WHAT-TO-IMPLEMENT

## Phase D ships this session
1. `b9e4f11` fix(spa): /researcher/timeline knownExact + robots + bot noindex + CTAs
2. Wave3 interval: integrityDocketCount export, weakHomepage metric, pure gates (GA4 free-text, search OSINT, knownExact freeze, admin 503), prerender noindex shell, bookmarks CTA, a11y OSINT note, dark form complete, service ops docs, Integrity FAQ on profiles index, llms densify language

## Anonymity audits
- verify:docs-anonymity PASS
- verify:identity-scrub PASS  
- verify:live-anonymity PASS
- package.json no personal GH
- public/ no /Users paths

## Operator blocked residual
- VITE_ADMIN_PASSWORD_HASH, password rotate, GH org transfer, git history scrub, OSINT_OPS_TOKEN

## Interval 2
- ChapterPDF evidence tier legend
- Dual-cite sample path harden (Gates WHO funding)
- weakHomepage 166→164
- Sentry optional DSN docs
- ROC soft-floor files from peers absorbed as Implemented ranks 53/74


## Interval dual-cite deep paths
- weakHomepage 164→96 (below WARN 120)
- debunk homepage 46→0 batch; statement homepage partial
- integrity pure PASS densify floor intact

## Dual-cite complete
- weakHomepage 96→0; densify 96/96 preserved

## Operator credentials (local only)
- Admin password + hash: `~/.veritas-admin-credentials.json` (mode 600, not in git)
- `VITE_ADMIN_PASSWORD_HASH` set on Railway (build-time Vite inject — requires redeploy/build)
- `OSINT_OPS_TOKEN` set on Railway (server runtime)
