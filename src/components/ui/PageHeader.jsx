import { Link } from 'react-router-dom';

/**
 * PageHeader — page title with optional breadcrumbs (40px height area).
 * Breadcrumbs format: Home / Category / Current
 */
export function Breadcrumbs({ items }) {
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {index > 0 && <span className="breadcrumb-separator">/</span>}
            {isLast ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export function PageHeader({ title, description, breadcrumbs, action, className = '' }) {
  return (
    <div className={`page-header ${className}`.trim()}>
      {breadcrumbs?.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          {title && <h1>{title}</h1>}
          {description && (
            <p
              style={{
                marginTop: 'var(--space-2)',
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
