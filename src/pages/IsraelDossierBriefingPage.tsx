import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import {
  ISRAEL_DOSSIER_ASSETS,
  ISRAEL_DOSSIER_PUBLIC_BRIEFING,
  type DossierBriefingSection,
  type DossierSourceCategory,
} from '../data/israelDossierCanon'

const SOURCE_CLASS_LABELS: Record<DossierSourceCategory, string> = {
  'public-record': 'Public record',
  'un-international': 'UN / international',
  'peer-reviewed': 'Peer reviewed',
  'monitor-ngo': 'Monitor / NGO',
  'press-osint': 'Press / OSINT',
  other: 'Other',
}

function SectionButton({
  section,
  selected,
  onSelect,
}: {
  section: DossierBriefingSection
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full border px-4 py-4 text-left transition-colors ${
        selected
          ? 'border-ink bg-ink text-surface'
          : 'border-border bg-surface text-ink hover:border-ink/30'
      }`}
    >
      <span className={`font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] ${selected ? 'text-surface/70' : 'text-crimson'}`}>
        {section.pillar}
      </span>
      <span className="mt-2 block font-sans text-sm font-bold leading-snug">{section.title}</span>
      <span className={`mt-3 block font-sans text-[0.62rem] uppercase tracking-[0.12em] ${selected ? 'text-surface/60' : 'text-ink-faint'}`}>
        {section.sourceIds.join(' / ')}
      </span>
    </button>
  )
}

function SourceBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex min-h-[28px] items-center border border-border bg-parchment px-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
      {label}
    </span>
  )
}

function BriefingDetail({ section }: { section: DossierBriefingSection }) {
  return (
    <article className="border border-border bg-surface">
      <div className="border-b border-border p-5 sm:p-7">
        <div className="mb-4 flex flex-wrap gap-2">
          <SourceBadge label={SOURCE_CLASS_LABELS[section.sourceClass]} />
          <SourceBadge label={section.statusLabel} />
          <SourceBadge label={section.dateRange} />
        </div>
        <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
          Selected briefing paragraph
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
          {section.title}
        </h2>
        <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-ink-muted sm:text-lg">
          {section.readerCopy}
        </p>
      </div>

      <div className="grid border-b border-border lg:grid-cols-[1fr_0.9fr]">
        <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            What the source can prove
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink">
            {section.verifiedFloor}
          </p>
        </div>
        <div className="p-5 sm:p-7">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            Boundary
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink">
            {section.boundary}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1fr]">
        <div className="border-b border-border bg-parchment p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
            Unsafe wording to avoid
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink">
            {section.unsafeWording}
          </p>
        </div>
        <div className="p-5 sm:p-7">
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            Next check
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink">
            {section.nextCheck}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={section.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center bg-ink px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-surface transition-colors hover:bg-crimson"
            >
              Open source
            </a>
            <a
              href={section.workbookPath}
              download
              className="inline-flex min-h-[44px] items-center justify-center border border-border px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:border-crimson hover:text-crimson"
            >
              Download row file
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function IsraelDossierBriefingPage() {
  const briefing = ISRAEL_DOSSIER_PUBLIC_BRIEFING
  const [selectedId, setSelectedId] = useState(briefing.sections[0]?.id || '')
  const selected = useMemo(
    () => briefing.sections.find((section) => section.id === selectedId) || briefing.sections[0],
    [briefing.sections, selectedId],
  )

  useEffect(() => {
    const title = `${briefing.title} | ${SITE_NAME}`
    const description = 'A source-boundary Israel dossier briefing built from populated workbook rows, with every claim tied to source IDs, confidence limits, and open questions.'
    const url = `${SITE_URL}/israel-dossier/briefing`
    setMetaTags({
      title,
      description,
      url,
      type: 'article',
      image: `${SITE_URL}${ISRAEL_DOSSIER_ASSETS.source}`,
      publishedTime: briefing.lastVerified,
      section: 'Israel Dossier',
      tags: ['Israel dossier', 'public records', 'humanitarian reporting', 'legal posture'],
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: briefing.title,
      description,
      datePublished: briefing.lastVerified,
      dateModified: briefing.lastVerified,
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: url,
      isPartOf: `${SITE_URL}/israel-dossier`,
    })

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [briefing])

  return (
    <main className="min-h-screen bg-parchment text-ink">
      <section
        className="relative isolate overflow-hidden border-b border-border bg-ink"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.92), rgba(10,10,10,0.72), rgba(10,10,10,0.42)), url(${ISRAEL_DOSSIER_ASSETS.source})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto grid min-h-[520px] max-w-7xl content-end px-5 py-14 sm:px-8 lg:min-h-[600px] lg:px-10">
          <div className="max-w-3xl pb-6">
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/70">
              Israel Dossier / Public briefing
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Source-boundary briefing.
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/82 sm:text-xl">
              {briefing.dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/israel-dossier/workbooks/publishable-briefing-draft.md"
                download
                className="inline-flex min-h-[44px] items-center justify-center bg-white px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-crimson hover:text-white"
              >
                Download draft
              </a>
              <Link
                to="/israel-dossier"
                className="inline-flex min-h-[44px] items-center justify-center border border-white/40 px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Return to dossier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
              Briefing controls
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink">
              Select a source row cluster.
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
              Each cluster converts workbook rows into publishable prose while keeping the proof boundary visible.
            </p>
            <div className="mt-6 grid gap-2" role="list" aria-label="Briefing sections">
              {briefing.sections.map((section) => (
                <SectionButton
                  key={section.id}
                  section={section}
                  selected={section.id === selected.id}
                  onSelect={() => setSelectedId(section.id)}
                />
              ))}
            </div>
          </aside>

          <div className="space-y-8">
            <section className="border border-border bg-surface p-5 sm:p-7">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
                Editorial thesis
              </p>
              <p className="mt-3 font-body text-lg leading-relaxed text-ink">
                {briefing.thesis}
              </p>
            </section>

            <BriefingDetail section={selected} />

            <section className="border-y border-border py-7">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
                Editor QA
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {briefing.editorChecks.map((check) => (
                  <div key={check} className="border-l-2 border-crimson pl-4">
                    <p className="font-body text-sm leading-relaxed text-ink">{check}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
