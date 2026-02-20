import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для создания жалобы (report)
 */
export const useCreateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reportData) => {
            const { data } = await apiClient.post('/reports/', reportData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reports']);
        },
    });
};

/**
 * Hook для получения списка жалоб (admin)
 */
export const useAdminReports = (filters = {}) => {
    return useQuery({
        queryKey: ['admin', 'reports', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const { data } = await apiClient.get(`/admin/reports/?${params}`);
            return data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook для обновления статуса жалобы (admin)
 */
export const useUpdateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status, resolution }) => {
            const { data } = await apiClient.patch(`/admin/reports/${id}/`, {
                status,
                resolution,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'reports']);
        },
    });
};

/**
 * Hook для получения дашборда админа
 */
export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ['admin', 'dashboard'],
        queryFn: async () => {
            const { data } = await apiClient.get('/admin/dashboard/');
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchInterval: 60 * 1000, // Refetch every minute
    });
};

/**
 * Hook для получения списка пользователей (admin)
 */
export const useAdminUsers = (filters = {}) => {
    return useQuery({
        queryKey: ['admin', 'users', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const { data } = await apiClient.get(`/admin/users/?${params}`);
            return data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook для обновления пользователя (admin)
 */
export const useUpdateAdminUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }) => {
            const { data } = await apiClient.patch(`/admin/users/${id}/`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'users']);
            queryClient.invalidateQueries(['admin', 'dashboard']);
        },
    });
};

/**
 * Hook для получения списка listing'ов (admin)
 */
export const useAdminListings = (filters = {}) => {
    return useQuery({
        queryKey: ['admin', 'listings', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const { data } = await apiClient.get(`/admin/listings/?${params}`);
            return data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook для обновления listing'а (admin)
 */
export const useUpdateAdminListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }) => {
            const { data } = await apiClient.patch(`/admin/listings/${id}/`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'listings']);
            queryClient.invalidateQueries(['admin', 'dashboard']);
        },
    });
};

/**
 * Hook для получения списка транзакций (admin)
 */
export const useAdminTransactions = (filters = {}) => {
    return useQuery({
        queryKey: ['admin', 'transactions', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const { data } = await apiClient.get(`/admin/transactions/?${params}`);
            return data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};
