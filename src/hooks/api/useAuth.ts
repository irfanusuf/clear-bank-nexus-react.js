import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/lib/axios';
import { toast } from '@/hooks/use-toast';
import { LoginData, SignupData, User } from '../types/types';



export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      
      // Navigate based on role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Login failed",
        variant: "destructive",
      });
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await axiosInstance.post('/auth/signup', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Account created successfully. Please login.",
      });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
      navigate('/login');
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/user');
      return response.data.payload;
    },
    enabled: !!localStorage.getItem('token'),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password reset link sent to your email",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send reset email",
        variant: "destructive",
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await axiosInstance.post('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to change password",
        variant: "destructive",
      });
    },
  });
};