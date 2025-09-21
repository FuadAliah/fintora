import { Column, User } from '@/types/user';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { Ellipsis } from 'lucide-react';

export function UsersColumns(onView: (user: User) => void, onDelete: (user: User) => void): Column<User>[] {
    return [
        {
            accessor: 'firstName',
            header: 'First Name',
            cell: ({ row }: { row: User }) => <span>{row.firstName}</span>,
        },
        {
            accessor: 'lastName',
            header: 'Last Name',
            cell: ({ row }: { row: User }) => <span>{row.lastName}</span>,
        },
        {
            accessor: '',
            header: 'Dispaly Name',
            cell: ({ row }: { row: User }) => (
                <span>
                    {row.firstName} {row.lastName}
                </span>
            ),
        },
        {
            accessor: 'email',
            header: 'Email',
            cell: ({ row }: { row: User }) => <span>{row.email}</span>,
        },
        {
            accessor: 'isActive',
            header: 'Activated',
            cell: ({ row }: { row: User }) => (
                <span
                    className={`capitalize text-xs rounded-full px-3 py-1
                    ${row.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                >
                    {row.isActive ? 'Activated' : 'Not Active'}
                </span>
            ),
        },
        {
            accessor: 'actions',
            header: 'Actions',
            cell: ({ row }: { row: User }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Open actions menu">
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-auto" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => onView(row)} className="flex items-center gap-2 cursor-pointer">
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(row)} className="flex items-center gap-2 cursor-pointer">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
}
