import { forwardRef } from 'react';

/**
 * Button — design system button with all variants and states.
 * Variants: primary | secondary | ghost | danger | premium
 * Sizes: small (28px) | medium (32px) | large (40px)
 * States: default, hover, active, focus, disabled, loading
 */
const sizeClasses = {
  small: 'btn-sm',
  medium: 'btn-md',
  large: 'btn-lg',
};

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  premium: 'btn-premium',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  const variantClass = variantClasses[variant] || variantClasses.primary;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={`btn ${sizeClass} ${variantClass} ${loading ? 'btn-loading' : ''} ${className}`.trim()}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="spinner" aria-hidden="true" />
      )}
      {!loading && leftIcon && (
        <span className="flex shrink-0" aria-hidden="true">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="flex shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
