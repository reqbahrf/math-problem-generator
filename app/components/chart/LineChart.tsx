'use client';

import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface props {
  series: number[];
  categories: string[];
  theme: 'light' | 'dark';
}

export default class LineChart extends Component<props, any> {
  constructor(props: props) {
    super(props);
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
          background: 'transparent',
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
          mode: props.theme,
        },
      },
    };
  }

  componentDidUpdate(prevProps: Readonly<props>): void {
    if (prevProps.theme !== this.props.theme) {
      this.setState({
        options: {
          ...this.state.options,
          theme: {
            mode: this.props.theme,
          },
        },
      });
    }
  }

  render() {
    return (
      <div className='min-w-full'>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='line'
          width='100%'
          height='300px'
        />
      </div>
    );
  }
}
