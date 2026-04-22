import { useState } from 'react'
import { buildInstituteFieldManualPdf } from '../../lib/instituteFieldManualPdf'
import { trackDownload } from '../../lib/ga4'

export default function InstituteBookPDF() {
  const [generating, setGenerating] = useState(false)

  async function handleExport() {
    if (generating) return

    setGenerating(true)

    try {
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
      className="institute-button-primary"
    >
      {generating ? 'Generating PDF…' : 'Download Field Manual PDF'}
    </button>
  )
}
