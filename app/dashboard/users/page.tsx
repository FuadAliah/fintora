import PageHeader from '@/components/page-header';
import { UsersTable } from '@/components/users/users-table';

export default function UsersPage() {
    return (
        <div>
            <PageHeader pageTitle="Users"></PageHeader>
            <UsersTable />
        </div>
    );
}
