import GoogleProvider from 'next-auth/providers/google';
import prisma from './prisma';
import { AuthOptions } from 'next-auth';
import type { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, profile }) {
            if (!user.email) return false;

            const existingUser = await prisma.user.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        id: user.id,
                        firstName: profile?.given_name || '',
                        lastName: profile?.family_name || '',
                        email: user.email,
                        image: user.image,
                        role: 'user',
                        tempPassword: '',
                        mobileNumber: '',
                        defaultLanguage: 'en',
                        isActive: false,
                    },
                });
            }

            return true;
        },

        async jwt({ token, user }) {
            if (user?.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (dbUser) token.id = dbUser.id;
            }
            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

    pages: {
        signIn: '/login',
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
