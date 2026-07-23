import { Link } from 'react-router-dom'

/**
 * Primary-hub recovery chips (≤5 destinations by default).
 * Progressive disclosure back to Record / Read / Dossiers / Profiles / Search
 * without expanding the global shell hub budget (Hick's Law).
 * Entity-only — no personal identity.
 */

export interface RelatedHub {
  to: string
  label: string
}

/** Canonical ≤5 primary hubs — order matches shell primaryLinks. */
export const PRIMARY_RELATED_HUBS: readonly RelatedHub[] = [
  { to: '/', label: 'Record' },
  { to: '/read', label: 'Read' },
  { to: '/israel-dossier', label: 'Dossiers' },
  { to: '/profiles', label: 'Profiles' },
  { to: '/search', label: 'Search' },
] as const

const chipBase =
  'inline-flex min-h-[44px] items-center rounded-full border border-border px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold text-ink-muted transition-colors hover:border-crimson hover:text-crimson'

/** Emphasized chip (soft-404 Record CTA, home primary escape). */
const emphasizeChip =
  'inline-flex min-h-[44px] items-center justify-center rounded-full bg-crimson px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-crimson-dark'

interface RelatedHubsProps {
  /** data-testid for pure floors (page-specific) */
  testId: string
  /** Override hub set; default PRIMARY_RELATED_HUBS (≤5) */
  hubs?: readonly RelatedHub[]
  /** Paths to omit (e.g. hide News when already on News) */
  excludeTo?: string | string[]
  className?: string
  /** Surface token for parchment / surface / dark (quarantine show pages) */
  tone?: 'surface' | 'parchment' | 'dark'
  ariaLabel?: string
  /** Path that receives crimson solid CTA styling (e.g. '/' on soft-404) */
  emphasizeTo?: string
}

const darkChip =
  'inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold text-white/80 transition-colors hover:border-amber-400/60 hover:text-amber-300'

export default function RelatedHubs({
  testId,
  hubs = PRIMARY_RELATED_HUBS,
  excludeTo,
  className = '',
  tone = 'surface',
  ariaLabel = 'Related hubs',
  emphasizeTo,
}: RelatedHubsProps) {
  const excluded = new Set(
    Array.isArray(excludeTo) ? excludeTo : excludeTo ? [excludeTo] : [],
  )
  const list = hubs.filter((h) => !excluded.has(h.to))
  // surface | parchment archive tones; dark for quarantine show surfaces (e.g. /bernie)
  const toneClass =
    tone === 'dark'
      ? darkChip
      : `${chipBase} ${tone === 'parchment' ? 'bg-parchment' : 'bg-surface'}`

  return (
    <nav
      className={`no-print flex flex-wrap gap-2 ${className}`.trim()}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {list.map((hub) => (
        <Link
          key={hub.to}
          to={hub.to}
          className={emphasizeTo && hub.to === emphasizeTo ? emphasizeChip : toneClass}
        >
          {hub.label}
        </Link>
      ))}
    </nav>
  )
}
