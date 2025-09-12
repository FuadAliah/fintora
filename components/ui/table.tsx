import * as React from 'react';
import { cn } from '@/lib/utils';
interface LoadingIndicatorProps {
    className?: string;
}

const TableLoadingIndicator = React.forwardRef<HTMLDivElement, LoadingIndicatorProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-center p-4 w-full', className)} {...props}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
));
TableLoadingIndicator.displayName = 'TableLoadingIndicator';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    loading?: boolean;
    empty?: React.ReactNode;
    columns?: number;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, loading, empty, columns = 1, children, ...props }, ref) => (
    <div className="w-full overflow-auto">
        <table ref={ref} className={cn('w-full caption-bottom text-sm rounded-lg', className)} {...props}>
            {loading ? (
                <tbody>
                    <tr>
                        <td colSpan={columns} className="p-8 text-center">
                            <TableLoadingIndicator className="w-full h-10" />
                        </td>
                    </tr>
                </tbody>
            ) : React.Children.count(children) > 0 ? (
                children
            ) : (
                <tr>
                    <td colSpan={columns} className="text-center text-muted-foreground p-8">
                        {empty || 'No data available'}
                    </td>
                </tr>
            )}
        </table>
    </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0 bg-white', className)} {...props} />
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
    )
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn('h-10 border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            className
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
        {...props}
    />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...props }, ref) => <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
);
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, TableLoadingIndicator };
