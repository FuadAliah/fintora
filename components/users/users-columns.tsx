import { Column, User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Eye, KeyRound, Lock, Trash, Unlock } from 'lucide-react';
import { UserStatus } from '@prisma/client';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { Routes } from '@/utils/routes';

type UsersColumnsProps = {
    onActive: (id: string) => void;
    onDeactive: (id: string) => void;
    onResetPassword: (id: string) => void;
    onOpenDeleteDialog: (user: User) => void;
    session: string;
};

export function UsersColumns({ onActive, onDeactive, onResetPassword, onOpenDeleteDialog, session }: UsersColumnsProps): Column<User>[] {
    const router = useRouter();
    return [
        {
            accessor: 'firstName',
            header: 'First Name',
            cell: ({ row }: { row: User }) => <span>{row.firstName}</span>,
            sortable: true,
        },
        {
            accessor: 'lastName',
            header: 'Last Name',
            cell: ({ row }: { row: User }) => <span>{row.lastName}</span>,
            sortable: false,
        },
        {
            accessor: '',
            header: 'Dispaly Name',
            cell: ({ row }: { row: User }) => (
                <span>
                    {row.firstName} {row.lastName}
                </span>
            ),
            sortable: false,
        },
        {
            accessor: 'email',
            header: 'Email',
            cell: ({ row }: { row: User }) => <span>{row.email}</span>,
            sortable: false,
        },
        {
            accessor: 'status',
            header: 'Status',
            cell: ({ row }: { row: User }) => (
                <span
                    className={`capitalize text-xs rounded-full px-3 py-1
                    ${row.status === UserStatus.ACTIVE ? 'bg-green-100 text-green-600' : row.status === UserStatus.DEACTIVE ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}
                >
                    {row.status.toLowerCase()}
                </span>
            ),
            sortable: true,
        },
        {
            accessor: 'actions',
            header: 'Actions',
            cell: ({ row }: { row: User }) => (
                <div className="flex items-center gap-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => {
                                    router.push(`${Routes.USERS?.url}/${row.id}`);
                                }}
                                className={`${'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700'} w-[32px] h-[32px] transition-colors duration-300`}
                                size="icon"
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => (row.status === UserStatus.ACTIVE ? onDeactive(row.id) : onActive(row.id))}
                                disabled={row.id === session}
                                className={`${
                                    row.status === UserStatus.ACTIVE
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'
                                        : row.status === UserStatus.DEACTIVE
                                          ? 'bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700'
                                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700'
                                } w-[32px] h-[32px] transition-colors duration-300`}
                                size="icon"
                            >
                                {row.status === UserStatus.ACTIVE ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{row.status === UserStatus.ACTIVE ? 'Deactive' : 'Active'}</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onResetPassword(row.id)}
                                disabled={row.id === session}
                                className={`${'bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700'} w-[32px] h-[32px] transition-colors duration-300`}
                                size="icon"
                            >
                                <KeyRound className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Reset Password</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => onOpenDeleteDialog(row)}
                                disabled={row.id === session}
                                className={`${'bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'} w-[32px] h-[32px] transition-colors duration-300`}
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
            sortable: false,
        },
    ];
}
