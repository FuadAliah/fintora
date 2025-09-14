'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { DataTablePagination } from '../ui/pagination';
import { UsersFilter } from './users-filter';
import { UsersColumns } from './users-columns';
import { User } from '@/types/user';
import { toast } from 'sonner';

type UsersTableProps = {
    pageSizeParam?: number;
    isPagination?: boolean;
};

export function UsersTable({ pageSizeParam = 10, isPagination = true }: UsersTableProps) {
    const { data: session } = useSession();

    const [username, setUsername] = useState('');
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(pageSizeParam);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const onPageChange = (current: number) => {
        setCurrentPage(current);
    };

    const onPageSizeChange = (size: number) => {
        setPageSize(size);
    };
    const handleView = (user: User) => {
        console.log('Viewing user:', user);
    };

    const handleDelete = (user: User) => {
        console.log('Deleting user:', user);
    };

    const usersColumns = UsersColumns(handleView, handleDelete);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                ...(username && { firstName: username }),
            });

            const res = await fetch(`/api/users?${query.toString()}`);

            const data = await res.json();
            setData(data.data || []);
            setTotalPages(data?.totalPages);
            setTotalCount(data.totalUsers || 0);
        } catch (err) {
            const message = err instanceof Error ? err?.message : String(err);
            toast.error(message, { duration: 4000, position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!session) return;

        fetchUsers();
    }, [session, currentPage, pageSize, username]);

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
