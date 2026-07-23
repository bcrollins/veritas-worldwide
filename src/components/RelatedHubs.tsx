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

interface RelatedHubsProps {
  /** data-testid for pure floors (page-specific) */
  testId: string
  /** Override hub set; default PRIMARY_RELATED_HUBS (≤5) */
  hubs?: readonly RelatedHub[]
  /** Paths to omit (e.g. hide News when already on News) */
  excludeTo?: string | string[]
  className?: string
  /** Surface token for parchment vs surface backgrounds */
  tone?: 'surface' | 'parchment'
  ariaLabel?: string
}

export default function RelatedHubs({
  testId,
  hubs = PRIMARY_RELATED_HUBS,
  excludeTo,
  className = '',
  tone = 'surface',
  ariaLabel = 'Related hubs',
}: RelatedHubsProps) {
  const excluded = new Set(
    Array.isArray(excludeTo) ? excludeTo : excludeTo ? [excludeTo] : [],
  )
  const list = hubs.filter((h) => !excluded.has(h.to))
  const toneClass = `${chipBase} ${tone === 'parchment' ? 'bg-parchment' : 'bg-surface'}`

  return (
    <nav
      className={`no-print flex flex-wrap gap-2 ${className}`.trim()}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {list.map((hub) => (
        <Link key={hub.to} to={hub.to} className={toneClass}>
          {hub.label}
        </Link>
      ))}
    </nav>
  )
}
