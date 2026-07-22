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
  { label: 'Wordmark', href: '/brand-kit/03-wordmarks/wordmark.svg', bg: 'bg-parchment' },
  { label: 'Social Profile', href: '/brand-kit/04-social/social-profile.svg', bg: 'bg-white/5' },
  { label: 'OG Card', href: '/brand-kit/05-og/og-image.svg', bg: 'bg-black' },
]

export default function AdminBrandKit() {
  const [manifest, setManifest] = useState<BrandManifest | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [zipOk, setZipOk] = useState<boolean | null>(null)
  const [zipBytes, setZipBytes] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/brand-kit/manifest.json', { cache: 'no-store' })
        if (!res.ok) throw new Error(`manifest ${res.status}`)
        const data = (await res.json()) as BrandManifest
        if (!cancelled) setManifest(data)

        const zipRes = await fetch(data.zipPath, { method: 'HEAD', cache: 'no-store' })
        if (!cancelled) {
          setZipOk(zipRes.ok)
          const len = zipRes.headers.get('content-length')
          setZipBytes(len ? Number(len) : null)
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
        <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-white/50">
          Brand Tokens (Law)
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { name: 'Parchment', hex: '#FAF8F5', text: 'text-ink' },
            { name: 'Ink', hex: '#1A1A1A', text: 'text-white' },
            { name: 'Crimson', hex: '#8B1A1A', text: 'text-white' },
            { name: 'Gold', hex: '#B8860B', text: 'text-white' },
            { name: 'Obsidian', hex: '#0A0A0A', text: 'text-white' },
          ].map(c => (
            <div key={c.hex} className="overflow-hidden rounded-md border border-white/10">
              <div className={`flex h-16 items-end p-2 ${c.text}`} style={{ backgroundColor: c.hex }}>
                <span className="font-mono text-[10px] opacity-90">{c.hex}</span>
              </div>
              <p className="bg-black/40 px-2 py-1.5 font-sans text-[10px] text-white/60">{c.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-sans text-[11px] leading-relaxed text-white/35">
          Type: Playfair Display (display) · Source Serif 4 (body) · Inter (UI) · JetBrains Mono (data).
          WCAG 2.2 AA required. Vectors are source of truth; AI rasters in 08-ai-generated are direction
          references only.
        </p>
        <a
          href="/brand-kit/07-docs/BRAND-GUIDE.md"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[44px] items-center font-sans text-xs text-crimson hover:text-crimson-light"
        >
          Open full brand guide →
        </a>
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
