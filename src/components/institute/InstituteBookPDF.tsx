import { useState } from 'react'
import {
  buildInstituteCourse,
  buildInstituteGuide,
  getInstituteRelatedTopics,
  instituteResearchSources,
  instituteTopics,
} from '../../data/instituteCatalog'
import { trackDownload } from '../../lib/ga4'

export default function InstituteBookPDF() {
  const [generating, setGenerating] = useState(false)

  async function handleExport() {
    if (generating) return

    setGenerating(true)

    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

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

      function addPageHeader() {
        if (pageNumber === 1) return
        doc.setDrawColor(56, 72, 153)
        doc.setLineWidth(0.35)
        doc.line(marginLeft, marginTop - 10, pageWidth - marginRight, marginTop - 10)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(106, 123, 165)
        doc.text('VERITAS INSTITUTE', marginLeft, marginTop - 13)
        if (runningTitle) {
          doc.text(runningTitle.toUpperCase().slice(0, 80), pageWidth - marginRight, marginTop - 13, { align: 'right' })
        }
        doc.setTextColor(26, 26, 26)
      }

      function addPageFooter() {
        if (pageNumber === 1) return
        doc.setDrawColor(186, 194, 216)
        doc.setLineWidth(0.2)
        doc.line(marginLeft, pageHeight - 18, pageWidth - marginRight, pageHeight - 18)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(106, 123, 165)
        doc.text(String(pageNumber), pageWidth / 2, pageHeight - 12, { align: 'center' })
        doc.setTextColor(26, 26, 26)
      }

      function newPage() {
        addPageFooter()
        doc.addPage()
        pageNumber += 1
        y = marginTop
        addPageHeader()
      }

      function ensureSpace(needed: number) {
        if (y + needed > pageHeight - marginBottom) {
          newPage()
        }
      }

      function writeWrapped(text: string, fontSize: number, lineHeight: number, style: 'normal' | 'bold' | 'italic' = 'normal', indent = 0) {
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
        doc.setTextColor(56, 72, 153)
        doc.text(label.toUpperCase(), marginLeft, y)
        doc.setTextColor(26, 26, 26)
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

      doc.setFillColor(10, 18, 38)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')

      doc.setTextColor(103, 132, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.text('VERITAS WORLDWIDE PRESENTS', pageWidth / 2, 38, { align: 'center' })

      doc.setTextColor(244, 247, 255)
      doc.setFontSize(26)
      doc.text('The Veritas Institute', pageWidth / 2, 62, { align: 'center' })
      doc.setFontSize(22)
      doc.text('Book of Knowledge', pageWidth / 2, 76, { align: 'center' })

      doc.setTextColor(179, 190, 222)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(12)
      writeWrapped(
        'A field manual for work, resilience, self-reliance, and modern skill acquisition. Built from the Veritas Institute catalog of the top 100 practical skill-intent questions shaping 2026.',
        12,
        6.5
      )

      y = 118
      doc.setDrawColor(103, 132, 255)
      doc.setLineWidth(0.8)
      doc.line(48, y, 162, y)
      y += 16

      doc.setTextColor(216, 223, 244)
      doc.setFontSize(10)
      doc.text('100 COURSES  ·  100 GUIDES  ·  10 TRACKS  ·  PRINTABLE FIELD MANUAL', pageWidth / 2, y, { align: 'center' })
      doc.text('Skills, careers, household systems, preparedness, and evidence-based learning paths.', pageWidth / 2, y + 10, { align: 'center' })

      y = 238
      doc.setTextColor(162, 176, 214)
      doc.setFontSize(9)
      doc.text('Generated from veritasworldwide.com/institute', pageWidth / 2, y, { align: 'center' })
      doc.text('Same methodology. Different mission.', pageWidth / 2, y + 8, { align: 'center' })

      newPage()
      runningTitle = 'Methodology'

      writeLabel('Methodology')
      writeWrapped(
        'The Veritas Institute does not pretend there is one official global list of the “top 100 how-to searches.” This catalog is a 2026 demand synthesis built from public labor-market guidance, official preparedness agencies, extension resources, and cross-functional skill-demand reporting.',
        10,
        5.6
      )
      y += 3
      writeWrapped(
        'Career pathways are grounded in public institutions, licensing bodies, and the U.S. Bureau of Labor Statistics. Preparedness content stays restrained and safety-forward. AI, business, and income content rejects hype, fabricated certainty, and unrealistic earnings promises.',
        10,
        5.6
      )
      y += 6
      writeLabel('Primary demand signals')
      for (const source of instituteResearchSources) {
        writeWrapped(`${source.label}: ${source.note}`, 9, 5)
        y += 2
      }

      newPage()
      runningTitle = 'Table of Contents'
      writeLabel('Tracks')
      instituteTopics.forEach((topic, index) => {
        ensureSpace(6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.text(`${String(index + 1).padStart(2, '0')}. ${topic.skill} — ${topic.trackMeta.shortLabel}`, marginLeft, y)
        y += 5
      })

      for (const topic of instituteTopics) {
        const course = buildInstituteCourse(topic)
        const guide = buildInstituteGuide(topic)
        const related = getInstituteRelatedTopics(topic).map((item) => item.skill)

        newPage()
        runningTitle = topic.skill

        writeLabel(topic.trackMeta.label)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(18)
        ensureSpace(10)
        doc.text(topic.skill, marginLeft, y)
        y += 10

        writeWrapped(topic.summary, 11, 6)
        y += 3
        writeWrapped(`Why now: ${topic.whyNow}`, 9.5, 5.3)
        y += 2
        writeWrapped(`First action: ${topic.firstAction}`, 9.5, 5.3)
        y += 2
        writeWrapped(`Outcome: ${topic.outcome}`, 9.5, 5.3)
        y += 4

        writeLabel('Quick answer')
        writeWrapped(guide.quickAnswer, 9.5, 5.3)
        y += 3

        writeLabel('Course modules')
        course.modules.forEach((module, moduleIndex) => {
          ensureSpace(10)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9.5)
          doc.text(`${moduleIndex + 1}. ${module.title}`, marginLeft, y)
          y += 5
          writeBullets(module.lessons, 8.5, 4.6)
          y += 2
        })

        writeLabel('Action plan')
        guide.steps.forEach((step, stepIndex) => {
          ensureSpace(10)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          doc.text(`${stepIndex + 1}. ${step.title}`, marginLeft, y)
          y += 5
          writeWrapped(step.detail, 8.7, 4.8, 'normal', 2)
          y += 2
        })

        writeLabel('Common mistakes')
        writeBullets(course.commonMistakes, 8.5, 4.6)
        y += 2

        writeLabel('Tools and institutions')
        writeWrapped(`Tools: ${topic.tools.join(', ')}`, 8.5, 4.8)
        y += 2
        writeWrapped(`Institutions: ${topic.institutions.join(', ')}`, 8.5, 4.8)
        y += 2
        if (related.length) {
          writeWrapped(`Related skills: ${related.join(', ')}`, 8.5, 4.8)
          y += 2
        }

        writeLabel('Risk note')
        writeWrapped(topic.warning, 8.7, 4.9)
        y += 2

        writeLabel('Frequently asked')
        course.faq.forEach((faq) => {
          ensureSpace(9)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(8.8)
          doc.text(faq.question, marginLeft, y)
          y += 4.8
          writeWrapped(faq.answer, 8.2, 4.5)
          y += 2
        })
      }

      newPage()
      runningTitle = 'Research sources'
      writeLabel('Research sources')
      instituteResearchSources.forEach((source) => {
        writeWrapped(`${source.label}`, 10, 5.4, 'bold')
        writeWrapped(source.note, 9, 4.9)
        writeWrapped(source.url, 8, 4.4, 'italic')
        y += 3
      })

      addPageFooter()
      doc.save('veritas-institute-book-of-knowledge.pdf')
      trackDownload('veritas-institute-book-of-knowledge')
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
      {generating ? 'Generating PDF…' : 'Download PDF'}
    </button>
  )
}
