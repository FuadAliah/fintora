import prisma from '@/lib/prisma';

export default async function UserPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return (
        <div>
            <h1>{user.firstName}</h1>
            <p>{user.email}</p>
        </div>
    );
}
