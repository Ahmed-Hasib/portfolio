import { motion, useReducedMotion } from 'framer-motion';
import EmptyState from '../common/EmptyState';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function GallerySection({ galleries }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.section {...reveal} id="gallery" className="mt-8">
            <SectionHeading
                eyebrow="Gallery"
                title="Visual highlights that can grow into a richer media showcase."
                description="The gallery is already separated into its own component so future lightboxes, filters, and lazy loading can be added without touching unrelated sections."
            />

            {galleries.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No gallery items yet"
                        description="Gallery entries will appear here once they are available from the API."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {galleries.map((gallery, index) => (
                        <motion.div
                            key={`${gallery.title}-${gallery.image}`}
                            initial={
                                prefersReducedMotion
                                    ? false
                                    : { opacity: 0, y: 24 }
                            }
                            whileInView={
                                prefersReducedMotion
                                    ? undefined
                                    : { opacity: 1, y: 0 }
                            }
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{
                                delay: index * 0.06,
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <SurfaceCard className="overflow-hidden p-4">
                                <motion.div
                                    className="h-56 rounded-[1.5rem] bg-linear-to-br from-accent/12 via-white to-accent-warm/16"
                                    whileHover={
                                        prefersReducedMotion
                                            ? undefined
                                            : { scale: 1.02 }
                                    }
                                />
                                <div className="px-2 pb-2 pt-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                        {gallery.category ?? 'Gallery'}
                                    </p>
                                    <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">
                                        {gallery.title ?? 'Untitled capture'}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-ink-soft">
                                        Asset path: {gallery.image}
                                    </p>
                                </div>
                            </SurfaceCard>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
