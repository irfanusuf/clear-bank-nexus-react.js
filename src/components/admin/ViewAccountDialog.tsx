import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAccountDetails } from "@/hooks/api/useAdmin";
import { Skeleton } from "@/components/ui/skeleton";

interface ViewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: any;
}

export default function ViewAccountDialog({ open, onOpenChange, account }: ViewAccountDialogProps) {
  
  const { data: accountDetails, isLoading } = useAccountDetails(account?._id || "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription>
            Complete information for account {account?.accountNumber}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="font-medium">{accountDetails?.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={accountDetails?.status === 'active' ? 'default' : 'destructive'}>
                  {accountDetails?.status }
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer Name</p>
                <p className="font-medium">{accountDetails?.userId.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{accountDetails?.userId.email }</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="font-semibold text-lg">
                  ₹{(accountDetails?.balance || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Type</p>
                <p className="font-medium">{accountDetails.type}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Created On</p>
                <p className="font-medium">
                  {new Date(accountDetails?.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">
                  {new Date(accountDetails?.updatedAt).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}