'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';

type InvoicesFilterProps = {
    invoiceNumber: string;
    setInvoiceNumber: (value: string) => void;
};

export const InvoicesFilter = ({ invoiceNumber, setInvoiceNumber }: InvoicesFilterProps) => {
    const onReset = () => {
        setInvoiceNumber('');
    };

    return (
        <div className="flex items-center">
            <div className="flex items-center gap-4">
                <Input
                    className="w-[320px]"
                    placeholder="Search invoice"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                />

                {invoiceNumber && (
                    <Button className="text-sm text-red-500 hover:text-red-600 flex items-center" variant="ghost" onClick={onReset}>
                        <XIcon className="h-5 w-5 !cursor-pointer" />
                        <span>Reset</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
