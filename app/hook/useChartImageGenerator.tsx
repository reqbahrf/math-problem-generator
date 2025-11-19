import type { ChartHandle } from '@/lib/@types/chartTypes';
import { useCallback } from 'react';
type ApexChartInstance = any;

interface ChartImageGenerator extends Pick<ChartHandle, 'getImage'> {}

const useChartImageGenerator = (
  chartRef: React.RefObject<ApexChartInstance>,
  isReady: boolean
): ChartImageGenerator => {
  const getImage = useCallback(async (): Promise<string> => {
    if (!isReady) return '';
    let width = 200;

    const chart = chartRef.current;
    const originalOptions = chart.w.config;
    const chartType = chart.w.config.chart.type;
    if (chartType === 'line') {
      width = 500;
    }
    await chart.updateOptions(
      {
        theme: { mode: 'light', palette: 'palette1' },
        chart: {
          foreColor: '#222',
        },
      },
      false,
      false
    );
    const { imgURI } = await chart.dataURI({ scale: 3, width });

    await chart.updateOptions(originalOptions, false, false);
    return imgURI;
  }, [chartRef, isReady]);
  return { getImage };
};

export default useChartImageGenerator;
