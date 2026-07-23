/**
 * The Record of Jesus Christ — platform section
 * Attribution: Veritas Worldwide only.
 */
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  setMetaTags,
  clearMetaTags,
  setJsonLd,
  removeJsonLd,
  SITE_URL,
  SITE_NAME,
  faqJsonLd,
  breadcrumbJsonLd,
  howToJsonLd,
} from '../lib/seo'
import SharePanel from '../components/SharePanel'
import NewsletterSignup from '../components/NewsletterSignup'
import ReadingProgress from '../components/ReadingProgress'
import {
  SCHOLARLY_TIERS,
  SCHOLARLY_TIER_ORDER,
  type ScholarlyEvidenceTier,
} from '../data/evidenceTiers'
import {
  ROC_META,
  ROC_METHODOLOGY_NOTES,
  ROC_SECTIONS,
  ROC_TIMELINE,
  rocClaimCount,
  rocExportCsv,
  rocExportJson,
  rocSourceCount,
  rocTierHistogram,
  type RocClaim,
  type RocSection,
} from '../data/recordOfJesusChrist'

const TIER_PREF_KEY = 'veritas_roc_active_tiers'

const PROOF_LABELS: Record<RocClaim['proofVsConcept'], string> = {
  proof_grade_data: 'Proof-grade data',
  attested_report: 'Attested report',
  reconstruction: 'Historical reconstruction',
  debate: 'Scholarly debate',
  tradition: 'Tradition / theological claim',
  science_model: 'Scientific model',
}

function TierBadge({ tier }: { tier: ScholarlyEvidenceTier }) {
  const cfg = SCHOLARLY_TIERS[tier]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[0.65rem] font-sans font-bold tracking-[0.08em] uppercase"
      style={{
        backgroundColor: `color-mix(in srgb, ${cfg.colorVar} 14%, transparent)`,
        color: cfg.colorVar,
        border: `1px solid color-mix(in srgb, ${cfg.colorVar} 30%, transparent)`,
      }}
    >
      <span aria-hidden="true">{cfg.icon}</span>
      {cfg.shortLabel}
    </span>
  )
}

function TierFilter({
  active,
  onToggle,
}: {
  active: Set<ScholarlyEvidenceTier>
  onToggle: (t: ScholarlyEvidenceTier) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by evidence tier">
      {SCHOLARLY_TIER_ORDER.map(tier => {
        const cfg = SCHOLARLY_TIERS[tier]
        const isActive = active.has(tier)
        return (
          <button
            key={tier}
            type="button"
            onClick={() => onToggle(tier)}
            className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans font-medium transition-all border"
            style={{
              backgroundColor: isActive ? cfg.bgVar : 'transparent',
              color: isActive ? cfg.colorVar : 'var(--color-ink-muted)',
              borderColor: isActive ? cfg.colorVar : 'var(--color-border)',
              opacity: isActive ? 1 : 0.55,
            }}
            aria-pressed={isActive}
          >
            <span aria-hidden="true">{cfg.icon}</span>
            {cfg.shortLabel}
          </button>
        )
      })}
    </div>
  )
}

function ClaimCard({ claim }: { claim: RocClaim }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const cfg = SCHOLARLY_TIERS[claim.tier]

  const copyCitation = async () => {
    const url = `${SITE_URL}${ROC_META.path}#${claim.id}`
    const text = `Veritas Worldwide. “${claim.claim}” [${SCHOLARLY_TIERS[claim.tier].label}; ${PROOF_LABELS[claim.proofVsConcept]}]. In ${ROC_META.title}. ${ROC_META.publishDate}. ${url}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <article
      className="border rounded-sm overflow-hidden transition-shadow hover:shadow-md roc-claim-card"
      style={{ borderColor: `color-mix(in srgb, ${cfg.colorVar} 35%, transparent)` }}
      id={claim.id}
      aria-labelledby={`${claim.id}-title`}
    >
      <div className="p-5 sm:p-6" style={{ backgroundColor: cfg.bgVar }}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <TierBadge tier={claim.tier} />
          <span className="font-sans text-[0.6rem] tracking-[0.06em] uppercase text-ink-faint">
            {PROOF_LABELS[claim.proofVsConcept]}
          </span>
          <span className="font-mono text-[0.55rem] text-ink-faint ml-auto">{claim.id}</span>
        </div>
        <h3 id={`${claim.id}-title`} className="font-display text-lg sm:text-xl font-bold text-ink leading-snug mb-3">
          {claim.claim}
        </h3>
        <p className="font-body text-sm text-ink-light leading-relaxed">{claim.detail}</p>
        {claim.confidenceNote && (
          <p className="mt-3 font-sans text-xs text-ink-muted border-l-2 pl-3" style={{ borderColor: cfg.colorVar }}>
            <span className="font-semibold">Confidence / range: </span>
            {claim.confidenceNote}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-[0.7rem] font-semibold tracking-[0.05em] uppercase transition-colors px-1"
            style={{ color: cfg.colorVar }}
            aria-expanded={open}
            aria-controls={`${claim.id}-sources`}
          >
            <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {open ? 'Hide' : 'View'} Sources ({claim.sources.length})
          </button>
          <button
            type="button"
            onClick={copyCitation}
            className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-[0.7rem] font-semibold tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors px-1"
            aria-label={`Copy citation for claim ${claim.id}`}
          >
            {copied ? 'Copied' : 'Copy citation'}
          </button>
        </div>
        {open && (
          <ul
            id={`${claim.id}-sources`}
            className="mt-3 pt-3 border-t space-y-1.5"
            style={{ borderColor: `color-mix(in srgb, ${cfg.colorVar} 20%, transparent)` }}
          >
            {claim.sources.map((s, i) => (
              <li key={s.id}>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-start gap-2 font-sans text-xs text-ink-muted hover:text-ink transition-colors leading-relaxed"
                  >
                    <span className="font-semibold shrink-0" style={{ color: cfg.colorVar }}>[{i + 1}]</span>
                    <span>
                      {s.citation} <span className="text-ink-faint" aria-hidden="true">↗</span>
                      <span className="block text-[0.6rem] uppercase tracking-wider text-ink-faint mt-0.5">{s.kind.replace('_', ' ')}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex min-h-[44px] items-start gap-2 font-sans text-xs text-ink-muted leading-relaxed">
                    <span className="font-semibold shrink-0" style={{ color: cfg.colorVar }}>[{i + 1}]</span>
                    <span>
                      {s.citation}
                      <span className="block text-[0.6rem] uppercase tracking-wider text-ink-faint mt-0.5">{s.kind.replace('_', ' ')}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function SectionBlock({ section }: { section: RocSection }) {
  if (section.claims.length === 0) return null
  return (
    <section id={section.id} className="scroll-mt-24 mb-16">
      <header className="mb-6 border-b border-border pb-4">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.18em] uppercase text-crimson mb-2">
          Section {section.number} · {section.dateRange}
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-ink leading-tight mb-2">
          {section.title}
        </h2>
        <p className="font-body text-base text-ink-muted italic mb-3">{section.subtitle}</p>
        <p className="font-body text-sm text-ink-light leading-relaxed max-w-3xl">{section.summary}</p>
      </header>
      <div className="grid gap-4">
        {section.claims.map(c => (
          <ClaimCard key={c.id} claim={c} />
        ))}
      </div>
    </section>
  )
}

function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function RecordOfJesusChristPage() {
  const [activeTiers, setActiveTiers] = useState<Set<ScholarlyEvidenceTier>>(() => {
    try {
      const raw = localStorage.getItem(TIER_PREF_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as ScholarlyEvidenceTier[]
        const valid = parsed.filter((t): t is ScholarlyEvidenceTier => SCHOLARLY_TIER_ORDER.includes(t))
        if (valid.length) return new Set(valid)
      }
    } catch { /* ignore */ }
    return new Set(SCHOLARLY_TIER_ORDER)
  })
  const [claimQuery, setClaimQuery] = useState('')

  const toggleTier = (tier: ScholarlyEvidenceTier) => {
    setActiveTiers(prev => {
      const next = new Set(prev)
      if (next.has(tier)) next.delete(tier)
      else next.add(tier)
      if (next.size === 0) next.add(tier)
      try {
        localStorage.setItem(TIER_PREF_KEY, JSON.stringify([...next]))
      } catch { /* ignore */ }
      return next
    })
  }

  const hist = useMemo(() => rocTierHistogram(), [])
  const claimCount = rocClaimCount()
  const sourceCount = rocSourceCount()
  const q = claimQuery.trim().toLowerCase()
  const filteredTimeline = useMemo(
    () => ROC_TIMELINE.filter(t => activeTiers.has(t.tier)),
    [activeTiers],
  )
  const filteredSections = useMemo(() => {
    return ROC_SECTIONS.map(section => ({
      ...section,
      claims: section.claims.filter(c => {
        if (!activeTiers.has(c.tier)) return false
        if (!q) return true
        return (
          c.claim.toLowerCase().includes(q) ||
          c.detail.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.sources.some(s => s.citation.toLowerCase().includes(q))
        )
      }),
    })).filter(s => s.claims.length > 0)
  }, [activeTiers, q])

  useEffect(() => {
    setMetaTags({
      // SERP title ~58 chars
      title: `Record of Jesus Christ Evidence | ${SITE_NAME}`,
      description:
        'Historical Jesus, NT manuscripts, Dead Sea Scrolls, and Levant archaeology—every claim seven-tier labeled with sources. Pure evidence, no advocacy.',
      url: `${SITE_URL}${ROC_META.path}`,
      type: 'article',
      section: 'The Record',
      tags: ['Jesus of Nazareth', 'New Testament', 'textual criticism', 'archaeology', 'evidence tiers', 'Dead Sea Scrolls'],
      image: `${SITE_URL}/og/record-of-jesus-christ.png`,
      imageAlt: 'The Record of Jesus Christ — pure evidentiary compilation by Veritas Worldwide',
      publishedTime: '2026-07-23',
      author: SITE_NAME,
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: ROC_META.title,
        alternateName: 'Record of Jesus Christ — Evidentiary Compilation',
        description: ROC_META.subtitle,
        url: `${SITE_URL}${ROC_META.path}`,
        datePublished: '2026-07-23',
        inLanguage: 'en',
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        isPartOf: { '@type': 'WebSite', name: `The Record — ${SITE_NAME}`, url: SITE_URL },
        about: [
          { '@type': 'Thing', name: 'Jesus of Nazareth' },
          { '@type': 'Thing', name: 'New Testament textual criticism' },
          { '@type': 'Thing', name: 'Levantine archaeology' },
          { '@type': 'Thing', name: 'Dead Sea Scrolls' },
        ],
        numberOfPages: String(claimCount),
      },
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Record of Jesus Christ', url: `${SITE_URL}${ROC_META.path}` },
      ]),
      faqJsonLd([
        {
          question: 'What evidence tiers does The Record of Jesus Christ use?',
          answer:
            'Seven scholarly tiers: Verified, Well-Attested, Circumstantial, Contested, Interpretive, Speculative, and Literary/Theological. Every claim is labeled; proof is never mixed with tradition.',
        },
        {
          question: 'Does this Record conclude that Jesus is divine or that the resurrection happened?',
          answer:
            'No. Theological conclusions are out of scope as historical or scientific fact. Early proclamation of resurrection appearances is documented as attestation of belief; ontology is not labeled VERIFIED.',
        },
        {
          question: 'How many claims are in the corpus and where can researchers export them?',
          answer: `The live index contains ${claimCount} tier-labeled claims. Export JSON/CSV on the page, fetch the machine corpus at /record-of-jesus-christ/corpus.json, or download the portable PDF claim index.`,
        },
        {
          question: 'Who publishes this Record?',
          answer:
            'Veritas Worldwide only. There is no personal author byline. Contact rights@veritasworldwide.com for corrections.',
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Chronological sections — Record of Jesus Christ',
        numberOfItems: ROC_SECTIONS.length,
        itemListElement: ROC_SECTIONS.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          url: `${SITE_URL}${ROC_META.path}#${s.id}`,
        })),
      },
      howToJsonLd({
        name: 'How to use The Record of Jesus Christ evidence corpus',
        description:
          'Export and cite tier-labeled historical Jesus, manuscript, and archaeology claims from Veritas Worldwide without conflating proof and tradition.',
        url: `${SITE_URL}${ROC_META.path}`,
        image: `${SITE_URL}/og/record-of-jesus-christ.png`,
        totalTime: 'PT10M',
        supplies: ['Web browser', 'Optional spreadsheet or JSON tools'],
        steps: [
          {
            name: 'Open the evidence surface',
            text: 'Go to /record-of-jesus-christ and scan the nine chronological sections from cosmology (as science) through modern scholarship.',
            url: `${SITE_URL}${ROC_META.path}`,
          },
          {
            name: 'Filter by evidence tier or search claims',
            text: 'Toggle the seven scholarly tiers and use claim search for manuscripts, archaeology sites, or non-Christian sources.',
          },
          {
            name: 'Read the tier label and sources',
            text: 'Every claim shows proofVsConcept hygiene (proof-grade data vs reconstruction vs tradition) plus primary or peer citations.',
          },
          {
            name: 'Export for research databases',
            text: 'Download JSON or CSV on-page, or fetch corpus.json / the PDF claim index for offline work.',
            url: `${SITE_URL}/record-of-jesus-christ/corpus.json`,
          },
          {
            name: 'Cite Veritas Worldwide only',
            text: 'Attribute the compilation to Veritas Worldwide. Contact rights@veritasworldwide.com for corrections—no personal author byline.',
          },
        ],
      }),
    ])
    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [claimCount])

  return (
    <div className="w-full max-w-[1920px] mx-auto roc-record-page">
      <a
        href="#roc-main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-crimson focus:text-white focus:px-4 focus:py-2 focus:rounded-sm font-sans text-sm"
      >
        Skip to evidence content
      </a>
      <ReadingProgress />

      <div className="border-b border-border bg-surface no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 py-2">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint hover:text-crimson transition-colors"
            >
              The Record
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson">
              Record of Jesus Christ
            </span>
            <span className="text-ink-faint hidden sm:inline">·</span>
            <Link
              to="/bible"
              className="hidden sm:inline-flex min-h-[44px] items-center font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-muted hover:text-ink"
            >
              Companion: Bible History
            </Link>
          </div>
        </div>
      </div>

      <div id="roc-main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" tabIndex={-1}>
        <header className="max-w-3xl mb-12 border-b border-border pb-10">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            Documentary Record · Volume II Track
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-ink leading-[1.08] mb-5">
            {ROC_META.title}
          </h1>
          <p className="font-body text-lg md:text-xl italic text-ink-muted leading-relaxed max-w-2xl mb-6">
            {ROC_META.subtitle}
          </p>
          <p className="font-body text-sm text-ink-light leading-relaxed max-w-2xl mb-6">
            Compiled for independent verification. The historical and scientific record does not belong to any advocate or skeptic.
            It belongs to the evidence. Attribution: <strong className="font-semibold text-ink">{ROC_META.authorEntity}</strong> only.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-sans text-[0.65rem] tracking-[0.08em] uppercase text-ink-faint">
              {claimCount} claims · {ROC_SECTIONS.length} sections · {sourceCount} unique sources · {ROC_TIMELINE.length} timeline nodes · {ROC_META.publishDate}
            </span>
            <SharePanel
              url={`${SITE_URL}${ROC_META.path}`}
              title={ROC_META.title}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-5" role="group" aria-label="Researcher export">
            <button
              type="button"
              onClick={() => downloadText('record-of-jesus-christ-claims.json', rocExportJson(), 'application/json')}
              className="inline-flex min-h-[44px] items-center px-4 rounded-sm border border-border font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-ink hover:border-crimson hover:text-crimson transition-colors"
            >
              Export JSON
            </button>
            <button
              type="button"
              onClick={() => downloadText('record-of-jesus-christ-claims.csv', rocExportCsv(), 'text/csv')}
              className="inline-flex min-h-[44px] items-center px-4 rounded-sm border border-border font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-ink hover:border-crimson hover:text-crimson transition-colors"
            >
              Export CSV
            </button>
            <Link
              to="/methodology"
              className="inline-flex min-h-[44px] items-center px-4 rounded-sm bg-crimson/10 font-sans text-[0.65rem] font-bold tracking-[0.08em] uppercase text-crimson hover:bg-crimson/20 transition-colors"
            >
              Volume I methodology
            </Link>
          </div>
        </header>

        {/* Tier legend */}
        <section className="mb-12 rounded-sm border border-border bg-surface p-5 sm:p-6" aria-labelledby="tier-legend-heading">
          <h2 id="tier-legend-heading" className="font-display text-xl font-bold text-ink mb-2">
            Evidence-tier standards
          </h2>
          <p className="font-body text-sm text-ink-muted mb-4 max-w-3xl">
            Every claim below is labeled. Proof-grade data is never presented as theological conclusion, and tradition is never presented as laboratory fact.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {SCHOLARLY_TIER_ORDER.map(tier => {
              const cfg = SCHOLARLY_TIERS[tier]
              return (
                <div
                  key={tier}
                  className="p-3 rounded-sm border"
                  style={{ borderColor: cfg.borderVar, backgroundColor: cfg.bgVar }}
                >
                  <div className="mb-1.5">
                    <TierBadge tier={tier} />
                    <span className="ml-2 font-sans text-[0.6rem] text-ink-faint">n={hist[tier]}</span>
                  </div>
                  <p className="font-sans text-xs text-ink-light leading-relaxed">{cfg.description}</p>
                </div>
              )
            })}
          </div>
          <TierFilter active={activeTiers} onToggle={toggleTier} />
          <div className="mt-5">
            <label htmlFor="roc-claim-search" className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink-faint block mb-2">
              Search claims (voice-search friendly natural language)
            </label>
            <input
              id="roc-claim-search"
              type="search"
              value={claimQuery}
              onChange={e => setClaimQuery(e.target.value)}
              placeholder="e.g. Was Jesus crucified under Pilate? Dead Sea Scrolls? Josephus?"
              className="w-full min-h-[44px] px-4 py-2 rounded-sm border border-border bg-parchment font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-crimson/40"
              autoComplete="off"
              data-testid="roc-claim-search"
            />
            {q && (
              <p className="mt-2 font-sans text-xs text-ink-muted" role="status">
                Showing {filteredSections.reduce((n, s) => n + s.claims.length, 0)} claims matching “{claimQuery.trim()}”
              </p>
            )}
          </div>
        </section>

        {/* Figures */}
        <section className="mb-14" aria-labelledby="figures-heading">
          <h2 id="figures-heading" className="font-display text-2xl font-bold text-ink mb-2">
            Schematic figures
          </h2>
          <p className="font-body text-sm text-ink-muted mb-5 max-w-3xl">
            Educational schematics only — not raw instrument outputs. Each figure is labeled as interpretive aid under the cosmology / ANE claims.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <figure className="border border-border rounded-sm overflow-hidden bg-surface">
              <img
                src="/record-of-jesus-christ/figures/cmb-power-spectrum-schematic.svg"
                alt="Schematic CMB angular power spectrum with labeled acoustic peaks"
                className="w-full h-auto"
                width={960}
                height={540}
                loading="lazy"
              />
              <figcaption className="p-3 font-sans text-xs text-ink-muted">
                CMB power spectrum (schematic). See claim <a href="#cosmo-cmb-power" className="text-crimson hover:underline">cosmo-cmb-power</a>.
              </figcaption>
            </figure>
            <figure className="border border-border rounded-sm overflow-hidden bg-surface">
              <img
                src="/record-of-jesus-christ/figures/ane-inscription-sites.svg"
                alt="Schematic map of Ancient Near Eastern inscription findspots including Merneptah, Tel Dan, Mesha, Siloam"
                className="w-full h-auto"
                width={960}
                height={640}
                loading="lazy"
              />
              <figcaption className="p-3 font-sans text-xs text-ink-muted">
                ANE inscription findspots (schematic). See claim <a href="#ane-inscription-map" className="text-crimson hover:underline">ane-inscription-map</a>.
              </figcaption>
            </figure>
          </div>
          <p className="mt-4 font-sans text-xs text-ink-faint">
            Portable PDF index:{' '}
            <a href="/record-of-jesus-christ/record-of-jesus-christ.pdf" className="text-crimson hover:underline">
              record-of-jesus-christ.pdf
            </a>
            {' · '}
            Machine corpus:{' '}
            <a href="/record-of-jesus-christ/corpus.json" className="text-crimson hover:underline">
              corpus.json
            </a>
          </p>
        </section>

        {/* Related platform surfaces */}
        <section className="mb-14 p-5 border border-border rounded-sm bg-surface" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-xl font-bold text-ink mb-3">
            Related Veritas surfaces
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            <li>
              <Link to="/bible" className="inline-flex min-h-[44px] items-center font-body text-sm text-crimson hover:underline">
                The Bible: History &amp; Factual Record
              </Link>
            </li>
            <li>
              <Link to="/methodology" className="inline-flex min-h-[44px] items-center font-body text-sm text-crimson hover:underline">
                Publication methodology (Volume I + tier map)
              </Link>
            </li>
            <li>
              <Link to="/news" className="inline-flex min-h-[44px] items-center font-body text-sm text-crimson hover:underline">
                Current reporting (primary-source news desk)
              </Link>
            </li>
            <li>
              <Link to="/sources" className="inline-flex min-h-[44px] items-center font-body text-sm text-crimson hover:underline">
                Sources library
              </Link>
            </li>
          </ul>
        </section>

        {/* Methodology */}
        <section className="mb-14" aria-labelledby="method-heading">
          <h2 id="method-heading" className="font-display text-2xl font-bold text-ink mb-4">
            Methodology
          </h2>
          <ul className="space-y-2 max-w-3xl">
            {ROC_METHODOLOGY_NOTES.map((note, i) => (
              <li key={i} className="font-body text-sm text-ink-light leading-relaxed flex gap-2">
                <span className="text-crimson font-sans text-xs font-bold mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-sans text-xs text-ink-faint">
            Methodology version {ROC_META.methodologyVersion}. Companion surface:{' '}
            <Link to="/bible" className="text-crimson hover:underline">
              The Bible: History &amp; Factual Record
            </Link>
            . Core standards:{' '}
            <Link to="/methodology" className="text-crimson hover:underline">
              Site methodology
            </Link>
            .
          </p>
        </section>

        {/* TOC */}
        <nav className="mb-10 p-5 border border-border rounded-sm bg-parchment-dark/30" aria-label="Section contents">
          <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-faint mb-3">
            Chronological sections
          </h2>
          <ol className="grid sm:grid-cols-2 gap-2">
            {filteredSections.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-[44px] items-center font-body text-sm text-ink hover:text-crimson transition-colors"
                >
                  <span className="font-sans text-xs text-crimson mr-2">{s.number}</span>
                  {s.title}
                  <span className="ml-2 font-sans text-[0.6rem] text-ink-faint">
                    ({s.claims.length})
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Timeline */}
        <section id="timeline" className="mb-14 scroll-mt-24" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="font-display text-2xl font-bold text-ink mb-2">
            Interactive evidence timeline
          </h2>
          <p className="font-body text-sm text-ink-muted mb-5 max-w-3xl">
            Filter with the tier controls above. Each node links to its parent section. Dates are conventional scholarly ranges unless noted.
          </p>
          <ol className="relative border-l border-border ml-2 space-y-0">
            {filteredTimeline.map((node, i) => {
              const cfg = SCHOLARLY_TIERS[node.tier]
              return (
                <li key={`${node.date}-${i}`} className="pl-6 pb-6 relative">
                  <span
                    className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 bg-parchment"
                    style={{ borderColor: cfg.colorVar }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <time className="font-mono text-xs text-ink-muted">{node.date}</time>
                    <TierBadge tier={node.tier} />
                  </div>
                  <a href={`#${node.sectionId}`} className="font-display text-base font-bold text-ink hover:text-crimson">
                    {node.title}
                  </a>
                  <p className="font-body text-sm text-ink-light leading-relaxed mt-1">{node.detail}</p>
                </li>
              )
            })}
          </ol>
          {filteredTimeline.length === 0 && (
            <p className="font-body text-sm text-ink-muted">No timeline nodes match the active tier filters.</p>
          )}
        </section>

        {/* Sections */}
        {filteredSections.map(section => (
          <SectionBlock key={section.id} section={section} />
        ))}
        {filteredSections.length === 0 && (
          <p className="font-body text-sm text-ink-muted mb-16" role="status">
            No claims match the active tier filters and search query. Clear search or re-enable tiers.
          </p>
        )}

        {/* Anonymity / attribution footer */}
        <footer className="mt-8 pt-8 border-t border-border max-w-3xl">
          <h2 className="font-display text-lg font-bold text-ink mb-2">Attribution</h2>
          <p className="font-body text-sm text-ink-light leading-relaxed mb-4">
            This compilation is published by <strong className="text-ink">Veritas Worldwide</strong>.
            No personal author byline is attached. Contact for rights and corrections:{' '}
            <a href="mailto:rights@veritasworldwide.com" className="text-crimson hover:underline">
              rights@veritasworldwide.com
            </a>
            .
          </p>
          <p className="font-body text-xs text-ink-faint leading-relaxed mb-8">
            Update triggers: new major manuscript publications, peer-reviewed archaeological or radiocarbon results,
            material shifts in scholarly consensus, or correction of residual tier/citation errors.
          </p>
          <NewsletterSignup />
        </footer>
      </div>
    </div>
  )
}
