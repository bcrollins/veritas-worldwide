import { Link } from 'react-router-dom'
import type { EvidenceCounts } from '../data/chapterTypes'
import { hasInterpretiveEvidence } from '../lib/evidenceSummary'

interface InterpretationBoundaryNoticeProps {
  counts: EvidenceCounts
  sourceCount?: number
  compact?: boolean
}

export default function InterpretationBoundaryNotice({
  counts,
  sourceCount,
  compact = false,
}: InterpretationBoundaryNoticeProps) {
  if (!hasInterpretiveEvidence(counts)) return null

  const hasDisputedMaterial = counts.disputed > 0

  return (
    <section
      className={`rounded-sm border px-4 py-4 ${
        hasDisputedMaterial
          ? 'border-disputed-border bg-disputed-bg/70'
          : 'border-circumstantial-border bg-circumstantial-bg/60'
      } ${compact ? 'mt-5' : 'mt-6'}`}
      data-testid="interpretation-boundary-note"
      aria-label="Interpretation boundary"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink">
          Interpretation Boundary
        </p>
        {sourceCount ? (
          <span className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">
            {sourceCount} sources cited
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">
        This surface includes documented facts alongside interpretive or disputed material. Treat motive, causation,
        and coordination as open questions unless the cited record independently proves them.
      </p>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <div className="rounded-sm border border-white/60 bg-white/50 px-3 py-2">
          <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.12em] text-verified">Verified</p>
          <p className="mt-1 font-body text-xs leading-relaxed text-ink-muted">
            Use verified items for what the record directly documents.
          </p>
        </div>
        <div className="rounded-sm border border-white/60 bg-white/50 px-3 py-2">
          <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.12em] text-circumstantial">Circumstantial</p>
          <p className="mt-1 font-body text-xs leading-relaxed text-ink-muted">
            Circumstantial items can support an interpretation, but they do not settle it on their own.
          </p>
        </div>
        <div className="rounded-sm border border-white/60 bg-white/50 px-3 py-2">
          <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.12em] text-disputed">Guardrail</p>
          <p className="mt-1 font-body text-xs leading-relaxed text-ink-muted">
            Protected status, religion, ethnicity, or nationality are not evidence and must not be used as causal proof.
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Link
          to="/methodology"
          className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.12em] text-crimson transition-colors hover:text-crimson-dark"
        >
          Review Evidence Standards →
        </Link>
        <span className="font-sans text-[0.58rem] uppercase tracking-[0.12em] text-ink-faint">
          {hasDisputedMaterial ? 'Disputed material present' : 'Interpretive material present'}
        </span>
      </div>
    </section>
  )
}
