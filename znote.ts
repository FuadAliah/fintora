export type customer = {
    customerType: 'personal' | 'corporate' | 'government';
    englishName: string;
    arabicName: string;
    mobileNumber: string;
    emailNotification: boolean;
    email?: string;
    ccEmail?: string;
    country: string;
    city: string;
    address: string;
    plotID: string;
    area: string;
    street: string;
    buildingNumber: string;
    postalCode: string;
    taxNumber: string;
    isActive: boolean;
    identificationType: 'passport' | 'nationalID' | 'driverLicense' | 'CRN';
    identificationNumber: string;
};

export type product = {
    EnglishName: string;
    arabicName: string;
    price: number;
    tax: number;
    description: string;
};

export type roles = {
    name: string;
    permissions: string[];
};

export type department = {
    name: string;
    manager: number;
    description: string;
    isActive: boolean;
};

export type user = {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    department: department;
    tempPassword: string;
    mobileNumber: string;
    defaultLanguage: 'en' | 'ar';
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
};

export type report = {
    customer: customer;
    type: 'income' | 'expense';
    from: Date;
    to: Date;
};

export type invoice = {
    invoiceNumber: string;
    paymentMethod: string;
    customer: customer;
    products: product[];
    type: 'income' | 'expense';
    paymentStatus: 'paid' | 'unpaid' | 'partiallyPaid';
    amount: number;
    tax: number;
    quantity: number[];
    total: number;
    date: Date;
    description: string;
};
