import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DONATE_URL, TAGLINE } from '../lib/constants'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const operatingPrinciples = [
  {
    title: 'Document first',
    body: 'Veritas starts with public records, filings, transcripts, archival reporting, and other attributable sources. Interpretation is separated from documentation on purpose.',
  },
  {
    title: 'Label evidence clearly',
    body: 'Claims are framed through the live evidence taxonomy: Verified, Circumstantial, and Disputed. Readers should never have to guess how strong the support is.',
  },
  {
    title: 'Keep the trust layer public',
    body: 'Methodology, sources, and the public record around the work stay readable without a paid wall so readers can audit the reporting for themselves.',
  },
  {
    title: 'Fund without distorting',
    body: 'Membership and donations fund the work, but they do not change the sourcing rules, evidence language, or what remains publicly inspectable.',
  },
]

const contactChannels = [
  {
    label: 'Editorial tips and corrections',
    value: 'tips@veritasworldwide.com',
    href: 'mailto:tips@veritasworldwide.com',
    note: 'Use this for source material, corrections, clarification requests, and publication questions.',
  },
  {
    label: 'Rights and partnerships',
    value: 'rights@veritasworldwide.com',
    href: 'mailto:rights@veritasworldwide.com',
    note: 'Use this for licensing, documentary, educational, and distribution conversations tied to the rights package.',
  },
]

export default function AboutPage() {
  useEffect(() => {
    setMetaTags({
      title: `About | ${SITE_NAME}`,
      description:
        'What Veritas Worldwide publishes, how it verifies claims, what stays public, and how reader funding supports the work.',
      url: `${SITE_URL}/about`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `About ${SITE_NAME}`,
      url: `${SITE_URL}/about`,
      description:
        'An overview of the Veritas Worldwide publication model, evidence standards, reader access model, and contact channels.',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    })

    return () => {
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-ink-muted transition-colors hover:text-crimson">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <span className="font-medium text-ink">About</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <article className="max-w-none">
            <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-crimson">
              Publication Overview
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
              About Veritas Worldwide
            </h1>
            <p className="mt-4 max-w-3xl border-b border-border pb-8 font-body text-lg leading-relaxed text-ink-muted">
              {TAGLINE} Veritas is built as a documentary publication: longform chapters, current reporting,
              dossiers, profiles, topic explainers, and public methodology designed so a skeptical reader can
              inspect the record instead of trusting a vibe.
            </p>

            <section id="what-we-publish" className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-ink">What Veritas Publishes</h2>
              <div className="mt-4 space-y-4 font-body leading-relaxed text-ink-muted">
                <p>
                  The core product is <em>The Record</em>: a structured archive built from a foreword, an overview,
                  29 numbered chapters, and an epilogue. Around that archive, Veritas publishes source-first news,
                  dossiers, profiles, topic pages, and a public source and methodology layer that lets readers check
                  the work directly.
                </p>
                <p>
                  The product is intentionally split between public trust surfaces and reader account surfaces. The
                  public side explains method, preserves source visibility, and gives preview access. Reader accounts
                  deepen the archive relationship. Paid support funds the operation without turning the methodology
                  into a black box.
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Public trust layer
                  </p>
                  <ul className="mt-4 space-y-2 font-body text-sm leading-relaxed text-ink-muted">
                    <li>Methodology and sources stay readable without paid access.</li>
                    <li>Preview routes explain what the work is before asking for a relationship.</li>
                    <li>Evidence labels and source hierarchy remain visible and explicit.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Reader relationship
                  </p>
                  <ul className="mt-4 space-y-2 font-body text-sm leading-relaxed text-ink-muted">
                    <li>Free reader accounts unlock the archive relationship.</li>
                    <li>Membership funds reporting, document work, and publication durability.</li>
                    <li>Protected downloads and full-source utilities stay behind real auth boundaries.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="standards" className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">How the Publication Works</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {operatingPrinciples.map((principle) => (
                  <div key={principle.title} className="rounded-2xl border border-border bg-surface p-5">
                    <h3 className="font-serif text-lg font-semibold text-ink">{principle.title}</h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{principle.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-parchment px-5 py-6">
                <h3 className="font-serif text-lg font-semibold text-ink">Evidence and sourcing standards</h3>
                <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-ink-muted">
                  <p>
                    Veritas uses two separate trust systems on purpose. Evidence strength is labeled as Verified,
                    Circumstantial, or Disputed. Source provenance is described through a five-tier hierarchy covering
                    government and legal records, institutional records, investigative journalism, academic and
                    scholarly works, and secondary analysis.
                  </p>
                  <p>
                    Those systems are not interchangeable. A disputed claim can still be documented as disputed. A
                    verified claim should not rest only on weak sourcing. Claims about living people require higher
                    care, tighter attribution, and precise wording.
                  </p>
                </div>
              </div>
            </section>

            <section id="funding" className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">Independence and Funding</h2>
              <div className="mt-4 space-y-4 font-body leading-relaxed text-ink-muted">
                <p>
                  Veritas is funded through reader support. The business model is meant to preserve the publication&apos;s
                  independence, not cheapen it. Membership, donations, and rights work exist to keep the archive,
                  methodology, and source-first reporting durable over time.
                </p>
                <p>
                  That means no manipulative scarcity language, no paywall theater around the trust layer, and no
                  casual drift between what the membership page promises and what the product actually delivers.
                </p>
              </div>
            </section>

            <section id="contact" className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
              <div className="mt-5 grid gap-4">
                {contactChannels.map((channel) => (
                  <div key={channel.value} className="rounded-2xl border border-border bg-surface p-5">
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                      {channel.label}
                    </p>
                    <a
                      href={channel.href}
                      className="mt-2 inline-flex text-lg font-semibold text-crimson transition-colors hover:text-crimson-dark"
                    >
                      {channel.value}
                    </a>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{channel.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-[28px] bg-obsidian px-6 py-8 text-white md:px-8 md:py-10">
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/60">
                Support the work
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                Fund the record without paywalling the trust layer.
              </h2>
              <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/72">
                Reader funding keeps the archive open, supports document acquisition and verification work, and gives
                Veritas room to keep publishing without diluting the standard.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/membership"
                  className="inline-flex min-h-[44px] items-center rounded-full bg-white px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-obsidian transition-colors hover:bg-white/85"
                >
                  View Membership
                </Link>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/35"
                >
                  Make a Contribution
                </a>
              </div>
            </section>
          </article>

          <aside className="mt-12 lg:mt-0">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  At a glance
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">The Record</dt>
                    <dd className="font-semibold text-ink">32 parts</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Evidence taxonomy</dt>
                    <dd className="font-semibold text-ink">3 labels</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Source hierarchy</dt>
                    <dd className="font-semibold text-ink">5 tiers</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-muted">Public trust layer</dt>
                    <dd className="font-semibold text-ink">Methodology + Sources</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Key routes
                </h3>
                <nav className="mt-4 space-y-3">
                  {[
                    { to: '/read', label: 'Read The Record' },
                    { to: '/methodology', label: 'Methodology' },
                    { to: '/sources', label: 'Sources' },
                    { to: '/membership', label: 'Membership' },
                    { to: '/content-pack', label: 'Content Pack' },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block text-sm text-ink-muted transition-colors hover:text-crimson"
                    >
                      → {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl border border-crimson/15 bg-crimson/5 p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">Why this page matters</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
                  About pages are trust surfaces. They should explain the publication model honestly, not pretend a
                  bigger newsroom exists than the one actually doing the work.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
