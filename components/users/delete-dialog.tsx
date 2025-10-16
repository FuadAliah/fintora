import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '@/types/user';

type DeleteDialogProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onDelete: () => void;
    user: User;
};

export function DeleteDialog({ open, setOpen, onDelete, user }: DeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-4">Delete</DialogTitle>
                    <DialogDescription className="flex gap-1">
                        <span>Are you sure you want to delete</span>
                        <span className="text-red-500 font-bold">
                            {user?.firstName} {user?.lastName}
                        </span>
                        user?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2 mt-3">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
