import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Account } from '@/hooks/types/types';
import { useCloseAccount } from '@/hooks/api/useAdmin';

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    account : Account

  
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
    open,
    onOpenChange,
    account 
}) => {

     const { mutate:  deleteAccount} = useCloseAccount();


       const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteAccount( account?._id,
    {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the account{' '}
                         This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {/* <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button> */}
                    <Button variant="destructive" onClick={handleDelete} >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;
