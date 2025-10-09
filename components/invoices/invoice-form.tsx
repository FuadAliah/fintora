'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Invoice } from '@/types';
import { useSession } from 'next-auth/react';
import { InvoiceFormValues, InvoiceSchema } from '@/zod/invoice';
import { PAYMENT_METHODS } from '@/constant';
interface InvoiceFormProps {
    onSubmit: (data: InvoiceFormValues & { userId: string }) => void;
    defaultValues?: Partial<Invoice>;
}

export function InvoiceForm({ onSubmit, defaultValues }: InvoiceFormProps) {
    const { data: session } = useSession();

    const form = useForm<InvoiceFormValues>({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: {
            invoiceNumber: defaultValues?.invoiceNumber ?? '',
            englishName: defaultValues?.englishName ?? '',
            arabicName: defaultValues?.arabicName ?? '',
            paymentType: defaultValues?.paymentType ?? 'CASH',
            status: defaultValues?.status ?? 'DRAFT',
            paymentStatus: defaultValues?.paymentStatus ?? 'UNPAID',
            subtotal: defaultValues?.subtotal ?? 0,
            tax: defaultValues?.tax ?? 0,
            total: defaultValues?.total ?? 0,
            description: defaultValues?.description ?? '',
            createdById: session?.user?.id,
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = form;

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit({ ...data, userId: session?.user?.id ?? '' }))}
            className="flex flex-col gap-4 p-4 h-full"
        >
            {/* English Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="englishName">English Name</Label>
                <Input id="englishName" {...register('englishName')} placeholder="e.g. John" />
                {errors.englishName && <span className="text-xs text-red-500">{errors.englishName.message}</span>}
            </div>

            {/* Arabic Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="arabicName">Arabic Name</Label>
                <Input id="arabicName" {...register('arabicName')} placeholder="e.g. John" />
                {errors.arabicName && <span className="text-xs text-red-500">{errors.arabicName.message}</span>}
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="paymentType">Payment Method</Label>
                <Select onValueChange={(val) => setValue('paymentType', val as 'CASH')} defaultValue={watch('paymentType')}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        {PAYMENT_METHODS.map((paymentType) => (
                            <SelectItem key={paymentType.value} value={paymentType.value}>
                                {paymentType.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.paymentType && <p className="text-xs text-red-500">{errors.paymentType.message}</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description')} />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full mt-auto">
                Create
            </Button>
        </form>
    );
}
