import { Link, useLocation } from 'react-router-dom'

/**
 * Bidirectional Research hub chips — Methodology ↔ Sources ↔ Pack ↔ Researcher.
 * Progressive disclosure for Research drawer destinations without expanding primary hubs.
 */

const CHIPS = [
  { to: '/methodology', label: 'Methodology', match: (p: string) => p === '/methodology' || p.startsWith('/methodology/') },
  { to: '/sources', label: 'Sources', match: (p: string) => p === '/sources' || p.startsWith('/sources/') },
  { to: '/content-pack', label: 'Research Pack', match: (p: string) => p === '/content-pack' || p.startsWith('/content-pack') },
  { to: '/researcher', label: 'Researcher', match: (p: string) => p === '/researcher' || p.startsWith('/researcher/') },
  { to: '/institute', label: 'Institute', match: (p: string) => p === '/institute' || p.startsWith('/institute/') },
] as const

interface ResearchHubChipsProps {
  /** Optional exclude of current surface */
  excludePath?: string
  className?: string
}

export default function ResearchHubChips({ excludePath, className = '' }: ResearchHubChipsProps) {
  const { pathname } = useLocation()
  // When excludePath is set, drop that chip so the current surface does not self-link.
  const chips = CHIPS.filter((c) => {
    if (!excludePath) return true
    if (c.to === excludePath) return false
    if (excludePath !== '/' && c.to.startsWith(`${excludePath}/`)) return false
    return true
  })

  return (
    <nav
      aria-label="Research hub"
      data-testid="research-hub-chips"
      className={`no-print flex flex-wrap gap-2 ${className}`.trim()}
    >
      {chips.map((chip) => {
        const active = chip.match(pathname)
        return (
          <Link
            key={chip.to}
            to={chip.to}
            data-testid={`research-chip-${chip.to.replace(/\//g, '').replace(/^-/, '') || 'root'}`}
            className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 py-1.5 font-sans text-[0.65rem] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 ${
              active
                ? 'border-crimson bg-crimson text-white'
                : 'border-border bg-surface text-ink-muted hover:border-crimson/50 hover:text-crimson'
            }`}
            {...(active ? { 'aria-current': 'page' as const } : {})}
          >
            {chip.label}
          </Link>
        )
      })}
    </nav>
  )
}
