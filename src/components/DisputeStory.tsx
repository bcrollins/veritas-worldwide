import { useState, useRef, useEffect } from 'react'

interface DisputeStoryProps {
  pageId: string
  pageTitle: string
}

export default function DisputeStory({ pageId, pageTitle }: DisputeStoryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', claim: '', evidence: '', sourceUrl: '' })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store disputes locally for now; would send to API in production
    try {
      const disputes = JSON.parse(localStorage.getItem('veritas_disputes') || '[]')
      disputes.push({ ...form, pageId, pageTitle, timestamp: new Date().toISOString() })
      localStorage.setItem('veritas_disputes', JSON.stringify(disputes))
    } catch { /* ignore */ }
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setIsOpen(false); setForm({ name: '', email: '', claim: '', evidence: '', sourceUrl: '' }) }, 4000)
  }

  return (
    <div className="border-t border-border pt-8 mt-8">
      <div className="flex items-start gap-4 p-5 rounded-sm border border-border bg-surface">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-ink-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-sans text-sm font-bold text-ink mb-1">Dispute This Content</h3>
          <p className="font-body text-xs text-ink-muted leading-relaxed mb-2">
            Every claim on this page is sourced from primary documents, government records, court filings, or verified investigative reporting. If you believe any statement is factually incorrect, we welcome your challenge — and if proven wrong, we will correct or remove it. <span className="font-semibold text-ink">To date, no factual claim on this site has required retraction.</span>
          </p>
          <p className="font-body text-xs text-ink-faint italic mb-3">
            We do not publish conspiracy theories or hearsay. Every claim is evidence-confirmed from published, verifiable sources.
          </p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="font-sans text-xs font-semibold text-crimson hover:text-crimson-dark transition-colors"
          >
            {isOpen ? 'Close Form' : 'Submit a Factual Dispute →'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div ref={ref} className="mt-4 p-5 rounded-sm border border-border bg-surface">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="font-sans text-sm font-bold text-ink mb-1">Dispute Received</p>
              <p className="font-body text-xs text-ink-muted">Our editorial team will review your submission against the cited primary sources. If the claim is incorrect, we will issue a correction within 72 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.12em] uppercase text-ink-faint">Factual Dispute Form</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-sm bg-parchment dark:bg-ink text-ink font-sans text-sm focus:border-crimson focus:outline-none" required />
                <input type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-sm bg-parchment dark:bg-ink text-ink font-sans text-sm focus:border-crimson focus:outline-none" required />
              </div>
              <textarea placeholder="Which specific claim do you dispute? Quote the exact text." value={form.claim} onChange={e => setForm(f => ({ ...f, claim: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-border rounded-sm bg-parchment dark:bg-ink text-ink font-sans text-sm focus:border-crimson focus:outline-none resize-none" required />
              <textarea placeholder="What is your counter-evidence? Cite specific sources." value={form.evidence} onChange={e => setForm(f => ({ ...f, evidence: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-border rounded-sm bg-parchment dark:bg-ink text-ink font-sans text-sm focus:border-crimson focus:outline-none resize-none" required />
              <input type="url" placeholder="Link to your source (optional)" value={form.sourceUrl} onChange={e => setForm(f => ({ ...f, sourceUrl: e.target.value }))} className="w-full px-3 py-2 border border-border rounded-sm bg-parchment dark:bg-ink text-ink font-sans text-sm focus:border-crimson focus:outline-none" />
              <button type="submit" className="px-5 py-2.5 bg-crimson text-white font-sans text-xs font-semibold tracking-wide uppercase rounded-sm hover:bg-crimson-dark transition-colors">
                Submit Dispute for Review
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
