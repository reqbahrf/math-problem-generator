'use client';

import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import Chart from 'react-apexcharts';
import type { ChartHandle, LineChartProps } from '@/lib/@types/chartTypes';

const LineChart = forwardRef<ChartHandle, LineChartProps>(
  ({ series, categories, theme }, ref) => {
    const [isReady, setIsReady] = useState(false);
    const [chartData, setChartData] = useState({
      series: [],
      categories: [],
      theme: '',
    });

    const chartRef = useRef<any | null>(null);

    useImperativeHandle(ref, () => ({
      isReady,
      async getImage() {
        if (!isReady) return '';
        const chart = chartRef.current;
        const originalOptions = chart.w.config;

        await chart.updateOptions(
          {
            theme: { mode: 'light' },
            chart: { foreColor: '#222' },
          },
          false,
          true
        );
        const { imgURI } = await chart.dataURI();
        await chart.updateOptions(originalOptions, false, true);
        return imgURI;
      },
    }));
    useEffect(() => {
      setChartData({ series, categories, theme });
    }, [series, categories, theme]);
    const options = {
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
    };

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
export default LineChart;
