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
    const Icon = TOAST_ICONS[toast.type] || Info;
    const colors = TOAST_COLORS[toast.type] || TOAST_COLORS.info;

    const handleDismiss = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(toast.id), 200);
    }, [toast.id, onDismiss]);

    // Auto-dismiss
    useEffect(() => {
        if (toast.duration === 0) return; // manual dismiss only
        const timer = setTimeout(handleDismiss, toast.duration || 5000);
        return () => clearTimeout(timer);
    }, [handleDismiss, toast.duration]);

    return (
        <div
            className={`toast ${isExiting ? 'toast-exit' : 'toast-enter'}`}
            role="alert"
            aria-live="assertive"
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: colors.bg,
                borderLeft: `3px solid ${colors.border}`,
                boxShadow: 'var(--shadow-lg)',
                minWidth: '320px',
                maxWidth: '420px',
                animation: isExiting
                    ? 'fadeOut 0.2s ease forwards'
                    : 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = ++toastIdCounter;
        const newToast = { id, type: 'info', ...toast };
        setToasts(prev => {
            // Keep max 3 toasts visible
            const kept = prev.slice(-2);
            return [...kept, newToast];
        });
        return id;
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, dismissToast }}>
            {children}

            {/* Toast container — top-right position */}
            {toasts.length > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        top: '80px',
                        right: '16px',
                        zIndex: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        pointerEvents: 'none',
                    }}
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
