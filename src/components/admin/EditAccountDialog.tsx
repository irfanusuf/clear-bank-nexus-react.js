import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateAccount } from "@/hooks/api/useAdmin";
import { Account } from "@/hooks/types/types";

interface EditAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account;
}

export default function EditAccountDialog({ open, onOpenChange, account }: EditAccountDialogProps) {



  const [formData, setFormData] = useState({
    // balance: account?.balance || 0,
    status: account?.status || "active",
    fullName : account?.userId?.fullName
  });

  const { mutate: updateAccount } = useUpdateAccount();

  useEffect(() => {
    if (account) {
      setFormData({
        // balance: account.balance,
        status: account.status,
        fullName : account.userId.fullName

      });
    }
  }, [account]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAccount({
      accountId: account?._id,
      data: formData,
    }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Update account details for {account?.userId.fullName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Account Number</Label>
            <Input value={account?.accountNumber} disabled />
          </div>
          <div className="space-y-2">
            <Label>Customer Name</Label>
            <Input 
            value={formData.fullName} 
            // onChange={(e) =>{setFormData({...formData , fullName : e.target.value})}}
            disabled
             />
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Balance  Adjustment (₹)</Label>
            <Input
              id="balance"
              type="number"
              min="0"
              required
              value={account?.balance}
              disabled
              // onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive" | "frozen") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="frozen">Frozen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Account</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}