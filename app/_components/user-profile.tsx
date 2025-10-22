'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AuthRoutes } from '@/utils/routes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserProfile() {
    const { data: session } = useSession();
    const router = useRouter();

    const firstLetters = (name: string) => {
        if (!name) {
            return '';
        }
        return name?.split(' ')[0].charAt(0) + name?.split(' ')[1].charAt(0);
    };

    console.log('session', session);

    if (session) {
        return (
            <div className="w-32 flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Avatar>
                            <AvatarImage
                                src={session?.user?.image ?? ''}
                                alt={session.user?.username ?? ''}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <AvatarFallback className="font-semibold">{firstLetters(session.user?.username ?? '')}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-1 mt-2 bg-white rounded-md" align="end">
                        <div className="px-2 pt-2">
                            <DropdownMenuLabel>{session.user?.username}</DropdownMenuLabel>
                            <DropdownMenuLabel className="text-sm text-gray-600">{session.user?.email}</DropdownMenuLabel>
                        </div>
                        <DropdownMenuGroup className="mt-2 flex flex-col text-sm w-full">
                            <DropdownMenuItem asChild className="w-full hover:bg-gray-50 p-2">
                                <Link className="w-full" href="/settings">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="w-full hover:bg-gray-50 p-2">
                                <Link className="w-full" href="/settings">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="p-2"
                                onSelect={(e) => {
                                    e.preventDefault();
                                    signOut({ callbackUrl: '/' });
                                }}
                            >
                                <Button className="w-full" size="sm" variant="destructive" type="button">
                                    <LogOutIcon />
                                    <span>Sign out</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    return (
        <Button variant="link" size="sm" onClick={() => router.push(AuthRoutes.LOGIN)}>
            Sign in
        </Button>
    );
}
