import { motion } from 'framer-motion';
import Button from '../common/Button';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function AboutSection({
    profile,
    yearsOfExperience,
    currentFocus,
    technologiesSummary,
    personalHighlights,
}) {
    const detailItems = [
        {
            label: 'Years of experience',
            value: yearsOfExperience,
        },
        { label: 'Location', value: profile?.location ?? 'Dhaka, Bangladesh' },
        {
            label: 'Current focus',
            value: currentFocus,
        },
    ];

    return (
        <motion.section {...reveal} id="about" className="mt-8">
            <SurfaceCard className="px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
                    <SectionHeading
                        eyebrow="About"
                        title="A polished introduction built for recruiters, founders, and clients who care about execution."
                        description="The goal is straightforward: communicate technical depth, product taste, and reliability without making the page feel like a generic template."
                    />

                    <div className="space-y-6">
                        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                            <div className="rounded-[2rem] border border-black/8 bg-white/80 p-6 sm:p-7">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                                    Short Biography
                                </p>
                                {profile?.bio ? (
                                    <div
                                        className="prose prose-sm mt-5 max-w-none text-ink-soft prose-headings:text-ink prose-p:text-ink-soft prose-strong:text-ink prose-li:text-ink-soft prose-a:text-accent"
                                        dangerouslySetInnerHTML={{
                                            __html: profile.bio,
                                        }}
                                    />
                                ) : (
                                    <p className="mt-5 text-base leading-8 text-ink-soft">
                                        Profile bio will be displayed here once
                                        content is available from the API.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-[2rem] border border-black/8 bg-linear-to-br from-accent/10 via-white to-accent-warm/12 p-6 sm:p-7">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                                    Technologies Summary
                                </p>
                                <h3 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink">
                                    {technologiesSummary}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-ink-soft">
                                    A stack selected for speed, maintainability,
                                    and strong product delivery from backend
                                    architecture through frontend presentation.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {detailItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        {item.label}
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-ink">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-[2rem] border border-black/8 bg-shell-strong/60 p-6 sm:p-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                                Personal Highlights
                            </p>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                {personalHighlights.map((highlight) => (
                                    <div
                                        key={highlight.title}
                                        className="rounded-[1.5rem] border border-black/8 bg-white/82 p-5"
                                    >
                                        <p className="font-display text-xl font-bold tracking-tight text-ink">
                                            {highlight.title}
                                        </p>
                                        <p className="mt-3 text-sm leading-7 text-ink-soft">
                                            {highlight.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {profile?.resume_url ? (
                            <div className="pt-2">
                                <Button
                                    href={profile.resume_url}
                                    variant="secondary"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Download CV
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </SurfaceCard>
        </motion.section>
    );
}
