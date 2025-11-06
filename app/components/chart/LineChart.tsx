'use client';

import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { ChartThemeManager } from '@/lib/chartUtils';

interface props {
  series: number[];
  categories: string[];
}

export default class LineChart extends Component<props, any> {
  private themeManager: ChartThemeManager;

  constructor(props: props) {
    super(props);
    this.themeManager = new ChartThemeManager(
      this.handleThemeChange.bind(this)
    );
    this.state = {
      series: [
        {
          name: 'Problem Count',
          data: props.series,
        },
      ],
      options: {
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: 'straight',
        },
        xaxis: {
          categories: props.categories,
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
          mode: this.themeManager.getTheme(),
        },
      },
    };
  }

  handleThemeChange(theme: 'light' | 'dark') {
    this.setState({
      options: {
        ...this.state.options,
        theme: {
          mode: theme,
        },
      },
    });
  }

  componentDidMount() {
    this.themeManager.setupThemeObserver();
  }

  componentWillUnmount() {
    console.log('unmounting');
    console.log('before cleanup', this.themeManager);
    this.themeManager.cleanup();
    console.log('after cleanup', this.themeManager);
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='line'
        height={350}
      />
    );
  }
}
