import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './prisma';
import { AuthOptions } from 'next-auth';
import { compare } from 'bcryptjs';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const validPassword = await compare(credentials.password, user.passwordHash);
                if (!validPassword) return null;

                // ✅ if first login with temp password
                if (user.forcePasswordChange) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                        forcePasswordChange: true,
                    };
                }

                // ✅ if normal login
                if (!user.isActive) {
                    // auto-activate on first successful login
                    await prisma.user.update({ where: { id: user.id }, data: { isActive: true } });
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    forcePasswordChange: false,
                };
            },
        }),
    ],

    callbacks: {
        // async signIn({ user, profile }) {
        //     if (!user.email) return false;

        //     const existingUser = await prisma.user.findUnique({
        //         where: { email: user.email },
        //     });

        //     if (!existingUser) {
        //         await prisma.user.create({
        //             data: {
        //                 id: user.id,
        //                 firstName: profile?.given_name || '',
        //                 lastName: profile?.family_name || '',
        //                 email: user.email,
        //                 image: user.image,
        //                 role: 'user',
        //                 tempPassword: '',
        //                 mobileNumber: '',
        //                 defaultLanguage: 'en',
        //                 isActive: false,
        //             },
        //         });
        //     }

        //     return true;
        // },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.forcePasswordChange = user.forcePasswordChange;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.forcePasswordChange = token.forcePasswordChange as boolean;
                session.user.name = token.name as string; // 👈 add this
            }
            return session;
        },
    },

    pages: {
        signIn: '/login',
        error: '/auth/reset-password', // Redirecting to change-password page on error
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
