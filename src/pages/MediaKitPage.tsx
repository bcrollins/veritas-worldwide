import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearMetaTags, removeJsonLd, setJsonLd, setMetaTags, SITE_NAME, SITE_URL } from '../lib/seo'

const BOILERPLATE =
  'Veritas Worldwide is an independent investigative publisher. Our flagship work, The Record, is a multi-chapter documentary archive built on primary sources, public records, and explicit evidence-tier labeling. Primary sources. Public record. Your conclusions.'

const ASSETS = [
  {
    title: 'Logo mark',
    description: 'Publisher seal — serif V in concentric crimson rings.',
    links: [
      { href: '/brand-kit/01-logos/logo-mark.svg', label: 'SVG' },
      { href: '/brand-kit/01-logos/logo-mark-512.png', label: 'PNG 512' },
    ],
  },
  {
    title: 'Wordmark & lockup',
    description: 'Horizontal and stacked VERITAS WORLDWIDE PRESS lockups.',
    links: [
      { href: '/brand-kit/01-logos/logo-full.svg', label: 'Full lockup' },
      { href: '/brand-kit/03-wordmarks/wordmark.svg', label: 'Wordmark' },
    ],
  },
  {
    title: 'Social & Open Graph',
    description: 'Profile avatars, platform banners, story, carousels, and share cards.',
    links: [
      { href: '/og-image.png', label: 'OG image' },
      { href: '/brand-kit/04-social/social-banner-x.svg', label: 'X banner' },
      { href: '/brand-kit/04-social/story-1080x1920.svg', label: 'IG story' },
      { href: '/brand-kit/04-social/ig-carousel-1.svg', label: 'IG carousel 1' },
      { href: '/brand-kit/04-social/ig-carousel-2.svg', label: 'IG carousel 2' },
      { href: '/brand-kit/04-social/ig-carousel-3.svg', label: 'IG carousel 3' },
      { href: '/brand-kit/04-social/quote-card.svg', label: 'Quote card' },
      { href: '/brand-kit/04-social/youtube-thumbnail.svg', label: 'YouTube thumbnail' },
      { href: '/brand-kit/04-social/linkedin-article-header.svg', label: 'LinkedIn article header' },
      { href: '/brand-kit/04-social/SOCIAL-ASSET-MATRIX.md', label: 'Asset matrix' },
    ],
  },
  {
    title: 'Press templates',
    description: 'Letterhead, email signature, business card, press release body.',
    links: [
      { href: '/brand-kit/09-templates/letterhead.svg', label: 'Letterhead' },
      { href: '/brand-kit/09-templates/email-signature.html', label: 'Email signature' },
      { href: '/brand-kit/09-templates/business-card.svg', label: 'Business card' },
      { href: '/brand-kit/09-templates/press-release-body.html', label: 'Press release template' },
      { href: '/brand-kit/09-templates/media-kit.html', label: 'Static media kit' },
    ],
  },
]

export default function MediaKitPage() {
  const [kitVersion, setKitVersion] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: `Media Kit | ${SITE_NAME}`,
      description:
        'Download Veritas Worldwide Press logos, social banners, letterhead, and brand guidelines. Primary sources. Public record. Your conclusions.',
      url: `${SITE_URL}/media-kit`,
      image: `${SITE_URL}/og-image.png`,
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Media Kit | ${SITE_NAME}`,
      url: `${SITE_URL}/media-kit`,
      description: 'Official brand and press assets for Veritas Worldwide Press.',
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/brand-kit/01-logos/logo-mark-512.png`,
          width: 512,
          height: 512,
        },
      },
    })
    let cancelled = false
    void fetch('/brand-kit/manifest.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!cancelled && data?.version) setKitVersion(String(data.version))
      })
      .catch(() => {})
    return () => {
      cancelled = true
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  const copyBoilerplate = () => {
    void navigator.clipboard.writeText(BOILERPLATE)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="inline-flex min-h-[44px] items-center text-ink-muted transition-colors hover:text-crimson">
              Home
            </Link>
            <span className="text-ink-muted/50">›</span>
            <span className="font-medium text-ink">Media Kit</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-crimson">
              Press &amp; brand{kitVersion ? ` · v${kitVersion}` : ''}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">Media Kit</h1>
            <p className="mt-4 font-body text-lg leading-relaxed text-ink-muted">
              Official assets for Veritas Worldwide Press and <em>The Record</em>. Use vectors when possible.
              Do not recolor the seal outside brand tokens. Full package available as a single ZIP.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip"
                download
                className="inline-flex min-h-[44px] items-center rounded-full bg-crimson px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-crimson-dark"
              >
                Download Ultimate Brand Kit
              </a>
              <a
                href="/brand-kit/07-docs/BRAND-GUIDE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-border px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
              >
                Brand guide
              </a>
              <a
                href="/brand-kit/07-docs/USAGE-LEGAL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-border px-5 font-sans text-[0.72rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
              >
                Usage &amp; legal
              </a>
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center rounded-2xl border border-border bg-parchment p-8">
            <img
              src="/brand-kit/01-logos/logo-mark.svg"
              alt="Veritas Worldwide publisher seal"
              width={160}
              height={160}
              className="h-40 w-40"
            />
          </div>
        </div>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Boilerplate</h2>
            <button
              type="button"
              onClick={copyBoilerplate}
              className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
            >
              {copied ? 'Copied' : 'Copy boilerplate'}
            </button>
          </div>
          <p className="mt-4 max-w-3xl font-body leading-relaxed text-ink-muted">{BOILERPLATE}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Asset groups</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ASSETS.map(group => (
              <div key={group.title} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-serif text-lg font-semibold text-ink">{group.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{group.description}</p>
                <ul className="mt-4 space-y-2">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center font-sans text-sm font-medium text-crimson hover:text-crimson-dark"
                      >
                        {link.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-parchment px-5 py-6 md:px-8">
          <h2 className="font-display text-xl font-semibold text-ink">Press contact</h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">
            Rights, licensing, and media inquiries:{' '}
            <a href="mailto:rights@veritasworldwide.com" className="font-semibold text-crimson hover:text-crimson-dark">
              rights@veritasworldwide.com
            </a>
            . Editorial tips and corrections:{' '}
            <a href="mailto:tips@veritasworldwide.com" className="font-semibold text-crimson hover:text-crimson-dark">
              tips@veritasworldwide.com
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center font-sans text-sm text-ink-muted hover:text-crimson"
            >
              About Veritas →
            </Link>
            <Link
              to="/methodology"
              className="inline-flex min-h-[44px] items-center font-sans text-sm text-ink-muted hover:text-crimson"
            >
              Methodology →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
