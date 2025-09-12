import z from 'zod';

export const InvoiceSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, { message: "Please select a category." }),
    type: z.enum(['income', 'expense']),
    amount: z.number().positive('Amount must be positive'),
    paymentMethod: z.string().min(1, 'Payment method required'),
    description: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
    status: z.enum(['pending', 'completed', 'cancelled']),
});

export type InvoiceFormValues = z.infer<typeof InvoiceSchema>;
