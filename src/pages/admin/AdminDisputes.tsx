import { useState, useEffect } from 'react'
import { getAllDisputes } from '../../lib/adminAuth'

interface Dispute {
  name: string
  email: string
  claim: string
  evidence: string
  sourceUrl: string
  pageId: string
  pageTitle: string
  submittedAt: string
  status?: 'pending' | 'reviewed' | 'dismissed'
}

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState<Dispute[]>([])
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)

  useEffect(() => {
    const data = getAllDisputes().map((d: any) => ({ ...d, status: d.status || 'pending' }))
    setDisputes(data)
  }, [])

  const updateStatus = (index: number, status: 'reviewed' | 'dismissed') => {
    const updated = [...disputes]
    updated[index] = { ...updated[index], status }
    setDisputes(updated)
    localStorage.setItem('veritas_disputes', JSON.stringify(updated))
  }

  const pendingCount = disputes.filter(d => d.status === 'pending').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-white">Factual Disputes</h1>
        <p className="font-sans text-xs text-white/30 mt-1">
          {disputes.length} total · {pendingCount} pending review
        </p>
      </div>

      {disputes.length === 0 ? (
        <div className="bg-white/5 border border-white/5 rounded-lg p-12 text-center">
          <svg className="w-10 h-10 mx-auto text-white/10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-sans text-sm text-white/30">No disputes have been filed</p>
          <p className="font-sans text-xs text-white/15 mt-1">Disputes submitted through the site will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {disputes.map((dispute, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex px-2 py-0.5 rounded font-sans text-[9px] font-bold tracking-wider uppercase ${
                        dispute.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        dispute.status === 'reviewed' ? 'bg-green-500/10 text-green-400' :
                        'bg-white/5 text-white/30'
                      }`}>
                        {dispute.status}
                      </span>
                      <span className="font-sans text-[10px] text-white/20">{dispute.pageTitle}</span>
                    </div>
                    <p className="font-sans text-sm text-white/80">{dispute.name} ({dispute.email})</p>
                    <div className="mt-2 px-3 py-2 bg-white/[0.03] rounded border-l-2 border-crimson/30">
                      <p className="font-sans text-xs text-white/50 italic">"{dispute.claim}"</p>
                    </div>
                    <p className="font-sans text-xs text-white/40 mt-2">{dispute.evidence}</p>
                    {dispute.sourceUrl && (
                      <a href={dispute.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-crimson hover:text-crimson-light mt-1 inline-block">
                        {dispute.sourceUrl}
                      </a>
                    )}
                  </div>
                  <span className="font-sans text-[10px] text-white/15 flex-shrink-0">
                    {dispute.submittedAt ? new Date(dispute.submittedAt).toLocaleDateString() : '—'}
                  </span>
                </div>
              </div>
              {dispute.status === 'pending' && (
                <div className="px-5 py-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(i, 'reviewed')}
                    className="px-3 py-1.5 bg-green-500/10 rounded font-sans text-xs text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    Mark Reviewed
                  </button>
                  <button
                    onClick={() => updateStatus(i, 'dismissed')}
                    className="px-3 py-1.5 bg-white/5 rounded font-sans text-xs text-white/30 hover:text-white/50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
