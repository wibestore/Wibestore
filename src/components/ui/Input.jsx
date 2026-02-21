import { forwardRef } from 'react';

/**
 * Input — design system input with label, helper, error, optional icon.
 * Sizes: small (28px) | medium (32px) | large (40px)
 * States: default, hover, focus, error, disabled
 */
const sizeClasses = {
  small: 'input-sm',
  medium: 'input-md',
  large: 'input-lg',
};

const Input = forwardRef(({
  label,
  helperText,
  error,
  errorMessage,
  leftIcon,
  rightIcon,
  size = 'medium',
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  const hasError = error || errorMessage;

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              left: 'var(--space-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input ${sizeClass} ${hasError ? 'input-error' : ''} ${className}`.trim()}
          style={{
            paddingLeft: leftIcon ? '36px' : undefined,
            paddingRight: rightIcon ? '36px' : undefined,
          }}
          aria-invalid={hasError}
          aria-describedby={
            [errorMessage && `${inputId}-error`, helperText && !hasError && `${inputId}-helper`]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />
        {rightIcon && (
          <span
            style={{
              position: 'absolute',
              right: 'var(--space-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {errorMessage && (
        <div id={`${inputId}-error`} className="input-error-msg" role="alert">
          {errorMessage}
        </div>
      )}
      {helperText && !hasError && (
        <div id={`${inputId}-helper`} className="input-helper">
          {helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
