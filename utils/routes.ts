import { Users } from 'lucide-react';

export const Routes = {
    // Dashboard
    USERS: { label: 'Users', icon: Users, url: '/admin/users', side: true, role: ['Role.ADMIN'] },
};

export const AuthRoutes = {
    HOME: '/',
    LOGIN: '/auth/login',
    RESET_PASSWORD: '/auth/reset-password',
    FORBIDDEN: '/auth/forbidden',
};
