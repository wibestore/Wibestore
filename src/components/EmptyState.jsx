import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

/**
 * EmptyState - Reusable empty/no-data placeholder
 * Premium design with design system tokens
 */
const EmptyState = ({
    icon: Icon = Package,
    title,
    message,
    actionLabel,
    actionTo,
    onAction,
    compact = false,
}) => (
    <div
        className="text-center animate-fadeIn"
        style={{
            padding: compact ? '32px 16px' : '64px 16px',
        }}
    >
        <div
            className="flex items-center justify-center mx-auto"
            style={{
                width: compact ? '48px' : '64px',
                height: compact ? '48px' : '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-bg-tertiary)',
                marginBottom: 'var(--space-4)',
            }}
        >
            <Icon
                style={{
                    width: compact ? '24px' : '32px',
                    height: compact ? '24px' : '32px',
                    color: 'var(--color-text-muted)',
                }}
            />
        </div>

        {title && (
            <h3
                style={{
                    fontSize: compact ? 'var(--font-size-base)' : 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)',
                }}
            >
                {title}
            </h3>
        )}

        {message && (
            <p
                style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '320px',
                    margin: '0 auto',
                    lineHeight: 'var(--line-height-lg)',
                    marginBottom: (actionLabel || onAction) ? 'var(--space-5)' : '0',
                }}
            >
                {message}
            </p>
        )}

        {actionTo && actionLabel && (
            <Link
                to={actionTo}
                className="btn btn-primary btn-md"
                style={{ textDecoration: 'none' }}
            >
                {actionLabel}
            </Link>
        )}

        {onAction && actionLabel && !actionTo && (
            <button onClick={onAction} className="btn btn-primary btn-md">
                {actionLabel}
            </button>
        )}
    </div>
);

export default EmptyState;
