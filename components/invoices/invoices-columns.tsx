import { Invoice } from '@/types';
import { Ellipsis, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import moment from 'moment';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const InvoicesColumns = (handleView: (invoice: Invoice) => void, handleDelete: (invoice: Invoice) => void) => [
    {
        header: 'Invoice Date',
        accessor: 'date',
        cell: ({ row }: { row: Invoice }) => moment(row.date).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        header: 'Title',
        accessor: 'title',
        cell: ({ row }: { row: Invoice }) => row.title,
        sortable: true,
    },
    {
        header: 'Category',
        accessor: 'category',
        cell: ({ row }: { row: Invoice }) => row.category,
    },
    {
        header: 'Amount',
        accessor: 'amount',
        cell: ({ row }: { row: Invoice }) =>
            row.type === 'income' ? (
                <div className="text-green-500 flex items-center gap-2">
                    <TrendingUpIcon size={16} />
                    <span>${Number(row.amount).toFixed(2)}</span>
                </div>
            ) : (
                <div className="text-red-500 flex items-center gap-2">
                    <TrendingDownIcon size={16} />
                    <span>${Number(row.amount).toFixed(2)}</span>
                </div>
            ),
        sortable: true,
    },
    {
        header: 'Type',
        accessor: 'type',
        cell: ({ row }: { row: Invoice }) => (
            <span
                className={`capitalize text-xs rounded-full px-3 py-1
          ${row.type === 'income' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}
            >
                {row.type}
            </span>
        ),
        sortable: true,
    },
    {
        header: 'Description',
        accessor: 'description',
        cell: ({ row }: { row: Invoice }) => row.description,
    },
    {
        header: 'Actions',
        accessor: 'actions',
        cell: ({ row }: { row: Invoice }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open actions menu">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto" align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleView(row)} className="flex items-center gap-2 cursor-pointer">
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(row)} className="flex items-center gap-2 cursor-pointer">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
