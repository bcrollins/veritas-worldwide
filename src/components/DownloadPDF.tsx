import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { chapters } from '../data/chapters';

export default function DownloadPDF() {
  const [generating, setGenerating] = useState(false);

  async function handleDownload() {
    setGenerating(true);
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = 210;
      const margin = 25;
      const contentWidth = pageWidth - margin * 2;
      const lineHeight = 6;
      const smallLineHeight = 5;
      let y = margin;

      function checkPage(needed: number) {
        if (y + needed > 270) {
          doc.addPage();
          y = margin;
        }
      }

      function writeWrapped(text: string, fontSize: number, isBold = false, lh = lineHeight) {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        const lines = doc.splitTextToSize(text, contentWidth);
        for (const line of lines) {
          checkPage(lh);
          doc.text(line, margin, y);
          y += lh;
        }
      }

      // Title page
      doc.setFontSize(32);
      doc.setFont('helvetica', 'bold');
      y = 80;
      doc.text('THE RECORD', pageWidth / 2, y, { align: 'center' });
      y += 15;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('A Documentary History', pageWidth / 2, y, { align: 'center' });
      y += 8;
      doc.text('Veritas Worldwide Press', pageWidth / 2, y, { align: 'center' });
      y += 8;
      doc.text('Volume I — March 2026', pageWidth / 2, y, { align: 'center' });
      y += 20;
      doc.setFontSize(10);
      doc.text('31 Chapters · 500+ Primary Sources · Three-Tier Evidence Classification', pageWidth / 2, y, { align: 'center' });
      y += 10;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text('Generated from veritasworldwide.com', pageWidth / 2, y, { align: 'center' });
      doc.setTextColor(0, 0, 0);

      // Table of Contents
      doc.addPage();
      y = margin;
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Table of Contents', margin, y);
      y += 12;

      for (const ch of chapters) {
        checkPage(8);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${ch.number}`, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(ch.title, margin + 30, y);
        y += 7;
      }

      // Chapters
      for (const ch of chapters) {
        doc.addPage();
        y = margin;

        // Chapter header
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(139, 26, 26); // crimson
        doc.text(`${ch.number}${ch.dateRange ? ' · ' + ch.dateRange : ''}`, margin, y);
        doc.setTextColor(0, 0, 0);
        y += 10;

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const titleLines = doc.splitTextToSize(ch.title, contentWidth);
        for (const line of titleLines) {
          checkPage(10);
          doc.text(line, margin, y);
          y += 9;
        }
        y += 4;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        const subLines = doc.splitTextToSize(ch.subtitle, contentWidth);
        for (const line of subLines) {
          checkPage(6);
          doc.text(line, margin, y);
          y += 5;
        }
        y += 8;

        // Content blocks
        for (const block of ch.content) {
          switch (block.type) {
            case 'dropcap':
            case 'text':
              writeWrapped(block.text || '', 10);
              y += 3;
              break;

            case 'heading':
              y += 4;
              checkPage(12);
              doc.setFontSize(13);
              doc.setFont('helvetica', 'bold');
              doc.text(block.text || '', margin, y);
              y += 8;
              break;

            case 'subheading':
              y += 2;
              checkPage(10);
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(block.text || '', margin, y);
              y += 7;
              break;

            case 'quote':
              if (block.quote) {
                y += 3;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                const qLines = doc.splitTextToSize(`"${block.quote.text}"`, contentWidth - 10);
                for (const line of qLines) {
                  checkPage(lineHeight);
                  doc.text(line, margin + 5, y);
                  y += lineHeight;
                }
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                checkPage(smallLineHeight);
                doc.text(`— ${block.quote.attribution}`, margin + 5, y);
                y += 8;
              }
              break;

            case 'evidence':
              if (block.evidence) {
                y += 3;
                checkPage(12);
                const tierColors: Record<string, [number, number, number]> = {
                  verified: [22, 101, 52],
                  circumstantial: [146, 64, 14],
                  disputed: [153, 27, 27],
                };
                const color = tierColors[block.evidence.tier] || [0, 0, 0];
                doc.setTextColor(...color);
                doc.setFontSize(9);
                doc.setFont('helvetica', 'bold');
                doc.text(`[${block.evidence.label}]`, margin, y);
                y += 5;
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const eLines = doc.splitTextToSize(block.evidence.text, contentWidth - 4);
                for (const line of eLines) {
                  checkPage(smallLineHeight);
                  doc.text(line, margin + 2, y);
                  y += smallLineHeight;
                }
                y += 4;
              }
              break;

            case 'stats':
              if (block.stats) {
                y += 3;
                for (const stat of block.stats) {
                  checkPage(12);
                  doc.setFontSize(14);
                  doc.setFont('helvetica', 'bold');
                  doc.setTextColor(139, 26, 26);
                  doc.text(stat.value, margin, y);
                  doc.setTextColor(0, 0, 0);
                  doc.setFontSize(8);
                  doc.setFont('helvetica', 'normal');
                  doc.text(stat.label, margin + 35, y);
                  y += 7;
                }
                y += 3;
              }
              break;

            case 'table':
              if (block.table) {
                y += 3;
                const cellWidth = contentWidth / block.table.headers.length;
                // Headers
                checkPage(10);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                block.table.headers.forEach((h, i) => {
                  doc.text(h, margin + i * cellWidth, y, { maxWidth: cellWidth - 2 });
                });
                y += 6;
                // Rows
                doc.setFont('helvetica', 'normal');
                for (const row of block.table.rows) {
                  checkPage(8);
                  row.forEach((cell, i) => {
                    doc.text(cell, margin + i * cellWidth, y, { maxWidth: cellWidth - 2 });
                  });
                  y += 5;
                }
                y += 4;
              }
              break;

            case 'timeline':
              if (block.timeline) {
                y += 3;
                for (const event of block.timeline) {
                  checkPage(10);
                  doc.setFontSize(9);
                  doc.setFont('helvetica', 'bold');
                  doc.text(event.year, margin, y);
                  doc.setFont('helvetica', 'normal');
                  const tLines = doc.splitTextToSize(event.text, contentWidth - 25);
                  for (let i = 0; i < tLines.length; i++) {
                    if (i > 0) checkPage(smallLineHeight);
                    doc.text(tLines[i], margin + 22, y);
                    y += smallLineHeight;
                  }
                  y += 1;
                }
                y += 3;
              }
              break;
          }
        }

        // Sources
        if (ch.sources.length > 0) {
          y += 6;
          checkPage(12);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text('Sources', margin, y);
          y += 7;
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          for (const src of ch.sources) {
            const srcLines = doc.splitTextToSize(`[${src.id}] ${src.text}`, contentWidth);
            for (const line of srcLines) {
              checkPage(4);
              doc.text(line, margin, y);
              y += 4;
            }
            y += 1;
          }
        }
      }

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
          Generating PDF…
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
