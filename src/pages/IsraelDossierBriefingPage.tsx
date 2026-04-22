import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'
import {
  ISRAEL_DOSSIER_ASSETS,
  ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT,
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

function SourceRowTable({ section }: { section: DossierBriefingSection }) {
  return (
    <section className="min-w-0 border-t border-border bg-surface" aria-labelledby={`${section.id}-source-row-table`}>
      <div className="grid gap-3 border-b border-border p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
            Footnote rows
          </p>
          <h3 id={`${section.id}-source-row-table`} className="mt-2 font-display text-2xl font-bold leading-tight text-ink">
            Source row table
          </h3>
        </div>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-ink-muted">
          Footnote rows for selected paragraph. Each row keeps the source class, date range, reference locator, proof boundary, archive lookup, and source-copy status visible before the reader reaches the source or workbook.
        </p>
      </div>

      <div className="w-full max-w-full overflow-x-auto" role="region" aria-label={`Source row table for ${section.title}`}>
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-parchment">
              <th scope="col" className="w-[150px] px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Row
              </th>
              <th scope="col" className="w-[210px] px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Source
              </th>
              <th scope="col" className="w-[230px] px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Reference locator
              </th>
              <th scope="col" className="px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Proof
              </th>
              <th scope="col" className="px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Proof boundary
              </th>
              <th scope="col" className="w-[190px] px-4 py-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Files
              </th>
            </tr>
          </thead>
          <tbody>
            {section.sourceRows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <th scope="row" className="align-top px-4 py-4">
                  <span className="block font-sans text-sm font-bold text-ink">{row.id}</span>
                  <span className="mt-2 block font-sans text-[0.58rem] font-bold uppercase tracking-[0.12em] text-crimson">
                    {SOURCE_CLASS_LABELS[row.sourceClass]}
                  </span>
                  <span className="mt-2 block font-sans text-[0.68rem] leading-snug text-ink-faint">
                    {row.statusLabel} / {row.dateRange}
                  </span>
                </th>
                <td className="align-top px-4 py-4">
                  <p className="font-sans text-sm font-bold leading-snug text-ink">{row.label}</p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-ink-muted">{row.sourceLabel}</p>
                </td>
                <td className="align-top px-4 py-4">
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{row.referenceLocator}</p>
                </td>
                <td className="align-top px-4 py-4">
                  <p className="font-body text-sm leading-relaxed text-ink">{row.proof}</p>
                </td>
                <td className="align-top px-4 py-4">
                  <p className="font-body text-sm leading-relaxed text-ink-muted">{row.proofBoundary}</p>
                </td>
                <td className="align-top px-4 py-4">
                  <div className="flex flex-col gap-2">
                    <a
                      href={row.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center justify-center border border-border px-3 font-sans text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                    >
                      Open source
                    </a>
                    <a
                      href={row.workbookPath}
                      download
                      className="inline-flex min-h-[36px] items-center justify-center bg-ink px-3 font-sans text-[0.62rem] font-bold uppercase tracking-[0.1em] text-surface transition-colors hover:bg-crimson"
                    >
                      Open workbook
                    </a>
                    <a
                      href={row.archiveLookupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[36px] items-center justify-center border border-border bg-parchment px-3 text-center font-sans text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:border-crimson hover:text-crimson"
                    >
                      Archive lookup
                    </a>
                    <p className="font-body text-[0.68rem] leading-relaxed text-ink-faint">
                      Source-copy status: {row.sourceCopyStatus}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function BriefingDetail({ section }: { section: DossierBriefingSection }) {
  return (
    <article className="min-w-0 border border-border bg-surface">
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
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
            Paragraph source IDs
          </span>
          {section.sourceIds.map((sourceId) => (
            <span
              key={sourceId}
              className="inline-flex min-h-[28px] items-center border border-border bg-parchment px-3 font-sans text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ink"
            >
              {sourceId}
            </span>
          ))}
        </div>
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

      <SourceRowTable section={section} />
    </article>
  )
}

function ChapterSequence({ briefing }: { briefing: typeof ISRAEL_DOSSIER_PUBLIC_BRIEFING }) {
  return (
    <section className="border border-border bg-surface p-5 sm:p-7">
      <div className="max-w-3xl">
        <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
          Reader-facing chapter sequence
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink">
          Build the chapter from source rows, not rhetoric.
        </h2>
        <p className="mt-4 font-body text-sm leading-relaxed text-ink-muted">
          The sequence below is the public-order draft: each chapter block names the paragraph source IDs first, then states what the paragraph can safely do.
        </p>
      </div>

      <ol className="mt-7 grid gap-4">
        {briefing.chapterSequence.map((step) => (
          <li key={step.id} className="border-l-2 border-border pl-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-crimson">
                {step.eyebrow}
              </span>
              <span className="font-sans text-[0.58rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                Paragraph source IDs
              </span>
              {step.sourceIds.map((sourceId) => (
                <span
                  key={sourceId}
                  className="inline-flex min-h-[24px] items-center border border-border bg-parchment px-2.5 font-sans text-[0.55rem] font-bold uppercase tracking-[0.1em] text-ink"
                >
                  {sourceId}
                </span>
              ))}
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">{step.title}</h3>
            <p className="mt-3 max-w-4xl font-body text-sm leading-relaxed text-ink">{step.summary}</p>
            <p className="mt-3 max-w-4xl border-l border-crimson pl-4 font-body text-sm leading-relaxed text-ink-muted">
              {step.boundary}
            </p>
          </li>
        ))}
      </ol>
    </section>
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
                href={ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT.url}
                download={ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT.filename}
                className="inline-flex min-h-[44px] items-center justify-center bg-white px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-crimson hover:text-white"
              >
                Download chapter draft
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

          <div className="min-w-0 space-y-8">
            <section className="border border-border bg-surface p-5 sm:p-7">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-crimson">
                Editorial thesis
              </p>
              <p className="mt-3 font-body text-lg leading-relaxed text-ink">
                {briefing.thesis}
              </p>
            </section>

            <BriefingDetail section={selected} />

            <ChapterSequence briefing={briefing} />

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

            <section className="border border-border bg-ink p-5 text-surface sm:p-7">
              <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-surface/60">
                Chapter draft artifact
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight">
                Public Records, Reported Harm, and Legal Posture
              </h2>
              <p className="mt-4 max-w-3xl font-body text-sm leading-relaxed text-surface/72">
                The Markdown draft expands the selected rows into a chapter-style sequence and keeps every paragraph tied to source-row IDs, unsafe-wording limits, and open questions.
              </p>
              <a
                href={ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT.url}
                download={ISRAEL_DOSSIER_PUBLIC_BRIEFING_CHAPTER_DRAFT.filename}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center bg-surface px-5 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-crimson hover:text-white"
              >
                Download chapter draft
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
