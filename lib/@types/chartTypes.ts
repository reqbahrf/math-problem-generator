export interface ApexChartTheme {
  mode: 'light' | 'dark';
}

export interface ApexChartOptions {
  chart: {
    type: string;
    height: number;
    zoom?: {
      enabled: boolean;
    };
  };
  labels?: string[];
  legend?: {
    position: string;
  };
  stroke?: {
    curve: string;
  };
  xaxis?: {
    categories: string[];
  };
  yaxis?: {
    title: {
      text: string;
    };
  };
  markers?: {
    size: number;
  };
  theme: ApexChartTheme;
  responsive?: Array<{
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
      legend: {
        position: string;
      };
    };
  }>;
}

export interface ApexChartSeries {
  name?: string;
  data: number[];
}

export interface ChartProps {
  series: number[];
  labels?: string[];
  categories?: string[];
}
