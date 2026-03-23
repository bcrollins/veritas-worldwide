import { useState, useEffect, useRef } from 'react'
import { trackShare } from '../../lib/ga4'

interface Props {
  title: string
  description?: string
  contentId?: string
}

export default function FloatingShareBar({ title, description = '', contentId = '' }: Props) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setVisible(y > 400 && y > lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); trackShare('copy_link', contentId) } catch {}
  }

  const platforms = [
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=VeritasWorldwide`, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { name: 'Reddit', href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 13.38c.7 0 1.27.57 1.27 1.27 0 .7-.57 1.27-1.27 1.27-.7 0-1.27-.57-1.27-1.27 0-.7.57-1.27 1.27-1.27zm-10.02 0c.7 0 1.27.57 1.27 1.27 0 .7-.57 1.27-1.27 1.27-.7 0-1.27-.57-1.27-1.27 0-.7.57-1.27 1.27-1.27zm8.1 4.05c-.93.93-2.71 1-3.09 1s-2.16-.07-3.09-1a.427.427 0 01.6-.6c.58.58 1.82.79 2.49.79s1.91-.21 2.49-.79a.427.427 0 01.6.6z"/></svg> },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { name: 'Email', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\nRead more: ' + url)}`, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  ]

  return (
    <>
      {/* Desktop: left sidebar */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'}`}
        role="group" aria-label="Share this article"
      >
        {platforms.map(p => (
          <a key={p.name} href={p.href} target={p.name === 'Email' ? '_self' : '_blank'} rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full shadow-md bg-surface text-ink hover:scale-110 hover:shadow-lg transition-all duration-200"
            aria-label={`Share on ${p.name}`}
            onClick={() => trackShare(p.name.toLowerCase(), contentId)}>{p.icon}</a>
        ))}
        <button onClick={handleCopy}
          className={`w-11 h-11 flex items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-110 ${copied ? 'bg-crimson text-white' : 'bg-surface text-ink'}`}
          aria-label={copied ? 'Copied!' : 'Copy link'}>
          {copied
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>}
        </button>
      </div>

      {/* Mobile: bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border shadow-lg bg-surface transition-all duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        role="group" aria-label="Share this article"
      >
        <div className="flex items-center justify-around px-4 py-2">
          {platforms.slice(0, 4).map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-2 min-w-[44px] min-h-[44px] text-ink"
              aria-label={`Share on ${p.name}`}
              onClick={() => trackShare(p.name.toLowerCase(), contentId)}>
              {p.icon}
              <span className="font-sans text-[10px]">{p.name}</span>
            </a>
          ))}
          <button onClick={handleCopy}
            className={`flex flex-col items-center gap-1 p-2 min-w-[44px] min-h-[44px] ${copied ? 'text-crimson' : 'text-ink'}`}
            aria-label="Copy link">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            <span className="font-sans text-[10px]">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </>
  )
}
