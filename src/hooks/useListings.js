import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для получения списка listing'ов с фильтрами
 */
export const useListings = (filters = {}) => {
    return useInfiniteQuery({
        queryKey: ['listings', filters],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({ page: pageParam, ...filters });
            const { data } = await apiClient.get(`/listings/?${params}`);
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return url.searchParams.get('page');
            }
            return undefined;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

/**
 * Hook для получения конкретного listing'а по ID
 */
export const useListing = (id) => {
    return useQuery({
        queryKey: ['listings', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/listings/${id}/`);
            return data;
        },
        enabled: !!id,
        staleTime: 1 * 60 * 1000, // 1 minute
    });
};

/**
 * Hook для создания listing'а
 */
export const useCreateListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingData) => {
            const { data } = await apiClient.post('/listings/', listingData);
            return data;
        },
        onSuccess: () => {
            // Инвалидация кэша listings и профиля
            queryClient.invalidateQueries(['listings']);
            queryClient.invalidateQueries(['profile', 'listings']);
        },
    });
};

/**
 * Hook для обновления listing'а
 */
export const useUpdateListing = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates) => {
            const { data } = await apiClient.patch(`/listings/${id}/`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['listings', id]);
            queryClient.invalidateQueries(['listings']);
            queryClient.invalidateQueries(['profile', 'listings']);
        },
    });
};

/**
 * Hook для удаления listing'а
 */
export const useDeleteListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingId) => {
            await apiClient.delete(`/listings/${listingId}/`);
        },
        onSuccess: (data, listingId) => {
            queryClient.invalidateQueries(['listings', listingId]);
            queryClient.invalidateQueries(['listings']);
            queryClient.invalidateQueries(['profile', 'listings']);
        },
    });
};

/**
 * Hook для добавления в избранное
 */
export const useAddToFavorites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingId) => {
            const { data } = await apiClient.post(`/listings/${listingId}/favorite/`);
            return data;
        },
        onSuccess: (data, listingId) => {
            // Оптимистичное обновление
            queryClient.invalidateQueries(['listings', listingId]);
            queryClient.invalidateQueries(['profile', 'favorites']);
        },
    });
};

/**
 * Hook для удаления из избранного
 */
export const useRemoveFromFavorites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingId) => {
            await apiClient.delete(`/listings/${listingId}/favorite/`);
        },
        onSuccess: (data, listingId) => {
            queryClient.invalidateQueries(['listings', listingId]);
            queryClient.invalidateQueries(['profile', 'favorites']);
        },
    });
};

/**
 * Hook для регистрации просмотра listing'а
 */
export const useTrackView = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (listingId) => {
            await apiClient.post(`/listings/${listingId}/view/`);
        },
        onSuccess: (data, listingId) => {
            queryClient.invalidateQueries(['listings', listingId]);
        },
    });
};

export default {
    useListings,
    useListing,
    useCreateListing,
    useUpdateListing,
    useDeleteListing,
    useAddToFavorites,
    useRemoveFromFavorites,
    useTrackView,
};
