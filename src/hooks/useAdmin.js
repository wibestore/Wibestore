import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для получения dashboard статистики (admin)
 */
export const useAdminDashboard = () => {
    return useQuery({
        queryKey: ['admin', 'dashboard'],
        queryFn: async () => {
            const { data } = await apiClient.get('/admin-panel/dashboard/');
            return data;
        },
        staleTime: 2 * 60 * 1000,
    });
};

/**
 * Hook для получения списка пользователей (admin)
 */
export const useAdminUsers = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ['admin', 'users', filters],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({ page: pageParam, ...filters });
            const { data } = await apiClient.get(`/admin-panel/users/?${params}`);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return url.searchParams.get('page');
            }
            return undefined;
        },
        staleTime: 1 * 60 * 1000,
    });
};

/**
 * Hook для обновления пользователя (admin)
 */
export const useAdminUpdateUser = (userId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates) => {
            const { data } = await apiClient.patch(`/admin-panel/users/${userId}/`, updates);
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
    return useInfiniteQuery({
        queryKey: ['admin', 'listings', filters],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({ page: pageParam, ...filters });
            const { data } = await apiClient.get(`/admin-panel/listings/?${params}`);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return url.searchParams.get('page');
            }
            return undefined;
        },
        staleTime: 1 * 60 * 1000,
    });
};

/**
 * Hook для обновления listing'а (admin)
 */
export const useAdminUpdateListing = (listingId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ status, rejection_reason }) => {
            const { data } = await apiClient.patch(`/admin-panel/listings/${listingId}/`, { status, rejection_reason });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'listings']);
            queryClient.invalidateQueries(['listings', listingId]);
        },
    });
};

/**
 * Hook для получения транзакций (admin)
 */
export const useAdminTransactions = (filters = {}) => {
    return useQuery({
        queryKey: ['admin', 'transactions', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters);
            const { data } = await apiClient.get(`/admin-panel/transactions/?${params}`);
            return data;
        },
        staleTime: 1 * 60 * 1000,
    });
};

export default {
    useAdminDashboard,
    useAdminUsers,
    useAdminUpdateUser,
    useAdminListings,
    useAdminUpdateListing,
    useAdminTransactions,
};
