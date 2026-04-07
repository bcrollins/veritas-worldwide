import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { instituteResearchSources, instituteTracks } from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

export default function InstituteMethodologyPage() {
  useEffect(() => {
    setMetaTags({
      title: `Veritas Institute Methodology | ${SITE_NAME}`,
      description:
        'How Veritas Institute synthesized the top practical 2026 skill-intent topics from public labor-market data, official preparedness guidance, and source-first methodology.',
      url: `${SITE_URL}/institute/methodology`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Veritas Institute Methodology',
      url: `${SITE_URL}/institute/methodology`,
      description:
        'An explanation of the research and editorial method used to build the Veritas Institute catalog of practical skills and the Book of Knowledge.',
    })

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="space-y-8">
      <section className="institute-panel-strong px-6 py-8 sm:px-8 lg:px-10">
        <p className="institute-eyebrow">Institute methodology</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-[color:var(--institute-ink)] sm:text-5xl">
          We synthesized the 2026 demand surface. We did not invent an official list that does not exist.
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
          Veritas Institute treats “top 100 search” language carefully. Search behavior moves quickly, public platforms expose only fragments, and practical skills demand is shaped by both search intent and real-world constraints. The catalog is therefore built as a defensible synthesis, not fake precision.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">How topics were selected</p>
          <div className="mt-4 grid gap-4">
            {[
              'We started with durable public demand signals: labor-market guidance, official preparedness agencies, extension systems, and multi-country skill-demand reporting.',
              'We then translated those signals into search-intent clusters that match how people actually ask for help: “how to become a welder,” “how to use AI to make money,” “how to purify water in an emergency.”',
              'Finally, we forced each topic into a practical test: does it lead to income, resilience, household continuity, or a transferable skill that compounds?',
            ].map((item) => (
              <div key={item} className="institute-list-row">
                <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">Editorial rules</p>
          <div className="mt-4 grid gap-4">
            {[
              'Career pathways are anchored to official institutions, licensing bodies, and public labor guidance whenever possible.',
              'Preparedness content avoids fear-bait and makes safety, law, and official constraints visible.',
              'AI, business, and financial topics reject exaggerated earnings promises and frame uncertainty clearly.',
              'High-stakes medical, legal, structural, and hazardous work is never presented as casual DIY.',
            ].map((item) => (
              <div key={item} className="institute-list-row">
                <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Track logic</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {instituteTracks.map((track) => (
            <article key={track.id} className="institute-track-card">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--institute-accent)]">{track.shortLabel}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--institute-ink)]">{track.label}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">{track.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                <span className="font-medium text-[color:var(--institute-ink)]">Demand signal:</span> {track.demandSignal}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
                <span className="font-medium text-[color:var(--institute-ink)]">Method note:</span> {track.methodology}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Public source ladder</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {instituteResearchSources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="institute-list-row"
            >
              <span className="text-sm font-medium text-[color:var(--institute-ink)]">{source.label}</span>
              <span className="text-xs leading-relaxed text-[color:var(--institute-muted)]">{source.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Connected surfaces</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/institute" className="institute-button-primary">Browse the catalog</Link>
          <Link to="/institute/book" className="institute-button-secondary">Open the Book of Knowledge</Link>
          <Link to="/methodology" className="institute-button-secondary">Compare with publication methodology</Link>
          <Link to="/sources" className="institute-button-secondary">Open the source library</Link>
        </div>
      </section>
    </div>
  )
}
