import SummaryCard from './summary-card';
import { Overview } from '@/types';

type DashboardStatsProps = {
    overview: Overview | undefined;
    isLoading: boolean;
};

const DashboardStats = ({ overview, isLoading }: DashboardStatsProps) => {
    return (
        <div className="flex-1 lg:flex-[1] grid grid-cols-1 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Available Balance"
                value={overview?.availableBalance}
                preset={overview?.preset}
                // isLoading={isLoading}
                percentageChange={overview?.percentageChange?.balance}
                cardType="balance"
                bgColor="bg-cards-1"
            />
            <SummaryCard
                title="Total Income"
                value={overview?.totalIncome}
                preset={overview?.preset}
                // isLoading={isLoading}
                percentageChange={overview?.percentageChange?.income}
                cardType="income"
                bgColor="bg-cards-2"
            />
            <SummaryCard
                title="Total Expenses"
                value={overview?.totalExpenses}
                preset={overview?.preset}
                // isLoading={isLoading}
                percentageChange={overview?.percentageChange?.expenses}
                cardType="expenses"
                bgColor="bg-cards-3"
            />
            <SummaryCard
                title="Savings Rate"
                value={overview?.savingRate?.percentage}
                preset={overview?.preset}
                expenseRatio={overview?.savingRate?.expenseRatio}
                // isLoading={isLoading}
                isPercentageValue={true}
                cardType="savings"
                bgColor="bg-cards-4"
            />
        </div>
    );
};

export default DashboardStats;
