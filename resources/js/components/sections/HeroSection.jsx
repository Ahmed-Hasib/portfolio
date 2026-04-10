import { motion, useReducedMotion } from 'framer-motion';
import AnimatedCounter from '../common/AnimatedCounter';
import Badge from '../common/Badge';
import Button from '../common/Button';
import SurfaceCard from '../common/SurfaceCard';
import TypingText from '../common/TypingText';

const heroContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
        },
    },
};

const heroItem = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

const asideMotion = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

export default function HeroSection({
    profile,
    socialLinks,
    metrics,
    skills,
    projects,
    roleHighlights,
    yearsOfExperience,
    currentFocus,
}) {
    const prefersReducedMotion = useReducedMotion();
    const fullName = profile?.full_name ?? 'Hasib Rahman';
    const plainBio = (profile?.bio ?? '').replace(/<[^>]*>/g, ' ').trim();
    const intro =
        plainBio ||
        'I design and ship modern digital experiences with a Laravel backend, a React frontend, and a strong focus on maintainable product systems.';
    const primarySkills = skills.slice(0, 4);
    const externalSocialLinks = socialLinks.filter((link) =>
        link.url.startsWith('http'),
    );
    const initials = fullName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div
                variants={prefersReducedMotion ? undefined : heroContainer}
                initial={prefersReducedMotion ? false : 'hidden'}
                animate={prefersReducedMotion ? undefined : 'show'}
                className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
                <motion.div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/18 blur-3xl"
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : { x: [0, -10, 0], y: [0, 16, 0] }
                    }
                    transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    aria-hidden="true"
                    className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-accent-warm/14 blur-3xl"
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : { x: [0, 12, 0], y: [0, -14, 0] }
                    }
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                    }}
                />
                <div className="absolute inset-y-0 right-0 hidden w-px bg-linear-to-b from-transparent via-black/8 to-transparent lg:block" />

                <motion.div variants={heroItem}>
                    <Badge tone="accent">Available for selected work</Badge>
                </motion.div>

                <motion.div variants={heroItem} className="mt-6 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-ink-soft">
                        {profile?.designation ??
                            'Full-Stack Laravel and React Developer'}
                    </p>
                    <h1 className="font-display mt-4 text-5xl leading-none font-bold tracking-tight text-balance sm:text-6xl lg:text-[5.2rem]">
                        {fullName}
                        <span className="mt-3 block text-2xl leading-snug text-accent sm:text-3xl lg:text-[2.15rem]">
                            <TypingText
                                items={roleHighlights}
                                className="font-display"
                            />
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft sm:text-lg">
                        {intro}
                    </p>
                </motion.div>

                <motion.div
                    variants={heroItem}
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                >
                    <Button
                        href="#contact"
                        className="shadow-[0_20px_45px_-28px_rgba(16,34,41,0.85)]"
                    >
                        Hire Me
                    </Button>
                    {profile?.resume_url ? (
                        <Button
                            href={profile.resume_url}
                            variant="secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Download CV
                        </Button>
                    ) : null}
                    <Button href="#projects" variant="secondary">
                        View Projects
                    </Button>
                </motion.div>

                <motion.div
                    variants={heroItem}
                    className="mt-7 flex flex-wrap gap-3"
                >
                    {externalSocialLinks.map((link) => (
                        <motion.a
                            key={link.platform_name}
                            href={link.url}
                            className="pill social-chip"
                            target="_blank"
                            rel="noreferrer"
                            whileHover={
                                prefersReducedMotion
                                    ? undefined
                                    : { y: -3, scale: 1.02 }
                            }
                            whileTap={
                                prefersReducedMotion
                                    ? undefined
                                    : { scale: 0.98 }
                            }
                            transition={{
                                duration: 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {link.platform_name}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    variants={heroItem}
                    className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                >
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={
                                prefersReducedMotion
                                    ? false
                                    : { opacity: 0, y: 18 }
                            }
                            whileInView={
                                prefersReducedMotion
                                    ? undefined
                                    : { opacity: 1, y: 0 }
                            }
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-[1.75rem] border border-black/8 bg-white/78 p-5 shadow-[0_20px_50px_-35px_rgba(16,34,41,0.35)]"
                        >
                            <AnimatedCounter
                                value={metric.value}
                                className="font-display text-2xl font-bold text-ink"
                            />
                            <p className="mt-2 text-sm leading-6 text-ink-soft">
                                {metric.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.aside
                {...(prefersReducedMotion ? {} : asideMotion)}
                animate={
                    prefersReducedMotion
                        ? undefined
                        : {
                              opacity: 1,
                              x: 0,
                              y: [0, -6, 0],
                          }
                }
                transition={
                    prefersReducedMotion
                        ? undefined
                        : {
                              opacity: {
                                  delay: 0.12,
                                  duration: 0.75,
                                  ease: [0.22, 1, 0.36, 1],
                              },
                              x: {
                                  delay: 0.12,
                                  duration: 0.75,
                                  ease: [0.22, 1, 0.36, 1],
                              },
                              y: {
                                  delay: 0.9,
                                  duration: 6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: 'easeInOut',
                              },
                          }
                }
            >
                <SurfaceCard className="relative overflow-hidden px-6 py-8 sm:px-8">
                    <div className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/12 blur-3xl" />

                    <Badge tone="accent">Personal Brand Card</Badge>

                    <div className="mt-6 rounded-[2rem] border border-black/8 bg-linear-to-br from-ink via-ink to-[#17393f] p-6 text-white shadow-[0_30px_80px_-45px_rgba(16,34,41,0.95)]">
                        <div className="flex items-start justify-between gap-4">
                            <motion.div
                                whileHover={
                                    prefersReducedMotion
                                        ? undefined
                                        : { rotate: -4, scale: 1.03 }
                                }
                                className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/10 font-display text-3xl font-bold tracking-tight"
                            >
                                {initials}
                            </motion.div>
                            <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/75">
                                {profile?.location ?? 'Remote'}
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
                                Current Focus
                            </p>
                            <h3 className="font-display mt-3 text-3xl font-bold tracking-tight">
                                {currentFocus}
                            </h3>
                            <p className="mt-4 text-sm leading-7 text-white/70">
                                Building maintainable Laravel APIs, expressive
                                React interfaces, and product systems that feel
                                premium from the first interaction.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                                    Experience
                                </p>
                                <AnimatedCounter
                                    value={yearsOfExperience}
                                    className="mt-2 block font-display text-3xl font-bold"
                                />
                            </div>
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                                    Featured Work
                                </p>
                                <AnimatedCounter
                                    value={`${projects.length}`}
                                    className="mt-2 block font-display text-3xl font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-5">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Core Stack
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {primarySkills.map((skill) => (
                                    <motion.span
                                        key={skill.name}
                                        className="pill"
                                        whileHover={
                                            prefersReducedMotion
                                                ? undefined
                                                : { y: -2 }
                                        }
                                    >
                                        {skill.name}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                    Best Contact
                                </p>
                                <p className="mt-2 text-sm leading-6 text-ink-soft">
                                    {profile?.email ?? 'Email coming soon'}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 p-5">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                    Social Links
                                </p>
                                <AnimatedCounter
                                    value={`${socialLinks.length}`}
                                    className="mt-2 block font-display text-3xl font-bold text-ink"
                                />
                            </div>
                        </div>
                    </div>
                </SurfaceCard>
            </motion.aside>
        </section>
    );
}
