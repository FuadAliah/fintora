import { Invoice } from '@/types';
import { Ellipsis } from 'lucide-react';
import moment from 'moment';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const InvoicesColumns = (handleView: (invoice: Invoice) => void, handleDelete: (invoice: Invoice) => void) => [
    {
        header: 'Invoice Date',
        accessor: 'date',
        cell: ({ row }: { row: Invoice }) => moment(row.createdAt).format('DD MMM YYYY'),
        sortable: true,
    },
    {
        header: 'Inv. Number.',
        accessor: 'invoiceNumber',
        cell: ({ row }: { row: Invoice }) => row.invoiceNumber,
        sortable: true,
    },
    {
        header: 'Eng. Name',
        accessor: 'englishName',
        cell: ({ row }: { row: Invoice }) => row.englishName,
    },
    {
        header: 'Payment Type',
        accessor: 'paymentType',
        cell: ({ row }: { row: Invoice }) => row.paymentType,
    },
    {
        header: 'Status',
        accessor: 'status',
        cell: ({ row }: { row: Invoice }) => row.status,
    },
    {
        header: 'Total',
        accessor: 'total',
        cell: ({ row }: { row: Invoice }) => <span>${Number(row.total).toFixed(2)}</span>,
    },
    {
        header: 'Description',
        accessor: 'description',
        cell: ({ row }: { row: Invoice }) => <p className="truncate w-40 overflow-hidden text-ellipsis">{row.description}</p>,
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
