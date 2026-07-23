import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, SITE_URL, SITE_NAME } from '../lib/seo'

const tools = [
  {
    to: '/researcher/timeline',
    title: 'Personal Timeline Builder',
    blurb:
      'Local-only chronology with scholarly evidence tiers and free tags. Never uploaded to Veritas servers.',
    privacy: 'localStorage only · noindex',
  },
  {
    to: '/sources',
    title: 'Sources library',
    blurb: 'Browsable primary-source library for The Record with evidence-tier filters.',
    privacy: 'public · no account required',
  },
  {
    to: '/methodology',
    title: 'Methodology',
    blurb: 'Five-tier source hierarchy, Volume I three-tier labels, and seven-tier scholarly scale.',
    privacy: 'public',
  },
  {
    to: '/evidence-taxonomy.json',
    title: 'Evidence taxonomy (JSON)',
    blurb: 'Machine-readable scholarly + legacy tier definitions for external research tools.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/record-of-jesus-christ',
    title: 'Record of Jesus Christ',
    blurb: 'Tier-labeled claim corpus with JSON/CSV/PDF export. Attribution: Veritas Worldwide only.',
    privacy: 'public corpus',
  },
  {
    to: '/record-of-jesus-christ/corpus.json',
    title: 'ROC machine corpus',
    blurb: 'JSON claim index with evidence tiers for retrieval systems.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/israel-dossier',
    title: 'Israel Dossier',
    blurb: 'Dual-sided multi-source incident workbench, actors, money trail, and exportable corpus.',
    privacy: 'public corpus',
  },
  {
    to: '/israel-dossier/corpus.json',
    title: 'Israel machine corpus',
    blurb: 'JSON incidents, timeline, actors, and money-trail nodes for offline audit.',
    privacy: 'public · entity publisher',
    external: true,
  },
  {
    to: '/timeline',
    title: 'Public archive timeline',
    blurb: 'Publication chronology for The Record (not personal / not Integrity Score).',
    privacy: 'public',
  },
  {
    to: '/bookmarks',
    title: 'Bookmarks',
    blurb: 'Local reader bookmarks and continue-reading state on this device.',
    privacy: 'local · noindex',
  },
  {
    to: '/privacy',
    title: 'Privacy policy',
    blurb: 'How Veritas handles analytics, accounts, and researcher local tools.',
    privacy: 'public',
  },
]

export default function ResearcherHubPage() {
  useEffect(() => {
    setMetaTags({
      title: `Researcher Tools | ${SITE_NAME}`,
      description:
        'Local and public research tools for The Record: personal timeline, sources, methodology, and machine corpora. Entity attribution only.',
      url: `${SITE_URL}/researcher`,
      // Indexable hub with real tool list (not thin); still entity-only.
      robots: 'index, follow',
    })
    return () => clearMetaTags()
  }, [])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.18em] text-crimson">
        Veritas Worldwide · researcher tools
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Researcher hub</h1>
      <p className="mt-3 font-body text-sm text-ink-muted leading-relaxed">
        Evidence integrity tools for independent verification. Personal builders stay on this device;
        public corpora are published by Veritas Worldwide only — no personal author byline.
      </p>

      <ul className="mt-8 space-y-3">
        {tools.map((tool) => (
          <li key={tool.to} className="rounded-sm border border-border bg-surface p-4">
            {tool.external ? (
              <a
                href={tool.to}
                className="font-display text-lg font-bold text-ink hover:text-crimson"
                target={tool.to.endsWith('.json') ? undefined : undefined}
                rel={tool.to.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {tool.title}
              </a>
            ) : (
              <Link to={tool.to} className="font-display text-lg font-bold text-ink hover:text-crimson">
                {tool.title}
              </Link>
            )}
            <p className="mt-1 font-body text-sm text-ink-muted leading-relaxed">{tool.blurb}</p>
            <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-wider text-ink-faint">
              {tool.privacy}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-body text-xs text-ink-faint leading-relaxed">
        Corrections and rights: rights@veritasworldwide.com · Privacy: privacy@veritasworldwide.com
      </p>
    </div>
  )
}
