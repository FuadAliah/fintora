'use server';
import prisma from '@/lib/prisma';
import { DateRangeEnum } from '@/constant';
import moment from 'moment';

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

export async function fetchChart(preset: string = DateRangeEnum.LAST_30_DAYS) {
    const { from, to, label, value } = getDateRange(preset);

    const invoices = await prisma.invoice.findMany({
        where: { issueDate: { gte: moment(from).utc().toISOString(), lte: moment(to).utc().toISOString() } },
    });

    return {
        status: 200,
        message: 'Invoice overview chart fetched successfully',
        preset: { label, value, from, to },
        data: invoices,
    };
}
