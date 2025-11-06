'use client';

import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { ChartThemeManager } from '@/lib/chartUtils';

interface props {
  series: number[];
  labels: string[];
}

export default class PieChart extends Component<props, any> {
  private themeManager: ChartThemeManager;

  constructor(props: props) {
    super(props);
    this.themeManager = new ChartThemeManager(this.handleThemeChange.bind(this));
    this.state = {
      series: props.series,
      options: {
        chart: {
          type: 'pie',
          height: 350,
        },
        labels: props.labels,
        legend: {
          position: 'bottom',
        },
        theme: {
          mode: this.themeManager.getTheme(),
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
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
    this.themeManager.cleanup();
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type='pie'
        height={350}
      />
    );
  }
}
