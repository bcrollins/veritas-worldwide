import { useState } from 'react'
import { buildInstituteFieldManualPdf } from '../../lib/instituteFieldManualPdf'
import { trackDownload } from '../../lib/ga4'

const STATIC_FIELD_MANUAL_PDF = '/veritas-institute-field-manual.pdf'

async function staticPdfIsAvailable(): Promise<boolean> {
  try {
    const response = await fetch(STATIC_FIELD_MANUAL_PDF, {
      method: 'HEAD',
      cache: 'no-store',
    })
    if (!response.ok) return false
    const contentType = (response.headers.get('content-type') || '').toLowerCase()
    // Accept application/pdf or octet-stream; reject HTML SPA fallbacks.
    if (contentType.includes('text/html')) return false
    return contentType.includes('pdf') || contentType.includes('octet-stream') || contentType === ''
  } catch {
    return false
  }
}

function triggerBrowserDownload(href: string, filename: string) {
  const anchor = document.createElement('a')
  anchor.href = href
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export default function InstituteBookPDF() {
  const [generating, setGenerating] = useState(false)

  async function handleExport() {
    if (generating) return

    setGenerating(true)

    try {
      if (await staticPdfIsAvailable()) {
        triggerBrowserDownload(STATIC_FIELD_MANUAL_PDF, 'veritas-institute-field-manual.pdf')
        trackDownload('veritas-institute-field-manual')
        return
      }

      // Client-side fallback when the static build artifact is absent (local dev).
      const doc = await buildInstituteFieldManualPdf()
      doc.save('veritas-institute-field-manual.pdf')
      trackDownload('veritas-institute-field-manual')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleExport()}
      disabled={generating}
      className="institute-button-primary min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2"
    >
      {generating ? 'Preparing PDF…' : 'Download Field Manual PDF'}
    </button>
  )
}
