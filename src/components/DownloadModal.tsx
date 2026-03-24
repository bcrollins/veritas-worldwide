import { useState } from 'react'
import { DONATE_URL } from '../lib/constants'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  fileUrl: string
}

export default function DownloadModal({ isOpen, onClose, fileName, fileUrl }: DownloadModalProps) {
  const [step, setStep] = useState<'cta' | 'downloading'>('cta')

  if (!isOpen) return null

  const handleDownload = () => {
    setStep('downloading')
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => { setStep('cta'); onClose() }, 3000)
  }

  const shareUrl = window.location.origin
  const shareText = 'The Record — A Documentary History of Power, Money, and the Institutions That Shaped the Modern World. Free & open access.'

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=${encodeURIComponent('Read This: The Record')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
    }
    window.open(urls[platform], '_blank')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied!')
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-parchment dark:bg-ink border border-border rounded-sm max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-faint hover:text-ink transition-colors text-xl">&times;</button>

        {step === 'cta' && (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-crimson/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-ink mb-2">Before You Go</h2>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                This book is free because we believe the public record belongs to everyone. If it informed you, consider supporting the work — or share it with someone who needs to see this.
              </p>
            </div>

            <p className="font-body text-xs text-ink-muted text-center italic leading-relaxed mb-6">
              Alone, we cannot change anything. But together — as a community of people who care about other people, regardless of nationality or color — we truly can change the world.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-wide rounded-sm hover:bg-crimson-dark transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Support This Work
              </a>
            </div>

            <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint text-center mb-3">Or share the truth</p>
            <div className="flex justify-center gap-2 mb-6">
              {(['twitter', 'facebook', 'whatsapp', 'telegram', 'email'] as const).map(p => (
                <button key={p} onClick={() => handleShare(p)} className="px-3 py-2 border border-border rounded-sm font-sans text-xs text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors capitalize">
                  {p === 'twitter' ? 'X' : p === 'email' ? 'Email' : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
              <button onClick={handleCopy} className="px-3 py-2 border border-border rounded-sm font-sans text-xs text-ink-muted hover:text-crimson hover:border-crimson/30 transition-colors">
                Copy
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-border text-ink font-sans text-sm font-semibold tracking-wide rounded-sm hover:border-crimson hover:text-crimson transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Just Download — I Can't Support Right Now
            </button>
            <p className="font-sans text-[0.55rem] text-ink-faint text-center mt-2">No judgment. The truth is free.</p>
          </>
        )}

        {step === 'downloading' && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">Downloading...</h3>
            <p className="font-body text-sm text-ink-muted">Thank you for reading The Record.</p>
          </div>
        )}
      </div>
    </div>
  )
}
