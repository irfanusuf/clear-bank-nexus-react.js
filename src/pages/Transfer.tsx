import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useTransfer, useAccountBalance } from "@/hooks/api/useAccount";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Transfer = () => {
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const transfer = useTransfer();
  const { data: balanceData } = useAccountBalance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    transfer.mutate(
      {
        recipientAccount,
        amount: parseFloat(amount),
        description: description || undefined,
      },
      {
        onSuccess: () => {
          setRecipientAccount("");
          setAmount("");
          setDescription("");
        },
      }
    );
  };

  const insufficientFunds =
    balanceData && parseFloat(amount) > balanceData.totalBalance;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Transfer Funds
            </CardTitle>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <CardDescription>
            Send money to another bank account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {balanceData && (
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Available Balance
              </p>
              <p className="text-2xl font-bold text-primary">
                ₹{balanceData.totalBalance.toLocaleString("en-IN")}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Recipient Account */}
            <div className="space-y-2">
              <Label htmlFor="recipientAccount">Recipient Account</Label>
              <Input
                id="recipientAccount"
                placeholder="Enter recipient account number"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                required
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <SendHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  required
                  min="100"
                  step="0.01"
                  max={balanceData?.totalBalance}
                />
              </div>
            </div>

            {/* Insufficient funds alert */}
            {insufficientFunds && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient funds. Available balance: ₹
                  {balanceData?.totalBalance.toLocaleString("en-IN")}
                </AlertDescription>
              </Alert>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit */}
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={
                  transfer.isPending ||
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  !recipientAccount ||
                  insufficientFunds
                }
              >
                {transfer.isPending
                  ? "Processing..."
                  : `Transfer ₹ ${amount || "0"}`}
              </Button>
            </div>
          </form>

          {/* Notes */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Note:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum transfer amount is ₹ 100</li>
              <li>• Transfers are processed instantly</li>
              <li>• Cannot transfer more than available balance</li>
              <li>• Ensure recipient account number is correct</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transfer;
