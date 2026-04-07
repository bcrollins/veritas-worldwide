import { Link, Outlet, useLocation } from 'react-router-dom'

type InstituteNavLink = {
  to: string
  label: string
  match?: (pathname: string) => boolean
}

const navLinks: InstituteNavLink[] = [
  {
    to: '/institute',
    label: 'Catalog',
    match: (pathname) => pathname === '/institute' || pathname.startsWith('/institute/courses') || pathname.startsWith('/institute/guides'),
  },
  {
    to: '/institute/book',
    label: 'Book of Knowledge',
    match: (pathname) => pathname.startsWith('/institute/book'),
  },
  {
    to: '/institute/methodology',
    label: 'Methodology',
    match: (pathname) => pathname.startsWith('/institute/methodology'),
  },
]

function isActive(pathname: string, link: InstituteNavLink) {
  return link.match ? link.match(pathname) : pathname === link.to
}

export default function InstituteLayout() {
  const location = useLocation()

  return (
    <div className="institute-shell">
      <div className="institute-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-[color:var(--institute-border)] bg-[color:var(--institute-surface-strong)]/90 backdrop-blur-xl no-print">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0">
            <Link to="/institute" className="group inline-flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--institute-accent)]">
                Veritas Worldwide Learning Division
              </span>
              <span className="text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)] transition-colors group-hover:text-[color:var(--institute-ink-strong)]">
                Veritas Institute
              </span>
            </Link>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Practical career paths, resilient household systems, and source-backed skill guides for a fragile decade.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <nav className="flex flex-wrap gap-2" aria-label="Institute navigation">
              {navLinks.map((link) => {
                const active = isActive(location.pathname, link)

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`institute-nav-link ${active ? 'is-active' : ''}`}
                    {...(active ? { 'aria-current': 'page' as const } : {})}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex flex-wrap gap-2">
              <Link to="/" className="institute-button-secondary">
                Veritas Worldwide
              </Link>
              <Link to="/institute/book" className="institute-button-primary">
                Open the Field Manual
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="relative z-10 mt-12 border-t border-[color:var(--institute-border)] bg-[color:var(--institute-surface)]/85 no-print">
        <div className="mx-auto grid w-full max-w-[1600px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] lg:px-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--institute-accent)]">
              Same methodology, different mission
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--institute-ink)]">
              Veritas Institute keeps the Veritas discipline and drops the publication chrome.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--institute-muted)]">
              Official pathways, real constraints, public guidance, and calm operating logic outrank hype. The institute is designed to answer practical questions in a form search engines, LLMs, and stressed humans can all use.
            </p>
          </div>

          <nav aria-label="Institute">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--institute-muted-strong)]">
              Institute
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[color:var(--institute-muted)]">
              <Link to="/institute" className="hover:text-[color:var(--institute-ink)] transition-colors">Top 100 catalog</Link>
              <Link to="/institute/book" className="hover:text-[color:var(--institute-ink)] transition-colors">Book of Knowledge</Link>
              <Link to="/institute/methodology" className="hover:text-[color:var(--institute-ink)] transition-colors">Demand methodology</Link>
            </div>
          </nav>

          <nav aria-label="Tracks">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--institute-muted-strong)]">
              Core tracks
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[color:var(--institute-muted)]">
              <a href="/institute#track-ai-automation" className="hover:text-[color:var(--institute-ink)] transition-colors">AI & Automation</a>
              <a href="/institute#track-trades" className="hover:text-[color:var(--institute-ink)] transition-colors">Trades</a>
              <a href="/institute#track-tech" className="hover:text-[color:var(--institute-ink)] transition-colors">Tech & Data</a>
              <a href="/institute#track-preparedness" className="hover:text-[color:var(--institute-ink)] transition-colors">Preparedness</a>
            </div>
          </nav>

          <nav aria-label="Veritas">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--institute-muted-strong)]">
              Veritas
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[color:var(--institute-muted)]">
              <Link to="/methodology" className="hover:text-[color:var(--institute-ink)] transition-colors">Publication methodology</Link>
              <Link to="/sources" className="hover:text-[color:var(--institute-ink)] transition-colors">Source library</Link>
              <Link to="/membership" className="hover:text-[color:var(--institute-ink)] transition-colors">Support Veritas</Link>
            </div>
          </nav>
        </div>
      </footer>
    </div>
  )
}
