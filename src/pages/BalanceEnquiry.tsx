import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccountBalance, useMyAccount, useMyTransactions } from "@/hooks/api/useAccount";
import { format } from "date-fns";

const BalanceEnquiry = () => {
  const { data: balanceData, refetch: refetchBalance, isRefetching } = useAccountBalance();
  const { data: accountData } = useMyAccount();
  const { data: transactionsData } = useMyTransactions(1, 5);

  const handleRefresh = () => {
    refetchBalance();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Balance Enquiry</h1>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Balance Card */}
          <Card className="col-span-full shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Account Balance</CardTitle>
                <CardDescription>
                  Account Number: {accountData?.accountNumber || "Loading..."}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefetching}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                ₹{balanceData?.totalBalance.toLocaleString('en-IN') || "0"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="font-semibold">{accountData?.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p className="font-semibold text-success">Active</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Opened</p>
                <p className="font-semibold">
                  {accountData?.createdAt ? format(new Date(accountData.createdAt), 'dd MMM yyyy') : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactionsData?.transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction._id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'deposit' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(transaction.createdAt), 'dd MMM, HH:mm')}
                        </p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
                {(!transactionsData?.transactions || transactionsData.transactions.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent transactions
                  </p>
                )}
              </div>
              <Link to="/transactions" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BalanceEnquiry;