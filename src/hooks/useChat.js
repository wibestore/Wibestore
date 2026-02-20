import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
        queryKey: ['chat', chatId],
        queryFn: async () => {
            if (!chatId) throw new Error('Chat ID is required');
            const { data } = await apiClient.get(`/chats/${chatId}/`);
            return data;
        },
        enabled: !!chatId,
        staleTime: 1 * 60 * 1000, // 1 minute
    });
};

/**
 * Hook для получения сообщений чата
 */
export const useChatMessages = (chatId) => {
    return useQuery({
        queryKey: ['chat', chatId, 'messages'],
        queryFn: async () => {
            if (!chatId) throw new Error('Chat ID is required');
            const { data } = await apiClient.get(`/chats/${chatId}/messages/`);
            return data;
        },
        enabled: !!chatId,
        staleTime: 30 * 1000, // 30 seconds
        refetchInterval: 5 * 1000, // Refetch every 5 seconds for real-time feel
    });
};

/**
 * Hook для создания нового чата
 */
export const useCreateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (chatData) => {
            const { data } = await apiClient.post('/chats/', chatData);
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
        mutationFn: async (message) => {
            const { data } = await apiClient.post(`/chats/${chatId}/messages/`, {
                content: message,
            });
            return data;
        },
        onMutate: async (newMessage) => {
            // Optimistic update
            await queryClient.cancelQueries(['chat', chatId, 'messages']);
            const previousMessages = queryClient.getQueryData(['chat', chatId, 'messages']);

            if (previousMessages) {
                queryClient.setQueryData(['chat', chatId, 'messages'], (old) => [
                    ...old,
                    {
                        id: Date.now(),
                        content: newMessage,
                        sender: 'me',
                        created_at: new Date().toISOString(),
                        is_read: false,
                        optimistic: true,
                    },
                ]);
            }

            return { previousMessages };
        },
        onError: (err, variables, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(['chat', chatId, 'messages'], context.previousMessages);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries(['chat', chatId, 'messages']);
        },
    });
};

/**
 * Hook для отметки сообщений как прочитанные
 */
export const useMarkMessagesAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (chatId) => {
            const { data } = await apiClient.post(`/chats/${chatId}/mark_read/`);
            return data;
        },
        onSuccess: (_, chatId) => {
            queryClient.invalidateQueries(['chat', chatId, 'messages']);
            queryClient.invalidateQueries(['chats']);
        },
    });
};
