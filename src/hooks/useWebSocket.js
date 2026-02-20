import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * WebSocket hook для real-time соединений
 * Поддерживает автоматическое переподключение и обработку состояний
 */
export const useWebSocket = (url, options = {}) => {
    const wsRef = useRef(null);
    const reconnectTimeoutRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const {
        onOpen,
        onMessage,
        onClose,
        onError,
        reconnectInterval = 3000,
        maxReconnectAttempts = 5,
        protocols = [],
    } = options;

    // Get auth token for WebSocket authentication
    const getAuthToken = useCallback(() => {
        try {
            const tokens = JSON.parse(localStorage.getItem('wibeTokens'));
            return tokens?.access || null;
        } catch {
            return null;
        }
    }, []);

    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            return;
        }

        try {
            // Build URL with auth token if available
            const token = getAuthToken();
            const separator = url.includes('?') ? '&' : '?';
            const wsUrl = token ? `${url}${separator}token=${token}` : url;

            wsRef.current = new WebSocket(wsUrl, protocols);

            wsRef.current.onopen = (event) => {
                setIsConnected(true);
                setError(null);
                setRetryCount(0);
                if (onOpen) onOpen(event);
                console.log('[WebSocket] Connected:', url);
            };

            wsRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setLastMessage(data);
                    if (onMessage) onMessage(data);
                } catch {
                    if (onMessage) onMessage(event.data);
                }
            };

            wsRef.current.onclose = (event) => {
                setIsConnected(false);
                if (onClose) onClose(event);
                console.log('[WebSocket] Disconnected:', url);

                // Attempt to reconnect
                if (retryCount < maxReconnectAttempts) {
                    console.log(`[WebSocket] Reconnecting in ${reconnectInterval}ms... (attempt ${retryCount + 1}/${maxReconnectAttempts})`);
                    reconnectTimeoutRef.current = setTimeout(() => {
                        setRetryCount((prev) => prev + 1);
                    }, reconnectInterval);
                } else {
                    console.error('[WebSocket] Max reconnect attempts reached');
                }
            };

            wsRef.current.onerror = (event) => {
                setError(event);
                if (onError) onError(event);
                console.error('[WebSocket] Error:', url);
            };
        } catch (err) {
            setError(err);
            if (onError) onError(err);
        }
    }, [url, protocols, getAuthToken, onOpen, onMessage, onClose, onError, reconnectInterval, maxReconnectAttempts, retryCount]);

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setIsConnected(false);
        setLastMessage(null);
        setError(null);
        setRetryCount(0);
    }, []);

    const sendMessage = useCallback((data) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const message = typeof data === 'string' ? data : JSON.stringify(data);
            wsRef.current.send(message);
            return true;
        }
        console.warn('[WebSocket] Cannot send message - not connected');
        return false;
    }, []);

    // Auto-connect on mount
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    // Retry connection when retryCount changes
    useEffect(() => {
        if (retryCount > 0 && retryCount <= maxReconnectAttempts && !isConnected) {
            connect();
        }
    }, [retryCount, maxReconnectAttempts, isConnected, connect]);

    return {
        isConnected,
        lastMessage,
        error,
        retryCount,
        sendMessage,
        connect,
        disconnect,
        readyState: wsRef.current?.readyState,
    };
};

/**
 * Хук для WebSocket чата
 */
export const useChatWebSocket = (chatId, callbacks = {}) => {
    const wsUrl = `${import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000'}/ws/chat/${chatId}/`;

    const handleMessage = useCallback((data) => {
        if (callbacks.onMessage) {
            callbacks.onMessage(data);
        }
    }, [callbacks]);

    return useWebSocket(wsUrl, {
        onMessage: handleMessage,
        onOpen: callbacks.onOpen,
        onClose: callbacks.onClose,
        onError: callbacks.onError,
    });
};

/**
 * Хук для WebSocket уведомлений
 */
export const useNotificationWebSocket = (callbacks = {}) => {
    const wsUrl = `${import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000'}/ws/notifications/`;

    const handleMessage = useCallback((data) => {
        if (callbacks.onMessage) {
            callbacks.onMessage(data);
        }
    }, [callbacks]);

    return useWebSocket(wsUrl, {
        onMessage: handleMessage,
        onOpen: callbacks.onOpen,
        onClose: callbacks.onClose,
        onError: callbacks.onError,
    });
};

export default useWebSocket;
