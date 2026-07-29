import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export interface PdfField {
  label: string;
  value: string;
}

const PAGE_WIDTH = 595.28; // A4 em pontos
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

/** Quebra uma string em linhas que cabem em `maxWidth`, usando a fonte/tamanho dados. */
function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

/**
 * Gera um PDF simples de uma página (ou mais, se o conteúdo não couber)
 * com título, subtítulo (data) e uma lista de campos rótulo/valor.
 */
export async function generateBriefingPdf(
  title: string,
  fields: PdfField[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const cyan = rgb(0 / 255, 150 / 255, 200 / 255);
  const dark = rgb(0.12, 0.12, 0.16);
  const gray = rgb(0.45, 0.45, 0.5);

  function newPageIfNeeded(lineHeight: number) {
    if (y - lineHeight < MARGIN) {
      page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  // Título
  page.drawText(title, { x: MARGIN, y, size: 20, font: fontBold, color: dark });
  y -= 26;

  // Data de geração
  const now = new Date();
  const dataStr = now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  page.drawText(`Gerado em ${dataStr}`, { x: MARGIN, y, size: 10, font, color: gray });
  y -= 10;

  // Linha divisória
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 28;

  const labelSize = 9;
  const valueSize = 12;

  for (const field of fields) {
    if (!field.value) continue;

    newPageIfNeeded(40);

    page.drawText(field.label.toUpperCase(), { x: MARGIN, y, size: labelSize, font: fontBold, color: cyan });
    y -= 16;

    const lines = wrapText(field.value, font, valueSize, CONTENT_WIDTH);
    for (const line of lines) {
      newPageIfNeeded(18);
      page.drawText(line, { x: MARGIN, y, size: valueSize, font, color: dark });
      y -= 17;
    }
    y -= 10; // espaço entre campos
  }

  return pdfDoc.save();
}
