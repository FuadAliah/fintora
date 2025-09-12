'use client';
import { Input } from '@/components/ui/input';

type UsersFilterProps = {
    username: string;
    setUsername: (value: string) => void;
};

export function UsersFilter({ username, setUsername }: UsersFilterProps) {
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Search..." value={username} onChange={(e) => setUsername(e.target.value)} className="max-w-sm" />
        </div>
    );
}
