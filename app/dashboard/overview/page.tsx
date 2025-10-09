'use client';

import React, { useEffect, useState } from 'react';
// import { InvoicesTable } from '@/components/overview/invoices-table';
// import { InvoicesOverview } from '@/components/overview/invoices-chart';
import { OverviewResponse } from '@/types';
import { DateRangeEnum } from '@/constant';
import DashboardStats from '@/components/overview/dashboard-statistics';
import OverviewHeader from '@/components/overview-header';

export default function Overview() {
    const [invoices, setInvoices] = useState<OverviewResponse | undefined>(undefined);
    const [preset, setPreset] = useState<string>(DateRangeEnum.LAST_30_DAYS);

    const fetchInvoices = async () => {
        // const overview = await fetchOverview(preset);
        // setInvoices(overview);
    };

    useEffect(() => {
        fetchInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="w-full">
                <div className="mx-auto">
                    <OverviewHeader preset={preset} setPreset={setPreset} />
                    <DashboardStats overview={invoices?.data} isLoading={!invoices?.data} />
                </div>
            </div>
            <div className="mx-auto mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* <InvoicesOverview preset={preset} /> */}
                    {/* <BalanceOverview /> */}
                    {/* <div className="lg:col-span-1">Breakdown</div> */}
                </div>
                {/* <InvoicesTable
                    pageSizeParam={5}
                    title=""
                    type=""
                    category=""
                    setTitle={() => {}}
                    setType={() => {}}
                    setCategory={() => {}}
                    recentInvoice={true}
                    isPagination={false}
                /> */}
            </div>
        </>
    );
}
