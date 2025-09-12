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

export type Invoice = {
    id: string;
    title: string;
    category: string;
    type: string;
    amount: number | null;
    paymentMethod: string;
    userId: string;
    description: string;
    date: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type InvoiceResponse = {
    data: Invoice[];
    totalInvoices: number;
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
