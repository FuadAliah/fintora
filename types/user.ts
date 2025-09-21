export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    tempPassword: string;
    mobileNumber: string;
    defaultLanguage: string;
    isActive: boolean;

    createdAt: string;
    updatedAt: string;
};

export type Column<User> = {
    accessor?: keyof User | string;
    id?: string;
    header: string;
    cell: (props: { row: User }) => JSX.Element;
};
