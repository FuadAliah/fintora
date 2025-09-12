import { ChartPie, House, NotepadText, Package2, Settings, Users, UsersRound } from 'lucide-react';

export const Routes = {
    LOGIN: '/login',
    HOME: '/',

    // Dashboard
    OVERVIEW: { label: 'Overview', icon: House, url: '/dashboard/overview' },
    USERMANAGE: { label: 'User Management', icon: Users, url: '/dashboard/users' },
    CUSTOMERS: { label: 'Customers', icon: UsersRound, url: '/dashboard/customers' },
    INVOICES: { label: 'Invoices', icon: NotepadText, url: '/dashboard/invoices' },
    PRODUCTS: { label: 'Products', icon: Package2, url: '/dashboard/products' },
    REPORTS: { label: 'Reports', icon: ChartPie, url: '/dashboard/reports' },
    SETTINGS: { label: 'Settings', icon: Settings, url: '/dashboard/settings' },
};
