import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Modal — overlay + container with header/body/footer.
 * Sizes: small (400px) | medium (500px) | large (700px) | full (90vw)
 * Animations: overlay fade-in, modal slide-up
 */
const sizeClasses = {
  small: 'modal-sm',
  medium: 'modal-md',
  large: 'modal-lg',
  full: 'modal-full',
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'medium',
  children,
  footer,
  closeLabel = 'Close',
}) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const focusables = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables?.[0];
    first?.focus?.();
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => e.target === overlayRef.current && onClose?.()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={containerRef}
        className={`modal-container ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="modal-header">
            {title ? <h2 id="modal-title">{title}</h2> : <span />}
            {onClose && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={onClose}
                aria-label={closeLabel}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
