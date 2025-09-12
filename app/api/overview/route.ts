import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import moment from 'moment';
import { DateRangeEnum } from '@/constant';

type PresetType = 'last_30_days' | 'last_month' | 'all_time';

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

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const preset = (searchParams.get('preset') as PresetType) || DateRangeEnum;
        const { from, to } = getDateRange(preset);
        const data = await prisma.invoice.findMany({ where: { issueDate: { gte: from, lte: to } } });
        return NextResponse.json({ status: 200, message: 'Success', data });
    } catch (error) {
        console.error('Error fetching totals:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch totals' }, { status: 500 });
    }
}
