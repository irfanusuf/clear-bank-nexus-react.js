import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  CreditCard,
  PiggyBank,
  Send,
  Download,
  Settings,
  LogOut,
  Bell
} from "lucide-react";
import { useCurrentUser, useLogout } from "@/hooks/api/useAuth";
import { useMyAccount, useMyTransactions } from "@/hooks/api/useAccount";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  // Fetch data from API
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: account, isLoading: accountLoading } = useMyAccount();
  const { data: transactionsData, isLoading: transactionsLoading } = useMyTransactions(1, 10);
  // const { mutate: logout } = useLogout();


  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold text-foreground">ClearBank Nexus</h1>
                  <p className="text-sm text-muted-foreground">Customer Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/change-password')}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          {userLoading ? (
            <Skeleton className="h-8 w-64 mb-2" />
          ) : (
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome , {user?.fullName || 'User'}!
            </h2>
          )}
          <p className="text-muted-foreground">Here's what's happening with your account today.</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 shadow-banking bg-gradient-hero border-0">
          <CardHeader className="text-primary-foreground">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg font-medium text-primary-foreground/90">Account Balance</CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Account #: {account?.accountNumber}
                </CardDescription>
              </div>


              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-primary-foreground">
            {accountLoading ? (
              <Skeleton className="h-10 w-48 mb-4" />
            ) : (
              <div className="text-4xl font-bold mb-4">
                {showBalance ? `₹${(account?.balance || 0).toLocaleString('en-IN')}` : "₹••••••••"}
              </div>
            )}
            <div className="flex space-x-4">
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                {account?.type === "savings" && "Savings Account" }
              </Badge>
              <Badge variant="secondary" className="bg-accent/20 text-primary-foreground">
                {account?.status === "active" && "Active"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card
            className="shadow-card hover:shadow-banking transition-shadow cursor-pointer"
            onClick={() => navigate('/deposit')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Request Funds</h3>
              <p className="text-sm text-muted-foreground">Request money from other ClearBank Nexus accounts or Request for instant fund and deposit later </p>
            </CardContent>
          </Card>

          <Card
            className="shadow-card hover:shadow-banking transition-shadow cursor-pointer"
            onClick={() => navigate('/transfer')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2">Transfer Cash</h3>
              <p className="text-sm text-muted-foreground">Transfer your money to other ClearBank Nexus account</p>
            </CardContent>
          </Card>

          {/* <Card
            className="shadow-card hover:shadow-banking transition-shadow cursor-pointer"
            onClick={() => navigate('/balance')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Check Balance</h3>
              <p className="text-sm text-muted-foreground">View account balance</p>
            </CardContent>
          </Card> */}

          <Card
            className="shadow-card hover:shadow-banking transition-shadow cursor-pointer"
            onClick={() => navigate('/transactions')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-semibold mb-2">Transactions</h3>
              <p className="text-sm text-muted-foreground">View transaction history</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="shadow-banking">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest account activity</CardDescription>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {transactionsData?.transactions?.length > 0 ? (
                    transactionsData.transactions.map((transaction: any) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'deposit'
                              ? 'bg-accent/10 text-accent'
                              : 'bg-destructive/10 text-destructive'
                            }`}>
                            {transaction.type === 'deposit' ?
                              <TrendingUp className="w-5 h-5" /> :
                              <TrendingDown className="w-5 h-5" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{transaction.type}</p>
                              <p className="text-sm  text-muted-foreground">{transaction.reason}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.createdAt).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.type === 'deposit' ? 'text-accent' : 'text-destructive'
                            }`}>
                            {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                          </p>
                          <Badge
                            variant={transaction.status === 'success' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent transactions
                    </div>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={() => navigate('/transactions')}>
                    View All Transactions
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;