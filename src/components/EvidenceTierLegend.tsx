import { Link } from 'react-router-dom'
import {
  SCHOLARLY_TIER_ORDER,
  SCHOLARLY_TIERS,
  VOLUME_I_TO_SCHOLARLY,
  type LegacyEvidenceTier,
} from '../data/evidenceTiers'

const LEGACY_ORDER: LegacyEvidenceTier[] = ['verified', 'circumstantial', 'disputed']

const LEGACY_LABEL: Record<LegacyEvidenceTier, string> = {
  verified: 'Verified',
  circumstantial: 'Circumstantial',
  disputed: 'Disputed',
}

type Props = {
  /** Compact strip for chapter chrome; full shows scholarly list. */
  mode?: 'compact' | 'full'
  className?: string
}

/**
 * Volume I three-tier badges + map to seven-tier scholarly scale.
 * Keeps dual-taxonomy education adjacent to evidence surfaces.
 */
export default function EvidenceTierLegend({ mode = 'compact', className = '' }: Props) {
  return (
    <aside
      className={`rounded-sm border border-border bg-surface/80 px-4 py-3 ${className}`}
      aria-label="Evidence tier legend"
    >
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
        Evidence labels
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {LEGACY_ORDER.map((tier) => (
          <span
            key={tier}
            className="inline-flex min-h-[32px] items-center rounded-sm border border-border bg-parchment px-2.5 font-sans text-[0.65rem] font-bold uppercase tracking-wider text-ink"
            title={VOLUME_I_TO_SCHOLARLY[tier].note}
          >
            {LEGACY_LABEL[tier]}
            <span className="ml-1.5 font-normal normal-case tracking-normal text-ink-faint">
              → {SCHOLARLY_TIERS[VOLUME_I_TO_SCHOLARLY[tier].primary].shortLabel}
            </span>
          </span>
        ))}
      </div>
      {mode === 'full' && (
        <ul className="mt-3 space-y-1.5">
          {SCHOLARLY_TIER_ORDER.map((id) => (
            <li key={id} className="font-body text-xs text-ink-muted leading-snug">
              <span className="font-sans font-bold text-ink">{SCHOLARLY_TIERS[id].label}:</span>{' '}
              {SCHOLARLY_TIERS[id].description}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 font-body text-xs text-ink-faint">
        Full scale:{' '}
        <Link to="/methodology#three-tier-evidence-classification" className="text-crimson hover:underline">
          Methodology
        </Link>
        {' · '}
        <Link to="/record-of-jesus-christ" className="text-crimson hover:underline">
          Scholarly 7-tier (ROC)
        </Link>
        {' · '}
        <a href="/evidence-taxonomy.json" className="text-crimson hover:underline">
          taxonomy JSON
        </a>
      </p>
    </aside>
  )
}
