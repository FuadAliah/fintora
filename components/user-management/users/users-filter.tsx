'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableLoadingIndicator } from '@/components/ui/table';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type UsersFilterProps = {
    username: string;
    setUsername: (value: string) => void;
};

export function UsersFilter({ username, setUsername }: UsersFilterProps) {
    const [localValue, setLocalValue] = useState<string>(username);
    const [loading, setLoading] = useState<boolean>(false);

    const onReset = () => {
        setLocalValue('');
    };

    useEffect(() => {
        if (localValue === '') {
            setUsername('');
            setLoading(false);
            return;
        }

        if (localValue.length < 3) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const delayDebounce = setTimeout(() => {
            setUsername(localValue);
            setLoading(false);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [localValue, setUsername]);

    return (
        <div className="flex items-center gap-2">
            <div className="relative max-w-sm w-full">
                <Input placeholder="Search..." value={localValue} onChange={(e) => setLocalValue(e.target.value)} className="bg-white" />

                {loading && (
                    <TableLoadingIndicator
                        className="absolute w-fit right-0 top-1/2 -translate-y-1/2 origin-center !border-gray-400"
                        size="w-4 h-4"
                    />
                )}
            </div>
            {localValue.length >= 3 && (
                <Button className="text-sm text-red-500 hover:text-red-600 flex items-center" variant="ghost" onClick={onReset}>
                    <XIcon className="h-5 w-5 !cursor-pointer" />
                    <span>Reset</span>
                </Button>
            )}
        </div>
    );
}
