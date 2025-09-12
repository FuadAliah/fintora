'use client';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableLoadingIndicator, TableRow } from '@/components/ui/table';
import { Invoice, InvoiceResponse } from '@/types';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { InvoicesColumns } from '../invoices/invoices-columns';
import { Card, CardTitle } from '@/components/ui/card';
import { DeleteDialog } from '@/components/invoices/delete-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { Routes } from '@/utils/routes';
import { Button } from '@/components/ui/button';
import { DataTablePagination } from '../ui/pagination';
import { FilterSection } from '../invoices/filter-section';
import { deleteInvoice, fetchInvoices } from '@/app/client/invoices';

export type InvoicesTableProps = {
    pageSize?: number;
    title: string;
    type: string;
    category: string;
    setTitle: (title: string) => void;
    setType: (type: string) => void;
    setCategory: (category: string) => void;
    recentInvoice?: boolean;
    isPagination?: boolean;
    pageSizeParam?: number;
};

export function InvoicesTable({
    title,
    type,
    category,
    setTitle,
    setType,
    setCategory,
    recentInvoice,
    isPagination = true,
    pageSizeParam = 10,
}: InvoicesTableProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const route = usePathname();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(pageSizeParam || 5);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

    const [invoices, setInvoices] = useState<InvoiceResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function getInvoices() {
        try {
            const data = await fetchInvoices({ currentPage, pageSize, title, type, category });
            setInvoices(data);
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

    const handleView = (invoice: Invoice) => {
        console.log('Viewing invoice:', invoice);
    };

    const handleDelete = async (invoice: Invoice) => {
        try {
            await deleteInvoice(invoice.id);
            await getInvoices();
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setOpenDeleteDialog(false);
            setInvoiceToDelete(null);
        }
    };

    const invoicesColumns = InvoicesColumns(handleView, (invoice: Invoice) => {
        setInvoiceToDelete(invoice);
        setOpenDeleteDialog(true);
    });

    if (error) {
        return <div>Error: {error}</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!session) return;
        getInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize, title, type, category]);

    return (
        <>
            {openDeleteDialog && invoiceToDelete && (
                <DeleteDialog
                    invoice={invoiceToDelete}
                    open={openDeleteDialog}
                    onOpenChange={setOpenDeleteDialog}
                    handleDelete={() => handleDelete(invoiceToDelete)}
                />
            )}
            <Card className="border-0 px-6">
                {!recentInvoice ? (
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
                        <CardTitle>Recent Invoices</CardTitle>
                        {!route.includes(Routes.INVOICES.url) && (
                            <Button variant="outline" onClick={() => router.push(Routes.INVOICES.url)}>
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
                                {invoicesColumns.map((column) => (
                                    <TableHead key={column.accessor}>
                                        <span>{column.header}</span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices?.data?.length ? (
                                invoices?.data?.map((invoice: Invoice) => (
                                    <TableRow key={invoice.id}>
                                        {invoicesColumns.map((col) => (
                                            <TableCell key={col.accessor}>{col?.cell({ row: invoice })}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="h-32">
                                    <TableCell className="text-center text-muted-foreground" colSpan={invoicesColumns.length}>
                                        No invoices found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            {isPagination && (
                                <TableRow>
                                    <TableCell className="py-3" colSpan={invoicesColumns.length}>
                                        <DataTablePagination
                                            pageNumber={invoices?.currentPage || 1}
                                            pageSize={invoices?.pageSize || 10}
                                            totalCount={invoices?.totalInvoices || 0}
                                            totalPages={invoices?.totalPages || 0}
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
