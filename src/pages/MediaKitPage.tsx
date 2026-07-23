import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  clearMetaTags,
  removeJsonLd,
  setJsonLd,
  setMetaTags,
  breadcrumbJsonLd,
  faqJsonLd,
  newsMediaOrganizationJsonLd,
  SITE_NAME,
  SITE_URL,
} from '../lib/seo'

const SHORT_BIO = 'Primary Sources. Public Record. Your Conclusions.'

const BOILERPLATE =
  'Veritas Worldwide is an independent investigative publisher. Our flagship work, The Record, is a multi-chapter documentary archive built on primary sources, public records, and explicit evidence-tier labeling. Primary sources. Public record. Your conclusions.'

const TOKEN_SWATCHES = [
  { name: 'Parchment', hex: '#FAF8F5', on: 'text-ink' },
  { name: 'Ink', hex: '#1A1A1A', on: 'text-white' },
  { name: 'Crimson', hex: '#8B1A1A', on: 'text-white' },
  { name: 'Gold', hex: '#B8860B', on: 'text-white' },
  { name: 'Obsidian', hex: '#0A0A0A', on: 'text-white' },
] as const

const EVIDENCE_SWATCHES = [
  { name: 'Verified', hex: '#166534', on: 'text-white' },
  { name: 'Circumstantial', hex: '#92400E', on: 'text-white' },
  { name: 'Disputed', hex: '#991B1B', on: 'text-white' },
] as const

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
      { href: '/brand-kit/04-social/x-post-card.svg', label: 'X post card' },
      { href: '/brand-kit/04-social/story-1080x1920.svg', label: 'IG story' },
      { href: '/brand-kit/04-social/ig-carousel-1.svg', label: 'IG carousel 1' },
      { href: '/brand-kit/04-social/ig-carousel-2.svg', label: 'IG carousel 2' },
      { href: '/brand-kit/04-social/ig-carousel-3.svg', label: 'IG carousel 3' },
      { href: '/brand-kit/04-social/quote-card.svg', label: 'Quote card' },
      { href: '/brand-kit/04-social/youtube-thumbnail.svg', label: 'YouTube thumbnail' },
      { href: '/brand-kit/04-social/linkedin-article-header.svg', label: 'LinkedIn article header' },
      { href: '/brand-kit/04-social/newsletter-header.svg', label: 'Newsletter header' },
      { href: '/brand-kit/04-social/podcast-cover.png', label: 'Podcast cover' },
      { href: '/brand-kit/04-social/threads-post.svg', label: 'Threads post' },
      { href: '/brand-kit/04-social/bluesky-banner.svg', label: 'Bluesky banner' },
      { href: '/brand-kit/04-social/discord-invite.svg', label: 'Discord invite' },
      { href: '/brand-kit/04-social/citation-card.svg', label: 'Citation card' },
      { href: '/brand-kit/04-social/pinterest-pin.svg', label: 'Pinterest pin' },
      { href: '/brand-kit/04-social/tiktok-cover.svg', label: 'TikTok cover' },
      { href: '/brand-kit/04-social/reddit-banner.svg', label: 'Reddit banner' },
      { href: '/brand-kit/04-social/reels-safe-zone.svg', label: 'Reels safe zone' },
      { href: '/brand-kit/04-social/mastodon-banner.svg', label: 'Mastodon banner' },
      { href: '/brand-kit/04-social/whatsapp-cover.svg', label: 'WhatsApp cover' },
      { href: '/brand-kit/04-social/video-end-card.svg', label: 'Video end card' },
      { href: '/brand-kit/04-social/video-watermark.svg', label: 'Video watermark' },
      { href: '/brand-kit/09-templates/presentation-body.svg', label: 'Presentation body' },
      { href: '/brand-kit/07-docs/bios.json', label: 'Bios JSON' },
      { href: '/brand-kit/04-social/linkedin-post.svg', label: 'LinkedIn post' },
      { href: '/brand-kit/04-social/facebook-post.svg', label: 'Facebook post' },
      { href: '/brand-kit/04-social/SOCIAL-ASSET-MATRIX.md', label: 'Asset matrix' },
      { href: '/brand-kit/07-docs/SOCIAL-LAUNCH.md', label: 'Launch checklist' },
    ],
  },
  {
    title: 'Evidence tier cards',
    description: 'Product taxonomy cards: Verified, Circumstantial, Disputed — matching The Record labels. Full seven-tier scholarly map available as machine JSON.',
    links: [
      { href: '/brand-kit/04-social/evidence-tier-verified.svg', label: 'Verified' },
      { href: '/brand-kit/04-social/evidence-tier-circumstantial.svg', label: 'Circumstantial' },
      { href: '/brand-kit/04-social/evidence-tier-disputed.svg', label: 'Disputed' },
      { href: '/evidence-taxonomy.json', label: 'Evidence taxonomy JSON' },
      { href: '/methodology', label: 'Methodology page' },
    ],
  },
  {
    title: 'Press templates',
    description: 'Letterhead, email signature, business card, press release, correction notice, deck title.',
    links: [
      { href: '/brand-kit/09-templates/letterhead.svg', label: 'Letterhead' },
      { href: '/brand-kit/09-templates/email-signature.html', label: 'Email signature' },
      { href: '/brand-kit/09-templates/business-card.svg', label: 'Business card' },
      { href: '/brand-kit/09-templates/press-release-body.html', label: 'Press release template' },
      { href: '/brand-kit/09-templates/correction-notice.html', label: 'Correction notice' },
      { href: '/brand-kit/09-templates/presentation-title.svg', label: 'Presentation title' },
      { href: '/brand-kit/09-templates/source-stamp.svg', label: 'Source stamp' },
      { href: '/brand-kit/09-templates/press-contact.vcf', label: 'Press vCard' },
      { href: '/brand-kit/07-docs/PRESS-CONTACT.md', label: 'Press contact sheet' },
      { href: '/brand-kit/07-docs/brand-do-dont.svg', label: 'Logo do / don\'t' },
      { href: '/brand-kit/09-templates/media-kit.html', label: 'Static media kit' },
    ],
  },
]

export default function MediaKitPage() {
  const [kitVersion, setKitVersion] = useState<string | null>(null)
  const [kitSha, setKitSha] = useState<string | null>(null)
  const [kitZipBytes, setKitZipBytes] = useState<number | null>(null)
  const [copied, setCopied] = useState<string>('')

  useEffect(() => {
    setMetaTags({
      title: `Media Kit | ${SITE_NAME}`,
      description:
        'Download Veritas Worldwide Press logos, social banners, letterhead, and brand guidelines. Primary sources. Public record. Your conclusions.',
      url: `${SITE_URL}/media-kit`,
      image: `${SITE_URL}/brand-kit/05-og/og-media-kit.png`,
      imageAlt: 'Veritas Worldwide Media Kit — official brand assets',
    })
    setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Media Kit | ${SITE_NAME}`,
        url: `${SITE_URL}/media-kit`,
        description: 'Official brand and press assets for Veritas Worldwide Press.',
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      newsMediaOrganizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'The Record', url: SITE_URL },
        { name: 'Media Kit', url: `${SITE_URL}/media-kit` },
      ]),
      faqJsonLd([
        {
          question: 'Can journalists use Veritas Worldwide logos and social assets?',
          answer:
            'Yes. The Media Kit ZIP and individual assets are free for press, social media, and advocacy with attribution to Veritas Worldwide. Prefer vectors; do not recolor the seal outside brand tokens.',
        },
        {
          question: 'Where do I download the full brand kit?',
          answer:
            'Download the Ultimate Brand Kit ZIP from /media-kit or /brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip. The package includes logos, social banners, evidence-tier cards, and design tokens.',
        },
        {
          question: 'What is the press contact for Veritas Worldwide?',
          answer:
            'Press and rights inquiries: rights@veritasworldwide.com. Evidence taxonomy labels are Verified, Circumstantial, and Disputed — defined on the methodology page.',
        },
        {
          question: 'Is /brand-kit a public page?',
          answer:
            'No. /brand-kit is an asset tree (and admin console path). The public press surface is /media-kit; crawlers that hit /brand-kit are redirected there.',
        },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'DataDownload',
        name: 'Veritas Worldwide Ultimate Brand Kit',
        encodingFormat: 'application/zip',
        contentUrl: `${SITE_URL}/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip`,
        description: 'Full logo, social, press template, and design token package for Veritas Worldwide Press.',
      },
    ])
    let cancelled = false
    void fetch('/brand-kit/manifest.json', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!cancelled && data?.version) setKitVersion(String(data.version))
        if (!cancelled && data?.zipSha256) setKitSha(String(data.zipSha256))
        if (!cancelled && typeof data?.zipBytes === 'number') setKitZipBytes(data.zipBytes)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      clearMetaTags()
      removeJsonLd()
    }
  }, [])

  const copyText = (text: string, label: string) => {
    void navigator.clipboard.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(''), 2000)
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
                {kitZipBytes != null ? ` · ${(kitZipBytes / 1024).toFixed(0)} KB` : ''}
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
            {kitSha && (
              <p className="mt-3 break-all font-mono text-[0.65rem] text-ink-muted/70">
                sha256:{kitSha.slice(0, 24)}…{' '}
                <a
                  href="/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.sha256"
                  className="text-crimson hover:underline"
                  download
                >
                  checksum file
                </a>
              </p>
            )}
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

        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border" data-testid="media-kit-osint-oneliner">
        <div className="rounded-sm border border-border bg-surface px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-ink-muted leading-relaxed max-w-3xl">
            <span className="font-semibold text-ink">Research service:</span>{' '}
            Veritas also offers a fixed-price Comprehensive Online Profile ($499) — authenticated OSINT with methodology appendix.
            Not part of free press assets.
          </p>
          <Link
            to="/comprehensive-profile"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-sm bg-obsidian px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white hover:bg-crimson"
          >
            View service
          </Link>
        </div>
      </section>

      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border" data-testid="media-kit-research-pack-oneliner">
        <div className="rounded-sm border border-border bg-surface px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-ink-muted leading-relaxed max-w-3xl">
            <span className="font-semibold text-ink">Machine corpora:</span>{' '}
            Free offline research pack ZIP of public JSON corpora (profiles, ROC, Israel, taxonomy) for journalists and researchers.
            Publisher: Veritas Worldwide only.
          </p>
          <a
            href="/research-pack.zip"
            download="veritas-research-pack.zip"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-sm border border-obsidian px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink hover:border-crimson hover:text-crimson"
          >
            Download pack
          </a>
        </div>
      </section>

      <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Boilerplate</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copyText(BOILERPLATE, 'boilerplate')}
                className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
              >
                {copied === 'boilerplate' ? 'Copied' : 'Copy boilerplate'}
              </button>
              <button
                type="button"
                onClick={() => copyText(SHORT_BIO, 'short')}
                className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
              >
                {copied === 'short' ? 'Copied' : 'Copy short bio'}
              </button>
              <a
                href="/brand-kit/07-docs/bios.json"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-crimson hover:text-crimson"
              >
                bios.json
              </a>
            </div>
          </div>
          <p className="mt-4 max-w-3xl font-body leading-relaxed text-ink-muted">{BOILERPLATE}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Color tokens</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-ink-muted">
            Production palette. Never use gold for body copy on parchment. Full ratios in{' '}
            <a
              href="/brand-kit/07-docs/WCAG-CONTRAST.md"
              className="font-semibold text-crimson hover:text-crimson-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG contrast notes
            </a>
            . Evidence labels:{' '}
            <a
              href="/brand-kit/07-docs/EVIDENCE-TIERS.md"
              className="font-semibold text-crimson hover:text-crimson-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              EVIDENCE-TIERS.md
            </a>
            .
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {TOKEN_SWATCHES.map(swatch => (
              <div
                key={swatch.hex}
                className="overflow-hidden rounded-xl border border-border"
              >
                <div className={`flex h-20 items-end p-3 ${swatch.on}`} style={{ backgroundColor: swatch.hex }}>
                  <span className="font-mono text-xs opacity-90">{swatch.hex}</span>
                </div>
                <p className="bg-surface px-3 py-2 font-sans text-xs font-medium text-ink">{swatch.name}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-8 font-display text-lg font-semibold text-ink">Evidence tier colors</h3>
          <p className="mt-1 max-w-2xl font-body text-sm text-ink-muted">
            Same tokens as The Record UI (`src/styles/index.css`). Used on evidence-tier social cards.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {EVIDENCE_SWATCHES.map(swatch => (
              <div key={swatch.hex} className="overflow-hidden rounded-xl border border-border">
                <div className={`flex h-16 items-end p-3 ${swatch.on}`} style={{ backgroundColor: swatch.hex }}>
                  <span className="font-mono text-xs opacity-90">{swatch.hex}</span>
                </div>
                <p className="bg-surface px-3 py-2 font-sans text-xs font-medium text-ink">{swatch.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Featured assets</h2>
          <p className="mt-2 max-w-2xl font-body text-sm text-ink-muted">
            Preview production vectors used most often by press and social.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Seal', href: '/brand-kit/01-logos/logo-mark.svg', bg: 'bg-parchment' },
              { label: 'Verified', href: '/brand-kit/04-social/evidence-tier-verified.svg', bg: 'bg-obsidian' },
              { label: 'Citation', href: '/brand-kit/04-social/citation-card.svg', bg: 'bg-parchment' },
              { label: 'Threads', href: '/brand-kit/04-social/threads-post.svg', bg: 'bg-parchment' },
              { label: 'Bluesky', href: '/brand-kit/04-social/bluesky-banner.svg', bg: 'bg-obsidian' },
              { label: 'Media OG', href: '/brand-kit/05-og/og-media-kit.svg', bg: 'bg-parchment' },
              { label: 'Pinterest', href: '/brand-kit/04-social/pinterest-pin.svg', bg: 'bg-obsidian' },
              { label: 'TikTok', href: '/brand-kit/04-social/tiktok-cover.svg', bg: 'bg-obsidian' },
              { label: 'Reddit', href: '/brand-kit/04-social/reddit-banner.svg', bg: 'bg-obsidian' },
              { label: 'Reels', href: '/brand-kit/04-social/reels-safe-zone.svg', bg: 'bg-obsidian' },
              { label: 'Mastodon', href: '/brand-kit/04-social/mastodon-banner.svg', bg: 'bg-obsidian' },
              { label: 'Video end', href: '/brand-kit/04-social/video-end-card.svg', bg: 'bg-obsidian' },
              { label: 'LinkedIn', href: '/brand-kit/04-social/linkedin-post.svg', bg: 'bg-obsidian' },
              { label: 'Facebook', href: '/brand-kit/04-social/facebook-post.svg', bg: 'bg-parchment' },
            ].map(a => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-border hover:border-crimson/40"
              >
                <div className={`flex h-24 items-center justify-center p-3 ${a.bg}`}>
                  <img src={a.href} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <p className="bg-surface px-3 py-2 font-sans text-xs font-medium text-ink group-hover:text-crimson">
                  {a.label}
                </p>
              </a>
            ))}
          </div>
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
