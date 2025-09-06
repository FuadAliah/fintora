'use client';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableLoadingIndicator, TableRow } from '@/components/ui/table';
import { Transaction, TransactionResponse } from '@/types';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { deleteTransaction, fetchTransactions } from '@/app/client/transactions';
import { Card, CardTitle } from '@/components/ui/card';
import { createTransactionsColumns } from '@/components/transactions/transactions-columns';
import { DeleteDialog } from '@/components/transactions/delete-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { Routes } from '@/utils/routes';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '../ui/pagination';
import { FilterSection } from '../transactions/filter-section';

export type TransactionsTableProps = {
    pageSize?: number;
    title: string;
    type: string;
    category: string;
    setTitle: (title: string) => void;
    setType: (type: string) => void;
    setCategory: (category: string) => void;
    recentTransaction?: boolean;
    isPagination?: boolean;
    pageSizeParam?: number;
};

export function TransactionsTable({
    title,
    type,
    category,
    setTitle,
    setType,
    setCategory,
    recentTransaction,
    isPagination = true,
    pageSizeParam = 10,
}: TransactionsTableProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const route = usePathname();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(pageSizeParam || 5);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

    const [transactions, setTransactions] = useState<TransactionResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function getTransactions() {
        try {
            const data = await fetchTransactions({ currentPage, pageSize, title, type, category });
            setTransactions(data);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    const onPageChange = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    const onPageSizeChange = (size: number) => {
        setPageSize(size);
    };

    const handleView = (transaction: Transaction) => {
        console.log('Viewing transaction:', transaction);
    };

    const handleDelete = async (transaction: Transaction) => {
        try {
            await deleteTransaction(transaction.id);
            await getTransactions();
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setOpenDeleteDialog(false);
            document.body.style.pointerEvents = 'auto';
            setTransactionToDelete(null);
        }
    };

    const transactionsColumns = createTransactionsColumns(handleView, (transaction: Transaction) => {
        setTransactionToDelete(transaction);
        setOpenDeleteDialog(true);
    });

    if (error) {
        return <div>Error: {error}</div>
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!session) return;
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize, title, type, category]);

    return (
        <>
            {openDeleteDialog && transactionToDelete && (
                <DeleteDialog
                    transaction={transactionToDelete}
                    open={openDeleteDialog}
                    onOpenChange={setOpenDeleteDialog}
                    handleDelete={() => handleDelete(transactionToDelete)}
                />
            )}
            <Card className="border-0 px-6 my-8">
                {!recentTransaction ? (
                    <FilterSection
                        title={title}
                        type={type}
                        category={category}
                        setTitle={setTitle}
                        setType={setType}
                        setCategory={setCategory}
                    />
                ) : (
                    <div className="flex justify-between items-center">
                        <CardTitle>Recent Transactions</CardTitle>
                        {!route.includes(Routes.TRANSACTIONS.url) && (
                            <Button variant="outline" onClick={() => router.push(Routes.TRANSACTIONS.url)}>
                                View All
                            </Button>
                        )}
                    </div>
                )}
                {loading && <TableLoadingIndicator className="w-full h-[240px] border rounded-md" />}
                {!loading && (
                    <Table className="text-sm border">
                        <TableHeader className="bg-slate-100 rounded-t-2xl">
                            <TableRow>
                                {transactionsColumns.map((column) => (
                                    <TableHead key={column.accessor}>
                                        <span>{column.header}</span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions?.data?.length ? (
                                transactions?.data?.map((transaction: Transaction) => (
                                    <TableRow key={transaction.id}>
                                        {transactionsColumns.map((col) => (
                                            <TableCell key={col.accessor}>{col?.cell({ row: transaction })}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="h-32">
                                    <TableCell className="text-center text-muted-foreground" colSpan={transactionsColumns.length}>
                                        No transactions found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            {isPagination && (
                                <TableRow>
                                    <TableCell className="py-3" colSpan={transactionsColumns.length}>
                                        <DataTablePagination
                                            pageNumber={transactions?.currentPage || 1}
                                            pageSize={transactions?.pageSize || 10}
                                            totalCount={transactions?.totalTransactions || 0}
                                            totalPages={transactions?.totalPages || 0}
                                            onPageChange={onPageChange}
                                            onPageSizeChange={onPageSizeChange}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>
                    </Table>
                )}
            </Card>
        </>
    );
}
