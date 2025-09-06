'use server';

import prisma from '@/lib/prisma';
import moment from 'moment';
import { DateRangeEnum } from '@/constant';
import { OverviewResponse } from '@/types';

function getDateRange(preset: string) {
    let from: Date, to: Date, label: string;

    switch (preset) {
        case 'last_30_days':
            from = moment().utc().subtract(30, 'days').startOf('day').toDate();
            to = moment().utc().endOf('day').toDate();
            label = 'Last 30 Days';
            break;
        case 'last_month':
            from = moment().utc().subtract(1, 'month').startOf('month').toDate();
            to = moment().utc().subtract(1, 'month').endOf('month').toDate();
            label = 'Last Month';
            break;
        case 'all_time':
            from = new Date(0);
            to = moment().utc().endOf('day').toDate();
            label = 'All Time';
            break;
        default:
            from = moment().utc().subtract(30, 'days').startOf('day').toDate();
            to = moment().utc().endOf('day').toDate();
            label = 'Last 30 Days';
            break;
    }

    const diff = moment(to).diff(moment(from), 'days') + 1;
    const prevFrom = moment(from).subtract(diff, 'days').toDate();
    const prevTo = moment(to).subtract(diff, 'days').toDate();

    return { from, to, prevFrom, prevTo, label, value: preset };
}

export async function fetchOverview(preset: string = DateRangeEnum.LAST_30_DAYS): Promise<OverviewResponse> {
    const { from, to, prevFrom, prevTo, label, value } = getDateRange(preset);

    const income = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'income', createdAt: { gte: from, lte: to } },
    });

    const expense = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'expense', createdAt: { gte: from, lte: to } },
    });

    const balance = Number(income._sum.amount || 0) - Number(expense._sum.amount || 0);

    const prevIncome = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'income', createdAt: { gte: prevFrom, lte: prevTo } },
    });

    const prevExpense = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'expense', createdAt: { gte: prevFrom, lte: prevTo } },
    });

    const prevBalance = Number(prevIncome._sum.amount || 0) - Number(prevExpense._sum.amount || 0);

    // التغيرات
    const percentageChange = {
        income: prevIncome._sum.amount
            ? ((Number(income._sum.amount || 0) - Number(prevIncome._sum.amount)) / Number(prevIncome._sum.amount)) * 100
            : 0,
        expenses: prevExpense._sum.amount
            ? ((Number(expense._sum.amount || 0) - Number(prevExpense._sum.amount)) / Number(prevExpense._sum.amount)) * 100
            : 0,
        balance: prevBalance ? ((balance - prevBalance) / prevBalance) * 100 : 0,
        prevPeriodFrom: prevFrom,
        prevPeriodTo: prevTo,
        previousValues: {
            incomeAmount: Number(prevIncome._sum.amount || 0),
            expenseAmount: Number(prevExpense._sum.amount || 0),
            balanceAmount: prevBalance,
        },
    };

    return {
        status: 200,
        message: 'Success',
        data: {
            availableBalance: balance,
            totalIncome: Number(income._sum.amount || 0),
            totalExpenses: Number(expense._sum.amount || 0),
            savingRate: {
                percentage: income._sum.amount ? (balance / Number(income._sum.amount)) * 100 : 0,
                expenseRatio: income._sum.amount ? Number(expense._sum.amount || 0) / Number(income._sum.amount) : 0,
            },
            transactionCount: await prisma.transaction.count({
                where: { createdAt: { gte: from, lte: to } },
            }),
            percentageChange,
            previousValues: {
                incomeAmount: Number(prevIncome._sum.amount || 0),
                expenseAmount: Number(prevExpense._sum.amount || 0),
                balanceAmount: prevBalance,
            },
            preset: {
                from: from.toISOString(),
                to: to.toISOString(),
                value,
                label,
            },
        },
    };
}
