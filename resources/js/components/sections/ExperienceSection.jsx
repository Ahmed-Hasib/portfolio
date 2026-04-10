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

export default function ExperienceSection({ experiences }) {
    return (
        <motion.section {...reveal} id="experience" className="mt-8">
            <SectionHeading
                eyebrow="Experience"
                title="Professional work presented with responsibilities, not just job titles."
                description="Experiences are split into summaries and ordered job descriptions so the backend can manage detailed responsibilities cleanly."
            />

            {experiences.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No experience records yet"
                        description="Experience data will appear here once it is available from the API."
                    />
                </div>
            ) : (
                <div className="mt-6 space-y-5">
                    {experiences.map((experience) => (
                        <SurfaceCard
                            key={`${experience.company_name}-${experience.role}`}
                            className="px-6 py-7 sm:px-8"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        {experience.employment_type ??
                                            'Experience'}
                                    </p>
                                    <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">
                                        {experience.role}
                                    </h3>
                                    <p className="mt-2 text-base font-semibold text-accent">
                                        {experience.company_name}
                                    </p>
                                </div>

                                <div className="rounded-[1.5rem] border border-black/8 bg-shell-strong/65 px-5 py-4 text-sm text-ink-soft">
                                    <p>{experience.location ?? 'Remote'}</p>
                                    <p className="mt-2">
                                        {experience.start_date} to{' '}
                                        {experience.end_date ?? 'Present'}
                                    </p>
                                </div>
                            </div>

                            {experience.summary ? (
                                <p className="mt-5 text-sm leading-7 text-ink-soft">
                                    {experience.summary}
                                </p>
                            ) : null}

                            <ul className="mt-5 space-y-3">
                                {experience.job_descriptions.map((item) => (
                                    <li
                                        key={`${experience.company_name}-${item.description}`}
                                        className="rounded-[1.25rem] border border-black/8 bg-white/78 px-4 py-4 text-sm leading-7 text-ink-soft"
                                    >
                                        {item.description}
                                    </li>
                                ))}
                            </ul>
                        </SurfaceCard>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
