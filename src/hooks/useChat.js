import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

/**
 * Hook для получения списка чатов пользователя
 */
export const useChats = () => {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => {
            const { data } = await apiClient.get('/chats/');
            return data;
        },
        staleTime: 1 * 60 * 1000, // 1 minute
        refetchInterval: 30 * 1000, // Refetch every 30 seconds
    });
};

/**
 * Hook для получения конкретного чата
 */
export const useChat = (chatId) => {
    return useQuery({
        queryKey: ['chats', chatId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/chats/${chatId}/`);
            return data;
        },
        enabled: !!chatId,
        staleTime: 1 * 60 * 1000,
    });
};

/**
 * Hook для получения сообщений чата
 */
export const useChatMessages = (chatId) => {
    return useInfiniteQuery({
        queryKey: ['chats', chatId, 'messages'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await apiClient.get(`/chats/${chatId}/messages/?page=${pageParam}`);
            return data;
        },
        enabled: !!chatId,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                return url.searchParams.get('page');
            }
            return undefined;
        },
        staleTime: 30 * 1000, // 30 seconds
    });
};

/**
 * Hook для создания нового чата
 */
export const useCreateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (participantId) => {
            const { data } = await apiClient.post('/chats/', { participant_id: participantId });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['chats']);
        },
    });
};

/**
 * Hook для отправки сообщения
 */
export const useSendMessage = (chatId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (text) => {
            const { data } = await apiClient.post(`/chats/${chatId}/messages/`, { text });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['chats', chatId, 'messages']);
            queryClient.invalidateQueries(['chats']);
        },
    });
};

export default {
    useChats,
    useChat,
    useChatMessages,
    useCreateChat,
    useSendMessage,
};
