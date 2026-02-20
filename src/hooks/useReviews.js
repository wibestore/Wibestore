import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для создания отзыва
 */
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewData) => {
            const { data } = await apiClient.post('/reviews/', reviewData);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['reviews']);
            queryClient.invalidateQueries(['listing', variables.listing]);
            queryClient.invalidateQueries(['profile', 'sales']);
        },
    });
};

/**
 * Hook для получения отзывов listing'а
 */
export const useListingReviews = (listingId) => {
    return useQuery({
        queryKey: ['listing', listingId, 'reviews'],
        queryFn: async () => {
            if (!listingId) throw new Error('Listing ID is required');
            const { data } = await apiClient.get(`/listings/${listingId}/reviews/`);
            return data;
        },
        enabled: !!listingId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Hook для обновления отзыва
 */
export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }) => {
            const { data } = await apiClient.put(`/reviews/${id}/`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews']);
        },
    });
};

/**
 * Hook для удаления отзыва
 */
export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewId) => {
            await apiClient.delete(`/reviews/${reviewId}/`);
            return reviewId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews']);
        },
    });
};

/**
 * Hook для ответа на отзыв (для продавца)
 */
export const useReviewResponse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ reviewId, response }) => {
            const { data } = await apiClient.post(`/reviews/${reviewId}/response/`, {
                response,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews']);
        },
    });
};

/**
 * Hook для отметки отзыва как полезный
 */
export const useReviewHelpful = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewId) => {
            const { data } = await apiClient.post(`/reviews/${reviewId}/helpful/`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews']);
        },
    });
};
