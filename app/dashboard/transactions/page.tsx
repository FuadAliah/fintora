'use client';
import React, { useState } from 'react';
import { TransactionsTable } from '@/components/dashboard/overview/transactions-table';
import TransactionHeader from '@/components/transaction-header';

export default function Transactions() {
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    return (
        <>
            <div className="w-full bg-[var(--secondary-dark-color)]">
                <div className="max-w-[1248px] mx-auto">
                    <TransactionHeader />
                </div>
            </div>
            <div className="max-w-[1248px] mx-auto">
                <TransactionsTable
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
