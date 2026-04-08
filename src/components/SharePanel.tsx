import { useState } from 'react'
import { trackShare } from '../lib/ga4'

interface SharePanelProps {
  url?: string
  title: string
  description?: string
  /** Compact = inline buttons only. Full = editorial CTA + buttons */
  variant?: 'compact' | 'full'
  /** Chapter or page ID for analytics */
  contentId?: string
}

const SITE_URL = 'https://veritasworldwide.com'

export default function SharePanel({ url, title, description, variant = 'full', contentId }: SharePanelProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : SITE_URL)
  const shareText = description || title

  const handleShare = (platform: string, shareLink: string) => {
    if (contentId) trackShare(platform, contentId)
    window.open(shareLink, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    if (contentId) trackShare('copy_link', contentId)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl })
        if (contentId) trackShare('native', contentId)
      } catch { /* user cancelled */ }
    }
  }

  const platforms = [
    {
      name: 'X',
      color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]',
      action: () => handleShare('twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&via=VeritasWorldwide`),
      icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
    },
    {
      name: 'Facebook',
      color: 'hover:bg-[#1877F2]/10 hover:text-[#1877F2]',
      action: () => handleShare('facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`),
      icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>,
    },
    {
      name: 'WhatsApp',
      color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
      action: () => handleShare('whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`),
      icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>,
    },
    {
      name: 'Telegram',
      color: 'hover:bg-[#0088CC]/10 hover:text-[#0088CC]',
      action: () => handleShare('telegram', `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`),
      icon: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>,
    },
    {
      name: 'Reddit',
      color: 'hover:bg-[#FF4500]/10 hover:text-[#FF4500]',
      action: () => handleShare('reddit', `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`),
      icon: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z"/>,
    },
    {
      name: 'Email',
      color: 'hover:bg-ink/10 hover:text-ink',
      action: () => handleShare('email', `mailto:?subject=${encodeURIComponent(title + ' — Veritas Worldwide')}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${shareUrl}`)}`),
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
      stroke: true,
    },
  ]

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {platforms.map(p => (
          <button
            key={p.name}
            onClick={p.action}
            className={`p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm text-ink-muted transition-colors ${p.color}`}
            aria-label={`Share on ${p.name}`}
            title={`Share on ${p.name}`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={p.stroke ? 'none' : 'currentColor'} stroke={p.stroke ? 'currentColor' : 'none'}>
              {p.icon}
            </svg>
          </button>
        ))}
        <button
          onClick={handleCopy}
          className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm text-ink-muted hover:bg-ink/10 hover:text-ink transition-colors"
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          )}
        </button>
        {'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm text-ink-muted hover:bg-crimson/10 hover:text-crimson transition-colors"
            aria-label="Share"
            title="Share"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        )}
      </div>
    )
  }

  return (
    <section className="border-t border-b border-border py-8 my-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-3">
          Share the Record
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-3">
          An informed public is the strongest safeguard against the abuse of power.
        </h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-6 max-w-lg mx-auto">
          Every time you share a primary source document, you make it harder for the powerful to rewrite history. The truth does not need your belief — it needs your voice.
        </p>
        <div className="flex items-center justify-center gap-1 flex-wrap mb-4">
          {platforms.map(p => (
            <button
              key={p.name}
              onClick={p.action}
              className={`inline-flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-sm text-ink-muted transition-colors ${p.color}`}
              aria-label={`Share on ${p.name}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={p.stroke ? 'none' : 'currentColor'} stroke={p.stroke ? 'currentColor' : 'none'}>
                {p.icon}
              </svg>
              <span className="font-sans text-xs tracking-wide">{p.name}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-sm font-sans text-xs text-ink-muted hover:border-crimson hover:text-crimson transition-colors"
          >
            {copied ? 'Link Copied' : 'Copy Link'}
          </button>
          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-crimson text-white rounded-sm font-sans text-xs font-semibold hover:bg-crimson-dark transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
