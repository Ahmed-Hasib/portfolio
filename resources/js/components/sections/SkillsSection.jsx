import { motion } from 'framer-motion';
import EmptyState from '../common/EmptyState';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function SkillsSection({ skills }) {
    return (
        <motion.section {...reveal} id="skills" className="mt-8">
            <SectionHeading
                eyebrow="Skills"
                title="A balanced stack across backend, frontend, database, and product implementation."
                description="Each skill card is isolated so the section can evolve into filtered views or grouped categories without rewriting the page."
            />

            {skills.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No skills published yet"
                        description="Skill data will appear here once it has been added from the backend."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {skills.map((skill) => (
                        <SurfaceCard key={skill.name} className="px-6 py-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                {skill.category ?? 'General'}
                            </p>
                            <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">
                                {skill.name}
                            </h3>
                            <div className="mt-6">
                                <div className="flex items-center justify-between text-sm font-semibold text-ink-soft">
                                    <span>Proficiency</span>
                                    <span>
                                        {skill.proficiency_percentage ?? 0}%
                                    </span>
                                </div>
                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-shell-strong">
                                    <div
                                        className="h-full rounded-full bg-linear-to-r from-accent to-accent-warm"
                                        style={{
                                            width: `${skill.proficiency_percentage ?? 0}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </SurfaceCard>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
