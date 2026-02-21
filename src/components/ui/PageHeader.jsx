import Breadcrumbs from './Breadcrumbs';

/**
 * PageHeader — title, optional description, breadcrumbs, and actions.
 * GitHub Premium style, consistent padding and border.
 */
export default function PageHeader({ title, description, breadcrumbs = [], actions, className = '' }) {
  return (
    <div className={`page-header ${className}`.trim()}>
      <div className="gh-container">
        {breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}
        <div
          className="flex flex-wrap items-start sm:items-center justify-between gap-4"
          style={{ marginTop: breadcrumbs.length ? 'var(--space-3)' : 0 }}
        >
          <div>
            <h1>{title}</h1>
            {description && (
              <p
                className="text-secondary mt-1"
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  marginTop: 'var(--space-1)',
                }}
              >
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}
