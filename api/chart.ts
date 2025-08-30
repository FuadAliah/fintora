'use server';

import prisma from '@/lib/prisma';
import { DateRangeEnum } from '@/constant';
import moment from 'moment';

function getDateRange(preset: string) {
    let from: Date, to: Date, label: string;

    switch (preset) {
        case 'last_30_days':
            from = moment().subtract(30, 'days').startOf('day').toDate();
            to = moment().endOf('day').toDate();
            label = 'Last 30 Days';
            break;
        case 'last_month':
            from = moment().subtract(1, 'month').startOf('month').toDate();
            to = moment().subtract(1, 'month').endOf('month').toDate();
            label = 'Last Month';
            break;
        case 'all_time':
            from = new Date(0);
            to = moment().endOf('day').toDate();
            label = 'All Time';
            break;
        default:
            from = moment().subtract(30, 'days').startOf('day').toDate();
            to = moment().endOf('day').toDate();
            label = 'Last 30 Days';
            break;
    }

    const diff = moment(to).diff(moment(from), 'days') + 1;
    const prevFrom = moment(from).subtract(diff, 'days').toDate();
    const prevTo = moment(to).subtract(diff, 'days').toDate();

    return { from, to, prevFrom, prevTo, label, value: preset };
}

export async function fetchChart(preset: string = DateRangeEnum.LAST_30_DAYS) {
    const { from, to, label, value } = getDateRange(preset);

    const transactions = await prisma.transaction.findMany({
        where: { date: { gte: moment(from).utc().toISOString(), lte: moment(to).utc().toISOString() } },
        select: { date: true, amount: true, type: true },
    });

    const groupedData = transactions.reduce((acc: Record<string, { income: number; expense: number }>, curr) => {
        const date = moment(curr.date).format('DD MMM YYYY');

        if (!acc[date]) {
            acc[date] = { income: 0, expense: 0 };
        }

        if (curr.type === 'income') {
            acc[date].income += +curr.amount;
        } else if (curr.type === 'expense') {
            acc[date].expense += +curr.amount;
        }

        return acc;
    }, {});

    const formattedTransactions = Object.entries(groupedData).map(([date, totals]) => ({
        date,
        income: totals.income,
        expense: totals.expense,
    }));

    const incomeCount = await prisma.transaction.count({
        where: { type: 'income', date: { gte: moment(from).utc().toISOString(), lte: moment(to).utc().toISOString() } },
    });
    const expenseCount = await prisma.transaction.count({
        where: { type: 'expense', date: { gte: moment(from).utc().toISOString(), lte: moment(to).utc().toISOString() } },
    });

    return {
        status: 200,
        message: 'Transaction overview chart fetched successfully',
        preset: { label, value, from, to },
        data: formattedTransactions,
        incomeCount,
        expenseCount,
    };
}
