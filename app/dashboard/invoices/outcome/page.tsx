'use client';
import React, { useEffect, useState } from 'react';
import { InvoicesTable } from '@/components/invoices/invoices-table';
import PageHeader from '@/components/page-header';
import { AddInvoiceDrawer } from '@/components/invoices/add-invoice-drawer';
import { Invoice } from '@/types';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export default function Invoices() {
    const { data: session } = useSession();

    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [data, setData] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    // const [itemToDelete, setItemToDelete] = useState<Invoice | null>(null);
    // const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
            });

            const res = await fetch(`/api/invoices?${query.toString()}`);

            const data = await res.json();
            setData(data.data || []);
            setTotalPages(data?.totalPages);
            setTotalCount(data.totalUsers || 0);
        } catch (err) {
            const message = err instanceof Error ? err?.message : String(err);
            toast.error(message, { duration: 4000, position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    const onPageSizeChange = (size: number) => {
        setPageSize(size);
    };

    const handleView = (invoice: Invoice) => {
        console.log('Viewing invoice:', invoice);
    };

    const handleDelete = (user: Invoice) => {
        console.log('Deleting user:', user);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!session) return;
        fetchInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize]);

    return (
        <>
            <PageHeader pageTitle="Invoices">
                <AddInvoiceDrawer />
            </PageHeader>

            <div className="mx-auto">
                <InvoicesTable
                    data={data}
                    loading={loading}
                    invoiceNumber={invoiceNumber}
                    setInvoiceNumber={setInvoiceNumber}

                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    handleView={handleView}
                    handleDelete={handleDelete}
                />
            </div>
        </>
    );
}
