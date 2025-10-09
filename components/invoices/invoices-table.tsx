'use client';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Invoice } from '@/types';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '../ui/pagination';
import { InvoicesColumns } from './invoices-columns';
import { InvoicesFilter } from './invoices-filter';

export type InvoicesTableProps = {
    data: Invoice[];
    loading: boolean;
    invoiceNumber: string;
    pageSize?: number;
    isPagination?: boolean;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    setInvoiceNumber: (invNumber: string) => void;
    handleView: (invoice: Invoice) => void;
    handleDelete: (invoice: Invoice) => void;
};

export function InvoicesTable({
    data,
    loading,
    invoiceNumber,
    pageSize = 10,
    isPagination,
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    onPageSizeChange,
    setInvoiceNumber,
    handleView,
    handleDelete,
}: InvoicesTableProps) {
    const invoicesColumns = InvoicesColumns(handleView, handleDelete);

    return (
        <>
            <Card className="border-0">
                <InvoicesFilter invoiceNumber={invoiceNumber} setInvoiceNumber={setInvoiceNumber} />
                <Table className="text-sm border" loading={loading}>
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
                        {data.length ? (
                            data.map((inv: Invoice) => (
                                <TableRow key={inv.id}>
                                    {invoicesColumns.map((col) => (
                                        <TableCell key={col.accessor}>{col.cell({ row: inv })}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="h-32">
                                <TableCell className="text-center text-muted-foreground" colSpan={invoicesColumns.length}>
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        {isPagination && (
                            <TableRow>
                                <TableCell className="py-3" colSpan={invoicesColumns.length}>
                                    <DataTablePagination
                                        pageNumber={currentPage}
                                        pageSize={pageSize}
                                        totalCount={totalCount}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                        onPageSizeChange={onPageSizeChange}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </Card>
        </>
    );
}
