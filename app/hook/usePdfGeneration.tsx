import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { ProcessedSession } from '@/app/types/processSession';
import { useCallback } from 'react';

pdfMake.addVirtualFileSystem(pdfFonts);

export default function usePdfGeneration() {
  const buildKeyValueTable = (data: Record<string, number>) => {
    return {
      table: {
        widths: ['*', 'auto'],
        body: [
          ['Type', 'Count'],
          ...Object.entries(data).map(([key, value]) => [key, value]),
        ],
      },
    };
  };
  const generatePdf = useCallback((session: ProcessedSession) => {
    const { session: raw, ...rest } = session;
    const docDefinition = {
      content: [
        { text: `Session Report`, style: 'header' },

        {
          text: `Session Info`,
          style: 'subheader',
        },
        {
          ul: [
            `Session ID: ${raw.id}`,
            `Created: ${raw.createdAt}`,
            `Grade Level: ${raw.gradeLevel}`,
            `Status: ${raw.status}`,
            `Score: ${raw.score}`,
          ],
        },

        {
          text: 'Problem Type Summary',
          style: 'subheader',
        },
        buildKeyValueTable(rest.problemTypeCounts),

        {
          text: 'Difficulty Summary',
          style: 'subheader',
        },
        buildKeyValueTable(rest.difficultyCounts),

        {
          text: 'Problem Details',
          style: 'subheader',
        },
        {
          table: {
            widths: ['auto', '*', 'auto', 'auto'],
            body: [
              ['#', 'Problem', 'Difficulty', 'Correct?'],
              ...raw.problems.map((p, i) => [
                i + 1,
                p.problemText,
                p.difficultyLevel,
                p.isCorrect ? 'Yes' : 'No',
              ]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 22, bold: true, margin: [0, 0, 0, 15] },
        subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
      },
    };

    pdfMake.createPdf(docDefinition).download(`session-${raw.id}.pdf`);
  }, []);
  return { generatePdf };
}
