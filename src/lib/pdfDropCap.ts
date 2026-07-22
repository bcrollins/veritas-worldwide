/**
 * jsPDF drop-cap paragraph writer — print-quality, no letter/body overlap.
 *
 * Renders a large crimson display letter, wraps the first N body lines beside it
 * at reduced width, then reflows the remainder at full measure.
 */
export interface JsPdfLike {
  setFontSize(size: number): void
  setFont(name: string, style?: string): void
  setTextColor(r: number, g?: number, b?: number): void
  getTextWidth(text: string): number
  splitTextToSize(text: string, maxWidth: number): string[]
  text(text: string | string[], x: number, y: number, options?: { align?: string }): void
}

export interface DropCapWriteOptions {
  doc: JsPdfLike
  text: string
  x: number
  y: number
  maxWidth: number
  /** Body font size in pt (jsPDF units when unit=mm still use pt for setFontSize). */
  bodyFontSize?: number
  bodyLineHeight?: number
  dropFontSize?: number
  /** How many body lines sit beside the drop letter */
  wrapLines?: number
  bodyFont?: string
  dropFont?: string
  crimson?: [number, number, number]
  bodyColor?: [number, number, number]
  /** Called before each line to handle page breaks; returns possibly-updated y */
  ensureSpace?: (needed: number, currentY: number) => number
}

export interface DropCapWriteResult {
  y: number
  letter: string
  linesBeside: number
  linesFull: number
}

function splitLeadingLetter(text: string): { letter: string; rest: string } {
  const trimmed = text.replace(/^\s+/, '')
  if (!trimmed) return { letter: '', rest: '' }
  const m = trimmed.match(/^([“"''„«])?(\S)/)
  if (!m) return { letter: trimmed[0], rest: trimmed.slice(1) }
  const open = m[1] || ''
  const ch = m[2]
  const letter = open + ch
  return { letter, rest: trimmed.slice(letter.length) }
}

/**
 * Greedily peel lines of `text` that fit `width`, up to `count` lines.
 * Returns the lines and the unconsumed remainder (preserves word boundaries).
 */
function takeLines(doc: JsPdfLike, text: string, width: number, count: number): { lines: string[]; rest: string } {
  if (!text || count <= 0) return { lines: [], rest: text }
  const all = doc.splitTextToSize(text, width)
  if (all.length <= count) return { lines: all, rest: '' }
  const lines = all.slice(0, count)
  // Rejoin remaining lines from split — splitTextToSize breaks on width, so
  // rejoining with spaces is the standard jsPDF reflow pattern.
  const rest = all.slice(count).join(' ').replace(/\s+/g, ' ').trim()
  return { lines, rest }
}

export function writeDropCapParagraph(opts: DropCapWriteOptions): DropCapWriteResult {
  const {
    doc,
    text,
    x,
    maxWidth,
    bodyFontSize = 10,
    bodyLineHeight = 5.5,
    dropFontSize = 32,
    wrapLines = 3,
    bodyFont = 'times',
    dropFont = 'times',
    crimson = [139, 26, 26],
    bodyColor = [26, 26, 26],
  } = opts

  let y = opts.y
  const ensure = opts.ensureSpace || ((_n, cy) => cy)

  const { letter, rest } = splitLeadingLetter(text)
  if (!letter) {
    doc.setFont(bodyFont, 'normal')
    doc.setFontSize(bodyFontSize)
    doc.setTextColor(...bodyColor)
    const lines = doc.splitTextToSize(text || '', maxWidth)
    for (const line of lines) {
      y = ensure(bodyLineHeight, y)
      doc.text(line, x, y)
      y += bodyLineHeight
    }
    return { y, letter: '', linesBeside: 0, linesFull: lines.length }
  }

  // Measure drop letter width at drop size
  doc.setFont(dropFont, 'bold')
  doc.setFontSize(dropFontSize)
  const letterW = Math.min(doc.getTextWidth(letter) + 2.2, maxWidth * 0.28)
  const dropHeight = dropFontSize * 0.352 * 0.95 // pt→mm approx for float block
  const besideHeight = wrapLines * bodyLineHeight

  y = ensure(Math.max(dropHeight, besideHeight) + 2, y)
  const topY = y

  // Crimson display letter — baseline tuned so letter sits with first 2–3 body lines
  doc.setFont(dropFont, 'bold')
  doc.setFontSize(dropFontSize)
  doc.setTextColor(...crimson)
  // Baseline: drop letter sits slightly above the first body baseline
  const letterBaseline = topY + dropFontSize * 0.22
  doc.text(letter, x, letterBaseline)

  // Body beside the letter
  doc.setFont(bodyFont, 'normal')
  doc.setFontSize(bodyFontSize)
  doc.setTextColor(...bodyColor)

  const narrow = Math.max(maxWidth - letterW - 1, maxWidth * 0.55)
  const { lines: beside, rest: afterBeside } = takeLines(doc, rest, narrow, wrapLines)

  let bodyY = topY
  for (const line of beside) {
    bodyY = ensure(bodyLineHeight, bodyY)
    doc.text(line, x + letterW, bodyY)
    bodyY += bodyLineHeight
  }

  // Full-width remainder
  let fullCount = 0
  // Ensure we clear past the drop letter before full-width lines if needed
  const clearY = topY + Math.max(dropHeight * 0.85, beside.length * bodyLineHeight)
  if (bodyY < clearY && afterBeside) {
    bodyY = clearY
  }

  if (afterBeside) {
    const fullLines = doc.splitTextToSize(afterBeside, maxWidth)
    for (const line of fullLines) {
      bodyY = ensure(bodyLineHeight, bodyY)
      doc.text(line, x, bodyY)
      bodyY += bodyLineHeight
      fullCount++
    }
  }

  // If drop letter taller than beside text with no remainder, advance past letter
  y = Math.max(bodyY, topY + dropHeight * 0.75)
  return { y, letter, linesBeside: beside.length, linesFull: fullCount }
}
