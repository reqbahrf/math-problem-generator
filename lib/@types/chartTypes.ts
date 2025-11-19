export interface ApexChartTheme {
  mode: 'light' | 'dark';
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

export interface PieChartProps {
  series: number[];
  labels: string[];
  theme: 'light' | 'dark';
}

export interface ChartHandle {
  isReady: boolean;
  getImage: () => Promise<string>;
}

export interface LineChartProps {
  series: number[];
  categories: string[];
  theme: 'light' | 'dark';
}
