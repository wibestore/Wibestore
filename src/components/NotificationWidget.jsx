import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const NotificationWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Hozir';
        if (minutes < 60) return `${minutes} daqiqa oldin`;
        if (hours < 24) return `${hours} soat oldin`;
        if (days < 7) return `${days} kun oldin`;
        return date.toLocaleDateString('uz-UZ');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
                <Bell className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full text-xs font-bold text-white flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-16 sm:top-full sm:mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden"
                    style={{ minWidth: '320px', maxWidth: '400px' }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200">
                        <h3 className="font-semibold text-gray-800">Bildirishnomalar</h3>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-blue-500 hover:text-purple-300 flex items-center gap-1"
                                >
                                    <Check className="w-3 h-3" />
                                    Barchasini o'qish
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-500/5' : ''
                                        }`}
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 flex-shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
                                            {notification.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`font-medium truncate ${!notification.read ? 'text-gray-800' : 'text-gray-600'
                                                    }`}>
                                                    {notification.title}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteNotification(notification.id);
                                                    }}
                                                    className="text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {formatTime(notification.time)}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <p className="text-gray-400">Bildirishnomalar yo'q</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-slate-200">
                            <button
                                onClick={clearAll}
                                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Barchasini tozalash
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationWidget;
