import { Link } from 'react-router-dom';

/**
 * Breadcrumbs — GitHub Premium style.
 * @param {Array<{ label: string, to?: string }>} items — last item without `to` is current page
 */
export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <nav
      className={`breadcrumbs ${className}`.trim()}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
            )}
            {isLast || !item.to ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
