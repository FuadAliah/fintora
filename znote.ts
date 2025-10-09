export type address = {
    id: string;
    country: string;
    city: string;
    street: string;
    buildingNumber?: string;
    area?: string;
    plotID?: string;
    postalCode?: string;
};

export type customer = {
    id: string;
    customerType: 'personal' | 'corporate' | 'government';
    englishName: string;
    arabicName: string;
    mobileNumber: string;
    emailNotification: boolean;
    email: string;
    ccEmail: string;
    taxNumber: string;
    isActive: boolean;

    identificationType: 'passport' | 'nationalID' | 'driverLicense' | 'CRN';
    identificationNumber: string;

    addresses: address[]; // One-to-Many
    contactPerson?: string; // للشركات والحكومات
};

export type category = {
    id: string;
    name: string;
    description?: string;
};

export type product = {
    id: string;
    englishName: string;
    arabicName: string;
    basePrice: number;
    taxRate: number;
    description?: string;
    category?: category;
    isActive: boolean;
};

export type productPricing = {
    id: string;
    productId: string;
    price: number;
    startDate: Date;
    endDate?: Date;
};

export type department = {
    id: string;
    name: string;
    description?: string;
    managerId?: string; // بدل تخزين رقم عادي، نخليه إشارة لـ user
    isActive: boolean;
};

export type user = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    departmentId: string;
    role: 'admin' | 'accountant' | 'sales' | 'viewer' | 'user';
    tempPassword?: string;
    mobileNumber: string;
    defaultLanguage: 'en' | 'ar';
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
};

export type invoice = {
    id: string;
    invoiceNumber: string;
    customerId: string;
    createdBy: string; // userId

    type: 'income' | 'expense';
    status: 'draft' | 'issued' | 'canceled';
    paymentStatus: 'paid' | 'unpaid' | 'partiallyPaid';

    issueDate: Date;
    dueDate?: Date;
    description?: string;

    items: invoiceItem[]; // العلاقة مع المنتجات عبر جدول وسيط
    payments: payment[]; // العلاقة مع الدفعات
};

export type invoiceItem = {
    id: string;
    invoiceId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    totalLineAmount: number; // (quantity * unitPrice) + tax
};

export type payment = {
    id: string;
    invoiceId: string;
    method: 'cash' | 'creditCard' | 'bankTransfer' | 'other';
    details?: string;
    amount: number;
    date: Date;
    referenceNumber?: string; // transactionId from bank or bank account
};

export type report = {
    id: string;
    type: 'income' | 'expense' | 'summary';
    from: Date;
    to: Date;
    customerId?: string;
    departmentId?: string;
    createdBy: string; // userId
};
