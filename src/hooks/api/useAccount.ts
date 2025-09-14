import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { toast } from '@/hooks/use-toast';
import { Account, Transaction, TransferPayload } from '../types/types';
import { useNavigate } from 'react-router-dom';


export const useMyAccount = () => {
  return useQuery<Account>({
    queryKey: ['myAccount'],
    queryFn: async () => {
      const response = await axiosInstance.get('/customer/account');
      return response.data.payload;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

export const useAccountBalance = () => {
  return useQuery<{ totalBalance: number }>({
    queryKey: ['accountBalance'],
    queryFn: async () => {
      const response = await axiosInstance.get('/customer/account/balance');
      return response.data;
    },
    enabled: !!localStorage.getItem('token'),
    // refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useDeposit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: { amount: number; description?: string }) => {
      const response = await axiosInstance.post('/customer/transactions/deposit', data, {
        headers: {
          'Idempotency-Key': `deposit-${Date.now()}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBalance'] });
      queryClient.invalidateQueries({ queryKey: ['myAccount'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Success",
        description: "Deposit completed successfully",
      });
      navigate("/dashboard")
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Deposit failed",
        variant: "destructive",
      });
    },
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { amount: number; description?: string }) => {
      const response = await axiosInstance.post('/transactions/withdraw', data, {
        headers: {
          'Idempotency-Key': `withdraw-${Date.now()}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountBalance'] });
      queryClient.invalidateQueries({ queryKey: ['myAccount'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Success",
        description: "Withdrawal completed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Withdrawal failed",
        variant: "destructive",
      });
    },
  });
};

export const useMyTransactions = (page = 1, limit = 10) => {
  return useQuery<{ transactions: Transaction[]; total: number }>({
    queryKey: ['transactions', page, limit],
    queryFn: async () => {
      const response = await axiosInstance.get('/customer/transactions', {
        params: { page, limit },
      });
      return response.data;
    },
    enabled: !!localStorage.getItem('token'),
  });
};


export const useTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TransferPayload) => {
      const res = await axiosInstance.post("/customer/transactions/transfer", payload);
      return res.data;
    },
    onSuccess: () => {
      // ✅ Refresh balance & transaction history
      queryClient.invalidateQueries({ queryKey: ["accountBalance"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
         toast({
        title: "Success",
        description: "Transfer completed successfully",
      });
    },
    onError: (error: any) => {
      console.error("Transfer failed:", error?.response?.data || error.message);
         toast({
        title: "Error",
        description: error.response?.data?.message || "Withdrawal failed",
        variant: "destructive",
      });
      throw error;
    },
  });
};