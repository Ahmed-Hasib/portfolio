import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import Button from '../common/Button';
import EmptyState from '../common/EmptyState';
import SectionHeading from '../common/SectionHeading';
import SurfaceCard from '../common/SurfaceCard';

const reveal = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function ProjectsSection({ projects }) {
    return (
        <motion.section {...reveal} id="projects" className="mt-8">
            <SectionHeading
                eyebrow="Projects"
                title="Selected work with stack details, source links, and live previews."
                description="Each project card is prop-driven and ready for filters, featured carousels, or dedicated detail pages later."
            />

            {projects.length === 0 ? (
                <div className="mt-6">
                    <EmptyState
                        title="No projects published yet"
                        description="Project cards will appear here once content is available from the API."
                    />
                </div>
            ) : (
                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    {projects.map((project) => (
                        <SurfaceCard
                            key={project.slug}
                            className="overflow-hidden px-6 py-7 sm:px-8"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    {project.featured ? (
                                        <Badge tone="accent">
                                            Featured Project
                                        </Badge>
                                    ) : (
                                        <span className="pill">Project</span>
                                    )}
                                    <h3 className="font-display mt-4 text-3xl font-bold tracking-tight text-ink">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-7 text-ink-soft">
                                {project.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {project.tech_stack.map((tech) => (
                                    <span key={tech} className="pill">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {project.live_url ? (
                                    <Button href={project.live_url}>
                                        Live Preview
                                    </Button>
                                ) : null}
                                {project.github_url ? (
                                    <Button
                                        href={project.github_url}
                                        variant="secondary"
                                    >
                                        GitHub
                                    </Button>
                                ) : null}
                            </div>
                        </SurfaceCard>
                    ))}
                </div>
            )}
        </motion.section>
    );
}
