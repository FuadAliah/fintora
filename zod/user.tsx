import z from 'zod';

export const UserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Email is invalid'),
    image: z.string().optional(),
    mobileNumber: z.string().min(1, 'Mobile number is required'),
    tempPassword: z.string().min(12, 'Password is required'),
    defaultLanguage: z.string().optional(),
});

export type UserFormValues = z.infer<typeof UserSchema>;
