'use client';

import React, { useEffect, useState } from 'react';
import DashboardHeader from '@/components/overview-header';
import DashboardStats from '@/components/dashboard/dashboard-stats';
import { TransactionsTable } from '@/components/dashboard/overview/transactions-table';
import { TransactionsOverview } from '@/components/dashboard/overview/transactions-overview';
import { OverviewResponse } from '@/types';
import { fetchOverview } from '@/api/overview';
import { DateRangeEnum } from '@/constant';

export default function Overview() {
    const [transactions, setTransactions] = useState<OverviewResponse | undefined>(undefined);
    const [preset, setPreset] = useState<string>(DateRangeEnum.LAST_30_DAYS);

    const fetchTransactions = async () => {
        const overview = await fetchOverview(preset);
        setTransactions(overview);
    };

    useEffect(() => {
        fetchTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preset]);

    return (
        <>
            <div className="w-full bg-[var(--secondary-dark-color)]">
                <div className="max-w-[1248px] mx-auto">
                    <DashboardHeader preset={preset} setPreset={setPreset} />
                    <DashboardStats overview={transactions?.data} isLoading={!transactions?.data} />
                </div>
            </div>
            <div className="max-w-[1248px] mx-auto mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <TransactionsOverview preset={preset} />
                    {/* <BalanceOverview /> */}
                    <div className="lg:col-span-1">Breakdown</div>
                </div>
                <TransactionsTable
                    pageSizeParam={5}
                    title=""
                    type=""
                    category=""
                    setTitle={() => {}}
                    setType={() => {}}
                    setCategory={() => {}}
                    recentTransaction={true}
                    isPagination={false}
                />
            </div>
        </>
    );
}
