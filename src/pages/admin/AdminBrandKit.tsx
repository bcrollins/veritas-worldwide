import { useEffect, useState } from 'react'

type BrandManifest = {
  version: string
  name: string
  generatedAt: string
  zipPath: string
  sections: { id: string; title: string; description: string }[]
  downloads: { label: string; href: string; adminOnly?: boolean }[]
}

const PREVIEW_ASSETS = [
  { label: 'Logo Mark', href: '/brand-kit/01-logos/logo-mark.svg', bg: 'bg-parchment' },
  { label: 'On Crimson', href: '/brand-kit/01-logos/logo-mark-on-crimson.svg', bg: 'bg-[#8B1A1A]' },
  { label: 'White Mark', href: '/brand-kit/01-logos/logo-mark-white.svg', bg: 'bg-black' },
  { label: 'Full Lockup', href: '/brand-kit/01-logos/logo-full.svg', bg: 'bg-parchment' },
  { label: 'App Icon', href: '/brand-kit/02-icons/app-icon.svg', bg: 'bg-white/5' },
  { label: 'Apple Touch', href: '/apple-touch-icon.png', bg: 'bg-white/5' },
  { label: 'Wordmark', href: '/brand-kit/03-wordmarks/wordmark.svg', bg: 'bg-parchment' },
  { label: 'Social Profile', href: '/brand-kit/04-social/social-profile.svg', bg: 'bg-white/5' },
  { label: 'OG Card', href: '/brand-kit/05-og/og-image.svg', bg: 'bg-black' },
  { label: 'Letterhead', href: '/brand-kit/09-templates/letterhead.svg', bg: 'bg-parchment' },
  { label: 'Press Header', href: '/brand-kit/09-templates/press-release-header.svg', bg: 'bg-parchment' },
  { label: 'Business Card', href: '/brand-kit/09-templates/business-card.svg', bg: 'bg-parchment' },
  { label: 'Quote Card', href: '/brand-kit/04-social/quote-card.svg', bg: 'bg-black' },
  { label: 'YouTube Thumb', href: '/brand-kit/04-social/youtube-thumbnail.svg', bg: 'bg-black' },
  { label: 'LinkedIn Article', href: '/brand-kit/04-social/linkedin-article-header.svg', bg: 'bg-parchment' },
  { label: 'IG Carousel 1', href: '/brand-kit/04-social/ig-carousel-1.svg', bg: 'bg-black' },
  { label: 'Evidence Verified', href: '/brand-kit/04-social/evidence-tier-verified.svg', bg: 'bg-black' },
  { label: 'Evidence Contested', href: '/brand-kit/04-social/evidence-tier-contested.svg', bg: 'bg-black' },
  { label: 'Podcast Cover', href: '/brand-kit/04-social/podcast-cover.svg', bg: 'bg-black' },
  { label: 'X Post Card', href: '/brand-kit/04-social/x-post-card.svg', bg: 'bg-black' },
  { label: 'Newsletter', href: '/brand-kit/04-social/newsletter-header.svg', bg: 'bg-parchment' },
  { label: 'Deck Title', href: '/brand-kit/09-templates/presentation-title.svg', bg: 'bg-black' },
  { label: 'Source Stamp', href: '/brand-kit/09-templates/source-stamp.svg', bg: 'bg-parchment' },
  { label: 'Do / Don\'t', href: '/brand-kit/07-docs/brand-do-dont.svg', bg: 'bg-parchment' },
]

const TOKEN_SWATCHES = [
  { name: 'Parchment', hex: '#FAF8F5', text: 'text-ink' },
  { name: 'Ink', hex: '#1A1A1A', text: 'text-white' },
  { name: 'Crimson', hex: '#8B1A1A', text: 'text-white' },
  { name: 'Gold', hex: '#B8860B', text: 'text-white' },
  { name: 'Obsidian', hex: '#0A0A0A', text: 'text-white' },
] as const

export default function AdminBrandKit() {
  const [manifest, setManifest] = useState<BrandManifest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [zipOk, setZipOk] = useState<boolean | null>(null)
  const [zipBytes, setZipBytes] = useState<number | null>(null)
  const [copied, setCopied] = useState('')
  const [zipSha, setZipSha] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/brand-kit/manifest.json', { cache: 'no-store' })
        if (!res.ok) throw new Error(`manifest ${res.status}`)
        const data = (await res.json()) as BrandManifest & { zipSha256?: string; zipBytes?: number }
        if (!cancelled) {
          setManifest(data)
          if (data.zipSha256) setZipSha(data.zipSha256)
          if (typeof data.zipBytes === 'number') setZipBytes(data.zipBytes)
        }

        const zipRes = await fetch(data.zipPath, { method: 'HEAD', cache: 'no-store' })
        if (!cancelled) {
          setZipOk(zipRes.ok)
          const len = zipRes.headers.get('content-length')
          if (len) setZipBytes(Number(len))
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load brand kit')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const zipHref = manifest?.zipPath || '/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.zip'
  const zipLabel =
    zipBytes != null
      ? `Download Ultimate Brand Kit (.zip · ${(zipBytes / 1024).toFixed(0)} KB)`
      : 'Download Ultimate Brand Kit (.zip)'

  const copyText = (text: string, label: string) => {
    void navigator.clipboard.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(''), 1800)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-white">Brand Kit</h1>
          <p className="mt-1 font-sans text-xs text-white/30">
            Veritas Worldwide Press · Ultimate Brand Kit {manifest ? `v${manifest.version}` : ''}
          </p>
          {manifest?.generatedAt && (
            <p className="mt-1 font-mono text-[10px] text-white/20">
              Generated {new Date(manifest.generatedAt).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={zipHref}
            download="Veritas-Worldwide-Ultimate-Brand-Kit.zip"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded bg-crimson px-5 py-2.5 font-sans text-xs font-semibold tracking-wide text-white transition-colors hover:bg-crimson-light"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {zipLabel}
          </a>
          <a
            href="/brand-kit/exports/Veritas-Worldwide-Ultimate-Brand-Kit.sha256"
            download
            className="inline-flex min-h-[44px] items-center font-mono text-[10px] text-white/35 hover:text-crimson"
          >
            Download SHA-256 checksum →
          </a>
        </div>
      </div>

      {/* Health */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">ZIP Status</p>
          <p
            className={`mt-1 font-serif text-2xl font-bold ${
              zipOk === true ? 'text-emerald-400' : zipOk === false ? 'text-red-400' : 'text-white/40'
            }`}
          >
            {zipOk === true ? 'Ready' : zipOk === false ? 'Missing' : 'Checking…'}
          </p>
          {zipSha && (
            <button
              type="button"
              onClick={() => copyText(zipSha, 'SHA-256')}
              className="mt-2 break-all text-left font-mono text-[9px] text-white/25 hover:text-crimson"
              title="Copy SHA-256"
            >
              sha256:{zipSha.slice(0, 16)}…
            </button>
          )}
        </div>
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">Sections</p>
          <p className="mt-1 font-serif text-2xl font-bold text-white">{manifest?.sections.length ?? '—'}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/5 p-4">
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">Admin Access</p>
          <p className="mt-1 font-serif text-lg font-bold text-white">brollins565@gmail.com</p>
          <p className="font-sans text-[10px] text-white/25">+ rights@veritasworldwide.com</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-sans text-xs text-red-300">
          Brand kit load error: {error}
        </div>
      )}

      {/* Previews */}
      <section>
        <h2 className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
          Live Asset Previews
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PREVIEW_ASSETS.map(asset => (
            <a
              key={asset.href}
              href={asset.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-lg border border-white/5 bg-white/[0.03] transition-colors hover:border-crimson/40"
            >
              <div className={`flex h-28 items-center justify-center p-3 ${asset.bg}`}>
                <img
                  src={asset.href}
                  alt={asset.label}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-white/5 px-3 py-2">
                <p className="font-sans text-[11px] text-white/70 group-hover:text-crimson">{asset.label}</p>
                <p className="truncate font-mono text-[9px] text-white/25">{asset.href}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      {manifest && (
        <section>
          <h2 className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
            Kit Taxonomy
          </h2>
          <div className="divide-y divide-white/5 rounded-lg border border-white/5 bg-white/5">
            {manifest.sections.map(section => (
              <div key={section.id} className="flex items-start justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-sans text-sm text-white/80">{section.title}</p>
                  <p className="mt-0.5 font-sans text-[11px] text-white/35">{section.description}</p>
                  <p className="mt-1 font-mono text-[10px] text-white/20">/brand-kit/{section.id}/</p>
                </div>
                <a
                  href={`/brand-kit/${section.id}/`}
                  className="inline-flex min-h-[44px] shrink-0 items-center font-sans text-[10px] text-crimson hover:text-crimson-light"
                >
                  Browse →
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Individual downloads */}
      {manifest && (
        <section>
          <h2 className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
            Individual Downloads
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {manifest.downloads.map(dl => (
              <a
                key={dl.href}
                href={dl.href}
                download
                className="inline-flex min-h-[44px] items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 font-sans text-xs text-white/70 transition-colors hover:border-crimson/30 hover:text-white"
              >
                <span>{dl.label}</span>
                <span className="font-mono text-[9px] text-white/25">↓</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tokens snapshot */}
      <section className="rounded-lg border border-white/5 bg-white/5 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-white/50">
            Brand Tokens (Law)
          </h2>
          {copied && (
            <span className="font-sans text-[10px] text-emerald-400" role="status">
              Copied {copied}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TOKEN_SWATCHES.map(c => (
            <button
              key={c.hex}
              type="button"
              onClick={() => copyText(c.hex, c.name)}
              className="overflow-hidden rounded-md border border-white/10 text-left transition-colors hover:border-crimson/50"
              title={`Copy ${c.hex}`}
            >
              <div className={`flex h-16 items-end p-2 ${c.text}`} style={{ backgroundColor: c.hex }}>
                <span className="font-mono text-[10px] opacity-90">{c.hex}</span>
              </div>
              <p className="bg-black/40 px-2 py-1.5 font-sans text-[10px] text-white/60">
                {c.name} · tap to copy
              </p>
            </button>
          ))}
        </div>
        <p className="mt-4 font-sans text-[11px] leading-relaxed text-white/35">
          Type: Playfair Display (display) · Source Serif 4 (body) · Inter (UI) · JetBrains Mono (data).
          WCAG 2.2 AA required. Vectors are source of truth; AI rasters in 08-ai-generated are direction
          references only.
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a
            href="/brand-kit/07-docs/BRAND-GUIDE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-crimson hover:text-crimson-light"
          >
            Brand guide →
          </a>
          <a
            href="/brand-kit/07-docs/USAGE-LEGAL.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Usage & legal →
          </a>
          <a
            href="/brand-kit/07-docs/CRISIS-MEDIA.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Crisis media templates →
          </a>
          <a
            href="/brand-kit/09-templates/email-signature.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Email signature →
          </a>
          <a
            href="/brand-kit/09-templates/media-kit.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Media kit page →
          </a>
          <a
            href="/brand-kit/07-docs/HASHTAGS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Hashtags →
          </a>
          <a
            href="/brand-kit/06-tokens/tokens.css"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            tokens.css →
          </a>
          <a
            href="/admin/social-hub"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Social Hub →
          </a>
          <a
            href="/media-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Public /media-kit →
          </a>
          <a
            href="/brand-kit/07-docs/BRAND-VOICE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Brand voice →
          </a>
          <a
            href="/brand-kit/07-docs/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Changelog →
          </a>
          <a
            href="/brand-kit/07-docs/brand-do-dont.svg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-sans text-xs text-white/50 hover:text-crimson"
          >
            Logo do/don&apos;t →
          </a>
        </div>
      </section>

      {/* Platform matrix */}
      <section className="rounded-lg border border-white/5 bg-white/5 p-5">
        <h2 className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
          Platform upload map
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left font-sans text-[11px]">
            <thead>
              <tr className="border-b border-white/10 text-white/40">
                <th className="px-2 py-2 font-medium">Platform</th>
                <th className="px-2 py-2 font-medium">Profile / logo</th>
                <th className="px-2 py-2 font-medium">Banner</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              {[
                ['X', '/brand-kit/04-social/social-profile-400.png', '/brand-kit/04-social/social-banner-x.svg'],
                ['Instagram', '/brand-kit/04-social/social-profile-400.png', '/brand-kit/04-social/story-1080x1920.svg'],
                ['LinkedIn', '/brand-kit/01-logos/logo-mark-512.png', '/brand-kit/04-social/social-banner-linkedin.svg'],
                ['Facebook', '/brand-kit/04-social/social-profile-400.png', '/brand-kit/04-social/social-banner-facebook.svg'],
                ['YouTube', '/brand-kit/02-icons/app-icon-512.png', '/brand-kit/04-social/social-banner-youtube.svg'],
                ['Podcast', '/brand-kit/04-social/podcast-cover.png', '/brand-kit/04-social/podcast-cover.svg'],
                ['Newsletter', '/brand-kit/01-logos/logo-mark-512.png', '/brand-kit/04-social/newsletter-header.svg'],
              ].map(row => (
                <tr key={row[0]} className="border-b border-white/5">
                  <td className="px-2 py-2 font-semibold text-white/90">{row[0]}</td>
                  <td className="px-2 py-2">
                    <a href={row[1]} className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">
                      {row[1].split('/').pop()}
                    </a>
                  </td>
                  <td className="px-2 py-2">
                    <a href={row[2]} className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">
                      {row[2].split('/').pop()}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI references */}
      <section>
        <h2 className="mb-3 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
          Grok Imagine Direction (Reference)
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { src: '/brand-kit/08-ai-generated/seal-mark-parchment.jpg', label: 'Seal Mark' },
            { src: '/brand-kit/08-ai-generated/wordmark-lockup.jpg', label: 'Wordmark Lockup' },
            { src: '/brand-kit/08-ai-generated/og-the-record.jpg', label: 'OG / Social' },
            { src: '/brand-kit/08-ai-generated/avatar-crimson.jpg', label: 'Avatar' },
          ].map(img => (
            <a
              key={img.src}
              href={img.src}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-lg border border-white/5 bg-white/[0.03] hover:border-crimson/40"
            >
              <img src={img.src} alt={img.label} className="aspect-square w-full object-cover" loading="lazy" />
              <p className="px-3 py-2 font-sans text-[11px] text-white/60">{img.label}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
