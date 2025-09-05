'use client';
import { useEffect, useState } from 'react';
import { LineCharts } from '@/components/line-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchChart } from '@/api/chart';
import { ChartSeries } from '@/types';
import moment from 'moment';
import { formatPresetText } from '@/utils/format-text';

export const TransactionsOverview = ({ preset }: { preset: string }) => {
    const [series, setSeries] = useState<ChartSeries>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [incomCount, setIncomCount] = useState<number | null>(null);
    const [expenseCount, setExpenseCount] = useState<number | null>(null);

    const options = {
        chart: { id: 'line-chart', toolbar: { show: false } },
        xaxis: { categories: categories || [] },
    };

    const fetchCharts = async () => {
        const chartData = await fetchChart(preset);

        const date = chartData.data.map((item) => moment(item.date).utc().format('DD MMM YYYY'));
        const income = chartData?.data.map((item) => item.income);
        const expense = chartData?.data.map((item) => item.expense);

        setIncomCount(chartData.incomeCount);
        setExpenseCount(chartData.expenseCount);

        setCategories(date);

        setSeries([
            { name: 'Income', data: income },
            { name: 'Expense', data: expense },
        ]);
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
                        <CardTitle>Transaction Overview</CardTitle>
                        <CardDescription>Showing total transactions for {formatPresetText(preset)}</CardDescription>
                    </div>
                    <div className="flex justify-between w-1/3">
                        <div className="flex flex-col gap-2">
                            <CardTitle>{incomCount || 0}</CardTitle>
                            <CardDescription>No of Income</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardTitle>{expenseCount || 0}</CardTitle>
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
