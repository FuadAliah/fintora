export const MAX_IMPORT_LIMIT = 300;
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const CATEGORIES = [
    { value: 'groceries', label: 'Groceries' },
    { value: 'dining', label: 'Dining & Restaurants' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'travel', label: 'Travel' },
    { value: 'housing', label: 'Housing & Rent' },
    { value: 'income', label: 'Income' },
    { value: 'investments', label: 'Investments' },
    { value: 'other', label: 'Other' },
];

export const PAYMENT_METHODS_ENUM = {
    CARD: 'CARD',
    BANK_TRANSFER: 'BANK_TRANSFER',
    MOBILE_PAYMENT: 'MOBILE_PAYMENT',
    CASH: 'CASH',
    AUTO_DEBIT: 'AUTO_DEBIT',
    OTHER: 'OTHER',
} as const;

export const PAYMENT_METHODS = [
    { value: PAYMENT_METHODS_ENUM.CARD, label: 'Credit/Debit Card' },
    { value: PAYMENT_METHODS_ENUM.CASH, label: 'Cash' },
    { value: PAYMENT_METHODS_ENUM.BANK_TRANSFER, label: 'Bank Transfer' },
    { value: PAYMENT_METHODS_ENUM.MOBILE_PAYMENT, label: 'Mobile Payment' },
    { value: PAYMENT_METHODS_ENUM.AUTO_DEBIT, label: 'Auto Debit' },
    { value: PAYMENT_METHODS_ENUM.OTHER, label: 'Other' },
];

export const DateRangeEnum = {
    LAST_30_DAYS: 'last_30_days',
    LAST_MONTH: 'last_month',
    ALL_TIME: 'all_time',
} as const;

export const transactionChartData = {
    series: [
        {
            name: 'Expenses',
            data: [30, 40, 85],
        },
        {
            name: 'Income',
            data: [40, 55, 120],
        },
    ],
};
