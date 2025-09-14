import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { toast } from '@/hooks/use-toast';
import { Account, Transaction } from '../types/types';





export const useAllTransactions = (page = 1, limit = 10, filters?: any) => {
  return useQuery<{ transactions: Transaction[]; total: number }>({
    queryKey: ['allTransactions', page, limit, filters],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/transactions', {
        params: { page, limit, ...filters },
      });
      return response.data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

export const useAllAccounts = (page = 1, limit = 10, search?: string) => {
  return useQuery<{ accounts: Account[]; total: number }>({
    queryKey: ['allAccounts', page, limit, search],
    queryFn: async () => {
      const response = await axiosInstance.get('/admin/accounts', {
        params: { page, limit, search },
      });
      return response.data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

export const useAccountDetails = (accountId: string) => {
  return useQuery<Account>({
    queryKey: ['accountDetails', accountId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/account/get/${accountId}`);
      return response.data;
    },
    enabled: !!accountId && !!localStorage.getItem('token'),
  });
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId, data }: { accountId: string; data: any }) => {
      const response = await axiosInstance.patch(`/admin/account/update/${accountId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['accountDetails'] });
      toast({
        title: "Success",
        description: "Account updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update account",
        variant: "destructive",
      });
    },
  });
};

export const useCloseAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      const response = await axiosInstance.delete(`/admin/account/delete/${accountId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
      toast({
        title: "Success",
        description: "Account closed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to close account",
        variant: "destructive",
      });
    },
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: string; initialBalance?: number }) => {
      const response = await axiosInstance.post('/admin/accounts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allAccounts'] });
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
    },
  });
};





// interface DashboardStats {
//   totalCustomers: number;
//   totalTransactions: number;
//   totalVolume: number;
//   activeAccounts: number;
// }

// export const useDashboardStats = () => {
//   return useQuery<DashboardStats>({
//     queryKey: ['dashboardStats'],
//     queryFn: async () => {
//       // Since this endpoint is not in the API spec, we'll simulate it
//       // In a real app, you'd have a dedicated endpoint for dashboard stats
//       const [accountsRes, transactionsRes] = await Promise.all([
//         axiosInstance.get('/admin/accounts?limit=1'),
//         axiosInstance.get('/admin/transactions?limit=1'),
//       ]);
      
//       return {
//         totalCustomers: accountsRes.data.total || 0,
//         totalTransactions: transactionsRes.data.total || 0,
//         totalVolume: 0, // This would need to be calculated server-side
//         activeAccounts: accountsRes.data.total || 0,
//       };
//     },
//     enabled: !!localStorage.getItem('token'),
//   });
// };





