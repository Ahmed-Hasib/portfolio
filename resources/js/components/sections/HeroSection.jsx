import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import Button from '../common/Button';
import SurfaceCard from '../common/SurfaceCard';

const heroMotion = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const asideMotion = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

export default function HeroSection({
    profile,
    socialLinks,
    metrics,
    skills,
    projects,
}) {
    const firstName = profile?.full_name?.split(' ')[0] ?? 'Hasib';
    const intro =
        profile?.bio ??
        'Portfolio content will appear here once the backend data is available.';

    return (
        <section className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div
                {...heroMotion}
                className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/14 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-accent-warm/12 blur-3xl" />

                <Badge tone="accent">Portfolio Overview</Badge>

                <div className="mt-6 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ink-soft">
                        {profile?.designation ?? 'Laravel + React Portfolio'}
                    </p>
                    <h1 className="font-display mt-4 text-4xl leading-none font-bold tracking-tight text-balance sm:text-5xl lg:text-[4.5rem]">
                        {firstName}
                        <span className="block text-accent">
                            builds thoughtful digital products.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                        {intro}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button href="#projects">View Projects</Button>
                    <Button href="#contact" variant="secondary">
                        Start a Conversation
                    </Button>
                    {profile?.resume_url ? (
                        <Button href={profile.resume_url} variant="secondary">
                            Download Resume
                        </Button>
                    ) : null}
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5"
                        >
                            <p className="font-display text-2xl font-bold text-ink">
                                {metric.value}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-ink-soft">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.aside {...asideMotion}>
                <SurfaceCard className="px-6 py-8 sm:px-8">
                    <Badge tone="accent">Snapshot</Badge>

                    <div className="mt-6 space-y-6">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Location
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-ink">
                                {profile?.location ?? 'Location coming soon'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Primary Skills
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {skills.slice(0, 4).map((skill) => (
                                    <span key={skill.name} className="pill">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-dashed border-accent/28 bg-accent/8 p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                                Social Presence
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.platform_name}
                                        href={link.url}
                                        className="pill hover:border-accent/30 hover:text-accent"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {link.platform_name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                    Projects
                                </p>
                                <p className="mt-2 font-display text-3xl font-bold text-ink">
                                    {projects.length}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                    Contact
                                </p>
                                <p className="mt-2 text-sm leading-6 text-ink-soft">
                                    {profile?.email ?? 'Email coming soon'}
                                </p>
                            </div>
                        </div>
                    </div>
                </SurfaceCard>
            </motion.aside>
        </section>
    );
}
