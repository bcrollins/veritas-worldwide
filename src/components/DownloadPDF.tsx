import { useState } from 'react';

export default function DownloadPDF() {
  const [generating, setGenerating] = useState(false);

  async function handleDownload() {
    setGenerating(true);
    try {
      const [{ jsPDF }, { chapters }] = await Promise.all([
        import('jspdf'),
        import('../data/chapters'),
      ]);
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 28;
      const marginRight = 28;
      const marginTop = 32;
      const marginBottom = 28;
      const contentWidth = pageWidth - marginLeft - marginRight;
      const bodyLH = 5.8;
      const smallLH = 4.8;
      let y = marginTop;
      let pageNum = 0;
      let currentChapterTitle = '';

      // ── Page management ──
      function newPage() {
        doc.addPage();
        pageNum++;
        y = marginTop;
      }

      function addRunningHeader() {
        if (pageNum < 2) return;
        // Top rule
        doc.setDrawColor(26, 26, 26);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, marginTop - 10, pageWidth - marginRight, marginTop - 10);

        // Left: publication name
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        doc.text('VERITAS WORLDWIDE PRESS', marginLeft, marginTop - 13);

        // Right: chapter title
        if (currentChapterTitle) {
          doc.text(currentChapterTitle.toUpperCase().substring(0, 60), pageWidth - marginRight, marginTop - 13, { align: 'right' });
        }
        doc.setTextColor(0, 0, 0);
      }

      function addPageNumber() {
        if (pageNum < 2) return;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        // Bottom center page number
        doc.text(String(pageNum), pageWidth / 2, pageHeight - 16, { align: 'center' });
        // Bottom rule
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.15);
        doc.line(marginLeft, pageHeight - 20, pageWidth - marginRight, pageHeight - 20);
        doc.setTextColor(0, 0, 0);
      }

      function checkPage(needed: number) {
        if (y + needed > pageHeight - marginBottom) {
          addPageNumber();
          newPage();
          addRunningHeader();
        }
      }

      function writeWrapped(text: string, fontSize: number, style: string = 'normal', lh = bodyLH, indent = 0) {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        const lines = doc.splitTextToSize(text, contentWidth - indent);
        for (const line of lines) {
          checkPage(lh);
          doc.text(line, marginLeft + indent, y);
          y += lh;
        }
      }

      // ═══════════════════════════════════════════
      //  TITLE PAGE
      // ═══════════════════════════════════════════
      pageNum = 0;

      // Top ornamental rule
      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(1.2);
      doc.line(50, 55, 160, 55);
      doc.setLineWidth(0.3);
      doc.line(50, 57.5, 160, 57.5);

      // Title
      doc.setFontSize(42);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      y = 80;
      doc.text('THE RECORD', pageWidth / 2, y, { align: 'center' });

      // Subtitle
      y += 14;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(80, 80, 80);
      doc.text('A Documentary History of Power, Money,', pageWidth / 2, y, { align: 'center' });
      y += 6;
      doc.text('and the Institutions That Shaped the Modern World', pageWidth / 2, y, { align: 'center' });

      // Decorative divider
      y += 12;
      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.5);
      doc.line(85, y, 125, y);

      // Publisher
      y += 12;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      doc.text('VERITAS WORLDWIDE PRESS', pageWidth / 2, y, { align: 'center' });

      y += 8;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Volume I \u2014 March 2026', pageWidth / 2, y, { align: 'center' });

      // Stats line
      y += 20;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('31 CHAPTERS  \u00b7  500+ PRIMARY SOURCES  \u00b7  THREE-TIER EVIDENCE CLASSIFICATION', pageWidth / 2, y, { align: 'center' });

      // Bottom ornamental rule
      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.3);
      doc.line(50, 230, 160, 230);
      doc.setLineWidth(1.2);
      doc.line(50, 232.5, 160, 232.5);

      // Source note
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text('Generated from veritasworldwide.com \u2014 Primary Sources \u00b7 Public Record \u00b7 Your Conclusions', pageWidth / 2, 245, { align: 'center' });

      // ═══════════════════════════════════════════
      //  EDITORIAL NOTE
      // ═══════════════════════════════════════════
      newPage();
      pageNum = 1;
      y = marginTop + 20;

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      doc.text('A Note on Sources', pageWidth / 2, y, { align: 'center' });
      y += 12;

      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.5);
      doc.line(80, y, 130, y);
      y += 10;

      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);

      const editNote = [
        'This publication cites exclusively primary sources: government documents, congressional records, court filings, declassified intelligence reports, central bank publications, and official transcripts.',
        'No anonymous sources. No editorial opinion. No narrative framing.',
        'Every factual claim is classified under a three-tier evidence system: Verified (confirmed by multiple primary sources), Circumstantial (supported by credible evidence requiring further corroboration), and Disputed (contested claims presented with all available evidence).',
        'Readers are encouraged to follow every citation, verify every claim, and form their own conclusions. The purpose of this work is not to tell you what to think \u2014 it is to ensure you have access to the documented record from which to think for yourself.',
      ];

      for (const para of editNote) {
        writeWrapped(para, 9.5, 'normal', bodyLH);
        y += 4;
      }

      y += 10;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text('\u2014 The Editors, Veritas Worldwide Press', pageWidth / 2, y, { align: 'center' });
      addPageNumber();

      // ═══════════════════════════════════════════
      //  TABLE OF CONTENTS
      // ═══════════════════════════════════════════
      newPage();
      addRunningHeader();

      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      doc.text('Table of Contents', marginLeft, y);
      y += 4;
      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.8);
      doc.line(marginLeft, y, marginLeft + 50, y);
      y += 10;

      for (const ch of chapters) {
        checkPage(10);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(139, 26, 26);
        doc.text(String(ch.number).padStart(2, ' '), marginLeft, y);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 26, 26);
        doc.setFontSize(9.5);
        doc.text(ch.title, marginLeft + 12, y);

        if (ch.dateRange) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(120, 120, 120);
          doc.text(ch.dateRange, pageWidth - marginRight, y, { align: 'right' });
        }

        // Dot leader
        doc.setFontSize(7);
        doc.setTextColor(200, 200, 200);
        const titleWidth = doc.getTextWidth(ch.title);
        const dateWidth = ch.dateRange ? doc.getTextWidth(ch.dateRange) + 5 : 0;
        const dotsStart = marginLeft + 12 + titleWidth + 3;
        const dotsEnd = pageWidth - marginRight - dateWidth - 3;
        if (dotsEnd > dotsStart + 10) {
          let dx = dotsStart;
          while (dx < dotsEnd) {
            doc.text('.', dx, y);
            dx += 2;
          }
        }

        y += 8;
      }
      addPageNumber();

      // ═══════════════════════════════════════════
      //  CHAPTERS
      // ═══════════════════════════════════════════
      for (const ch of chapters) {
        newPage();
        currentChapterTitle = ch.title;
        addRunningHeader();

        // Chapter number + date range
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(139, 26, 26);
        doc.text(`CHAPTER ${ch.number}${ch.dateRange ? '  \u00b7  ' + ch.dateRange : ''}`, marginLeft, y);
        y += 4;

        // Rule under chapter number
        doc.setDrawColor(139, 26, 26);
        doc.setLineWidth(0.8);
        doc.line(marginLeft, y, marginLeft + 40, y);
        y += 10;

        // Chapter title
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 26, 26);
        const titleLines = doc.splitTextToSize(ch.title, contentWidth);
        for (const line of titleLines) {
          checkPage(12);
          doc.text(line, marginLeft, y);
          y += 10;
        }
        y += 3;

        // Subtitle
        doc.setFontSize(10.5);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(80, 80, 80);
        const subLines = doc.splitTextToSize(ch.subtitle, contentWidth);
        for (const line of subLines) {
          checkPage(6);
          doc.text(line, marginLeft, y);
          y += 5.5;
        }
        y += 8;

        // Thin rule before content
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.15);
        doc.line(marginLeft, y, pageWidth - marginRight, y);
        y += 8;

        // ── Content blocks ──
        for (const block of ch.content) {
          switch (block.type) {
            case 'dropcap':
            case 'text':
              doc.setTextColor(30, 30, 30);
              writeWrapped(block.text || '', 9.5, 'normal', bodyLH);
              y += 3;
              break;

            case 'heading':
              y += 6;
              checkPage(14);
              doc.setFontSize(14);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(26, 26, 26);
              doc.text(block.text || '', marginLeft, y);
              y += 3;
              // Accent rule under heading
              doc.setDrawColor(139, 26, 26);
              doc.setLineWidth(0.4);
              doc.line(marginLeft, y, marginLeft + 25, y);
              y += 6;
              break;

            case 'subheading':
              y += 4;
              checkPage(12);
              doc.setFontSize(11.5);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(40, 40, 40);
              doc.text(block.text || '', marginLeft, y);
              y += 7;
              break;

            case 'quote':
              if (block.quote) {
                y += 4;
                // Left border accent
                checkPage(12);
                const quoteStartY = y;
                doc.setFontSize(9.5);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(50, 50, 50);
                const qLines = doc.splitTextToSize(`\u201c${block.quote.text}\u201d`, contentWidth - 14);
                for (const line of qLines) {
                  checkPage(bodyLH);
                  doc.text(line, marginLeft + 8, y);
                  y += bodyLH;
                }
                // Draw crimson left border
                doc.setDrawColor(139, 26, 26);
                doc.setLineWidth(0.8);
                doc.line(marginLeft + 3, quoteStartY - 2, marginLeft + 3, y - 1);

                // Attribution
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.setTextColor(120, 120, 120);
                checkPage(smallLH);
                doc.text(`\u2014 ${block.quote.attribution}`, marginLeft + 8, y + 1);
                y += 8;
              }
              break;

            case 'evidence':
              if (block.evidence) {
                y += 4;
                checkPage(14);

                // Evidence box background
                const evStartY = y - 2;
                const tierColors: Record<string, { text: [number, number, number]; bg: [number, number, number]; border: [number, number, number] }> = {
                  verified: { text: [22, 101, 52], bg: [240, 253, 244], border: [34, 197, 94] },
                  circumstantial: { text: [146, 64, 14], bg: [255, 251, 235], border: [245, 158, 11] },
                  disputed: { text: [153, 27, 27], bg: [254, 242, 242], border: [239, 68, 68] },
                };
                const tc = tierColors[block.evidence.tier] || tierColors.verified;

                // Tier label
                doc.setTextColor(...tc.text);
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.text(`\u25cf  ${block.evidence.label}`, marginLeft + 3, y);
                y += 5;

                // Evidence text
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8.5);
                doc.setTextColor(50, 50, 50);
                const eLines = doc.splitTextToSize(block.evidence.text, contentWidth - 8);
                for (const line of eLines) {
                  checkPage(smallLH);
                  doc.text(line, marginLeft + 3, y);
                  y += smallLH;
                }

                // Left border for evidence block
                doc.setDrawColor(...tc.border);
                doc.setLineWidth(1);
                doc.line(marginLeft, evStartY - 2, marginLeft, y + 1);
                y += 5;
              }
              break;

            case 'stats':
              if (block.stats) {
                y += 4;
                for (const stat of block.stats) {
                  checkPage(14);
                  doc.setFontSize(18);
                  doc.setFont('helvetica', 'bold');
                  doc.setTextColor(139, 26, 26);
                  doc.text(stat.value, marginLeft + 2, y);
                  const valWidth = doc.getTextWidth(stat.value);
                  doc.setFontSize(8.5);
                  doc.setFont('helvetica', 'normal');
                  doc.setTextColor(80, 80, 80);
                  doc.text(stat.label, marginLeft + valWidth + 6, y);
                  y += 8;
                }
                y += 3;
              }
              break;

            case 'table':
              if (block.table) {
                y += 4;
                const colCount = block.table.headers.length;
                const cellWidth = contentWidth / colCount;
                // Headers with background
                checkPage(12);
                doc.setFillColor(245, 243, 240);
                doc.rect(marginLeft, y - 3.5, contentWidth, 5.5, 'F');
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(26, 26, 26);
                block.table.headers.forEach((h: string, i: number) => {
                  doc.text(h, marginLeft + i * cellWidth + 1.5, y, { maxWidth: cellWidth - 3 });
                });
                y += 5;
                // Row rule
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.15);
                doc.line(marginLeft, y, pageWidth - marginRight, y);
                y += 3;
                // Rows
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.5);
                doc.setTextColor(50, 50, 50);
                for (const row of block.table.rows) {
                  checkPage(7);
                  (row as string[]).forEach((cell: string, i: number) => {
                    doc.text(cell, marginLeft + i * cellWidth + 1.5, y, { maxWidth: cellWidth - 3 });
                  });
                  y += 5;
                }
                y += 4;
              }
              break;

            case 'timeline':
              if (block.timeline) {
                y += 4;
                for (const event of block.timeline) {
                  checkPage(12);
                  doc.setFontSize(8.5);
                  doc.setFont('helvetica', 'bold');
                  doc.setTextColor(139, 26, 26);
                  doc.text(event.year, marginLeft + 2, y);
                  doc.setFont('helvetica', 'normal');
                  doc.setTextColor(40, 40, 40);
                  const tLines = doc.splitTextToSize(event.text, contentWidth - 28);
                  for (let i = 0; i < tLines.length; i++) {
                    if (i > 0) checkPage(smallLH);
                    doc.text(tLines[i], marginLeft + 24, y);
                    y += smallLH;
                  }
                  y += 2;
                }
                y += 3;
              }
              break;
          }
        }

        // ── Sources for this chapter ──
        if (ch.sources.length > 0) {
          y += 8;
          checkPage(14);

          // Sources header
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.15);
          doc.line(marginLeft, y, pageWidth - marginRight, y);
          y += 6;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(26, 26, 26);
          doc.text('Sources', marginLeft, y);
          y += 7;

          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(80, 80, 80);
          for (const src of ch.sources) {
            const srcText = `[${src.id}] ${src.text}`;
            const srcLines = doc.splitTextToSize(srcText, contentWidth - 4);
            for (const line of srcLines) {
              checkPage(4.5);
              doc.text(line, marginLeft + 2, y);
              y += 4.2;
            }
            y += 1.5;
          }
        }

        addPageNumber();
      }

      // ═══════════════════════════════════════════
      //  COLOPHON (back page)
      // ═══════════════════════════════════════════
      newPage();
      y = pageHeight / 2 - 30;

      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.5);
      doc.line(70, y, 140, y);
      y += 12;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      doc.text('VERITAS WORLDWIDE PRESS', pageWidth / 2, y, { align: 'center' });
      y += 8;

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      const colophonLines = [
        'Published March 2026',
        'veritasworldwide.com',
        '',
        'This work may be freely shared for non-commercial, educational purposes',
        'with proper attribution to Veritas Worldwide Press.',
        '',
        'No party. No agenda. Just the record.',
      ];
      for (const line of colophonLines) {
        doc.text(line, pageWidth / 2, y, { align: 'center' });
        y += 5;
      }

      y += 8;
      doc.setDrawColor(139, 26, 26);
      doc.setLineWidth(0.5);
      doc.line(70, y, 140, y);

      doc.save('The_Record_Veritas_Worldwide_Press.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-parchment font-sans font-semibold text-sm rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Download the entire publication as a PDF"
    >
      {generating ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Generating PDF\u2026
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Complete PDF
        </>
      )}
    </button>
  );
}
