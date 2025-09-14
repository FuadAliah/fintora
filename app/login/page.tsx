'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Routes } from '@/utils/routes';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await signIn('credentials', { redirect: false, email, password });
        setIsLoading(false);

        if (res?.error) {
            setError('An error occurred during login. Please check your credentials and try again.');
            console.log('res=', res);
        }

        router.push(Routes.OVERVIEW.url);
    };

    // const handleGoogleLogin = async () => {
    //     try {
    //         await signIn('google', { callbackUrl: Routes.OVERVIEW.url });
    //     } catch (error) {
    //         console.error('GitHub login error:', error);
    //         setError('An error occurred during GitHub login. Please try again.');
    //     }
    // };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{error}</div>}

                <form onSubmit={handleCredentialsLogin}>
                    <Label className="block mb-1 text-sm font-medium">Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        placeholder="Enter your email"
                        required
                    />

                    <Label className="block mb-1 text-sm font-medium">Password</Label>
                    <Input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        placeholder="Enter your password"
                        required
                    />

                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign in
                    </Button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow h-px bg-gray-300" />
                </div>

                {/* <Button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-4 rounded hover:bg-gray-100 transition"
                >
                    Sign in with Google
                </Button> */}
            </div>
        </main>
    );
}
