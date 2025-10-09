'use client';
import { useSession } from 'next-auth/react';
import { AddInvoiceDrawer } from './invoices/add-invoice-drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { DateRangeEnum } from '@/constant';

const ranges = [
    { value: DateRangeEnum.LAST_30_DAYS, label: 'Last 30 Days' },
    { value: DateRangeEnum.LAST_MONTH, label: 'Last Month' },
    { value: DateRangeEnum.ALL_TIME, label: 'All Time' },
];

type DashboardHeaderProps = {
    preset: string;
    setPreset: (value: string) => void;
};

export default function OverviewHeader({ preset, setPreset }: DashboardHeaderProps) {
    const { data: session } = useSession();
    const currentLabel = ranges.find((r) => r.value === preset)?.label;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between mt-4 mb-6">
            <div className="space-y-1">
                <h2 className="text-2xl lg:text-xl font-bold">Welcome, {session?.user?.name ?? 'Guest'}</h2>
            </div>
            <div className="flex justify-end gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <span>{currentLabel}</span>
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {ranges.map((item) => (
                            <DropdownMenuItem key={item.value} onClick={() => setPreset(item.value)}>
                                {item.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
