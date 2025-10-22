'use client';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '@/components/ui/pagination';
import { UsersFilter } from './users-filter';
import { User } from '@/types/user';
import { UsersColumns } from './users-columns';
import { OrderType, SortType } from '@/app/admin/users/page';
import { ChevronDown } from 'lucide-react';

type UsersTableProps = {
    data: User[];
    loading: boolean;
    username: string;
    setUsername: (username: string) => void;

    onActive: (id: string) => void;
    onDeactive: (id: string) => void;
    onResetPassword: (id: string) => void;
    onDeleteUser: (id: string) => void;
    onOpenDeleteDialog: (user: User) => void;

    sort: SortType;
    order: OrderType;
    onSort: (field: SortType) => void;

    pageSize?: number;
    isPagination?: boolean;
    currentPage: number;
    totalPages: number;
    totalCount: number;

    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;

    session: string;
};

export function UsersTable({
    pageSize = 10,
    isPagination = true,
    data,
    loading,
    username,
    setUsername,
    onActive,
    onDeactive,
    onResetPassword,
    onOpenDeleteDialog,
    sort,
    order,
    onSort,
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    onPageSizeChange,
    session,
}: UsersTableProps) {
    const usersColumns = UsersColumns({ onActive, onDeactive, onResetPassword, onOpenDeleteDialog, session });

    return (
        <Card className="border-0 bg-transparent shadow-none p-0">
            <UsersFilter username={username} setUsername={setUsername} />
            <Table className="text-sm border" loading={loading}>
                <TableHeader>
                    <TableRow>
                        {usersColumns.map((column) => (
                            <TableHead key={column.accessor}>
                                {column.sortable ? (
                                    <button className="flex items-center gap-1" onClick={() => onSort(column.accessor as SortType)}>
                                        <span>{column.header}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 ${sort === column.accessor && order === 'asc' ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <span>{column.header}</span>
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length ? (
                        data.map((user: User) => (
                            <TableRow key={user.id}>
                                {usersColumns.map((col) => (
                                    <TableCell key={col.accessor}>{col.cell({ row: user })}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow className="h-32">
                            <TableCell className="text-center text-muted-foreground" colSpan={usersColumns.length}>
                                No users found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

                <TableFooter>
                    {isPagination && (
                        <TableRow>
                            <TableCell className="py-3" colSpan={usersColumns.length}>
                                <DataTablePagination
                                    pageNumber={currentPage}
                                    pageSize={pageSize}
                                    totalCount={totalCount}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                    onPageSizeChange={onPageSizeChange}
                                />
                            </TableCell>
                        </TableRow>
                    )}
                </TableFooter>
            </Table>
        </Card>
    );
}
