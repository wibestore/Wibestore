/**
 * Card — design system card with header, content, footer.
 * Variants: default | elevated | interactive | selected
 */
export function Card({
  children,
  variant = 'default',
  className = '',
  as: Component = 'div',
  ...props
}) {
  const variantClass =
    variant === 'elevated'
      ? 'card-elevated'
      : variant === 'interactive'
        ? 'card card-interactive'
        : variant === 'selected'
          ? 'card card-selected'
          : 'card';

  return (
    <Component
      className={`${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`card-header ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`card-content ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`card-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export default Card;
