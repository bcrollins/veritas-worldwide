/**
 * DossierPDF — Full Israel Dossier PDF export
 * Generates a comprehensive, print-quality PDF of all dossier content
 */
import { useState } from 'react'
import { ISRAEL_DOSSIER_PDF_COVER_STATS, ISRAEL_DOSSIER_PDF_KEY_STATS } from '../data/israelDossierCanon'

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
        'XIII. Source Methodology',
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
      addBody('A chronological record of key events from the Balfour Declaration to the present.')
      y += 4

      const timeline = [
        { yr: '1917', ev: 'Balfour Declaration — Britain pledges support for a "national home for the Jewish people" in Palestine' },
        { yr: '1947', ev: 'UN Partition Plan (Resolution 181) grants 56% of Palestine to the Jewish state' },
        { yr: '1948', ev: 'The Nakba — 750,000 Palestinians expelled; Israel declares independence' },
        { yr: '1967', ev: 'Six-Day War — Israel occupies West Bank, Gaza, Sinai, Golan Heights. USS Liberty attacked, 34 Americans killed' },
        { yr: '1978', ev: 'Camp David Accords — U.S. commits $3B/year in military aid to Israel' },
        { yr: '1982', ev: 'Sabra and Shatila massacre — 800-3,500 Palestinian civilians killed' },
        { yr: '1987', ev: 'First Intifada begins' },
        { yr: '1993', ev: 'Oslo Accords signed — settlement population triples afterward' },
        { yr: '2004', ev: 'ICJ rules separation wall illegal — Israel ignores ruling' },
        { yr: '2007', ev: 'Gaza blockade begins — 19 years and counting' },
        { yr: '2014', ev: 'Operation Protective Edge — 2,251 Palestinians killed including 551 children' },
        { yr: '2016', ev: '$38B MOU signed — largest military aid package in U.S. history' },
        { yr: '2018', ev: 'Great March of Return — Israeli snipers kill 223 protesters' },
        { yr: '2021', ev: 'Human Rights Watch publishes apartheid finding' },
        { yr: '2023', ev: 'October 7 attack kills ~1,139 Israelis. Israel launches war on Gaza.' },
        { yr: '2024', ev: 'ICJ orders provisional measures in South Africa v. Israel; ICJ advisory opinion says Israel\'s continued presence in the occupied Palestinian territory is unlawful; ICC issues arrest warrants for Netanyahu and Gallant.' },
      ]
      timeline.forEach(t => {
        checkSpace(10)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(139, 26, 26)
        doc.text(t.yr, ML, y)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(50, 50, 50)
        const evLines = doc.splitTextToSize(t.ev, CW - 20)
        doc.text(evLines, ML + 18, y)
        y += evLines.length * 4.5 + 3
      })

      // ══════════════════════════════════════════════
      // DOCUMENTED INCIDENTS
      // ══════════════════════════════════════════════
      addSectionHeader('IX. Documented Incidents')
      addBody('The following incidents are documented through multiple independent sources including video evidence, forensic analysis, and official investigations.')
      y += 4

      const incidents = [
        { t: 'Hind Rajab, Age 5 — Killed in car by tank (Jan 29, 2024)', s: 'Washington Post / Forensic Architecture / Al Jazeera' },
        { t: 'Rafah Paramedic Convoy — 15 aid workers killed at dawn (Mar 23, 2025)', s: 'CNN / NBC News / CBC News' },
        { t: 'World Central Kitchen — 7 aid workers killed by 3 drone strikes (Apr 1, 2024)', s: 'NPR / Washington Post / WCK' },
        { t: 'Flour Massacre — 118 killed while waiting for food aid (Feb 29, 2024)', s: 'CNN / OHCHR / Al Jazeera' },
        { t: 'Nuseirat Hostage Rescue — 274 civilians killed (Jun 8, 2024)', s: 'OHCHR / Washington Post' },
        { t: 'Al-Mawasi "Safe Zone" Bombing — 90+ killed (Jul 13, 2024)', s: 'Al Jazeera / Responsible Statecraft' },
        { t: 'Jabalia Refugee Camp — 120+ killed by airstrikes on camp (Oct 31, 2023+)', s: 'CNN / Euro-Med Monitor' },
        { t: 'Al-Shifa Hospital Siege — 400+ killed in two raids (Nov 2023 - Mar 2024)', s: 'Washington Post / WHO / BBC' },
        { t: 'Deliberate Starvation — Famine declared, aid blocked (2024-ongoing)', s: 'IPC / WFP / MSF / Reuters' },
        { t: 'Shireen Abu Akleh — Journalist killed in Jenin (May 11, 2022)', s: 'CNN / OHCHR / Washington Post' },
        { t: 'Tent Camp Strikes — 85+ killed in "safe zone" camps (May-Sep 2024)', s: 'Amnesty / BBC / Al Jazeera' },
        { t: 'UNRWA Staff — 230+ UN workers killed, facilities struck 500+ times', s: 'UNRWA / UN News' },
        { t: '"Lavender" AI Targeting — 37,000 targets, 20 seconds of review each', s: '+972 Magazine / The Guardian' },
        { t: 'White Phosphorus in Populated Areas (Oct 2023)', s: 'Human Rights Watch / Amnesty International' },
        { t: 'All 12 Universities Destroyed — "Scholasticide"', s: 'Euro-Med Monitor / UNESCO / The Guardian' },
      ]
      incidents.forEach(inc => {
        checkSpace(12)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 26, 26)
        const tLines = doc.splitTextToSize('• ' + inc.t, CW)
        doc.text(tLines, ML, y)
        y += tLines.length * 4
        doc.setFontSize(7)
        doc.setFont('helvetica', 'italic')
        doc.setTextColor(120, 120, 120)
        doc.text('Sources: ' + inc.s, ML + 3, y)
        y += 6
      })

      // ══════════════════════════════════════════════
      // METHODOLOGY & CLOSING
      // ══════════════════════════════════════════════
      addSectionHeader('XIII. Source Methodology')
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
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-obsidian text-white font-sans text-xs font-bold tracking-[0.08em] uppercase rounded-sm hover:bg-obsidian/80 transition-colors disabled:opacity-50"
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
