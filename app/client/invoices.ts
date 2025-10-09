import { InvoiceResponse } from '@/types';
import { toast } from 'sonner';

export const summaryData = {
    availableBalance: 200,
    totalIncome: 500,
    totalExpenses: 300,
    savingRate: {
        percentage: 40,
        expenseRatio: 60,
    },
    invoiceCount: 2,
    percentageChange: {
        income: 0,
        expenses: 0,
        balance: 50,
        prevPeriodFrom: '2025-07-21T20:59:59.999Z',
        prevPeriodTo: '2025-08-19T20:59:59.999Z',
        previousValues: {
            incomeAmount: 0,
            expenseAmount: 0,
            balanceAmount: 0,
        },
    },
    preset: {
        from: '2025-07-21T20:59:59.999Z',
        to: '2025-08-19T20:59:59.999Z',
        value: '30days',
        label: 'Last 30 Days',
    },
};

type FetchInvoicesParams = {
    title?: string;
    type?: string;
    category?: string;
    currentPage?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    order?: string;
};

export async function fetchInvoices({
    title,
    type,
    category,
    currentPage = 1,
    pageSize = 10,
    startDate,
    endDate,
    sortBy,
    order,
}: FetchInvoicesParams): Promise<InvoiceResponse> {
    const query = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        ...(title?.length && title?.length >= 3 && { title }),
        ...(type && { type }),
        ...(category && { category }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(sortBy && { sortBy }),
        ...(order && { order }),
    });

    const res = await fetch(`/api/invoices?${query.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch invoices: ${res.statusText}`);
    }

    return res.json();
}

export async function deleteInvoice(id: string): Promise<void> {
    try {
        const res = await fetch(`/api/invoice?id=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete invoice: ${res.statusText}`);
        }

        await res.json();

        toast.success('Invoice deleted successfully!', {
            duration: 4000,
            position: 'top-center',
        });
    } catch (error) {
        toast.error('Failed to delete invoice', {
            duration: 4000,
            position: 'top-center',
        });

        throw error;
    }
}
