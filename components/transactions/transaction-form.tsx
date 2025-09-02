'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Transaction } from '@/types';
import { useSession } from 'next-auth/react';
import { TransactionFormValues, TransactionSchema } from '@/zod/transaction';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CATEGORIES, PAYMENT_METHODS } from '@/constant';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
interface TransactionFormProps {
    onSubmit: (data: TransactionFormValues & { userId: string | undefined }) => void;
    defaultValues?: Partial<Transaction>;
}

export function TransactionForm({ onSubmit, defaultValues }: TransactionFormProps) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date>(defaultValues?.date ? moment(defaultValues.date).toDate() : moment().toDate());

    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(TransactionSchema),
        defaultValues: {
            title: defaultValues?.title ?? '',
            category: defaultValues?.category ?? '',
            type: (defaultValues?.type as 'income' | 'expense') ?? 'income',
            amount: defaultValues?.amount ?? undefined,
            paymentMethod: defaultValues?.paymentMethod ?? '',
            description: defaultValues?.description ?? '',
            date: defaultValues?.date ? moment(defaultValues.date).utc(true).toISOString() : moment().utc(true).toISOString(),
            status: (defaultValues?.status as 'pending' | 'completed' | 'cancelled') ?? 'pending',
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = form;
    const selected = watch('paymentMethod');
    console.log('selected', selected);

    return (
        <form onSubmit={handleSubmit((data) => onSubmit({ ...data, userId: session?.user?.id }))} className="space-y-4 px-4 mt-6">
            {/* Type */}
            <div className="flex flex-col gap-2">
                <Label>Transaction Type</Label>
                <RadioGroup
                    className="flex items-center !justify-between gap-4"
                    onValueChange={(val: string) => setValue('type', val as 'income' | 'expense')}
                    defaultValue={watch('type')}
                >
                    <div
                        className={`flex items-center gap-2 w-full border rounded-md px-5 py-3 cursor-pointer hover:bg-slate-100
                    ${watch('type') === 'income' ? 'bg-slate-100 border-purple-500 transition-colors' : ''}`}
                        onClick={() => setValue('type', 'income')}
                    >
                        <RadioGroupItem value="income" id="income" />
                        <Label htmlFor="income" className="cursor-pointer w-full">
                            Income
                        </Label>
                    </div>

                    <div
                        className={`flex items-center gap-2 w-full border rounded-md px-5 py-3 cursor-pointer hover:bg-slate-100 ${
                            watch('type') === 'expense' ? 'bg-slate-100 border-purple-500 transition-colors' : ''
                        }`}
                        onClick={() => setValue('type', 'expense')}
                    >
                        <RadioGroupItem value="expense" id="expense" />
                        <Label htmlFor="expense" className="cursor-pointer w-full">
                            Expense
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} placeholder="e.g. Salary" />
                {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" step="0.500" placeholder="$0.00" {...register('amount', { valueAsNumber: true })} />
                {errors.amount && <span className="text-xs text-red-500">{errors.amount.message}</span>}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select onValueChange={(val) => setValue('category', val as string)} defaultValue={watch('category')}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            {/* Date with moment */}
            <div className="flex flex-col gap-2">
                <Label>Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date" className="w-full justify-between font-normal">
                            {date ? moment(date).format('DD MMM YYYY') : 'Select date'}
                            <CalendarIcon className="h-4 w-4 opacity-60" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date ? moment(date).toDate() : undefined}
                            captionLayout="dropdown"
                            onSelect={(selectedDate) => {
                                if (selectedDate) {
                                    setDate(selectedDate);
                                    setValue('date', selectedDate.toISOString());
                                }
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select onValueChange={(val) => setValue('paymentMethod', val as string)} defaultValue={watch('paymentMethod')}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        {PAYMENT_METHODS.map((paymentMethod) => (
                            <SelectItem key={paymentMethod.value} value={paymentMethod.value}>
                                {paymentMethod.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.paymentMethod && <p className="text-xs text-red-500">{errors.paymentMethod.message}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
                Create
            </Button>
        </form>
    );
}
