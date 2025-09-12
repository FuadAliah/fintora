'use client';
import React, { useState } from 'react';
import { InvoicesTable } from '@/components/overview/invoices-table';
import PageHeader from '@/components/page-header';
import { AddInvoiceDrawer } from '@/components/invoices/add-invoice-drawer';

export default function Invoices() {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    return (
        <>
            <div className="mx-auto">
                <PageHeader pageTitle="Invoices">
                    <AddInvoiceDrawer />
                </PageHeader>
            </div>
            <div className="mx-auto">
                <InvoicesTable
                    title={title}
                    type={type}
                    category={category}
                    setTitle={setTitle}
                    setType={setType}
                    setCategory={setCategory}
                />
            </div>
        </>
    );
}
