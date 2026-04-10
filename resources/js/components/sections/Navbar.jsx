import { motion, useReducedMotion } from 'framer-motion';

export default function Navbar({ brand, items, activeSection }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.header
            initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card sticky top-4 z-20 flex items-center justify-between px-5 py-4 lg:px-6"
        >
            <a
                href="/"
                className="font-display text-lg font-bold tracking-tight text-ink"
            >
                {brand}
            </a>

            <nav className="hidden items-center gap-2 md:flex">
                {items.map((item) => {
                    const isActive = item.href === activeSection;

                    return (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            whileHover={
                                prefersReducedMotion
                                    ? undefined
                                    : { y: -1, scale: 1.01 }
                            }
                            transition={{
                                duration: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={[
                                'relative rounded-full px-4 py-2 text-sm font-semibold transition duration-200',
                                isActive
                                    ? 'bg-ink text-white shadow-[0_16px_36px_-24px_rgba(16,34,41,0.75)]'
                                    : 'text-ink-soft hover:text-ink',
                            ].join(' ')}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {item.label}
                        </motion.a>
                    );
                })}
            </nav>
        </motion.header>
    );
}
