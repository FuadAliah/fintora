'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Routes } from '@/utils/routes';

export default function ChangePasswordPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!session?.user?.email) {
            setError('No user session found.');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                    newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to change password.');
                setLoading(false);
                return;
            }

            await signIn('credentials', {
                redirect: true,
                email: session.user.email,
                password: newPassword,
                callbackUrl: Routes.LOGIN,
            });
            setLoading(false);
        } catch (err) {
            setError(`Unexpected error ${err}`);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-xl font-bold mb-4">Change Your Password</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <label className="block mb-2">
                    New Password
                    <Input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>

                <label className="block mb-4">
                    Confirm Password
                    <Input
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
}
