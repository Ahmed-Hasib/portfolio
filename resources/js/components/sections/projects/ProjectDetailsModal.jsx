import { useEffect } from 'react';
import Button from '../../common/Button';

export default function ProjectDetailsModal({ project, onClose }) {
    useEffect(() => {
        if (!project) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, project]);

    if (!project) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-8">
            <button
                type="button"
                aria-label="Close project details"
                className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#f8f3e8] p-6 shadow-[0_35px_100px_-45px_rgba(16,34,41,0.95)] sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="section-label">
                                {project.featured
                                    ? 'Featured Project'
                                    : 'Project Detail'}
                            </span>
                            {project.category ? (
                                <span className="pill">{project.category}</span>
                            ) : null}
                        </div>
                        <h3 className="font-display mt-3 text-4xl font-bold tracking-tight text-ink">
                            {project.title}
                        </h3>
                        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-ink-soft">
                            {project.role ?? 'Contributor'}
                        </p>
                        <p className="mt-4 max-w-3xl text-base leading-8 text-ink-soft">
                            {project.full_description ?? project.description}
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        className="px-4 py-2"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[2rem] border border-black/8 bg-linear-to-br from-ink via-ink to-[#17393f] p-6 text-white shadow-[0_30px_85px_-45px_rgba(16,34,41,0.95)]">
                        <div className="flex h-72 flex-col justify-between">
                            <div className="flex items-center justify-between gap-3">
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/75">
                                    {project.featured ? 'Featured' : 'Project'}
                                </span>
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/75">
                                    Thumbnail
                                </span>
                            </div>

                            <div>
                                <p className="font-display text-7xl font-bold tracking-tight">
                                    {project.title
                                        .split(' ')
                                        .slice(0, 2)
                                        .map((fragment) => fragment[0])
                                        .join('')}
                                </p>
                                <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
                                    {project.thumbnail
                                        ? `Asset path: ${project.thumbnail}`
                                        : 'Visual asset not published for this project yet.'}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/8 p-4">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                                        Category
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-white/90">
                                        {project.category ?? 'General project'}
                                    </p>
                                </div>
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/8 p-4">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                                        Role
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-white/90">
                                        {project.role ?? 'Contributor'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Technology Stack
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech_stack.map((tech) => (
                                    <span key={tech} className="pill">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Delivery Context
                            </p>
                            <div className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
                                <p>
                                    <span className="font-semibold text-ink">
                                        Category:
                                    </span>{' '}
                                    {project.category ?? 'General project'}
                                </p>
                                <p>
                                    <span className="font-semibold text-ink">
                                        Role:
                                    </span>{' '}
                                    {project.role ?? 'Contributor'}
                                </p>
                                <p>
                                    <span className="font-semibold text-ink">
                                        Short summary:
                                    </span>{' '}
                                    {project.description}
                                </p>
                                <p>
                                    <span className="font-semibold text-ink">
                                        Slug:
                                    </span>{' '}
                                    {project.slug}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] border border-black/8 bg-white/82 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                                Project Access
                            </p>
                            <div className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
                                <p>
                                    <span className="font-semibold text-ink">
                                        Live demo:
                                    </span>{' '}
                                    {project.live_url
                                        ? 'Available'
                                        : 'Private or unavailable'}
                                </p>
                                <p>
                                    <span className="font-semibold text-ink">
                                        Repository:
                                    </span>{' '}
                                    {project.github_url
                                        ? 'Public link available'
                                        : 'Not public'}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {project.live_url ? (
                                <Button
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open Live Demo
                                </Button>
                            ) : null}
                            {project.github_url ? (
                                <Button
                                    href={project.github_url}
                                    variant="secondary"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open Repository
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
