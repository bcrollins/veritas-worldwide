import {
  buildInstituteBookSection,
  buildInstituteCourse,
  getInstitutePracticalTrackCounts,
  getInstituteTopicBySlug,
  getInstituteTopicsByTrack,
  instituteFieldManualEntries,
  instituteResearchSources,
} from '../data/instituteCatalog.ts'

type PdfColor = readonly [number, number, number]

const colors: Record<
  'parchment' | 'parchmentDark' | 'ink' | 'muted' | 'crimson' | 'crimsonDark' | 'gold' | 'border' | 'surface' | 'green' | 'amber',
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
  green: [22, 101, 52],
  amber: [146, 64, 14],
}

export async function buildInstituteFieldManualPdf() {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const tracks = getInstitutePracticalTrackCounts()
      const totalCoursePaths = tracks.reduce((sum, track) => sum + track.count, 0)
      const immediateEntryCount = instituteFieldManualEntries.filter((entry) => entry.urgency === 'Immediate').length
      const manualCategories = Array.from(new Set(instituteFieldManualEntries.map((entry) => entry.category)))

      doc.setProperties({
        title: 'Veritas Institute Field Manual',
        subject: 'Urgent household, roadside, weather, utility, and practical skill reference',
        author: 'Veritas Worldwide',
        keywords: 'field manual, preparedness, household repair, emergency water, first aid, practical skills',
        creator: 'Veritas Worldwide',
      })

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

      function writeKeyValue(label: string, value: string, fontSize = 8.7, lineHeight = 4.8) {
        ensureSpace(lineHeight * 2)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(fontSize)
        doc.setTextColor(...colors.crimson)
        doc.text(`${label}:`, marginLeft, y)
        const labelWidth = doc.getTextWidth(`${label}: `)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...colors.ink)
        const lines = doc.splitTextToSize(value, contentWidth - labelWidth)
        for (const [index, line] of lines.entries()) {
          ensureSpace(lineHeight)
          doc.text(line, marginLeft + (index === 0 ? labelWidth : 0), y)
          y += lineHeight
        }
      }

      function drawCallout(label: string, text: string, color: PdfColor = colors.crimson) {
        const lines = doc.splitTextToSize(text, contentWidth - 14)
        const height = 13 + lines.length * 4.7
        ensureSpace(height + 4)
        doc.setFillColor(...colors.surface)
        doc.setDrawColor(...color)
        doc.setLineWidth(0.45)
        doc.roundedRect(marginLeft, y, contentWidth, height, 2.5, 2.5, 'FD')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(7)
        doc.setTextColor(...color)
        doc.text(label.toUpperCase(), marginLeft + 6, y + 6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.8)
        doc.setTextColor(...colors.ink)
        doc.text(lines, marginLeft + 6, y + 12)
        y += height + 4
      }

      function drawFlow(labels: string[]) {
        const gap = 3
        const boxWidth = (contentWidth - gap * (labels.length - 1)) / labels.length
        ensureSpace(18)
        labels.forEach((label, index) => {
          const x = marginLeft + index * (boxWidth + gap)
          doc.setDrawColor(...colors.border)
          doc.setFillColor(...colors.parchmentDark)
          doc.roundedRect(x, y, boxWidth, 14, 2, 2, 'FD')
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(6.5)
          doc.setTextColor(...colors.crimson)
          doc.text(String(index + 1).padStart(2, '0'), x + 4, y + 5)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(...colors.ink)
          doc.text(doc.splitTextToSize(label, boxWidth - 8), x + 4, y + 10)
        })
        y += 19
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
        'A print-ready Veritas reference for urgent household, roadside, weather, utility, water, fire, and medical-continuity decisions, followed by source-backed course paths in skilled trades, repair, preparedness, food resilience, and healthcare-support work.',
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
        `${instituteFieldManualEntries.length} FIELD ANSWERS  ·  ${immediateEntryCount} IMMEDIATE PROTOCOLS  ·  ${totalCoursePaths} COURSE PATHS`,
        pageWidth / 2,
        y,
        { align: 'center' }
      )
      doc.text(`${manualCategories.length} HAZARD CATEGORIES  ·  SOURCE-ANCHORED  ·  PRINTABLE PDF`, pageWidth / 2, y + 10, { align: 'center' })

      y = 238
      doc.setTextColor(...colors.muted)
      doc.setFontSize(9)
      doc.text('Generated from veritasworldwide.com/institute', pageWidth / 2, y, { align: 'center' })
      doc.text('Urgent answers first. Deeper skill paths second. Escalation gates always visible.', pageWidth / 2, y + 8, { align: 'center' })

      runningTitle = 'Methodology'
      newPage()

      writeLabel('Methodology')
      writeWrapped(
        'The Veritas Institute field manual is built in two layers. Layer one handles the urgent question in front of the reader: bleeding, water, batteries, utilities, food safety, road trouble, fire, weather, power, evacuation, and household failure. Layer two turns recurring needs into structured courses covering the practical trades, repair, preparedness, food resilience, and healthcare-support work.',
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
      writeLabel('Stress-use structure')
      writeBullets([
        'Urgency tells the reader whether the first move is immediate, high-priority, or a planned reset.',
        'Time window states when the decision has to happen.',
        'Decision rule gives the non-negotiable logic before the checklist starts.',
        'Escalation gates make clear when the right answer is 911, the utility, the health department, a licensed trade, or a medical professional.',
      ], 9, 5)
      y += 4
      drawFlow(['Identify hazard', 'Apply decision rule', 'Act now', 'Escalate if triggered'])
      y += 2
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
        doc.text(`${String(index + 1).padStart(2, '0')}. ${entry.title} — ${entry.category} / ${entry.urgency}`, marginLeft, y)
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
        drawCallout(`${entry.urgency} · ${entry.timeWindow}`, entry.decisionRule, entry.urgency === 'Immediate' ? colors.crimson : entry.urgency === 'High' ? colors.amber : colors.green)
        writeKeyValue('When to use', entry.whenToUse, 9, 5)
        y += 1

        writeLabel('Quick answer')
        writeWrapped(entry.quickAnswer, 9.5, 5.3)
        y += 3
        drawFlow(['Recognize', 'Control hazard', 'Use source anchor', 'Escalate if triggered'])

        writeLabel('Do now')
        writeBullets(entry.doNow, 8.6, 4.7)
        y += 2

        writeLabel('Avoid')
        writeBullets(entry.avoid, 8.6, 4.7)
        y += 2

        writeLabel('Gear')
        writeBullets(entry.gear, 8.4, 4.6)
        y += 2

        writeLabel('Escalate if')
        writeBullets(entry.escalateIf, 8.4, 4.6)
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

      runningTitle = 'Quick Reference'
      newPage()
      writeLabel('Quick reference by category')
      for (const category of manualCategories) {
        const entries = instituteFieldManualEntries.filter((entry) => entry.category === category)
        ensureSpace(12)
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(...colors.crimsonDark)
        doc.text(category, marginLeft, y)
        doc.setTextColor(...colors.ink)
        y += 6
        for (const entry of entries) {
          writeKeyValue(entry.title, `${entry.urgency}. ${entry.decisionRule}`, 8.2, 4.5)
        }
        y += 2
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
          writeWrapped(`Proof standard: ${section.proofFramework.map((item) => `${item.title}: ${item.detail}`).join(' | ')}`, 8.1, 4.4)
          y += 2
          writeWrapped(`Action sequence: ${section.steps.slice(0, 3).map((step) => step.title).join(' -> ')}`, 8.1, 4.4)
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
      return doc
}
