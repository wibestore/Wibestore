import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger', // 'danger' | 'warning' | 'info'
}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const handleEscape = (e) => {
                if (e.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleEscape);
            // Focus the cancel button
            dialogRef.current?.querySelector('[data-cancel]')?.focus();
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: {
            iconBg: 'var(--color-error-bg)',
            iconColor: 'var(--color-error)',
            btnClass: 'btn btn-danger btn-md',
        },
        warning: {
            iconBg: 'var(--color-warning-bg)',
            iconColor: 'var(--color-accent-orange)',
            btnClass: 'btn btn-md',
        },
        info: {
            iconBg: 'var(--color-info-bg)',
            iconColor: 'var(--color-accent-blue)',
            btnClass: 'btn btn-primary btn-md',
        },
    };

    const styles = variantStyles[variant] || variantStyles.danger;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
        >
            <div
                ref={dialogRef}
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '400px' }}
            >
                <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                    {/* Icon */}
                    <div
                        className="flex items-center justify-center mx-auto"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: styles.iconBg,
                            marginBottom: 'var(--space-4)',
                        }}
                    >
                        <AlertTriangle className="w-6 h-6" style={{ color: styles.iconColor }} />
                    </div>

                    {/* Title */}
                    <h3
                        id="confirm-dialog-title"
                        style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--space-2)',
                        }}
                    >
                        {title}
                    </h3>

                    {/* Message */}
                    <p
                        style={{
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--line-height-lg)',
                            marginBottom: 'var(--space-6)',
                        }}
                    >
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="confirm-dialog-actions" style={{ justifyContent: 'center' }}>
                        <button
                            data-cancel
                            onClick={onClose}
                            className="btn btn-secondary btn-md"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={styles.btnClass}
                            style={variant === 'warning' ? {
                                backgroundColor: 'var(--color-accent-orange)',
                                color: '#ffffff',
                                border: 'none',
                            } : undefined}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
