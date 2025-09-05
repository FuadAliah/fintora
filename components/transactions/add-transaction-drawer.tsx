'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { TransactionForm } from './transaction-form';
import { TransactionFormValues } from '@/zod/transaction';

const AddTransactionDrawer = () => {
    const [open, setOpen] = useState(false);

    const onCloseDrawer = async (data: TransactionFormValues) => {
        try {
            const res = await fetch('/api/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) throw new Error('Failed to create transaction');

            const result = await res.json();
            console.log('✅ Transaction created:', result);

        } catch (err) {
            console.error('❌ Error creating transaction:', err);
        }
        setOpen(false);
    };

    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="!cursor-pointer !text-white">
                    <PlusIcon className="h-4 w-4" />
                    Add Transaction
                </Button>
            </DrawerTrigger>
            <DrawerContent className="!max-w-md overflow-hidden overflow-y-auto">
                <DrawerHeader className="relative">
                    <div>
                        <DrawerTitle className="text-xl font-semibold">Add Transaction</DrawerTitle>
                        <DrawerDescription>Add a new transaction to track your finances</DrawerDescription>
                    </div>
                    <DrawerClose className="absolute top-4 right-4">
                        <XIcon className="h-5 w-5 !cursor-pointer" />
                    </DrawerClose>
                </DrawerHeader>
                <TransactionForm onSubmit={onCloseDrawer} />
            </DrawerContent>
        </Drawer>
    );
};

export default AddTransactionDrawer;
