import { motion } from 'framer-motion';
import EmptyState from '../common/EmptyState';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

function formatDateRange(startDate, endDate) {
    const formatter = new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric',
    });

    const formatDate = (value) => {
        if (!value) {
            return 'Present';
        }

        return formatter.format(new Date(value));
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function ExperienceSection({ experiences }) {
    return (
        <motion.section {...reveal} id="experience" className="mt-8">
            <SectionHeading
                eyebrow="Experience"
                title="A recruiter-friendly experience timeline with concrete responsibilities, stack context, and outcomes."
                description="Each role is structured to show company, title, duration, location, job type, summary, technologies, achievements, and detailed responsibilities in a format that is easy to scan quickly."
            />

            {experiences.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No experience records yet"
                        description="Experience data will appear here once it is available from the API."
                    />
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                    {experiences.map((experience, index) => (
                        <div
                            key={`${experience.company_name}-${experience.role}`}
                            className="relative pl-8 sm:pl-12"
                        >
                            <div className="absolute left-3 top-0 h-full w-px bg-linear-to-b from-accent/40 via-black/10 to-transparent sm:left-5" />
                            <div className="absolute left-0 top-9 flex h-6 w-6 items-center justify-center rounded-full border border-accent/20 bg-white shadow-[0_10px_30px_-20px_rgba(15,118,110,0.85)] sm:left-2.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                            </div>

                            <SurfaceCard className="px-6 py-7 sm:px-8">
                                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                    <div className="max-w-3xl">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                                                {experience.employment_type ??
                                                    'Experience'}
                                            </span>
                                            <span className="rounded-full border border-black/8 bg-shell-strong/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                                                Role{' '}
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </div>

                                        <h3 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink">
                                            {experience.role}
                                        </h3>
                                        <p className="mt-2 text-lg font-semibold text-accent">
                                            {experience.company_name}
                                        </p>
                                        {experience.summary ? (
                                            <p className="mt-5 max-w-2xl text-sm leading-7 text-ink-soft">
                                                {experience.summary}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2 xl:w-[21rem] xl:grid-cols-1">
                                        <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 px-5 py-4 text-sm text-ink-soft">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                                Duration
                                            </p>
                                            <p className="mt-3 font-semibold text-ink">
                                                {formatDateRange(
                                                    experience.start_date,
                                                    experience.end_date,
                                                )}
                                            </p>
                                        </div>
                                        <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 px-5 py-4 text-sm text-ink-soft">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                                Location
                                            </p>
                                            <p className="mt-3 font-semibold text-ink">
                                                {experience.location ??
                                                    'Remote'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                            Responsibilities
                                        </p>
                                        <ul className="mt-4 space-y-3">
                                            {experience.job_descriptions.map(
                                                (item) => (
                                                    <li
                                                        key={`${experience.company_name}-${item.description}`}
                                                        className="flex gap-3 rounded-[1.25rem] border border-black/8 bg-white/78 px-4 py-4 text-sm leading-7 text-ink-soft"
                                                    >
                                                        <span className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                                                        <span>
                                                            {item.description}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="rounded-[1.75rem] border border-black/8 bg-white/78 p-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                                Technologies Used
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {experience.technologies_used.map(
                                                    (technology) => (
                                                        <span
                                                            key={technology}
                                                            className="pill"
                                                        >
                                                            {technology}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </div>

                                        {experience.achievements.length > 0 ? (
                                            <div className="rounded-[1.75rem] border border-accent/18 bg-accent/8 p-5">
                                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                                                    Highlights
                                                </p>
                                                <ul className="mt-4 space-y-3">
                                                    {experience.achievements.map(
                                                        (achievement) => (
                                                            <li
                                                                key={
                                                                    achievement
                                                                }
                                                                className="text-sm leading-7 text-ink-soft"
                                                            >
                                                                {achievement}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </SurfaceCard>
                        </div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
