import { Language, UserStatus } from '@prisma/client';

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    tempPassword: string;
    mobileNumber: string;
    defaultLanguage: Language;
    status: UserStatus;

    createdAt: string;
    updatedAt: string;
};

export type Column<User> = {
    accessor?: keyof User | string;
    id?: string;
    header: string;
    sortable: boolean;
    cell: (props: { row: User }) => JSX.Element;
};
