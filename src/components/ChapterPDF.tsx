/**
 * Per-chapter PDF export button.
 * Lazily loads jsPDF only when clicked — zero cost to initial bundle.
 */
import { useState } from 'react'
import type { Chapter, ContentBlock } from '../data/chapterTypes'
import { trackDownload } from '../lib/ga4'

interface Props {
  chapter: Chapter
}

export default function ChapterPDF({ chapter }: Props) {
  const [generating, setGenerating] = useState(false)

  async function handleExport() {
    if (generating) return
    setGenerating(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      const W = 210, H = 297, ML = 28, MR = 28, MT = 32, MB = 28
      const CW = W - ML - MR
      let y = MT
      let pageNum = 0

      function newPage() {
        doc.addPage()
        pageNum++
        y = MT
        // Running header
        if (pageNum > 0) {
          doc.setDrawColor(26, 26, 26)
          doc.setLineWidth(0.3)
          doc.line(ML, MT - 10, W - MR, MT - 10)
          doc.setFontSize(7)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(120, 120, 120)
          doc.text('VERITAS WORLDWIDE PRESS', ML, MT - 13)
          doc.text(chapter.title.toUpperCase().substring(0, 50), W - MR, MT - 13, { align: 'right' })
          doc.setTextColor(0, 0, 0)
        }
      }

      function checkSpace(needed: number) {
        if (y + needed > H - MB) newPage()
      }

      function wrapText(text: string, fontSize: number, lineHeight: number, font = 'helvetica', style = 'normal') {
        doc.setFontSize(fontSize)
        doc.setFont(font, style)
        const lines = doc.splitTextToSize(text, CW)
        for (const line of lines) {
          checkSpace(lineHeight)
          doc.text(line, ML, y)
          y += lineHeight
        }
      }

      // ── Cover section ──
      // Crimson rule
      doc.setDrawColor(139, 26, 26)
      doc.setLineWidth(0.8)
      doc.line(ML, y, W - MR, y)
      y += 8

      // Chapter number + date range
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(139, 26, 26)
      doc.text(`${chapter.number} · ${chapter.dateRange}`.toUpperCase(), ML, y)
      y += 10

      // Title
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(26, 26, 26)
      const titleLines = doc.splitTextToSize(chapter.title, CW)
      for (const line of titleLines) {
        checkSpace(10)
        doc.text(line, ML, y)
        y += 10
      }
      y += 4

      // Subtitle
      if (chapter.subtitle) {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(80, 80, 80)
        const subLines = doc.splitTextToSize(chapter.subtitle, CW)
        for (const line of subLines) {
          checkSpace(6)
          doc.text(line, ML, y)
          y += 6
        }
        y += 4
      }

      // Author + date
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.2)
      doc.line(ML, y, W - MR, y)
      y += 6
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text(`${chapter.author || 'B.R.'} · Published March 2026 · veritasworldwide.com`, ML, y)
      y += 12

      // ── Content blocks ──
      for (const block of chapter.content) {
        renderBlock(block)
      }

      function renderBlock(block: ContentBlock) {
        switch (block.type) {
          case 'text':
          case 'dropcap': {
            checkSpace(6)
            doc.setTextColor(26, 26, 26)
            wrapText(block.text || '', 10, 5.5)
            y += 4
            break
          }
          case 'heading': {
            checkSpace(14)
            y += 6
            doc.setFontSize(14)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(26, 26, 26)
            const hLines = doc.splitTextToSize(block.text || '', CW)
            for (const l of hLines) { doc.text(l, ML, y); y += 7 }
            y += 3
            break
          }
          case 'subheading': {
            checkSpace(10)
            y += 4
            doc.setFontSize(11)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(60, 60, 60)
            doc.text(block.text || '', ML, y)
            y += 8
            break
          }

          case 'quote': {
            checkSpace(14)
            y += 2
            const quoteStartY = y
            const qText = block.quote?.text || block.text || ''
            doc.setFontSize(10)
            doc.setFont('helvetica', 'italic')
            doc.setTextColor(80, 80, 80)
            const qLines = doc.splitTextToSize(`\u201C${qText}\u201D`, CW - 8)
            for (const l of qLines) {
              checkSpace(5.5)
              doc.text(l, ML + 6, y)
              y += 5.5
            }
            doc.setDrawColor(139, 26, 26)
            doc.setLineWidth(1.5)
            doc.line(ML + 1, quoteStartY - 2, ML + 1, y)
            const qAttr = block.quote?.attribution
            if (qAttr) {
              doc.setFontSize(8)
              doc.setFont('helvetica', 'normal')
              doc.setTextColor(120, 120, 120)
              doc.text(`\u2014 ${qAttr}`, ML + 6, y + 3)
              y += 6
            }
            y += 6
            break
          }
          case 'evidence': {
            checkSpace(16)
            const tier = (block.evidence?.tier || 'verified').toLowerCase()
            const colors: Record<string, [number, number, number]> = {
              verified: [22, 101, 52],
              circumstantial: [146, 64, 14],
              disputed: [153, 27, 27],
            }
            const bgColors: Record<string, [number, number, number]> = {
              verified: [240, 253, 244],
              circumstantial: [255, 251, 235],
              disputed: [254, 242, 242],
            }
            const c = colors[tier] || colors.verified
            const bg = bgColors[tier] || bgColors.verified

            // Evidence box background
            const boxText = block.evidence?.text || block.text || ''
            doc.setFontSize(9)
            doc.setFont('helvetica', 'normal')
            const eLines = doc.splitTextToSize(boxText, CW - 12)
            const boxH = eLines.length * 4.8 + 16

            checkSpace(boxH)
            doc.setFillColor(bg[0], bg[1], bg[2])
            doc.roundedRect(ML, y - 2, CW, boxH, 1, 1, 'F')

            // Tier label
            doc.setFontSize(7)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(c[0], c[1], c[2])
            doc.text(tier.toUpperCase(), ML + 4, y + 4)
            y += 10

            // Evidence text
            doc.setFontSize(9)
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(40, 40, 40)
            for (const l of eLines) {
              doc.text(l, ML + 4, y)
              y += 4.8
            }
            y += 8
            break
          }
          case 'stats': {
            const statsArr = block.stats || []
            for (const stat of statsArr) {
              checkSpace(14)
              doc.setFillColor(26, 26, 26)
              doc.roundedRect(ML, y - 2, CW, 14, 1, 1, 'F')
              doc.setFontSize(12)
              doc.setFont('helvetica', 'bold')
              doc.setTextColor(139, 26, 26)
              doc.text(stat.value || '', ML + 6, y + 6)
              doc.setFontSize(8)
              doc.setFont('helvetica', 'normal')
              doc.setTextColor(200, 200, 200)
              doc.text(stat.label || '', ML + 6, y + 10)
              y += 18
            }
            break
          }
          default:
            // timeline, table, etc. — render as text fallback
            if (block.text) {
              wrapText(block.text, 9, 5)
              y += 3
            }
        }
      }

      // ── Footer ──
      checkSpace(20)
      y += 8
      doc.setDrawColor(139, 26, 26)
      doc.setLineWidth(0.5)
      doc.line(ML, y, W - MR, y)
      y += 6
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('© 2026 Veritas Worldwide Press · veritasworldwide.com · Free & Open Access', ML, y)

      // Add page numbers to all pages
      const totalPages = doc.getNumberOfPages()
      for (let i = 2; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(120, 120, 120)
        doc.text(`${i} / ${totalPages}`, W / 2, H - 16, { align: 'center' })
      }

      const slug = chapter.id.replace(/[^a-z0-9]/gi, '-')
      doc.save(`veritas-${slug}.pdf`)
      trackDownload(chapter.id)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={generating}
      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] font-sans text-xs font-semibold tracking-[0.1em] uppercase border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors disabled:opacity-50 disabled:cursor-wait"
      aria-label={generating ? 'Generating PDF...' : `Download ${chapter.title} as PDF`}
    >
      {generating ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-crimson/20 border-t-crimson rounded-full animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </>
      )}
    </button>
  )
}
