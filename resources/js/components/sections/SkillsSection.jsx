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

const skillCategoryOrder = [
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'Styling',
];

const skillIcons = {
    laravel: 'L',
    react: 'R',
    nextjs: 'N',
    database: 'D',
    wind: 'T',
    git: 'G',
    docker: 'C',
};

function groupSkills(skills) {
    const groups = new Map();

    skills.forEach((skill) => {
        const category = skill.category ?? 'General';

        if (!groups.has(category)) {
            groups.set(category, []);
        }

        groups.get(category).push(skill);
    });

    return [...groups.entries()].sort((left, right) => {
        const leftIndex = skillCategoryOrder.indexOf(left[0]);
        const rightIndex = skillCategoryOrder.indexOf(right[0]);

        const normalizedLeft =
            leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;
        const normalizedRight =
            rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

        return normalizedLeft - normalizedRight;
    });
}

export default function SkillsSection({ skills }) {
    const groupedSkills = groupSkills(skills);

    return (
        <motion.section {...reveal} id="skills" className="mt-8">
            <SectionHeading
                eyebrow="Skills"
                title="A categorized technical toolkit designed to be read quickly by recruiters and engineering leads."
                description="Skills are grouped by discipline, surfaced with visual indicators, and paired with proficiency signals so the section reads like a polished resume instead of a raw tag list."
            />

            {skills.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No skills published yet"
                        description="Skill data will appear here once it has been added from the backend."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    {groupedSkills.map(([category, categorySkills]) => (
                        <SurfaceCard
                            key={category}
                            className="px-6 py-7 sm:px-8"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        Skill Category
                                    </p>
                                    <h3 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink">
                                        {category}
                                    </h3>
                                </div>
                                <div className="rounded-full border border-black/8 bg-shell-strong/65 px-4 py-2 text-sm font-semibold text-ink-soft">
                                    {categorySkills.length} skills
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {categorySkills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="rounded-[1.5rem] border border-black/8 bg-white/80 px-5 py-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-accent/15 bg-accent/8 font-display text-lg font-bold text-accent">
                                                {skillIcons[skill.icon] ?? '#'}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <h4 className="font-display text-xl font-bold tracking-tight text-ink">
                                                        {skill.name}
                                                    </h4>
                                                    <span className="rounded-full border border-black/8 bg-shell-strong/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                                                        {skill.proficiency_percentage ??
                                                            0}
                                                        %
                                                    </span>
                                                </div>

                                                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-shell-strong">
                                                    <div
                                                        className="h-full rounded-full bg-linear-to-r from-accent to-accent-warm"
                                                        style={{
                                                            width: `${skill.proficiency_percentage ?? 0}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SurfaceCard>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
