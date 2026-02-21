import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

/**
 * EmptyState — design system empty state: icon 64–96px, title, description, optional CTA
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
    <div className={`empty-state text-center animate-fadeIn ${compact ? 'py-8' : ''}`}>
        <div className="empty-state-icon flex items-center justify-center mx-auto" style={{
            width: compact ? 48 : 64,
            height: compact ? 48 : 64,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-bg-tertiary)',
        }}>
            <Icon style={{
                width: compact ? 24 : 32,
                height: compact ? 24 : 32,
                color: 'var(--color-text-muted)',
            }} />
        </div>

        {title && <h3 className="empty-state-title">{title}</h3>}
        {message && <p className="empty-state-description">{message}</p>}

        {(actionLabel && (actionTo || onAction)) && (
            actionTo ? (
                <Link to={actionTo} className="btn btn-primary btn-md" style={{ textDecoration: 'none' }}>
                    {actionLabel}
                </Link>
            ) : (
                <button type="button" onClick={onAction} className="btn btn-primary btn-md">
                    {actionLabel}
                </button>
            )
        )}
    </div>
);

export default EmptyState;
