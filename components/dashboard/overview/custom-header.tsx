'use client';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Routes } from '@/utils/routes';
import { useRouter } from 'next/navigation';

export const CustomHeader = () => {
    const router = useRouter();
    return (
        <CardHeader className="flex justify-between items-center px-0">
            <CardTitle className="font-semiBold">Recent Transactions</CardTitle>
            <Button variant="outline" onClick={() => router.push(Routes.TRANSACTIONS.url)}>
                View All
            </Button>
        </CardHeader>
    );
};
