'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';

type UsersFilterProps = {
    username: string;
    setUsername: (value: string) => void;
};

export function UsersFilter({ username, setUsername }: UsersFilterProps) {
    const onReset = () => {
        setUsername('');
    };
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Search..." value={username} onChange={(e) => setUsername(e.target.value)} className="max-w-sm" />
            {username && (
                <Button className="text-sm text-red-500 hover:text-red-600 flex items-center" variant="ghost" onClick={onReset}>
                    <XIcon className="h-5 w-5 !cursor-pointer" />
                    <span>Reset</span>
                </Button>
            )}
        </div>
    );
}
