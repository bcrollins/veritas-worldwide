import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import SearchPage from './pages/SearchPage'
import MethodologyPage from './pages/MethodologyPage'
import SourcesPage from './pages/SourcesPage'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur-md no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink hover:text-crimson transition-colors">
            Veritas Worldwide Press
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/', label: 'The Record' },
              { to: '/search', label: 'Search' },
              { to: '/methodology', label: 'Methodology' },
              { to: '/sources', label: 'Sources' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-xs tracking-[0.1em] uppercase transition-colors ${
                  location.pathname === link.to ? 'text-crimson font-bold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-3 flex flex-col gap-3">
            {[
              { to: '/', label: 'The Record' },
              { to: '/search', label: 'Search' },
              { to: '/methodology', label: 'Methodology' },
              { to: '/sources', label: 'Sources' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="h-[3px] bg-crimson" />
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-ink text-white/70 py-16 mt-20 no-print">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-4">
              Veritas Worldwide Press
            </p>
            <p className="font-body text-sm leading-relaxed text-white/50">
              Published March 2026<br />
              Compiled &amp; Edited by B.R.<br />
              Volume I
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-white/50 hover:text-white transition-colors">The Record</Link>
              <Link to="/search" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Search</Link>
              <Link to="/methodology" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Methodology</Link>
              <Link to="/sources" className="font-sans text-sm text-white/50 hover:text-white transition-colors">Sources</Link>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4">Principles</p>
            <p className="font-body text-sm italic text-white/50 leading-relaxed">
              Primary Sources &middot; Public Record &middot; Your Conclusions
            </p>
            <p className="font-sans text-xs text-white/30 mt-6">
              Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="font-sans text-xs text-white/30">
            &copy; 2026 Veritas Worldwide Press &middot; veritasworldwide.com &middot; Free &amp; Open Access
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-parchment text-ink">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/sources" element={<SourcesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
