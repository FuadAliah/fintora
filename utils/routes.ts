import { ChartPie, House, NotepadText, Package2, Settings, Users, UsersRound } from 'lucide-react';

export const Routes = {
    LOGIN: '/login',
    HOME: '/',

    // Dashboard
    OVERVIEW: { label: 'Overview', icon: House, url: '/dashboard/overview', children: null },
    USERMANAGE: { label: 'User Management', icon: Users, url: '/dashboard/user-management', children: [
        { label: 'Users', url: '/dashboard/user-management/users' },
        { label: 'Roles', url: '/dashboard/user-management/roles' },
        { label: 'Groups', url: '/dashboard/user-management/groups' },
    ] },
    CUSTOMERS: { label: 'Customers', icon: UsersRound, url: '/dashboard/customers', children: null },
    INVOICES: {
        label: 'Invoices',
        icon: NotepadText,
        url: '/dashboard/invoices',
        children: [{ label: 'Outcome', url: '/dashboard/invoices/outcome' }],
    },
    PRODUCTS: { label: 'Products', icon: Package2, url: '/dashboard/products', children: null },
    REPORTS: { label: 'Reports', icon: ChartPie, url: '/dashboard/reports', children: null },
    SETTINGS: { label: 'Settings', icon: Settings, url: '/dashboard/settings', children: null },
};

export const AuthRoutes = {
    LOGIN: '/login',
    RESET_PASSWORD: '/auth/reset-password',
};
