'use client';
import { useEffect, useState } from 'react';
import { LineCharts } from '@/components/line-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchChart } from '@/app/client/chart';
import { ChartSeries } from '@/types';
import { formatPresetText } from '@/utils/format-text';

export const InvoicesOverview = ({ preset }: { preset: string }) => {
    const [series, setSeries] = useState<ChartSeries>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const options = {
        chart: { id: 'line-chart', toolbar: { show: false } },
        xaxis: { categories: categories || [] },
    };

    const fetchCharts = async () => {
        const chartData = await fetchChart(preset);
        setCategories(chartData.data.map((item) => item.invoiceNumber));
        setSeries([]);
    };

    useEffect(() => {
        fetchCharts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preset]);

    return (
        <Card className="lg:col-span-2 gap-4 pt-8 border-0 shadow-sm">
            <CardHeader className="px-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <CardTitle>Invoice Overview</CardTitle>
                        <CardDescription>Showing total invoices for {formatPresetText(preset)}</CardDescription>
                    </div>
                    <div className="flex justify-between w-1/3">
                        <div className="flex flex-col gap-2">
                            <CardTitle>{0}</CardTitle>
                            <CardDescription>No of Income</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardTitle>{0}</CardTitle>
                            <CardDescription>No of Expenses</CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2">
                <LineCharts options={options} series={series} type="area" width="100%" />
            </CardContent>
        </Card>
    );
};
