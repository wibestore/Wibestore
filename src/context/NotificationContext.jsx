import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    // Get current user for user-specific notifications
    const getCurrentUserId = () => {
        try {
            const user = JSON.parse(localStorage.getItem('wibeUser'));
            return user?.id || 'guest';
        } catch {
            return 'guest';
        }
    };

    const getStorageKey = () => `wibeNotifications_${getCurrentUserId()}`;
    const [notifications, setNotifications] = useState(() => {
        // Lazy initialization - birinchi renderda localStorage dan o'qish
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(getStorageKey());
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch {
                    return [];
                }
            }
        }
        // Demo notifications
        return [
            {
                id: 1,
                type: 'sale',
                title: 'Akkaunt sotildi!',
                message: 'Sizning "PUBG Level 50" akkauntingiz 500,000 so\'mga sotildi.',
                time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                read: false,
                icon: '💰'
            },
            {
                id: 2,
                type: 'message',
                title: 'Yangi xabar',
                message: 'GamerPro sizga xabar yubordi.',
                time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                read: false,
                icon: '💬'
            },
            {
                id: 3,
                type: 'system',
                title: 'Xush kelibsiz!',
                message: 'WibeStore platformasiga xush kelibsiz. Premium obunani sinab ko\'ring!',
                time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
                read: true,
                icon: '🎉'
            },
            {
                id: 4,
                type: 'security',
                title: 'Yangi kirish',
                message: 'Hisobingizga yangi qurilmadan kirildi.',
                time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
                read: true,
                icon: '🔐'
            }
        ];
    });

    const [unreadCount, setUnreadCount] = useState(() => {
        // Lazy initialization for unread count
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(getStorageKey());
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return parsed.filter(n => !n.read).length;
                } catch {
                    return 0;
                }
            }
        }
        return 2; // Demo notifications dagi o'qilmagan xabarlar soni
    });

    // Save to localStorage
    const saveNotifications = (newNotifications) => {
        localStorage.setItem(getStorageKey(), JSON.stringify(newNotifications));
    };

    const addNotification = (notification) => {
        const newNotification = {
            id: crypto.randomUUID(),
            ...notification,
            time: new Date().toISOString(),
            read: false
        };
        const updated = [newNotification, ...notifications];
        setNotifications(updated);
        setUnreadCount(prev => prev + 1);
        saveNotifications(updated);
    };

    const markAsRead = (id) => {
        const updated = notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        setNotifications(updated);
        setUnreadCount(updated.filter(n => !n.read).length);
        saveNotifications(updated);
    };

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        setUnreadCount(0);
        saveNotifications(updated);
    };

    const deleteNotification = (id) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        setUnreadCount(updated.filter(n => !n.read).length);
        saveNotifications(updated);
    };

    const clearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
        saveNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
