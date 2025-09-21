'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { PlusIcon, XIcon } from 'lucide-react';
import { UserForm } from './user-form';
import { UserFormValues } from '@/zod/user';

type AddUserType = {
    onCloseDrawer: (data: UserFormValues) => Promise<void>;
    openAddDrawer: boolean;
    setOpenAddDrawer: (open: boolean) => void;
};

export const AddUserDrawer = ({ onCloseDrawer, openAddDrawer, setOpenAddDrawer }: AddUserType) => {
    return (
        <Drawer direction="right" open={openAddDrawer} onOpenChange={setOpenAddDrawer}>
            <DrawerTrigger asChild>
                <Button className="!cursor-pointer !text-white">
                    <PlusIcon className="h-4 w-4" />
                    Add User
                </Button>
            </DrawerTrigger>
            <DrawerContent className="overflow-hidden overflow-y-auto">
                <DrawerHeader className="relative">
                    <div>
                        <DrawerTitle className="text-xl font-semibold">Add User</DrawerTitle>
                        <DrawerDescription>Add a new User to track your finances</DrawerDescription>
                    </div>
                    <DrawerClose className="absolute top-4 right-4">
                        <XIcon className="h-5 w-5 !cursor-pointer" />
                    </DrawerClose>
                </DrawerHeader>
                <UserForm onSubmit={onCloseDrawer} />
            </DrawerContent>
        </Drawer>
    );
};
