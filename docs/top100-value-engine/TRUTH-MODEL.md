# Veritas Worldwide — Truth Model

**Captured:** 2026-07-23T11:26:35Z  
**Local tip:** `b9e4f11` (`fix(spa): stop soft-404 on /researcher/timeline…`)  
**Live health commit:** `5a2fb3c` (deploy lag behind tip; Railway)  
**Attribution rule:** Entity-only — Veritas Worldwide / rights@veritasworldwide.com  
**Operator anonymity mandate:** Sophisticated adversary finds zero path from public surfaces to operator real identity.

## Live product surfaces

| Surface | Live status | Notes |
|---------|-------------|--------|
| Site health | ok | `publicChapterCount: 32`, prerender ~683, analytics lifetime ~7933 |
| The Record Vol I | Live | 32 chapters, free reader accounts, primary-source chronology |
| Sources library | 200 | Chapter-grouped sources + evidence-tier filters (3-tier legacy) |
| Methodology | 200 | Five-tier source hierarchy + 3-tier Vol I + 7-tier scholarly map |
| Israel Dossier | 200 | Corpus **732** incidents live = local; dual-sided densify mature |
| Record of Jesus Christ | 200 | Corpus **642** claims live = local; 7 scholarly tiers; JSON/PDF export |
| Personal timeline | Route exists | `/researcher/timeline` noindex; localStorage-only; basic fields |
| Profiles / Topics / News / Institute | Live | Entity schema, entity sameAs (X + Reddit only) |
| humans.txt / security.txt / llms.txt | Live | Entity-only; no personal identity |
| Bernie product page | Quarantined | robots Disallow + X-Robots-Tag noindex; residual surname intentional product |

## Corpora (ground truth)

| Corpus | Local | Live | Schema highlights |
|--------|------:|-----:|-------------------|
| Israel dossier incidents | 732 | 732 | tier, era, civilians/children tags, sources[], multimedia |
| ROC claims | 642 | 642 | tier histogram: verified 229, well_attested 264, interpretive 69, contested 50, circumstantial 25, literary 3, speculative 2 |
| Vol I chapters | 32 | 32 | Legacy tiers: verified / circumstantial / disputed |

## Stack

React/Vite/TypeScript/Tailwind · Express · custom analytics · server-side social meta · Railway deploy from `main` · PostgreSQL health/analytics · pure suite (~56 verify scripts) · entity git author for future commits.

## Anonymity baseline (PASS public package)

**PASS:** Live HTML multi-path identity scan; Organization sameAs entity-only; corpus publisher Veritas Worldwide; docs anonymity gate; analytics privacy needles; no personal GH in seo/prerender/index; humans.txt entity-only.

**Residual (infra / operator-owned — not fully closable in-repo alone):**

1. GitHub remote under personal namespace (transfer to org)  
2. Pre-entity git author history (offline filter-repo)  
3. WHOIS / Railway billing KYC  
4. Admin password historically at risk — `VITE_ADMIN_PASSWORD_HASH` required  
5. Bernie product surname in body HTML (noindex mitigated)  
6. Live soft claim floors during Railway lag (identity still clean)

## Gap themes → value engine

1. **Evidence integrity:** Unify 3-tier Vol I UX with 7-tier scholarly education; dual-sided Israel balance continuously; ROC proof-vs-concept hygiene; broken source link hardening.  
2. **Researcher trust/customizability:** Personal timeline depth (tiers, tags, import, pin-from-corpus); evidence-tier filters persistence; one-tap primary-source open; personal tag sets; cross-corpus search.  
3. **Publication readiness:** Social meta completeness; OG per surface; multi-volume scaffolding (Vol II + ROC already multi-wave); rights packaging (CC BY-NC-SA clarity).  
4. **Distribution / SEO-GEO:** llms.txt depth, Dataset schema floors, soft-404 gates, deploy lag vs tip.  
5. **Analytics privacy:** First-party only, consent mode, no PII event props, no session replay of operator.  
6. **OPSEC / anonymity:** Continuous verify:live-anonymity floors; scrub any new personal vectors; never ship personal sameAs.  
7. **Apple-OS evidence UX:** Touch targets, reading density, reduced motion, offline export, uncluttered long-form.

## Scoring method (ledger)

`PRIORITY = (Expected Value × Probability of Success) ÷ Execution Cost`  
Anonymity-leak and source-integrity items auto-elevated to P1.  
Score columns: current → target on 0–10.0 scale (category-leader incomplete at 10.0).

## Sources for this model

- Live: `GET /api/health`, `/robots.txt`, `/llms.txt`, both corpus.json endpoints, multi-path HTML  
- Local: tip `b9e4f11`, `public/*/corpus.json`, `docs/record-of-jesus-christ/ANONYMITY-AUDIT.md`, `scripts/verify-live-anonymity.mjs`, evidenceTiers.ts, PersonalTimelinePage.tsx  
- Explicit non-sources: aviation/AeroLink assumptions discarded; personal identity never written into public artifacts
