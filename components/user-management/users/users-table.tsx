'use client';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '../../ui/pagination';
import { UsersFilter } from './users-filter';
import { User } from '@/types/user';
import { UsersColumns } from './users-columns';

type UsersTableProps = {
    data: User[];
    loading: boolean;
    username: string;
    
    pageSize?: number;
    isPagination?: boolean;
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    setUsername: (username: string) => void;
    handleView: (user: User) => void;
    handleDelete: (user: User) => void;
};

export function UsersTable({
    pageSize = 10,
    isPagination = true,
    data,
    loading,
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    onPageSizeChange,
    username,
    setUsername,
    handleView,
    handleDelete,
}: UsersTableProps) {
    const usersColumns = UsersColumns(handleView, handleDelete);

    return (
        <Card className="border-0">
            <UsersFilter username={username} setUsername={setUsername} />
            <Table className="text-sm border" loading={loading}>
                <TableHeader className="bg-slate-100 rounded-t-2xl">
                    <TableRow>
                        {usersColumns.map((column) => (
                            <TableHead key={column.accessor}>
                                <span>{column.header}</span>
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
