'use client';

import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  memo,
} from 'react';
import Chart from 'react-apexcharts';
import type { PieChartProps, ChartHandle } from '@/lib/@types/chartTypes';
import useChartImageGenerator from '@/app/hook/useChartImageGenerator';
const PieChart = forwardRef<ChartHandle, PieChartProps>(
  ({ series, labels, theme }, ref) => {
    const chartRef = useRef<any | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [chartData, setChartData] = useState({
      series: [],
      labels: [],
      theme: '',
    });
    const { getImage } = useChartImageGenerator(chartRef, isReady);
    useImperativeHandle(ref, () => ({
      isReady,
      getImage,
    }));

    useEffect(() => {
      setChartData({ series, labels, theme });
    }, [series, labels, theme]);
    const options = useMemo(
      () => ({
        chart: {
          background: 'transparent',
          height: 350,
          events: {
            mounted: (chart) => {
              chartRef.current = chart;
              setIsReady(true);
            },
          },
        },
        labels: chartData.labels,
        legend: {
          position: 'bottom' as const,
        },
        theme: {
          mode: chartData.theme as 'light' | 'dark',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom' as const,
              },
            },
          },
        ],
      }),
      [chartData]
    );
    return (
      <div className='min-w-full flex items-center justify-center'>
        <Chart
          options={options}
          series={chartData.series}
          type='pie'
          width='100%'
          height='300px'
        />
      </div>
    );
  }
);
PieChart.displayName = 'PieChart';
export default memo(PieChart);
