import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для получения списка транзакций пользователя
 */
export const useTransactions = (filters = {}) => {
    return useQuery({
        queryKey: ['transactions', filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters).toString();
            const { data } = await apiClient.get(`/payments/transactions/?${params}`);
            return data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook для создания депозита
 */
export const useCreateDeposit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ amount, method }) => {
            const { data } = await apiClient.post('/payments/deposit/', {
                amount,
                method,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions']);
            queryClient.invalidateQueries(['profile']);
        },
    });
};

/**
 * Hook для создания вывода средств
 */
export const useCreateWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ amount, method, account_details }) => {
            const { data } = await apiClient.post('/payments/withdraw/', {
                amount,
                method,
                account_details,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['transactions']);
            queryClient.invalidateQueries(['profile']);
        },
    });
};

/**
 * Hook для получения планов подписок
 */
export const useSubscriptionPlans = () => {
    return useQuery({
        queryKey: ['subscriptions', 'plans'],
        queryFn: async () => {
            const { data } = await apiClient.get('/subscriptions/plans/');
            return data;
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });
};

/**
 * Hook для получения моих подписок
 */
export const useMySubscriptions = () => {
    return useQuery({
        queryKey: ['subscriptions', 'my'],
        queryFn: async () => {
            const { data } = await apiClient.get('/subscriptions/my/');
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook для покупки подписки
 */
export const usePurchaseSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (planId) => {
            const { data } = await apiClient.post('/subscriptions/purchase/', {
                plan_id: planId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['subscriptions', 'my']);
            queryClient.invalidateQueries(['profile']);
        },
    });
};

/**
 * Hook для отмены подписки
 */
export const useCancelSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subscriptionId) => {
            const { data } = await apiClient.post('/subscriptions/cancel/', {
                subscription_id: subscriptionId,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['subscriptions', 'my']);
        },
    });
};
