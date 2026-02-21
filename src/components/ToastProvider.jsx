import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

/**
 * Toast Notification System
 * Premium GitHub-style toast notifications with auto-dismiss, stacking, and smooth animations.
 * 
 * Usage:
 *   const { addToast } = useToast();
 *   addToast({ type: 'success', title: 'Done!', message: 'Your action was successful.' });
 */

const ToastContext = createContext(null);

const TOAST_ICONS = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const TOAST_COLORS = {
    success: {
        bg: 'var(--color-success-bg)',
        border: 'var(--color-accent-green)',
        icon: 'var(--color-accent-green)',
    },
    error: {
        bg: 'var(--color-error-bg)',
        border: 'var(--color-error)',
        icon: 'var(--color-error)',
    },
    warning: {
        bg: 'var(--color-warning-bg)',
        border: 'var(--color-accent-orange)',
        icon: 'var(--color-accent-orange)',
    },
    info: {
        bg: 'var(--color-info-bg)',
        border: 'var(--color-accent-blue)',
        icon: 'var(--color-accent-blue)',
    },
};

let toastIdCounter = 0;

const Toast = ({ toast, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const Icon = TOAST_ICONS[toast.type] || Info;
    const colors = TOAST_COLORS[toast.type] || TOAST_COLORS.info;
    const duration = toast.duration === 0 ? null : (toast.duration || 5000);

    const handleDismiss = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(toast.id), 200);
    }, [toast.id, onDismiss]);

    // Auto-dismiss + progress bar
    useEffect(() => {
        if (!duration) return;
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) {
                clearInterval(interval);
                handleDismiss();
            }
        }, 50);
        const timer = setTimeout(handleDismiss, duration);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [duration, handleDismiss]);

    return (
        <div
            className={`toast toast-${toast.type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}
            role="alert"
            aria-live="assertive"
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border-default)',
                borderLeft: `4px solid ${colors.border}`,
                boxShadow: 'var(--shadow-lg)',
                minWidth: '320px',
                maxWidth: '420px',
                position: 'relative',
                overflow: 'hidden',
                animation: isExiting
                    ? 'fadeOut 0.2s ease forwards'
                    : 'slideInRight 0.3s ease',
            }}
        >
            <Icon
                className="flex-shrink-0 mt-0.5"
                style={{ width: '20px', height: '20px', color: colors.icon }}
            />
            <div className="flex-1 min-w-0">
                {toast.title && (
                    <div style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                        marginBottom: toast.message ? '2px' : 0,
                    }}>
                        {toast.title}
                    </div>
                )}
                {toast.message && (
                    <div style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 'var(--line-height-base)',
                    }}>
                        {toast.message}
                    </div>
                )}
            </div>
            <button
                onClick={handleDismiss}
                className="flex-shrink-0"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                    color: 'var(--color-text-muted)',
                    transition: 'color var(--transition-fast)',
                }}
                aria-label="Dismiss notification"
            >
                <X className="w-4 h-4" />
            </button>
            {duration > 0 && (
                <div
                    className="toast-progress"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: colors.border,
                    }}
                />
            )}
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = ++toastIdCounter;
        const newToast = { id, type: 'info', ...toast };
        setToasts(prev => {
            const kept = prev.slice(-2);
            return [...kept, newToast].slice(-3);
        });
        return id;
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    useEffect(() => {
        const handler = (e) => {
            const { type = 'info', title, message } = e.detail || {};
            addToast({ type, title: title || (type === 'error' ? 'Error' : type === 'success' ? 'Success' : ''), message });
        };
        window.addEventListener('wibe-toast', handler);
        return () => window.removeEventListener('wibe-toast', handler);
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, dismissToast }}>
            {children}

            {/* Toast container — top-right position */}
            {toasts.length > 0 && (
                <div
                    className="toast-container"
                    style={{ pointerEvents: 'none' }}
                >
                    {toasts.map(toast => (
                        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
                            <Toast toast={toast} onDismiss={dismissToast} />
                        </div>
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastProvider;
