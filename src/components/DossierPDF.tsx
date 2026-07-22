/**
 * DossierPDF — Full Israel Dossier PDF export
 * Generates a comprehensive, print-quality PDF of all dossier content
 */
import { useState } from 'react'
import {
  ISRAEL_DOSSIER_COURSE_PATH,
  ISRAEL_DOSSIER_PDF_COVER_STATS,
  ISRAEL_DOSSIER_PDF_KEY_STATS,
  ISRAEL_DOSSIER_CORE_INCIDENTS,
} from '../data/israelDossierCanon'
import { HISTORICAL_TIMELINE, EXPANDED_INCIDENTS } from '../data/israelDossierExpanded'

export default function DossierPDF() {
  const [generating, setGenerating] = useState(false)

  async function handleDownload() {
    setGenerating(true)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const W = 210
      const H = 297
      const ML = 25
      const MR = 25
      const MT = 30
      const MB = 25
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
          doc.line(ML, MT - 8, W - MR, MT - 8)
          doc.setFontSize(7)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(140, 140, 140)
          doc.text('VERITAS WORLDWIDE PRESS', ML, MT - 11)
          doc.text('THE ISRAEL DOSSIER', W - MR, MT - 11, { align: 'right' })
        }
      }

      function checkSpace(needed: number) {
        if (y + needed > H - MB) newPage()
      }

      function addTitle(text: string, size: number, color: [number, number, number] = [26, 26, 26]) {
        checkSpace(size * 0.8)
        doc.setFontSize(size)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...color)
        const lines = doc.splitTextToSize(text, CW)
        doc.text(lines, ML, y)
        y += lines.length * (size * 0.45) + 4
      }

      function addBody(text: string, size = 10) {
        doc.setFontSize(size)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(50, 50, 50)
        const lines = doc.splitTextToSize(text, CW)
        for (const line of lines) {
          checkSpace(size * 0.5)
          doc.text(line, ML, y)
          y += size * 0.45
        }
        y += 3
      }

      function addSource(text: string) {
        checkSpace(6)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(120, 120, 120)
        const lines = doc.splitTextToSize('Source: ' + text, CW)
        doc.text(lines, ML, y)
        y += lines.length * 3.5 + 2
      }

      function addStat(value: string, label: string, source: string) {
        checkSpace(18)
        doc.setFontSize(22)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(139, 26, 26) // crimson
        doc.text(value, ML, y)
        y += 8
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(50, 50, 50)
        const lines = doc.splitTextToSize(label, CW)
        doc.text(lines, ML, y)
        y += lines.length * 4 + 1
        addSource(source)
        y += 4
      }

      function addRule() {
        checkSpace(6)
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(0.3)
        doc.line(ML, y, W - MR, y)
        y += 6
      }

      function addSectionHeader(text: string) {
        checkSpace(16)
        y += 4
        doc.setDrawColor(139, 26, 26)
        doc.setLineWidth(0.8)
        doc.line(ML, y, ML + 20, y)
        y += 6
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 26, 26)
        doc.text(text.toUpperCase(), ML, y)
        y += 10
      }

      // ══════════════════════════════════════════════
      // COVER PAGE
      // ══════════════════════════════════════════════
      doc.setFillColor(26, 26, 26)
      doc.rect(0, 0, W, H, 'F')

      // Crimson accent
      doc.setFillColor(139, 26, 26)
      doc.rect(0, 0, W, 5, 'F')
      doc.rect(0, H - 5, W, 5, 'F')

      // Branding
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('VERITAS WORLDWIDE PRESS', W / 2, 40, { align: 'center' })

      // Title
      doc.setFontSize(42)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('THE ISRAEL', W / 2, 110, { align: 'center' })
      doc.text('DOSSIER', W / 2, 130, { align: 'center' })

      // Subtitle
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(200, 200, 200)
      const subLines = doc.splitTextToSize(
        'A documented record of U.S.-Israel policy, military spending, humanitarian impact, and international law — compiled from government records, UN agencies, and verified investigative reporting.',
        CW - 20
      )
      doc.text(subLines, W / 2, 155, { align: 'center' })

      // Key numbers
      const nums = ISRAEL_DOSSIER_PDF_COVER_STATS
      let nx = ML + 5
      nums.forEach(n => {
        doc.setFontSize(18)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(139, 26, 26)
        doc.text(n.v, nx, 210)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(160, 160, 160)
        doc.text(n.l.toUpperCase(), nx, 218)
        nx += 40
      })

      // Date
      doc.setFontSize(9)
      doc.setTextColor(120, 120, 120)
      doc.text('April 2026 Edition', W / 2, 250, { align: 'center' })
      doc.text('veritasworldwide.com/israel-dossier', W / 2, 258, { align: 'center' })

      // ══════════════════════════════════════════════
      // TABLE OF CONTENTS
      // ══════════════════════════════════════════════
      newPage()
      addTitle('Table of Contents', 20)
      y += 4
      const toc = [
        'I. Overview & Key Statistics',
        'II. Historical Timeline (1917–Present)',
        'III. Follow the Money — U.S. Aid Traced',
        'IV. U.S. Aid & Military Spending',
        'V. Humanitarian Impact',
        'VI. International Law & Legal Record',
        'VII. AIPAC & Congressional Lobbying',
        'VIII. Domestic Policy & Anti-BDS Laws',
        'IX. Documented Incidents',
        'X. Infrastructure Destruction',
        'XI. Media & Information',
        'XII. Comparative Analysis',
        'XIII. Evidence Course Path',
        'XIV. Source Methodology',
      ]
      toc.forEach((item, i) => {
        doc.setFontSize(11)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(50, 50, 50)
        doc.text(item, ML, y)
        doc.setTextColor(140, 140, 140)
        doc.text(String(i + 3), W - MR, y, { align: 'right' })
        y += 7
      })

      // ══════════════════════════════════════════════
      // EDITORIAL NOTE
      // ══════════════════════════════════════════════
      newPage()
      addTitle('Editorial Note', 14)
      addBody('This document presents sourced public-record claims, reported figures, survey estimates, and analysis as separate evidence classes. Every figure is sourced to its original document. Where data is disputed or subject to methodological debate, this is noted. Reported casualty figures are attributed to the body that reported them; they are not presented as final adjudicated findings unless the cited source says so.')
      addBody('Sources include: Congressional Research Service, UN OCHA, International Court of Justice, Committee to Protect Journalists, B\'Tselem, OHCHR, The Lancet, SIPRI, UNICEF, WHO, Forensic Architecture, and established investigative journalism outlets.')
      addRule()

      // ══════════════════════════════════════════════
      // KEY STATISTICS
      // ══════════════════════════════════════════════
      addSectionHeader('I. Key Statistics')

      const keyStats = ISRAEL_DOSSIER_PDF_KEY_STATS
      keyStats.forEach(s => addStat(s.v, s.l, s.s))

      // ══════════════════════════════════════════════
      // HISTORICAL TIMELINE
      // ══════════════════════════════════════════════
      addSectionHeader('II. Historical Timeline')
      addBody(
        `A chronological record densified with documented civilian-targeting and war-crimes milestones from 1948 forward (${HISTORICAL_TIMELINE.length} entries). Every online entry links to a checkable source; this PDF lists titles and years for offline reading.`,
      )
      y += 4

      HISTORICAL_TIMELINE.forEach((event) => {
        checkSpace(10)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(139, 26, 26)
        doc.text(event.year, ML, y)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(50, 50, 50)
        const evLines = doc.splitTextToSize(`${event.title} — ${event.description}`, CW - 20)
        doc.text(evLines, ML + 18, y)
        y += evLines.length * 4.5 + 2
        doc.setFontSize(7)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(120, 120, 120)
        const srcLines = doc.splitTextToSize(`Source: ${event.source}`, CW - 20)
        doc.text(srcLines, ML + 18, y)
        y += srcLines.length * 3.5 + 3
      })

      // ══════════════════════════════════════════════
      // DOCUMENTED INCIDENTS
      // ══════════════════════════════════════════════
      addSectionHeader('IX. Documented Incidents')
      addBody(
        'High-evidence incident sample from 1948 through the present — core forensic cases plus historical densification. Not an exhaustive global ledger. Prefer the interactive dossier for full multimedia and source links.',
      )
      y += 4

      const seenKeys = new Set<string>()
      const incidents = [...ISRAEL_DOSSIER_CORE_INCIDENTS, ...EXPANDED_INCIDENTS]
        .filter((incident) => {
          const key = `${incident.date}|${incident.location}`.toLowerCase()
          if (seenKeys.has(key)) return false
          seenKeys.add(key)
          return true
        })
        .sort((a, b) => {
          const ya = Number((a.date.match(/(\d{4})/) || [])[1] || 9999)
          const yb = Number((b.date.match(/(\d{4})/) || [])[1] || 9999)
          return ya - yb
        })

      incidents.forEach((incident) => {
        checkSpace(14)
        const death = incident.casualties?.killed
        const flags = [
          incident.targetsChildren ? 'children among victims' : null,
          incident.targetsCivilians ? 'civilian targeting tagged' : null,
          incident.tier,
        ]
          .filter(Boolean)
          .join(' · ')
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 26, 26)
        const title = `• ${incident.title} (${incident.date}${death ? ` · ${death} killed` : ''})`
        const tLines = doc.splitTextToSize(title, CW)
        doc.text(tLines, ML, y)
        y += tLines.length * 4
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(80, 80, 80)
        const loc = doc.splitTextToSize(`${incident.location}${flags ? ` — ${flags}` : ''}`, CW - 3)
        doc.text(loc, ML + 3, y)
        y += loc.length * 3.4
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(120, 120, 120)
        const src = incident.sources
          .slice(0, 3)
          .map((s) => s.label)
          .join(' / ')
        const srcLines = doc.splitTextToSize(`Sources: ${src}`, CW - 3)
        doc.text(srcLines, ML + 3, y)
        y += srcLines.length * 3.4 + 4
      })

      // ══════════════════════════════════════════════
      // EVIDENCE COURSE PATH
      // ══════════════════════════════════════════════
      addSectionHeader('XIII. Evidence Course Path')
      addBody('The dossier now includes a six-module evidence course that teaches the reader how to rebuild the source file, audit the aid ledger, verify humanitarian figures, test incident evidence, read the legal record, and write a publishable briefing without overstating the record.')
      y += 4

      ISRAEL_DOSSIER_COURSE_PATH.forEach((module) => {
        checkSpace(18)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 26, 26)
        doc.text(`${module.kicker}: ${module.title}`, ML, y)
        y += 5
        addBody(module.objective, 8)
        doc.setFontSize(7)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(120, 120, 120)
        const sourceLine = doc.splitTextToSize(`Source anchors: ${module.sourceAnchors.map((source) => source.label).join('; ')}`, CW)
        doc.text(sourceLine, ML, y)
        y += sourceLine.length * 3.5 + 2
        addBody(`Work product: ${module.workProduct}`, 8)
        addBody(`Quality gate: ${module.qualityGate}`, 8)
        addBody(`Artifact: ${module.artifact.label} (${module.artifact.format})`, 8)
      })

      // ══════════════════════════════════════════════
      // METHODOLOGY & CLOSING
      // ══════════════════════════════════════════════
      addSectionHeader('XIV. Source Methodology')
      addBody('Every statistic in this document is sourced to one or more categories of primary evidence: official government publications (CRS, Israeli ministries), international body records (UN OCHA, ICJ, OHCHR, UNSC), verified independent organizations (CPJ, B\'Tselem, DCIP, Airwars), peer-reviewed research (The Lancet), and established investigative journalism with named sources and corroborating evidence.')
      addBody('Where figures are disputed or represent estimates with methodological uncertainty, this is noted. Readers are encouraged to verify all claims independently using the linked primary sources.')
      y += 10

      // Footer
      addRule()
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(139, 26, 26)
      doc.text('VERITAS WORLDWIDE PRESS', ML, y)
      y += 5
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('veritasworldwide.com/israel-dossier', ML, y)
      y += 4
      doc.text('Primary Sources · Public Record · Your Conclusions', ML, y)
      y += 8
      doc.setFontSize(7)
      doc.setTextColor(150, 150, 150)
      doc.text(`Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, ML, y)

      // Page numbers
      const totalPages = doc.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(180, 180, 180)
        doc.text(`${i} / ${totalPages}`, W / 2, H - 10, { align: 'center' })
      }

      doc.save('veritas-israel-dossier.pdf')
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 bg-obsidian text-white font-sans text-xs font-bold tracking-[0.08em] uppercase rounded-sm hover:bg-obsidian/80 transition-colors disabled:opacity-50"
    >
      {generating ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Complete Dossier (PDF)
        </>
      )}
    </button>
  )
}
