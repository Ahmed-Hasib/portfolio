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

export default function EducationSection({ educations }) {
    return (
        <motion.section {...reveal} id="education" className="mt-8">
            <SectionHeading
                eyebrow="Education"
                title="Academic background presented as a clear supporting layer to practical engineering work."
                description="Education entries emphasize degree, field, institution, year range, and notable academic details in a concise resume-friendly format."
            />

            {educations.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No education entries yet"
                        description="Education details will appear here once they are available from the backend."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {educations.map((education) => (
                        <SurfaceCard
                            key={`${education.institute}-${education.degree}`}
                            className="overflow-hidden px-6 py-7"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        Academic Record
                                    </p>
                                    <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">
                                        {education.degree}
                                    </h3>
                                    <p className="mt-2 text-base font-semibold text-accent">
                                        {education.institute}
                                    </p>
                                </div>

                                <div className="rounded-full border border-black/8 bg-shell-strong/65 px-4 py-2 text-sm font-semibold text-ink-soft">
                                    {education.start_year} -{' '}
                                    {education.end_year ?? 'Present'}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.5rem] border border-black/8 bg-white/78 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                        Subject / Major
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-ink">
                                        {education.field ?? 'Not specified'}
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-black/8 bg-white/78 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                                        Result / Note
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-ink">
                                        {education.grade ??
                                            'Available on request'}
                                    </p>
                                </div>
                            </div>

                            {education.summary ? (
                                <p className="mt-5 text-sm leading-7 text-ink-soft">
                                    {education.summary}
                                </p>
                            ) : null}
                        </SurfaceCard>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
