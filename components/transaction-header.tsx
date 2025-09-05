import AddTransactionDrawer from './transactions/add-transaction-drawer';

export default function TransactionHeader() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-7 py-9">
            <div className="space-y-1">
                <h2 className="text-2xl lg:text-4xl font-bold text-white">All Transactions</h2>
                <p className="text-white/60 text-sm">Showing all transactions</p>
            </div>
            <div className="flex justify-end gap-4 mb-6">
                <AddTransactionDrawer />
            </div>
        </div>
    );
}
