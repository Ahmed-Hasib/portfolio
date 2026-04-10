import { motion, useReducedMotion } from 'framer-motion';

export default function Footer({ fullName, socialLinks }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <footer className="flex flex-col gap-4 px-1 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>
                {fullName ?? 'Hasib Rahman'} portfolio is powered by a modular
                React frontend and Laravel APIs.
            </p>

            <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.platform_name}
                        href={link.url}
                        className="nav-link social-link"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={
                            prefersReducedMotion
                                ? undefined
                                : { y: -2, scale: 1.02 }
                        }
                        transition={{
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {link.platform_name}
                    </motion.a>
                ))}
            </div>
        </footer>
    );
}
