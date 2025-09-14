import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Shield,
  LogOut,
  Plus,
  UserPlus
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/api/useAuth";
import { useAllAccounts, useAllTransactions } from "@/hooks/api/useAdmin";
import CreateAccountDialog from "@/components/admin/CreateAccountDialog";
import EditAccountDialog from "@/components/admin/EditAccountDialog";
import ViewAccountDialog from "@/components/admin/ViewAccountDialog";
import { useNavigate } from "react-router-dom";
import { Account, Transaction } from "@/hooks/types/types";
import DeleteAccountDialog from "@/components/admin/DeleteAccountDialog";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Fetch data from API
  // const { mutate: logout } = useLogout();
  // const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const {error : accountsError , data: accountsData, isLoading: accountsLoading } = useAllAccounts(page, 10, searchTerm);
  const {error : transactionsError, data: transactionsData, isLoading: transactionsLoading } = useAllTransactions(1, 50);

const navigate = useNavigate()


  const handleLogout = () =>{
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
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold text-foreground">ClearBank Nexus</h1>
                  <p className="text-sm text-muted-foreground">Admin Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
                Administrator
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor and manage all banking operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-banking">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                  {accountsLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">
                      {accountsData?.total?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-banking">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  {transactionsLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">
                      {transactionsData?.total?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-banking">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                  {transactionsLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">
                      ₹{transactionsData?.transactions?.reduce((sum, t) => sum + (t.amount || 0), 0).toLocaleString('en-IN') || 0}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-banking">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Accounts</p>
                  {accountsLoading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    <p className="text-3xl font-bold text-foreground">
                      {accountsData?.total?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Management */}
        <Card className="shadow-banking mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer Accounts</CardTitle>
                <CardDescription>Manage all customer accounts and details</CardDescription>
              </div>
              <div className="flex space-x-2">
                {/* <Button 
                  size="sm"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button> */}
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {accountsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Account Number</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Balance</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Created</th>
                      <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsData?.accounts?.length > 0 ? (
                      accountsData.accounts.map((account: Account) => (
                        <tr key={account._id} className="border-b hover:bg-muted/30">
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium">{account.userId.fullName || 'N/A'}</p>
                              <p className="text-sm text-muted-foreground">{account.userId.email || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="py-4 px-2 font-mono text-sm">{account.accountNumber}</td>
                          <td className="py-4 px-2 font-semibold">₹{account.balance.toLocaleString('en-IN')}</td>
                          <td className="py-4 px-2">
                            <Badge variant={account.status === 'active' ? 'default' : 'destructive'}>
                              {account.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-2 text-sm text-muted-foreground">
                            {new Date(account.createdAt).toLocaleDateString('en-IN')}
                          </td>
                          <td className="py-4 px-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-popover">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedAccount(account);
                                  setShowViewDialog(true);
                                }}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                  setSelectedAccount(account);
                                  setShowEditDialog(true);
                                }}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => {
                                    setSelectedAccount(account);
                                    setShowDeleteDialog(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Account
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">
                          No accounts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Reports */}
        <Card className="shadow-banking">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Monitor all customer transactions in real-time</CardDescription>
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
                    transactionsData.transactions.map((transaction: Transaction) => (
                      <div key={transaction._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'deposit' 
                              ? 'bg-accent/10 text-accent' 
                              : 'bg-destructive/10 text-destructive'
                          }`}>
                            {transaction.type === 'deposit' ? 
                              <TrendingUp className="w-5 h-5" /> : 
                              <TrendingUp className="w-5 h-5 rotate-180" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{transaction.userId.fullName || 'Customer'}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.accountId.accountNumber|| 'N/A'} • {new Date(transaction.createdAt).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'deposit' ? 'text-accent' : 'text-destructive'
                          }`}>
                            {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                          </p>
                          <Badge 
                            variant={transaction.status === 'success' ? 'outline' : 'destructive'} 
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
                  <Button variant="outline">View All Transactions</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      {/* <CreateAccountDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} /> */}


      {selectedAccount && (
        <>
          <EditAccountDialog 
            open={showEditDialog} 
            onOpenChange={setShowEditDialog} 
            account={selectedAccount}
          />
          <ViewAccountDialog 
            open={showViewDialog} 
            onOpenChange={setShowViewDialog} 
            account={selectedAccount}
          />


          <DeleteAccountDialog
          open = {showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          account ={selectedAccount}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;