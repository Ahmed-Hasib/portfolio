export default function Button({
    href,
    type = 'button',
    variant = 'primary',
    className = '',
    children,
    ...props
}) {
    const baseClassName =
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200';

    const variantClassName = {
        primary: 'bg-ink text-white hover:bg-ink/90',
        secondary:
            'border border-black/10 bg-white/80 text-ink hover:border-accent/30 hover:text-accent',
        ghost: 'text-ink hover:text-accent',
    }[variant];

    const resolvedClassName = [baseClassName, variantClassName, className]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <a href={href} className={resolvedClassName} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={resolvedClassName} {...props}>
            {children}
        </button>
    );
}
