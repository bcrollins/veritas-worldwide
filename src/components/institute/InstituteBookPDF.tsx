import { useState } from 'react'
import {
  buildInstituteBookSection,
  buildInstituteCourse,
  getInstitutePracticalTrackCounts,
  getInstituteTopicBySlug,
  getInstituteTopicsByTrack,
  instituteFieldManualEntries,
  instituteResearchSources,
} from '../../data/instituteCatalog'
import { trackDownload } from '../../lib/ga4'

type PdfColor = readonly [number, number, number]

const colors: Record<
  'parchment' | 'parchmentDark' | 'ink' | 'muted' | 'crimson' | 'crimsonDark' | 'gold' | 'border' | 'surface',
  PdfColor
> = {
  parchment: [250, 248, 245],
  parchmentDark: [242, 237, 231],
  ink: [26, 26, 26],
  muted: [102, 102, 102],
  crimson: [139, 26, 26],
  crimsonDark: [107, 16, 16],
  gold: [184, 134, 11],
  border: [229, 231, 235],
  surface: [255, 255, 255],
}

export default function InstituteBookPDF() {
  const [generating, setGenerating] = useState(false)

  async function handleExport() {
    if (generating) return

    setGenerating(true)

    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const tracks = getInstitutePracticalTrackCounts()

      const pageWidth = 210
      const pageHeight = 297
      const marginLeft = 22
      const marginRight = 22
      const marginTop = 26
      const marginBottom = 24
      const contentWidth = pageWidth - marginLeft - marginRight

      let y = marginTop
      let pageNumber = 1
      let runningTitle = ''

      function fillPage(color: PdfColor) {
        doc.setFillColor(...color)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')
      }

      function addPageHeader() {
        if (pageNumber === 1) return

        doc.setDrawColor(...colors.gold)
        doc.setLineWidth(0.35)
        doc.line(marginLeft, marginTop - 10, pageWidth - marginRight, marginTop - 10)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(...colors.crimson)
        doc.text('VERITAS INSTITUTE FIELD MANUAL', marginLeft, marginTop - 13)

        if (runningTitle) {
          doc.text(runningTitle.toUpperCase().slice(0, 80), pageWidth - marginRight, marginTop - 13, { align: 'right' })
        }

        doc.setTextColor(...colors.ink)
      }

      function addPageFooter() {
        if (pageNumber === 1) return

        doc.setDrawColor(...colors.border)
        doc.setLineWidth(0.2)
        doc.line(marginLeft, pageHeight - 18, pageWidth - marginRight, pageHeight - 18)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(...colors.muted)
        doc.text(String(pageNumber), pageWidth / 2, pageHeight - 12, { align: 'center' })
        doc.setTextColor(...colors.ink)
      }

      function newPage() {
        addPageFooter()
        doc.addPage()
        pageNumber += 1
        fillPage(colors.parchment)
        y = marginTop
        addPageHeader()
      }

      function ensureSpace(needed: number) {
        if (y + needed > pageHeight - marginBottom) {
          newPage()
        }
      }

      function writeWrapped(
        text: string,
        fontSize: number,
        lineHeight: number,
        style: 'normal' | 'bold' | 'italic' = 'normal',
        indent = 0
      ) {
        doc.setFont('helvetica', style)
        doc.setFontSize(fontSize)
        const lines = doc.splitTextToSize(text, contentWidth - indent)

        for (const line of lines) {
          ensureSpace(lineHeight)
          doc.text(line, marginLeft + indent, y)
          y += lineHeight
        }
      }

      function writeLabel(label: string) {
        ensureSpace(6)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(7)
        doc.setTextColor(...colors.crimson)
        doc.text(label.toUpperCase(), marginLeft, y)
        doc.setTextColor(...colors.ink)
        y += 5
      }

      function writeBullets(items: string[], fontSize = 9, lineHeight = 5) {
        for (const item of items) {
          const lines = doc.splitTextToSize(`• ${item}`, contentWidth - 4)
          for (const line of lines) {
            ensureSpace(lineHeight)
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(fontSize)
            doc.text(line, marginLeft + 2, y)
            y += lineHeight
          }
        }
      }

      fillPage(colors.parchment)
      doc.setFillColor(...colors.crimson)
      doc.rect(0, 0, pageWidth, 44, 'F')
      doc.setFillColor(...colors.parchmentDark)
      doc.rect(0, 232, pageWidth, 65, 'F')

      doc.setTextColor(...colors.parchment)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('VERITAS WORLDWIDE PRESS', pageWidth / 2, 24, { align: 'center' })
      doc.text('VERITAS INSTITUTE', pageWidth / 2, 34, { align: 'center' })

      doc.setTextColor(...colors.ink)
      doc.setFontSize(26)
      doc.text('Field Manual', pageWidth / 2, 68, { align: 'center' })
      doc.setFontSize(22)
      doc.text('and Practical Course Library', pageWidth / 2, 82, { align: 'center' })

      doc.setTextColor(...colors.muted)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      y = 104
      writeWrapped(
        'A print-ready Veritas reference for urgent household and roadside answers, followed by source-backed course content in skilled trades, repair, preparedness, food resilience, and healthcare-support work.',
        12,
        6.5
      )

      y = 140
      doc.setDrawColor(...colors.gold)
      doc.setLineWidth(0.8)
      doc.line(48, y, 162, y)
      y += 16

      doc.setTextColor(...colors.crimsonDark)
      doc.setFontSize(10)
      doc.text(
        `${instituteFieldManualEntries.length} FIELD ANSWERS  ·  ${tracks.length} PRACTICAL TRACKS  ·  PRINTABLE PDF`,
        pageWidth / 2,
        y,
        { align: 'center' }
      )
      doc.text('Urgent answers first. Deeper trade and repair course paths second.', pageWidth / 2, y + 10, { align: 'center' })

      y = 238
      doc.setTextColor(...colors.muted)
      doc.setFontSize(9)
      doc.text('Generated from veritasworldwide.com/institute', pageWidth / 2, y, { align: 'center' })
      doc.text('Same Veritas standards. Practical answers and practical skills.', pageWidth / 2, y + 8, { align: 'center' })

      runningTitle = 'Methodology'
      newPage()

      writeLabel('Methodology')
      writeWrapped(
        'The Veritas Institute field manual is built in two layers. Layer one handles the urgent question in front of the reader: bleeding, water, batteries, utilities, food safety, road trouble, and household failure. Layer two turns recurring needs into structured courses covering the practical trades, repair, preparedness, food resilience, and healthcare-support work.',
        10,
        5.6
      )
      y += 3
      writeWrapped(
        'Every entry is written to avoid life-hack mythology. High-stakes work stays conservative. Official guidance, licensing bodies, extension systems, manufacturer instructions, and public safety resources outrank shortcuts, folklore, and influencer confidence.',
        10,
        5.6
      )
      y += 6
      writeLabel('Primary source ladder')
      for (const source of instituteResearchSources) {
        writeWrapped(`${source.label}: ${source.note}`, 9, 5)
        y += 2
      }

      runningTitle = 'Table of Contents'
      newPage()
      writeLabel('Field Manual Entries')
      instituteFieldManualEntries.forEach((entry, index) => {
        ensureSpace(6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.text(`${String(index + 1).padStart(2, '0')}. ${entry.title} — ${entry.category}`, marginLeft, y)
        y += 5
      })

      y += 4
      writeLabel('Practical Course Tracks')
      tracks.forEach((track, index) => {
        ensureSpace(6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.text(`${String(index + 1).padStart(2, '0')}. ${track.label} — ${track.count} courses`, marginLeft, y)
        y += 5
      })

      for (const entry of instituteFieldManualEntries) {
        const relatedTopic = entry.relatedTopicSlug ? getInstituteTopicBySlug(entry.relatedTopicSlug) : undefined

        runningTitle = entry.title
        newPage()

        writeLabel(entry.category)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(18)
        ensureSpace(10)
        doc.text(entry.title, marginLeft, y)
        y += 10

        writeWrapped(entry.summary, 11, 6)
        y += 3
        writeWrapped(`When to use: ${entry.whenToUse}`, 9.5, 5.3)
        y += 2

        writeLabel('Quick answer')
        writeWrapped(entry.quickAnswer, 9.5, 5.3)
        y += 3

        writeLabel('Do now')
        writeBullets(entry.doNow, 8.6, 4.7)
        y += 2

        writeLabel('Avoid')
        writeBullets(entry.avoid, 8.6, 4.7)
        y += 2

        writeLabel('Source anchors')
        writeWrapped(entry.sourceAnchors.join(', '), 8.5, 4.8)
        y += 2

        if (relatedTopic) {
          writeLabel('Companion course path')
          writeWrapped(`${relatedTopic.skill} — ${relatedTopic.courseTitle}`, 8.7, 4.9)
          y += 2
        }
      }

      for (const track of tracks) {
        const topics = getInstituteTopicsByTrack(track.id)

        runningTitle = track.label
        newPage()

        writeLabel(track.shortLabel)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(18)
        ensureSpace(10)
        doc.text(track.label, marginLeft, y)
        y += 10

        writeWrapped(track.description, 10.5, 5.5)
        y += 2
        writeWrapped(`Demand signal: ${track.demandSignal}`, 9, 5)
        y += 2
        writeWrapped(`Method note: ${track.methodology}`, 9, 5)
        y += 6

        for (const topic of topics) {
          const course = buildInstituteCourse(topic)
          const section = buildInstituteBookSection(topic)

          ensureSpace(32)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(12)
          doc.text(topic.skill, marginLeft, y)
          y += 6

          writeWrapped(topic.summary, 8.8, 4.8)
          y += 2
          writeWrapped(`First action: ${topic.firstAction}`, 8.3, 4.5)
          y += 2
          writeWrapped(`Guide answer: ${section.quickAnswer}`, 8.3, 4.5)
          y += 2
          writeWrapped(`Course focus: ${course.modules.slice(0, 3).map((module) => module.title).join(' | ')}`, 8.3, 4.5)
          y += 2
          writeWrapped(
            `Official anchors: ${course.officialCheckpoints.slice(0, 2).map((item) => item.title).join(', ')}`,
            8.3,
            4.5
          )
          y += 2
          writeWrapped(`Risk note: ${topic.warning}`, 8.3, 4.5)
          y += 5
        }
      }

      runningTitle = 'Research Sources'
      newPage()
      writeLabel('Research sources')
      instituteResearchSources.forEach((source) => {
        writeWrapped(source.label, 10, 5.4, 'bold')
        writeWrapped(source.note, 9, 4.9)
        writeWrapped(source.url, 8, 4.4, 'italic')
        y += 3
      })

      addPageFooter()
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
