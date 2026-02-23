/**
 * Card — design system card with header, content, footer.
 * Variants: default | elevated | interactive | selected
 */
export function Card({
  children,
  variant = 'default',
  className = '',
  as: ComponentTag = 'div',
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
    <ComponentTag
      className={`${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </ComponentTag>
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
