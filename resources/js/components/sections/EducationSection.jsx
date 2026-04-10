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
                title="Formal education and training kept separate from work history."
                description="This section stays independently maintainable and can later support certifications or coursework without changing the rest of the page."
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
                            className="px-6 py-7"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                {education.start_year} -{' '}
                                {education.end_year ?? 'Present'}
                            </p>
                            <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">
                                {education.degree}
                            </h3>
                            <p className="mt-2 text-base font-semibold text-accent">
                                {education.institute}
                            </p>
                            {education.field ? (
                                <p className="mt-4 text-sm leading-7 text-ink-soft">
                                    Field: {education.field}
                                </p>
                            ) : null}
                            {education.grade ? (
                                <p className="mt-1 text-sm leading-7 text-ink-soft">
                                    Grade: {education.grade}
                                </p>
                            ) : null}
                            {education.summary ? (
                                <p className="mt-4 text-sm leading-7 text-ink-soft">
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
