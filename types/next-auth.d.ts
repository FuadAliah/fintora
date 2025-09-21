import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            username: string;
            forcePasswordChange: boolean;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
        forcePasswordChange: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
    }
}
