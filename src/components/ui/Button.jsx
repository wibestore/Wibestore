/**
 * Button — GitHub Premium design system.
 * Variants: primary | secondary | ghost | danger | premium
 * Sizes: sm (28px) | md (32px) | lg (40px) | xl (48px)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  as: Component = 'button',
  ...props
}) {
  const base = 'btn';
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    premium: 'btn-premium',
  }[variant] || 'btn-primary';
  const sizeClass = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
  }[size] || 'btn-md';

  const classes = [base, variantClass, sizeClass, loading && 'btn-loading', className].filter(Boolean).join(' ');

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className="spinner" aria-hidden="true" />}
      {children}
    </Component>
  );
}
