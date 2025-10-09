// export type User = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     image?: string;
//     tempPassword: string;
//     mobileNumber: string;
//     defaultLanguage: string;

//     createdAt: string;
//     updatedAt: string;
// };

export type Invoice = {
    id: string;
    invoiceNumber: string;
    englishName: string;
    arabicName: string;
    paymentType: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'OTHER';
    status: 'DRAFT' | 'ISSUED' | 'CANCELED';
    paymentStatus: 'UNPAID' | 'PAID' | 'PARTIALLY_PAID';
    subtotal: number;
    tax: number;
    total: number;
    description: string;
    createdBy: string;
    createdById: string;

    createdAt: string;
    updatedAt: string;
};

// old types
export type OverviewType = {
    month: string;
    expenses: number;
    income: number;
};

export type ChartOptions = {
    chart: { id: string };
    xaxis: { categories: string[] };
};

export type ChartSeries = {
    name: string;
    data: number[];
}[];

export type ChartData = {
    options: ChartOptions;
    series: ChartSeries;
};

export type InvoiceResponse = {
    data: Invoice[];
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
};

type SavingRate = {
    percentage: number;
    expenseRatio: number;
};

type PercentageChange = {
    income: number;
    expenses: number;
    balance: number;
};

type PreviousValues = {
    incomeAmount: number;
    expenseAmount: number;
    balanceAmount: number;
};

type Preset = {
    from: string;
    to: string;
    value: string;
    label: string;
};

export type Overview = {
    availableBalance: number;
    totalIncome: number;
    totalExpenses: number;
    invoiceCount: number;
    savingRate: SavingRate;
    percentageChange: PercentageChange;
    previousValues: PreviousValues;
    preset: Preset;
};

type chartData = {
    date: string;
    income: number;
    expenses: number;
};

export type OverviewResponse = {
    data: Overview;
    status: number;
    message: string;
};

type chart = {
    data: chartData[];
    preset: Preset;
};

export type OverviewChartResponse = {
    data: chart;
    status: number;
    message: string;
};
