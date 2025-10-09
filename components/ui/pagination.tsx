import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTablePaginationProps {
    pageNumber: number;
    pageSize: number;
    totalCount: number; // Total rows from the API
    totalPages: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination({
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    onPageChange,
    onPageSizeChange,
}: DataTablePaginationProps) {
    const handlePageSizeChange = (newSize: number) => {
        onPageSizeChange?.(newSize);
    };

    const handlePageChange = (newPage: number) => {
        onPageChange?.(newPage);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <p className="flex-1 text-sm text-muted-foreground">
                Showing {(pageNumber - 1) * pageSize + 1}-{Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
            </p>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => {
                            const size = Number(value);
                            onPageChange?.(1);
                            handlePageSizeChange(size);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={`${pageSize}`} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20, 30].map((size) => (
                                <SelectItem key={size} value={`${size}`}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Page Info */}
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">
                        Page {pageNumber} of {totalPages}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="w-8 h-8"
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft />
                        </Button>

                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pageNumber <= 3) {
                                    pageNum = i + 1;
                                } else if (pageNumber >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = pageNumber - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={pageNumber === pageNum ? 'default' : 'outline'}
                                        className="w-8 h-8"
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        <Button
                            variant="outline"
                            className="w-8 h-8"
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={pageNumber >= totalPages}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
