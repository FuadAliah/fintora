'use client';
import { useCallback, useEffect, useState } from 'react';
import { AddUserDrawer } from '@/components/user-management/users/add-user-drawer';
import PageHeader from '@/components/page-header';
import { UsersTable } from '@/components/user-management/users/users-table';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { UserFormValues } from '@/zod/user';
import { UserStatus } from '@prisma/client';
import { DeleteDialog } from '@/components/user-management/users/delete-dialog';

export type SortType = string;
export type OrderType = 'asc' | 'desc';

export default function UsersPage() {
    const { data: session, status } = useSession();

    const [username, setUsername] = useState('');
    const [data, setData] = useState<User[]>([]);

    const [sort, setSort] = useState<SortType>('createdAt');
    const [order, setOrder] = useState<OrderType>('asc');

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [selectedUserToDelete, setSelectedUserToDelete] = useState<User>();

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

    const updateUserStatus = async (id: string, status: UserStatus) => {
        try {
            const res = await fetch(`/api/users/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error('Failed to update user status');

            toast.success(`User ${status === UserStatus.ACTIVE ? 'Activated' : 'Deactivated'} successfully`, {
                duration: 4000,
                position: 'top-center',
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            toast.error(message, { duration: 4000, position: 'top-center' });
        } finally {
            fetchUsers();
        }
    };

    const resetUserPassword = async (id: string) => {
        try {
            const res = await fetch(`/api/users/${id}/reset-password`, {
                method: 'PATCH',
                body: JSON.stringify({
                    forcePasswordChange: true,
                }),
            });

            if (!res.ok) throw new Error('Failed to delete user');

            toast.success('User Reset password successfully', { duration: 4000, position: 'top-center' });
        } catch (error) {
            const message = error instanceof Error ? error?.message : String(error);
            toast.error(message, { duration: 4000, position: 'top-center' });
        } finally {
            fetchUsers();
        }
    };

    const onSort = (field: SortType) => {
        if (sort === field) {
            setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSort(field);
            setOrder('asc');
        }
    };

    const onCloseDrawer = async (data: UserFormValues) => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data }),
            });

            if (!res.ok) throw new Error(res.statusText);

            toast.success('User created successfully', { duration: 4000, position: 'top-center' });
        } catch (err) {
            const message = err instanceof Error ? err?.message : String(err);
            toast.error(message, { duration: 4000, position: 'top-center' });
        }
        setOpenAddDrawer(false);
        fetchUsers();
    };

    const onOpenDeleteDialog = (user: User) => {
        setSelectedUserToDelete(user);
        setOpenDeleteDialog(true);
    };

    const onDeleteUser = async (id: string) => {
        try {
            const res = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete user');

            toast.success('User deleted successfully', { duration: 4000, position: 'top-center' });
        } catch (error) {
            const message = error instanceof Error ? error?.message : String(error);
            toast.error(message, { duration: 4000, position: 'top-center' });
        } finally {
            fetchUsers();
            setOpenDeleteDialog(false);
        }
    };

    const fetchUsers = useCallback(async () => {
        try {
            const query = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: pageSize.toString(),
                sort,
                order,
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
        }
    }, [currentPage, pageSize, username, sort, order]);

    useEffect(() => {
        if (!session) return;
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, currentPage, pageSize, username, sort, order]);

    return (
        <div>
            {selectedUserToDelete && (
                <DeleteDialog
                    open={openDeleteDialog}
                    setOpen={setOpenDeleteDialog}
                    onDelete={() => onDeleteUser(selectedUserToDelete?.id)}
                    user={selectedUserToDelete}
                />
            )}
            <PageHeader pageTitle="Users">
                <AddUserDrawer onCloseDrawer={onCloseDrawer} openAddDrawer={openAddDrawer} setOpenAddDrawer={setOpenAddDrawer} />
            </PageHeader>

            <UsersTable
                data={data}
                session={session?.user?.id || ''}
                loading={status === 'loading' ? true : false}
                username={username}
                setUsername={setUsername}
                onActive={(id) => updateUserStatus(id, UserStatus.ACTIVE)}
                onDeactive={(id) => updateUserStatus(id, UserStatus.DEACTIVE)}
                onDeleteUser={(id) => onDeleteUser(id)}
                onOpenDeleteDialog={onOpenDeleteDialog}
                onResetPassword={resetUserPassword}
                onPageSizeChange={onPageSizeChange}
                onPageChange={onPageChange}
                sort={sort}
                order={order}
                onSort={onSort}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
            />
        </div>
    );
}
