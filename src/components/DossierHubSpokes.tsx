import { Link, useLocation } from 'react-router-dom'

/**
 * Hub-and-spoke navigation for the Dossiers family (Israel · Briefing · Deep State · Forum · Profiles).
 * Keeps cross-dossier destinations ≤1 tap without expanding the global primary hub budget.
 * Entity-only — no personal identity.
 */

export type DossierSpokeId = 'israel' | 'briefing' | 'deep-state' | 'forum' | 'profiles'

export interface DossierSpoke {
  id: DossierSpokeId
  to: string
  label: string
  match: (pathname: string) => boolean
}

export const DOSSIER_SPOKES: readonly DossierSpoke[] = [
  {
    id: 'israel',
    to: '/israel-dossier',
    label: 'Israel',
    match: (p) => {
      const n = p.replace(/\/+$/, '') || '/'
      return n === '/israel-dossier'
    },
  },
  {
    id: 'briefing',
    to: '/israel-dossier/briefing',
    label: 'Briefing',
    match: (p) => p.includes('/israel-dossier/briefing'),
  },
  {
    id: 'deep-state',
    to: '/deep-state',
    label: 'Deep State',
    match: (p) => {
      const n = p.replace(/\/+$/, '') || '/'
      return n === '/deep-state'
    },
  },
  {
    id: 'forum',
    to: '/forum',
    label: 'Forum',
    match: (p) => p === '/forum' || p.startsWith('/forum/'),
  },
  {
    id: 'profiles',
    to: '/profiles',
    label: 'Profiles',
    match: (p) => p === '/profiles' || p.startsWith('/profiles/') || p.startsWith('/profile/'),
  },
] as const

type Variant = 'sticky' | 'inline' | 'also-in'

interface DossierHubSpokesProps {
  /** sticky = sticky strip (Israel hub); inline = compact bar; also-in = “Also in Dossiers” scent */
  variant?: Variant
  /** Hide the spoke matching this id (e.g. hide “Deep State” on Deep State page) */
  exclude?: DossierSpokeId
  className?: string
}

function isActive(pathname: string, spoke: DossierSpoke): boolean {
  return spoke.match(pathname)
}

export default function DossierHubSpokes({
  variant = 'sticky',
  exclude,
  className = '',
}: DossierHubSpokesProps) {
  const { pathname } = useLocation()
  const spokes = DOSSIER_SPOKES.filter((s) => s.id !== exclude)

  if (variant === 'also-in') {
    return (
      <nav
        aria-label="Also in Dossiers"
        data-testid="dossier-hub-spokes"
        data-variant="also-in"
        className={`no-print ${className}`.trim()}
      >
        <p className="mb-2 font-sans text-[0.55rem] font-bold tracking-[0.18em] uppercase text-ink-faint">
          Also in Dossiers
        </p>
        <div className="flex flex-wrap gap-2">
          {spokes.map((spoke) => {
            const active = isActive(pathname, spoke)
            return (
              <Link
                key={spoke.id}
                to={spoke.to}
                data-testid={`dossier-spoke-${spoke.id}`}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold tracking-wide transition-colors ${
                  active
                    ? 'border-crimson bg-crimson text-white'
                    : 'border-border bg-surface text-ink-muted hover:border-crimson/50 hover:text-crimson'
                }`}
                {...(active ? { 'aria-current': 'page' as const } : {})}
              >
                {spoke.label}
              </Link>
            )
          })}
        </div>
      </nav>
    )
  }

  if (variant === 'inline') {
    return (
      <nav
        aria-label="Dossier hub"
        data-testid="dossier-hub-spokes"
        data-variant="inline"
        className={`no-print flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`.trim()}
      >
        <Link
          to="/israel-dossier"
          className="inline-flex min-h-[44px] items-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-crimson hover:text-crimson-dark"
        >
          Dossiers
        </Link>
        <span className="text-ink-faint/50" aria-hidden="true">
          /
        </span>
        {spokes.map((spoke, i) => {
          const active = isActive(pathname, spoke)
          return (
            <span key={spoke.id} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span className="text-ink-faint/40" aria-hidden="true">
                  ·
                </span>
              )}
              <Link
                to={spoke.to}
                data-testid={`dossier-spoke-${spoke.id}`}
                className={`inline-flex min-h-[44px] items-center font-sans text-[0.7rem] font-semibold transition-colors ${
                  active ? 'text-crimson' : 'text-ink-muted hover:text-crimson'
                }`}
                {...(active ? { 'aria-current': 'page' as const } : {})}
              >
                {spoke.label}
              </Link>
            </span>
          )
        })}
      </nav>
    )
  }

  // sticky (default) — primary hub-and-spoke strip for Israel dossier
  return (
    <nav
      aria-label="Dossier hub spokes"
      data-testid="dossier-hub-spokes"
      data-variant="sticky"
      className={`sticky top-14 z-30 -mx-4 mb-6 border-b border-border bg-parchment/95 px-4 py-2 backdrop-blur-sm dark:bg-ink/95 sm:-mx-6 sm:px-6 no-print ${className}`.trim()}
    >
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 font-sans text-[0.55rem] font-bold tracking-[0.16em] uppercase text-ink-faint">
          Dossiers
        </span>
        <span className="shrink-0 text-ink-faint/40" aria-hidden="true">
          ·
        </span>
        <div className="flex min-w-max gap-1">
          {spokes.map((spoke) => {
            const active = isActive(pathname, spoke)
            return (
              <Link
                key={spoke.id}
                to={spoke.to}
                data-testid={`dossier-spoke-${spoke.id}`}
                className={`inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[0.6rem] font-semibold tracking-wide uppercase transition-all ${
                  active
                    ? 'bg-crimson text-white'
                    : 'text-ink-muted hover:bg-crimson/5 hover:text-crimson'
                }`}
                {...(active ? { 'aria-current': 'page' as const } : {})}
              >
                {spoke.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
