import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Transaction } from '@/types';

type DeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleDelete: () => void;
    transaction: Transaction;
};

export function DeleteDialog({ open, onOpenChange, handleDelete, transaction }: DeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you would to delete <span className="text-red-500 font-bold">{transaction.title}</span> transaction?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2 mt-3">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
