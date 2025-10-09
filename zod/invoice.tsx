import z from 'zod';

export const InvoiceSchema = z.object({
    invoiceNumber: z.string().optional(),
    englishName: z.string().optional(),
    arabicName: z.string().optional(),
    paymentType: z.enum(['CASH', 'CARD', 'BANK_TRANSFER', 'OTHER']),
    status: z.enum(['DRAFT', 'ISSUED', 'CANCELED']),
    paymentStatus: z.enum(['UNPAID', 'PAID', 'PARTIALLY_PAID']),
    dueDate: z.date().optional(),
    issuedDate: z.date().optional(),
    subtotal: z.number().optional(),
    tax: z.number().optional(),
    total: z.number().optional(),
    description: z.string().optional(),
    createdById: z.string(),
    createdBy: z.string(),
});

export type InvoiceFormValues = z.infer<typeof InvoiceSchema>;
