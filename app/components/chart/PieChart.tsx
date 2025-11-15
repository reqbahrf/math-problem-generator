'use client';

import React, { Component } from 'react';
import Chart from 'react-apexcharts';

interface props {
  series: number[];
  labels: string[];
  theme: 'light' | 'dark';
}

export default class PieChart extends Component<props, any> {
  constructor(props: props) {
    super(props);
    this.state = {
      series: props.series,
      options: {
        chart: {
          background: 'transparent',
          type: 'pie',
          height: 350,
        },
        labels: props.labels,
        legend: {
          position: 'bottom',
        },
        theme: {
          mode: props.theme,
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
      <div className='min-w-full flex items-center justify-center'>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='pie'
          width='100%'
          height='300px'
        />
      </div>
    );
  }
}
