import { motion, useReducedMotion } from 'framer-motion';
import Footer from '../components/sections/Footer';
import Navbar from '../components/sections/Navbar';
import useActiveSection from '../hooks/useActiveSection';

export default function PortfolioLayout({
    brand,
    navigationItems,
    socialLinks,
    fullName,
    children,
}) {
    const prefersReducedMotion = useReducedMotion();
    const activeSection = useActiveSection(navigationItems);

    return (
        <div className="relative overflow-hidden">
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.14),transparent_52%)]"
                animate={
                    prefersReducedMotion
                        ? undefined
                        : { y: [0, 16, 0], opacity: [0.85, 1, 0.85] }
                }
                transition={{
                    duration: 14,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-accent-warm/10 blur-3xl"
                animate={
                    prefersReducedMotion
                        ? undefined
                        : { x: [0, -20, 0], y: [0, 18, 0] }
                }
                transition={{
                    duration: 18,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                }}
            />

            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
                <Navbar
                    brand={brand}
                    items={navigationItems}
                    activeSection={activeSection}
                />

                <main className="flex-1 py-10 lg:py-16">{children}</main>

                <Footer fullName={fullName} socialLinks={socialLinks} />
            </div>
        </div>
    );
}
