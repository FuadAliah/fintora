'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserFormValues, UserSchema } from '@/zod/user';
import { handleGeneratePassword } from '@/utils/password-generate';
import { User } from '@/types/user';
import { Language } from '@prisma/client';

interface UserFormProps {
    onSubmit: (data: UserFormValues) => void;
    defaultValues?: User;
}

export function UserForm({ onSubmit, defaultValues }: UserFormProps) {
    const form = useForm<UserFormValues>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            firstName: defaultValues?.firstName ?? '',
            lastName: defaultValues?.lastName ?? '',
            email: defaultValues?.email ?? '',
            image: defaultValues?.image ?? '',
            mobileNumber: defaultValues?.mobileNumber ?? '',
            defaultLanguage: defaultValues?.defaultLanguage ?? Language.EN,
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <form onSubmit={handleSubmit((data) => onSubmit({ ...data }))} className="flex flex-col gap-4 p-4 h-full">
            {/* First Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input id="firstname" {...register('firstName')} placeholder="e.g. John" />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input id="lastname" placeholder="e.g. Doe" {...register('lastName')} />
                {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="e.g. email@example.com" {...register('email')} />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input id="mobileNumber" placeholder="e.g. 1234567890" {...register('mobileNumber')} />
                {errors.mobileNumber && <span className="text-xs text-red-500">{errors.mobileNumber.message}</span>}
            </div>

            {/* Temp Password */}
            <div className="flex flex-col gap-2">
                <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-col gap-2 flex-1 relative">
                        <Label htmlFor="tempPassword">Temp Password</Label>
                        <Input id="tempPassword" placeholder="e.g. Pa$$word123" {...register('tempPassword')} />
                    </div>
                    <Button
                        type="button"
                        variant="link"
                        className="text-primary absolute end-3 hover:no-underline hover:text-primary/70"
                        onClick={() => {
                            const generatedPass = handleGeneratePassword();
                            form.setValue('tempPassword', generatedPass);
                        }}
                    >
                        Generate
                    </Button>
                </div>
                {errors.tempPassword && <span className="text-xs text-red-500">{errors.tempPassword.message}</span>}
            </div>

            {/* Submit */}
            <div className="flex mt-auto">
                <Button type="submit" className="w-full">
                    Create User
                </Button>
            </div>
        </form>
    );
}
