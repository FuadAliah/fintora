'use client';
import { useCallback, useEffect, useState } from 'react';
import { AddUserDrawer } from '@/components/user-management/users/add-user-drawer';
import PageHeader from '@/components/page-header';
import { UsersTable } from '@/components/user-management/users/users-table';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { UserFormValues } from '@/zod/user';

export default function UsersPage() {
    const { data: session, status } = useSession();

    const [username, setUsername] = useState('');
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [openAddDrawer, setOpenAddDrawer] = useState(false);

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

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                ...(username && { firstName: username }),
            });

            const res = await fetch(`/api/users?${query.toString()}`);
            if (!res.ok) throw new Error('Failed to fetch users');

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
    }, [currentPage, pageSize, username]);

    const onCloseDrawer = async (data: UserFormValues) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) throw new Error('Failed to create user');

            toast.success('User created successfully', { duration: 4000, position: 'top-center' });
        } catch (err) {
            const message = err instanceof Error ? err?.message : String(err);
            toast.error(message, { duration: 4000, position: 'top-center' });
        }
        setOpenAddDrawer(false);
        fetchUsers()
    };

    useEffect(() => {
        if (!session) return;

        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize, username]);

    if (status === 'loading') return <div>Loading...</div>;

    return (
        <div>
            <PageHeader pageTitle="Users">
                <AddUserDrawer onCloseDrawer={onCloseDrawer} openAddDrawer={openAddDrawer} setOpenAddDrawer={setOpenAddDrawer} />
            </PageHeader>

            <UsersTable
                data={data}
                loading={loading}
                username={username}
                setUsername={setUsername}
                onPageSizeChange={onPageSizeChange}
                onPageChange={onPageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                handleView={handleView}
                handleDelete={handleDelete}
            />
        </div>
    );
}
