// import { useSummaryAnalyticsQuery } from "@/features/analytics/analyticsAPI";
import SummaryCard from "./summary-card";
// import { DateRangeType } from "@/components/date-range-select";

const DashboardStats = () => {
  const summaryData = {
    availableBalance: -107.89,
    totalIncome: 0,
    totalExpenses: 107.89,
    savingRate: {
      percentage: 0,
      expenseRatio: 0,
    },
    transactionCount: 2,
    percentageChange: {
      income: -100,
      expenses: -66.57,
      balance: -100,
      prevPeriodFrom: "2025-05-25T20:59:59.999Z",
      prevPeriodTo: "2025-06-23T20:59:59.999Z",
      previousValues: {
        incomeAmount: 2600,
        expenseAmount: 322.78,
        balanceAmount: 2277.22,
      },
    },
    preset: {
      from: "2025-06-24T20:59:59.999Z",
      to: "2025-07-23T20:59:59.999Z",
      value: "30days",
      label: "Last 30 Days",
    },
  };

  return (
    <div className="flex flex-row items-center pb-20">
      <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Available Balance"
          value={summaryData?.availableBalance}
          percentageChange={summaryData?.percentageChange?.balance}
          // isLoading={isFetching}
          cardType="balance"
        />
        <SummaryCard
          title="Total Income"
          value={summaryData?.totalIncome}
          percentageChange={summaryData?.percentageChange?.income}
          // isLoading={isFetching}
          cardType="income"
        />
        <SummaryCard
          title="Total Expenses"
          value={summaryData?.totalExpenses}
          percentageChange={summaryData?.percentageChange?.expenses}
          // isLoading={isFetching}
          cardType="expenses"
        />
        <SummaryCard
          title="Savings Rate"
          value={summaryData?.savingRate?.percentage}
          expenseRatio={summaryData?.savingRate?.expenseRatio}
          isPercentageValue
          // isLoading={isFetching}
          cardType="savings"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
