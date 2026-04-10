import { motion, useReducedMotion } from 'framer-motion';

export default function Button({
    href,
    type = 'button',
    variant = 'primary',
    className = '',
    children,
    disabled = false,
    ...props
}) {
    const prefersReducedMotion = useReducedMotion();
    const baseClassName =
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30';

    const variantClassName = {
        primary: 'bg-ink text-white hover:bg-ink/90',
        secondary:
            'border border-black/10 bg-white/80 text-ink hover:border-accent/30 hover:text-accent',
        ghost: 'text-ink hover:text-accent',
    }[variant];

    const stateClassName = disabled ? 'cursor-not-allowed opacity-60' : '';
    const resolvedClassName = [
        baseClassName,
        variantClassName,
        stateClassName,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const motionProps = prefersReducedMotion
        ? {}
        : {
              whileHover: disabled ? undefined : { y: -2, scale: 1.01 },
              whileTap: disabled ? undefined : { scale: 0.985 },
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
          };

    if (href) {
        return (
            <motion.a
                href={href}
                className={resolvedClassName}
                aria-disabled={disabled}
                {...motionProps}
                {...props}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            className={resolvedClassName}
            disabled={disabled}
            {...motionProps}
            {...props}
        >
            {children}
        </motion.button>
    );
}
