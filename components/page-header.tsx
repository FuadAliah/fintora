export default function PageHeader({ children, pageTitle }: { pageTitle: string; children?: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center mt-4 mb-6">
            <h2 className="text-2xl lg:text-xl font-bold text-gray-900 dark:text-white">{pageTitle}</h2>
            {children}
        </div>
    );
}
