import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeposit, useAccountBalance } from "@/hooks/api/useAccount";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false)

  const deposit = useDeposit();
  const { data: balanceData } = useAccountBalance();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true)

    try {

      setTimeout(() => {

        deposit.mutate({
          amount: parseFloat(amount),
          description: description || undefined,
        });

        // Reset form on success
        if (deposit.isSuccess) {
          setAmount("");
          setDescription("");
        }


      }, 10000);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Request a Deposit</CardTitle>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <CardDescription>
            Request Funds from the Bank
          </CardDescription>
        </CardHeader>
        <CardContent>
          {balanceData && (
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold text-primary">
                ₹{balanceData.totalBalance.toLocaleString('en-IN')}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                />
              </div>
            </div>

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

            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={loading || deposit.isPending || !amount || parseFloat(amount) <= 0}
              >
                {deposit.isPending ? "Processing..." : `Request a deposit of  ₹ ${amount || "0"}`}
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Note:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum deposit amount is ₹100</li>
              <li>• Requested fund are  processed instantly  </li>
              <li>• U can avail 45 days credit without any interest </li>
              <li>• Transaction will appear in your history immediately</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deposit;