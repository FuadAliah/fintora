'use client';
import Chart from 'react-apexcharts';
import { ChartOptions, ChartSeries } from '@/types';

type LineChartType = {
    options: ChartOptions;
    series: ChartSeries | undefined;
    type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap" | undefined;
    width: string;
};

export function LineCharts({ options, series, type, width }: LineChartType) {
    return <Chart options={options} series={series} type={type} width={width} />;
}
