import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getInstitutePracticalTrackCounts, instituteResearchSources } from '../data/instituteCatalog'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const practicalTracks = getInstitutePracticalTrackCounts()

export default function InstituteMethodologyPage() {
  useEffect(() => {
    setMetaTags({
      title: `Veritas Institute Methodology | ${SITE_NAME}`,
      description:
        'How Veritas Institute builds a practical field manual and trade-course library from public safety guidance, licensing pathways, extension systems, and source-first editing.',
      url: `${SITE_URL}/institute/methodology`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Veritas Institute Methodology',
      url: `${SITE_URL}/institute/methodology`,
      description:
        'An explanation of the research and editorial method used to build the Veritas Institute field manual and practical course library.',
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
          We build for practical usefulness first: urgent answers in front, deeper trade-course content behind them.
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[color:var(--institute-muted)]">
          Veritas Institute is not trying to win a novelty contest for trending search terms. It is trying to answer two
          defensible editorial questions: what does a reader need to know immediately when a household or roadside
          problem hits, and what practical course paths matter most for real repair, trade, food, preparedness, and
          healthcare-support skill building today?
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="institute-panel px-6 py-6">
          <p className="institute-eyebrow">How topics were selected</p>
          <div className="mt-4 grid gap-4">
            {[
              'We start with durable public need: household failures, roadside failures, emergency basics, repair literacy, and trade pathways that have clear real-world use.',
              'We then anchor every answer to the right public body: safety agencies, extension systems, licensing boards, manufacturers, utilities, labor guidance, and accredited training routes.',
              'Finally, we force each topic through a practical test: does it help a reader act safely now, or build a real skill that can compound into household resilience or paid work?',
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
              'High-stakes medical, electrical, gas, structural, and legal matters are never presented as casual DIY entertainment.',
              'The fastest answer still has to be a defensible answer. We do not publish fake hacks just because they are catchy.',
              'Preparedness content avoids apocalypse theater and stays focused on systems, redundancy, drills, and recovery.',
              'Career and trade pathways are anchored to public labor guidance, apprenticeships, licensing ladders, and supervised skill acquisition whenever possible.',
            ].map((item) => (
              <div key={item} className="institute-list-row">
                <span className="text-sm leading-relaxed text-[color:var(--institute-ink)]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Answer architecture</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Guide</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              The shortest defensible answer for search, citation, and readers who need the next move now.
            </p>
          </article>
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Course</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              The deeper operating path with prerequisites, proof standards, module deliverables, and pacing.
            </p>
          </article>
          <article className="institute-mini-card">
            <h2 className="text-lg font-semibold text-[color:var(--institute-ink)]">Field manual</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--institute-muted)]">
              The print-friendly archive that puts immediate emergency answers first and the practical course library second.
            </p>
          </article>
        </div>
      </section>

      <section className="institute-panel px-6 py-6">
        <p className="institute-eyebrow">Track logic</p>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {practicalTracks.map((track) => (
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
          <Link to="/institute/book" className="institute-button-secondary">Open the Field Manual</Link>
          <Link to="/methodology" className="institute-button-secondary">Compare with publication methodology</Link>
          <Link to="/sources" className="institute-button-secondary">Open the source library</Link>
        </div>
      </section>
    </div>
  )
}
