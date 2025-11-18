import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { ProcessedSession } from '@/app/types/processSession';
import { useCallback } from 'react';

pdfMake.addVirtualFileSystem(pdfFonts);

interface GeneratePdfProps {
  session: ProcessedSession;
  charts: {
    pieChart: string;
    lineChart: string;
  };
}

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

  const splitByNewLines = (text: string) => {
    const out: { text: string }[] = [];
    const lines = text.split('\n');
    for (const [index, line] of lines.entries()) {
      if (line) out.push({ text: line });
      if (index < lines.length - 1) out.push({ text: '\n' });
    }
    return out;
  };

  const parseBoldHtml = useCallback((htmlString: string) => {
    const parts: Array<{ text: string; bold?: boolean }> = [];
    const regex = /<strong>(.*?)<\/strong>/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(htmlString)) !== null) {
      const [fullMatch, boldContent] = match;
      const matchIndex = match.index;

      const plainText = htmlString.substring(lastIndex, matchIndex);
      if (plainText) {
        splitByNewLines(plainText).forEach((p) => parts.push(p));
      }

      splitByNewLines(boldContent).forEach((p) =>
        parts.push({ text: p.text, bold: true })
      );

      lastIndex = matchIndex + fullMatch.length;
    }

    const remainingText = htmlString.substring(lastIndex);
    if (remainingText) {
      splitByNewLines(remainingText).forEach((p) => parts.push(p));
    }

    return { text: parts };
  }, []);
  const generatePdf = useCallback(
    ({ session, charts }: GeneratePdfProps) => {
      console.log(charts);
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
              `Created: ${new Date(raw.createdAt).toLocaleString()}`,
              `Grade Level: ${raw.gradeLevel}`,
              `Status: ${raw.status}`,
              `Score: ${raw.score} / ${raw.problems.length}`,
            ],
          },

          {
            text: 'Problem Type Summary',
            style: 'subheader',
          },
          {
            image: charts.pieChart,
            width: 200,
            alignment: 'center',
          },

          {
            text: 'Difficulty Summary',
            style: 'subheader',
          },
          {
            image: charts.lineChart,
            width: 500,
            height: 200,
            alignment: 'center',
          },
          {
            text: 'Problem Details',
            style: 'subheader',
          },
          {
            table: {
              widths: ['auto', '*', 'auto', 'auto'],
              body: [
                ['#', 'Problem', 'Difficulty', 'Correct?'],
                ...raw.problems.map((p, i) => {
                  const cellContentString = `${p.problemText} ${
                    p.userAnswer
                      ? `\n\n<strong>Answer:</strong> ${p.userAnswer} \n\n<strong>Solution:</strong> ${p.solution}`
                      : 'not answered'
                  }`;
                  const cellContent = parseBoldHtml(cellContentString);
                  return [
                    i + 1,
                    cellContent,
                    p.difficultyLevel,
                    `${
                      p.userAnswer !== null
                        ? p.isCorrect
                          ? 'Yes'
                          : 'No'
                        : 'Not Answered'
                    }`,
                  ];
                }),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            margin: [0, 0, 0, 15],
            alignment: 'center',
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
            alignment: 'left',
          },
        },
      };

      pdfMake.createPdf(docDefinition).download(`session-${raw.id}.pdf`);
    },
    [parseBoldHtml]
  );
  return { generatePdf };
}
