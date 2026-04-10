import Badge from '../../common/Badge';
import Button from '../../common/Button';
import SurfaceCard from '../../common/SurfaceCard';

function ProjectVisual({ project }) {
    const titleFragments = project.title.split(' ').slice(0, 2);
    const initials = titleFragments.map((fragment) => fragment[0]).join('');

    return (
        <div className="relative overflow-hidden rounded-[1.85rem] border border-black/8 bg-linear-to-br from-ink via-ink to-[#17393f] p-6 text-white shadow-[0_26px_70px_-40px_rgba(16,34,41,0.9)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-accent-warm/22 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

            <div className="relative flex h-52 flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/75">
                        {project.category ?? 'Project'}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/75">
                        {project.featured ? 'Featured' : 'Archive'}
                    </span>
                </div>

                <div>
                    <div className="font-display text-7xl leading-none font-bold tracking-tight text-white/95">
                        {initials}
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-7 text-white/72">
                        {project.thumbnail
                            ? `Thumbnail asset: ${project.thumbnail}`
                            : 'Visual concept card prepared for project presentation.'}
                    </p>
                </div>

                <div className="flex items-end justify-between gap-4 text-xs uppercase tracking-[0.22em] text-white/65">
                    <span>{project.role ?? 'Contributor'}</span>
                    <span>{project.tech_stack.length} stack items</span>
                </div>
            </div>
        </div>
    );
}

export default function ProjectCard({ project, onPreview }) {
    const techPreview = project.tech_stack.slice(0, 4);
    const remainingTechnologyCount = Math.max(
        project.tech_stack.length - techPreview.length,
        0,
    );

    return (
        <SurfaceCard className="overflow-hidden px-6 py-6 sm:px-7">
            <ProjectVisual project={project} />

            <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.featured ? (
                    <Badge tone="accent">Featured Project</Badge>
                ) : (
                    <span className="pill">Project Showcase</span>
                )}
                {project.category ? (
                    <span className="pill">{project.category}</span>
                ) : null}
            </div>

            <div className="mt-4">
                <h3 className="font-display text-3xl font-bold tracking-tight text-ink">
                    {project.title}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    {project.role ?? 'Full-Stack Contribution'}
                </p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                    <p className="text-sm leading-7 text-ink-soft">
                        {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {techPreview.map((tech) => (
                            <span key={tech} className="pill">
                                {tech}
                            </span>
                        ))}
                        {remainingTechnologyCount > 0 ? (
                            <span className="pill">
                                +{remainingTechnologyCount} more
                            </span>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-3">
                    <div className="rounded-[1.35rem] border border-black/8 bg-white/85 p-4">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-ink-soft">
                            Delivery Role
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink">
                            {project.role ?? 'Contributor'}
                        </p>
                    </div>

                    <div className="rounded-[1.35rem] border border-black/8 bg-white/85 p-4">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-ink-soft">
                            External Links
                        </p>
                        <p className="mt-3 text-sm leading-7 text-ink">
                            {project.live_url
                                ? 'Live demo available'
                                : 'Live demo private'}
                        </p>
                        <p className="text-sm leading-7 text-ink">
                            {project.github_url
                                ? 'Repository available'
                                : 'Repository not public'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => onPreview(project)}>
                    View Case Study
                </Button>
                {project.live_url ? (
                    <Button
                        href={project.live_url}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Live Demo
                    </Button>
                ) : null}
                {project.github_url ? (
                    <Button
                        href={project.github_url}
                        variant="secondary"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Repository
                    </Button>
                ) : null}
            </div>
        </SurfaceCard>
    );
}
