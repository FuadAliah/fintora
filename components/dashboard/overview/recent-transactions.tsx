'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableLoadingIndicator, TableRow } from '@/components/ui/table';
import { Transaction, TransactionResponse } from '@/types';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import moment from 'moment';
import { CustomHeader } from './custom-header';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchTransactions } from '@/api/transactions';
import { Card } from '@/components/ui/card';

const columns = [
    {
        header: 'Date',
        accessor: 'date',
        cell: ({ row }: { row: Transaction }) => moment(row.date).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: ({ row }: { row: Transaction }) => row.title,
    },
    {
        header: 'Category',
        accessor: 'category',
        cell: ({ row }: { row: Transaction }) => row.category,
    },
    {
        header: 'Amount',
        accessor: 'amount',
        cell: ({ row }: { row: Transaction }) => {
            return row.type === 'income' ? (
                <div className="text-green-500 flex items-center gap-2">
                    <TrendingUpIcon size={16} />
                    <span>${Number(row.amount).toFixed(2)}</span>
                </div>
            ) : (
                <div className="text-red-500 flex items-center gap-2">
                    <TrendingDownIcon size={16} />
                    <span>${Number(row.amount).toFixed(2)}</span>
                </div>
            );
        },
        sortable: true,
    },
    {
        header: 'Type',
        accessor: 'type',
        cell: ({ row }: { row: Transaction }) => (
            <span
                className={`capitalize text-xs rounded-full px-3 py-1
                    ${row.type === 'income' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
            >
                {row.type}
            </span>
        ),
    },
    {
        header: 'Description',
        accessor: 'description',
        cell: ({ row }: { row: Transaction }) => row.description,
    },
];

export function RecentTransactions() {
    const { data: session } = useSession();

    const [transactions, setTransactions] = useState<TransactionResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pageSize: number = 5;

    useEffect(() => {
        if (!session) return;
        async function getTransactions() {
            try {
                const data = await fetchTransactions({ pageSize });
                setTransactions(data);
            } catch (error: unknown) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }
        getTransactions();
    }, [session, pageSize]);

    if (error) return <div>Error: {error}</div>;
    return (
        <Card className='border-0 px-6 my-8'>
            <CustomHeader />
            {loading && <TableLoadingIndicator className="w-full h-[240px] border rounded-md" />}
            {!loading && <Table className="text-sm border">
                <TableHeader className="bg-slate-100 rounded-t-2xl">
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.accessor}>
                                <span>{column.header}</span>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions?.data?.map((transaction: Transaction) => (
                        <TableRow key={transaction.id}>
                            {columns.map((col) => (
                                <TableCell key={col.accessor}>{col?.cell({ row: transaction })}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
        </Card>
    );
}
