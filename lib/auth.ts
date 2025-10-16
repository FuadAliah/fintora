import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import { AuthOptions } from 'next-auth';
import { compare } from 'bcryptjs';
import { UserStatus } from '@prisma/client';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email } });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const validPassword = await compare(credentials.password, user.passwordHash);
                if (!validPassword) return null;

                if (user.status === UserStatus.DEACTIVE) {
                    throw new Error('User is Deactivated');
                }

                // ✅ if normal login
                if (user.status === UserStatus.PENDING) {
                    await prisma.user.update({ where: { id: user.id }, data: { status: UserStatus.ACTIVE } });
                }

                if (user.forcePasswordChange) {
                    return {
                        id: user.id,
                        email: user.email,
                        username: `${user.firstName} ${user.lastName}`,
                        forcePasswordChange: true,
                        status: user.status,
                    };
                }

                // normal login => set the user object in jwt -> user
                return {
                    id: user.id,
                    email: user.email,
                    username: `${user.firstName} ${user.lastName}`,
                    forcePasswordChange: false,
                    status: user.status,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.forcePasswordChange = user.forcePasswordChange;
                token.status = user.status;
            }

            if (token?.id) {
                const dbUser = await prisma.user.findUnique({ where: { id: token.id } });

                if (!dbUser || dbUser.status === UserStatus.DEACTIVE) {
                    token.id = undefined;
                    token.email = undefined;
                    token.username = undefined;
                    token.forcePasswordChange = undefined;
                    token.status = UserStatus.DEACTIVE;
                } else {
                    token.email = dbUser.email;
                    token.username = `${dbUser.firstName} ${dbUser.lastName}`;
                    token.forcePasswordChange = dbUser.forcePasswordChange;
                    token.status = dbUser.status;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (!token?.id) {
                session.user = undefined;
                return session;
            }

            session.user = {
                id: token.id,
                email: token.email ?? '',
                username: token.username ?? '',
                forcePasswordChange: token.forcePasswordChange ?? false,
                status: token.status ?? '',
            };

            return session;
        },
    },

    pages: {
        signIn: '/auth/login',
        error: '/auth/reset-password',
    },

    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 3,
        updateAge: 60 * 60 * 3, // its update session if user make action within session time
    },

    jwt: {
        maxAge: 60 * 60 * 3,
    },
};
