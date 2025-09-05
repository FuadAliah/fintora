'use client';

import { CATEGORIES } from '@/constant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { TransactionsTableProps } from '../dashboard/overview/transactions-table';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';

export const FilterSection = ({ title, type, category, setTitle, setType, setCategory }: TransactionsTableProps) => {
    const onReset = () => {
        setTitle('');
        setType('');
        setCategory('');
    };

    return (
        <div className="flex items-center">
            <div className="flex items-center gap-4">
                <Input className="w-[320px]" placeholder="Search transaction" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {(title || type || category) && (
                    <Button className="text-sm text-red-500 hover:text-red-600 flex items-center" variant="ghost" onClick={onReset}>
                        <XIcon className="h-5 w-5 !cursor-pointer" />
                        <span>Reset</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
