'use client';
import { FilterSection } from '@/components/transactions/filter-section';
import { CardHeader } from '@/components/ui/card';
import { TransactionsTableProps } from './transactions-table';

export const CustomHeader = ({ title, type, category, setTitle, setType, setCategory }: TransactionsTableProps) => {
 
    return (
        <CardHeader className="flex justify-between items-center px-0">
            <div className="flex flex-col gap-8">
                <FilterSection title={title} type={type} category={category} setTitle={setTitle} setType={setType} setCategory={setCategory} />
            </div>
        </CardHeader>
    );
};
