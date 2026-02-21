import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination — numbered or simple prev/next.
 * Current page highlighted, disabled at boundaries, optional total count.
 */
export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage,
  showTotal = false,
  className = '',
}) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const getVisiblePages = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }
    range.forEach((i, idx) => {
      if (idx > 0 && range[idx - 1] !== i - 1) rangeWithDots.push('...');
      rangeWithDots.push(i);
    });
    return rangeWithDots;
  };

  const visible = getVisiblePages();

  return (
    <div
      className={`flex items-center justify-between gap-4 flex-wrap ${className}`.trim()}
      role="navigation"
      aria-label="Pagination"
    >
      <div className="pagination">
        <button
          type="button"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          <ChevronLeft style={{ width: '16px', height: '16px' }} />
        </button>
        {visible.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="pagination-btn" style={{ cursor: 'default' }}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={`pagination-btn ${currentPage === p ? 'pagination-active' : ''}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={currentPage === p ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNext}
          aria-label="Next page"
        >
          <ChevronRight style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
      {showTotal && totalItems != null && (
        <span
          className="text-caption"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {totalItems} {itemsPerPage ? `• ${itemsPerPage} per page` : ''}
        </span>
      )}
    </div>
  );
}

export default Pagination;
