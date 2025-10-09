import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user?: {
            id: string;
            username: string;
            forcePasswordChange: boolean;
            status: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        email: string;
        username: string;
        forcePasswordChange: boolean;
        status: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        email?: string;
        username?: string;
        forcePasswordChange?: boolean;
        status?: string;
    }
}
