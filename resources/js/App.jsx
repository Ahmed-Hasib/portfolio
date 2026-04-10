import { motion } from 'framer-motion';

const socialLinks = [
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Contact', href: '#contact' },
];

const highlights = [
    { value: 'Laravel 12', label: 'PHP 8.2-compatible backend foundation' },
    { value: 'React + Vite', label: 'Frontend app mounted in resources/js' },
    {
        value: 'MySQL Ready',
        label: 'Environment defaults aligned for local setup',
    },
];

const capabilityCards = [
    {
        title: 'Single-codebase architecture',
        body: 'Laravel owns routing, API design, deployment, and server rendering concerns while React handles the portfolio experience inside the same project.',
    },
    {
        title: 'Frontend system foundation',
        body: 'Tailwind CSS, Vite, React, and Framer Motion are wired for fast iteration without adding a separate frontend application.',
    },
    {
        title: 'Scale path for dynamic content',
        body: 'The homepage is a shell today, but the structure is ready to evolve into API-driven sections backed by repositories and resource classes.',
    },
];

const roadmap = [
    'Swap hardcoded homepage data for public portfolio endpoints.',
    'Add content models for hero, about, skills, experience, and projects.',
    'Introduce contact submission, media handling, and CV delivery.',
];

const fadeInUp = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
    return (
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.14),transparent_52%)]" />

            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 lg:px-10 lg:py-8">
                <header className="surface-card sticky top-4 z-20 flex items-center justify-between px-5 py-4 lg:px-6">
                    <a
                        href="/"
                        className="font-display text-lg font-bold tracking-tight text-ink"
                    >
                        Hasib<span className="text-accent">Portfolio</span>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="nav-link"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </header>

                <main className="flex-1 py-10 lg:py-16">
                    <section className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
                        >
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/14 blur-3xl" />
                            <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-accent-warm/12 blur-3xl" />

                            <span className="section-label">
                                Portfolio Foundation
                            </span>

                            <div className="mt-6 max-w-3xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ink-soft">
                                    Laravel + React + Tailwind + Motion
                                </p>
                                <h1 className="font-display mt-4 text-4xl leading-none font-bold tracking-tight text-balance sm:text-5xl lg:text-[4.5rem]">
                                    A modern portfolio shell built to grow into
                                    dynamic content.
                                </h1>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                                    This foundation keeps the app in one Laravel
                                    codebase, mounts React inside
                                    <span className="mx-1 font-semibold text-ink">
                                        resources/js
                                    </span>
                                    , and prepares the frontend for API-driven
                                    portfolio sections.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#works"
                                    className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
                                >
                                    Explore Foundation
                                </a>
                                <a
                                    href="#roadmap"
                                    className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80 px-6 py-3 text-sm font-semibold text-ink hover:border-accent/30 hover:text-accent"
                                >
                                    View Next Build Steps
                                </a>
                            </div>

                            <div className="mt-10 grid gap-4 md:grid-cols-3">
                                {highlights.map((item) => (
                                    <div
                                        key={item.value}
                                        className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5"
                                    >
                                        <p className="font-display text-2xl font-bold text-ink">
                                            {item.value}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-ink-soft">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.aside
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.1,
                                duration: 0.75,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="surface-card px-6 py-8 sm:px-8"
                        >
                            <span className="section-label">Current Stack</span>

                            <div className="mt-6 space-y-5">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        Backend
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-ink">
                                        Laravel 12 on PHP 8.2
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        Frontend
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="pill">React 19</span>
                                        <span className="pill">Vite 7</span>
                                        <span className="pill">
                                            Tailwind CSS 4
                                        </span>
                                        <span className="pill">
                                            Framer Motion
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-[1.75rem] border border-dashed border-accent/28 bg-accent/8 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                                        Delivery Mode
                                    </p>
                                    <p className="mt-3 text-base leading-7 text-ink-soft">
                                        The base homepage is intentionally
                                        static for now, but it is structured to
                                        be replaced by backend-managed content
                                        without changing the rendering strategy.
                                    </p>
                                </div>
                            </div>
                        </motion.aside>
                    </section>

                    <motion.section
                        {...fadeInUp}
                        id="about"
                        className="mt-8 grid gap-5 lg:grid-cols-3"
                    >
                        {capabilityCards.map((card) => (
                            <article
                                key={card.title}
                                className="surface-card px-6 py-7"
                            >
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft">
                                    Foundation
                                </p>
                                <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink">
                                    {card.title}
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-ink-soft">
                                    {card.body}
                                </p>
                            </article>
                        ))}
                    </motion.section>

                    <motion.section
                        {...fadeInUp}
                        id="works"
                        className="surface-card mt-8 px-6 py-8 sm:px-8 lg:px-10"
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <span className="section-label">
                                    Homepage Direction
                                </span>
                                <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                                    A confident first screen that can later be
                                    fed entirely from the backend.
                                </h2>
                                <p className="mt-4 text-base leading-8 text-ink-soft">
                                    Hero messaging, feature cards, section
                                    anchors, and motion are all encapsulated in
                                    React components, making the transition to
                                    API-backed content straightforward.
                                </p>
                            </div>

                            <div className="rounded-[1.75rem] border border-black/8 bg-shell-strong/65 px-5 py-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                    Render Path
                                </p>
                                <p className="mt-2 text-lg font-semibold text-ink">
                                    Blade shell to Vite assets to React app
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        {...fadeInUp}
                        id="roadmap"
                        className="surface-card mt-8 px-6 py-8 sm:px-8 lg:px-10"
                    >
                        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                            <div>
                                <span className="section-label">Next Up</span>
                                <h2 className="font-display mt-5 text-3xl font-bold tracking-tight text-ink">
                                    The remaining work is now feature delivery,
                                    not setup debt.
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {roadmap.map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-4 rounded-[1.5rem] border border-black/8 bg-white/78 px-5 py-5"
                                    >
                                        <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                                            0{index + 1}
                                        </span>
                                        <p className="pt-1 text-sm leading-7 text-ink-soft">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <footer
                        id="contact"
                        className="flex flex-col gap-4 px-1 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between"
                    >
                        <p>
                            Hasib Portfolio v2 foundation is ready for dynamic
                            backend integration.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="nav-link"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
