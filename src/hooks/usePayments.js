import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для получения списка транзакций
 */
export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const { data } = await apiClient.get('/payments/transactions/');
            return data;
        },
        staleTime: 1 * 60 * 1000,
    });
};

/**
 * Hook для создания депозита
 */
export const useDeposit = () => {
    return useMutation({
        mutationFn: async ({ amount, method }) => {
            const { data } = await apiClient.post('/payments/deposit/', {
                amount,
                payment_method: method,
            });
            return data;
        },
    });
};

/**
 * Hook для создания вывода средств
 */
export const useWithdraw = () => {
    return useMutation({
        mutationFn: async ({ amount, method }) => {
            const { data } = await apiClient.post('/payments/withdraw/', {
                amount,
                payment_method: method,
            });
            return data;
        },
    });
};

/**
 * Hook для xarid (listingni balance orqali sotib olish — escrow).
 * Muvaffaqiyatda data.chat_room_id qaytadi — shu chat ochiladi.
 */
export const usePurchaseListing = () => {
    return useMutation({
        mutationFn: async ({ listing_id }) => {
            const { data } = await apiClient.post('/payments/purchase/', {
                listing_id,
                payment_method: 'balance',
            });
            return data;
        },
    });
};

export default { useTransactions, useDeposit, useWithdraw, usePurchaseListing };
