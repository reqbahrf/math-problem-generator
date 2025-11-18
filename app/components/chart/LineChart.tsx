'use client';

import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  memo,
} from 'react';
import Chart from 'react-apexcharts';
import type { ChartHandle, LineChartProps } from '@/lib/@types/chartTypes';
import useChartImageGenerator from '@/app/hook/useChartImageGenerator';

const LineChart = forwardRef<ChartHandle, LineChartProps>(
  ({ series, categories, theme }, ref) => {
    const [isReady, setIsReady] = useState(false);
    const [chartData, setChartData] = useState({
      series: [],
      categories: [],
      theme: '',
    });

    const chartRef = useRef<any | null>(null);
    const { getImage } = useChartImageGenerator(chartRef, isReady);

    useImperativeHandle(ref, () => ({
      isReady,
      getImage,
    }));
    useEffect(() => {
      setChartData({ series, categories, theme });
    }, [series, categories, theme]);
    const options = useMemo(
      () => ({
        chart: {
          background: 'transparent',
          zoom: {
            enabled: false,
          },
          events: {
            mounted: (chart) => {
              chartRef.current = chart;
              setIsReady(true);
            },
          },
        },
        xaxis: {
          categories: chartData.categories,
        },
        yaxis: {
          title: {
            text: 'Number of Problems',
          },
        },
        markers: {
          size: 5,
        },
        theme: {
          mode: chartData.theme as 'light' | 'dark',
        },
      }),
      [chartData]
    );

    return (
      <div className='min-w-full'>
        <Chart
          options={options}
          series={[
            {
              name: 'Problem Count',
              data: chartData.series,
            },
          ]}
          type='line'
          width='100%'
          height='300px'
        />
      </div>
    );
  }
);
LineChart.displayName = 'LineChart';
export default memo(LineChart);
