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

export default function AboutSection({ profile }) {
    const detailItems = [
        { label: 'Based in', value: profile?.location ?? 'Dhaka, Bangladesh' },
        { label: 'Email', value: profile?.email ?? 'hello@hasib.dev' },
        { label: 'Phone', value: profile?.phone ?? 'Available on request' },
    ];

    return (
        <motion.section {...reveal} id="about" className="mt-8">
            <SurfaceCard className="px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <SectionHeading
                        eyebrow="About"
                        title="A backend-focused builder with a product eye for frontend delivery."
                        description="The portfolio frontend is now modular, section-based, and ready to evolve independently as the content model grows."
                    />

                    <div className="space-y-5">
                        <p className="text-base leading-8 text-ink-soft">
                            {profile?.bio ??
                                'Profile bio will be displayed here once content is available from the API.'}
                        </p>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {detailItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-[1.5rem] border border-black/8 bg-white/78 p-5"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        {item.label}
                                    </p>
                                    <p className="mt-3 text-sm leading-6 text-ink">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {profile?.resume_url ? (
                            <div className="pt-2">
                                <Button
                                    href={profile.resume_url}
                                    variant="secondary"
                                >
                                    Open Resume
                                </Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </SurfaceCard>
        </motion.section>
    );
}
